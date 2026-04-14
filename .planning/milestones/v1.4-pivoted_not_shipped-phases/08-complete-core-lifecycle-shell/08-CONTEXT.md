# Phase 8: Core Lifecycle Shell - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

## Phase Boundary

This phase delivers the real outer lifecycle shell for `ljx-GSD` on top of the new authoritative runtime substrate.

This phase is responsible for:

- implementing typed `ljx-GSD-discuss-phase`, `ljx-GSD-plan-phase`, and `ljx-GSD-execute-phase`
- promoting `ljx-GSD-next` from helper-safe routing into one-step lifecycle-aware progression
- adapting the mature parts of GSD's lifecycle/init/bootstrap implementation into the accepted `ljx-GSD` runtime model
- routing lifecycle commands by `phase_type` so they can reuse current bridge-ready research and quality workflows without pretending those domain internals are already fully rewritten
- writing only the lifecycle-owned structured state and human-readable evidence that the accepted ownership package allows

This phase is not responsible for:

- completing the deeper `code-review`, `code-review-fix`, and `verify-work` lifecycle integration owned by Phase 09
- fully rewriting discovery/refine/experiment/review/paper/rebuttal internals, which remain the scope of Phases 10-12
- deleting or shrinking original GSD or Auto capabilities as a shortcut to integration
- turning `next` into a long silent auto-pipeline that chains multiple lifecycle stages without recomputation

## Locked Inbound Decisions

- **D-01:** `.planning/` remains the authoritative project root.
- **D-02:** `.planning/phases/` holds human-readable lifecycle artifacts; `.planning/state/` holds structured machine truth.
- **D-03:** GSD remains the outer control plane; Auto research becomes a native workflow family inside that control plane rather than a second controller.
- **D-04:** Structured state is read first. Legacy markdown and pointer-era sources may still be read honestly during transition, but they must not silently overtake authoritative state.
- **D-05:** `primary` remains the special mainline workstream and does not collapse into an ordinary branch abstraction.
- **D-06:** The minimal-modification rule is active: do not remove or intentionally narrow existing GSD or Auto workflow coverage just to make the rewrite easier.
- **D-07:** Existing GSD implementation should be reused wherever it already solves the right problem cleanly; Auto workflow content should be integrated rather than discarded.
- **D-08:** Direct workflows must converge on the same lifecycle truth model as the shell, rather than running in parallel and backfilling state only at the end.
- **D-09:** `discussion.mode = focused`, `discussion.noncritical_style = suggest`, and `workflow.auto_advance_policy = guided` remain active defaults.
- **D-10:** Human-readable phase artifacts remain required even when structured state becomes more authoritative.

## Implementation Decisions

### GSD-first shell policy
- **D-11:** Phase 08 should reference and adapt the current GSD lifecycle implementation first, especially for command shape, init/bootstrap payloads, phase/workstream resolution flow, and recommendation generation.
- **D-12:** If GSD already has a suitable implementation pattern, reuse or adapt it before inventing a new `ljx-GSD`-specific mechanism.
- **D-13:** If GSD does not cover the accepted `ljx-GSD` requirement, implement the smallest new behavior that fits the already-accepted architecture instead of copying GSD blindly.

### Thin typed lifecycle shell
- **D-14:** Phase 08 should land a thin but real typed lifecycle shell, not a full rewrite of every phase-type engine.
- **D-15:** `discuss-phase`, `plan-phase`, and `execute-phase` should become authoritative lifecycle entrypoints that dispatch by `phase_type` through the shared runtime substrate and current bridge-ready/domain helpers.
- **D-16:** Existing bridge-ready research and quality helpers should be reused as route targets whenever they already satisfy the accepted contract for the current slice, rather than being rewritten preemptively in Phase 08.

### Lifecycle evidence model
- **D-17:** The shell should preserve GSD-style lifecycle traceability by continuing to produce thin phase-local lifecycle evidence such as `CONTEXT`, `PLAN`, and `SUMMARY` level artifacts.
- **D-18:** Those lifecycle artifacts should stay thin wrappers when a phase-type-specific artifact already carries the substantive domain content; Phase 08 should not create heavy duplicate markdown just to mirror the same truth twice.
- **D-19:** Structured state is still the primary write target, but the shell must refresh the human-readable mirrors needed for operator visibility and stock GSD-style navigation.

