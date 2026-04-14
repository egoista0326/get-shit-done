# v1.2 Round 03 Candidate Intake

**Date:** 2026-04-12
**Purpose:** re-review after Round 2 fixes, with explicit attention to the user-added requirement that the entire `ljx-GSD` generated skill surface must be internally self-contained and must not call raw GSD or Auto skills.

## Candidate Matrix

| Lane | Source | Candidate | Disposition |
| --- | --- | --- | --- |
| Docs/accounting | subagent + local docs-contract review | Round 3 code fixes were ahead of the control-plane mirrors; v1.2 state still routed to Round 3 pending and did not yet record the Round 3 findings/fixes. | confirmed as V12-027 |
| Codex/MiniMax conformance | subagent + local converter tests | `auto-review-loop-minimax` inherited a `message` payload form for MiniMax MCP calls, while the active schema requires prompt-style payloads. | confirmed as V12-016 |
| llm-chat converter conformance | subagent + local converter fixture | The llm-chat converter could rewrite non-tool `message`, `model`, and `reasoning_effort` fields outside actual MCP tool blocks. | confirmed as V12-016 |
| Self-contained invocation coverage | user addendum + local test design | The generated-skill self-containment scan missed bare imperative prompt references such as `Run gsd-progress`, `delegate to run-experiment`, and `continue with auto-review-loop`. | confirmed as V12-017 |
| Self-contained invocation coverage | user addendum + local test design | The generated-skill self-containment scan used a static upstream denylist and did not derive forbidden raw slash commands from the installed upstream skill inventory. | confirmed as V12-017 |
| Prompt capability preservation | subagent + upstream Auto comparison | `ljx-GSD-experiment-bridge` kept execution/audit routing but did not preserve Auto's pre-deploy cross-model experiment-code review gate in the internal prompt-quality floor. | confirmed as V12-018 |
| Code-review-fix lifecycle | subagent + local state-machine tests | `ljx-GSD-code-review-fix` could reopen terminal capped review states or pending review-loop closure states instead of stopping or routing back to code-review. | confirmed as V12-019 |
| Code-review scope safety | subagent + local symlink test | Code-review summary scope followed symlinked implementation files, conflicting with later lstat-based freshness and artifact rules. | confirmed as V12-020 |
| Verify-work freshness | subagent + local sync test | Verify-work sync omitted required code-review artifacts from persisted freshness evidence. | confirmed as V12-021 |
| Verify-work evidence safety | subagent + local symlink test | Verify-work accepted symlinked lifecycle execution evidence as direct execution evidence. | confirmed as V12-022 |
| Migration path safety | subagent + local cutover test | Migration import missed exact dangling-symlink backup-root collisions. | confirmed as V12-023 |
| Migration state-family safety | subagent + local cutover test | Suggested-branch helpers mishandled dangling `.planning/state/migration` symlinks. | confirmed as V12-024 |
| Pause/resume lifecycle | subagent + local runtime-shell test | Markdown-only handoff residue could keep a resumed project routed as paused. | confirmed as V12-025 |
| Workstreams path safety | subagent + local workstream test | Read-only workstream commands treated dangling `.planning/workstreams` symlinks as absent. | confirmed as V12-026 |
| Source-template raw upstream literals | subagent | Some source templates still contain raw upstream skill words before postprocessing. | mitigated / monitor; generated preview scan is the install-surface guard |

## Round 3 Self-Contained Test Addendum

Round 3 makes the user's self-contained-skill requirement a dedicated regression class, not only a grep check. The accepted test class must prove:

- generated `ljx-GSD-*` skills do not call raw GSD/Auto skills through `$...` mentions
- generated `ljx-GSD-*` skills do not call raw GSD/Auto skills through `/slash` forms, including slash-colon GSD aliases
- generated `ljx-GSD-*` skills do not call raw GSD/Auto skills through bare imperative prompt language
- forbidden raw skill names are derived from the installed upstream skill inventory, not only from a static list
- allowed orchestration routes remain internal `ljx-GSD-*` routes, while preserved upstream Auto skills can still exist as converted reference/support assets outside the `ljx-GSD-*` control surface

## Notes

- Round 3 is not clean because it confirmed normal-use P1/P2 issues.
- The prompt-fidelity lane deliberately rejected "self-contained but lower quality" as insufficient.
- The Codex conformance lane treated active MCP schema correctness as part of capability preservation, because a preserved skill that cannot call its backend is a functional deletion.
