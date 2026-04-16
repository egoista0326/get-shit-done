---
name: gsd:ljx-novelty-check
description: Check research idea novelty with claim extraction, multi-source search, closest prior work, and 0-10 scoring.
argument-hint: "[method or idea description]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Task
  - WebSearch
  - WebFetch
  - SlashCommand
---

<objective>
Decide whether a proposed research idea is meaningfully novel enough to justify continued work.
</objective>

<gsd_phase_construction>
- Use the current GSD phase if one exists; otherwise create a narrow research validation phase first.
- Write the novelty report under `.planning/phases/<phase>/research/`.
- Feed accepted findings back into `/gsd-plan-phase` before implementation starts.
</gsd_phase_construction>

<research_instructions>
- Extract 3 to 5 core technical claims from the proposal.
- For each claim, search with multiple query formulations and include the most recent 6 months when the field moves quickly.
- Record source URL, DOI, arXiv id, title, authors, year, venue or preprint status, and access date when available.
- Mark uncertain or missing metadata as unresolved instead of filling gaps from memory.
- Distinguish peer-reviewed work, preprints, unpublished artifacts, and project pages.
- State search/source limitations before assigning the final novelty score.
- Check method novelty and experimental-setting novelty separately.
- Build a closest prior work table with overlap and key difference.
- Ask an independent reviewer agent only when the user has allowed subagents; pass primary evidence, not your favorable summary.
- Be BRUTALLY honest: false novelty wastes months.
- Applying X to Y is NOT novel unless the application reveals surprising insights.
- If the method is not novel but the FINDING would be, say so explicitly.
</research_instructions>

<required_outputs>
- `research/NOVELTY_REPORT.md` containing:
  - proposed method summary;
  - core claims;
  - closest prior work table;
  - source coverage, search limitations, and unresolved metadata;
  - overall novelty assessment;
  - `Score: X/10`;
  - recommendation: `PROCEED`, `PROCEED WITH CAUTION`, or `ABANDON`;
  - key differentiator and prior-work risk;
  - suggested positioning.
</required_outputs>

<quality_dimensions>
- Search breadth and freshness.
- Quality of closest prior work comparison.
- Honesty about overlap.
- Actionable recommendation.
</quality_dimensions>

<non_goals>
- Do not improve the idea while scoring novelty; record improvement suggestions separately.
- Do not treat lack of search results as proof of novelty.
- Do not start experiments.
</non_goals>
