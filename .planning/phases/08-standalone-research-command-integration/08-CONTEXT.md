# Phase 08: Standalone Research Command Integration - Context

**Gathered:** 2026-04-14
**Status:** Superseded where it mentions compiler/config/helper implementation; current Phase 08 route is the Phase 08.1 thin Markdown overlay.

**2026-04-15 supersession note:** This context file is retained for historical decisions and constraints, but any instruction to build a research compiler, helper modules, prompt-pack runtime, side-effect classifier, or `.planning/research.config.json` is superseded. Current work uses self-contained `commands/gsd/ljx-*.md` Markdown sources that install as `gsd-ljx-*` skills and route work through ordinary GSD phases, plans, reviews, docs, validation, and verification.

<domain>
## Phase Boundary

Phase 08 exposes Auto/ARIS-style research capabilities as standalone `gsd` commands while keeping ordinary GSD as the lifecycle owner. The current implementation is a thin Markdown overlay: each command explains GSD phase construction, prompt obligations, artifact contracts, review requirements, side-effect boundaries, and phase-local research outputs.

This phase must not turn Auto/ARIS into a second framework. It must not add `phase_type`, typed phase routing, a second roadmap, a second state root, or a second completion authority. GSD remains responsible for roadmap mutation, phase insertion, planning, execution, review, verification, UAT, progress, and canonical state writes.

</domain>

<decisions>
## Implementation Decisions

### Lifecycle ownership and naming
- **D-08-01:** GSD remains fully preserved as the underlying lifecycle/control-plane system. Auto/ARIS is only a prompt/artifact instruction layer that asks GSD to create and execute ordinary work.
- **D-08-02:** New public Auto/ARIS research commands must use the `/gsd-ljx-*` prefix to avoid future name confusion and to make the overlay easy to search and distinguish.
- **D-08-03:** `/gsd-ljx-*` is an ownership marker only. It does not authorize a separate lifecycle, separate state system, or direct mutation of canonical GSD files.
- **D-08-04:** The implementation should call existing GSD lifecycle surfaces, especially phase insertion, planning, execution, review, verification, workspace, workstream, and git helpers, rather than reimplementing them.

### Implementation shape
- **D-08-05:** Superseded by Phase 08.1. Use the thin Markdown overlay approach: command sources are self-contained `commands/gsd/ljx-*.md` files, with no research compiler, helper runtime, resolved research config, or shared research workflow.
- **D-08-06:** Follow minimum-change, simple-change, and no-wheel-reinvention rules. Production changes should be narrow and should reuse upstream GSD command/workflow/helper patterns wherever practical.
- **D-08-07:** Do not modify GSD core behavior unless an implementation blocker proves it is unavoidable. If a core change appears necessary, it must be isolated, justified, reviewed, and verified as preserving ordinary GSD behavior.
- **D-08-08:** `ljx-gsd` has low implementation reference value. It may be used as historical regression evidence only, not as a structural reuse source.

### Command family scope
- **D-08-09:** Discovery, literature, novelty, and refinement commands should be functional first-pass Markdown guidance commands. They must create GSD-native phase/plan/evidence requirements and must preserve raw literature, reading, novelty, reviewer, and refinement evidence.
- **D-08-10:** `idea-discovery` cannot clean-complete from context/state/idea-report output alone. It requires retained literature retrieval and reading evidence before completion can be treated as clean.
- **D-08-11:** Experiment planning, audit, result analysis, and claim commands should be functional first-pass Markdown guidance commands, but external execution remains explicit-authorization-only in this phase.
- **D-08-12:** Paper, rebuttal, and ablation commands are in roadmap scope, but first-pass implementation should stay minimal: Markdown command source, artifact contract, and GSD phase/plan guidance. Full paper/rebuttal production depth should not expand Phase 08 beyond the thin overlay contract.
- **D-08-13:** Existing-roadmap invocation inserts research work after the current phase by default. Research-first pipeline invocation uses normal integer roadmap phases rather than decimal insertion, because the whole roadmap is research-centered.
- **D-08-14:** Research commands should default to one inserted phase with plan/task/checkpoint decomposition. Multiple phases are allowed only for real GSD work-mode boundaries, not because Auto/ARIS source prompts contain multiple stages.

