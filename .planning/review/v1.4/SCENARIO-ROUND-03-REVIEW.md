# v1.4 Stage B Scenario Round 3 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** The third live scenario round found one accepted P2 paper-routing defect. Other findings were rejected or recorded as watch items after second-pass comparison against the ljx-GSD contracts.

## Setup

- Scenario root: `/tmp/ljx-gsd-stageb-r3`
- Installed test Codex home: `/tmp/ljx-gsd-stageb-r3/codex-home`
- Fixed verification install: `/tmp/ljx-gsd-stageb-r3-fixed/codex-home`
- Installed surface precheck: 34 active `ljx-GSD-*` skills, 34 manifest-built skills, no missing/extra/non-ljx active skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Source-root leak precheck over installed skills/runtime: clean.
- Hard rule: all scenario agents used the installed `ljx-GSD-*` skill/runtime surface. No raw upstream GSD or Auto/ARIS skill invocation was accepted as evidence.

## Scenario Coverage

| Scenario | Result | Notes |
| --- | --- | --- |
| Claim audit CLI matrix | Pass | Verified root Auto audit handoffs no longer clear final supported claim writes, phase/dependency audit pass/warn can proceed, failed audits block, `--intentionally-pending=experimentAudit` reaches installed CLIs, stale result-to-claim stays visible, and no raw upstream usage was found. |
| Migration ledger | Pass | Verified report-collision fail-closed behavior, duplicate-source/session stops, symlink skipped-entry ledgers, non-blocking unmapped residue records, release gating, and post-release phase-local reader behavior. The archival `legacy-backups` boundary was confirmed as intentional. |
| Engineering quality gates | Pass | Replayed engineering lifecycle through code-review, code-review-fix, rerun, verify, and next. Legacy `code_review`/`verification` mirrors matched canonical `quality_gates`, returned `gateState.updated_at` matched persisted state, and summary `key_files` frontmatter drove scope. |
| Research-to-paper pipeline | Fail then fixed | Verified research prompt/context quality from discovery through paper/rebuttal. Accepted V14-163 because paper-pipeline routing and `write-paper-state` still allowed missing/root-only integrity audit or stale claim support to reach paper state. |
| Config/recovery/workstreams/workspace | Pass with limitation | Verified V14-155 generated-safe autonomous profile, phase workflow overrides, safe/autonomous confirmation gates, pause/resume required reading, workstreams, and workspace-admin containment. Rejected default-equal top-level override as an unresolved provenance limitation, not a regression: the generated-safe marker cannot distinguish template defaults from a user deliberately reasserting the same safe values. |
| Self-contained poison install | Pass with watch | Verified 34 active `ljx-GSD-*` skills, manifest closure, raw-command scan, poison PATH/HOME helper probes, installed-root helper paths, and Codex hook variable usage. Watched raw upstream examples inside internal archived `ljx-gsd/upstream-auto/templates` as non-active preserved support material. |

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-163.

- V14-163: `paper-pipeline` now blocks downstream paper/rebuttal/next routing when the experiment integrity audit is missing or only a root Auto compatibility handoff, and `write-paper-state` refuses to write while its claim-readiness gate is blocked.

## Rejected Or Watch Candidates

- Migration import not auto-promoting archived Auto root files into phase-local active artifacts: rejected. The accepted migration contract says `.planning/legacy-backups/.../original` is archival evidence and must not become active routing truth; promotion/adoption is a separate phase-chain action.
- Default-equal explicit config overrides under the generated-safe marker: recorded as a provenance limitation, not accepted as a Round 3 bug. Preserving all default-equal values after a profile switch would regress the V14-155 fix where changing only `automation_profile` to `autonomous` must activate the autonomous preset.
- Raw upstream examples under `ljx-gsd/upstream-auto/templates`: watch only. They are internal preserved upstream support templates, not active `SKILL.md` prompts or runtime call paths, and active skill/runtime/doc scans did not reference them as executable commands.
- Brownfield `ljx-GSD-next` resolving to `ljx-GSD-map-codebase` after an engineering scenario: rejected as expected routing because the scenario intentionally skipped map-codebase on a brownfield fixture.

## Verification

- Targeted claim/paper regression suite passed: `node --test tests/result-to-claim-bridge.test.cjs tests/claim-gate-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs` with 64/64 passing.
- Preview rebuild passed: `npm run build:preview` produced 34 active `ljx-GSD-*` skills.
- Fixed reinstall into `/tmp/ljx-gsd-stageb-r3-fixed/codex-home` passed.
- Installed fixed-runtime probe passed: root-only audit, missing audit, and `write-paper-state` attempts all returned `claim_integrity_audit_missing` without writing paper state.
- Full suite before review-accounting update passed implementation tests but failed the stale docs-contract v1.4 accounting assertion; the accounting docs and assertion were then updated for Round 3.
- Final docs-contract rerun passed with 16/16 tests.
- Final full suite passed with 837/837 tests.
- Preview and fixed-install manifest/active-skill equality scans passed: 34 active `ljx-GSD-*` skills, 34 manifest-built skills, no missing/extra/non-ljx active skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Preview and fixed-install source-root leak scans passed with no `/tmp/codex-skill-repos` or `.planning/references/upstreams` references in active skills/runtime.
- `git diff --check` passed.
- Cleanup complete: no `/tmp/ljx-gsd-stageb-r3*` scenario directories remained after final verification.

## Clean Decision

Not clean. Stage B Round 3 accepted P2 V14-163, so Stage B clean count remains 0. Continue with Stage B Round 4.
