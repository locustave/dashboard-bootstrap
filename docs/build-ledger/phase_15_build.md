# Phase 15 Build Ledger — Full Standalone E2E Acceptance

## Summary

Created end-to-end acceptance tests validating Dashboard Bootstrap as a standalone product. Tests prove that a valid dashboard.yaml processed by the CLI generates correct output files, respects scaffold protection, and detects drift in system-generated files.

## Files Created

- `tests/e2e/package.json` — E2E test workspace package
- `tests/e2e/vitest.config.ts` — Vitest config with 30s timeout
- `tests/e2e/e2e.test.ts` — 12 E2E acceptance tests

## Files Modified

- `package.json` — Added `test:e2e` script

## Tests

12 E2E tests covering:
1. `init` creates dashboard.yaml
2. `init` fails if dashboard.yaml already exists
3. `validate` succeeds for valid manifest
4. `validate` fails for invalid manifest
5. `generate` produces routes, pages, and navigation files
6. Routes file contains correct page imports and route entries
7. Navigation file contains correct nav items
8. Scaffold pages use the correct template
9. Scaffold files survive regeneration (scaffold protection)
10. Drift detection: modified system-generated file is restored on regeneration
11. State tracks file categories correctly
12. Idempotent regeneration produces identical output

## Exit Criteria

- `pnpm test:e2e` exits 0 — PASSED (12 tests, 0 failures)

## ADRs

No architecture decisions were made in this phase.
