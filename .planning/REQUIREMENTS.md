# Requirements: gsd

**Defined:** 2026-04-13
**Current Milestone:** v2.0 Framework-First GSD Rebuild
**Core Value:** GSD should remain a reliable phase/milestone control plane while gaining research-native commands that produce evidence, artifacts, reviews, and papers without creating a second workflow system or changing the core phase schema.

## Milestone Scope

v2.0 rebuilds from a framework-first process. It does not continue the v1.4 ljx-GSD review loop. It starts with source framework extraction, target framework design, historical-bug review rules, implementation-feasibility and boundary research, final pre-implementation framework review, and only then implementation from a clean implementation workspace after explicit upstream GSD baseline import.

## Requirements

### Pivot And Reset

- [x] **PIVOT-01**: Current v1.4 progress is preserved as `pivoted_not_shipped`, not as a shipped milestone.
- [x] **PIVOT-02**: Old phase directories and phase records are archived outside active `.planning/phases/` and `.planning/state/phase-records/`.
- [x] **PIVOT-03**: v2.0 resets active phase numbering to Phase 01.

### Framework Extraction

- [x] **FRAME-01**: The project has a source-indexed upstream GSD framework covering workflows, skills, hooks, helpers, subagents, templates, config, state, git, tests, package behavior, generated surfaces, and update boundaries.
- [x] **FRAME-02**: The project has a source-indexed current ljx-GSD/history framework covering implementation, generated skills, tests, docs, archived milestone artifacts, review artifacts, and failure patterns.
- [x] **FRAME-03**: The project has a source-indexed Auto/ARIS framework covering research workflows, artifacts, parameters, tools/MCP/support assets, Codex variants, review loops, experiments, claims, papers, and rebuttals.
- [x] **FRAME-04**: Framework extraction is split into isolated subagent lanes and separate output files so no single context window must hold all source systems.
- [x] **FRAME-05**: Long prompt bodies may be summarized only when exact source indexes identify where the full upstream prompt content lives.
- [x] **FRAME-06**: Phase 01 uses exactly one subagent build round, three subagent review rounds, and one main-agent final check; if subagent capacity is insufficient, missing lanes are run in later batches rather than handled by the main agent.

### Target Framework

- [x] **ARCH-01**: The target `gsd-framework` keeps upstream GSD as the outer lifecycle/control-plane base.
- [x] **ARCH-02**: Auto/ARIS capabilities are exposed as standalone `gsd` commands.
- [x] **ARCH-03**: Standalone research commands execute through ordinary GSD phases plus narrow research artifact conventions.
- [x] **ARCH-04**: The target framework does not add `phase_type`, typed phase routing, or broad phase schema changes.
- [x] **ARCH-05**: The target framework documents command surface, runtime helpers, state ownership, hooks, subagent roles, artifact contracts, config semantics, git behavior, and upgrade boundaries.
- [x] **ARCH-06**: Target framework proposals go through independent subagent proposal rounds, cross-read revised proposals, and main-agent synthesis before user approval.
- [x] **ARCH-07**: Completion semantics treat summaries and roadmap checkboxes as cross-check/advisory only; raw evidence, review, verification/UAT, disk state, and explicit acceptance decide completion.

### Review Rules, Feasibility, And Final Framework Review

- [x] **RULE-01**: Review rules are derived from historical docs, bug ledgers, failed scenario reviews, and user-observed failures before any framework review loop begins.
- [x] **RULE-02**: Review rules explicitly cover GSD fidelity, Auto/ARIS capability preservation, historical-bug regression, self-containment, state/config/concurrency, git/hooks/artifacts, minimal modification, upgradeability, and context hygiene.
- [x] **RULE-03**: The review rules are discussed with the user before Phase 05 framework review starts.
- [x] **FEAS-01**: Before coding, implementation feasibility research identifies the concrete module, entrypoint, hook, generated-skill, config/state, repo-copy, and upstream-reuse approach for turning the approved framework into code.
- [x] **FREV-01**: Final framework review uses specialized reviewer lanes and main-agent second-pass confirmation; subagents are an execution option only when explicitly authorized or available.
- [x] **FREV-02**: Accepted findings include severity, confirmation evidence, framework modification plan, and verification notes.
- [x] **FREV-03**: Final framework review exits early after two consecutive rounds with no accepted P0/P1/P2 findings.
- [x] **FREV-04**: Final framework review stops at 15 rounds if the clean-round condition is not met and reports capped state honestly.

### Implementation Boundaries

- [x] **IMPL-01**: Implementation boundaries are documented before coding, including repo-copy location, branch policy, copy/reuse strategy, state ownership, config semantics, git behavior, hooks, and review commands.
- [x] **IMPL-02**: A clean implementation workspace handoff is created before implementation edits begin, with repo initialization, branch creation, and upstream GSD baseline import gated to Phase 06.
- [x] **IMPL-03**: Implementation starts from upstream GSD copy/reuse where practical rather than greenfield reconstruction.
- [x] **IMPL-04**: Current ljx-GSD code is reused only where the final pre-implementation framework review identifies it as safe and minimal.

### Core GSD Parity

- [x] **CORE-01**: The new implementation preserves ordinary upstream GSD lifecycle behavior before research integration.
- [x] **CORE-02**: New project, new milestone, discuss, plan, execute, progress, next, pause/resume, code-review, code-review-fix, verify, workstreams/workspaces, roadmap mutation, and git behavior remain GSD-compatible.
- [x] **CORE-03**: Research integration does not change ordinary GSD phase schema or normal engineering workflows.
- [x] **CORE-04**: Authoritative state writes are serialized or protected against parallel overwrite races.
- [x] **CORE-05**: Canonical lifecycle state has a single writer per operation; subagents and helper commands route canonical updates through that owner and lock/atomic-write path.

