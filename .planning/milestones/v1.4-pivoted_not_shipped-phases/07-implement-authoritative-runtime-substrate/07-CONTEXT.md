# Phase 7: Authoritative Runtime Substrate - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

## Phase Boundary

This phase delivers the shared runtime substrate that later `ljx-GSD` lifecycle and research commands will rely on.

This phase is responsible for:

- landing shared config resolution, typed phase resolution, and workstream resolution helpers
- implementing the first authoritative structured state readers and writers under `.planning/state/`
- defining how bridge-era commands read structured state first while still stopping honestly when required state does not yet exist
- consolidating duplicated helper logic so later lifecycle and research commands stop re-implementing the same path, config, and phase/workstream resolution rules

This phase is not responsible for:

- completing the full lifecycle shell for `discuss-phase`, `plan-phase`, `execute-phase`, and `next`
- completing all research, paper, rebuttal, migration, or admin workflows
- deleting or shrinking existing GSD or Auto capabilities as a shortcut to integration

## Implementation Decisions

### Substrate rollout scope
- **D-01:** Phase 07 should land the first authoritative structured-state substrate around `phase-records`, `sessions`, and `workstreams` before expanding into the heavier experiment, review, claim, paper, and migration families.
- **D-02:** Other canonical state families already accepted in Phase 5 remain locked as path and ownership contracts, but their complete runtime writers do not need to land in Phase 07.
- **D-03:** Existing bridge helpers should migrate onto shared resolution/state helpers in this phase instead of continuing to grow per-command ad hoc parsing logic.

### Read and fallback policy
- **D-04:** When authoritative structured state exists, commands should read it first.
- **D-05:** When authoritative structured state is missing, commands may perform honest fallback reads from `STATE.md`, phase artifacts, or existing pointer files only to preserve continuity during transition.
- **D-06:** Fallback reads in Phase 07 should not silently auto-backfill structured state as a side effect; backfill must stay explicit until the substrate is trustworthy enough to own those writes.

### Resolver conflict policy
- **D-07:** Current phase and active workstream resolution should prefer authoritative structured state first, then fall back to markdown and pointer-era sources only when structured state is absent.
- **D-08:** If structured state and fallback-era sources disagree, the system should warn and stop automatic write progression rather than silently choosing a winner and mutating more state.
- **D-09:** The purpose of Phase 07 is to make later lifecycle routing safer, not to hide unresolved truth conflicts behind clever fallback heuristics.

### Reference and reuse policy
- **D-10:** Phase 07 planning and implementation should actively study both the current GSD implementation and the current Auto research implementation before introducing new substrate behavior.
- **D-11:** Existing GSD implementation patterns should be reused wherever they already solve the right problem cleanly, especially for CLI routing, init-time structured context gathering, path resolution, workstream/session handling, and shared helper organization.
- **D-12:** Existing Auto research implementations should be treated as integration inputs and reusable workflow content, not as disposable prototypes to be replaced wholesale.

### Integration and preservation policy
- **D-13:** The rewrite should follow a minimal-modification principle: do not delete GSD or Auto capabilities, and do not intentionally narrow their existing skill-level workflow coverage as an implementation shortcut.
- **D-14:** `ljx-GSD` should reuse GSD as the outer control-plane implementation base wherever practical, while Auto research is integrated into that system as a native workflow family.
- **D-15:** Auto research should become part of GSD's mainline runtime without deleting Auto's functional strengths, workflow semantics, or skill content.
- **D-16:** When a design choice exists between deleting existing behavior and adapting it onto the shared substrate, adaptation is the default unless an accepted architecture rule makes preservation impossible.

### the agent's Discretion
- Exact helper module names and file boundaries for the new runtime substrate
- Exact JSON schema fields for the first `phase-records`, `sessions`, and `workstreams` records
- Exact migration order for which existing bridge helpers adopt the shared substrate first

## Specific Ideas

