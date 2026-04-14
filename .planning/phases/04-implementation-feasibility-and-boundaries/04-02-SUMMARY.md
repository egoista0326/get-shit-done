---
phase: 04-implementation-feasibility-and-boundaries
plan: 02
subsystem: implementation-boundaries
tags: [gsd, boundaries, reuse-policy, upstream-gsd, phase-04]
requires:
  - phase: 04-implementation-feasibility-and-boundaries
    provides: Feasibility map and upstream-first implementation verdict
provides:
  - Operational implementation boundary rules
  - Preliminary reuse classification buckets
  - Phase 05 review decision surface for implementation boundaries
affects: [phase-04, phase-05, phase-06, phase-08]
tech-stack:
  added: []
  patterns:
    - Upstream-first implementation boundary model
    - Historical-only ljx default stance
    - Clean-workspace-before-implementation rule
key-files:
  created:
    - .planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md
    - .planning/phases/04-implementation-feasibility-and-boundaries/04-REUSE-CANDIDATES.md
  modified:
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
    - .planning/STATE.md
key-decisions:
  - Implementation must not begin in the current dirty repo; Phase 04-03 must create the clean workspace first.
  - Upstream GSD is the likely copy baseline, Auto/ARIS is semantic reference material, and ljx-gsd is historical-only by default.
  - Wrapper emission, install/build boundaries, and any tiny old-repo utility reimplementation remain Phase 05 review questions.
  - Canonical lifecycle docs and state remain single-writer GSD-owned surfaces even after research integration begins.
patterns-established:
  - Boundary docs separate Phase 05 review inputs from Phase 06 execution guidance.
  - Reuse decisions are bucketed conservatively into copy, wrap, reference-only, and quarantine.
  - Naming, branch, workspace, hook, config, and git rules are fixed before implementation begins.
requirements-addressed: [IMPL-01]
requirements-completed: [IMPL-01]
duration: 2min
completed: 2026-04-14T01:24:40+02:00
---

# Phase 04-02 Summary: Implementation Boundaries

**Operational boundary rules for an upstream-first GSD rebuild, plus a conservative reuse classification that keeps ljx-gsd mostly historical-only**

## Performance

- **Duration:** 2 min execution window
- **Started:** 2026-04-14T01:22:54+02:00
- **Completed:** 2026-04-14T01:24:40+02:00
- **Tasks:** 3
- **Files created:** 3 execution artifacts plus state/progress updates

## Accomplishments

- Created `04-IMPLEMENTATION-BOUNDARIES.md`, turning the feasibility map into operational rules for workspace choice, branch policy, naming, source ownership, config/state ownership, hook behavior, git discipline, and review commands.
- Created `04-REUSE-CANDIDATES.md`, classifying upstream GSD, Auto/ARIS semantic materials, and historical `ljx-gsd` code into copy, wrap, reference-only, and quarantine buckets.
- Locked a practical implementation stance: upstream GSD is the true implementation base, Auto/ARIS is semantic source material, and `ljx-gsd` is mostly historical evidence rather than a structural reuse pool.
- Split the outputs cleanly into Phase 05 review inputs, Phase 06 execution guidance, and items intentionally deferred to Phase 08 or later.

## Files Created/Modified

- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md` - Operational boundary rules for the implementation workspace and mutation surfaces.
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-REUSE-CANDIDATES.md` - Conservative copy/wrap/reference/quarantine classification.
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-02-SUMMARY.md` - This completion summary.
- `.planning/REQUIREMENTS.md` - Marked `IMPL-01` complete and updated traceability.
- `.planning/ROADMAP.md` - Marked `04-02` complete and updated Phase 04 progress.
- `.planning/STATE.md` - Advanced current position to `04-03` and recorded the boundary decisions.

## Decisions Made

- The preferred implementation path is upstream-first: copy/reuse upstream lifecycle/runtime/workflow surfaces, then add a narrow research adapter.
- `ljx-gsd` defaults to historical-only and quarantine/reference status rather than acting as a meaningful implementation pool.
- The clean implementation workspace is a hard prerequisite for Phase 06.
- Wrapper emission, install/build strategy, and any tiny generic utility exception remain review-gated rather than being pre-approved here.

## Deviations From Plan

None. The plan required explicit implementation boundaries, a conservative reuse classification, and downstream phase linkage. All three were produced.

## Issues Encountered

- The original 04-02 plan wording still assumed more room for `ljx-gsd` candidates than the current user stance really allows. The executed documents were tightened to reflect the newer default no-reuse direction.
- The boundary strategy had to account for an awkward fact: the current repo is dirty and the planning state is still live, so `04-03` cannot choose a worktree or copy path casually.

## Verification

- `node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" verify plan-structure .planning/phases/04-implementation-feasibility-and-boundaries/04-02-PLAN.md --cwd "$PWD"` reported `valid: true`.
- Required coverage grep found `Repo-copy strategy`, `Branch policy`, `Naming`, `Source ownership`, `Config and state ownership`, `Hook behavior`, `Git discipline`, `Review commands`, `Likely copy`, `Likely wrap`, `Likely reference-only`, `Likely quarantine`, `Phase 05 review inputs`, `Phase 06 guidance`, and `Deferred to Phase 08`.
- `git diff --check -- .planning/phases/04-implementation-feasibility-and-boundaries` passed before summary/state sync.
- The resulting boundary documents keep GSD as the only lifecycle/control-plane owner and keep `ljx-gsd` out of the default implementation base.

## Next Phase Readiness

`04-03` can start now.

It should:

- choose and create the clean implementation workspace,
- record whether copy or worktree is the right strategy under current repo conditions,
- capture baseline path/branch/source snapshot and cleanliness checks,
- make the Phase 06 starting workspace explicit.

## User Setup Required

None.

---
*Phase: 04-implementation-feasibility-and-boundaries*
*Completed: 2026-04-14T01:24:40+02:00*
