# Technical Design Document
## Dashboard Bootstrap

**Document:** `docs/TDD.md`
**Status:** Draft
**Version:** 0.3
**Date:** September 2026

---

## Overview

Dashboard Bootstrap is a monorepo containing a design-system component library, page template library, manifest schema, deterministic code generator, standalone CLI, a reference application, and an AI bootstrap skill. Together these allow a developer or AI coding agent to describe a SaaS administrative dashboard in a YAML manifest (`dashboard.yaml`) and receive a generated React/TypeScript/MUI application that conforms to a shared visual language.

`dashboard.yaml` is the sole authoritative source of truth for dashboard structure. All generated output is derived from the manifest. Generated files must never become an alternate source of truth.

Dashboard Bootstrap has no runtime dependency on Keel. Keel may consume Dashboard Bootstrap through a future plugin adapter that lives outside the core repository.

```text
PRD / Product Requirements
          |
          v
    AI Bootstrap Skill
          |
          v
    dashboard.yaml
   SOURCE OF TRUTH
          |
          v
   Schema Validation
          |
          v
      Generator
          |
   +------+------+
   |             |
   v             v
generated     scaffold
files         files
system-owned  app-owned after creation
   |
   v
Design System + Templates
   |
   v
React / TypeScript / MUI Application
```

---

## Tech Stack

| Dimension | Decision | Notes |
|-----------|----------|-------|
| Language / runtime | TypeScript (ES2022), Node >= 20 | Node >= 20 for current LTS support |
| Data storage | None | Generated apps use mock/fixture data; no database |
| Frontend / UI | React + MUI + Vite | See version pinning below |
| Test runner | Vitest (unit + integration), Playwright (visual regression) | |
| Deployment target | npm packages (library); local dev server (reference app); npx-executable CLI | |
| Package manager | pnpm (workspace protocol) | |
| Monorepo tooling | pnpm workspaces; Turborepo for task orchestration | |
| Icon library | Lucide React | Single approved icon library for v1 |
| Component explorer | Storybook | Design-system and template documentation |

### React and MUI Version Pinning

The architectural requirement is compatibility with the **current stable major versions** of React and MUI at the time implementation begins. React 18 and MUI 5 were selected during initial TDD generation as the stable majors at that time.

Before implementation begins (Phase 1), the implementer must confirm the target major versions against the actual current stable releases and lock them. If React 19 or MUI 6 are stable and the team prefers them, that is an acceptable implementation-time decision — not an architecture change — provided:

1. The selected React major version is a current stable release.
2. The selected MUI major version is compatible with the selected React version.
3. The choice is documented in `package.json` and this section is updated to reflect the confirmed versions.

This is not an open architecture blocker. It is a version confirmation step during initial package setup.

---

## Architecture

### Repository Components

The repository contains:

- **Five npm packages** under `packages/`: design-system, templates, schema, generator, cli
- **One AI skill directory** under `skills/`: dashboard-bootstrap
- **One reference application** under `examples/`: reference-app
- **Example manifests** under `examples/manifests/`
- **Visual regression tests** under `tests/visual-regression/`

The AI skill and reference application are not npm packages. They are consumed differently from the library packages.

### Monorepo Structure

```text
dashboard-bootstrap/
  packages/
    design-system/       — Design tokens, MUI theme, semantic React components
    templates/           — Page-level template components (dashboard, table, detail, etc.)
    schema/              — Manifest JSON Schema, TypeScript types, validation logic
    generator/           — Deterministic code generator (manifest -> project files)
    cli/                 — Standalone CLI entry point (dashboard-bootstrap command)
  skills/
    dashboard-bootstrap/ — AI skill (SKILL.md, examples, manifest guidance)
  examples/
    reference-app/       — Full working app demonstrating design system + templates
    manifests/           — Example dashboard.yaml files
  docs/
    PRD.md
    TDD.md
    DESIGN_SYSTEM.md
    design-research/
  tests/
    visual-regression/   — Playwright visual comparison tests against reference app
```

### Package Descriptions

- `@dashboard-bootstrap/design-system` — MUI theme provider, design tokens, and semantic component library (AppShell, PageHeader, AppDataTable, StatusBadge, etc.). Leaf package with no dependency on other dashboard-bootstrap packages.
- `@dashboard-bootstrap/templates` — Page-level layout components (DashboardTemplate, TableTemplate, DetailTemplate, etc.) composed from design-system components. Depends on `design-system`.
- `@dashboard-bootstrap/schema` — JSON Schema definition for `dashboard.yaml`, TypeScript types derived from the schema, a `validate()` function, and the canonical manifest vocabulary (TemplateName, IconName, capability identifiers). Zero React dependencies. Leaf package with no dependency on other dashboard-bootstrap packages.
- `@dashboard-bootstrap/generator` — Reads a validated manifest and emits files to disk. Depends on `schema` (for types and validation). Has build-time knowledge of `templates` and `design-system` package names (for import generation) but does not import their React code at runtime.
- `@dashboard-bootstrap/cli` — Thin command dispatcher exposing `init`, `validate`, `generate`, `add-page`, and `doctor` commands. Depends on `schema` and `generator`. Entry point for standalone usage.

### Non-Package Components

- `skills/dashboard-bootstrap/` — AI skill definition containing SKILL.md, examples, and manifest guidance/reference material. Not an npm package. Consumed by Claude, Codex, or other coding agents as context. Has no runtime dependency on Keel. Keel may later expose/register this skill through a plugin adapter.
- `examples/reference-app/` — Vite + React application importing `design-system` and `templates` directly. Demonstrates all page patterns with fixture data. Used as the visual regression baseline and component integration test surface.

