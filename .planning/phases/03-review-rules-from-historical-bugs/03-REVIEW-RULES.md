# Phase 03 Review Rules

## Purpose

These rules define how Phase 05 reviews the Phase 02 target framework.

They are historical-bug-derived rules, not generic best practices. A Phase 05 review finding should cite the violated rule, the target-framework evidence, and the historical failure mechanism it prevents.

## Severity Defaults

| Severity | Meaning | Clean-round effect |
|---|---|---|
| P0 | Framework would recreate a known false-completion, second-control-plane, data-loss, unsafe side-effect, or unrecoverable state bug. | Blocks clean round. |
| P1 | Framework leaves a high-risk lifecycle, evidence, config, research, state, or review gate ambiguous enough to likely fail implementation. | Blocks clean round. |
| P2 | Framework has a concrete gap that can cause drift, missed evidence, weak prompt fidelity, or untestable behavior. | Blocks clean round unless explicitly downgraded with rationale. |
| P3 | Advisory improvement, wording clarification, or future implementation note that does not affect gate correctness. | Does not block clean round if recorded as advisory. |

## Blocking Rule Families

### R-01: GSD Lifecycle Fidelity

**Default severity:** P1
**Blocks clean:** Yes

The target framework must preserve ordinary GSD lifecycle ownership for project, milestone, roadmap, phase, plan, execution, review, verify/UAT, progress, next, pause/resume, workstream/workspace, git, and completion operations.

Review must reject:

- Research commands owning canonical roadmap mutation or lifecycle completion.
- Helper context, `next`, bridge-ready reports, or phase inventory output implying completion.
- Lifecycle behavior that differs for research phases without an ordinary GSD representation.
- Auto/ARIS docs, files, artifact roots, or control state becoming an authoritative framework beside GSD.

Required evidence:

- Target framework states GSD remains lifecycle/control-plane owner.
- Research command outputs are ordinary phase/context/plan inputs or advisory artifacts.
- Completion authority is not delegated to compiler, helper, index, or cache output.
- Auto/ARIS obligations are represented as prompt packs, config inputs, phase-local artifact contracts, and GSD-owned gates rather than a separate framework.

### R-02: No Second Control Plane And No Typed Phase Routing

**Default severity:** P0
**Blocks clean:** Yes

The target framework must not introduce `phase_type`, typed routing, typed phase chains, broad phase schema expansion, root Auto control state, or a second roadmap/state owner.

Review must reject:

- Any `phase_type` field or alias.
- Research-specific lifecycle router that bypasses ordinary GSD phase/plan execution.
- Root Auto artifacts used as authoritative lifecycle state.
- Compiler-owned state that determines completion or next action.

Required evidence:

- No-phase-type compatibility proof covers inserted research commands, research-first roadmaps, root artifact adoption, and experiment boundaries.
- Research artifacts are phase-local and advisory unless imported through GSD lifecycle.

### R-03: Evidence-First Completion

**Default severity:** P0 for false clean, P1 for ambiguity
**Blocks clean:** Yes

Clean completion requires raw evidence plus relevant review/verify/UAT gates and explicit GSD lifecycle acceptance.

Review must reject clean completion from:

- Summaries.
- Roadmap checkboxes.
- File presence.
- Skeletons.
- Plan counts.
- `progress`.
- `next`.
- PR links.
- W&B URLs.
- Bridge-ready reports.
- Caches.
- Backfilled baseline artifacts.

Required evidence:

- Completion labels distinguish clean, degraded, provisional, overridden, blocked, missing authorization, and backfill-non-execution.
- Required evidence classes are named per command family.
- Negative false-completion scenarios are explicit.

### R-04: Research Capability Preservation

**Default severity:** P1
**Blocks clean:** Yes

Standalone research commands must preserve Auto/ARIS task obligations for the capabilities they claim.

Review must reject:

- Thin command wrappers that preserve names but lose literature reading, idea generation, review, novelty, experiment planning, audit, result-to-claim, or claim-gate obligations.
- Preserving Auto/ARIS by importing its docs/file hierarchy as authoritative instead of compiling source-indexed obligations into GSD prompt packs and phase-local artifacts.
- `idea-discovery` completion without literature retrieval/reading evidence.
- Paper/rebuttal capability claims before those packs are implemented or explicitly deferred.

Required evidence:

- Command surface marks keep, boundary, and defer statuses honestly.
- Prompt-pack handling preserves source-indexed obligations without copying unstable prompt bodies blindly.
- Auto/ARIS preservation is evaluated by retained research semantics under GSD ownership, not by creating an Auto-owned lifecycle or file system.
- Deferred paper/rebuttal packs are not included in clean v2.0 default capability claims.

### R-05: Research Chain Handoff And Claim/Audit Gating

**Default severity:** P1
**Blocks clean:** Yes

Research commands that feed downstream claims must define producer, consumer, inputs, outputs, artifact root, handoff evidence, freshness, audit state, and downgrade/block semantics.

Review must reject:

- Supported claims without phase-local evidence lineage.
- Paper/rebuttal readiness with missing, root-only, stale, or unresolved experiment audit.
- Stage handoff that depends on untracked root artifacts or implicit context.

Required evidence:

- `RESEARCH_INDEX.md` maps artifacts to evidence classes and completion labels.
- Claim and paper readiness are blocked or downgraded when audit lineage is missing.

### R-06: Config, Preset, And Authorization Coherence

**Default severity:** P1
**Blocks clean:** Yes

Research config must use one precedence contract:

CLI > command config > preset > built-in defaults.

Review must reject:

- Research config keys in upstream `.planning/config.json` without an explicit GSD-owned schema decision.
- Conflicting `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, preset, reviewer fallback, rerun, or external-service policy semantics.
- Unknown config keys silently changing behavior.

Required evidence:

- `.planning/research.config.json` is separate from `.planning/config.json`.
- `safe`, `auto`, and `danger-auto` all default to deep research and deep review.
- Unknown-key behavior is warn-and-ignore by default and fail-closed in strict mode.

### R-07: Danger-Auto Auditability And Taint

**Default severity:** P0 for missing audit on side effects, P1 for unclear semantics
**Blocks clean:** Yes

`danger-auto` may maximize currently available authorized capabilities, but it must not produce dishonest clean completion.

Review must reject:

- `danger-auto` side effects without run log, authorization actions, override log, side-effect log, and completion status.
- Clean completion after missing credentials, skipped required operations, unknown side effects, or overridden gates.
- Broad permission language without phase-local audit artifacts.

Required evidence:

- `danger-auto` audit files are phase-local.
- Overridden gates propagate taint to downstream outputs.
- Hard non-overridable gates are separated from overridable research-quality gates.

### R-08: State Ownership And Single-Writer Semantics

**Default severity:** P1
**Blocks clean:** Yes

Canonical state writes must have one owner per operation and must use lock/atomic-write or equivalent serialized mutation.

Review must reject:

- Parallel subagents writing canonical `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, or completion state.
- Derived mirrors being treated as canonical state.
- Partial mutation without rollback or explicit degraded status.

Required evidence:

- Compiler and helpers write advisory artifacts only unless routing through GSD owner paths.
- Canonical state, derived mirrors, imported mirrors, and control-state caches are separated.

### R-09: Artifact And Path Safety

**Default severity:** P1
**Blocks clean:** Yes

Evidence and release artifacts must be regular files when file evidence is required, and path containment must not rely on unsafe prefix matching.

Review must reject:

- Directory-as-file evidence.
- Symlink or dangling-link evidence where regular files are required.
- Stale or sibling-prefix paths treated as project-relative.
- Root artifacts adopted without provenance fields.

Required evidence:

- Artifact contracts name type expectations.
- Root Auto adoption records source path, adoption mode, evidence class, timestamp, and status.

### R-10: Review Artifact Parser And Accounting Stability

**Default severity:** P1
**Blocks clean:** Yes

Review artifacts must be parseable enough that blocker/advisory counts are deterministic before clean rounds count.

Review must reject:

- Unstructured findings that cannot be counted.
- Finding heading aliases without normalization.
- Clean-round claims where parser/accounting rules changed mid-round.
- Review summaries that lack accepted/rejected finding state.

Required evidence:

- Phase 05 review harness defines accepted finding schema, severity, status, evidence, and fix verification fields.
- Clean rounds only count after matrix and parser rules are frozen.

### R-11: Git, Hook, Install, And Adapter Conformance

**Default severity:** P1 for release-impacting drift, P2 otherwise
**Blocks clean:** Yes for P1/P2

