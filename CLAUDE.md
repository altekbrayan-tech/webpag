# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the website + forms backend for **Clouddec** - a Colombian IT services company offering custom
software development, cybersecurity, cloud infrastructure, AI agents, and IT consulting.

- **Frontend** (`html/`): static HTML5/CSS3/vanilla JS, no build step, served by Nginx.
- **Backend** (`backend/`): Node.js + Express API that receives the 3 site forms (contacto, cotización,
  postulaciones) and persists them to **PostgreSQL**, plus sends an email notification per submission.
- All three pieces (`web`, `api`, `db`) run as Docker containers behind Traefik/Dokploy.

**Stack:** Static HTML5 + CSS3 (CSS Variables + Grid/Flexbox) + Vanilla JS · Node.js + Express + PostgreSQL API ·
Nginx · Docker Compose · Traefik

---

## Development Commands

### Frontend only (no backend/forms)
```bash
cd html && python -m http.server 8000
# Open http://localhost:8000 — forms will fail without the API running
```

### Full stack locally (frontend + API + Postgres)
```bash
cp .env.example .env   # edit POSTGRES_*/SMTP_* as needed
docker compose up --build
# Site: http://localhost (only if you add a `ports:` mapping to web for local testing;
# in production Traefik handles routing, so no ports are published by default)
```

### Backend only (fast iteration on the API)
```bash
cd backend
cp .env.example .env   # point PGHOST etc. at a local/dev Postgres
npm install
npm run dev             # node --watch src/server.js
```

### Production Deployment
```bash
docker compose up -d --build
# Traefik routes web.clouddec.com -> web (Nginx), which proxies /api/ -> api:3000 -> Postgres
```

---

## Project Structure

```
webpag/
├── html/                          # Frontend (served as Nginx document root)
│   ├── index.html, nosotros.html, servicios.html, portafolio.html, blog.html
│   ├── contacto.html, cotizacion.html, trabaja-con-nosotros.html   # forms -> /api/*
│   ├── privacidad.html, terminos.html
│   ├── css/style.css              # Design system ("Aurora Grid": violeta + cian sobre fondo oscuro)
│   └── js/main.js                 # Shared JS: mobile menu, scroll-reveal, FAQ, submitFormTo()
├── backend/                       # API Node.js + Express + PostgreSQL
│   ├── src/
│   │   ├── server.js              # App entrypoint, mounts routes + middleware
│   │   ├── db.js                  # pg Pool (DATABASE_URL or PG* env vars)
│   │   ├── mailer.js              # nodemailer SMTP notifications (no-op if SMTP not configured)
│   │   ├── middleware/antiSpam.js # honeypot + rate-limit
│   │   ├── utils/validate.js      # server-side required-field/email validation
│   │   └── routes/{contacto,cotizacion,postulaciones}.js
│   ├── db/init.sql                # Schema, auto-run by postgres image on first boot
│   ├── Dockerfile
│   └── package.json
├── public/                        # Static assets (logo, images) -> /public in container
├── Dockerfile                     # Nginx image; proxies /api/ to the api container
├── docker-compose.yml             # 3 services: web, api, db (+ pgdata volume)
├── default.conf                   # Same Nginx config as fallback reference
├── .env.example                   # POSTGRES_*/SMTP_*/NOTIFY_TO for docker-compose
└── CLAUDE.md                      # This file
```

---

## Architecture & Key Patterns

### Frontend
- **All pages in `html/`**, no templating engine — navbar/footer duplicated per file (deliberate: no build
  step). When adding/editing nav links, update every HTML file.
- **`html/js/main.js`** is loaded at the bottom of every page and centralizes: mobile menu toggle, FAQ
  accordion, `IntersectionObserver` scroll-reveal (auto-applies to `.card`/`.faq-item`/`.testimonial-card`/
  `.glass-panel`), and `submitFormTo(endpoint, formId, submitBtnId, successId, errorId, defaultLabel)` — the
  helper every form page calls to POST JSON to the API and swap in a success/error panel.
