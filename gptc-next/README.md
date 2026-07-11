# GPTC Kannur — Next.js + Cloudflare

Government Polytechnic College Kannur website migrated to Next.js 16 with Cloudflare Workers, D1 database, and a custom admin panel.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Lenis smooth scroll
- **Backend**: Cloudflare Workers + D1 (SQLite)
- **Database**: Drizzle ORM (11 tables)
- **Auth**: Web Crypto HMAC sessions (edge-compatible)
- **Admin**: Custom admin panel with inline-styled dashboard

## Quick Start (Local)

```bash
cd gptc-next
npm install
npm run dev          # http://localhost:3000
```

The site reads from a local D1 database. Seed it first:

```bash
npx wrangler d1 migrations apply gptc-db --local
npx tsx scripts/seed.ts
```

**Admin login**: `admin` / `admin123` at `/admin/login`

## Deploy to Cloudflare

### Prerequisites
- [Cloudflare account](https://dash.cloudflare.com)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npx wrangler login`)

### Step 1: Create D1 Database

```bash
npx wrangler d1 create gptc-db
```

Copy the `database_id` from the output and paste it into `wrangler.jsonc`:

```jsonc
"d1_databases": [{
  "binding": "DB",
  "database_name": "gptc-db",
  "database_id": "your-database-id-here",  // ← replace this
  "migrations_dir": "drizzle/migrations"
}]
```

### Step 2: Set AUTH_SECRET

```bash
npx wrangler secret put AUTH_SECRET
# Enter a random string, e.g. output of: openssl rand -hex 32
```

### Step 3: Apply Migrations & Seed

```bash
npm run db:migrate:remote
npm run deploy            # builds + deploys to Workers
```

### Step 4: Seed Remote Database

```bash
# Export local DB and import to remote
npx wrangler d1 export gptc-db --local --output seed-dump.sql
npx wrangler d1 execute gptc-db --remote --file seed-dump.sql
```

## Project Structure

```
gptc-next/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin panel (dashboard + CRUD pages)
│   │   │   ├── login/      # Login page (/admin/login)
│   │   │   ├── api/auth/   # Auth API route
│   │   │   └── (dashboard)/ # All CRUD pages (sections, events, etc.)
│   │   ├── api/            # API routes
│   │   ├── department/[slug]/ # Dynamic department pages
│   │   ├── principal/      # Principal page
│   │   ├── diploma/        # Diploma programmes page
│   │   └── ...             # Faculty pages, etc.
│   ├── components/         # React components
│   ├── db/                 # Drizzle schema + DB connection
│   ├── lib/                # Auth utilities, DB queries
│   └── hooks/              # Custom React hooks
├── drizzle/                # D1 migrations
├── scripts/                # Seed script
├── wrangler.jsonc          # Cloudflare Workers config
└── public/                 # Static assets
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AUTH_SECRET` | Secret key for session HMAC signing (set via `wrangler secret`) |

## Build

```bash
npm run build    # next build --webpack
```

Uses webpack bundler for Cloudflare compatibility.

## Backup

The original Vite/React codebase is preserved in `PROJECTS/Gptc` on the `backup-before-next` branch.
