# v1.4 Stage A Round 7 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** Round 7 confirmed multiple P1/P2 implementation, artifact-traceability, config, self-containment, and prompt-fidelity issues. All accepted issues were fixed and freshly verified, but the round cannot count as clean because P1/P2 findings reset the Stage A clean streak.

## Scope Covered

- Prompt fidelity: ablation-planner, experiment-bridge, paper-pipeline, rebuttal, and autonomous milestone lifecycle.
- File traceability: current/dependency research artifacts, unprefixed Auto-style artifacts, `refine-logs/*`, pause/resume required reading, and direct research-pipeline evidence discovery.
- Quality gates: code-review scope resolution, deleted-file freshness, structured review authority, code-review-fix authority, missing CODE_REVIEW artifact handling, and verify-work stop-reason propagation.
- Config and variables: final merged config validation, flat GSD aliases, `research_stage_handoff` vs explicit workflow override precedence, and `--code-sync-method` validation.
- Self-contained command routing: route overrides, quality-gate recommendations, raw upstream payload suffixes, workspace namespace, and preview raw-call scans.
- Install/runtime closure: preview build source-root selection, top-level stale support-root cleanup, and generated skill surface.
- Paper/new-project/workspace edge cases: paper workspace symlink/file collision, unknown `new-project` flags, and ljx-GSD-specific workspace base.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-088 through V14-109.

## Key Root Causes

- Several mechanisms trusted string prefixes as command authority. Route overrides and persisted recommendations needed parsing as a single supported `ljx-GSD-*` command, not as a freeform shell fragment.
- Artifact ledgers were improved in earlier rounds, but still not synchronized as one end-to-end chain. Some imported Auto-style artifacts were preserved but not rediscovered by phase context, pause handoff, experiment evidence, or research-pipeline proposal logic.
- Quality-gate state had two authority sources: markdown artifacts and structured phase-record state. The old logic still let stale markdown hide newer structured blockers, and deletion-only review scopes were treated like stale missing files.
- Config normalization happened before all override sources were merged. Final CLI/phase-record/handoff overrides could produce invalid values after initial validation, and flat GSD aliases did not feed phase-id helper logic.
- Prompt-fidelity checks had preserved runnable flow more strongly than task quality. Some generated skills could route correctly while omitting upstream reviewer raw-evidence, citation-safety, follow-up, sanity-rescue, or all-milestone lifecycle requirements.
- Preview packaging had both over-broad and under-broad assumptions: stale top-level support roots needed cleanup, while source-root discovery needed to stop relying on ambient cwd or `/tmp` fallback paths.

## Verification

- Targeted Round 7 suite passed: `node --test tests/runtime-core.test.cjs tests/execute-phase-shell.test.cjs tests/code-review-bridge.test.cjs tests/code-review-fix-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/phase-context.test.cjs tests/runtime-shell.test.cjs tests/experiment-evidence-tools.test.cjs tests/paper-pipeline-bridge.test.cjs tests/new-project-bridge.test.cjs tests/research-pipeline-cutover.test.cjs tests/workspace-admin-bridge.test.cjs tests/skill-build.test.cjs` with 413/413 passing.
- Whole suite passed after all Round 7 edits: `npm test` with 804/804 passing.
- Build verification passed: `npm run build:preview`, producing 33 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Preview self-containment scans passed:
  - no empty top-level stale `tools`, `templates`, or `mcp-servers` directories under `.build/codex-preview`
  - raw executable-call scan found no `$gsd-*`, `/gsd-*`, `$run-experiment`, `/run-experiment`, `$training-check`, `/training-check`, `$experiment-audit`, `/experiment-audit`, `$auto-review-loop`, `/auto-review-loop`, `$paper-*`, or `/paper-*` calls in active generated skills
  - source-root leak scan found no `/tmp/codex-skill-repos` or `.planning/references/upstreams` references in preview runtime or active generated skills
- `git diff --check` passed.

## Clean Decision

Not clean. Round 7 accepted P1/P2 findings, so Stage A clean count remains 0.

## Next Round Focus

- Stage A Round 8 should start with an explicit matrix that binds artifact import, lookup, required-reading, state writing, quality gates, and generated prompt instructions into one chain per workflow.
- Re-run prompt-fidelity checks for any remaining direct helper where the command is self-contained but the task-quality instructions may still be compressed.
- Re-check self-contained generated skill surface after every build-affecting change, including non-obvious prose that can look like slash-command syntax.
- Keep `.planning` accounting-only changes out of clean-count decisions; only implementation, install, runtime, config, prompt, and verification behavior should affect Stage A clean status.