### Config and presets
- **D-08-15:** Superseded by Phase 08.1. Do not create `.planning/research.config.json` or a config-driven research runtime.
- **D-08-16:** Preserve preset-like concepts as written instructions only when useful; do not implement a config system in Phase 08.
- **D-08-17:** Review depth, review caps, novelty scoring, claim support categories, artifact expectations, and authorization boundaries live in Markdown commands and GSD plans.
- **D-08-18:** Hard gates are enforced by ordinary GSD review/verification and the command instructions, not by a separate research config precedence engine.
- **D-08-19:** Research overlay settings must not mutate upstream GSD config.

### Side-effect policy and bridge
- **D-08-20:** Phase 08 first pass handles external side effects as policy/bridge/evidence only. It must not actually run GPU jobs, W&B logging, SSH sessions, Modal/Vast jobs, paid compute, remote cleanup, PR creation, push, or publishing from a research command.
- **D-08-21:** Policy/bridge means the command may generate execution instructions, command blocks, environment and credential checklists, preauthorization records, side-effect plans, and `research/` evidence records for attempted, skipped, blocked, or pending operations.
- **D-08-22:** If a required external operation is not executed because Phase 08 only supports bridge mode, clean completion must be blocked or labeled degraded. Bridge-ready is not completion.
- **D-08-23:** `danger-auto` may compile maximum-authority intent and record available authorization, but missing credentials, unknown side effects, skipped required operations, destructive risks, payment/budget risks, or overridden gates still block clean completion.
- **D-08-24:** This policy applies to research-command side effects. Normal development actions by the implementation agent, such as committing and pushing Phase 08 code/docs when requested, are outside the research-command runtime contract.

### Artifact and evidence contract
- **D-08-25:** Phase-local research output root remains `.planning/phases/<phase>/research/`.
- **D-08-26:** First-pass authoritative evidence ledger is `research/RESEARCH_INDEX.md`.
- **D-08-27:** Do not implement a mandatory JSON evidence state first. A JSON mirror may be added later only if tests or deterministic checks prove it is needed; if added, it must be a mirror of evidence status, not lifecycle state.
- **D-08-28:** `RESEARCH_INDEX.md` is not lifecycle state. It cannot complete a phase, route `next`, mutate roadmap status, or override GSD verify/UAT.
- **D-08-29:** `RESEARCH_INDEX.md` must map required evidence, raw records, summaries, reviews, audits, side-effect records, imports, exports, missing evidence, taint/degraded status, and completion-relevant labels.
- **D-08-30:** Root Auto/ARIS artifacts remain import/export mirrors until explicitly adopted into the phase-local research root with provenance, freshness, validation, and conflict handling recorded.
- **D-08-31:** Research artifact path safety must validate canonical resolved paths under the owning phase's `research/` root. String-prefix checks are not enough. Symlink evidence is rejected by default unless an evidence class explicitly allows it and records why.

### Review discipline for Phase 08 implementation
- **D-08-32:** Review should be frequent: run a review checkpoint after every meaningful implementation slice or task, not only at the end of the phase.
- **D-08-33:** Review should use multiple subagents focused on separate dimensions when implementation begins. Required dimensions are GSD lifecycle compatibility, Auto/ARIS prompt preservation, minimal/reuse/no-wheel discipline, evidence/completion correctness, config/gate/side-effect policy, and tests/integration.
- **D-08-34:** When subagents return findings, the main agent must second-pass verify each finding before changing code. Only confirmed findings become accepted findings.
- **D-08-35:** Review loops continue until two consecutive clean rounds. A clean round means no main-agent-confirmed actionable finding that must be fixed before proceeding.
- **D-08-36:** Accepted P0/P1/P2 findings block clean rounds by default. P3 findings are advisory unless the main agent confirms they affect correctness, safety, minimality, or user-stated constraints.
- **D-08-37:** Each plan should set an explicit review-round cap before execution. If no stronger phase-specific cap is chosen, use 10 rounds; if the cap is reached without two consecutive clean rounds, stop as capped-not-clean rather than claiming completion.

