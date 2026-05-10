#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

printf '\n== Alex regression gate ==\n'
printf 'Project: %s\n' "$(pwd)"
printf '\n-- Git state --\n'
git status --short

printf '\n-- Static JavaScript check --\n'
node --check src/app.js

printf '\n-- Automated tests --\n'
python -m pytest tests/test_static_app.py tests/test_clickthrough_playwright.py -q

printf '\n-- Diff summary --\n'
git diff --stat

printf '\nPASS: automated Alex regression gate completed.\n'
printf 'If this change touched iPad/touch/Pencil/layout behavior, still run the real iPad manual gate in ALEX_REGRESSION_GUARD.md.\n'
