# 02-PROPOSAL-RESEARCH-COMPILER

**Lane:** Research Command Compiler proposal  
**Round:** Phase 02 proposal round 1  
**Status:** Draft proposal, not final framework synthesis  
**Write scope:** This file only

## 1. Position Summary

### Source-backed facts

- Phase 02 explicitly chooses Auto Research integration as a `Research Command Compiler`, not a GSD core rewrite and not a second lifecycle overlay.
- Research commands read research config, select Auto/ARIS prompt packs, and compile them into ordinary GSD roadmap, context, plan, artifact, evidence, review, and checkpoint inputs.
- GSD remains owner of discuss, plan, execute, review, verify, state, progress, phase completion, and canonical lifecycle writes.
- Research commands must not introduce `phase_type`, typed phase routing, broad phase schema expansion, or a second authoritative control plane.
- Authoritative research artifacts live under `.planning/phases/<phase>/research/`, with root Auto artifacts treated as import/export mirrors only unless explicitly adopted.
- Default command behavior is single generated GSD phase with plan-level decomposition unless the command crosses hard work-mode boundaries.
- Existing-roadmap insertion uses decimal phases after the current phase. Research-first roadmap generation uses integer phases.
- Presets are `safe`, `auto`, and `danger-auto`, with `safe` as default. All presets default to deep research and deep review.

### Inferred recommendation

The compiler should be a thin, standalone command family that prepares normal GSD inputs and then delegates lifecycle progression to existing GSD commands. It should not execute a parallel mini-workflow after compilation. Its main job is to turn research intent plus config plus prompt-pack contracts into a high-quality `CONTEXT.md`, planner constraints, artifact contract text, evidence requirements, side-effect policy, and optional generated plan scaffolding that normal GSD can inspect, revise, execute, and verify.

The strongest architecture is therefore:

```text
gsd research-* command
  -> read .planning/research.config.json plus CLI overrides
  -> select Auto/ARIS prompt pack and artifact contract
  -> resolve preset, gates, side-effect policy, reviewer policy
  -> compile ordinary GSD phase/context/plan inputs
  -> invoke or instruct normal GSD lifecycle command
  -> write research artifacts only under phase-local research root
  -> route canonical state changes through GSD lifecycle owner
```

This preserves the user's preferred architecture: Auto Research acts as an upper-layer caller/compiler that injects research material into GSD phase generation while leaving GSD lifecycle ownership intact.

## 2. Source Evidence Used

### Required Phase 02 sources

- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md`: required output shape, proposal axes, write ownership, and no-canonical-write rule.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md`: explicit Phase 02 decisions D-01 through D-57, including compiler direction, phase granularity, insertion modes, presets, artifacts, completion, side effects, and no-`phase_type` constraint.

### Required Phase 01 sources

- `.planning/phases/01-source-framework-extraction/01-FRAMEWORK-SYNTHESIS.md`: upstream GSD plus bounded research-command extension is the final Phase 01 stance; completion requires raw evidence plus review and verification gates; current ljx-GSD is not the implementation base.
- `.planning/phases/01-source-framework-extraction/01-CROSS-FRAMEWORK-GAP-MAP.md`: Phase 02 gaps include baseline version, SDK inclusion, command surface, artifact sublayout, reviewer policy, side effects, and paper-review scope.
- `.planning/phases/01-source-framework-extraction/01-AUTO-FRAMEWORK.md`: Auto/ARIS is a plain-file, skill-composed research harness with standalone skill/command families and no source evidence of `phase_type`.
- `.planning/phases/01-source-framework-extraction/01-AUTO-ARTIFACT-CONTRACTS.md`: artifact taxonomy, phase-local research root, mirror policy, literature evidence bundle, experiment evidence, review evidence, and control-state cache boundaries.
- `.planning/phases/01-source-framework-extraction/01-AUTO-PARAMETER-MAP.md`: preserved knobs, canonical continuation rule, source selectors, review stop predicate, reviewer backend config, execution/provider knobs, and deferred policy questions.
- `.planning/phases/01-source-framework-extraction/01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`: standalone command preservation, gate precedence, reviewer independence, external-service matrix, experiment integrity requirements, and paper/rebuttal deferrals.
- `.planning/phases/01-source-framework-extraction/01-GSD-FRAMEWORK.md`: GSD command/workflow/runtime/artifact layers, phase lifecycle, plan mechanics, false-completion controls, subagent ownership, atomic state writes, git behavior, hook/runtime boundaries, and upgrade questions.

### Evidence boundary