- **Forms** (`contacto.html`, `cotizacion.html`, `trabaja-con-nosotros.html`) POST JSON to `/api/contacto`,
  `/api/cotizacion`, `/api/postulaciones` respectively (same-origin, via the Nginx proxy — no CORS needed).
  Each form has a hidden honeypot input (`name="_hp"`, class `.form-hp`) for spam filtering.

### CSS Architecture (`html/css/style.css`)
- **CSS Variables** (`:root`) drive theming — reused as-is in many inline `style="color: var(--accent)"`
  attributes across pages, so changing a variable's value re-themes the whole site without touching HTML.
  Key vars: `--primary-bg`, `--secondary-bg`, `--accent` (violet), `--accent-2` (cyan), `--accent-gradient`,
  `--text-main`, `--text-muted`, `--border-color`, `--glass-bg`, `--radius-sm/md/lg`.
- **Aurora background + grain texture** applied globally via `body::before`/`body::after` (fixed, negative
  z-index) — no per-page markup needed for the background effect.
- **`.bento-grid`** utility for asymmetric service-card layouts (opt-in per section); `.reveal`/`.in-view`
  classes pair with the scroll-reveal JS; `.step-num` for numbered process circles.
- **Dark theme only** — no light mode toggle.

### Backend / API
- Endpoints: `POST /api/contacto`, `POST /api/cotizacion`, `POST /api/postulaciones`, `GET /api/health`.
- Each route validates required fields server-side (`backend/src/utils/validate.js`), inserts into Postgres
  via a connection pool (`backend/src/db.js`), then fires an async email notification
  (`backend/src/mailer.js`) — a failed email does **not** roll back the DB insert.
- `backend/src/middleware/antiSpam.js`: honeypot (silently accepts+drops bot submissions with `_hp` filled)
  and an `express-rate-limit` cap of 8 requests / 15 min per IP on all three form routes.
- Tables: `contact_messages`, `quote_requests`, `job_applications` — schema in `backend/db/init.sql`, applied
  automatically by the official `postgres` image on first container start (empty volume only).

### Docker/Nginx Configuration
- **`web` (root `Dockerfile`)**: `nginx:alpine`, embeds a minimal `default.conf` with `location /api/` doing
  `proxy_pass http://api:3000/api/` (same-origin API, zero CORS, zero extra Traefik routers) plus the SPA
  fallback `try_files $uri $uri/ /index.html`.
- **`api` (`backend/Dockerfile`)**: `node:22-alpine`, installs prod deps, runs `node src/server.js` on port
  3000. Not exposed to `dokploy-network` — only reachable from `web` via the internal Compose network.
- **`db`**: `postgres:16-alpine`, named volume `pgdata`, mounts `backend/db/init.sql` into
  `/docker-entrypoint-initdb.d/`. Not exposed externally.
- **`docker-compose.yml`**: `web` joins both `dokploy-network` (external, for Traefik) and `internal`;
  `api`/`db` join only `internal`. Traefik labels on `web` are unchanged from before (`Host(`web.clouddec.com`)`,
  `websecure`, `letsencrypt`, forced port 80).
- Env vars come from a root `.env` (see `.env.example`): `POSTGRES_USER/PASSWORD/DB`, `SMTP_HOST/PORT/USER/
  PASS/FROM`, `NOTIFY_TO`. Never commit a real `.env` — only `.env.example`.

### SEO & Schema
- Each page has unique `<title>`, meta description, OG tags; `index.html` includes JSON-LD `ITUtility` schema.
- `sitemap.xml` and `robots.txt` in `html/` root — kept in sync when pages are added/removed.
- SEO/positioning work itself (keyword strategy, content, backlinks) is intentionally out of scope for the
  current architecture and is planned as separate future work.

---

## Common Tasks

