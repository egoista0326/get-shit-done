---
name: gsd:ljx-rebuttal-draft
description: Draft a grounded, venue-limited rebuttal from an issue board and approved evidence.
argument-hint: "[strategy plan or rebuttal directory]"
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
Write a safe rebuttal draft that answers every reviewer concern without fabricating evidence or overpromising.
</objective>

<gsd_phase_construction>
- Draft only after `/gsd-ljx-rebuttal-plan` has produced raw reviews, issue board, strategy, and venue constraints.
- For any factual result, empirical claim, or derived paper claim, read `research/claims/RESULT_TO_CLAIM.md` and `research/claims/CLAIM_GATE.md`; if the gate is missing, run `/gsd-ljx-claim-gate` before drafting that claim.
- Draft factual/result-derived rebuttal claims only when the gate is `GO` or inside the narrowed scope of `NARROW` with `normal_workflow_ready: true` and `integrity_status: pass`; route `MORE_EVIDENCE` and `NO_CLAIM` to blockers, future-work boundaries, or follow-up GSD work.
- Store drafts under `.planning/phases/<phase>/research/rebuttal/`.
- Use ordinary GSD review before any response is treated as ready.
- Route missing evidence to approved GSD experiment, ablation, literature, or paper-edit plans.
</gsd_phase_construction>

<research_instructions>
- Enforce three hard gates: provenance, commitment, and coverage.
- Provenance gate: every factual sentence maps to paper, review, literature evidence, future-work boundary, or a `GO`/in-scope `NARROW` claim-gated result or derivation.
- Commitment gate: every promise maps to already done, approved for rebuttal, or future-work only.
- Coverage gate: every issue id in the issue board is answered, intentionally deferred, or marked needs user input.
- Use a global opener for shared concerns, then concise per-reviewer responses.
- Prefer direct answer, evidence, implication.
- Concede narrowly when reviewers are correct.
- Name closest prior work and exact deltas for novelty disputes when evidence exists.
- Keep character or word limits visible while drafting.
- Save a strict paste-ready version and a richer explanatory version.
- Run an independent stress test when allowed; save raw critique and fix blockers.
</research_instructions>

<required_outputs>
- `research/rebuttal/REBUTTAL_DRAFT.md` with structured responses and issue anchors.
- `research/rebuttal/PASTE_READY.txt` with exact character or word count when venue rules are known.
- `research/rebuttal/REBUTTAL_DRAFT_RICH.md` with optional detail marked for cutting.
- `research/rebuttal/SAFETY_CHECK.md` covering provenance, commitment, coverage, tone, consistency, limit, and remaining risks.
- Updated `research/rebuttal/ISSUE_BOARD.md` statuses.
- Claim-gate references in `REBUTTAL_DRAFT.md` or `SAFETY_CHECK.md` for any factual result, empirical claim, or derived paper claim; `SAFETY_CHECK.md` must record the gate status and any narrowed scope.
</required_outputs>

<quality_dimensions>
- Grounded evidence.
- Full reviewer coverage.
- No overpromise.
- Venue limit fit.
- Constructive tone.
</quality_dimensions>

<non_goals>
- Do not invent experiments, numbers, derivations, citations, links, or reviewer intent.
- Do not draft factual rebuttal claims from user-confirmed results, derivations, or existing blocked gates alone; require `/gsd-ljx-claim-gate` when the claim is missing a gate, and route `MORE_EVIDENCE` and `NO_CLAIM` to blockers instead of response text.
- Do not submit or paste into OpenReview, CMT, HotCRP, email, or any external system.
- Do not edit a revised PDF unless a separate approved GSD plan covers the local file changes.
- Do not upload a revised PDF or mutate venue systems without explicit user authorization.
</non_goals>
