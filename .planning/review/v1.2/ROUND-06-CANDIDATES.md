# v1.2 Round 6 Candidate Intake

**Date:** 2026-04-12
**Round:** 6 of 6
**Protocol:** v1.2 post-cap strict review; two consecutive clean rounds required for success; minor-only rounds may count clean, but this round had non-minor findings.

## Review Lanes

- Self-contained skill surface and generated builder/preview invariants.
- Prompt-fidelity preservation against upstream Auto/ARIS behavior.
- Claude Code to Codex conversion correctness for generated skills, support docs, hooks, and MCP examples.
- Runtime/path/lifecycle safety, especially symlink and atomic-write boundaries.
- Quality gate and evidence ownership consistency.
- Docs/accounting/state mirror consistency.

## Candidate Findings

| Candidate | Source | Initial Severity | Status |
| --- | --- | --- | --- |
| Requirements and task-plan accounting still carried Round 5 / stale v1.1 wording. | Docs/accounting review | P2/P3 | Confirmed as V12-053/V12-054 and fixed. |
| `ljx-GSD-result-to-claim` omitted Auto's unsupported-claim pivot path. | Prompt-fidelity review | P2 | Confirmed as V12-055 and fixed. |
| `previewConvertAutoSkill()` let caller-provided maps override ljx-GSD internal routing. | Self-contained review | P2 | Confirmed as V12-056 and fixed. |
| Converted upstream Auto support docs still showed Claude JSON config, Claude install commands, `claude` launch commands, or Anthropic Claude docs as Codex setup. | Codex-vs-Claude review | P2 | Confirmed as V12-057 and fixed. |
| Generated meta-opt `log_event.sh` still detected only legacy `mcp__codex__*` agent calls. | Codex-vs-Claude review | P3 | Confirmed as V12-058 and fixed. |
| Roadmap admin add/remove accepted a symlinked `.planning/phases` root and could write/delete outside the project. | Runtime/path review | P1 | Confirmed as V12-059 and fixed. |
| Verify-work freshness could treat a summary scope under a symlinked parent as fresh when code-review rejects that same scope. | Quality-gate review | P1 | Confirmed as V12-060 and fixed. |
| Paper/rebuttal readiness trusted symlinked exact artifacts such as `PAPER_PIPELINE.md` and `PASTE_READY.txt`. | Evidence ownership review | P2 | Confirmed as V12-061 and fixed. |
| Rebuttal workspace and review-source discovery followed symlinked directories/files and could allow outside inputs/state writes. | Evidence ownership review | P1 | Confirmed as V12-062 and fixed. |

## Second-Pass Notes

- The result-to-claim finding was confirmed against upstream Auto `result-to-claim`, which explicitly routes `claim_supported: no` to postmortem plus pivot or alternative approach.
- The self-contained finding was confirmed as a helper-level bypass rather than a current preview-output leak; fixing it still matters because future callers could generate raw upstream `$idea-discovery` / `$run-experiment` routes.
- The Codex/Claude doc findings were limited to converted upstream support docs; archived raw reference trees remain allowed when clearly not active setup instructions.
- The symlink findings were reproduced through tests or by subagent temp repros and affect normal helper safety, not only theoretical edge cases.

