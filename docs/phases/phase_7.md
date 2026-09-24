# Phase 7 — Page Templates

## Objective

Implement page-level template components with strongly typed props, composing design-system components.

## Inputs

- `docs/PRD.md` — page template system (Section 12)
- `docs/TDD.md` — templates package interface, template prop contracts (AD-2)

## Allowed Paths

- `packages/templates/package.json`
- `packages/templates/tsconfig.json`
- `packages/templates/vitest.config.ts`
- `packages/templates/src/DashboardTemplate.tsx`
- `packages/templates/src/TableTemplate.tsx`
- `packages/templates/src/DetailTemplate.tsx`
- `packages/templates/src/SettingsTemplate.tsx`
- `packages/templates/src/WizardTemplate.tsx`
- `packages/templates/src/CatalogTemplate.tsx`
- `packages/templates/src/BuilderTemplate.tsx`
- `packages/templates/src/SplitViewTemplate.tsx`
- `packages/templates/src/EmptyStateTemplate.tsx`
- `packages/templates/src/index.ts`
- `packages/templates/src/__tests__/`
- `pnpm-lock.yaml`

## Blocked Paths

None.

## Tasks

1. Add `@dashboard-bootstrap/design-system` as a workspace dependency.
2. Implement `DashboardTemplate` (metrics, activity, summaries).
3. Implement `TableTemplate` (searchable/filterable collections).
4. Implement `DetailTemplate` (individual domain object).
5. Implement `SettingsTemplate` (configuration).
6. Implement `WizardTemplate` (multi-step flows).
7. Implement `CatalogTemplate` (browse objects/tools/integrations).
8. Implement `BuilderTemplate` (workflow/configuration builders).
9. Implement `SplitViewTemplate` (collection + contextual detail).
10. Implement `EmptyStateTemplate` (onboarding/no-data).
11. Export all templates from `index.ts`.
12. Write unit tests for template rendering with fixture data.

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/templates test` exits 0.
- `pnpm --filter @dashboard-bootstrap/templates build` exits 0.

## Out of Scope

- Deliverables belonging to other phases.
