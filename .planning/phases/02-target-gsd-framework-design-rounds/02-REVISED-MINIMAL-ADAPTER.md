# 02-REVISED-MINIMAL-ADAPTER

**Lane:** Revised Minimal Adapter  
**Round:** Phase 02 proposal round 2  
**Worker:** Worker 3  
**Ownership:** This file only. No canonical project files, round-1 proposal files, Phase 01 artifacts, or implementation code were edited.

## 1. Revised Position Summary

The minimal adapter should no longer present itself as an alternative to the Research Command Compiler. Round 2 should treat the public architecture as settled:

```text
standalone gsd research command
  -> minimal Research Command Compiler adapter
  -> ordinary GSD phase insertion or research-first roadmap request
  -> ordinary CONTEXT.md / PLAN.md / task / checkpoint / artifact contracts
  -> phase-local research/ evidence and audit artifacts
  -> ordinary GSD review / verify / UAT / completion
```

The revised minimal-adapter position is: **build the smallest compile-time and phase-local helper surface that makes the accepted compiler architecture real, while refusing any lifecycle ownership.** The adapter should prepare GSD work; it must not become GSD.

The smallest safe slice contains:

1. Thin command wrappers for first-pass research commands.
2. A strict `.planning/research.config.json` loader.
3. A prompt-pack indexer that source-indexes Auto/ARIS contracts without copying whole prompts.
4. A phase request/insertion handoff that delegates canonical writes to existing GSD lifecycle commands.
5. A phase-local artifact/index helper for `research/RESEARCH_INDEX.md` and related inventories.
6. An advisory evidence checker that requires raw evidence and review/verify/UAT readiness.
7. A `danger-auto` audit writer for automated decisions, side effects, missing authorizations, and overrides.
8. A side-effect policy handoff for execution-related commands.

This slice preserves Auto/ARIS research integrity by making evidence, prompt provenance, review depth, side effects, and completion labels explicit. It remains minimal because it does not add `phase_type`, typed routing, broad schema changes, a research daemon, an external service registry, a new lifecycle state file, or direct writes to canonical GSD state.

## 2. Source Evidence Used

This revision cross-read all four round-1 proposal files and the round-2 coordination artifacts.

### Round-1 proposal files explicitly used

| Source | Evidence used in this revision |
| --- | --- |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-GSD-FIRST.md` | GSD remains the lifecycle owner; research commands are command-specific compilers; canonical lifecycle writes stay with ordinary GSD; single-phase default and phase-local research roots are sufficient without `phase_type`. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RESEARCH-COMPILER.md` | Public architecture is a Research Command Compiler; command wrappers read config, select prompt packs, compile GSD-native phase/context/plan/artifact inputs, and delegate lifecycle operations. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-MINIMAL-ADAPTER.md` | The smallest implementation surface is command wrappers, config loader, prompt-pack indexer, phase request builder, artifact/index helper, evidence checker, `danger-auto` audit writer, and side-effect handoff. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RISK-REGISTER.md` | Main blockers are false completion, `danger-auto` clean-success lies, missing authorization, root Auto artifact authority, package/source drift, SDK ambiguity, subagent write races, and reintroduced typed routing. |

### Other required sources used

| Source | Evidence used in this revision |
| --- | --- |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-02-PLAN.md` | Round 2 must produce revised cross-read proposals, preserve no-`phase_type`, and converge toward minimal implementation while retaining disputed risks. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-2.md` | Narrowing target: Research Command Compiler under GSD-first lifecycle ownership, minimal adapter as implementation stance, and required companion specs for config, artifacts, side effects, completion, and upgrade/SDK boundaries. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md` | Round-1 agreements, disagreements, rejected directions, requirement coverage, and unresolved questions for command surface, `RESEARCH_INDEX`, SDK, baseline reconciliation, and side-effect vocabulary. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md` | Phase 02 decisions D-01 through D-57: compiler direction, GSD lifecycle ownership, single-phase default, decimal insertion, research config path, presets, `danger-auto`, artifacts, source/package baseline, SDK boundary, and completion semantics. |
| `.planning/REQUIREMENTS.md` | ARCH-01 through ARCH-07 require upstream GSD lifecycle ownership, standalone research commands, ordinary phases plus narrow artifacts, no `phase_type`, documented helpers/boundaries, proposal rounds, and raw-evidence completion semantics. |

