# Phase 08 Research: Core Lifecycle Shell

**Date:** 2026-04-10  
**Status:** Research complete  
**Phase:** 08-complete-core-lifecycle-shell  
**Requirement focus:** `IMPL-02`

## User Constraints

The implementation approach for Phase 08 must preserve these project-level constraints:

1. Study and reuse the current GSD implementation and the current Auto research implementation before inventing new lifecycle-shell behavior.
2. Follow a minimal-modification principle: do not delete or intentionally narrow original GSD or Auto capabilities as a shortcut.
3. Reuse GSD as the outer runtime base where practical, and integrate Auto research as a native workflow family without deleting Auto's existing workflow strengths or skill semantics.

These constraints are already reflected in:

- `.planning/PROJECT.md`
- `LJX-GSD-DESIGN-DECISION-LOG.md`
- `.planning/phases/08-complete-core-lifecycle-shell/08-CONTEXT.md`

## Summary

Phase 08 should not invent a second shell beside the new runtime substrate. It should turn that substrate into the real outer lifecycle by reusing GSD's orchestration shape where it fits and filling only the gaps GSD does not cover for typed research-native phases.

The practical recommendation is:

1. Add one shared lifecycle-shell helper module above `ljx-runtime-core`, `ljx-runtime-state`, and `ljx-phase-context`.
2. Reuse GSD's lifecycle concepts for context bootstrap, recommendation blocks, focused discuss flow, plan/execution separation, and one-step continuation.
3. Route typed phases through one primary lifecycle command per `phase_type`, while keeping advanced direct tools callable manually.
4. Adopt valid direct-workflow artifacts into lifecycle state and thin lifecycle wrappers instead of rerunning the workflow by default.
5. Promote `ljx-GSD-discuss-phase`, `ljx-GSD-plan-phase`, `ljx-GSD-execute-phase`, and the upgraded `ljx-GSD-next` onto the preview/install surface in the same phase, because the current public build cannot expose those commands without new builders and runtime-copy plumbing.

The recommended default primary lifecycle route table for Phase 08 is:

| Phase type | Primary planning route | Primary execution route | Advanced direct tools still visible |
|---|---|---|---|
| `engineering` | GSD-style plan generation into phase-local `PLAN.md` files | GSD-style plan execution from incomplete `PLAN.md` files | `code-review`, `verify-work` |
| `discovery` | thin lifecycle plan that points to `ljx-GSD-idea-discovery` | `ljx-GSD-idea-discovery` | `novelty-check`, `research-review`, `research-refine` |
| `refine` | thin lifecycle plan that points to `ljx-GSD-research-refine` | `ljx-GSD-research-refine` | `experiment-plan` |
| `experiment` | thin lifecycle plan that adopts or creates the `experiment-plan` wrapper | `ljx-GSD-experiment-bridge` | `review-loop`, `claim-gate` |
| `analysis` | thin lifecycle plan that defaults to `ljx-GSD-claim-gate` | `ljx-GSD-claim-gate` | `research-review`, `result-to-claim`, `ablation-planner`, `review-loop` |
| `paper` | thin lifecycle plan that points to `ljx-GSD-paper-pipeline` | `ljx-GSD-paper-pipeline` | `rebuttal` |

Important nuance:

- `analysis` is the only phase type whose public tool family is visibly broader than one command. Phase 08 should still choose one default shell route so `plan-phase`, `execute-phase`, and `next` stay deterministic. The best current default is `claim-gate`, because it is the broadest high-level analysis gate and can still expose narrower evaluators as advanced direct tools.
- This route table should be overridable later through phase-record lifecycle metadata, but Phase 08 does not need a whole new phase taxonomy to ship.

## Standard Stack

### Runtime modules

- Use the existing Node CommonJS style already used across `bin/lib/*.cjs`.
- Keep lifecycle-shell behavior in reusable library modules under `bin/lib/`, not embedded in user-facing skill text.
- Reuse the Phase 07 substrate modules as the only low-level truth layer:
  - `bin/lib/ljx-runtime-core.cjs`
  - `bin/lib/ljx-runtime-state.cjs`
  - `bin/lib/ljx-phase-context.cjs`

### Public skill generation

- Reuse `bin/lib/codex-conversion.cjs` for custom skill builders.
- Reuse `bin/lib/build-skills.cjs` as the only preview/install bridge surface generator.
- Keep `bin/lib/manifest.cjs` as the authoritative public-surface readiness map.