---

## Dependency Direction

Dependencies flow strictly downward. No circular or upward dependencies are permitted.

```text
cli
 ├── generator
 │    └── schema
 └── schema

templates
 └── design-system

reference-app (example, not a package)
 ├── design-system
 └── templates

schema          (leaf — no dashboard-bootstrap deps, no React deps)
design-system   (leaf — no dashboard-bootstrap deps)
```

Rules:
1. `design-system` and `schema` are leaf packages with zero internal dependencies.
2. `templates` depends only on `design-system`.
3. `generator` depends only on `schema`. It emits import statements referencing `design-system` and `templates` but does not execute React code.
4. `cli` depends on `generator` and `schema`.
5. `reference-app` depends on `design-system` and `templates` as a consuming application.
6. No package may depend on `cli`.
7. No package may depend on `generator` except `cli`.
8. No dashboard-bootstrap package may depend on Keel. Dependency direction is strictly Keel -> Dashboard Bootstrap.

---

## Manifest Authority

`dashboard.yaml` is the sole authoritative source of truth for dashboard structure.

Dashboard structure includes:
- Application metadata (name, description)
- Navigation (labels, icons, routes, hierarchy)
- Routes
- Pages (identifiers, route bindings, template assignments)
- Page capabilities (template-specific feature flags)
- All other manifest-defined structural configuration

### Authority Rules

1. All system-generated files are derived from `dashboard.yaml`. They are outputs, not inputs.
2. No generated file may serve as the source of truth for dashboard structure.
3. The generator reads only from `dashboard.yaml` (validated) when determining what to produce.
4. Any command that modifies dashboard structure (including `add-page`) must modify `dashboard.yaml` first, validate it, and then regenerate derived output.
5. If `dashboard.yaml` and generated output ever diverge, `dashboard.yaml` wins. Running `generate` again restores consistency.

---

## Design-System Ownership

The Dashboard Bootstrap Design System is the authoritative source of truth for shared UI behavior and visual language.

### Contract Layers

```text
DESIGN_SYSTEM.md
      |
      v
@dashboard-bootstrap/design-system
      |
      v
@dashboard-bootstrap/templates
      |
      v
Generated and product applications
```

`DESIGN_SYSTEM.md` is the human-readable design contract. `@dashboard-bootstrap/design-system` is the executable implementation of that contract. These are versioned together — changes to one must be reflected in the other.

### Design-System Scope

The design system owns:
- Design tokens (color, spacing, typography, radius, elevation)
- Typography scale and font stack
- Color system (palette, semantic colors, surface colors)
- Spacing scale
- Layout rules (page structure, grid, responsive breakpoints)
- Radius and elevation values
- Icon rendering (via the `Icon` component abstracting Lucide React)
- Semantic components (AppShell, PageHeader, AppDataTable, etc.)
- Shared interaction patterns (drawer, dialog, filter behavior)
- Standard visual behaviors (loading, empty, error states)

### Ownership Boundaries

- Product PRDs do not redefine design-system values.
- Product TDDs do not redefine design-system values.
- The generator does not invent visual rules. It emits code that imports and composes design-system components.
- The AI skill does not invent visual rules. It selects from approved templates and capabilities.
- Keel may validate and enforce the design-system contract through gates, but does not own the contract.
- The reference application consumes the design system; it does not define it.

---

## Manifest Vocabulary Ownership

The `@dashboard-bootstrap/schema` package owns the canonical manifest vocabulary. This includes all identifiers and enums that appear in `dashboard.yaml`:

- `TemplateName` — the set of approved page template identifiers (`dashboard`, `table`, `detail`, `settings`, `wizard`, `catalog`, `builder`, `split-view`, `empty-state`)
- `IconName` — the set of approved icon identifiers (corresponding to available Lucide icons). This is the sole canonical definition of which icon identifiers are valid in `dashboard.yaml`. The design-system package implements icon rendering for these identifiers but does not independently define or re-export the manifest `IconName` vocabulary.
- Capability identifiers — the set of valid capability keys per template type
- Route and manifest structural rules — path format, identifier format, nesting rules

### Vocabulary Conformance

Implementation packages must conform to the vocabulary defined in `schema`:

```text
@dashboard-bootstrap/schema
    owns manifest IconName vocabulary
                |
                v
@dashboard-bootstrap/design-system
    implements icon registry supporting all schema IconName values
                |
                v
conformance tests
    verify complete coverage
```

```text
schema
  owns TemplateName enum
      |
      +--> templates implements one template component per TemplateName value
      |
  owns IconName enum (sole canonical definition)
      |
      +--> design-system implements Icon component supporting all IconName values
      |        (design-system must NOT redefine or independently own IconName vocabulary)
      |
  owns capability identifiers
      |
      +--> templates accepts capabilities matching schema definitions
      |
  owns validated manifest types
      |
      +--> generator consumes validated manifest to produce output
```

No circular dependencies are introduced. `schema` does not import from `design-system` or `templates`. `design-system` does not import from `schema`. Conformance is verified exclusively through test-time checks:

- **Template coverage test:** Asserts that `templates` exports a component for every `TemplateName` value in `schema`.
- **Icon coverage test:** Asserts that the `Icon` component in `design-system` handles every `IconName` value defined in `schema`. This is the mechanism that detects vocabulary drift between the two packages.
- **Capability coverage test:** Asserts that template prop interfaces accept the capability keys defined in `schema` for their template type.

