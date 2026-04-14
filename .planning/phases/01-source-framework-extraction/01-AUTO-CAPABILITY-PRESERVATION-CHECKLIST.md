# 01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST

**Status:** build-round draft
**Evidence boundary:** Synthesized from Auto/ARIS subagent reports. This checklist is input to Phase 02 and Phase 03 review rules.

## Integration Invariants

- Preserve standalone command invocation; do not encode capabilities as `phase_type` or typed phase routes.
- Preserve artifact handoff between commands.
- Preserve reviewer independence: reviewers get raw paths/artifacts where possible, not executor summaries.
- Preserve raw reviewer responses as primary review evidence.
- Preserve citation integrity and unresolved `[VERIFY]` markers.
- Preserve experiment integrity: raw result files, metric definitions, dataset splits, seeds, config, command, commit, backend, and W&B ID/URL where used.
- Preserve effort hard invariants: lower effort cannot weaken review quality, citation integrity, experiment integrity, or sanity checks.
- Preserve distinction between workflow artifacts and control state.
- Preserve phase-local research root ownership: authoritative v2.0 research outputs live under `.planning/phases/<phase>/research/`; root Auto artifacts are import/export mirrors only until adopted.
- Preserve optional support tools as optional; do not make research wiki/watchdog/smart update a hidden second control plane.

## Canonical Gate Precedence

This precedence order applies to research commands, wrappers, and review loops:

1. Hard safety gates always win: missing required evidence, blocking audit/verification failures, external-service confirmation requirements, destructive writes, budget limits, and explicit human stop prevent advancement regardless of `AUTO_PROCEED`.
2. `HUMAN_CHECKPOINT=true` forces a pause at review/decision checkpoints even when `AUTO_PROCEED=true`.
3. `AUTO_PROCEED=true` may continue only through safe local steps whose required inputs/evidence are present and whose service policy is already satisfied.
4. Review loops stop successfully only when the canonical stop predicate is met; otherwise they continue until `MAX_ROUNDS`, stall detection, failed blocking gate, or human stop.
5. `AUTO_PROCEED=false` pauses at the next non-trivial stage boundary after writing current evidence.

## Discovery And Refinement

- Preserve `idea-discovery` as a standalone orchestration command.
- Preserve `idea-discovery` literature execution as mandatory: it must retain raw source references, query/source metadata, and reading evidence in the phase-local literature evidence bundle before claiming discovery completion. Context/state generation alone is non-evidence.
- Preserve standalone `research-lit`, `idea-creator`, `novelty-check`, `research-review`, `research-refine`, `research-refine-pipeline`, and `research-pipeline` commands; `research-pipeline` may be preserved as an end-to-end wrapper if the underlying commands stay separately auditable.
- Preserve source semantics exactly: valid `sources` values are `zotero`, `obsidian`, `local`, `web`, `deepxiv`, and `all`; Semantic Scholar is part of `web`, and `deepxiv` stays explicit opt-in unless intentionally changed and documented.
- Preserve `RESEARCH_BRIEF.md` as primary input when present.
- Preserve `REF_PAPER_SUMMARY.md` for targeted `ref paper` mode.
- Preserve problem anchoring in refinement; each round carries the original Problem Anchor.
- Preserve compact/recovery artifacts separate from full reports.
- Add a stable GSD literature artifact if reproducible survey handoff is required.

## Experiment And Claims

- Preserve `experiment-plan` as the claim-first experiment design command producing `EXPERIMENT_PLAN.md` and tracker/checklist artifacts.
- Preserve `experiment-bridge` as the execution-bridging command that turns a plan into runnable blocks without becoming completion evidence by itself.
- Preserve `run-experiment` as the execution command that records command/config/backend/commit plus raw result paths.
- Preserve `monitor-experiment` as operational monitoring that reports status but does not replace raw results.
- Preserve `analyze-results` as the command that turns raw JSON/CSV/logs into interpreted metrics while keeping raw evidence linked.
- Preserve `experiment-audit` as the independent integrity-audit command with Markdown and JSON outputs.
- Preserve `auto-review-loop` as a bounded independent review loop with raw reviewer responses and deterministic stop predicate.
- Preserve `result-to-claim` as the command that converts results/audits/reviews into yes/partial/no claim support before paper claims.
- Preserve `ablation-planner` as reviewer-led ablation design with feasibility and expected-effect checks.
- Preserve `training-check` as process-health diagnosis separate from claim evidence.
- Preserve claim-first experiment planning.
- Preserve anti-claims and minimum convincing evidence.
- Preserve core-block versus nice-to-have split.
- Preserve default seed policy or make it explicit.
- Preserve sanity-first before full GPU spend.
- Preserve code review before GPU spend.
- Preserve parseable JSON/CSV/log outputs; terminal-only output is insufficient.
- Preserve reproduction command and config path for every run.
- Preserve raw numbers before interpretation.
- Preserve independent `experiment-audit` command.
- Preserve audit outputs as Markdown plus JSON.
- Preserve file-as-switch semantics: missing audit means no audit, not pass.
- Preserve visible integrity tags in downstream claim outputs.
- Preserve `result-to-claim` before paper claims.
- Preserve yes/partial/no verdict routing.
- Preserve ablation planner reviewer-led design and feasibility split.
- Preserve budget/cost awareness and remote-service lifecycle guards.
- Preserve process health monitoring separately from research claim evidence.

