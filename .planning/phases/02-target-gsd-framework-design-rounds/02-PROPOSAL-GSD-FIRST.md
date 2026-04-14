# 02-PROPOSAL-GSD-FIRST

**Lane:** GSD-first lifecycle proposal  
**Round:** Phase 02 proposal round 1  
**Position:** Strict upstream-GSD-first integration of Auto/ARIS research capabilities into `gsd`  
**Ownership:** This proposal writes only this file and does not modify canonical project state.

## 1. Position Summary

### Sourced facts

- Phase 02 must design the target `gsd-framework`, not implement it, and must keep upstream GSD as the outer control plane.
- Phase 01 final synthesis says v2.0 is upstream GSD plus a bounded research-command extension, not ljx-GSD bridge architecture and not a system with `phase_type`, typed routing, or broad phase schema changes.
- GSD owns discuss, plan, execute, review, verify/UAT, state, progress, phase completion, milestone completion, locks, atomic writes, and canonical `.planning/` state updates.
- Auto/ARIS contributes research workflows, prompt contracts, artifacts, evidence requirements, review loops, experiment execution conventions, paper/rebuttal/tooling capabilities, and support integrations.
- Authoritative research outputs live under `.planning/phases/<phase>/research/`. Root Auto artifacts are import/export mirrors only until explicitly adopted into the phase-local research root.
- Completion requires raw evidence plus relevant independent review/verify/UAT gates; summaries, roadmap checkboxes, plan counts, file existence, `progress`, and `next` are advisory only.

### Inferred recommendation

The strictest GSD-first target framework is:

```text
thin standalone gsd research command
  -> Research Command Compiler
  -> ordinary GSD phase insertion or roadmap initialization request
  -> ordinary CONTEXT.md / PLAN.md / task / checkpoint / artifact contracts
  -> phase-local research/ artifacts and evidence
  -> ordinary GSD execute/review/verify/UAT/completion semantics
```

Research commands should be command-specific compilers, not lifecycle engines. They may read `.planning/research.config.json`, select an Auto/ARIS prompt pack, and produce ordinary GSD inputs. They must not write `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase acceptance records, milestone records, workstream pointers, or lifecycle progress directly. Any canonical mutation must be performed by the existing GSD lifecycle owner through the normal lock/atomic-write path.

The minimum exception to pure upstream GSD is a bounded research extension layer containing command shims, prompt-pack indexes, a research config reader, artifact contract templates, and evidence/review gate text that GSD planners and executors consume. That layer is allowed to write phase-local `research/` artifacts after an owning GSD phase exists, but those artifacts are evidence and command-local resume data, not canonical lifecycle state.

## 2. Source Evidence Used

### Required sources read

- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md`
- `.planning/phases/01-source-framework-extraction/01-FRAMEWORK-SYNTHESIS.md`
- `.planning/phases/01-source-framework-extraction/01-CROSS-FRAMEWORK-GAP-MAP.md`
- `.planning/phases/01-source-framework-extraction/01-GSD-FRAMEWORK.md`
- `.planning/phases/01-source-framework-extraction/01-GSD-UPGRADE-BOUNDARIES.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-FRAMEWORK.md`
- `.planning/phases/01-source-framework-extraction/01-AUTO-ARTIFACT-CONTRACTS.md`

### Sourced facts carried forward

- Upstream GSD is an artifact-driven control plane with command, workflow, runtime CLI, agent, and artifact layers.
- Public commands in upstream GSD are thin and route into workflow/runtime contracts.
- `.planning/` artifacts are runtime APIs, not just documentation.
- `discuss-phase` freezes phase boundary and writes `CONTEXT.md` as phase intent.
- `plan-phase` consumes `CONTEXT.md`, performs research/validation gates, invokes planner/checker loops, and blocks on plan quality and source coverage gaps.
- `execute-phase` indexes plan waves, dispatches executors, gates partial phases, invokes review/verify, and owns transition decisions.
- `verify-work` is conversational UAT with persistent `UAT.md` debt and is not equivalent to automated tests.
- Orchestrator owns canonical lifecycle state; executor agents own scoped work, summaries, and commits.
- GSD phase directories already support integer and decimal phases, and `insert-phase` semantics exist.
- Upstream reference evidence shows `get-shit-done-cc@1.35.0`, while installed local runtime evidence reports `1.34.2`; Phase 02 must treat the baseline as a design decision and later implementation must verify source/package compatibility.
- The SDK is a package boundary with public API, CLI entrypoint, prompt assembly, and tests; it delegates durable lifecycle behavior to GSD runtime and `.planning/` contracts rather than replacing them.
- Auto/ARIS is a plain-file, skill-composed research harness, not a typed-phase system. Phase 01 found no `phase_type` references in Auto/ARIS source extraction.
- Auto/ARIS workflow families include literature/idea discovery, experiment/claim chain, paper/rebuttal, support tools, and reviewer overlays.
- Literature/idea discovery requires retained literature retrieval/reading evidence; `IDEA_REPORT.md` alone is not enough.
- Experiment planning is claim-first and requires claims, anti-claims, evidence, datasets/splits/tasks, systems, metrics, setup, success criteria, failure interpretation, and paper target.
- Raw JSON/CSV/log files and W&B IDs/URLs are primary evidence; Markdown summaries alone are insufficient.
- Experiment audit is independent and advisory by default, but downstream claim confidence must reflect audit failure or absence.
- Paper/rebuttal/slides/poster/camera-ready capabilities are deferred from the default v2.0 pipeline but may be future compiler packs.

