# v1.1 Review Protocol

**Generated:** 2026-04-12
**Rule:** two consecutive clean rounds required; maximum 11 total review rounds.

## 1. Round Scope

Every full review round must cover:

- runtime helpers under `bin/lib/`
- installer/build/manifest under `bin/`
- generated preview skills under `.build/codex-preview/skills/ljx-GSD-*`
- preview runtime/docs under `.build/codex-preview/ljx-gsd/`
- preserved Auto companion skills/tools/templates when relevant to parity
- tests under `tests/`
- `.planning` roadmap/state/phase records/review docs
- Phase 15 upstream parity notes
- Phase 16 implementation index
- Phase 17 rubric and scenario matrix

## 2. Candidate Finding Intake

For each candidate issue, record internally or in the review artifact:

- candidate id
- severity estimate
- source file and line/context where possible
- affected scenario/rubric dimension
- observed evidence
- suspected root cause
- likely minimal fix
- whether it is a bug, intentional deferred surface, or docs-only ambiguity

Do not edit implementation code during candidate collection.

## 3. Second-Pass Confirmation

A candidate becomes confirmed only if the second pass can answer all of these:

- What exact contract is violated?
- What concrete evidence demonstrates the violation?
- Is the violated contract current implemented scope rather than future target taxonomy?
- Does upstream GSD/Auto parity require this behavior?
- Could the issue be an intentional bridge-ready/deferred boundary?
- What is the smallest fix and what related generated output/tests/docs must move with it?

If any answer is missing, classify the candidate as rejected or needs-more-evidence, not as a confirmed bug.

## 4. Fix Rules

For confirmed bugs:

- make minimal, scoped changes
- preserve GSD control-plane semantics and Auto research capability
- preserve substantive GSD/Auto skill capability and prompt quality; a generated skill that merely routes to a helper but drops upstream planning, execution, review, evidence, or artifact-quality obligations is a real parity/capability defect, not a cosmetic wording issue
- update generated preview output if source-generation behavior changes
- add or update targeted tests when the bug is behavioral
- update docs when the bug is a generated/user-facing contract drift
- never rewrite unrelated dirty worktree changes

Fixing any confirmed P0/P1/P2 bug resets the clean-round counter to 0 after the fix. The next review round starts fresh from the fixed state.

## 5. Bug Ledger Rules

Each fixed confirmed bug must be added to `.planning/review/v1.1/BUG-LEDGER.md` with:

- ID
- round
- severity
- user-facing description
- root cause
- fix summary
- affected files
- verification command/evidence
- status

Rejected candidates should be logged only when the rejection prevents likely rediscovery or when the user would expect transparency.

## 6. Clean Round Definition

A round is clean when:

- no P0/P1/P2 confirmed bug remains
- no untriaged candidate remains that could plausibly be P0/P1/P2
- baseline verification for the round passes or environment-only limits are documented
- scenario matrix has no blocking gaps for the round
- generated preview output is consistent with manifest/helper contracts
- generated skill content preserves upstream GSD/Auto task quality for claimed capabilities, including prompt-level planning depth, reviewer criteria, bounded loops, evidence requirements, and expected artifact content

P3-only residuals may be listed as residual risk without resetting the clean streak if they do not affect correctness, parity, safety, or user-facing contract accuracy.

## 7. Loop Accounting

Start state:

- Current round: 0
- Consecutive clean rounds: 0
- Max rounds: 11

Per round:

1. Increment current round.
2. Run rubric and scenario review.
3. Second-pass confirm candidates.
4. If confirmed P0/P1/P2 bugs exist:
   - fix them
   - verify fixes
   - update bug ledger
   - set consecutive clean rounds to 0
5. If no confirmed P0/P1/P2 bugs exist:
   - increment consecutive clean rounds by 1
6. Stop successfully only when consecutive clean rounds reaches 2.
7. Stop unsuccessfully at Round 11 with a residual-risk report if the clean target is not reached.

## 8. Phase Mapping

Phase 18:

- run Round 1
- confirm/reject findings
- fix accepted bugs
- update bug ledger and review state

Phase 19:

- continue from the next round
- rerun after fixes
- stop at two consecutive clean rounds or Round 11
- write final verification and closure report

Phase 20 strict addendum outcome:

- Round 04 through Round 11 each found confirmed issues.
- The hard cap was reached at Round 11 with clean streak 0.
- Final strict success is not achieved under this protocol.
- Further review requires a new milestone or explicit user instruction changing the cap/protocol.

## 9. Future Protocol Upgrade

Before starting any future review milestone, read `.planning/review/v1.1/REVIEW-RETROSPECTIVE-AND-NEXT-PROTOCOL.md`.

That retrospective upgrades the next review method from repeated round-by-round discovery to a contract-first, matrix-driven process:

- freeze and inventory all source/generator/runtime/preview/docs surfaces before edits
- collect candidates without patching during the first pass
- confirm candidates by violated contract, concrete evidence, upstream parity reference, user scenario, and required regression test
- batch fixes by root-cause invariant rather than symptom
- treat generated preview output and prompt capability preservation as first-class review surfaces
- include an explicit Claude Code to Codex adapter lane
- run the negative test pack for directories, symlinks, dangling symlinks, stale states, aliases, preview residue, and capped review routing
- update docs/state/accounting only after behavior is stable and verified

The intended future success model is one deep candidate collection pass, one confirmation/batching pass, one implementation pass, one targeted verification pass, and two final clean confirmations. If a new issue family appears, update the matrix before continuing rather than simply adding another ad hoc round.
