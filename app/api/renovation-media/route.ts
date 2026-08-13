import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

async function ensureTable() {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS renovation_media (
    id TEXT PRIMARY KEY, object_key TEXT NOT NULL UNIQUE, caption_en TEXT NOT NULL DEFAULT '',
    caption_ml TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();
}

export async function GET() {
  await ensureTable();
  const { results } = await env.DB.prepare(`SELECT id, '/api/renovation-media/' || id AS url,
    caption_en AS captionEn, caption_ml AS captionMl, created_at AS createdAt
    FROM renovation_media ORDER BY created_at DESC`).all();
  return Response.json({ media: results }, { headers: { "Cache-Control": "no-store" } });
}
