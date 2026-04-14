# v1.4 Stage A Round 4 Candidates

**Status:** triaged
**Round type:** regular skill review

## Review Inputs

- Six focused subagent reviews for self-contained install/runtime closure, prompt fidelity, Codex adapter variables, file/artifact traceability, lifecycle gates, and workspace/workstream behavior.
- Local second-pass confirmation against upstream GSD/Auto references, generated preview install output, active skill scans, and current Codex runtime evidence.
- Full-suite verification after targeted fixes, including install preview regeneration and active-surface raw invocation scan.

## Accepted Findings

| Candidate | Severity | Decision | Notes |
| --- | --- | --- | --- |
| Codex conversion and preserved Auto support material still depended on unproven `CODEX_PROJECT_DIR`/sample `codex_thread_id` assumptions. | P2 | Accepted as V14-038 | Active hook support must use hook `cwd`/`PWD`; archived examples must not preserve a sample thread id that could be copied into real runs. |
| A self-contained workspace administration surface was missing. | P2 | Accepted as V14-039 | `ljx-GSD` needed a bridge-ready internal workspace admin command instead of relying on upstream GSD workspace skills. |
| Shared research CLI/config plumbing still missed specific umbrella pipeline controls and invalid separated boolean handling. | P2 | Accepted as V14-040 | Included `--stop-condition`, research-pipeline knobs, and parser strictness for separated invalid booleans. |
| User-facing docs still exposed raw upstream commands in actionable skill guide/interface slots. | P3 | Accepted as V14-041 | Docs-only by itself, but the guide can train the agent/user toward raw GSD/Auto calls. |
| Dependency-phase research evidence was not consistently available to experiment evidence, pause/resume handoff, and rebuttal context. | P2 | Accepted as V14-042 | Downstream analysis/rebuttal could miss evidence produced in upstream research phases. |
| Migration known-artifact coverage still missed Auto novelty, review-loop, and ablation outputs. | P2 | Accepted as V14-043 | Migration could classify common Auto research outputs as residue instead of canonical evidence. |
| Paper-pipeline routing could advance to downstream paper/rebuttal/next paths without supported claim evidence. | P2 | Accepted as V14-044 | Paper writing should not harden unsupported claims when `result-to-claim` / claim gate evidence is absent or stale. |
| Workstream progress could count summary table completion as complete while the authoritative phase record remained active. | P2 | Accepted as V14-045 | Progress summaries must not contradict structured state. |
| Runtime config validation rejected legitimate research bridge values for claim score scale and W&B observability. | P2 | Accepted as V14-046 | `0-5` claim scoring and boolean `wandb_enabled` are normal research workflow inputs. |
| `experiment-bridge` and `rebuttal` prompt floors still lacked some concrete Auto task-quality controls. | P2 | Accepted as V14-047 | Prompt quality must preserve upstream task behavior, not only route through the right helper. |
| Roadmap admin mutations could proceed while a secondary workstream was active. | P2 | Accepted as V14-048 | Root roadmap mutation must stop unless the primary/mainline context is active. |
| Review-loop and paper-pipeline state writers did not consistently carry CLI/config overrides into context reads. | P2 | Accepted as V14-049 | State writes could use default settings while the caller supplied valid override settings. |
| Malformed dependency phase records were not explicitly regression-tested as surfaced context issues. | P3 | Accepted as V14-050 | Behavior now preserves current phase context while reporting the damaged dependency record. |

## Rejected Or Deferred Watch Items

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Raw upstream slash commands inside internal upstream Auto archive docs. | Rejected as runtime bug | The archive intentionally preserves upstream reference material; active generated `skills/ljx-GSD-*` and runtime files scanned clean. |
| Official web evidence for Codex hook env names. | Watch | Official web search did not expose stable hook env names; local Codex binary/app evidence found `CODEX_THREAD_ID` but not `CODEX_PROJECT_DIR`/`CODEX_SESSION_ID`, so the implementation uses hook `cwd`/`PWD` and optional `CODEX_THREAD_ID`. |
| `.planning` accounting-only updates. | Not clean-impacting | They do not change runtime behavior unless they affect routing/config/artifact contracts. |
