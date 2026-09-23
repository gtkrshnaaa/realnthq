#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "    realntoffice Environment Health Validator"
echo "=================================================="

# Check Node
if command -v node >/dev/null 2>&1; then
  echo "[OK] Node.js is installed: $(node -v)"
else
  echo "[x] Node.js is not found"
  exit 1
fi

# Check Docker
if command -v docker >/dev/null 2>&1; then
  echo "[OK] Docker is installed: $(docker --version)"
else
  echo "[!] Docker not detected in current path"
fi

# Check Docker Compose
if docker compose version >/dev/null 2>&1; then
  echo "[OK] Docker Compose is installed: $(docker compose version --short)"
else
  echo "[!] Docker Compose plugin not detected"
fi

echo "[OK] Environment readiness check completed."
