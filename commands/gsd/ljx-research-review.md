---
name: gsd:ljx-research-review
description: Run an independent research review with raw response retention, scores, weaknesses, and minimum fixes.
argument-hint: "[proposal, paper, results, or phase]"
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
Obtain a rigorous research review without letting the executor pre-frame the evidence.
</objective>

<gsd_phase_construction>
- Use a GSD phase as the container for review artifacts.
- Place review outputs under `.planning/phases/<phase>/research/reviews/`.
- Route code-review findings through `/gsd-code-review-fix <phase>` when they come from `/gsd-code-review`; otherwise convert accepted research review findings into ordinary GSD plan updates and `/gsd-execute-phase` work.
- Route claim-affecting research review findings through `/gsd-ljx-result-to-claim` and `/gsd-ljx-claim-gate` before any paper, rebuttal, release, or public-summary claim text is changed.
</gsd_phase_construction>

<research_instructions>
- Compile file paths for proposal, experiment plan, results, paper draft, and code.
- Do not pass subjective summaries as the main evidence. Let the reviewer read primary artifacts when possible.
- Ask for novelty, soundness, significance, clarity, evidence strength, missing experiments, and top venue readiness.
- Ask for the minimum experiment that would address each major concern.
- Ask for a results-to-claims matrix when results or experiments exist.
- For paper-like work, request a mock review with `Summary`, `Strengths`, `Weaknesses`, `Questions for Authors`, `Score`, `Confidence`, and `What Would Move Toward Accept`.
- Preserve the complete raw reviewer response verbatim.
- Extract structured fields only after the raw response is saved.
- If subagents are not allowed, perform the same review locally and label it as local review.
</research_instructions>

<required_outputs>
- `research/reviews/RESEARCH_REVIEW.md` with raw response, structured summary, score, verdict, weaknesses, and minimum fixes.
- `research/reviews/REVIEW_ACTIONS.md` with finding id, severity, evidence, suggested fix, and GSD routing.
</required_outputs>

<quality_dimensions>
- Reviewer independence.
- Raw response preservation.
- Findings tied to primary evidence.
- Actionable minimum fixes.
</quality_dimensions>

<non_goals>
- Do not count a finding as fixed until evidence changes.
- Do not coach the reviewer toward a positive result.
- Do not treat minor style comments as blockers.
</non_goals>