## Review Loops

- Preserve `AUTO_REVIEW.md`, `REVIEW_STATE.json`, and `REVIEWER_MEMORY.md` style separation.
- Preserve raw reviewer responses verbatim.
- Preserve the `difficulty` parameter or an equivalent policy with explicit independence strength.
- Preserve reviewer memory as reviewer-owned suspicion tracking, not executor-authored spin.
- Preserve bounded rounds and stall/stop predicates. v2.0 canonical stop rule: stop only when reviewer score is greater than or equal to `POSITIVE_THRESHOLD` and reviewer verdict is positive/accept/pass; otherwise continue until `MAX_ROUNDS`, stall, or explicit human stop.
- Preserve implement-fixes-before-re-reviewing rule.
- Keep the canonical stop predicate text identical across docs, prompts, tests, and implementation.

## Paper And Rebuttal

- Preserve artifact chain: `NARRATIVE_REPORT.md` or topic input -> `PAPER_PLAN.md` -> figures/snippets -> LaTeX source -> compiled PDF -> improvement logs.
- Preserve `paper-plan`, `paper-write`, `paper-figure`, `paper-compile`, and `auto-paper-improvement-loop` as separately auditable capabilities even if wrapped by `paper-writing`.
- Preserve venue rules, page counting, anonymity, and citation package selection.
- Preserve DBLP/CrossRef-first citation verification and no memory-only BibTeX.
- Preserve compiled PDF validation before improvement loops.
- Preserve all paper improvement rounds and PDFs.
- Preserve manual figure boundary for architecture/hero/qualitative figures.
- Preserve rebuttal as separate text-only workflow with its own workspace and paste-ready output.
- Add or explicitly defer a dedicated `paper-review` checklist/command; camera-ready behavior already exists through venue/anonymity settings, with `paper-slides` and `paper-poster` as post-acceptance follow-ons.
- Treat `paper-slides` and `paper-poster` as post-acceptance follow-ons unless user expands scope.

## Tooling And Overlays

- Preserve Gemini and Claude reviewer overlays as additive transport layers, not separate workflow semantics.
- Preserve async `review_start` / `review_status` contract for long reviews.
- Preserve provider/model provenance in review artifacts.
- Default reviewer backend for v2.0 is Codex subagents when available. Fallback order is configured OpenAI-compatible LLM, then Gemini/Claude/MiniMax adapters only when configured and allowed by service policy.
- `difficulty` changes review depth, number of rounds, and independence strength; it does not silently change provider unless the reviewer backend policy explicitly says so.
- Preserve research wiki graph source-of-truth semantics if imported.
- Preserve watchdog task state as operational monitoring only.
- Preserve smart-update as support tooling, not workflow logic.

## External-Service Policy Matrix

| Service class | Default | Confirmation trigger | Override rule |
|---|---|---|---|
| Local file reads/writes under phase-local research root | Allowed | None if within declared command contract | Project config may restrict paths further. |
| Network literature search or paper metadata lookup | Guided | Required when a command expands beyond declared `sources` or uses paid/private APIs | Explicit source selector plus project policy entry. |
| Reviewer APIs outside Codex subagents | Guided/blocking | Required before sending artifacts to external providers | Configured backend plus explicit provider allowance. |
| GPU/remote execution, Vast, Modal, W&B, paid compute, or persistent external logging | Blocking | Always before first use and before budget increase/destructive cleanup | Explicit budget/provider config and human approval record. |
| Git push, PR creation, publication, or submission upload | Blocking | Always | User approval through normal GSD/Git workflow. |

## Review-Round Checks To Apply

- Does each listed capability have a standalone GSD command or explicit deferral?
- Does each command produce the required artifact before any completion/transition claim?
- Does any command require `phase_type` or typed route tables? If yes, reject.
- Does any command rely on root Auto artifacts as authoritative control state? If yes, reject or require adoption.
- Are reviewer raw outputs preserved and distinguished from summaries?
- Are external services, GPU spend, W&B, Vast, Modal, and reviewer APIs gated by explicit policy?
- Does command behavior follow the canonical gate precedence for `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, checkpoint gates, service policy, and stop predicates?
- Are paper/rebuttal/citation/venue constraints machine-checkable or at least explicit artifacts?
