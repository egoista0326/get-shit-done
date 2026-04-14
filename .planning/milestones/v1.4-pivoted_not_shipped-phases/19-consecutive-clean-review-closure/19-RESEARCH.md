# Phase 19 Research: Clean Review Closure Method

## Inputs

- `.planning/review/v1.1/REVIEW-RUBRIC.md`
- `.planning/review/v1.1/SCENARIO-MATRIX.md`
- `.planning/review/v1.1/REVIEW-PROTOCOL.md`
- `.planning/review/v1.1/ROUND-01-REVIEW.md`
- `.planning/review/v1.1/ROUND-01-CONFIRMATION.md`
- `.planning/review/v1.1/BUG-LEDGER.md`
- `.planning/review/v1.1/REVIEW-LOOP-STATE.md`
- Phase 15 upstream notes
- Phase 16 implementation index
- Phase 18 summaries

## Method

Run each clean-review round in three passes:

1. **Automated gates:** preview install, full test suite, focused probes for changed surfaces, progress/next routing.
2. **Static review gates:** inspect changed implementation and tests against the review rubric, generated skill output, source-root behavior, config normalization, and experiment-launch policy.
3. **Scenario/parity gates:** confirm the user-requested scenario matrix still has no new red flags, especially GSD lifecycle, research workflows, code review, literature/Auto companion preservation, pause/resume, workstreams/workspaces, and safe/autonomous switching.

## Pass Criteria

A round is clean only when:

- Automated gates pass.
- Generated preview output matches source changes.
- No candidate finding survives second-pass confirmation as a current-scope bug.
- No accepted bug is fixed in that round.

## Round Accounting

- Round 1: not clean; four confirmed bugs fixed.
- Round 2 target: clean if no confirmed bugs after post-fix review.
- Round 3 target: clean if no confirmed bugs after a fresh repeat review.
- Stop after Round 3 only if Round 2 and Round 3 are both clean.
