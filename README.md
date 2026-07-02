# Personal Tech Blog

A personal blog I built to write about tech and coding. Full-stack TypeScript with a React frontend, Express backend, and PostgreSQL via Prisma. Deployed on Render.

**Live demo:** https://my-blog-lfzt.onrender.com

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express 5, TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Session-based (express-session + bcrypt)
- **Deployment:** Render (web service + managed PostgreSQL)

## Features

- Write and publish posts in Markdown with syntax highlighting
- Draft and publish workflow — save as draft or publish directly from the editor
- Admin login to create, edit, and delete articles
- Comment section on each article (no login required)
- Responsive design, mobile-friendly
- Dark mode support (follows system preference)

## How it works

The frontend is a React SPA served statically by the Express server. The backend exposes a REST API under `/api`. Authentication is session-based. Login stores a session cookie, and protected routes check the session before allowing writes.

Prisma handles all DB queries and migrations. On deployment, `prisma migrate deploy` runs automatically so the schema is always up to date.

## Local setup

```bash
# 1. Clone the repo
git clone https://github.com/XiaoweiDev2025/my-blog.git
cd my-blog

# 2. Install dependencies
cd client && npm install
cd ../server && npm install

# 3. Set up environment variables
cp .env.example server/.env
# Fill in DATABASE_URL, SESSION_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD_HASH

# 4. Run migrations
cd server && npx prisma migrate dev --schema prisma/schema.prisma

# 5. Start dev servers (run in separate terminals)
cd client && npm run dev
cd server && npm run dev
```

The client runs on `http://localhost:5173` and the server on `http://localhost:3001`.

To generate a bcrypt hash for your admin password:
```bash
cd server && npx tsx scripts/hash-password.ts yourpassword
```

## Deployment

Deployed on Render using `render.yaml`. The config defines both the web service and the PostgreSQL database. Render automatically injects `DATABASE_URL` into the server environment.

Push to `main` triggers an automatic redeploy.

## Docs

- [PROJECT_DOCS.md](PROJECT_DOCS.md) — architecture, API reference, database design, security measures, environment variables, and deployment pipeline
- [BUGFIX_LOG.md](BUGFIX_LOG.md) — record of bugs found after deployment, with root cause analysis and fixes
