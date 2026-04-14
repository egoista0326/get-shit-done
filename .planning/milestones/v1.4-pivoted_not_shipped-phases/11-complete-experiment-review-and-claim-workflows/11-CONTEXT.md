# Phase 11: Experiment Review And Claim Completion - Context

**Gathered:** 2026-04-11
**Status:** Ready for research and planning
**Mode:** Auto-selected recommended path: stay closest to GSD and Auto, prefer reuse, and preserve minimal modification.

## Phase Boundary

This phase completes `experiment-plan`, `experiment-bridge`, `review-loop`, `research-review`, `result-to-claim`, and `claim-gate` so experiment planning, execution evidence, review critique, and claim judgment share one coherent phase-scoped evidence model.

This phase is responsible for:

- making `experiment-plan` and `experiment-bridge` share accepted execution ownership, tracker/results artifact paths, and state links
- making `review-loop`, `research-review`, `result-to-claim`, and `claim-gate` use consistent evidence, routing, and structured state semantics
- replacing bridge-era phase-local heuristics with explicit evidence links where continuation decisions need structured truth
- preserving Auto workflow value while converging these workflows onto the shared `ljx-GSD` `.planning/` control plane
- adding regression tests that cover direct command invocation, lifecycle adoption, and downstream routing across the experiment/review/claim stack

This phase is not responsible for:

- completing paper, rebuttal, or submission-workspace internals; those belong to Phase 12
- implementing the full `research-pipeline` orchestrator or final cutover; those remain later-phase work
- inventing a second control plane outside `.planning/`
- deleting, shrinking, or bypassing original GSD or Auto workflow content as an integration shortcut
- silently launching experiments, auto-running claim gates, or auto-advancing to paper generation without explicit user intent

## Locked Inbound Decisions

- **D-01:** GSD remains the outer control plane and `.planning/` remains the authoritative root.
- **D-02:** Auto Research workflows are absorbed as a native research workflow family, but their behavior, skill content, and companion-skill intent must be preserved unless a change is required for correctness.
- **D-03:** Minimal modification means reusing established GSD and Auto semantics and shared-rule owners whenever practical, not merely preserving command names.
- **D-04:** Phase-local markdown artifacts remain the human-readable operator surface. Structured state is added only where routing, continuity, evidence ownership, or freshness cannot be represented safely by local markdown alone.
- **D-05:** Direct workflow invocation and lifecycle-driven invocation must converge on the same artifacts and evidence records.
- **D-06:** `next` and downstream recommendations must remain one-step and honest. They may recommend the next workflow but must not imply it has already run.

## Implementation Decisions

### Evidence ownership model

- **D-07:** Phase 11 should define one phase-scoped evidence bundle that links, at minimum, `EXPERIMENT_PLAN`, `EXPERIMENT_TRACKER`, `EXPERIMENT_RESULTS`, `REVIEW_LOOP`, `RESEARCH_REVIEW`, `RESULT_TO_CLAIM`, and `CLAIMS`.
- **D-08:** The evidence bundle should be a link and summary layer, not a replacement for the phase-local artifacts themselves.
- **D-09:** Evidence state should be created on demand. A command that only resolves context may expose the intended state path, but should not write empty state just to look complete.
- **D-10:** If a coherent existing state family can carry a rule, use it. `review-loop` may keep using the existing `reviews` family for iterative review-loop continuity; experiment/claim evidence should use the smallest additional research-state family needed to link the stack.

### Experiment plan and bridge convergence

- **D-11:** `experiment-plan` owns the accepted execution plan and tracker contract for the phase. Its outputs remain phase-local and human-readable.
- **D-12:** `experiment-bridge` must not invent an experiment plan when the phase-local plan is missing. It should stop honestly and route back to `ljx-GSD-experiment-plan`.
- **D-13:** Once an experiment plan/tracker/results set exists, `experiment-bridge` should expose the shared evidence bundle and downstream review/claim routes from the same state contract used by the rest of the stack.
- **D-14:** Experiment execution remains bounded by Auto's companion-skill model: `run-experiment`, `monitor-experiment`, and `training-check` are companion routes, not content to be deleted or inlined into `experiment-bridge`.

### Review and research-review convergence

- **D-15:** `review-loop` is the iterative, stateful critique/fix loop and should preserve the existing `.planning/state/reviews/{phase}.json` ownership unless research finds a stronger GSD precedent.
- **D-16:** `research-review` is a single-round research critique artifact. It should link into the same phase evidence bundle without pretending to have run the full iterative review-loop.
- **D-17:** Both review paths should surface evidence inputs and outputs explicitly so downstream claim decisions do not rely on ambiguous phase-local file presence alone.

