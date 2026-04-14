# Roadmap: gsd

## Overview

v2.0 is a framework-first rebuild. The old ljx-GSD line is archived as `pivoted_not_shipped`; the active roadmap resets to Phase 01. The rebuild keeps upstream GSD as the outer control-plane base, exposes Auto/ARIS capabilities as standalone `gsd` commands, and integrates those commands through ordinary GSD phases plus phase-local research artifact conventions. It explicitly forbids `phase_type`, typed phase routing, and broad phase schema changes.

## Milestones

- [x] **v1.0: Runtime Unification And Migration Cutover** - Historical ljx-GSD milestone archived on 2026-04-12. See `.planning/milestones/v1.0-ROADMAP.md` and `.planning/milestones/v1.0-REQUIREMENTS.md`.
- [x] **v1.4: Self-Contained Runtime And Scenario Review** - Pivoted, not shipped. See `.planning/milestones/v1.4-PIVOT-SNAPSHOT-2026-04-13.md` and `.planning/milestones/v1.4-pivoted_not_shipped-ARCHIVE-MANIFEST.md`.
- [ ] **v2.0: Framework-First GSD Rebuild** - Active. Starts from Phase 01 after archiving old phase dirs and records.

## Phases

- [x] **Phase 01: Source Framework Extraction** - Build source-indexed frameworks for upstream GSD, current ljx-GSD/history, and Auto/ARIS through one subagent build round, three subagent review rounds, and one main-agent final check.
- [x] **Phase 02: Target GSD Framework Design Rounds** - Design the target framework through independent proposals, cross-read revisions, and main-agent synthesis.
- [x] **Phase 03: Review Rules From Historical Bugs** - Derive and discuss review rules before the final framework review loop starts.
- [x] **Phase 04: Implementation Feasibility, Boundaries, And Repo Copy Strategy** - Research how the approved framework maps into concrete implementation surfaces, define boundaries, and prepare the clean implementation workspace.
- [x] **Phase 05: Final Target Framework Review Loop** - Completed clean after final pre-implementation framework review and implementation-start decision.
- [x] **Phase 06: Foundation From Upstream GSD** - Build the smallest runnable GSD base from upstream GSD reuse/copy.
- [x] **Phase 07: Core GSD Lifecycle Parity** - Preserve ordinary GSD lifecycle behavior before research integration. (completed 2026-04-14)
- [ ] **Phase 08: Standalone Research Command Integration** - Expose Auto/ARIS capabilities as standalone `gsd` commands backed by ordinary GSD phases and artifact conventions.
- [ ] **Phase 09: Scenario And Regression Harness** - Build scenario probes for engineering and research workflows.
- [ ] **Phase 10: Cutover, Packaging, And Final Verification** - Prepare install, docs, migration/cutover, and final verification.

## Phase Details

### Phase 01: Source Framework Extraction

**Goal**: Deeply read upstream GSD, current ljx-GSD/history, and Auto/ARIS, then produce durable framework documents that become the source material for target architecture.
**Depends on**: Nothing; v1.4 has been pivoted and archived.
**Requirements**: [FRAME-01, FRAME-02, FRAME-03, FRAME-04, FRAME-05, FRAME-06]
**Success Criteria** (what must be TRUE):
  1. Upstream GSD framework has source indexes for workflows, skills, helpers, hooks, state, config, git, subagents, tests, and install/update behavior.
  2. Current ljx-GSD/history framework captures implementation shape, failure taxonomy, reusable/discardable pieces, review artifacts, and user-observed failures.
  3. Auto/ARIS framework captures workflow capabilities, artifact contracts, parameters, tools, Codex variants, and preservation requirements.
  4. Extraction outputs are split by source system and sub-lane so context windows stay clean.
  5. Phase 01 follows exactly one subagent build round, three subagent review rounds, and one main-agent final check.
  6. Missing subagent capacity is handled by later batches; the main agent does not replace a missing source-reading or review lane.
**Plans**: 5 plans

Plans:
- [x] 01-01: Run subagent build round and synthesize initial source frameworks
- [x] 01-02: Run subagent review round 1 for source coverage and index completeness
- [x] 01-03: Run subagent review round 2 for cross-framework consistency and minimal-interference fit
- [x] 01-04: Run subagent review round 3 for historical-bug regression and context hygiene
- [x] 01-05: Perform main-agent final check and Phase 01 acceptance decision

### Phase 02: Target GSD Framework Design Rounds