Generated hooks, install output, adapter text, cwd propagation, package behavior, and generated skill surfaces must match the target framework.

Review must reject:

- Hook assumptions that are not tested against generated output.
- CLI or generated skill instructions that mention unsupported adapter behavior.
- Package/install claims before source/package baseline is reconciled.

Required evidence:

- Upgrade boundary records source/package mismatch and release blockers.
- SDK is a compatibility boundary, not lifecycle owner.

### R-12: Self-Containment And Prompt Fidelity

**Default severity:** P1
**Blocks clean:** Yes

Self-contained GSD output must not delete upstream GSD or Auto/ARIS semantic obligations.

Review must reject:

- Prompt packs that summarize away mandatory task stages without source-indexed provenance.
- Generated commands that only call helpers and omit planning/review/evidence obligations.
- Capability claims unsupported by prompt-pack contracts.

Required evidence:

- Prompt-pack registry keeps source path, summarized obligations, required artifacts, gates, and deferred scope.

### R-13: Minimal Modification And Upgradeability

**Default severity:** P1 for broad schema/lifecycle changes, P2 for unclear boundaries
**Blocks clean:** Yes for P1/P2

Implementation design must preserve upstream GSD compatibility and avoid copying ljx-GSD historical defects.

Review must reject:

- GSD core rewrites where a compiler/advisory layer is sufficient.
- ljx-GSD helper reuse without quarantine criteria.
- SDK or package changes that become implicit release blockers.

Required evidence:

- Minimal adapter slice is explicit.
- ljx-GSD reuse is blocked until quarantine review.
- Release blockers are named before implementation.

### R-14: Context Hygiene And Source Traceability

**Default severity:** P2 when unsupported design risk exists, P3 otherwise
**Blocks clean:** Conditional

Framework decisions must be traceable without requiring one context window to hold all historical and source systems.

Review must reject:

- Major decisions with no source family.
- Long prompt summaries without source indexes.
- Stale labels that misrepresent review status.

Required evidence:

- Framework docs cite proposal rounds, Phase 01 synthesis, and historical failure maps.
- Unsupported items are marked deferred or open.

### R-15: Scenario Coverage As A Release Boundary

**Default severity:** P1 for missing hard-gate scenario plan, P2/P3 otherwise
**Blocks clean:** Conditional

Static review is necessary but not sufficient for release readiness.

Review must reject:

- External side-effect commands without scenario-test plan.
- Safe/auto/danger-auto semantics without scenario probes.
- Completion checker without false-completion negative tests.

Required evidence:

- Phase 09 scenario coverage is planned for engineering lifecycle, research lifecycle, config/migration/concurrency, and external-service boundaries.

## Clean-Round Accounting

A Phase 05 review round counts as clean only if:

- The review matrix and parser/accounting rules were frozen before the round started.
- No accepted P0/P1/P2 findings remain.
- No hard blocker is deferred as advisory.
- No clean-completion claim depends on summaries, checkboxes, file presence, skeletons, plan counts, `progress`, `next`, PR links, W&B URLs, bridge-ready reports, caches, or backfills.
- `danger-auto` did not override a gate or skip required operations for the reviewed claim.
- Required evidence paths are source-traceable and not stale.

If Phase 05 changes the review matrix materially, the clean streak resets unless the change is explicitly marked advisory and non-blocking.

## Hard Non-Overridable Gates

The following gates cannot be overridden by `danger-auto` for clean completion:

- Missing raw evidence for claimed research completion.
- Missing phase-local audit lineage for supported claims or paper readiness.
- Reintroduction of `phase_type`, typed routing, broad phase schema expansion, or second control plane.
- Missing side-effect audit for external operations.
- Missing authorization for required external side effects.
- Unparseable review artifact used as clean evidence.
- Canonical state write ownership ambiguity.

## Advisory Signals

The following may guide review but cannot independently prove clean completion:

- A roadmap checkbox is checked.
- A summary exists.
- `phase-plan-index` shows a summary.
- A PR or W&B URL exists.
- `next` recommends a route.
- A helper reports bridge-ready or context-ready.
- A root Auto artifact exists.

## Phase 05 Handoff

Phase 05 reviewers should report each finding with:

- Rule id.
- Severity.
- Evidence path.
- Historical failure family.
- Accepted/rejected recommendation.
- Required framework change.
- Verification needed after the change.
