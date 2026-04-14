# 01-REVIEW-R1-FIXES

**Status:** applied locally; pending R2 consistency review.
**Input:** `01-REVIEW-R1-SOURCE-COVERAGE.md`.
**Rule:** Apply fixes to Phase 01 artifacts only. Do not implement runtime code. Do not mark Phase 01 complete.

## Fix Set

| Fix ID | Accepted finding | Target artifacts | Action |
|---|---|---|---|
| R1-FIX-001 | R1-001, R1-002, R1-010, R1-011 | `01-GSD-SOURCE-INDEX.md` | Add path convention, canonical roots for all source systems, package/test/SDK/prompt-template rows, and precise nested template paths. |
| R1-FIX-002 | R1-002 | `01-GSD-FRAMEWORK.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md` | Rename SDK from wrapper-only to package boundary; flag SDK prompts/tests/API as Phase 02 baseline decision. |
| R1-FIX-003 | R1-001 | `01-GSD-UPGRADE-BOUNDARIES.md` | Add package/test corpus and SDK package boundary risks. |
| R1-FIX-004 | R1-003 | `01-LJX-REUSE-OR-DISCARD-MATRIX.md` | Remove contradictory strong reuse entry; keep only narrow adoption-state idea under caution. |
| R1-FIX-005 | R1-004 | `01-LJX-HISTORY-FAILURE-TAXONOMY.md` | Add explicit hook/adapter conformance failure family and review implication. |
| R1-FIX-006 | R1-005 | `01-LJX-FRAMEWORK.md` | Correct manifest count to 34 bridge-ready entries and remove compatibility/deferred claim. |
| R1-FIX-007 | R1-006, R1-007, R1-008, R1-009 | Auto artifacts and synthesis/context hygiene | Correct `sources`, `difficulty`, `research-pipeline`, and paper/camera-ready wording. |
| R1-FIX-008 | R1 process accounting | `01-CONTEXT-HYGIENE-LOG.md`, `01.json` | Record R1 completion/fix status after patches and verification. |

## Verification After Fixes

Run:

```sh
git diff --check -- .planning/phases/01-source-framework-extraction .planning/state/phase-records/01.json
node -e 'JSON.parse(require("fs").readFileSync(".planning/state/phase-records/01.json","utf8")); console.log("01.json ok")'
rg -n 'semantic-scholar|REVIEWER_DIFFICULTY|No standalone paper-review or camera-ready asset|33 bridge-ready|Lifecycle adoption-state pattern' .planning/phases/01-source-framework-extraction --glob '!01-REVIEW-R1-*'
```

Expected result: no stale R1-bug strings in corrected framework artifacts.

## Application Result

All fix IDs in this plan were applied to Phase 01 framework artifacts. Local verification passed for markdown whitespace, `01.json` parsing, stale R1-bug string checks outside R1 report/fix artifacts, and `01-GSD-SOURCE-INDEX.md` root-token path resolution.
