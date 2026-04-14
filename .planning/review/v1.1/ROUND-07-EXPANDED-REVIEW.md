# v1.1 Round 07 Expanded Review

**Date:** 2026-04-12
**Scope:** Fresh post-Round06 review plus the user-requested Claude Code -> Codex conversion audit.
**Status:** Not clean; confirmed issues fixed; clean streak remains 0.

## Review Inputs

- Current implementation after Round 06 fixes.
- User constraint added during Round 07: do not only verify that flows run; verify that specific skill prompts preserve GSD/Auto task quality and do not delete upstream capabilities.
- User constraint added during Round 07 addendum: because both GSD and Auto started from Claude-oriented implementations, verify the official upstream Codex conversion and ljx-GSD's use of it, including paths, hooks, MCP/config interfaces, and Codex subagent semantics.
- Active generated preview from `node bin/install.js --preview`.
- Upstream reference trees under `.planning/references/upstreams/`.
- Review rubric, strict matrix, bug ledger, and Phase 20 artifacts.

## Review Lanes

| Lane | Result |
|------|--------|
| Quality gates and lifecycle routing | Confirmed pending clean-round states and directory-masquerade artifacts still needed tighter handling; confirmed material post-execute code changes needed code-review routing. |
| Code-review scope | Confirmed latest-summary-only scope and git fallback could miss or misattribute phase code changes. |
| Migration safety | Confirmed backup provenance, symlink containment, duplicate-source-family, and stale-copy ordering problems. |
| Pause/resume/runtime profile | Confirmed `automation_profile: autonomous` was not strong enough and pause/resume needed idempotent workstream-aware handling. |
| Prompt fidelity | Confirmed review-loop difficulty, reviewer independence, source policy, experiment-audit, result-to-claim, ablation, and execute routing text needed further preservation. |
| Claude -> Codex conformance | Confirmed active Auto skills mostly ignored official `skills/skills-codex`, hook templates were Claude JSON, MCP config text used `settings.json`, `claude-review` was active, and active prompts contained stale tool/interface names. |

## Subagent Addendum

Two read-only agents independently reviewed the Claude Code -> Codex conversion surface:

- Carver: checked upstream/reference conversion correctness and active preview drift against `.claude`/`.codex`, skill invocation, MCP/hook schema, helper paths, and Claude-only assumptions.
- Cicero: checked ljx-GSD runtime/install/hook/interface Codex conformance, including `$skill`, SKILL frontmatter, install path layout, hook JSON/TOML shape, helper paths, and test coverage.

Both agents returned "not clean" findings. Their overlapping high-confidence conclusions were accepted after local source and preview inspection.

## Confirmed Findings

