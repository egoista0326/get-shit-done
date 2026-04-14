# Phase 05 Round 05 Review

**Round:** 05
**Status:** not-clean
**Harness:** `05-REVIEW-HARNESS.md`, schema v2 after Round 04 fixes
**Parser/accounting:** Phase 05 finding schema v2
**Completed:** 2026-04-14T02:02:18+02:00

## Scope

Round 05 is the first required subagent clean-loop round after Round 04. It was run with six read-only subagents under schema v2.

Subagent outputs were candidate findings only. The main session performed second-pass confirmation before accepting findings or applying fixes.

## Subagent lane coverage

| Lane | Subagent | Result | Main-agent decision |
| --- | --- | --- | --- |
| GSD lifecycle reviewer | Parfit `019d8953-b31b-7652-b8cc-56360521c9f2` | clean | No blocker accepted. P3 inserted-phase shorthand and mirror/copy wording remain implementation watch items. |
| Research capability reviewer | Plato `019d8953-b34d-7613-9ba0-a84f5c22b741` | clean | No blocker accepted. P3 thin-wrapper/per-command-detail residuals remain implementation watch items. |
| Completion and evidence reviewer | Banach `019d8953-b3a5-7d62-8b2f-2d72c78c54c6` | clean | No blocker accepted. P3 lifecycle-owner acceptance wording and stale-adoption test coverage remain implementation watch items. |
| State/config/concurrency reviewer | Laplace `019d8953-b3f7-7142-9dc0-25405881ed9d` | findings | Two findings accepted after main-agent confirmation. |
| Artifacts/hooks/install reviewer | Nash `019d8953-b43b-70d3-a7ff-684abadd66b6` | findings | One finding accepted after main-agent confirmation. |
| Historical regression reviewer | Popper `019d8953-b482-70e0-9d53-7760a5c5b16d` | clean | No blocker accepted. P3 stale prompt status was addressed during the accepted Round 05 fix cycle. |

## Main-agent confirmation summary

The main session independently confirmed the candidate evidence before editing:

- Workspace path-safety grep failed in `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813` before the fix, while the active planning repo had the Round 04 path-safety contract.
- Active and workspace `.planning/config.json` both contained a raw top-level `research` block before the fix.
- `.planning/research.config.json` was absent before the fix.
- Unknown-key policy still used ambiguous `rejected or reported` / `reject or warn` wording before the fix.

## Accepted findings

### F05-R05-AH-001

| Field | Value |
| --- | --- |
| `id` | `F05-R05-AH-001` |
| `severity` | P1 |
| `rule` | R-09, R-11, R-13, R-14 |
| `dimension` | Git/hooks/artifacts / Path safety / Install-build-workspace boundary |
| `historical_failure` | False clean implementation-start from stale planning/evidence paths. |
| `status` | accepted, fixed |
| `verification_requirement` | Path-safety/adoption greps must pass inside the implementation workspace, and the final handoff contract must require post-05-03 planning refresh/re-copy with recorded snapshot identity before upstream import or branch initialization. |

**Evidence:** The clean implementation workspace planning snapshot was copied at `2026-04-14T01:28:13+02:00`, before accepted Round 04 path-safety fixes. Before the fix, workspace-local grep did not find the Round 04 path-safety/adoption contract.

**Body:** Phase 06 could begin from a clean-looking workspace that lacked the accepted path-safety contract, recreating stale-path false completion risk even though dirty runtime code was excluded.

**Required change:** Require deterministic post-Phase05 planning refresh or re-copy into the implementation workspace before Phase06 implementation starts, record refreshed snapshot identity, require final Phase02/04/05 artifacts in the workspace, and require path-safety/adoption greps inside the implementation workspace.

**Fix applied:** Updated `04-IMPLEMENTATION-WORKTREE.md` and `05-03-PLAN.md` with final planning refresh, config sanitization, and workspace-local path-safety verification requirements. Synced current `.planning/` into the implementation workspace as an interim Round05 refresh; final post-`05-03` refresh remains required.

### F05-R05-SC-001

