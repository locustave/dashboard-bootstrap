# Phase 0 Prompt - Generate Controlled Execution Harness Only

Generate the keel governance for this repository.

Do not build the product. Do not scaffold backend code, web/frontend code, runtime code, compose services, database migrations, workers, MCP runtime code, or UI screens. This phase creates only the harness, rules, hooks, commands, skills, verification helpers, build manifest, execution plan, and phase prompts needed for later agents to build the product under phase control.

## Local Product Sources

Use this repository's sources of truth:

- docs/PRD.md (required — the starting point for Phase 0)
- DESIGN.md (optional, read if present)
- agent-rules.md or AGENTS.md, if present

## Required Outputs

Generate or update:

- docs/TDD.md (generated from docs/PRD.md via tdd-builder procedure)
- BUILD_MANIFEST.yaml
- keel/**
- scripts/verify.sh and scripts/verify_phase0.sh
- docs/phases/phase_0.md
- one docs/phases/phase_<n>.md file for every phase in BUILD_MANIFEST.yaml
- docs/audit/phase_0.log
- docs/build-ledger/phase_0_build.md
- docs/decisions/ when an ADR is required
- .agent/audit.jsonl, .agent/run_log.jsonl, and .agent/phase_gates/phase_0.gate.json

## Verification

Run only harness-generation verification:

```bash
bash keel/hooks/preflight.sh
python3 keel/scripts/verify_repo.py .
bash scripts/verify_phase0.sh
```

## Stop Conditions

Stop and ask the human if PRD/TDD are missing, requirements conflict, product files would need to be created, or dependency installs/product tests would be required.