- Use current GSD implementation as the primary runtime reference for CLI structure and resolver organization, especially:
  - `/Users/lijiaxin/.codex/get-shit-done/bin/gsd-tools.cjs`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/core.cjs`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/init.cjs`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/workstream.cjs`
- Use current local `ljx-GSD` bridge modules as the immediate consolidation targets rather than starting a second helper stack:
  - `bin/lib/ljx-bridge-contract.cjs`
  - `bin/lib/ljx-state-tools.cjs`
  - `bin/lib/ljx-new-project-tools.cjs`
- Preserve Auto research's existing workflow content and skill semantics by integrating them into the substrate instead of deleting or flattening them into generic lifecycle commands.

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase and project contracts
- `.planning/ROADMAP.md` — Phase 07 goal, dependencies, and success criteria
- `.planning/REQUIREMENTS.md` — `IMPL-01` and the implementation-phase requirement traceability
- `.planning/PROJECT.md` — project-level scope, constraints, and implementation guardrails
- `.planning/STATE.md` — current implementation position and known blockers

### Locked inbound architecture decisions
- `.planning/phases/05-migration-and-parallelism-strategy/05-CONTEXT.md` — migration direction, workstream meaning, and read-old/write-new constraints
- `.planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md` — canonical `.planning/state/*` family table and report contracts
- `.planning/phases/05-migration-and-parallelism-strategy/05-03-PLAN.md` — accepted rewrite-wave ordering and the explicit Phase 07 substrate prerequisite
- `.planning/phases/06-unified-hook-ownership/06-CONTEXT.md` — ownership boundary between workflows, hooks, adapters, and authoritative writes
- `LJX-GSD-DESIGN-DECISION-LOG.md` — stable accepted decisions that later implementation must not quietly drift away from
- `LJX-GSD-CONFIGURATION-DESIGN.md` — accepted config layering, especially global config vs phase-record overrides

### Existing implementation references
- `bin/lib/ljx-bridge-contract.cjs` — current shared bridge-contract seed for phase typing, summary parsing, and recommendation policy
- `bin/lib/ljx-state-tools.cjs` — current runtime-shell helper seed and fallback behavior
- `bin/lib/ljx-new-project-tools.cjs` — current creation path for `.planning/state/phase-records/*.json`
- `/Users/lijiaxin/.codex/get-shit-done/bin/gsd-tools.cjs` — GSD CLI router and command surface organization
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/core.cjs` — GSD config, path, phase, milestone, and workstream/session resolver patterns
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/init.cjs` — GSD workflow bootstrap and structured init payload patterns
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/workstream.cjs` — GSD workstream scoping and activation behavior to adapt, not copy blindly

## Existing Code Insights

### Reusable Assets
- `bin/lib/ljx-bridge-contract.cjs`: already centralizes phase sorting, phase-type inference, summary key-file parsing, and some review policy defaults
- `bin/lib/ljx-state-tools.cjs`: already centralizes runtime-shell recommendation logic, pause/resume behavior, and malformed-config honest-stop behavior
- `bin/lib/ljx-new-project-tools.cjs`: already writes the first `phase-records` object, so it is the natural starting point for canonical state shape
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/core.cjs`: already demonstrates a strong pattern for shared path/config/workstream helpers behind one CLI

### Established Patterns
- GSD separates CLI/runtime helpers from workflow prompts; the CLI computes state and workflows consume structured results
- Current local bridge helpers repeatedly perform the same planning-dir, config, and phase-resolution work, so Phase 07 should absorb that duplication into one substrate
- Session-aware workstream routing is a real requirement; GSD's session-scoped pointer pattern is worth adapting onto the new authoritative state model

### Integration Points
- The new substrate should sit below current `ljx-*` bridge helpers first, then become the dependency base for Phase 08 lifecycle shell work
- `phase-records`, `sessions`, and `workstreams` should become the first authoritative records read by progress/next/lifecycle-aware helpers
- Markdown mirrors such as `STATE.md` remain operator-facing, but should stop being the primary truth source once structured state exists

## Deferred Ideas

- Full runtime writers for experiments, reviews, claims, papers, and migration collections
- Automatic fallback-to-structured-state backfill on read
- Any cleanup plan that removes or shrinks existing GSD or Auto skill coverage before parity is proven

---

*Phase: 07-implement-authoritative-runtime-substrate*
*Context gathered: 2026-04-10*
