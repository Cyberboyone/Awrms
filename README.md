# AWRMS

Automated Waste Recycling Management System — a full-stack web application for managing waste collection requests, recycling records, user accounts with role-based access control (student, staff, personnel, admin), and administrative reporting.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite + React + Tailwind CSS (SPA)
- API: Express 5
- Database: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)

## Prerequisites

- Node.js >= 24
- pnpm >= 10
- PostgreSQL (for API/DB features)

## Setup

```bash
pnpm install
```

Set the required environment variable for the API server and DB tooling:

```bash
export DATABASE_URL=postgres://user:password@localhost:5432/awrms
```

## Development

Run the API server and web app together:

```bash
pnpm dev
```

- API server: http://localhost:5000 (health check at `/api/healthz`)
- Web app: http://localhost:4173

Or run them individually:

```bash
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/awrms run dev
```

## Useful scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run API server + web app in parallel |
| `pnpm build` | Typecheck then build all packages |
| `pnpm typecheck` | Full typecheck across all packages |
| `pnpm start` | Start the built API server (production) |
| `pnpm db:push` | Push DB schema changes (dev only) |

## Project layout

```
artifacts/api-server     Express 5 API server
artifacts/awrms          Vite React web app
artifacts/mockup-sandbox Component preview sandbox (dev tool)
lib/api-client-react     Generated React-Query API hooks
lib/api-spec             OpenAPI spec + Orval codegen
lib/api-zod              Shared Zod schemas
lib/db                   Drizzle schema + Postgres client
scripts                  Workspace helper scripts
```

## Deployment

- **Frontend** (`artifacts/awrms`): any static host or Vercel. `vercel.json` at the repo root builds the SPA and serves it as a static site.
- **API server** (`artifacts/api-server`): any Node host running `pnpm --filter @workspace/api-server run build && pnpm start` with `DATABASE_URL` and `PORT` set.
- **Postgres**: provisioned separately (e.g. managed Postgres, Render, Railway).

## Environment variables

| Variable | Used by | Required |
| --- | --- | --- |
| `DATABASE_URL` | API server, `lib/db`, drizzle-kit | Yes (API/DB) |
| `PORT` | API server (default 5000), web app (default 4173) | No |
| `BASE_PATH` | Web app base path (default `/`) | No |
| `LOG_LEVEL` | API logger (default `info`) | No |
