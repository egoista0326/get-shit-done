# 02-REVISED-GSD-FIRST

**Lane:** Revised GSD-first lifecycle proposal  
**Round:** Phase 02 proposal round 2  
**Position:** GSD lifecycle ownership remains non-negotiable; research commands are compiler/adapters that produce ordinary GSD inputs and phase-local evidence contracts.  
**Write scope:** This file only.

## 1. Revised Position Summary

The revised GSD-first position keeps the core round-1 boundary intact but narrows how it should be expressed in the final synthesis:

1. **GSD owns lifecycle.** Discuss, plan, execute, review, verify/UAT, progress, `next`, state transitions, roadmap mutation, phase completion, milestone completion, locks, atomic writes, git discipline, and canonical `.planning/` lifecycle files remain owned by ordinary GSD commands and orchestrators.
2. **Research commands compile, then hand off.** Standalone `gsd research-*`, `gsd idea-*`, and `gsd experiment-*` commands read research intent, `.planning/research.config.json`, CLI overrides, and prompt-pack contracts, then compile ordinary GSD phase requests, `CONTEXT.md` material, plan constraints, artifact contracts, evidence gates, preset behavior, and side-effect policy.
3. **The public architecture should be named Research Command Compiler.** The GSD-first lane accepts that this name best preserves Auto/ARIS command identity and prompt-pack semantics. The implementation slice should still be a minimal adapter surface, not a broad GSD core rewrite.
4. **Research artifacts are authoritative only inside the owning phase.** The authoritative root is `.planning/phases/<phase>/research/`. Root Auto/ARIS artifacts are import/export mirrors until a GSD-owned adoption flow records provenance, source path, timestamp, command origin if known, target evidence class, and conflict handling in the phase-local `RESEARCH_INDEX.md`.
5. **Single-phase default remains the safest default.** Auto/ARIS internal "Phase", "Stage", and "Step" labels become plan sections, tasks, checkpoints, and evidence contracts inside one ordinary GSD phase unless the normal GSD planner identifies a hard work-mode boundary.
6. **Completion is evidence-based, not artifact-presence-based.** Raw evidence plus relevant review/verify/UAT gates decide completion. Summaries, checkboxes, plan counts, `progress`, `next`, context helpers, bridge-ready outputs, W&B URLs, PR links, monitor status, caches, and file presence are advisory.
7. **`danger-auto` means maximum available automation plus maximum audit burden.** It cannot fabricate credentials, platform access, budget, SSH access, API keys, or authorization. It cannot produce clean completion after skipped required operations, missing authorization, or quality-gate override.
8. **No `phase_type` and no second control plane.** Command identity, prompt-pack provenance, phase title, `CONTEXT.md`, plan text, and `research/RESEARCH_INDEX.md` provide enough context. They must not become routing state or phase lifecycle state.

This is not a restatement of the round-1 strict position. Round 2 absorbs three corrections:

1. From the Research Compiler lane: a generic "ordinary GSD phase" is too vague unless the compiler explicitly preserves command-specific evidence contracts, prompt-pack provenance, config resolution, reviewer policy, and side-effect policy.
2. From the Minimal Adapter lane: the first implementation should be expressed as narrow helper surfaces with strict write boundaries, not as an all-at-once compiler runtime.
3. From the Risk Register lane: the final framework must make false-completion, `danger-auto`, root artifact adoption, SDK/package drift, and subagent write ownership first-class synthesis decisions, not implementation footnotes.

## 2. Source Evidence Used

This revised proposal cross-read all four round-1 proposal files:

| Round-1 file | Evidence used in this revision |
| --- | --- |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-GSD-FIRST.md` | Lifecycle ownership table; no canonical writes by research commands; single-phase default; `.planning/research.config.json`; phase-local `research/RESEARCH_INDEX.md`; completion states; no-`phase_type` proof; package/source and SDK boundaries. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RESEARCH-COMPILER.md` | Public compiler architecture; compile chain from CLI/config/prompt pack to ordinary GSD inputs; insert mode and research-first roadmap mode; command surface families; side-effect and reviewer policy compiled into plan/context contracts. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-MINIMAL-ADAPTER.md` | Smallest viable implementation surface; config loader; prompt-pack indexer; phase request helper; artifact indexer; evidence checker; side-effect handoff; skeleton creation warnings; no direct roadmap/state writer. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RISK-REGISTER.md` | Blocker criteria for `danger-auto`, missing authorization, false completion, root Auto artifacts, package/source drift, SDK ambiguity, subagent write races, side-effect policy, and no-`phase_type` compatibility. |

