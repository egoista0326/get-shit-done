# v1.2 Post-Cap Review State

**Started:** 2026-04-12
**Trigger:** User requested a new review using the improved review rules after the v1.1 capped-not-clean closure.
**Round cap:** 6
**Success rule:** stop successfully after two consecutive clean rounds.
**Minor exception:** if a round only finds extreme/rare/non-normal-use minor issues, the round may count as clean, but those issues must still be fixed, verified, and logged.
**Base protocol:** `.planning/review/v1.1/REVIEW-RETROSPECTIVE-AND-NEXT-PROTOCOL.md`

## Current Status

- Current round: complete (cap reached at Round 6)
- Consecutive clean rounds: 0
- Last completed action: Round 6 confirmed issues V12-053 through V12-063 were fixed; targeted verification, preview install, generated self-containment scans, docs-contract, full 694-test suite, and diff check passed before capped_not_clean closeout.
- Working mode: v1.2 reached the 6-round cap with clean streak 0. Round 6 was fixed but not clean, so formal success was not reached under the two-consecutive-clean rule.

## Scope

This review inherits the v1.1 strict scope and adds the v1.2 cap/minor-clean rule:

- runtime/state/path safety
- GSD lifecycle and code-review/verify parity
- Auto/ARIS research and prompt-capability preservation
- Claude Code to Codex adapter correctness
- migration, workstream, pause/resume safety
- generated preview install output and support assets
- docs/state/accounting consistency

## Round Accounting

| Round | Status | Clean Count After Round | Notes |
| --- | --- | --- | --- |
| 1 | fixed_not_clean | 0 | Confirmed and fixed V12-001 through V12-009. Full `node --test tests/*.test.cjs` passed 653/653; `git diff --check` passed. New self-contained invocation guard verifies generated `ljx-GSD-*` prompts do not call raw upstream Auto/GSD skills. |
| 2 | fixed_not_clean | 0 | Confirmed and fixed V12-010 through V12-015. Targeted tests passed, full `node --test tests/*.test.cjs` passed 657/657, `node bin/install.js --preview` passed, generated self-containment scan passed, llm-chat converter py_compile/dry-run passed, and `git diff --check` passed. |
| 3 | fixed_not_clean | 0 | Confirmed and fixed V12-016 through V12-027. Targeted tests passed, full `node --test tests/*.test.cjs` passed 668/668, `node bin/install.js --preview` passed, generated self-containment scan passed, llm-chat/MiniMax converter checks passed, and `git diff --check` passed. |
| 4 | fixed_not_clean | 0 | Confirmed and fixed V12-028 through V12-044. Targeted self-contained builder tests passed, `node --test tests/skill-build.test.cjs` passed 53/53, targeted cross-surface suite passed 226/226, full `node --test tests/*.test.cjs` passed 680/680, `node bin/install.js --preview` passed, generated self-containment scan passed, and `git diff --check` passed. |
| 5 | fixed_not_clean | 0 | Confirmed and fixed V12-045 through V12-052. Added explicit raw `$...` self-containment coverage and local suffix guards, repaired research-pipeline/experiment-bridge/review-loop downstream allowlist contradictions, hardened runtime-state temp writes, fixed custom phase git fallback, respected verification `status: blocked`, and made pause handoff writes restore/cleanup on failure. Targeted tests, preview install, generated preview scans, the 286-test wide target suite, docs-contract, full `node --test tests/*.test.cjs` (687/687), and `git diff --check` passed. |
| 6 | fixed_not_clean; cap reached | 0 | Confirmed and fixed V12-053 through V12-063. Added stricter self-contained preview-helper coverage, restored result-to-claim no/pivot prompt fidelity, corrected Codex support-doc and meta-opt hook drift, hardened roadmap/quality-gate/paper/rebuttal symlink boundaries, updated docs/accounting, and migrated the stale paper-evidence test callsite found during full-suite verification. Because this was the v1.2 cap and clean streak remains 0, formal success was not reached. |

## Required Artifacts

- `BUG-LEDGER.md` records confirmed v1.2 bugs and minor-clean fixes.
- `ROUND-XX-CANDIDATES.md` records raw candidate intake before fixes.
- `ROUND-XX-REVIEW.md` records second-pass confirmations, fixes, verification, and clean accounting.