### Inferred recommendations from those facts

- Treat research command output as GSD phase-context and plan-contract material, not as direct execution or completion authority.
- Use phase-local `research/RESEARCH_INDEX.md` to classify evidence, summaries, provisional artifacts, raw records, imported mirrors, side effects, overrides, and missing authorizations.
- Keep `.planning/research.config.json` wholly outside upstream `.planning/config.json` to avoid unknown-key drift and upstream config migration risk.
- Make the compiler default to one phase because GSD already has plan/task/checkpoint granularity; split only when ordinary planner quality or hard mode boundaries require it.
- Keep SDK compatibility as a boundary, not a first-round blocker: do not design research commands in a way that prevents later SDK adaptation, but do not require SDK ownership of research lifecycle.

## 3. Proposed Architecture

### 3.1 Lifecycle ownership

### Sourced facts

- GSD owns lifecycle operations: discuss, plan, execute, review, verify/UAT, state, progress, transition, phase completion, and milestone completion.
- Canonical lifecycle files require one writer per operation and normal lock/atomic-write paths.
- Research commands must not directly own canonical lifecycle state writes.

### Inferred recommendation

Use a strict four-owner model:

| Surface | Owner | Allowed writes | Forbidden writes |
| --- | --- | --- | --- |
| Canonical lifecycle state | GSD lifecycle command/orchestrator | `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase acceptance records, milestone records, workstream pointers via existing lock/atomic paths | Direct writes by research compiler, research workers, reviewer backends, execution monitors |
| Phase intent and plan contracts | Ordinary GSD discuss/plan flows, with compiler-produced input text | `CONTEXT.md`, `PLAN.md`, checkpoint text, evidence requirements, review rules through normal GSD planning flow | Typed lifecycle routing, hidden research state in roadmap schema, bypassing plan checker |
| Phase-local research artifacts | Owning research command or assigned GSD task executor | `.planning/phases/<phase>/research/**` artifacts, raw evidence, command-local resume caches, derived summaries | Completing phases, changing roadmap status, satisfying UAT by file existence alone |
| External service effects | GSD executor plus command-specific side-effect adapter under preset/gate policy | Git push/PR, W&B, SSH, Modal, Vast.ai, GPU, notifications, cleanup only when authorized | Fabricating access, silently skipping required side effects, claiming clean completion after blocked operations |

Research commands may call or request normal GSD lifecycle commands, but they do not become lifecycle owners. If a command needs a new phase, it emits an insertion/init request consumed by ordinary GSD insertion or roadmap-generation behavior. If a command needs execution, it produces plan tasks and checkpoint instructions consumed by `execute-phase` / `execute-plan`.

### 3.2 Standalone command surface

### Sourced facts

- Phase 02 requires standalone `gsd` research commands.
- Literature/idea commands should compile to one GSD phase by default: `research-lit`, `idea-creator`, `novelty-check`, `research-review`, `research-refine`, `idea-discovery`, and related wrappers.
- Experiment/claim commands should compile to one GSD phase by default unless they cross execution/audit boundaries: `experiment-plan`, `experiment-audit`, `result-to-claim`, `ablation-planner`, `analyze-results`, `auto-review-loop`, and helpers.
- Execution commands such as `run-experiment`, `monitor-experiment`, and `experiment-bridge` may require separate phases when they switch into code execution, remote execution, GPU usage, raw evidence collection, or audit/claim gates.
- Paper/rebuttal/slides/poster/camera-ready workflows are deferred from the default v2.0 pipeline.

### Inferred recommendation

Expose standalone commands as thin GSD command shims backed by compiler packs:

| Command family | First-round commands | Default GSD output | Notes |
| --- | --- | --- | --- |
| Literature and idea | `gsd research-lit`, `gsd idea-creator`, `gsd novelty-check`, `gsd research-review`, `gsd research-refine`, `gsd idea-discovery` | One inserted phase or one research-first roadmap phase with literature/idea/refinement plan tasks | Must require retained literature evidence where applicable. |
| Pipeline wrapper | `gsd research-pipeline` | One phase by default in insert mode; normal integer research roadmap in research-first mode when user starts project/milestone from research | Wrapper compiles multiple Auto steps into plan sections/checkpoints, not many phases by default. |
| Experiment/claim | `gsd experiment-plan`, `gsd analyze-results`, `gsd experiment-audit`, `gsd auto-review-loop`, `gsd result-to-claim`, `gsd ablation-planner` | One phase unless ordinary planner identifies hard boundary | Claim/evidence/audit artifacts are phase-local. |
| Execution bridge | `gsd experiment-bridge`, `gsd run-experiment`, `gsd monitor-experiment` | Usually one execution/evidence phase when remote/GPU/raw evidence collection begins | Must bind side effects to preset and authorization policy. |
| Deferred paper packs | Future `gsd paper-*`, `gsd rebuttal-*`, `gsd slides/poster` | Deferred compiler packs, not default pipeline | Preserve artifact shape under phase-local `research/` when added. |
| Support tools | Research wiki, watchdog, reviewer providers, arXiv/DeepXiv/Semantic Scholar, W&B, Modal, Vast.ai, notifications | Support adapters only | Never own roadmap, state, phase routing, or completion. |

Command shims should do the minimum needed: parse command arguments, load `.planning/research.config.json`, select a prompt pack, generate a GSD-compatible phase request/context bundle, and then hand off to ordinary lifecycle flows.

### 3.3 Single-phase default, decimal insertion, and research-first roadmap mode

### Sourced facts

- Research commands default to generating one inserted GSD phase, not a mini-roadmap.
- Auto internal sections named Phase/Stage/Step must not mechanically become GSD roadmap phases.
- Strongly coupled research design content must stay together, especially experiment metrics, dataset, split, baseline, method, success criteria, failure interpretation, run order, and must-run/nice-to-have blocks.
- Existing-roadmap research commands use inserted decimal phases after the current completed phase.
- Research-first roadmap generation uses normal integer phases, not decimals.
- Multiple generated phases are allowed only for compound pipelines or hard work-mode boundaries.

### Inferred recommendation

Use these modes:

| Mode | Trigger | Phase numbering | Default granularity | Lifecycle owner |
| --- | --- | --- | --- | --- |
| Existing-roadmap insert mode | User invokes a research command inside an existing GSD roadmap after current completed phase | Decimal phase, for example `08.1` after Phase `08` | One phase; Auto stages become plan tasks/checkpoints | Existing GSD insert/discuss/plan lifecycle |
| Research-first roadmap mode | User starts a project/milestone from `gsd research-pipeline` or explicitly asks for a research-centered roadmap | Normal integer phases | Integer phases only for true roadmap goals, such as idea, execution/evidence, audit/claims | Existing GSD new-project/new-milestone/roadmap lifecycle |
| Planner-split mode | Generated phase is too large or crosses a hard work-mode boundary | GSD-selected integer or decimal according to context | Split recommended by ordinary planner quality loop, not compiler default | GSD planner/checker |

The compiler should never split solely because an Auto prompt has multiple named steps. It may recommend a split when the command crosses from research design into implementation/execution, from execution into independent audit, or from audit into publication claim gating.

### 3.4 Phase-local research artifact model

### Sourced facts

- Authoritative research outputs live under `.planning/phases/<phase>/research/`.
- Each research phase should include `RESEARCH_INDEX.md` mapping required evidence, summaries, raw records, provisional outputs, and import/export mirrors.
- Markdown, JSON/JSONL, clear status fields, provenance links, and evidence boundaries are required for GSD-compatible research docs.
- Root Auto artifacts are mirrors only unless adopted into the phase-local research root.

### Inferred recommendation

Every research-owning GSD phase should use this minimum layout:

```text
.planning/phases/<phase>/
  CONTEXT.md
  PLAN.md or PLAN-*.md
  SUMMARY.md or SUMMARY-*.md
  research/
    RESEARCH_INDEX.md
    RESEARCH_RUN_LOG.md
    evidence/
    literature/
    refine-logs/
    experiments/
    reviews/
    claims/
    imports/
    exports/
    side-effects/
```

Required index fields should be human-readable first and machine-readable where needed:

| Field | Meaning |
| --- | --- |
| `owning_phase` | GSD phase id/title that owns the research root. |
| `producing_commands` | Command packs that generated or updated artifacts. |
| `required_evidence` | Raw files, URLs, IDs, logs, JSON/CSV, PDFs, reviewer responses, or source records needed for completion. |
| `summaries` | Derived Markdown summaries that help humans but do not prove completion alone. |
| `provisional_outputs` | Outputs tainted by missing evidence, failed audit, override, or degraded execution. |
| `imports` | Root/external Auto artifacts copied or linked into the phase root; non-authoritative until adopted. |
| `exports` | Optional mirrors written for compatibility with Auto-style tools. |
| `side_effects` | Authorized external operations and their outcomes. |
| `completion_status` | Research evidence status only; cannot complete the GSD phase by itself. |

The compiler may scaffold this layout after the GSD phase exists. It may not treat the index as a second `STATE.md`.

### 3.5 `.planning/research.config.json`

### Sourced facts

- Research config must be separate from upstream `.planning/config.json` to avoid unknown-key drift and preserve upstream compatibility.
- Preferred path is `.planning/research.config.json`.
- Research config is read by the compiler and compiled into phase context, success criteria, artifact contracts, checkpoint behavior, and planner constraints.
- Precedence is CLI override > command-specific config > preset > built-in defaults.
- Preserve first-pass parameters: `preset`, `effort`, `review_depth`, `auto_proceed`, `human_checkpoint`, `max_review_rounds`, `sources`, `max_literature_items`, `review_difficulty`, `score_threshold` or `novelty_threshold`, and `require_literature_evidence`.
- Defer default paper-stage parameters and keep GPU/W&B/SSH/Modal/Vast.ai parameters out of every command.

### Inferred recommendation

Use a narrow config shape that the compiler understands but upstream GSD core ignores:

```json
{
  "preset": "safe",
  "defaults": {
    "effort": "deep",
    "review_depth": "deep",
    "human_checkpoint": true,
    "auto_proceed": false,
    "max_review_rounds": 3,
    "sources": ["web", "local"],
    "max_literature_items": 50,
    "review_difficulty": "hard",
    "score_threshold": 0.8,
    "require_literature_evidence": true
  },
  "commands": {
    "research-lit": {},
    "idea-discovery": {},
    "experiment-plan": {},
    "run-experiment": {
      "side_effects": {}
    }
  }
}
```

The exact schema can change in implementation, but three rules should not change:

- Upstream `.planning/config.json` stays clean of research keys.
- Research parameters are pruned before reaching GSD core; only compiled constraints and artifact contracts enter `CONTEXT.md`/`PLAN.md`.
- Execution-side-effect settings live only on execution command packs or authorization records, not in every research command.

### 3.6 Git, hooks, subagents, upgrade boundary, and SDK boundary

### Sourced facts

- Upstream GSD git behavior includes controlled planning commits, subrepo routing, explicit staging semantics, and package/runtime compatibility tests.
- Hook install/uninstall behavior is an upgrade boundary; marker-managed config sections, hook ownership tracking, and user artifact preservation must be preserved.
- Orchestrator/subagent ownership prevents worktree and shared artifact races: the orchestrator owns lifecycle state, while executor agents own scoped tasks, summaries, and scoped commits.
- Reviewer backends are support adapters; reviewer independence and raw reviewer responses must be preserved.
- The upstream baseline is not fully settled because the reference checkout and installed runtime evidence diverge.
- The SDK is a public package boundary with API, CLI, prompt assembly, and tests; it should not be assumed to be a thin wrapper.

### Inferred recommendation

The GSD-first proposal should not define research-specific git or hook semantics. It should reuse ordinary GSD git discipline and add only research-specific audit records under the phase-local `research/` root:

| Topic | GSD-first rule |
| --- | --- |
| Planning commits | Research command outputs that alter canonical planning artifacts must be committed, staged, or routed exactly as ordinary GSD planning changes are. |
| Implementation commits | Research execution tasks use ordinary executor/subrepo commit behavior; raw evidence paths are recorded in `research/RESEARCH_INDEX.md`. |
| Push and PR | Push/PR creation is an external side effect governed by preset and authorization policy, not by a new research git mode. |
| Hooks | Research commands may rely on installed upstream hooks but should not mutate hook registration except through normal installer/update/uninstall paths. |
| Research workers | Research workers may write only assigned phase-local research artifacts or task outputs, never canonical lifecycle files. |
| Reviewer backends | Reviewer backends write raw responses, provenance, and review summaries under `research/reviews/`; they do not update lifecycle state. |
| Execution monitors | Monitors may append job/process/GPU/W&B status and evidence references; they are not evidence by themselves and cannot complete work. |
| Proposal/review lanes | Framework-design proposal lanes are process artifacts for Phase 02 only; they do not imply runtime subagent types or phase schema. |
| Upgrade baseline | Use latest upstream source as the design baseline per Phase 02 context, but require later verification against source, package, install, hooks, config, state locks, and tests. |
| SDK boundary | Keep compiler contracts serializable and adapter-friendly for a future SDK, but do not make SDK the first lifecycle owner or require SDK changes for initial command design. |

This keeps git/hooks/subagents as upstream GSD behavior with research-specific evidence records, rather than another operational control plane.

## 4. Comparison Against Other Design Families

### Family A: Strict GSD-first compiler, recommended for this lane

### Sourced facts

- Phase 02 context already chooses Research Command Compiler over core rewrite/runtime overlay.
- GSD remains responsible for lifecycle and canonical state.
- Research commands compile Auto prompt content into ordinary GSD inputs.

### Inferred recommendation

This family preserves upstream GSD most strictly. It adds standalone research commands but makes them compile into phase context, plans, tasks, artifact contracts, evidence requirements, review rules, and checkpoints. It uses upstream insertion, planning, execution, review, verification, git, hooks, state, and completion discipline. It supports Auto/ARIS capability breadth without accepting Auto/ARIS as a lifecycle authority.

Best fit when the priority is upgradeability, false-completion resistance, single-writer state, and no `phase_type` proof.

### Family B: Minimal adapter

### Sourced facts

- Phase-local research artifacts and import/export mirrors are allowed.
- Root Auto artifacts cannot be authoritative state.
- Support tools must not become a second roadmap/control plane.

### Inferred recommendation

A minimal adapter would expose a smaller surface: copy/import root Auto artifacts into `research/`, provide a few command wrappers, and rely on users or ordinary GSD planners to interpret them. This preserves upstream GSD even more narrowly, but it risks under-preserving Auto/ARIS semantics because literature evidence gates, experiment claim maps, audit impacts, review stop predicates, and side-effect behavior may remain implicit.

This is safer for implementation size but weaker for research integrity unless Round 2 pairs it with explicit artifact/evidence contracts.

### Family C: Compiler/hybrid

### Sourced facts

- Phase 02 requires standalone commands and compiler behavior.
- Multiple generated phases are allowed for compound pipelines or hard work-mode boundaries.
- External execution commands can require separate phases when they enter remote/GPU/raw evidence or audit/claim boundaries.

### Inferred recommendation

A compiler/hybrid family may generate a richer bundle: phase insertion, multiple plans, skeleton `research/` artifacts, execution monitors, side-effect adapters, and optional support-tool indices. It can preserve Auto/ARIS behavior more completely, especially for execution-heavy research. Its risk is creeping toward a second control plane if monitors, reviewer loops, or support tools begin routing lifecycle or declaring completion.

The strict GSD-first proposal accepts only the compiler half of this family and rejects any hybrid runtime lifecycle ownership. Hybrid support tools are allowed only as phase-local helpers and external-service adapters.

### Round 1 comparison conclusion

| Axis | GSD-first | Minimal adapter | Compiler/hybrid |
| --- | --- | --- | --- |
| Upstream preservation | Strongest | Strongest implementation minimalism, but weaker semantic preservation | Medium; depends on boundaries |
| Auto/ARIS capability preservation | Strong if artifact/gate contracts are explicit | Partial unless many contracts are manually documented | Strongest, but highest control-plane risk |
| False-completion resistance | Strongest because GSD gates remain authoritative | Depends on how much evidence checking is added | Strong if bounded; weak if hybrid runtime can complete work |
| Implementation complexity | Moderate | Lowest | Highest |
| Upgrade safety | Strong | Strong | Risky unless support adapters are quarantined |
| No-`phase_type` proof | Strong | Strong | Risky if compiler adds typed routing |

## 5. Required GSD Changes

### Sourced facts

- Public commands should stay thin and route into workflow/runtime contracts.
- `.planning/` artifact names and canonical state files are compatibility boundaries.
- GSD config unknown-key behavior creates risk, so research config stays separate.
- Package manifests, SDK boundary, hooks, installer, and tests are upgrade boundaries.
- Current ljx-GSD bridge-specific helpers, `ljx-*` names, bridge-ready completion, typed route tables, primary-command routing, and broad bridge policy modules are historical-only unless reimplemented under reviewed v2.0 contracts.

### Inferred recommendation

Required changes should be limited to these bounded areas:

| Area | Required change | Non-goal |
| --- | --- | --- |
| Command shims | Add standalone `gsd research-*`, `gsd idea-*`, `gsd experiment-*` command entries that route to compiler packs | Do not add research lifecycle commands that bypass discuss/plan/execute/verify |
| Compiler library | Add a research command compiler that emits ordinary GSD phase/context/plan inputs and phase-local artifact contracts | Do not write canonical state directly |
| Prompt-pack index | Source-index Auto/ARIS prompt packs and extract stable contracts | Do not copy large upstream prompt bodies into v2.0 docs or generated state |
| Config reader | Read `.planning/research.config.json`, apply precedence, prune parameters, and compile constraints | Do not add research keys to upstream `.planning/config.json` |
| Phase-local artifact templates | Scaffold `research/RESEARCH_INDEX.md`, evidence directories, audit logs, and side-effect records after phase ownership exists | Do not let these files route phases or complete lifecycle state |
| Gate text | Add research-specific evidence/review/authorization checklist text into `CONTEXT.md`/`PLAN.md` | Do not create a parallel gate engine |
| Side-effect adapters | Bind W&B/SSH/Modal/Vast.ai/GPU/git/notifications/cleanup to command pack and preset policy | Do not execute missing or unauthorized operations silently |
| Compatibility tests later | Add package/config/hook/atomic-write/research evidence tests in later implementation phases | Do not assume SDK or installer behavior without verification |

No broad phase schema expansion is required. No new typed phase state is required. No current ljx-GSD bridge module should be reused without quarantine review.

## 6. Research Capability Preservation

### Sourced facts

- Default v2.0 research pipeline covers literature, idea generation, novelty/refinement, experiment planning, experiment execution or evidence collection, experiment audit, and result-to-claim.
- Paper/rebuttal/slides/poster/camera-ready/post-acceptance workflows are deferred from default v2.0 but can be future compiler packs.
- Literature source selectors include `zotero`, `obsidian`, `local`, `web`, `deepxiv`, and `all`; Semantic Scholar is folded into `web`, and `deepxiv` remains explicit opt-in unless changed intentionally.
- `RESEARCH_BRIEF.md` can supersede a one-line prompt.
- `ref paper` can generate `REF_PAPER_SUMMARY.md` before literature search and ideation.
- Novelty checks are claim-based and cross-verified.
- Refinement freezes a Problem Anchor and iterates until threshold or max rounds.
- Experiment planning is claim-first.
- Code review before GPU spend is required in upstream bridge semantics.
- Sanity-first execution precedes full suite.
- Reviewer independence is a hard invariant; raw reviewer responses are primary records.
- Reviewer transport should be swappable, with Codex subagents as default when available and explicit fallback configuration.

### Inferred recommendation

Preserve capabilities by mapping Auto/ARIS workflow semantics into ordinary GSD plan tasks and artifacts:

| Auto/ARIS capability | GSD-first preservation mechanism | Required evidence |
| --- | --- | --- |
| Research brief ingestion | Phase `CONTEXT.md` includes brief path/content summary and constraints | Adopted input artifact listed in `RESEARCH_INDEX.md` |
| Literature search | Plan task with source selectors, query strategy, retained source IDs/URLs/paths, accepted/rejected records | `research/literature/LITERATURE_EVIDENCE.md` plus raw/cache records |
| Idea creation | Plan task producing candidates, eliminations, pilot reasoning, ranking | `IDEA_REPORT.md` or equivalent under phase-local `research/` |
| Novelty check | Review/check task comparing claims against literature | Novelty report with claim-level evidence links |
| Refinement | Bounded loop task with Problem Anchor, threshold, max rounds | `refine-logs/REFINE_STATE.json`, `FINAL_PROPOSAL.md`, review records |
| Experiment planning | Claim-first plan task with anti-claims, datasets, metrics, baselines, run order, success/failure interpretations | `refine-logs/EXPERIMENT_PLAN.md` and checklist/tracker |
| Experiment bridge/execution | Separate execution/evidence phase or plan when code/remote/GPU side effects begin | Code review record, sanity run evidence, raw logs/JSON/CSV, W&B IDs/URLs |
| Monitoring/analysis | Execution-monitor task and analysis task | `EXPERIMENT_LOG.md`, raw result files, analysis outputs with provenance |
| Experiment audit | Independent review/audit task | `EXPERIMENT_AUDIT.md` and `EXPERIMENT_AUDIT.json` |
| Auto review loop | Bounded reviewer loop with raw responses preserved | `AUTO_REVIEW.md`, `REVIEW_STATE.json`, reviewer provenance |
| Result-to-claim | Claim gate task producing yes/partial/no support | `CLAIMS_FROM_RESULTS.md` with audit impact and evidence links |
| Ablation planning | Reviewer-led task mapping component claims to tests | Ablation plan with expected outcomes and evidence requirements |

The preservation rule is semantic, not structural: Auto step names do not need to survive as GSD phase types. What must survive is the evidence, review, checkpoint, provenance, and claim integrity contract.

## 7. Preset, Gate, And Side-Effect Semantics

### Sourced facts

- Supported presets are `safe`, `auto`, and `danger-auto`; default is `safe`.
- All presets default to deep research and deep review.
- `safe` means deep research/review with human participation at important decisions and confirmation before external side effects.
- `auto` means deep research/review with automatic ordinary checkpoint handling, but it stops on blocking quality gates and requires preauthorization for external side effects.
- `danger-auto` means deep research/review plus maximum available automation permissions.
- `danger-auto` auto-approves ordinary checkpoints, auto-selects recommended decisions, overrides research quality gates with records, and executes all currently available side-effect capabilities without asking again once selected.
- Side-effect classes include git push, PR, GitHub operations, SSH, rsync/scp, remote commands, W&B, Modal, Vast.ai, local/remote GPU execution, reviewer APIs, notifications, and cleanup.
- `danger-auto` cannot fabricate missing credentials/platform access and must not falsely report clean completion when skipped/blocked/overridden.
- Required danger-auto artifacts include `RESEARCH_RUN_LOG.md`, `AUTHORIZATION_ACTIONS.json`, `DANGER_AUTO_OVERRIDES.md`, and `SIDE_EFFECTS.md` under the owning phase's `research/` root.

### Inferred recommendation

Use one gate-precedence contract:

```text
hard safety/auth boundary
  > preset policy
  > command-specific config
  > CLI override where allowed
  > ordinary checkpoint behavior
  > convenience defaults
```

Preset semantics should be expressed as compiled GSD checkpoint text plus phase-local audit artifacts:

| Preset | Research depth | Ordinary checkpoints | Blocking quality gates | External side effects | Completion label |
| --- | --- | --- | --- | --- | --- |
| `safe` | Deep | Human participates at important decisions | Stop and ask | Confirm before each class unless explicitly preauthorized | Clean only if evidence/gates pass |
| `auto` | Deep | Auto-handle ordinary checkpoints | Stop on blocking gates | Execute only preauthorized configured operations | Clean or degraded, never overridden |
| `danger-auto` | Deep | Auto-approve and auto-select recommendations | May override with explicit records where possible | Execute all available authorized capabilities once selected | Clean, degraded, provisional, overridden, or blocked; never falsely clean |

Side effects must be command-bound:

| Side-effect class | Allowed command families | Required record |
| --- | --- | --- |
| Git push / PR / GitHub operations | Execution, review, paper/future publication packs when authorized | `research/side-effects/SIDE_EFFECTS.md` plus command output/provenance |
| SSH / rsync / scp / remote commands | `experiment-bridge`, `run-experiment`, `monitor-experiment` | Host, command class, timestamps, return status, artifact paths |
| W&B | Execution/monitor/analyze commands | Run IDs/URLs, config snapshot, result files |
| Modal / Vast.ai / local or remote GPU | Execution commands only | Cost/instance info, job IDs, logs, cleanup result |
| Reviewer APIs/backends | Review, audit, novelty, auto-review-loop | Raw responses, provider, model/backend, timestamps |
| Notifications | Long-running execution/monitoring | Destination class, message summary, delivery status |
| Cleanup | Execution commands after runs | What was removed/stopped, what was preserved, failures |

Missing authorization behavior must be explicit: record missing credential/access/payment/login/API key/SSH reachability, degrade or skip only that operation when safe, block if required for the command goal, and mark downstream outputs accordingly.

## 8. Completion Semantics

### Sourced facts

- GSD false-completion controls include plan checker loop, planner source audit, post-merge test gate, summary spot-check, phase completeness check, verification patterns, UAT debt scan, state drift validation, and milestone audit.
- File existence, summaries, roadmap checkboxes, plan counts, `progress`, and `next` are advisory only.
- Research command completion requires raw evidence plus relevant review/verify/UAT gates.
- `idea-discovery` cannot complete from context/state/idea-report output alone; literature retrieval and reading evidence are mandatory.
- `danger-auto` completion must distinguish clean completion from overrides, provisional outputs, missing authorizations, or degraded paths.

### Inferred recommendation

Separate command evidence status from GSD phase completion:

| Status | Meaning | May complete GSD phase? |
| --- | --- | --- |
| `clean` | Required raw evidence exists, required reviews/audits pass or are non-blocking, verification/UAT accepted, side effects authorized and completed or not required | Yes, through ordinary GSD completion only |
| `degraded` | Non-critical side effect failed/skipped, fallback provider used, or optional evidence missing; required gates still pass | Maybe, if GSD review/verify accepts degradation explicitly |
| `provisional` | Evidence exists but confidence is limited, audit missing/failed in downgrade-only category, or reviewer coverage incomplete | Only if phase goal allows provisional outcome and UAT accepts it |
| `overridden` | `danger-auto` bypassed a quality gate with recorded override | No clean completion; may close only as overridden/provisional if ordinary GSD owner explicitly accepts |
| `blocked` | Required evidence, authorization, execution, review, audit, or UAT is missing/failed | No |

The phase-local `research/RESEARCH_INDEX.md` can state research evidence status, but only ordinary GSD review/verify/UAT and lifecycle transition can mark a phase complete. In particular:

- Literature tasks require retained source/query/reading evidence.
- Experiment tasks require raw JSON/CSV/log/W&B/job evidence, not terminal summaries alone.
- Claim tasks require audit impact and yes/partial/no claim mapping.
- Review tasks require raw reviewer output and provenance.
- Side-effect tasks require authorization/action records.
- Roadmap checkboxes and generated summaries never override these gates.

## 9. No-Phase-Type Proof

### Sourced facts

- Phase 01 closed the typed research phase direction: `phase_type`, typed routing, and broad phase schema changes are banned.
- Auto/ARIS source extraction found no `phase_type` references and describes Auto/ARIS as skill/command/artifact handoff, not typed phases.
- GSD already has phase, plan, task, checkpoint, artifact, review, and verification primitives.
- Research phase/plan granularity decisions say Auto internal Phase/Stage/Step labels must not mechanically become GSD roadmap phases.

### Inferred proof

No `phase_type` is needed because every research-specific decision can be represented by existing GSD primitives plus phase-local artifacts:

| Need | Existing representation | Why no `phase_type` is needed |
| --- | --- | --- |
| Identify a research phase | Phase title, `CONTEXT.md`, command provenance in `research/RESEARCH_INDEX.md` | Identification is descriptive, not routing state. |
| Select research behavior | Standalone command shim and compiler pack before planning | Command selection occurs at invocation time, not through phase schema dispatch. |
| Preserve Auto prompt semantics | Planning constraints, task text, artifact contracts, checkpoint text | Prompt semantics become ordinary GSD plan content. |
| Route execution | `PLAN.md` tasks, waves, dependencies, checkpoints, files modified | GSD already routes execution by plans/tasks. |
| Preserve evidence requirements | `research/RESEARCH_INDEX.md`, raw evidence files, review/audit artifacts | Evidence classification is local to the phase artifact root. |
| Handle side effects | Preset policy, command-specific side-effect adapter, GSD checkpoints | Authorization is a gate, not a phase type. |
| Complete work | Existing review/verify/UAT/transition lifecycle | Completion remains owned by GSD. |
| Support research-first roadmaps | Normal integer phases with research-centered titles and contexts | The roadmap goal can be research without schema typing. |
| Support insert mode | Existing decimal insertion semantics | Decimal numbering encodes insertion, not research type. |

Adding `phase_type` would create two risks without solving a required problem: it would invite typed routing that bypasses ordinary GSD lifecycle semantics, and it would expand the compatibility surface of `.planning/` files. The strict GSD-first proposal therefore bans `phase_type`, typed phase routing, broad phase schema expansion, and any second lifecycle/control-plane state.

## 10. Risks And Open Questions

### Sourced risks

- Upstream baseline divergence remains: reference source is `1.35.0`, installed runtime evidence reports `1.34.2`; implementation must verify source/package compatibility later.
- SDK scope is ambiguous and must be explicitly included, adapted, or deferred.
- Config reads can mutate files in upstream GSD, creating migration/sync risk.
- Installer/hook behavior is a compatibility boundary and should not be changed casually.
- Markdown `STATE.md` parsing/rebuild behavior is brittle; expanding state semantics would increase risk.
- Current ljx-GSD contains historical failure patterns and bridge-specific helpers that are quarantined.
- External services require credentials, platform access, payment setup, API keys, SSH access, or service authorization that may be absent.
- Dirty current repo means implementation should start later in a clean copy/worktree.

### Inferred risks

| Risk | Why it matters | GSD-first mitigation |
| --- | --- | --- |
| Compiler becomes a hidden lifecycle engine | Would violate GSD ownership and no-second-control-plane constraint | Compiler outputs phase/context/plan/artifact bundles only; canonical writes routed through GSD owner |
| `danger-auto` causes false completion | It may override gates or skip unavailable side effects | Mandatory override/authorization/side-effect artifacts and non-clean completion labels |
| Research artifacts become untracked state | Resume caches and indexes could start routing work | Keep them phase-local; classify as evidence/cache only; no lifecycle writes |
| Single-phase default creates oversized phases | Some pipelines are genuinely compound | Let ordinary planner recommend split for hard work-mode boundaries |
| Minimal adapter loses research integrity | Too little compiler behavior may omit evidence/gate semantics | Preserve explicit artifact contracts and review/checkpoint text even in strict GSD-first design |
| Hybrid support tools become control plane | Wiki/watchdog/reviewer overlays may accumulate routing state | Support tools are adapters; raw outputs feed GSD artifacts but never complete phases |
| SDK incompatibility later | CLI-only design might block SDK users | Keep compiler input/output contracts stable and SDK-adaptable, but do not make SDK lifecycle owner |
| Hook/git drift | Research commands may need push/PR/remote operations | Reuse ordinary GSD git discipline; add side-effect records, not new git semantics |
| Prompt-pack drift | Copying Auto prompt bodies would age badly | Source-index prompt packs and extract stable contracts only |

### Open questions for Round 2

- Should Round 2 choose reference `1.35.0` as baseline immediately, or require a reconciled diff policy before any design is considered stable?
- How small can the initial command surface be while still preserving the default pipeline: literature, idea, refinement, experiment planning, execution/evidence, audit, and result-to-claim?
- Should the initial `RESEARCH_INDEX.md` have a machine-readable sidecar, or is Markdown with embedded structured sections enough for v2.0 design?
- What side-effect classes are allowed in `auto` by default when preauthorized, and which should require explicit command-level authorization even in `danger-auto`?
- Should SDK support in v2.0 be a documented adapter target in Phase 02 or deferred entirely to implementation planning?

## 11. Recommendation For Round 2

### Sourced facts

- Round 1 must not declare the final target framework.
- Round 2 must cross-read all four proposals and revise the design space.
- Phase 02 context already strongly constrains the architecture toward a Research Command Compiler under upstream GSD lifecycle ownership.

### Inferred recommendation

Round 2 should select the strict GSD-first compiler as the controlling architecture and use the other lanes to harden its boundaries:

- Use the Research Command Compiler lane to define exact command-to-pack compilation contracts, not lifecycle ownership.
- Use the Minimal Adapter lane to prune implementation surface and identify the smallest viable artifact/config/prompt-pack layer.
- Use the Risk Register lane to stress-test `danger-auto`, external services, SDK/package drift, hook/git behavior, and false-completion cases.
- Keep upstream GSD lifecycle unchanged unless a later reviewed implementation phase proves a narrow compatibility adapter is required.
- Require all Round 2 designs to pass the no-`phase_type` proof: no typed routing, no broad phase schema expansion, no root Auto state authority, no research-owned canonical lifecycle writes, and no second control plane.

The strongest target stance is: research is a set of ordinary GSD phases, plans, tasks, evidence artifacts, review gates, and side-effect records produced by standalone compiler commands. GSD remains the lifecycle system.
