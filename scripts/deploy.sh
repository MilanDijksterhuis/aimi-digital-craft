#!/usr/bin/env bash
# Deploy-script voor de VPS (Nitro node-server + PM2).
#
# Lost twee terugkerende problemen op:
# 1. NITRO_PRESET=node_server forceert de node-server build. Zonder deze var
#    valt de Lovable/Nitro-build terug op het Cloudflare-preset -> een
#    index.mjs die zichzelf niet start (exit 0, niks luistert) -> 502.
# 2. De app wordt gestopt vóór `vite build` de .output leegmaakt, zodat PM2
#    niet in een crash-loop (MODULE_NOT_FOUND) schiet en de restart-limiet raakt.
#
# Runtime-env (Supabase secrets) komt uit ecosystem.config.cjs, dat .env laadt.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> git pull"
git pull

echo "==> npm ci"
npm ci

echo "==> app stoppen (voorkomt crash-loop tijdens build)"
pm2 stop aimi-digital-craft || true

echo "==> build (node-server preset geforceerd)"
NITRO_PRESET=node_server npm run build

# Sanity-check: de node-entry moet bestaan, anders geen zin om te starten.
if [ ! -f .output/server/index.mjs ]; then
  echo "FOUT: .output/server/index.mjs ontbreekt na build (verkeerde preset?)." >&2
  exit 1
fi

echo "==> app (her)starten via ecosystem met .env-runtime"
pm2 startOrRestart ecosystem.config.cjs --update-env
pm2 save

pm2 status
echo "==> klaar"
