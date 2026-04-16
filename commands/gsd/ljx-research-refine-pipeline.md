---
name: gsd:ljx-research-refine-pipeline
description: Chain research refinement into claim-driven experiment planning through ordinary GSD artifacts.
argument-hint: "[selected idea, review, or novelty report]"
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
Produce a refined proposal and experiment roadmap for a selected research idea.
</objective>

<gsd_phase_construction>
- Use one GSD phase as the authoritative container.
- Run refinement first, then create a preliminary roadmap for experiment planning.
- Before any implementation or experiment execution, route through `/gsd-ljx-experiment-plan` to create the formal `research/experiments/EXPERIMENT_PLAN.md`, `research/experiments/CLAIM_MAP.md`, and `research/experiments/RISK_BUDGET.md`.
- If implementation is approved, create a normal execute plan with `/gsd-plan-phase`.
</gsd_phase_construction>

<research_instructions>
- Start from selected idea, novelty report, and review findings.
- First stabilize the thesis. Then turn the stable thesis into experiments.
- Freeze the Problem Anchor before planning experiments.
- Ensure the final proposal, preliminary roadmap, and later formal claim map use the same claims.
- Reuse the same claims across FINAL_PROPOSAL, the preliminary roadmap, and PIPELINE_SUMMARY.
- Keep the paper story compact: one dominant claim plus at most one supporting claim unless the user says otherwise.
- If a modern LLM, VLM, diffusion, or RL primitive is central, plan a necessity check.
</research_instructions>

<required_outputs>
- `research/refine/FINAL_PROPOSAL.md`.
- `research/refine/EXPERIMENT_PLAN.md` as a preliminary roadmap, not an execution-ready experiment plan.
- `research/refine/EXPERIMENT_TRACKER.md` as a preliminary tracker for planned validation only.
- `research/refine/PIPELINE_SUMMARY.md` with selected idea, anchor, claims, must-run experiments, risks, and next route to `/gsd-ljx-experiment-plan`.
- Handoff note that formal execution requires `research/experiments/EXPERIMENT_PLAN.md`, `research/experiments/CLAIM_MAP.md`, `research/experiments/EXPERIMENT_TRACKER.md`, and `research/experiments/RISK_BUDGET.md` from `/gsd-ljx-experiment-plan`.
</required_outputs>

<quality_dimensions>
- Proposal and experiment plan consistency.
- Minimal but convincing validation.
- Explicit stop/go gates.
- Clear handoff into GSD execution.
</quality_dimensions>

<non_goals>
- Do not launch experiments.
- Do not treat `research/refine/EXPERIMENT_PLAN.md` as execution-ready.
- Do not create paper/rebuttal artifacts in this phase.
- Do not override user budget or external-service policy.
</non_goals>
