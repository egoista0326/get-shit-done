# 02-REVISED-RESEARCH-COMPILER

**Lane:** Revised Research Command Compiler  
**Round:** Phase 02 proposal round 2  
**Worker ownership:** Worker 2 writes only this file.  
**Status:** Synthesis-ready revised proposal, not final main-agent synthesis.

## 1. Revised Position Summary

The public target architecture should remain **Research Command Compiler**, but the compiler must be defined more narrowly than the round-1 compiler lane implied.

The compiler is a compile-time/input-generation layer:

```text
gsd research-* command
  -> load .planning/research.config.json and CLI overrides
  -> select source-indexed Auto/ARIS prompt-pack contract
  -> resolve preset, evidence, side-effect, artifact, and completion policies
  -> emit a compiled research bundle
  -> hand off phase creation, planning, execution, review, verify/UAT, state, and completion to ordinary GSD
```

The compiler does **not** own lifecycle state, phase completion, roadmap mutation, canonical `.planning/` writes, or a parallel research workflow. It may create/update phase-local research artifacts only after an owning GSD phase exists, and those artifacts are evidence/provenance/resume support, not lifecycle authority.

Round 2 should merge the other lanes into the compiler stance:

- From GSD-first: GSD owns lifecycle, canonical state, locks, phase completion, review/verify/UAT, and git discipline.
- From Minimal Adapter: first implementation slice is small: command shims, config loader, prompt-pack registry, phase request renderer, artifact/index helper, evidence checker, side-effect handoff, and danger-auto audit writer.
- From Risk Register: danger-auto, missing authorization, root artifact adoption, evidence-only completion, package/source drift, SDK boundary, subagent write ownership, and false-completion negative cases are blockers, not implementation details.

The compact target stance is: **Research commands prepare GSD-native work; GSD remains the work system.**

## 2. Source Evidence Used

This revised proposal explicitly cross-read all four round-1 proposal files:

- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-GSD-FIRST.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RESEARCH-COMPILER.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-MINIMAL-ADAPTER.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RISK-REGISTER.md`

Additional required sources used:

- `.planning/phases/02-target-gsd-framework-design-rounds/02-02-PLAN.md`: round-2 execution contract, worker ownership, required convergence target, risk mitigations, and verification requirements.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-2.md`: readiness confirmation and narrowed target for round-2 workers.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md`: agreement points, disagreements, rejected directions, requirement coverage, and round-2 inputs.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md`: D-01 through D-57 decisions covering compiler architecture, phase granularity, insertion modes, research config, presets, side effects, artifact root, upstream baseline, SDK, and completion semantics.
- `.planning/REQUIREMENTS.md`: ARCH-01 through ARCH-07 and downstream research integration requirements RSCH-01 through RSCH-09.

Evidence applied:

| Source | Evidence imported into this revision |
| --- | --- |
| GSD-first proposal | Strict lifecycle ownership, canonical write boundary, ordinary phase/plan/task/checkpoint mapping, no second control plane, GSD-owned completion. |
| Research Compiler proposal | Compiled bundle shape, prompt-pack injection model, command compilation flow, config precedence, phase-local research root, completion layers. |
| Minimal Adapter proposal | Small implementation slice, compile-only helper boundary, first-pass/deferred command ordering, strict config pruning, artifact/evidence checker, danger-auto helper surface. |
| Risk Register proposal | Blocking risks for danger-auto, missing authorization, false completion, root Auto artifact authority, typed routing, subagent writes, package/source drift, SDK ambiguity, side-effect policy. |
| Round-1 comparison | Consensus that compiler is public architecture, minimal adapter is implementation stance, GSD owns lifecycle, no `phase_type`, single-phase default, research config separation, raw evidence completion. |
| Phase 02 context | Exact decisions for `.planning/research.config.json`, presets, first-pass parameters, artifact root, insertion modes, SDK/package baseline, and completion semantics. |
| Requirements | ARCH-01 through ARCH-07 require GSD lifecycle ownership, standalone commands, ordinary phases plus narrow artifact conventions, no typed schema changes, documented runtime/helper/config/git/upgrade boundaries, proposal rounds, and evidence-based completion. |

