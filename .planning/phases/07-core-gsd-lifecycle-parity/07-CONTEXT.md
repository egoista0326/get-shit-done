# Phase 07: Core GSD Lifecycle Parity - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 07 verifies that the copied upstream GSD foundation remains a reliable ordinary GSD lifecycle control plane before any Auto/ARIS research command integration begins.

This phase is not an upstream GSD bug-hunt and not a GSD improvement phase. It validates integration readiness for the new implementation workspace: ordinary GSD commands, workflows, helpers, state/roadmap mutation paths, review/verify gates, workstreams/workspaces, and git behavior must remain usable as the substrate that future research commands call.

Research command implementation remains out of scope for this phase. Phase 08 owns Auto/ARIS command/compiler/config/artifact integration.

</domain>

<decisions>
## Implementation Decisions

### Parity Meaning And Depth

- **D-01:** Phase 07 validates target integration readiness, not upstream GSD correctness. Pure upstream bugs are not in scope unless they are caused by this import/adaptation or block a GSD lifecycle surface that Phase 08 must call.
- **D-02:** Phase 07 should not improve, redesign, or refactor upstream GSD for quality. It should preserve upstream-compatible behavior first and record residual upstream risks separately.
- **D-03:** Verification depth should be contract/smoke oriented: prove key lifecycle surfaces exist, route correctly, and can be invoked in the implementation workspace without breaking planning/state semantics.
- **D-04:** Existing upstream tests remain useful evidence, but Phase 07 should add only focused parity probes where they protect the future Auto/ARIS overlay path or current workspace adaptation risk.

### Plan-Level Scope Split

- **D-05:** Keep Phase 07 as one roadmap phase with three plans. Do not split lifecycle parity into many roadmap phases.
- **D-06:** Use plan-level decomposition for the work: 07-01 covers lifecycle/planning command parity, 07-02 covers review/verify/workstream/workspace/git behavior, and 07-03 performs final parity review and scenario probing.
- **D-07:** State ownership, roadmap mutation, and concurrency protection are cross-cutting acceptance criteria across 07-01, 07-02, and 07-03, not a separate phase.
- **D-08:** Avoid overfragmenting parity checks. Many surfaces interact: execute writes summaries and state, progress reads roadmap/state, next depends on verification/UAT debt, and workstreams affect transition behavior.

### GSD Lifecycle Mutation As Future Research Integration Path

- **D-09:** Future Auto/ARIS commands must call GSD lifecycle mutation surfaces instead of directly writing canonical lifecycle files.
- **D-10:** For inserted research work inside an existing roadmap, the future Auto/ARIS layer should call GSD insert-phase behavior, then compile research prompt obligations into ordinary GSD phase context, plans, tasks, artifacts, and gates.
- **D-11:** Auto/ARIS helpers may compute, summarize, or seed phase-local advisory artifacts, but canonical `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase completion, roadmap mutation, and progress remain owned by GSD lifecycle commands/helpers.
- **D-12:** Phase 07 should verify the ordinary GSD mutation surfaces needed by Phase 08, especially phase insertion, roadmap analysis/update behavior, state record/update behavior, progress/next routing, and phase directory resolution.

### Research Boundary Protection

- **D-13:** Phase 07 may acknowledge upstream GSD `research-phase`, `gsd-phase-researcher`, `workflow.research`, and SDK research gate behavior as baseline upstream lifecycle features.
- **D-14:** Phase 07 must not implement Auto/ARIS research command integration, research compiler adapter code, `.planning/research.config.json` loader behavior, prompt-pack registry, phase-local research artifact writer, danger-auto audit behavior, or external side-effect execution policy.
- **D-15:** Phase 07 should distinguish upstream baseline research features from new Auto/ARIS command surfaces in scans/reviews so upstream `research-phase` is not treated as evidence that Phase 08 implementation has started.
- **D-16:** Phase 07 should include a guard that prevents accidental introduction of Phase 08 command families such as idea discovery, literature/novelty/refinement, experiment/audit/result/claim, paper/rebuttal, and ablation/result-analysis commands.

### Auto/ARIS Command Naming

- **D-17:** Future newly added Auto/ARIS research commands should use the public prefix `/gsd-ljx-*` to avoid confusion with upstream GSD command names and upstream `research-phase` behavior.
- **D-18:** The `/gsd-ljx-*` prefix is a searchability and ownership marker only. It does not imply a second framework, second lifecycle, second state root, or permission to bypass GSD lifecycle ownership.
- **D-19:** When implementation begins, generated command filenames and skill names may follow runtime conventions, but the user-facing command surface should stay recognizably `/gsd-ljx-*` for new Auto/ARIS capabilities.

### the agent's Discretion

- Exact parity probe implementation, as long as it stays lightweight and focused on integration readiness rather than upstream QA.
- Exact test names and fixture layout for 07-01/07-02, as long as probes map back to CORE-01 through CORE-05.
- Whether a parity check is implemented as a Node test, shell smoke command, or review checklist, as long as verification output is explicit and repeatable.

</decisions>

<canonical_refs>
## Canonical References

Downstream agents MUST read these before planning or implementing Phase 07.

### Phase 07 Scope And Requirements

- `.planning/ROADMAP.md` — Phase 07 goal, success criteria, and 07-01/07-02/07-03 split.
- `.planning/REQUIREMENTS.md` — CORE-01 through CORE-05 and later RSCH boundaries.
- `.planning/STATE.md` — Current project position, prior decisions, blockers, and Auto/ARIS not-started status.
- `.planning/phases/07-core-gsd-lifecycle-parity/07-00-PROGRESS-AND-READINESS-REVIEW.md` — Readiness review, accepted roadmap fix, and upstream `research-phase` clarification.

### Implementation Boundary And Framework Decisions

- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-FEASIBILITY.md` — Recommended Phase 07 build sequence and lifecycle parity surfaces.
- `.planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md` — Config/state ownership, mutation rules, hook behavior, git discipline, and review commands.
- `.planning/phases/05-final-target-framework-review-loop/05-FINAL-REVIEW-DECISION.md` — Final framework approval, upstream baseline ownership, SDK status, ljx-gsd reuse prohibition, config sanitization, and implementation-start contract.
- `.planning/phases/06-foundation-from-upstream-gsd/06-03-FOUNDATION-REVIEW.md` — Phase 06 pass decision and boundary verification evidence.
- `.planning/phases/06-foundation-from-upstream-gsd/06-03-SUMMARY.md` — Latest implementation workspace verification summary.

