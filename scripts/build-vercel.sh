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

npx --yes pnpm@10 --filter @workspace/awrms run build

rm -rf "$ROOT/public"
mkdir -p "$ROOT/public"
cp -R "$ROOT/artifacts/awrms/dist/public/." "$ROOT/public/"
echo "== copied to $ROOT/public"

mkdir -p "$ROOT/artifacts/awrms/public"
cp -R "$ROOT/artifacts/awrms/dist/public/." "$ROOT/artifacts/awrms/public/"
echo "== copied to $ROOT/artifacts/awrms/public"
