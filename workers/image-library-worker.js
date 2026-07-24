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
 *   4. Redeploy. The Worker URL (…workers.dev) + passphrase go into the
 *      frontend's setup panel (image-library.html).
 *
 * ENDPOINTS:
 *   GET    /img/<key>            public — serves the image (this is the shareable URL)
 *   GET    /api/list             gated  — all objects w/ tags [{key,size,uploaded,tags,contentType}]
 *   POST   /api/upload?key=<k>   gated  — body = file bytes; headers: Content-Type, X-Image-Tags
 *   PATCH  /api/tags?key=<k>     gated  — JSON body {"tags":"a,b,c"} (rewrites object metadata)
 *   DELETE /api/image?key=<k>    gated  — deletes the object
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
