---
name: gsd:ljx-idea-creator
description: Generate and rank research ideas from a literature landscape with feasibility, risk, and contribution type.
argument-hint: "[research direction or literature summary]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Task
  - WebSearch
  - WebFetch
  - SlashCommand
---

<objective>
Turn a broad direction or literature map into concrete, ranked research ideas that can be validated through GSD phases.
</objective>

<gsd_phase_construction>
- Read existing phase context, `research/LITERATURE_REVIEW.md`, and any user constraints before generating ideas.
- Write outputs under `.planning/phases/<phase>/research/`.
- If a candidate is selected for implementation, create or update an ordinary GSD plan instead of launching ad hoc work.
</gsd_phase_construction>

<research_instructions>
- Generate 8 to 12 concrete ideas before filtering.
- The user provides a DIRECTION, not an idea; do not assume the first prompt is already the final proposal.
- Each idea must include problem, hypothesis, minimum experiment, expected contribution type, feasibility, risk, and likely reviewer objection.
- Prefer ideas where a positive or negative result would both teach something.
- A good negative result is just as publishable as a positive one when it answers an important question.
- Apply X to Y is the lowest form of research idea unless the application reveals surprising insights.
- Filter by compute, data availability, implementation complexity, novelty risk, and reviewer interest.
- When delegation is explicitly allowed, use an independent GSD subagent for divergent brainstorming; otherwise run the same checklist locally.
</research_instructions>

<required_outputs>
- `research/IDEA_CANDIDATES.md` with all generated ideas and filtering notes.
- `research/IDEA_RANKING.md` with recommended ideas, scores, risks, and next validation step.
- Include generated, survived, piloted, and recommended counts when pilot data exists.
- For each top idea, include novelty-check input text that can be passed to `/gsd-ljx-novelty-check`.
</required_outputs>

<quality_dimensions>
- Specificity of hypotheses.
- Feasibility under the user's constraints.
- Reviewability of contribution type.
- Clear elimination reasons for rejected ideas.
</quality_dimensions>

<non_goals>
- Do not mark an idea as novel without `/gsd-ljx-novelty-check`.
- Do not run expensive pilots unless the user explicitly authorizes the work.
- Do not turn idea ranking into an implementation plan without GSD planning.
</non_goals>