This proposal does not re-read upstream source files directly and does not assert new source facts beyond the Phase 01 and Phase 02 artifacts above. Where the proposal chooses names, flow order, schema shape, or implementation tactics, those are marked as inferred recommendations.

## 3. Proposed Architecture

### 3.1 Architecture overview

### Source-backed facts

- Research config must be separate from upstream GSD `.planning/config.json`; preferred path is `.planning/research.config.json`.
- Research parameters are read by the compiler and compiled into ordinary GSD phase context, success criteria, artifact contracts, checkpoint behavior, and planner constraints.
- Parameters must not be passed raw into GSD core and should not require broad config schema changes.
- GSD phase directories can represent integer and decimal phases, and GSD plans already support tasks, dependencies, waves, checkpoints, must-haves, verification criteria, and summaries.
- Research outputs must live under `.planning/phases/<phase>/research/`; `RESEARCH_INDEX.md` should classify required evidence, summaries, raw records, and provisional outputs.

### Inferred recommendation

The compiler should have four layers:

1. **Command shim layer:** user-facing `gsd research-*` commands, plus wrappers such as `gsd research-pipeline`, remain thin. They parse intent and CLI overrides, then call the compiler library or workflow prompt.
2. **Compilation layer:** resolves config, preset, prompt-pack, artifact contract, side-effect policy, insertion mode, and expected evidence. It produces ordinary GSD input text and optional artifact skeletons.
3. **GSD lifecycle layer:** normal GSD commands own actual phase creation, discussion, planning, execution, verification, UAT, transition, and canonical state updates.
4. **Research artifact layer:** command execution writes phase-local research artifacts, raw evidence, review outputs, logs, and indexes under the active phase root.

The compiler should emit a compact compiled bundle, not an independent state machine:

```text
CompiledResearchBundle
  command_family
  source_prompt_pack_refs
  resolved_config
  preset_policy
  phase_request
  context_injection
  planner_constraints
  artifact_contracts
  evidence_requirements
  checkpoint_policy
  side_effect_policy
  completion_policy
  research_index_seed
```

This bundle can be rendered into GSD-compatible Markdown sections and JSON sidecars under the phase-local research root if useful. It must not become an authoritative lifecycle state file.

### 3.2 Command compilation flow

### Inferred recommendation

A research command should compile through this flow:

1. **Resolve project context:** locate `.planning/`, active milestone, current phase, current roadmap mode, and whether a roadmap exists.
2. **Parse command intent:** identify command family, user topic/brief, optional input artifacts, desired source selectors, execution backends, reviewer difficulty, and preset.
3. **Load research config:** read `.planning/research.config.json` if present, then command-specific config sections and presets.
4. **Apply precedence:** CLI override > command-specific config > preset > built-in defaults.
5. **Select prompt pack:** map the command to an Auto/ARIS prompt pack and source-index metadata. Do not copy unbounded prompt bodies into canonical GSD docs.
6. **Resolve policy:** compute gate precedence, side-effect permissions, reviewer backend policy, evidence requirements, artifact contract, and completion labels.
7. **Choose insertion mode:** existing-roadmap mode inserts a decimal phase after the current phase; research-first mode generates integer roadmap phases.
8. **Compile phase request:** produce a phase title, phase objective, success criteria, required artifacts, evidence requirements, side-effect gates, and review/verify checkpoints.
9. **Compile context injection:** add Auto/ARIS research prompt material into the GSD phase context as constraints and evidence requirements, not as lifecycle instructions.
10. **Compile plan guidance:** default to one phase with plan-level decomposition into literature, novelty, refinement, experiment design, execution, audit, and claim tasks as applicable.
11. **Seed research root:** create or propose `.planning/phases/<phase>/research/RESEARCH_INDEX.md` plus optional skeletons only after the owning GSD phase exists.
12. **Delegate lifecycle:** call normal GSD discuss/plan/execute/verify commands or print the exact next normal GSD command to run, depending on preset and authorization.

### 3.3 Prompt-pack injection

### Source-backed facts

- Auto/ARIS prompt content should become phase context, planning constraints, artifact contracts, evidence requirements, review rules, and checkpoint text.
- Auto/ARIS capability source of truth is skill prompt material, but Phase 02 should not copy prompt packs wholesale without provenance.
- Reviewer independence, raw reviewer responses, citation integrity, experiment integrity, and deterministic review stop predicates must be preserved.

### Inferred recommendation

Prompt-pack injection should be structured, source-indexed, and bounded:

```text
PromptPackInjection
  source_refs:
    - Auto/ARIS skill path or pack id
    - extracted contract name
    - source extraction artifact reference
  injected_sections:
    - Research objective constraints
    - Required evidence bundle
    - Artifact contract
    - Reviewer instructions
    - Side-effect policy
    - Completion labels
  excluded_sections:
    - lifecycle ownership instructions that conflict with GSD
    - root Auto artifact paths unless used as import/export mirrors
    - unsupported paper/rebuttal defaults for v2.0 front line
```

A prompt pack should never be able to say "advance the phase", "mark the roadmap complete", or "write `STATE.md`" directly. If upstream Auto material contains stage progression language, the compiler should translate it into GSD-compatible plan tasks and checkpoints.

### 3.4 Config precedence and presets

### Source-backed facts

- `.planning/research.config.json` is separate from GSD `.planning/config.json`.
- Parameter precedence is CLI override > command-specific config > preset > built-in defaults.
- Supported presets are `safe`, `auto`, and `danger-auto`.
- Default preset is `safe`.
- All presets default to deep research and deep review.
- `safe` means human participation at important decisions and confirmation before external side effects.
- `auto` means automatic ordinary checkpoint handling but stops on blocking quality gates and requires preauthorization for external side effects.
- `danger-auto` auto-approves ordinary checkpoints, auto-selects recommended decisions, records overrides, and uses maximum available permissions, but cannot fabricate credentials or platform authorization.

### Inferred recommendation

The first schema should be intentionally narrow:

```json
{
  "default_preset": "safe",
  "presets": {
    "safe": {
      "effort": "max",
      "review_depth": "deep",
      "auto_proceed": false,
      "human_checkpoint": true
    }
  },
  "commands": {
    "idea-discovery": {
      "sources": ["local", "web"],
      "max_literature_items": 20,
      "require_literature_evidence": true
    },
    "experiment-plan": {
      "max_primary_claims": 2,
      "max_core_blocks": 5,
      "default_seeds": 3
    }
  },
  "reviewers": {
    "default_backend": "codex-subagents",
    "difficulty": "hard",
    "max_review_rounds": 4,
    "score_threshold": 9
  },
  "service_policy": {
    "network_literature": "guided",
    "external_reviewers": "blocking",
    "gpu_remote": "blocking",
    "wandb": "blocking",
    "git_push_pr": "blocking"
  }
}
```

This schema is illustrative, not a final contract. It reflects Phase 02 decisions by keeping research knobs out of GSD core config and pruning paper-stage or execution-provider settings away from commands that do not need them.

### 3.5 Phase and roadmap generation modes

### Source-backed facts

- Existing-roadmap commands insert decimal phases after the current completed phase, such as `08.1` after Phase `08`.
- Research-first roadmap mode uses integer phases.
- Research-first mode applies when a project or milestone begins from a research command or when the user explicitly asks to build the roadmap around research.
- Research commands default to one generated GSD phase, not a mini-roadmap.
- Auto internal "Phase", "Stage", or "Step" headings must not mechanically become GSD roadmap phases.
- Normal GSD planner may split an oversized phase as a quality response, not as default compiler behavior.

### Inferred recommendation

The compiler should expose two explicit modes:

1. **Insert mode:** default when `.planning/ROADMAP.md` already has an active/current phase. The compiler proposes one decimal phase after the current phase, writes research-specific context, and lets GSD plan it.
2. **Research-first roadmap mode:** used for `gsd research-pipeline --new-roadmap`, `gsd new-project --research`, or explicit user instruction. The compiler creates normal integer phase proposals for hard roadmap-level boundaries.

The single-phase default should produce plan-level decomposition similar to:

```text
Phase 08.1: Evaluate novelty and plan convincing experiments for <topic>
  Plan 01: Literature retrieval and evidence bundle
  Plan 02: Idea/novelty/refinement review
  Plan 03: Claim-first experiment design
  Plan 04: Independent review and readiness gate
```

If execution begins, a later normal GSD planner can split into a separate phase when the work crosses into code changes, GPU spend, remote execution, raw result collection, or audit/claim gating.

### 3.6 Phase-local research root and RESEARCH_INDEX.md

### Source-backed facts

- Authoritative research outputs live under `.planning/phases/<phase>/research/`.
- Research docs should be Markdown for human-readable artifacts, JSON/JSONL for raw records and machine-readable state, with clear status fields, evidence boundaries, and provenance links.
- `RESEARCH_INDEX.md` should identify required evidence, summaries, raw records, and provisional outputs.
- Root Auto artifacts outside `.planning/` are import/export mirrors only unless explicitly adopted.

