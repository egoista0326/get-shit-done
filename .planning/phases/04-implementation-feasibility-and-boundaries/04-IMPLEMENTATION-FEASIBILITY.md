# Phase 04 Implementation Feasibility

**Status:** feasible-with-constraints
**Generated:** 2026-04-14
**Purpose:** Map the approved GSD-first research-command framework into concrete implementation surfaces before the final framework review.

## Executive Summary

The approved architecture is implementable without turning GSD into a second research framework.

The practical implementation path is:

1. Keep upstream GSD runtime and workflow ownership intact.
2. Add a narrow CommonJS research-compiler adapter slice under `bin/lib/`.
3. Emit standalone `gsd` research command wrappers as thin install-time/generated surfaces.
4. Keep authoritative research evidence under `.planning/phases/<phase>/research/`.
5. Delay remote execution and high-side-effect automation until scenario coverage exists.

The roadmap is therefore feasible, but only if Phase 05 confirms the exact adapter boundaries, wrapper emission surface, and safe reuse list before Phase 06 begins code work.

## Implementation surface map

### Entrypoints

| Responsibility | Primary source surface | Concrete implementation owner | Feasibility note |
| --- | --- | --- | --- |
| Canonical CLI utility and artifact operations | `.planning/references/upstreams/get-shit-done/get-shit-done/bin/gsd-tools.cjs` | Upstream GSD foundation copied into the clean repo in Phase 06 | Strong direct baseline. This is the control-plane entrypoint, not a research-specific surface. |
| Canonical lifecycle/state/roadmap owner | `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/core.cjs`, `state.cjs`, `phase.cjs`, `roadmap.cjs`, `commands.cjs`, `verify.cjs`, `workstream.cjs` | Upstream GSD foundation | Strong direct baseline. These files already own locks, atomic writes, roadmap analysis, phase indexing, and completion helpers. |
| Lifecycle prompt/workflow surface | `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/discuss-phase.md`, `plan-phase.md`, `execute-phase.md`, `execute-plan.md`, `verify-work.md` | Upstream GSD workflow layer, preserved as the lifecycle shell | Research integration should feed these workflows through generated context/plan inputs, not replace them. |
| Public research command surface | Future thin `gsd` command wrappers generated at install/build time | New narrow wrapper/builder layer, not the old ljx bridge generator | Feasible, but the exact wrapper emission path must be fixed in Phase 05 because the current repo's builder is bridge-shaped. |
| Research-first pipeline entry | Future `gsd research-pipeline` wrapper that compiles an integer-phase roadmap request | Same wrapper layer plus research compiler | Feasible because roadmap creation can remain ordinary GSD integer phases. |
| Clean implementation workspace entry | Phase-local Phase 04/05/06 handoff docs plus clean workspace seed | Minimal clean workspace handoff created in Phase 04-03; repo initialization and upstream import are Phase 06 gates | Required because the current repo is historically dirty. |

### Generated skills

The likely generated command wrappers for the first-pass research surface are:

- `research-lit`
- `idea-discovery`
- `idea-creator`
- `novelty-check`
- `research-review`
- `research-refine`
- `research-refine-pipeline` as a folded wrapper over refinement plus experiment-planning handoff
- `auto-review-loop`
- `experiment-plan`
- `experiment-bridge`
- `experiment-audit`
- `result-to-claim`
- `ablation-planner`

Deferred-by-default wrappers remain:

- paper/rebuttal command packs
- remote execution and monitoring wrappers when they require paid or high-side-effect backends

Concrete implementation implication:

- These wrappers should be thin generated skill/command surfaces that compile research intent into ordinary GSD phase/context/plan requests.
- They should not own roadmap mutation, completion, `next`, canonical state, or a second artifact root.
- The current repo's `bin/install.js` and `bin/lib/build-skills.cjs` prove that install-time wrapper emission is a real surface, but those files are explicitly bridge-oriented and must not be reused wholesale.

### Hooks

Hook and install behavior remain part of the upstream compatibility boundary rather than the research compiler itself.

Concrete implication:

- Research integration should avoid introducing research-specific hook ownership.
- Any command-wrapper installation should ride on the same install/uninstall and managed-marker discipline as the future GSD package.
- The old `ljx` install path currently prints `ljx-GSD bridge-ready install complete` and builds compatibility wrappers. That is evidence for a build surface, but not a valid base for the target system.
- Phase 06 must therefore either copy upstream install/build surfaces first or replace the old builder with a narrower GSD-first installer before exposing the research wrappers.

### Config and state owners

