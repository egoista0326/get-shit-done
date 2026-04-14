# Phase 18: Confirmed Findings And Fix Pass - Research

**Status:** Ready
**Generated:** 2026-04-12

## Research Question

How should Round 1 review be executed to find real defects without false positives or unbounded churn?

## Inputs

- `.planning/review/v1.1/REVIEW-RUBRIC.md`
- `.planning/review/v1.1/SCENARIO-MATRIX.md`
- `.planning/review/v1.1/REVIEW-PROTOCOL.md`
- Phase 15 upstream reference notes
- Phase 16 implementation index
- Runtime/source/test/generated surfaces listed in Phase 18 context

## Execution Strategy

1. Run local baseline probes:
   - manifest print
   - preview build
   - full Node test suite
   - progress/next helper checks
2. Dispatch parallel read-only review agents on independent surfaces:
   - lifecycle/state/GSD parity
   - Auto/ARIS research parity
   - generated install/preview/config/tests
3. Collect candidate findings into a Round 1 review artifact.
4. Perform second-pass confirmation locally.
5. Fix accepted bugs only.
6. Rerun targeted and baseline verification.
7. Update bug ledger and review-loop state.

## Output Artifacts

Planned outputs:

- `.planning/review/v1.1/ROUND-01-REVIEW.md`
- `.planning/review/v1.1/ROUND-01-CONFIRMATION.md`
- updates to `.planning/review/v1.1/BUG-LEDGER.md`
- updates to `.planning/review/v1.1/REVIEW-LOOP-STATE.md`
- Phase 18 summaries after completion
