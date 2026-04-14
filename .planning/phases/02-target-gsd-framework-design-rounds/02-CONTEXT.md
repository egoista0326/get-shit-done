# Phase 02: Target GSD Framework Design Rounds - Context

**Gathered:** 2026-04-13
**Status:** Ready for planning
**Source:** User discussion after Phase 01 final synthesis

<domain>
## Phase Boundary

Phase 02 designs the target `gsd-framework`. It does not implement code, run the framework review loop, or derive historical review rules. Its job is to define how Auto/ARIS research capabilities become standalone `gsd` commands while preserving ordinary GSD lifecycle behavior.

The target framework must keep upstream GSD as the outer control plane. Research capabilities must be integrated through ordinary GSD roadmap phases, phase contexts, plans, tasks, artifacts, review gates, and verification. The framework must not introduce `phase_type`, typed phase routing, broad phase schema extensions, or a second authoritative control plane.

</domain>

<decisions>
## Implementation Decisions

### Architecture Direction

- **D-01:** Auto Research integration is a `Research Command Compiler`, not a GSD core rewrite and not a runtime overlay that owns lifecycle state.
- **D-02:** A research command reads research config, selects the relevant Auto/ARIS prompt pack, and compiles it into ordinary GSD roadmap/context/plan inputs.
- **D-03:** GSD remains responsible for discuss, plan, execute, review, verify, state, progress, and phase completion.
- **D-04:** Auto Research prompt content becomes phase context, planning constraints, artifact contracts, evidence requirements, review rules, and checkpoint text.
- **D-05:** Research commands must not directly own canonical lifecycle state writes. Canonical state writes remain owned by normal GSD lifecycle commands and lock/atomic-write paths.

### Phase Versus Plan Granularity

- **D-06:** Research commands default to generating one inserted GSD phase, not a mini-roadmap with many phases.
- **D-07:** Auto Research internal steps map to GSD `PLAN.md` files, tasks, checklists, artifacts, and checkpoints unless they represent true roadmap-level goal boundaries.
- **D-08:** The phase is the roadmap-level goal boundary. The plan is the executable breakdown. The task is the concrete execution unit.
- **D-09:** Do not mechanically map Auto Research skill sections named "Phase", "Stage", or "Step" into GSD roadmap phases. Those are Auto workflow internals.
- **D-10:** Strongly coupled research design content must remain in the same phase or plan. For experiment planning, metrics, dataset, split, baseline, method, success criteria, failure interpretation, run order, and must-run versus nice-to-have blocks must be reasoned about together.
- **D-11:** Multiple generated phases are allowed only for compound pipelines or hard work-mode boundaries, such as literature/idea work versus implementation/execution versus audit/claim gating.
- **D-12:** If a generated single phase is too large, the normal GSD planner may recommend a split. The split is a planner quality response, not a default compiler behavior.

### Roadmap Insertion Modes

- **D-13:** Existing-roadmap research commands use inserted decimal phases after the current completed phase.
- **D-14:** Decimal insertion preserves existing mainline phase numbering. Example: after Phase 08, insert Phase 08.1 rather than renumbering Phase 09 onward.
- **D-15:** Research-first roadmap generation uses normal integer phases, not decimal phases.
- **D-16:** Research-first mode applies when the project or milestone begins from a research command such as `gsd research-pipeline`, or when the user explicitly asks to build the roadmap around research.
- **D-17:** Insert mode applies when a research command is invoked inside an existing GSD roadmap after a current phase.

### Research Pipeline Scope

- **D-18:** The default v2.0 research pipeline covers literature, idea generation, novelty/refinement, experiment planning, experiment execution or evidence collection, experiment audit, and result-to-claim.
- **D-19:** Paper, rebuttal, slides, poster, camera-ready, and post-acceptance workflows are deferred from the default v2.0 pipeline.
- **D-20:** Paper/rebuttal capabilities can be preserved as future compiler packs, but Phase 02 should not make them default first-line research pipeline phases.

### Command Families

