---
phase: 14-complete-migration-cutover-and-parity-verification
plan: 02
subsystem: migration
tags: [gsd, research-pipeline, roadmap-admin, bridge-ready, migration-cutover]

requires:
  - phase: 14-complete-migration-cutover-and-parity-verification
    provides: Migration status reader and blocked-state semantics from Plan 14-01
provides:
  - Helper-backed research-pipeline phase-chain proposal semantics
  - Bridge-ready generated ljx-GSD-research-pipeline skill and manifest entry
  - Preview/install helper copy coverage and public docs contract updates
affects: [research-pipeline, skill-generation, manifest, roadmap-admin, migration-cutover]

tech-stack:
  added: []
  patterns:
    - Helper-backed umbrella proposal with roadmap-admin mutation handoff
    - Migration status gate before unsafe phase-chain mutation
    - Structured proposal output before generated skill action

key-files:
  created:
    - bin/lib/ljx-research-pipeline-tools.cjs
    - tests/research-pipeline-cutover.test.cjs
    - .planning/phases/14-complete-migration-cutover-and-parity-verification/14-02-SUMMARY.md
  modified:
    - bin/lib/manifest.cjs
    - bin/lib/codex-conversion.cjs
    - bin/lib/build-skills.cjs
    - tests/skill-build.test.cjs
    - tests/docs-contract.test.cjs
    - LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md
    - LJX-GSD-INTERFACES.md
    - LJX-GSD-USER-SKILL-GUIDE.md

key-decisions:
  - "research-pipeline is a bridge-ready proposal/router, not a hidden upstream Auto linear pipeline."
  - "Missing stages are proposed through roadmap-admin add/insert semantics before downstream direct commands are recommended."
  - "Direct Auto-like artifacts are evidence only and never prove a stage ran without phase-local artifacts and structured state."

patterns-established:
  - "Umbrella research workflows must emit structured phase-chain proposals and hand structural edits to the roadmap-admin owner."
  - "Generated bridge skills must read helper JSON before acting and must preserve migration-blocked stops."

requirements-completed: [IMPL-08]

duration: resumed-session
completed: 2026-04-12
---

# Phase 14 Plan 02: Research-Pipeline Cutover Summary

**Helper-backed research-pipeline phase-chain proposal with roadmap-admin handoff and migration-blocked stop semantics**

## Performance

- **Duration:** Resumed executor session; original start time was not preserved across context compaction.
- **Started:** Not captured before resume.
- **Completed:** 2026-04-11T23:52:08Z.
- **Tasks:** 3/3 completed.
- **Files modified:** 11 plan-owned files including this summary.

## Accomplishments

- Added `bin/lib/ljx-research-pipeline-tools.cjs`, a bounded helper that reads planning state, migration state, active workstream context, phase records, roadmap mirrors, and direct research artifacts to produce a structured discovery -> refine -> experiment -> analysis -> paper proposal.
- Added `tests/research-pipeline-cutover.test.cjs` covering empty chains, partial chains, direct Auto-like artifact evidence, duplicate/mismatched metadata repairs, migration-blocked stops, current-repo smoke behavior, confirmation gating, and confirmed roadmap-admin delegation.
- Promoted `ljx-GSD-research-pipeline` from deferred compatibility status to a bridge-ready helper-backed generated skill, with install/preview helper copy coverage and docs/contract updates.

## Task Commits

No commits were created by this executor. The working tree already contained overlapping Plan 14-01 and orchestrator-owned changes, including migration runtime files and `.planning` state files; to avoid accidentally capturing unrelated work, this plan left changes unstaged and uncommitted.

## Files Created/Modified

- `bin/lib/ljx-research-pipeline-tools.cjs` - New proposal/apply helper for phase-chain research-pipeline routing, migration gating, repair proposals, and roadmap-admin mutation delegation.
- `tests/research-pipeline-cutover.test.cjs` - New TDD coverage for helper proposal, apply, artifact evidence, and migration-blocked behavior.
- `bin/lib/manifest.cjs` - Promotes `ljx-GSD-research-pipeline` to bridge-ready policy with helper-backed rationale.
- `bin/lib/codex-conversion.cjs` - Replaces the compatibility-wrapper generated skill text with helper-backed proposal/apply semantics.
- `bin/lib/build-skills.cjs` - Copies the research-pipeline helper into the installed runtime and routes generation through the new bridge-ready builder.
- `tests/skill-build.test.cjs` - Updates generated skill, manifest, preview, and helper-copy assertions.
- `tests/docs-contract.test.cjs` - Updates public contract assertions for helper-backed proposal routing and accepts the current Phase 14 execution state without editing `STATE.md`.
- `LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md` - Updates public command semantics for research-pipeline as a proposal router.
- `LJX-GSD-INTERFACES.md` - Updates interface contract language from compatibility wrapper to helper-backed proposal/handoff.
- `LJX-GSD-USER-SKILL-GUIDE.md` - Updates user-facing command guide to describe bridge-ready helper-backed research-pipeline semantics.