These are tests, not import-time dependencies. They run in the test suite, not at package build time, preserving the dependency DAG.

---

## Public Interfaces

### design-system

```typescript
// Theme
export { DashboardThemeProvider } from './theme'
export { tokens } from './tokens'

// Shell
export { AppShell } from './components/AppShell'
export { Sidebar } from './components/Sidebar'
export { TopNav } from './components/TopNav'

// Page structure
export { Page } from './components/Page'
export { PageHeader } from './components/PageHeader'
export { PrimaryAction } from './components/PrimaryAction'

// Content
export { AppDataTable } from './components/AppDataTable'
export { AppCard } from './components/AppCard'
export { MetricCard } from './components/MetricCard'
export { StatusBadge } from './components/StatusBadge'
export { FilterBar } from './components/FilterBar'
export { SearchInput } from './components/SearchInput'
export { AppDrawer } from './components/AppDrawer'
export { AppDialog } from './components/AppDialog'

// States
export { EmptyState } from './components/EmptyState'
export { LoadingState } from './components/LoadingState'
export { ErrorState } from './components/ErrorState'

// Forms
export { AppForm } from './components/AppForm'
export { FormField } from './components/FormField'

// Icons
export { Icon } from './components/Icon'
```

The `Icon` component abstracts Lucide React. It accepts icon identifiers that correspond to the canonical `IconName` vocabulary defined in `@dashboard-bootstrap/schema`. The design-system does not independently define or re-export the manifest `IconName` type — `schema` is the sole canonical owner of that vocabulary. The `Icon` component's internal registry must support every `IconName` value defined in `schema`, verified by conformance tests.

Consuming applications should use `Icon` rather than importing Lucide directly. This allows the underlying icon library to be replaced without changing application code.

Exact component list will be refined during design-system implementation. The above represents the minimum surface area implied by the PRD.

### templates

```typescript
export { DashboardTemplate } from './DashboardTemplate'
export { TableTemplate } from './TableTemplate'
export { DetailTemplate } from './DetailTemplate'
export { SettingsTemplate } from './SettingsTemplate'
export { WizardTemplate } from './WizardTemplate'
export { CatalogTemplate } from './CatalogTemplate'
export { BuilderTemplate } from './BuilderTemplate'
export { SplitViewTemplate } from './SplitViewTemplate'
export { EmptyStateTemplate } from './EmptyStateTemplate'
```

Each template exposes an explicit, strongly typed TypeScript prop interface defining what the consuming page can configure. Template props are specific to the template pattern (e.g., `TableTemplate` accepts column definitions, row actions, filter config; `DashboardTemplate` accepts metric cards, activity sections). Shared prop types may be extracted where genuinely reusable, but untyped or generic arbitrary configuration blobs are not acceptable as the primary template API.

### schema

```typescript
// Validation
export { validateManifest } from './validate'

// Schema
export { ManifestSchema } from './schema'           // JSON Schema object

// Types
export type { DashboardManifest } from './types'     // Full manifest type
export type { PageDefinition, NavigationItem, PageCapabilities } from './types'
export type { ValidationResult, ValidationError } from './validate'

// Vocabulary
export type { TemplateName } from './vocabulary'
export type { IconName } from './vocabulary'
export { TEMPLATE_NAMES } from './vocabulary'        // Runtime array of valid template names
export { ICON_NAMES } from './vocabulary'             // Runtime array of valid icon names
export { CAPABILITIES } from './vocabulary'           // Capability definitions per template
```

`validateManifest(input: unknown): ValidationResult` — returns `{ valid: true, manifest: DashboardManifest }` or `{ valid: false, errors: ValidationError[] }`.

### generator

```typescript
export { generate } from './generate'
export { addPage } from './add-page'
export type { GenerateOptions, GenerateResult } from './types'
export type { GeneratorState } from './state'
```

`generate(manifest: DashboardManifest, options: GenerateOptions): GenerateResult` — writes files to the target directory, updates generator state, and returns a manifest of created/updated/skipped files with their ownership categories.

`addPage(manifestPath: string, pageId: string, options: AddPageOptions): GenerateResult` — reads the manifest, adds the page definition, validates the updated manifest, writes the manifest back, and regenerates affected output.

### cli

```text
dashboard-bootstrap init              — scaffold a new project with an empty manifest
dashboard-bootstrap validate <file>   — validate a manifest without generating
dashboard-bootstrap generate <file>   — validate + generate project from manifest
dashboard-bootstrap add-page <name> --template <type>  — add page to manifest + regenerate
dashboard-bootstrap doctor            — check environment, deps, and design-system compat
```

---

## Data Model

Dashboard Bootstrap has no persistent data store. The primary data structure is the dashboard manifest (`dashboard.yaml`), which is the sole authoritative source of truth for dashboard structure.

### Manifest Structure (v1)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | integer | yes | Schema version (initially `1`) |
| `application.name` | string | yes | Application display name |
| `application.description` | string | no | Short application description |
| `navigation[]` | array | yes | Sidebar navigation items |
| `navigation[].label` | string | yes | Display label |
| `navigation[].icon` | IconName | yes | Icon identifier from approved Lucide set |
| `navigation[].route` | string | yes | Route path |
| `navigation[].children` | NavigationItem[] | no | Nested navigation items |
| `pages{}` | object | yes | Page definitions keyed by page ID |
| `pages.{id}.route` | string | yes | Route path (must match a navigation route or be a sub-route) |
| `pages.{id}.template` | TemplateName | yes | One of the approved template types |
| `pages.{id}.capabilities` | object | no | Template-specific feature flags |

