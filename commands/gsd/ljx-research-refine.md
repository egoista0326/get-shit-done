---
name: gsd:ljx-research-refine
description: Refine a research idea around a stable problem anchor, reviewer feedback, and a score threshold.
argument-hint: "[idea or proposal]"
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
Improve a research idea into a focused proposal without drifting away from the original problem.
</objective>

<gsd_phase_construction>
- Read phase context, novelty report, review actions, and literature outputs first.
- Write refinement artifacts under `.planning/phases/<phase>/research/refine/`.
- When the refined proposal changes implementation scope, update GSD context or plan before coding.
</gsd_phase_construction>

<research_instructions>
- Freeze a Problem Anchor before making changes.
- Anchor first, every round.
- Track dominant contribution, supporting contribution, and what is intentionally out of scope.
- One paper, one dominant contribution.
- The smallest adequate mechanism wins.
- Modern techniques are a prior, not a decoration.
- Iterate only on changes that strengthen the anchored problem.
- Use reviewer feedback to improve claims, mechanism, evaluation, and narrative.
- When subagents are allowed, run or link an independent `/gsd-ljx-research-review` during refinement; when they are not allowed, label the pass as local review.
- Preserve raw reviewer response links or excerpts in the refinement log before extracting action items.
- Stop when the proposal is clear, feasible, and reviewer score target is met, or when remaining gaps require new evidence.
- Pushback is encouraged when feedback would cause drift or unnecessary complexity.
- Do not fabricate results.
</research_instructions>

<required_outputs>
- `research/refine/PROBLEM_ANCHOR.md`.
- `research/refine/REFINEMENT_LOG.md` with each round, change, reason, and unresolved concern.
- `research/refine/FINAL_PROPOSAL.md` with method thesis, claims, evidence needs, risks, and next GSD plan step.
- Include the seven review dimensions used during refinement: problem fit, novelty, mechanism, simplicity, evidence plan, feasibility, and narrative.
- Include `Target score: 9/10` unless the user specifies a different threshold.
</required_outputs>

<quality_dimensions>
- Anchor stability.
- Claim clarity.
- Scope control.
- Feasible next experiment plan.
</quality_dimensions>

<non_goals>
- Do not add complexity just to answer every hypothetical objection.
- Do not widen the project after refinement unless the evidence gap is central.
- Do not implement the proposal in this command.
</non_goals>