## 3. Accepted From Other Lanes

Accepted from **GSD-first**:

- GSD is the only lifecycle/control-plane owner.
- Research commands cannot directly write `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md`, phase records, milestone records, progress state, or completion state.
- Research work is represented as ordinary GSD phases, plans, tasks, artifacts, review gates, verify/UAT, and phase-local evidence.
- Completion remains a GSD lifecycle decision, not a compiler decision.
- Git, hooks, workstreams, state locks, atomic writes, and subagent ownership should reuse upstream GSD discipline.

Accepted from **Minimal Adapter**:

- The first implementation should be the minimal adapter slice under the compiler architecture, not a broad compiler runtime.
- Adapter modules should be compile-only or phase-local only: config loader, prompt-pack indexer, phase request builder, artifact indexer, evidence checker, side-effect handoff, and danger-auto audit writer.
- Execution-heavy wrappers should be deferred until side-effect scenario tests exist.
- Prompt packs should be source-indexed and contract-extracted rather than copied wholesale.
- `RESEARCH_INDEX.md` should be human-readable and may have a future machine-readable sidecar, but it cannot become lifecycle state.

Accepted from **Risk Register**:

- A compiler design is blocked if `danger-auto` lacks audit artifacts, taint propagation, missing-authorization behavior, and non-clean statuses.
- Missing credentials, absent platform access, payment setup, SSH failure, API keys, or authorization cannot be hidden as success.
- Raw evidence, review/audit evidence, verify/UAT, disk state consistency, and explicit acceptance are required for clean completion.
- Root Auto artifacts are mirrors until adopted into the phase-local research root with provenance.
- Package/source latest drift and SDK ambiguity must be explicit implementation blockers or boundaries.
- Subagents, reviewer backends, and execution monitors may write scoped artifacts only; canonical lifecycle writes remain serialized through GSD owner paths.

Accepted from **round-1 compiler**:

- The final synthesis should keep the Research Command Compiler as the public architecture because it best preserves standalone `gsd research-*` commands while translating Auto/ARIS obligations into GSD-native inputs.
- The compiled bundle is the right abstraction if it is treated as an ephemeral/rendered handoff, not durable lifecycle state.
- Prompt-pack provenance, config resolution, artifact contracts, side-effect policy, and completion policy must be compiled consistently for every command pack.

## 4. Rejected From Other Lanes

Rejected from any **overly strict GSD-only interpretation**:

- Research commands cannot be only generic phase descriptions with manual copy/paste of Auto/ARIS intent. That would preserve lifecycle but lose ARCH-02, ARCH-03, ARCH-05, and ARCH-07 research obligations.
- Evidence contracts, prompt-pack provenance, side-effect policy, and command-specific completion blockers must be generated systematically by the compiler.

Rejected from any **overly thin adapter interpretation**:

- A wrapper that only maps CLI names to prompts is insufficient.
- The adapter must compile explicit artifact contracts, evidence gates, config precedence, side-effect policy, and completion status mapping.
- Skeleton creation cannot be treated as evidence satisfaction.
- `RESEARCH_INDEX.md` cannot be a completion switch.

Rejected from the **round-1 compiler lane if read too broadly**:

- The compiled bundle must not become a persistent compiler-owned workflow state.
- The compiler must not directly invoke lifecycle mutation paths unless it routes through ordinary GSD owner commands and lock/atomic-write semantics.
- The compiler must not default to generated mini-roadmaps for Auto/ARIS internal stages.
- The compiler must not own clean/degraded/provisional/overridden/blocked phase completion; it can only report research evidence/readiness labels for GSD review.

Rejected from any **risk-deferring stance**:

- `danger-auto` behavior cannot be deferred as an implementation detail.
- Package/source drift cannot be ignored because Phase 01 evidence shows source/package mismatch.
- SDK cannot be dismissed; it is not a lifecycle owner, but future adaptation must not be blocked by the command compiler contract.
- Root Auto artifact adoption cannot remain vague.

