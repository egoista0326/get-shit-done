---
name: gsd:ljx-paper-improve
description: Run a bounded paper review-fix loop over an existing draft while preserving raw reviews and claim evidence.
argument-hint: "[paper directory or draft]"
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
Improve a drafted paper through bounded review, targeted fixes, and optional local recompilation.
</objective>

<gsd_phase_construction>
- Use ordinary GSD review and verification gates for the improvement loop.
- Read the paper draft, compile report, claim trace, citation checklist, claim gate, and prior reviewer feedback.
- Store loop state and raw reviewer outputs under `.planning/phases/<phase>/research/paper/`.
- Use `/gsd-ljx-paper-compile` for local build checks after writing fixes when a LaTeX paper exists.
- Before changing empirical, result-derived, or contribution claims, require `research/claims/CLAIM_GATE.md`; if it is missing, not `GO`/`NARROW`, or lacks `normal_workflow_ready: true` and `integrity_status: pass`, run `/gsd-ljx-claim-gate` or narrow/remove the claim instead of improving claim text.
</gsd_phase_construction>

<research_instructions>
- Default maximum improvement rounds: 2.
- Each round must save the full raw reviewer response before applying fixes.
- Review dimensions: claim-evidence alignment, overclaiming, logical flow, notation consistency, related-work coverage, citation verification, figure/table clarity, venue fit, page budget, and writing clarity.
- Fix CRITICAL and MAJOR findings first; document MINOR findings that are intentionally left.
- Soften unsupported claims instead of adding invented evidence.
- Preserve anonymous or placeholder author metadata unless the user explicitly requests camera-ready metadata.
- Run a reverse-outline check and a claim-trace check before declaring the loop ready.
- A clean local compile is useful but does not override unresolved claim, citation, or reviewer issues.
</research_instructions>

<required_outputs>
- `research/paper/PAPER_IMPROVEMENT_LOG.md` with round number, reviewer score or verdict when provided, raw review location, fixes applied, deferred issues, and compile status.
- `research/paper/PAPER_IMPROVEMENT_STATE.json` with `current_round`, `status`, `last_verdict`, and timestamp when a long loop may resume later.
- Updated draft files or patch notes.
</required_outputs>

<quality_dimensions>
- Bounded review loop.
- Raw-review preservation.
- Claim discipline.
- Targeted fixes.
- Recompile evidence when applicable.
</quality_dimensions>

<non_goals>
- Do not run unlimited review loops.
- Do not fabricate reviewer approval, citations, or new results.
- Do not submit, upload, publish, or alter venue portals.
</non_goals>
