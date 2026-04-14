# v1.4 Stage A Round 4 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** Round 4 confirmed P2 implementation, self-containment, prompt-fidelity, config/schema, artifact traceability, and lifecycle/workstream issues. Fixes verify, but the round cannot count as clean.

## Scope Covered

- Independent install/runtime closure when upstream GSD or Auto Research in Sleep is absent or also installed.
- Codex conversion details: hook cwd, environment variable assumptions, sample thread identifiers, and active-surface raw invocation scans.
- Prompt fidelity for concrete Auto/GSD task controls, especially experiment, review, rebuttal, claim, and paper paths.
- File and artifact traceability across dependency phases, migration, pause/resume, rebuttal, paper pipeline, and workstream progress.
- Config and CLI propagation for research pipeline controls, claim scoring, W&B observability, and fail-closed unknown policies.
- Workstream/workspace boundary and root roadmap mutation safety.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-038 through V14-050.

## Key Root Causes

- Several earlier self-containment fixes removed active raw upstream skills but left conversion assumptions from Claude/old Codex material in support scripts and archived examples.
- The review had been strong on active routing but weaker on "file produced in phase N, consumed in phase N+1/N+2" evidence propagation.
- Runtime config validation became strict, which was correct for unknown policies but too narrow for legitimate research workflow values.
- Some helper paths still read context twice; one read received overrides while the final state-writing/read path did not.
- Progress and admin helpers still had a few paths where legacy markdown summaries or global root state could win over structured workstream/phase records.

## Verification

- Syntax checks passed for touched runtime/build/helper files:
  - `node --check bin/lib/build-skills.cjs`
  - `node --check bin/lib/codex-conversion.cjs`
  - `node --check bin/lib/ljx-cli-args.cjs`
  - `node --check bin/lib/ljx-runtime-core.cjs`
  - and the touched research, paper, rebuttal, phase-context, state, workstream, roadmap, and workspace helpers.
- Targeted build/regression suite passed: `node --test tests/skill-build.test.cjs tests/runtime-core.test.cjs tests/phase-context.test.cjs tests/cli-parser-contract.test.cjs tests/experiment-evidence-tools.test.cjs tests/research-pipeline-cutover.test.cjs tests/roadmap-admin-bridge.test.cjs tests/runtime-shell.test.cjs tests/migration-cutover.test.cjs tests/rebuttal-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/workspace-admin-bridge.test.cjs tests/docs-contract.test.cjs` with 424/424 passing.
- Additional targeted full-failure repair suite passed: `node --test tests/runtime-core.test.cjs tests/claim-gate-bridge.test.cjs tests/experiment-bridge-bridge.test.cjs tests/code-review-fix-bridge.test.cjs` with 94/94 passing.
- Whole suite passed: `npm test` with 759/759 passing.
- Preview install passed: `npm run build:preview`.
- Generated preview scan found no `CODEX_PROJECT_DIR`, `CODEX_SESSION_ID`, `CLAUDE_PROJECT_DIR`, or sample `"codex_thread_id": "019cfcf4-..."` in active generated skills/runtime/archive surface.
- Generated active skill scan found no actionable raw GSD/Auto workflow invocation in `.build/codex-preview/skills`.

## Clean Decision

Not clean. P2 findings were accepted and fixed, so Stage A clean count remains 0.

## Next Round Focus

- Start Stage A Round 5 with a fresh "can the installed skill operate alone" pass, paying special attention to any residual assumptions outside `ljx-gsd/runtime` and `skills/ljx-GSD-*`.
- Re-scan prompt floors for any remaining "workflow works but quality regresses" gaps against upstream GSD/Auto Research in Sleep.
- Stress artifact lookup and update flows through migration -> dependency phase -> pause/resume -> paper/rebuttal.
- Confirm config schema strictness is neither too loose for unknown keys nor too narrow for legitimate Auto-compatible values.
