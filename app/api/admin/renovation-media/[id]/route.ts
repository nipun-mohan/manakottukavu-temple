import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";
const ADMIN_EMAIL = "nipunmohanan@gmail.com";
function authorized(request: Request) {
  const email = request.headers.get("cf-access-authenticated-user-email")?.trim().toLowerCase()
    ?? request.headers.get("oai-authenticated-user-email")?.trim().toLowerCase();
  return email === ADMIN_EMAIL;
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!authorized(request)) return Response.json({ error: "Administrator sign-in required." }, { status: 401 });
  const { id } = await params;
  const row = await env.DB.prepare("SELECT object_key FROM renovation_media WHERE id=?").bind(id).first<{ object_key: string }>();
  if (!row) return Response.json({ error: "Image not found." }, { status: 404 });
  await env.MEDIA.delete(row.object_key);
  await env.DB.prepare("DELETE FROM renovation_media WHERE id=?").bind(id).run();
  return Response.json({ ok: true });
}
