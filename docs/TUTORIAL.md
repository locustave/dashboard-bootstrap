# Tutorial: Build a Dashboard in 5 Minutes

This tutorial walks you through creating a project management dashboard using Dashboard Bootstrap.

## Prerequisites

- Node.js 20 or later
- pnpm
- TypeScript

First, clone and build Dashboard Bootstrap:

```bash
git clone <repo-url> dashboard-bootstrap
cd dashboard-bootstrap
pnpm install && pnpm build
```

All CLI commands in this tutorial use `pnpm cli` from the repo root. Verify your setup:

```bash
pnpm cli doctor
```

You should see:

```
  ✓ Node.js >= 20
  ✓ pnpm available
  ✓ TypeScript available

Environment is ready.
```

---

## Step 1: Initialize the Project

```bash
pnpm cli init /tmp/project-tracker
```

This creates a starter `dashboard.yaml` in `/tmp/project-tracker/`.

---

## Step 2: Define Your Dashboard

Open `/tmp/project-tracker/dashboard.yaml` and replace its contents:

```yaml
version: 1
application:
  name: Project Tracker
  description: Track projects, tasks, and team activity

navigation:
  - label: Dashboard
    icon: home
    route: /
  - label: Projects
    icon: folder
    route: /projects
  - label: Tasks
    icon: list
    route: /tasks
  - label: Team
    icon: users
    route: /team
  - label: Settings
    icon: settings
    route: /settings

pages:
  dashboard:
    route: /
    template: dashboard
    capabilities:
      metrics: true
      activity-feed: true
      quick-actions: true
  projects:
    route: /projects
    template: table
    capabilities:
      search: true
      filters: true
      sorting: true
  project-detail:
    route: /projects/:id
    template: detail
    capabilities:
      tabs: true
      actions: true
      related-items: true
  tasks:
    route: /tasks
    template: table
    capabilities:
      search: true
      filters: true
      sorting: true
      bulk-actions: true
  team:
    route: /team
    template: table
    capabilities:
      search: true
      sorting: true
  settings:
    route: /settings
    template: settings
    capabilities:
      sections: true
      save-confirmation: true
```

---

## Step 3: Validate

```bash
pnpm cli validate /tmp/project-tracker/dashboard.yaml
```

Expected output:

```
Manifest is valid.
```

If you get errors, check for:
- Typos in template names (must be one of: dashboard, table, detail, settings, wizard, catalog, builder, split-view, empty-state)
- Typos in icon names (see the reference for the full list)
- Duplicate routes
- Missing navigation entries for pages

---

## Step 4: Generate

```bash
pnpm cli generate /tmp/project-tracker/dashboard.yaml
```

Output:

```
  + src/generated/routes.generated.tsx (system-generated)
  + src/generated/navigation.generated.ts (system-generated)
  + src/generated/dashboard.generated.ts (system-generated)
  + src/pages/DashboardPage.tsx (scaffold)
  + src/pages/ProjectsPage.tsx (scaffold)
  + src/pages/ProjectDetailPage.tsx (scaffold)
  + src/pages/TasksPage.tsx (scaffold)
  + src/pages/TeamPage.tsx (scaffold)
  + src/pages/SettingsPage.tsx (scaffold)
Generated 9 files.
```

Your project now has:
- **3 system-generated files** in `src/generated/` — routing, navigation config, and dashboard metadata
- **6 scaffold page files** in `src/pages/` — one per page, ready for customization

---

## Step 5: Customize a Page

Open `/tmp/project-tracker/src/pages/ProjectsPage.tsx`. It starts as a minimal scaffold:

```tsx
// @scaffold
// This file was generated as a starting point. You own it -- edit freely.

import React from 'react';
import { TableTemplate } from '@dashboard-bootstrap/templates';

export default function ProjectsPage() {
  return <TableTemplate title="Projects" />;
}
```

Replace it with real content:

```tsx
// @scaffold
import React from 'react';
import { TableTemplate } from '@dashboard-bootstrap/templates';

const columns = [
  { id: 'name', label: 'Project Name' },
  { id: 'status', label: 'Status' },
  { id: 'owner', label: 'Owner' },
  { id: 'dueDate', label: 'Due Date' },
];

const projects = [
  { id: '1', name: 'Website Redesign', status: 'In Progress', owner: 'Alice', dueDate: '2026-10-15' },
  { id: '2', name: 'Mobile App', status: 'Planning', owner: 'Bob', dueDate: '2026-11-01' },
  { id: '3', name: 'API v2', status: 'Complete', owner: 'Carol', dueDate: '2026-09-30' },
];

export default function ProjectsPage() {
  return (
    <TableTemplate
      title="Projects"
      columns={columns}
      rows={projects}
      searchPlaceholder="Search projects..."
    />
  );
}
```

---

## Step 6: Add a Page Later

Need a new page? Use `add-page`:

```bash
pnpm cli add-page reports --template dashboard --manifest /tmp/project-tracker/dashboard.yaml
```

This:
1. Adds the page definition to `dashboard.yaml`
2. Adds a navigation entry
3. Regenerates the system files
4. Creates `src/pages/ReportsPage.tsx` as a new scaffold

Your existing scaffold files (like the customized `ProjectsPage.tsx`) are untouched.

---

## Step 7: Regenerate Safely

After modifying `dashboard.yaml` by hand, run generate again:

```bash
pnpm cli generate /tmp/project-tracker/dashboard.yaml
```

The generator will:
- Overwrite system-generated files (routes, navigation, config)
- Skip existing scaffold files (your customizations are safe)
- Warn about any drift detected in system-generated files

```
  ~ src/generated/routes.generated.tsx (system-generated)
  ~ src/generated/navigation.generated.ts (system-generated)
  ~ src/generated/dashboard.generated.ts (system-generated)
  - src/pages/DashboardPage.tsx (scaffold)       # skipped — already exists
  - src/pages/ProjectsPage.tsx (scaffold)        # skipped — already exists
  + src/pages/ReportsPage.tsx (scaffold)         # new — created
Generated 7 files.
```

Legend: `+` created, `~` updated, `-` skipped.

---

## Key Concepts

### Templates are starting points

Each template gives you a structured page layout with the right design-system components pre-wired. You fill in the data, actions, and business logic.

### The manifest is the source of truth

`dashboard.yaml` defines what pages exist and how navigation works. The generator derives everything from it. Edit the manifest, regenerate, and the system files update automatically.

### File ownership is enforced

- `// @generated` files: hands off. The generator manages these.
- `// @scaffold` files: yours forever. The generator created them once and will never overwrite them.
- If you accidentally edit a `@generated` file, the next `generate` will detect the drift and restore it.

### State tracking

The generator stores its state in `.dashboard-bootstrap/state.json`. This file tracks which files exist, their categories (system-generated vs scaffold), and content hashes for drift detection. Don't edit it manually.

---

## What's Next

- Browse the [Manifest Reference](REFERENCE.md) for all templates, capabilities, and icons
- Explore the component library with `pnpm storybook:build` (in the Dashboard Bootstrap repo)
- Use the [AI Skill](../skills/dashboard-bootstrap/SKILL.md) to generate manifests from product requirements
- Check the [example manifests](../examples/manifests/) for inspiration
