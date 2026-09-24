# Manifest Reference

Complete reference for the `dashboard.yaml` manifest format.

---

## Manifest Structure

```yaml
version: 1                    # Required. Always 1.
application:
  name: "App Name"            # Required. Display name.
  description: "Description"  # Required. Short description.

navigation:                   # Required. Array of nav items.
  - label: "Label"            # Required. Display text.
    icon: "icon-name"         # Required. Lucide icon identifier.
    route: "/path"            # Required. URL path.
    children:                 # Optional. Nested nav items.
      - label: "Child"
        icon: "icon-name"
        route: "/path/child"

pages:                        # Required. Map of page-id to page definition.
  page-id:                    # kebab-case identifier (e.g., user-detail)
    route: "/path"            # Required. URL route (may include :params).
    template: "template-name" # Required. One of the 9 templates.
    capabilities:             # Optional. Boolean flags for page features.
      capability-key: true
```

### Rules

- `version` must be `1`.
- Every navigation route must have a corresponding page definition.
- Page IDs must be kebab-case (lowercase letters, numbers, hyphens).
- Child navigation routes must start with their parent's route prefix.
- Routes may include parameters (e.g., `/users/:id`).
- No two pages may share the same route.

---

## Templates

### dashboard

Metrics overview with KPI cards, activity feeds, and summary widgets.

**Use for:** Home pages, analytics overviews, executive dashboards.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `metrics` | Display KPI metric cards |
| `activity-feed` | Show recent activity timeline |
| `quick-actions` | Action buttons for common tasks |
| `charts` | Data visualization charts |

---

### table

Searchable, sortable, filterable data table for browsing collections.

**Use for:** User lists, order histories, log viewers, any CRUD listing.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `search` | Full-text search input |
| `filters` | Column/attribute filters |
| `sorting` | Column sort controls |
| `pagination` | Page-based navigation |
| `row-actions` | Per-row action menus |
| `bulk-actions` | Multi-select with bulk operations |
| `export` | Export data (CSV, etc.) |

---

### detail

Single entity view with structured sections and actions.

**Use for:** User profiles, order details, entity inspectors.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `tabs` | Tabbed content sections |
| `sidebar` | Side panel with summary info |
| `actions` | Action buttons (edit, delete, etc.) |
| `breadcrumbs` | Navigation breadcrumbs |
| `related-items` | Related entity listings |

---

### settings

Multi-section configuration form with save/reset controls.

**Use for:** App settings, user preferences, admin configuration.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `sections` | Grouped settings sections |
| `save-confirmation` | Confirmation on save |
| `reset` | Reset to defaults |
| `validation` | Field-level validation |

---

### wizard

Multi-step guided flow with progress tracking.

**Use for:** Onboarding, setup flows, multi-step forms.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `steps` | Step navigation |
| `validation` | Per-step validation |
| `progress-bar` | Visual progress indicator |
| `save-draft` | Save incomplete progress |

---

### catalog

Browsable grid of cards for discovery and selection.

**Use for:** Integration marketplaces, feature catalogs, app stores.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `grid-view` | Card grid layout |
| `list-view` | List layout option |
| `filters` | Category/attribute filters |
| `search` | Search input |
| `sorting` | Sort controls |
| `pagination` | Page-based navigation |

---

### builder

Toolbar, canvas, and properties panel for visual editing.

**Use for:** Workflow editors, form builders, diagram tools.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `drag-drop` | Drag and drop elements |
| `preview` | Live preview |
| `undo-redo` | Undo/redo support |
| `save` | Save current state |
| `toolbar` | Tool palette |

---

### split-view

Side-by-side list and contextual detail panel.

**Use for:** Email clients, messaging, master-detail patterns.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `resizable` | Resizable panel divider |
| `list-detail` | List with detail pane |
| `filters` | List filters |
| `search` | List search |

---

### empty-state

Onboarding or placeholder for empty collections.

**Use for:** Getting started pages, empty data states, first-run experiences.

**Capabilities:**
| Key | Description |
|-----|-------------|
| `illustration` | Decorative illustration |
| `action-button` | Primary call-to-action |
| `description` | Explanatory text |

---

## Icons

All icons come from Lucide React. Use these identifiers in the `icon` field of navigation items.

### Common Choices

