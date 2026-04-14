# 01-REVIEW-R3-FIXES

**Status:** applied locally; pending main-agent final check.
**Input:** `01-REVIEW-R3-HISTORICAL-REGRESSION.md`.
**Rule:** Apply framework/artifact corrections only. Do not implement runtime code. Do not mark Phase 01 complete until final check passes.

## Fix Set

| Fix ID | Accepted finding | Target artifacts | Action |
|---|---|---|---|
| R3-FIX-001 | R3-001, R3-002 | `01-LJX-HISTORY-FAILURE-TAXONOMY.md` | Add review-artifact schema/parser drift and split research lifecycle failures into chain-handoff and claim/audit gating families. |
| R3-FIX-002 | R3-003 | `01-AUTO-ARTIFACT-CONTRACTS.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-LJX-HISTORY-FAILURE-TAXONOMY.md` | Add mandatory literature-execution evidence contract for `idea-discovery`; context-only output is non-evidence. |
| R3-FIX-003 | R3-004 | `01-AUTO-PARAMETER-MAP.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`, milestone docs | Define canonical autoProceed/checkpoint precedence. |
| R3-FIX-004 | R3-005 | `01-AUTO-PARAMETER-MAP.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md` | Pin reviewer backend default/fallback and clarify `difficulty` scope. |
| R3-FIX-005 | R3-006 | `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`, milestone docs | Add external-service policy matrix and scenario requirement linkage. |
| R3-FIX-006 | R3-007 | `01-CONTEXT-HYGIENE-LOG.md`, `01-GSD-FRAMEWORK.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md` | Remove file-presence/checkbox/summary false-completion ambiguity. |
| R3-FIX-007 | R3-008 | `01-GSD-FRAMEWORK.md`, `01-GSD-UPGRADE-BOUNDARIES.md`, `01-AUTO-ARTIFACT-CONTRACTS.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md` | Add hard single-writer and mirror taxonomy rules. |
| R3-FIX-008 | R3-009 | `01-CONTEXT-HYGIENE-LOG.md`, `01.json` | Synchronize R3 process status after patches and verification. |

## Verification After Fixes

Run:

```sh
git diff --check -- .planning/phases/01-source-framework-extraction .planning/state/phase-records/01.json .planning/PROJECT.md .planning/REQUIREMENTS.md .planning/ROADMAP.md .planning/STATE.md
node -e 'JSON.parse(require("fs").readFileSync(".planning/state/phase-records/01.json","utf8")); console.log("01.json ok")'
node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" roadmap analyze --cwd "$PWD"
rg -n 'cannot close until these review artifacts exist|roadmap checkbox completion should continue|summary/UAT state agreement|R1-fixed draft|define one non-interactive gate model|which reviewer backend is default|advisory vs blocking' .planning/phases/01-source-framework-extraction .planning/PROJECT.md .planning/REQUIREMENTS.md .planning/ROADMAP.md .planning/STATE.md --glob '!01-REVIEW-R3-*'
```

Expected result: no stale R3-bug strings in corrected framework/milestone artifacts.

## Application Result

All fix IDs in this plan were applied to Phase 01 framework and milestone artifacts. Local verification passed for markdown whitespace, `01.json` parsing, stale R3-bug string checks outside R3 report/fix artifacts, and roadmap plan-count integrity.
