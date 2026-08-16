import { env } from "cloudflare:workers";
import { ensureOfferings } from "../../offerings/route";
import type { Offering } from "../../../../lib/offerings";

export const dynamic = "force-dynamic";
const ADMIN_EMAIL = "nipunmohanan@gmail.com";

function authorized(request: Request) {
  const email = request.headers.get("cf-access-authenticated-user-email")?.trim().toLowerCase()
    ?? request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  return email === ADMIN_EMAIL;
}

export async function GET(request: Request) {
  if (!authorized(request)) return Response.json({ error: "Administrator sign-in required." }, { status: 401 });
  await ensureOfferings();
  const { results } = await env.DB.prepare("SELECT id,name_en AS nameEn,name_ml AS nameMl,price,note_en AS noteEn,note_ml AS noteMl,sort_order AS sortOrder FROM offerings ORDER BY sort_order").all();
  return Response.json({ offerings: results, email: ADMIN_EMAIL });
}

export async function PUT(request: Request) {
  if (!authorized(request)) return Response.json({ error: "Administrator sign-in required." }, { status: 401 });
  const payload = await request.json() as { offerings?: Offering[] };
  if (!Array.isArray(payload.offerings) || payload.offerings.length < 1 || payload.offerings.length > 100) {
    return Response.json({ error: "Invalid offering list." }, { status: 400 });
  }
  const items = payload.offerings.map((item, index) => ({
    id: Number(item.id), nameEn: String(item.nameEn || "").trim(), nameMl: String(item.nameMl || "").trim(),
    price: item.price == null ? null : Number(item.price), noteEn: String(item.noteEn || "").trim(), noteMl: String(item.noteMl || "").trim(), sortOrder: index + 1,
  }));
  if (items.some(item => !Number.isInteger(item.id) || !item.nameEn || !item.nameMl || (item.price != null && (!Number.isInteger(item.price) || item.price < 0)))) {
    return Response.json({ error: "Every offering needs valid names and a non-negative whole-number price." }, { status: 400 });
  }
  await ensureOfferings();
  const { results: existingRows } = await env.DB.prepare("SELECT id FROM offerings").all<{ id: number }>();
  const existingIds = new Set(existingRows.map(row => row.id));
  const keptIds = new Set(items.filter(item => item.id > 0 && existingIds.has(item.id)).map(item => item.id));
  const statements = [
    ...existingRows.filter(row => !keptIds.has(row.id)).map(row => env.DB.prepare("DELETE FROM offerings WHERE id=?").bind(row.id)),
    ...items.map(item => existingIds.has(item.id)
      ? env.DB.prepare("UPDATE offerings SET name_en=?,name_ml=?,price=?,note_en=?,note_ml=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(item.nameEn,item.nameMl,item.price,item.noteEn,item.noteMl,item.sortOrder,item.id)
      : env.DB.prepare("INSERT INTO offerings (name_en,name_ml,price,note_en,note_ml,sort_order) VALUES (?,?,?,?,?,?)").bind(item.nameEn,item.nameMl,item.price,item.noteEn,item.noteMl,item.sortOrder)),
  ];
  await env.DB.batch(statements);
  const { results } = await env.DB.prepare("SELECT id,name_en AS nameEn,name_ml AS nameMl,price,note_en AS noteEn,note_ml AS noteMl,sort_order AS sortOrder FROM offerings ORDER BY sort_order").all();
  return Response.json({ ok: true, offerings: results });
}

export async function DELETE(request: Request) {
  if (!authorized(request)) return Response.json({ error: "Administrator sign-in required." }, { status: 401 });
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) return Response.json({ error: "Invalid offering." }, { status: 400 });
  await ensureOfferings();
  const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM offerings").first<{ total: number }>();
  if ((count?.total || 0) <= 1) return Response.json({ error: "At least one offering must remain in the list." }, { status: 400 });
  const result = await env.DB.prepare("DELETE FROM offerings WHERE id=?").bind(id).run();
  if (!result.meta.changes) return Response.json({ error: "Offering not found." }, { status: 404 });
  const { results: remaining } = await env.DB.prepare("SELECT id FROM offerings ORDER BY sort_order,id").all<{ id: number }>();
  await env.DB.batch(remaining.map((item, index) => env.DB.prepare("UPDATE offerings SET sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(index + 1, item.id)));
  return Response.json({ ok: true });
}
