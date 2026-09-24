# Phase 10 — Reference Application

## Objective

Build the reference application demonstrating all page patterns with fixture data. Serves as visual regression baseline and integration test surface.

## Inputs

- `docs/PRD.md` — reference application (Section 20)
- `docs/TDD.md` — reference-app description, non-package components

## Allowed Paths

- `examples/reference-app/package.json`
- `examples/reference-app/tsconfig.json`
- `examples/reference-app/vite.config.ts`
- `examples/reference-app/index.html`
- `examples/reference-app/src/`
- `examples/manifests/`
- `pnpm-lock.yaml`

## Blocked Paths

None.

## Tasks

1. Create `examples/reference-app` Vite project with `@dashboard-bootstrap/design-system` and `@dashboard-bootstrap/templates` workspace dependencies.
2. Implement `App.tsx` with `DashboardThemeProvider`, `AppShell`, routing, and navigation.
3. Implement representative pages for each template type with fixture data:
   - Overview (DashboardTemplate)
   - Users (TableTemplate)
   - User Detail (DetailTemplate)
   - Settings (SettingsTemplate)
   - Onboarding (WizardTemplate)
   - Integrations (CatalogTemplate)
   - Workflow Builder (BuilderTemplate)
   - Messages (SplitViewTemplate)
   - Getting Started (EmptyStateTemplate)
4. Create fixture data modules in `src/fixtures/`.
5. Create example `dashboard.yaml` manifests in `examples/manifests/`.
6. Verify the reference app builds.

## Exit Criteria

- `pnpm --filter reference-app build` exits 0.

## Out of Scope

- AI skill (Phase 11).
- Deliverables belonging to other phases.
