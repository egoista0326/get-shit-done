---
name: gsd:ljx-paper-plan
description: Build a paper outline from verified claims, evidence, venue constraints, figures, and citation needs.
argument-hint: "[topic, claim ledger, or results]"
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
Convert verified research results into a compact paper plan with claim-evidence alignment before drafting.
</objective>

<gsd_phase_construction>
- Use ordinary GSD discussion, planning, review, and verification for paper work.
- Read phase-local literature, novelty, experiment, audit, result-to-claim, `research/claims/CLAIM_GATE.md`, ablation, and review artifacts.
- Store planning outputs under `.planning/phases/<phase>/research/paper/`.
- If paper writing is substantial, create or select a GSD phase first, then run `/gsd-plan-phase <phase>` with the paper plan as context.
</gsd_phase_construction>

<research_instructions>
- Start from `research/claims/CLAIM_LEDGER.md`, `RESULT_TO_CLAIM.md`, and `CLAIM_GATE.md`; if `CLAIM_GATE.md` is missing, run `/gsd-ljx-claim-gate` before planning paper claims.
- Read the claim-gate decision before section planning: plan positive paper claims only for `GO` or evidence-matched `NARROW` with `normal_workflow_ready: true` and `integrity_status: pass`; for `MORE_EVIDENCE` or `NO_CLAIM`, write blockers and next GSD routes instead of paper claim sections.
- Build a claims-evidence matrix before sections are planned.
- Keep one dominant contribution plus at most one supporting contribution unless the user explicitly asks for a broader paper.
- Choose paper type from the evidence: empirical, method, theory, systems, benchmark, diagnostic, or survey.
- Record target venue, page budget, anonymity mode, citation style, and whether references count toward the page limit.
- Plan title, abstract thesis, introduction arc, related-work positioning, method/setup, experiments, ablations, limitations, and conclusion.
- Plan figure and table inventory, especially the hero figure and main result table.
- Mark every unverified citation, number, theorem, or result as `[VERIFY]` or `needs evidence`.
- Ask an independent reviewer when allowed; save raw reviewer feedback and apply only concrete fixes.
</research_instructions>

<required_outputs>
- `research/paper/PAPER_PLAN.md` with title candidates, one-sentence contribution, venue, page budget, claims-evidence matrix, section plan, figure/table plan, citation plan, risks, and next steps.
- `research/paper/PAPER_PLAN_REVIEW.md` with raw or summarized reviewer feedback.
- Updates to `research/claims/CLAIM_LEDGER.md` when planned claims are narrowed.
</required_outputs>

<quality_dimensions>
- Claim-evidence alignment.
- Front-loaded contribution.
- Venue fit.
- Citation discipline.
- Page-budget realism.
</quality_dimensions>

<non_goals>
- Do not draft full paper text before a plan exists.
- Do not plan paper, rebuttal, release, or public-claim text from `RESULT_TO_CLAIM.md` alone.
- Do not fabricate BibTeX, citations, results, reviewer scores, or venue rules.
- Do not submit, upload, publish, or contact external submission systems.
</non_goals>
