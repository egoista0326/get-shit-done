# v1.1 Round 01 Confirmation

**Date:** 2026-04-12
**Rule:** No candidate is fixed until a second pass confirms the violated contract is current scope, reproducible, and not a deferred/future taxonomy goal.

## Confirmed Findings

| Bug ID | Candidate | Verdict | Confirmation Evidence | Fix Owner |
|--------|-----------|---------|-----------------------|-----------|
| BUG-001 | CF-01 source-root fallback | Confirmed | Phase 15 created repo-local upstream snapshots and Phase 17 makes preview install a baseline gate. `node bin/install.js --preview` failed without env roots before the fix, while the same command passed with explicit repo-local env roots. | `bin/lib/source-roots.cjs`, `bin/install.js`, `tests/source-roots.test.cjs` |
| BUG-002 | CF-02 experiment launch confirmation | Confirmed | `RUNTIME_DEFAULT_CONFIG.workflow.confirm_experiment_launch` defaults to `true` and user requirements explicitly require switching safe/autonomous behavior. `experiment-bridge` did not expose or enforce this setting in helper context or generated skill instructions. | `bin/lib/ljx-experiment-bridge-tools.cjs`, `bin/lib/codex-conversion.cjs`, `tests/experiment-bridge-bridge.test.cjs`, `tests/skill-build.test.cjs` |
| BUG-003 | CF-03 legacy alias normalization | Confirmed | Prior parameter design accepts old GSD/Auto names only at adapter/external input boundaries. `loadProjectConfig()` merged raw `AUTO_DEPLOY`, `HUMAN_CHECKPOINT`, `REVIEWER_MODEL`, literature aliases, and recovery aliases without mapping them to canonical lowercase dotted keys. | `bin/lib/ljx-runtime-core.cjs`, `tests/runtime-core.test.cjs` |
| BUG-004 | CF-04 stale Phase 14 canaries | Confirmed | Phase 14 is now a completed cutover baseline and v1.1 current state is Phase 18. Tests were enforcing an obsolete exact current-phase value instead of the intended "Phase 14-or-later typed routing" invariant. | `tests/docs-contract.test.cjs`, `tests/parity-cutover.test.cjs`, `tests/runtime-shell.test.cjs` |

## Rejected / Non-Bug Candidates

| Candidate | Verdict | Reason |
|-----------|---------|--------|
| Preserve Auto companion execution skills instead of ljx-wrapping every Auto tool | Rejected | This matches the accepted boundary: `experiment-bridge` is a phase-local bridge and direct run monitoring remains delegated to the preserved companion skills. |
| Missing public `ljx-GSD-new-workspace` | Rejected | Current installed manifest intentionally exposes workspace/workstream management through the accepted implemented surface; no Phase 17 gate requires a new public command beyond manifest truth. |
| `verify-work` stops when verifier is disabled | Rejected | The stop is intentional honesty; it does not silently pass verification when the verifier is disabled. |
| Source-root failure as "environment only" | Rejected | In this v1.1 checkout, repo-local upstream snapshots are part of the verification baseline, so preview install should resolve them without requiring external `/tmp` state. |

## Confirmation Outcome

All four confirmed findings were fixed in Phase 18. Clean-round accounting resets to 0 because Round 1 contained confirmed bugs.
