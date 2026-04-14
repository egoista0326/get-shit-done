# Phase 08 Validation Architecture

Phase: 08-standalone-research-command-integration
Date: 2026-04-14
Status: planned
Nyquist compliant: yes, if each plan implements its listed tests before or alongside code changes.

## Validation Goal

Validate that `/gsd-ljx-*` research commands preserve Auto/ARIS research semantics while using GSD as the only lifecycle and control-plane framework.

A clean Phase 08 is not defined by command files existing. It is defined by these properties:

- commands compile into ordinary GSD phases, plans, tasks, prompts, and phase-local artifacts;
- GSD owns roadmap, state, phase insertion, planning, execution, and verification;
- Auto/ARIS owns prompt packs, presets, artifact expectations, evidence contracts, and side-effect policy classification;
- no second roadmap, second state machine, `phase_type`, typed phase routing, or raw Auto/ARIS config is added to `.planning/config.json`;
- external side effects remain policy/bridge/evidence-only in Phase 08.

## Test Matrix

| Requirement | Validation Method | Planned Test Or Artifact |
|-------------|-------------------|--------------------------|
| RSCH-01 | Command wrapper and compiler tests | `tests/research-compiler-discovery.test.cjs`, wrapper checks for `/gsd-ljx-research-lit`, `/gsd-ljx-idea-discovery`, `/gsd-ljx-idea-creator`, `/gsd-ljx-novelty-check` |
| RSCH-02 | Refinement command and evidence tests | `tests/research-compiler-discovery.test.cjs`, refinement prompt-pack checks, `research/refine/REFINE_STATE.json` contract checks |
| RSCH-03 | Experiment command and bridge tests | `tests/research-compiler-experiment.test.cjs`, `tests/research-side-effects.test.cjs` |
| RSCH-04 | Result, claim, paper, rebuttal, ablation tests | `tests/research-compiler-experiment.test.cjs`, `tests/research-compiler-paper.test.cjs` |
| RSCH-05 | Preset/config tests | `tests/research-config.test.cjs`, config fixture tests for safe, auto, danger-auto |
| RSCH-06 | Artifact and index tests | `tests/research-artifacts.test.cjs`, `research/RESEARCH_INDEX.md` initialization checks |
| RSCH-07 | Side-effect policy tests | `tests/research-side-effects.test.cjs`, bridge-only assertions |
| RSCH-08 | Literature evidence completeness tests | `tests/research-evidence.test.cjs`, negative idea-discovery completion case |
| RSCH-09 | GSD lifecycle integration and no-core-drift tests | `tests/research-lifecycle-integration.test.cjs`, Phase 08 review artifacts, final parity report |

## Negative Tests

Required negative tests:

1. Missing literature evidence prevents `idea-discovery` from being clean.
2. `.planning/config.json` containing raw root `research` config remains invalid or rejected by GSD config validation.
3. `danger-auto` still does not execute GPU, W&B, SSH, paid compute, push, PR, publication, or destructive operations in Phase 08.
4. Compiler output does not contain `phase_type`.
5. Compiler output does not write `ROADMAP.md` or `STATE.md` directly.
6. `RESEARCH_INDEX.md` is treated as artifact index, not lifecycle state.
7. New command names use `/gsd-ljx-*` and do not collide with upstream GSD command names.

## Review Loop Gate

Each meaningful implementation slice must run multi-dimensional review before being marked complete.

Required lanes:

- lifecycle boundary and no-core-change review,
- Auto/ARIS semantic preservation review,
- security and side-effect review,
- tests and maintainability review.

Rules:

- cap: 10 rounds per slice;
- early stop: two consecutive clean rounds;
- main agent second-pass confirms subagent findings before applying fixes;
- confirmed P0/P1/P2 findings block progress;
- review evidence is recorded in plan-local review files.

## Acceptance Criteria

Phase 08 can be considered complete only if:

- all focused research tests pass;
- relevant existing GSD parity tests still pass;
- `npm test` passes or any residual upstream-only failure is explicitly documented;
- `node get-shit-done/bin/gsd-tools.cjs validate health --cwd "$PWD"` is healthy;
- `git diff --check` is clean;
- Phase 08 final parity report confirms GSD remains the lifecycle owner;
- Phase 08 final review shows two consecutive clean rounds or documents why the cap was reached.