### Authoritative state and mirrors

- Structured lifecycle truth should remain in `.planning/state/phase-records/*.json`.
- `CONTEXT.md`, `PLAN.md`, and `SUMMARY.md` remain required operator-facing lifecycle artifacts.
- Phase-type-specific artifacts such as `IDEA_REPORT.md`, `METHOD_SPEC.md`, `EXPERIMENT_PLAN.md`, `CLAIMS.md`, and paper workspace outputs remain substantive domain artifacts; lifecycle wrappers should reference or adopt them rather than duplicating their content heavily.

### Verification stack

- Unit and bridge coverage should stay in `node:test` suites under `tests/`.
- Preview/install verification should continue using `node bin/install.js --preview`.
- Full regression should continue using `npm test`.

## Reference Implementations To Reuse

### GSD lifecycle references

#### `~/.codex/get-shit-done/bin/lib/init.cjs`

Use as the primary reference for:

- `phase-op`, `plan-phase`, and `execute-phase` bootstrap payload shape
- next-phase and current-phase recommendation logic
- separating structured init payload construction from workflow prompting

Do not copy its markdown-first truth assumptions directly. Reuse the payload design pattern and routing shape.

#### `~/.codex/get-shit-done/workflows/discuss-phase.md`

Use as the reference for:

- focused gray-area questioning
- existing-context gates
- avoiding re-asking already locked decisions

Phase 08 should preserve this focused interaction style, not regress to a large generic questionnaire.

#### `~/.codex/get-shit-done/workflows/plan-phase.md`

Use as the reference for:

- research -> plan -> verify outer workflow shape
- plan verification loop and artifact discipline
- keeping plan creation separate from execution

Phase 08 should reuse this lifecycle shape for engineering phases and shell-level user flow, while swapping in typed research-native routing where GSD has no equivalent.

#### `~/.codex/get-shit-done/workflows/execute-phase.md`

Use as the reference for:

- execute-phase as an orchestrator rather than a stateful second control plane
- wave discipline, plan inventory, and execution/summarization separation
- explicit completion artifacts rather than hidden continuation

Phase 08 should reuse these ideas for engineering execution and shell orchestration boundaries, but it should not force every research phase into a fake multi-plan executor when a bounded direct workflow is the accepted route.

#### `~/.codex/get-shit-done/bin/lib/core.cjs` and `roadmap.cjs`

Use as references for:

- centralized resolver organization
- current/next phase inference patterns
- keeping roadmap parsing and shared helper logic out of prompt text

Again, reuse the organization pattern, not the markdown-first truth model.

### Current ljx-GSD references

#### `bin/lib/ljx-phase-context.cjs`

Already demonstrates the correct Phase 07 split:

- common phase/bootstrap logic in one helper
- domain-specific filenames, questions, and recommendations outside the substrate

Phase 08 should extend this pattern into a lifecycle-shell helper rather than introducing per-command ad hoc resolvers again.

#### `bin/lib/ljx-state-tools.cjs`

This is the most important "gap map" for Phase 08:

- it still infers next steps mostly from file counts
- it still treats `next` as helper-safe only
- it still uses placeholder lifecycle heuristics such as "if no plan files, recommend `plan-phase`"

Phase 08 should replace these heuristics with authoritative lifecycle-shell state and typed route resolution.

#### `bin/lib/build-skills.cjs` and `bin/lib/codex-conversion.cjs`

These files already prove that bridge readiness is not just a runtime question. Public commands must also have:

- a custom or converted skill builder
- runtime helper copies into the preview/install tree
- manifest readiness aligned with generated skill availability

At the moment they cover `progress`, `next`, `pause`, `resume`, code-review, verify-work, and research helpers, but there are no dedicated builders for `ljx-GSD-discuss-phase`, `ljx-GSD-plan-phase`, or `ljx-GSD-execute-phase`.

### Auto research references

#### `~/.codex/skills/idea-discovery/SKILL.md`

Preserve:

- bounded multi-stage discovery semantics
- `IDEA_REPORT.md`-style substantive output
- explicit downstream handoff suggestions

#### `~/.codex/skills/research-refine/SKILL.md`

Preserve:

- method-sharpening semantics
- `METHOD_SPEC`-style substantive output
- bounded refinement rather than hidden pipeline expansion

#### `~/.codex/skills/experiment-plan/SKILL.md`

Preserve:

- experiment planning as a planning tool, not execution
- compact tracker artifact vocabulary

This is especially important because experiment phases in the lifecycle shell need both a plan-stage route and an execute-stage route.

#### `~/.codex/skills/auto-review-loop/SKILL.md`, `research-review/SKILL.md`, `result-to-claim/SKILL.md`, `ablation-planner/SKILL.md`, `paper-writing/SKILL.md`, `rebuttal/SKILL.md`

Preserve:

- analysis and paper semantics as distinct expert tools
- bounded outputs and explicit continuation recommendations
- no hidden second control plane

Phase 08 should use these as routed direct workflows or advanced direct tools, not flatten them away.

## Architecture Patterns

### Pattern 1: Add one shared lifecycle-shell helper above the substrate

Create one shared helper module, such as `bin/lib/ljx-lifecycle-shell-tools.cjs`, that owns:

- typed lifecycle route resolution by `phase_type`
- thin lifecycle status updates inside `phase-records`
- discuss/plan/execute context assembly
- direct-artifact adoption checks
- lifecycle-aware next-action resolution

Do not scatter these rules across `state-tools`, `codex-conversion`, and command-specific helpers.

### Pattern 2: Use one primary shell route per phase type, with override support

The shell must stay deterministic. Therefore:

- each `phase_type` gets one default primary shell route
- advanced direct tools stay visible as alternatives
- future overrides may live under phase-record lifecycle metadata

Recommended override model:

- if `phase_record.lifecycle.route.primary_command` exists, use it
- otherwise use the default table in the Summary above

This keeps Phase 08 small while leaving room for later specialization.

### Pattern 3: Adopt direct artifacts into lifecycle wrappers instead of rerunning

When a direct workflow already produced valid substantive outputs:

- do not rerun it by default
- create or refresh the thin lifecycle wrapper artifact
- record adoption in authoritative phase-record lifecycle state
- route `next` to the following safe lifecycle step

This is the only way to satisfy the locked direct-workflow convergence rule without turning the shell into a second domain engine.

### Pattern 4: Put lifecycle status in phase records, not only in file counts

Phase 08 needs minimal lifecycle metadata in `phase-records/{phase}.json`, for example:

- `lifecycle.discuss.status`
- `lifecycle.discuss.context_artifact`
- `lifecycle.plan.status`
- `lifecycle.plan.plan_artifacts`
- `lifecycle.plan.adopted_from`
- `lifecycle.execute.status`
- `lifecycle.execute.summary_artifacts`
- `lifecycle.route.primary_command`

The exact keys are implementation discretion, but the principle is fixed:

- `next` should resolve from structured lifecycle truth first
- file existence remains supporting evidence, not the only source of truth

### Pattern 5: Keep lifecycle wrappers thin for research-native phases

For `discovery`, `refine`, `experiment`, `analysis`, and `paper`:

- lifecycle `PLAN` and `SUMMARY` wrappers should remain concise
- substantive domain logic should stay in existing domain artifacts
- shell artifacts should explain route, adoption status, evidence reviewed, and next step

This preserves both GSD traceability and Auto workflow substance without double-writing the same content everywhere.

### Pattern 6: Keep `next` to one safe action plus recomputation

`next` should:

1. resolve the highest-ranked safe lifecycle step from authoritative state
2. execute it only if it is safe and bridge-ready
3. recompute recommendations from updated state

Do not chain multiple lifecycle steps in one `next`. That would:

- hide gates
- blur ownership
- make failures harder to localize
- prematurely swallow Phase 09 quality-gate semantics

## Don't Hand-Roll

- Do not hand-roll a second path/config/phase/workstream resolver outside the Phase 07 substrate.
- Do not hand-roll a markdown-first lifecycle state engine when `phase-records` can store authoritative status.
- Do not hand-roll duplicate planning/execution logic for research phases when current Auto workflows already provide accepted substantive behavior.
- Do not hand-roll a separate preview/install exposure path outside `manifest.cjs`, `codex-conversion.cjs`, and `build-skills.cjs`.
- Do not hand-roll multi-step `next` chaining that bypasses the accepted command-level recommendation contract.

