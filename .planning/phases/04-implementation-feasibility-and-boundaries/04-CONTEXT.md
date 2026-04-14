# Phase 04 Context: Implementation Feasibility, Boundaries, And Repo Copy Strategy

## Purpose

Phase 04 bridges the approved target framework and the final pre-implementation review loop.

This phase exists because the framework is already conceptually approved at the design level, but the project still needs one focused pass that answers a different question: how does this framework map into concrete code, file ownership, reuse boundaries, and a clean implementation workspace without distorting GSD itself?

Phase 04 therefore researches implementation feasibility, defines boundaries, and prepares the clean implementation workspace. Phase 05 then performs the final framework review with that feasibility evidence in hand.

## Phase Inputs

Primary framework inputs:

- `.planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-COMPLETION-SEMANTICS.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-UPGRADE-BOUNDARIES.md`

Primary review-rule inputs:

- `.planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-RULES.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-MATRIX.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-STOP-GATES.md`
- `.planning/phases/03-review-rules-from-historical-bugs/03-USER-DECISION.md`

Primary source and reuse inputs:

- `.planning/phases/01-source-framework-extraction/01-GSD-FRAMEWORK.md`
- `.planning/phases/01-source-framework-extraction/01-GSD-UPGRADE-BOUNDARIES.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-FRAMEWORK.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-ARTIFACT-CONTRACTS.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-PARAMETER-MAP.md`
- `.planning/phases/01-source-framework-extraction/01-LJX-REUSE-OR-DISCARD-MATRIX.md`
- `.planning/phases/01-source-framework-extraction/01-CROSS-FRAMEWORK-GAP-MAP.md`

Project control docs:

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`

## Required Outputs

Plan `04-01` produces:

- `04-IMPLEMENTATION-FEASIBILITY.md`

Plan `04-02` produces:

- `04-IMPLEMENTATION-BOUNDARIES.md`
- `04-REUSE-CANDIDATES.md`

Plan `04-03` produces:

- `04-IMPLEMENTATION-WORKTREE.md`

## Non-Goals

- Do not start the final framework review loop in this phase. Phase 05 owns that review.
- Do not implement runtime or command code in this phase.
- Do not silently weaken Phase 02 framework decisions or Phase 03 stop gates.
- Do not treat preliminary reuse candidates as approved reuse. Final reuse approval belongs to Phase 05.
- Do not let repo-copy convenience override GSD fidelity, state ownership, or review discipline.

## Working Decisions

- GSD remains the complete framework and control plane.
- Auto/ARIS remains a prompt/orchestration overlay that compiles research semantics into GSD-owned phases, plans, context, artifacts, and gates.
- Research command defaults still prefer one inserted phase with plan-level decomposition unless there is a real work-mode boundary.
- Phase 04 is one phase because feasibility, boundaries, reuse strategy, and workspace preparation must stay continuous.
- A clean implementation workspace handoff should exist before implementation edits begin; repo initialization, branch creation, and upstream baseline import are Phase 06 gates.
- Phase 05 will review the target framework again, but with Phase 04 feasibility outputs as concrete evidence.
- Implementation code still begins in Phase 06.

## User Checkpoint

Phase 04 has no mandatory blocking user checkpoint by default.

A checkpoint is required only if feasibility research discovers a framework contradiction serious enough to reopen Phase 02 or Phase 03 decisions, or if the chosen repo-copy/worktree strategy would materially change implementation cost, ownership, or risk.

## Success Definition

Phase 04 is successful only if all of the following become true:

1. The approved framework is mapped to concrete implementation surfaces and owners.
2. Implementation boundaries and reuse/copy rules are explicit enough that Phase 05 can review them, not guess them.
3. Clean workspace preparation is recorded concretely enough that Phase 06 can import the upstream baseline and create the authoritative implementation branch from a known good handoff.
4. No code implementation begins early under the excuse of "just feasibility work."