| ID | Severity | Finding | Confirmation | Fix |
|----|----------|---------|--------------|-----|
| BUG-036 | P2 | Research-pipeline reuse could treat uncertain/inferred stage matches as safe formal reuse. | Local review confirmed explicit and inferred stage evidence were not separated strongly enough. | Split match classification and routed uncertain/conflicting matches through repairs. |
| BUG-037 | P2 | Exact review/verification artifact paths could be directories. | Directory-masquerade regressions reproduced the type gap. | Required regular files for exact gate artifacts. |
| BUG-038 | P2 | Pending clean-round states could be missed when serialized under alternate fields. | Gate helper review found pending tokens were not normalized across `status`, `verdict`, and related fields. | Added normalized pending-token classification. |
| BUG-039 | P2 | Material post-execute code changes could skip code review. | Phase summary `key_files` with source paths did not force code-review routing. | Added material-scope classification before post-execute recommendations. |
| BUG-040 | P2 | Migration backup manifest provenance was under-validated. | Forged session/family/source fields could satisfy presence checks. | Required matching manifest/session/family/source provenance. |
| BUG-041 | P2 | Migration backup proof could escape via symlinked roots or evidence files. | lstat/realpath containment checks were incomplete. | Added safe path and backup-contained proof validation. |
| BUG-042 | P2 | Migration import could dirty-copy before later preflight failures. | Duplicate source-family and state-family path checks happened too late. | Moved validation before copying and returned structured stops. |
| BUG-043 | P2 | Code-review scope could miss earlier phase summaries or use unrelated git fallback. | Scope resolution was latest-summary biased and git fallback was not phase-proven. | Merged all matching phase summaries and made fallback fail closed. |
| BUG-044 | P2 | `automation_profile: autonomous` was mostly inert. | Runtime config did not materialize autonomous defaults before workflow logic. | Added autonomous profile preset with explicit canonical-key precedence. |
| BUG-045 | P2 | Pause/resume could lose handoff or workstream context. | Re-pausing overwrote state and resume did not require the handoff workstream to be active. | Added idempotent pause and active-workstream validation. |
| BUG-046 | P1/P2 | Generated prompts still risked quality/capability deletion. | Prompt inspection found missing reviewer difficulty, audit handoff, source policy, ablation grounding, and execute next-route fidelity. | Repaired research prompt builders and build-time quality floors. |
| BUG-047 | P1 | Active Auto skills mostly ignored official upstream Codex sources. | Build code only whitelisted `paper-writing`; preview used older `mcp__codex__codex` review surfaces. | Prefer official `skills/skills-codex` when present, with explicit capability-preservation opt-outs. |
| BUG-048 | P1/P2 | Active hook template was Claude JSON and referenced `.codex/settings.json`. | Preview installed `templates/claude-hooks/meta_logging.json` with nested Claude hook shape. | Generate `templates/codex-hooks/meta_logging.toml` with `[[hooks]]` entries and `.codex/config.toml` instructions. |
| BUG-049 | P2 | `claude-review` MCP server was active top-level install content. | Preview manifest and top-level MCP tree included the Claude CLI wrapper as an active server. | Move it to `ljx-gsd/upstream-auto/` as reference-only material. |
| BUG-050 | P2/P3 | Active prompts contained stale interface vocabulary (`WebSearch`, `WebFetch`, `mcp__codex__codex`, `wait(ids)`, `close_agent(id)`). | Active preview grep confirmed stale strings in skills and GSD adapter text. | Added converter rewrites and adapter wording aligned with Codex subagent flow. |
| BUG-051 | P3 | Runtime accepted `CLAUDE_SESSION_ID` as live Codex session identity. | Runtime scan order still included the Claude variable. | Removed it from default resolution and added Codex/Claude env regressions. |

## Capability-Preservation Notes

Not every official upstream Codex source was used blindly. Two official Codex sources currently drop important base Auto behavior:

- `research-lit`: official Codex source omits the base Semantic Scholar and research-wiki flow.
- `run-experiment`: official Codex source omits the base Vast.ai and Modal/serverless branches.

Those are explicit opt-outs in the active installer. The richer base source is still passed through the Codex converter, preserving capability while avoiding stale Claude paths/tool names.

## Verification After Fixes

Targeted commands run after Round 07 fixes:

- `node --check bin/lib/codex-conversion.cjs && node --check bin/lib/build-skills.cjs && node --test tests/skill-build.test.cjs`
- `node bin/install.js --preview`
- Active preview grep over `.build/codex-preview/skills`, `.build/codex-preview/templates`, and `.build/codex-preview/mcp-servers` for `settings.json`, `claude-hooks`, `meta_logging.json`, `wait(ids)`, `close_agent(id)`, `WebSearch`, `WebFetch`, `mcp__codex__codex`, and `mcp__codex__codex-reply` returned no matches.
- `node --check bin/lib/ljx-runtime-core.cjs && node --test tests/runtime-core.test.cjs tests/workstreams-bridge.test.cjs tests/review-loop-bridge.test.cjs tests/execute-phase-shell.test.cjs tests/code-review-bridge.test.cjs tests/verify-work-bridge.test.cjs tests/migration-cutover.test.cjs tests/skill-build.test.cjs` -> 219/219 pass, 8 suites.
- `node --test tests/*.test.cjs` -> 603/603 pass, 39 suites.

## Clean-Round Accounting

Round 07 is not clean because it confirmed and fixed issues. The clean streak remains 0.

This report's original next-step expectation was superseded by Round 08 through Round 11, which found and fixed additional issues. Current clean-round accounting is in `REVIEW-LOOP-STATE.md` and `ROUND-11-FINAL-REVIEW.md`.
