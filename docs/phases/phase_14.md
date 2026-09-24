# Phase 14 — Visual Regression

## Objective

Configure Playwright visual regression tests against the reference app, capture baseline screenshots for all major page patterns.

## Inputs

- `docs/TDD.md` — visual regression testing strategy
- `docs/PRD.md` — visual regression requirements (Section 22)

## Allowed Paths

- `tests/visual-regression/`
- `playwright.config.ts`
- `package.json`
- `pnpm-lock.yaml`
- `turbo.json`

## Blocked Paths

None.

## Tasks

1. Add Playwright dev dependencies to `package.json`.
2. Create `playwright.config.ts` for visual regression testing against the reference app dev server.
3. Create test specs that navigate to each reference app page and capture screenshots.
4. Capture baseline screenshots for all major page patterns.
5. Configure comparison thresholds.
6. Add `test:visual` script to `turbo.json` if needed.

## Exit Criteria

- `pnpm test:visual` exits 0.

## Out of Scope

- Deliverables belonging to other phases.
