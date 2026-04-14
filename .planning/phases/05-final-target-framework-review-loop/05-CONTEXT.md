# Phase 05 Context: Final Target Framework Review Loop

## Purpose

Phase 05 is the last framework-only gate before implementation begins.

This phase does not design the framework from scratch and does not start code implementation. It applies the Phase 03 review rules to the Phase 02 target framework, using the Phase 04 feasibility, boundary, reuse, and workspace outputs as concrete evidence.

The question for this phase is:

```text
Is the approved GSD-first research-command framework review-clean enough to start implementation,
and if not, what exact framework documents must change before Phase 06 may begin?
```

## Phase Inputs

Primary review targets:

- `.planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-COMPLETION-SEMANTICS.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-UPGRADE-BOUNDARIES.md`

Primary review-policy inputs:

- `.planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-RULES.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-MATRIX.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-STOP-GATES.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-USER-DECISION.md`

Primary feasibility/boundary evidence:

- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-FEASIBILITY.md`
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md`
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-REUSE-CANDIDATES.md`
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-WORKTREE.md`

Project control docs:

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`

## Required Outputs

Plan `05-01` produces:

- `05-REVIEW-HARNESS.md`
- `05-REVIEW-LANE-PROMPTS.md`

Plan `05-02` produces:

- phase-local review round artifacts under `review/`
- framework-document updates required by accepted findings

Plan `05-03` produces:

- `05-FINAL-REVIEW-DECISION.md`

## Non-Goals

- Do not implement runtime or command code in this phase.
- Do not import upstream GSD into the clean implementation workspace in this phase.
- Do not silently change the Phase 03 review matrix, stop gates, or clean-round accounting once a counted round begins.
- Do not treat Phase 04 feasibility outputs as automatically approved implementation permission.
- Do not reopen the whole architecture unless review findings actually show that the accepted framework is unsound.

## Working Decisions

- GSD remains the full lifecycle/control-plane owner.
- Auto/ARIS remains a prompt/orchestration overlay compiled into GSD-owned phases, plans, context, artifacts, and gates.
- Phase 05 reviews framework docs and feasibility evidence only; it does not review implementation code because implementation has not started yet.
- Review rounds are bounded: two consecutive clean rounds for success, hard cap at 15 rounds, honest capped status otherwise.
- Accepted P0/P1/P2 findings reset clean-round accounting by default.
- `ljx-gsd` remains historical-only unless this phase explicitly approves a tiny generic exception.
- The clean implementation workspace exists, but Phase 06 may begin only if Phase 05 accepts the workspace/baseline/import sequence.

## User Checkpoint

Phase 05 has no mandatory user checkpoint inside `05-01`.

A checkpoint is required if:

- review findings would materially weaken the approved GSD-first architecture,
- the clean workspace strategy must be replaced,
- the implementation baseline changes materially,
- or a previously banned `ljx-gsd` reuse path is proposed for approval.

## Success Definition

Phase 05 is successful only if all of the following become true:

1. Review harness, lane prompts, finding schema, and clean-round accounting are frozen before counted rounds begin.
2. Review rounds evaluate the Phase 02 framework against the Phase 03 rules and Phase 04 evidence without turning Phase 05 into implementation.
3. Accepted findings are fixed in framework/evidence docs and re-reviewed by the affected lanes.
4. The phase exits either with two consecutive clean rounds or with an explicit capped-not-clean decision.
5. The final decision states exactly whether Phase 06 may begin, from which workspace, with which baseline/import sequence, and under which remaining blockers.
