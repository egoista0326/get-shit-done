# Phase 15: Upstream Reference Baseline - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning
**Mode:** Auto-generated from user request; all grey-area defaults selected by the agent per explicit autonomous instruction.

<domain>
## Phase Boundary

This phase establishes the upstream reference baseline for the v1.1 review milestone. It reads the current GSD and Auto/ARIS implementations from local cloned snapshots, records what their core systems do, and turns that into durable parity expectations for later review. It does not yet judge or modify `ljx-GSD`.

</domain>

<decisions>
## Implementation Decisions

### Source Snapshots
- Use local shallow clones under `.planning/references/upstreams/` as the implementation reference, while retaining the original GitHub links as provenance.
- Record commit heads for both clones so later review can distinguish upstream drift from local implementation drift.
- Treat the web GitHub pages as discovery/provenance only; use local files for implementation-level notes.

### Reading Depth
- Prioritize behavior-defining files: README/agent guide, workflow/skill bodies, command surfaces, runtime helpers, shared references, templates, and tests.
- For GSD, focus on command/workflow/agent/CLI-tool architecture, `.planning/` state, phase lifecycle, code-review/verify, workstreams/workspaces, autonomous mode, migration/import, and Codex conversion.
- For Auto/ARIS, focus on Codex-native skills, research pipeline, idea discovery, literature review, refinement, experiment bridge, review loops, claim gates, result analysis, paper/rebuttal flows, shared references, tools, and parameter contracts.

### Output Format
- Write reusable notes under `.planning/review/v1.1/` so future phases can index them quickly.
- Include concrete file paths inspected and parity expectations, not only prose summaries.
- Organize notes for future agent lookup rather than polished external documentation.

### the agent's Discretion
- The exact table structure and section order are left to the agent as long as later review can use them as a checklist.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.planning/references/upstreams/get-shit-done/` — cloned upstream GSD reference.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/` — cloned upstream Auto/ARIS reference.
- `.planning/review/v1.1/` — v1.1 review notes, loop state, and bug ledger home.

### Established Patterns
- Prior ljx-GSD work uses phase-local `*-CONTEXT.md`, `*-RESEARCH.md`, `*-PLAN.md`, and `*-SUMMARY.md` artifacts.
- Prior design docs keep compatibility and minimal-modification constraints in top-level markdown files.

### Integration Points
- Phase 16 consumes these reference notes to compare upstream expectations against local `ljx-GSD`.
- Phase 17 consumes these reference notes to build review criteria and scenario probes.

</code_context>

<specifics>
## Specific Ideas

- Keep the notes detailed enough for the agent to re-read later without re-opening every upstream file.
- Explicitly cover user-requested scenarios: migration from GSD projects, engineering lifecycle, research lifecycle, code review, literature review, autonomous research, result analysis, idea generation, pause/continue, workstreams, workspaces, and safe/autonomous switching.

</specifics>

<deferred>
## Deferred Ideas

- Local `ljx-GSD` implementation judgment is deferred to Phase 16 and later.
- Confirmed bug fixing is deferred to Phase 18 and Phase 19.

</deferred>
