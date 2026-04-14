# Phase 03 Review Matrix

## Purpose

This matrix is the Phase 05 reviewer contract. It turns Phase 03 review rules into concrete dimensions, evidence expectations, probes, pass conditions, fail conditions, and clean-round blocking behavior.

## Matrix

| Dimension | Rules | Required evidence | Example probes | Pass condition | Fail condition | Blocks clean |
|---|---|---|---|---|---|---|
| GSD fidelity | R-01, R-03, R-08 | Target framework states GSD owns lifecycle, state, roadmap mutation, review, verify, and completion. | Search target docs for lifecycle owner, canonical writes, completion authority, progress/next limitations. | Research commands compile Auto/ARIS prompt obligations into ordinary GSD inputs and do not own lifecycle state. | Compiler/helper/index/cache can decide completion, mutate canonical lifecycle state directly, or introduce Auto/ARIS as a parallel framework. | Yes |
| No second control plane | R-02, R-13 | No-phase-type proof covers inserted command, research-first roadmap, root artifact adoption, and experiment boundaries. | Search for `phase_type`, typed routing, second state root, root Auto control state. | All research behavior is represented through phases, plans, tasks, and phase-local artifacts. | Any typed route, broad schema, root Auto authority, or second state/control plane appears. | Yes |
| Evidence-first completion | R-03, R-05, R-07 | Completion semantics name raw evidence, gates, labels, advisory-only signals, negative scenarios. | Check completion docs for clean/degraded/provisional/overridden/blocked and advisory-only lists. | Clean completion requires raw evidence plus accepted gates and GSD lifecycle acceptance. | Summary/checklist/file presence/PR/W&B/bridge-ready can produce clean completion. | Yes |
| Auto/ARIS capability preservation | R-04, R-12 | Command table marks keep/boundary/defer; prompt-pack contracts retain substantive obligations. | Compare claimed commands to Auto/ARIS source-index obligations from Phase 01. | Claimed capabilities retain literature/review/experiment/audit/claim obligations as GSD-owned prompt packs, artifacts, and gates, or are deferred honestly. | Thin wrappers preserve command names but drop upstream task depth, or Auto/ARIS is preserved as a separate authoritative file/framework system. | Yes |
| Historical regression | R-01 through R-15 | Historical bug map links reviewed surfaces to failure mechanisms. | For each major decision, ask which historical failure it prevents or whether it is new scope. | Known failure families are either blocked, tested, deferred, or explicitly out of scope. | Target framework recreates known false-completion, typed-routing, parser, state, prompt, or side-effect bugs. | Yes |
| Self-containment | R-11, R-12, R-13 | Prompt-pack registry and upgrade boundaries preserve source-indexed obligations and release blockers. | Inspect prompt-pack handling, package/install/hook boundaries, source/package mismatch handling. | Self-contained output keeps task obligations and records release blockers. | Self-contained generation deletes prompt obligations or claims release readiness before baseline reconciliation. | Yes |
| State/config/concurrency | R-06, R-08 | Separate research config, precedence, single-writer state model, lock/atomic-write requirements. | Check `.planning/research.config.json` semantics, unknown key policy, state ownership rules. | Config precedence is canonical and state writes are serialized through owners. | Conflicting presets/aliases/checkpoints or parallel canonical writes are allowed. | Yes |
| Git/hooks/artifacts | R-09, R-11 | Artifact contracts, regular-file/path safety, hook/install/package boundaries, git mutation discipline. | Search artifact specs for root adoption fields, side-effect status, git/hook constraints. | Evidence artifacts and generated runtime surfaces have explicit validation and ownership. | Directories/symlinks/stale paths can satisfy evidence; hooks/install output are assumed rather than tested. | Yes |
| Minimal modification | R-02, R-13 | Minimal adapter slice is named and GSD core rewrites are rejected. | Compare target framework to GSD-first and minimal-adapter proposals. | Research integration stays compiler/advisory-first and avoids broad schema changes. | Framework changes GSD core lifecycle where an adapter would suffice. | Yes |
| Upgradeability | R-11, R-13, R-15 | Baseline policy, SDK boundary, ljx-GSD quarantine, release blockers, scenario-test handoff. | Inspect upgrade boundary matrix and implementation sequence. | Implementation blockers are recorded before coding and release claims. | SDK/package/install/source drift is hidden until implementation or release. | Yes |
| Context hygiene | R-14 | Source traceability, proposal references, deferred/open decisions, context split across files. | Check large decisions for source family and unresolved items. | Docs are source-indexed and do not require one context window to hold everything. | Main synthesis invents unsupported consensus or buries open decisions. | Conditional |
| Review parser/accounting | R-10 | Phase 05 artifact schema, finding fields, severity/status normalization, clean-round accounting. | Check review plan/harness before Phase 05 starts. | Findings can be counted deterministically before clean rounds. | Parser/accounting rules change while clean streak is counted, or artifacts are unparseable. | Yes |
| Danger-auto and side effects | R-06, R-07, R-15 | Preset spec, authorization actions, override log, side-effect log, taint rules, missing auth behavior. | Probe safe/auto/danger-auto semantics and external side-effect vocabulary. | Broad permissions are paired with audit artifacts and no-false-clean rules. | `danger-auto` can skip, override, or fail external operations and still report clean. | Yes |
| Scenario readiness | R-15 | Phase 09 scenario coverage path for engineering lifecycle, research lifecycle, config/migration/concurrency, external services. | Check whether hard gates have planned negative and positive scenario tests. | Scenario work is deferred honestly but required before release readiness. | Framework implies release readiness without scenario probes for hard gates. | Conditional |

