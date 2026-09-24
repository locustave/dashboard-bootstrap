# Phase 3 — Design System Foundation

## Objective

Implement the approved `docs/DESIGN_SYSTEM.md` contract as executable code — design tokens, MUI theme configuration, and DashboardThemeProvider component. Do not rewrite or reinterpret DESIGN_SYSTEM.md.

## Inputs

- `docs/DESIGN_SYSTEM.md` — approved visual contract (READ ONLY)
- `docs/TDD.md` — design-system ownership, token format, public interfaces

## Allowed Paths

- `packages/design-system/package.json`
- `packages/design-system/tsconfig.json`
- `packages/design-system/vitest.config.ts`
- `packages/design-system/src/tokens.ts`
- `packages/design-system/src/theme.ts`
- `packages/design-system/src/theme/DashboardThemeProvider.tsx`
- `packages/design-system/src/index.ts`
- `packages/design-system/src/__tests__/`
- `pnpm-lock.yaml`

## Blocked Paths

- `docs/DESIGN_SYSTEM.md` — this is the approved contract; do not modify it.

## Tasks

1. Read `docs/DESIGN_SYSTEM.md` as the authoritative visual contract.
2. Add React, MUI, and related peer/dev dependencies to `packages/design-system/package.json`.
3. Implement design tokens in `tokens.ts` matching the values specified in DESIGN_SYSTEM.md.
4. Implement MUI theme configuration in `theme.ts` applying design tokens from DESIGN_SYSTEM.md.
5. Implement `DashboardThemeProvider` component wrapping MUI `ThemeProvider`.
6. Export `DashboardThemeProvider` and `tokens` from `index.ts`.
7. Write unit tests verifying theme provider renders and token values match DESIGN_SYSTEM.md.

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/design-system test` exits 0.
- `pnpm --filter @dashboard-bootstrap/design-system build` exits 0.

## Out of Scope

- Modifying `docs/DESIGN_SYSTEM.md`.
- Semantic components (Phases 4-6).
- Page templates.
- Deliverables belonging to other phases.
