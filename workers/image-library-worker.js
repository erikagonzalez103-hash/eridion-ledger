/**
 * Eridion Image Library Worker
 * Fronts the R2 image bucket: public image URLs + passphrase-gated management.
 *
 * DEPLOY (Cloudflare dashboard — one time):
 *   1. Workers & Pages → Create → Worker → name it `eridion-image-library` → paste this file → Deploy
 *   2. Worker → Settings → Bindings → Add → R2 bucket:
 *        Variable name: IMAGES   ·   Bucket: <your image library bucket>
 *   3. Worker → Settings → Variables & Secrets → Add → Secret:
 *        Name: LIBRARY_KEY   ·   Value: <choose a passphrase>
 *   4. (For AI auto-tagging on upload) Add a second Secret:
 *        Name: ANTHROPIC_API_KEY   ·   Value: <key from console.anthropic.com>
 *      Without it, uploads still work — they just aren't auto-tagged.
 *   5. Redeploy. The Worker URL (…workers.dev) + passphrase go into the
 *      frontend's setup panel (image-library.html).
 *
 * ENDPOINTS:
 *   GET    /img/<key>            public — serves the image (this is the shareable URL);
 *                                         manifest.json is NOT served here (contains client addresses)
 *   GET    /api/manifest         gated  — the manifest.json contents
 *   GET    /api/list             gated  — all objects w/ tags [{key,size,uploaded,tags,contentType}]
 *   POST   /api/upload?key=<k>   gated  — body = file bytes; headers: Content-Type, X-Image-Tags
 *   PATCH  /api/tags?key=<k>     gated  — JSON body {"tags":"a,b,c"} (rewrites object metadata)
 *   DELETE /api/image?key=<k>    gated  — deletes the object
 *   POST   /api/autotag          gated  — JSON body {"key": "web/...", "vocab": {...}};
 *                                         Claude looks at the image and returns
 *                                         {category, tags, product, space, style, caption, shot}
 *   Gate: header  X-Library-Key: <LIBRARY_KEY>
 */

const ALLOWED_ORIGINS = ["https://erikagonzalez103-hash.github.io"];

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const ok =
    ALLOWED_ORIGINS.includes(origin) ||
    origin.startsWith("http://localhost") ||
    origin.startsWith("http://127.0.0.1");
  return {
    "Access-Control-Allow-Origin": ok ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,X-Library-Key,X-Image-Tags",
    "Vary": "Origin",
  };
}

function json(data, status, cors) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

// Object keys: keep it URL-friendly; spaces become dashes
function cleanKey(raw) {
  return raw.trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._/-]/g, "");
}