**Goal**: Design how research becomes standalone `gsd` commands backed by ordinary GSD phases plus narrow research artifact conventions while preserving ordinary GSD as much as possible.
**Depends on**: Phase 01
**Requirements**: [ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05, ARCH-06, ARCH-07]
**Success Criteria** (what must be TRUE):
  1. Independent subagent proposals compare GSD-first, adapter, and hybrid designs against the extracted frameworks.
  2. Revised proposals cross-read all first-round reports and converge on a minimal-modification design.
  3. Main-agent synthesis produces a target `gsd-framework` with command surface, runtime, state ownership, artifacts, config, git, hooks, subagents, and upgrade boundaries.
  4. The framework proves it does not require `phase_type`, typed phase routing, or broad phase schema changes.
  5. Completion semantics distinguish raw evidence and independent gates from summaries, roadmap checkboxes, and file presence.
**Plans**: 3 plans

Plans:
- [x] 02-01: Run independent target-framework proposal round
- [x] 02-02: Run cross-read revised proposal round
- [x] 02-03: Synthesize target framework and no-phase-type compatibility note

### Phase 03: Review Rules From Historical Bugs

**Goal**: Read historical milestone docs and produce review rules before the final framework review loop.
**Depends on**: Phase 02
**Requirements**: [RULE-01, RULE-02, RULE-03]
**Success Criteria** (what must be TRUE):
  1. Review rules explicitly derive from v1.1-v1.4 bug ledgers, scenario reviews, and user-observed failures.
  2. Review matrix covers GSD fidelity, Auto/ARIS capability preservation, self-containment, state/config/concurrency, git/hooks/artifacts, minimal modification, upgradeability, and context hygiene.
  3. User discusses and accepts the review rules before Phase 05 begins.
**Plans**: 2 plans

Plans:
- [x] 03-01: Produce historical-bug review rules and review matrix
- [x] 03-02: Discuss and finalize review stop gates

### Phase 04: Implementation Feasibility, Boundaries, And Repo Copy Strategy

**Goal**: Research the concrete implementation approach, define boundaries, and prepare the clean implementation workspace before the final pre-implementation framework review.
**Depends on**: Phase 03
**Requirements**: [FEAS-01, IMPL-01, IMPL-02]
**Success Criteria** (what must be TRUE):
  1. Feasibility study maps target framework responsibilities to concrete modules, entrypoints, hooks, helpers, generated-skill surfaces, config/state owners, and risky gaps.
  2. Implementation boundaries document copy/reuse strategy, branch policy, naming, source ownership, state ownership, config semantics, git behavior, hooks, and review commands.
  3. Clean implementation workspace handoff exists and is recorded before implementation edits begin, with repo initialization and upstream baseline import gated to Phase 06.
**Plans**: 3 plans

Plans:
- [x] 04-01: Research concrete implementation feasibility and build strategy
- [x] 04-02: Define implementation boundaries and candidate copy/reuse plan
- [x] 04-03: Create clean implementation workspace handoff and record feasibility handoff

### Phase 05: Final Target Framework Review Loop

**Goal**: Run the final pre-implementation review loop over the target framework, using Phase 04 feasibility outputs as additional evidence.
**Depends on**: Phase 04
**Requirements**: [FREV-01, FREV-02, FREV-03, FREV-04, IMPL-04]
**Success Criteria** (what must be TRUE):
  1. Each review round has specialized reviewer lanes and main-agent confirmation of accepted findings.
  2. Accepted findings include severity, evidence, fix plan, framework update, verification notes, and feasibility impact when relevant.
  3. The loop exits after two consecutive clean rounds or reports capped state honestly after 15 rounds.
  4. Current ljx-GSD reuse candidates are approved only where the final review marks them safe and minimal.
**Plans**: 3 plans

Plans:
- [x] 05-01: Prepare final pre-implementation review harness and reviewer lane prompts
- [x] 05-02: Run bounded framework review/fix rounds with feasibility inputs (completed clean after Round 09 and Round 10)
- [x] 05-03: Produce final reviewed framework and implementation-start decision record

### Phase 06: Foundation From Upstream GSD

**Goal**: Build the smallest runnable GSD base by copying/reusing upstream GSD with minimal behavior changes.
**Depends on**: Phase 05
**Requirements**: [IMPL-03]
**Success Criteria** (what must be TRUE):
  1. Package/install/build system runs from the clean implementation copy.
  2. Core generated skill/runtime entrypoints resolve without raw external dependency on current ljx-GSD.
  3. Config loader, state helpers, hook assets, and test harness preserve upstream GSD behavior where possible.
**Plans**: 3 plans

Plans:
- [x] 06-01: Copy/reuse upstream GSD package and build substrate
- [x] 06-02: Establish config, state, hook, and generated skill foundation
- [x] 06-03: Run foundation review and verification

### Phase 07: Core GSD Lifecycle Parity