## Decisions Made

- The first missing stage action is a roadmap-admin phase creation/insertion recommendation, not a direct downstream stage command, because typed phase/state invariants must exist before stage execution.
- Confirmed `apply` requires explicit confirmation before calling `mutateRoadmap()` and never hand-edits `ROADMAP.md`, phase directories, or phase records.
- Migration-blocked projects stop before umbrella orchestration and surface migration-safe actions from the Plan 14-01 migration status semantics.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Enforced typed-phase creation before stage execution**
- **Found during:** Task 1 and Task 2.
- **Issue:** A partial chain expectation initially treated a missing experiment phase as if the next action could be the direct experiment command.
- **Fix:** Adjusted the behavior and test expectation so missing formal stages route through `ljx-GSD-insert-phase`/roadmap-admin handoff first.
- **Files modified:** `tests/research-pipeline-cutover.test.cjs`, `bin/lib/ljx-research-pipeline-tools.cjs`.
- **Verification:** `node --test tests/research-pipeline-cutover.test.cjs` and full plan verification passed.
- **Committed in:** Not committed; see Task Commits.

**2. [Rule 3 - Blocking] Kept docs contract aligned with active Phase 14 executor state**
- **Found during:** Task 3.
- **Issue:** The docs contract assertion still assumed Phase 13 mirrored state while this worktree is actively executing Phase 14.
- **Fix:** Updated the assertion to accept the current Phase 14 execution state without modifying `.planning/STATE.md`.
- **Files modified:** `tests/docs-contract.test.cjs`.
- **Verification:** `node --test tests/docs-contract.test.cjs` and full plan verification passed.
- **Committed in:** Not committed; see Task Commits.

---

**Total deviations:** 2 auto-fixed (1 missing critical, 1 blocking).
**Impact on plan:** Both changes preserve the requested no-second-control-plane boundary and avoid orchestrator-owned state writes.

## Issues Encountered

- The original full `npm test` process handle was unavailable after context compaction. It was rerun fresh and passed with 540 tests across 37 suites.
- The working tree includes pre-existing Plan 14-01 and orchestrator-owned dirty files. Those were not reverted, staged, or committed by this plan.

## Verification

- **RED:** `node --test tests/research-pipeline-cutover.test.cjs` failed as expected before the helper existed with `MODULE_NOT_FOUND: ../bin/lib/ljx-research-pipeline-tools.cjs`.
- `node --check bin/lib/ljx-research-pipeline-tools.cjs && node --test tests/research-pipeline-cutover.test.cjs` - passed, 8 tests.
- `node --check bin/lib/codex-conversion.cjs && node --test tests/research-pipeline-cutover.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs` - passed, 59 tests across 3 suites.
- `node --check bin/lib/ljx-research-pipeline-tools.cjs && node --check bin/lib/ljx-migration-tools.cjs && node --check bin/lib/ljx-roadmap-admin-tools.cjs && node --check bin/lib/manifest.cjs && node --check bin/lib/codex-conversion.cjs && node --check bin/lib/build-skills.cjs && node --test tests/research-pipeline-cutover.test.cjs tests/migration-cutover.test.cjs tests/roadmap-admin-bridge.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs && node bin/install.js --print-manifest && node bin/install.js --preview && git diff --check` - passed, 130 tests across 5 suites; manifest reports `ljx-GSD-research-pipeline [main-research] - bridge-ready`; preview install completed successfully.
- `npm test` - passed, 540 tests across 37 suites, 0 failures.

## Known Stubs

None. The placeholder scan found only benign empty-array/object initializers, nullable locals, and test assertion text; no UI-flowing placeholder stubs or unfinished TODO/FIXME markers were introduced.

## Threat Flags

None beyond the plan threat model. The new CLI/helper surface was planned and gates structural mutations through the roadmap-admin helper after migration and confirmation checks.

## User Setup Required

None - no external service configuration required.

## Self-Check: PASSED

- Created files exist: `bin/lib/ljx-research-pipeline-tools.cjs`, `tests/research-pipeline-cutover.test.cjs`, and this `14-02-SUMMARY.md`.
- Required verification commands passed after implementation.
- `.planning/STATE.md` and `.planning/ROADMAP.md` were not modified by this executor for Plan 14-02.

## Next Phase Readiness

Plan 14-03 can build on a bridge-ready `ljx-GSD-research-pipeline` that preserves Auto stage intent while routing formal phase creation and mutation through the existing roadmap-admin boundary.

---
*Phase: 14-complete-migration-cutover-and-parity-verification*
*Completed: 2026-04-12*