| Field | Value |
| --- | --- |
| `id` | `F05-R05-SC-001` |
| `severity` | P1 |
| `rule` | R-06, R-08 |
| `dimension` | State/config/concurrency / Config precedence / Single-writer ownership |
| `historical_failure` | Config drift with upstream GSD config, unknown-key/migration-on-read behavior, and hidden second config truth surface. |
| `status` | accepted, fixed |
| `verification_requirement` | `rg -n '"research"|"auto_proceed"|"human_checkpoint"|"wandb_enabled"' .planning/config.json /Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/.planning/config.json` must return no matches, and `.planning/research.config.json` must exist with migrated or quarantined research settings. |

**Evidence:** Active and clean-workspace `.planning/config.json` both contained a raw top-level `research` block; `.planning/research.config.json` was absent in both locations.

**Body:** The target framework already said research config must live separately, but the actual planning handoff state contradicted that rule and could make upstream GSD load or preserve research behavior through the wrong config surface.

**Required change:** Sanitize active and clean-workspace `.planning/config.json` so raw research keys do not pollute upstream GSD config; preserve legacy settings in `.planning/research.config.json` as non-effective quarantine until the future research config loader translates them.

**Fix applied:** Removed the raw `research` block from active/workspace `.planning/config.json`, created `.planning/research.config.json` with `schema: research-config-quarantine-v1`, `status: quarantined-legacy-config`, `effective: false`, and preserved the legacy values under `legacy_research`.

### F05-R05-SC-002

| Field | Value |
| --- | --- |
| `id` | `F05-R05-SC-002` |
| `severity` | P2 |
| `rule` | R-06 |
| `dimension` | State/config/concurrency / Config precedence |
| `historical_failure` | Unknown config keys silently changing or hiding behavior, especially under `auto`/`danger-auto` side-effect and checkpoint policy. |
| `status` | accepted, fixed |
| `verification_requirement` | `rg -n "warn-and-ignore|fail-closed|strict mode|non-effective|experimental" .planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md .planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-FEASIBILITY.md .planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md` must show the default/strict split and non-effective diagnostic requirement. |

**Evidence:** Phase 03 required `warn-and-ignore by default and fail-closed in strict mode`, but the target/boundary docs still allowed ambiguous `rejected or reported` and `reject or warn` behavior.

**Body:** Two incompatible implementation behaviors were valid under the same spec, with no strict-mode trigger and no required warning/audit sink.

**Required change:** Define one canonical unknown-key policy: default mode warns and ignores unknown keys as non-effective with an explicit diagnostic record; strict mode fails closed; command-pack-declared keys are the only accepted command extensions; `experimental` keys are non-effective until adopted.

**Fix applied:** Updated `02-CONFIG-PRESET-SPEC.md`, `04-IMPLEMENTATION-FEASIBILITY.md`, and `04-IMPLEMENTATION-BOUNDARIES.md` to encode the default/strict split and diagnostic requirement.

## Rejected findings

None.

## Advisory findings

| Lane | Residual |
| --- | --- |
| GSD lifecycle | Inserted-phase shorthand and optional mirror wording remain implementation watch items but are bounded by GSD owner-path rules. |
| Research capability | Thin-wrapper shorthand and deferred per-command details remain implementation watch items but do not drop prompt-pack/evidence obligations. |
| Completion/evidence | Lifecycle-owner acceptance wording and stale-adoption scenario tests remain implementation watch items but do not allow clean completion without evidence/gates. |
| Historical regression | Prompt status freshness was P3, and the status line was updated during the accepted fix cycle. |

## Round result

Round 05 is not clean because it accepted two P1 findings and one P2 finding.

Clean streak after Round 05: `0`.

Round 06 must run all six subagent lanes again after the Round 05 fixes.

## Verification

- Raw research keys no longer appear in active/workspace `.planning/config.json`.
- Active/workspace `.planning/research.config.json` exists and preserves the legacy research block as non-effective quarantine.
- Workspace-local path-safety grep now finds the Round 04 evidence/adoption contract.
- Unknown-key policy grep shows `warn-and-ignore`, `fail-closed`, `strict mode`, `non-effective`, and `experimental` coverage.
