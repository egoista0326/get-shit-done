# v1.2 Round 01 Review

**Date:** 2026-04-12
**Verdict:** not clean; confirmed issues fixed.
**Clean count after round:** 0

## Confirmed Issues

Round 1 produced confirmed issues V12-001 through V12-009 in `BUG-LEDGER.md`.

The highest-risk classes were:

- unsafe path/state handling around `.planning`, runtime state families, handoff files, and migration records
- quality-gate correctness for symlinked artifacts, terminal capped states, and verification freshness
- Auto prompt/tooling fidelity gaps in active installed upstream skills and converter support
- `ljx-GSD-*` prompt self-containment violations where generated skills called raw upstream Auto skills

## Self-Containment Addendum

User added an explicit constraint during Round 1: the whole `ljx-GSD` skill surface must be self-contained and must not call raw GSD or Auto skills.

Confirmed examples before the fix:

- `ljx-GSD-idea-discovery` delegated to raw `$idea-discovery`
- `ljx-GSD-research-refine` delegated to raw `$research-refine`
- `ljx-GSD-experiment-bridge` called `$run-experiment`, `$monitor-experiment`, `$training-check`, and `$experiment-audit`
- `ljx-GSD-review-loop` called raw execution companion skills
- `ljx-GSD-paper-pipeline` called raw paper companion skills such as `$paper-plan`, `$paper-write`, and `$auto-paper-improvement-loop`
- `ljx-GSD-result-to-claim` routed missing audit follow-up to raw `$experiment-audit`

Fix policy:

- preserve the upstream Auto/GSD capability as internal ljx-GSD stage semantics
- allow only `$ljx-GSD-*` skill invocations from generated `ljx-GSD-*` prompts, plus environment placeholders such as `$PWD`
- route missing experiment audit follow-up through `$ljx-GSD-experiment-bridge` and internal `experiment-integrity-audit` stage semantics
- expose helper context as `internalExecutionStages`, `internalPaperStages`, and `integrityAuditStage`, not `companionSkills` or `integrityAuditSkill`

## Verification

Passed:

- `node --test tests/skill-build.test.cjs tests/experiment-bridge-bridge.test.cjs tests/review-loop-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/result-to-claim-bridge.test.cjs`
- `node bin/install.js --preview`
- generated preview grep scan for raw upstream invocation patterns under `.build/codex-preview/skills/ljx-GSD-*`
- `node --test tests/*.test.cjs` (653/653 passed)
- `git diff --check`

## Next Round Focus

Round 2 must treat Round 1 as not clean and re-review the fixed implementation. Focus areas:

- source-template maintainability: generated output is clean, but the reviewer should check whether postprocess rewriting is acceptable or should be refactored into the base templates
- documentation/state/accounting consistency for v1.2 after the large Round 1 fix set
- prompt-quality preservation after converting raw Auto companion skill calls into internal ljx-GSD stages
- Codex conformance of generated skill prompts, support tools, and schemas after the new self-contained-skill guard
