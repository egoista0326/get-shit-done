# v1.2 Round 02 Review

**Date:** 2026-04-12
**Verdict:** not clean; confirmed issues fixed.
**Clean count after round:** 0

## Confirmed Issues

Round 2 confirmed V12-010 through V12-015 in `BUG-LEDGER.md`.

The highest-risk classes were:

- generated prompt quality loss after replacing raw Auto/GSD calls with internal ljx-GSD stages
- Codex/llm-chat adapter drift that could break preserved Auto review-loop usage
- quality-gate progression allowing terminal or pending code-review-loop states to be bypassed by a ready verification artifact
- self-contained invocation coverage gaps for slash aliases such as `/gsd:next`
- stale documentation/accounting after opening v1.2 as the post-cap review

## Self-Contained Skill Addendum

The Round 1 generated-skill scan caught raw `$...` skill mentions and common slash names, but did not catch:

- `/gsd`
- `/gsd:next`
- `/paper-writing`

Round 2 added a pressure test for those exact forms and strengthened the scan to reject raw GSD slash aliases and Auto workflow slash commands from every generated `ljx-GSD-*` skill.

## Prompt-Fidelity Addendum

Self-containment is not allowed to shrink original GSD/Auto capability. Round 2 therefore added prompt-quality floors that require the internal ljx-GSD stages to retain specific Auto details:

- experiment execution reads `AGENTS.md` or equivalent repo instructions
- GPU preflight, environment detection, dependency readiness, sync policy, W&B/tracker setup, screen/tee launch logging, checkpoint paths, and launch verification remain explicit
- paper workflow keeps claims-evidence matrix, citation verification, venue/page-budget constraints, figure/table planning, and reviewer outline pass semantics

## Verification

Verification passed after fixes:

- `node --test tests/skill-build.test.cjs`
- `node --test tests/verify-work-bridge.test.cjs`
- `node --test tests/migration-cutover.test.cjs`
- `node --test tests/*.test.cjs` (657/657 passed)
- `node bin/install.js --preview`
- generated preview self-containment scan for raw upstream invocation patterns under `.build/codex-preview/skills/ljx-GSD-*`
- `python3 -m py_compile .build/codex-preview/tools/convert_skills_to_llm_chat.py`
- `python3 .build/codex-preview/tools/convert_skills_to_llm_chat.py --source .build/codex-preview/skills --target /tmp/ljx-gsd-llm-chat-preview --dry-run`
- `git diff --check`

## Next Round Focus

Round 3 must treat Round 2 as not clean. Focus areas:

- generated `ljx-GSD-*` prompt self-containment with broader slash and `$...` forms
- prompt-fidelity preservation in research, experiment, review, and paper flows
- Codex-vs-Claude conformance for active installed Auto skills and support tools
- docs/state/accounting consistency after Round 2 fixes
- source-template/postprocess maintainability, while distinguishing normal install-path risk from direct internal builder usage
