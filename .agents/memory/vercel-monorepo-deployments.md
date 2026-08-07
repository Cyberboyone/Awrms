---
name: Vercel monorepo deployments
description: Deployment constraints for the AWRMS frontend when building from the workspace root.
---

Vercel installs the entire pnpm workspace with a frozen lockfile, so every workspace package must be represented in `pnpm-lock.yaml`. Frontend packages imported from an archive may also reference generated workspace APIs that are not present in the current workspace; those references must be aligned before deployment. Replit-only Vite environment variables should have safe production defaults when the same package is built outside Replit.

**Why:** The initial GitHub import deployed from a workspace whose lockfile and generated API client did not match the imported frontend, and Vercel does not provide Replit workflow variables during its build.

**How to apply:** After importing or changing a workspace artifact, run a frozen install, the artifact typecheck, and its production build before pushing. Add explicit Vercel build/output configuration when the repository contains multiple workspace apps.