## Required Phase 05 Review Lanes

| Lane | Primary dimensions | Required output |
|---|---|---|
| GSD lifecycle reviewer | GSD fidelity, no second control plane, minimal modification | Findings against R-01, R-02, R-13. |
| Research capability reviewer | Auto/ARIS preservation, research handoff, claim/audit gating | Findings against R-04, R-05, R-12. |
| Completion and evidence reviewer | Evidence-first completion, danger-auto, false-completion scenarios | Findings against R-03, R-07, R-15. |
| State/config/concurrency reviewer | State/config/concurrency, single-writer, config precedence | Findings against R-06, R-08. |
| Artifacts/hooks/install reviewer | Git/hooks/artifacts, path safety, package/install/SDK boundary | Findings against R-09, R-11, R-13. |
| Historical regression reviewer | Historical regression, context hygiene, parser/accounting | Findings against R-10, R-14, and all historical map families. |

## Finding Format For Phase 05

Each finding should contain:

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Stable per round, such as `F05-R01-001`. |
| `severity` | Yes | P0, P1, P2, or P3. |
| `rule` | Yes | One or more rule ids from `03-REVIEW-RULES.md`. |
| `dimension` | Yes | Matrix dimension. |
| `evidence` | Yes | Exact file path and line/section if available. |
| `historical_failure` | Yes | Failure family or user-observed failure prevented. |
| `body` | Yes | Concrete explanation of the gap. |
| `required_change` | Yes for accepted findings | What target framework doc must change. |
| `status` | Yes | candidate, accepted, rejected, fixed, advisory. |

## Pass Conditions

Phase 05 can count a review round as clean only when:

- Every required lane ran or was explicitly marked not applicable with rationale.
- No accepted P0/P1/P2 findings remain.
- Advisory P3 findings do not hide hard-gate ambiguity.
- Matrix and parser/accounting rules were stable before the round started.
- Finding counts are deterministic from review artifacts.
- Any framework change from the previous round was re-reviewed by the affected lanes.

## Fail Conditions

Phase 05 must not count a review round as clean if:

- Any hard non-overridable gate is missing or ambiguous.
- A reviewer cannot determine completion semantics from the target docs.
- The framework relies on `phase_type`, typed routing, broad schema expansion, root Auto control state, or second control plane.
- The framework claims research capability without prompt/evidence obligations.
- `danger-auto` can produce clean completion after missing authorization, skipped operations, unknown side effects, or overrides.
- Review artifacts are unparseable or finding counts are ambiguous.

## Resolved Decisions From 03-02

- GSD remains the complete framework. Auto/ARIS is a prompt/orchestration overlay that compiles into GSD-owned phases, plans, artifacts, and gates.
- P2+ findings reset clean-round accounting by default unless explicitly downgraded, rejected, or accepted as advisory before the round result is counted.
- SDK stays inside artifacts/hooks/install review as a cross-cutting compatibility boundary unless Phase 05 finds material SDK/headless divergence.
- `danger-auto` hard-gate principles are fixed now; Phase 05 may refine subcategories, but weakening a hard gate resets clean-round accounting.
- Scenario readiness requires planned scenario coverage for hard gates, but full scenario execution blocks Phase 09/release readiness rather than Phase 05 static clean rounds.
