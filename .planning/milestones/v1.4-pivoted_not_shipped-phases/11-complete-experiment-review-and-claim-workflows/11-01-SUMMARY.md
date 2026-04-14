---
phase: 11-complete-experiment-review-and-claim-workflows
plan: 01
subsystem: runtime
tags: [node, commonjs, runtime-state, experiment-evidence, build-skills, tdd]

requires:
  - phase: 10-complete-discovery-and-refinement-workflows
    provides: Typed research-state family precedent and generated install surface discipline.
provides:
  - Centrally allowlisted `experiments/{phase}.json` and `claims/{phase}.json` runtime state families.
  - Read-only shared experiment evidence helper for phase-local artifact links and claim readiness freshness.
  - Installed runtime copy support for `ljx-experiment-evidence-tools.cjs`.
affects:
  - experiment-plan
  - experiment-bridge
  - review-loop
  - research-review
  - result-to-claim
  - claim-gate
  - build-skills

tech-stack:
  added: []
  patterns:
    - Read-only phase-local evidence link helper.
    - Runtime-state allowlist ownership through `buildStateRecordPath()`.
    - Generated runtime helper copy verified by build-surface tests.

key-files:
  created:
    - bin/lib/ljx-experiment-evidence-tools.cjs
    - tests/experiment-evidence-tools.test.cjs
  modified:
    - bin/lib/ljx-runtime-state.cjs
    - bin/lib/build-skills.cjs
    - tests/runtime-state.test.cjs
    - tests/skill-build.test.cjs

key-decisions:
  - "Use adjacent `experiments` and `claims` state families through `buildStateRecordPath()` instead of a new evidence-bundles family."
  - "Keep `ljx-experiment-evidence-tools.cjs` as a read-only link/readiness layer; it does not import or call state writers."
  - "Copy the helper into installed runtime output without changing generated skill wording in this plan."

patterns-established:
  - "Evidence links use phase-local `{phase}-{SUFFIX}.md` artifacts with `present`, `missing`, `intentionally_pending`, and stale readiness statuses."
  - "Claim freshness compares `RESULT_TO_CLAIM` mtime against newer `EXPERIMENT_RESULTS` or `RESEARCH_REVIEW` artifacts."

requirements-addressed: [IMPL-05]

duration: 5 min
completed: 2026-04-11
---

# Phase 11 Plan 01: Shared Evidence Substrate Summary

**Read-only experiment and claim evidence substrate with central runtime state families, freshness-aware claim readiness, and installed runtime copy support**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-11T02:14:11Z
- **Completed:** 2026-04-11T02:18:55Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- Added `experiments` and `claims` to the central runtime-state allowlist.
- Created `bin/lib/ljx-experiment-evidence-tools.cjs` with the required artifact descriptors, link statuses, state-path builder, evidence links, claim readiness, claim staleness, and combined evidence context exports.
- Added TDD coverage for the state family contract, all seven artifact suffixes, intentionally pending evidence, stale `RESULT_TO_CLAIM` metadata, and the no-empty-state rule.
- Updated build/install copy support so preview runtime output includes and can require the shared evidence helper.

## Task Commits

1. **Task 1: Specify accepted evidence state and link contracts** - `dcec9d7` (`test`)
2. **Task 2: Implement runtime allowlist and shared evidence helper** - `9f11d5a` (`feat`)
3. **Task 3: Add installed runtime copy support** - `7086e3e` (`test`), `fe67835` (`feat`)

## Files Created/Modified

- `bin/lib/ljx-experiment-evidence-tools.cjs` - Shared read-only evidence link and claim readiness helper.
- `bin/lib/ljx-runtime-state.cjs` - Central runtime state allowlist now accepts `experiments` and `claims`.
- `bin/lib/build-skills.cjs` - Copies the shared evidence helper into `ljx-gsd/runtime`.
- `tests/experiment-evidence-tools.test.cjs` - Contract tests for evidence descriptors, statuses, paths, no-write behavior, and staleness.
- `tests/runtime-state.test.cjs` - Runtime-state tests for accepted experiment/claim families and unsupported-family rejection.
- `tests/skill-build.test.cjs` - Build-surface test for installed evidence helper copy and requireability.

## Decisions Made

- Used `experiments/{phase}.json` and `claims/{phase}.json` as the adjacent state families because Phase 11 explicitly needed experiment and claim evidence without introducing a second control plane.
- Kept helper reads side-effect-free: the evidence helper only computes paths, stats, and summaries and does not create `.planning/state/experiments/*.json` or `.planning/state/claims/*.json`.
- Left generated skill wording unchanged, matching the plan boundary that wording updates belong to later Phase 11 flow updates.

## Verification

RED checks:

- `node --test tests/runtime-state.test.cjs tests/experiment-evidence-tools.test.cjs` failed before implementation with `MODULE_NOT_FOUND` for `ljx-experiment-evidence-tools.cjs` and `Unsupported state family: experiments`.
- `node --test tests/skill-build.test.cjs` failed before the builder change on the missing installed evidence helper assertion.

GREEN and final checks:

- `node --check bin/lib/ljx-runtime-state.cjs`
- `node --check bin/lib/ljx-experiment-evidence-tools.cjs`
- `node --check bin/lib/build-skills.cjs`
- `node --test tests/runtime-state.test.cjs tests/experiment-evidence-tools.test.cjs tests/skill-build.test.cjs` passed with 46/46 tests.
- `node bin/install.js --preview` passed and generated `.build/codex-preview`.

## Deviations from Plan

None - plan executed exactly as written.

**Total deviations:** 0 auto-fixed.
**Impact on plan:** No scope expansion; the work stayed within the shared substrate and build-surface support.

## Issues Encountered

None.

## Authentication Gates

None.

## Known Stubs

None. Stub scan found only existing default-argument literals and test wording containing "placeholders"; no hardcoded UI/data stubs were introduced.

## Threat Flags

None. New state-family use, phase-local artifact scan, freshness metadata, and installed runtime copy behavior were all covered by the plan threat model.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Ready for `11-02`: later Phase 11 plans can import the shared helper and wire experiment/review/claim workflows to the same evidence model without changing this substrate again.

## Self-Check: PASSED

- Found all created/modified files listed in the summary.
- Found task commits `dcec9d7`, `9f11d5a`, `7086e3e`, and `fe67835` in git history.
- Confirmed `.planning/STATE.md`, `.planning/ROADMAP.md`, and `.planning/REQUIREMENTS.md` were not modified by this executor.

---
*Phase: 11-complete-experiment-review-and-claim-workflows*
*Completed: 2026-04-11*
