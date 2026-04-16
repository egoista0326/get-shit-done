---
name: gsd:ljx-monitor-experiment
description: Monitor authorized experiments, collect raw numbers, and update run status without overstating results.
argument-hint: "[run id, server, log path, or tracker]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - SlashCommand
---

<objective>
Check experiment progress and collect evidence for analysis.
</objective>

<gsd_phase_construction>
- Use `research/experiments/EXPERIMENT_TRACKER.md` as the phase-local run index.
- Write monitoring observations under the same phase research directory.
- Keep GSD state changes limited to factual progress updates.
</gsd_phase_construction>

<research_instructions>
- Default to local files, already-provided logs, and already-exported tracker data.
- Do not use SSH, remote servers, tracker APIs, paid infrastructure, or external services unless explicitly authorized for this monitoring step.
- Check process status, recent logs, result files, and error traces.
- Always show raw numbers or raw log excerpts before interpretation.
- Always show raw numbers before interpretation.
- Compare each run against the correct baseline and config only when enough data exists.
- Compare against the correct baseline.
- Flag NaN, divergence, missing files, stale logs, idle GPUs, or mismatched config.
- If results look wrong, check training logs before concluding.
- If a run is still active, say so and do not summarize it as complete.
</research_instructions>

<required_outputs>
- `research/experiments/MONITOR_LOG.md` with timestamped status checks.
- Include a comparison table with `Experiment`, `Metric`, `Delta vs Baseline`, and `Status` when completed metrics exist.
- Updated tracker status: planned, running, completed, failed, blocked, or inconclusive.
- Pointers to raw result files for `/gsd-ljx-analyze-results`.
</required_outputs>

<quality_dimensions>
- Accurate status.
- Raw evidence first.
- No baseline mismatch.
- Fast surfacing of obvious run failures.
</quality_dimensions>

<non_goals>
- Do not kill or restart jobs unless explicitly authorized.
- Do not inspect remote hosts, private trackers, or paid infrastructure unless explicitly authorized.
- Do not claim scientific conclusions from partial logs.
- Do not replace formal result analysis.
</non_goals>