### Research Command Integration

- [ ] **RSCH-01**: Auto/ARIS-style idea discovery is available through a standalone `gsd` command and produces traceable evidence artifacts before completion.
- [ ] **RSCH-02**: Literature, novelty, and refinement workflows preserve Auto/ARIS evidence and review depth while using GSD artifact/state/git discipline.
- [ ] **RSCH-03**: Experiment planning, execution bridge, audit, and result analysis preserve Auto/ARIS capability without launching expensive/external services without policy-compliant confirmation.
- [ ] **RSCH-04**: Review loop, result-to-claim, claim gate, ablation, paper, and rebuttal workflows preserve Auto/ARIS quality gates and provenance.
- [ ] **RSCH-05**: Research commands write normal GSD artifacts plus research-specific evidence files; they do not rely on `phase_type`.
- [ ] **RSCH-06**: Research commands do not create a second state root or treat root Auto artifacts as authoritative control state.
- [ ] **RSCH-07**: Authoritative research command outputs live under `.planning/phases/<phase>/research/`; root Auto artifacts are import/export mirrors only until adopted.
- [ ] **RSCH-08**: `idea-discovery` cannot complete from context/state/idea-report output alone; it requires retained literature retrieval/reading evidence.
- [ ] **RSCH-09**: `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, review-loop stop predicates, reviewer backend fallback, and external-service policy follow one canonical precedence contract.

### Scenario And Cutover

- [ ] **SCEN-01**: Scenario harness covers engineering lifecycle end-to-end.
- [ ] **SCEN-02**: Scenario harness covers research lifecycle from idea to paper.
- [ ] **SCEN-03**: Scenario harness covers autoProceed/stop-boundary behavior, checkpoint precedence, reviewer backend fallback, safe/autonomous config, external-service confirmation matrix, pause/resume, workstreams/workspaces, migration, and concurrent write prevention.
- [ ] **CUT-01**: Packaging and install output are self-contained and do not require globally installed upstream GSD or Auto/ARIS.
- [ ] **CUT-02**: Final verification requires tests, scenario probes, review gates, docs, generated output, and state artifacts to agree before any shipped claim.

## Future Requirements

- Optional provider-specific research/review backends can be added only after the base GSD framework is stable.
- Standalone research commands can expand after they prove they reuse the same internal artifact/state conventions and do not become a second control plane.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Continuing v1.4 ljx-GSD review by default | v1.4 is pivoted_not_shipped and no longer the investment target |
| `phase_type` or typed phase routing | Previous approach had too much blast radius |
| Broad phase-record schema expansion for research | Violates minimal modification and upstream GSD compatibility |
| Greenfield research orchestrator | The rebuild must start from GSD and integrate research minimally |
| Raw Auto root artifacts as authoritative state | Would recreate a second control plane |
| Global cutover before final review | Cutover must wait for framework, implementation, scenario, and packaging verification |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PIVOT-01 | Pre-milestone | Completed |
| PIVOT-02 | Pre-milestone | Completed |
| PIVOT-03 | Pre-milestone | Completed |
| FRAME-01 | Phase 01 | Completed |
| FRAME-02 | Phase 01 | Completed |
| FRAME-03 | Phase 01 | Completed |
| FRAME-04 | Phase 01 | Completed |
| FRAME-05 | Phase 01 | Completed |
| FRAME-06 | Phase 01 | Completed |
| ARCH-01 | Phase 02 | Completed |
| ARCH-02 | Phase 02 | Completed |
| ARCH-03 | Phase 02 | Completed |
| ARCH-04 | Phase 02 | Completed |
| ARCH-05 | Phase 02 | Completed |
| ARCH-06 | Phase 02 | Completed |
| ARCH-07 | Phase 02 | Completed |
| RULE-01 | Phase 03 | Completed |
| RULE-02 | Phase 03 | Completed |
| RULE-03 | Phase 03 | Completed |
| FEAS-01 | Phase 04 | Completed |
| IMPL-01 | Phase 04 | Completed |
| IMPL-02 | Phase 04 | Completed |
| FREV-01 | Phase 05 | Completed |
| FREV-02 | Phase 05 | Completed |
| FREV-03 | Phase 05 | Completed |
| FREV-04 | Phase 05 | Completed |
| IMPL-03 | Phase 06 | Completed |
| IMPL-04 | Phase 05 | Completed |
| CORE-01 | Phase 07 | Completed |
| CORE-02 | Phase 07 | Completed |
| CORE-03 | Phase 07 | Completed |
| CORE-04 | Phase 07 | Completed |
| CORE-05 | Phase 07 | Completed |
| RSCH-01 | Phase 08 | Planned |
| RSCH-02 | Phase 08 | Planned |
| RSCH-03 | Phase 08 | Planned |
| RSCH-04 | Phase 08 | Planned |
| RSCH-05 | Phase 08 | Planned |
| RSCH-06 | Phase 08 | Planned |
| RSCH-07 | Phase 08 | Planned |
| RSCH-08 | Phase 08 | Planned |
| RSCH-09 | Phase 08 | Planned |
| SCEN-01 | Phase 09 | Planned |
| SCEN-02 | Phase 09 | Planned |
| SCEN-03 | Phase 09 | Planned |
| CUT-01 | Phase 10 | Planned |
| CUT-02 | Phase 10 | Planned |

---
*Requirements defined: 2026-04-13*