### Result-to-claim and claim-gate convergence

- **D-18:** `result-to-claim` owns the narrow judgment from experiment results to defensible claims, including unsupported or partially supported claims.
- **D-19:** `claim-gate` owns aggregate claim readiness. It may use `result-to-claim` and `research-review` as internal evaluator concepts, but it must not silently run them or mark their artifacts as complete when absent.
- **D-20:** Claim outputs must avoid overclaiming. The shared evidence model should make missing results, missing critique, or stale claim judgment visible enough for routing and tests.
- **D-21:** Downstream recommendations from claim flows may include `ablation-planner`, `experiment-plan`, or `paper-pipeline`, but only as explicit next steps.

### Reuse and minimal-change discipline

- **D-22:** Start from the current `ljx` helper implementations and deepen them. Do not replace them wholesale with a fresh experiment/review/claim stack.
- **D-23:** Follow the Phase 09 quality-gate pattern where applicable: phase-local markdown artifacts plus a structured summary/link record, not a new outer lifecycle stage.
- **D-24:** Follow the Phase 10 research-state pattern where applicable: research workflow state belongs under `.planning/state/research/` when it is genuinely needed.
- **D-25:** Build/install output and generated skill wording are part of the product surface. If runtime semantics change, generated skills and preview install behavior must stay aligned.
- **D-26:** When fixing review-discovered bugs, check related helpers and generated skill surfaces rather than applying the narrowest local patch only.

### the agent's Discretion

- Exact JSON schema fields for the evidence bundle and claim judgment summary.
- Whether experiment evidence and claim judgment should share one research-state family or use two adjacent research-state families, provided the resulting design stays smaller than a second control plane.
- Exact artifact summary fields mirrored into state, as long as continuation/routing can distinguish missing, present, and intentionally pending evidence.
- Exact test-file split, provided coverage includes cross-helper consistency rather than only isolated happy paths.

## Specific Ideas

- Reuse and extend these runtime helpers instead of replacing them:
  - `bin/lib/ljx-experiment-plan-tools.cjs`
  - `bin/lib/ljx-experiment-bridge-tools.cjs`
  - `bin/lib/ljx-review-loop-tools.cjs`
  - `bin/lib/ljx-research-review-tools.cjs`
  - `bin/lib/ljx-result-to-claim-tools.cjs`
  - `bin/lib/ljx-claim-gate-tools.cjs`
  - `bin/lib/ljx-runtime-state.cjs`
  - `bin/lib/ljx-phase-context.cjs`
  - `bin/lib/codex-conversion.cjs`
  - `bin/lib/build-skills.cjs`
- Existing `review-loop` already writes state through `writeReviewLoopState()` and `reviews`; use that as a precedent rather than inventing a competing review state owner.
- `experiment-bridge` already stops on missing phase-local `EXPERIMENT_PLAN`; preserve that honest-stop behavior while adding shared evidence links around successful paths.
- `result-to-claim` and `claim-gate` currently expose only phase-local artifact paths; Phase 11 should make their evidence and judgment state explicit enough for routing and tests.
- Tests should cover at least:
  - missing experiment plan still routes back to `ljx-GSD-experiment-plan`
  - experiment plan/bridge expose the same evidence bundle path and artifact links
  - review-loop and research-review link into the same evidence model while preserving their distinct modes
  - result-to-claim and claim-gate share claim/evidence semantics without silently running each other
  - generated/installed skill wording remains aligned with runtime behavior

## Canonical References

**Downstream agents MUST read these before researching, planning, or implementing.**

### Phase and project contracts

- `.planning/ROADMAP.md` - Phase 11 goal, plan slots, and success criteria.
- `.planning/REQUIREMENTS.md` - `IMPL-05` and related research-state requirements.
- `.planning/PROJECT.md` - project-level control-plane, preservation, and integration guardrails.
- `.planning/STATE.md` - current position and risk notes for Phase 11.
- `.planning/IMPLEMENTATION-LESSONS.md` - post-Phase-07/09 lessons about semantic reuse, shared-rule ownership, and review depth.

### Locked upstream decisions

