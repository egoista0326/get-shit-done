# v1.2 Round 6 Review

**Date:** 2026-04-12
**Round:** 6 of 6
**Outcome:** fixed_not_clean; cap reached
**Clean count after round:** 0

## Verdict

Round 6 is not clean. It found multiple P1/P2 issues in self-contained routing, prompt-fidelity preservation, Codex conversion, roadmap mutation path safety, quality-gate freshness, and paper/rebuttal evidence safety. All confirmed issues found in the round were fixed, but because this was the sixth and final allowed v1.2 round and the clean streak is still 0, the v1.2 loop did not achieve the required two consecutive clean rounds.

## Confirmed Fixes

- V12-053/V12-054: updated stale `.planning/REQUIREMENTS.md` and `task_plan.md` accounting; docs-contract now covers requirements and bounded Round 4/5/6 task-plan sections.
- V12-055: restored Auto `result-to-claim` unsupported-claim routing by requiring `pivot, supplement, or confirm`, postmortem for `claim_supported: no`, and internal `$ljx-GSD-research-refine` / `$ljx-GSD-idea-discovery` downstream routes.
- V12-056: made `previewConvertAutoSkill()` keep ljx-GSD internal routing precedence even when caller maps pass raw Auto skill names.
- V12-057: converted upstream Auto support docs now label Claude JSON hook/MCP config blocks as Claude-only references and no longer present `@anthropic-ai/claude-code`, standalone `claude`, or Anthropic Claude docs links as Codex setup.
- V12-058: generated meta-opt `log_event.sh` records `spawn_agent` and `send_input` as Codex agent calls, while keeping legacy `mcp__codex__*` compatibility.
- V12-059: roadmap admin now rejects symlinked `.planning/phases` roots before add/remove writes or removal staging.
- V12-060: quality-gate freshness now uses ancestor-safe regular-file checks so symlink-parent summary scopes make code review stale.
- V12-061: paper/rebuttal artifact readiness now treats symlinked exact evidence artifacts as missing.
- V12-062: rebuttal workspace and review-source discovery now reject symlinked directories/files and block state writes when the workspace path is unsafe.
- V12-063: the stale paper-evidence unit-test callsite now uses the project-root-aware `buildPaperArtifactLinks(projectRoot, baseContext)` signature introduced for symlink-safe artifact checks.

## Verification

- `node --test --test-name-pattern "buildBridgeReadySkills installs the current bridge-ready shell substrate" tests/skill-build.test.cjs`
- `node --test --test-name-pattern "previewConvertAutoSkill keeps ljx-GSD routing self-contained" tests/skill-build.test.cjs`
- `node --test --test-name-pattern "symlinked \\.planning/phases roots" tests/roadmap-admin-bridge.test.cjs`
- `node --test --test-name-pattern "summary scope under a symlinked parent" tests/verify-work-bridge.test.cjs`
- `node --test --test-name-pattern "symlinked (paper and rebuttal artifacts|rebuttal workspace|root review sources)" tests/rebuttal-bridge.test.cjs`
- `node --test tests/skill-build.test.cjs tests/roadmap-admin-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/rebuttal-bridge.test.cjs` passed 199/199.
- `node --test tests/skill-build.test.cjs` passed 56/56.
- `node --test tests/roadmap-admin-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/rebuttal-bridge.test.cjs` passed 143/143.
- `node --test tests/code-review-bridge.test.cjs tests/runtime-state.test.cjs tests/runtime-shell.test.cjs tests/workstreams-bridge.test.cjs` passed 156/156.
- `node bin/install.js --preview` completed and regenerated the bridge-ready preview install.
- Generated preview self-containment scan for raw non-`ljx-GSD` `$...` skill calls returned no matches.
- Generated preview self-containment scan for raw upstream `/gsd`, `/paper-writing`, `/auto-review-loop`, `/run-experiment`, `/research-pipeline`, and backticked raw Auto/GSD local names returned no matches.
- `node --test tests/docs-contract.test.cjs` passed 13/13.
- `node --test tests/paper-evidence-tools.test.cjs` passed 6/6 after migrating the test callsite to the project-root-aware artifact-link signature.
- Fresh rerun of `node --test tests/*.test.cjs` passed 694/694.
- `git diff --check` passed.

## Accounting

- This round contains P1/P2 findings, so it cannot use the minor-clean exception.
- Consecutive clean rounds after Round 6: 0.
- v1.2 success rule was not met because two consecutive clean rounds did not occur before the 6-round cap.
