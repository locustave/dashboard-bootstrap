# Phase 9 Build Ledger — CLI Package

## Summary

Implemented the standalone CLI entry point exposing `init`, `validate`, `generate`, `add-page`, and `doctor` commands. Executable via npx through `bin/dashboard-bootstrap.ts`.

## Commands Implemented

| Command | File | Exit Codes | Purpose |
|---------|------|------------|---------|
| init | `commands/init.ts` | 0/1 | Scaffold project with empty manifest |
| validate | `commands/validate.ts` | 0/1 | Validate manifest without generating |
| generate | `commands/generate.ts` | 0/1/2 | Validate + generate project files |
| add-page | `commands/add-page.ts` | 0/1/2 | Add page to manifest + regenerate |
| doctor | `commands/doctor.ts` | 0/3 | Check environment (Node >=20, pnpm, tsc) |

## Architecture

- `src/index.ts` — Command dispatcher with `run(args)` function
- `src/bin/dashboard-bootstrap.ts` — Shebang entry point for npx
- `src/commands/` — One module per command
- CLI is a thin dispatcher; all logic delegates to `@dashboard-bootstrap/schema` and `@dashboard-bootstrap/generator`

## Dependencies Added

- `yaml ^2.7.0` (YAML parsing)
- `@types/node ^22.0.0` (Node.js types)

## Test Results

- 17 tests passing across 6 groups (help, init, validate, generate, add-page, doctor)

## Exit Criteria

- `pnpm --filter @dashboard-bootstrap/cli test` — PASSED (17 tests)
- `pnpm --filter @dashboard-bootstrap/cli build` — PASSED (clean tsc)

## ADR

No architectural decisions required.
