---
name: gsd:ljx-ablation-planner
description: Design reviewer-driven ablations tied to claims, components, expected impact, and compute budget.
argument-hint: "[method, results, or claim decision]"
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
Plan ablations that answer the questions reviewers will actually ask.
</objective>

<gsd_phase_construction>
- Read claim decisions, result analysis, method description, and available compute constraints.
- Store ablation plans under `.planning/phases/<phase>/research/experiments/`.
- Convert approved ablations into ordinary GSD implementation and run plans.
</gsd_phase_construction>

<research_instructions>
- Start from reviewer concerns and intended claims.
- The reviewer agent leads the design when subagents are allowed.
- For each ablation, specify what changes, what it tests, expected result if the component matters, priority, and claim impact.
- Required fields: name, what changes, `what_it_tests`, `expected_if_component_matters`, and priority `1-5`.
- Prioritize component removal/replacement and config-only ablations over broad hyperparameter sweeps.
- Component ablations take priority over hyperparameter sweeps.
- Include unnecessary ablations and why to skip them.
- Estimate compute and propose cuts if budget is tight.
- Use independent reviewer design when subagents are allowed; local executor checks feasibility afterward.
- No just try it experiments.
- Record all ablation results, including negative results.
</research_instructions>

<required_outputs>
- `research/experiments/ABLATION_PLAN.md` with component ablations, hyperparameter sensitivity, design-choice comparisons, coverage assessment, unnecessary ablations, run order, and estimated compute.
- Updates to `research/experiments/EXPERIMENT_TRACKER.md`.
</required_outputs>

<quality_dimensions>
- Claim coverage.
- Reviewer relevance.
- Feasibility.
- Early-information run order.
</quality_dimensions>

<non_goals>
- Do not generate no-op ablations.
- Do not silently drop expensive ablations; mark cuts explicitly.
- Do not run ablations without approval.
</non_goals>