Additional required context used:

| File | Evidence used |
| --- | --- |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-02-PLAN.md` | Round-2 purpose, required revised proposal sections, no-canonical-write worker scope, and threat model requiring clean/degraded/provisional/overridden status distinctions. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-2.md` | Narrowed target: Research Command Compiler under GSD lifecycle ownership, minimal adapter first, companion specs, risk blockers, and explicit deferrals. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md` | Agreement points, remaining disagreements, rejected directions, requirement coverage, and unresolved questions for final synthesis. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md` | Decisions D-01 through D-57: compiler direction, lifecycle ownership, insertion modes, single-phase default, config path, presets, `danger-auto`, artifacts, package/source baseline, SDK boundary, and completion semantics. |
| `.planning/REQUIREMENTS.md` | ARCH-01 through ARCH-07 plus RSCH requirements requiring standalone commands, phase-local evidence, no second state root, no `phase_type`, and advisory-only summaries/checklists. |

## 3. Accepted From Other Lanes

### Accepted from Research Command Compiler

The final synthesis should use **Research Command Compiler** as the public architecture name. It captures the correct direction better than "strict GSD-first" alone because the target framework must expose Auto/ARIS capabilities as standalone commands, not just ask users to write generic GSD phases manually.

Accepted compiler responsibilities:

| Compiler responsibility | Accepted scope |
| --- | --- |
| Command intake | Parse research command intent, CLI overrides, selected preset, and target mode. |
| Research config resolution | Read `.planning/research.config.json`; apply CLI override > command config > preset > built-in defaults; reject or quarantine unknown first-pass keys. |
| Prompt-pack selection | Select Auto/ARIS prompt packs by indexed source/provenance and compile bounded contracts, not wholesale prompt bodies, into GSD context and plan constraints. |
| Phase request generation | Produce one ordinary GSD phase request by default, including title, goal, context material, evidence requirements, review gates, side-effect policy, and suggested plan shape. |
| Research-first roadmap generation | Produce ordinary integer phase proposals when the project/milestone is explicitly research-centered. |
| Artifact contract emission | Declare required phase-local `research/` files, raw evidence classes, summaries, provisional outputs, reviews, claims, imports, exports, and side-effect audit artifacts. |
| Lifecycle handoff | Call or instruct ordinary GSD lifecycle owners to perform canonical state changes. |

The compiler may compile richer semantics than the round-1 GSD-first lane originally emphasized, but those semantics must remain ordinary GSD inputs or phase-local evidence contracts.

### Accepted from Minimal Adapter

The implementation boundary should be the minimal adapter surface first. The final framework should avoid wording that implies a large compiler-owned runtime.

Accepted minimal surfaces:

| Surface | Final synthesis treatment |
| --- | --- |
| Thin command wrappers | Keep for first-pass standalone commands. |
| Research config loader | Keep as research-only; do not modify upstream `.planning/config.json`. |
| Prompt-pack manifest/indexer | Keep for provenance and stable contract extraction; avoid prompt-body copying drift. |
| Phase request helper | Keep only as a request builder that delegates mutation to GSD insert/new-project/new-milestone lifecycle paths. |
| Artifact indexer | Keep for phase-local `research/RESEARCH_INDEX.md` and evidence inventory. |
| Evidence checker | Keep as advisory/readiness reporting to review/verify, not as phase completion authority. |
| `danger-auto` audit writer | Keep as mandatory for `danger-auto`. |
| Side-effect handoff helper | Keep for authorization, missing-authorization, degraded, blocked, and overridden classifications. |

The minimal adapter lane's strongest correction is that skeleton files can become false evidence. The revised GSD-first stance therefore allows skeleton/index seeding only after an owning GSD phase exists and only when the skeleton is marked incomplete, generated, and not evidence.

### Accepted from Risk Register

The final synthesis should treat the risk register as a set of design blockers. A proposal that lacks these protections should not be considered complete:

1. `danger-auto` must produce audit artifacts and status taint propagation.
2. Missing credentials, missing login, missing SSH access, missing API keys, missing payment setup, or missing platform authorization must block, skip, or degrade the specific operation and must prevent clean completion when required work is affected.
3. External side effects must be explicitly classified for git push, PR creation, GitHub operations, SSH, rsync/scp, remote commands, W&B, Modal, Vast.ai, GPU, reviewer APIs, notifications, cleanup, and destructive writes.
4. Root Auto artifacts must not route, resume, or complete work until adopted into phase-local `research/` with provenance.
5. Package/source baseline drift must be visible: Phase 01 evidence reports latest local source behavior as `get-shit-done-cc@1.35.0` while installed/npm evidence reports `1.34.2`; implementation must reconcile both.
6. SDK support is a compatibility boundary, not a lifecycle owner and not a first-command blocker.
7. Subagents and reviewers may write scoped outputs and phase-local research artifacts only; canonical lifecycle writes remain serialized through GSD owners.
8. Negative completion scenarios must be part of later review/tests: dummy summaries, dummy indexes, plan counts, `progress`, `next`, W&B URL only, PR link only, monitor status only, cache-only, and root Auto file only must not satisfy completion.

## 4. Rejected From Other Lanes

### Rejected compiler overreach

The final synthesis must reject any compiler wording that creates a hidden runtime lifecycle:

1. The compiler must not own `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, workstream pointers, phase completion, milestone completion, or canonical progress.
2. The compiler must not maintain a second research roadmap, route table, phase status file, scheduler, daemon, or lifecycle database.
3. The compiler must not map Auto/ARIS internal stage labels directly to multiple GSD roadmap phases by default.
4. The compiler must not treat `RESEARCH_INDEX.md`, prompt-pack manifests, run logs, reviewer logs, or caches as authoritative lifecycle state.
5. Execution monitors, support tools, reviewer overlays, wiki/watchdog features, W&B, Modal, Vast.ai, SSH, and notifications must remain support adapters, not lifecycle owners.

### Rejected minimal-adapter under-specification

The final synthesis must also reject a "minimal" implementation that is only a CLI-name-to-prompt wrapper:

1. It is not enough to generate a generic phase title and context paragraph.
2. It is not enough to copy Auto/ARIS root artifacts into `.planning/`.
3. It is not enough to create `RESEARCH_INDEX.md` without required evidence classes, status categories, provenance, and side-effect/override mapping.
4. It is not enough to describe `safe`, `auto`, and `danger-auto` at a high level without missing-authorization and completion-status rules.
5. It is not enough to defer package/source and SDK compatibility without naming them as implementation blockers.

### Rejected risk-register maximalism

The risk register should harden the framework, not paralyze it. The final synthesis should not require Phase 02 to resolve implementation-only details that can be safely deferred with explicit blockers:

1. It does not need to choose final module names, exact helper paths, or final JSON property names.
2. It does not need to implement or test SDK support now, as long as it preserves serializable command contracts and states SDK compatibility as a boundary.
3. It does not need to implement execution-heavy wrappers before side-effect scenario tests exist.
4. It does not need to include paper/rebuttal/slides/poster/camera-ready packs in the default v2.0 research pipeline.
5. It does not need to reuse ljx-GSD helpers before quarantine review.

## 5. Revised GSD-First Architecture

### 5.1 Ownership model

| Surface | Owner | Allowed writes | Not allowed |
| --- | --- | --- | --- |
| Canonical lifecycle files | Ordinary GSD lifecycle command/orchestrator | `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, progress, workstream pointers through existing lock/atomic paths | Direct writes by research compiler, research command wrapper, research worker, reviewer backend, monitor, or support tool |
| Phase intent and plan contracts | GSD discuss/plan flow using compiler-generated input | `CONTEXT.md`, `PLAN.md`, plan tasks, checkpoints, evidence requirements, review instructions through GSD planning semantics | Typed routing, hidden research state, bypassing plan checker/review/verify |
| Phase-local research root | Research command or assigned task executor after the owning phase exists | `.planning/phases/<phase>/research/**`, raw evidence, literature bundles, review responses, claims, imports/exports, side-effect logs, run logs, command-local caches | Phase completion, roadmap status, canonical progress, lifecycle routing |
| Completion decision | GSD review/verify/UAT and lifecycle transition | Acceptance or rejection of phase completion based on evidence and gates | Completion from summaries, indexes, file presence, caches, `progress`, `next`, root artifacts, PR/W&B URLs |
| External side effects | GSD executor plus side-effect adapter under preset/authorization policy | Authorized push/PR/GitHub, SSH, W&B, Modal, Vast.ai, GPU, reviewer API, notifications, cleanup with audit records | Silent execution, silent skip, clean completion after skipped required operation |

### 5.2 Compile chain

The accepted compile chain is:

```text
standalone gsd research command
  -> parse intent and CLI overrides
  -> read .planning/research.config.json
  -> resolve preset and command config
  -> select source-indexed Auto/ARIS prompt pack
  -> compile ordinary GSD phase request/context/plan constraints
  -> declare phase-local research artifact and evidence contract
  -> declare preset, checkpoint, side-effect, and completion policy
  -> hand canonical lifecycle mutation to ordinary GSD owner
  -> write only phase-local research artifacts after phase exists
```

Research commands compile:

1. Phase title and goal.
2. Insert mode or research-first mode.
3. `CONTEXT.md` source/provenance summary and research intent.
4. Suggested plan sections, tasks, checkpoints, and dependency notes.
5. Required raw evidence classes.
6. Review/audit/verify/UAT gates.
7. `RESEARCH_INDEX.md` required fields.
8. Preset behavior and side-effect policy.
9. Missing-authorization and degradation behavior.
10. Completion status vocabulary.

Research commands do not compile or own:

1. `phase_type`, typed phase routing, or broad phase schema fields.
2. Canonical roadmap/state mutations.
3. Phase or milestone completion decisions.
4. A second resume/routing/control-plane state.
5. Root Auto artifact authority.

### 5.3 Phase and roadmap modes

| Mode | Trigger | Phase shape | Rule |
| --- | --- | --- | --- |
| Existing-roadmap insert mode | User invokes a research command in an existing GSD project/milestone | One decimal phase after the current phase by default | Auto/ARIS stages become plan tasks/checkpoints unless GSD planner requests a split. |
| Research-first roadmap mode | User starts a project/milestone from research or explicitly requests research-centered roadmap generation | Normal integer phases | Integer phases express real roadmap goals, not Auto internal labels. |
| Planner-split mode | One phase becomes too large or crosses a hard work-mode boundary | GSD-selected split, decimal or integer according to context | Split is a GSD planner quality decision, not compiler default. |

Hard work-mode boundaries that may justify separate phases or plans:

1. Transition from research design to code implementation.
2. Remote execution, GPU use, paid compute, Modal, Vast.ai, SSH, W&B, or destructive cleanup.
3. Raw evidence collection that has separate operational risk.
4. Independent experiment audit.
5. Result-to-claim gate after execution evidence exists.
6. Publication-stage packs, which are deferred from default v2.0.

### 5.4 Phase-local artifact contract

Every research-owning phase should allow this phase-local root:

```text
.planning/phases/<phase>/research/
  RESEARCH_INDEX.md
  RESEARCH_RUN_LOG.md
  evidence/
  literature/
  experiments/
  reviews/
  claims/
  imports/
  exports/
  side-effects/
  caches/
```

`RESEARCH_INDEX.md` should be a map, not a state machine. It may contain:

| Index section | Required purpose |
| --- | --- |
| `owning_phase` | Phase id/title and GSD lifecycle owner. |
| `producing_commands` | Research commands/prompt packs that generated or updated phase-local artifacts. |
| `source_provenance` | Prompt-pack sources, imported root artifact sources, external evidence sources, timestamps, and source version/hash when known. |
| `required_evidence` | Raw evidence required for completion: files, logs, JSON/CSV, URLs, IDs, PDFs, reviewer responses, commands/config/backend/commit/seed metadata, W&B IDs/URLs when used. |
| `summaries` | Human-readable summaries that are useful but advisory. |
| `raw_records` | Machine-readable records and primary evidence files. |
| `reviews_and_audits` | Raw reviewer responses, audit JSON/Markdown, review rounds, stop predicate evidence, and unresolved issues. |
| `provisional_outputs` | Outputs lacking required evidence, review, audit, verification, final acceptance, or affected by degradation. |
| `overrides` | `danger-auto` quality-gate overrides and downstream taint. |
| `side_effects` | External actions requested, authorized, executed, skipped, blocked, degraded, or cleaned up. |
| `imports` | Root/external Auto artifacts adopted into phase-local authority with provenance and evidence class. |
| `exports` | Compatibility mirrors written for Auto-style tooling, explicitly non-authoritative. |
| `completion_status` | Research evidence status: clean, degraded, provisional, overridden, blocked, or backfill/non-execution. This cannot complete the GSD phase by itself. |

Phase-local artifacts may contain command-local resume caches such as review/refine state only if clearly marked as caches. Caches can support continuation. They cannot satisfy evidence gates, route `next`, or complete phases.

### 5.5 Command surface recommendation

The final synthesis should classify first-pass commands by blast radius:

| Command | Revised GSD-first status | Default output |
| --- | --- | --- |
| `gsd research-lit` | Keep | One phase or plan section with literature evidence contract. |
| `gsd idea-discovery` | Keep | One phase requiring retained literature retrieval/reading evidence before any idea report can be complete. |
| `gsd idea-creator` | Keep | One phase or plan section for candidate generation/ranking from evidence. |
| `gsd novelty-check` | Keep with target-aware behavior | Prefer plan-level gate inside an active idea phase when possible; insert one phase when independent. |
| `gsd research-refine` | Keep | One phase or plan section preserving problem anchor, round logs, and review loop. |
| `gsd research-review` | Keep as review helper | Phase-local review artifacts and raw responses; no completion authority. |
| `gsd research-pipeline` | Keep as wrapper | Single inserted phase by default; research-first integer roadmap only when explicitly requested. |
| `gsd experiment-plan` | Keep | One phase keeping claim, method, metrics, dataset, baselines, run order, and failure interpretation together. |
| `gsd ablation-planner` | Keep as planning helper | Plan section or phase-local artifact tied to experiment-plan evidence. |
| `gsd analyze-results` | Keep after evidence exists | Analysis linked to raw evidence, config, run metadata, and audit status. |
| `gsd experiment-audit` | Keep with boundary rule | Plan-level or separate phase depending on independence and audit gate. |
| `gsd result-to-claim` | Keep with evidence precheck | Claims marked yes/partial/no/provisional based on raw evidence and audit lineage. |
| `gsd auto-review-loop` | Keep as support/review command | Bounded review loop with raw responses, reviewer provenance, and stop predicate evidence. |
| `gsd experiment-bridge` | Boundary/defer | Bridge artifact is not execution evidence; implement after side-effect and evidence tests are specified. |
| `gsd run-experiment` | Defer or gated support wrapper | Requires side-effect scenario tests, raw evidence contract, authorization audit, cleanup policy. |
| `gsd monitor-experiment` | Defer or gated support wrapper | Operational status only; cannot satisfy research evidence by itself. |
| Paper/rebuttal/slides/poster/camera-ready | Defer | Future compiler packs, not default v2.0 research pipeline. |

## 6. Minimal Changes Allowed

The GSD-first lane accepts only these changes as first-pass target-framework additions:

| Allowed change | Why allowed | Boundary |
| --- | --- | --- |
| Standalone research command wrappers | Required by ARCH-02 and RSCH requirements | Thin wrappers only; no lifecycle ownership. |
| Research command compiler workflow/prompt | Preserves Auto/ARIS command semantics | Emits GSD-compatible inputs and phase-local contracts only. |
| `.planning/research.config.json` | Keeps research keys out of upstream `.planning/config.json` | Compiler-owned reader; normalized/pruned before GSD core sees anything. |
| Prompt-pack manifest/indexer | Preserves source provenance and avoids prompt drift | Not lifecycle state; not route table. |
| Phase request object/helper | Encodes title, goal, mode, context, evidence, side effects | Delegates canonical writes to GSD lifecycle owner. |
| `research/RESEARCH_INDEX.md` convention | Makes evidence boundaries explicit | Index/map only; not `STATE.md`; not completion authority. |
| Phase-local artifact sublayout | Keeps research evidence under owning phase | No root Auto authority. |
| Evidence/readiness checker | Helps review/verify find missing evidence | Advisory; cannot mark phase complete. |
| Preset and side-effect policy contract | Required for safe/auto/danger-auto behavior | Command/preset behavior, not phase schema. |
| `danger-auto` audit artifacts | Required to prevent false clean completion | Phase-local only; status taint propagates downstream. |
| Upgrade/SDK boundary documentation | Required by ARCH-05 | Implementation blocker, not first-command lifecycle owner. |

Explicitly disallowed:

1. Adding `phase_type`.
2. Adding typed route tables or hidden phase kinds by another name.
3. Broad phase schema expansion.
4. Direct research writes to canonical lifecycle files.
5. A second research state root.
6. Treating root Auto artifacts as authoritative without adoption.
7. Generic completion from generated summaries, skeletons, or indexes.
8. Global side-effect settings that affect every command indiscriminately.
9. Implementing paper/rebuttal packs as default v2.0 scope.
10. Reusing ljx-GSD helper code without quarantine review.

## 7. Preset, Side-Effect, And Completion Policy

### 7.1 Config and preset policy

The final synthesis should define `.planning/research.config.json` as research-command-owned configuration. The exact JSON names can remain implementation-discretionary, but these semantics should be fixed:

1. Precedence is CLI override > command-specific config > preset > built-in defaults.
2. Default preset is `safe`.
3. Supported presets are `safe`, `auto`, and `danger-auto`.
4. All presets default to deep research and deep review.
5. First-pass parameters include `preset`, `effort`, `review_depth`, `auto_proceed`, `human_checkpoint`, `max_review_rounds`, `sources`, `max_literature_items`, `review_difficulty`, `score_threshold` or `novelty_threshold`, and `require_literature_evidence`.
6. Paper-stage parameters such as venue, max pages, anonymity, citation policy, paper improvement rounds, rebuttal rounds, slides, poster, and camera-ready settings are deferred.
7. GPU, W&B, SSH, Modal, Vast.ai, and similar execution side-effect parameters belong to execution command packs and authorization policy, not every research command.
8. Unknown keys should be rejected, ignored with warning, or quarantined under an explicit experimental namespace. They must not flow raw into upstream GSD core.

### 7.2 Preset behavior

| Preset | Behavior | External side effects | Quality gates | Clean completion allowed? |
| --- | --- | --- | --- | --- |
| `safe` | Deep research/review with human participation at important decisions | Confirm before external side effects | Stops on blocking gates | Yes, only when required evidence exists and gates pass. |
| `auto` | Deep research/review with ordinary checkpoints handled automatically | Executes only preauthorized/configured operations | Stops on blocking quality gates | Yes, only when no required operation is skipped and no gate is overridden. |
| `danger-auto` | Deep research/review with maximum available automation permissions and auto-selected recommended decisions | Uses available authorized git/PR/GitHub/SSH/W&B/Modal/Vast.ai/GPU/reviewer/notification/cleanup capabilities | May override research quality gates only where policy allows and only with records | No, if required authorization is missing, required side effect is skipped/blocked, or quality gate is overridden. |

`danger-auto` must produce these artifacts under `.planning/phases/<phase>/research/`:

1. `RESEARCH_RUN_LOG.md`
2. `AUTHORIZATION_ACTIONS.json`
3. `DANGER_AUTO_OVERRIDES.md`
4. `SIDE_EFFECTS.md`
5. `RESEARCH_INDEX.md` entries marking clean, degraded, provisional, overridden, blocked, and missing-authorization status as applicable.

### 7.3 Side-effect policy

External effects are command/preset behavior, not GSD phase schema. The final synthesis should require side-effect records for:

| Side-effect class | Required record |
| --- | --- |
| Git push and PR | Branch, remote, commit range, base/head, URL/ID if created, authorization source, result, skip/failure reason. |
| GitHub operations | Operation class, target repo/issue/PR, auth availability, result, failure/skip reason. |
| SSH, rsync/scp, remote commands | Host alias, command class, path roots, dry-run/real status, authorization, result, cleanup if needed. |
| W&B | Project/entity/run ID/URL, whether logging is enabled, raw local evidence path, missing API-key behavior without exposing secrets. |
| Modal, Vast.ai, GPU, paid compute | Provider, budget, instance/job ID, image/environment, command, result path, cleanup plan/result, skipped/degraded state. |
| Reviewer APIs | Provider/model, transmitted artifact classes/paths, raw response path, policy allowance, fallback behavior. |
| Notifications | Target class, message purpose, token/webhook availability, result. |
| Cleanup/destructive writes | Path scope, backup/rollback when possible, evidence preservation, post-cleanup verification. |

Missing authorization must not be hidden. Depending on command contract and preset, it may:

1. Block the operation.
2. Skip the specific operation and mark output degraded.
3. Continue with a local fallback and mark output degraded.
4. Produce provisional output only.
5. Require human approval.

It may not produce clean completion if the missing operation was required for the command's evidence or acceptance contract.

### 7.4 Completion status policy

Completion has two layers:

1. **Research evidence status** in `RESEARCH_INDEX.md` and related artifacts.
2. **GSD phase completion** by ordinary GSD review/verify/UAT and lifecycle transition.

The research layer may report:

| Status | Meaning | Can become clean GSD completion by itself? |
| --- | --- | --- |
| `clean` | Required raw evidence exists; required reviews/audits pass or are accepted as non-blocking; verification/UAT accepts; no required side effect was skipped; no quality gate was overridden. | No. GSD still owns completion. |
| `degraded` | Optional or policy-allowed service/path failed or was unavailable, fallback used, or non-critical evidence path unavailable. | No. GSD may accept only explicitly. |
| `provisional` | Useful output exists but lacks required independent review, audit, verification, raw evidence, or final acceptance. | No. |
| `overridden` | `danger-auto` overrode a research quality gate and recorded the override. | No clean completion; downstream artifacts must carry taint. |
| `blocked` | Required evidence, authorization, credential, budget, review, verification, or user decision is missing and cannot be skipped. | No. |
| `backfill/non-execution` | Artifact records imported, historical, baseline, or mirrored evidence but not current execution evidence. | No. |