### Inferred recommendation

Every compiled research phase should include this initial root structure once the phase exists:

```text
.planning/phases/<phase>/research/
  RESEARCH_INDEX.md
  RESEARCH_RUN_LOG.md
  inputs/
  literature/
  prompts/
  evidence/
  reviews/
  audits/
  side-effects/
  state-cache/
```

`RESEARCH_INDEX.md` should be the artifact map, not a completion switch. It should include:

- command family and phase id
- prompt-pack source refs
- required evidence checklist
- raw evidence paths
- summary paths
- review and audit paths
- provisional/degraded/overridden status labels
- external side-effect log paths
- imported mirror references and adoption status
- completion gate status with links to raw evidence and GSD verification artifacts

`state-cache/` may store command-local resume data such as `REFINE_STATE.json` or `REVIEW_STATE.json`. It must not route GSD phase completion or replace canonical GSD state.

### 3.7 Git, hooks, subagents, upgrade, and SDK boundaries

### Source-backed facts

- GSD owns controlled planning commits, subrepo routing, hooks, installer behavior, state locks, and atomic writes.
- Orchestrator-owned lifecycle files must not be mutated directly by executor subagents or helper commands.
- Hooks are part of the upstream package/runtime compatibility surface and must be tested as compatibility evidence during implementation.
- The upstream reference checkout and installed runtime version differ, so implementation must verify source and package compatibility later.
- SDK support is a compatibility boundary, but not a blocker for the first research command compiler design.

### Inferred recommendation

Git and hook behavior should stay ordinary GSD behavior unless a research command is explicitly executing an external side effect:

- Planning commits, phase commits, summaries, and phase transitions remain owned by normal GSD lifecycle workflows.
- Research commands may request git push, PR creation, or GitHub mutation only through side-effect policy and audit logs.
- Hooks may validate research artifact shape, config validity, and required evidence references, but must not become lifecycle routers.
- Hook failures should block unsafe transitions or surface warnings through normal GSD gates; they should not mark research work complete.
- Research subagents can produce evidence, reviews, plans, summaries, and command-local cache files, but they cannot write canonical lifecycle state.
- Reviewer subagents should receive raw artifact paths where possible and preserve raw reviewer responses as primary review evidence.
- Execution monitors, watchdogs, and remote runners are operational helpers; they cannot replace raw experiment evidence or GSD verification.
- SDK exposure, if added later, should expose compiler bundle creation and artifact validation as library calls, not phase completion authority.
- Upstream source/package/hook/SDK compatibility should be verified in a later implementation phase before promoting any compiler API as stable.

## 4. Comparison Against Other Design Families

### 4.1 GSD-first family

### Source-backed facts

GSD-first preserves upstream GSD as lifecycle owner, treats research as ordinary phases/plans/artifacts, and avoids new control surfaces. Phase 01 and Phase 02 both require upstream GSD to remain the outer control plane.

### Inferred assessment

A strict GSD-first design is safest for lifecycle correctness, upgrade compatibility, and false-completion prevention. Its weakness is that it can under-preserve Auto/ARIS capability if research-specific prompts, artifact contracts, side-effect semantics, reviewer policies, and evidence rules are only copied manually into phase contexts.

The compiler proposal accepts the GSD-first control plane but adds a narrow pre-lifecycle compilation layer so research commands can reliably generate the right ordinary GSD inputs.

### 4.2 Minimal adapter family

### Source-backed facts

Phase 02 allows exact prompt-pack naming, config schema names, and initial command workflow details to remain flexible, as long as GSD core semantics are unchanged.

### Inferred assessment

A minimal adapter can provide useful command aliases, a research config reader, and phase-local artifact paths without large architectural change. Its advantage is low implementation risk. Its weakness is that it may become a loose compatibility shim that fails to encode deep review defaults, gate precedence, `danger-auto` audit behavior, or no-false-completion semantics consistently.

The compiler proposal should borrow the adapter family's small surface area, but it should compile explicit contracts rather than only forwarding arguments to GSD.

### 4.3 Compiler/hybrid family

### Source-backed facts

Phase 02 D-01 through D-04 directly favor a Research Command Compiler that injects research prompt material into GSD phase generation while preserving GSD lifecycle ownership.

### Inferred assessment

The compiler/hybrid family best matches the user's architecture preference. It gives Auto/ARIS commands a standalone `gsd` surface while preventing them from owning canonical lifecycle state. Its main risk is scope creep: if compiled bundles become durable workflow state or if command wrappers start bypassing GSD gates, the compiler becomes a second control plane.

