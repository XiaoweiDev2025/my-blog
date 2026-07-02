# PROJECT DOCS

Complete technical documentation for this full-stack blog project.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [Architecture](#3-architecture)
4. [Database Design](#4-database-design)
5. [Authentication](#5-authentication)
6. [Server Layers](#6-server-layers)
7. [API Reference](#7-api-reference)
8. [Frontend Architecture](#8-frontend-architecture)
9. [Features](#9-features)
10. [Utility Functions](#10-utility-functions)
11. [Security Measures](#11-security-measures)
12. [Tailwind CSS Patterns](#12-tailwind-css-patterns)
13. [Environment Variables](#13-environment-variables)
14. [Deployment Pipeline](#14-deployment-pipeline)

---

## 1. Project Overview

A personal blogging platform built with React, Express, and PostgreSQL. The Express server serves both the REST API and the React frontend as static files, so only a single service needs to be deployed.

**Tech stack:**
- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express 5, TypeScript
- Database: PostgreSQL + Prisma ORM
- Auth: Session-based (express-session + bcrypt)
- Deployment: Render (web service + managed PostgreSQL)

---

## 2. File Structure

```
my-blog/
├── client/                   # React frontend
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── api/              # API call functions
│   │   │   ├── client.ts     # shared request() helper
│   │   │   ├── auth.ts
│   │   │   ├── getArticles.ts
│   │   │   ├── getArticleById.ts
│   │   │   ├── createArticle.ts
│   │   │   ├── updateArticle.ts
│   │   │   └── deleteArticles.ts
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleAdminActions.tsx
│   │   │   ├── CommentSection.tsx
│   │   │   └── NewArticleCTA.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── ArticleDetail.tsx
│   │   │   ├── ArticleEditPage.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── About.tsx
│   │   │   └── NotFound.tsx
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx
│   │   ├── styles/
│   │   │   └── articleStyles.ts
│   │   ├── types/
│   │   │   ├── Article.ts
│   │   │   └── ArticleProps.ts
│   │   ├── assets/
│   │   │   └── me.png
│   │   ├── App.tsx
│   │   ├── Layout.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   └── tailwind.config.js
│
├── server/                   # Express backend
│   ├── api/
│   │   ├── article.ts        # request handlers for articles
│   │   └── comments.ts
│   ├── middlewares/
│   │   ├── requireAuth.ts
│   │   └── errorHandler.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── routes/
│   │   ├── articles.ts
│   │   ├── auth.ts
│   │   └── comments.ts
│   ├── services/
│   │   ├── articleService.ts
│   │   └── commentService.ts
│   ├── types/
│   │   ├── article.ts
│   │   └── express-session.d.ts
│   ├── utils/
│   │   ├── asyncHandler.ts
│   │   └── prismaError.ts
│   ├── scripts/
│   │   └── hash-password.ts  # utility to generate bcrypt hash for admin password
│   ├── index.ts              # server entry point
│   └── prismaClient.ts       # shared Prisma client instance
│
├── deploy.sh                 # build script for Render
├── render.yaml               # Render service configuration
├── BUGFIX_LOG.md
└── PROJECT_DOCS.md
```

---

## 3. Architecture

### Request Flow

```
Browser
  ↕  (HTTP + session cookie)
Express Server (index.ts)
  ├── /api/auth/*       → routes/auth.ts
  ├── /api/articles/*   → routes/articles.ts → api/article.ts → services/articleService.ts
  ├── /api/.../comments → routes/comments.ts → api/comments.ts → services/commentService.ts
  └── /* (all other)   → serves client/dist/index.html (React SPA)
       ↕
PostgreSQL via Prisma
```

### Why Single Service

The frontend is built into static files and copied into `server/dist/client` during the build. Express serves these files directly, so there is no need for a separate frontend host. This simplifies deployment and avoids cross-origin cookie issues in production.

---

## 4. Database Design

### Schema

```prisma
model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique
  password String    // bcrypt hash
  role     String    @default("user")
  articles Article[]
}

model Article {
  id        Int       @id @default(autoincrement())
  title     String
  summary   String
  content   String    @db.Text
  authorId  Int
  published Boolean   @default(true)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  author    User      @relation(fields: [authorId], references: [id])
  comments  Comment[]
}

model Comment {
  id        Int      @id @default(autoincrement())
  articleId Int
  author    String   @default("Anonymous") @db.VarChar(50)
  body      String   @db.Text
  createdAt DateTime @default(now())
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  @@index([articleId, createdAt])
}
```

### Design Decisions

- **`published` field:** Controls draft vs published state. Defaults to `true` so existing articles are unaffected when the column is added. Public endpoints only return `published: true` articles.
- **Comment cascade delete:** When an article is deleted, all its comments are automatically deleted. This avoids orphaned records.
- **Comment index:** `@@index([articleId, createdAt])` speeds up the most common query — fetching comments for a specific article ordered by time.
- **Password storage:** Only a bcrypt hash is stored, never the plaintext password.

---

## 5. Authentication

### Flow

This is a single-admin blog. Credentials are stored in environment variables, not in the database.

```
Login request (username + password)
  → server checks username against ADMIN_USERNAME env var
  → server verifies password against ADMIN_PASSWORD_HASH using bcrypt.compare()
  → on success: upsert admin user into User table (creates if not exists)
  → store { id, username } in session
  → browser receives sid cookie
```

On every subsequent request, the browser sends the `sid` cookie. The server reads `req.session.user` to determine who is making the request.

### requireAuth Middleware

```ts
export function requireAuth(req, res, next) {
    if (req.session?.user) return next();
    return res.status(401).json({ error: "Unauthorized" });
}
```

Applied to all write endpoints: `POST /api/articles`, `PUT /api/articles/:id`, `DELETE /api/articles/:id`, `GET /api/articles/drafts`.

### Why upsert on login

The login system validates credentials against environment variables, but articles need a real `authorId` from the `User` table. On every login, the server runs an upsert to ensure the admin user exists in the database, then stores the DB id in the session. This bridges the two systems without requiring a separate setup step.

### Generating the admin password hash

```bash
cd server
npx tsx scripts/hash-password.ts yourpassword
```

Copy the output into the `ADMIN_PASSWORD_HASH` environment variable.

---

## 6. Server Layers

The server is split into three layers so each concern can change independently.

```
routes/articles.ts
  → defines URL patterns and HTTP methods
  → applies requireAuth where needed
  → delegates to api/article.ts

api/article.ts
  → parses request params and body
  → validates required fields
  → reads authorId from session (never from client body)
  → calls articleService

services/articleService.ts
  → executes Prisma queries
  → handles not-found cases
  → returns data to api layer
```

**Example — creating an article:**

```
POST /api/articles
  → requireAuth checks session
  → createArticle handler reads title/summary/content from body
  → reads authorId from req.session.user.id
  → calls articleService.create()
  → Prisma inserts row
  → returns { id }
```

---

## 7. API Reference

### Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/login | No | Login with username and password |
| POST | /api/auth/logout | No | Destroy session |
| GET | /api/auth/me | No | Returns `{ isAuth, user }` |

### Articles

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/articles | No | List all published articles |
| GET | /api/articles/drafts | Yes | List all draft articles |
| GET | /api/articles/:id | No | Get single article by id |
| POST | /api/articles | Yes | Create article |
| PUT | /api/articles/:id | Yes | Update article |
| DELETE | /api/articles/:id | Yes | Delete article |

### Comments

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /api/articles/:id/comments | No | List comments for an article |
| POST | /api/articles/:id/comments | No | Post a comment (no login required) |

---

## 8. Frontend Architecture

### Routing

All routes are client-side (React Router). The server returns `index.html` for any unrecognised path.

| Path | Page |
|------|------|
| `/` | Home — article list |
| `/articles/:id` | Article detail + comments |
| `/articles/new` | Create article (auth check on mount) |
| `/articles/:id/edit` | Edit article (auth check on mount) |
| `/login` | Login page |
| `/about` | About page |

### API Layer

All API calls go through `client/src/api/client.ts`:

```ts
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
        credentials: "include",   // always send session cookie
        ...init,
    });
    if (!res.ok) {
        // parse error message from response body
        throw err;
    }
    if (res.status === 204) return undefined as unknown as T;
    return res.json();
}
```

`credentials: "include"` is critical — without it, the browser will not send the session cookie, and all authenticated endpoints will return 401.

### Auth State

Components that need to show/hide admin UI call `me()` on mount:

```ts
const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
    me().then(data => setIsAdmin(data.isAuth)).catch(() => {});
}, []);
```

This ensures admin-only UI (create, edit, delete buttons) is never shown to visitors.

---

## 9. Features

### Draft / Publish

Articles have a `published` boolean field. The public article list (`GET /api/articles`) only returns published articles. Drafts are only accessible via `GET /api/articles/drafts`, which requires authentication.

In the article editor, there are two save buttons:
- **Publish** — saves with `published: true`
- **Save as Draft** — saves with `published: false`

When logged in, the home page shows a Drafts section above the published article list.

### Comments

Comments do not require login. Any visitor can post a comment with an optional name (defaults to "Anonymous").

The comment form uses **optimistic updates** — the comment appears immediately in the list before the server confirms it. If the server request fails, the optimistic comment is removed and an error is shown.

---

## 10. Utility Functions

### asyncHandler (`server/utils/asyncHandler.ts`)

Express does not catch errors thrown inside `async` route handlers by default. `asyncHandler` wraps a handler and forwards any promise rejections to Express's error middleware via `next(err)`.

```ts
export const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
```

Without this, an unhandled async error would crash the server or hang the request with no response.

### isPrismaNotFoundError (`server/utils/prismaError.ts`)

Prisma throws a `PrismaClientKnownRequestError` with code `P2025` when a record is not found (e.g., trying to update or delete a non-existent article). This utility identifies that specific error so the API layer can return a clean 404 instead of a 500.

```ts
export function isPrismaNotFoundError(e: unknown): boolean {
    return e instanceof PrismaClientKnownRequestError && e.code === 'P2025';
}
```

---

## 11. Security Measures

| Measure | How | Why |
|---------|-----|-----|
| Password hashing | bcrypt with salt rounds 12 | Prevents plaintext password exposure if DB is compromised |
| Session cookies | httpOnly, sameSite: lax, secure in production | Prevents XSS from reading cookie; prevents CSRF from other origins |
| Helmet | `app.use(helmet())` | Sets secure HTTP response headers (CSP, X-Frame-Options, etc.) |
| Rate limiting | express-rate-limit, 50 requests per 15 minutes on /api | Limits brute-force login attempts and API abuse |
| CORS | Explicit allowlist, credentials mode | Only allows requests from known origins |
| SESSION_SECRET guard | Server exits on startup if not set | Prevents silent use of a weak fallback secret |
| authorId from session | Server reads authorId from session, not request body | Prevents client from forging article authorship |
| Trust proxy | `app.set('trust proxy', 1)` | Needed on Render so express-session can set secure cookies behind a reverse proxy |

---

## 12. Tailwind CSS Patterns

### Responsive Layout

Tailwind uses a mobile-first approach. Unprefixed classes apply to all screen sizes; `md:` applies at 768px and above.

```tsx
// Stack vertically on mobile, side by side on desktop
className="flex flex-col md:flex-row gap-6"

// Full width on mobile, proportional on desktop
className="w-full md:flex-[7]"

// Show only on mobile
className="block md:hidden"

// Show only on desktop
className="hidden md:block"

// Font size: smaller on mobile
className="text-base md:text-lg"
className="text-2xl md:text-4xl"
```

### Dark Mode

Enabled in `tailwind.config.js` with `darkMode: 'media'` (follows system preference). `dark:` prefix applies styles only in dark mode.

```tsx
className="bg-white dark:bg-gray-900"
className="text-gray-800 dark:text-gray-200"
className="border-gray-300 dark:border-gray-600"
```

For article body text, Tailwind Typography's dark inversion:

```tsx
className="prose prose-pink dark:prose-invert"
```

### Article Prose

Uses the `@tailwindcss/typography` plugin to style rendered Markdown:

```ts
export const articleProse =
    "prose prose-pink dark:prose-invert max-w-none " +
    "prose-headings:font-semibold " +
    "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg " +
    "prose-img:rounded-xl prose-img:mx-auto " +
    "prose-a:text-pink-600 dark:prose-a:text-pink-400 " +
    "prose-pre:overflow-x-auto prose-code:break-words";
```

`prose-pre:overflow-x-auto` prevents code blocks from overflowing on mobile. `prose-code:break-words` wraps inline code that would otherwise break the layout.

---

## 13. Environment Variables

All environment variables are set in `server/.env` for local development, and in the Render dashboard for production.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string. Auto-injected by Render via `fromDatabase` in `render.yaml`. |
| `ADMIN_USERNAME` | Yes | Admin login username (used as the user's email in the DB). |
| `ADMIN_PASSWORD_HASH` | Yes | bcrypt hash of the admin password. Generate with `npx tsx scripts/hash-password.ts`. |
| `SESSION_SECRET` | Yes | Secret used to sign the session cookie. Must be a long random string. Server exits on startup if not set. |
| `CORS_ORIGIN` | Yes | The frontend URL to allow in CORS (e.g. `https://my-blog-lfzt.onrender.com`). |
| `NODE_ENV` | Yes | Set to `production` on Render. Controls secure cookie flag. |
| `PORT` | No | Port the server listens on. Defaults to 3001. Render injects this automatically. |

---

## 14. Deployment Pipeline

Deployment is on [Render](https://render.com), configured via `render.yaml`.

### render.yaml Structure

```yaml
services:
  - type: web
    name: my-blog-web
    runtime: node
    buildCommand: ./deploy.sh
    startCommand: cd /opt/render/project/src/server && npm run start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: my-blog-db
          property: connectionString
      - key: CORS_ORIGIN
        value: your-frontend-url

databases:
  - name: my-blog-db
    plan: free
```

`fromDatabase` automatically injects the database connection string — no manual copy-paste needed.

### deploy.sh Steps

```bash
# 1. Build the React frontend
cd client && npm ci && npm run build

# 2. Install server dependencies
cd ../server && npm ci

# 3. Copy frontend build into server's static directory
mkdir -p dist/client && cp -r ../client/dist/* dist/client/

# 4. Generate Prisma client for the deployment environment (Linux binary)
npx prisma generate --schema prisma/schema.prisma

# 5. Apply any pending database migrations
npx prisma migrate deploy --schema prisma/schema.prisma

# 6. Compile TypeScript
npm run build
```

Step 4 is necessary because the local Prisma client is compiled for Windows. Render runs Linux, so the client must be regenerated during the build.

Step 5 runs migrations automatically on every deploy — no manual database management needed.

### Trigger a Redeploy

Push to the `main` branch on GitHub. Render detects the push and runs the full pipeline automatically.
