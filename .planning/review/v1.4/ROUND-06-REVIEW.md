# v1.4 Stage A Round 6 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** Round 6 confirmed P1/P2 prompt-fidelity, config/variable, artifact-traceability, lifecycle self-containment, Codex conversion, and quality-gate issues. Fixes verify, but the round cannot count as clean.

## Scope Covered

- Prompt fidelity for direct Auto Research style helpers: novelty-check, research-review, result-to-claim, ablation-planner, paper-pipeline, and rebuttal.
- File and artifact traceability from migration/import into dependency phase context, pause/resume required reading, and paper/rebuttal/claim routing.
- Self-contained lifecycle routing: phase-record route overrides must resolve only to installed `ljx-GSD-*` commands and supported route kinds.
- Config and variable propagation for documented GSD aliases, Auto research execution controls, W&B/sync/launch policies, and invalid numeric/deep-review/rebuttal settings.
- Codex install/runtime closure: active skill surface, support-root cleanup, hook event coverage, and installed runtime `require()` closure.
- Quality gates around code-review fallback scope, structured blocked review state, post-fix stale code changes, and verify-work routing.
- Greenfield/workspace-admin initialization boundary: empty `.planning/` scaffolds must not block `new-project`.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-067 through V14-087.

## Key Root Causes

- Several prompts preserved the `ljx-GSD-*` call graph but still under-preserved upstream GSD/Auto review depth: raw reviewer traces, reviewer identity, novelty search depth, claim-readiness stop rules, and rebuttal stress-test evidence had to be made explicit.
- Artifact inventories were still not synchronized end-to-end: files preserved during migration, especially `IDEAS.md` and `refine-logs/*`, needed to be rediscoverable by downstream context and pause/resume readers.
- Config compatibility had two opposite risks: documented GSD aliases were accepted in docs but not normalized at runtime, while numeric and deep-review policy fields were under-validated.
- Structured-state authority needed sharper ordering: newer structured blocked review state must beat older clean markdown, but true material code changes after the structured state must still force stale review reruns.
- Self-containment checks were too string-prefix oriented in some places; lifecycle route overrides needed manifest-backed command validation, and install output needed runtime dependencies copied into the preview package.
- Codex conversion still had small Claude/legacy ambiguities: hook logging matched only Bash events, and code-review prompt wording did not clearly mark `.claude/skills` as read-only legacy policy docs.

## Verification

- Initial red regression run reproduced the accepted Round 6 issues with 16 targeted failures before implementation.
- Targeted Round 6 suite passed: `node --test tests/runtime-core.test.cjs tests/phase-context.test.cjs tests/paper-pipeline-bridge.test.cjs tests/execute-phase-shell.test.cjs tests/new-project-bridge.test.cjs tests/runtime-shell.test.cjs tests/skill-build.test.cjs tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/research-pipeline-cutover.test.cjs` with 362/362 passing.
- Focused repair suites passed:
  - `node --test tests/verify-work-bridge.test.cjs tests/code-review-bridge.test.cjs` with 94/94 passing
  - `node --test tests/rebuttal-bridge.test.cjs tests/runtime-core.test.cjs tests/phase-context.test.cjs` with 78/78 passing
  - `node --test tests/skill-build.test.cjs` with 60/60 passing
- Whole suite passed after all Round 6 edits: `npm test` with 788/788 passing.
- Preview install passed: `npm run build:preview`, producing 33 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred entries, empty `upstreamAutoSkills`, and installed `runtime/manifest.cjs`.
- Preview self-containment scans passed:
  - no top-level active skill directory outside `ljx-GSD-*`
  - raw upstream command grep found only non-actionable state-family paths, manifest source archive paths, or prose like `review/refine/paper-improvement`
  - Claude/Codex scan found one archived upstream Auto Claude-review overlay and one active code-review line, now explicitly read-only and namespace-bounded
  - preview runtime `require()` smoke test loaded `ljx-lifecycle-shell-tools.cjs`, `ljx-runtime-core.cjs`, and `ljx-state-tools.cjs`
- `git diff --check` passed.

## Clean Decision

Not clean. Round 6 accepted P1/P2 findings, so Stage A clean count remains 0.

## Next Round Focus

- Start Stage A Round 7 with fewer but deeper end-to-end invariants: "artifact imported -> rediscovered -> required reading -> state writer -> quality gate" should be traced as one chain, not as isolated tables.
- Re-check prompt-fidelity for any remaining direct helper where the route is correct but upstream task quality may be compressed.
- Stress config aliases and phase-record overrides by using mixed canonical/alias inputs and verifying canonical keys win without dropping supported legacy knobs.
- Re-run install/preview scans early in the round, especially after any route-manifest or support-root changes.
