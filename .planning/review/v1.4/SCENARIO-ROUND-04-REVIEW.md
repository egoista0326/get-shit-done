# v1.4 Stage B Scenario Round 4 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** The fourth live scenario round found three accepted P2 issues in code-review artifact parsing and config-policy consumption. Several other scenario observations were rejected after second-pass comparison against the ljx-GSD contracts.

## Setup

- Scenario root: `/tmp/ljx-gsd-stageb-r4`
- Installed test Codex home: `/tmp/ljx-gsd-stageb-r4/codex-home`
- Fixed verification install: `/tmp/ljx-gsd-stageb-r4-fixed/codex-home`
- Installed surface precheck: 34 active `ljx-GSD-*` skills, 34 manifest-built skills, no missing/extra/non-ljx active skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Source-root leak precheck over installed skills/runtime: clean.
- Hard rule: all scenario agents used the installed `ljx-GSD-*` skill/runtime surface. No raw upstream GSD or Auto/ARIS skill invocation was accepted as evidence.

## Scenario Coverage

| Scenario | Result | Notes |
| --- | --- | --- |
| Paper/claim audit | Pass | Verified missing experiment audit, root Auto audit, phase-local pass/warn audit, failed audit, stale claim evidence, and blocked `write-paper-state` paths. No new paper/claim defect was accepted. |
| Engineering lifecycle | Fail then fixed | Replayed new-project through map, discuss, plan, execute, code-review, code-review-fix, verify, and next. Accepted V14-164 because bullet-heavy structured code-review findings were counted as multiple findings. |
| Research pipeline depth | Pass with workspace-state limitation | Scenario hit `repair_required` on the current review repo's duplicate/missing phase records. Second-pass rejected this as a skill implementation bug because the helper correctly failed closed on invalid workspace state. |
| Migration/file traceability | Pass | Verified mixed GSD+Auto migration, symlink skip ledger, root Auto compatibility-only treatment, duplicate source rejection, and report collision rejection. Rejected the stale paper-gate candidate because the fixture wrote a phase 04 result-to-claim state while checking phase 11 paper artifacts; phase-local markdown freshness was correctly enforced. |
| Recovery/workstreams/workspace | Pass | Verified logical workstream create/switch/progress, clean pause/resume, damaged handoff fail-closed behavior, dirty workspace removal blocks, clean workspace removal, and empty workspace base at the end. |
| Config/Codex hooks | Fail then fixed | Verified poisoned `CLAUDE_*`/`CODEX_*` path variables were ignored, safe/autonomous profile values were stable, and Codex hook reference material stayed non-runtime. Accepted V14-165 and V14-166 because `code_review_rerun_after_fix=automatic` and `safety.always_confirm_external_services` were not operationally distinct enough. |
| Self-contained poison install | Pass | Installed ljx-GSD beside fake raw `gsd-progress`/`auto-review-loop` skills and fake PATH commands. Helper chains stayed inside `ljx-GSD-*`, no poison log was written, and source-root leak scans were clean. |
| Plan coverage and prompt fidelity | Pass with watch | Verified the current plan surface against the original ljx-GSD content plan. Rejected the `ljx-GSD-rebuttal` optional JSON-state wording watch because mandatory `REBUTTAL_STATE.md` and `FOLLOWUP_LOG.md` artifacts already preserve the upstream recovery contract. |

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-164 through V14-166.

- V14-164: shared code-review artifact parsing now counts field-list structured findings once, supports the observed `Warning Findings` alias, and is packaged into installed runtime output.
- V14-165: `workflow.code_review_rerun_after_fix = "automatic"` now makes the `code-review-fix` preflight `autoMode` true, so the prompt's fix -> rerun branch is reachable from the config setting alone.
- V14-166: `experiment-bridge` now exposes `alwaysConfirmExternalServices`, `externalServiceConfirmationRequired`, and `externalServiceConfirmationReasons`; the generated skill prompt explicitly requires confirmation before contacting those services when the safety gate is active.

## Rejected Or Watch Candidates

- Research-pipeline `repair_required` on the current review repo: rejected as a scenario-state issue. The helper correctly stopped because the active repo has missing/duplicate phase records from long review history, and the scenario did not build a clean isolated research-pipeline fixture.
- Migration result-to-claim stale paper gate: rejected. The fixture wrote phase `04` claim state and then checked phase `11` paper routing; touching the phase `11` result-to-claim markdown made the paper gate ready, proving the gate was enforcing phase-local artifact freshness rather than missing a state refresh.
- Rebuttal `write-rebuttal-state` optional wording: watch only. The prompt already mandates `rebuttal/REBUTTAL_STATE.md` and `FOLLOWUP_LOG.md`, while JSON state writing is an ljx-GSD recovery enhancement, not the upstream Auto recovery artifact itself.

## Verification

- Targeted code-review parser and config-policy suites passed: `node --test tests/code-review-bridge.test.cjs tests/code-review-fix-bridge.test.cjs tests/experiment-bridge-bridge.test.cjs tests/skill-build.test.cjs` with 145/145 passing.
- Preview rebuild passed: `npm run build:preview` produced 34 active `ljx-GSD-*` skills.
- Fixed reinstall into `/tmp/ljx-gsd-stageb-r4-fixed/codex-home` passed.
- Installed fixed-runtime probes passed:
  - field-list structured `CODE_REVIEW` artifacts produced 1 blocking and 1 warning finding instead of inflating the count
  - `code_review_rerun_after_fix=automatic` returned `autoMode: true`
  - external-service safety returned `externalServiceConfirmationRequired: true` with `auto_deploy`, `wandb`, and `base_repo` reasons even when experiment-launch confirmation was disabled
- Preview and fixed-install generated prompt scans confirmed `ljx-GSD-experiment-bridge` includes `externalServiceConfirmationRequired` and `externalServiceConfirmationReasons`.
- Preview and fixed-install runtime packaging checks confirmed `ljx-code-review-artifact.cjs` is copied and requireable.
- Fixed-install manifest/active-skill equality scan passed: 34 active `ljx-GSD-*` skills, 34 manifest-built skills, no missing/extra/non-ljx active skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Fixed-install source-root leak scan passed with no `/tmp/codex-skill-repos` or `.planning/references/upstreams` references in active skills/runtime.
- Docs-contract passed with 16/16 tests.
- Full `npm test` passed with 840/840 tests.
- Cleanup check passed: no `/tmp/ljx-gsd-stageb-r4*` or Round 4 installed-probe scenario directories remained after cleanup.

## Clean Decision

Not clean. Stage B Round 4 accepted P2 V14-164, V14-165, and V14-166, so Stage B clean count remains 0. Continue with Stage B Round 5.
