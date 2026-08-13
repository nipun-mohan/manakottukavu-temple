import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";
const ADMIN_EMAIL = "nipunmohanan@gmail.com";
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function authorized(request: Request) {
  const email = request.headers.get("cf-access-authenticated-user-email")?.trim().toLowerCase()
    ?? request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  return email === ADMIN_EMAIL;
}

async function ensureTable() {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS renovation_media (
    id TEXT PRIMARY KEY, object_key TEXT NOT NULL UNIQUE, caption_en TEXT NOT NULL DEFAULT '',
    caption_ml TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();
}

export async function POST(request: Request) {
  if (!authorized(request)) return Response.json({ error: "Administrator sign-in required." }, { status: 401 });
  const form = await request.formData();
  const file = form.get("image");
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size < 1 || file.size > 10 * 1024 * 1024) {
    return Response.json({ error: "Choose a JPG, PNG, or WebP image up to 10 MB." }, { status: 400 });
  }
  const id = crypto.randomUUID();
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const key = `renovation/uploads/${id}.${extension}`;
  await env.MEDIA.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=86400" } });
  try {
    await ensureTable();
    await env.DB.prepare("INSERT INTO renovation_media(id,object_key,caption_en,caption_ml) VALUES(?,?,?,?)")
      .bind(id, key, String(form.get("captionEn") || "").trim().slice(0, 160), String(form.get("captionMl") || "").trim().slice(0, 160)).run();
  } catch (error) { await env.MEDIA.delete(key); throw error; }
  return Response.json({ ok: true, id, url: `/api/renovation-media/${id}` });
}
