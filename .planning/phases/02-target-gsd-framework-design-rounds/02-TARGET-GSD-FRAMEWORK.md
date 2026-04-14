# Phase 02 Target GSD Framework

**Status:** approved target under Phase 05 final review
**Generated:** 2026-04-14
**Architecture name:** Research Command Compiler under GSD lifecycle ownership
**Source basis:** Phase 01 framework synthesis, Phase 02 context, round-1 proposals, round-2 revised proposals, and `02-CONSENSUS-GAPS.md`.

## Executive Decision

The target framework is:

```text
Research Command Compiler under GSD lifecycle ownership
```

The core rule is simple:

```text
Research commands prepare GSD-native work.
GSD remains the lifecycle system.
Phase-local research artifacts preserve Auto/ARIS evidence semantics.
Completion is decided from raw evidence, review, verification, and explicit status, not file presence.
```

This is not a GSD core rewrite. It is not a runtime research overlay. It is not a second roadmap or state machine. It is a compile-time command layer that turns research intent, config, Auto/ARIS prompt-pack contracts, artifact contracts, review/gate requirements, and side-effect policy into ordinary GSD phase/context/plan inputs plus phase-local research artifacts.

## Source Traceability

Primary synthesis inputs:

- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONSENSUS-GAPS.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-GSD-FIRST.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-RESEARCH-COMPILER.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-MINIMAL-ADAPTER.md`
- `.planning/phases/01-source-framework-extraction/01-FRAMEWORK-SYNTHESIS.md`
- `.planning/phases/01-source-framework-extraction/01-GSD-FRAMEWORK.md`
- `.planning/phases/01-source-framework-extraction/01-GSD-UPGRADE-BOUNDARIES.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-FRAMEWORK.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-ARTIFACT-CONTRACTS.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-PARAMETER-MAP.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`

## Final Decisions

### 1. Lifecycle Ownership

GSD remains the outer lifecycle/control-plane owner.

GSD owns:

- Project and milestone lifecycle.
- Roadmap mutation and phase insertion.
- Discuss, plan, execute, review, verify, UAT, progress, `next`, pause/resume, and phase completion.
- Canonical lifecycle files: `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, workstream pointers, phase acceptance artifacts.
- Planning locks, state locks, atomic writes, git planning discipline, hooks, install/update boundaries, package compatibility, and SDK compatibility boundaries.

Research commands do not own these surfaces. Research commands may request or invoke ordinary GSD lifecycle commands, but canonical mutation must happen through the existing GSD owner path and lock/atomic-write behavior.

### 2. Research Command Compiler

A research command is a source-indexed compiler for ordinary GSD work.

Compiler input:

- User research intent.
- CLI overrides.
- `.planning/research.config.json`.
- Selected preset: `safe`, `auto`, or `danger-auto`.
- Auto/ARIS prompt-pack provenance and stable extracted contracts.
- Active GSD context: current milestone, current phase, roadmap mode, workstream/cwd routing.

Compiler output:

- Phase request or research-first roadmap request.
- GSD `CONTEXT.md` material.
- GSD planner constraints.
- GSD `PLAN.md` task/checkpoint/evidence guidance.
- Research artifact contracts.
- Side-effect policy summary.
- Completion/evidence policy summary.
- Phase-local `research/` index seed after the owning phase exists.

Compiler non-authority:

- It does not directly complete phases.
- It does not directly update canonical lifecycle state.
- It does not route `next`.
- It does not own review/UAT decisions.
- It does not maintain a durable second workflow state.

### 3. Minimal Adapter First

The first implementation stance is minimal adapter first. The adapter is the smallest safe implementation slice of the compiler architecture.

Initial helper surfaces:

| Surface | Responsibility | Authority boundary |
| --- | --- | --- |
| Command wrappers | Expose standalone `gsd research-*`, `gsd idea-*`, and selected `gsd experiment-*` commands. | Parse intent and call compiler; no lifecycle writes. |
| Research config loader | Read `.planning/research.config.json`, apply precedence, validate/prune config. | Does not mutate upstream `.planning/config.json`. |
| Prompt-pack indexer | Map command families to Auto/ARIS source prompt contracts and provenance. | Does not copy whole prompts into core GSD workflows. |
| Phase request renderer | Produce ordinary GSD insertion or research-first roadmap request. | Delegates canonical mutation to GSD lifecycle owner. |
| Artifact/index helper | Initialize or update phase-local `research/RESEARCH_INDEX.md` after owning phase exists. | Evidence map only, not lifecycle state. |
| Evidence checker | Report missing/satisfied raw evidence, review/audit, side-effect, import, and taint status. | Advisory input to GSD review/verify, not completion authority. |
| Side-effect handoff | Classify external operations by policy and authorization state. | Does not silently execute unauthorized operations. |
| `danger-auto` audit writer | Write run log, authorization actions, overrides, and side effects. | Phase-local audit only; cannot clean-complete overridden/skipped work. |
| Root artifact adoption helper | Adopt root Auto artifacts into phase-local `research/` with provenance. | Root artifacts remain mirrors until adopted. |

