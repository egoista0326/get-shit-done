# v1.2 Round 05 Review

**Date:** 2026-04-12
**Verdict:** not clean; confirmed issues fixed.
**Clean count after round:** 0

## Confirmed Issues

Round 5 confirmed V12-045 through V12-052 in `BUG-LEDGER.md`.

The highest-risk classes were:

- Prompt self-containment still needed explicit coverage for raw `$...` upstream skill calls and local unprefixed ljx-GSD suffix names.
- Prompt-fidelity preservation had downstream allowlist contradictions in `research-pipeline`, `experiment-bridge`, and `review-loop`.
- Runtime-state atomic writes needed temp-path symlink hardening beyond atomic rename.
- Lifecycle gates and code-review git fallback still had normal-use correctness risks around alphanumeric phase ids and `status: blocked` verification artifacts.
- Pause handoff writes needed transactional cleanup/restore behavior when later writes fail.

## Fix Summary

- Added explicit self-contained dollar-call scanner coverage for raw upstream/GSD calls and kept the local suffix scanner strict for unprefixed `review-loop`, `code-review`, and `claim-gate` references.
- Rewrote remaining local short suffix prompt text to `$ljx-GSD-*` names.
- Expanded the research-pipeline raw-upstream prohibition to name the full accepted `$ljx-GSD-*` stage set.
- Added `$ljx-GSD-ablation-planner` to the experiment-bridge downstream allowlist and `$ljx-GSD-result-to-claim` to the review-loop downstream allowlist.
- Hardened runtime-state writes with exclusive temp-file creation and pre-existing temp-path lstat rejection before writing.
- Restricted code-review git fallback numeric matching to pure numeric phase ids; custom/alphanumeric ids now require an exact phase-id match.
- Treated verification `status: blocked` as an authoritative blocked gate even when `gate_status` is absent.
- Wrapped pause handoff JSON, markdown, and `STATE.md` writes in cleanup/restore logic so failed writes do not leave orphaned handoffs or partial paused state.
- Updated failure-injection tests to intercept the new fd-based atomic write path, preserving rollback coverage for runtime-state and workstream state writes.

## Verification

Verification passed after fixes:

- `node --test --test-name-pattern "state record writes reject pre-existing symlinked temp paths" tests/runtime-state.test.cjs` (1/1 passed)
- `node --test --test-name-pattern "self-contained scanner rejects dollar calls|buildBridgeReadySkills installs" tests/skill-build.test.cjs` (2/2 passed)
- `node --test --test-name-pattern "git fallback does not coerce alphanumeric|status blocked frontmatter remains authoritative|writePauseArtifacts rolls back" tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/runtime-shell.test.cjs` (4/4 passed)
- `node --test tests/runtime-state.test.cjs` (15/15 passed)
- `node --test tests/code-review-bridge.test.cjs` (32/32 passed)
- `node --test tests/verify-work-bridge.test.cjs` (49/49 passed)
- `node --test tests/runtime-shell.test.cjs` (67/67 passed)
- `node --test tests/skill-build.test.cjs` (55/55 passed)
- `node --test tests/workstreams-bridge.test.cjs` (42/42 passed)
- `node bin/install.js --preview`
- generated preview scan for raw upstream invocation patterns under `.build/codex-preview/skills/ljx-GSD-*` returned no matches
- generated preview inspection confirmed the corrected research-pipeline, experiment-bridge, and review-loop downstream lines
- targeted wide suite `node --test tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/runtime-state.test.cjs tests/runtime-shell.test.cjs tests/skill-build.test.cjs tests/migration-cutover.test.cjs tests/workstreams-bridge.test.cjs` passed after the workstreams failure-injection helper update
- `node --test tests/docs-contract.test.cjs` (13/13 passed)
- full `node --test tests/*.test.cjs` (687/687 passed)
- `git diff --check`

## Next Round Focus

Round 6 is the final allowed round under the v1.2 cap. Because Round 5 was not clean and the clean count is 0, Round 6 cannot by itself satisfy the two-consecutive-clean success rule; if it is clean, the protocol will still need an explicit capped-status decision or cap extension.

Round 6 should focus on:

- source/build/preview self-contained invariants for all generated `ljx-GSD-*` skills
- prompt-fidelity contradictions between quality floors, downstream allowlists, helper context, and direct process steps
- regression risks introduced by fd-based atomic state writes and pause rollback
- alphanumeric/decimal/custom phase id handling across review/verify/admin paths
- Codex-vs-Claude surfaces that may still be hidden in preserved upstream Auto assets or generated support files
