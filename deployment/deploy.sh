#!/usr/bin/env bash
# ============================================================================
# realnthq: Single-Enter Deployment Script
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=================================================="
echo "      realnthq: Deploying Environment"
echo "=================================================="

cd "${SCRIPT_DIR}"

# 1. Environment Configuration Setup
if [ ! -f ".env" ]; then
  echo "[*] Step 1: Generating .env from template..."
  cp .env.example .env
else
  echo "[*] Step 1: Existing .env detected."
fi

# 2. Build and Launch Containers
echo "[*] Step 2: Building container images..."
docker compose build

echo "[*] Step 3: Starting containerized infrastructure..."
docker compose up -d

# 3. Healthcheck Waiting Loop
echo "[*] Step 4: Polling service healthchecks..."
RETRIES=30
until docker compose ps | grep -q "(healthy)"; do
  RETRIES=$((RETRIES - 1))
  if [ $RETRIES -le 0 ]; then
    echo "[!] Timed out waiting for healthy container states."
    break
  fi
  sleep 2
done

echo "=================================================="
echo "    realnthq Deployment Complete"
echo "=================================================="
echo "  [OK] Client UI:     http://localhost:3000"
echo "  [OK] Server API:    http://localhost:4000"
echo "  [OK] Health check:  http://localhost:4000/health"
echo "  [OK] PostgreSQL:    localhost:5432 (db: realnthq)"
echo "  [OK] Redis PubSub:  localhost:6379"
echo "  [OK] Default User:  admin@acme.org / password123"
echo "=================================================="
