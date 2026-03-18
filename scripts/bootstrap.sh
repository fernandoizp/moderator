#!/usr/bin/env bash
set -euo pipefail

unset HTTP_PROXY HTTPS_PROXY ALL_PROXY http_proxy https_proxy all_proxy
unset npm_config_http_proxy npm_config_https_proxy npm_config_proxy npm_config_all_proxy
unset YARN_HTTP_PROXY YARN_HTTPS_PROXY

npm config delete proxy >/dev/null 2>&1 || true
npm config delete https-proxy >/dev/null 2>&1 || true
npm config set registry https://registry.npmjs.org/ >/dev/null

if [[ "${1:-}" == "--dry-run" ]]; then
  echo "registry=$(npm config get registry)"
  echo "proxy_vars="
  env | sort | rg -i 'proxy' || true
  exit 0
fi

echo "[bootstrap] registry=$(npm config get registry)"
echo "[bootstrap] running npm install without proxy env vars"
npm install