- **D-21:** Literature and idea commands should compile to one GSD phase by default: `research-lit`, `idea-creator`, `novelty-check`, `research-review`, `research-refine`, `idea-discovery`, and related pipeline wrappers.
- **D-22:** Experiment and claim commands should compile to one GSD phase by default unless they cross an execution/audit boundary: `experiment-plan`, `experiment-audit`, `result-to-claim`, `ablation-planner`, `analyze-results`, `auto-review-loop`, and related helpers.
- **D-23:** Execution commands such as `run-experiment`, `monitor-experiment`, and `experiment-bridge` may require separate phases when they switch from planning to code execution, remote execution, GPU usage, raw evidence collection, or audit/claim gates.
- **D-24:** Support tools such as research wiki, watchdog, reviewer overlays, arXiv, DeepXiv, Semantic Scholar, W&B, Modal, Vast.ai, Feishu/Lark notifications, and reviewer providers are support capabilities. They must not become a second roadmap or lifecycle control plane.

### Research Config

- **D-25:** Research configuration must be separate from upstream GSD `.planning/config.json` to avoid unknown-key drift and preserve upstream config compatibility.
- **D-26:** The preferred project-level config path is `.planning/research.config.json`.
- **D-27:** Research config is read by the Research Command Compiler, then compiled into GSD phase context, success criteria, artifact contracts, checkpoint behavior, and planner constraints.
- **D-28:** Research parameters are not passed raw into GSD core and do not require broad GSD config schema changes.
- **D-29:** Parameter precedence is CLI override > command-specific config > preset > built-in defaults.
- **D-30:** v2.0 should support presets in research config.

### Presets

- **D-31:** Supported presets are `safe`, `auto`, and `danger-auto`.
- **D-32:** The default preset is `safe`.
- **D-33:** All presets default to deep research and deep review. `auto` does not mean shallow or quick.
- **D-34:** `safe` means deep research/review with human participation at important decisions and confirmation before external side effects.
- **D-35:** `auto` means deep research/review with automatic ordinary checkpoint handling, but it stops on blocking quality gates and requires preauthorization for external side effects.
- **D-36:** `danger-auto` means deep research/review plus maximum available automation permissions.
- **D-37:** `danger-auto` auto-approves ordinary checkpoints, auto-selects recommended decisions, overrides research quality gates with records, and executes all currently available side-effect capabilities without asking again once selected.
- **D-38:** `danger-auto` should use the current environment's available permissions for git push, PR creation, GitHub operations, SSH, rsync/scp, remote commands, W&B, Modal, Vast.ai, local/remote GPU execution, reviewer APIs, notifications, and cleanup.
- **D-39:** `danger-auto` cannot fabricate missing credentials or platform access. If credentials, login, SSH access, payment setup, API key, or platform authorization are missing, it records the missing authorization and either degrades, skips that operation, or blocks that specific operation.
- **D-40:** `danger-auto` must not falsely report clean completion when an operation is skipped or blocked due to missing authorization or overridden quality gates.

### Preset Output And Audit Requirements

- **D-41:** Every `danger-auto` run must produce explicit audit artifacts for automated decisions, overrides, side effects, and missing authorizations.
- **D-42:** Required danger-auto audit artifacts include `RESEARCH_RUN_LOG.md`, `AUTHORIZATION_ACTIONS.json`, `DANGER_AUTO_OVERRIDES.md`, and `SIDE_EFFECTS.md` under the owning phase's `research/` root.
- **D-43:** If `danger-auto` overrides a quality gate, downstream artifacts must be marked as provisional, overridden, low-confidence, integrity-concern, or equivalent explicit status.
- **D-44:** `auto` and `danger-auto` may automatically execute external side effects when the environment is configured and authorized. The distinction is that `auto` stops on blocking quality gates while `danger-auto` records and continues where possible.

### First-Pass Parameters

- **D-45:** Preserve these first-pass parameters: `preset`, `effort`, `review_depth`, `auto_proceed`, `human_checkpoint`, `max_review_rounds`, `sources`, `max_literature_items`, `review_difficulty`, `score_threshold` or `novelty_threshold`, and `require_literature_evidence`.
- **D-46:** Defer or exclude default paper-stage parameters from the first-pass research config: venue, max pages, anonymity, DBLP/CrossRef citation policy, paper improvement rounds, rebuttal rounds, slides, poster, and camera-ready settings.
- **D-47:** GPU, W&B, SSH, Modal, Vast.ai, and other execution side-effect parameters should not pollute every research command. They belong to execution-related command packs and `danger-auto`/authorization behavior.

### Artifact Compatibility