Command-specific raw evidence examples:

| Command family | Minimum evidence examples |
| --- | --- |
| Literature/discovery | Query/source metadata, retained source IDs/URLs/paths, reading notes, accepted/rejected papers, literature evidence bundle, unresolved verification markers, relevant review. |
| Idea/refinement | Candidate report plus literature-backed novelty/refinement evidence, problem anchor, review rounds, reviewer raw responses, unresolved `[VERIFY]` markers. |
| Experiment planning | Claim map, anti-claims, metric definitions, dataset/split/baseline/method/run order, success/failure interpretation, budget, feasibility/sanity checks. |
| Execution | Raw JSON/CSV/logs, command/config/backend/commit, seed/run metadata, W&B ID/URL if used, reproducibility command, cleanup result. |
| Analysis/audit/claims | Analysis linked to raw numbers, audit Markdown/JSON, raw reviewer responses where relevant, yes/partial/no/provisional claim verdicts. |

## 8. No-Phase-Type And No-Second-Control-Plane Proof

The revised architecture does not require `phase_type`, typed phase routing, broad phase schema changes, or a second control plane.

| Research need | Representation without `phase_type` |
| --- | --- |
| Identify why the phase exists | Phase title, `CONTEXT.md`, command invocation summary, prompt-pack provenance, `RESEARCH_INDEX.md` producing command list. |
| Preserve Auto/ARIS workflow structure | Plan sections, tasks, checkpoints, evidence contracts, review gates, and phase-local artifacts. |
| Distinguish literature, idea, execution, audit, claim, and paper work | Command-specific artifact contracts and evidence directories under the phase-local `research/` root. |
| Insert research into existing roadmap | Ordinary decimal phase insertion after current phase. |
| Start research-centered project/milestone | Ordinary integer phases in research-first roadmap mode. |
| Split oversized work | Ordinary GSD planner quality response, not typed routing. |
| Resume command-local loops | Phase-local caches marked as caches; no routing or completion authority. |
| Enforce side-effect behavior | Preset and command policy plus audit artifacts; no phase schema field required. |
| Complete work | Existing GSD review/verify/UAT and lifecycle transition, informed by raw evidence and research status. |

No second control plane exists because:

1. Research commands emit requests and contracts, not lifecycle state.
2. Canonical writes route through existing GSD owners and locks.
3. `RESEARCH_INDEX.md` maps evidence but cannot route `next`, mutate roadmap status, or close phases.
4. Prompt-pack manifests identify source contracts but cannot decide phase transitions.
5. Root Auto artifacts are mirrors until adopted.
6. Support tools and external services write evidence/audit records only.
7. SDK compatibility remains an access/API boundary, not lifecycle authority.

If the final synthesis needs a scenario proof, use these cases:

1. `gsd idea-discovery` in an existing roadmap creates one decimal phase with literature evidence gates and no `phase_type`.
2. `gsd experiment-plan` keeps metrics, dataset, baseline, method, run order, and interpretation together in one phase/plan without typed routing.
3. `gsd run-experiment` or `experiment-bridge` may create a separate execution/evidence phase because of side effects, not because of a typed phase kind.
4. `gsd experiment-audit` can be a plan-level gate or separate phase based on GSD planner quality and independence, not a route table.
5. `gsd result-to-claim` reads raw evidence and audit lineage from phase-local artifacts and produces claim status, but GSD still owns completion.
6. A research-first roadmap uses integer phases because the whole milestone is research-centered, not because phase schema changed.
7. A conflicting root Auto `IDEA_REPORT.md` is ignored for completion until adopted into the phase-local research root with provenance.

## 9. Remaining Disagreements

The lanes now agree on architecture direction. The remaining disagreements are final-synthesis decisions or explicit deferrals:

| Open issue | Revised GSD-first recommendation | Main synthesis must decide |
| --- | --- | --- |
| `RESEARCH_INDEX` format | Markdown index is mandatory; a JSON sidecar is useful for deterministic checks but can be deferred to implementation if the Markdown fields are structured. | Require Markdown only now, or require `RESEARCH_INDEX.json` sidecar now. |
| Exact `.planning/research.config.json` schema | Fix semantics and precedence now; leave property names mostly implementation-discretionary. | Whether unknown keys are rejected, warning-only, or quarantined under an experimental namespace. |
| `auto` preauthorization record | Must exist outside upstream `.planning/config.json` and be visible in side-effect/audit records. | Whether preauthorization belongs in research config, phase-local authorization record, or both. |
| Hard versus overridable gates in `danger-auto` | Hard safety/authorization gates are non-overridable; research quality gates may be overridden only with taint where policy allows. | Exact taxonomy of non-overridable gates. |
| First-pass command table | Keep literature/idea/planning/audit/claim commands; defer execution-heavy wrappers until scenario tests exist. | Whether `experiment-bridge`, `run-experiment`, and `monitor-experiment` are boundary commands in v2.0 docs or fully deferred. |
| Source/package baseline | Use latest upstream source behavior as design baseline, while recording `1.35.0` source versus `1.34.2` installed/npm drift as implementation blocker. | Whether Phase 02 final synthesis chooses a baseline now or requires reconciliation before Phase 05/06 coding. |
| SDK support | Preserve serializable compiler contracts and future SDK adaptation. Do not make SDK lifecycle owner. | Include SDK adapter target in Phase 02 framework, or defer SDK detail to implementation boundaries. |
| Skeleton creation | Allow skeleton/index only after owning GSD phase exists and mark incomplete/generated/not evidence. | Whether default compiler should seed skeletons or only declare required artifacts in context/plan. |
| Root artifact adoption | Must be explicit and provenance-recorded. | Exact command or workflow name for adoption and conflict behavior. |
| ljx-GSD reuse | Defer all reuse until quarantine review. | Which helper ideas become allowed implementation candidates later. |

## 10. Synthesis Recommendations

The main synthesis should converge on this target:

1. **Name the final architecture "Research Command Compiler under GSD lifecycle ownership."** This absorbs compiler clarity while preserving GSD-first authority.
2. **Define the implementation stance as "minimal adapter first."** The first implementation surfaces should be command wrappers, research config reader, prompt-pack indexer, phase request helper, artifact/index helper, evidence checker, side-effect policy helper, and `danger-auto` audit writer.
3. **Make an ownership table mandatory.** The framework should explicitly state what GSD owns, what research commands compile, what phase-local artifacts may contain, what support tools may do, and what no component except GSD may write.
4. **Keep single-phase default.** Existing-roadmap research commands insert one decimal phase by default. Research-first mode uses normal integer phases. Splits happen only through normal GSD planner quality or hard work-mode boundaries.
5. **Require `.planning/research.config.json`.** Keep research config separate from upstream `.planning/config.json`; fix precedence and first-pass parameter preservation.
6. **Require `RESEARCH_INDEX.md`.** It should classify required evidence, summaries, raw records, reviews/audits, imports, exports, side effects, provisional outputs, overrides, and research evidence status. It must not become lifecycle state.
7. **Make completion semantics a companion spec.** Clean, degraded, provisional, overridden, blocked, and backfill/non-execution statuses must be defined before implementation. Clean completion requires raw evidence and gates, not advisory signals.
8. **Make `danger-auto` a companion spec.** It must cover maximum available permissions, missing authorization, side-effect audit records, override propagation, non-overridable gates, and no false clean completion.
9. **Require root artifact adoption policy.** Root Auto/ARIS artifacts are mirrors until adopted into the owning phase's `research/` root with provenance and evidence class.
10. **Carry package/source and SDK boundaries into implementation planning.** Record latest upstream source as behavioral design baseline while requiring reconciliation of `get-shit-done-cc@1.35.0` source evidence against `1.34.2` installed/npm evidence; keep SDK support compatible but not lifecycle-owning.
11. **Reject `phase_type` conclusively.** No proposal needs `phase_type`, typed route tables, broad phase schema changes, or second control-plane state. The scenario proof in this revised proposal should be copied into the final framework or companion spec.
12. **Defer execution-heavy and publication packs intentionally.** `experiment-bridge`, `run-experiment`, `monitor-experiment`, and paper/rebuttal/slides/poster/camera-ready packs should not be default v2.0 core until side-effect and evidence scenario tests exist.

The strongest synthesis framing is:

```text
Research commands are source-indexed compilers for ordinary GSD work.
GSD remains the lifecycle system.
Phase-local research artifacts preserve Auto/ARIS evidence semantics.
Completion is a GSD decision informed by raw evidence, review, verification, and explicit status.
```