## 3. Accepted From Other Lanes

The revised adapter accepts these constraints from the other lanes as binding for synthesis:

| Accepted input | Source lane | Revised adapter consequence |
| --- | --- | --- |
| GSD is the only lifecycle/control-plane owner. | GSD-first, Risk Register | The adapter never writes `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, progress state, or completion state directly. |
| Research Command Compiler is the public architecture. | Research Compiler, Round-1 comparison | The adapter is the smallest implementation slice of the compiler, not a competing architecture. |
| Compiler outputs are ordinary GSD inputs. | Research Compiler, GSD-first | The durable lifecycle outputs are phase requests, generated context, planner constraints, artifact contracts, checkpoint text, and phase-local research artifacts. |
| Single-phase default is correct. | All lanes | Most commands compile to one inserted GSD phase; Auto/ARIS internal stages become plans, tasks, checkpoints, and artifact contracts. |
| `danger-auto` requires maximum audit burden. | Risk Register, Research Compiler | Required audit files are mandatory under `research/`: `RESEARCH_RUN_LOG.md`, `AUTHORIZATION_ACTIONS.json`, `DANGER_AUTO_OVERRIDES.md`, and `SIDE_EFFECTS.md`. |
| Completion requires raw evidence plus gates. | GSD-first, Risk Register | Evidence checker is advisory but strict: summaries, checkboxes, `progress`, `next`, PR links, W&B links alone, context files, caches, and report presence are not completion. |
| Root Auto artifacts are mirrors only. | GSD-first, Risk Register | Imports require explicit adoption into the phase-local `research/` root with provenance and evidence class before they can be considered. |
| SDK and package/source drift are real boundaries. | GSD-first, Research Compiler, Risk Register | First slice must remain SDK-adaptable but not SDK-owned; implementation must reconcile source `1.35.0` evidence with installed/npm `1.34.2` before release claims. |

## 4. Rejected From Other Lanes

The revised adapter rejects these interpretations, even when adjacent to otherwise accepted ideas:

| Rejected idea | Why rejected | Replacement |
| --- | --- | --- |
| A full compiler intermediate representation that persists as runtime state. | It can become a second control plane. | Use ephemeral compiled bundles rendered into ordinary GSD inputs and phase-local evidence contracts. |
| A broad first-pass command family including every Auto/ARIS capability. | Too much side-effect, paper, and provider risk before scenario tests. | Keep literature/idea/refinement/planning/audit/claim wrappers first; defer paper/rebuttal and execution-heavy wrappers unless explicitly boundary-scoped. |
| Immediate skeleton creation as evidence. | Skeletons can recreate false completion. | Skeletons/indexes are allowed only after owning phase exists and must be labeled as missing evidence until raw artifacts arrive. |
| Side-effect policy only described narratively. | `danger-auto`, `auto`, and missing authorization need machine-checkable audit hooks. | Emit a side-effect handoff plus audit artifacts and advisory evidence-check result. |
| SDK-first design. | SDK boundary is important but should not block CLI/compiler design or own lifecycle. | Keep stable helper outputs SDK-adaptable; defer SDK export/API decisions until implementation boundary review. |
| Treating support tools as lifecycle participants. | Wiki, watchdog, reviewer providers, W&B, Modal, Vast.ai, SSH, and notifications can accumulate shadow state. | Treat them as support adapters whose outputs are evidence or side-effect records only. |
| Any `phase_type`, typed route table, phase kind, `primaryCommand`, bridge-ready status, or `ljx-*` route. | These recreate the failure patterns Phase 02 is avoiding. | Command identity lives in invocation, phase context, prompt-pack provenance, and `RESEARCH_INDEX` metadata, never in routing schema. |

## 5. Revised Minimal Adapter Surface

The initial implementation slice should be deliberately small and testable. Names below are implementation-direction names, not final API commitments.

| Surface | Minimal responsibility | Allowed writes | Explicit non-authority |
| --- | --- | --- | --- |
| Command wrappers | Expose thin standalone `gsd research-*`, `gsd idea-*`, and selected `gsd experiment-*` commands. Parse args and call adapter workflow/helper. | None directly, except through delegated lifecycle or phase-local helper after phase exists. | No lifecycle routing, no canonical state writes, no completion decisions. |
| Research config loader | Read `.planning/research.config.json`; apply CLI > command config > preset > built-in defaults; validate/prune keys. | None. | Does not mutate `.planning/config.json`; does not pass raw config into GSD core. |
| Prompt-pack indexer | Map command wrappers to Auto/ARIS prompt-pack sources, stable contracts, provenance, deferred sections, and output templates. | None, except optional generated package/project manifest in later implementation. | Does not copy whole prompts into GSD core; does not route phases. |
| Phase request/insertion handoff | Build one GSD-native insertion or research-first roadmap request containing title, goal, context, artifact contracts, gates, and side-effect policy summary. | No direct canonical writes; delegates to existing `insert-phase`, `new-project`, or `new-milestone` owner. | Does not edit `ROADMAP.md` or `STATE.md` itself. |
| Artifact/index helper | Initialize/update `.planning/phases/<phase>/research/RESEARCH_INDEX.md` and optional deterministic inventory after the owning phase exists. | Phase-local `research/**` only. | Index is a map and status summary, not `STATE.md` and not completion authority. |
| Evidence checker | Check required raw evidence, provenance, reviews, audits, side-effect records, imports, and degraded/provisional labels. | Advisory check result under `research/` only, if persisted. | Cannot mark a phase complete; cannot treat file presence as proof. |
| `danger-auto` audit writer | Write required automation audit artifacts under the owning phase research root. | Phase-local `research/RESEARCH_RUN_LOG.md`, `AUTHORIZATION_ACTIONS.json`, `DANGER_AUTO_OVERRIDES.md`, `SIDE_EFFECTS.md`. | Cannot hide skipped operations, missing authorization, or overridden gates behind clean status. |
| Side-effect policy handoff | Classify side effects as disabled, confirm, preauthorized, danger-auto-available, missing-authorization, degraded, blocked, or out-of-scope. | Phase-local audit records when operations are attempted. | Does not execute arbitrary providers outside command pack and authorization policy. |
| Root Auto adoption helper | Import/copy/link root Auto artifacts into phase-local `research/imports/` with provenance, evidence class, timestamp, and conflict status. | Phase-local imports and index entries only. | Root artifacts never control routing, resume, or completion by default. |

The adapter should be removable after it generates GSD-native phase artifacts. If ordinary GSD can still discuss, plan, execute, review, verify, and close the phase from those artifacts and phase-local evidence, the adapter has stayed inside the boundary.

## 6. Keep/Boundary/Defer Command Table

| Command or family | Round-2 status | Default GSD output | Reasoning |
| --- | --- | --- | --- |
| `gsd research-lit` | Keep | One inserted phase or plan inside active research phase; requires literature evidence bundle. | Low side-effect surface and foundational for Auto/ARIS integrity. |
| `gsd idea-discovery` | Keep | One inserted phase with literature, reading notes, idea generation, and review gates. | Required by RSCH-01/RSCH-08; must not complete from `IDEA_REPORT.md` alone. |
| `gsd idea-creator` | Keep | One inserted phase or plan with candidate generation, eliminations, ranking, and provenance. | Preserves idea-generation capability without external execution risk. |
| `gsd novelty-check` | Boundary | Prefer plan/checkpoint inside target idea phase; inserted phase only when novelty is a separate goal boundary. | Prevents over-splitting while preserving claim-level review evidence. |
| `gsd research-review` | Boundary | Plan/checkpoint or review artifact inside owning phase. | Useful support wrapper, but reviewer output is evidence, not lifecycle state. |
| `gsd research-refine` | Keep | One inserted phase with problem anchor, bounded review loop, threshold, and raw reviewer responses. | Preserves Auto/ARIS refinement integrity. |
| `gsd research-pipeline` | Keep as wrapper | Existing-roadmap mode: one inserted phase by default. Research-first mode: normal integer roadmap phases only for real work boundaries. | It is a compiler wrapper, not a pipeline engine. |
| `gsd experiment-plan` | Keep | One inserted phase keeping claims, metrics, datasets, baselines, run order, budgets, and failure interpretation together. | Strongly coupled design content should not be split by default. |
| `gsd analyze-results` | Boundary | Plan/checkpoint in execution/evidence phase or inserted phase after raw evidence exists. | Analysis without raw evidence must block. |
| `gsd experiment-audit` | Boundary | Plan/checkpoint when inside active execution/claim phase; inserted phase when independent audit is a hard boundary. | Missing audit means no audit; downstream claims must reflect that. |
| `gsd auto-review-loop` | Boundary | Review loop helper under refinement/audit/claim command contracts. | Needs raw reviewer responses, deterministic stop predicate, and provenance. |
| `gsd result-to-claim` | Boundary | Plan/checkpoint or inserted claim-gate phase after evidence/audit exists. | Must produce yes/partial/no support with raw evidence lineage. |
| `gsd ablation-planner` | Boundary | Plan/checkpoint in experiment planning or audit phase. | Useful but not first wrapper unless experiment-plan contract requires it. |
| `gsd experiment-bridge` | Defer by default | Future execution/evidence phase request with side-effect handoff. | Bridge output is not execution evidence; remote/code side effects need scenario tests. |
| `gsd run-experiment` | Defer by default | Future execution/evidence phase with raw logs/JSON/CSV, commit/config, W&B/job IDs if used. | High-risk side effects: GPU, SSH, Modal, Vast.ai, W&B, cleanup, spend. |
| `gsd monitor-experiment` | Defer by default | Future monitor artifact under execution phase. | Monitor status is operational only and can be mistaken for evidence. |
| Paper/rebuttal/slides/poster/camera-ready packs | Defer | Future compiler packs with source-indexed contracts. | Explicitly deferred from default v2.0 pipeline; preserve provenance without active wrappers. |
| Research wiki/watchdog/provider overlays/notifications | Defer or support-only | Evidence/support logs only. | Must not become a roadmap, scheduler, or lifecycle control plane. |

## 7. Config, Prompt-Pack, Artifact, And Evidence Helpers

### Research config loader

The first config contract should stay narrow and separate:

```json
{
  "preset": "safe",
  "defaults": {
    "effort": "deep",
    "review_depth": "deep",
    "auto_proceed": false,
    "human_checkpoint": true,
    "max_review_rounds": 4,
    "sources": ["local", "web"],
    "max_literature_items": 20,
    "review_difficulty": "hard",
    "score_threshold": 9,
    "require_literature_evidence": true
  },
  "commands": {
    "research-lit": {},
    "idea-discovery": {},
    "research-refine": {},
    "experiment-plan": {}
  },
  "side_effects": {
    "git_push": "confirm",
    "pull_request": "confirm",
    "wandb": "disabled",
    "ssh": "disabled",
    "modal": "disabled",
    "vast_ai": "disabled",
    "gpu": "disabled",
    "notifications": "confirm",
    "cleanup": "confirm"
  }
}
```

Rules:

1. The path is `.planning/research.config.json`, never upstream `.planning/config.json`.
2. Precedence is CLI override > command-specific config > preset > built-in defaults.
3. First-pass preserved parameters are `preset`, `effort`, `review_depth`, `auto_proceed`, `human_checkpoint`, `max_review_rounds`, `sources`, `max_literature_items`, `review_difficulty`, `score_threshold` or `novelty_threshold`, and `require_literature_evidence`.
4. Unknown keys should be rejected or quarantined behind an explicit experimental namespace until command packs declare them.
5. Paper-stage keys and provider-specific execution keys are not global first-pass config.

### Prompt-pack indexer

The prompt-pack helper should be a manifest/index reader. Minimum fields:

| Field | Required meaning |
| --- | --- |
| `command` | Wrapper command name such as `idea-discovery` or `experiment-plan`. |
| `source_paths` | Source Auto/ARIS skill/prompt paths or package refs. |
| `stable_contracts` | Bounded extracted contracts: inputs, required evidence, review gates, artifacts, stop predicates. |
| `compiled_sections` | Short GSD-compatible context, artifact, evidence, checkpoint, and review snippets. |
| `deferred_sections` | Paper/rebuttal/execution/provider sections intentionally excluded from first pass. |
| `provenance` | Source system, version/hash if available, extraction artifact, and review status. |

The indexer should never make prompt packs durable lifecycle state. Prompt-pack provenance can appear in `CONTEXT.md` and `RESEARCH_INDEX`, but it does not route phases or complete work.

### Artifact/index helper

Every research-owning phase should have this minimum phase-local root:

```text
.planning/phases/<phase>/research/
  RESEARCH_INDEX.md
  RESEARCH_RUN_LOG.md
  evidence/
  literature/
  reviews/
  audits/
  claims/
  imports/
  exports/
  side-effects/
  state-cache/
```

`RESEARCH_INDEX.md` should contain at least:

| Section | Purpose |
| --- | --- |
| `Command And Phase` | Owning phase, producing command, prompt-pack provenance, preset. |
| `Required Completion Evidence` | Raw files, source IDs/URLs/paths, JSON/CSV/logs, PDFs, reviewer responses, W&B/job IDs when used. |
| `Workflow Artifacts` | Human-readable reports and plans that are useful but not proof alone. |
| `Raw Evidence` | Primary evidence paths and provenance. |
| `Review And Audit Evidence` | Raw reviewer outputs, verdicts, scores, audit JSON/Markdown, backend provenance. |
| `Side Effects And Authorizations` | Links to audit files and missing-authorization records. |
| `Provisional, Degraded, Or Overridden Outputs` | Explicit status taint and reason. |
| `Imported Mirrors` | Root/external Auto artifacts, adoption status, evidence class, conflicts. |
| `Advisory Evidence Check` | Latest checker result, explicitly not phase completion. |

A `RESEARCH_INDEX.json` sidecar can be deferred unless deterministic checks need it in the first implementation. The Markdown index is required; the machine-readable format is a boundary decision.

### Evidence checker

The evidence checker returns advisory readiness labels only:

| Label | Meaning | GSD implication |
| --- | --- | --- |
| `clean_evidence_ready` | Required raw evidence, provenance, review/audit records, and side-effect audit are present with no unresolved taint. | GSD may proceed to ordinary review/verify; not auto-complete. |
| `provisional_evidence_ready` | Evidence exists but confidence, backend, review, or claim support is limited. | GSD must review provisional status explicitly. |
| `degraded_missing_authorization` | Non-critical operation was skipped/degraded due to missing access, but core goal may still be evaluable. | GSD may accept only as degraded, not clean. |
| `overridden_quality_gate` | `danger-auto` overrode a research quality gate and recorded it. | Downstream artifacts must carry override/integrity warning. |
| `blocked_missing_evidence` | Required raw evidence is absent or only summaries/context/reports exist. | GSD must not complete the research goal. |
| `blocked_missing_review` | Raw evidence exists but required review/audit/verify input is absent. | Review/audit must run or phase remains blocked/provisional. |
| `blocked_side_effect_unknown` | Requested side-effect status or authorization is unknown. | Audit update or human decision required. |

## 8. Preset, Side-Effect, And Completion Policy

### Presets

| Preset | Minimal adapter behavior | Completion consequence |
| --- | --- | --- |
| `safe` | Deep research and deep review; human participation at important decisions; confirm before external side effects. | Clean only after raw evidence and gates pass. |
| `auto` | Deep research and deep review; automatically handle ordinary local checkpoints; stop on blocking quality gates; external side effects require preauthorization. | Can be clean or degraded, never overridden by default. |
| `danger-auto` | Deep research and deep review; auto-select recommended decisions; use all currently available authorized side-effect capabilities; may override research quality gates with records. | Clean only if nothing required was skipped, missing, unknown, or overridden; otherwise degraded, provisional, overridden, missing-authorization, or blocked. |

`danger-auto` cannot fabricate credentials, login, SSH access, payment setup, API keys, platform authorization, GPU availability, W&B auth, Modal/Vast.ai access, or GitHub permissions. Missing authorization must be recorded and must taint completion status.

### Side-effect policy handoff

The adapter should use a small vocabulary:

| Policy value | Meaning |
| --- | --- |
| `disabled` | Command pack must not attempt this side effect. |
| `confirm` | Stop for user approval before the operation. |
| `preauthorized` | `auto` may execute if required evidence and hard gates are satisfied. |
| `danger_auto_available` | `danger-auto` may execute if the environment has working authorization. |
| `missing_authorization` | Requested operation cannot run because credentials/access/payment/login/API key/SSH/platform permission is absent. |
| `degraded` | Operation skipped or fallback used and command contract allows reduced capability. |
| `blocked` | Operation is required for the goal and cannot be skipped. |
| `out_of_scope` | Operation belongs to a deferred pack or different command family. |

Side-effect classes to classify: git push, PR creation, GitHub operations, SSH, rsync/scp, remote commands, W&B, Modal, Vast.ai, local/remote GPU execution, external reviewer APIs, notifications, cleanup/destructive writes, paid/private network literature sources, and publication/submission actions.

### Completion policy

The adapter can report research readiness, not GSD completion. Completion layers remain separate:

1. Command artifact presence.
2. Raw evidence sufficiency.
3. Review/audit sufficiency.
4. Side-effect/audit integrity.
5. Ordinary GSD review/verify/UAT acceptance.
6. Ordinary GSD lifecycle completion.

Clean completion is forbidden when:

1. Required raw evidence is missing.
2. Literature/reading evidence is missing for `idea-discovery`.
3. Experiment claims rely only on summaries, dashboards, W&B URLs, monitor status, bridge-ready output, or PR links.
4. Required review/audit/UAT is absent.
5. A requested side effect has unknown status.
6. Credentials or authorization were missing for a required operation.
7. `danger-auto` overrode a quality gate.
8. Root Auto artifacts were not adopted into the phase-local `research/` root.

## 9. No-Phase-Type And No-Second-Control-Plane Proof

The revised minimal adapter does not require `phase_type`, phase kind, typed routing, route tables, broad phase schema expansion, or a second control plane.

| Research need | Representation without `phase_type` | Why this is sufficient |
| --- | --- | --- |
| Identify research command | Command invocation, phase title, generated `CONTEXT.md`, prompt-pack provenance in `RESEARCH_INDEX`. | Identification is descriptive and auditable, not lifecycle routing. |
| Preserve Auto/ARIS workflow steps | Ordinary `PLAN.md` tasks, dependencies, waves, checkpoints, and artifact contracts. | GSD already routes work by plans/tasks; Auto stages do not need roadmap-phase mapping. |
| Insert research into existing roadmap | Existing decimal insertion semantics after the current phase. | Numbering handles insertion without typed phase semantics. |
| Start a research-centered milestone | Ordinary integer phases in research-first roadmap mode. | The roadmap goal can be research-centered without a schema discriminator. |
| Store research artifacts | `.planning/phases/<phase>/research/**` plus `RESEARCH_INDEX`. | Artifacts classify evidence; they do not complete or route lifecycle. |
| Resume command-local loops | Phase-local `state-cache/` files such as review/refine cache. | Caches resume a command helper only and cannot mutate GSD state. |
| Handle side effects | `.planning/research.config.json`, side-effect handoff, audit files. | Authorization is command/preset policy, not a phase type. |
| Decide completion | Raw evidence, review/audit, verify/UAT, and ordinary GSD lifecycle owner. | GSD remains authoritative; evidence checker is advisory. |

No-second-control-plane test: after the adapter generates the insertion request, context text, plan guidance, artifact contracts, and phase-local index, ordinary GSD should be able to proceed without the adapter. If future implementation requires the adapter to route `next`, mark phases complete, own progress, reconcile roadmap state, or decide lifecycle transitions, the design has failed.

## 10. Remaining Disagreements

| Disagreement | Revised minimal-adapter stance | Synthesis decision needed |
| --- | --- | --- |
| Exact first-pass command count | Keep a small set and classify many commands as boundary/defer. | Final synthesis should freeze the first-pass table or state which commands Phase 05/06 may prune further. |
| `RESEARCH_INDEX.json` sidecar | Markdown `RESEARCH_INDEX.md` is required; JSON sidecar is useful but not mandatory unless deterministic checks demand it. | Decide whether machine-readable sidecar is part of target framework or implementation detail. |
| `auto` preauthorization storage | Needs explicit record outside core GSD config; likely in `.planning/research.config.json` or phase-local authorization artifact. | Decide exact storage and whether project-level preauthorization is allowed. |
| Execution-heavy wrappers | Defer by default because side-effect scenario tests are not yet defined. | Decide whether any execution wrapper is included as boundary-only in first implementation. |
| SDK boundary | Keep helper outputs SDK-adaptable but do not expose SDK API first. | Decide whether Phase 02 names SDK as deferred, boundary, or minimal adapter target. |
| Source/package baseline | Design against latest upstream source evidence, but block release until source/package/install compatibility is reconciled. | Decide whether final synthesis chooses source `1.35.0`, installed/npm `1.34.2`, or a mandatory reconciliation gate. |
| Root Auto artifact adoption | Explicit adoption is required, but exact command name and conflict policy can be implementation detail. | Decide minimum adoption fields and whether adoption helper is first-pass. |
| Unknown config keys | Strict rejection is safest; experimental namespace may help future packs. | Decide whether unknown keys are fatal or quarantined. |

## 11. Synthesis Recommendations

1. State the final architecture as **Research Command Compiler under GSD-first lifecycle ownership**, and state the minimal adapter as the first implementation slice.
2. Freeze a small helper surface: command wrappers, `.planning/research.config.json` loader, prompt-pack indexer, phase request/insertion handoff, artifact/index helper, evidence checker, `danger-auto` audit writer, side-effect policy handoff, and root artifact adoption helper.
3. Freeze the non-goals: no `phase_type`, no typed routing, no broad phase schema changes, no research-owned canonical writes, no second `STATE.md`, no lifecycle daemon, no root Auto artifact authority, no `ljx-*`/bridge-ready/`primaryCommand` reuse, and no SDK-first lifecycle owner.
4. Keep first-pass command surface smaller than the full Auto/ARIS catalog: literature, idea, novelty/refinement, experiment planning, audit/claim wrappers are eligible; paper/rebuttal/slides/poster/camera-ready and execution-heavy packs are deferred or boundary-only.
5. Require `danger-auto` status taint and audit artifacts as a framework-level invariant, not an implementation nice-to-have.
6. Require clean completion to mean raw evidence plus review/verify/UAT acceptance with no missing authorization, skipped required operation, unknown side effect, or overridden gate.
7. Treat `RESEARCH_INDEX` as the authoritative map of research artifacts, not the authoritative state machine.
8. Carry package/source baseline reconciliation and SDK compatibility as explicit implementation blockers so later phases cannot accidentally target the wrong GSD behavior.
9. Add negative scenario expectations for implementation: context-only `idea-discovery`, skeleton-only `RESEARCH_INDEX`, W&B-link-only execution, missing-audit claim, missing-GitHub-auth `danger-auto`, and root-Auto-artifact conflict must not produce clean completion.
10. Use the remove-the-adapter proof in final synthesis: generated ordinary GSD artifacts plus phase-local research evidence must be sufficient for GSD lifecycle execution without typed routing or a second control plane.
