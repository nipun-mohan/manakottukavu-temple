import { env } from "cloudflare:workers";
import { defaultOfferings } from "../../../lib/offerings";

export const dynamic = "force-dynamic";

export async function ensureOfferings() {
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS offerings (
    id INTEGER PRIMARY KEY, name_en TEXT NOT NULL, name_ml TEXT NOT NULL,
    price INTEGER, note_en TEXT NOT NULL DEFAULT '', note_ml TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`).run();
  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM offerings").first<{ total: number }>();
  if (!count?.total) {
    await env.DB.batch(defaultOfferings.map(item => env.DB.prepare(
      "INSERT INTO offerings (id,name_en,name_ml,price,note_en,note_ml,sort_order) VALUES (?,?,?,?,?,?,?)"
    ).bind(item.id, item.nameEn, item.nameMl, item.price, item.noteEn, item.noteMl, item.sortOrder)));
  }
}

export async function GET() {
  try {
    await ensureOfferings();
    const { results } = await env.DB.prepare("SELECT id,name_en AS nameEn,name_ml AS nameMl,price,note_en AS noteEn,note_ml AS noteMl,sort_order AS sortOrder FROM offerings ORDER BY sort_order").all();
    return Response.json({ offerings: results }, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch {
    return Response.json({ offerings: defaultOfferings, fallback: true });
  }
}