| Icon | Typical Use |
|------|-------------|
| `home` | Overview / dashboard |
| `users` | People / team |
| `settings` | Configuration |
| `mail` | Messages / email |
| `package` | Integrations |
| `bar-chart` | Analytics / reports |
| `credit-card` | Billing / payments |
| `shield` | Security |
| `bell` | Notifications |
| `calendar` | Scheduling |
| `database` | Data management |
| `file-text` | Documents |
| `shopping-cart` | Commerce |
| `globe` | Public / external |
| `key` | API keys / auth |
| `layers` | Workflows |
| `list` | Lists / items |
| `monitor` | Monitoring |
| `server` | Infrastructure |
| `zap` | Automation |
| `folder` | Projects / files |
| `briefcase` | Business |
| `building` | Organizations |
| `compass` | Onboarding |
| `help-circle` | Help / support |

### Full Icon Set

105 icons are available:

```
activity        alert-circle    alert-triangle  archive
arrow-down      arrow-left      arrow-right     arrow-up
bar-chart       bell            book            bookmark
box             briefcase       building        calendar
check           check-circle    chevron-down    chevron-left
chevron-right   chevron-up      circle          clipboard
clock           cloud           code            cog
copy            credit-card     database        dollar-sign
download        edit            external-link   eye
file            file-text       filter          flag
folder          globe           grid            hash
heart           help-circle     home            image
inbox           info            key             layers
layout          link            list            lock
log-out         mail            map             map-pin
menu            message-circle  minus           monitor
more-horizontal more-vertical   package         paperclip
pause           percent         phone           pie-chart
play            plus            plus-circle     power
printer         refresh-cw      save            search
send            server          settings        share
shield          shopping-cart   slash           sliders
smartphone      star            stop-circle     sun
tag             target          terminal        thumbs-down
thumbs-up       trash           trending-down   trending-up
truck           unlock          upload          user
user-plus       users           x               x-circle
zap
```

---

## CLI Reference

### init

```bash
dashboard-bootstrap init [directory]
```

Creates a starter `dashboard.yaml` in the target directory (defaults to current directory). Fails if `dashboard.yaml` already exists.

**Exit codes:** 0 = success, 1 = file already exists.

### validate

```bash
dashboard-bootstrap validate <manifest-file>
```

Validates the manifest against the JSON Schema and runs semantic checks (duplicate routes, orphan pages, invalid templates/icons/capabilities).

**Exit codes:** 0 = valid, 1 = invalid or file not found.

### generate

```bash
dashboard-bootstrap generate <manifest-file>
```

Validates the manifest, then generates project files. System-generated files are always overwritten. Scaffold files are created only if they don't already exist.

Output lines are prefixed: `+` = created, `~` = updated, `-` = skipped.

Drift warnings appear when a system-generated file was modified externally since the last generation.

**Exit codes:** 0 = success, 1 = validation error, 2 = generation error.

### add-page

```bash
dashboard-bootstrap add-page <name> --template <type> [--manifest <file>]
```

Adds a new page to the manifest and regenerates. The manifest file defaults to `dashboard.yaml`.

**Exit codes:** 0 = success, 1 = invalid arguments, 2 = generation error.

### doctor

```bash
dashboard-bootstrap doctor
```

Checks the development environment:
- Node.js >= 20
- pnpm available
- TypeScript compiler available

**Exit codes:** 0 = all checks pass, 3 = environment issues.

---

## Validation Errors

Common validation errors and how to fix them:

| Error | Cause | Fix |
|-------|-------|-----|
| Invalid template | Template name not in approved list | Use one of the 9 template names above |
| Invalid icon | Icon name not in approved set | Check the full icon set above |
| Duplicate route | Two pages share the same route | Give each page a unique route |
| Orphan page | A page has no matching navigation entry | Add a navigation item for the route |
| Invalid capability | Capability key not valid for the template | Check the capability table for that template |
| Missing required field | `version`, `application`, `navigation`, or `pages` is missing | Add the required field |

---

## Design System Components

The generated scaffold pages use components from two packages:

**@dashboard-bootstrap/design-system** — Low-level UI primitives:
AppShell, PageHeader, PrimaryAction, AppCard, MetricCard, StatusBadge, SearchInput, AppDataTable, AppDrawer, AppDialog, AppForm, FormField, EmptyState, LoadingState, ErrorState, Icon

**@dashboard-bootstrap/templates** — Page-level compositions:
DashboardTemplate, TableTemplate, DetailTemplate, SettingsTemplate, WizardTemplate, CatalogTemplate, BuilderTemplate, SplitViewTemplate, EmptyStateTemplate

Import templates in your scaffold pages:

```tsx
import { TableTemplate } from '@dashboard-bootstrap/templates';
import { MetricCard, StatusBadge } from '@dashboard-bootstrap/design-system';
```
