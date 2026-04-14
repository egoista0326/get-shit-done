# Phase 05 Review Harness

**Status:** schema-v2-after-round-04-fix
**Generated:** 2026-04-14
**Purpose:** Apply the Phase 03 review contract to the Phase 02 target framework, using Phase 04 feasibility and boundary outputs as concrete evidence, before any implementation begins.

User cap revision before Round 01: Phase 05 now has a 15-round hard cap, not the earlier 10-round cap.

Round 04 schema revision: subagent review found material parser/accounting gaps. The harness now uses finding schema v2 and parser/accounting v2. This reset clean-round accounting after Round 04.

## Review targets

Primary review targets:

- `.planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-COMPLETION-SEMANTICS.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-UPGRADE-BOUNDARIES.md`

Supporting evidence inputs:

- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-FEASIBILITY.md`
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md`
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-REUSE-CANDIDATES.md`
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-WORKTREE.md`

Review-policy inputs:

- `.planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-RULES.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-MATRIX.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-STOP-GATES.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-USER-DECISION.md`

## Required evidence inputs

Every counted review round must use:

- all five Phase 02 target-framework documents,
- all four Phase 04 feasibility/boundary/workspace documents,
- the frozen Phase 03 matrix, stop gates, and user decision,
- any modified target/evidence doc from the immediately previous round,
- deterministic review artifacts from the current round.

If a finding claims loss of Auto/ARIS fidelity, lifecycle ownership drift, config precedence ambiguity, workspace contamination, or hidden `ljx-gsd` carry-over, the reviewer must cite the exact target/evidence docs that support the claim.

## Artifact layout

Phase 05 review artifacts live under:

```text
.planning/phases/05-final-target-framework-review-loop/review/
```

Required files:

- `ROUND-STATE.md`
- `ROUND-XX-REVIEW.md`

Optional lane-detail files:

- `ROUND-XX-LANE-gsd-lifecycle.md`
- `ROUND-XX-LANE-research-capability.md`
- `ROUND-XX-LANE-completion-evidence.md`
- `ROUND-XX-LANE-state-config-concurrency.md`
- `ROUND-XX-LANE-artifacts-hooks-install.md`
- `ROUND-XX-LANE-historical-regression.md`

`ROUND-STATE.md` must track at minimum:

- current round number,
- consecutive clean rounds,
- total rounds executed,
- harness version,
- parser/accounting version,
- status vocabulary and any normalization applied,
- round result (`clean`, `not-clean`, or `capped-not-clean`),
- accepted/rejected/advisory finding counts,
- target docs changed in the last fix cycle,
- unresolved blockers carried into the next round or into final decision.

## Status vocabulary and normalization

Machine-readable round result fields must use exactly one of:

- `clean`
- `not-clean`
- `capped-not-clean`

Human-readable labels are allowed only in prose notes. They must not appear in `ROUND-STATE.md` status fields, result table cells, or final result fields.

Historical labels from Round 01 through Round 03 are normalized as follows:

| Historical label | Canonical result |
| --- | --- |
| `fixed-not-clean` | `not-clean` |
| `clean-under-rule` | `clean` |
| `clean-round-condition-met` | `clean` |

Adding a new machine status label is a material parser/accounting change. It requires recording a new parser/accounting version and resetting clean-round accounting unless the change is advisory-only and happens before a counted round begins.

## Round lifecycle

1. Freeze this harness and `05-REVIEW-LANE-PROMPTS.md` before Round 01.
2. Run all required review lanes against the frozen target and evidence set.
3. Lane outputs create candidate findings only.
4. Perform main-agent confirmation on every candidate finding before it is counted as accepted, rejected, or advisory.
5. Write the consolidated round artifact as `ROUND-XX-REVIEW.md` with deterministic counts.
6. If accepted P0/P1/P2 findings remain, fix framework docs only, re-run affected lanes, and reset clean-round accounting.
7. If no accepted P0/P1/P2 findings remain and every required lane ran under frozen rules, count the round as clean.
8. Stop successfully only after two consecutive clean rounds.
9. Stop unsuccessfully at the round-15 cap if the two-clean-round condition is still unmet.

## Main-agent confirmation

Main-agent confirmation is mandatory before any finding becomes accepted.

Confirmation must:

- deduplicate overlapping lane findings,
- reject unsupported or weakly evidenced findings,
- preserve exact rule id, dimension, and historical failure family,
- assign one final status per finding,
- state the required framework-doc change for every accepted finding,
- state the verification requirement for every accepted finding,
- keep advisory findings from hiding hard blockers.

No lane may directly count a clean round on its own.

## Finding schema

Every candidate and accepted finding must include:

- `id`
- `severity`
- `rule`
- `dimension`
- `evidence`
- `historical_failure`
- `body`
- `required_change` for blockers
- `verification_requirement` for blockers
- `status`

