# 01-AUTO-ARTIFACT-CONTRACTS

**Status:** build-round draft
**Evidence boundary:** Synthesized from Auto/ARIS subagent reports.

## Artifact Classes

| Class | Meaning | v2.0 treatment |
|---|---|---|
| Input artifacts | User/context inputs such as `RESEARCH_BRIEF.md`, `NARRATIVE_REPORT.md`, reference papers. | Preserve as inputs; not completion evidence. |
| Workflow artifacts | Reports/plans produced by commands, such as `IDEA_REPORT.md`, `PAPER_PLAN.md`, `EXPERIMENT_PLAN.md`. | Evidence of command work, but not necessarily control state. |
| Control-state cache | Files that record current stage or resumable loop state, such as `REFINE_STATE.json`, `REVIEW_STATE.json`, pipeline status equivalents. | May support command resume only inside the phase-local research root; not authoritative lifecycle state. |
| Primary evidence | Raw result files, logs, JSON/CSV, W&B IDs, compiled PDFs, source paths. | Required before claim/completion gates. |
| Review evidence | Raw reviewer responses, debate transcripts, improvement logs, audit reports. | Preserve raw text and machine-readable statuses. |
| Derived summaries | `findings.md`, query packs, paper summaries, narrative summaries. | Useful for context, not primary proof. |

## Authoritative v2.0 Research Root

Phase 01 chooses this artifact-root model for v2.0 framework design:

- Authoritative research command outputs live under the active phase root: `.planning/phases/<phase>/research/`.
- Auto/ARIS relative artifact shapes are preserved inside that root where useful, for example `.planning/phases/<phase>/research/refine-logs/`, `.planning/phases/<phase>/research/paper/`, and `.planning/phases/<phase>/research/rebuttal/`.
- Root-level Auto artifacts outside `.planning/` are import/export mirrors only. They cannot control GSD routing, phase completion, or resume state unless a GSD command explicitly adopts them into the phase-local research root.
- GSD lifecycle state remains owned by the normal phase lifecycle owner; research commands may request state updates through documented command contracts, not by writing canonical lifecycle files directly.

## State And Mirror Taxonomy

