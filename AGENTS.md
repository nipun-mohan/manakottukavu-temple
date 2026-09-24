# Base44 Dev Environment

## Overview
Bilingual (English/Malayalam) website for Manakottukavu Temple, Mullurkkara.
Built with Next.js 16 + vinext (Vite-powered Next.js) + Cloudflare bindings (D1, R2).

## Stack
- **Framework**: Next.js 16 via `vinext` (Vite dev server, not `next dev`)
- **Runtime**: Node 22+
- **Database**: Cloudflare D1 (SQLite) — emulated locally by Miniflare via `@cloudflare/vite-plugin`
- **Storage**: Cloudflare R2 — emulated locally by Miniflare
- **Styling**: Tailwind CSS 4
- **ORM**: Drizzle (schema is empty; tables are created at runtime by API routes)

## Running the app
```bash
docker compose -f docker-compose.base44.yml up -d
```
The dev server listens on port 3000 inside the container (vinext defaults to 3000, not Vite's 5173).

## Key setup notes
- **vinext CLI overrides `server.host`**: The `vinext dev` CLI defaults `--hostname` to `localhost`, which overrides `server.host` in `vite.config.ts`. The compose command passes `--hostname 0.0.0.0` to bind all interfaces for Docker port forwarding.
- **vinext origin check**: vinext has its own cross-origin request protection (separate from Vite's). `next.config.ts` sets `allowedDevOrigins` using `BASE44_PUBLIC_HOST_SUFFIX` so the preview origin is allowed.
- **Vite allowed hosts**: `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is passed from the platform environment for Vite's own host check.
- **File watching**: `CODEX_SANDBOX=seatbelt` enables polling-based file watching (needed for Docker bind mounts).
- **No external credentials needed**: D1 and R2 are emulated locally by Miniflare. Admin auth uses Cloudflare Access / OpenAI headers injected by the hosting platform.

## Verifying the app
- `curl http://localhost:3000/` — homepage should return 200 with temple HTML
- `curl http://localhost:3000/api/offerings` — returns seeded offering list from D1
- `curl http://localhost:3000/api/renovation-media` — returns media list (empty by default)

## Dev server quirks
- First request triggers compilation (~1s). Subsequent requests are fast.
- The `compile:` time in logs shows a bogus large number — this is a vinext display bug, not a real issue.
- workerd runs alongside Vite on a random port; Vite proxies requests through it for D1/R2 access.
