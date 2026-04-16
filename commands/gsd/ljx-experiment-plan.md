---
name: gsd:ljx-experiment-plan
description: Build a claim-driven experiment roadmap with baselines, ablations, metrics, budgets, and run order.
argument-hint: "[proposal or final idea]"
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
Turn a refined research proposal into a compact experiment plan that can defend specific paper claims.
</objective>

<gsd_phase_construction>
- Read `research/refine/FINAL_PROPOSAL.md`, `research/refine/EXPERIMENT_PLAN.md`, `research/refine/EXPERIMENT_TRACKER.md`, `research/refine/PIPELINE_SUMMARY.md`, novelty reports, and review actions if present.
- Write experiment artifacts under `.planning/phases/<phase>/research/experiments/`.
- Convert implementation work into ordinary GSD plan tasks after the experiment plan is approved.
</gsd_phase_construction>

<research_instructions>
- Freeze primary claim, optional supporting claim, and anti-claim to rule out.
- For each claim, define minimum convincing evidence.
- Every experiment must defend a claim.
- Prefer strong baselines and decisive ablations over a large benchmark wishlist.
- Specify dataset, split, compared systems, metrics, seeds, budget, success criterion, failure interpretation, and table or figure target.
- Each experiment block must include claim tested, why it exists, dataset/split/task, compared systems, metrics, setup details, success criterion, failure interpretation, table/figure target, and priority `MUST-RUN / NICE-TO-HAVE`.
- Build run order: sanity, baseline, main method, decisive ablations, polish.
- Separate must-run from nice-to-have.
- Do not fabricate results.
</research_instructions>

<required_outputs>
- `research/experiments/EXPERIMENT_PLAN.md`.
- `research/experiments/CLAIM_MAP.md`.
- `research/experiments/EXPERIMENT_TRACKER.md`.
- `research/experiments/RISK_BUDGET.md` with compute, data, time, and external-service assumptions.
</required_outputs>

<quality_dimensions>
- Claim to evidence traceability.
- Baseline strength.
- Ablation relevance.
- Honest failure interpretation.
</quality_dimensions>

<non_goals>
- Do not run experiments.
- Do not add experiments for rare edge cases unless they affect the normal claim.
- Do not plan beyond available evidence and budget.
</non_goals>
