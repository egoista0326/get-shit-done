---
name: gsd:ljx-training-check
description: Check training quality metrics for NaN, divergence, plateaus, and baseline regressions during active runs.
argument-hint: "[run id, log path, or W&B run]"
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
Detect broken or wasteful training early while preserving evidence for later review.
</objective>

<gsd_phase_construction>
- Associate every check with a phase-local experiment tracker row.
- Append health observations under `.planning/phases/<phase>/research/experiments/`.
- Escalate fixes through GSD tasks when code or config changes are needed.
</gsd_phase_construction>

<research_instructions>
- Read available logs, JSON metrics, CSV metrics, or W&B only when credentials and user authorization are available.
- This skill checks training QUALITY, not process HEALTH.
- Check loss trend, eval metrics, NaN or Inf, sudden spikes, learning rate schedule, gradient norm, throughput, and baseline regression.
- Classify as STOP, CONTINUE, or WAIT.
- For ambiguous metrics, ask an independent reviewer only if subagents are allowed; otherwise prefer WAIT unless there is clear failure.
- Do not stop training on the first sign of noise.
- When recommending STOP, record the run URL and key metrics as evidence before any user-authorized action.
- Save the evidence that led to the decision.
</research_instructions>

<required_outputs>
- `research/experiments/TRAINING_CHECKS.md` with timestamp, source, key metrics, decision, evidence, and next check interval.
- Include run identifier, current step/epoch, metric snapshot, judgment, action, saved evidence, and next check interval.
- Updated tracker notes for the run.
</required_outputs>

<quality_dimensions>
- Trend-based judgment.
- Avoiding false stops on noise.
- Early detection of clear failures.
- Evidence preservation.
</quality_dimensions>

<non_goals>
- Do not create recurring automations unless the user explicitly asks.
- Do not use W&B, SSH, or paid infrastructure without authorization.
- Do not stop, kill, pause, restart, or alter training jobs unless explicitly authorized.
- Do not replace `/gsd-ljx-monitor-experiment` process-health checks.
</non_goals>
