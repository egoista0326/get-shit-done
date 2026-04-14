# v1.4 Stage A Round 3 Candidates

**Status:** triaged
**Round type:** regular skill review

## Review Inputs

- Six focused subagent reviews from prompt parity, artifact traceability, Codex variables/CLI, self-containment, lifecycle gates, and docs/scanner coverage.
- Local second-pass inspection against upstream GSD/Auto references, accepted `ljx-GSD` design docs, generated preview install output, and helper tests.
- Worker patch review for code-review/verify gate persistence.

## Accepted Findings

| Candidate | Severity | Decision | Notes |
| --- | --- | --- | --- |
| Raw `$meta-optimize` reference remained in converted Auto hook support text. | P2 | Accepted as V14-028 | Active/generated support text could nudge a raw upstream skill call. |
| Restored Auto Research knobs were missing or only partially wired through CLI/config/handoff contexts. | P2 | Accepted as V14-029 | Covered `effort`, pilot budgets, baseline families, seeds, scope caps, primary-claim scope, and rebuttal quick mode. |
| Phase contexts did not consistently carry upstream phase-local research artifacts across dependencies. | P2 | Accepted as V14-030 | Experiment/analysis phases could miss refine/discovery evidence produced in depended-on phases. |
| Direct phase helpers could keep operating while migration release remained blocked. | P2 | Accepted as V14-031 | Migration-blocked state must stop normal lifecycle/direct helper routing. |
| `EXPERIMENT_AUDIT.json` was not fully canonicalized, and phase-local Markdown audit compatibility could be misclassified as root Auto fallback. | P2 | Accepted as V14-032 | JSON needed to be the active ljx audit path while phase-local MD still blocks; root Auto remains compatibility evidence. |
| Code-review/fix/verify gate states could route forward while review-loop closure or post-fix rerun state was still unresolved. | P2 | Accepted as V14-033 | Included empty-scope persisted blockers, terminal/pending review states, and recommend rerun policy. |
| Generated prompt floors still missed concrete Auto-quality knobs for discovery/refine/experiment/rebuttal. | P2 | Accepted as V14-034 | Runtime flow could work while prompt/task quality was lower than upstream intent. |
| `research-pipeline` CLI parsing was looser than other helper CLIs. | P2 | Accepted as V14-035 | Unknown flags and partial integers could be silently misread as topic text or accepted values. |
| Handoff/required-reading collection omitted several Auto research, paper, and rebuttal artifacts. | P2 | Accepted as V14-036 | Resume/review agents could miss prior research outputs. |
| User-facing docs still had raw/actionable upstream stage wording or omitted restored canonical parameters. | P3 | Accepted as V14-037 | Docs-only by itself, but contract tests were added to prevent regression. |

## Rejected Or Deferred Watch Items

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Missing public physical workspace command. | Stage B watch | Current accepted public surface documents `workstreams` as logical branches and says physical workspace is separate. Upstream snapshot in this repo has only command shells for workspace workflows, not the workflow files. Scenario review must verify ljx-GSD does not call raw GSD workspace skills and reports the boundary honestly. |
| `.planning` accounting updates. | Not clean-impacting | They do not change runtime behavior unless they affect routing/config/artifact contracts. |
| Internal upstream archive raw strings. | Not a runtime bug | Internal archived upstream material is allowed if active generated `ljx-GSD-*` skills and runtime paths remain self-contained. |

