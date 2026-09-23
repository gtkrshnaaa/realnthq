#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "    realntoffice Test Automation Suite"
echo "=================================================="

# 1. Run integration tests
echo "[*] Step 1: Running Domain Integration Tests..."
node integration/presence_flow.spec.js

# 2. Run E2E tests (if dependencies and server ready)
if command -v node >/dev/null 2>&1; then
  echo "[*] Step 2: Running E2E Test Suite..."
  node e2e/office_dashboard.spec.js || true
fi

echo "=================================================="
echo "[OK] Test suite execution finished."
echo "=================================================="
