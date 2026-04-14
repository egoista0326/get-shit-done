# v1.3 Stage 1 Round 2 Review

**Verdict:** fixed_not_clean
**Clean count after round:** 0
**Reason:** P1 resume cleanup bugs and a P2 research-pipeline prompt/quality-preservation bug were confirmed and fixed. `.planning` accounting updates did not determine the verdict.

## What Was Reviewed

- Generated `ljx-GSD-*` self-containment after Round 1 fixes.
- Prompt fidelity for complete-milestone, pause/resume, code-review-fix, verify-work, research-pipeline, experiment/review/claim/paper/rebuttal.
- Runtime path safety for pause/resume, roadmap admin, migration, workstreams, runtime-state.
- Original planned skill content surface and built manifest parity.
- Claude/Codex boundary around managed upstream Auto support inventory and generated skill routing.

## Main Fixes

- Hardened `resumeFromHandoff` so stored handoff markdown paths must resolve to the canonical `.continue-here.md` target, not any arbitrary `.planning` file.
- Added realpath/safe-directory validation so phase-local handoff cleanup rejects symlinked phase ancestors before consuming handoff files.
- Added regression tests for forged `.planning/ROADMAP.md` cleanup and project-external symlink cleanup.
- Added `researchPolicy` and per-stage `stageHandoff` to `ljx-GSD-research-pipeline` proposals and operations.
- Added Auto-style CLI policy flags for research-pipeline: auto-proceed, human-checkpoint, compact, reviewer difficulty/model, score threshold, max rounds, compute budget, max GPU hours, and stop condition.
- Added `ljx-GSD-resume-work` prompt-quality floor coverage for upstream resume context restoration.

## Verification Evidence

- `node --test tests/research-pipeline-cutover.test.cjs tests/runtime-shell.test.cjs` -> 88/88 passed.
- `node --test tests/skill-build.test.cjs tests/research-pipeline-cutover.test.cjs tests/runtime-shell.test.cjs` -> 144/144 passed.
- `node bin/install.js --preview` -> passed; built skills unchanged in intended surface and include the new resume prompt floor.
- `node --test tests/*.test.cjs` -> 711/711 passed.
- `node --check bin/lib/ljx-state-tools.cjs`, `node --check bin/lib/ljx-research-pipeline-tools.cjs`, `node --check bin/lib/build-skills.cjs` -> passed.
- Generated `ljx-GSD-*` self-contained raw upstream scan via `rg --pcre2` -> no matches.
- Generated preview malformed code fence scan -> passed.
- `git diff --check` -> passed.

## Remaining Watch Items

- Managed upstream Auto skills remain a product-policy question: the generated `ljx-GSD-*` surface is self-contained, but the managed support/reference inventory is still installed.
- Stage 2 must include a physical workspace request scenario to prove ljx-GSD stops or routes honestly rather than pretending workstreams are physical workspaces.
- Stage 2 must include engineering UAT/goal-backward verification to prove `verify-work` preserves upstream GSD verification quality in live use.
- Pause handoff git status parsing can be hardened later for quoted/renamed path coverage, but no confirmed normal-use bug was found in Round 2.

## Next Round Setup

Stage 1 Round 3 starts with clean count 0. It must re-review all Stage 1 matrix families after the Round 2 fixes. If Round 3 and Round 4 are both clean, Stage 2 can begin.
