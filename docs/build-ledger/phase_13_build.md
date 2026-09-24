# Phase 13 Build Ledger — Governance and Vocabulary Conformance

## Summary

Implemented vocabulary conformance tests verifying schema-to-implementation coverage, and ESLint governance rules preventing unauthorized direct MUI/Lucide/icon-library imports.

## Conformance Tests

| Test | File | Assertions |
|------|------|------------|
| Template coverage | `template-coverage.test.ts` | Every TemplateName has a corresponding export in templates (2 tests) |
| Icon coverage | `icon-coverage.test.ts` | Every IconName is handled by Icon component registry (2 tests) |
| Capability coverage | `capability-coverage.test.ts` | Every template has capabilities, all kebab-case, no duplicates (4 tests) |

## ESLint Governance Rules

| Package | MUI restricted | Lucide restricted | Other icon libs |
|---------|---------------|-------------------|-----------------|
| design-system | No (allowed) | No (allowed) | N/A |
| templates | No (allowed - composes DS) | Yes | Yes |
| generator | Yes | Yes | Yes |
| cli | Yes | Yes | Yes |
| reference-app | No (allowed) | Yes | Yes |

## Dependencies Added

- `eslint ^9.27.0` (root)
- `@eslint/js ^9.27.0` (root)
- `typescript-eslint ^8.33.0` (root)

## Infrastructure Change

- Added `tests/*` to `pnpm-workspace.yaml` for conformance test workspace resolution

## Exit Criteria

- Conformance tests pass — PASSED (8 tests)
- `pnpm lint` exits 0 — PASSED

## ADR

No architectural decisions required.
