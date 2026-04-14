# v1.3 Stage 1 Round 4 Review

**Verdict:** fixed_not_clean
**Clean count after round:** 0
**Reason:** one P1 and four P2 skill/runtime/prompt-fidelity defects were confirmed and fixed. Two P3 hardening items were also fixed but would not have reset the clean count by themselves. `.planning` accounting updates did not determine the verdict.

## What Was Reviewed

- Research-pipeline policy propagation, malformed-config behavior, and typed stage handoff persistence.
- Resume/pause transactionality and partial-failure recovery.
- Workstream state resolution across session-local pointers, structured records, and legacy shared pointers.
- Generated `ljx-GSD-*` prompt fidelity against upstream Auto/GSD, especially experiment execution quality and Auto parameter preservation.
- Code-review quality-gate scope when no SUMMARY artifact exists.
- Codex conversion surface: generated active prompts, hook TOML, installed helper paths, MCP/schema text, and raw upstream invocation scans.
- Current public manifest/planned-skill parity and Stage 2 scenario risks.

## Main Fixes

- Mirrored phase-level `workflow_overrides.human_checkpoint` into `research.review_loop.human_checkpoint`.
- Made research-pipeline proposal fail closed on malformed config instead of producing default-policy operations.
- Expanded stage handoff metadata so global review/model/budget policy survives into persisted research-stage records.
- Moved `resumeFromHandoff` state mutation into the rollback-protected transaction.
- Added create-time protection against session-local active state masking a legacy shared active workstream pointer, while preserving valid structured pointer behavior.
- Restored Auto experiment-bridge controls: `baseRepo/base_repo`, `compactMode`, `IDEA_CANDIDATES`, `IDEA_REPORT`, `EXPERIMENT_LOG`, `defaultSeeds`, `codeSyncMethod`, and `wandbEnabled`.
- Changed code-review git fallback to union all phase-tagged commit files instead of returning only the newest matching commit.

## Verification Evidence

- Red tests first failed for the accepted gaps in:
  - `tests/runtime-core.test.cjs`
  - `tests/research-pipeline-cutover.test.cjs`
  - `tests/experiment-bridge-bridge.test.cjs`
  - `tests/skill-build.test.cjs`
  - `tests/runtime-shell.test.cjs`
  - `tests/workstreams-bridge.test.cjs`
  - `tests/code-review-bridge.test.cjs`
- Post-fix targeted checks passed:
  - `node --test tests/workstreams-bridge.test.cjs` -> 43/43 passed.
  - `node --test tests/runtime-core.test.cjs tests/research-pipeline-cutover.test.cjs tests/experiment-bridge-bridge.test.cjs tests/skill-build.test.cjs tests/runtime-shell.test.cjs tests/workstreams-bridge.test.cjs tests/code-review-bridge.test.cjs` -> 278/278 passed.
- Full-suite and preview verification passed after the docs/accounting canary was advanced to Stage 1 Round 5:
  - `node --test tests/docs-contract.test.cjs` -> 14/14 passed.
  - `node --test tests/*.test.cjs` -> 721/721 passed.
  - `node bin/install.js --preview` -> passed and generated 31 `ljx-GSD-*` skills.
  - `node --check` on the touched runtime/helper/build files -> passed.
  - Generated preview raw upstream invocation scan for `ljx-GSD-*` -> no matches.
  - Generated preview malformed fence scan -> no matches.
  - `git diff --check` -> passed.

## Remaining Watch Items

- Managed upstream Auto skills are still installed as managed top-level support inventory; Stage 2 must force only `ljx-GSD-*` execution chains.
- `AskUserQuestion` / `Task` adapter text still needs live scenario validation.
- Result-analysis parity is a Stage 2 live-scenario requirement.
- Code-review artifact schema/fix-loop routing and verify-work goal-backward behavior need Stage 2 transcript evidence.

## Next Round Setup

Stage 1 Round 5 is the final Stage 1 review round under the current cap. Because Round 4 reset clean count to 0, even a clean Round 5 would only produce one consecutive clean round; entering Stage 2 under the strict two-clean rule will require either explicit user authorization to extend Stage 1 or a protocol decision after Round 5.
