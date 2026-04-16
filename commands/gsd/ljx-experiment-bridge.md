---
name: gsd:ljx-experiment-bridge
description: Bridge an approved experiment plan into GSD implementation tasks and authorized execution handoff.
argument-hint: "[experiment plan or phase]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Task
  - AskUserQuestion
  - SlashCommand
---

<objective>
Translate a claim-driven experiment plan into implementation steps, sanity checks, and authorized run commands.
</objective>

<gsd_phase_construction>
- Read the experiment plan and current GSD plan state.
- If code changes are needed, create or update an ordinary GSD execute plan.
- Record external run instructions under `.planning/phases/<phase>/research/experiments/`.
</gsd_phase_construction>

<research_instructions>
- Parse milestones, must-run experiments, nice-to-have experiments, budgets, and success gates.
- Check whether existing scripts already cover the plan.
- Define sanity-first execution and expected result file formats.
- Sanity first.
- Follow the plan.
- Evaluation must use dataset ground truth, not another model's output, unless explicitly labeled as a proxy evaluation.
- Save everything as JSON/CSV when practical.
- Update the tracker after every milestone.
- Require explicit user authorization before paid compute, remote SSH, W&B, long-running jobs, or background processes.
- Prefer bridge documents and GSD tasks over implicit execution.
</research_instructions>

<required_outputs>
- `research/experiments/EXPERIMENT_BRIDGE.md` with implementation tasks, run commands, authorization needs, and sanity checks.
- Include loaded plan summary, milestones, must-run/nice-to-have counts, initial experiment results, results by milestone `M0/M1/M2/M3`, completed counts, main result, and ready-for-review status when available.
- Updates to `research/experiments/EXPERIMENT_TRACKER.md`.
- Suggested `/gsd-plan-phase` or `/gsd-execute-phase` next step when code work is required.
</required_outputs>

<quality_dimensions>
- Clear separation between planning, implementation, and execution.
- Sanity stage before full runs.
- Traceable result files.
- No hidden external side effects.
</quality_dimensions>

<non_goals>
- Do not launch remote jobs by default.
- Do not mutate code outside an approved GSD plan.
- Do not invent server credentials or project settings.
</non_goals>
