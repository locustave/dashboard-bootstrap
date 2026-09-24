# Phase 4 — Shell, Navigation, and Page Structure Components

## Objective

Implement shell and page structure components — AppShell, Sidebar, TopNav, Page, PageHeader, PrimaryAction — conforming to the approved design contract.

## Inputs

- `docs/DESIGN_SYSTEM.md` — approved visual contract (read only)
- `docs/TDD.md` — design-system public interfaces

## Allowed Paths

- `packages/design-system/package.json`
- `packages/design-system/src/components/AppShell.tsx`
- `packages/design-system/src/components/Sidebar.tsx`
- `packages/design-system/src/components/TopNav.tsx`
- `packages/design-system/src/components/Page.tsx`
- `packages/design-system/src/components/PageHeader.tsx`
- `packages/design-system/src/components/PrimaryAction.tsx`
- `packages/design-system/src/index.ts`
- `packages/design-system/src/__tests__/`
- `pnpm-lock.yaml`

## Blocked Paths

- `docs/DESIGN_SYSTEM.md`

## Tasks

1. Implement `AppShell` (application layout with sidebar and content area).
2. Implement `Sidebar` (navigation sidebar accepting navigation items).
3. Implement `TopNav` (top navigation bar).
4. Implement `Page` (page container with standard padding/layout).
5. Implement `PageHeader` (title, subtitle, breadcrumbs, action slot).
6. Implement `PrimaryAction` (standard primary action button).
7. Update `index.ts` with new component exports.
8. Write unit tests for component rendering and prop variations.

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/design-system test` exits 0.
- `pnpm --filter @dashboard-bootstrap/design-system build` exits 0.

## Out of Scope

- Data, content, and interaction components (Phase 5).
- Form, state, and icon components (Phase 6).
- Deliverables belonging to other phases.