function tagsOf(customMetadata) {
  if (!customMetadata) return "";
  if (customMetadata.tags) return customMetadata.tags;
  // Fallback for images tagged before this Worker existed, under other metadata keys
  return Object.values(customMetadata).join(",");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    // ---- Public image serving ----
    if (url.pathname.startsWith("/img/") && request.method === "GET") {
      const key = decodeURIComponent(url.pathname.slice(5));
      // The manifest aggregates captions/filenames with client addresses — never serve it publicly
      if (key === "manifest.json") return json({ error: "manifest is private — use /api/manifest" }, 403, cors);
      const obj = await env.IMAGES.get(key);
      if (!obj) return new Response("Not found", { status: 404, headers: cors });
      const headers = new Headers(cors);
      obj.writeHttpMetadata(headers);
      if (!headers.get("Content-Type")) headers.set("Content-Type", "application/octet-stream");
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
      headers.set("ETag", obj.httpEtag);
      return new Response(obj.body, { headers });
    }

    // ---- Gated management API ----
    if (url.pathname.startsWith("/api/")) {
      if (request.headers.get("X-Library-Key") !== env.LIBRARY_KEY) {
        return json({ error: "unauthorized" }, 401, cors);
      }

      if (url.pathname === "/api/manifest" && request.method === "GET") {
        const obj = await env.IMAGES.get("manifest.json");
        if (!obj) return json({ error: "not found" }, 404, cors);
        return new Response(obj.body, {
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...cors },
        });
      }

      if (url.pathname === "/api/list" && request.method === "GET") {
        const out = [];
        let cursor;
        do {
          const page = await env.IMAGES.list({
            cursor,
            include: ["customMetadata", "httpMetadata"],
          });
          for (const o of page.objects) {
            out.push({
              key: o.key,
              size: o.size,
              uploaded: o.uploaded,
              tags: tagsOf(o.customMetadata),
              contentType: o.httpMetadata?.contentType || "",
            });
          }
          cursor = page.truncated ? page.cursor : undefined;
        } while (cursor && out.length < 10000);
        return json({ images: out }, 200, cors);
      }

      if (url.pathname === "/api/upload" && request.method === "POST") {
        const key = cleanKey(url.searchParams.get("key") || "");
        if (!key) return json({ error: "missing key" }, 400, cors);
        // Safety net: before overwriting the manifest (Tag Manager saves,
        // bulk edits), snapshot the current version so any bad save can be
        // rolled back from manifest-backups/ in the bucket.
        if (key === "manifest.json") {
          try {
            const prev = await env.IMAGES.get("manifest.json");
            if (prev) {
              const stamp = new Date().toISOString().replace(/[:.]/g, "-");
              await env.IMAGES.put("manifest-backups/" + stamp + ".json", prev.body, {
                httpMetadata: { contentType: "application/json" },
              });
            }
          } catch (e) { /* backup is best-effort; never block the save */ }
        }
        const tags = request.headers.get("X-Image-Tags") || "";
        await env.IMAGES.put(key, request.body, {
          httpMetadata: { contentType: request.headers.get("Content-Type") || "application/octet-stream" },
          customMetadata: { tags },
        });
        return json({ ok: true, key }, 200, cors);
      }

      if (url.pathname === "/api/tags" && request.method === "PATCH") {
        const key = url.searchParams.get("key") || "";
        const body = await request.json();
        const obj = await env.IMAGES.get(key);
        if (!obj) return json({ error: "not found" }, 404, cors);
        // R2 metadata is immutable — rewrite the object with new tags
        await env.IMAGES.put(key, obj.body, {
          httpMetadata: obj.httpMetadata,
          customMetadata: { tags: String(body.tags || "") },
        });
        return json({ ok: true, key }, 200, cors);
      }

      if (url.pathname === "/api/autotag" && request.method === "POST") {
        if (!env.ANTHROPIC_API_KEY) {
          return json({ error: "autotag not configured — add the ANTHROPIC_API_KEY secret" }, 501, cors);
        }
        const { key, vocab = {} } = await request.json();
        const obj = await env.IMAGES.get(key || "");
        if (!obj) return json({ error: "not found" }, 404, cors);

        const bytes = new Uint8Array(await obj.arrayBuffer());
        let bin = "";
        for (let i = 0; i < bytes.length; i += 32768) {
          bin += String.fromCharCode(...bytes.subarray(i, i + 32768));
        }
        const list = (a) => (Array.isArray(a) && a.length ? a.join(", ") : "(none yet)");
        const prompt =
          "You are tagging a photo for the image library of Eridion Glass, a custom glass company " +
          "(shower enclosures, mirrors, colorback-glass backsplashes, glass partitions, railings, wine rooms). " +
          "Classify this photo. Reuse the existing vocabulary below wherever it fits — only introduce a new " +
          "value when nothing existing applies. Use lowercase-hyphenated, SINGULAR values (bathroom, not " +
          "bathrooms; mirror, not mirrors). Never emit both a singular and plural form of the same word.\n" +
          "Existing categories: " + list(vocab.category) + "\n" +
          "Existing products: " + list(vocab.product) + "\n" +
          "Existing spaces: " + list(vocab.space) + "\n" +
          "Existing styles: " + list(vocab.style) + "\n" +
          "Existing tags: " + list(vocab.tags) + "\n" +
          "Existing shot types: " + list(vocab.shot) + "\n" +
          "Write the caption as one sentence describing the glass work shown, suitable for marketing use.";

        // Model string per TOOLS.md shared-infrastructure standard
        const apiResp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-6",
            max_tokens: 1024,
            tools: [{
              name: "record_image_tags",
              description: "Record the classification of the photo for the image library manifest.",
              strict: true,
              input_schema: {
                type: "object",
                additionalProperties: false,
                required: ["category", "tags", "product", "space", "style", "caption", "shot"],
                properties: {
                  category: { type: "string", description: "Single primary category" },
                  tags: { type: "array", items: { type: "string" } },
                  product: { type: "array", items: { type: "string" }, description: "Glass products visible" },
                  space: { type: "array", items: { type: "string" }, description: "Room/space types" },
                  style: { type: "array", items: { type: "string" }, description: "Glass style attributes" },
                  caption: { type: "string", description: "One-sentence marketing-ready description" },
                  shot: { type: "string", description: "Shot type, e.g. install-wide or detail-macro" },
                },
              },
            }],
            tool_choice: { type: "tool", name: "record_image_tags" },
            messages: [{
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: obj.httpMetadata?.contentType || "image/jpeg",
                    data: btoa(bin),
                  },
                },
                { type: "text", text: prompt },
              ],
            }],
          }),
        });
        if (!apiResp.ok) {
          return json({ error: "anthropic api error", detail: (await apiResp.text()).slice(0, 500) }, 502, cors);
        }
        const data = await apiResp.json();
        const toolUse = (data.content || []).find((b) => b.type === "tool_use");
        if (!toolUse) return json({ error: "no classification returned" }, 502, cors);
        return json({ ok: true, ...toolUse.input }, 200, cors);
      }

      if (url.pathname === "/api/image" && request.method === "DELETE") {
        const key = url.searchParams.get("key") || "";
        await env.IMAGES.delete(key);
        return json({ ok: true, key }, 200, cors);
      }

      return json({ error: "unknown endpoint" }, 404, cors);
    }

    return new Response("Eridion Image Library Worker — see /img/<key> or the management app.", {
      headers: { "Content-Type": "text/plain; charset=utf-8", ...cors },
    });
  },
};
