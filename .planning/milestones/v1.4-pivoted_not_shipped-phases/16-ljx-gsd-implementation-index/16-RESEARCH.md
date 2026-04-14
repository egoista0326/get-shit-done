# Phase 16: ljx-GSD Implementation Index - Research

**Status:** Complete
**Generated:** 2026-04-12

## Research Question

What does the current local `ljx-GSD` implementation contain, how is it intended to work, and where should later reviewers focus?

## Inputs

- Historical design docs:
  - `LJX-GSD-ARCHITECTURE.md`
  - `LJX-GSD-INTERFACES.md`
  - `LJX-GSD-CONFIGURATION-DESIGN.md`
  - `LJX-GSD-PARAMETER-DICTIONARY.md`
  - `LJX-GSD-PARAMETER-MIGRATION-MATRIX.md`
- Current public manifest:
  - `node bin/install.js --print-manifest`
  - `bin/lib/manifest.cjs`
- Generated preview install:
  - `.build/codex-preview/skills/ljx-GSD-*`
  - `.build/codex-preview/ljx-gsd/runtime/`
  - `.build/codex-preview/ljx-gsd/docs/`
  - preserved Auto companion skills, tools, templates, and MCP servers
- Runtime helper and test inventory:
  - `bin/lib/ljx-*.cjs`
  - `tests/*.test.cjs`
- Prior phase state and docs:
  - `.planning/ROADMAP.md`
  - `.planning/STATE.md`
  - Phase 12-14 review/verification artifacts
  - `.planning/state/phase-records/*.json`

## Output Artifacts

- `.planning/review/v1.1/LJX-GSD-IMPLEMENTATION-INDEX.md`
- Phase-local plan and summary files for plans 16-01 through 16-03.

## Findings

### Core Goal

`ljx-GSD` is a Codex-oriented research operating system that keeps GSD as the outer `.planning` lifecycle/control plane while absorbing Auto/ARIS research workflows into typed phases and structured state. Its main invariant is not "expose both skill sets"; it is "avoid two competing control planes."

### Current Public Surface

The current bridge-ready manifest exposes core lifecycle commands, project/phase commands, quality gates, workstream support, typed roadmap admin commands, and main Auto-derived research commands. It intentionally does not install an independent `ljx-GSD-do`; freeform routing is conceptual/host-side. It keeps `ljx-GSD-code-review-fix` hidden.

### Runtime Model

Human-readable `.planning/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, and phase-local artifacts remain visible mirrors and workspaces. Structured state under `.planning/state/` is the runtime truth for phase records, research evidence, reviews, experiments, claims, papers, migration, and admin mutations. Generated skills are instructed to call helpers for state writes instead of editing structured state directly.

### Generated Skill Model

Generated `ljx-GSD-*` skills are thin Codex bridge shells. They read helper JSON first, stop honestly on missing planning/malformed state, write phase-local artifacts, and update structured records through helper payload commands. Research commands preserve Auto intent while routing through typed phases and phase-local artifacts. The install preview also preserves many original Auto companion skills and tools as direct/companion capabilities.

### Known Debt

The roadmap carries historical Phase 12 whole-repo review/verify debt. Phase 14 declares global installed production skill replacement out of scope. The v1.1 loop state requires two consecutive clean review rounds and a hard cap of 11 total review rounds.

## Downstream Use

Phase 17 should convert this index into a review rubric and scenario matrix.
Phase 18 should use this index to pick concrete review files and avoid confusing design-target gaps with implemented-surface bugs.
Phase 19 should use this index to verify that any fixes did not break generated-skill/helper contracts.
