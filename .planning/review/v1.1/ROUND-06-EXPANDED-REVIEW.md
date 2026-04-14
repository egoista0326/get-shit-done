# v1.1 Round 06 Expanded Review

**Date:** 2026-04-12
**Scope:** More granular post-Round05 review requested by the user, with extra focus on generated skill prompt fidelity and richer scenario boundaries.
**Status:** Not clean; confirmed issues fixed; clean streak reset to 0.

## Review Inputs

- Current implementation after Round 05 fixes.
- User clarification: generated skill content must not delete or materially weaken upstream GSD/Auto capabilities; runtime success alone is insufficient.
- Review rubric and strict matrix, especially X21-X24 prompt/task-quality scenarios.
- Generated preview skills, helper routing, tests, `.planning/` state, migration/research-pipeline flows, and evidence/claim handoffs.

## Review Lanes

| Lane | Result |
|------|--------|
| Runtime/gates/lifecycle | Confirmed blocked clean-round statuses could route incorrectly, lifecycle inventory could accept directories, and execute completion could recommend verification before a required code-review pass. |
| Pause/resume/workstreams | Confirmed handoff path collisions and secondary-workstream handoff context were not protected enough. |
| Migration/import/release | Confirmed backup reuse and release-record evidence validation were too permissive around existing backup roots and backup-contained proof. |
| Research pipeline | Confirmed reused decimal stages and name-only matches with conflicting explicit `phase_type` could produce unsafe chains. |
| Experiment evidence and claim gating | Confirmed `claim_supported` normalization/evidence-gating and experiment integrity audit state needed stronger semantics. |
| Auto prompt fidelity | Confirmed `idea-discovery`, `novelty-check`, `experiment-bridge`, `result-to-claim`, and `ablation-planner` prompt floors needed more explicit upstream-quality obligations. |
| Docs/review accounting | Confirmed strict matrix references and Phase 20 finding counts were stale after the X24 and Round 06 addenda. |

## Confirmed Findings

