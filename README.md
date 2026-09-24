# Dashboard Bootstrap

A developer platform for rapidly creating consistent, production-ready admin dashboards from a YAML manifest.

Describe your dashboard's pages, navigation, and capabilities in `dashboard.yaml`. Dashboard Bootstrap generates a React/TypeScript/MUI application with routing, navigation, page scaffolds, and a unified design system — ready for you to fill in with business logic.

## Quick Start

```bash
# Clone and build
git clone <repo-url> dashboard-bootstrap
cd dashboard-bootstrap
pnpm install && pnpm build

# Check your environment
pnpm cli doctor

# Create a new project in a temp directory
pnpm cli init /tmp/my-dashboard

# Edit the manifest, then generate a runnable project
pnpm cli generate /tmp/my-dashboard/dashboard.yaml -- --runnable

# Install and run
cd /tmp/my-dashboard
npm install && npm run dev
```

> **Note:** The CLI is not yet published to npm. Use `pnpm cli <command>` from the
> repo root. Once published, `npx dashboard-bootstrap <command>` will work anywhere.

## How It Works

```
dashboard.yaml  -->  Schema Validation  -->  Code Generator  -->  React App
```

1. You write a `dashboard.yaml` manifest describing your pages and navigation.
2. The CLI validates the manifest against the schema.
3. The generator produces two types of files:
   - **System-generated** files (routes, navigation, theme config) — regenerated on every run
   - **Scaffold** files (page components, CLAUDE.md, DESIGN.md) — created once, never overwritten

You own the scaffold files. Edit them freely. The generator will never touch them again.

## Example Manifest

```yaml
version: 1
application:
  name: My SaaS Dashboard
  description: Admin panel for managing users and settings
  theme: purple  # or orange, blue, green, red, teal, pink

navigation:
  - label: Overview
    icon: home
    route: /
  - label: Users
    icon: users
    route: /users
  - label: Settings
    icon: settings
    route: /settings
    position: bottom

pages:
  overview:
    route: /
    template: dashboard
    capabilities:
      metrics: true
      charts: true
  users:
    route: /users
    template: table
    capabilities:
      search: true
      filters: true
      sorting: true
      pagination: true
  user-detail:
    route: /users/:id
    template: detail
    capabilities:
      tabs: true
      actions: true
  settings:
    route: /settings
    template: settings
    capabilities:
      sections: true
      save-confirmation: true
```

### Theme Configuration

Set the `theme` field in `application` to customize your dashboard's color scheme:

```yaml
# Simple: use a preset name
application:
  name: My App
  theme: orange

# Advanced: preset with color overrides
application:
  name: My App
  theme:
    preset: blue
    colors:
      primary: "#1a56db"
      primaryHover: "#1648b8"
```

Available presets: `purple` (default), `orange`, `blue`, `green`, `red`, `teal`, `pink`.

## CLI Commands

| Command | Description |
|---------|-------------|
| `dashboard-bootstrap init [dir]` | Create a starter `dashboard.yaml` |
| `dashboard-bootstrap validate <file>` | Check a manifest for errors |
| `dashboard-bootstrap generate <file> [--runnable]` | Validate and generate project files. With `--runnable`, emits a complete Vite project ready to `npm install && npm run dev`. |
| `dashboard-bootstrap add-page <name> --template <type>` | Add a page to the manifest and regenerate |
| `dashboard-bootstrap doctor` | Check Node.js, pnpm, and TypeScript availability |

## Available Templates

| Template | Purpose |
|----------|---------|
| `dashboard` | Metrics, activity feeds, KPI overviews |
| `table` | Searchable, filterable data tables |
| `detail` | Single entity view with sections |
| `settings` | Multi-section configuration forms |
| `wizard` | Multi-step guided flows |
| `catalog` | Browsable card grids (integrations, marketplace) |
| `builder` | Toolbar + canvas for visual editing |
| `split-view` | Side-by-side list and detail (email/messages) |
| `empty-state` | Onboarding or no-data placeholders |

## Generated Output

After running `generate`, your project will contain:

```
my-dashboard/
  dashboard.yaml
  CLAUDE.md                               # Scaffold — agent behavior rules
  DESIGN.md                               # Scaffold — design system reference
  .dashboard-bootstrap/
    state.json                            # Generator state (do not edit)
  src/
    generated/
      routes.generated.tsx                # System-generated (auto-updated)
      navigation.generated.ts            # System-generated (auto-updated)
      dashboard.generated.ts             # System-generated (auto-updated)
      theme.generated.ts                 # System-generated (auto-updated)
    pages/
      OverviewPage.tsx                    # Scaffold (yours to edit)
      UsersPage.tsx                       # Scaffold (yours to edit)
      UserDetailPage.tsx                  # Scaffold (yours to edit)
      SettingsPage.tsx                    # Scaffold (yours to edit)
```

