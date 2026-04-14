# v1.2 Round 01 Candidate Intake

**Started:** 2026-04-12
**Rule:** collect candidates first; do not edit implementation until second-pass confirmation.

## Lanes

| Lane | Owner | Status |
| --- | --- | --- |
| Runtime/state/path safety | local + subagent | confirmed/fixed |
| GSD lifecycle and code-review/verify parity | local + subagent | confirmed/fixed |
| Auto/ARIS research and prompt-capability preservation | local + subagent | confirmed/fixed |
| Claude Code to Codex adapter correctness | local + subagent | confirmed/fixed |
| Migration/workstream/pause-resume safety | local + subagent | confirmed/fixed |
| ljx-GSD self-contained skill invocation surface | local + subagent | confirmed/fixed |
| Documentation/state/accounting | local + subagent | needs follow-up in next review round |

## Candidate Findings

- Runtime/state path safety candidates became V12-001 through V12-004 in `BUG-LEDGER.md`.
- Migration cutover path-collision candidates became V12-005.
- Code-review/verify quality-gate artifact and terminal-state candidates became V12-006 and V12-007.
- Auto prompt/tooling preservation candidates became V12-008.
- New user-specified self-contained invocation candidate became V12-009 after generated `ljx-GSD-*` prompts were found to call raw upstream Auto skills.
- Documentation/state/accounting remains a next-round follow-up because canonical planning state was not the blocking risk in this implementation pass.

## Baseline Commands

- `node --test tests/skill-build.test.cjs tests/experiment-bridge-bridge.test.cjs tests/review-loop-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/result-to-claim-bridge.test.cjs`
- `node bin/install.js --preview`
- `rg -n 'delegate to upstream|delegate to the upstream|\$idea-discovery|\$research-refine|\$run-experiment|\$monitor-experiment|\$training-check|\$experiment-audit|\$paper-plan|\$paper-figure|\$paper-illustration|\$paper-write|\$paper-compile|\$auto-paper-improvement-loop' .build/codex-preview/skills/ljx-GSD-* -g 'SKILL.md'`
- `node --test tests/*.test.cjs`
- `git diff --check`
