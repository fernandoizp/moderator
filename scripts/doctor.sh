#!/usr/bin/env bash
set -euo pipefail

echo "== Node / npm =="
node -v
npm -v

echo

echo "== npm registry =="
npm config get registry

echo

echo "== Proxy environment =="
env | sort | rg -i 'proxy|npm_config_' || true

echo

echo "== Quick advice =="
echo "If npm install returns 403 through a proxy, try: bash ./scripts/bootstrap.sh"
echo "If direct internet is blocked too, run the project on a machine/network with npm access."
