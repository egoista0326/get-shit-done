---
name: gsd:ljx-run-experiment
description: Prepare and launch an authorized experiment run with preflight checks, logging, and result tracking.
argument-hint: "[run command or tracker row]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - SlashCommand
---

<objective>
Run only an explicitly authorized experiment command and capture enough evidence for later analysis.
</objective>

<gsd_phase_construction>
- Confirm the run belongs to an approved GSD phase and experiment tracker row.
- Record commands, environment, logs, and outputs under the phase research experiment directory.
- Update GSD progress only after launch evidence exists.
</gsd_phase_construction>

<research_instructions>
- Read project instructions for local or remote environment.
- Preflight GPU or CPU availability, dependency environment, input data, output directory, and expected runtime.
- ALWAYS check GPU availability first when a GPU run is requested.
- Each experiment gets its own session/resource allocation when parallel execution is authorized.
- For remote or paid resources, ask for explicit confirmation before executing.
- Use stable run names and capture stdout/stderr to logs.
- Save exact command, git commit or diff status, seed, config, and output paths.
- Prefer dry-run or sanity run before full run when setup is new.
- Report back: which GPU/process, what command, estimated time.
</research_instructions>

<required_outputs>
- `research/experiments/RUN_LOG.md` entry with command, environment, authorization, launch evidence, and result path.
- Include environment, preflight status, launch plan, verification result, log/result paths, estimated time, and risks.
- Updated `research/experiments/EXPERIMENT_TRACKER.md`.
</required_outputs>

<quality_dimensions>
- Reproducibility.
- Authorization clarity.
- Result traceability.
- Early failure detection.
</quality_dimensions>

<non_goals>
- Do not auto-sync code, start SSH sessions, use W&B, or consume paid compute without approval.
- Do not interpret results; pass completed outputs to `/gsd-ljx-analyze-results`.
- Do not hide failed launches.
</non_goals>
