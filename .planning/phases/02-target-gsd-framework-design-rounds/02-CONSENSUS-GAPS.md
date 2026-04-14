# Phase 02 Round 2 Consensus And Gaps

**Status:** Synthesis input, not final target framework
**Source round:** `02-02` cross-read revised proposal round
**Generated:** 2026-04-14

## Executive Convergence

The three revised proposal lanes converge strongly enough for `02-03` main-agent synthesis to proceed.

The synthesis candidate is:

```text
Research Command Compiler under GSD lifecycle ownership
  public architecture: standalone gsd research commands compile research intent into ordinary GSD inputs
  lifecycle owner: ordinary GSD discuss/plan/execute/review/verify/state/progress/completion
  implementation stance: minimal adapter surface first
  evidence model: phase-local research root plus raw evidence/review/verify gates
  schema stance: no phase_type, no typed routing, no broad phase schema expansion, no second control plane
```

This is still not the final framework document. `02-03` must convert the stable decisions below into target framework specs and explicitly resolve or defer the remaining open framework decisions.

## Stable Decisions

### ARCH-01: GSD Lifecycle Ownership

- Upstream GSD remains the outer lifecycle/control-plane owner.
- Research commands must not own canonical `.planning/` lifecycle writes.
- Research commands must not write or directly mutate `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, progress, `next`, verification state, or phase completion state.
- Canonical lifecycle mutations must go through ordinary GSD owner paths and lock/atomic-write behavior.
- Subagents may write scoped reports/proposals/evidence files only; canonical writes remain serialized.

### ARCH-02: Standalone Research Commands

- Auto/ARIS capabilities become standalone `gsd` research commands.
- Public architecture should be named `Research Command Compiler under GSD lifecycle ownership`.
- Research commands parse intent and config, select prompt-pack contracts, compile ordinary GSD phase/context/plan/artifact inputs, then hand off to GSD lifecycle commands.
- Research command identity is descriptive/provenance information, not lifecycle routing state.

### ARCH-03: Ordinary GSD Phases Plus Narrow Research Artifacts

- Existing-roadmap mode defaults to one inserted decimal phase after the current completed phase.
- Research-first roadmap mode uses normal integer phases.
- Auto/ARIS internal `Phase`, `Stage`, or `Step` labels map to GSD plans, tasks, checkpoints, and artifact contracts, not default roadmap phases.
- Multiple generated phases are allowed only for true roadmap/work-mode boundaries, especially remote execution, raw evidence collection, independent audit, or claim gating.
- Authoritative research outputs live under `.planning/phases/<phase>/research/`.
- Root Auto/ARIS artifacts are import/export mirrors until explicitly adopted into the phase-local research root with provenance.

### ARCH-04: No Phase Type Or Second Control Plane

- No revised proposal requires `phase_type`, typed routing, broad phase schema expansion, phase kind fields, typed route tables, `primaryCommand`, bridge-ready lifecycle state, or a second control plane.
- Research behavior can be represented by command invocation, phase title, `CONTEXT.md`, prompt-pack provenance, plan text, checkpoint text, artifact contracts, and phase-local `research/RESEARCH_INDEX.md` metadata.
- `RESEARCH_INDEX.md` is an evidence map and advisory check surface; it cannot route `next`, mutate roadmap status, or complete phases.

### ARCH-05: Framework Surface To Document

`02-03` should document these framework surfaces as stable target components:

- Command surface: first-pass standalone research commands and deferred packs.
- Runtime helpers: command shims, config resolver, prompt-pack registry, phase request renderer, artifact/index helper, evidence checker, side-effect handoff, danger-auto audit writer, root artifact adoption helper.
- State ownership: GSD owns canonical lifecycle; research owns only compile-time inputs and phase-local evidence/support artifacts.
- Artifact contracts: phase-local `research/`, `RESEARCH_INDEX.md`, raw evidence, summaries, reviews/audits, side effects, imports/exports, provisional outputs, override taint.
- Config semantics: `.planning/research.config.json`; CLI override > command-specific config > preset > built-in defaults; strict pruning before GSD handoff.
- Presets: `safe`, `auto`, `danger-auto`, all deep by default; `safe` default.
- Git/hooks: ordinary GSD git discipline and hook behavior remain owner; research side effects are recorded and policy-bound.
- Subagent roles: research/review/execution workers write scoped artifacts, not canonical lifecycle state.
- Upgrade/SDK boundaries: latest upstream source is behavioral design baseline, but source/package/install/hook compatibility must be reconciled before implementation/release claims; SDK remains future-compatible but not lifecycle owner.

### ARCH-06: Proposal Process Completion

- Round 1 produced four independent proposals: GSD-first, Research Compiler, Minimal Adapter, and Risk Register.
- Round 2 produced three revised cross-read proposals: Revised GSD-first, Revised Research Compiler, and Revised Minimal Adapter.
- The revised proposals explicitly accepted/rejected other-lane material and converged on the synthesis candidate above.
- `02-03` remains required for main-agent synthesis and user review.

### ARCH-07: Completion Semantics

- Completion requires command-specific raw evidence plus relevant review/verify/UAT gates.
- File presence, summaries, roadmap checkboxes, plan counts, `progress`, `next`, context helpers, caches, skeletons, PR links, W&B URLs, bridge-ready output, and root Auto files are advisory only.
- Required completion labels include at least: `clean`, `degraded`, `provisional`, `overridden`, `blocked`, and `missing-authorization`.
- `danger-auto` cannot produce clean completion after skipped required operations, missing authorization, unknown side-effect status, or quality-gate override.
- Downstream artifacts must carry taint when quality gates are overridden or evidence is degraded/provisional.

## Open Framework Decisions

These decisions should be made in `02-03` or explicitly deferred with a named later blocker.

| Decision | Current Consensus | Main Synthesis Must Decide |
| --- | --- | --- |
| First-pass command table | Literature/idea/refinement/experiment-plan/audit/claim commands are likely first pass; paper/rebuttal packs deferred; execution-heavy commands are boundary/defer candidates. | Produce a `keep`, `boundary`, `defer` table for every Auto/ARIS skill family in Phase 02 scope. |
| `RESEARCH_INDEX` machine format | `RESEARCH_INDEX.md` is required; JSON sidecar is useful for deterministic checks but not unanimously required now. | Require Markdown only in target framework, or specify optional/required `RESEARCH_INDEX.json`. |
| `auto` preauthorization storage | `safe` pauses; `danger-auto` uses available authorization; `auto` needs preauthorization record. | Decide whether preauthorization lives in `.planning/research.config.json`, a phase-local authorization artifact, or both. |
| Side-effect policy vocabulary | Revised proposals use disabled/confirm/preauthorized/danger-auto-available/missing-authorization/degraded/blocked/clean concepts. | Freeze exact vocabulary for the target framework or leave exact enum names to implementation while fixing semantics. |
| Hard versus overridable gates | Authorization/safety gates are non-overridable; research quality gates may be overridden by `danger-auto` only with taint where policy allows. | Define initial gate taxonomy or make it a Phase 03 review-rule input. |
| SDK boundary | SDK must not own lifecycle and should not block CLI/compiler design. | Decide whether Phase 02 names SDK as deferred, compatibility boundary, or minimal adapter target. |
| Upstream baseline reconciliation | Latest source is design baseline; local evidence shows source/package drift. | Decide whether Phase 02 chooses latest source behavior now or records mandatory reconciliation in Phase 05/06. |
| Unknown research config keys | Research config must not pollute GSD core. | Decide unknown-key policy: reject, warn, quarantine under experimental namespace, or command-pack declaration required. |
| Root artifact adoption flow | Adoption must record provenance, source path, timestamp, producing command if known, evidence class, and conflict behavior. | Specify exact adoption artifact shape or defer field names to implementation. |
| Execution-heavy command timing | Remote/GPU/W&B/SSH/Modal/Vast operations are high-risk and need scenario tests. | Decide whether `run-experiment`, `monitor-experiment`, and `experiment-bridge` are first-pass boundary commands or deferred packs. |

## Deferred Implementation Details

These are not Phase 02 synthesis blockers if recorded clearly:

- Exact module/file names for implementation helpers.
- Exact JSON property names for `.planning/research.config.json`, provided semantics and precedence are fixed.
- Exact machine-readable schema for `RESEARCH_INDEX.json`, if not required in Phase 02 target framework.
- Exact prompt-pack manifest file path, provided prompt-pack provenance and source indexing are mandatory.
- Exact reviewer backend/provider implementation, provided reviewer provenance and raw response preservation are required.
- Exact package/install/hook implementation plan, provided source/package compatibility reconciliation remains a later blocker.
- Exact SDK API shape, provided SDK does not become lifecycle owner and compiler bundle contracts remain serializable/adaptable.
- Exact scenario test implementation, provided negative scenario expectations are named.

## Explicit Non-Goals

The target framework should explicitly reject:

- `phase_type`, typed phase routing, phase kind fields, typed route tables, broad phase schema expansion, or hidden `primaryCommand`/bridge-ready routing.
- Any second lifecycle/control-plane state root.
- Research commands directly writing canonical lifecycle files or phase completion state.
- Support tools such as wiki, watchdog, reviewer providers, W&B, Modal, Vast.ai, SSH, notification, cleanup, or GPU helpers becoming lifecycle owners.
- Root Auto/ARIS artifacts controlling routing, resume, completion, or evidence status before explicit phase-local adoption.
- Completion based on summaries, checkboxes, file presence, skeletons, plan counts, `progress`, `next`, PR links, W&B URLs, bridge-ready reports, or caches.
- `danger-auto` clean completion after missing authorization, skipped required side effect, unknown side-effect result, or overridden quality gate.
- Paper/rebuttal/slides/poster/camera-ready packs as default v2.0 pipeline scope.
- Greenfield research orchestrator detached from GSD.
- SDK-first lifecycle design.

## Command Table Synthesis Input

`02-03` should turn this into the final command table:

| Command Family | Candidate Commands | Consensus Status | Rationale |
| --- | --- | --- | --- |
| Literature | `research-lit` | keep | Core evidence source for idea discovery and research workflows. |
| Idea discovery/generation | `idea-discovery`, `idea-creator` | keep | User priority; must require literature retrieval/reading evidence before completion. |
| Novelty/review/refinement | `novelty-check`, `research-review`, `research-refine`, `auto-review-loop` | keep or boundary | Core quality loop; may be plan-level when attached to existing phase. |
| Experiment planning | `experiment-plan`, `ablation-planner` | keep | Strongly coupled metrics/dataset/baseline/method reasoning should stay together. |
| Analysis/audit/claims | `analyze-results`, `experiment-audit`, `result-to-claim` | keep or boundary | Evidence/audit/claim gates may be separate phases when they are true work-mode boundaries. |
| Execution bridge | `experiment-bridge`, `run-experiment`, `monitor-experiment` | boundary or defer | External side effects, remote/GPU/W&B/SSH/Modal/Vast behavior require side-effect scenario tests. |
| Pipeline wrapper | `research-pipeline` | keep | Research-first roadmaps use integer phases; existing-roadmap mode defaults to one inserted phase. |
| Paper/rebuttal/presentation | paper, rebuttal, slides, poster, camera-ready packs | defer | User explicitly deferred paper/rebuttal-style workflows from first default pipeline. |
| Support tools | wiki, watchdog, arXiv/DeepXiv/Semantic Scholar, W&B, Modal, Vast.ai, notifications | support only | May provide evidence/support services but never lifecycle authority. |

## Negative Scenario Expectations

Later implementation/review phases should test at least these false-completion cases:

- `idea-discovery` with only context/state/report output and no literature retrieval/reading evidence must not be clean.
- Skeleton-only `RESEARCH_INDEX.md` must not be clean.
- W&B-link-only experiment output with no raw result/config/commit evidence must not be clean.
- `result-to-claim` with missing or stale audit must not be clean.
- `danger-auto` with missing GitHub/W&B/SSH/Modal/Vast credentials must record missing authorization and cannot be clean.
- `danger-auto` quality-gate override must taint downstream artifacts.
- Root Auto artifact conflict must require adoption/provenance handling before becoming authoritative evidence.
- Cache-only or summary-only review state must not satisfy review completion.
- Any accidental typed routing, `phase_type`, bridge-ready lifecycle state, or support-tool state must fail compatibility review.

## Requirement Coverage Map

| Requirement | Stable Coverage | Gap / Synthesis Need |
| --- | --- | --- |
| ARCH-01 | GSD lifecycle ownership is stable and non-negotiable. | `02-03` must publish final ownership table. |
| ARCH-02 | Standalone research command architecture is stable. | `02-03` must publish final first-pass/deferred command table. |
| ARCH-03 | Ordinary phase plus phase-local `research/` convention is stable. | `02-03` must publish artifact/index contract and adoption flow. |
| ARCH-04 | No `phase_type`, typed routing, broad schema expansion, or second control plane is stable. | `02-03` must publish scenario proof. |
| ARCH-05 | Required framework surfaces are identified. | `02-03` must turn them into target framework and companion specs. |
| ARCH-06 | Independent and revised proposal rounds are complete. | `02-03` must complete main-agent synthesis and user review. |
| ARCH-07 | Evidence-based completion semantics are stable. | `02-03` must publish completion status taxonomy and danger-auto taint rules. |

## Main Synthesis Handoff

`02-03` should produce these documents from this consensus/gap input:

- `02-TARGET-GSD-FRAMEWORK.md`
- `02-NO-PHASE-TYPE-COMPATIBILITY.md`
- `02-COMPLETION-SEMANTICS.md`
- `02-CONFIG-PRESET-SPEC.md`
- `02-UPGRADE-BOUNDARIES.md`

The main synthesis should not invent a different architecture unless it explicitly records why the revised proposal consensus is insufficient.
