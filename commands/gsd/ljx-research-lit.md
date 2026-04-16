---
name: gsd:ljx-research-lit
description: Map research literature with source discipline, closest prior work, gaps, and phase-local evidence.
argument-hint: "[topic or phase context]"
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
Produce a disciplined literature map for a research topic while keeping all planning and artifact ownership inside ordinary GSD.
</objective>

<gsd_phase_construction>
- If the work is not already inside a GSD phase, first use `/gsd-add-phase <research description>` or `/gsd-insert-phase <after> <description>` to create a roadmap-backed phase, then run `/gsd-discuss-phase <phase>` before literature work.
- Store authoritative outputs under `.planning/phases/<phase>/research/`.
- Record source paths, URLs, arXiv ids, titles, authors, years, and access dates when available.
- Do not create a second roadmap, state file, or root research control plane.
</gsd_phase_construction>

<research_instructions>
- Search local `papers/` and `literature/` first when present; scan only relevant PDFs and record what was actually read.
- Search the web for recent papers, arXiv, Semantic Scholar, venue pages, and foundational papers when needed.
- Use at least three query formulations for normal literature mapping.
- Deduplicate by arXiv id, DOI, title, and first author.
- For each important paper, extract problem, method, evidence, limitations, and relation to the topic.
- Separate confirmed facts from interpretation.
- Never invent citations. Mark uncertain metadata as unresolved.
- Always include paper citations with author, year, venue or preprint status, and source.
- Distinguish between peer-reviewed and preprints.
- Never fail because a source is not configured; skip unavailable sources and record the skip.
</research_instructions>

<required_outputs>
- `research/LITERATURE_REVIEW.md` with landscape groups, key papers, and gaps.
- `research/PAPER_TABLE.md` with title, year, source, contribution, relevance, and closest-overlap notes.
- The paper table must include `Paper`, `Venue`, `Method`, `Key Result`, `Relevance to Us`, and `Source`.
- `research/SEARCH_LOG.md` with queries, sources checked, and skipped sources.
- Optional `research/CITATION_NOTES.md` for BibTeX or unresolved citation metadata.
</required_outputs>

<quality_dimensions>
- Coverage of recent and foundational work.
- Clear closest-prior-work comparison.
- Honest uncertainty handling.
- Enough paper detail for novelty and experiment planning.
</quality_dimensions>

<non_goals>
- Do not download PDFs unless the user explicitly asks or local project policy allows it.
- Do not claim novelty; pass that to `/gsd-ljx-novelty-check`.
- Do not start implementation or experiments.
</non_goals>
