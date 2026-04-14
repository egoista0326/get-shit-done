# v1.3 Stage 1 Round 3 Review

**Verdict:** fixed_not_clean
**Clean count after round:** 0
**Reason:** three P2 implementation/prompt-fidelity defects were confirmed and fixed. One P3 transactionality hardening was also fixed but would not have reset the clean count by itself. `.planning` accounting updates did not determine the verdict.

## What Was Reviewed

- Post-Round-2 regression coverage for V13-023 through V13-026.
- Research-pipeline prompt fidelity against Auto controls: human checkpointing, reviewer policy, score/round stops, top-idea gate, compute budget, graceful failure, and downstream stage handoff.
- Runtime pause/resume path safety, workstream context preservation, STATE reconstruction, checkpoint discovery, and incomplete-plan discovery.
- Generated `ljx-GSD-*` self-containment after preview install.
- Claude Code to Codex conversion surface: skill paths, hook TOML, MCP/schema prose, `Task()` and user-input adapter text.
- Original planned skill content parity and managed upstream Auto policy risk.

## Main Fixes

- Fixed legacy `HUMAN_CHECKPOINT` normalization so it also mirrors into `research.review_loop.human_checkpoint` when no explicit canonical review-loop value exists.
- Fixed `ljx-GSD-research-pipeline` CLI parsing so `--human-checkpoint` and `--no-human-checkpoint` affect both pipeline defaults and the review-loop handoff.
- Persisted per-stage research handoff metadata into roadmap-admin-created phase records as `research_stage_handoff`.
- Added resume-discovery scanning for root/phase `.continue-here*.md` files and phase plans that lack matching summaries.
- Made `resumeFromHandoff` return structured `state_reconstruction_required` context when planning artifacts exist but `STATE.md` is missing.
- Hardened pause/resume cleanup rollback by snapshotting handoff files, restoring deleted handoff markdown on cleanup failure, and reporting residual cleanup failures.

## Verification Evidence

- Red tests first failed for the accepted P2/P3 gaps:
  - `node --test tests/research-pipeline-cutover.test.cjs` failed on review-loop human checkpoint and missing phase-record handoff metadata.
  - `node --test tests/runtime-shell.test.cjs` failed on cleanup rollback, missing STATE reconstruction context, and missing incomplete-plan discovery.
  - `node --test tests/runtime-core.test.cjs` failed on legacy human-checkpoint normalization.
- Post-fix targeted checks passed:
  - `node --test tests/research-pipeline-cutover.test.cjs` -> 16/16 passed.
  - `node --test tests/runtime-shell.test.cjs` -> 76/76 passed.
  - `node --test tests/runtime-core.test.cjs` -> 40/40 passed.
  - `node --test tests/runtime-shell.test.cjs tests/research-pipeline-cutover.test.cjs tests/runtime-core.test.cjs tests/skill-build.test.cjs` -> 188/188 passed.
  - `node --test tests/docs-contract.test.cjs` -> 14/14 passed after accounting mirror updates.
  - `node --test tests/*.test.cjs` -> 715/715 passed.
  - `node bin/install.js --preview` -> passed.
  - Generated preview raw upstream invocation scan with slash/dollar-command lookbehind -> no matches.
  - Generated preview malformed fence scan for ````json{` -> no matches.
  - `node --check bin/lib/ljx-state-tools.cjs`, `node --check bin/lib/ljx-research-pipeline-tools.cjs`, `node --check bin/lib/ljx-roadmap-admin-tools.cjs`, `node --check bin/lib/ljx-runtime-core.cjs` -> passed.
  - `git diff --check` -> passed.

## Remaining Watch Items

- Managed upstream Auto skills are still installed as a managed top-level library. Generated `ljx-GSD-*` prompts are self-contained, so this remains a product-policy watch item rather than a confirmed internal-call bug.
- Stage 2 must force live scenario agents to report exact skill execution chains and use only `ljx-GSD-*` skills.
- Stage 2 still needs physical workspace, engineering UAT/goal-backward verification, and research-loop prompt-quality live scenarios.
- Pause handoff git status parsing for renamed/quoted paths remains needs-more-evidence.

## Next Round Setup

Stage 1 Round 4 starts with clean count 0. If Round 4 and Round 5 are both clean, Stage 2 can begin. If either round finds P0/P1/P2 issues, the Stage 1 clean streak resets again and the Stage 1 cap must be honored.
