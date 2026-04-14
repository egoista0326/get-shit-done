# Phase 14 Parity Report

**Generated:** 2026-04-12T00:02:29Z
**Scope:** Plan 14-03 whole-repo migration cutover parity

## Verdict

In-repo Phase 14 parity passed for the tested migration, lifecycle, research, paper/rebuttal, admin, generated-skill, manifest, preview-install, docs-contract, and current-repo routing surfaces.

This report does not replace globally installed production skills. Global production skill replacement remains out of scope until the user explicitly chooses cutover after in-repo parity and the remaining Phase 14 cutover work.

## Fixture Classes Covered

- Legacy GSD-like fixture: `.planning/STATE.md`, legacy roadmap, phase plan, handoff, and a legacy secondary workstream were imported into migration state, backups, human reports, and suggested-branch state.
- Auto-like research fixture: root/direct artifacts such as `IDEA_REPORT.md`, `METHOD_SPEC.md`, `EXPERIMENT_PLAN.md`, `AUTO_REVIEW.md`, and `PAPER_PLAN.md` were treated as proposal evidence, not as proof that formal stages ran.
- Mixed fixture: GSD and Auto sources together preserve blocking conflict handling, non-blocking residue, repair bundles, and suggested branches.
- Current repo smoke fixture: `node bin/lib/ljx-state-tools.cjs progress --cwd "$PWD"` resolves Phase 14, and `next` returns an explicit bridge-ready `ljx-GSD-execute-phase 14` route instead of `missing_phase`.

## Structured Truth Assessment

- Structured migration truth remains under `.planning/state/migration/*` for import sessions, conflict reports, repair bundles, releases, and promotions.
- Root reports remain explanatory. The parity test deliberately tampered `.planning/MIGRATION_SUMMARY.md` to say it was authoritative/released; `readMigrationStatus()` still stayed blocked until the structured release record passed.
- Suggested branches remain outside formal workstream state until explicit promotion.
- Migration-blocked state stops lifecycle `next`, roadmap mutation, mutating workstream commands, and research-pipeline umbrella orchestration while preserving read-only/safe actions.

## Research And Paper Surface Assessment

- `ljx-GSD-research-pipeline` is bridge-ready in the manifest and generated preview install output.
- The research-pipeline helper produces a phase-chain proposal, routes structural changes through roadmap-admin handoff semantics, and does not run hidden upstream Auto slash-command pipelines.
- Paper and rebuttal generated skills remain helper-backed and bounded: paper/rebuttal state writes go through helper commands, Auto paper/rebuttal stage intent remains visible, and no second submission control plane is introduced.
- Phase 12's whole-repo review/verify note is distinct from this Phase 14 parity report. Plan 14-03 found no Phase 12 paper/rebuttal surface blocker in generated/preview parity, but it did not edit `ROADMAP.md`, `STATE.md`, or `REQUIREMENTS.md` to close that historical note.

## Drift Found And Repaired

- Current-repo routing initially returned `missing_phase` because `STATE.md` used the decorated GSD label `Phase: 14 (Migration Cutover And Parity Verification) -- EXECUTING`, while `normalizePhaseId()` only accepted bare IDs or hyphen-delimited phase prefixes.
- The fix stays in the shared owner, `bin/lib/ljx-runtime-core.cjs`, by allowing numeric and project-code phase tokens followed by whitespace or `(`.
- Added focused regression coverage in `tests/runtime-core.test.cjs`.
- Added whole-repo parity coverage in `tests/parity-cutover.test.cjs`.

## GSD/Auto Reuse Assessment

- GSD lifecycle semantics are reused through the shared runtime core/state helpers, `ljx-state-tools`, roadmap-admin, workstreams, and install/manifest surfaces.
- Auto research semantics remain visible through preserved upstream Auto skills and helper-backed `ljx-GSD-*` research commands, while the research-pipeline umbrella avoids a second linear Auto control plane.
- No GSD or Auto capability was deleted to make parity green.

## Minimum Modification Assessment

- Runtime change was limited to phase-token normalization in the shared runtime core.
- No edits were made to `.planning/STATE.md` or `.planning/ROADMAP.md`.
- No production/global skill install was performed; only in-repo preview output under `.build/codex-preview` was refreshed.
- Root migration reports were not made authoritative.

## Verification Commands

| Command | Result |
|---------|--------|
| `node --test tests/parity-cutover.test.cjs tests/migration-cutover.test.cjs tests/research-pipeline-cutover.test.cjs` | Passed: 16 tests, 3 suites, 0 failures |
| `node --test tests/runtime-state.test.cjs tests/runtime-core.test.cjs tests/runtime-shell.test.cjs tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs` | Passed as part of focused cross-surface run |
| `node --test tests/parity-cutover.test.cjs tests/runtime-state.test.cjs tests/runtime-core.test.cjs tests/runtime-shell.test.cjs tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs tests/research-pipeline-cutover.test.cjs tests/migration-cutover.test.cjs` | Passed: 266 tests, 10 suites, 0 failures |
| `node bin/install.js --print-manifest` | Passed; all listed `ljx-GSD-*` manifest entries are bridge-ready, including `ljx-GSD-research-pipeline`, `ljx-GSD-paper-pipeline`, and `ljx-GSD-rebuttal` |
| `node bin/install.js --preview` | Passed; preview target `.build/codex-preview` built 30 bridge-ready skills, compatibility skills `(none)` |
| `node bin/lib/ljx-state-tools.cjs progress --cwd "$PWD"` | Passed; current phase resolves to `14-complete-migration-cutover-and-parity-verification`, recommendation `ljx-GSD-execute-phase 14` |
| `node bin/lib/ljx-state-tools.cjs next --cwd "$PWD"` | Passed; returned `availability: bridge-ready`, `reasonCode: bridge_ready_not_inline_executable`, action `ljx-GSD-execute-phase 14` |
| `npm test` | Passed: 546 tests, 38 suites, 0 failures |

## Remaining Risks

- Phase 04-06 stock GSD progress reconciliation remains for Plan 14-04.
- This report is in-repo parity evidence only; global production skill replacement still requires a later explicit cutover decision.
- Review/verify gates after Plan 14-04 should still cover the whole repository because generated output, docs, and runtime helper behavior remain coupled.
