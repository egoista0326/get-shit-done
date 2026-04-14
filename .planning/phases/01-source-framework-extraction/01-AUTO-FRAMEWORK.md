# 01-AUTO-FRAMEWORK

**Status:** build-round draft
**Evidence boundary:** Synthesized from Auto/ARIS front-half, experiment/claim, and paper/rebuttal/tooling subagent reports.

## Core Shape

Auto/ARIS is a plain-file, skill-composed research harness. Its behavior source of truth is each skill's `SKILL.md`, while `AGENT_GUIDE.md` is a routing index.

It is not built around typed phases. Subagents found no `phase_type` references in the Auto/ARIS source tree. Workflows compose through standalone skills/commands and artifact handoff.

## Workflow Families

| Family | Upstream command/skill surface | Core outputs | v2.0 GSD integration stance |
|---|---|---|---|
| Literature and idea discovery | `research-lit`, `idea-creator`, `novelty-check`, `research-review`, `research-refine`, `research-refine-pipeline`, `research-pipeline`, `idea-discovery` | `IDEA_REPORT.md`, literature table/landscape, novelty report, `refine-logs/FINAL_PROPOSAL.md`, `refine-logs/EXPERIMENT_PLAN.md` | Expose as standalone `gsd` commands; preserve `research-pipeline` as an auditable wrapper if kept. |
| Experiment and claim chain | `experiment-plan`, `experiment-bridge`, `run-experiment`, `monitor-experiment`, `analyze-results`, `experiment-audit`, `auto-review-loop`, `result-to-claim`, `ablation-planner`, `training-check` | `EXPERIMENT_PLAN.md`, `EXPERIMENT_TRACKER.md`, raw JSON/CSV/logs, `EXPERIMENT_LOG.md`, `EXPERIMENT_AUDIT.*`, `AUTO_REVIEW.md`, `CLAIMS_FROM_RESULTS.md`, ablation plan | Expose command family; require evidence files before claim/completion gates. |
| Paper and rebuttal | `paper-plan`, `paper-writing`, `paper-write`, `paper-figure`, `paper-compile`, `auto-paper-improvement-loop`, `rebuttal`, `paper-slides`, `paper-poster` | `PAPER_PLAN.md`, figures, `paper/main.tex`, `paper/main.pdf`, `PAPER_IMPROVEMENT_LOG.md`, `rebuttal/*` | Expose paper commands; preserve relative artifact shapes under the phase-local research root unless an explicit import/export mirror is used. |
| Support tools | `research-wiki`, MCP reviewer bridges, watchdog, smart update, templates/hooks | `research-wiki/`, graph edges, query packs, reviewer sessions, watchdog state, templates | Optional support infrastructure; not a second control plane. |
| Reviewer overlays | Codex-native skills, Gemini review overlay, Claude review overlay, generic/LLM/MiniMax review loops | Review requests/status, raw review responses, reviewer memory | Treat as backend adapters, not separate workflow semantics. |

## Front-Half Framework

Extracted flow:

```text
research-lit
  -> idea-creator
  -> novelty-check
  -> research-review
  -> research-refine-pipeline
  -> experiment-plan
```

Important contracts:

- `RESEARCH_BRIEF.md` can supersede a one-line prompt as primary context.
- `ref paper` can generate `REF_PAPER_SUMMARY.md` before literature search and ideation.
- Valid literature source selectors are `zotero`, `obsidian`, `local`, `web`, `deepxiv`, and `all`; Semantic Scholar is folded into `web`, not a standalone selector.
- `deepxiv` remains an explicit opt-in source beyond the default `all` behavior unless v2.0 intentionally changes and documents that policy.
- `idea-discovery` completion requires literature retrieval/reading evidence. Writing context, state, or an idea report without retained literature-source evidence is non-evidence.
- Novelty checks are claim-based and cross-verified.
- Refinement freezes a Problem Anchor and iterates until score threshold or max rounds.
- `IDEA_REPORT.md` is a major workflow artifact, not control state.

## Experiment/Claim Framework

Extracted chain:

```text
experiment-plan
  -> experiment-bridge
  -> run-experiment
  -> monitor-experiment
  -> analyze-results
  -> experiment-audit
  -> auto-review-loop
  -> result-to-claim
  -> ablation-planner
```

Important contracts:

- Experiment planning is claim-first: claims, anti-claims, and minimum convincing evidence are frozen before experiments.
- Every experiment block needs claim tested, dataset/split/task, systems, metrics, setup, success criterion, failure interpretation, and paper target.
- Code review before GPU spend is required in upstream bridge semantics.
- Sanity-first execution precedes full suite.
- Raw JSON/CSV/log files and W&B IDs/URLs are evidence; Markdown summaries alone are not sufficient.
- Experiment audit is independent and advisory by default, but downstream claim confidence must reflect audit failures or absence.
- `result-to-claim` converts results into yes/partial/no support and gates paper claims.
- Ablations are reviewer-led and must specify what is tested and expected if the component matters.

## Paper/Rebuttal Framework

Extracted paper flow:

```text
paper-plan
  -> paper-figure
  -> paper-write
  -> paper-compile
  -> auto-paper-improvement-loop
```

Extracted rebuttal flow:

```text
reviews raw input
  -> issue board
  -> strategy plan
  -> draft rebuttal
  -> stress test
  -> paste-ready response
```

Important contracts:

- `paper-writing` is a wrapper; `PAPER_PLAN.md` and paper source files are the content contracts.
- `paper-write` handles venue-specific LaTeX, citations, style, stale files, and AI-ism removal.
- `paper-compile` validates PDF, references, citations, page limits, fonts, and stale files.
- `auto-paper-improvement-loop` preserves round PDFs and a paper improvement log.
- Rebuttal is text-only and does not edit or upload a revised PDF.
- No standalone `paper-review` command was found by the paper lane; camera-ready behavior exists through venue/anonymity settings, and `paper-slides` / `paper-poster` are explicit post-acceptance follow-ons.

## Reviewer And Tooling Framework

Reviewer independence is a hard invariant:

- Pass file paths and raw artifacts to reviewers where possible.
- Preserve raw reviewer responses as primary records.
- Keep reviewer transport swappable: secondary Codex, Gemini bridge, Claude bridge, generic OpenAI-compatible, MiniMax.
- Preserve async `review_start` / `review_status` style for long review tasks.
- Effort affects breadth/depth, not reviewer quality, citation integrity, or experiment integrity.

Support tools:

- `research-wiki` stores papers, ideas, experiments, claims, and graph edges. Its graph edge file is relationship source of truth if imported.
- `watchdog.py` tracks process/GPU/download liveness and status. It is not evidence for research claims.
- `smart_update.sh` is a safe skill update utility and not workflow semantics.

## v2.0 Integration Rule

Auto/ARIS capabilities should become standalone `gsd` commands and artifact contracts. Authoritative v2.0 research outputs should live under the active phase's `.planning/phases/<phase>/research/` root, preserving Auto's relative artifact shapes where useful. Root Auto artifacts are import/export mirrors only unless a GSD command explicitly adopts them into the phase-local research root. Research commands should not create a second lifecycle control plane, should not use root Auto artifacts as authoritative state, and should not require `phase_type` or typed routing.
