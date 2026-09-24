# Phase 13 — Governance and Vocabulary Conformance

## Objective

Implement vocabulary conformance tests (template coverage, icon coverage, capability coverage) and ESLint governance rules preventing design-system violations.

## Inputs

- `docs/TDD.md` — testing strategy, vocabulary conformance tests, governance tests

## Allowed Paths

- `tests/conformance/`
- `eslint.config.*`
- `.eslintrc.*`
- `package.json`
- `pnpm-lock.yaml`
- `turbo.json`

## Blocked Paths

None.

## Tasks

1. Implement template coverage test: every `TemplateName` in schema has a corresponding export in templates.
2. Implement icon coverage test: every `IconName` in schema is handled by the `Icon` component.
3. Implement capability coverage test: template props accept schema-defined capability keys.
4. Configure ESLint rules to prevent direct MUI imports outside `design-system`.
5. Configure ESLint rules to prevent direct Lucide imports outside `design-system`.
6. Configure ESLint rules to prevent additional icon libraries.
7. Add lint dependencies to `package.json` if needed.

## Exit Criteria

- Conformance tests pass (pnpm test --filter ./tests/conformance exits 0).
- `pnpm lint` exits 0.

## Out of Scope

- Deliverables belonging to other phases.
