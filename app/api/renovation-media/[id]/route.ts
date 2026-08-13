import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await env.DB.prepare("SELECT object_key FROM renovation_media WHERE id=?").bind(id).first<{ object_key: string }>();
  if (!row) return new Response("Not found", { status: 404 });
  const object = await env.MEDIA.get(row.object_key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=86400");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(object.body, { headers });
}