### Direct-workflow adoption policy
- **D-20:** When a direct workflow has already created artifacts that satisfy the current lifecycle contract, the shell should adopt those artifacts into authoritative lifecycle state instead of rerunning the workflow by default.
- **D-21:** Direct-workflow adoption must remain honest: if an artifact is incomplete, malformed, stale, or semantically insufficient for the lifecycle step, the shell should stop or recommend the upstream route instead of pretending the phase is satisfied.
- **D-22:** This adoption rule is especially important for the current bridge-ready research commands, because expert manual use must not fork lifecycle truth away from `next`.

### `next` progression policy
- **D-23:** `ljx-GSD-next` should execute one top-ranked safe action, then recompute recommendations from updated authoritative state.
- **D-24:** In `guided` mode, `next` may enter the next ready phase when prerequisites are satisfied, but it should not silently chain `discuss -> plan -> execute -> verify` in one invocation.
- **D-25:** `next` should prefer the same resolver/recommendation contract shown by manual top-level commands, so manual and automatic continuation remain one system.

### Phase-type routing limits for this phase
- **D-26:** `engineering`, `discovery`, `refine`, `experiment`, `analysis`, and `paper` phases should all be routable through the shell in Phase 08, but only to the depth already supported by their current accepted helpers and artifacts.
- **D-27:** `analysis` and `paper` should remain bounded single-entry workflows in this phase, not hidden long-chain automatic sub-pipelines inside `execute-phase`.
- **D-28:** Deeper quality-gate freshness invalidation, fix loops, and acceptance-routing semantics remain deferred to Phase 09 rather than being improvised early inside Phase 08.

### Preservation and integration policy
- **D-29:** Phase 08 must preserve the functional semantics of original GSD and Auto workflows wherever possible, wrapping or adapting them into typed lifecycle routing instead of flattening them into generic placeholders.
- **D-30:** Auto research remains an integrated workflow family inside the GSD shell, not a removed subsystem and not a separate top-level controller.
- **D-31:** When there is no direct GSD precedent for a needed `ljx-GSD` behavior, choose the design that best preserves one control plane, one lifecycle truth model, and minimal modification of existing workflow value.

### The Agent's Discretion
- Exact structured fields used in `phase-records` to represent discuss/plan/execute lifecycle status
- Exact thin lifecycle artifact filenames and update thresholds where multiple acceptable shapes exist
- Exact adapter boundaries between reused GSD shell logic, shared runtime helpers, and current bridge-ready domain routes

## Specific Ideas

- Use GSD's lifecycle organization as the outer reference implementation, especially:
  - `/Users/lijiaxin/.codex/get-shit-done/bin/gsd-tools.cjs`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/init.cjs`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/core.cjs`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/roadmap.cjs`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/workstream.cjs`
- Use the newly landed runtime substrate as the only low-level truth layer for lifecycle work:
  - `bin/lib/ljx-runtime-core.cjs`
  - `bin/lib/ljx-runtime-state.cjs`
  - `bin/lib/ljx-phase-context.cjs`
- Reuse the current resolver/recommendation helpers and bridge contract where practical instead of creating a second shell stack:
  - `bin/lib/ljx-state-tools.cjs`
  - `bin/lib/ljx-bridge-contract.cjs`
  - `bin/lib/manifest.cjs`
- Preserve the current focused-discussion policy from the accepted command specs: a small set of high-value questions live, with suggested defaults for lower-priority items.
- Promote `next` by upgrading today's helper-safe recommendation layer into authoritative lifecycle progression, not by bypassing the shell and launching hidden phase chains.
- Treat current Auto workflow skills as reusable route targets and content sources for typed lifecycle phases, especially when Phase 08 needs behavior GSD itself does not provide:
  - `/Users/lijiaxin/.codex/skills/idea-discovery/SKILL.md`
  - `/Users/lijiaxin/.codex/skills/research-refine/SKILL.md`
  - `/Users/lijiaxin/.codex/skills/experiment-plan/SKILL.md`
  - `/Users/lijiaxin/.codex/skills/paper-writing/SKILL.md`
  - `/Users/lijiaxin/.codex/skills/rebuttal/SKILL.md`

## Canonical References

**Downstream agents MUST read these before researching, planning, or implementing.**

### Phase and project contracts
- `.planning/ROADMAP.md` — Phase 08 goal, dependencies, and success criteria
- `.planning/REQUIREMENTS.md` — `IMPL-02` traceability
- `.planning/PROJECT.md` — project-level scope, constraints, and preservation guardrails
- `.planning/STATE.md` — current implementation position and active blockers