### Add a New Page
1. Create `html/nueva-pagina.html` (copy structure from `nosotros.html`, including the `<script src="js/main.js">`
   at the bottom).
2. Update navigation in **all HTML files** (navbar + mobile menu + footer links).
3. Add to `html/sitemap.xml`.

### Modify Styles
Edit `html/css/style.css` — uses CSS variables for colors, spacing, radius (see list above). Because those
variable names are reused inline across pages, most re-theming only requires editing `:root`.

### Add/Change a Form Field
1. Add the `<input>`/`<select>` to the form HTML (keep `name="..."` matching the API's expected body key).
2. Update the matching route in `backend/src/routes/*.js` (destructure the field, add to `requireFields(...)`
   if mandatory, add to the SQL `INSERT`).
3. Add the column to `backend/db/init.sql` **and** apply it manually to any already-running Postgres volume
   (the init script only runs once, on an empty volume) — e.g. `ALTER TABLE ... ADD COLUMN ...` via
   `docker compose exec db psql -U $POSTGRES_USER -d $POSTGRES_DB`.

### Test the API Locally
```bash
docker compose up --build -d
docker compose exec web wget -qO- http://localhost/api/health
docker compose exec db psql -U $POSTGRES_USER -d $POSTGRES_DB -c "SELECT * FROM contact_messages;"
```

### Docker Deploy Changes
```bash
docker compose up --build -d
# Traefik auto-detects via labels on `web`, provisions SSL via Let's Encrypt
```

---

## Important Notes

1. **No build step on the frontend** — pure static files, edit HTML/CSS/`js/main.js` directly.
2. **No shared HTML templates** — navbar/footer duplicated in every HTML file.
3. **Backend has its own `package.json`/npm** — the frontend still doesn't need Node.js to serve.
4. **`/api/*` only works behind the `web` Nginx proxy** (or with the API's own port hit directly in dev) —
   opening `html/index.html` as a plain file, or serving `html/` alone without `api`+`db` running, will make
   the forms fail with a network error (by design — they now report real failures, unlike the old `no-cors`
   webhook approach).
5. **Traefik labels** live only on `web` in `docker-compose.yml`; `api`/`db` are internal-only.
6. **Public assets** referenced as `/public/...` in HTML (served from `/usr/share/nginx/html/public`).
7. **Dark theme only** — no light mode toggle.
8. **Secrets** live only in a local, gitignored `.env` — `.env.example` (root) and `backend/.env.example` are
   the templates to copy.

---

## Common Issues

| Issue | Solution |
|-------|----------|
| Changes not showing in Docker | Rebuild: `docker compose up --build --force-recreate` |
| Traefik not routing | Check labels in `docker-compose.yml` on the `web` service |
| CSS not loading | Verify `href="css/style.css"` path (relative to `html/`) |
| Images 404 | Ensure `public/` copied in Dockerfile, referenced as `/public/...` |
| Mobile menu not working | Check hamburger button ID matches `js/main.js` (`hamburgerBtn`/`mobileMenu`) |
| Form submits but always errors | Confirm `api` container is healthy and `db` passed its healthcheck; check `docker compose logs api` |
| Form "succeeds" but no row in DB | Check for a filled honeypot field (`_hp`) — that's a silent bot-drop by design |
| No notification email arriving | `SMTP_*` env vars unset/wrong — API logs `[mailer] SMTP no configurado` and still saves to DB |

---

## Project-Specific Notes

- **Company**: Clouddec (Colombia, Bogotá) - Software dev, Cloud, Cybersecurity, AI Agents, Automation (n8n)
- **Contact**: contacto@clouddec.com, +57 301 945 4222
- **Domain**: web.clouddec.com (configured in docker-compose.yml Traefik labels)
- **WhatsApp**: +57 301 945 4222 (floating button on all pages)
- **Font**: Inter (Google Fonts) + FontAwesome 6.4 (CDN)
