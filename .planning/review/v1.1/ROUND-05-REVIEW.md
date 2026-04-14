# v1.1 Round 05 Review

**Date:** 2026-04-12
**Scope:** Post-Round04 strict re-review under the user's clarified rule that the addendum also requires two consecutive clean rounds.
**Status:** Not clean; confirmed issues fixed; clean streak reset to 0.

## Review Inputs

- Current implementation after the Round 04 strict addendum fixes.
- Generated/install surface, runtime helper changes, tests, planning docs, review-loop state, and prompt-quality floors.
- User clarification: keep the modifications, but success still requires the same previous review flow: two consecutive review rounds with no issues.

## Confirmed Findings

| ID | Severity | Finding | Confirmation | Fix |
|----|----------|---------|--------------|-----|
| BUG-019 | P2 | Experiment `execute-phase` accepted directories named like `08-EXPERIMENT_PLAN.md` as planning truth. | Local code inspection confirmed direct `fs.existsSync()` in `experimentPlanningTruthExists()` and type-blind lifecycle artifact checks. | Required regular files for lifecycle artifact evidence and direct experiment-plan prerequisite checks; added a directory-masquerade regression. |
| BUG-020 | P2 | Migration release/status gates accepted directories as manifests and reports. | Local code inspection confirmed type-blind `pathExistsUnderProject()` for backup manifests, conversion reports, and required migration reports. | Added `fileExistsUnderProject()` and required regular files for manifests/reports while keeping backup roots path-existence based. |
| BUG-021 | P2 | Research-pipeline created downstream missing stages with `add` after the first created stage, so later unrelated phases could break the formal chain. | Local code inspection confirmed `afterStage` did not change `operation` from `add` to `insert`; a regression with later Phase 9 reproduced the risk. | Made `afterStage` operations use `insert`, preserved the root insertion anchor for chained inserts, and added a later-unrelated-phase regression. |
| BUG-022 | P2 | Review-loop state/final report still claimed pass after Round 3 / clean streak 2 even after Round 04 added fixes. | The user clarified that the strict addendum must obey the same two-clean-round rule; stale docs contradicted `BUG-LEDGER.md` and `REVIEW-PROTOCOL.md`. | Updated review-loop accounting to include Round 04 and Round 05, reset the clean streak, and deferred final pass until two fresh clean rounds. |
| BUG-023 | P2 | `.planning/STATE.md` claimed 20/20 phases and 100% progress while Phase 12 remained unchecked. | Roadmap summary and progress table showed Phase 12 as pending historical review/verify debt. | Changed state progress to 19/20 roadmap phases complete and made the historical Phase 12 debt explicit. |
| BUG-024 | P3 | `.planning/ROADMAP.md` Phase 20 progress row was stale. | The Phase 20 row still said `In progress` after Round 04 artifacts and before the corrected review-loop state was recorded. | Updated the roadmap wording/row to match the active review-loop state rather than stale closeout text. |

## Verification After Fixes

- `node --test tests/execute-phase-shell.test.cjs` -> 18/18 pass
- `node --test tests/migration-cutover.test.cjs` -> 11/11 pass
- `node --test tests/research-pipeline-cutover.test.cjs` -> 11/11 pass
- `node --test tests/*.test.cjs` -> 575/575 pass, 39 suites

## Clean-Round Accounting

Round 05 is not clean because it confirmed and fixed P2/P3 issues. The clean streak is 0 after this round.

Next required actions:

- Round 06 was run after the user requested a more granular prompt/capability review, and it found further confirmed issues.
- Round 07 is the next fresh review after Round 06 fixes.
- Superseded note: later Round 06, Round 07, and Round 08 reviews found additional issues. Current clean-round accounting is in `REVIEW-LOOP-STATE.md`.