### Generator State

Dashboard Bootstrap maintains machine-readable generator state in the target project:

```text
.dashboard-bootstrap/
  state.json
```

`state.json` contains:

| Field | Type | Description |
|-------|------|-------------|
| `generatorVersion` | string | Version of Dashboard Bootstrap that produced the output |
| `schemaVersion` | integer | Manifest schema version used |
| `manifestHash` | string | Hash of the `dashboard.yaml` used for last generation |
| `files` | object | Map of relative file paths to file metadata |
| `files.{path}.category` | enum | `"system-generated"` or `"scaffold"` |
| `files.{path}.hash` | string | Content hash for system-generated files |
| `files.{path}.createdAt` | string | ISO timestamp of file creation |

Generator state is the authoritative mechanism for ownership detection. Header comments (`// @generated`, `// @scaffold`) are retained for human readability but are not the sole detection mechanism.

The generator uses `state.json` to:
- Determine which files it owns and may overwrite (all system-generated files, regardless of hash state)
- Determine which files were scaffolded and must not be overwritten
- Detect drift in system-generated files (on-disk content hash differs from stored hash, indicating manual or external modification)
- Detect files that exist on disk but are not tracked (application-owned, never touched)

### System-Generated File Hash-Mismatch Behavior

A content hash mismatch on a system-generated file is a **drift/integrity signal**, not an ownership transfer:

- **Hash matches:** The file is unchanged since last generation. Regenerate/overwrite normally.
- **Hash differs:** The file was manually or externally modified since last generation. The generator emits a structured drift warning identifying the file and the mismatch. The file **remains system-owned**. The generator **overwrites the file** with deterministic output derived from the current `dashboard.yaml`. The mismatch does not convert the file to scaffold-owned or application-owned. The mismatch does not cause `dashboard.yaml` to lose authority.

The invariant is absolute:
- `dashboard.yaml` is authoritative.
- System-generated files are replaceable outputs.
- Manual edits to system-generated files are unsupported and will be lost on next generation.

A future explicit protection mode (e.g., `--fail-on-drift`) may be designed separately, but no such behavior is part of v1.

All filesystem mutations by the generator must remain inside the explicitly resolved project output root. Generator state must not allow arbitrary external paths to become generator-owned files.

---

## Key Flows

### Manifest Validation

The developer runs `dashboard-bootstrap validate dashboard.yaml`. The CLI reads the file, parses YAML, and passes the result to `schema.validateManifest()`. Validation applies the JSON Schema for structural correctness, then runs semantic rules: no duplicate routes, no duplicate navigation IDs, all page routes reachable from navigation or as sub-routes of reachable pages, all icons exist in the approved Lucide set (per the `IconName` vocabulary in `schema`), all template names are known (per the `TemplateName` vocabulary in `schema`), and all capability keys are valid for their template type. Errors are returned as a structured array with path, message, and rule ID — usable by both humans and AI agents.

### Full Generation

The developer runs `dashboard-bootstrap generate dashboard.yaml`. The flow is:

1. **Validate** — The CLI validates the manifest. Generation aborts on validation failure.
2. **Read state** — The generator reads `.dashboard-bootstrap/state.json` if it exists (first generation creates it).
3. **Plan** — The generator compares the validated manifest against prior state to determine which system-generated files need creation or update, and which scaffold files are missing.
4. **Write system-generated files** — Routes, navigation config, and dashboard config are written to `src/generated/`. These files are derived entirely from `dashboard.yaml` and are overwritten on every run. If a system-generated file's on-disk content hash differs from the stored hash in `state.json`, the generator emits a drift warning before overwriting. The file is still overwritten — hash mismatch does not prevent regeneration or alter ownership. Each file contains a `// @generated — DO NOT EDIT` header for human readability.
5. **Write scaffold files** — For each page in the manifest, if the corresponding scaffold file does not exist (checked via `state.json` and filesystem), the generator creates a thin page component that composes the appropriate template. Scaffold files receive a `// @scaffold` header. Existing scaffold files are never overwritten.
6. **Write generator state** — `.dashboard-bootstrap/state.json` is updated with the current file manifest, hashes, and metadata.
7. **Report** — The `GenerateResult` lists every file and its disposition (created, updated, skipped) with ownership category. The CLI displays this to the developer.

System-generated file examples:
- `src/generated/routes.generated.tsx`
- `src/generated/navigation.generated.ts`
- `src/generated/dashboard.generated.ts`

Scaffold file examples:
- `src/pages/OverviewPage.tsx`
- `src/pages/UsersPage.tsx`

### Incremental Page Addition

The developer runs `dashboard-bootstrap add-page users --template table`. The flow is manifest-first:

1. **Read manifest** — The CLI reads the current `dashboard.yaml`.
2. **Modify manifest** — The CLI adds the new page definition (and navigation entry if appropriate) to the in-memory manifest.
3. **Validate** — The updated manifest is validated. If validation fails, the command aborts without writing anything.
4. **Persist manifest** — The updated `dashboard.yaml` is written to disk.
5. **Calculate affected output** — The generator determines which system-generated files are affected by the manifest change.
6. **Regenerate system-owned files** — Affected system-generated files (routes, navigation) are regenerated from the updated manifest.
7. **Create scaffold** — If the new page's scaffold file does not exist, it is created.
8. **Update state** — `.dashboard-bootstrap/state.json` is updated.
9. **Report** — The CLI reports all changes.

