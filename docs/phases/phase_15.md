# Phase 15 — Full Standalone E2E Acceptance

## Objective

Validate Dashboard Bootstrap as a product — prove that a valid `dashboard.yaml`, processed by the standalone CLI, generates a fresh application that builds, runs, and respects ownership rules (scaffold protection, drift detection).

## Inputs

- `docs/PRD.md` — acceptance criteria (Section 33)
- `docs/TDD.md` — key flows, ownership rules

## Allowed Paths

- `tests/e2e/`
- `package.json`
- `pnpm-lock.yaml`
- `turbo.json`

## Blocked Paths

None.

## Tasks

1. Create E2E test that creates a temporary empty directory.
2. Run `dashboard-bootstrap init` in the temp directory.
3. Replace/use a representative `dashboard.yaml`.
4. Run `dashboard-bootstrap validate` and assert success.
5. Run `dashboard-bootstrap generate` and assert success.
6. Install and build the generated application.
7. Verify routes, pages, and navigation are present in generated output.
8. Modify a scaffold file, regenerate, and prove the modification survived.
9. Modify a system-generated file, regenerate, and prove drift was detected and the file was restored.

## Exit Criteria

- `pnpm test:e2e` exits 0.

## Out of Scope

- Keel plugin adapter (future phase).
- Deliverables belonging to other phases.
