# Phase 10: Discovery And Refinement Completion - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

## Phase Boundary

This phase completes `ljx-GSD-idea-discovery` and `ljx-GSD-research-refine` as real typed-phase workflows instead of thin bridge wrappers.

This phase is responsible for:

- completing typed `discovery` ownership for `ljx-GSD-idea-discovery`
- completing typed `refine` ownership for `ljx-GSD-research-refine`
- landing the accepted structured runtime state for discovery portfolios and refinement sessions when iteration state is actually needed
- making discovery/refine handoffs to `novelty-check`, `research-review`, and `experiment-plan` explicit, phase-aware, and lifecycle-compatible
- preserving Auto workflow value while converging discovery/refine onto the shared `ljx-GSD` state and artifact model

This phase is not responsible for:

- completing experiment, review, claim, paper, rebuttal, or migration-cutover internals
- inventing a second discovery/refine control plane outside `.planning/`
- silently turning discovery into experiment planning or turning refine into experiment execution
- deleting or materially shrinking existing GSD or Auto workflow coverage as an implementation shortcut

## Locked Inbound Decisions

- **D-01:** GSD remains the outer control plane and `.planning/` remains the authoritative root.
- **D-02:** Direct workflows and phase-driven commands must converge on the same artifacts and state model.
- **D-03:** Phase 10 must follow the stricter post-Phase-09 lesson: semantic reuse and shared-rule ownership matter as much as structural reuse.
- **D-04:** Minimal modification means preserving behavior and established rule owners where practical, not only preserving command names.
- **D-05:** Discovery/refine runtime objects belong under `.planning/state/research/` when persistent iteration state is needed.

## Implementation Decisions

### Discovery completion depth
- **D-06:** `ljx-GSD-idea-discovery` should graduate from a thin report wrapper into a true typed `discovery` engine that preserves Workflow 1's core stages: literature scan, candidate generation, novelty screening, and critical review.
- **D-07:** Discovery should remain bounded at the accepted discovery boundary. It may recommend or hand off to `research-refine`, but it must not silently continue into `experiment-plan`, roadmap mutation, or a larger pipeline.
- **D-08:** Manual direct invocation and lifecycle-driven invocation must reuse the same discovery logic and produce compatible outputs.

### Refine canonical artifact policy
- **D-09:** Refine should return to the accepted Auto-centered canonical artifact model: `FINAL_PROPOSAL.md` is the canonical proposal artifact and `REFINEMENT_REPORT.md` remains supporting evidence.
- **D-10:** The current bridge-era `METHOD_SPEC.md` should remain as a compatibility mirror rather than the long-term canonical output.
- **D-11:** `research-refine` should preserve the accepted review-revise semantics where useful, but only inside the typed `refine` phase boundary and without silently expanding into experiment planning.

### Structured research state policy
- **D-12:** Discovery and refine structured state should be created on demand, not eagerly for every trivial run.
- **D-13:** When discovery actually needs persistent candidate/shortlist state, it should write `.planning/state/research/idea-portfolios/{phase_id}.json`.
- **D-14:** When refine actually needs persistent loop state, round history, or score-tracking continuity, it should write `.planning/state/research/refinement-sessions/{phase_id}.json`.
- **D-15:** Simple one-shot runs may stay lightweight and rely on phase-local artifacts plus phase-record lifecycle state without forcing an otherwise empty research-state object into existence.

### Handoff and lifecycle convergence
- **D-16:** Downstream handoffs must remain explicit and honest. Discovery may recommend `novelty-check`, `research-review`, or `research-refine`; refine may recommend `experiment-plan`; neither should imply the next workflow already occurred.
- **D-17:** Discovery/refine outputs must remain attachable to the active phase and must be adoptable by lifecycle shell commands without re-deriving truth from scratch.
- **D-18:** If direct workflow artifacts already satisfy the typed lifecycle contract, `plan-phase`, `execute-phase`, and `next` should adopt them instead of rerunning the workflow by default.

### Reuse and preservation discipline
- **D-19:** Phase 10 should start from the current `ljx` runtime helpers and the current Auto workflow content, then deepen semantics rather than replacing them with a second fresh stack.
- **D-20:** If a coherent GSD precedent exists for state ownership, lifecycle adoption, or recommendation flow, reuse or adapt it before introducing new local rules.
- **D-21:** If a needed discovery/refine behavior has no direct GSD precedent, choose the smallest design that preserves one control plane, one state model, and the original Auto workflow value.

### the agent's Discretion
- Exact JSON field layouts inside `idea-portfolios` and `refinement-sessions`
- Exact thresholds for when a simple run should stay artifact-only versus creating structured research runtime state
- Exact compatibility rules for how `METHOD_SPEC.md` mirrors `FINAL_PROPOSAL.md`

## Specific Ideas

- Use the current Phase 08-09 runtime path as the integration base:
  - `bin/lib/ljx-lifecycle-shell-tools.cjs`
  - `bin/lib/ljx-state-tools.cjs`
  - `bin/lib/ljx-runtime-state.cjs`
  - `bin/lib/ljx-phase-context.cjs`
