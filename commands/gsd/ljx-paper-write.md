---
name: gsd:ljx-paper-write
description: Draft paper sections from an approved paper plan while keeping every claim tied to evidence.
argument-hint: "[paper plan, venue, or section]"
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
Write paper draft material from an approved plan without inflating claims or inventing citations.
</objective>

<gsd_phase_construction>
- Use the approved GSD phase plan as the work queue for drafting.
- Read `research/paper/PAPER_PLAN.md`, claim-gate artifacts, audit artifacts, literature evidence, and reviewer feedback.
- Before Abstract, Introduction, contribution, or result-derived prose, if `CLAIM_GATE.md` is missing, block claim-bearing drafting and route back to `/gsd-ljx-claim-gate`.
- Store draft outputs under `.planning/phases/<phase>/research/paper/`; use a project `paper/` directory only when the GSD plan explicitly chooses a LaTeX output path.
- Run `/gsd-ljx-paper-compile` only after draft files exist and the user wants a local PDF build.
</gsd_phase_construction>

<research_instructions>
- Draft section by section from the paper plan.
- Keep the Abstract and Introduction specific: what, why hard, how, evidence, strongest result.
- Every contribution in the Introduction must map to a claim-gate decision and at least one evidence artifact.
- Draft empirical, result-derived, or contribution claims only when the claim gate is `GO` or inside the narrowed scope of `NARROW` with `normal_workflow_ready: true` and `integrity_status: pass`; omit, narrow, or route `MORE_EVIDENCE` and `NO_CLAIM` items back to claim-gate follow-up work.
- Related Work must synthesize categories and positioning, not list papers one by one.
- Method and experiment sections must define setup, baselines, metrics, implementation details, and failure interpretation.
- Use venue-appropriate citation commands and mark unverified references as `[VERIFY]`.
- Prefer measured language: `shows`, `suggests`, or `supports` according to the claim gate.
- Run a reverse-outline check: paragraph topic sentences should tell the paper story in order.
- Save reviewer comments and major fixes when an independent review is used.
</research_instructions>

<required_outputs>
- `research/paper/DRAFT.md` or approved LaTeX section files.
- `research/paper/CLAIM_TRACE.md` mapping each paper claim to evidence and gate status.
- `research/paper/CITATION_CHECKLIST.md` with verified, unverified, and missing citations.
- `research/paper/DRAFT_REVIEW.md` when reviewer feedback is used.
</required_outputs>

<quality_dimensions>
- Evidence-backed claims.
- Clear paper story.
- Citation correctness.
- Venue style fit.
- No stale or orphaned section content.
</quality_dimensions>

<non_goals>
- Do not invent results, derivations, author names, affiliations, BibTeX, citations, or reviewer feedback.
- Do not broaden a `partial` claim into a general claim.
- Do not compile as part of this drafting command; use `/gsd-ljx-paper-compile` for local builds when explicitly requested.
- Do not submit, upload, publish, or contact external systems without explicit user authorization.
</non_goals>
