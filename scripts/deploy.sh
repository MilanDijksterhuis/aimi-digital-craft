#!/usr/bin/env bash
# Deploy-script voor de VPS (Nitro node-server + PM2).
#
# Lost drie terugkerende problemen op:
# 1. NITRO_PRESET=node_server forceert de node-server build. Zonder deze var
#    valt de Lovable/Nitro-build terug op het Cloudflare-preset -> een
#    index.mjs die zichzelf niet start (exit 0, niks luistert) -> 502.
# 2. SEO-audit 2026-09-20, bevinding A1-1: `pm2 stop` vóór de build legde de
#    site plat voor de hele duur van `npm ci` + `vite build` (minuten). Nu
#    bouwen we terwijl de oude versie blijft draaien en doen pas daarna een
#    `pm2 reload` (graceful, zero-downtime herstart i.p.v. stop+start).
# 3. Geen enkele stap mag een kapotte build live zetten: typecheck en de
#    SEO-invariantenchecks draaien vóór de reload en breken de deploy af bij
#    een fout. Na de reload bevestigt een smoke test dat de kernpagina's
#    daadwerkelijk 200 geven. (Geen `npm run lint` hier: de bestaande
#    ESLint/Prettier-config faalt momenteel op duizenden pre-existente
#    meldingen in de hele repo, los van deze deploy — dat is een eigen
#    opruimtaak, geen deploy-gate totdat dat is opgelost.)
#
# Runtime-env (Supabase secrets) komt uit ecosystem.config.cjs, dat .env laadt.

set -euo pipefail

cd "$(dirname "$0")/.."

APP_NAME="aimi-digital-craft"
BASE_URL="${DEPLOY_BASE_URL:-https://aimi-development.nl}"

echo "==> git pull"
git pull

echo "==> npm ci"
npm ci

echo "==> typecheck"
npx tsc --noEmit

echo "==> build (node-server preset geforceerd, app blijft draaien)"
NITRO_PRESET=node_server npm run build

# Sanity-check: de node-entry moet bestaan, anders geen zin om te reloaden.
if [ ! -f .output/server/index.mjs ]; then
  echo "FOUT: .output/server/index.mjs ontbreekt na build (verkeerde preset?)." >&2
  exit 1
fi

echo "==> SEO-invariantenchecks"
node scripts/check-seo-invariants.mjs

echo "==> zero-downtime reload"
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  # Eerste deploy op een verse machine: er is nog niets om te reloaden.
  pm2 startOrRestart ecosystem.config.cjs --update-env
fi
pm2 save

pm2 status

echo "==> post-deploy smoke test"
fail=0
for p in / /blog /website-laten-maken /contact /sitemap.xml /robots.txt; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$p" || echo "000")
  if [ "$code" != "200" ]; then
    echo "FOUT: $p gaf $code (verwacht 200)" >&2
    fail=1
  fi
done
notfound_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/bestaat-niet-xyz" || echo "000")
if [ "$notfound_code" != "404" ]; then
  echo "FOUT: onbekende URL gaf $notfound_code i.p.v. 404 (soft 404?)" >&2
  fail=1
fi
if [ "$fail" -eq 1 ]; then
  echo "FOUT: smoke test gefaald ná de reload. App draait, maar controleer direct handmatig." >&2
  exit 1
fi

echo "==> IndexNow-submit (Bing/Yandex/Naver; mag deploy nooit blokkeren)"
node scripts/indexnow-submit.mjs || true

echo "==> klaar"