With `--runnable`, additional project shell files are generated:

```
  package.json          # Dependencies and scripts
  index.html            # Entry HTML
  vite.config.ts        # Vite bundler config
  tsconfig.json         # TypeScript config
  src/main.tsx          # React entry point
  src/App.tsx           # App shell with router, sidebar, and theme
```

## File Ownership Model

Dashboard Bootstrap tracks every file it creates:

- **System-generated** files are overwritten on every `generate` run. They carry a `// @generated` header. Don't edit them — your changes will be lost.
- **Scaffold** files are created once with a `// @scaffold` header. They're yours. Edit freely. The generator will never overwrite them.
- If you edit a system-generated file, the next `generate` will detect the drift, warn you, and restore the generated content.

## Design System

The design system provides a complete component library with consistent styling:

### Layout & Navigation
- `DashboardThemeProvider` — MUI theme with configurable color presets
- `AppShell` — Sidebar + top nav + content area
- `Sidebar` — Collapsible navigation with sections, groups, and logo config
- `PageHeader` — Title, description, action slots

### Form System
All forms use the `AppDrawer` pattern (never modals) with these form-specific components:

- `Field` — Inline label + input in a single bordered container
- `FormStack` — Consistent vertical spacing for form fields
- `FormSectionLabel` — Uppercase tracked section headers
- `SuggestionChip` / `SuggestionGroup` — Rectangular selection chips
- `SelectableCard` / `SelectableCardGrid` — Radio-style card selection
- `UploadField` — Dashed drag-and-drop file upload
- `SummaryField` — Read-only completed field with checkmark
- `Stepper` — Multi-step progress indicator
- `FormShell` — Standalone full-page form container
- `SuccessState` — Completion state with icon

### Data & Content
- `AppDataTable` — Sortable, filterable data tables
- `MetricCard` — KPI display with trend indicators
- `AppCard` — Content container card
- `StatusBadge` — Colored status indicators
- `FilterBar` / `SearchInput` — Data filtering controls

### Interaction
- `AppDrawer` — Right-side panel for forms, edits, and details
- `AppDialog` — Confirmation dialogs only (not for forms)
- `EmptyState` / `LoadingState` / `ErrorState` — State placeholders

### Icons
100+ icons from Lucide React, referenced by name string (e.g., `"home"`, `"users"`, `"settings"`).

## Tech Stack

- TypeScript (ES2022), Node >= 20
- React 19 + MUI 6 + Emotion + Vite
- pnpm workspaces + Turborepo
- Lucide React (icons)
- Vitest (unit tests), Playwright (visual regression)
- Storybook (component documentation)

## Packages

| Package | Description |
|---------|-------------|
| `@dashboard-bootstrap/schema` | Manifest types, vocabulary, JSON Schema validation |
| `@dashboard-bootstrap/design-system` | Theme, tokens, form system, semantic UI components, icon abstraction |
| `@dashboard-bootstrap/templates` | Page-level template components (dashboard, table, detail, etc.) |
| `@dashboard-bootstrap/generator` | Deterministic code generator with drift detection and theme config |
| `@dashboard-bootstrap/cli` | CLI entry point (run locally, `npx` after publish) |

### Other Directories

| Directory | Description |
|-----------|-------------|
| `examples/reference-app` | Full reference dashboard showcasing all components |
| `tests/conformance` | Cross-package conformance tests (icon coverage, capability coverage) |
| `tests/e2e` | End-to-end CLI acceptance tests |
| `docs/` | Design research and specifications |

## Development

```bash
pnpm install          # Install dependencies
pnpm build            # Build all packages
pnpm test             # Run all tests (280 tests across 8 packages)
pnpm lint             # Run ESLint governance checks
pnpm test:visual      # Run Playwright visual regression tests
pnpm test:e2e         # Run E2E acceptance tests
pnpm storybook:build  # Build Storybook component documentation
pnpm cli <command>    # Run the CLI (init, validate, generate, add-page, doctor)
```

### Reference App

The reference app demonstrates all design system components in a working dashboard:

```bash
pnpm build
npx serve examples/reference-app/dist -l 5173 -s
# Open http://localhost:5173
```

## License

Private. All rights reserved.
