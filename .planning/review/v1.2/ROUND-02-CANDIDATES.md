# v1.2 Round 02 Candidate Intake

**Date:** 2026-04-12
**Purpose:** re-review after Round 1 fixes using the upgraded review protocol and the user-added self-contained-skill constraint.

## Candidate Matrix

| Lane | Source | Candidate | Disposition |
| --- | --- | --- | --- |
| Docs/state/accounting | subagent + local verification | Canonical `.planning/STATE.md`, `.planning/ROADMAP.md`, and `.planning/PROJECT.md` still describe v1.1 Round 11 capped-not-clean as current instead of v1.2 Round 1 fixed-not-clean / Round 2 active. | confirmed |
| Self-contained invocation coverage | user addendum + local test design | The generated-skill self-containment scan misses raw `/gsd`, `/gsd:next`, and `/paper-writing` slash-command forms. | confirmed |
| Prompt capability preservation | subagent + upstream Auto comparison | `ljx-GSD-experiment-bridge`, `ljx-GSD-review-loop`, and `ljx-GSD-paper-pipeline` became self-contained but compressed some original Auto run-experiment and paper-planning prompt details. | confirmed |
| Claude Code -> Codex / llm-chat conformance | subagent + local verification | Active `auto-review-loop-llm` uses `message: |` for `mcp__llm-chat__chat`, but the llm-chat MCP server schema requires `prompt`. | confirmed |
| Claude Code -> Codex / support converter | subagent + local dry-run | `convert_skills_to_llm_chat.py` treats prose mentions of `spawn_agent`/`send_input` as active tool blocks and rewrites bridge-adapter documentation. | confirmed |
| Verify-work gate semantics | subagent + local verification | `ljx-GSD-verify-work` does not block terminal or pending code-review-loop states when a ready verification artifact exists. | confirmed |
| Migration compatibility | subagent + local verification | Release rejects older backup manifests that lack `source_session` even when all other provenance fields still bind the backup to the session. | confirmed |
| Source-template/postprocess maintainability | subagent | Self-contained fixes rely on a postprocess guard over generated skills rather than refactoring every base template string. | mitigated / monitor |

## Notes

- The self-contained addendum is now a first-class Round 2 lane, not a side note.
- The prompt-capability lane intentionally checks quality-preservation phrases, not only absence of raw upstream invocations.
- The converter lane distinguishes actual Codex tool blocks from prose examples because ljx-GSD bridge prompts intentionally document adapter shapes.
