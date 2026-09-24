# Phase 2 — Schema Package

## Objective

Implement the manifest JSON Schema (v1), TypeScript types, vocabulary exports (TemplateName, IconName, TEMPLATE_NAMES, ICON_NAMES, CAPABILITIES), and `validateManifest()` function with structural, semantic, and cross-reference validation.

## Inputs

- `docs/PRD.md` — manifest structure (Section 9)
- `docs/TDD.md` — schema package interface, data model, validation architecture

## Allowed Paths

- `packages/schema/package.json`
- `packages/schema/tsconfig.json`
- `packages/schema/vitest.config.ts`
- `packages/schema/src/schema.ts`
- `packages/schema/src/types.ts`
- `packages/schema/src/vocabulary.ts`
- `packages/schema/src/validate.ts`
- `packages/schema/src/index.ts`
- `packages/schema/src/__tests__/`
- `pnpm-lock.yaml`

## Blocked Paths

- All paths outside the above list.

## Tasks

1. Add required dependencies (JSON Schema validator, YAML parser) to `packages/schema/package.json`.
2. Define `TemplateName` and `IconName` types and runtime arrays (`TEMPLATE_NAMES`, `ICON_NAMES`) in `vocabulary.ts`. Define `CAPABILITIES` mapping per template type.
3. Define `DashboardManifest`, `PageDefinition`, `NavigationItem`, `PageCapabilities`, `ValidationResult`, and `ValidationError` types in `types.ts`.
4. Define the JSON Schema (draft 2020-12) for manifest v1 in `schema.ts`.
5. Implement `validateManifest(input: unknown): ValidationResult` in `validate.ts` with structural, semantic, and cross-reference validation.
6. Export all public API from `index.ts` matching the TDD interface.
7. Write unit tests covering valid manifests, each validation rule, edge cases, and error message structure.

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/schema test` exits 0.
- `pnpm --filter @dashboard-bootstrap/schema build` exits 0.

## Out of Scope

- React components.
- Generator or CLI logic.
- Deliverables belonging to other phases.
