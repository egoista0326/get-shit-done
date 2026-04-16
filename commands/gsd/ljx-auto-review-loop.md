---
name: gsd:ljx-auto-review-loop
description: Run a bounded research review loop with 30 round cap, two consecutive clean rounds, and non-minor blocking rules.
argument-hint: "[phase, proposal, code, results, or paper]"
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
Iterate research review and fixes without infinite churn or false clean accounting.
</objective>

<gsd_phase_construction>
- Keep review artifacts under `.planning/phases/<phase>/research/reviews/`.
- Route code-review findings through `/gsd-code-review-fix <phase>` when they come from `/gsd-code-review`; otherwise route code or artifact fixes through ordinary GSD plans and `/gsd-execute-phase` work.
- Update GSD state only after evidence-backed progress.
</gsd_phase_construction>

<review_rules>
- Maximum review rounds: 30.
- Review ends only after two consecutive clean rounds.
- A round is clean only if there are no confirmed non-minor findings and the reviewer gives a positive assessment such as ready, pass, accept, or almost-ready.
- Low-score, not-ready, or negative verdicts are non-clean even when the reviewer does not itemize a separate bug.
- Non-minor findings include normal workflow bugs, missing evidence for claimed results, claim inflation, data or baseline mismatch, security/safety issues, and lifecycle violations.
- Minor issues include wording, formatting, low-impact cleanup, or rare edge cases that do not affect normal workflow.
- Each finding needs severity, evidence, affected artifact, suggested fix, and main-agent confirmation before it counts.
- Preserve raw reviewer responses for every round.
- Save the FULL raw response.
- Do NOT hide weaknesses.
- Implement fixes BEFORE re-reviewing.
- Document EVERYTHING.
- If new findings continue after many rounds, stop and summarize patterns instead of adding patch-on-patch complexity.
</review_rules>

<required_outputs>
- `research/reviews/AUTO_REVIEW_LOOP.md` with round table, raw response links, findings, fixes, and clean-streak accounting.
- Include round assessment summary, reviewer raw response in a details block, actions taken, results, status, score progression, final summary, method description, and remaining blockers.
- When review findings affect result-derived claims, hand off through `research/claims/RESULT_TO_CLAIM.md` and `research/claims/CLAIM_GATE.md` instead of creating a separate claim artifact.
- `research/reviews/REVIEW_STATE.md` with current round, clean streak, open findings, and next action.
</required_outputs>

<quality_dimensions>
- Independent review.
- Correct clean accounting.
- Practical normal-workflow focus.
- Bounded iteration.
</quality_dimensions>

<non_goals>
- Do not optimize for extreme or rare cases unless they affect normal work.
- Do not count unconfirmed reviewer guesses as accepted bugs.
- Do not exceed 30 rounds.
</non_goals>
