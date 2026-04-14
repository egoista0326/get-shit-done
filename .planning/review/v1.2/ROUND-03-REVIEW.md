# v1.2 Round 03 Review

**Date:** 2026-04-12
**Verdict:** not clean; confirmed issues fixed.
**Clean count after round:** 0

## Confirmed Issues

Round 3 confirmed V12-016 through V12-027 in `BUG-LEDGER.md`.

The highest-risk classes were:

- `ljx-GSD-*` self-containment coverage was still too narrow: it caught common `$...` and slash forms but not bare imperative raw-skill references or upstream inventory-derived slash commands.
- Prompt-fidelity preservation still missed Auto's pre-deploy cross-model experiment-code review gate in `ljx-GSD-experiment-bridge`.
- Codex/MCP conversion remained schema-fragile for MiniMax and for llm-chat converter block scoping.
- Lifecycle quality gates still had rerun/freshness issues around terminal review-loop states, code-review evidence, and symlinked execution/review artifacts.
- Migration, workstream, and pause/resume helpers still had lstat-vs-exists edge cases that could misroute dangling symlink or markdown-only residue states.
- Review accounting mirrors lagged behind the repaired code/test state.

## Fix Summary

- Added generated-skill self-containment tests that reject bare imperative raw skill references and derive forbidden raw slash names from the installed upstream skill inventory.
- Preserved Auto's pre-deploy cross-model experiment-code review gate as internal `ljx-GSD-experiment-bridge` prompt semantics.
- Repaired MiniMax and llm-chat converter payload rewriting so active tool blocks use the correct schema without mutating unrelated prose/config fields.
- Hardened `code-review-fix`, `code-review`, and `verify-work` against terminal/pending review-loop state reopening, symlinked scope/evidence, and stale freshness evidence.
- Hardened migration/workstream/pause-resume helpers around exact dangling symlink roots, state-family directory validation, and partial handoff consumption.
- Advanced v1.2 accounting mirrors from Round 3 pending to Round 3 fixed-not-clean / Round 4 next.

## Verification

Verification passed after fixes:

- `node --test tests/skill-build.test.cjs` (48/48 passed)
- `node --test tests/code-review-fix-bridge.test.cjs tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs` (97/97 passed)
- `node --test tests/migration-cutover.test.cjs tests/workstreams-bridge.test.cjs tests/runtime-shell.test.cjs` (131/131 passed)
- `node --test tests/*.test.cjs` (668/668 passed)
- `node bin/install.js --preview`
- generated preview self-containment scan for raw upstream invocation patterns under `.build/codex-preview/skills/ljx-GSD-*`
- `python3 -m py_compile .build/codex-preview/tools/convert_skills_to_llm_chat.py`
- `python3 .build/codex-preview/tools/convert_skills_to_llm_chat.py --source .build/codex-preview/skills --target /tmp/ljx-gsd-llm-chat-preview --dry-run`
- `git diff --check`

## Next Round Focus

Round 4 must treat Round 3 as not clean. Focus areas:

- generated `ljx-GSD-*` self-containment across generated output, source templates, support docs, and converter output
- prompt-fidelity preservation for Auto/ARIS research quality gates, especially experiment launch, review loops, claim analysis, and paper/rebuttal workflows
- Codex-vs-Claude conformance for MCP payload schemas, path conventions, hooks, and subagent interface examples
- lifecycle gate rerun/freshness semantics after the Round 3 code-review-fix and verify-work repairs
- path-family safety for migration/workstreams/pause-resume without widening the implementation beyond minimal reuse
