# Phase 16: ljx-GSD Implementation Index - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning
**Mode:** Auto-generated from user request; all grey-area defaults selected by the agent per explicit autonomous instruction.

<domain>
## Phase Boundary

This phase indexes the current local `ljx-GSD` implementation before applying a review rubric. It reads historical design docs, the public manifest, generated Codex-preview skills, runtime helper families, structured state records, and test inventory. It should explain what the implementation intends to do and where future reviewers should look.

This phase does not yet run the full bug review loop or change implementation code. The only allowed state repair in this phase is planning metadata needed to make v1.1 phases visible to the `ljx-GSD` resolver.

</domain>

<decisions>
## Implementation Decisions

### Reading Order

- Start from the accepted design docs: `LJX-GSD-ARCHITECTURE.md`, `LJX-GSD-INTERFACES.md`, configuration and parameter docs, and prior phase summaries.
- Treat `node bin/install.js --print-manifest` as the current public-surface truth, not older target taxonomies in design prose.
- Treat generated files under `.build/codex-preview/skills/ljx-GSD-*` as the install-preview truth for Codex-facing behavior.
- Treat `bin/lib/ljx-*.cjs` helpers as the runtime truth and tests under `tests/` as current regression coverage.

### Output Format

- Write one durable implementation index under `.planning/review/v1.1/LJX-GSD-IMPLEMENTATION-INDEX.md`.
- Keep the index optimized for later review: command families, state ownership, generated skill contracts, helper families, tests, known debts, and high-risk parity questions.
- Separate implementation description from review judgment. Candidate issues should be deferred to Phase 18 unless they are planning metadata needed to continue.

### Autonomy

- Continue without asking for human feedback.
- Default ambiguous classification to the most conservative review-useful choice.
- If a mismatch is discovered, record it as a review hotspot unless it blocks phase progression.

</decisions>

<code_context>
## Existing Code Insights

### Top-Level Docs

- `LJX-GSD-ARCHITECTURE.md` defines the intended control-plane, research-core, state, and hook ownership model.
- `LJX-GSD-INTERFACES.md` defines public command behavior, typed phase routing, direct workflow attachment, `next` semantics, auto-advance policy, phase/workstream/workspace distinction, and phase-type visibility.
- Phase 14 docs record migration/cutover and parity evidence; they also make global production skill replacement explicitly out of scope.

### Runtime And Generation

- `bin/install.js` builds bridge-ready preview/install output from `bin/lib/manifest.cjs` through `bin/lib/build-skills.cjs`.
- `bin/lib/ljx-state-tools.cjs` is the progress/next resolver surface used by generated core skills.
- `bin/lib/ljx-lifecycle-shell-tools.cjs`, quality helpers, research helpers, roadmap-admin helpers, workstream helpers, and migration helpers own most behavior.
- `.build/codex-preview/` contains generated `ljx-GSD-*` skills plus preserved Auto companion skills, tools, templates, docs, and MCP servers.

### Current State

- Phase records 15-19 exist under `.planning/state/phase-records/`.
- `ljx-GSD-progress` resolves Phase 16 as current with no `phaseResolutionError`.
- v1.1 review artifacts live under `.planning/review/v1.1/`.

</code_context>

<specifics>
## Specific Ideas

- Index command-surface coverage against the user-requested scenarios: GSD project migration, engineering lifecycle, research lifecycle, code review, literature review, autonomous research, result analysis, credible direction generation, pause/continue, workstreams, workspaces, safe/autonomous switching, and parameter implementation.
- Record the distinction between public `ljx-GSD-*` commands and preserved upstream Auto companion skills in preview output.
- Make `research-pipeline` a special hotspot because it must remain a helper-backed phase-chain proposal, not a hidden second Auto control plane.
- Make generated skill/helper drift a special hotspot because generated Markdown is the actual Codex interface.

</specifics>

<deferred>
## Deferred Ideas

- The formal review rubric is deferred to Phase 17.
- Confirmed findings, fixes, and reruns are deferred to Phase 18 and Phase 19.
- Global replacement of installed production skills remains out of scope unless the user later asks for production cutover.

</deferred>