`add-page` must never:
- Infer authoritative structure from generated navigation files
- Directly modify generated routing without first updating `dashboard.yaml`
- Optionally update the manifest (the manifest update is mandatory)
- Allow `dashboard.yaml` and generated configuration to drift

---

## Generated-Code Ownership Rules

The generator distinguishes between three file categories. Ownership behavior is unambiguous.

### System-Generated Files

Examples:
- `src/generated/routes.generated.tsx`
- `src/generated/navigation.generated.ts`
- `src/generated/dashboard.generated.ts`

Rules:
- Owned entirely by Dashboard Bootstrap. Ownership is permanent and unconditional for the lifetime of the file's entry in `state.json`.
- Derived entirely from `dashboard.yaml` and generator configuration.
- May be regenerated or overwritten at any time by `generate` or `add-page`.
- Application developers should not modify them. Modifications will be lost on next generation.
- If a system-generated file is manually modified (on-disk hash differs from `state.json` hash), the generator emits a drift warning but still overwrites the file. Hash mismatch is a drift signal, not an ownership transfer.
- Tracked in `.dashboard-bootstrap/state.json` with `category: "system-generated"` and a content hash.
- Contain a `// @generated — DO NOT EDIT` header for human readability.

### Scaffold Files

Examples:
- `src/pages/UsersPage.tsx`
- `src/pages/SettingsPage.tsx`

Rules:
- Created only when the file does not already exist.
- Become application-owned immediately after creation. They are thin extension points that compose templates and design-system components.
- **Must never be overwritten by subsequent generation.** This is absolute.
- Tracked in `.dashboard-bootstrap/state.json` with `category: "scaffold"` and a creation timestamp.
- Contain a `// @scaffold` header on first creation for human readability. The presence or absence of this header does not affect ownership — `state.json` is authoritative.
- If a scaffold file exists on disk (whether tracked or untracked), the generator skips it and reports a skip.

### Application-Owned Files

Examples:
- `src/features/`
- `src/services/`
- `src/hooks/`
- `src/components/` (custom product components)

Rules:
- Never created, overwritten, or modified by routine generation.
- Not tracked in `.dashboard-bootstrap/state.json`.
- Dashboard Bootstrap treats these as entirely outside generator ownership.
- No future generation command may touch application-owned files unless an explicit, separate capability is designed and approved for that purpose.

---

## Manifest Validation Architecture

Validation is layered:

1. **Structural validation** — JSON Schema (draft 2020-12) validates the shape: required fields, types, enum values, pattern constraints. This catches missing fields, wrong types, unknown template names (validated against `TemplateName` vocabulary), and invalid icon names (validated against `IconName` vocabulary).

2. **Semantic validation** — Programmatic rules run after structural validation passes:
   - No duplicate `route` values across pages
   - No duplicate `label` values within a navigation level
   - Every page route is navigable (reachable from a navigation item or as a parameterized child of one)
   - Capability keys are valid for their template type (e.g., `search` is valid for `table` but not for `settings`)
   - Route parameters (`:id`) are only used in templates that support them (`detail`, `builder`)

3. **Cross-reference validation** — Checks relationships between manifest sections:
   - Navigation routes reference defined pages
   - Child routes have corresponding parent routes

Each validation error includes:
- `path` — JSON pointer to the failing location (e.g., `/pages/users/capabilities/search`)
- `rule` — Machine-readable rule ID (e.g., `duplicate-route`)
- `message` — Human-readable description
- `severity` — `error` (blocks generation) or `warning` (generation proceeds)

---

## Error Handling

All packages use structured error types. The CLI maps errors to human- and machine-readable output.

- **CLI exit codes:** 0 = success, 1 = validation error, 2 = generation error, 3 = environment error (doctor failures)
- **Validation errors:** returned as `ValidationError[]` with path, rule, message, and severity. Formatted as a list for terminal output and as JSON when `--format json` is passed.
- **Generator errors:** wrapped in `GenerateError` with the source file path, operation attempted, and underlying cause.
- **Logging:** CLI uses stderr for progress/warnings, stdout for structured output. No runtime logging library required in library packages.

---

## Testing Strategy

### Unit Tests (Vitest)

| Package | What is tested | Approach |
|---------|---------------|----------|
| `schema` | JSON Schema validation, semantic rules, vocabulary completeness, edge cases | Pure function tests — pass manifest objects, assert validation results |
| `generator` | File generation logic, template rendering, ownership rules, state management | Snapshot tests — generate to in-memory filesystem, compare output trees |
| `cli` | Command parsing, option handling, error formatting | Mock `schema` and `generator`, assert CLI output and exit codes |
| `design-system` | Component rendering, prop variations, accessibility | React Testing Library — render components, assert DOM structure |
| `templates` | Template composition, prop forwarding, layout structure | React Testing Library — render templates with fixture data |

Run: `pnpm test` (delegates to Turborepo which runs `vitest` in each package)

### Vocabulary Conformance Tests (Vitest)

Cross-package tests that verify implementation packages conform to the vocabulary defined in `schema`:

- **Template coverage:** Every `TemplateName` in `schema` has a corresponding export in `templates`.
- **Icon coverage:** Every `IconName` in `schema` is handled by the `Icon` component in `design-system`.
- **Capability coverage:** Template prop interfaces accept the capability keys defined in `schema` for their template type.

These are test-time checks, not import-time dependencies. They preserve the dependency DAG.

### Integration Tests (Vitest)

