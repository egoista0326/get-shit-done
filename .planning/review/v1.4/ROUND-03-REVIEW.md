# v1.4 Stage A Round 3 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** Round 3 confirmed P2 implementation, prompt-fidelity, artifact-ledger, config/CLI, and quality-gate issues. Fixes verify, but the round cannot count as clean.

## Scope Covered

- Prompt fidelity and concrete Auto/GSD task-quality preservation, not only command routing.
- Artifact and file traceability across discovery, refine, experiment planning/execution, claim gates, paper, rebuttal, migration, and resume handoffs.
- Codex-facing variables, CLI parser behavior, boolean flags, uppercase legacy alias normalization, and phase handoff config propagation.
- Generated skill self-containment and active preview install surface.
- Lifecycle quality gates for code-review, code-review-fix, verify-work, post-fix reruns, terminal review states, and deleted/stale implementation scopes.
- Migration-blocked routing and workspace/workstream boundary evidence.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-028 through V14-037.

## Key Root Causes

- Several Round 2 fixes validated routing and install closure but did not force every restored Auto knob into runtime context, prompt text, docs, and parser tests.
- Audit artifact handling used candidate order as a source classifier. After `EXPERIMENT_AUDIT.json` became canonical, phase-local Markdown audit became a non-primary candidate and was incorrectly treated as root Auto compatibility evidence.
- Review quality-gate state had too many independent status fields (`status`, `gate_status`, `overall_verdict`, `verdict`, recommendation), and some paths still interpreted stale/pending states as safe to continue.
- Research handoff and required-reading collectors were artifact-name incomplete; they did not use a broad enough Auto research artifact inventory.
- `research-pipeline` kept a manual parser after the shared parser grew stricter behavior.

## Verification

- Syntax checks for touched helpers and tests passed.
- Targeted parser/docs/runtime suite passed: `node --test tests/cli-parser-contract.test.cjs tests/docs-contract.test.cjs tests/runtime-core.test.cjs` with 65/65 passing.
- Targeted audit/claim regression passed: `node --test tests/experiment-evidence-tools.test.cjs tests/result-to-claim-bridge.test.cjs tests/claim-gate-bridge.test.cjs` with 46/46 passing.
- Full research helper regression passed: `node --test tests/idea-discovery-bridge.test.cjs tests/research-refine-bridge.test.cjs tests/experiment-plan-bridge.test.cjs tests/experiment-bridge-bridge.test.cjs tests/experiment-evidence-tools.test.cjs tests/result-to-claim-bridge.test.cjs tests/claim-gate-bridge.test.cjs tests/ablation-planner-bridge.test.cjs tests/novelty-check-bridge.test.cjs tests/research-review-bridge.test.cjs` with 89/89 passing.
- Quality-gate regression passed: `node --test tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/code-review-fix-bridge.test.cjs tests/review-loop-bridge.test.cjs tests/rebuttal-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs` with 157/157 passing.
- Migration/runtime/build regression passed: `node --test tests/research-pipeline-cutover.test.cjs tests/migration-cutover.test.cjs tests/runtime-shell.test.cjs tests/skill-build.test.cjs tests/bridge-contract.test.cjs tests/runtime-state.test.cjs` with 206/206 passing.
- Whole suite passed: `node --test tests/*.test.cjs` with 743/743 passing.
- Preview install passed: `node bin/install.js --preview`.
- Generated preview runtime syntax passed: `find .build/codex-preview/ljx-gsd/runtime -name '*.cjs' -print0 | xargs -0 -n1 node --check`.
- Generated preview active-skill raw invocation scan found no actionable raw upstream skill invocation.
- `git diff --check` passed.

## Clean Decision

Not clean. P2 findings were accepted and fixed, so Stage A clean count remains 0.

## Next Round Focus

- Review from the perspective of “can an installed `ljx-GSD` agent run common tasks without upstream GSD/Auto available,” including the workspace boundary.
- Recompare prompt floors against upstream GSD/Auto task-quality details after the new parameter and artifact patches.
- Stress file tracking for create -> locate -> read -> update -> resume -> migrate, especially cross-phase research dependencies and paper/rebuttal paths.
- Verify no helper-specific parser or route override path can silently accept unknown flags, raw commands, or unsupported upstream stage names.

