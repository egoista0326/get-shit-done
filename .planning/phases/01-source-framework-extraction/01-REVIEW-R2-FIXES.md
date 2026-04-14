# 01-REVIEW-R2-FIXES

**Status:** applied locally; pending R3 historical-regression review.
**Input:** `01-REVIEW-R2-CONSISTENCY.md`.
**Rule:** Apply framework/artifact corrections only. Do not implement runtime code. Do not mark Phase 01 complete.

## Fix Set

| Fix ID | Accepted finding | Target artifacts | Action |
|---|---|---|---|
| R2-FIX-001 | R2-001 | `01-FRAMEWORK-SYNTHESIS-DRAFT.md`, `01-AUTO-ARTIFACT-CONTRACTS.md`, `01-AUTO-FRAMEWORK.md` | Choose phase-local research artifact root as authoritative; treat Auto root artifacts as import/export mirrors only. |
| R2-FIX-002 | R2-002 | `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md` | Name each experiment/claim command and required artifact/evidence contract. |
| R2-FIX-003 | R2-003 | `01-AUTO-PARAMETER-MAP.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md` | Replace ambiguous stop-predicate language with the stricter canonical predicate. |
| R2-FIX-004 | R2-004 | `01-LJX-REUSE-OR-DISCARD-MATRIX.md` | Remove `ljx-bridge-contract.cjs` as strong reuse; allow only a from-scratch neutral parser idea. |
| R2-FIX-005 | R2-005 | `01-LJX-REUSE-OR-DISCARD-MATRIX.md` | Add explicit quarantine: no `ljx-*` commands, no `bridge-ready`, no `primaryCommand`, no route-table reuse. |
| R2-FIX-006 | R2 process accounting | `01-CONTEXT-HYGIENE-LOG.md`, `01.json` | Record R2 completion/fix status after patches and verification. |

## Verification After Fixes

Run:

```sh
git diff --check -- .planning/phases/01-source-framework-extraction .planning/state/phase-records/01.json
node -e 'JSON.parse(require("fs").readFileSync(".planning/state/phase-records/01.json","utf8")); console.log("01.json ok")'
rg -n 'inconsistency reported|Research artifact root mapping remains|Summary key file parsing and rerun policy|bridge-specific global contract|bridge-ready labels' .planning/phases/01-source-framework-extraction --glob '!01-REVIEW-R2-*'
```

Expected result: no stale R2-bug strings in corrected framework artifacts.

## Application Result

All fix IDs in this plan were applied to Phase 01 framework artifacts. Local verification passed for markdown whitespace, `01.json` parsing, stale R2-bug string checks outside R2 report/fix artifacts, and roadmap plan-count integrity.
