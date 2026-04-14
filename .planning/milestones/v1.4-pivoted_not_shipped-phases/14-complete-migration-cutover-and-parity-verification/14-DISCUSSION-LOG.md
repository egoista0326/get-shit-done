# Phase 14: Migration Cutover And Parity Verification - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-12
**Phase:** 14-Migration Cutover And Parity Verification
**Areas discussed:** Reference hierarchy, migration command surface, research-pipeline cutover, parity bar, Phase 04-06 reconciliation

---

## Reference Hierarchy

| Option | Description | Selected |
|--------|-------------|----------|
| Closest installed local GSD/Auto first | Reuse installed GSD for lifecycle/admin/state and installed Auto for research-stage intent, then fill gaps using project-local best judgment | ✓ |
| Pure project-local rewrite | Ignore installed behavior and implement directly from the ljx-GSD docs | |
| Ask follow-up questions for every gray area | Pause for live user decisions before writing context | |

**User's choice:** Use closest installed local GSD/Auto implementation ideas for related boundaries; if no comparable boundary exists, use project-local judgment and choose the best method.
**Notes:** This was given as a direct instruction, so the discuss-phase treated it as the locked decision and did not ask further live questions.

---

## Migration Command Surface

| Option | Description | Selected |
|--------|-------------|----------|
| Progress/help detect and route to explicit migration actions | Keep normal lifecycle blocked during migration and expose import/inspect/conflict-review/repair/release actions explicitly | ✓ |
| Silent first-read import | Convert legacy artifacts automatically whenever they are first detected | |
| Treat legacy artifacts as permanent compatibility mirrors | Keep old files live alongside new state after import | |

**User's choice:** Apply the nearest accepted GSD/ljx-GSD behavior: guided, explicit, helper-backed migration.
**Notes:** Selected because Phase 5 locked guided import, one-shot import, and blocked normal lifecycle during migration.

---

## `research-pipeline` Cutover

| Option | Description | Selected |
|--------|-------------|----------|
| Promote to bridge-ready if it stays inside helper-backed phase-chain semantics | Make `ljx-GSD-research-pipeline` public and bridge-ready without hidden Auto pipeline execution | ✓ |
| Keep compatibility wrapper only | Leave current deferred status untouched | |
| Run upstream Auto pipeline directly | Preserve Auto behavior exactly but create an independent control line | |

**User's choice:** Use closest local Auto intent while preserving ljx-GSD/GSD control-plane ownership.
**Notes:** Selected behavior is to propose/reuse/create/repair typed phases and recommend the next explicit `ljx-GSD-*` stage, not to claim downstream stages have run.

---

## Parity Bar

| Option | Description | Selected |
|--------|-------------|----------|
| Whole-repo parity gate | Cover migration fixtures, `research-pipeline`, generated skills, preview install, docs, runtime helpers, progress/next, and full tests | ✓ |
| Phase-local tests only | Test only newly added migration code | |
| Manual smoke only | Rely on operator inspection and current repo progress output | |

**User's choice:** Use the Phase 12/13 whole-repo review precedent and closest installed GSD quality-gate discipline.
**Notes:** Selected because prior review rounds repeatedly found cross-surface drift in generated skills, install output, docs, and runtime helpers.

---

## Phase 04-06 Reconciliation

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal accepted-baseline reconciliation in Phase 14 | Backfill or route around the evidence gap so stock GSD progress/session routing stops miscounting accepted baselines | ✓ |
| Ignore as historical planning debt | Leave stock `gsd-tools` progress misrouting unresolved | |
| Rewrite historical phase artifacts fully | Recreate full execution summaries for architecture phases 04-06 | |

**User's choice:** Use project-local best judgment.
**Notes:** Selected because the current session reproduced the bug: stock `gsd-tools state record-session` recalculated progress as 68% despite Phase 13 being complete and Phase 14 next.

---

## the agent's Discretion

- Exact migration helper module/subcommand names.
- Exact migration JSON field names.
- Exact fixture layout for parity tests.
- Exact implementation split between extending existing helpers and adding a small new migration helper.

## Deferred Ideas

- Global production skill replacement after Phase 14 parity passes.
- Rich migration visual diff tools.
- Multi-project migration assistant.