### Agent discretion
- Exact command file names under the `/gsd-ljx-*` prefix may be refined during planning as long as they remain searchable and map cleanly to roadmap requirements.
- The planner may choose exact command document boundaries, provided they stay thin and avoid duplicating GSD lifecycle logic.
- The planner may decide whether a phase-local JSON artifact is useful for a specific research output, but no JSON mirror can become lifecycle state.
- The planner may choose exact review lane labels, but must preserve the multi-dimensional review coverage and main-agent second-pass confirmation requirement.

</decisions>

<specifics>
## Specific Ideas

- The user's model is: Auto/ARIS sits above GSD and injects research-specific prompts into GSD phase/roadmap construction, rather than replacing GSD internals.
- A `gsd-ljx-idea-discovery` style command should effectively compile literature-reading, idea production, novelty checking, and review prompts into GSD-owned work.
- For existing roadmaps, research work is usually inserted at the current position after a phase completes.
- For research pipeline project creation, phase numbers should be normal `01`, `02`, `03` style phases because the whole roadmap is research-centered.
- Experiment planning should avoid over-splitting phases because metrics, methods, datasets, baselines, and interpretation need to stay connected.
- The user wants frequent review, multiple subagent dimensions, main-agent confirmation before fixes, and two clean rounds before accepting implementation slices.

</specifics>

<canonical_refs>
## Canonical References

Downstream agents MUST read these before planning or implementing Phase 08.

### Current superseding references
- `.planning/phases/08.1-rewrite-auto-aris-research-integration-as-thin-installable-s/08.1-RESEARCH.md` - Current thin Markdown overlay decision and discarded runtime surfaces.
- `.planning/phases/08-standalone-research-command-integration/08-VALIDATION.md` - Current validation architecture for thin overlay tests and review.
- `.planning/phases/08-standalone-research-command-integration/08-RESEARCH-COMMAND-PARITY.md` - Current command coverage and deferred behavior.
- `.planning/phases/08-standalone-research-command-integration/08-SECURITY.md` - Current side-effect and security boundary.

### Project control docs
- `.planning/PROJECT.md` - Current project framing and core value.
- `.planning/REQUIREMENTS.md` - RSCH-01 through RSCH-09 requirements.
- `.planning/ROADMAP.md` - Phase 08 scope and plan breakdown.
- `.planning/STATE.md` - Current phase state, accumulated decisions, residual UAT debt, and workspace boundary.