## Common Pitfalls

### Pitfall 1: Copying GSD's file-count heuristics directly into the new shell

Current `ljx-state-tools.cjs` shows why Phase 08 exists: file counts alone cannot express typed lifecycle truth once direct workflows and adoption semantics enter the picture.

### Pitfall 2: Treating `phase_type` as enough without a primary route rule

`analysis` is the clearest example: `research-review`, `result-to-claim`, `ablation-planner`, `review-loop`, and `claim-gate` are all valid analysis-adjacent tools. Without a default shell route, `next` becomes non-deterministic.

### Pitfall 3: Rewriting direct workflows instead of wrapping them

If Phase 08 rewrites discovery, refine, experiment, analysis, or paper internals instead of routing to their current accepted helpers, it will swallow Phases 10-12 prematurely and violate the minimal-modification rule.

### Pitfall 4: Letting execute-phase absorb Phase 09

Phase 08 should route coherently toward `code-review` and `verify-work` where already supported, but freshness invalidation, fix loops, and deeper review-gate semantics still belong to Phase 09.

### Pitfall 5: Promoting manifest readiness without build/runtime plumbing

Changing `manifest.cjs` alone is insufficient. A command is not actually bridge-ready until:

- its helper exists
- its skill builder exists
- `build-skills.cjs` copies required runtime files
- `node bin/install.js --preview` succeeds

### Pitfall 6: Duplicating substantive domain content in shell artifacts

If `PLAN.md` or `SUMMARY.md` rewrites the whole `IDEA_REPORT`, `METHOD_SPEC`, `CLAIMS`, or paper workspace narrative, the shell becomes noisy and the system regresses to multiple competing truths.

## Code Examples

### Example 1: Current shared phase bootstrap pattern worth extending

- `bin/lib/ljx-phase-context.cjs`

Why it matters:

- it already centralizes common command bootstrap
- it keeps domain outputs out of the shared helper
- Phase 08 should extend this pattern into lifecycle-shell context, not replace it

### Example 2: Current next/progress heuristic that must be replaced

- `bin/lib/ljx-state-tools.cjs`

Why it matters:

- `inferRecommendations()` currently infers lifecycle mostly from `CONTEXT/PLAN/SUMMARY/VERIFICATION` file presence
- that is acceptable for the bridge shell but insufficient for typed direct-workflow adoption

### Example 3: GSD init payload patterns to reuse

- `~/.codex/get-shit-done/bin/lib/init.cjs`

Why it matters:

- `cmdInitPhaseOp`, `cmdInitPlanPhase`, and `cmdInitExecutePhase` show the right outer pattern: one structured payload, then a thinner workflow layer

### Example 4: Current public build gap

- `bin/lib/build-skills.cjs`
- `bin/lib/codex-conversion.cjs`

Why it matters:

- these files already have dedicated builders for `new-project`, `map-codebase`, `progress`, `next`, and the bridge-ready research/quality tools
- they currently have no dedicated builder path for `ljx-GSD-discuss-phase`, `ljx-GSD-plan-phase`, or `ljx-GSD-execute-phase`

Phase 08 must close that build-surface gap explicitly.

## Recommended Phase Split

The roadmap's four-plan split is the right implementation order:

1. `08-01` should land the shared lifecycle-shell helper plus focused typed `discuss-phase`.
2. `08-02` should land phase-type-aware `plan-phase`, including direct-artifact adoption and thin lifecycle wrappers.
3. `08-03` should land typed `execute-phase`, including engineering execution reuse and bounded direct-workflow dispatch for research-native phases.
4. `08-04` should replace helper-safe `next` with lifecycle-aware progression on top of authoritative lifecycle status.

That ordering keeps the shell coherent:

- discuss establishes the route and context
- plan defines or adopts the executable unit
- execute performs or adopts the bounded workflow
- next becomes trustworthy only after the first three exist

## Conclusion

The best Phase 08 implementation is not "port GSD whole cloth" and not "invent a new shell from scratch." It is:

- GSD-first for lifecycle shape
- Phase 07 substrate-first for truth and resolution
- Auto-preserving for substantive research workflows
- deterministic through one primary route per phase type
- honest through artifact adoption instead of silent reruns
- complete through public build promotion, not just internal helper code

That is the narrowest implementation that satisfies `IMPL-02` without swallowing later phases.
