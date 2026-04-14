# 02-PROPOSAL-MINIMAL-ADAPTER

**Lane:** Minimal adapter proposal
**Status:** Round 1 proposal
**Ownership:** Worker 3 wrote only this file.
**Goal:** Define the smallest concrete helper/command/config/artifact/prompt-pack surface needed to add standalone research commands later without changing GSD phase schema or creating a second lifecycle control plane.

## 1. Position Summary

### Sourced facts

- Phase 02 must keep upstream GSD as the outer control plane and must not introduce `phase_type`, typed routing, broad phase schema extensions, or a second authoritative control plane (`02-CONTEXT.md`, D-01 through D-05).
- Research commands should read research config, select Auto/ARIS prompt content, and compile it into ordinary GSD roadmap/context/plan inputs (`02-CONTEXT.md`, D-02, D-04, D-27).
- Existing-roadmap research commands default to one inserted decimal GSD phase, while research-first roadmap mode uses normal integer phases (`02-CONTEXT.md`, D-06 through D-17).
- Authoritative research outputs must live under `.planning/phases/<phase>/research/`, with `RESEARCH_INDEX.md` identifying required evidence, summaries, raw records, and provisional outputs (`02-CONTEXT.md`, D-48 through D-51; `01-AUTO-ARTIFACT-CONTRACTS.md`).
- Completion requires command-specific raw evidence plus relevant review/verify/UAT gates. File presence, summaries, roadmap checkboxes, plan counts, `progress`, and `next` are advisory only (`01-FRAMEWORK-SYNTHESIS.md`; `01-GSD-FRAMEWORK.md`; `01-CROSS-FRAMEWORK-GAP-MAP.md`).

### Inferred recommendation

The minimal adapter should be a **compile-time generator plus phase-local artifact helpers**, not a runtime overlay. It should add only the following surface:

1. Thin standalone `gsd research-*` command wrappers.
2. A separate `.planning/research.config.json` loader with strict parameter pruning.
3. A prompt-pack indexer that references source prompt packs by path and provenance instead of copying long prompts into GSD core.
4. A phase insertion helper that delegates canonical roadmap/state writes to ordinary GSD lifecycle owners.
5. A phase-local artifact indexer for `.planning/phases/<phase>/research/RESEARCH_INDEX.md`.
6. A completion evidence checker that reports research evidence readiness to GSD review/verify, without completing phases itself.
7. A `danger-auto` audit artifact writer that records decisions, overrides, side effects, and missing authorizations under the phase-local research root.
8. A side-effect policy handoff object that tells execution commands what is preauthorized, blocked, degraded, or still needs human confirmation.

This is smaller than a full Research Command Compiler and stricter than an adapter that owns lifecycle state. The key bias is: **generate ordinary GSD artifacts early, then disappear**. GSD discuss/plan/execute/review/verify remains authoritative.

## 2. Source Evidence Used

### Required sources read

- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md`
- `.planning/phases/01-source-framework-extraction/01-FRAMEWORK-SYNTHESIS.md`
- `.planning/phases/01-source-framework-extraction/01-CROSS-FRAMEWORK-GAP-MAP.md`
- `.planning/phases/01-source-framework-extraction/01-GSD-FRAMEWORK.md`
- `.planning/phases/01-source-framework-extraction/01-GSD-UPGRADE-BOUNDARIES.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-PARAMETER-MAP.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-ARTIFACT-CONTRACTS.md`
- `.planning/phases/01-source-framework-extraction/01-LJX-REUSE-OR-DISCARD-MATRIX.md`

### Evidence extracted

| Source | Sourced facts used |
| --- | --- |
| `02-PROPOSAL-ROUND-1.md` | Required proposal shape, comparison axes, worker ownership, and no-canonical-write rule. |
| `02-CONTEXT.md` | Research Command Compiler direction, single-phase default, decimal insertion, research config path, preset semantics, danger-auto audit requirements, required first-pass parameters, artifact root, baseline/SDK boundary, and completion semantics. |
| `01-FRAMEWORK-SYNTHESIS.md` | v2.0 is upstream GSD plus bounded research-command extension; no `phase_type`; ljx bridge architecture is not the implementation base; completion requires raw evidence plus review/verification. |
| `01-CROSS-FRAMEWORK-GAP-MAP.md` | Phase 02 must resolve command surface, artifact sublayout, import/export mirrors, reviewer policy, external service policy, SDK/package drift, and false-completion risks. |
| `01-GSD-FRAMEWORK.md` | GSD has thin command shims, workflow prompts, runtime CLI helpers, `.planning/` artifact APIs, locks/atomic writes, UAT/verification gates, phase completeness checks, and orchestrator-owned canonical lifecycle files. |
| `01-GSD-UPGRADE-BOUNDARIES.md` | Preserve `.planning/` names, `gsd-tools.cjs` command compatibility, workstream routing, locks, git planning commits, hook ownership, package tests, and SDK package boundary; avoid prompt-body copying and hidden config drift. |
| `01-AUTO-PARAMETER-MAP.md` | Preserve a narrowed set of research knobs; hard gates precede automation; reviewer provenance must be recorded; execution/provider knobs belong to execution command packs. |
| `01-AUTO-ARTIFACT-CONTRACTS.md` | Artifact classes, phase-local research root, control-state cache boundaries, required literature evidence, experiment/claim artifact contracts, and non-authoritative root mirror policy. |
| `01-LJX-REUSE-OR-DISCARD-MATRIX.md` | Reuse only narrow helper ideas such as safe state writes, config validation, honest context readers, review/verify freshness, artifact status modeling, and source root resolution; discard bridge generator, typed route tables, `ljx-*` names, and bridge-ready completion semantics. |

### Evidence boundary

This proposal is an inferred architecture recommendation based on the sources above. It does not claim to verify current npm, SDK, hook, package, model, W&B, Modal, Vast.ai, SSH, GPU, or external reviewer availability. Those are implementation-phase checks.

## 3. Proposed Architecture

### 3.1 Adapter boundary

### Sourced facts

- GSD owns discuss, plan, execute, review, verify, state, progress, and phase completion (`02-CONTEXT.md`, D-03).
- Research parameters are not passed raw into GSD core and should not require broad GSD config schema changes (`02-CONTEXT.md`, D-25 through D-30).
- Canonical lifecycle state has one writer per operation; subagents and helpers route through that owner and lock/atomic-write path (`01-FRAMEWORK-SYNTHESIS.md`; `01-GSD-FRAMEWORK.md`).

### Inferred recommendation

The adapter owns only **pre-lifecycle compilation and phase-local research evidence support**:

| Boundary | Adapter may do | Adapter must not do |
| --- | --- | --- |
| Command intake | Parse `gsd research-*` CLI args and load `.planning/research.config.json`. | Mutate `.planning/config.json` or add research keys to GSD core config. |
| Prompt-pack selection | Resolve indexed Auto/ARIS prompt-pack sources and compile stable excerpts into generated phase context/planning constraints. | Copy whole upstream prompt bodies into core workflows or make prompt packs lifecycle state. |
| Roadmap insertion request | Produce an insertion request for one decimal phase or research-first integer phases. | Directly edit `ROADMAP.md`, `STATE.md`, `REQUIREMENTS.md`, or phase records outside GSD lifecycle owner paths. |
| Phase-local artifact setup | Create or update `.planning/phases/<phase>/research/` helper artifacts after the owning phase exists. | Treat research artifacts as a second phase state machine. |
| Evidence checking | Report missing/satisfied raw evidence, provenance, review, verify, side-effect, and degraded-status facts. | Mark phase complete, override GSD verification, or treat summaries as proof. |
| Automation audit | Write danger-auto run logs and side-effect records under the owning phase research root. | Hide skipped side effects, missing credentials, or overridden gates behind clean completion. |

### 3.2 Minimal files and helpers to implement later

### Inferred recommendation

The smallest concrete implementation surface is eight helper modules plus command wrappers. Names are intentionally provisional and can be adjusted later; the boundaries are the important part.

| Surface | Proposed path | Responsibility | Writes canonical GSD state? |
| --- | --- | --- | --- |
| Command wrappers | `commands/gsd/research-lit.md`, `commands/gsd/idea-discovery.md`, `commands/gsd/idea-creator.md`, `commands/gsd/novelty-check.md`, `commands/gsd/research-refine.md`, `commands/gsd/experiment-plan.md`, `commands/gsd/experiment-audit.md`, `commands/gsd/result-to-claim.md`, `commands/gsd/research-pipeline.md` | Thin user-facing shims that invoke the adapter workflow/runtime helper. | No. |
| Adapter workflow prompt | `workflows/research-command-adapter.md` | Human/agent workflow that explains compile-only semantics, source evidence, generated ordinary GSD inputs, and handoff to `discuss-phase` or `insert-phase`. | No direct writes; calls GSD owners. |
| Config loader | `bin/lib/research-config.cjs` | Load `.planning/research.config.json`, apply CLI > command config > preset > defaults, validate allowed keys, return pruned command config. | No. |
| Prompt-pack indexer | `bin/lib/research-prompt-packs.cjs` plus `.planning/research-prompt-packs.json` or packaged manifest | Map command names to source prompt paths, stable contracts, provenance, and deferred packs. | No. |
| Phase insertion helper | `bin/lib/research-phase-request.cjs` | Build a single insertion payload: title, intent, context body, artifact contracts, success criteria, and insertion mode. Delegates mutation to upstream GSD insert/new phase logic. | No direct writes. |
| Artifact indexer | `bin/lib/research-artifacts.cjs` | Initialize/update phase-local `research/RESEARCH_INDEX.md` and machine-readable evidence inventory. | Phase-local only. |
| Completion evidence checker | `bin/lib/research-evidence-check.cjs` | Check required raw evidence, review evidence, side-effect audit, degraded/provisional markers, and import-adoption status. | No. |
| Danger-auto audit writer | `bin/lib/research-danger-audit.cjs` | Write `RESEARCH_RUN_LOG.md`, `AUTHORIZATION_ACTIONS.json`, `DANGER_AUTO_OVERRIDES.md`, and `SIDE_EFFECTS.md` under `research/`. | Phase-local only. |
| Side-effect handoff | `bin/lib/research-side-effects.cjs` | Classify side-effect requests as allowed, blocked, needs-confirmation, missing-authorization, degraded, or out-of-scope for the command. | No. |

The adapter should not add a new persistent runtime daemon, scheduler, external service registry, research-state database, phase-type router, bridge generator, or independent lifecycle status file.

### 3.3 Command wrappers

### Sourced facts

- Phase 02 identifies literature/idea commands, experiment/claim commands, and execution support tools as different command families (`02-CONTEXT.md`, D-21 through D-24).
- Paper, rebuttal, slides, poster, camera-ready, and post-acceptance workflows are deferred from the default v2.0 pipeline (`02-CONTEXT.md`, D-18 through D-20; D-46).

### Inferred recommendation

Implement the initial command wrappers as compile-only entries, ordered by blast-radius:

| Command wrapper | Default output | Initial status |
| --- | --- | --- |
| `gsd research-lit` | One inserted GSD phase with literature evidence contract. | Keep. |
| `gsd idea-discovery` | One inserted GSD phase requiring literature evidence before idea report completion. | Keep. |
| `gsd idea-creator` | One inserted GSD phase for candidate generation/ranking from evidence. | Keep. |
| `gsd novelty-check` | One inserted GSD phase or plan-level task in existing idea phase, depending on user target. | Keep, but prefer plan-level inside active idea phase when possible. |
| `gsd research-refine` | One inserted GSD phase preserving problem-anchor refinement and review loop. | Keep. |
| `gsd experiment-plan` | One inserted GSD phase keeping method, metrics, dataset, baselines, run order, and interpretation together. | Keep. |
| `gsd experiment-audit` | One inserted GSD phase only when audit is a hard work-mode boundary; otherwise plan-level in execution phase. | Keep with boundary rule. |
| `gsd result-to-claim` | One inserted GSD phase or plan-level gate after evidence exists. | Keep with evidence precheck. |
| `gsd research-pipeline` | Research-first roadmap or compound pipeline request that still generates ordinary phases. | Keep as wrapper; not a second pipeline engine. |
| `gsd run-experiment`, `gsd monitor-experiment`, `gsd experiment-bridge` | Execution support wrappers with side-effect handoff and raw evidence contracts. | Defer or implement after side-effect policy tests. |
| Paper/rebuttal commands | Future prompt packs and artifact contracts. | Drop from default v2.0; defer. |

### 3.4 Research config loader

### Sourced facts

- Preferred config path is `.planning/research.config.json` (`02-CONTEXT.md`, D-26).
- Precedence is CLI override > command-specific config > preset > built-in defaults (`02-CONTEXT.md`, D-29).
- Supported presets are `safe`, `auto`, and `danger-auto`; default is `safe`; all presets default to deep research and deep review (`02-CONTEXT.md`, D-31 through D-37).
- Execution side-effect parameters should not pollute every research command (`02-CONTEXT.md`, D-47).

### Inferred recommendation

Use a separate config loader with this minimal shape:

```json
{
  "preset": "safe",
  "defaults": {
    "effort": "balanced",
    "review_depth": "deep",
    "max_review_rounds": 4,
    "human_checkpoint": true,
    "auto_proceed": false
  },
  "commands": {
    "research-lit": {
      "sources": ["local", "web"],
      "max_literature_items": 20,
      "require_literature_evidence": true
    },
    "novelty-check": {
      "novelty_threshold": 9,
      "review_difficulty": "hard"
    }
  },
  "side_effects": {
    "git_push": "confirm",
    "pull_request": "confirm",
    "wandb": "disabled",
    "ssh": "disabled",
    "modal": "disabled",
    "vast_ai": "disabled",
    "notifications": "confirm",
    "cleanup": "confirm"
  }
}
```

This shape is not a proposed stable schema; it illustrates the minimum separation. The loader should reject unknown keys by default for first-pass commands, except an explicit `x_` or `experimental` namespace if Phase 02 later approves one.

### 3.5 Parameters to keep, drop, or defer

### Sourced facts

- Phase 02 context requires preserving first-pass parameters: `preset`, `effort`, `review_depth`, `auto_proceed`, `human_checkpoint`, `max_review_rounds`, `sources`, `max_literature_items`, `review_difficulty`, `score_threshold` or `novelty_threshold`, and `require_literature_evidence` (`02-CONTEXT.md`, D-45).
- It requires deferring or excluding paper-stage parameters from first-pass config: venue, max pages, anonymity, DBLP/CrossRef citation policy, paper improvement rounds, rebuttal rounds, slides, poster, and camera-ready settings (`02-CONTEXT.md`, D-46).
- GPU, W&B, SSH, Modal, Vast.ai, and similar execution side-effect parameters belong to execution command packs and authorization behavior, not every research command (`02-CONTEXT.md`, D-47).

### Inferred recommendation

| Parameter group | Keep now | Drop from first pass | Defer behind execution/paper packs |
| --- | --- | --- | --- |
| Preset/automation | `preset`, `auto_proceed`, `human_checkpoint` | Legacy aliases that imply uncontrolled automation. | None. |
| Depth/review | `effort`, `review_depth`, `max_review_rounds`, `review_difficulty`, `score_threshold`, `novelty_threshold` | Any setting that lowers hard evidence requirements. | Provider-specific model knobs except reviewer provenance. |
| Literature | `sources`, `max_literature_items`, `require_literature_evidence` | Ambiguous `all` behavior unless DeepXiv opt-in semantics are explicit. | `ARXIV_DOWNLOAD`, `ARXIV_MAX_DOWNLOAD`, `REF_PAPER`, `BASE_REPO` if not required by initial commands. |
| Experiment planning | `max_primary_claims`, `max_core_blocks`, `max_baseline_families`, `default_seeds` only if `experiment-plan` is in first implementation. | GPU/runtime/backend knobs in planning-only commands. | `gpu`, SSH inventory, W&B, Modal, Vast.ai, watchdog, budget cleanup. |
| Paper/rebuttal | None by default v2.0. | Venue/page/anonymity/camera-ready keys in global first-pass config. | Paper/rebuttal prompt packs and citation policy. |

### 3.6 Prompt-pack indexer

### Sourced facts

- Long workflow prompts should not be copied wholesale because it creates upgrade drift (`01-GSD-UPGRADE-BOUNDARIES.md`).
- Exact prompt-pack file naming is discretionary as long as packs are source-indexed and not copied wholesale without provenance (`02-CONTEXT.md`).

### Inferred recommendation

The prompt-pack indexer should be a manifest reader, not a prompt runtime engine. Each entry should contain:

| Field | Purpose |
| --- | --- |
| `command` | Wrapper command name, for example `research-lit`. |
| `source_paths` | Relative or rooted source paths to Auto/ARIS skill files and supporting prompt assets. |
| `stable_contracts` | Short extracted contracts: inputs, required evidence, review gates, artifact expectations. |
| `deferred_sections` | Paper, rebuttal, external-service, or unsupported upstream sections intentionally not compiled. |
| `provenance` | Source system, version/hash if known, extraction date, and reviewer. |
| `output_templates` | Names of generated GSD context/artifact-contract snippets. |

The indexer should emit only bounded prompt snippets into the generated phase context, such as:

- research goal and constraints,
- required artifacts under `research/`,
- evidence gate checklist,
- review/verify instructions,
- side-effect policy summary,
- source provenance.

It should not make prompt-pack files a second source of phase status.

### 3.7 Phase insertion helper

### Sourced facts

- Existing-roadmap research commands use inserted decimal phases after the current completed phase (`02-CONTEXT.md`, D-13 and D-14).
- GSD already has decimal phase support and an `insert-phase` workflow (`02-CONTEXT.md`, code context).
- Canonical lifecycle writes remain owned by normal GSD lifecycle commands and lock/atomic-write paths (`02-CONTEXT.md`, D-05; `01-GSD-FRAMEWORK.md`).

### Inferred recommendation

The helper should produce a **phase insertion request**, then call or instruct the ordinary GSD insertion workflow to perform canonical writes. The payload should include:

| Field | Example |
| --- | --- |
| `mode` | `insert_after_current` or `research_first_roadmap` |
| `phase_title` | `08.1-literature-review-for-cache-policy` |
| `phase_goal` | Human-readable research objective. |
| `generated_context` | Phase context body with prompt-pack contracts and source provenance. |
| `artifact_contracts` | Required `research/` files and evidence classes. |
| `completion_gates` | Raw evidence, review, verify/UAT, and side-effect audit requirements. |
| `recommended_plan_granularity` | Single phase with plan-level tasks unless work-mode boundary justifies split. |
| `side_effect_policy_handoff` | Preauthorization/degradation facts for execution-related commands. |

The helper must not implement its own decimal numbering parser if an upstream-compatible insert helper exists. If the upstream insert helper is not callable, the implementation phase should build the smallest wrapper around that semantic rather than a new roadmap mutator.

### 3.8 Artifact indexer

### Sourced facts

- Every research phase should include `RESEARCH_INDEX.md` (`02-CONTEXT.md`, D-50).
- Artifact classes include inputs, workflow artifacts, control-state cache, primary evidence, review evidence, and derived summaries (`01-AUTO-ARTIFACT-CONTRACTS.md`).

### Inferred recommendation

`RESEARCH_INDEX.md` should be generated as a human-readable index plus an optional adjacent `RESEARCH_INDEX.json` for deterministic checks. Minimal Markdown sections:

1. `Command And Phase` - command, phase id, prompt-pack provenance.
2. `Required Completion Evidence` - raw files/logs/source IDs required before completion.
3. `Workflow Artifacts` - reports/plans that are useful but not proof alone.
4. `Raw Evidence` - JSON/CSV/log/PDF/source paths, W&B run IDs, external URLs, timestamps.
5. `Review Evidence` - raw reviewer outputs, verdicts, scores, difficulty, backend provenance.
6. `Side Effects And Authorizations` - link to audit artifacts.
7. `Provisional Or Degraded Outputs` - explicit statuses and reasons.
8. `Imported Mirrors` - root or external artifacts adopted into the phase root, with adoption status.
9. `Completion Check Result` - latest advisory result from `research-evidence-check`, not phase completion.

The artifact indexer may create or update only files under `.planning/phases/<phase>/research/`.

### 3.9 Completion evidence checks

### Sourced facts

- Completion requires raw evidence plus review/verify/UAT gates (`02-CONTEXT.md`, D-54 through D-57).
- `idea-discovery` cannot complete from context/state/idea-report output alone; literature retrieval and reading evidence are mandatory (`02-CONTEXT.md`, D-56; `01-FRAMEWORK-SYNTHESIS.md`).
- File presence and summaries are advisory only (`01-CROSS-FRAMEWORK-GAP-MAP.md`).

### Inferred recommendation

The checker should produce an advisory result consumed by normal GSD review/verify:

| Result | Meaning | GSD handoff |
| --- | --- | --- |
| `clean_evidence_ready` | Required raw evidence exists, provenance is recorded, review/verify inputs are available, no missing authorizations or unresolved overrides. | GSD may proceed to ordinary review/verify; not auto-complete. |
| `provisional_evidence_ready` | Evidence exists but has explicit limitation, overridden gate, weak source, or degraded backend. | GSD review/verify must see provisional flag and decide. |
| `blocked_missing_evidence` | Required evidence is absent or only summary/context output exists. | GSD must not mark research work complete. |
| `blocked_missing_review` | Raw evidence exists but required review/audit evidence is absent. | GSD must run review/audit before verify. |
| `blocked_side_effect_unknown` | Side effects were requested but authorization or result status is unrecorded. | GSD must require audit update or human decision. |
| `degraded_missing_authorization` | Operation skipped because credentials/platform access were unavailable. | GSD may accept degraded completion only if the phase goal still holds and status is explicit. |

## 4. Comparison Against Other Design Families

### 4.1 GSD-first family

### Sourced facts

- GSD-first preserves upstream lifecycle ownership and treats research as ordinary phases/plans/artifacts (`02-PROPOSAL-ROUND-1.md`).
- Upstream GSD already has phase context capture, planning, execution, verification, state drift validation, UAT, locks, and git discipline (`01-GSD-FRAMEWORK.md`).

### Inferred comparison

| Axis | GSD-first | Minimal adapter position |
| --- | --- | --- |
| Strength | Lowest schema risk; maximum upstream compatibility. | Adopt this lifecycle posture. |
| Weakness | Without helper wrappers, standalone research commands may be manual and inconsistent. | Add only compile-time wrappers and artifact/evidence helpers. |
| Blast radius | Lowest core changes. | Same for core; slightly more command/helper surface. |
| Research preservation | Risk of losing Auto/ARIS command identity and evidence details. | Preserve identity through command wrappers, prompt-pack provenance, and `RESEARCH_INDEX.md`. |

The minimal adapter is GSD-first with a small convenience layer.

### 4.2 Adapter family

### Inferred comparison

| Axis | Larger adapter risk | Minimal adapter position |
| --- | --- | --- |
| Lifecycle ownership | Adapter can drift into routing phases or completing work. | Adapter never owns canonical lifecycle writes or completion. |
| Config | Adapter can accrete broad aliases and hidden runtime behavior. | Separate strict research config, command-specific pruning, no GSD core config mutation. |
| Artifacts | Adapter can become a research state engine. | Phase-local evidence only; control caches cannot route lifecycle. |
| Side effects | Adapter can hide external operations behind automation. | Explicit side-effect handoff plus required audit artifacts. |

This proposal is the smallest safe member of the adapter family.

### 4.3 Compiler/hybrid family

### Sourced facts

- The decided architecture direction says Auto Research integration is a Research Command Compiler, not a GSD core rewrite or runtime overlay (`02-CONTEXT.md`, D-01).
- A research command compiles Auto/ARIS prompt content into ordinary GSD phase context, planning constraints, artifact contracts, evidence requirements, review rules, and checkpoint text (`02-CONTEXT.md`, D-02 through D-04).

### Inferred comparison

| Axis | Full compiler/hybrid | Minimal adapter position |
| --- | --- | --- |
| Capability | Can model many commands and rich pipeline generation. | Support only first-pass command wrappers and defer complex packs. |
| Complexity | Needs richer intermediate representation and pipeline compiler. | Use simple insertion request plus prompt-pack contract manifest. |
| Risk | IR can become a second control plane if persistent/routable. | Generated ordinary GSD artifacts are the only durable lifecycle input. |
| Future path | Best long-term if many research packs are added. | Keep manifest fields compatible with a future compiler, but do not build full compiler now. |

The minimal adapter can be Round 2's implementation slice of the Research Command Compiler direction: enough to compile prompt packs into GSD inputs without introducing a durable compiler runtime.

## 5. Required GSD Changes

### Sourced facts

- Public commands should remain thin and route into workflow/runtime contracts (`01-GSD-FRAMEWORK.md`).
- `.planning/` artifact names, `gsd-tools.cjs` compatibility, workstream routing, locks, hooks, and git planning commits are upgrade boundaries (`01-GSD-UPGRADE-BOUNDARIES.md`).
- Research config must be separate from upstream GSD `.planning/config.json` (`02-CONTEXT.md`, D-25).

### Inferred recommendation

### Minimum changes

1. Add thin command wrappers for initial research commands.
2. Add one adapter workflow prompt for compile-only behavior.
3. Add research helper modules that do not mutate canonical lifecycle state.
4. Add `.planning/research.config.json` support through a separate loader, not GSD core config.
5. Add prompt-pack manifest/index support with provenance.
6. Add phase-local research artifact index generation.
7. Add advisory evidence-check command used by review/verify gates.
8. Add side-effect audit artifacts for `danger-auto`.

### What not to implement in GSD core

1. No `phase_type`, phase kind, typed routing, broad phase schema expansion, or phase-level research discriminator.
2. No research-specific fields in `ROADMAP.md`, `STATE.md`, phase records, milestone records, or requirements state.
3. No second lifecycle controller for research pipelines.
4. No research runtime daemon, job queue, scheduler, or persistent monitor as part of core lifecycle.
5. No root Auto artifact fallback as completion evidence.
6. No `ljx-*` command namespace, bridge generator, `primaryCommand` router, or bridge-ready labels.
7. No hidden config migration on read for research config unless Phase 02 later explicitly approves a migration path.
8. No wholesale prompt copying into upstream GSD workflows.
9. No external service provider registry in GSD core; execution packs can have policy adapters.
10. No SDK public API changes until SDK inclusion/adaptation/deferment is resolved.

### Git and hook interactions

### Sourced facts

- GSD git planning commits, branch strategies, subrepo routing, explicit staging, marker-managed hooks, and uninstall symmetry are upgrade boundaries (`01-GSD-UPGRADE-BOUNDARIES.md`).
- Hooks live under upstream `hooks/`, are built/copied by build scripts, and are installer-managed (`01-GSD-FRAMEWORK.md`).

### Inferred recommendation

- Research command wrappers should follow ordinary GSD planning commit behavior. If a wrapper generates a phase insertion request and phase-local research artifacts, those files are staged/committed only through existing GSD commit discipline.
- The adapter should add no always-on hook in first pass. If later hooks are needed, they should validate research artifact shape or warn about missing evidence only; they must not mutate research or lifecycle state.
- Hook installation/uninstallation must remain marker-managed by the upstream installer path. Research support must not write directly into user Codex config or Git hooks.
- `danger-auto` may push, create PRs, run GitHub operations, or cleanup only when the side-effect policy handoff says those operations are configured/authorized. Missing GitHub auth or remote permissions must be recorded, not treated as clean success.
- Git push/PR are side effects, not completion evidence. A PR URL can be evidence of publication, but not evidence that research claims are true.

### Upgrade and SDK boundaries

### Sourced facts

- Reference checkout is `get-shit-done-cc@1.35.0`, while local installed runtime reports `1.34.2`; implementation must verify both source and package compatibility later (`02-CONTEXT.md`, D-52; `01-GSD-UPGRADE-BOUNDARIES.md`).
- SDK support is a compatibility boundary but not a blocker for first research command compiler design (`02-CONTEXT.md`, D-53).
- The SDK has public API, CLI entrypoint, prompt assembly, and tests; do not assume it is only a wrapper (`01-GSD-UPGRADE-BOUNDARIES.md`).

### Inferred recommendation

- Round 2 should select the upstream behavioral baseline before any helper implementation. The minimal adapter should target the source checkout as design baseline but require package/install verification before release.
- Keep all research helpers outside SDK exports in the first implementation unless SDK inclusion is explicitly approved.
- If SDK exposure is later required, expose only stable compile inputs/outputs: config load result, prompt-pack contract metadata, insertion request, evidence-check result, and artifact index result. Do not expose lifecycle mutation APIs through the research adapter.
- Maintain compatibility with `--cwd`, workstream routing, and `@file` spillover where wrappers call existing GSD tools.

## 6. Research Capability Preservation

### Sourced facts

- Default v2.0 research pipeline covers literature, idea generation, novelty/refinement, experiment planning, experiment execution/evidence collection, experiment audit, and result-to-claim (`02-CONTEXT.md`, D-18).
- Paper/rebuttal/poster/slides/camera-ready/post-acceptance are deferred from default v2.0 (`02-CONTEXT.md`, D-19 and D-20).
- Auto/ARIS artifact contracts include literature evidence, idea reports, refine logs, experiment plans/trackers, experiment logs, audit JSON/Markdown, auto review evidence, and claims from results (`01-AUTO-ARTIFACT-CONTRACTS.md`).

### Inferred recommendation

The minimal adapter preserves research capability by mapping Auto/ARIS workflows to ordinary GSD phases and plans:

| Capability | Preservation mechanism | Minimum artifact contract |
| --- | --- | --- |
| Literature search/read | `research-lit` prompt-pack contract compiled into one phase. | `research/literature/LITERATURE_EVIDENCE.md` plus raw source table/cache. |
| Idea discovery | `idea-discovery` compiles literature requirement and idea generation/review contracts. | Literature evidence plus `research/IDEA_REPORT.md`; idea report alone is insufficient. |
| Idea creation/ranking | `idea-creator` compiles candidate generation, eliminated ideas, and ranking criteria. | `IDEA_REPORT.md` or `IDEA_CANDIDATES.md` plus provenance. |
| Novelty check | `novelty-check` compiles search/review criteria and threshold. | Raw novelty review evidence and accepted/rejected source list. |
| Refinement | `research-refine` compiles bounded review loop and problem-anchor constraints. | `refine-logs/REFINE_STATE.json`, raw review logs, `FINAL_PROPOSAL.md`. |
| Experiment planning | `experiment-plan` compiles claim, metric, dataset, baseline, budget, and run-order requirements into one phase. | `refine-logs/EXPERIMENT_PLAN.md` and tracker with explicit must-run/nice-to-have split. |
| Execution/evidence collection | Deferred or execution pack with side-effect handoff. | Raw logs, JSON/CSV, W&B IDs, code commit references, `EXPERIMENT_LOG.md`. |
| Experiment audit | Plan-level or inserted phase depending on boundary. | `EXPERIMENT_AUDIT.md`, `EXPERIMENT_AUDIT.json`, raw audit notes. |
| Result-to-claim | Evidence gate after audit. | `CLAIMS_FROM_RESULTS.md` with yes/partial/no claim statuses and audit links. |
| Auto review loop | Review helper used by refinement/audit/claim commands. | `AUTO_REVIEW.md`, raw reviewer responses, `REVIEW_STATE.json`, reviewer provenance. |

The minimal adapter intentionally preserves fewer public commands up front than Auto/ARIS exposes. It preserves deferred capability through prompt-pack index entries marked `deferred`, not through active wrappers.

## 7. Preset, Gate, And Side-Effect Semantics

### Sourced facts

- `safe`, `auto`, and `danger-auto` are required presets; default is `safe`; all defaults are deep research/review (`02-CONTEXT.md`, D-31 through D-37).
- Hard gates precede automation: missing evidence, blocking audit/verification failure, external-service confirmation, destructive write, budget limit, or explicit human stop block first (`01-AUTO-PARAMETER-MAP.md`).
- `danger-auto` can use available permissions but cannot fabricate credentials or access; missing authorization must be recorded and completion must not be falsely clean (`02-CONTEXT.md`, D-38 through D-40).
- Required danger-auto audit artifacts are `RESEARCH_RUN_LOG.md`, `AUTHORIZATION_ACTIONS.json`, `DANGER_AUTO_OVERRIDES.md`, and `SIDE_EFFECTS.md` under the owning phase research root (`02-CONTEXT.md`, D-41 and D-42).

### Inferred recommendation

### Preset behavior

| Preset | Minimal adapter behavior |
| --- | --- |
| `safe` | Deep research/review. Human checkpoint at important decisions and before every external side effect. No automatic destructive or cost-bearing action. |
| `auto` | Deep research/review. Automatically proceeds through ordinary local checkpoints when required evidence exists. Stops on blocking quality gates and unapproved external side effects. |
| `danger-auto` | Deep research/review. Auto-selects recommended decisions, records any quality-gate override, performs configured/authorized side effects, and marks outputs degraded/provisional when gates are overridden or operations are skipped. |

### Gate precedence

1. Hard safety/evidence/service gate.
2. Explicit human stop or `human_checkpoint=true`.
3. Preset automation behavior.
4. Command-specific stop predicate, for example score threshold plus positive verdict.
5. Advisory GSD progress/next/summary signals.

### Side-effect policy handoff

The adapter should classify each side effect before execution:

| Side effect | Default `safe` | Default `auto` | Default `danger-auto` | Required record |
| --- | --- | --- | --- | --- |
| Git commit | Existing GSD discipline. | Existing GSD discipline. | Existing GSD discipline. | Planning/subrepo commit record. |
| Git push | Confirm. | Requires preauthorization. | Execute if authorized. | `SIDE_EFFECTS.md` plus auth status. |
| PR creation/GitHub ops | Confirm. | Requires preauthorization. | Execute if authorized. | URL/error/missing auth in audit. |
| W&B logging | Disabled unless command pack enables. | Use only if configured. | Use if configured/authorized. | Run URL/id or missing auth. |
| SSH/rsync/scp/remote commands | Disabled unless execution pack enables. | Use only if configured/preauthorized. | Use if configured/authorized. | Host alias, command summary, result, errors. |
| Modal/Vast.ai/GPU | Disabled outside execution packs. | Use only if configured/preauthorized/budgeted. | Use if configured/authorized/budgeted. | Instance/job id, budget, cleanup, missing auth. |
| Notifications | Confirm. | Use if configured. | Use if configured. | Destination class and result. |
| Cleanup/destruction | Confirm. | Requires explicit preauthorization. | Execute if configured/authorized; never before evidence collection. | Cleanup target, timing, result. |

### Danger-auto audit artifact writer

The minimal writer should create/update exactly the required audit artifacts plus optional machine-readable companions:

| Artifact | Minimum content |
| --- | --- |
| `RESEARCH_RUN_LOG.md` | Command, preset, phase id, start/end time, selected defaults, decisions auto-selected, checkpoint summary, final status. |
| `AUTHORIZATION_ACTIONS.json` | Side-effect capability, requested operation, configured credentials/access status, outcome, missing authorization, degradation/blocking decision. |
| `DANGER_AUTO_OVERRIDES.md` | Gate overridden, reason, evidence present/absent, downstream artifact status marking, reviewer/agent responsible. |
| `SIDE_EFFECTS.md` | Operation class, target, command summary, result, external IDs/URLs, cost/budget note when applicable, cleanup result. |

No audit artifact may claim clean completion. It may only classify the research run as clean, provisional, degraded, blocked, or overridden for GSD review/verify to evaluate.

## 8. Completion Semantics

### Sourced facts

- GSD has plan checker, planner source audit, post-merge test gate, summary spot-check, phase completeness check, verification patterns, UAT debt scan, state drift validation, and milestone audit (`01-GSD-FRAMEWORK.md`).
- Research completion requires raw evidence plus relevant review/verify/UAT gates (`02-CONTEXT.md`, D-54 through D-57).
- `danger-auto` must distinguish clean completion from completion with overrides, provisional outputs, missing authorizations, or degraded paths (`02-CONTEXT.md`, D-57).

### Inferred recommendation

The adapter can report five completion-readiness states, but GSD decides phase completion:

| State | Allowed when | Not allowed when |
| --- | --- | --- |
| `clean` | Required raw evidence, source provenance, review evidence, verify/UAT inputs, and side-effect audit are complete with no blocking gaps. | Any required evidence is missing or any side-effect status is unknown. |
| `provisional` | Evidence exists but confidence is limited, reviewer backend degraded, or claim support is partial. | A hard gate requires blocking rather than downgrade. |
| `degraded` | A non-essential operation could not run due to missing credentials/access, but phase goal remains evaluable. | The missing operation was required by the phase success criteria. |
| `overridden` | `danger-auto` bypassed a quality gate and recorded the override. | Override is not recorded or downstream artifacts are not marked. |
| `blocked` | Required evidence, review, authorization, or verification is absent. | The only missing item is an explicitly non-essential optional side effect. |

Minimal completion rule by command family:

| Command family | Raw evidence requirement | Review/verify requirement |
| --- | --- | --- |
| Literature/idea | Source selectors, queries, timestamps, retained IDs/URLs/paths, accepted/rejected papers, reading notes. | Review of evidence coverage and GSD verify/UAT acceptance of research goal. |
| Novelty/refine | Raw novelty/reviewer responses, scores, decision logs, proposal versions. | Stop predicate score plus positive verdict; verify no drift from problem anchor. |
| Experiment plan | Claim map, metrics, dataset/split, baselines, run order, budget, risks, must-run/nice-to-have split. | Plan review that evaluates whether experiment could validate claims. |
| Execution/evidence | Raw logs, JSON/CSV, code refs, W&B/external IDs, run failures, collection timestamps. | Audit and verify evidence before result-to-claim. |
| Audit/claim | Audit JSON/Markdown, per-claim support status, raw review trail. | Claim gate must distinguish yes/partial/no and block unsupported claims. |

Summaries, dashboards, issue checklists, `EXPERIMENT_TRACKER.md`, `IDEA_REPORT.md`, or PR links are never sufficient alone.

## 9. No-Phase-Type Proof

### Sourced facts

- `phase_type`, typed routing, and broad phase schema changes are banned by Phase 01 and Phase 02 (`01-FRAMEWORK-SYNTHESIS.md`; `01-CROSS-FRAMEWORK-GAP-MAP.md`; `02-CONTEXT.md`).
- GSD phase directories, plans, tasks, checklists, artifacts, and checkpoints already provide the granularity needed for research workflows (`02-CONTEXT.md`, D-06 through D-12; `01-GSD-FRAMEWORK.md`).
- Current ljx typed route tables, `primaryCommand` routing, `ljx-*` namespace, and bridge-ready completion semantics are discarded or historical-only (`01-LJX-REUSE-OR-DISCARD-MATRIX.md`).

### Inferred proof

The minimal adapter does not need `phase_type` because every research-specific distinction is represented in ordinary places that GSD already understands or can ignore safely:

| Research need | Ordinary GSD representation | Why no schema field is needed |
| --- | --- | --- |
| Command identity | Phase title, generated `CONTEXT.md`, `RESEARCH_INDEX.md` command/provenance section. | Human and helper-readable; GSD lifecycle does not route by it. |
| Research workflow steps | `PLAN.md` tasks, checkpoints, dependencies, and summaries. | GSD already executes plan/task granularity. |
| Artifact requirements | Phase-local `research/RESEARCH_INDEX.md` and plan verification criteria. | Completion gates can read artifacts without phase schema mutation. |
| Evidence status | Advisory evidence-check output under `research/`. | GSD review/verify consumes status, but completion remains GSD-owned. |
| Presets and side effects | `.planning/research.config.json` plus side-effect handoff/audit files. | Config is separate from core GSD and scoped to wrappers. |
| Decimal insertion | Existing GSD insert-phase semantics. | Phase number encodes insertion without type routing. |
| Research-first roadmap | Ordinary integer phases generated from research goals. | A roadmap can be research-centered without typed phases. |
| Resume/control caches | Phase-local command cache files like `REFINE_STATE.json`. | Cache resumes a command, not the GSD lifecycle. |

The only durable outputs are ordinary GSD phase/context/plan/artifact files plus phase-local research artifacts. If the adapter disappeared after generation, GSD could still discuss, plan, execute, review, verify, and complete the phase. That is the practical no-second-control-plane test.

## 10. Risks And Open Questions

### Risks

| Risk | Why it matters | Minimal mitigation |
| --- | --- | --- |
| Adapter grows into lifecycle owner | Convenience helpers may start editing roadmap/state or declaring completion. | Enforce no canonical writes in helper tests; all mutations go through GSD lifecycle owner. |
| Prompt-pack index becomes stale | Source prompt paths or upstream skill behavior may change. | Store provenance and source paths; do not copy long prompts; add package/source verification later. |
| Research config becomes broad config drift | Unknown keys and legacy aliases can recreate ljx complexity. | Separate strict config with command-specific pruning and explicit deferrals. |
| `danger-auto` falsely reports success | Missing credentials or overridden gates can be hidden by automation. | Required audit artifacts and degraded/provisional statuses; evidence checker rejects unknown side-effect status. |
| Phase-local research artifacts become hidden state engine | Resume caches may route future behavior without GSD awareness. | Caches are command-local only; `RESEARCH_INDEX.md` declares status but cannot complete phases. |
| Execution side effects are under-tested | GPU, W&B, SSH, Modal, Vast.ai, cleanup, and PR operations are high-risk. | Defer execution packs until side-effect scenario tests exist; default disabled outside execution commands. |
| SDK drift | SDK may require public API decisions before wrappers are exposed programmatically. | Keep first adapter outside SDK exports; decide SDK boundary in Round 2 or later foundation phase. |
| Upstream baseline mismatch | Reference 1.35.0 and installed 1.34.2 differ. | Select baseline and run package/install/hook tests before implementation. |
| Over-pruning loses Auto/ARIS value | Minimal wrappers may omit useful paper/rebuttal or execution workflow details. | Preserve deferred prompt-pack index entries with source provenance and explicit future pack status. |
| Command wrapper proliferation | Too many wrappers can feel like a second product surface. | Start with first-pass commands only; pipeline wrapper compiles ordinary GSD inputs, not its own lifecycle. |

### Open questions for Round 2

1. Should `novelty-check`, `experiment-audit`, and `result-to-claim` default to inserted phases, or should they usually attach as plans/checkpoints inside existing phases when the target phase is active?
2. Should `.planning/research-prompt-packs.json` live in the installed package, project `.planning/`, or both with project overrides?
3. Should `RESEARCH_INDEX.json` be required for deterministic checks, or is Markdown plus evidence checker output enough in first pass?
4. What exact side-effect policy vocabulary should config use: `disabled`, `confirm`, `preauthorized`, `danger_auto_allowed`, or a simpler boolean-plus-confirmation model?
5. Which upstream baseline should helper tests target first: source checkout `1.35.0`, installed `1.34.2`, or a reconciled compatibility matrix?
6. Should first-pass wrappers include any execution command, or should all execution side effects be deferred until after research planning/audit contracts are implemented?
7. Should research config allow experimental namespaced keys, or should unknown keys always be fatal until a command pack explicitly declares them?

## 11. Recommendation For Round 2

### Inferred recommendation

Round 2 should adopt the minimal adapter as the implementation-slice candidate, while using the GSD-first and compiler/hybrid proposals to bound it:

1. Keep the **GSD-first lifecycle rule** as non-negotiable: all canonical lifecycle state writes and completion decisions remain ordinary GSD operations.
2. Use the **Research Command Compiler concept** only as a compile-time contract: command + config + prompt-pack source -> ordinary GSD insertion/context/plan/artifact inputs.
3. Implement the **minimal adapter surface first**: config loader, prompt-pack indexer, phase insertion request builder, artifact indexer, evidence checker, danger-auto audit writer, side-effect handoff, and thin wrappers.
4. Defer execution-heavy wrappers until side-effect policy tests exist for git push, PR, W&B, SSH, Modal, Vast.ai, GPU, notifications, cleanup, credentials, and missing authorization.
5. Defer paper/rebuttal/slides/poster/camera-ready packs from default v2.0, but preserve their prompt-pack provenance as future indexed packs.
6. Require a Round 2 no-`phase_type` test: remove the adapter after generated phase artifacts exist and verify ordinary GSD can still execute/review/verify the phase without typed routing.
7. Require implementation review to check for ljx bridge contamination: no `ljx-*` names, no typed route tables, no `primaryCommand`, no bridge-ready completion, no root Auto fallback as truth.

The strongest minimal-adapter stance is: **research commands may prepare GSD work, evidence, and audit records; they may not become GSD.**
