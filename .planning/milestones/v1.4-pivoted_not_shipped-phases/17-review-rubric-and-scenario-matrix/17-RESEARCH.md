# Phase 17: Review Rubric And Scenario Matrix - Research

**Status:** Complete
**Generated:** 2026-04-12

## Research Question

How should `ljx-GSD` be reviewed so that hard bugs, parity loss, state/control-plane drift, scenario gaps, and efficiency problems are found in a bounded and reproducible way?

## Inputs

- User request for a shallow-to-deep review and two-clean-round loop.
- Phase 15 upstream notes:
  - `.planning/review/v1.1/GSD-REFERENCE-NOTES.md`
  - `.planning/review/v1.1/AUTO-ARIS-REFERENCE-NOTES.md`
- Phase 16 implementation index:
  - `.planning/review/v1.1/LJX-GSD-IMPLEMENTATION-INDEX.md`
- Current review loop state and bug ledger:
  - `.planning/review/v1.1/REVIEW-LOOP-STATE.md`
  - `.planning/review/v1.1/BUG-LEDGER.md`

## Output Artifacts

- `.planning/review/v1.1/REVIEW-RUBRIC.md`
- `.planning/review/v1.1/SCENARIO-MATRIX.md`
- `.planning/review/v1.1/REVIEW-PROTOCOL.md`

## Findings

### Rubric Shape

The rubric must put reliability and data integrity first. Documentation drift, naming polish, and small redundancies are reviewable but cannot distract from harder failures such as state corruption, unsafe mutation, broken install output, skipped lifecycle gates, or research-control-plane drift.

### Scenario Shape

Scenario coverage must not require launching expensive external research or GPU jobs during the review by default. It should use helper context commands, generated skill contracts, fixture-style temporary planning projects, existing tests, and static parity checks. Expensive/interactive scenarios should pass if the command prepares the correct plan/evidence/confirmation boundary and stops honestly.

### Loop Shape

Candidate findings require second-pass confirmation. Fixes reset the clean-round streak. The milestone passes only after two consecutive clean rounds or stops with a residual-risk report at Round 11.

## Downstream Use

Phase 18 should run Round 1 using the Phase 17 rubric, matrix, and protocol.
Phase 19 should keep using the same protocol until two clean rounds pass or the cap is reached.