### 4. Phase Granularity

Default behavior uses GSD's existing phase/plan/task hierarchy.

Existing-roadmap mode:

- A research command invoked inside an existing roadmap inserts one decimal phase after the current completed phase.
- Example: after Phase 08, insert Phase 08.1.
- The generated phase is one phase by default.
- Auto/ARIS internal sections become GSD plans, tasks, checkpoints, and artifact contracts.

Research-first mode:

- A project or milestone started from `gsd research-pipeline` uses normal integer phases: 01, 02, 03.
- Integer phases represent true roadmap-level research goals, not every Auto/ARIS internal stage.

Split rule:

- Split only when the normal GSD planner identifies a true work-mode boundary or context/verification risk.
- Typical split boundaries: remote/GPU execution, raw evidence collection, independent audit, result-to-claim gate, or implementation handoff.
- Do not mechanically map Auto/ARIS words like `Phase`, `Stage`, or `Step` to GSD roadmap phases.

### 5. Command Surface

The command table below is the Phase 02 target. Later implementation may prune within the same status categories if scenario review proves scope is still too large, but it must not silently expand the first-pass set.

| Command family | Commands | Status | Default output | Notes |
| --- | --- | --- | --- | --- |
| Literature | `research-lit` | keep | One inserted phase or plan in active research phase. | Must produce literature evidence bundle. |
| Idea discovery/generation | `idea-discovery`, `idea-creator` | keep | One inserted phase by default. | `idea-discovery` cannot complete without literature retrieval/reading evidence. |
| Novelty/review/refinement | `novelty-check`, `research-review`, `research-refine`, `research-refine-pipeline`, `auto-review-loop` | keep/boundary; `research-refine-pipeline` folded wrapper | Plan/checkpoint inside owning phase or inserted phase for independent goal. | Must preserve raw reviewer responses and deterministic stop predicates. `research-refine-pipeline` is folded into `research-refine` plus experiment-planning handoff, preserving problem anchor, bounded review rounds, raw reviewer responses, deterministic stop predicate, final proposal, and experiment-planning handoff. |
| Experiment planning | `experiment-plan`, `ablation-planner` | keep | One inserted phase by default. | Keep metrics, dataset, baselines, methods, success criteria, failure interpretation, run order, and must-run/nice-to-have together. |
| Analysis/audit/claims | `analyze-results`, `experiment-audit`, `result-to-claim` | keep/boundary | Plan/checkpoint or inserted phase when independent audit/claim boundary exists. | Missing audit means no audit, not pass. |
| Pipeline wrapper | `research-pipeline` | keep | Existing roadmap: one inserted phase by default. Research-first: normal integer roadmap. | Wrapper compiles ordinary GSD work; not a pipeline engine. |
| Execution bridge | `experiment-bridge` | boundary | Compile-only bridge/readiness phase or plan until side-effect scenarios exist. | May prepare execution blocks; bridge-ready is not completion. |
| Remote execution/monitoring | `run-experiment`, `monitor-experiment` | defer by default; boundary only with explicit side-effect scenario coverage. | Later execution/evidence phase. | GPU/W&B/SSH/Modal/Vast side effects require policy tests. |
| Paper/rebuttal/presentation | paper, rebuttal, slides, poster, camera-ready packs | defer | Future compiler packs. | User deferred paper/rebuttal-style workflows from default v2.0 pipeline. |
| Support tools | wiki, watchdog, arXiv/DeepXiv/Semantic Scholar, W&B, Modal, Vast.ai, notifications | support only | Evidence/source/provider outputs. | Never lifecycle owners. |

### 6. Phase-Local Research Root

Authoritative research outputs live under:

```text
.planning/phases/<phase>/research/
```

Minimum structure:

```text
research/
  RESEARCH_INDEX.md
  evidence/
  literature/
  reviews/
  audits/
  side-effects/
  imports/
  exports/
  logs/
```

The exact subdirectories may vary by command pack, but `RESEARCH_INDEX.md` is required for any research phase.

`RESEARCH_INDEX.md` must classify:

- Required evidence.
- Raw records.
- Summaries.
- Review/audit artifacts.
- Side-effect records.
- Imported root Auto artifacts.
- Export mirrors.
- Provisional/degraded/overridden outputs.
- Completion status labels.
- Missing authorization or skipped operation records.

`RESEARCH_INDEX.md` is not a lifecycle state file. It cannot complete phases, mutate roadmap status, route `next`, or override GSD verify/UAT.