**Goal**: Preserve ordinary GSD behavior before research integration.
**Depends on**: Phase 06
**Requirements**: [CORE-01, CORE-02, CORE-03, CORE-04, CORE-05]
**Success Criteria** (what must be TRUE):
  1. New project, milestone, discuss, plan, execute, progress, next, pause/resume, code-review, code-review-fix, verify, workstreams, workspaces, roadmap mutation, and git behavior remain GSD-compatible.
  2. No research integration changes ordinary phase schema or normal engineering workflows.
  3. Authoritative state writes are serialized or protected against overwrite races.
  4. Canonical lifecycle state has one writer per operation, and all subagent/helper updates route through that owner.
**Plans**: 3 plans

Plans:
- [x] 07-01: Preserve core lifecycle and planning commands
- [x] 07-02: Preserve code-review/code-review-fix/verify/workstream/workspace/git behavior
- [x] 07-03: Run core GSD parity review and scenario probe

### Phase 08: Standalone Research Command Integration

**Goal**: Expose Auto/ARIS capabilities as standalone `gsd` commands while executing them through ordinary GSD phases plus narrow research artifact conventions.
**Depends on**: Phase 07
**Requirements**: [RSCH-01, RSCH-02, RSCH-03, RSCH-04, RSCH-05, RSCH-06, RSCH-07, RSCH-08, RSCH-09]
**Success Criteria** (what must be TRUE):
  1. Research commands cover idea discovery, literature/novelty, refinement, experiment plan/bridge/audit, review loop, result-to-claim, claim gate, paper/rebuttal, and ablation/result analysis.
  2. Research commands produce evidence artifacts before completion and use GSD-like git/review/verify discipline when mutating project artifacts.
  3. Research commands do not use `phase_type`, typed phase routing, or root Auto artifacts as authoritative control state.
  4. Research commands write authoritative outputs under `.planning/phases/<phase>/research/`, with root Auto artifacts only as import/export mirrors.
  5. `idea-discovery` requires literature retrieval/reading evidence before completion.
  6. `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, reviewer fallback, and external-service policy use one canonical precedence contract.
**Plans**: 4 plans

Plans:
- [ ] 08-01: Implement discovery/literature/novelty/refinement command family
- [ ] 08-02: Implement experiment/audit/result/claim command family
- [ ] 08-03: Implement paper/rebuttal/ablation command family
- [ ] 08-04: Run research command parity and lifecycle integration review

### Phase 09: Scenario And Regression Harness

**Goal**: Build scenario probes that exercise both ordinary engineering and research workflows before claiming readiness.
**Depends on**: Phase 08
**Requirements**: [SCEN-01, SCEN-02, SCEN-03]
**Success Criteria** (what must be TRUE):
  1. Scenario harness covers engineering lifecycle end-to-end.
  2. Scenario harness covers research lifecycle from idea to paper.
  3. Scenario harness covers autoProceed, checkpoint precedence, stop-boundary behavior, reviewer fallback, safe/autonomous config, external-service confirmation matrix, pause/resume, workstreams/workspaces, migration, and concurrent write prevention.
**Plans**: 3 plans

Plans:
- [ ] 09-01: Build engineering lifecycle scenario harness
- [ ] 09-02: Build research lifecycle scenario harness
- [ ] 09-03: Build config/migration/concurrency scenario probes

### Phase 10: Cutover, Packaging, And Final Verification

**Goal**: Prepare the new `gsd` implementation for installation/use without relying on current ljx-GSD or raw upstream skills.
**Depends on**: Phase 09
**Requirements**: [CUT-01, CUT-02]
**Success Criteria** (what must be TRUE):
  1. Install output and generated skills are self-contained.
  2. Docs and migration/cutover guide match implemented behavior.
  3. Tests, scenario probes, review gates, generated output, docs, and state artifacts all agree before any shipped claim.
**Plans**: 3 plans

Plans:
- [ ] 10-01: Prepare packaging and install self-containment
- [ ] 10-02: Write migration/cutover docs and release notes
- [ ] 10-03: Run final verification and milestone closure decision

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 01. Source Framework Extraction | 5/5 | Completed | 2026-04-13 |
| 02. Target GSD Framework Design Rounds | 3/3 | Completed | 2026-04-14 |
| 03. Review Rules From Historical Bugs | 2/2 | Completed | 2026-04-14 |
| 04. Implementation Feasibility, Boundaries, And Repo Copy Strategy | 3/3 | Completed | 2026-04-14 |
| 05. Final Target Framework Review Loop | 3/3 | Completed | 2026-04-14 |
| 06. Foundation From Upstream GSD | 3/3 | Completed | 2026-04-14 |
| 07. Core GSD Lifecycle Parity | 3/3 | Completed | 2026-04-14 |
| 08. Standalone Research Command Integration | 0/4 | Planned | - |
| 09. Scenario And Regression Harness | 0/3 | Planned | - |
| 10. Cutover, Packaging, And Final Verification | 0/3 | Planned | - |
