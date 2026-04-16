---
name: gsd:ljx-claim-gate
description: Decide whether a research claim is ready for paper, rebuttal, supplementary work, or rejection.
argument-hint: "[claim decision, audit, or result summary]"
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
Turn result support and audit integrity into an explicit gate decision before a claim appears in paper, rebuttal, release, or project-summary text.
</objective>

<gsd_phase_construction>
- Use ordinary GSD phase context, plans, review, and verification as the control plane.
- Read phase-local result analysis, experiment audit, review findings, and `/gsd-ljx-result-to-claim` output before deciding.
- Store gate artifacts under `.planning/phases/<phase>/research/claims/`.
- If the claim needs more work, route it to an ordinary GSD plan with `/gsd-plan-phase <phase>` or to a new approved phase with `/gsd-add-phase` or `/gsd-insert-phase`.
</gsd_phase_construction>

<research_instructions>
- Classify the gate as exactly one of: `GO`, `NARROW`, `MORE_EVIDENCE`, or `NO_CLAIM`.
- Carry forward `claim_supported: yes | partial | no | unsupported`.
- Carry forward `integrity_status: pass | warn | fail | unavailable`.
- `GO` requires `claim_supported: yes`, normal-workflow evidence, traceable raw results, and no blocking audit or review findings.
- `NARROW` requires `claim_supported: yes` or evidence-matched `partial`; the claim can be used only after its scope is reduced to match the evidence.
- `claim_supported: no` or `unsupported` routes to `NO_CLAIM` for paper, rebuttal, release, or public-summary workflows.
- For paper, rebuttal, release, or public-summary use, `GO` and `NARROW` both require `integrity_status: pass` and `normal_workflow_ready: true`.
- `MORE_EVIDENCE` means a plausible claim exists but needs additional experiment, ablation, literature, or reviewer evidence.
- `NO_CLAIM` means the current evidence does not support the claim.
- Treat missing audit evidence as provisional at best; `warn`, `fail`, or `unavailable` integrity routes to `MORE_EVIDENCE` or `NO_CLAIM` for paper, rebuttal, release, or public-summary text.
- Record why a weaker gate was chosen and what ordinary GSD work would change it.
</research_instructions>

<required_outputs>
- `research/claims/CLAIM_GATE.md` with gate decision, input artifacts, supported scope, blocked scope, evidence gaps, and next GSD route.
- `research/claims/CLAIM_GATE.json` with `gate`, `claim_supported`, `integrity_status`, `normal_workflow_ready`, `blocking_findings`, `required_followups`, and `reviewer_confidence`.
- Updates to `research/claims/CLAIM_LEDGER.md`.
</required_outputs>

<quality_dimensions>
- Evidence traceability.
- Conservative scope.
- Normal-workflow readiness.
- Clear next action.
</quality_dimensions>

<non_goals>
- Do not write paper or rebuttal language before the gate decision is recorded.
- Do not treat rare edge cases as blockers unless they affect the normal claim.
- Do not submit, publish, push, open a PR, or call external services.
</non_goals>
