#!/usr/bin/env bash
# ============================================================================
# realntoffice: Zero-Friction Redeployment Script
# ============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "=================================================="
echo "     realntoffice: Redeploying Active Branch"
echo "=================================================="

cd "${ROOT_DIR}"
ACTIVE_BRANCH=$(git branch --show-current || echo "devv")

echo "[*] Step 1: Pulling latest changes from branch: ${ACTIVE_BRANCH}..."
git fetch origin "${ACTIVE_BRANCH}" || true
git reset --hard "origin/${ACTIVE_BRANCH}" || true

cd "${SCRIPT_DIR}"

echo "[*] Step 2: Stopping active container fleet..."
docker compose down --remove-orphans || true

echo "[*] Step 3: Triggering fresh deployment..."
bash "${SCRIPT_DIR}/deploy.sh"
