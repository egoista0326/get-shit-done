# Phase 20 Research: Strict Review Method

## Inputs

- `.planning/review/v1.1/REVIEW-RUBRIC.md`
- `.planning/review/v1.1/SCENARIO-MATRIX.md`
- `.planning/review/v1.1/FINAL-VERIFICATION-REPORT.md`
- `.planning/review/v1.1/BUG-LEDGER.md`
- `.planning/review/v1.1/GSD-REFERENCE-NOTES.md`
- `.planning/review/v1.1/AUTO-ARIS-REFERENCE-NOTES.md`
- `.planning/review/v1.1/LJX-GSD-IMPLEMENTATION-INDEX.md`
- current source/tests/docs

## Stricter Review Rule

The v1.1 rubric remains valid, but Phase 20 tightens review in four ways:

1. Treat docs/generated-skill drift as a possible P2 when it can cause a normal user to run a wrong command or skip a required gate.
2. Treat scenario gaps as P2 when the public surface claims the scenario is supported and no helper/test/static contract covers the handoff.
3. Treat unsafe default behavior as P1 even if it only appears in generated instructions, because generated skills are the Codex execution contract.
4. Treat upstream parity gaps as P2/P1 depending on whether the capability was intentionally deferred, preserved as a companion route, or silently lost.

## Additional Review Dimensions

- CLI parser and payload hygiene
- path traversal and symlink overwrite boundaries
- generated skill text vs helper JSON contract
- preview output self-containment
- source-root fallback and upstream baseline availability
- canonical config and legacy alias precedence
- safe/guided/autonomous policy propagation
- phase/workstream/current-context resolution
- review freshness and rerun-after-fix semantics
- direct workflow adoption vs false completion
- migration/cutover import/repair/release safety
- paper/rebuttal bounded workspace behavior
- research evidence and claim provenance
- literature/novelty/review helper honesty around external evidence limits
- state mirror consistency between structured records and markdown docs
- P3 wording-sensitive tests that could conceal real drift later
- per-skill prompt fidelity: whether generated skills retain upstream planning steps, role instructions, quality gates, acceptance criteria, and concrete output requirements rather than becoming thin helper wrappers

## Scenario Expansion Principle

The earlier matrix S01-S15 is retained. Phase 20 adds stricter sub-scenarios for:

- malformed input and unsupported command handling
- generated preview contract drift
- preserved companion skill discoverability
- policy switching under safe vs autonomous settings
- phase-local evidence adoption without root Auto artifacts becoming lifecycle truth
- admin mutation rollback and structured record consistency
- post-review freshness after fixes and deleted files
- production cutover boundary clarity
- prompt/task-planning quality for representative lifecycle, research, experiment, review, paper, and admin skills
