# Phase 15: Upstream Reference Baseline - Research

**Status:** Complete
**Generated:** 2026-04-12

## Research Question

What GSD and Auto/ARIS behavior must `ljx-GSD` preserve during v1.1 review?

## Inputs

- GSD upstream clone: `.planning/references/upstreams/get-shit-done/` at `553d9db56eab6ad2ab26e943ff806a8bc92c22cc`
- Auto/ARIS upstream clone: `.planning/references/upstreams/auto-claude-code-research-in-sleep/` at `1e150ea4e955b4f47bc549280a5c6c2a0c498b9a`
- Web provenance:
  - `https://github.com/gsd-build/get-shit-done`
  - `https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep`
- Parallel explorer outputs for GSD and Auto/ARIS upstream implementations.

## Output Artifacts

- `.planning/review/v1.1/UPSTREAM-SOURCE-INVENTORY.md`
- `.planning/review/v1.1/GSD-REFERENCE-NOTES.md`
- `.planning/review/v1.1/AUTO-ARIS-REFERENCE-NOTES.md`

## Findings

### GSD

GSD is a command/workflow/agent/CLI-tools system backed by `.planning/`. Its critical behaviors are phase lifecycle discipline, durable state, planning artifacts, review/verification gates, workstream/workspace distinction, autonomous boundedness, installer/runtime conversion, hook boundaries, and structural tests. `ljx-GSD` must preserve the control-plane semantics even where it adds research-native state families.

### Auto/ARIS

Auto/ARIS is a plain-Markdown research harness with Codex-native skill mirrors. Its critical behaviors are artifact handoffs across idea discovery, refinement, experiments, review, claim gating, paper writing, and rebuttal; cross-model reviewer independence; effort/autonomy parameters; optional backend graceful degradation; and safety gates for experiment integrity, citation discipline, and rebuttal provenance.

## Downstream Use

Phase 16 should use these notes to index the local `ljx-GSD` implementation.
Phase 17 should convert the notes into review criteria and scenario probes.
Phase 18 and Phase 19 should cite the notes when deciding whether a candidate issue is a real parity bug.
