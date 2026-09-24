# Phase 10 Build Ledger — Reference Application

## Summary

Built the reference application demonstrating all 9 page template patterns with fixture data. The app uses React Router for navigation, AppShell for the layout, and DashboardThemeProvider for consistent styling.

## Pages Implemented

| Page | Route | Template | Description |
|------|-------|----------|-------------|
| Overview | `/` | DashboardTemplate | Metrics grid + activity feed |
| Users | `/users` | TableTemplate | User table with columns |
| User Detail | `/users/:id` | DetailTemplate | Profile + activity sections |
| Settings | `/settings` | SettingsTemplate | 5-section settings nav |
| Onboarding | `/onboarding` | WizardTemplate | 4-step setup wizard |
| Integrations | `/integrations` | CatalogTemplate | 6 service cards |
| Workflow Builder | `/workflow-builder` | BuilderTemplate | Toolbar + canvas + properties |
| Messages | `/messages` | SplitViewTemplate | Message list + detail |
| Getting Started | `/getting-started` | EmptyStateTemplate | Welcome CTA |

## Dependencies

- react-router-dom ^7.6.0 (client-side routing)
- @dashboard-bootstrap/design-system (workspace)
- @dashboard-bootstrap/templates (workspace)
- @mui/material, @emotion/react, @emotion/styled
- Vite + @vitejs/plugin-react (build tooling)

## Example Manifest

- `examples/manifests/dashboard.yaml` — complete manifest matching all 9 reference app pages

## Exit Criteria

- `pnpm --filter reference-app build` — PASSED (tsc + vite build, 2243 modules)

## ADR

No architectural decisions required.
