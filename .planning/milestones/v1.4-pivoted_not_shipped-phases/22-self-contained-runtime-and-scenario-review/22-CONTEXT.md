# Phase 22 Context: Self-Contained Runtime And Scenario Review

## Objective

Run the v1.4 review loop that treats `ljx-GSD` as an independent closed-loop Codex skill system.

## User Requirements

- `ljx-GSD` must run even when upstream GSD and Auto/ARIS are not installed on the machine.
- If upstream GSD or Auto/ARIS are installed, `ljx-GSD` must still stay inside its own `ljx-GSD-*` workflow and must not invoke raw upstream skills.
- Review must include normal static/implementation skill review and later live scenario review.
- Regular skill review comes first, up to 10 rounds, with early exit after two consecutive clean rounds.
- Scenario review comes after regular review, up to 10 rounds, with early exit after two consecutive clean rounds.
- Scenario review must construct common user tasks, install/use `ljx-GSD`, prompt subagents as simulated users, and require subagents to report exact `ljx-GSD-*` skill chains and artifacts.
- File/artifact tracking is a first-class review dimension because Auto/ARIS root-level artifacts must be unified into the GSD `.planning` system.
- Config variables and Codex hook variables are first-class review dimensions.

## Current Baseline

- v1.2 reached its 6-round cap with clean streak 0 after fixing V12-001 through V12-063.
- v1.3 Stage 1 reached its 5-round cap with clean streak 0 after fixing V13-001 through V13-040.
- v1.4 starts from the Round 5 verified source state and supersedes the old managed-upstream policy with an independent-runtime policy.

## Review References

- `.planning/review/v1.1/GSD-REFERENCE-NOTES.md`
- `.planning/review/v1.1/AUTO-ARIS-REFERENCE-NOTES.md`
- `.planning/review/v1.1/LJX-GSD-IMPLEMENTATION-INDEX.md`
- `.planning/review/v1.3/RETROSPECTIVE-AND-PROTOCOL.md`
- `.planning/review/v1.4/PROTOCOL.md`
