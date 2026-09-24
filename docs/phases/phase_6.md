# Phase 6 — Forms, States, and Icon Abstraction

## Objective

Implement form components (AppForm, FormField), state components (EmptyState, LoadingState, ErrorState), and the Icon component abstracting Lucide React.

## Inputs

- `docs/DESIGN_SYSTEM.md` — approved visual contract (read only)
- `docs/TDD.md` — design-system public interfaces, Icon component spec

## Allowed Paths

- `packages/design-system/package.json`
- `packages/design-system/src/components/AppForm.tsx`
- `packages/design-system/src/components/FormField.tsx`
- `packages/design-system/src/components/EmptyState.tsx`
- `packages/design-system/src/components/LoadingState.tsx`
- `packages/design-system/src/components/ErrorState.tsx`
- `packages/design-system/src/components/Icon.tsx`
- `packages/design-system/src/index.ts`
- `packages/design-system/src/__tests__/`
- `pnpm-lock.yaml`

## Blocked Paths

- `docs/DESIGN_SYSTEM.md`

## Tasks

1. Implement `AppForm` (form container).
2. Implement `FormField` (labeled form field).
3. Implement `EmptyState` (empty/no-data display).
4. Implement `LoadingState` (loading indicator).
5. Implement `ErrorState` (error display).
6. Implement `Icon` component abstracting Lucide React, supporting all `IconName` values from the schema vocabulary.
7. Add `lucide-react` as a dependency in `package.json`.
8. Update `index.ts` with new component exports.
9. Write unit tests for component rendering and prop variations.

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/design-system test` exits 0.
- `pnpm --filter @dashboard-bootstrap/design-system build` exits 0.

## Out of Scope

- Page templates (Phase 7).
- Deliverables belonging to other phases.
