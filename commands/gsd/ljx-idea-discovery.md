---
name: gsd:ljx-idea-discovery
description: Orchestrate literature, idea creation, novelty, review, and refinement into a validated idea report.
argument-hint: "[research direction]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Task
  - WebSearch
  - WebFetch
  - AskUserQuestion
  - SlashCommand
---

<objective>
Move from a broad research direction to one or more validated candidate ideas without bypassing GSD lifecycle gates.
</objective>

<gsd_phase_construction>
- Create or reuse a research phase before starting the pipeline.
- Store all intermediate artifacts under `.planning/phases/<phase>/research/`.
- After idea selection, use `/gsd-plan-phase` before implementation.
</gsd_phase_construction>

<pipeline>
1. Run `/gsd-ljx-research-lit` to map the landscape.
2. Run `/gsd-ljx-idea-creator` to generate and rank ideas.
3. Run `/gsd-ljx-novelty-check` on top candidates.
4. Run `/gsd-ljx-research-review` on survivors.
5. Run `/gsd-ljx-research-refine-pipeline` for the selected idea.
</pipeline>

<pipeline_rules>
- Don't skip phases.
- Kill ideas early when novelty, feasibility, or reviewer value is weak.
- Empirical signal > theoretical appeal when credible pilot evidence exists.
- Document everything, including dead ends and eliminated ideas.
</pipeline_rules>

<checkpoint_rules>
- Present the literature landscape before idea generation if scope looks uncertain.
- Present ranked ideas before deep refinement.
- Do not auto-launch expensive pilots, remote jobs, or paid services.
- If the user is unavailable, stop with artifacts and recommended next action instead of silently executing costly work.
</checkpoint_rules>

<required_outputs>
- `research/IDEA_DISCOVERY_SUMMARY.md`.
- `research/IDEA_REPORT.md` with generated, filtered, novelty-checked, reviewed, and selected ideas.
- Include executive summary, literature landscape, ranked ideas, eliminated ideas, refined proposal links, preliminary refine roadmap/tracker links and the next route to `/gsd-ljx-experiment-plan`, and next steps.
- Links to literature, novelty, review, and refinement artifacts.
</required_outputs>

<quality_dimensions>
- Evidence before selection.
- Novelty and reviewer risk surfaced early.
- GSD-ready handoff.
- No claim of completion from context/state text alone.
</quality_dimensions>

<non_goals>
- Do not start full implementation.
- Do not require every optional upstream tool.
- Do not run pilots unless separately planned and authorized.
</non_goals>
