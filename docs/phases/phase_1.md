# Phase 1 — Monorepo Foundation

## Objective

Set up the pnpm workspace, Turborepo pipeline, root package.json, shared tsconfig, and empty package scaffolds for all five packages (design-system, templates, schema, generator, cli).

## Inputs

- `docs/PRD.md` — product requirements
- `docs/TDD.md` — technical design
- `agent-rules.md` — repo constitution

## Allowed Paths

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `packages/design-system/package.json`
- `packages/templates/package.json`
- `packages/schema/package.json`
- `packages/generator/package.json`
- `packages/cli/package.json`
- `packages/*/tsconfig.json`
- `packages/*/src/index.ts`
- `.gitignore`
- `.npmrc`

## Blocked Paths

None.

## Deliverables

- `monorepo-foundation`

## Tasks

1. Create root `package.json` with `"private": true`, pnpm workspace configuration, and shared dev dependencies (TypeScript, Vitest, ESLint).
2. Create `pnpm-workspace.yaml` defining `packages/*` and `examples/*` workspaces.
3. Create `turbo.json` with `build`, `test`, and `lint` pipelines with appropriate dependencies.
4. Create `tsconfig.base.json` with shared TypeScript settings (`target: ES2022`, `strict: true`, `moduleResolution: bundler`).
5. Scaffold `package.json` for each of the five packages (`@dashboard-bootstrap/design-system`, `@dashboard-bootstrap/templates`, `@dashboard-bootstrap/schema`, `@dashboard-bootstrap/generator`, `@dashboard-bootstrap/cli`) with correct names, versions, and workspace dependencies matching the TDD dependency DAG.
6. Create minimal `tsconfig.json` extending the base in each package.
7. Create minimal `src/index.ts` placeholder in each package.
8. Verify `pnpm install` and `pnpm build` succeed.

## Exit Criteria

- `pnpm install` exits 0.
- `pnpm build` exits 0.

## Out of Scope

- Product implementation code.
- Component, template, schema, generator, or CLI logic.
- Deliverables belonging to other phases.

## Test Commands

```bash
pnpm install
pnpm build
```
