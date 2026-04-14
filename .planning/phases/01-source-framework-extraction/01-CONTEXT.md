# Phase 01 Context: Source Framework Extraction

**Milestone:** v2.0 Framework-First GSD Rebuild
**Status:** executing
**Created:** 2026-04-13
**Process Correction:** Phase 01 requires one subagent build round, three subagent review rounds, and one main-agent final check. The main agent must not replace missing subagent source-reading or review lanes.

## Goal

Deeply read upstream GSD, current ljx-GSD/history, and Auto/ARIS, then produce durable source-indexed framework documents that become the evidence base for the target `gsd-framework`.

## Why This Phase Exists

The prior ljx-GSD line failed because implementation and review proceeded before the source systems were sufficiently abstracted into a stable framework. Phase 01 prevents that failure mode by forcing structured extraction before target design or code.

The extraction itself must also be reviewed. A single framework-build pass is not acceptable because it can miss source surfaces, repeat ljx-GSD assumptions, or let main-agent context pollution replace independent analysis.

## Hard Constraints

- Use `gsd` as the target name.
- Do not use `egoista` as a package, skill, command, helper, or state name.
- Do not continue the old ljx-GSD review loop.
- Do not add `phase_type`, typed phase routing, or broad phase schema changes.
- Treat research as standalone `gsd` commands backed by ordinary GSD phases plus research artifact conventions.
- Keep extraction slices context-isolated; no single subagent should own all three source systems.
- Parallel subagents may return scoped reports, but canonical state writes must be serialized.
- If the subagent limit is insufficient, run missing lanes in later batches.
- Main agent must not perform missing subagent source-reading or review duties.
- Implementation is out of scope for Phase 01.

## Source Sets To Read

### Upstream GSD

Primary location:

- `.planning/references/upstreams/get-shit-done/`

If needed, compare against installed global GSD workflow files under:

- `$HOME/.codex/get-shit-done/`

Required coverage:

- workflows
- skills/commands
- hooks
- helper/runtime scripts
- subagent roles
- templates
- config and defaults
- state files and markdown mirrors
- git/commit behavior
- workstreams/workspaces/autonomous flows
- tests, package/install/update behavior

### Current ljx-GSD And History

Primary locations:

- repository root docs (`LJX-GSD-*.md`)
- `bin/lib/ljx-*.cjs`
- `tests/*.test.cjs`
- `.planning/milestones/v1.4-pivoted_not_shipped-phases/`
- `.planning/milestones/v1.4-pivoted_not_shipped-state/phase-records/`
- `.planning/review/`
- `.planning/milestone-drafts/`

Required coverage:

- current implementation architecture
- generated skill/build/install surface
- runtime helper families
- tests and review artifacts
- historical bug families
- user-observed failures
- reusable versus discardable components

### Auto/ARIS

Primary location:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/`

Required coverage:

- idea discovery
- literature and novelty workflows
- research refinement
- experiment planning/execution/audit/result analysis
- review loops
- result-to-claim and claim gates
- ablation planning
- paper and rebuttal workflows
- parameters and config knobs
- tools/MCP/support assets
- Codex skill variants and overlays
- artifact contracts and provenance expectations

## Required Plans

### 01-01: Run subagent build round and synthesize initial source frameworks

Expected outputs:

- `01-GSD-FRAMEWORK.md`
- `01-GSD-SOURCE-INDEX.md`
- `01-GSD-UPGRADE-BOUNDARIES.md`
- `01-LJX-FRAMEWORK.md`
- `01-LJX-HISTORY-FAILURE-TAXONOMY.md`
- `01-LJX-REUSE-OR-DISCARD-MATRIX.md`
- `01-AUTO-FRAMEWORK.md`
- `01-AUTO-ARTIFACT-CONTRACTS.md`
- `01-AUTO-PARAMETER-MAP.md`
- `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`
- `01-FRAMEWORK-SYNTHESIS-DRAFT.md`
- `01-CONTEXT-HYGIENE-LOG.md`

### 01-02: Run subagent review round 1 for source coverage and index completeness

Expected outputs:

- `01-REVIEW-R1-SOURCE-COVERAGE.md`
- `01-REVIEW-R1-FIXES.md`
- Updated framework artifacts if accepted findings require corrections

### 01-03: Run subagent review round 2 for cross-framework consistency and minimal-interference fit

Expected outputs:

- `01-REVIEW-R2-CONSISTENCY.md`
- `01-REVIEW-R2-FIXES.md`
- Updated framework artifacts if accepted findings require corrections

### 01-04: Run subagent review round 3 for historical-bug regression and context hygiene

Expected outputs:

- `01-REVIEW-R3-HISTORICAL-REGRESSION.md`
- `01-REVIEW-R3-FIXES.md`
- Updated framework artifacts if accepted findings require corrections

### 01-05: Perform main-agent final check and Phase 01 acceptance decision

Expected outputs:

- `01-FRAMEWORK-SYNTHESIS.md`
- `01-CROSS-FRAMEWORK-GAP-MAP.md`
- `01-FINAL-CHECK.md`
- `01-01-SUMMARY.md`
- `01-02-SUMMARY.md`
- `01-03-SUMMARY.md`
- `01-04-SUMMARY.md`
- `01-05-SUMMARY.md`

## Subagent Lane Requirements

Each subagent prompt should include:

- exact files/directories to read
- its lane ownership
- instruction that the lane is read-only unless explicitly assigned a phase-local review report
- instruction to avoid rewriting canonical planning files
- instruction to include source indexes for omitted prompt bodies
- instruction to distinguish facts from recommendations
- instruction to report context limits and skipped files honestly

Build-round lanes may be split across batches. Missing lanes must remain pending until a subagent runs them; local main-agent scans cannot be counted as source-lane evidence.

Review-round lanes should be specialized. At minimum, across three review rounds they must cover:

- source coverage and missing source surfaces
- source index completeness and prompt-body locator quality
- cross-framework consistency between upstream GSD, ljx history, and Auto/ARIS
- GSD-first/minimal-interference fit
- no-`phase_type` and no typed-routing compliance
- historical bug regression against v1.1-v1.4 failures
- context hygiene and subagent boundary cleanliness

## Acceptance Criteria

Phase 01 is accepted only when:

1. Separate context lanes for upstream GSD, current ljx-GSD/history, and Auto/ARIS have completed through subagents.
2. Any missing build lane caused by subagent capacity has been run in a later subagent batch.
3. Durable framework docs contain exact source indexes.
4. Three subagent review rounds have run and produced review artifacts with passing or accepted-fixed outcomes, evidence references, and applied-fix verification notes.
5. Accepted review findings have been applied or explicitly deferred with rationale.
6. Main-agent final check confirms the Phase 01 outputs satisfy this context and do not rely on local main-agent source-reading substitutions.
7. No implementation edits were made.
8. No `phase_type` or typed phase schema design was introduced.
9. Canonical state updates were serialized.
