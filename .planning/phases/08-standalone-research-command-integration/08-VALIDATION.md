# Phase 08 Validation Architecture

Phase: 08-standalone-research-command-integration
Date: 2026-04-15
Status: updated for thin Markdown overlay
Nyquist compliant: yes, if final review verifies command coverage, GSD lifecycle ownership, side-effect boundaries, and old-route absence.

## Validation Goal

Validate that installable `/gsd-ljx-*` research skills preserve Auto/ARIS research semantics while using GSD as the only lifecycle and control-plane framework.

A clean Phase 08 is not defined by command files existing. It is defined by these properties:

- `commands/gsd/ljx-*.md` source files install as ordinary `gsd-ljx-*` skills without custom relocation;
- command instructions direct users back to ordinary GSD phases, plans, tasks, reviews, verification, and phase-local artifacts;
- GSD owns roadmap, state, phase insertion, planning, execution, and verification;
- Auto/ARIS semantics are preserved as prompt obligations, quality dimensions, artifact expectations, and review gates;
- no second roadmap, second state machine, `phase_type`, typed phase routing, helper compiler, command map, research config, or raw Auto/ARIS config is added;
- external side effects remain explicit-authorization instructions only in Phase 08.

## Test Matrix

| Requirement | Validation Method | Planned Test Or Artifact |
|-------------|-------------------|--------------------------|
| RSCH-01 | Thin command surface tests | `tests/research-thin-overlay.test.cjs`, command frontmatter, old-route absence |
| RSCH-02 | Refinement semantics tests | `tests/research-thin-overlay.test.cjs`, refinement/review artifact and raw-review assertions |
| RSCH-03 | Experiment command tests | `tests/research-thin-overlay.test.cjs`, explicit authorization and external-resource assertions |
| RSCH-04 | Result, claim, paper, rebuttal, ablation tests | `tests/research-thin-overlay.test.cjs`, claim-gate and paper/rebuttal semantic assertions |
| RSCH-05 | No research config route | `tests/research-thin-overlay.test.cjs`, `.planning/research.config.json` and helper absence |
| RSCH-06 | Artifact contract review | final parity report plus command file assertions for phase-local artifact paths |
| RSCH-07 | Side-effect boundary review | final security report plus explicit authorization assertions |
| RSCH-08 | Literature evidence completeness tests | `tests/research-thin-overlay.test.cjs`, literature/search/read/novelty guidance assertions |
| RSCH-09 | GSD lifecycle integration and no-core-drift tests | `tests/core-lifecycle-planning-parity.test.cjs`, `tests/core-gsd-parity-scenario.test.cjs`, Phase 08 final review artifacts |

## Negative Tests

Required negative tests and checks:

1. Old `commands/gsd/gsd-ljx-*.md` source wrappers do not exist.
2. Old `get-shit-done/bin/lib/research-*.cjs` runtime files do not exist.
3. `.planning/research.config.json` does not exist.
4. `gsd-tools.cjs` has no `research` dispatcher route.
5. Thin command bodies do not hand off to bare command names; installed handoffs use `/gsd-ljx-*`.
6. Commands and production files do not introduce `phase_type` or typed phase routing.
7. Side-effect-capable commands do not claim GPU, W&B, SSH, paid compute, push, PR, publication, submission, or external upload execution.

## Review Loop Gate

Each meaningful implementation slice must run multi-dimensional review before being marked complete.

Required lanes:

- lifecycle boundary and no-core-change review,
- Auto/ARIS semantic preservation review,
- security and side-effect review,
- tests and maintainability review.

Rules:

- cap: 30 rounds for final Phase 08 review;
- early stop: two consecutive clean rounds;
- main agent second-pass confirms subagent findings before applying fixes;
- confirmed P0/P1/P2 findings block progress;
- review evidence is recorded in plan-local review files.

## Acceptance Criteria

Phase 08 can be considered complete only if:

- all focused thin overlay tests pass;
- relevant existing GSD parity tests still pass;
- `npm test` passes or any residual upstream-only failure is explicitly documented;
- `node get-shit-done/bin/gsd-tools.cjs validate health --cwd "$PWD"` is healthy;
- `git diff --check` is clean;
- Phase 08 final parity report confirms GSD remains the lifecycle owner;
- Phase 08 final review shows two consecutive clean rounds or documents why the cap was reached.
