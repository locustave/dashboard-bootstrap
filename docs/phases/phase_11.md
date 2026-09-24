# Phase 11 — AI Bootstrap Skill

## Objective

Create the AI bootstrap skill with SKILL.md, examples, and manifest guidance for Claude, Codex, and other coding agents.

## Inputs

- `docs/PRD.md` — AI skill (Sections 17-19)
- `docs/TDD.md` — skill directory description

## Allowed Paths

- `skills/dashboard-bootstrap/SKILL.md`
- `skills/dashboard-bootstrap/examples/`

## Blocked Paths

None.

## Tasks

1. Create `skills/dashboard-bootstrap/SKILL.md` with:
   - Skill description and purpose
   - Manifest format reference
   - Available templates and their purposes
   - Available icons and naming conventions
   - Capability keys per template
   - Step-by-step guidance for translating PRD to manifest
   - Limitations and escape hatches
2. Create skill examples in `skills/dashboard-bootstrap/examples/` showing input/output pairs (product requirements to dashboard.yaml).

## Exit Criteria

- `test -s skills/dashboard-bootstrap/SKILL.md` exits 0.

## Out of Scope

- Deliverables belonging to other phases.