End-to-end generation flow: given a manifest fixture, run `generate()` and assert the full output directory structure, file contents, import correctness, and `state.json` integrity. Run as part of `pnpm test`.

Required integration test scenarios include:

1. **Idempotent generation:** Re-running `generate` on the same manifest produces identical system-generated files and does not touch scaffold files.
2. **Drift detection and overwrite:** A system-generated file is manually modified between generations. The subsequent `generate` detects the hash mismatch, reports it as drift, and overwrites the file with deterministic output. The file remains system-owned in `state.json`.
3. **Scaffold protection:** A scaffold file exists on disk. Running `generate` skips it regardless of manifest changes. The scaffold file is never overwritten.
4. **Application file isolation:** Files outside generator tracking (application-owned) are not created, modified, or deleted by `generate`.

### Visual Regression Tests (Playwright)

Capture screenshots of the reference app's pages and compare against stored baselines. Tests run against the reference app dev server. Detect unintended visual changes when design-system or template code changes.

Run: `pnpm test:visual`

### Design-System Governance Tests

Lint-time checks for generated and reference apps:
- No direct MUI imports outside `design-system` package (enforced via ESLint rule or import boundary check)
- No direct Lucide imports outside `design-system` package
- No additional icon libraries
- No inline style values that override design tokens

Run: as part of `pnpm lint`

---

## Versioning Strategy

### Package Versioning

All packages in the monorepo share a single version number (lockstep versioning). When any package changes, all packages are published with the same version. This avoids cross-package version matrix complexity during early development.

The version is maintained in the root `package.json` and propagated to workspace packages at publish time.

During initial development (v1), packages are consumed via pnpm workspace protocol. They are structured so they can later be published to npm without redesign, but public npm publishing is not a prerequisite for v1 development. The exact release automation (Changesets, manual bumps, or custom script) may remain a later implementation decision as long as it does not block architecture.

### Manifest Schema Versioning

The manifest includes a `version` field (integer, starting at `1`). The schema package supports all active schema versions. When a breaking manifest change is required, the schema version is incremented and a migration path is documented.

The generator accepts only manifests whose schema version it supports. Validation fails with a clear message if the version is unsupported.

### Design-System Contract Versioning

The design-system's public API (exported components and their prop interfaces) constitutes a contract. Breaking changes to this contract require a major version bump. `DESIGN_SYSTEM.md` is versioned alongside the executable `design-system` package — changes to one must be reflected in the other.

---

## Keel Plugin Integration Boundary

Dashboard Bootstrap must function standalone. No dashboard-bootstrap package may import from or depend on Keel. The dependency direction is strictly: **Keel -> Dashboard Bootstrap**, never the reverse.

### What Keel May Do

- **Invoke** Dashboard Bootstrap CLI commands (via subprocess or programmatic API)
- **Expose** Dashboard Bootstrap commands as Keel commands (`keel dashboard generate`, etc.)
- **Register** the AI skill from `skills/dashboard-bootstrap/` in Keel's skill registry
- **Run** Dashboard Bootstrap validation, tests, and linting as Keel gates (`dashboard-schema`, `design-system`, `frontend-tests`, `visual-regression`)

### What Keel Must Not Own

- Dashboard manifests — `dashboard.yaml` is owned by the product, validated by `schema`
- Design-system rules — owned by `DESIGN_SYSTEM.md` and `design-system` package
- Templates — owned by the `templates` package
- Generator behavior — owned by the `generator` package

### Plugin Adapter Location

A future Keel plugin adapter would live in a separate package (`@dashboard-bootstrap/keel-plugin` or within the Keel repository) — not inside the core dashboard-bootstrap monorepo. This preserves the standalone constraint.

```text
Keel Plugin Adapter (external)
  └── @dashboard-bootstrap/cli    (programmatic or subprocess)
  └── @dashboard-bootstrap/schema (for direct validation)
```

The integration boundary is the `cli` package's public commands and the `schema` package's `validateManifest` function. No internal package APIs are exposed to Keel.

---

## Security Considerations

- **No authentication/authorization** — Dashboard Bootstrap is a development tool and code generator. Generated applications do not include auth; that is product-specific.
- **No network access at generation time** — The CLI and generator operate entirely on local files. No telemetry, no package fetching during generation.
- **Input validation** — The manifest is validated before any file I/O. Path traversal in route definitions or page IDs is rejected by schema validation (restricted character set).
- **Generated code safety** — Templates use static string interpolation, not `eval` or dynamic code execution. Generated files contain no user-supplied executable code.
- **Filesystem containment** — All filesystem mutations by the generator must remain inside the explicitly resolved project output root. Generator state metadata (`state.json`) must not allow arbitrary external paths to become generator-owned files. Path resolution is validated before write operations.

---

## Performance Considerations

- **Generation speed** — Target: full project generation in under 5 seconds on a modern developer workstation. The generator performs file writes, not computation-heavy work.
- **Validation speed** — Target: manifest validation in under 500ms. Schema validation and semantic rules are synchronous, in-memory operations.
- **Monorepo build** — Turborepo caches build outputs per package. Incremental rebuilds after a single package change should complete in seconds.

---

## Resolved Architecture Decisions

All former open questions have been resolved. Decisions are recorded here for traceability.

### AD-1: Icon Library (formerly OQ-1)

**Decision:** Lucide React is the single approved application icon library for v1.

The design-system `Icon` component abstracts Lucide. Consuming applications should use `Icon` rather than importing Lucide directly, so the underlying library can be replaced without changing application code.

