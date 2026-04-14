# v1.4 Stage A Round 5 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** Round 5 confirmed P1/P2 implementation, lifecycle, prompt-fidelity, CLI/config, artifact-traceability, hook, and self-containment issues. Fixes verify, but the round cannot count as clean.

## Scope Covered

- Independent install/runtime closure and active preview surface cleanliness.
- Prompt fidelity against upstream GSD and Auto Research in Sleep, especially map-codebase, idea discovery, autonomous phase loops, experiment/review variables, and paper evidence.
- Artifact ledger/file traceability across migration, phase dependencies, pause/resume handoff, paper/rebuttal, and research state families.
- Lifecycle gate authority for structured blocked records and stale verification artifacts.
- CLI/config strictness for direct helpers, roadmap/workspace/migration admin helpers, and research-pipeline policy flags.
- Codex hook conversion and docs: Stop hook JSON stdout, `.codex/hooks.json`, and Codex feature toggle guidance.
- Generated preview self-containment: no active raw upstream skills, no stale top-level Auto support roots, and no raw upstream skill dependencies in active `ljx-GSD-*` prompts.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-051 through V14-066.

## Key Root Causes

- Some generated prompts preserved routing but not upstream task-quality substance; map-codebase and idea-discovery needed concrete upstream workflow details, not just self-contained command names.
- Structured-state authority had been applied unevenly: some blockers were too weak against markdown artifacts, while one discuss-stage edge became too strict until narrowed to completed-status artifact fallback.
- Artifact recognition and artifact rediscovery evolved in separate places, so migration could classify files that later phase context, paper evidence, or handoff readers did not know how to find.
- Shared CLI/config parsing covered many restored Auto knobs but still missed a few cross-workflow variables and direct helper fail-closed behavior.
- Codex conversion needed the official Stop hook JSON-output model, not only old Claude/ARIS prose rewritten into Codex terminology.
- Preview cleanup moved support assets under `ljx-gsd/upstream-auto/`, but empty legacy active roots still needed pruning.

## Verification

- Syntax checks passed for touched runtime/build/helper files, including:
  - `node --check bin/lib/ljx-runtime-state.cjs`
  - `node --check bin/lib/ljx-lifecycle-shell-tools.cjs`
  - `node --check bin/lib/codex-conversion.cjs`
  - `node --check bin/lib/build-skills.cjs`
  - `node --check bin/lib/ljx-cli-args.cjs`
  - `node --check bin/lib/ljx-quality-gates-tools.cjs`
  - `node --check bin/lib/ljx-paper-evidence-tools.cjs`
- Targeted Round 5 suite passed: `node --test tests/runtime-state.test.cjs tests/review-loop-bridge.test.cjs tests/idea-discovery-bridge.test.cjs tests/research-refine-bridge.test.cjs tests/phase-context.test.cjs tests/paper-evidence-tools.test.cjs tests/runtime-shell.test.cjs tests/execute-phase-shell.test.cjs tests/verify-work-bridge.test.cjs tests/cli-parser-contract.test.cjs tests/runtime-core.test.cjs tests/experiment-bridge-bridge.test.cjs tests/research-pipeline-cutover.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs` with 364/364 passing.
- Lifecycle repair suite passed after narrowing structured completed-stage fallback: `node --test tests/lifecycle-next.test.cjs tests/execute-phase-shell.test.cjs` with 49/49 passing.
- Whole suite passed: `npm test` with 770/770 passing.
- Preview install passed: `npm run build:preview`, producing 33 active `ljx-GSD-*` skills and no active raw upstream Auto skills.
- Preview install surface scans passed:
  - no non-`ljx-GSD-*` top-level active skill directories
  - no empty stale `skills/shared-references`, `templates/claude-hooks`, `mcp-servers/claude-review`, or old top-level support roots
  - manifest `upstreamAutoSkills` is `[]`
- Codex Stop hook smoke test passed: generated `check_ready.sh` emitted parseable JSON with `continue: true` and `systemMessage`.
- `git diff --check` passed.

## Clean Decision

Not clean. Round 5 accepted P1/P2 findings, so Stage A clean count remains 0.

## Next Round Focus

- Start Stage A Round 6 with extra pressure on "capability preserved but quality reduced" prompt cases, especially remaining research workflows that delegate to subagents or external evidence.
- Re-check structured-state authority for the opposite failure modes: blocked records must not be bypassed, but completed records with valid artifacts must not force unnecessary lifecycle regressions.
- Stress file traceability from migration/import through dependency lookup, pause/resume, and paper/rebuttal review.
- Re-run active preview self-containment scans before classifying any Round 6 as clean.
