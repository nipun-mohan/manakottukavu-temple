import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

async function ensureTable() {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS renovation_media (
    id TEXT PRIMARY KEY, object_key TEXT NOT NULL UNIQUE, caption_en TEXT NOT NULL DEFAULT '',
    caption_ml TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS hidden_renovation_media (id TEXT PRIMARY KEY)").run();
}

export async function GET() {
  await ensureTable();
  const { results } = await env.DB.prepare(`SELECT id, '/api/renovation-media/' || id AS url,
    caption_en AS captionEn, caption_ml AS captionMl, created_at AS createdAt
    FROM renovation_media ORDER BY created_at DESC`).all();
  const hidden = await env.DB.prepare("SELECT id FROM hidden_renovation_media").all<{ id: string }>();
  return Response.json({ media: results, hiddenBuiltInIds: hidden.results.map(item => item.id) }, { headers: { "Cache-Control": "no-store" } });
}
