# Phase 5 — Data, Content, and Interaction Components

## Objective

Implement data, content, and interaction components — AppDataTable, AppCard, MetricCard, StatusBadge, FilterBar, SearchInput, AppDrawer, AppDialog — conforming to the approved design contract.

## Inputs

- `docs/DESIGN_SYSTEM.md` — approved visual contract (read only)
- `docs/TDD.md` — design-system public interfaces

## Allowed Paths

- `packages/design-system/package.json`
- `packages/design-system/src/components/AppDataTable.tsx`
- `packages/design-system/src/components/AppCard.tsx`
- `packages/design-system/src/components/MetricCard.tsx`
- `packages/design-system/src/components/StatusBadge.tsx`
- `packages/design-system/src/components/FilterBar.tsx`
- `packages/design-system/src/components/SearchInput.tsx`
- `packages/design-system/src/components/AppDrawer.tsx`
- `packages/design-system/src/components/AppDialog.tsx`
- `packages/design-system/src/index.ts`
- `packages/design-system/src/__tests__/`
- `pnpm-lock.yaml`

## Blocked Paths

- `docs/DESIGN_SYSTEM.md`

## Tasks

1. Implement `AppDataTable` (data table with sorting).
2. Implement `AppCard` (content card).
3. Implement `MetricCard` (metric display card).
4. Implement `StatusBadge` (status indicator).
5. Implement `FilterBar` (filter controls).
6. Implement `SearchInput` (search field).
7. Implement `AppDrawer` (slide-out drawer).
8. Implement `AppDialog` (modal dialog).
9. Update `index.ts` with new component exports.
10. Write unit tests for component rendering and prop variations.

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/design-system test` exits 0.
- `pnpm --filter @dashboard-bootstrap/design-system build` exits 0.

## Out of Scope

- Form, state, and icon components (Phase 6).
- Deliverables belonging to other phases.