| State class | Writable by | Rule |
|---|---|---|
| Canonical lifecycle state | GSD lifecycle owner only | Includes `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, and phase acceptance artifacts. Writes require lock/atomic update path. |
| Phase-local research artifact | Owning research command, scoped to active phase | Lives under `.planning/phases/<phase>/research/` and can be used as command evidence if its contract is satisfied. |
| Control-state cache | Owning research command, scoped to active phase | Supports resume/loop state for one command family; cannot route phases or complete work by itself. |
| Derived mirror | Generated from canonical state or phase-local artifacts | Regenerable and not independently mutable. |
| Imported mirror | External/root Auto artifact copied or referenced into GSD | Non-authoritative until explicitly adopted into the phase-local research root by a GSD command. |

## Front-Half Artifacts

| Artifact | Producer | Consumer | Contract |
|---|---|---|---|
| `RESEARCH_BRIEF.md` | User/template | `idea-discovery`, `research-pipeline` | Detailed research context can replace one-line prompt. |
| `REF_PAPER_SUMMARY.md` | `idea-discovery` with `ref paper` | `research-lit`, `idea-creator` | Summarizes reference paper before ideation. |
| `literature/LITERATURE_EVIDENCE.md` plus source table/cache | `research-lit`, `idea-discovery`, or `research-pipeline` | `idea-creator`, novelty, refinement, user | Mandatory v2.0 evidence boundary for literature execution: records source selectors, queries, timestamps, retained source IDs/URLs/paths, accepted/rejected papers, and reading notes. Context-only output is non-evidence. |
| Literature table/landscape | `research-lit` | `idea-creator`, user | Upstream defines output shape but not stable filename; v2.0 maps it into the mandatory literature evidence bundle for reproducible handoff. |
| `references.bib` | `research-lit` when BibTeX is exported | Paper writing | Optional citation artifact. |
| `papers/` or `literature/` PDFs | User/download helpers | Literature/refinement | Source artifact, not control state. |
| `IDEA_REPORT.md` | `idea-creator` or `idea-discovery` | Refinement, experiment bridge, user | Major workflow artifact with candidates, eliminated ideas, pilots, novelty, review, proposal links. |
| `IDEA_CANDIDATES.md` | Compact mode | Downstream/recovery | Lean candidate pool, not full report. |
| `docs/research_contract.md` | Idea selection/update | Recovery, execution, paper | Focused active idea context. |
| `refine-logs/REFINE_STATE.json` | `research-refine` | `research-refine` resume | Loop control state. |
| `refine-logs/FINAL_PROPOSAL.md` | `research-refine` | `experiment-plan` | Clean final proposal. |
| `refine-logs/EXPERIMENT_PLAN.md` | `experiment-plan` | `experiment-bridge` | Claim-driven experiment design. |
| `refine-logs/EXPERIMENT_TRACKER.md` | `experiment-plan`, execution updates | Execution/recovery | Checklist/control artifact; should be paired with machine-readable state if used as control. |

## Experiment/Claim Artifacts

| Artifact | Producer | Consumer | Contract |
|---|---|---|---|
| `refine-logs/EXPERIMENT_PLAN.md` | `experiment-plan` | `experiment-bridge`, humans | Claim map, paper storyline, blocks, run order, compute/data budget, risks, checklist. |
| `refine-logs/EXPERIMENT_TRACKER.md` | `experiment-plan`, updated by bridge | Bridge, monitor, audit | Execution checklist, not permanent evidence. |
| Experiment JSON/CSV/log files | Experiment scripts/runner | Monitor, analyze, audit, result-to-claim | Primary evidence; terminal output alone is insufficient. |
| `EXPERIMENT_LOG.md` | Bridge/monitor/ablation | Review, result-to-claim, recovery | Authoritative record of what was run; must trace to raw evidence. |
| `EXPERIMENT_AUDIT.md` | `experiment-audit` | Humans/paper | Human-readable integrity audit. |
| `EXPERIMENT_AUDIT.json` | `experiment-audit` | `result-to-claim`, paper | Machine-readable audit status and per-claim impact. |
| `AUTO_REVIEW.md` | `auto-review-loop` | Review-loop recovery, paper, claim gate | Cumulative raw review evidence; raw response is primary. |
| `REVIEW_STATE.json` | `auto-review-loop` | Recovery | Latest loop control state. |
| `REVIEWER_MEMORY.md` | Hard/nightmare review loop | Next review rounds | Reviewer-owned suspicion memory; append verbatim. |
| `CLAIMS_FROM_RESULTS.md` | `result-to-claim` | Paper plan/write | Validated yes/partial/no claims. |
| `findings.md` | Multiple commands | Recovery/future planning | Knowledge log, not primary evidence. |

## Paper/Rebuttal Artifacts

| Artifact | Producer | Consumer | Contract |
|---|---|---|---|
| `NARRATIVE_REPORT.md` | User or earlier workflow | `paper-plan`, `paper-write` | Narrative input, not generated completion evidence. |
| `PAPER_PLAN.md` | `paper-plan` | `paper-figure`, `paper-write`, `paper-writing` | Central paper planning contract. |
| `figures/latex_includes.tex` | `paper-figure` | `paper-write` | Pure include snippets. |
| `figures/*.pdf`, `figures/*.png` | `paper-figure` or manual | `paper-write`, `paper-compile` | Figure assets; manual hero/architecture figures remain explicit. |
| `paper/main.tex` | `paper-write` | `paper-compile` | Main LaTeX source. |
| `paper/sections/*.tex` | `paper-write` | `paper-compile` | Section sources. |
| `paper/references.bib` | `paper-write` | `paper-compile` | Citation source; unresolved citations must remain visible. |
| `paper/math_commands.tex` | `paper-write` | `paper-compile` | Math macros. |
| `paper/main.pdf` | `paper-compile` | Improvement loop, humans | Compiled paper gate. |
| `paper/main_round0_original.pdf`, `paper/main_round1.pdf`, `paper/main_round2.pdf` | Improvement loop | Humans/comparison | Round-preserved PDFs. |
| `paper/PAPER_IMPROVEMENT_LOG.md` | Improvement loop | Humans/review | Review/fix/recompile trail. |
| `rebuttal/REVIEWS_RAW.md` | User/import | Rebuttal | Raw reviewer comments. |
| `rebuttal/ISSUE_BOARD.md` | Rebuttal | Strategy/draft | Issue decomposition. |
| `rebuttal/STRATEGY_PLAN.md` | Rebuttal | Drafting | Response strategy. |
| `rebuttal/REBUTTAL_DRAFT_v1.md` | Rebuttal | Stress test/human edit | Draft response. |
| `rebuttal/PASTE_READY.txt` | Rebuttal | Submission | Character-limited paste-ready text. |
| `rebuttal/REBUTTAL_DRAFT_rich.md` | Rebuttal | Human/archive | Richer draft. |
| `rebuttal/MCP_STRESS_TEST.md` | Rebuttal | Follow-up | External stress-test record. |
| `rebuttal/FOLLOWUP_LOG.md` | Rebuttal | Follow-up rounds | Follow-up tracking. |

## State Ownership Rule

v2.0 should not let Auto/ARIS root files become authoritative lifecycle state. If a research artifact controls resume/routing, it must:

- live under the active phase's `.planning/phases/<phase>/research/` root,
- identify the producing command and owning lifecycle phase,
- remain separate from canonical GSD `STATE.md`/`ROADMAP.md` writes unless the lifecycle owner performs the update,
- treat any root-level Auto copy as imported/non-authoritative until explicit adoption.