### AD-2: Template Prop Contracts (formerly OQ-2)

**Decision:** Each template exposes an explicit, strongly typed TypeScript prop interface. Untyped or generic arbitrary configuration blobs are not acceptable as the primary template API. Shared types may be extracted where genuinely reusable.

### AD-3: Scaffold Strategy (formerly OQ-3)

**Decision:** Scaffold files are thin application-owned extension points that compose approved page templates and semantic design-system components. They are created once and never overwritten. They provide minimal starting structure that the developer extends.

### AD-4: Design Token Format (formerly OQ-4)

**Decision:** TypeScript token definitions are the canonical executable token source for v1. They feed the MUI theme and may expose CSS custom properties where useful. Style Dictionary is not introduced in v1 unless a concrete requirement emerges.

### AD-5: Component Explorer (formerly OQ-5)

**Decision:** Storybook. Storybook documents design-system components and page-template states.

### AD-6: Publish Strategy (formerly OQ-6)

**Decision:** Workspace-local packages during initial development. Packages are structured for future npm publishing without redesign. Public npm publishing is not a prerequisite for v1. Release automation is a later implementation decision.

### AD-7: Generated File Detection (formerly OQ-7)

**Decision:** Machine-readable generator state (`.dashboard-bootstrap/state.json`) is the authoritative ownership mechanism. It tracks file paths, categories, and content hashes. Header comments (`// @generated`, `// @scaffold`) are retained for human readability but are not the sole detection mechanism.

### AD-8: add-page Synchronization (formerly OQ-8)

**Decision:** Manifest-first. `add-page` always modifies `dashboard.yaml` first, validates it, and regenerates derived output. The manifest update is mandatory, not optional. Generated configuration must never be modified without a corresponding manifest update.

### AD-9: Routing (formerly OQ-9)

**Decision:** Use one approved React Router major version. Generated route construction is centralized behind Dashboard Bootstrap route definitions in system-generated files. Application code should not depend heavily on generator-specific routing internals. The specific React Router major version is confirmed during implementation (alongside the React/MUI version confirmation) — this is a version selection, not an architecture decision.

### AD-10: AI Skill Delivery (formerly OQ-10)

**Decision:** The AI skill is a standalone directory at `skills/dashboard-bootstrap/` containing SKILL.md, examples, and manifest guidance/reference material. It has no runtime dependency on Keel. Keel may later expose/register the skill through a plugin adapter.

---

## Non-Blocking Implementation Details

The following are implementation-time decisions that do not block the architecture:

- Exact React and MUI major versions (confirmed during Phase 1 package setup; see Tech Stack section)
- Exact React Router major version (confirmed alongside React version)
- Release automation tooling (Changesets vs. alternatives; decided when first external publish is needed)
- Storybook configuration details (decided during component documentation setup)
- Exact ESLint rule configuration for governance checks (decided during lint setup)

---

## Deliverables

