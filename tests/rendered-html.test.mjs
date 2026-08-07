import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Manakottukavu site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Manakottukavu/);
  assert.match(html, /Sacred Renewal/);
  assert.match(html, /Support renovation/);
  assert.match(html, /Pushpanjali/);
  assert.match(html, /Mullurkkara/);
  assert.match(html, /മുള്ളൂർക്കര/);
  assert.match(html, /Gallery/);
  assert.match(html, /Facebook/);
  assert.doesNotMatch(html, /Google rating|4\.8|10\.676|76\.260/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});