### Locked upstream decisions
- `.planning/phases/06-unified-hook-ownership/06-CONTEXT.md` — lifecycle ownership and hook boundary rules that Phase 08 must obey
- `.planning/phases/07-implement-authoritative-runtime-substrate/07-CONTEXT.md` — structured-state-first substrate policy and GSD/Auto preservation rules
- `.planning/phases/07-implement-authoritative-runtime-substrate/07-01-SUMMARY.md` — runtime-core and typed-resolution execution evidence
- `.planning/phases/07-implement-authoritative-runtime-substrate/07-02-SUMMARY.md` — authoritative state family execution evidence
- `.planning/phases/07-implement-authoritative-runtime-substrate/07-03-SUMMARY.md` — helper migration onto the shared substrate
- `LJX-GSD-DESIGN-DECISION-LOG.md` — accepted design decisions that Phase 08 must not silently drift away from
- `LJX-GSD-CONFIGURATION-DESIGN.md` — config layering and override rules
- `LJX-GSD-CORE-COMMAND-SPECS.md` — lifecycle command contracts, direct-workflow convergence rule, and recommendation contract
- `LJX-GSD-INTERFACES.md` — public routing model and manual/automatic invocation expectations
- `LJX-GSD-SKILL-MIGRATION.md` and `LJX-GSD-SKILL-MIGRATION-DETAILED.md` — keep/adapt/merge expectations for GSD and Auto skills

### Existing implementation references
- `bin/lib/ljx-runtime-core.cjs` — canonical config defaults, phase typing, and resolver substrate
- `bin/lib/ljx-runtime-state.cjs` — authoritative state family IO for `phase-records`, `sessions`, and `workstreams`
- `bin/lib/ljx-phase-context.cjs` — shared phase-context bootstrap for shell commands
- `bin/lib/ljx-state-tools.cjs` — current recommendation/progress shell and bridge-time helper-safe routing behavior
- `bin/lib/manifest.cjs` — current public-surface build status and which lifecycle commands remain deferred
- `/Users/lijiaxin/.codex/get-shit-done/bin/gsd-tools.cjs` — command routing and init entrypoints
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/init.cjs` — workflow bootstrap payload patterns, next-phase suggestion logic, and phase-op context
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/core.cjs` — shared config/path/phase/workstream resolver patterns
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/roadmap.cjs` — roadmap progression heuristics that should be adapted carefully rather than copied blindly
- `/Users/lijiaxin/.codex/get-shit-done/bin/lib/workstream.cjs` — workstream activation behavior to adapt onto the new authoritative state model

## Existing Code Insights

### Reusable assets
- `bin/lib/ljx-runtime-core.cjs` already centralizes config loading, typed phase resolution, and workstream-aware project resolution, so Phase 08 should not rebuild those concerns in each lifecycle command.
- `bin/lib/ljx-runtime-state.cjs` already provides the initial authoritative structured-state families, making it possible for the lifecycle shell to write real status instead of only patching markdown.
- `bin/lib/ljx-phase-context.cjs` already bootstraps phase-aware command context and stop reasons, making it the natural base for typed `discuss-phase`, `plan-phase`, and `execute-phase`.
- `bin/lib/ljx-state-tools.cjs` already contains recommendation filtering, progress parsing, and helper-safe action concepts, which should be promoted rather than bypassed.

### Established patterns to preserve
- GSD separates CLI/runtime helpers from workflow prompts; the runtime computes context, and the workflow layer consumes it.
- The accepted `ljx-GSD` command specs require every top-level command to end with a unified recommendation block, so Phase 08 should preserve that outer interaction contract.
- Current bridge-ready research commands are intentionally thin and phase-local, which makes them suitable route targets for a first typed lifecycle shell.

### Integration points
- `manifest.cjs` still marks `ljx-GSD-discuss-phase`, `ljx-GSD-plan-phase`, and `ljx-GSD-execute-phase` as deferred, which is the explicit gap Phase 08 must close.
- Current `ljx-GSD-next` is bridge-ready only because it executes helper-safe actions and stops honestly on deferred lifecycle commands; Phase 08 should replace that stop-heavy behavior with typed shell routing.
- Direct workflow convergence is already a locked contract in `LJX-GSD-CORE-COMMAND-SPECS.md`; Phase 08 is the first phase that must make that true operationally for the outer shell.

## Deferred Ideas

- Deep lifecycle integration of `code-review`, `code-review-fix`, and `verify-work` freshness/fix semantics
- Full typed completion of discovery/refine/experiment/review/paper/rebuttal domain engines
- Multi-step silent auto-chaining in `next` beyond one safe action plus recomputation
- Any rewrite strategy that deletes or materially weakens existing GSD or Auto workflow behavior before parity is proven

---

*Phase: 08-complete-core-lifecycle-shell*
*Context gathered: 2026-04-10*
