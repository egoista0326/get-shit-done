# v1.4 Stage B Scenario Round 2 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** The second live scenario round found three P2 implementation/file-integrity defects and three P3 traceability or response-shape defects. All accepted candidates were second-pass checked against the ljx-GSD prompt/state contracts before fixing.

## Setup

- Scenario root: `/tmp/ljx-gsd-stageb-r2`
- Installed test Codex home: `/tmp/ljx-gsd-stageb-r2/codex-home`
- Install command: `node bin/install.js --target-dir /tmp/ljx-gsd-stageb-r2/codex-home`
- Installed surface precheck: 34 active `ljx-GSD-*` skills, no missing/extra/non-ljx active skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Source-root/Codex variable/raw-call precheck over installed skills/runtime: clean.
- Hard rule: all scenario agents used the installed `/tmp/ljx-gsd-stageb-r2/codex-home/skills/ljx-GSD-*` surface or `/tmp/ljx-gsd-stageb-r2/codex-home/ljx-gsd/runtime/*.cjs`; no raw upstream GSD/Auto skills were allowed.

## Scenario Coverage

| Scenario | Result | Notes |
| --- | --- | --- |
| Engineering code-review lifecycle | Fail then fixed | Ran `new-project -> progress -> discuss -> plan -> execute -> code-review -> code-review-fix -> code-review rerun -> verify-work -> next`. Routing stayed self-contained. Accepted stale legacy gate mirror and stale returned `gateState.updated_at` as V14-161 and V14-162. |
| Research claim chain | Fail then fixed | Ran idea discovery, novelty, refine, experiment plan/bridge, research review, review-loop, result-to-claim, claim-gate, and ablation-planner. Accepted root Auto audit clearing final audit and missing CLI `--intentionally-pending` as V14-157 and V14-158. |
| Paper/rebuttal pipeline | Pass | Verified V14-156 round PDF/compile/format optional evidence, paper/rebuttal state routing, claim-gate interactions, and prompt control-plane self-containment. No accepted findings. |
| State, workspace, workstream, config | Pass | Confirmed V14-155 generated-safe marker fix: autonomous profile now resolves autonomous gates, explicit overrides still win, and pause/resume/workstreams/workspace containment stay self-contained. |
| Migration/file ledger | Fail then fixed | Ran migration status/preflight/import/release, downstream reader blocking before release, claim/paper writes after release, pause/resume, duplicate import/preflight. Accepted report overwrite and skipped-symlink ledger gaps as V14-159 and V14-160. |
| Self-contained poison install | Pass | Poisoned PATH and fake raw skills; installed helper calls stayed within ljx-GSD runtime, manifest closure remained 34/34, and no raw upstream calls were observed. |

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-157 through V14-162.

- V14-157: root Auto `EXPERIMENT_AUDIT` remains compatibility context and non-blocking, but no longer satisfies the phase-local final supported-claim audit requirement.
- V14-158: `result-to-claim` and `claim-gate` CLIs now accept `--intentionally-pending=experimentAudit` and pass it into context/write paths.
- V14-159: migration import now stops with `migration_report_collision` before writing state/backups when generated report targets already exist.
- V14-160: migration backup manifests now include `skipped_entries` for source symlinks, while still not copying symlink targets.
- V14-161: canonical quality gate persistence now refreshes legacy top-level `code_review` and `verification` mirrors in phase records.
- V14-162: quality gate persistence now returns the same fresh `updated_at` timestamp that it stores in `phaseRecord.quality_gates`.

## Rejected Or Watch Candidates

- Empty code-review scope when git was unavailable: rejected because the scenario summary lacked the required YAML `key_files` frontmatter; the helper correctly used summary-scope metadata after the scenario artifact was corrected.
- `next` recommending `ljx-GSD-map-codebase` after engineering verification: rejected because the scenario deliberately skipped the brownfield map-codebase recommendation from new-project, and `next` correctly stopped on the bridge-ready map-codebase action.
- Symlink poison absent from active migration conflicts: rejected as a blocking bug because symlink targets should not be imported or treated as regular residue; accepted only the manifest traceability gap recorded as V14-160.

## Verification

- Targeted regression suite passed: `node --test tests/result-to-claim-bridge.test.cjs tests/claim-gate-bridge.test.cjs tests/migration-cutover.test.cjs tests/code-review-fix-bridge.test.cjs tests/verify-work-bridge.test.cjs` with 156/156 passing.
- Preview rebuild passed: `npm run build:preview` produced 34 active `ljx-GSD-*` skills.
- Docs contract passed: `node --test tests/docs-contract.test.cjs` with 16/16 passing.
- Full suite passed: `npm test` with 835/835 passing.
- Preview manifest/active-skill equality scan passed: 34 active skills, 34 manifest-built skills, no missing/extra/non-`ljx-GSD-*` active skills, 0 compatibility entries, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Preview active-skill raw upstream command-shape scan passed; ordinary explanatory `Auto/GSD` text was not counted as a raw invocation.
- Preview source-root leak scan passed for `.build/codex-preview/skills` and `.build/codex-preview/ljx-gsd/runtime`.
- Reinstall into `/tmp/ljx-gsd-stageb-r2/codex-home` passed, and installed manifest/active-skill equality scan stayed clean.
- Installed-runtime probes passed:
  - root Auto `EXPERIMENT_AUDIT.json` plus supported claim evidence returns `claim_integrity_audit_missing` for both result-to-claim and claim-gate writers
  - `--intentionally-pending=experimentAudit` reaches the installed result-to-claim CLI and reports `intentionally_pending`
  - migration report collision returns `migration_report_collision` before import writes
  - quality-gate persistence returns a fresh `gateState.updated_at` and refreshes the top-level code-review mirror
- Installed runtime/source-root leak scan passed for `/tmp/ljx-gsd-stageb-r2/codex-home/skills` and `/tmp/ljx-gsd-stageb-r2/codex-home/ljx-gsd/runtime`.
- `git diff --check` passed.
- Cleanup passed: `/tmp/ljx-gsd-stageb-r2` was removed after verification, and `/tmp/ljx-gsd-installed-*` probe directories have no remaining matches.

## Clean Decision

Not clean. Stage B Round 2 accepted P2 findings, so Stage B clean count remains 0. Continue with Stage B Round 3.