- **D-48:** Authoritative research outputs live under the owning GSD phase directory at `.planning/phases/<phase>/research/`.
- **D-49:** Research docs must be GSD-compatible: Markdown for human-readable artifacts, JSON/JSONL for raw evidence and machine-readable state, clear status fields, evidence boundaries, and source/provenance links.
- **D-50:** Each research phase should include a `RESEARCH_INDEX.md` that tells GSD and downstream agents which files are required evidence, which are summaries, which are raw records, and which are provisional.
- **D-51:** Root Auto artifacts outside `.planning/` are import/export mirrors only unless explicitly adopted into the phase-local research root by a GSD command.

### Upstream Baseline And SDK

- **D-52:** Use the latest upstream source as the behavioral design baseline. Current Phase 01 evidence shows the local reference checkout is `get-shit-done-cc@1.35.0`, while npm latest is `1.34.2`; implementation must verify both source and install/package compatibility later.
- **D-53:** SDK support should be treated as a compatibility boundary but not as a blocker for the first research command compiler design. The framework should not intentionally prevent future SDK adaptation.

### Completion Semantics

- **D-54:** File presence, summaries, roadmap checkboxes, plan counts, `progress`, and `next` are advisory/cross-check signals only.
- **D-55:** Research command completion requires raw evidence plus relevant review/verify/UAT gates.
- **D-56:** `idea-discovery` cannot complete from context/state/idea-report output alone; literature retrieval and reading evidence are mandatory.
- **D-57:** `danger-auto` completion can be automated, but must distinguish clean completion from completion with overrides, provisional outputs, missing authorizations, or degraded paths.

### the agent's Discretion

- Exact JSON schema names for `.planning/research.config.json`, as long as the schema preserves the preset semantics above.
- Exact prompt-pack file naming, as long as prompt packs are source-indexed and not copied wholesale without provenance.
- Exact artifact filenames for non-required helper outputs, as long as `RESEARCH_INDEX.md` maps them clearly.
- Whether initial implementation uses direct command workflows or generated prompt-pack templates, as long as GSD core semantics remain unchanged.

</decisions>

<specifics>
## Specific Ideas

- The user described Auto Research as a higher-level caller that injects research-specific prompts into GSD phase/roadmap generation rather than modifying GSD internals.
- The user prefers single-phase default generation because GSD already has plan/task granularity and because splitting experiment design across phases can break continuity.
- For experiment planning, metrics, concrete method, dataset, baselines, and evaluation design should stay together.
- Research-first roadmap mode should use normal integer phases because the whole roadmap is research-centered.
- `danger-auto` should match the maximum-permission spirit of GSD/Auto Research automation, including push, PR, W&B, SSH, remote execution, Modal, Vast.ai, and similar side effects when available.

</specifics>

<canonical_refs>
## Canonical References

Downstream agents MUST read these before planning or proposing the target framework.

### Phase 01 Framework Outputs

- `.planning/phases/01-source-framework-extraction/01-FRAMEWORK-SYNTHESIS.md` — Final Phase 01 synthesis and framework rules.
- `.planning/phases/01-source-framework-extraction/01-CROSS-FRAMEWORK-GAP-MAP.md` — Phase 02 design gaps and later-phase risks.
- `.planning/phases/01-source-framework-extraction/01-GSD-FRAMEWORK.md` — Upstream GSD lifecycle, runtime, artifact, state, and ownership model.
- `.planning/phases/01-source-framework-extraction/01-GSD-UPGRADE-BOUNDARIES.md` — Upstream baseline, package, config, SDK, state, and upgrade risks.
- `.planning/phases/01-source-framework-extraction/01-AUTO-FRAMEWORK.md` — Auto/ARIS workflow families and integration stance.
- `.planning/phases/01-source-framework-extraction/01-AUTO-ARTIFACT-CONTRACTS.md` — Research artifact classes, evidence contracts, and phase-local root model.
- `.planning/phases/01-source-framework-extraction/01-AUTO-PARAMETER-MAP.md` — Extracted Auto parameters and continuation rules.
- `.planning/phases/01-source-framework-extraction/01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md` — Capability preservation, gate precedence, and external-service policy inputs.
- `.planning/phases/01-source-framework-extraction/01-LJX-HISTORY-FAILURE-TAXONOMY.md` — Historical failure patterns to avoid.
- `.planning/phases/01-source-framework-extraction/01-LJX-REUSE-OR-DISCARD-MATRIX.md` — Current ljx-GSD salvage/quarantine guidance.

### Upstream GSD Workflow And Runtime References

- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/discuss-phase.md` — Phase context capture semantics.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/plan-phase.md` — Phase-to-plan planning semantics.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/execute-phase.md` — Plan wave execution and checkpoint handling.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/execute-plan.md` — Task execution, checkpoints, commits, and deviations.
- `.planning/references/upstreams/get-shit-done/get-shit-done/references/checkpoints.md` — Auto-mode checkpoint semantics and human-action boundaries.
- `.planning/references/upstreams/get-shit-done/get-shit-done/references/gates.md` — GSD gate taxonomy.
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/phase.cjs` — Plan inventory, wave grouping, summary detection, decimal phase support.
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/roadmap.cjs` — Roadmap analysis and phase disk status semantics.
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/config.cjs` — GSD config known-key behavior and unknown-key risks.
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/lib/schema-detect.cjs` — Example of automated/destructive schema push gate behavior.
- `.planning/references/upstreams/get-shit-done/get-shit-done/templates/phase-prompt.md` — Plan/task/checkpoint structure and user_setup semantics.

### Auto/ARIS Skill References

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/research-lit/SKILL.md` — Literature search, source selectors, evidence requirements.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/idea-discovery/SKILL.md` — Full idea discovery workflow and prompt-pack source.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/idea-creator/SKILL.md` — Idea generation, filtering, pilot, and ranking structure.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/novelty-check/SKILL.md` — Novelty check workflow and report shape.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/research-refine/SKILL.md` — Problem-anchor refinement loop and review rounds.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/research-refine-pipeline/SKILL.md` — Combined refinement and experiment planning flow.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/experiment-plan/SKILL.md` — Claim-driven experiment plan structure.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/experiment-bridge/SKILL.md` — Implementation/execution bridge and external service behavior.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/run-experiment/SKILL.md` — Remote/GPU/Vast/Modal/W&B/git side-effect behavior.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/monitor-experiment/SKILL.md` — Monitoring and result collection behavior.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/analyze-results/SKILL.md` — Result analysis expectations.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/experiment-audit/SKILL.md` — Integrity audit workflow and JSON/Markdown outputs.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/result-to-claim/SKILL.md` — Result-to-claim gate and routing.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/ablation-planner/SKILL.md` — Ablation planning workflow.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/auto-review-loop/SKILL.md` — Bounded review loop, reviewer difficulty, and stop predicate.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/serverless-modal/SKILL.md` — Modal execution, cost estimation, and cleanup behavior.

### Project-Level Constraints

- `.planning/PROJECT.md` — v2.0 core value, locked constraints, v1.4 pivot status, and active milestone decisions.
- `.planning/REQUIREMENTS.md` — ARCH requirements for Phase 02 and later research command requirements.
- `.planning/ROADMAP.md` — Phase 02 success criteria and downstream phase boundaries.
- `.planning/STATE.md` — Current project state and Phase 02 readiness.

</canonical_refs>

<code_context>
## Existing Code Insights

### GSD Phase/Plan Mechanics

- GSD phase directories can represent integer and decimal phases.
- `PLAN.md` files are the executable units under a phase. They carry `wave`, `depends_on`, `files_modified`, `autonomous`, `must_haves`, XML tasks, verification criteria, and checkpoint tasks.
- `execute-phase` dispatches plan waves and uses `SUMMARY.md` files to determine plan completion.
- The existing GSD structure supports fine-grained task breakdown inside a single phase, so research command compiler should avoid over-splitting roadmap phases.

### Config Risk

- Current GSD config validation warns on unknown keys. Research config should be separate from `.planning/config.json` unless Phase 02 later designs a reviewed compatibility adapter.

### Existing Decimal Phase Support

- GSD has an `insert-phase` workflow for decimal phases. Research insert mode should reuse or adapt that semantic instead of inventing a second insertion model.

</code_context>

<deferred>
## Deferred Ideas

- Paper/rebuttal/slides/poster/camera-ready compiler packs are deferred from the default v2.0 research pipeline.
- Full SDK integration is deferred but must remain compatible with future adaptation.
- Exact implementation of prompt-pack storage, command wrappers, config parser, and artifact indexer belongs to later implementation phases after framework review.
- Detailed historical review rules belong to Phase 03, not Phase 02.
- Framework review/fix rounds belong to Phase 04, not Phase 02.
- Clean repo/worktree implementation belongs to Phase 05 and later.

</deferred>

---

*Phase: 02-target-gsd-framework-design-rounds*
*Context gathered: 2026-04-13*
