#!/bin/sh
set -e

ROOT="$(pwd)"
while [ ! -f "$ROOT/pnpm-workspace.yaml" ]; do
  PREV="$ROOT"
  ROOT="$(dirname "$ROOT")"
  [ "$ROOT" = "$PREV" ] && { echo "Could not find workspace root" >&2; exit 1; }
done
cd "$ROOT"

echo "== workspace root: $ROOT"
echo "== cwd: $(pwd)"
echo "== node: $(node -v 2>&1)"
echo "== pnpm: $(npx --yes pnpm@10 --version 2>&1)"

echo "== building @workspace/awrms"
npx --yes pnpm@10 --filter @workspace/awrms run build
echo "== build done"

echo "== dist contents:"
ls -la "$ROOT/artifacts/awrms/dist/public" 2>&1 || { echo "!! dist/public missing" >&2; exit 1; }

rm -rf "$ROOT/public"
mkdir -p "$ROOT/public"
cp -R "$ROOT/artifacts/awrms/dist/public/." "$ROOT/public/"
echo "== copied to $ROOT/public"

mkdir -p "$ROOT/artifacts/awrms/public"
cp -R "$ROOT/artifacts/awrms/dist/public/." "$ROOT/artifacts/awrms/public/"
echo "== copied to $ROOT/artifacts/awrms/public"
echo "== public contents:"
ls -la "$ROOT/public"
echo "== BUILD_VERCEL_OK"
