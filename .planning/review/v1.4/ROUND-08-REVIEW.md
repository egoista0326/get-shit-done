# v1.4 Stage A Round 8 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** Round 8 confirmed multiple P1/P2 runtime, artifact-traceability, install, config, hook-contract, and prompt-hardening issues. The accepted issues were fixed and full verification passed, but the round cannot count as clean because P1/P2 findings reset the Stage A clean streak.

## Scope Covered

- Prompt fidelity: direct reviewer-backed research helpers, generated source prompts, `spawn_agent(model/reasoning_effort)` preservation, and raw upstream companion-stage wording.
- Self-contained runtime and install: command sanitizer token parsing, preview active skill directories, manifest/built-set equality, unknown install flags, stale preview rebuild risk, and top-level support-root absence.
- Config and variables: phase `config_overrides`, legacy Auto aliases inside phase records, documented GSD aliases, launch confirmation handoff aliases, CLI enum validation, and final merged config validation.
- Codex conversion and hooks: official Codex `hooks.json`/`PostToolUse` expectations, advisory Bash payload handling, and no overclaim that Codex hook callbacks currently capture Skill/subagent tool events automatically.
- File/artifact traceability: unprefixed experiment execution artifacts, dependency and phase-local `REVIEW_STATE.json` / `GPT54_AUTO_REVIEW.md`, multi-artifact direct Auto evidence, pause/resume required reading merge, and deleted-file resurrection.
- Lifecycle and quality gates: code-review git fallback after phase-tagged commits, route command/routeKind compatibility, verify-work execution evidence, and workstreams CLI fail-closed behavior.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-110 through V14-123.

## Key Root Causes

- Earlier self-containment checks caught obvious raw commands but not raw upstream tokens embedded inside argument values such as `--next=claim-gate` or comma-separated fallback fields.
- Several artifact readers had been fixed locally but not as a full end-to-end ledger. Preserved Auto-style files could still be read by one helper and missed by another.
- Phase-level overrides were not always normalized through the same alias layer as project config, so legacy Auto/GSD aliases could silently fail in the phase record path.
- Hook conversion had mixed two questions: whether the template syntax was Codex-compatible and whether the current Codex runtime emits non-Bash tool hooks. The former was supported; the latter was overclaimed.
- Route and git fallback code still applied independent pieces of state too eagerly: a valid phase-tagged commit could hide new dirty implementation files, and an invalid command override could leave behind an incompatible routeKind override.
- Prompt-hardening relied on output sanitization. That made active generated skills clean, but raw upstream companion-stage wording in builder source still increased future regression risk.

## Verification

- Targeted Round 8 suite passed: `node --test tests/cli-parser-contract.test.cjs tests/runtime-core.test.cjs tests/skill-build.test.cjs tests/verify-work-bridge.test.cjs tests/experiment-evidence-tools.test.cjs tests/research-pipeline-cutover.test.cjs tests/runtime-shell.test.cjs tests/code-review-bridge.test.cjs tests/execute-phase-shell.test.cjs` with 370/370 passing.
- Focused workstreams regression passed: `node --test tests/workstreams-bridge.test.cjs` with 44/44 passing.
- Focused build regression passed after prompt hardening: `node --test tests/skill-build.test.cjs` with 62/62 passing.
- Full suite passed: `npm test` with 811/811 passing.
- Preview build passed: `npm run build:preview` produced 33 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Preview self-containment scans passed: active skill directories exactly matched the manifest built set, all active skills used the `ljx-GSD-*` namespace, no top-level `tools`, `templates`, or `mcp-servers` support roots remained, active generated `SKILL.md` files contained no actionable raw upstream GSD/Auto command references, and preview runtime/skills contained no `/tmp/codex-skill-repos` or `.planning/references/upstreams` source-root leaks.
- `git diff --check` passed.

## Clean Decision

Not clean. Round 8 accepted P1/P2 findings, so Stage A clean count remains 0.

## Next Round Focus

- Stage A Round 9 should start by re-running the Round 8 artifact traceability matrix end to end, then focus on places where helpers share evidence state but tests still cover only one consumer.
- Re-check generated active skills after preview rebuild, including self-contained `$ljx-GSD-*` routing, raw-token scans, and source-root leak scans.
- Keep Codex hook claims conservative: current hook tests should prove the supported Bash/current-runtime payload contract, while any future subagent/Skill tracking should use an explicit ljx-GSD adapter.
- Keep `.planning` accounting-only changes out of clean-count decisions; implementation, install, runtime, config, prompt, hook-contract, and verification behavior are the clean-count surface.