- Reuse the current discovery/refine helpers as consolidation targets rather than replacing them wholesale:
  - `bin/lib/ljx-idea-discovery-tools.cjs`
  - `bin/lib/ljx-research-refine-tools.cjs`
- Keep Auto compatibility semantics alive by treating current upstream skills as content sources and bounded route targets:
  - `/Users/lijiaxin/.codex/skills/idea-discovery/SKILL.md`
  - `/Users/lijiaxin/.codex/skills/research-refine/SKILL.md`
- Use accepted research-state destinations from Phase 5 rather than inventing new namespaces:
  - `.planning/state/research/idea-portfolios/{phase_id}.json`
  - `.planning/state/research/refinement-sessions/{phase_id}.json`

## Canonical References

**Downstream agents MUST read these before researching, planning, or implementing.**

### Phase and project contracts
- `.planning/ROADMAP.md` — Phase 10 goal, requirements, and success criteria
- `.planning/REQUIREMENTS.md` — `IMPL-04` traceability
- `.planning/PROJECT.md` — project-level guardrails, including semantic reuse and minimal-modification interpretation
- `.planning/STATE.md` — current blockers and the accepted statement that discovery/refine are the next gap
- `.planning/IMPLEMENTATION-LESSONS.md` — post-Phase-09 lessons about semantic reuse, shared-rule ownership, and cross-surface verification

### Locked upstream decisions
- `.planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md` — canonical structured state families, including `idea-portfolios` and `refinement-sessions`
- `.planning/phases/07-implement-authoritative-runtime-substrate/07-CONTEXT.md` — structured-state-first substrate and reuse/preservation policy
- `.planning/phases/08-complete-core-lifecycle-shell/08-CONTEXT.md` — typed shell adoption rules and direct-workflow convergence policy
- `.planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md` — shared-rule ownership and authoritative routing patterns after execution
- `LJX-GSD-DESIGN-DECISION-LOG.md` — accepted control-plane, preservation, and semantic-reuse decisions
- `LJX-GSD-CORE-COMMAND-SPECS.md` — discovery/refine routing and completion contracts
- `LJX-GSD-INTERFACES.md` — direct workflow versus phase-driven convergence requirements
- `LJX-GSD-SKILL-MIGRATION-DETAILED.md` — accepted migration stance for `idea-discovery` and `research-refine`

### Existing implementation references
- `bin/lib/ljx-idea-discovery-tools.cjs` — current bridge helper, output contracts, and current bounded-stage assumptions
- `bin/lib/ljx-research-refine-tools.cjs` — current refine helper, artifact paths, and current bounded-stage assumptions
- `bin/lib/ljx-lifecycle-shell-tools.cjs` — current lifecycle adoption logic for direct workflow artifacts
- `bin/lib/manifest.cjs` — current bridge-ready rationale showing exactly what remains intentionally thin
- `bin/lib/build-skills.cjs` and `bin/lib/codex-conversion.cjs` — installed skill wording and runtime packaging that must stay aligned with the deeper Phase 10 semantics

## Existing Code Insights

### Reusable assets
- `bin/lib/ljx-idea-discovery-tools.cjs` already centralizes discovery-phase context resolution, phase-local artifact paths, and bridge-ready downstream tool exposure.
- `bin/lib/ljx-research-refine-tools.cjs` already centralizes refine-phase context resolution, phase-local artifact paths, and downstream experiment-plan linkage.
- `bin/lib/ljx-lifecycle-shell-tools.cjs` already supports adoption provenance and direct-artifact lifecycle convergence, which Phase 10 should deepen rather than bypass.
- Phase 5 already settled the correct structured destinations for portfolio and refinement-session runtime state, so Phase 10 does not need to invent new schemas or locations.

### Established patterns to preserve
- Direct workflows and lifecycle shell commands must converge on the same phase-local outputs and state so `next` remains coherent.
- Discovery and refine stay phase-local and honest about what did not happen yet.
- Installed skill wording and preview/runtime packaging are part of the product surface and must stay aligned with repo-local behavior.

### Integration points
- Discovery/refine lifecycle adoption in `bin/lib/ljx-lifecycle-shell-tools.cjs`
- Current direct-workflow recommendation and progress routing in `bin/lib/ljx-state-tools.cjs`
- Future structured research runtime reads and writes under `.planning/state/research/`
- Installed `ljx-GSD-idea-discovery` and `ljx-GSD-research-refine` skill generation in `bin/lib/codex-conversion.cjs` and `bin/lib/build-skills.cjs`

## Deferred Ideas

- Experiment ownership, execution-state convergence, and review/claim unification belong to Phase 11.
- Paper/rebuttal bounded workspace completion belongs to Phase 12.
- `research-pipeline` as a full end-to-end orchestrator remains deferred until later phases can create and repair formal phase chains without becoming a second control plane.

---

*Phase: 10-complete-discovery-and-refinement-workflows*
*Context gathered: 2026-04-10*