`RESEARCH_INDEX.json` is not required by the Phase 02 target framework. It is an implementation option if deterministic machine checks need it. If added, it must remain a machine-readable mirror of evidence status, not lifecycle state.

### Research Artifact Path-Safety Contract

Required file evidence must be a regular file unless the evidence class explicitly allows a directory, URL, database record, external run id, or other non-file record type.

Path containment must be validated by canonical resolved path under the owning phase's `research/` root. String-prefix checks are insufficient: sibling-prefix paths, root-only artifacts, dangling links, and stale copied paths do not satisfy phase-local evidence.

Symlink evidence is rejected by default. It may be accepted only when the evidence class explicitly allows it and the adoption record preserves resolved-target provenance, source freshness, and the reason a link is safer than copying or summarizing.

Every required evidence record must carry enough freshness metadata to decide whether it is current for the claim being reviewed. At minimum this means source path or URL, captured/imported timestamp, producing command if known, evidence class, status, and stale-or-current assessment.

### 7. Root Auto Artifact Adoption

Root Auto/ARIS artifacts outside `.planning/` are import/export mirrors by default.

They become authoritative evidence only after a GSD-owned adoption operation records:

- Source path or URL.
- Validated source existence and evidence type.
- Timestamp.
- Producing command if known.
- Original artifact role.
- Target evidence class.
- Whether the artifact is copied, linked, or summarized.
- Conflict handling if phase-local evidence already exists.
- Freshness or staleness assessment.
- Adoption mode and validation status.
- Adoption decision and responsible command/agent.

The adoption record belongs in the phase-local `research/RESEARCH_INDEX.md` and, if needed, `research/imports/`.

Until the adoption record validates source, evidence class, path containment or allowed external reference type, timestamp, status, and conflict handling, the root artifact remains non-authoritative mirror material and cannot satisfy required evidence.

### 8. Presets

Supported presets:

- `safe`
- `auto`
- `danger-auto`

Default preset: `safe`.

All presets default to deep research and deep review. `auto` does not mean shallow or quick.

Preset summary:

| Preset | Human interaction | External side effects | Quality gates | Clean completion |
| --- | --- | --- | --- | --- |
| `safe` | Pause for important decisions and before external side effects. | Confirmation required. | Blocking gates stop. | Allowed only with raw evidence and gates passed. |
| `auto` | Auto ordinary non-blocking checkpoints. | Allowed only when preauthorized. | Blocking gates stop. | Allowed only with raw evidence and gates passed. |
| `danger-auto` | Auto-select recommended decisions and ordinary checkpoints. | May use all currently available authorized capabilities once selected. | May override research-quality gates only where policy allows and with records. | Not clean if required operation skipped, authorization missing, unknown side effect, or gate overridden. |

### 9. Side Effects

Side-effect classes:

- Local file writes under the owning phase research root.
- Git commits, push, branch mutation, PR creation, GitHub operations.
- SSH, rsync/scp, remote commands.
- Local/remote GPU execution.
- W&B, Modal, Vast.ai, paid compute, persistent external logging.
- Reviewer APIs outside local/Codex subagents.
- Notifications, Feishu/Lark, email, external messaging.
- Cleanup, deletion, resource destruction, auto-destroy.
- Publication, submission, release, upload.

Policy status vocabulary:

- `disabled`
- `confirm-required`
- `preauthorized`
- `danger-auto-available`
- `missing-authorization`
- `blocked`
- `degraded`
- `executed`
- `skipped`
- `failed`

`auto` preauthorization may be project-level in `.planning/research.config.json` or phase-local in `research/AUTHORIZATION_ACTIONS.json`. The target framework allows both, but the operation record must be phase-local whenever an operation is attempted, skipped, or blocked.

### 10. Completion Semantics

Completion labels:

- `clean`
- `degraded`
- `provisional`
- `overridden`
- `blocked`
- `missing-authorization`
- `backfill-non-execution`

Clean research completion requires:

1. Required raw evidence exists.
2. Required review/audit evidence exists.
3. Required GSD verify/UAT gates pass or are explicitly accepted by the lifecycle owner.
4. Required side-effect operations either succeeded or were not required.
5. No missing authorization affected required work.
6. No research-quality gate was overridden.
7. Canonical GSD state and disk state agree enough for ordinary GSD completion.

Advisory-only signals:

- Summary files.
- Roadmap checkboxes.
- Plan counts.
- File presence.
- Skeleton artifacts.
- `progress` or `next` output.
- PR links.
- W&B URLs.
- Monitor status.
- Bridge-ready output.
- Root Auto files.
- Cache files.

### 11. Prompt-Pack Handling

Prompt packs are source-indexed contracts, not wholesale prompt copies.

Each prompt-pack entry should identify:

- Source skill or prompt path.
- Command family.
- Required inputs.
- Required outputs.
- Evidence contract.
- Review/audit contract.
- Side-effect classes.
- Completion blockers.
- Deferred sections.

Long upstream prompt bodies should remain indexed by source path. The compiler extracts stable contracts and injects bounded material into GSD context and plan constraints.

### 12. Subagent Roles

Allowed subagent roles:

- Proposal workers.
- Cross-read revised proposal workers.
- Research/literature workers.
- Review workers.
- Experiment execution workers.
- Audit workers.
- Evidence checkers.

Forbidden subagent roles:

- Canonical lifecycle writer unless explicitly acting as the single GSD lifecycle owner under lock.
- Hidden `STATE.md`/`ROADMAP.md` updater.
- Completion decider outside ordinary GSD lifecycle.
- Support-tool lifecycle router.

### 13. Git, Hooks, Package, And SDK

Git:

- Ordinary GSD git discipline remains owner.
- Research side effects involving git push, PR creation, or GitHub mutation require policy status and phase-local records.
- Git artifacts are evidence or side effects, not completion by themselves.

Hooks:

- Existing GSD hook ownership and install/uninstall symmetry are compatibility boundaries.
- Research integration must not change hooks without package/install/hook tests.

Package baseline:

- The behavioral design baseline is latest upstream source behavior from Phase 01 evidence.
- Phase 01 evidence reported local reference `get-shit-done-cc@1.35.0` and installed/npm evidence around `1.34.2`.
- Implementation must reconcile source/package/install/hook behavior before release or shipped claims.

SDK:

- SDK is a compatibility boundary, not lifecycle owner.
- Phase 02 does not require SDK-first implementation.
- Compiler inputs/outputs should remain serializable and adapter-friendly so a future SDK API can expose compile/advisory operations without owning GSD lifecycle.

### 14. Implementation Feasibility

Overall feasibility: **high for the core compiler/adapter architecture, medium for full research parity, high-risk for external side-effect automation until scenario tests exist.**

Feasibility classes:

| Area | Feasibility | Reason |
| --- | --- | --- |
| Thin command wrappers | feasible-now | Adds user-facing commands that call existing GSD lifecycle paths. Low schema risk. |
| Separate research config loader | feasible-now | Isolated `.planning/research.config.json` avoids upstream config pollution. |
| Prompt-pack registry | feasible-now | Source-indexed contracts can be represented without copying full prompt bodies. |
| Phase request renderer | feasible-with-review | GSD already supports phases/plans/decimal insertion, but canonical writes must route through existing owner paths. |
| Phase-local research root | feasible-now | New files under owning phase root avoid core schema changes. |
| `RESEARCH_INDEX.md` | feasible-now | Markdown index is straightforward; deterministic JSON sidecar can be deferred. |
| Evidence checker | feasible-with-review | Concept is simple, but command-specific evidence contracts must be carefully written to avoid false positives. |
| `safe`/`auto`/`danger-auto` presets | feasible-with-review | Semantics are clear, but gate precedence and side-effect policy need tests. |
| `danger-auto` audit artifacts | feasible-with-review | File writing is easy; correct taint propagation and no-false-clean behavior need scenario coverage. |
| Remote/GPU/W&B/SSH/Modal/Vast execution | defer-until-scenario-tests | External credentials, payment, cleanup, and raw evidence retention are high-risk. |
| Paper/rebuttal packs | defer | User deferred these from default v2.0 scope. |
| SDK integration | implementation-boundary | Keep contracts SDK-adaptable but decide API shape later. |
| Package/install/hook compatibility | implementation-blocker-before-release | Existing upstream source/package drift must be reconciled. |
| ljx-GSD reuse | implementation-blocker-before-reuse | Current ljx-GSD is historical evidence only until quarantine review. |

The plan is feasible because it avoids the hardest category of change: changing GSD's phase schema or lifecycle state model. It uses ordinary GSD artifacts and adds research-specific conventions under the phase-local research root. The main engineering risk is not architectural feasibility; it is discipline: if implementation shortcuts completion, side effects, config validation, or canonical writes, it will recreate the earlier ljx-GSD failure modes.

### 15. Non-Goals

The target framework rejects:

- `phase_type`.
- Typed phase routing.
- Broad phase schema expansion.
- A second lifecycle/control-plane state root.
- Research-owned canonical `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, progress, or completion.
- Root Auto artifacts as authoritative state before adoption.
- Completion from summaries, checkboxes, file presence, skeletons, plan counts, `progress`, `next`, PR links, W&B URLs, bridge-ready reports, or caches.
- Support tools as lifecycle owners.
- Greenfield research orchestrator detached from GSD.
- SDK-first lifecycle design.
- Paper/rebuttal/slides/poster/camera-ready in default v2.0 pipeline.