## 5. Revised Compiler Architecture

### 5.1 Ownership Model

| Surface | Owner | Compiler role | Forbidden compiler behavior |
| --- | --- | --- | --- |
| Canonical GSD lifecycle | Ordinary GSD lifecycle commands/orchestrator | Emit phase request and handoff instructions | Direct writes to project, requirements, roadmap, state, phase records, milestone records, progress, completion |
| Phase context and plans | GSD discuss/plan flows | Render research intent, prompt-pack contracts, evidence requirements, checkpoints, and side-effect constraints as input text | Bypass planner/checker, route by typed fields, or force completion |
| Phase-local research artifacts | Owning phase tasks/research command helpers | Initialize/update `research/` artifacts after phase exists | Treat research artifacts as roadmap/state authority |
| Research evidence checking | Advisory research helper plus GSD review/verify | Report evidence readiness, missing raw records, missing review/audit, side-effect gaps, and taint labels | Mark phase complete or override GSD verify/UAT |
| External side effects | GSD execution tasks plus side-effect adapters under preset policy | Classify authorization and record outcomes | Execute unauthorized operations silently or report clean success after skips/overrides |
| SDK/package boundary | Later implementation planning | Keep compiler inputs/outputs serializable and adapter-friendly | Require SDK to own lifecycle or block CLI-first design |

### 5.2 Compiler Components

The revised compiler should be expressed as a small set of implementation-neutral contracts:

1. **Command shim:** thin `gsd research-*`, `gsd idea-*`, and `gsd experiment-*` command entries.
2. **Research config resolver:** reads `.planning/research.config.json`, applies precedence, validates known keys, and prunes config before GSD handoff.
3. **Prompt-pack registry:** maps command names to source-indexed Auto/ARIS prompt-pack contracts and provenance.
4. **Compiled bundle renderer:** creates GSD-native phase request, context injection, planner constraints, artifact contracts, evidence requirements, checkpoint policy, side-effect policy, and completion policy.
5. **Phase request handoff:** passes insertion/new-roadmap request to ordinary GSD lifecycle commands; it does not mutate canonical state directly.
6. **Research artifact initializer:** creates phase-local `research/` root and `RESEARCH_INDEX.md` after the owning phase exists.
7. **Evidence checker:** produces advisory evidence readiness states for GSD review/verify.
8. **Danger-auto audit writer:** records automated decisions, missing authorization, overrides, and side effects under the owning phase's `research/` root.
9. **Import/export adoption helper:** imports root Auto artifacts into phase-local `research/` with provenance and evidence class, and exports mirrors without making them authoritative.

### 5.3 Phase Insertion Modes

Synthesis-ready position:

| Mode | Trigger | Numbering | Compiler output | Lifecycle owner |
| --- | --- | --- | --- | --- |
| Existing-roadmap insert mode | Research command invoked inside an existing roadmap after a current phase | Decimal phase after current phase, for example `08.1` after `08` | One phase request by default | Ordinary GSD insert/discuss/plan lifecycle |
| Research-first roadmap mode | Project/milestone begins from `research-pipeline` or user explicitly asks for research-centered roadmap | Normal integer phases | Integer phases only for true roadmap goals | Ordinary GSD new-project/new-milestone/roadmap lifecycle |
| Planner-split mode | Single compiled phase is too large or crosses hard work-mode boundary | GSD-selected integer/decimal split | Split recommendation, not default compiler behavior | Ordinary GSD planner/checker |

Auto/ARIS internal labels named phase/stage/step map to plans, tasks, checklists, artifacts, and checkpoints. They do not mechanically become GSD roadmap phases.

Hard work-mode boundaries that may justify separate phases include implementation/execution, remote/GPU/raw evidence collection, independent audit, and result-to-claim gating.

### 5.4 First-Pass And Deferred Commands

Synthesis-ready first-pass table:

| Command | First-pass status | Default GSD shape | Notes |
| --- | --- | --- | --- |
| `gsd research-lit` | Keep | One inserted phase or plan inside active research phase | Requires literature source/query/reading evidence. |
| `gsd idea-discovery` | Keep | One inserted phase | Cannot complete from idea report/context alone; literature evidence is mandatory. |
| `gsd idea-creator` | Keep | One inserted phase or plan in discovery phase | Candidate generation/ranking with provenance. |
| `gsd novelty-check` | Keep with attach preference | Prefer plan/checkpoint inside active idea phase; inserted phase if independent goal | Requires raw novelty/reviewer evidence and source links. |
| `gsd research-review` | Keep as support/review command | Plan/checkpoint or inserted review phase if independent boundary | Must preserve raw reviewer responses. |
| `gsd research-refine` | Keep | One inserted phase or plan in active idea phase | Preserves problem anchor, rounds, thresholds, raw reviews. |
| `gsd research-pipeline` | Keep as wrapper | Existing-roadmap: one phase by default; research-first: normal integer roadmap | Wrapper compiles ordinary GSD work, not a second pipeline engine. |
| `gsd experiment-plan` | Keep | One inserted phase | Keep claim, metric, dataset, split, baseline, method, success/failure interpretation together. |
| `gsd analyze-results` | Keep with evidence precheck | Plan/checkpoint after execution evidence exists; inserted phase if analysis is independent goal | Cannot use monitor/W&B link alone as raw evidence. |
| `gsd experiment-audit` | Keep with boundary rule | Plan/checkpoint unless independent audit is a hard boundary | Missing audit is no audit, not pass. |
| `gsd result-to-claim` | Keep with evidence precheck | Plan/checkpoint or inserted claim-gate phase | Requires yes/partial/no claims linked to raw evidence and audit. |
| `gsd ablation-planner` | Keep | One inserted phase or plan in experiment design | Maps component claims to tests and evidence requirements. |
| `gsd auto-review-loop` | Keep as helper | Plan/checkpoint helper, not lifecycle owner | Stop only on score threshold plus positive verdict; preserve raw responses. |
| `gsd experiment-bridge` | Boundary/defer | Separate execution-readiness phase only when code/remote boundary begins | Must wait for side-effect scenario tests before broad automation. |
| `gsd run-experiment` | Defer first implementation or gate behind execution pack | Separate execution/evidence phase | Requires side-effect tests for GPU/W&B/SSH/Modal/Vast/git/cleanup. |
| `gsd monitor-experiment` | Defer first implementation or support-only | Operational helper under execution phase | Monitor status is not research evidence. |
| Paper/rebuttal/slides/poster/camera-ready commands | Defer | Future compiler packs | Preserve provenance and artifact-chain requirements, but exclude from default v2.0 pipeline. |
| Research wiki/watchdog/provider overlays | Defer/support-only | Optional helpers | Must never route lifecycle or complete work. |

## 6. Compiled Bundle And Handoff Contract

The compiled bundle should be the compiler's central output, but it must be ephemeral or rendered into ordinary GSD/context/research artifacts. It is not a second `STATE.md`.

Minimum bundle fields:

| Field | Required content | Authority |
| --- | --- | --- |
| `command` | Public command name and command family | Invocation/provenance only |
| `intent` | User topic, brief, input artifacts, objective | Phase-context input |
| `source_prompt_pack_refs` | Prompt-pack id, source paths, extracted contract names, source extraction refs, version/hash/date where known | Provenance, not lifecycle state |
| `resolved_config` | Pruned config after CLI > command config > preset > built-in defaults | Compiler input only |
| `preset_policy` | `safe`, `auto`, or `danger-auto` behavior and checkpoint policy | GSD checkpoint guidance |
| `phase_request` | title, goal, insertion mode, success criteria, artifact root, phase split recommendation | Handoff to GSD lifecycle owner |
| `context_injection` | research constraints, source provenance, prompt-pack obligations | `CONTEXT.md` input |
| `planner_constraints` | plan/task/checkpoint guidance, review loops, split boundaries | `PLAN.md` input |
| `artifact_contracts` | required files/classes under `research/` | Evidence contract |
| `evidence_requirements` | raw source records, JSON/CSV/logs, reviewer responses, audit outputs, W&B IDs/URLs where used | Evidence contract |
| `side_effect_policy` | disabled/confirm/preauthorized/missing-authorization/degraded/blocked decisions by service class | Execution/audit guidance |
| `completion_policy` | clean/degraded/provisional/overridden/blocked definitions for command output | Advisory to GSD review/verify |
| `research_index_seed` | initial `RESEARCH_INDEX.md` sections and expected paths | Artifact map only |

