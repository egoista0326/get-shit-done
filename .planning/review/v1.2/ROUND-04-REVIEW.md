# v1.2 Round 04 Review

**Date:** 2026-04-12
**Verdict:** not clean; confirmed issues fixed.
**Clean count after round:** 0

## Confirmed Issues

Round 4 confirmed V12-028 through V12-044 in `BUG-LEDGER.md`.

The highest-risk classes were:

- `ljx-GSD-*` self-containment coverage was still not strict enough for direct builders, recommendation/handoff command slots, and backticked descriptive raw upstream skill names.
- Prompt-fidelity preservation still had quality gaps in the research-pipeline, experiment-bridge, review-loop, pause-work, and workstreams prompts.
- Codex conformance still had hook-template and upstream Auto doc conversion drift around Codex TOML hooks and MiniMax env guidance.
- Runtime and migration safety still had edge cases around parent symlinks, exact dangling symlinks, and atomic state writes.
- Lifecycle quality gates and git fallback logic still had normal-use correctness risks around explicit blocked review state and overbroad phase-diff matching.
- Workstream creation diverged from upstream GSD by creating without activating.

## Fix Summary

- Extended self-containment tests to cover direct builders, routing slots, and backticked raw names; wrapped the remaining direct builders with self-containment normalization; removed raw upstream names from generated ljx-GSD prompt output.
- Added or expanded prompt-quality floors for `ljx-GSD-research-pipeline`, `ljx-GSD-experiment-bridge`, `ljx-GSD-review-loop`, `ljx-GSD-pause-work`, and `ljx-GSD-workstreams`.
- Hardened state/path handling with parent-symlink checks, exact dangling-symlink rejection, atomic runtime-state writes, and safer resume rollback.
- Repaired Codex conversion for MiniMax env guidance, upstream hook docs, and Codex TOML hook templates with `codex_hooks = true`.
- Narrowed code-review git fallback commit matching and made verify-work respect explicit blocked code-review state.
- Changed workstream creation to activate the newly created workstream when persistence is safe, while preserving session/environment override safety and rollback.

## Verification

Verification passed after fixes:

- `node --test --test-name-pattern "exported ljx-GSD skill builders are self-contained|buildBridgeReadySkills installs|self-contained scanner rejects backticked raw skill names" tests/skill-build.test.cjs` (3/3 passed)
- `node --test tests/skill-build.test.cjs` (53/53 passed)
- `node bin/install.js --preview`
- generated preview scan for raw upstream invocation patterns under `.build/codex-preview/skills/ljx-GSD-*` returned no matches
- `node --test tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/runtime-state.test.cjs tests/migration-cutover.test.cjs tests/runtime-shell.test.cjs tests/workstreams-bridge.test.cjs` (226/226 passed)
- `node --test tests/*.test.cjs` (680/680 passed)
- `git diff --check`

## Next Round Focus

Round 5 must treat Round 4 as not clean. Focus areas:

- try to falsify the expanded self-contained scanner using generated output, direct builders, converted Auto skills, and prompt-quality appended text
- re-check prompt fidelity for the concrete skill prompts, not only helper behavior: can each command still perform the upstream GSD/Auto job at comparable quality?
- re-check Codex-vs-Claude boundaries for paths, hooks, subagent payloads, MCP schema, and stale doc snippets
- re-check lifecycle gate interactions after the Round 4 workstream, code-review, verify, runtime-state, and resume fixes
- inspect for overfitting or oscillation: no fix should merely satisfy a test while drifting from upstream GSD/Auto semantics
