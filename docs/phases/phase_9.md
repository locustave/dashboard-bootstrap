# Phase 9 — CLI Package

## Objective

Implement the standalone CLI entry point exposing `init`, `validate`, `generate`, `add-page`, and `doctor` commands. Executable via npx.

## Inputs

- `docs/PRD.md` — CLI requirements (Sections 8, 9, 15, 16, 25)
- `docs/TDD.md` — CLI interface, error handling, exit codes

## Allowed Paths

- `packages/cli/package.json`
- `packages/cli/tsconfig.json`
- `packages/cli/vitest.config.ts`
- `packages/cli/bin/dashboard-bootstrap.ts`
- `packages/cli/src/index.ts`
- `packages/cli/src/commands/init.ts`
- `packages/cli/src/commands/validate.ts`
- `packages/cli/src/commands/generate.ts`
- `packages/cli/src/commands/add-page.ts`
- `packages/cli/src/commands/doctor.ts`
- `packages/cli/src/__tests__/`
- `pnpm-lock.yaml`

## Blocked Paths

None.

## Tasks

1. Add required dependencies (CLI framework if needed) to `package.json`.
2. Implement command dispatcher in `index.ts`.
3. Implement `init` command (scaffold new project with empty manifest).
4. Implement `validate` command (exit 0 valid, exit 1 invalid).
5. Implement `generate` command (validate + generate, exit 0/1/2).
6. Implement `add-page` command (add page to manifest + regenerate).
7. Implement `doctor` command (check environment, exit 0/3).
8. Create `bin/dashboard-bootstrap.ts` entry point.
9. Configure `package.json` bin field for npx execution.
10. Write unit tests mocking schema and generator.

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/cli test` exits 0.
- `pnpm --filter @dashboard-bootstrap/cli build` exits 0.

## Out of Scope

- Deliverables belonging to other phases.