The mitigation is a hard boundary: compiler output is ordinary GSD input plus phase-local evidence contracts. Canonical lifecycle writes remain serialized through GSD.

### 4.4 Comparison table

| Axis | GSD-first | Minimal adapter | Compiler/hybrid recommendation |
| --- | --- | --- | --- |
| Lifecycle ownership | Strongest preservation | Usually preserved but underspecified | GSD owns lifecycle; compiler owns input generation |
| Auto/ARIS prompt preservation | Manual and possibly lossy | Thin forwarding | Structured prompt-pack injection with provenance |
| Config | Minimal or none | Separate config reader | Separate config with precedence and preset resolution |
| Granularity | Ordinary GSD phases/plans | Depends on wrapper | Single-phase default; plan decomposition; decimal insertion |
| Completion | GSD verification focused | Risk of weak command completion | Raw evidence plus review/verify gates compiled into plans |
| Side effects | GSD gates only | Risk of scattered behavior | Preset-aware service policy and audit artifacts |
| Upgrade compatibility | High | High if tiny | High if compiler avoids core schema changes |
| Main risk | Under-preserving research semantics | False confidence from thin shims | Compiler grows into hidden control plane |

## 5. Required GSD Changes

### Source-backed facts

- Research config should remain separate from upstream GSD config.
- Public commands should stay thin and route into workflow/runtime contracts.
- Canonical lifecycle state writes must remain single-owner and use lock/atomic-write paths.
- Implementation should verify upstream source/package compatibility later because reference checkout and installed runtime versions differ.

### Inferred recommendation

Required changes should be narrow and additive:

1. **Add standalone research command shims:** `gsd research-lit`, `gsd idea-discovery`, `gsd idea-creator`, `gsd novelty-check`, `gsd research-review`, `gsd research-refine`, `gsd research-pipeline`, `gsd experiment-plan`, `gsd experiment-bridge`, `gsd run-experiment`, `gsd monitor-experiment`, `gsd analyze-results`, `gsd experiment-audit`, `gsd auto-review-loop`, `gsd result-to-claim`, and `gsd ablation-planner`, with paper/rebuttal commands deferred or marked future packs.
2. **Add compiler library/workflow:** a deterministic resolver for research config, presets, prompt-pack references, artifact contracts, side-effect policy, and GSD input rendering.
3. **Add prompt-pack registry:** source-indexed mappings from commands to extracted Auto/ARIS contracts and prompt templates, without copying long upstream prompt bodies into canonical GSD docs.
4. **Add research config parser:** reads `.planning/research.config.json`, validates known research keys, reports unknown keys, and never writes upstream `.planning/config.json`.
5. **Add phase-local artifact initializer:** creates `research/RESEARCH_INDEX.md` and optional skeleton directories only after GSD creates the owning phase.
6. **Add verification helpers:** check that required raw evidence, review records, audit outputs, side-effect logs, and completion labels exist before a research command reports clean completion.
7. **Add import/export mirror tools:** optional commands to adopt root Auto artifacts into the phase-local research root with provenance, not as implicit state.

Changes not required:

- No new `phase_type` field.
- No typed roadmap routing.
- No broad phase schema expansion.
- No separate research `STATE.md`.
- No direct writes by research commands to `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, or `.planning/STATE.md`.
- No forced SDK dependency in first compiler design.

## 6. Research Capability Preservation

### Source-backed facts

Auto/ARIS capabilities to preserve include literature discovery, idea generation, novelty checking, research review, refinement, experiment planning, experiment bridge, run/monitor/analyze, experiment audit, auto-review loop, result-to-claim, ablation planning, reviewer overlays, research wiki, watchdog, and optional provider integrations. Paper/rebuttal/slides/poster/camera-ready are deferred from the default v2.0 pipeline but can remain future compiler packs.

### Inferred recommendation

Preservation should be command-family based:

| Family | Compiler behavior | Default phase behavior | Required evidence |
| --- | --- | --- | --- |
| Literature | Inject source selectors, query strategy, reading evidence rules | One phase or one plan in a combined phase | Literature evidence bundle with source refs, queries, timestamps, retained IDs/URLs/paths, reading notes |
| Idea/novelty | Inject candidate generation, novelty claims, cross-checks, elimination criteria | Same phase as literature by default if strongly coupled | `IDEA_REPORT.md`, novelty report, retained claim evidence, eliminated ideas |
| Refinement | Inject Problem Anchor, review rounds, score threshold, max rounds | Same phase unless refinement becomes a hard goal boundary | `refine-logs/FINAL_PROPOSAL.md`, `REFINE_STATE.json`, review evidence |
| Experiment planning | Inject claims, anti-claims, metrics, dataset/split, baselines, seeds, success/failure interpretation | Same phase for coherent design | `refine-logs/EXPERIMENT_PLAN.md`, tracker, review readiness evidence |
| Execution bridge | Inject code review before compute, sanity-first, backend policy | Separate phase when it crosses code/remote/GPU boundary | runnable block specs, commit/config/command records |
| Run/monitor/analyze | Inject backend, W&B, Modal/Vast/SSH policies, raw evidence expectations | Often separate execution phase | raw JSON/CSV/logs, W&B IDs/URLs where used, `EXPERIMENT_LOG.md` |
| Audit/claim | Inject independent audit, raw reviewer responses, yes/partial/no claim support | Separate phase when claim readiness is a hard boundary | `EXPERIMENT_AUDIT.md`, `EXPERIMENT_AUDIT.json`, `AUTO_REVIEW.md`, `CLAIMS_FROM_RESULTS.md` |

The compiler should preserve Auto's internal workflow order as plan guidance, not as GSD phase routing. For example, `research-pipeline` can generate a single phase with multiple plans or checkpoints, while `run-experiment` can generate a separate execution phase because it crosses side-effect and evidence boundaries.

## 7. Preset, Gate, And Side-Effect Semantics

### 7.1 Gate precedence

### Source-backed facts

The canonical continuation rule is:

1. Hard safety gates block first: missing required evidence, blocking audit/verification failures, external-service confirmation requirements, destructive writes, budget limits, and explicit human stop.
2. `HUMAN_CHECKPOINT=true` pauses at review/decision checkpoints even when `AUTO_PROCEED=true`.
3. `AUTO_PROCEED=true` may continue only through safe local steps whose inputs/evidence are present and whose service policy is satisfied.
4. Review loops stop successfully only when score is at least threshold and verdict is positive/accept/pass.
5. `AUTO_PROCEED=false` pauses at the next non-trivial stage boundary after writing current evidence.

### Inferred recommendation

The compiler should write this precedence into every compiled phase context and into `RESEARCH_INDEX.md` gate sections. This avoids semantic drift between command packs.

### 7.2 Presets

### Source-backed facts

- `safe`: deep research/review with human participation and confirmation before external side effects.
- `auto`: deep research/review with automatic ordinary checkpoints, but it stops on blocking gates and requires preauthorization for external side effects.
- `danger-auto`: deep research/review plus maximum available automation permissions; auto-approves ordinary checkpoints, auto-selects recommended decisions, records quality-gate overrides, and executes available side effects once selected.
- Missing credentials, login, SSH access, payment setup, API keys, or platform authorization must be recorded and cannot be fabricated.
- `danger-auto` must not report clean completion when operations are skipped, blocked, or overridden.

### Inferred recommendation

The compiler should translate presets into explicit policy fields:

| Field | safe | auto | danger-auto |
| --- | --- | --- | --- |
| Research depth | deep | deep | deep |
| Review depth | deep | deep | deep |
| Ordinary checkpoints | pause on important decisions | auto if non-blocking | auto-select recommended |
| Quality gates | block | block | record override and continue where possible |
| External side effects | ask before use | use only if preauthorized | use all available authorized capabilities |
| Missing authorization | block or degrade with human choice | block specific operation | record missing authorization; degrade, skip, or block that operation |
| Completion label | clean or blocked | clean, blocked, or degraded | clean, overridden, provisional, degraded, or missing-authorization |

### 7.3 Side effects

### Source-backed facts

Side-effect capabilities include git push, PR creation, GitHub operations, SSH, rsync/scp, remote commands, W&B, Modal, Vast.ai, local/remote GPU execution, reviewer APIs, notifications, and cleanup. Support tools must not become a second control plane.

### Inferred recommendation

The compiler should classify side effects at compile time and record them at execution time:

| Side-effect class | Default behavior | Required artifact |
| --- | --- | --- |
| Phase-local file writes | allowed within declared contract | `RESEARCH_RUN_LOG.md` entry |
| Network literature lookup | guided by `sources` and provider policy | source/query provenance in literature bundle |
| External reviewer API | blocking unless configured and allowed | raw reviewer response plus provider provenance |
| Git push/PR/GitHub mutation | blocking except explicit preauthorization or `danger-auto` with available auth | `side-effects/GIT_ACTIONS.md` or `SIDE_EFFECTS.md` |
| SSH/remote/GPU/Vast/Modal/W&B | blocking unless command pack and policy authorize | backend config, command, budget, IDs/URLs, cleanup status |
| Notifications | guided/blocking depending destination | notification log with target and payload summary |
| Cleanup/destruction | blocking unless authorized; never before evidence collection | cleanup log and retained evidence confirmation |

`danger-auto` runs should always write:

- `RESEARCH_RUN_LOG.md`
- `AUTHORIZATION_ACTIONS.json`
- `DANGER_AUTO_OVERRIDES.md`
- `SIDE_EFFECTS.md`

These files live under the owning phase's `research/` root and are evidence/audit artifacts, not lifecycle state.

## 8. Completion Semantics

### Source-backed facts

- File presence, summaries, roadmap checkboxes, plan counts, `progress`, and `next` are advisory/cross-check signals only.
- Research command completion requires raw evidence plus relevant review/verify/UAT gates.
- `idea-discovery` cannot complete from context/state/idea-report output alone; literature retrieval and reading evidence are mandatory.
- Markdown summaries alone are not sufficient for experiment claims; raw JSON/CSV/log files and W&B IDs/URLs are evidence.
- `danger-auto` completion can be automated but must distinguish clean completion from overrides, provisional outputs, missing authorizations, or degraded paths.

### Inferred recommendation

The compiler should define four completion layers:

1. **Command artifact completion:** the command produced the expected artifacts under `research/`, and `RESEARCH_INDEX.md` maps them.
2. **Evidence completion:** raw evidence exists and satisfies command-specific contracts.
3. **Review/audit completion:** independent review, audit, or verification gates ran or are explicitly marked absent/blocking/degraded.
4. **GSD lifecycle completion:** normal GSD verify/UAT/phase transition accepts the phase.

Research commands may report command-level status, but only GSD lifecycle completion can complete the phase.

Recommended status labels:

| Label | Meaning |
| --- | --- |
| `clean` | Required raw evidence, review/audit, side-effect logs, and GSD verification all passed. |
| `blocked` | A hard gate prevents further progress. |
| `degraded` | Work continued with a missing optional service or lower-capability path that is disclosed. |
| `provisional` | Output is useful but lacks required evidence, review, audit, or verification for final claims. |
| `overridden` | `danger-auto` overrode a quality gate and downstream artifacts must carry integrity warnings. |
| `missing-authorization` | A requested external operation could not run due to absent credentials, login, payment, SSH, or platform access. |

`RESEARCH_INDEX.md` should carry these labels for research outputs. GSD phase summaries should cite the labels but should not treat them as a substitute for verification.

## 9. No-Phase-Type Proof

### Source-backed facts

- Phase 01 synthesis bans `phase_type`, typed routing, and broad phase schema changes.
- Auto/ARIS source extraction found standalone skills/commands and artifact handoff, not typed phases.
- GSD already supports phase directories, decimal phases, plans, waves, tasks, checkpoints, summaries, verification, UAT, and state analysis without phase typing.
- Phase 02 decisions explicitly say Auto internal "Phase", "Stage", or "Step" labels must not mechanically become GSD roadmap phases.

### Inferred proof

The compiler does not need `phase_type` because every research-specific distinction can be represented as one of these existing surfaces:

| Research need | Existing GSD-compatible representation |
| --- | --- |
| Literature versus experiment versus audit behavior | command name, prompt-pack ref, and context/planner constraints |
| Different workflow stages | plans, tasks, waves, dependencies, and checkpoints inside one phase |
| Inserted research work | decimal phase insertion already supported by GSD semantics |
| Research-first roadmap | normal integer phases with research-oriented titles and contexts |
| Evidence requirements | phase-local `research/` artifacts and `RESEARCH_INDEX.md` |
| Resume state | command-local cache under `research/state-cache/` |
| Completion status | GSD verification/UAT plus research evidence labels |
| Side-effect permissions | research config and phase-local audit logs |
| Reviewer policies | compiled review instructions and raw review artifacts |

Adding `phase_type` would create a second routing axis that competes with command surface, prompt-pack selection, artifact contracts, and GSD lifecycle state. It would also increase upgrade risk because upstream GSD config, roadmap, phase parsing, and SDK surfaces would need to understand new typed semantics. The compiler avoids that by making research behavior a property of the command and compiled inputs, not a property of the phase schema.

The only allowed metadata should be non-routing provenance inside research artifacts, such as `command_family: idea-discovery` or `prompt_pack: auto/idea-discovery`. Such metadata helps audit and resume command-local work. It must not control phase transition, roadmap routing, or lifecycle ownership.

## 10. Risks And Open Questions

### 10.1 Risks

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Compiler becomes a second control plane | It may start owning state, routing, or completion | Forbid canonical writes; route lifecycle updates through GSD; keep compiled bundles advisory/input-only |
| Prompt-pack injection copies too much | Long upstream prompts may drift, conflict, or hide lifecycle semantics | Source-index prompt packs and extract bounded contracts; exclude lifecycle ownership instructions |
| `danger-auto` reports false success | Missing credentials or overridden gates could be hidden | Mandatory audit artifacts and explicit completion labels |
| Thin wrappers under-preserve research invariants | Literature evidence, raw results, or review independence may be skipped | Compile artifact contracts and verification helpers for each command family |
| Single phase becomes too large | Some pipelines cross execution/audit boundaries | Keep single-phase default, but let GSD planner split oversized or boundary-crossing work |
| Config sprawl recreates schema drift | Research parameters could leak into GSD core config | Keep `.planning/research.config.json` separate and validate narrow known keys |
| Side effects execute without evidence retention | Cleanup or remote execution can destroy proof | Require evidence collection before cleanup and log all side effects |
| Reviewer backend drift | External providers and models change | Record provider provenance and keep Codex subagents as default when available |
| SDK/package mismatch | Reference source is `1.35.0`, installed runtime is `1.34.2` | Later implementation must verify source/package/runtime compatibility before coding |
| Root Auto artifacts regain authority | Imported files could bypass phase-local evidence contracts | Require explicit adoption into phase-local research root with provenance |

### 10.2 Open questions

1. What exact command list is in v2.0 first pass versus future packs, especially around paper/rebuttal and support tools?
2. Should `sources: all` preserve upstream DeepXiv opt-in semantics exactly, or should v2.0 rename values to avoid ambiguity?
3. What exact JSON schema should `.planning/research.config.json` use, and how strict should unknown-key validation be?
4. Should the compiler directly invoke GSD lifecycle commands after compilation, or should it produce a phase request for the user/orchestrator to apply in `safe` mode?
5. What artifact skeletons should be created immediately versus only after command execution produces real evidence?
6. How should command-local cache files be pruned or archived when a phase completes?
7. Which side-effect capabilities are allowed under `auto` by preauthorization, and where is preauthorization stored?
8. How should future SDK support expose compiler outputs without making the SDK a second lifecycle owner?
9. Which ljx-GSD helper ideas are salvageable after quarantine review, and which must be discarded entirely?
10. What test fixtures prove no `phase_type` is needed across insert mode, research-first mode, and execution/audit splits?

## 11. Recommendation For Round 2

### Source-backed facts

Round 2 must cross-read all four proposals and revise the design space without declaring Round 1 final. Phase 02 must preserve GSD lifecycle ownership, no `phase_type`, phase-local research roots, deep default presets, side-effect honesty, and raw-evidence completion semantics.

### Inferred recommendation

Round 2 should converge on the Research Command Compiler as the preferred architecture, with the following constraints imported from the other families:

1. **From GSD-first:** keep GSD as the only lifecycle owner and forbid research commands from canonical state writes.
2. **From minimal adapter:** keep implementation surface small: command shims, config reader, prompt-pack registry, artifact initializer, verification helpers.
3. **From risk register:** make `danger-auto`, side effects, missing authorization, and false completion first-class audit cases, not afterthoughts.
4. **From compiler lane:** define the compiled bundle shape and command compilation flow as the bridge between Auto/ARIS capabilities and ordinary GSD inputs.
5. **From all lanes:** prove no `phase_type` is needed with concrete examples for literature/idea, experiment planning, execution, audit/claim, insert mode, and research-first roadmap mode.

Round 2 should produce a tighter target design with:

- a v2.0 first-pass research command table,
- a draft `.planning/research.config.json` schema,
- a prompt-pack registry format,
- a `RESEARCH_INDEX.md` template,
- a side-effect and authorization policy matrix,
- a completion status taxonomy,
- a compiler-to-GSD lifecycle sequence diagram,
- a no-`phase_type` scenario proof,
- and a list of deferred paper/rebuttal/SDK/support-tool packs.

The final synthesis should treat this lane's central claim as recommended but still subject to cross-read: Auto Research should be an upper-layer compiler that prepares GSD-native inputs, not a modification of GSD lifecycle semantics.