- `.planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md` - accepted structured state family policy.
- `.planning/phases/07-implement-authoritative-runtime-substrate/07-CONTEXT.md` - `.planning/` runtime substrate and preservation policy.
- `.planning/phases/08-complete-core-lifecycle-shell/08-CONTEXT.md` - direct/lifecycle convergence and phase-local artifact adoption.
- `.planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md` - phase-local artifacts plus structured gate summaries.
- `.planning/phases/10-complete-discovery-and-refinement-workflows/10-CONTEXT.md` - research-state pattern and Auto workflow preservation for typed research workflows.
- `.planning/phases/10-complete-discovery-and-refinement-workflows/10-03-SUMMARY.md` - latest discovery/refine runtime-state completion summary.
- `LJX-GSD-DESIGN-DECISION-LOG.md` - accepted control-plane, preservation, and semantic-reuse decisions.
- `LJX-GSD-CORE-COMMAND-SPECS.md` - public contracts for direct workflow and lifecycle command convergence.
- `LJX-GSD-INTERFACES.md` - interface-level direct workflow versus phase-driven convergence requirements.
- `LJX-GSD-SKILL-MIGRATION-DETAILED.md` - accepted stance for Auto workflow preservation and integration.

### Existing implementation references

- `bin/lib/ljx-experiment-plan-tools.cjs` - current experiment plan context, artifact paths, and downstream routes.
- `bin/lib/ljx-experiment-bridge-tools.cjs` - current bridge context, missing-plan honest stop, companion skills, and results artifact path.
- `bin/lib/ljx-review-loop-tools.cjs` - current iterative review context and `reviews` state writer.
- `bin/lib/ljx-research-review-tools.cjs` - current single-round review context and artifact path.
- `bin/lib/ljx-result-to-claim-tools.cjs` - current result-to-claim artifact path and downstream routes.
- `bin/lib/ljx-claim-gate-tools.cjs` - current claim gate artifact path, internal evaluators, and downstream routes.
- `bin/lib/ljx-runtime-state.cjs` - authoritative supported runtime-state family list and read/write helpers.
- `bin/lib/ljx-runtime-core.cjs` - research workflow defaults for review-loop, claim, and execution.
- `bin/lib/build-skills.cjs` and `bin/lib/codex-conversion.cjs` - generated skill and install surfaces that must remain aligned.

### Auto skill references

- `/Users/lijiaxin/.codex/skills/experiment-plan/SKILL.md` - Auto experiment planning workflow intent.
- `/Users/lijiaxin/.codex/skills/experiment-bridge/SKILL.md` - Auto experiment execution bridge intent.
- `/Users/lijiaxin/.codex/skills/auto-review-loop/SKILL.md` - Auto iterative review-loop intent.
- `/Users/lijiaxin/.codex/skills/research-review/SKILL.md` - Auto single-review workflow intent.
- `/Users/lijiaxin/.codex/skills/result-to-claim/SKILL.md` - Auto result-to-claim judgment intent.
- `/Users/lijiaxin/.codex/skills/ablation-planner/SKILL.md` - downstream route for partially supported claims.

## Existing Code Insights

### Reusable assets

- `readPhaseWorkflowContext()` already centralizes phase resolution, root context loading, phase-local artifact exclusion, direct-tool exposure, and honest stop semantics.
- `ljx-runtime-state.cjs` already supports controlled state families and should remain the owner for adding any new evidence/claim family.
- `review-loop` already demonstrates how a research workflow can expose a state record path and provide an explicit writer without forcing other workflows into the same state shape.
- Phase 10 already added `research/idea-portfolios` and `research/refinement-sessions`; Phase 11 should follow that pattern if experiment/claim state needs a research-owned family.

### Established patterns to preserve

- Phase-local artifacts are the operator-facing truth.
- Structured state is a routing/link/continuity summary, not a prose artifact replacement.
- Direct workflow helpers and lifecycle shell commands must converge on the same accepted artifacts.
- Missing upstream evidence should produce an honest stop or explicit recommendation, not fabricated completion.
- Generated skill wording and preview-install output must be reviewed with runtime code.

### Integration points

- Add evidence state support in `bin/lib/ljx-runtime-state.cjs` only if needed by the final plan.
- Add shared evidence-link helpers near existing `ljx` runtime helpers instead of duplicating file-path logic across all six workflow helpers.
- Update existing bridge tests before implementation so Phase 11 fails on the current bridge-era behavior and passes only when evidence semantics are consistent.
- After implementation, run focused bridge tests, `node bin/install.js --preview`, syntax checks for changed helper files, and full `npm test`.

## Deferred Ideas

- Paper and rebuttal workflow completion belongs to Phase 12.
- Workstream and roadmap mutation administration belongs to Phase 13.
- Full migration cutover and end-to-end `research-pipeline` parity verification belong to Phase 14.
- Provider-specific external review engines remain optional V2 work.

---

*Phase: 11-complete-experiment-review-and-claim-workflows*
*Context gathered: 2026-04-11*
