---
name: gsd:ljx-paper-compile
description: Locally compile a drafted paper, diagnose build issues, and report page, citation, reference, and PDF checks.
argument-hint: "[paper directory]"
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
Build a local paper PDF and record compile evidence without using external submission or build services.
</objective>

<gsd_phase_construction>
- Run only inside the selected GSD phase or approved project paper directory.
- Treat compile output as verification evidence for paper work, not as project completion by itself.
- Store reports under `.planning/phases/<phase>/research/paper/`.
- Route content or claim problems back to `/gsd-ljx-paper-write`, not directly to publication.
</gsd_phase_construction>

<research_instructions>
- Verify local prerequisites such as `latexmk`, `pdflatex`, `bibtex`, or the explicitly requested engine.
- Compile locally only; do not use external build services, submission portals, or cloud runners.
- Preserve existing source files and back up before destructive cleanup.
- Diagnose missing packages, missing figures, undefined references, undefined citations, BibTeX syntax, severe overfull boxes, and stale section files.
- Check page count according to venue rules; ML venues usually count main body to conclusion, while IEEE-style venues often include references.
- Check PDF existence, non-empty file size, font embedding when tools are available, and absence of unresolved `??`, `[?]`, or `[VERIFY]` markers.
- Report warnings honestly instead of suppressing them.
</research_instructions>

<required_outputs>
- `research/paper/COMPILE_REPORT.md` with status, command run, PDF path, page count, errors fixed, warnings remaining, undefined references, undefined citations, verify markers, and next steps.
- `research/paper/COMPILE_LOG_SUMMARY.md` when a raw compile log exists.
- Updated GSD verification notes if compile status changes paper readiness.
</required_outputs>

<quality_dimensions>
- Reproducible local build.
- Honest warning reporting.
- Page-limit correctness.
- Non-destructive source handling.
</quality_dimensions>

<non_goals>
- Do not install system packages without explicit authorization.
- Do not delete user source files.
- Do not upload or submit the PDF.
- Do not claim scientific readiness from a clean build alone.
</non_goals>