### Framework decisions
- `.planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md` - Historical compiler-under-GSD architecture; superseded by Phase 08.1 where it requires compiler/config/helper runtime.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md` - Historical research config/preset semantics; superseded by Phase 08.1 for Phase 08 implementation.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md` - Explicit rejection of `phase_type`, typed routing, second control plane, and second state root.
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md` - Implementation feasibility, boundary, and reuse/copy decisions.
- `.planning/phases/05-final-target-framework-review-loop/05-FINAL-REVIEW-DECISION.md` - Final reviewed framework approval, accepted finding families, and implementation-start contract.
- `.planning/phases/07-core-gsd-lifecycle-parity/07-CORE-PARITY-REVIEW.md` - Phase 07 parity evidence and Phase 08 boundary guard.
- `.planning/phases/07-core-gsd-lifecycle-parity/07-SECURITY.md` - Security verification result with zero open threats.
- `.planning/phases/07-core-gsd-lifecycle-parity/07-UAT.md` - UAT evidence and skipped-unresolved verification debt.

### Existing upstream implementation surfaces
- `commands/gsd/research-phase.md` - Existing upstream standalone research-phase command baseline, not Auto/ARIS integration.
- `get-shit-done/workflows/research-phase.md` - Existing upstream research workflow baseline.
- `commands/gsd/insert-phase.md` - GSD phase insertion command surface to reuse rather than reimplement.
- `get-shit-done/bin/gsd-tools.cjs` - Lifecycle helper entrypoint.
- `get-shit-done/bin/lib/phase.cjs` - Phase lookup/insertion/indexing helper surface.
- `get-shit-done/bin/lib/state.cjs` - Canonical state helper surface and locking behavior.
- `get-shit-done/bin/lib/verify.cjs` - Verification helper surface.
- `get-shit-done/bin/lib/workstream.cjs` - Workstream helper surface.
- `get-shit-done/templates/config.json` - Upstream GSD config template and allowed workflow keys.

### Existing test surfaces
- `tests/core-lifecycle-planning-parity.test.cjs` - Phase 07 lifecycle/planning parity probes.
- `tests/core-review-workspace-git-parity.test.cjs` - Phase 07 review/workspace/git parity probes.
- `tests/core-gsd-parity-scenario.test.cjs` - Integrated core GSD parity scenario.
- `tests/foundation-boundaries.test.cjs` - Foundation boundary tests for config/template/source contamination/typed routing.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `commands/gsd/*.md` command files can host thin `/gsd-ljx-*` command wrappers with minimal new syntax.
- `get-shit-done/workflows/*.md` workflows can hold prompt-level orchestration without adding runtime lifecycle branches.
- `get-shit-done/bin/gsd-tools.cjs` and `get-shit-done/bin/lib/*.cjs` provide existing lifecycle helper paths for phase insertion, state, verification, workstreams, and commits.
- Existing upstream `research-phase` command/workflow is a baseline GSD research command, not a replacement for the Auto/ARIS compiler.
- Existing parity tests provide templates for asserting that Phase 08 calls GSD-owned surfaces and does not mutate canonical files directly.

### Established Patterns
- Existing GSD helper code is CommonJS under `get-shit-done/bin/lib/`, but Phase 08 thin overlay work should not add research helper modules.
- Commands are Markdown prompt files under `commands/gsd/`; Phase 08 Auto/ARIS research behavior belongs in self-contained `commands/gsd/ljx-*.md` sources.
- Tests use Node's built-in `node:test` runner and temporary project fixtures.
- Canonical state writes should go through helper code with locks/atomic writes rather than ad hoc file edits.
- Planning artifacts under `.planning/` are committed on this implementation branch even when upstream GSD would normally ignore local planning state.

### Integration Points
- New public research command sources belong under `commands/gsd/ljx-*.md` and should remain self-contained Markdown guidance.
- Do not add research compiler/config/evidence helpers, shared research workflows, prompt-pack registries, side-effect classifiers, or `.planning/research.config.json` for Phase 08.
- New tests should live under `tests/` and should prove absence of `phase_type`, absence of second lifecycle state, absence of old research runtime/config surfaces, phase-local research artifact containment, side-effect authorization boundaries, and idea-discovery evidence gating.
- Phase-local runtime artifacts created by research commands belong under `.planning/phases/<phase>/research/`, not root Auto/ARIS directories.

</code_context>

<deferred>
## Deferred Ideas

- Actual execution of GPU, W&B, SSH, Modal, Vast.ai, paid compute, remote cleanup, PR creation, push, publishing, or other external side effects from research commands is deferred until scenario coverage and policy tests exist.
- Full paper/rebuttal automation beyond thin Markdown guidance remains deferred; if reopened, it should start as a new explicit GSD phase decision rather than restoring prompt-pack, compiler, helper, or config-driven behavior by default.
- Mandatory JSON evidence ledger is deferred. Add only if deterministic tests require it, and only as a non-authoritative mirror.
- Provider-specific reviewer credentials/backends and external provider runtime integration remain deferred unless required for bridge-policy records.
- Phase 07 skipped UAT checks remain visible verification debt via `/gsd-audit-uat`; they are not resolved by Phase 08 discussion.

</deferred>

---

*Phase: 08-standalone-research-command-integration*
*Context gathered: 2026-04-14*