```yaml
- id: monorepo-foundation
  type: infra
  description: >
    pnpm workspace configuration, Turborepo pipeline, root package.json,
    tsconfig base, ESLint base config, and empty package scaffolds for
    design-system, templates, schema, generator, and cli.
  files:
    - package.json
    - pnpm-workspace.yaml
    - turbo.json
    - tsconfig.base.json
    - packages/design-system/package.json
    - packages/templates/package.json
    - packages/schema/package.json
    - packages/generator/package.json
    - packages/cli/package.json
  depends_on: []
  verified_by:
    - pnpm install
    - pnpm build

- id: schema-package
  type: schema
  description: >
    Manifest JSON Schema (v1), TypeScript types (DashboardManifest,
    PageDefinition, NavigationItem, PageCapabilities), vocabulary exports
    (TemplateName, IconName, TEMPLATE_NAMES, ICON_NAMES, CAPABILITIES),
    validateManifest() function with structural, semantic, and
    cross-reference validation, and structured ValidationError output.
  files:
    - packages/schema/src/schema.ts
    - packages/schema/src/types.ts
    - packages/schema/src/vocabulary.ts
    - packages/schema/src/validate.ts
    - packages/schema/src/index.ts
  depends_on:
    - monorepo-foundation
  verified_by:
    - pnpm --filter @dashboard-bootstrap/schema test
    - pnpm --filter @dashboard-bootstrap/schema build

- id: design-system-foundation
  type: frontend
  description: >
    DESIGN_SYSTEM.md human-readable contract, design tokens (color, spacing,
    typography, radius, elevation), MUI theme configuration, and
    DashboardThemeProvider component.
  files:
    - docs/DESIGN_SYSTEM.md
    - packages/design-system/src/tokens.ts
    - packages/design-system/src/theme.ts
    - packages/design-system/src/theme/DashboardThemeProvider.tsx
    - packages/design-system/src/index.ts
  depends_on:
    - monorepo-foundation
  verified_by:
    - pnpm --filter @dashboard-bootstrap/design-system test
    - pnpm --filter @dashboard-bootstrap/design-system build

- id: design-system-components
  type: ui
  description: >
    Semantic component library: AppShell, Sidebar, TopNav, Page, PageHeader,
    PrimaryAction, AppDataTable, AppCard, MetricCard, StatusBadge, FilterBar,
    SearchInput, AppDrawer, AppDialog, EmptyState, LoadingState, ErrorState,
    AppForm, FormField, and Icon (abstracting Lucide React).
  files:
    - packages/design-system/src/components/AppShell.tsx
    - packages/design-system/src/components/Sidebar.tsx
    - packages/design-system/src/components/TopNav.tsx
    - packages/design-system/src/components/Page.tsx
    - packages/design-system/src/components/PageHeader.tsx
    - packages/design-system/src/components/PrimaryAction.tsx
    - packages/design-system/src/components/AppDataTable.tsx
    - packages/design-system/src/components/AppCard.tsx
    - packages/design-system/src/components/MetricCard.tsx
    - packages/design-system/src/components/StatusBadge.tsx
    - packages/design-system/src/components/FilterBar.tsx
    - packages/design-system/src/components/SearchInput.tsx
    - packages/design-system/src/components/AppDrawer.tsx
    - packages/design-system/src/components/AppDialog.tsx
    - packages/design-system/src/components/EmptyState.tsx
    - packages/design-system/src/components/LoadingState.tsx
    - packages/design-system/src/components/ErrorState.tsx
    - packages/design-system/src/components/AppForm.tsx
    - packages/design-system/src/components/FormField.tsx
    - packages/design-system/src/components/Icon.tsx
  depends_on:
    - design-system-foundation
  verified_by:
    - pnpm --filter @dashboard-bootstrap/design-system test
    - pnpm --filter @dashboard-bootstrap/design-system build

- id: page-templates
  type: ui
  description: >
    Page-level template components: DashboardTemplate, TableTemplate,
    DetailTemplate, SettingsTemplate, WizardTemplate, CatalogTemplate,
    BuilderTemplate, SplitViewTemplate, EmptyStateTemplate. Each exposes
    strongly typed props and composes design-system components.
  files:
    - packages/templates/src/DashboardTemplate.tsx
    - packages/templates/src/TableTemplate.tsx
    - packages/templates/src/DetailTemplate.tsx
    - packages/templates/src/SettingsTemplate.tsx
    - packages/templates/src/WizardTemplate.tsx
    - packages/templates/src/CatalogTemplate.tsx
    - packages/templates/src/BuilderTemplate.tsx
    - packages/templates/src/SplitViewTemplate.tsx
    - packages/templates/src/EmptyStateTemplate.tsx
    - packages/templates/src/index.ts
  depends_on:
    - design-system-components
  verified_by:
    - pnpm --filter @dashboard-bootstrap/templates test
    - pnpm --filter @dashboard-bootstrap/templates build

- id: reference-app
  type: frontend
  description: >
    Vite + React reference application demonstrating all page patterns with
    fixture data. Imports design-system and templates directly. Serves as
    visual regression baseline and integration test surface.
  files:
    - examples/reference-app/package.json
    - examples/reference-app/vite.config.ts
    - examples/reference-app/src/App.tsx
    - examples/reference-app/src/main.tsx
    - examples/reference-app/src/pages/
    - examples/reference-app/src/fixtures/
  depends_on:
    - page-templates
  verified_by:
    - pnpm --filter reference-app build
    - pnpm --filter reference-app test

- id: generator-package
  type: generated-code
  description: >
    Deterministic code generator: reads validated manifest, emits project
    files (system-generated routes/navigation/config and scaffold page files),
    manages .dashboard-bootstrap/state.json for ownership tracking, supports
    drift detection and idempotent regeneration.
  files:
    - packages/generator/src/generate.ts
    - packages/generator/src/add-page.ts
    - packages/generator/src/state.ts
    - packages/generator/src/types.ts
    - packages/generator/src/templates/
    - packages/generator/src/index.ts
  depends_on:
    - schema-package
  verified_by:
    - pnpm --filter @dashboard-bootstrap/generator test
    - pnpm --filter @dashboard-bootstrap/generator build

- id: cli-package
  type: logic
  description: >
    Standalone CLI entry point exposing init, validate, generate, add-page,
    and doctor commands. Thin command dispatcher delegating to schema and
    generator packages. Executable via npx.
  files:
    - packages/cli/src/index.ts
    - packages/cli/src/commands/init.ts
    - packages/cli/src/commands/validate.ts
    - packages/cli/src/commands/generate.ts
    - packages/cli/src/commands/add-page.ts
    - packages/cli/src/commands/doctor.ts
    - packages/cli/bin/dashboard-bootstrap.ts
  depends_on:
    - generator-package
    - schema-package
  verified_by:
    - pnpm --filter @dashboard-bootstrap/cli test
    - pnpm --filter @dashboard-bootstrap/cli build

- id: ai-bootstrap-skill
  type: docs
  description: >
    AI skill definition: SKILL.md with manifest guidance, example manifests,
    reference material for Claude/Codex/other coding agents. No runtime
    dependency on Keel.
  files:
    - skills/dashboard-bootstrap/SKILL.md
    - skills/dashboard-bootstrap/examples/
    - examples/manifests/
  depends_on:
    - schema-package
    - cli-package
  verified_by:
    - cat skills/dashboard-bootstrap/SKILL.md

- id: storybook-visual-regression-governance
  type: tests
  description: >
    Storybook configuration for design-system and template documentation,
    Playwright visual regression tests against reference app, ESLint
    governance rules (no direct MUI/Lucide imports outside design-system),
    and vocabulary conformance tests (template coverage, icon coverage,
    capability coverage).
  files:
    - .storybook/
    - packages/design-system/.storybook/
    - tests/visual-regression/
    - tests/conformance/
  depends_on:
    - reference-app
    - design-system-components
    - page-templates
    - schema-package
  verified_by:
    - pnpm storybook build
    - pnpm test:visual
    - pnpm lint
```