| Surface | Owner | Concrete implementation rule |
| --- | --- | --- |
| `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records | Upstream GSD runtime owner path | No research helper writes these directly. All canonical writes stay in the upstream-equivalent owner path. |
| `.planning/config.json` | Upstream GSD config layer | Research integration does not extend this file with raw research keys. |
| `.planning/research.config.json` | New research config loader | Read, validate, normalize, and compile only. Do not turn it into canonical lifecycle state. |
| `.planning/phases/<phase>/research/RESEARCH_INDEX.md` | New phase-local research artifact/index helper | Evidence/status map only. It cannot complete phases or route lifecycle state. |
| Root Auto artifacts outside `.planning/` | Import/export mirrors only | Require explicit adoption with provenance before they count as phase-local evidence. |
| Workstream and workspace routing | Upstream GSD core/workstream layer | Research commands must inherit the same resolution rules, not create a second routing layer. |

### Compiler boundaries

The concrete adapter slice can stay narrow if it is implemented under `bin/lib/` as CommonJS helpers beside the upstream runtime.

The exact file names are still subject to Phase 05 review, but the likely module boundaries are:

| Likely module | Responsibility | Why this boundary is feasible |
| --- | --- | --- |
| `bin/lib/research-config.cjs` | Load and validate `.planning/research.config.json`, apply precedence, warn-and-ignore unknown keys by default, and fail-closed in strict mode | Matches the existing upstream `config.cjs` shape without polluting it. |
| `bin/lib/research-command-map.cjs` | Map public research commands to prompt-pack contracts, artifact contracts, and command families | Keeps command naming separate from lifecycle ownership. |
| `bin/lib/research-prompt-packs.cjs` | Store source-indexed prompt obligations and provenance summaries | Preserves Auto semantics without copying unstable prompt bodies wholesale. |
| `bin/lib/research-compiler.cjs` | Merge user intent, config, preset, prompt-pack obligations, and active GSD context into a compile result | Central compile step is narrower than a second workflow engine. |
| `bin/lib/research-phase-render.cjs` | Render ordinary phase request material, context fragments, planner constraints, and plan guidance | Makes research behavior appear as normal GSD work instead of typed routing. |
| `bin/lib/research-index.cjs` | Seed and update `research/RESEARCH_INDEX.md` and related phase-local folders | Keeps research evidence explicit without making it canonical state. |
| `bin/lib/research-evidence.cjs` | Advisory evidence checks for literature, review, audit, side effects, and taint | Supports verify/review without becoming completion authority. |
| `bin/lib/research-side-effects.cjs` | Classify side effects, authorization state, and danger-auto audit requirements | Keeps side-effect policy centralized and reviewable. |
| `bin/lib/research-adoption.cjs` | Adopt root Auto artifacts into phase-local `research/` with provenance | Enforces the import/export mirror rule cleanly. |

Concrete implementation decision:

- The first pass should stay CommonJS and runtime-first, because both the upstream runtime snapshot and the current repo's actual code surfaces are CommonJS (`*.cjs`).
- A TypeScript-first or SDK-first rewrite would add unnecessary migration risk before lifecycle parity exists.

## Entrypoints and module ownership by layer

### Layer 1: Canonical lifecycle runtime

Concrete owner files are already visible in the upstream reference snapshot:

- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/gsd-tools.cjs`
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/core.cjs`
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/config.cjs`
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/state.cjs`
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/phase.cjs`
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/roadmap.cjs`
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/commands.cjs`
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/verify.cjs`
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/workstream.cjs`

These should remain the single-writer and lifecycle-control base.

### Layer 2: Workflow shell

The workflow shell remains upstream GSD:

- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/discuss-phase.md`
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/plan-phase.md`
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/execute-phase.md`
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/execute-plan.md`
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/verify-work.md`

Concrete implication:

- Research commands should compile into these workflows' existing artifact vocabulary: `CONTEXT.md`, `*-PLAN.md`, `*-SUMMARY.md`, phase-local research artifacts, verify/UAT gates.
- The workflow layer does not need a `phase_type` branch to support research commands.

### Layer 3: Research compiler adapter

This is the new slice and should be the only genuinely new runtime family in the first research implementation.

Concrete implication:

- The adapter should be small enough that it can be reviewed as an overlay on top of GSD, not as a new orchestrator.
- Every adapter output must be either ordinary GSD input material or phase-local evidence/index material.

### Layer 4: Install/build wrapper surface

The current repo already exposes a real install/build surface:

- `bin/install.js`
- `bin/lib/build-skills.cjs`
- `bin/lib/source-roots.cjs`

However, this surface is explicitly bridge-oriented and currently tied to `ljx-GSD` naming and compatibility wrappers.

Concrete implication:

- `source-roots.cjs` is at most a tiny generic utility reference point; it should not be treated as architectural reuse.
- `install.js` and `build-skills.cjs` are not valid target implementations as-is. They must be replaced or heavily rewritten before they can emit `gsd` research wrappers honestly.

## Upstream reuse candidates

### Direct baseline candidates

| Candidate | Evidence | Reuse stance | Earliest phase |
| --- | --- | --- | --- |
| Upstream runtime CLI and state/phase/roadmap libs | Upstream reference `bin/gsd-tools.cjs` and `bin/lib/*.cjs` | Copy/reuse baseline | Phase 06 |
| Upstream workflow prompts | Upstream reference `workflows/*.md` | Preserve with minimal edits | Phase 06/07 |
| Upstream planning templates | Upstream reference `templates/*.md` | Preserve naming and artifact contracts | Phase 06/07 |
| Upstream lock and atomic-write behavior | `core.cjs`, `state.cjs`, `phase.cjs` contracts | Preserve directly | Phase 06 |

### Current ljx-gsd stance

The user decision for Phase 04 is that `ljx-gsd` now has low reference value and should not be treated as a meaningful reuse pool.

Practical consequence:

- Default stance: no structural reuse from `ljx-gsd`.
- Primary value: negative evidence, failure history, and occasional proof that a utility category exists.
- Exception bar: only tiny generic utilities may be independently reimplemented later, and only if the same value is not already present in upstream GSD.

This reduces implementation ambiguity rather than increasing it, because the target path becomes more directly: upstream GSD baseline plus a new research adapter slice.

## Quarantine or rewrite zones

These surfaces are not acceptable as direct implementation bases for the target architecture:

| Surface | Evidence | Why it must be quarantined or rewritten |
| --- | --- | --- |
| `bin/lib/ljx-lifecycle-shell-tools.cjs` | Contains `primaryCommand`, `routeKind`, and multiple direct-workflow lifecycle route tables | Too tightly coupled to typed routing and bridge lifecycle logic. Treat as historical-only. |
| `bin/lib/ljx-bridge-contract.cjs` | Phase-type keyed review and recommendation logic | Bridge contract, not GSD-first lifecycle ownership. Treat as historical-only. |
| `bin/lib/codex-conversion.cjs` | Builds `ljx-GSD-*` command wrappers and compatibility surfaces | Represents the old wrapper-conversion strategy the user wants to avoid. Treat as historical-only. |
| `bin/lib/ljx-research-pipeline-tools.cjs` | Explicit `phase_type` handling, stage reuse logic, and auto phase creation logic | Violates the no-second-control-plane and no-typed-routing direction. Treat as historical-only. |
| Old direct workflow command modules as implementation bases | `bin/lib/ljx-idea-discovery-tools.cjs` and related `ljx-*` research modules | Historical-only. They are bound to old shell assumptions and are not a preferred reference source. |
| Old install/build surface as target installer | `bin/install.js`, `bin/lib/build-skills.cjs` as currently written | Emits `ljx-GSD` bridge-ready output and compatibility wrappers, not the target `gsd` framework. |
| Current package identity | `package.json` (`name: ljx-gsd`) | Package naming, install messaging, and public command surface must be reset for the new system. |

## Feasibility risks

### R-1: Upstream source baseline is only partially mirrored in the current workspace

The upstream reference snapshot clearly contains runtime libs, workflows, references, and templates, but it does not currently expose a full upstream package tree in the working repo snapshot. For example, the mirrored upstream path provides `bin/lib/*.cjs` but the package manifest is not available at the expected mirrored location.

Impact:

- Phase 06 cannot safely begin from a partial upstream snapshot alone.
- The clean implementation workspace must either vendor the full upstream source baseline or pin an auditable upstream source checkout before build work starts.

### R-2: The currently visible install/build surface is still bridge-shaped

The current repo's real install entrypoint and builder are explicitly branded around `ljx-GSD bridge-ready` behavior.

Impact:

- Wrapper emission is feasible, but not by carrying forward the existing builder unchanged.
- Phase 05 must review whether to rebuild this surface narrowly or copy upstream install/build machinery first and then layer wrappers on top.

### R-3: The current test corpus is useful but semantically mixed

The test inventory contains both narrow utility tests and strongly bridge-oriented tests such as `idea-discovery-bridge.test.cjs`, `research-pipeline-cutover.test.cjs`, and `plan-phase-shell.test.cjs`.

Impact:

- Tests are mostly historical evidence and occasional invariant hints.
- They are not safe to inherit wholesale as acceptance criteria for v2.0.
- Phase 06/07/08 need a deliberate test triage path rather than a blanket port.

### R-4: SDK and wrapper surface are not the same decision

Phase 01 and Phase 02 already identify SDK as a compatibility boundary, but not a lifecycle owner.

Impact:

- The runtime-first CLI implementation path is feasible now.
- SDK exposure remains review-dependent and should not block the first-pass CLI/compiler implementation.

### R-5: High-side-effect execution commands remain the most dangerous area

The architecture is feasible for literature, idea, refinement, planning, audit, and claim flows because these can initially compile to ordinary GSD work without external execution.

Impact:

- `run-experiment`, `monitor-experiment`, W&B, SSH, Modal, Vast.ai, GPU, and destructive cleanup remain deferred or boundary-only until Phase 09 scenario coverage exists.
- This does not block the roadmap, but it must stay explicit.

## Phase 05 review inputs

Phase 05 should explicitly review these feasibility-derived questions before implementation starts:

1. What is the exact public wrapper surface: generated skills only, CLI aliases plus generated skills, or another audited emission path?
2. What is the exact install/build boundary for the new `gsd` package, given that the current builder is bridge-oriented?
3. How should the missing or partial upstream package/install snapshot be reconciled before foundation work?
4. What is the exact first-pass `RESEARCH_INDEX.md` minimum contract for literature, review, audit, side effects, and taint?
5. Which remote execution surfaces remain explicitly deferred even if command names exist?
6. Whether any SDK-facing adaptation is included before or after CLI parity.
7. Whether any tiny generic utility from the old repo deserves independent reimplementation despite the default no-reuse stance.

## Why the roadmap is implementable

The roadmap remains implementable for structural reasons, not optimistic ones.

1. Upstream GSD already has the lifecycle machinery the research layer needs: phase creation, decimal insertion, ordinary integer roadmaps, plans, waves, checkpoints, summaries, verification, roadmap analysis, state locking, and single-writer canonical artifacts.
2. Auto/ARIS semantics can be preserved as prompt-pack obligations and phase-local evidence contracts rather than as a second runtime or second state root.
3. The target architecture only needs one genuinely new implementation family: the research compiler adapter slice.
4. The current repo is now treated mainly as negative evidence, which simplifies the build path by removing the expectation of meaningful structural reuse.
5. The most dangerous surfaces, especially external execution and paid side effects, are already deferred behind later scenario requirements rather than hidden in Phase 08.

## Review-dependent items

These items are feasible, but should not be treated as locked until Phase 05 confirms them:

- Exact file names and division of the new research compiler modules.
- Exact wrapper emission format for standalone `gsd` research commands.
- Exact minimum upstream source snapshot required before foundation work.
- Whether any tiny generic utility from the old repo deserves independent reimplementation despite the default no-reuse stance.
- Exact placement of SDK compatibility work relative to CLI parity.

## Recommended build sequence

### Phase 05

- Review this feasibility map against the framework rules.
- Approve or reject the proposed adapter boundaries.
- Approve or reject each reuse candidate class.
- Lock the installer/wrapper strategy and the baseline source-reconciliation strategy.

### Phase 06

- Start from the clean implementation workspace after explicit upstream baseline import and branch initialization.
- Import or copy the upstream GSD foundation first.
- Preserve CommonJS runtime shape and canonical owner surfaces.
- Replace `ljx-gsd` package identity and bridge install messaging with target `gsd` identity.

### Phase 07

- Re-establish ordinary GSD lifecycle parity before any research command integration.
- Verify state ownership, roadmap mutation, progress/next behavior, review/verify/UAT gates, and workstream/workspace behavior.

### Phase 08

- Implement the research compiler adapter slice first: config loader, command map, prompt-pack registry, compiler, phase renderer, index helper, evidence helper, and side-effect helper.
- Expose thin first-pass wrappers for literature, idea, novelty, review/refine, experiment-plan, audit, result-to-claim, and ablation planning.
- Keep remote execution and high-side-effect wrappers bounded or deferred until scenario coverage exists.

## Feasibility verdict

**Verdict:** feasible-with-constraints.

The roadmap is concrete enough to build because the implementation can stay GSD-first, CommonJS-first, and adapter-first.

The non-negotiable constraints are:

- Do not reuse the typed-routing or bridge-lifecycle layer.
- Do not let research config or root Auto artifacts become canonical state.
- Do not start implementation from the dirty historical repo.
- Do not treat wrapper generation, SDK exposure, or remote execution as already solved before Phase 05 reviews them.

If those constraints hold, the current roadmap is not only conceptually sound, but also implementable as a staged codebase transition rather than another architecture rewrite.
