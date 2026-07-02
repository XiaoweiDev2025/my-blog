# BUGFIX LOG

A record of all bugs found after the initial deployment, including root cause analysis and what was changed to fix each one.

---

### 1. Database not connecting after deployment

**Symptom:** Server started successfully but all database operations failed.

**Root cause:** `render.yaml` had `DATABASE_URL: sync: false`, which tells Render "I will set this manually." It was never set manually, so the database URL was empty at runtime.

**Fix:** Changed to `fromDatabase` so Render automatically injects the connection string from the managed database service:

```yaml
- key: DATABASE_URL
  fromDatabase:
    name: my-blog-db
    property: connectionString
```

---

### 2. CORS env var name mismatch

**Symptom:** Cross-origin requests were blocked even though CORS was configured.

**Root cause:** `render.yaml` defined `CLIENT_ORIGIN`, but `index.ts` reads `process.env.CORS_ORIGIN`. Different names — the allowed origins list was always empty.

**Fix:** Renamed `CLIENT_ORIGIN` to `CORS_ORIGIN` in `render.yaml`.

---

### 3. POST /api/articles returning 401

**Symptom:** Creating an article always failed with 401 Unauthorized, even when logged in.

**Root cause:** `createArticle.ts` used a raw `fetch()` call without `credentials: 'include'`. The session cookie was never sent with the request, so the server treated every request as unauthenticated.

The project already had a shared `request()` helper in `client/src/api/client.ts` that includes credentials — other API files used it, but `createArticle.ts` was written separately and missed it.

`getArticles.ts` had the same issue and also had a hardcoded production URL that would break local development.

**Fix:** Replaced the raw `fetch` calls with the shared `request()` helper in both files.

---

### 4. Foreign key constraint error on article creation

**Symptom:** `Invalid prisma.article.create() invocation: Foreign key constraint violated on the constraint: Article_authorId_fkey`

**Root cause:** `ArticleEditPage.tsx` hardcoded `authorId = 1`. The production database was empty (no users), so the reference to a non-existent user failed PostgreSQL's foreign key constraint.

The deeper issue was a disconnect between two systems: login validation used environment variables and never touched the database, so the `User` table was never populated.

**Fix:**
1. On login, upsert the admin user into the `User` table and store the real DB `id` in the session
2. Server reads `authorId` from `req.session.user.id` — the client no longer sends it
3. This also closed a security hole: previously any `authorId` could be sent from the client to impersonate another author

---

### 5. SESSION_SECRET had a hardcoded fallback

**Symptom:** No visible symptom — a silent security vulnerability.

**Root cause:** `index.ts` used `process.env.SESSION_SECRET || 'fallback_secret'`. If the env var was missing in production, the server silently used a fixed, publicly-known string, making session cookies trivially forgeable.

**Fix:** Added an explicit startup guard — the server exits immediately if `SESSION_SECRET` is not set:

```ts
if (!process.env.SESSION_SECRET) {
    console.error('SESSION_SECRET is not set. Exiting.');
    process.exit(1);
}
```

---

### 6. Mobile pages overflowing horizontally

**Symptom:** On mobile, pages required manual zoom-out to see full content.

**Root cause:** `index.css` still contained Vite's default template styles, including `:root { padding: 2rem }`. This added 32px of padding on each side of the root element, pushing content wider than the viewport on mobile. This was never cleaned up after project setup.

**Fix:** Removed all Vite boilerplate from `index.css`, keeping only the necessary `body` reset.

---

### 7. Migration not applied after adding `published` column

**Symptom:** `The column 'published' does not exist in the current database.`

**Root cause:** `published` was added to `schema.prisma`, but no migration file was generated locally before pushing. `prisma migrate deploy` (which runs on deployment) only applies existing migration files — it does not auto-generate new ones from schema changes.

**Fix:** Ran `prisma migrate dev --name add_published_to_article` locally to generate the migration SQL file, committed it to the repo, and let the next deployment apply it automatically.

---

### 8. Admin UI visible to unauthenticated users

**Symptom:** Visitors who were not logged in could see the "Create article", "Edit", and "Delete" buttons.

**Root cause:** Both `Home.tsx` and `ArticleDetail.tsx` had `const currentUserRole = "admin"` hardcoded. The `NewArticleCTA` and `ArticleAdminActions` components check this value to decide whether to render — so they were always visible regardless of actual login state.

**Fix:** Replaced the hardcoded role with an `isAdmin` state populated by calling `/api/auth/me` on component mount. Buttons only render when `isAdmin` is `true`.

---

### 9. Dark mode text unreadable

**Symptom:** In dark mode, text was invisible or had very low contrast against the background.

**Root cause:** Two issues:
1. `darkMode: 'media'` was not set in `tailwind.config.js`, so `dark:` prefixes had no effect at all
2. Most components only had light-mode Tailwind classes with no `dark:` variants — backgrounds darkened with the system theme but text colours stayed the same

**Fix:** Added `darkMode: 'media'` to `tailwind.config.js`, then added `dark:` variants across all components: backgrounds, text, borders, inputs, links, navbar, sidebar, footer, article styles, comment section, and the article editor.
