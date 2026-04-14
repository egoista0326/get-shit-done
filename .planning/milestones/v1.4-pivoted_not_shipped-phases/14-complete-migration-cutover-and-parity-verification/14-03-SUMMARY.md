---
phase: 14-complete-migration-cutover-and-parity-verification
plan: 03
subsystem: parity-verification
tags: [ljx-gsd, parity, migration-cutover, generated-skills, runtime-core]

requires:
  - phase: 14-complete-migration-cutover-and-parity-verification
    provides: Plan 14-01 migration helper and Plan 14-02 research-pipeline helper
provides:
  - Whole-repo parity coverage for migration, research-pipeline, lifecycle routing, admin gates, generated skills, preview install, docs, and paper/rebuttal surfaces
  - Current-repo progress/next routing repair for decorated GSD phase labels
  - Evidence-backed parity report at 14-PARITY-REPORT.md
affects: [phase-14, migration-cutover, runtime-core, parity-tests, preview-install]

tech-stack:
  added: []
  patterns:
    - Whole-repo parity tests exercise fixture classes plus current-repo routing smoke.
    - Narrow drift fixes go to shared owners instead of per-test adapters.

key-files:
  created:
    - tests/parity-cutover.test.cjs
    - .planning/phases/14-complete-migration-cutover-and-parity-verification/14-PARITY-REPORT.md
    - .planning/phases/14-complete-migration-cutover-and-parity-verification/14-03-SUMMARY.md
  modified:
    - bin/lib/ljx-runtime-core.cjs
    - tests/runtime-core.test.cjs

key-decisions:
  - "Parity tests treat structured migration state as authoritative and root reports as explanatory only."
  - "Decorated GSD state phase labels are parsed by the shared runtime core rather than patched in state or test fixtures."
  - "Phase 12 paper/rebuttal surface parity is recorded without editing ROADMAP.md, STATE.md, or REQUIREMENTS.md."

patterns-established:
  - "Current-repo progress/next smoke is part of parity, not only synthetic fixtures."
  - "Generated skill, manifest, preserved Auto assets, and preview runtime helper copy checks remain part of cutover evidence."

requirements-completed: [IMPL-08]

duration: 5min
completed: 2026-04-12
---

# Phase 14 Plan 03: Parity Verification Summary

**Whole-repo cutover parity tests with a shared runtime-core repair for decorated GSD phase labels**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-11T23:57:20Z
- **Completed:** 2026-04-12T00:02:29Z
- **Tasks:** 3/3 completed
- **Files modified:** 5 plan-owned files

## Accomplishments

- Added `tests/parity-cutover.test.cjs` to cover migration fixtures, structured-truth authority, research-pipeline proposal semantics, migration-blocked gates, current-repo routing, generated skill wording, manifest truth, preview helper copy, and paper/rebuttal boundaries.
- Fixed a current-repo routing drift where decorated GSD phase labels in `STATE.md` resolved as `missing_phase`.
- Wrote `14-PARITY-REPORT.md` with command evidence, fixture coverage, GSD/Auto reuse assessment, minimum-modification assessment, Phase 12 boundary notes, and remaining risks.

## Task Commits

No commits were created by this executor. The working tree already contains overlapping Plan 14-01, Plan 14-02, and orchestrator-owned `.planning` changes; changes remain unstaged to avoid mixing ownership.

## Files Created/Modified

- `tests/parity-cutover.test.cjs` - New whole-repo parity test layer.
- `bin/lib/ljx-runtime-core.cjs` - Accepts decorated GSD state phase labels such as `14 (Name) - EXECUTING` in shared phase-token normalization.
- `tests/runtime-core.test.cjs` - Adds focused regression coverage for decorated state phase labels in multi-phase projects.
- `.planning/phases/14-complete-migration-cutover-and-parity-verification/14-PARITY-REPORT.md` - Evidence-backed parity report.
- `.planning/phases/14-complete-migration-cutover-and-parity-verification/14-03-SUMMARY.md` - This summary.

## Decisions Made

- Kept the current-repo routing repair in `ljx-runtime-core.cjs`, the shared phase parsing owner, instead of editing `STATE.md` or adding a parity-test adapter.
- Treated Phase 12's pending whole-repo review/verify note as separate historical state; Plan 14-03 did not close it in `ROADMAP.md` or `REQUIREMENTS.md`.
- Kept global installed production skill replacement out of scope; only preview install was refreshed.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Current-repo progress/next returned `missing_phase` for decorated GSD state labels**
- **Found during:** Task 1/2 parity tests.
- **Issue:** `STATE.md` contains `Phase: 14 (Migration Cutover And Parity Verification) -- EXECUTING`; the runtime normalizer only accepted bare or hyphen-delimited phase tokens, so current-repo routing stopped at `missing_phase`.
- **Fix:** Updated shared phase-token regexes in `ljx-runtime-core.cjs` to accept tokens followed by whitespace or `(`, preserving existing numeric, lettered, and project-code semantics.
- **Files modified:** `bin/lib/ljx-runtime-core.cjs`, `tests/runtime-core.test.cjs`, `tests/parity-cutover.test.cjs`.
- **Verification:** Focused regression, parity tests, cross-surface tests, current-repo progress/next smoke, preview install, and full `npm test` passed.
- **Committed in:** Not committed; see Task Commits.

---

**Total deviations:** 1 auto-fixed (1 bug).
**Impact on plan:** The repair was required to make current-repo parity true and stayed within the shared runtime owner.

## Issues Encountered

- The first parity run failed on current-repo routing because `currentPhase.id` was undefined. Root cause was the decorated `Phase:` label parser behavior described above.

## Verification

- **RED:** `node --test tests/parity-cutover.test.cjs tests/migration-cutover.test.cjs tests/research-pipeline-cutover.test.cjs` failed on current-repo routing before the parser repair.
- **RED focused:** `node --test tests/runtime-core.test.cjs --test-name-pattern "decorated GSD"` failed after tightening the regression fixture to include multiple phase directories.
- `node --check bin/lib/ljx-runtime-core.cjs && node --test tests/runtime-core.test.cjs --test-name-pattern "decorated GSD" && node --test tests/parity-cutover.test.cjs tests/migration-cutover.test.cjs tests/research-pipeline-cutover.test.cjs` - passed.
- `node --test tests/parity-cutover.test.cjs tests/runtime-state.test.cjs tests/runtime-core.test.cjs tests/runtime-shell.test.cjs tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs tests/research-pipeline-cutover.test.cjs tests/migration-cutover.test.cjs` - passed: 266 tests, 10 suites, 0 failures.
- `node bin/install.js --print-manifest` - passed; `ljx-GSD-research-pipeline`, `ljx-GSD-paper-pipeline`, and `ljx-GSD-rebuttal` are bridge-ready.
- `node bin/install.js --preview` - passed; preview target `.build/codex-preview`, compatibility skills `(none)`.
- `node bin/lib/ljx-state-tools.cjs progress --cwd "$PWD"` - passed; Phase 14 resolves with recommendation `ljx-GSD-execute-phase 14`.
- `node bin/lib/ljx-state-tools.cjs next --cwd "$PWD"` - passed; action `ljx-GSD-execute-phase 14`, availability `bridge-ready`.
- `npm test` - passed: 546 tests, 38 suites, 0 failures.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 14-04 can proceed with operator cutover docs and the minimal Phase 04-06 progress reconciliation. Plan 14-03 leaves `STATE.md`, `ROADMAP.md`, `REQUIREMENTS.md`, and global production skills untouched.

---
*Phase: 14-complete-migration-cutover-and-parity-verification*
*Completed: 2026-04-12*
