# Phase 02 Proposal Round 1

**Status:** In progress
**Purpose:** Coordinate independent target-framework proposal lanes before any main-agent synthesis.
**Source contract:** `.planning/phases/02-target-gsd-framework-design-rounds/02-01-PLAN.md`

## Proposal Lanes

| Lane | Output File | Primary Question |
| --- | --- | --- |
| GSD-first lifecycle proposal | `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-GSD-FIRST.md` | What is the strictest design that preserves upstream GSD as lifecycle owner and treats research as ordinary phases/plans/artifacts? |
| Research Command Compiler proposal | `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RESEARCH-COMPILER.md` | How should standalone research commands compile Auto/ARIS prompts, config, and artifact contracts into ordinary GSD inputs? |
| Minimal adapter proposal | `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-MINIMAL-ADAPTER.md` | What is the smallest command/config/artifact/prompt-pack adapter surface needed without changing GSD core schema? |
| Adversarial risk register | `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RISK-REGISTER.md` | What can fail, especially around `danger-auto`, false completion, external services, package/SDK drift, and no-phase-type compatibility? |

## Write Ownership

- Each worker writes only its assigned output file.
- Workers must not edit `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, or `02-CONTEXT.md`.
- Workers must not overwrite another lane's proposal or any Phase 01 artifact.
- The main agent owns this round report and later synthesis.
- no-canonical-write: proposal workers may not write canonical project state.

## Required Comparison Axes

Each proposal should address these axes directly, or state why a lane delegates an axis to another proposal:

- Lifecycle ownership: what GSD owns, what research commands own, and what must remain serialized.
- Command surface: standalone `gsd` research commands, pipeline wrappers, and deferred command packs.
- Phase/plan granularity: single-phase default, plan-level decomposition, decimal insertion, and research-first roadmap mode.
- Artifact root: phase-local `research/`, `RESEARCH_INDEX.md`, raw evidence, summaries, provisional outputs, and import/export mirrors.
- Research config and presets: `.planning/research.config.json`, precedence, `safe`, `auto`, `danger-auto`, deep defaults, and parameter pruning.
- Side-effect gates: git push, PR, W&B, SSH, Modal, Vast.ai, GPU, notifications, cleanup, credentials, and missing authorization behavior.
- Completion semantics: raw evidence, review/verify gates, advisory summaries/checklists, clean/degraded/provisional/overridden completion.
- Git and hook behavior: what follows ordinary GSD discipline and what is research-specific support behavior.
- Subagent roles: proposal/review lanes, research workers, reviewer backends, execution monitors, and canonical state write boundaries.
- Upgrade boundary: latest upstream source/package verification, SDK compatibility, and reusable versus quarantined ljx-GSD areas.
- No-phase-type proof: why the proposal does not need `phase_type`, typed routing, broad phase schema expansion, or a second control plane.

## Required Source Reads

Every proposal must read:

- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md`
- `.planning/phases/01-source-framework-extraction/01-FRAMEWORK-SYNTHESIS.md`
- `.planning/phases/01-source-framework-extraction/01-CROSS-FRAMEWORK-GAP-MAP.md`
- At least one lane-specific Phase 01 source artifact from the canonical reference list in `02-CONTEXT.md`.

## Output Shape

Each lane output should use this structure:

1. Position Summary
2. Source Evidence Used
3. Proposed Architecture
4. Comparison Against Other Design Families
5. Required GSD Changes
6. Research Capability Preservation
7. Preset, Gate, And Side-Effect Semantics
8. Completion Semantics
9. No-Phase-Type Proof
10. Risks And Open Questions
11. Recommendation For Round 2

## Round 2 Inputs

Round 2 must cross-read all four proposals and revise the design space. Round 1 must not declare the final target framework.

## Round 1 Comparison

### Agreement Points

All four proposal lanes converge on these points:

1. **Research Command Compiler is the controlling architecture.** Standalone `gsd research-*` commands should read research intent/config/prompt-pack contracts and compile them into ordinary GSD phase/context/plan/artifact inputs. They should not become a runtime lifecycle overlay.
2. **GSD remains the lifecycle owner.** Discuss, plan, execute, review, verify/UAT, progress, state, roadmap mutation, phase completion, milestone completion, locks, atomic writes, and git discipline remain ordinary GSD responsibilities.
3. **No `phase_type`.** No lane found a need for `phase_type`, typed phase routing, broad phase schema expansion, typed route tables, or a second authoritative control plane. Command identity, prompt-pack provenance, context text, plan tasks, and phase-local artifacts are sufficient.
4. **Single-phase default is correct.** Research commands should default to one inserted GSD phase in existing-roadmap mode. Auto/ARIS internal stages map to plans, tasks, checkpoints, and artifact contracts. Multiple phases are reserved for true roadmap/work-mode boundaries such as remote execution, raw evidence collection, audit, or claim gating.
5. **Roadmap insertion has two modes.** Existing-roadmap mode inserts decimal phases after the current phase. Research-first project/milestone mode uses normal integer phases because the whole roadmap is research-centered.
6. **Research config stays separate.** `.planning/research.config.json` is the right project-level config path. Research parameters are normalized by the compiler and compiled into GSD inputs; they should not pollute upstream `.planning/config.json`.
7. **Preset semantics are stable.** Supported presets are `safe`, `auto`, and `danger-auto`; default is `safe`; all presets default to deep research and deep review. `auto` is not shallow.
8. **`danger-auto` needs explicit audit burden.** It can use maximum available automation permissions only when the environment has authorization. It must record decisions, side effects, missing authorization, quality-gate overrides, degraded paths, and provisional outputs. It cannot report clean completion after skipped operations, missing credentials, or overridden gates.
9. **Phase-local research root is authoritative.** Research outputs live under `.planning/phases/<phase>/research/`. Root Auto/ARIS files remain import/export mirrors until explicitly adopted with provenance.
10. **Completion must be evidence-based.** Summaries, checkboxes, file presence, plan counts, `progress`, `next`, context helpers, caches, PR links, W&B URLs, or bridge-ready outputs are advisory. Research completion requires raw evidence plus review/verify/UAT gates and explicit completion status.
11. **Paper/rebuttal remain deferred.** Paper, rebuttal, slides, poster, camera-ready, and post-acceptance workflows should be future compiler packs, not the default v2.0 research pipeline.
12. **SDK/package baseline is a boundary, not ignored.** Phase 02 should record source/package latest drift and SDK ambiguity as explicit implementation blockers or boundaries, not implicit assumptions.

### Disagreements

The lanes do not meaningfully disagree on architecture direction. The remaining disagreements are scope and precision questions:

1. **Compiler versus minimal adapter naming.** The Research Compiler lane describes a fuller compiled bundle. The Minimal Adapter lane wants the same architecture expressed as the smallest helper surface. Round 2 should merge these: public architecture is Research Command Compiler; implementation slice is minimal adapter.
2. **Immediate skeleton creation.** The Compiler lane allows `RESEARCH_INDEX.md` and artifact skeleton seeding after the owning phase exists. The Minimal Adapter and Risk lanes warn that skeletons can become false evidence. Round 2 should distinguish skeleton/index creation from evidence satisfaction.
3. **Command surface size.** GSD-first and Compiler lanes list a broader first-pass command family. Minimal Adapter wants a smaller blast-radius ordering and defers execution-heavy wrappers. Round 2 should produce a first-pass command table with `keep`, `boundary`, and `defer` status.
4. **`auto` side-effect preauthorization.** All lanes agree `safe` pauses and `danger-auto` can use available authorizations. The exact storage and vocabulary for `auto` preauthorization is unresolved.
5. **`RESEARCH_INDEX` format.** All lanes require a research index. It is unresolved whether Markdown alone is enough, whether a JSON sidecar is required, or whether a deterministic `RESEARCH_INDEX.json` should exist for machine checks.
6. **SDK treatment.** All lanes agree SDK should not own lifecycle. It is unresolved whether Phase 02 should define an SDK adapter target now or defer SDK details to implementation planning.
7. **Baseline reconciliation timing.** All lanes mention local source `1.35.0` versus installed/npm `1.34.2` drift. It is unresolved whether Phase 02 chooses a baseline or simply makes reconciliation a Phase 05/06 blocker.

### Unresolved Questions

Round 2 must answer or explicitly defer these questions:

1. What is the exact first-pass command table for v2.0: `research-lit`, `idea-discovery`, `idea-creator`, `novelty-check`, `research-review`, `research-refine`, `research-pipeline`, `experiment-plan`, `experiment-audit`, `result-to-claim`, `ablation-planner`, `auto-review-loop`, `analyze-results`, `experiment-bridge`, `run-experiment`, and `monitor-experiment`?
2. Which execution-heavy commands should be first-pass support wrappers versus deferred until side-effect scenario tests exist?
3. What exact `.planning/research.config.json` schema should Phase 02 specify, including CLI > command config > preset > default precedence, unknown-key handling, and first-pass preserved/deferred parameters?
4. What side-effect policy vocabulary should be used for `safe`, `auto`, and `danger-auto`: disabled, confirm, preauthorized, missing-authorization, degraded, overridden, blocked, and clean?
5. Where is `auto` preauthorization recorded, and how is it distinguished from `danger-auto` maximum-permission operation?
6. What exact minimal fields must `RESEARCH_INDEX.md` contain, and should a JSON sidecar be required for deterministic checks?
7. What is the adoption flow for root Auto artifacts into the phase-local research root, including provenance, source path, timestamp, evidence class, and conflict handling?
8. How should `danger-auto` distinguish non-overridable hard gates from overridable research-quality gates without adding broad phase schema?
9. Does Phase 02 choose upstream source `1.35.0`, installed package/npm `1.34.2`, or a mandatory reconciliation step before implementation?
10. Is SDK support a Phase 02 compatibility target, a Phase 05 implementation-boundary topic, or a deferred adapter after CLI parity?
11. What no-`phase_type` scenario proof should Round 2 require across literature/idea, experiment planning, execution/evidence, audit/claim, insert mode, and research-first roadmap mode?
12. Which ljx-GSD helper ideas are eligible for later quarantine review, and which names/patterns are banned immediately to avoid bridge contamination?

### Rejected Directions

Round 1 rejects these directions for Phase 02 synthesis:

1. Adding `phase_type`, typed phase routing, phase kind fields, typed route tables, or broad phase schema changes.
2. Letting research commands directly write canonical `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, progress, or phase completion state.
3. Treating root Auto/ARIS artifacts as authoritative routing, resume, completion, or evidence state before phase-local adoption.
4. Creating a second research roadmap/control plane that runs parallel to GSD lifecycle commands.
5. Mechanically mapping Auto/ARIS internal `Phase`, `Stage`, or `Step` labels to GSD roadmap phases.
6. Letting `danger-auto` mean clean completion after missing credentials, skipped side effects, failed gates, or overridden quality checks.
7. Letting summaries, checkboxes, plan counts, file presence, context helpers, `progress`, `next`, W&B URLs, PR links, or bridge-ready status satisfy research completion without raw evidence and gates.
8. Placing research parameters directly into upstream `.planning/config.json` or passing raw research config through GSD core.
9. Making support tools such as wiki, watchdog, reviewer providers, W&B, Modal, Vast.ai, SSH, notifications, or cleanup into lifecycle owners.
10. Making SDK support the first blocker for command compiler design, while still leaving future SDK adaptation impossible.

### Requirement Coverage

| Requirement | Round 1 Coverage | Remaining Round 2 Need |
| --- | --- | --- |
| ARCH-01 | All lanes keep upstream GSD as lifecycle/control-plane owner. | Produce final ownership table and canonical write boundary. |
| ARCH-02 | All lanes expose Auto/ARIS as standalone `gsd` command families. | Finalize first-pass/deferred command table. |
| ARCH-03 | All lanes route research through ordinary GSD phases plus phase-local research artifacts. | Finalize `research/` sublayout and `RESEARCH_INDEX` minimum fields. |
| ARCH-04 | All lanes reject `phase_type`, typed routing, broad schema changes, and second control plane. | Produce concrete no-`phase_type` scenario proof. |
| ARCH-05 | Lanes cover command surface, runtime helpers, state ownership, hooks, subagents, artifacts, config, git, and upgrade boundaries. | Convert coverage into final target framework sections and companion specs. |
| ARCH-06 | Four independent proposal lanes completed. | Round 2 must cross-read all four and produce revised proposals. |
| ARCH-07 | All lanes separate raw evidence/gates from advisory summaries/checklists/file presence. | Finalize completion status taxonomy and danger-auto taint propagation. |

### Round 2 Inputs

Round 2 should not re-litigate the whole architecture. It should cross-read all four proposals and revise toward this narrowed target:

1. Public architecture: Research Command Compiler under GSD-first lifecycle ownership.
2. Implementation stance: minimal adapter surface first, not core rewrite.
3. Required companion specs: no-phase-type proof, completion semantics, config/preset spec, side-effect policy, artifact/index contract, and upgrade/SDK boundary.
4. Required risk blockers: danger-auto audit/status taint, missing authorization behavior, root artifact adoption, package/source latest reconciliation, SDK boundary, subagent write ownership, and false-completion negative cases.
5. Required deferrals: paper/rebuttal/slides/poster/camera-ready packs, broad execution side-effect wrappers until scenario tests exist, and ljx-GSD helper reuse until quarantine review.
6. Required output shape for Round 2: each revised proposal must say what it accepts from other lanes, what it rejects, what remains unresolved, and what the main synthesis should decide.

Round 1 intentionally does not declare the final target framework. It supplies the evidence and constraints for cross-read revision.