| ID | Severity | Finding | Confirmation | Fix |
|----|----------|---------|--------------|-----|
| BUG-025 | P2 | Pending review-loop statuses such as `pending_fresh_clean_rounds` could be downgraded into ordinary ready/next routing. | Local inspection confirmed quality-gate state builders did not uniformly treat pending clean-round statuses as blocked process gates. | Added pending-status classification in quality-gate helpers and verification routing regressions. |
| BUG-026 | P2 | Review/verification/lifecycle inventories could treat directories named like markdown artifacts as evidence. | Local inspection found several `readdirSync`/path collection paths that filtered by filename pattern but not regular-file type. | Switched artifact listing and read paths to regular-file filtering in lifecycle, code-review, verify, state, and phase-context helpers; added directory-masquerade tests. |
| BUG-027 | P2 | `execute-phase` could recommend `verify-work` directly after execution even when the phase policy requires code review first. | The execute shell context recommendation was static and did not consult the configured code-review requirement rule. | Added code-review requirement resolution to execute-phase shell context and updated lifecycle tests. |
| BUG-028 | P2 | Pause/resume could overwrite handoff paths or resume a secondary-workstream handoff from the wrong active workstream. | Local inspection confirmed no write-target collision check and insufficient preservation of active workstream/pointer provenance in handoff JSON. | Added handoff path collision stops, persisted active workstream/pointer source, and blocked resume until the handoff workstream is active. |
| BUG-029 | P2 | Migration import/release could reuse stale backup roots or accept release records whose proof files were not actually inside the backup root. | Local inspection confirmed duplicate-session checks missed release records and release status validation did not require backup-contained manifest/report proof. | Added release-record duplicate guards, stale-backup-root refusal, structured backup-copy failures, and backup-contained proof validation. |
| BUG-030 | P2 | Research-pipeline chaining could insert after the wrong anchor for reused decimal stages and could reuse phases by name despite conflicting explicit `phase_type`. | Local inspection confirmed root insertion anchors and dependency anchors were conflated, and name-only reuse ignored explicit type mismatches. | Split insert anchor from dependency, used root anchors for decimal reuse, and classified name/type mismatches as repair actions. |
| BUG-031 | P2 | `result-to-claim` could accept `claim_supported: yes` without the same normalized support/evidence semantics as `supportLevel: supported`. | Local inspection confirmed `claim_supported` was not normalized through the same evidence gate and conflict checks. | Normalized support values, rejected conflicting support fields, and kept evidence gating authoritative. |
| BUG-032 | P2 | Experiment integrity audit was not represented strongly enough in claim readiness and downstream routing. | Upstream Auto now treats `experiment-audit` as a distinct integrity check that result-to-claim should read when present; the ljx helper context only exposed raw result/evaluator artifacts. | Added `EXPERIMENT_AUDIT` evidence tracking, `provisional_no_audit` readiness semantics, and experiment-audit downstream/companion routing. |
| BUG-033 | P2 | `ablation-planner` lacked enough result-to-claim/claim-objection context to avoid generic ablation lists. | Local prompt and helper review confirmed ablation planning did not surface claim-readiness evidence and did not require a yes/partial result-to-claim judgment or speculative labeling. | Added result-to-claim readiness context, direct-tool routing, and a prompt floor for claim/reviewer-objection mapping, budget, risk, and skip-list reasoning. |
| BUG-034 | P1/P2 | Several Auto-facing generated prompt floors still risked capability deletion: running without errors but producing lower-quality research work than upstream Auto. | User clarified this was a key review constraint; local review confirmed floors needed more detail for idea discovery, novelty search, experiment audit, result judgment, and ablation planning. | Strengthened prompt-quality floors and skill-build assertions for full Auto Workflow 1 fallback, toy-validation plans, multi-source novelty evidence, experiment-audit handoff, and ablation reviewer-depth. |
| BUG-035 | P3 | Review docs drifted after X24 and the Round 06 addendum. | Local review found references to X01-X23 and stale Round 05 closure wording/counts. | Updated Round 04/Phase 20 summaries, loop state, bug ledger, phase record, and verification docs to reflect X24 and Round 06 pending closure. |

## Verification After Fixes

Targeted commands run during the fix pass:

- `node --test tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs`
- `node --check bin/lib/ljx-migration-tools.cjs && node --test tests/migration-cutover.test.cjs`
- `node --check bin/lib/ljx-research-pipeline-tools.cjs && node --test tests/research-pipeline-cutover.test.cjs`
- `node --check bin/lib/ljx-experiment-evidence-tools.cjs && node --check bin/lib/ljx-result-to-claim-tools.cjs && node --check bin/lib/ljx-experiment-bridge-tools.cjs && node --check bin/lib/ljx-phase-context.cjs && node --test tests/result-to-claim-bridge.test.cjs tests/experiment-bridge-bridge.test.cjs`
- `node --check bin/lib/build-skills.cjs`
- `node --check bin/lib/codex-conversion.cjs`
- `node --test tests/ablation-planner-bridge.test.cjs`
- `node --test tests/skill-build.test.cjs`
- `node bin/install.js --preview`
- `git diff --check`
- `node --test tests/*.test.cjs` -> 588/588 pass, 39 suites

Full-suite verification passed after the documentation updates. Round 06 still is not clean because it found and fixed confirmed issues; Round 07 must be a fresh review of the fixed state.

## Clean-Round Accounting

Round 06 is not clean because it confirmed and fixed P1/P2/P3 issues. The clean streak remains 0.

Next required actions:

- Round 07: fresh review of current head after Round 06 fixes.
- Round 08: second fresh review if Round 07 is clean.
- Superseded note: later Round 07 through Round 11 reviews found additional issues. Current clean-round accounting is in `REVIEW-LOOP-STATE.md`.