Handoff rules:

- In `safe`, the compiler should produce the bundle and either ask before invoking lifecycle mutation or instruct the user/orchestrator which ordinary GSD command applies.
- In `auto`, the compiler may proceed through ordinary non-blocking local handoffs when evidence/policy requirements are satisfied, but it stops on blocking quality gates and unapproved external side effects.
- In `danger-auto`, the compiler may auto-select recommended decisions and use available authorized side effects after selection, but every side effect, missing authorization, override, degraded path, and provisional output must be recorded.
- In all modes, canonical lifecycle writes are performed only by ordinary GSD owner paths.

## 7. Research Config, Prompt-Pack, And Artifact Contract

### 7.1 `.planning/research.config.json`

Synthesis-ready position:

- The path is `.planning/research.config.json`.
- It is read only by research compiler/adapters, not upstream GSD core config.
- Research config is not copied into `.planning/config.json`.
- Precedence is exactly: CLI override > command-specific config > preset > built-in defaults.
- Unknown keys should be rejected or warned as non-effective in first-pass commands; implementation may allow an explicit experimental namespace only if later synthesis approves it.
- Parameters are pruned before GSD handoff; GSD receives compiled constraints, not raw research config.

Minimum schema stance, with exact field names still implementation-adjustable:

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
    "novelty_threshold": 9,
    "require_literature_evidence": true
  },
  "commands": {
    "research-lit": {},
    "idea-discovery": {},
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

First-pass preserved parameters:

- `preset`
- `effort`
- `review_depth`
- `auto_proceed`
- `human_checkpoint`
- `max_review_rounds`
- `sources`
- `max_literature_items`
- `review_difficulty`
- `score_threshold` or `novelty_threshold`
- `require_literature_evidence`

Deferred or excluded from first-pass global config:

- Paper/rebuttal/slides/poster/camera-ready parameters: venue, max pages, anonymity, DBLP/CrossRef citation policy, paper improvement rounds, rebuttal rounds, slides, poster, camera-ready.
- Execution/provider parameters for GPU, W&B, SSH, Modal, Vast.ai, budgets, cleanup, remote commands, and persistent logging except as command-pack side-effect policy.

### 7.2 Prompt-Pack Provenance

Synthesis-ready position:

- Prompt packs are source-indexed contracts, not copied wholesale into GSD core.
- The packaged compiler should include a prompt-pack registry/manifest with command-to-contract mappings.
- Project-local overrides, if allowed later, must include source path, source system, extraction/provenance notes, and explicit version/hash/date where available.
- Prompt-pack registry entries may compile stable snippets into GSD context, plan guidance, and artifact contracts, but prompt packs cannot issue lifecycle commands such as mark complete, advance roadmap, or write state.
- Prompt-pack sections that conflict with GSD lifecycle ownership must be translated into ordinary plan/checkpoint text or excluded.

Minimum manifest fields:

| Field | Meaning |
| --- | --- |
| `command` | Public command such as `idea-discovery`. |
| `source_paths` | Auto/ARIS skill or prompt-pack source paths. |
| `source_refs` | Phase 01 extraction artifacts, source version/hash/date when known. |
| `stable_contracts` | Inputs, required evidence, artifacts, review rules, stop predicates, side-effect classes. |
| `deferred_sections` | Paper/rebuttal/execution/support sections intentionally out of first pass. |
| `injected_sections` | Bounded sections rendered into GSD context/plan/artifact contracts. |
| `excluded_sections` | Lifecycle/routing/state instructions not allowed in GSD target framework. |

### 7.3 `RESEARCH_INDEX`

Synthesis-ready position:

- Required file: `.planning/phases/<phase>/research/RESEARCH_INDEX.md`.
- Optional future sidecar: `RESEARCH_INDEX.json` for deterministic checks, but not required for Phase 02 synthesis.
- The index is an artifact map and evidence cross-check. It is not lifecycle state, not a route table, and not a completion switch.
- Skeleton creation is allowed only after the owning phase exists and must be marked as skeleton/expected evidence until real raw evidence is present.

Minimum `RESEARCH_INDEX.md` sections:

1. `Command And Phase` - phase id/title, producing commands, prompt-pack provenance.
2. `Required Completion Evidence` - raw evidence required before clean evidence readiness.
3. `Workflow Artifacts` - reports, plans, summaries, trackers, and other useful but insufficient artifacts.
4. `Raw Evidence` - source records, JSON/CSV/log/PDF paths, W&B IDs/URLs, command/config/backend/commit/seed metadata where applicable.
5. `Review And Audit Evidence` - raw reviewer responses, verdicts, scores, difficulty, backend/provider provenance, audit Markdown/JSON.
6. `Side Effects And Authorizations` - links to `SIDE_EFFECTS.md` and `AUTHORIZATION_ACTIONS.json`; missing auth/degraded/skipped operations.
7. `Imported Mirrors` - root/external Auto artifacts adopted or mirrored, with source path, timestamp, evidence class, conflict status, and adoption decision.
8. `Provisional, Degraded, Or Overridden Outputs` - tainted outputs and downstream propagation requirements.
9. `Latest Evidence Check` - advisory evidence-check result; explicitly not GSD phase completion.

Root Auto artifacts are import/export mirrors only until a GSD-owned adoption operation copies/links them into the phase-local research root and records provenance in `RESEARCH_INDEX.md`.

## 8. Preset, Side-Effect, And Completion Policy

### 8.1 Presets

Synthesis-ready position:

| Preset | Research depth | Checkpoints | Quality gates | External side effects | Clean status allowed when |
| --- | --- | --- | --- | --- | --- |
| `safe` | Deep | Human participates at important decisions | Stop/ask on blocking gates | Confirm before each external class unless explicitly preauthorized | Required evidence, review/verify/UAT, and side-effect records pass |
| `auto` | Deep | Auto ordinary local checkpoints when inputs/evidence exist | Stop on blocking gates | Execute only preauthorized operations | No required evidence missing, no blocking side effect skipped, no override |
| `danger-auto` | Deep | Auto-select recommended decisions | May override research quality gates with records where policy allows | Execute all currently available authorized capabilities once selected | Only if no required evidence missing, no required operation skipped, and no gate overridden |

`auto` is never shallow or quick. All presets default to deep research and deep review.

### 8.2 Side-Effect Vocabulary

Synthesis-ready vocabulary:

| Status | Meaning |
| --- | --- |
| `disabled` | Command pack must not attempt the side effect. |
| `confirm` | Human confirmation required before action. |
| `preauthorized` | `auto` may execute within explicit scope. |
| `danger_auto_allowed` | `danger-auto` may execute if capability and authorization exist. |
| `missing_authorization` | Credential/login/payment/API key/SSH/platform access absent; record and block/degrade/skip per policy. |
| `degraded` | Optional path unavailable; reduced-capability path remains valid and disclosed. |
| `overridden` | `danger-auto` bypassed a quality gate; downstream taint required. |
| `blocked` | Required evidence, authorization, budget, safety, review, verification, or user decision is missing. |

Side-effect classes requiring explicit policy/audit:

- Git push, PR creation, and GitHub operations.
- SSH, rsync/scp, remote commands, local/remote GPU execution.
- W&B, Modal, Vast.ai, paid compute, persistent external logging.
- Reviewer APIs and provider backends outside local/Codex subagents.
- Notifications such as Feishu/Lark/webhooks.
- Cleanup/destructive writes.

Required `danger-auto` artifacts under `.planning/phases/<phase>/research/`:

- `RESEARCH_RUN_LOG.md`
- `AUTHORIZATION_ACTIONS.json`
- `DANGER_AUTO_OVERRIDES.md`
- `SIDE_EFFECTS.md`
- `RESEARCH_INDEX.md` entries marking clean/degraded/provisional/overridden/missing-authorization status

### 8.3 Completion Policy

Synthesis-ready position:

The compiler may report **research evidence readiness**; it may not complete the GSD phase.

| Label | Meaning | GSD phase completion implication |
| --- | --- | --- |
| `clean_evidence_ready` | Required raw evidence exists; required review/audit evidence exists and passes; side effects are authorized/completed or not required; no overrides or missing required authorization | GSD may proceed to ordinary review/verify/UAT and decide completion |
| `degraded_evidence_ready` | Non-essential service/path missing or fallback used; command contract allows reduced capability and records it | GSD may accept only if phase goal remains valid and degradation is explicit |
| `provisional_evidence_ready` | Output useful but confidence limited, review/audit incomplete, or claim support partial | Not final clean completion; usable only as input to review/audit/remediation |
| `overridden` | `danger-auto` overrode a quality gate and recorded taint | Not clean; downstream artifacts must carry override/integrity-concern status |
| `blocked` | Required evidence, review, audit, authorization, budget, safety gate, verification, or user decision is missing | GSD must not complete except by explicitly accepting a remediation/deferment plan |

Raw evidence is necessary but not sufficient for phase completion. Summaries, roadmap checkboxes, plan counts, file presence, `progress`, `next`, context helpers, monitor status, W&B URLs, PR links, cache files, and root Auto artifacts remain advisory only.

Command-specific non-negotiables:

- `idea-discovery` requires retained literature retrieval/reading evidence before clean evidence readiness.
- Experiment execution requires raw JSON/CSV/logs plus command/config/backend/commit/seed metadata; W&B URLs or monitor status alone are insufficient.
- `experiment-audit` missing or stale audit means no audit, not pass.
- `result-to-claim` must output yes/partial/no support with raw evidence and audit lineage.
- `auto-review-loop` must preserve raw reviewer responses and stop only on score threshold plus positive/accept/pass verdict.

## 9. No-Phase-Type And No-Second-Control-Plane Proof

No `phase_type`, typed routing, broad phase schema expansion, or second authoritative control plane is needed.

| Research need | Representation | Why no typed phase field is needed |
| --- | --- | --- |
| Identify command behavior | Command name, compiled context, prompt-pack provenance in `RESEARCH_INDEX.md` | Behavior selected at invocation/compile time, not by phase schema routing. |
| Preserve Auto/ARIS workflow | GSD phase context, plan tasks, checkpoints, artifact contracts, review rules | Existing GSD plan/task/checkpoint primitives represent workflow internals. |
| Insert research into existing roadmap | Existing decimal phase insertion | Numbering handles insertion without schema typing. |
| Build research-first roadmap | Normal integer phases with research-centered goals | A roadmap can be research-centered without phase kind fields. |
| Track evidence | Phase-local `research/` artifacts and `RESEARCH_INDEX.md` | Evidence is local artifact state, not lifecycle state. |
| Resume command-local loops | Phase-local cache files such as review/refinement state | Caches resume command work only; they cannot route `next` or complete phases. |
| Handle side effects | Preset policy plus audit artifacts under `research/` | Authorization is a command/preset gate, not a phase type. |
| Complete work | Ordinary GSD review, verify/UAT, phase transition, and state owner | Completion is already a GSD lifecycle operation. |
| Support reviewers/monitors | Scoped artifact writes under `research/reviews`, `research/audits`, `research/side-effects` | Support tools are evidence producers, not lifecycle controllers. |

Practical no-second-control-plane test:

If the compiler and adapter helpers disappear after they have generated an owning GSD phase, `CONTEXT.md`, `PLAN.md`, and phase-local `research/` artifact contracts, ordinary GSD must still be able to plan, execute, review, verify, and complete or reject the phase. If the phase cannot proceed without compiler-owned hidden state, the design has failed.

Disallowed aliases for `phase_type`:

- `phase_kind`
- `research_kind`
- typed route tables
- primary command routers that decide lifecycle behavior
- root Auto state as routing/completion authority
- bridge-ready or research-ready labels that override GSD gates

## 10. Remaining Disagreements

1. **`RESEARCH_INDEX.json` sidecar:** This revision recommends Markdown as required and JSON as optional/future. A deterministic checker may later require JSON, but Phase 02 synthesis does not need to mandate it.
2. **Direct lifecycle invocation in `safe`:** The compiler may either print an insertion request/next command or ask before invoking ordinary GSD insertion. Final synthesis should decide UX, but canonical mutation must remain GSD-owned either way.
3. **First-pass execution wrappers:** This revision keeps execution capability in the architecture but recommends deferring broad `run-experiment`, `monitor-experiment`, and `experiment-bridge` automation until side-effect scenario tests exist. A narrow `experiment-bridge` readiness pack may be allowed if it is compile-only.
4. **Prompt-pack registry location:** This revision recommends packaged registry as baseline, with project-local overrides only if provenance/taint rules are explicit. Final synthesis should decide whether `.planning/research-prompt-packs.json` exists in v2.0 first pass.
5. **Unknown research config keys:** This revision prefers reject or warn-as-non-effective for first-pass commands. Final synthesis should decide whether to allow an `experimental` namespace.
6. **SDK exposure timing:** This revision treats SDK as future-compatible boundary, not first implementation blocker. Final synthesis should name whether Phase 05/06 must design SDK adapter APIs before CLI command implementation.
7. **Baseline reconciliation:** This revision accepts Phase 02 context: latest upstream source is the behavioral design baseline, while source/package/install compatibility remains an implementation blocker. Final synthesis should preserve the exact blocker wording.
8. **Plan versus inserted phase for review/audit/claim commands:** This revision recommends attach-as-plan/checkpoint when an active owning phase exists and inserted phase when the work is an independent goal boundary. Final synthesis should define command UX flags for this choice.

## 11. Synthesis Recommendations

1. State the final framework as: **Research Command Compiler under GSD-first lifecycle ownership, implemented first as a minimal adapter slice.**
2. Define the compiler's authority in one sentence: **It compiles command intent, config, prompt-pack provenance, evidence contracts, side-effect policy, and artifact layout into GSD-native inputs; it does not own lifecycle state or completion.**
3. Adopt `.planning/research.config.json` as the only research config path, with CLI > command config > preset > built-in defaults, strict pruning, and no pollution of upstream `.planning/config.json`.
4. Make `RESEARCH_INDEX.md` required for every research phase, but define it as an evidence map and advisory check surface, not a state file or completion switch.
5. Keep `safe`, `auto`, and `danger-auto`; all are deep by default. `danger-auto` gets maximum available authorized automation plus maximum audit burden, never clean success after skipped required operations or overridden gates.
6. Use existing-roadmap decimal insertion and research-first integer roadmap mode. Default to one phase and plan-level decomposition; split only for hard work-mode boundaries or ordinary GSD planner quality concerns.
7. Finalize first-pass commands around literature/idea/refinement/experiment planning/audit/claim contracts; defer broad execution, monitor, paper, rebuttal, slides, poster, and camera-ready packs.
8. Treat raw evidence completion as an advisory evidence-readiness state that GSD review/verify/UAT consumes, not as phase completion.
9. Make root Auto artifact adoption explicit: source path, timestamp, producing command if known, target evidence class, conflict behavior, and adoption decision in `RESEARCH_INDEX.md`.
10. Carry package/source latest drift and SDK support as explicit implementation boundaries: design against latest upstream source behavior from Phase 01 evidence, verify source/package/install/hook compatibility later, and keep compiler bundle APIs serializable for future SDK adaptation.
11. Require negative scenario tests in later phases for context-only `idea-discovery`, W&B-only experiment evidence, stale/missing audit, missing credentials, `danger-auto` override taint, root artifact conflict, cache-only completion, and accidental typed routing.
12. Preserve the hard ban: no `phase_type`, no typed phase routing, no broad phase schema expansion, no second lifecycle state root, no research-owned canonical state writes, and no support tool as lifecycle owner.
