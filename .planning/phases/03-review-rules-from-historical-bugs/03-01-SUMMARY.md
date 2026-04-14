---
phase: 03-review-rules-from-historical-bugs
plan: 01
subsystem: architecture-review
tags: [review-rules, historical-bugs, gsd, phase-03]
requires:
  - phase: 02-target-gsd-framework-design-rounds
    provides: Approved target framework and completion/config/upgrade specs
provides:
  - Historical bug to review rule map
  - Review rules
  - Review matrix
affects: [phase-03, phase-04, framework-review]
tech-stack:
  added: []
  patterns:
    - Historical-bug-derived review rules
    - Clean-round accounting before framework review
    - Blocking versus advisory rule classification
key-files:
  created:
    - .planning/phases/03-review-rules-from-historical-bugs/03-HISTORICAL-BUG-RULE-MAP.md
    - .planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-RULES.md
    - .planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-MATRIX.md
  modified: []
key-decisions:
  - Phase 05 review findings must cite a Phase 03 rule and historical failure mechanism.
  - P0/P1/P2 accepted findings block clean review rounds by default.
  - `phase_type`, typed routing, second control plane, false completion, missing raw evidence, unparseable review artifacts, and ambiguous state ownership are hard blockers.
  - `danger-auto` is reviewed as auditability plus honest-completion semantics, not only as permission scope.
  - Scenario review supplements static framework review but does not replace it.
patterns-established:
  - Rule families are mapped from historical failures before review loop execution.
  - Review matrix defines required lanes and finding fields for Phase 05.
  - Clean-round counting requires stable matrix and parser/accounting rules.
requirements-addressed: [RULE-01, RULE-02]
requirements-completed: [RULE-01, RULE-02]
duration: 6min
completed: 2026-04-14T00:29:09+02:00
---

# Phase 03-01 Summary: Historical-Bug Review Rules

**Historical ljx-GSD failures have been converted into Phase 05 review rules, a review matrix, and clean-round accounting expectations.**

## Performance

- **Duration:** 6 min execution window
- **Started:** 2026-04-14T00:23:00+02:00
- **Completed:** 2026-04-14T00:29:09+02:00
- **Tasks:** 3
- **Files created:** 3 rule/matrix files plus this summary

## Accomplishments

- Created `03-HISTORICAL-BUG-RULE-MAP.md`, mapping historical failure families to review-rule consequences.
- Created `03-REVIEW-RULES.md`, defining R-01 through R-15, severity defaults, hard gates, advisory signals, and clean-round accounting.
- Created `03-REVIEW-MATRIX.md`, defining Phase 05 review dimensions, required evidence, example probes, pass/fail conditions, reviewer lanes, and finding format.
- Covered the RULE-02 dimensions: GSD fidelity, Auto/ARIS capability preservation, historical-bug regression, self-containment, state/config/concurrency, git/hooks/artifacts, minimal modification, upgradeability, and context hygiene.
- Preserved the Phase 03 boundary: this plan defines rules only and does not start Phase 05 review.

## Files Created/Modified

- `.planning/phases/03-review-rules-from-historical-bugs/03-HISTORICAL-BUG-RULE-MAP.md` - Historical failure family to rule family map.
- `.planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-RULES.md` - Review rules, severity defaults, blocking semantics, clean-round accounting, and hard gates.
- `.planning/phases/03-review-rules-from-historical-bugs/03-REVIEW-MATRIX.md` - Phase 05 reviewer matrix, lanes, finding format, pass conditions, and fail conditions.
- `.planning/phases/03-review-rules-from-historical-bugs/03-01-SUMMARY.md` - This completion summary.

## Decisions Made

- Phase 05 findings must cite a rule id and historical failure family.
- P0/P1/P2 accepted findings block clean rounds unless explicitly downgraded with rationale.
- The review matrix must be stable before a clean round can count.
- Parser/accounting stability is a review gate, not a reporting convenience.
- `danger-auto` cannot clean-complete after skipped required operations, missing authorization, unknown side effects, or gate overrides.

## Deviations From Plan

None. The plan required historical bug mapping, review rules, and review matrix. All three were produced.

## Issues Encountered

- Raw historical ledgers are large. The plan intentionally relies on Phase 01 source-indexed synthesis as the durable historical index and samples raw ledgers for mechanism confirmation.
- Open discussion items remain for 03-02, especially whether all P2 findings reset clean-round accounting and how strongly scenario readiness should block Phase 05 versus Phase 09/release readiness.

## Verification

- `node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" verify plan-structure .planning/phases/03-review-rules-from-historical-bugs/03-01-PLAN.md --cwd "$PWD"` reported `valid: true`.
- Required coverage grep found `False completion`, `typed-phase`, `claim/audit`, `parser drift`, `danger-auto`, `clean round`, `GSD fidelity`, `Auto/ARIS`, `Context hygiene`, `State/config/concurrency`, `Git/hooks/artifacts`, `Minimal modification`, and `Upgradeability`.
- `git diff --check -- .planning/phases/03-review-rules-from-historical-bugs` passed.
- ASCII scan for Phase 03 files produced no non-ASCII matches.

## Next Phase Readiness

`03-02` can start. It should draft stop gates from the rules and then pause for user discussion before marking Phase 03 complete.

## User Setup Required

None.

---
*Phase: 03-review-rules-from-historical-bugs*
*Completed: 2026-04-14T00:29:09+02:00*
