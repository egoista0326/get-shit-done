---
name: gsd:ljx-analyze-results
description: Analyze experiment outputs into raw tables, statistics, deltas, insights, and next experiments.
argument-hint: "[result directory, tracker, or phase]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - SlashCommand
---

<objective>
Turn completed experiment outputs into transparent analysis without inflating claims.
</objective>

<gsd_phase_construction>
- Locate result files from the phase experiment tracker and run logs.
- Write analysis under `.planning/phases/<phase>/research/experiments/`.
- Route completed analysis to `/gsd-ljx-experiment-audit` before `/gsd-ljx-result-to-claim`.
</gsd_phase_construction>

<research_instructions>
- Parse JSON, CSV, logs, or tables using structured tools where practical.
- Build raw result tables before interpretation.
- Compute deltas against the correct baseline.
- For multiple seeds, report mean, standard deviation, and notable variance.
- Flag missing runs, outliers, suspiciously perfect scores, and config mismatches.
- Separate observation, interpretation, implication, and next step.
- Use the finding structure `Observation`, `Interpretation`, `Implication`, and `Next step`.
</research_instructions>

<required_outputs>
- `research/experiments/RESULTS_TABLE.md`.
- Include raw data table, comparison table, mean/std where applicable, trends/outliers, numbered key findings, and suggested next experiments.
- `research/experiments/RESULTS_ANALYSIS.md`.
- `research/experiments/NEXT_EXPERIMENTS.md` when gaps remain.
</required_outputs>

<quality_dimensions>
- Raw data availability.
- Statistical honesty.
- Baseline correctness.
- Clear implication boundaries.
</quality_dimensions>

<non_goals>
- Do not decide paper claims here.
- Do not skip the audit handoff before claim conversion.
- Do not hide failed or negative runs.
- Do not manufacture missing metrics.
</non_goals>
