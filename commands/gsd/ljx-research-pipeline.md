---
name: gsd:ljx-research-pipeline
description: Coordinate idea discovery, experiment planning, execution handoff, review, and claim gating through GSD.
argument-hint: "[research direction]"
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
Run an end-to-end research lifecycle as GSD phases and artifacts, not as a separate automation framework.
</objective>

<gsd_phase_construction>
- Start with idea discovery in a research phase.
- Convert the selected idea into ordinary GSD plan files before implementation.
- Use GSD review, code review, verification, and progress state for all mutation.
- Keep paper and rebuttal work for later phases unless explicitly in scope.
</gsd_phase_construction>

<pipeline>
1. `/gsd-ljx-idea-discovery`: validated idea and refined proposal; this includes `/gsd-ljx-research-refine-pipeline` for the selected idea before formal experiment planning.
2. `/gsd-ljx-experiment-plan`: claim-driven experiment roadmap.
3. `/gsd-plan-phase`, `/gsd-execute-phase`, `/gsd-code-review`, `/gsd-verify-work`, `/gsd-validate-phase`, and `/gsd-docs-update` when applicable: implementation and normal GSD gates before external runs.
4. `/gsd-ljx-experiment-bridge`, `/gsd-ljx-run-experiment`, and `/gsd-ljx-monitor-experiment`: external execution handoff only after authorization.
5. `/gsd-ljx-analyze-results` and `/gsd-ljx-experiment-audit`: numbers and integrity.
6. `/gsd-ljx-result-to-claim`: supported claim decision.
7. `/gsd-ljx-claim-gate`: explicit GO, NARROW, MORE_EVIDENCE, or NO_CLAIM decision before paper, rebuttal, release, or public-summary text.
8. If the claim gate is `GO` or `NARROW` with `normal_workflow_ready: true` and `integrity_status: pass`, and paper work is explicitly in scope, route through `/gsd-ljx-paper-plan`, `/gsd-ljx-paper-write`, `/gsd-ljx-paper-compile`, and `/gsd-ljx-paper-improve`.
9. If external reviews are explicitly in scope, route through `/gsd-ljx-rebuttal-plan` and `/gsd-ljx-rebuttal-draft` only after the same public-claim gate is satisfied.
10. If the claim gate is `MORE_EVIDENCE` or `NO_CLAIM`, route back to `/gsd-ljx-ablation-planner`, `/gsd-ljx-experiment-plan`, or ordinary `/gsd-plan-phase` work instead of writing public claims.
11. `/gsd-ljx-auto-review-loop`: bounded improvement review when useful.
</pipeline>

<pipeline_rules>
- Budget awareness is mandatory before implementation or experiment execution.
- A result-to-claim decision is not enough for public claims; run claim gate before paper or rebuttal routing.
- Fail gracefully when a stage finds no good ideas, experiments crash, or review cannot converge.
- If the review loop reaches max rounds without positive assessment, stop and report remaining issues.
</pipeline_rules>

<required_outputs>
- `research/RESEARCH_PIPELINE_SUMMARY.md` with current stage, artifacts, decisions, and next GSD command.
- Include direction, chosen idea, pipeline path, journey summary, implementation summary, experiment count/compute, review rounds/final score, ready-needs-follow-up status, remaining TODOs, and key files changed.
- Stage artifacts from the commands above.
</required_outputs>

<quality_dimensions>
- Each stage has evidence.
- Expensive work is authorized.
- Claims follow results.
- GSD remains the lifecycle owner.
</quality_dimensions>

<non_goals>
- Do not promise autonomous submission readiness.
- Do not create hidden background jobs.
- Do not bypass GSD plans for implementation.
</non_goals>
