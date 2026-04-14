# v1.4 Stage A Round 2 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** Round 2 found P1/P2-equivalent implementation and prompt-fidelity issues. The fixes now verify, but the round cannot count as clean.

## Scope Covered

- Independent runtime closure: preview install surface, internal Auto archive, raw upstream coexistence, and generated skill self-containment.
- Prompt fidelity: generated `ljx-GSD-*` quality floors for idea discovery, code review, experiment audit, hard review loops, paper pipeline, and initial planned-skill content parity.
- Config and variables: direct CLI overrides, phase handoff propagation, Codex hook stdin `cwd`, and unsupported flag behavior.
- Artifact and file traceability: migration evidence classes, root Auto compatibility artifacts, paper/rebuttal/claim state paths, paper improvement log, and relocation-safe pointers.
- Lifecycle gates: deleted file review scope, git fallback commit matching, pause/resume damaged state, and verify-work review requirements.
- Docs and tests: actionable routing docs, docs-contract mirrors, and regression coverage for the accepted findings.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-016 through V14-027.

## Verification

- Targeted syntax check for touched helpers/tests passed.
- Targeted Round 2 regression suite passed: `node --test tests/skill-build.test.cjs tests/experiment-bridge-bridge.test.cjs tests/idea-discovery-bridge.test.cjs tests/rebuttal-bridge.test.cjs tests/runtime-core.test.cjs tests/migration-cutover.test.cjs tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/experiment-evidence-tools.test.cjs tests/result-to-claim-bridge.test.cjs tests/claim-gate-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/paper-evidence-tools.test.cjs tests/runtime-shell.test.cjs tests/docs-contract.test.cjs` with 416/416 passing.
- Full suite passed: `node --test tests/*.test.cjs` with 737/737 passing.
- Preview install passed: `node bin/install.js --preview`.
- Generated preview runtime syntax passed: `find .build/codex-preview/ljx-gsd/runtime -name '*.cjs' -print0 | xargs -0 -n1 node --check`.
- Generated preview active-skill scan found no actionable raw upstream skill invocation; only benign prose/internal archive references were seen.
- `git diff --check` passed.

## Clean Decision

Not clean. The round accepted P2 issues in prompt fidelity, artifact traceability, lifecycle gates, and config propagation, so Stage A clean count remains 0 after fixes.

## Next Round Focus

- Re-run generated prompt parity against initial ljx-GSD planning goals, not only upstream GSD/Auto baselines.
- Re-scan installed preview for raw upstream routing after the new prompt-quality floors.
- Pressure-test file tracking across create -> locate -> read -> update -> resume -> migrate, especially research paper/rebuttal artifacts.
- Check whether any remaining global config or Codex hook variable path uses Claude-only names or invented fields.

