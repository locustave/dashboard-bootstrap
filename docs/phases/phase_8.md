# Phase 8 — Generator Package

## Objective

Implement the deterministic code generator that reads a validated manifest, emits project files (system-generated routes/navigation/config and scaffold page files), and manages `.dashboard-bootstrap/state.json` for ownership tracking with drift detection and idempotent regeneration.

## Inputs

- `docs/PRD.md` — generator requirements (Sections 13, 14)
- `docs/TDD.md` — generator interface, key flows, ownership rules, state management

## Allowed Paths

- `packages/generator/package.json`
- `packages/generator/tsconfig.json`
- `packages/generator/vitest.config.ts`
- `packages/generator/src/generate.ts`
- `packages/generator/src/add-page.ts`
- `packages/generator/src/state.ts`
- `packages/generator/src/types.ts`
- `packages/generator/src/templates/`
- `packages/generator/src/index.ts`
- `packages/generator/src/__tests__/`
- `pnpm-lock.yaml`

## Blocked Paths

None.

## Tasks

1. Add required dependencies (filesystem, template, YAML libraries) to `package.json`.
2. Implement `GenerateOptions`, `GenerateResult`, and `GeneratorState` types in `types.ts`.
3. Implement `state.ts` for reading/writing `.dashboard-bootstrap/state.json`.
4. Implement code generation templates for routes, navigation, and dashboard config.
5. Implement `generate()` with validate, plan, write system-generated, write scaffold, update state, report.
6. Implement `addPage()` with manifest-first flow.
7. Implement drift detection (hash mismatch warning + overwrite).
8. Implement scaffold protection (never overwrite existing scaffold files).
9. Implement filesystem containment (all writes inside resolved project output root).
10. Export public API from `index.ts`.
11. Write unit and integration tests (idempotent generation, drift detection, scaffold protection, application file isolation).

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/generator test` exits 0.
- `pnpm --filter @dashboard-bootstrap/generator build` exits 0.

## Out of Scope

- CLI command parsing (Phase 9).
- Deliverables belonging to other phases.
