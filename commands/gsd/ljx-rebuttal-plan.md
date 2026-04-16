---
name: gsd:ljx-rebuttal-plan
description: Parse external reviews into issues, evidence gaps, response strategy, and approval checkpoints.
argument-hint: "[reviews, paper, or venue rules]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Task
  - SlashCommand
---

<objective>
Turn external reviews into a complete rebuttal strategy before drafting response text.
</objective>

<gsd_phase_construction>
- Use an ordinary GSD phase or plan for rebuttal work.
- Store all rebuttal artifacts under `.planning/phases/<phase>/research/rebuttal/`.
- If new experiments are needed, route them through `/gsd-ljx-experiment-bridge` or `/gsd-ljx-ablation-planner` with explicit user authorization.
- If a response will rely on new or changed empirical results, factual paper claims, or derived claims, require `research/claims/RESULT_TO_CLAIM.md` and `research/claims/CLAIM_GATE.md`; when missing, route through `/gsd-ljx-analyze-results`, `/gsd-ljx-experiment-audit`, `/gsd-ljx-result-to-claim`, and `/gsd-ljx-claim-gate` before rebuttal drafting.
- Only `GO` or evidence-matched `NARROW` can support rebuttal claims, and those gates must include `normal_workflow_ready: true` and `integrity_status: pass`; `MORE_EVIDENCE` and `NO_CLAIM` must be recorded as blocked claims, evidence gaps, or follow-up GSD routes instead of response text.
- Keep venue rules and user approvals as hard gates before drafting.
</gsd_phase_construction>

<research_instructions>
- Preserve raw reviews verbatim before summarizing.
- Validate venue rules, character or word limit, response format, deadline, anonymity requirements, and whether revised PDFs are allowed.
- Atomize every reviewer concern into an issue id such as `R1-C2`.
- Classify issue type: novelty, empirical support, baseline, theorem rigor, assumptions, complexity, clarity, reproducibility, limitation, tone, or other.
- Classify severity: critical, major, or minor.
- Choose response mode: direct clarification, grounded evidence, closest-work delta, assumption hierarchy, narrow concession, future-work boundary, or needs user input.
- Identify global themes that answer shared concerns across reviewers.
- Mark blocked claims when evidence, approving claim-gate status, or approval is missing. `MORE_EVIDENCE` and `NO_CLAIM` must be recorded as blocked claims even when `CLAIM_GATE.md` exists.
- Do not let any reviewer concern disappear; each issue must be answered, intentionally deferred, or marked as needing user input.
</research_instructions>

<required_outputs>
- `research/rebuttal/REVIEWS_RAW.md` with reviewer text preserved.
- `research/rebuttal/ISSUE_BOARD.md` with issue ids, raw anchors, severity, stance, response mode, status, and evidence source.
- `research/rebuttal/STRATEGY_PLAN.md` with global themes, per-reviewer strategy, character budget, claim-gate inputs, blocked claims, evidence gaps, and approval checkpoints.
- `research/rebuttal/REBUTTAL_BLOCKERS.md` when any gate blocks drafting.
</required_outputs>

<quality_dimensions>
- Full concern coverage.
- Provenance.
- Venue compliance.
- Clear approval gates.
- Evidence gap visibility.
</quality_dimensions>

<non_goals>
- Do not draft paste-ready text before raw reviews, issue board, and strategy exist.
- Do not run new experiments or promise new results automatically.
- Do not submit, upload, or edit external venue systems.
</non_goals>
