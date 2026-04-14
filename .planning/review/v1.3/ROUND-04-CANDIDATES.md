# v1.3 Stage 1 Round 4 Candidate Findings

**Round:** Stage 1 Round 4
**Date:** 2026-04-12
**Scope:** post-Round-3 static/implementation review with stricter prompt-fidelity and Codex-conversion checks.
**Clean-count rule:** `.planning` accounting-only changes are ignored; skill/runtime/prompt behavior defects still reset clean count.

## Review Inputs

- Aristotle: research-pipeline policy, stage handoff, malformed-config behavior.
- Mendel: runtime state transactionality, workstream state, summary/code-review routing.
- Hilbert: Codex conversion correctness, active generated surface, hook/schema/path conversion.
- Locke: generated prompt fidelity and `ljx-GSD-*` self-containment.
- Hubble: quality gates, code-review fallback scope, Stage 2 scenario readiness.
- Curie: original planned skill content parity and current public surface coverage.

## Accepted Findings

| Candidate | Severity | Disposition | Evidence | Fix Direction |
| --- | --- | --- | --- | --- |
| Phase-record `workflow_overrides.human_checkpoint=false` did not mirror into `research.review_loop.human_checkpoint`. | P2 | accepted as V13-031 | Aristotle repro and local red tests showed proposal top-level `humanCheckpoint=false` while `reviewLoop.humanCheckpoint` stayed true. | Mirror phase workflow override into the review-loop setting and test both runtime config and research-pipeline handoff. |
| Malformed `.planning/config.json` still allowed research-pipeline proposal generation. | P3 | accepted as V13-032, no independent reset | Aristotle repro: proposal returned `ok:true` with defaults while apply later failed. | Fail closed at proposal time with `invalid_config_json`, no operations, and route to `ljx-GSD-progress`. |
| Research-pipeline stage handoff metadata was still too sparse for non-analysis stages. | P3 | accepted as V13-033, no independent reset | Round 4 coverage expansion showed created records did not preserve global reviewer/model/budget policy consistently across stage handoffs. | Include global policy fields in the typed stage handoff and expand persisted handoff assertions. |
| `resumeFromHandoff` wrote resumed `STATE.md` before entering the cleanup rollback transaction. | P1 | accepted as V13-034 | Mendel repro and local red test left `STATE.md` as `PARTIAL RESUME STATE` when the write failed before handoff cleanup. | Move the state write into the rollback-protected block and restore original state/handoffs on any failure. |
| Session-local active workstream state masked a legacy shared active pointer. | P2 | accepted as V13-035 | Mendel repro and local red test: shared `active-workstream=alpha` plus session `alpha` allowed `create beta`, then non-session list saw a conflict. | During create, inspect the shared legacy pointer independently and block only true legacy shared active pointers without blocking structured workstreams. |
| `ljx-GSD-experiment-bridge` dropped accepted Auto `BASE_REPO` and `COMPACT` behavior. | P2 | accepted as V13-036 | Locke compared upstream Auto and generated helper/prompt: helper omitted `baseRepo`, `compactMode`, `IDEA_CANDIDATES`, `EXPERIMENT_LOG`, and adjacent execution fields. | Add helper fields/context discovery and prompt quality text for `baseRepo/base_repo`, `compactMode`, `defaultSeeds`, `codeSyncMethod`, and `wandbEnabled`. |
| Code-review git fallback under-scoped multi-commit phases when no SUMMARY scope exists. | P2 | accepted as V13-037 | Hubble compared upstream GSD range semantics and local red test: two `fix(13): ...` commits yielded only the newest file. | Union files from all matching phase-tagged commits while still excluding unrelated dirty files. |

## Rejected Or Watch Candidates

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Existing symlinked summary-scope files force progress to route to code-review while code-review helper rejects the same files. | rejected after local repro attempt | The local `readProjectSnapshot` repro with an existing symlinked `src/analyze.py` routed to `ljx-GSD-verify-work`, not `ljx-GSD-code-review`; existing code-review helper tests already reject symlinked implementation paths. Keep as covered path-safety regression, not an accepted Round 4 bug. |
| Generated `ljx-GSD-*` prompts internally call raw GSD/Auto skills. | rejected | Hilbert and Locke both found raw invocation scans clean for generated `ljx-GSD-*` prompts; build tests cover the scanner. |
| Managed upstream Auto skills remain installed as top-level managed support inventory. | watch / policy evidence | This is still an active product-policy question, but generated `ljx-GSD-*` prompts do not call raw Auto skills. Stage 2 must force exact `ljx-GSD-*` execution-chain reporting. |
| `AskUserQuestion` / `Task` Codex adapter exact schema needs live validation. | watch | Static adapter text matches current expected names, but Stage 2 transcripts should confirm actual subagent/user-input chain behavior. |
| `analyze-results` internal-stage parity is implicit in built prompts. | watch / Stage 2 evidence | Curie found no static manifest-surface defect, but Stage 2 result-analysis scenarios must prove result analysis is not degraded or routed through raw Auto skills. |
| Code-review artifact schema and fix-loop routing may diverge in live use. | watch / Stage 2 evidence | Static helpers already cover malformed schema and upstream-style parsing; Stage 2 should force a live defect review and confirm routing to `ljx-GSD-code-review-fix`. |
| Verify-work may collapse into SUMMARY-only review in live use. | watch / Stage 2 evidence | Static prompt floor and helper blocks are favorable; Stage 2 must grade goal-backward/UAT artifacts explicitly. |