Canonical schema-v2 finding id format:

```text
F05-RXX-<LANE>-###
```

Allowed lane codes:

- `GL` for GSD lifecycle
- `RC` for research capability
- `CE` for completion/evidence
- `SC` for state/config/concurrency
- `AH` for artifacts/hooks/install
- `HR` for historical regression

Generic `F05-RXX-###` lane outputs are candidate-only and must be normalized to the canonical lane-coded id before accepted/rejected/advisory counting.

Accepted findings are not fixed until the verification requirement is run or otherwise satisfied with explicit evidence in the round artifact.

## Allowed fix surfaces

Phase 05 fix scope is framework docs only.

Allowed fix surfaces:

- the five Phase 02 target-framework documents,
- the four Phase 04 feasibility/boundary/workspace documents, but only when an accepted finding directly implicates them,
- this Phase 05 harness or prompt pack only before Round 01, or later only if a material harness/parser change is explicitly recorded and the clean streak resets.

Control-doc exception surface:

- Active canonical planning docs such as `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, and `STATE.md` may be modified only when an accepted Phase 05 finding directly concerns review requirements, cap/accounting truth, roadmap/status truth, workspace false-completion wording, or final state handoff.
- Every such edit must be recorded in the round artifact as a `control-doc exception`, including affected lanes, changed surfaces, and verification evidence.
- This exception does not permit implementation code, new lifecycle authority, or research-helper direct writes to canonical state.

Config-sanitation exception surface:

- `.planning/config.json`, `.planning/research.config.json`, and `.planning/config.quarantine.json` may be modified only when an accepted Phase 05 finding directly concerns raw research keys, typed-routing-like legacy keys, or config truth leaking into upstream GSD config before the research config loader exists.
- The only allowed actions are removing raw research keys or typed-routing-like legacy keys from upstream `.planning/config.json`, preserving those values in an explicitly non-effective quarantine file, and mirroring the same sanitation into the implementation workspace planning snapshot.
- Quarantine files must state `effective: false` or equivalent non-effective status and must not activate research config loader behavior.
- Every such edit must be recorded in the round artifact as a `config-sanitation exception`, including exact files, affected lanes, and verification evidence.
- This exception does not permit general config mutation, implementation code, new lifecycle authority, or research-helper direct writes to canonical state.

Disallowed fix surfaces:

- implementation code,
- Phase 06 or later implementation-phase docs,
- hidden workspace imports,
- silent `ljx-gsd` structural reuse approval,
- changes whose only purpose is to make review easier to pass.

## Clean-round accounting

A round counts as clean only when all of the following are true:

- the required review lanes ran or a lane was explicitly marked not applicable with rationale,
- no accepted P0/P1/P2 findings remain,
- round artifacts are parseable and deterministic,
- the harness and parser/accounting rules were stable before the round began,
- any framework-doc fix from the previous round was re-reviewed by the affected lanes,
- no hard blocker from the Phase 03 stop gates remains ambiguous.

Events that reset the clean streak:

- any accepted P0/P1/P2 finding,
- any fix applied for an accepted P0/P1/P2 finding,
- any material change to the review harness,
- any material change to parser/accounting rules,
- any reclassification that reveals a hard blocker was previously hidden.

## Cap behavior

- The review loop may exit early after two consecutive clean rounds.
- The review loop must stop after Round 15 if the clean condition is still unmet.
- A capped result is `capped-not-clean`, not `clean`.
- `05-03` must report capped residual risk honestly if the cap is hit.

## Framework-only review boundary

Phase 05 reviews framework intent, evidence obligations, boundary decisions, reuse policy, and implementation-start conditions.

Phase 05 does not:

- write implementation code,
- import upstream GSD into the clean workspace,
- approve implementation in the dirty repo,
- convert bridge-shaped historical code into an implicit accepted baseline.

## Do not implement in the dirty repo

Do not implement in the dirty repo.

`/Users/lijiaxin/Downloads/new-gsd` remains the planning/reference environment during Phase 05. The clean implementation workspace remains the only candidate implementation base, and even that workspace stays blocked until the final Phase 05 decision accepts the baseline/import sequence.

## ljx-gsd default stance

`ljx-gsd` remains historical-only by default.

Phase 05 may approve only a tiny generic utility exception, and only if the review artifact explicitly records:

- the exact utility surface,
- why upstream GSD or a clean reimplementation is not better,
- why the exception does not reintroduce bridge logic, typed routing, or a second control plane.

## 05-02 may begin when

`05-02` may begin when all of the following hold:

- this harness exists and is treated as frozen for Round 01,
- `05-REVIEW-LANE-PROMPTS.md` exists and defines all required lanes,
- review artifact layout and clean-round accounting are explicit,
- Phase 05 fix scope is limited to framework docs only,
- the dirty repo remains implementation-forbidden,
- main-agent confirmation is required before accepted findings are counted.