### Prior Architecture Decisions

- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONTEXT.md` — Locked target architecture decisions, especially Research Command Compiler under GSD lifecycle ownership.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md` — Target framework details for GSD ownership and research overlay boundaries.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md` — No `phase_type` and no typed phase routing compatibility rationale.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md` — Future research config/preset semantics; useful as a Phase 08 boundary reference, not Phase 07 implementation scope.

### Implementation Workspace Surfaces

- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/commands/gsd/` — Upstream command surface imported in Phase 06.
- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/get-shit-done/workflows/` — Upstream workflow surface imported in Phase 06.
- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/get-shit-done/bin/gsd-tools.cjs` — CLI dispatcher for lifecycle helper commands.
- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/get-shit-done/bin/lib/state.cjs` — State helper surface.
- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/get-shit-done/bin/lib/roadmap.cjs` — Roadmap helper surface.
- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/get-shit-done/bin/lib/phase.cjs` — Phase lookup, insertion, removal, completion, and plan index helpers.
- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/get-shit-done/bin/lib/verify.cjs` — Plan/summary/phase/reference verification helpers.
- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/get-shit-done/bin/lib/workstream.cjs` — Workstream routing and mutation helpers.
- `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813/tests/` — Existing upstream test corpus and Phase 06 boundary tests.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `commands/gsd/*.md`: The implementation workspace currently has 72 command files, including lifecycle, planning, review, verify, workstream, workspace, roadmap mutation, ship, undo, and health surfaces.
- `get-shit-done/workflows/*.md`: The implementation workspace currently has 71 workflow files. Most key commands map to workflow files; `resume-work` routes to `resume-project.md`, and `workstreams` is an inline command backed by `gsd-tools workstream` helpers.
- `get-shit-done/bin/gsd-tools.cjs`: Existing CLI dispatcher routes state, roadmap, phase, verify, workstream, init, commit, and helper commands.
- `get-shit-done/bin/lib/state.cjs`, `roadmap.cjs`, `phase.cjs`, `verify.cjs`, and `workstream.cjs`: Canonical helper surfaces for Phase 07 parity checks.
- Existing tests include state, roadmap, verify, health, workstream, execute-phase wave, worktree, and workflow robustness coverage.

### Established Patterns

- Upstream GSD uses ordinary Markdown command/workflow prompts plus CommonJS helper modules.
- Canonical state and roadmap mutation should route through GSD helper commands rather than direct ad hoc file writes.
- Workstream routing can be session-scoped and must not rely only on a shared active-workstream pointer in concurrent sessions.
- Planning docs and runtime code are intentionally separated: source repo remains planning/reference-oriented while implementation code lives in the clean implementation workspace.

### Integration Points

- Phase 08 Auto/ARIS overlay should call phase insertion and normal plan/execute/review/verify paths rather than creating a new lifecycle.
- Future `/gsd-ljx-*` commands should compile research semantics into GSD-owned context, plans, artifact contracts, and gates.
- `resume-work` and `workstreams` parity should be validated by behavior, not by assuming every command has a same-name workflow file.

</code_context>

<specifics>
## Specific Ideas

- The user clarified that Phase 07 must not care about upstream GSD having bugs in general and must not try to improve GSD.
- The user proposed that Auto Research should use GSD `insert-phase` to create inserted research phases instead of writing canonical lifecycle docs directly.
- The user requested future Auto/ARIS commands use `/gsd-ljx-*` names to make them easy to search and distinguish from upstream GSD commands.

</specifics>

<deferred>
## Deferred Ideas

- Implementing `/gsd-ljx-*` Auto/ARIS research commands is deferred to the standalone research command integration phase.
- Implementing `.planning/research.config.json` loader/compiler behavior is deferred to the standalone research command integration phase.
- Implementing danger-auto side-effect audit artifacts and external-service policy is deferred to the standalone research command integration phase.
- Full scenario harness for engineering and research workflows is deferred to the scenario/regression harness phase; Phase 07 may add lightweight parity probes only.

</deferred>

---

*Phase: 07-core-gsd-lifecycle-parity*
*Context gathered: 2026-04-14*
