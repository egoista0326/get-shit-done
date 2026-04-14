# Phase 11: Experiment Review And Claim Completion - Research

**Researched:** 2026-04-11 [VERIFIED: environment context]
**Domain:** Local ljx-GSD Node/CommonJS workflow helper integration for experiment, review, and claim evidence semantics. [VERIFIED: package.json; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
**Confidence:** HIGH for current repository facts and MEDIUM for exact JSON field naming because field names remain in the agent's discretion. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

<user_constraints>
## User Constraints (from CONTEXT.md)

Provenance for this whole section: copied from `.planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md`. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

### Locked Decisions

#### Locked Inbound Decisions

- **D-01:** GSD remains the outer control plane and `.planning/` remains the authoritative root.
- **D-02:** Auto Research workflows are absorbed as a native research workflow family, but their behavior, skill content, and companion-skill intent must be preserved unless a change is required for correctness.
- **D-03:** Minimal modification means reusing established GSD and Auto semantics and shared-rule owners whenever practical, not merely preserving command names.
- **D-04:** Phase-local markdown artifacts remain the human-readable operator surface. Structured state is added only where routing, continuity, evidence ownership, or freshness cannot be represented safely by local markdown alone.
- **D-05:** Direct workflow invocation and lifecycle-driven invocation must converge on the same artifacts and evidence records.
- **D-06:** `next` and downstream recommendations must remain one-step and honest. They may recommend the next workflow but must not imply it has already run.

#### Implementation Decisions

##### Evidence ownership model

- **D-07:** Phase 11 should define one phase-scoped evidence bundle that links, at minimum, `EXPERIMENT_PLAN`, `EXPERIMENT_TRACKER`, `EXPERIMENT_RESULTS`, `REVIEW_LOOP`, `RESEARCH_REVIEW`, `RESULT_TO_CLAIM`, and `CLAIMS`.
- **D-08:** The evidence bundle should be a link and summary layer, not a replacement for the phase-local artifacts themselves.
- **D-09:** Evidence state should be created on demand. A command that only resolves context may expose the intended state path, but should not write empty state just to look complete.
- **D-10:** If a coherent existing state family can carry a rule, use it. `review-loop` may keep using the existing `reviews` family for iterative review-loop continuity; experiment/claim evidence should use the smallest additional research-state family needed to link the stack.

##### Experiment plan and bridge convergence

- **D-11:** `experiment-plan` owns the accepted execution plan and tracker contract for the phase. Its outputs remain phase-local and human-readable.
- **D-12:** `experiment-bridge` must not invent an experiment plan when the phase-local plan is missing. It should stop honestly and route back to `ljx-GSD-experiment-plan`.
- **D-13:** Once an experiment plan/tracker/results set exists, `experiment-bridge` should expose the shared evidence bundle and downstream review/claim routes from the same state contract used by the rest of the stack.
- **D-14:** Experiment execution remains bounded by Auto's companion-skill model: `run-experiment`, `monitor-experiment`, and `training-check` are companion routes, not content to be deleted or inlined into `experiment-bridge`.

##### Review and research-review convergence

- **D-15:** `review-loop` is the iterative, stateful critique/fix loop and should preserve the existing `.planning/state/reviews/{phase}.json` ownership unless research finds a stronger GSD precedent.
- **D-16:** `research-review` is a single-round research critique artifact. It should link into the same phase evidence bundle without pretending to have run the full iterative review-loop.
- **D-17:** Both review paths should surface evidence inputs and outputs explicitly so downstream claim decisions do not rely on ambiguous phase-local file presence alone.

##### Result-to-claim and claim-gate convergence

- **D-18:** `result-to-claim` owns the narrow judgment from experiment results to defensible claims, including unsupported or partially supported claims.
- **D-19:** `claim-gate` owns aggregate claim readiness. It may use `result-to-claim` and `research-review` as internal evaluator concepts, but it must not silently run them or mark their artifacts as complete when absent.
- **D-20:** Claim outputs must avoid overclaiming. The shared evidence model should make missing results, missing critique, or stale claim judgment visible enough for routing and tests.
- **D-21:** Downstream recommendations from claim flows may include `ablation-planner`, `experiment-plan`, or `paper-pipeline`, but only as explicit next steps.

##### Reuse and minimal-change discipline

- **D-22:** Start from the current `ljx` helper implementations and deepen them. Do not replace them wholesale with a fresh experiment/review/claim stack.
- **D-23:** Follow the Phase 09 quality-gate pattern where applicable: phase-local markdown artifacts plus a structured summary/link record, not a new outer lifecycle stage.
- **D-24:** Follow the Phase 10 research-state pattern where applicable: research workflow state belongs under `.planning/state/research/` when it is genuinely needed.
- **D-25:** Build/install output and generated skill wording are part of the product surface. If runtime semantics change, generated skills and preview install behavior must stay aligned.
- **D-26:** When fixing review-discovered bugs, check related helpers and generated skill surfaces rather than applying the narrowest local patch only.

### Claude's Discretion

- Exact JSON schema fields for the evidence bundle and claim judgment summary.
- Whether experiment evidence and claim judgment should share one research-state family or use two adjacent research-state families, provided the resulting design stays smaller than a second control plane.
- Exact artifact summary fields mirrored into state, as long as continuation/routing can distinguish missing, present, and intentionally pending evidence.
- Exact test-file split, provided coverage includes cross-helper consistency rather than only isolated happy paths.

### Deferred Ideas (OUT OF SCOPE)

- Paper and rebuttal workflow completion belongs to Phase 12.
- Workstream and roadmap mutation administration belongs to Phase 13.
- Full migration cutover and end-to-end `research-pipeline` parity verification belong to Phase 14.
- Provider-specific external review engines remain optional V2 work.
</user_constraints>

## Summary

Phase 11 should not introduce a new control plane; the smallest coherent model is phase-local markdown artifacts plus structured state records for experiment evidence, iterative reviews, and claim judgment. [VERIFIED: .planning/PROJECT.md; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; .planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md]

The recommended implementation is to add the already-designed `experiments` and `claims` runtime state families, keep the existing `reviews` family as the iterative review-loop owner, and add one narrow shared evidence helper that all six Phase 11 helpers call for paths and artifact-link summaries. [VERIFIED: .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md; bin/lib/ljx-runtime-state.cjs; bin/lib/ljx-review-loop-tools.cjs]

Generated skill wording and preview install output must be updated with the runtime helper changes because this repository treats install/build surfaces as product surfaces. [VERIFIED: .planning/STATE.md; .planning/IMPLEMENTATION-LESSONS.md; bin/lib/codex-conversion.cjs; bin/lib/build-skills.cjs]

**Primary recommendation:** use `experiments/{phase}.json` as the evidence bundle link/summary record, `reviews/{phase}.json` for iterative review-loop continuity, and `claims/{phase}.json` for result-to-claim/claim-gate judgment summaries; expose these paths and link summaries through all six helpers without writing empty state during context reads. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md; bin/lib/ljx-runtime-state.cjs]

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| IMPL-05 | Experiment, review, and claim workflows share one coherent execution, evidence, and judgment model. | Add shared evidence links across `experiment-plan`, `experiment-bridge`, `review-loop`, `research-review`, `result-to-claim`, and `claim-gate`, backed by runtime state families and phase-local artifacts. [VERIFIED: .planning/REQUIREMENTS.md; .planning/ROADMAP.md; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md] |

## Project Constraints

- No repository-root `CLAUDE.md` was found, so there are no additional `CLAUDE.md` directives to copy into this research. [VERIFIED: `test -f CLAUDE.md` returned 1]
- No `.claude/skills/` directory was found in this repository. [VERIFIED: `test -d .claude/skills` returned 1]
- No `.agents/skills/` directory was found in this repository. [VERIFIED: `test -d .agents/skills` returned 1]
- `workflow.nyquist_validation` is absent from `.planning/config.json`, so validation architecture should be treated as enabled by the GSD research protocol. [VERIFIED: .planning/config.json]
- `security_enforcement` is absent from `.planning/config.json`, so security-domain checks should be treated as enabled by the GSD research protocol. [VERIFIED: .planning/config.json]

## Standard Stack

### Core

| Component | Version/Path | Purpose | Standard Use |
|-----------|--------------|---------|--------------|
| Node.js | Runtime available as `v24.14.1`; package requires `>=22.0.0`. | Execute CommonJS helper modules and `node --test` suites. | Use the existing Node runtime and built-in modules; do not add a new runtime. [VERIFIED: `node --version`; package.json] |
| npm | Available as `11.11.0`. | Run `npm test` and preview install scripts. | Use existing npm scripts for test and preview verification. [VERIFIED: `npm --version`; package.json] |
| CommonJS helpers | `bin/lib/*.cjs` | Host ljx-GSD runtime, workflow context, bridge helpers, and generated-skill builders. | Extend current helper modules instead of replacing them. [VERIFIED: bin/lib/ljx-runtime-core.cjs; bin/lib/ljx-phase-context.cjs; bin/lib/codex-conversion.cjs] |
| `node:test` | Built into Node.js. | Run the repository's `.test.cjs` suites. | Add focused tests under `tests/*.test.cjs`; no external test framework is needed. [VERIFIED: package.json; tests/experiment-plan-bridge.test.cjs] |
| Runtime state helper | `bin/lib/ljx-runtime-state.cjs` | Own supported state families and JSON read/write helpers. | Add allowed families here; do not bypass it with ad hoc state writes. [VERIFIED: bin/lib/ljx-runtime-state.cjs] |
| Phase workflow context helper | `bin/lib/ljx-phase-context.cjs` | Centralize phase resolution, root context, artifact filtering, recommendations, and honest stops. | Reuse `readPhaseWorkflowContext()` from each flow-specific helper. [VERIFIED: bin/lib/ljx-phase-context.cjs] |

### Supporting

| Component | Path | Purpose | When to Use |
|-----------|------|---------|-------------|
| Experiment plan helper | `bin/lib/ljx-experiment-plan-tools.cjs` | Exposes plan/tracker artifact paths and downstream workflow recommendations. | Add evidence-bundle path/link summary here so planning and bridge agree on ownership. [VERIFIED: bin/lib/ljx-experiment-plan-tools.cjs] |
| Experiment bridge helper | `bin/lib/ljx-experiment-bridge-tools.cjs` | Stops on missing `EXPERIMENT_PLAN`, exposes Auto companion skills, and points to results/tracker artifacts. | Preserve honest-stop behavior and add the same evidence-bundle path/link summary used by experiment-plan. [VERIFIED: bin/lib/ljx-experiment-bridge-tools.cjs] |
| Review-loop helper | `bin/lib/ljx-review-loop-tools.cjs` | Owns iterative review context and writes the `reviews` state family. | Keep `reviews/{phase}.json` as the iterative review-loop state owner and add a link back to the evidence bundle. [VERIFIED: bin/lib/ljx-review-loop-tools.cjs] |
| Research-review helper | `bin/lib/ljx-research-review-tools.cjs` | Exposes a one-round research critique artifact path. | Link the one-round artifact into the evidence bundle without reusing the review-loop state writer. [VERIFIED: bin/lib/ljx-research-review-tools.cjs] |
| Result-to-claim helper | `bin/lib/ljx-result-to-claim-tools.cjs` | Exposes the result-to-claim report path and downstream recommendations. | Add claim judgment state path and artifact-link summary here. [VERIFIED: bin/lib/ljx-result-to-claim-tools.cjs] |
| Claim-gate helper | `bin/lib/ljx-claim-gate-tools.cjs` | Exposes `CLAIMS`, internal evaluator concepts, and downstream claim routes. | Share the claim judgment state path and mark evaluator artifacts as missing, present, intentionally pending, or stale without silently running them. [VERIFIED: bin/lib/ljx-claim-gate-tools.cjs] |
| Generated skill builders | `bin/lib/codex-conversion.cjs`, `bin/lib/build-skills.cjs` | Generate and install ljx-GSD skill surfaces. | Update wording and copied helper lists when runtime semantics or helper imports change. [VERIFIED: bin/lib/codex-conversion.cjs; bin/lib/build-skills.cjs] |

### Dependencies

- Do not add npm packages for Phase 11; the repository already uses Node built-ins for path handling, file I/O, and tests. [VERIFIED: package.json; bin/lib/ljx-runtime-state.cjs; tests/experiment-plan-bridge.test.cjs]
- Use `node --test` rather than Jest/Vitest because the repository test script is `node --test tests/*.test.cjs`. [VERIFIED: package.json]

## Architecture Patterns

### Recommended State Shape

```text
.planning/
├── phases/{phase-dir}/
│   ├── {phase}-EXPERIMENT_PLAN.md
│   ├── {phase}-EXPERIMENT_TRACKER.md
│   ├── {phase}-EXPERIMENT_RESULTS.md
│   ├── {phase}-REVIEW_LOOP.md
│   ├── {phase}-RESEARCH_REVIEW.md
│   ├── {phase}-RESULT_TO_CLAIM.md
│   └── {phase}-CLAIMS.md
└── state/
    ├── experiments/{phase}.json
    ├── reviews/{phase}.json
    └── claims/{phase}.json
```

This layout preserves the established human-readable phase-local artifact surface while adding structured state only for routing, continuity, evidence ownership, and freshness. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; .planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md; .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md]

### Pattern 1: State Families Are Allowed Centrally

`bin/lib/ljx-runtime-state.cjs` currently allows `phase-records`, `sessions`, `workstreams`, `reviews`, `papers`, `research/idea-portfolios`, and `research/refinement-sessions`, but it does not currently allow `experiments` or `claims`. [VERIFIED: bin/lib/ljx-runtime-state.cjs]

Phase 5 already accepted `experiments/{phase_id}.json` and `claims/{phase_id}.json` as canonical state families, so Phase 11 should add those two families rather than inventing an unrelated `research/evidence-bundles` family. [VERIFIED: .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md; bin/lib/ljx-runtime-state.cjs]

### Pattern 2: Evidence Bundle Is a Link Layer

The evidence bundle should store artifact references and summary fields such as `missing`, `present`, `intentionally_pending`, `updated_by`, and `updated_at`; it should not duplicate the full markdown artifact contents. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; .planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md]

The bundle should link at least `EXPERIMENT_PLAN`, `EXPERIMENT_TRACKER`, `EXPERIMENT_RESULTS`, `REVIEW_LOOP`, `RESEARCH_REVIEW`, `RESULT_TO_CLAIM`, and `CLAIMS`. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

### Pattern 3: Domain Helper Owns Repeated Evidence Logic

Add one small domain helper such as `bin/lib/ljx-experiment-evidence-tools.cjs` to build evidence/claim paths and artifact-link summaries, while keeping JSON read/write permission and family allowlisting inside `ljx-runtime-state.cjs`. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; bin/lib/ljx-runtime-state.cjs]

This helper should be imported by the six Phase 11 helper flows so file names, `exists` checks, state paths, and link summaries cannot drift across helpers. [VERIFIED: .planning/IMPLEMENTATION-LESSONS.md; bin/lib/ljx-experiment-plan-tools.cjs; bin/lib/ljx-claim-gate-tools.cjs]

If this helper is added, `bin/lib/build-skills.cjs` must copy it into the generated runtime and `bin/lib/codex-conversion.cjs` must describe the shared evidence bundle in generated skill wording. [VERIFIED: bin/lib/build-skills.cjs; bin/lib/codex-conversion.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

### Pattern 4: Keep Review Modes Distinct

`review-loop` is iterative and already writes `reviews/{phase}.json` through `writeReviewLoopState()`, so it should keep that state owner and only add an evidence-bundle reference. [VERIFIED: bin/lib/ljx-review-loop-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

`research-review` is a single-round critique artifact and should link into the same evidence bundle without calling or imitating `writeReviewLoopState()`. [VERIFIED: /Users/lijiaxin/.codex/skills/research-review/SKILL.md; bin/lib/ljx-research-review-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

### Pattern 5: Claim Judgment Is Not Claim Gate Completion

`result-to-claim` owns the narrow judgment from experiment results to claim support, while `claim-gate` owns aggregate readiness and downstream routing. [VERIFIED: /Users/lijiaxin/.codex/skills/result-to-claim/SKILL.md; bin/lib/ljx-result-to-claim-tools.cjs; bin/lib/ljx-claim-gate-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

`claim-gate` may expose internal evaluator concepts for `result-to-claim` and `research-review`, but it must represent missing evaluator artifacts as missing rather than silently marking them complete. [VERIFIED: bin/lib/ljx-claim-gate-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| State family writes | Direct `fs.writeFileSync()` to arbitrary `.planning/state/...` JSON files | `writeStateRecord()` after adding allowed `experiments` and `claims` families | Existing helper centralizes directory creation, JSON formatting, and family validation. [VERIFIED: bin/lib/ljx-runtime-state.cjs] |
| Phase context resolution | Local phase lookup and artifact path parsing in each helper | `readPhaseWorkflowContext()` plus one shared evidence helper | Existing helper centralizes phase selection, context file loading, artifact exclusions, and recommendations. [VERIFIED: bin/lib/ljx-phase-context.cjs] |
| Experiment execution engine | Inline GPU launch, monitoring, or training health logic in `experiment-bridge` | Auto companion routes: `run-experiment`, `monitor-experiment`, and `training-check` | Auto bridge intent keeps execution bounded by companion skills. [VERIFIED: /Users/lijiaxin/.codex/skills/experiment-bridge/SKILL.md; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md] |
| Review-loop state machine | A new review state writer under experiment or claim helpers | Existing `reviews` family and `writeReviewLoopState()` | Review-loop already owns iterative review continuity. [VERIFIED: bin/lib/ljx-review-loop-tools.cjs] |
| Claim readiness inference | File-presence-only continuation decisions | Shared artifact-link summaries with missing/present/intentionally pending/stale status | Phase 11 requires replacing bridge-era phase-local heuristics where continuation needs structured truth. [VERIFIED: .planning/ROADMAP.md; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md] |
| Generated skill installation | Manual copying or untracked generated helper dependencies | `buildBridgeReadySkills()` and existing install/preview path | Install/build output is generated through the builder helpers and must stay aligned. [VERIFIED: bin/lib/build-skills.cjs; bin/lib/codex-conversion.cjs] |
| Lifecycle truth | A new outer experiment/review/claim controller | Existing lifecycle shell, phase-local artifacts, and runtime state links | GSD remains the outer control plane and `next` remains one-step. [VERIFIED: .planning/PROJECT.md; bin/lib/ljx-lifecycle-shell-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md] |

**Key insight:** the evidence bundle is a consistency layer over existing artifacts and state families, not a second scheduler or lifecycle state machine. [VERIFIED: .planning/PROJECT.md; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

## Common Pitfalls

### Pitfall 1: Creating a Second Control Plane

**What goes wrong:** a new evidence bundle becomes the only truth for phase progress and starts competing with phase-local artifacts, lifecycle execute evidence, and quality gates. [VERIFIED: .planning/IMPLEMENTATION-LESSONS.md; .planning/PROJECT.md]

**How to avoid:** keep markdown artifacts as the operator-facing surface, keep lifecycle adoption in `ljx-lifecycle-shell-tools.cjs`, and keep the evidence bundle as a link/summary record. [VERIFIED: bin/lib/ljx-lifecycle-shell-tools.cjs; .planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md]

### Pitfall 2: Writing Empty State During Context Reads

**What goes wrong:** helper context commands appear to have created experiment or claim evidence even when no workflow actually produced evidence. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

**How to avoid:** expose intended `evidenceStateRecordPath` and `claimStateRecordPath` during context reads, but write records only from explicit workflow output/update paths. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; bin/lib/ljx-runtime-state.cjs]

### Pitfall 3: Treating `research-review` as `review-loop`

**What goes wrong:** one-round critique artifacts get written into iterative `reviews` state, causing downstream routing to think a full review-loop has run. [VERIFIED: /Users/lijiaxin/.codex/skills/research-review/SKILL.md; /Users/lijiaxin/.codex/skills/auto-review-loop/SKILL.md; bin/lib/ljx-review-loop-tools.cjs]

**How to avoid:** let `research-review` write/link only its phase-local `RESEARCH_REVIEW` artifact and evidence-bundle reference. [VERIFIED: bin/lib/ljx-research-review-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

### Pitfall 4: Letting Claim Gate Run Invisible Evaluators

**What goes wrong:** `claim-gate` reports readiness as if `result-to-claim` or `research-review` ran when only evaluator names were present in helper context. [VERIFIED: bin/lib/ljx-claim-gate-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

**How to avoid:** helper context should expose evaluator artifact paths and missing/present/intentionally pending/stale status, not completed status unless the artifact/state exists and is fresh relative to newer inputs. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

### Pitfall 5: Treating Experiment Planning as Execute Evidence

**What goes wrong:** lifecycle routing can advance an experiment phase based on `EXPERIMENT_PLAN` alone rather than actual execution evidence. [VERIFIED: bin/lib/ljx-lifecycle-shell-tools.cjs; tests/execute-phase-shell.test.cjs]

**How to avoid:** preserve the existing distinction: experiment planning evidence satisfies planning readiness, while `EXPERIMENT_RESULTS` or exact execute artifacts satisfy execution evidence. [VERIFIED: bin/lib/ljx-lifecycle-shell-tools.cjs; tests/execute-phase-shell.test.cjs]

### Pitfall 6: Updating Runtime But Not Generated Skill Surface

**What goes wrong:** installed skills and preview output continue to describe bridge-era heuristics after helper semantics change. [VERIFIED: .planning/IMPLEMENTATION-LESSONS.md; tests/skill-build.test.cjs; bin/lib/codex-conversion.cjs]

**How to avoid:** update generated skill builders and run focused `tests/skill-build.test.cjs` plus `node bin/install.js --preview`. [VERIFIED: tests/skill-build.test.cjs; package.json; bin/lib/build-skills.cjs]

## Code Examples

### Add State Families Through the Runtime Allowlist

```javascript
// Source pattern: bin/lib/ljx-runtime-state.cjs
const STATE_FAMILIES = new Set([
  'phase-records',
  'sessions',
  'workstreams',
  'reviews',
  'experiments',
  'claims',
  'papers',
  'research/idea-portfolios',
  'research/refinement-sessions',
]);
```

This is the preferred family-level change because Phase 5 already named `experiments` and `claims`, and the current runtime helper is the allowlist owner. [VERIFIED: .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md; bin/lib/ljx-runtime-state.cjs]

### Build Shared Artifact Links In One Helper

```javascript
// Source pattern: readPhaseWorkflowContext() extraFields and artifact path helpers.
function buildExperimentEvidenceLinks(context) {
  return {
    experimentPlan: artifactLink(context, 'EXPERIMENT_PLAN'),
    experimentTracker: artifactLink(context, 'EXPERIMENT_TRACKER'),
    experimentResults: artifactLink(context, 'EXPERIMENT_RESULTS'),
    reviewLoop: artifactLink(context, 'REVIEW_LOOP'),
    researchReview: artifactLink(context, 'RESEARCH_REVIEW'),
    resultToClaim: artifactLink(context, 'RESULT_TO_CLAIM'),
    claims: artifactLink(context, 'CLAIMS'),
  };
}
```

The helper should return paths and existence/missing status; it should not write state when the caller only resolved context. [VERIFIED: bin/lib/ljx-phase-context.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

### Expose Shared Paths From Each Flow Helper

```javascript
// Source pattern: bin/lib/ljx-review-loop-tools.cjs read + write split.
const evidenceStateRecordPath = buildStateRecordPath(projectRoot, 'experiments', context.phase.id);
const claimStateRecordPath = buildStateRecordPath(projectRoot, 'claims', context.phase.id);

return {
  ...context,
  evidenceStateRecordPath,
  claimStateRecordPath,
  evidenceLinks: buildExperimentEvidenceLinks(context),
};
```

This mirrors the existing `reviewStateRecordPath` pattern while keeping review-loop continuity in the `reviews` state family. [VERIFIED: bin/lib/ljx-review-loop-tools.cjs; bin/lib/ljx-runtime-state.cjs]

### Preserve Honest Stop On Missing Experiment Plan

```javascript
// Source pattern: bin/lib/ljx-experiment-bridge-tools.cjs
if (!experimentPlanExists) {
  return {
    stopReasonCode: 'missing_experiment_plan',
    recommendations: ['ljx-GSD-experiment-plan {phase}'],
  };
}
```

The exact implementation should preserve the existing missing-plan route while adding evidence paths around successful context resolution. [VERIFIED: bin/lib/ljx-experiment-bridge-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

## Recommended Implementation Strategy

### 1. Add Runtime State Families And Shared Evidence Helper

- Add `experiments` and `claims` to `STATE_FAMILIES` in `bin/lib/ljx-runtime-state.cjs`; do not add a new `research/evidence-bundles` family unless implementation uncovers a stronger existing precedent. [VERIFIED: .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md; bin/lib/ljx-runtime-state.cjs]
- Add a narrow helper such as `bin/lib/ljx-experiment-evidence-tools.cjs` for artifact link construction, evidence state paths, claim state paths, and optional state update wrappers. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; bin/lib/ljx-phase-context.cjs]
- Keep the helper schema small: `phaseId`, `artifacts`, `executionStatus`, `reviewStatus`, `claimStatus`, `missing`, `intentionallyPending`, and `updatedBy` are sufficient for routing without replacing markdown artifacts. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; .planning/IMPLEMENTATION-LESSONS.md]

### 2. Converge Experiment Plan And Experiment Bridge

- Update `bin/lib/ljx-experiment-plan-tools.cjs` to expose `evidenceStateRecordPath`, `evidenceLinks`, and accepted tracker/results artifact paths. [VERIFIED: bin/lib/ljx-experiment-plan-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
- Update `bin/lib/ljx-experiment-bridge-tools.cjs` to expose the same `evidenceStateRecordPath` and `evidenceLinks` when the experiment plan exists. [VERIFIED: bin/lib/ljx-experiment-bridge-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
- Preserve `missing_experiment_plan` behavior and the recommendation back to `ljx-GSD-experiment-plan`. [VERIFIED: bin/lib/ljx-experiment-bridge-tools.cjs; tests/experiment-bridge-bridge.test.cjs]
- Preserve Auto companion-skill routes `run-experiment`, `monitor-experiment`, and `training-check`; do not inline or delete those capabilities. [VERIFIED: /Users/lijiaxin/.codex/skills/experiment-bridge/SKILL.md; bin/lib/ljx-experiment-bridge-tools.cjs]

### 3. Converge Review Loop And Research Review Without Merging Them

- Update `bin/lib/ljx-review-loop-tools.cjs` to include the shared evidence link summary while retaining `reviewStateRecordPath` and `writeReviewLoopState()`. [VERIFIED: bin/lib/ljx-review-loop-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
- Update `bin/lib/ljx-research-review-tools.cjs` to expose the same `evidenceStateRecordPath` and `evidenceLinks`, but do not add the iterative review-loop state writer there. [VERIFIED: bin/lib/ljx-research-review-tools.cjs; /Users/lijiaxin/.codex/skills/research-review/SKILL.md]
- Add or preserve an explicit mode field such as `reviewMode: 'iterative'` for `review-loop` and `reviewMode: 'single_round'` for `research-review` if tests need an unambiguous route signal. [VERIFIED: /Users/lijiaxin/.codex/skills/auto-review-loop/SKILL.md; /Users/lijiaxin/.codex/skills/research-review/SKILL.md]

### 4. Converge Result-To-Claim And Claim Gate

- Update `bin/lib/ljx-result-to-claim-tools.cjs` to expose `claimStateRecordPath`, `evidenceStateRecordPath`, and evidence links for results/reviews/claims. [VERIFIED: bin/lib/ljx-result-to-claim-tools.cjs; /Users/lijiaxin/.codex/skills/result-to-claim/SKILL.md]
- Update `bin/lib/ljx-claim-gate-tools.cjs` to expose the same `claimStateRecordPath` and a readiness summary that distinguishes missing, present, stale, and intentionally pending evidence. [VERIFIED: bin/lib/ljx-claim-gate-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
- Keep `result-to-claim` as the narrow claim support evaluator and keep `claim-gate` as aggregate readiness; do not make either silently run the other. [VERIFIED: /Users/lijiaxin/.codex/skills/result-to-claim/SKILL.md; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
- Keep downstream routes as recommendations only: `ablation-planner`, `experiment-plan`, and `paper-pipeline` should remain explicit next steps. [VERIFIED: bin/lib/ljx-result-to-claim-tools.cjs; bin/lib/ljx-claim-gate-tools.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

### 5. Align Generated Skills And Preview Install

- Update `bin/lib/codex-conversion.cjs` so generated `experiment-plan`, `experiment-bridge`, `review-loop`, `research-review`, `result-to-claim`, and `claim-gate` skills describe the shared evidence bundle and the distinct ownership boundaries. [VERIFIED: bin/lib/codex-conversion.cjs; tests/skill-build.test.cjs]
- Update `bin/lib/build-skills.cjs` to copy any new shared helper into installed runtime output. [VERIFIED: bin/lib/build-skills.cjs]
- Run preview install verification because Phase 11 changes visible skill behavior, not only internal helper output. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; tests/skill-build.test.cjs]

### Six-Flow Coverage Matrix

| Flow | Existing Owner | Phase 11 Change |
|------|----------------|-----------------|
| `experiment-plan` | `bin/lib/ljx-experiment-plan-tools.cjs` | Expose shared evidence bundle path/links and accepted tracker/results contract. [VERIFIED: bin/lib/ljx-experiment-plan-tools.cjs] |
| `experiment-bridge` | `bin/lib/ljx-experiment-bridge-tools.cjs` | Preserve missing-plan stop and expose same bundle path/links on success. [VERIFIED: bin/lib/ljx-experiment-bridge-tools.cjs] |
| `review-loop` | `bin/lib/ljx-review-loop-tools.cjs` | Keep `reviews` writer and link iterative review state to bundle. [VERIFIED: bin/lib/ljx-review-loop-tools.cjs] |
| `research-review` | `bin/lib/ljx-research-review-tools.cjs` | Link single-round critique artifact to bundle without review-loop state writes. [VERIFIED: bin/lib/ljx-research-review-tools.cjs] |
| `result-to-claim` | `bin/lib/ljx-result-to-claim-tools.cjs` | Add claim/evidence paths and narrow judgment summary links. [VERIFIED: bin/lib/ljx-result-to-claim-tools.cjs] |
| `claim-gate` | `bin/lib/ljx-claim-gate-tools.cjs` | Add aggregate readiness summary and missing/present/intentionally pending/stale evaluator artifact status. [VERIFIED: bin/lib/ljx-claim-gate-tools.cjs] |

## Verification Strategy

### Tests That Should Fail Before Implementation And Pass After

- `tests/runtime-state.test.cjs`: assert `buildStateRecordPath(projectRoot, 'experiments', phaseId)` and `buildStateRecordPath(projectRoot, 'claims', phaseId)` are accepted. [VERIFIED: tests/runtime-state.test.cjs; bin/lib/ljx-runtime-state.cjs]
- `tests/experiment-plan-bridge.test.cjs`: assert experiment-plan exposes `evidenceStateRecordPath`, `evidenceLinks.experimentPlan`, `evidenceLinks.experimentTracker`, and the same state path later used by experiment-bridge. [VERIFIED: tests/experiment-plan-bridge.test.cjs; bin/lib/ljx-experiment-plan-tools.cjs]
- `tests/experiment-bridge-bridge.test.cjs`: assert missing plan still stops with `missing_experiment_plan`, and a present plan exposes shared evidence links for plan/tracker/results without writing empty state. [VERIFIED: tests/experiment-bridge-bridge.test.cjs; bin/lib/ljx-experiment-bridge-tools.cjs]
- `tests/review-loop-bridge.test.cjs`: assert review-loop retains `reviewStateRecordPath`/`writeReviewLoopState()` and also exposes `evidenceStateRecordPath`. [VERIFIED: tests/review-loop-bridge.test.cjs; bin/lib/ljx-review-loop-tools.cjs]
- `tests/research-review-bridge.test.cjs`: assert research-review exposes the same evidence bundle path while not exposing the iterative review-loop writer. [VERIFIED: tests/research-review-bridge.test.cjs; bin/lib/ljx-research-review-tools.cjs]
- `tests/result-to-claim-bridge.test.cjs`: assert result-to-claim exposes `claimStateRecordPath`, links `EXPERIMENT_RESULTS`, and distinguishes missing, present, intentionally pending, and stale claim evidence where applicable. [VERIFIED: tests/result-to-claim-bridge.test.cjs; bin/lib/ljx-result-to-claim-tools.cjs]
- `tests/claim-gate-bridge.test.cjs`: assert claim-gate exposes the same claim/evidence paths and does not mark `result-to-claim` or `research-review` evaluator artifacts as complete when absent. [VERIFIED: tests/claim-gate-bridge.test.cjs; bin/lib/ljx-claim-gate-tools.cjs]
- `tests/skill-build.test.cjs`: assert generated skill wording mentions shared evidence bundle semantics, preserves Auto companion routes, and preview runtime includes any new shared helper. [VERIFIED: tests/skill-build.test.cjs; bin/lib/codex-conversion.cjs; bin/lib/build-skills.cjs]

### Commands

```bash
node --check bin/lib/ljx-runtime-state.cjs
test ! -f bin/lib/ljx-experiment-evidence-tools.cjs || node --check bin/lib/ljx-experiment-evidence-tools.cjs
node --check bin/lib/ljx-experiment-plan-tools.cjs
node --check bin/lib/ljx-experiment-bridge-tools.cjs
node --check bin/lib/ljx-review-loop-tools.cjs
node --check bin/lib/ljx-research-review-tools.cjs
node --check bin/lib/ljx-result-to-claim-tools.cjs
node --check bin/lib/ljx-claim-gate-tools.cjs
node --check bin/lib/codex-conversion.cjs
node --check bin/lib/build-skills.cjs
node --test tests/runtime-state.test.cjs tests/experiment-plan-bridge.test.cjs tests/experiment-bridge-bridge.test.cjs tests/review-loop-bridge.test.cjs tests/research-review-bridge.test.cjs tests/result-to-claim-bridge.test.cjs tests/claim-gate-bridge.test.cjs tests/skill-build.test.cjs
node bin/install.js --preview
npm test
```

These commands match the repository's Node/CommonJS stack and its existing npm test script. [VERIFIED: package.json; tests/*.test.cjs]

### Lifecycle Regression Checks

- If implementation touches `bin/lib/ljx-lifecycle-shell-tools.cjs`, also run `node --test tests/execute-phase-shell.test.cjs tests/lifecycle-next.test.cjs tests/verify-work-bridge.test.cjs`. [VERIFIED: bin/lib/ljx-lifecycle-shell-tools.cjs; tests/execute-phase-shell.test.cjs; tests/lifecycle-next.test.cjs; tests/verify-work-bridge.test.cjs]
- Verify experiment planning artifacts do not count as experiment execution evidence by themselves. [VERIFIED: bin/lib/ljx-lifecycle-shell-tools.cjs; tests/execute-phase-shell.test.cjs]
- Verify direct and lifecycle invocation still converge on the same phase-local artifacts. [VERIFIED: .planning/phases/08-complete-core-lifecycle-shell/08-CONTEXT.md; LJX-GSD-CORE-COMMAND-SPECS.md]

### Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | Helper syntax checks and `node --test` suites | yes | `v24.14.1` | None needed. [VERIFIED: `node --version`; package.json] |
| npm | `npm test` and preview install command access | yes | `11.11.0` | Use direct `node --test` commands for focused suites if npm script invocation is not needed. [VERIFIED: `npm --version`; package.json] |

**Missing dependencies with no fallback:** none found for Phase 11 research and planned local verification. [VERIFIED: `node --version`; `npm --version`; package.json]

**Missing dependencies with fallback:** none found for Phase 11 research and planned local verification. [VERIFIED: `node --version`; `npm --version`; package.json]

### Security Domain

- Authentication, session management, and cryptographic controls do not apply to the Phase 11 helper changes because the target files are local CLI/helper modules and generated skill text, not a networked auth surface. [VERIFIED: bin/lib/ljx-experiment-plan-tools.cjs; bin/lib/ljx-claim-gate-tools.cjs; .planning/ROADMAP.md]
- Input validation does apply to phase IDs, state family names, and artifact paths; reuse `resolvePhaseSelection()`, `readPhaseWorkflowContext()`, and `buildStateRecordPath()` rather than open-coded path construction. [VERIFIED: bin/lib/ljx-runtime-core.cjs; bin/lib/ljx-phase-context.cjs; bin/lib/ljx-runtime-state.cjs]
- The main tampering risk is stale or fabricated state records; avoid it by not writing empty state on context reads and by representing evaluator artifacts as missing until they exist. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; bin/lib/ljx-runtime-state.cjs]

## Confidence And Resolved Questions

### Confidence

| Area | Level | Reason |
|------|-------|--------|
| Standard Stack | HIGH | The repository has a Node/CommonJS package, built-in `node --test` suites, and no Phase 11 need for new npm dependencies. [VERIFIED: package.json; tests/experiment-plan-bridge.test.cjs] |
| Architecture | HIGH | The phase context, Phase 5 state plan, Phase 9 quality-gate pattern, Phase 10 research-state pattern, and current helpers point to phase-local artifacts plus structured state links. [VERIFIED: .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md; .planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md; .planning/phases/10-complete-discovery-and-refinement-workflows/10-CONTEXT.md; bin/lib/*.cjs] |
| Exact Schema Fields | MEDIUM | The phase context explicitly leaves exact JSON schema fields to the agent's discretion. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md] |
| Generated Skill Surface | HIGH | Existing tests cover generated skill wording and preview install behavior, and Phase 11 explicitly requires those surfaces to stay aligned. [VERIFIED: tests/skill-build.test.cjs; bin/lib/codex-conversion.cjs; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md] |

### Resolved Questions

No unresolved Phase 11 research questions remain after the revision pass. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]

1. **RESOLVED:** claim judgment summary is written by both claim helpers with distinct ownership. `result-to-claim` writes narrow support judgment fields into `claims/{phase}.json` with `updatedBy: 'result-to-claim'`; `claim-gate` writes aggregate readiness fields into the same record with `updatedBy: 'claim-gate'`. Both writers must preserve distinct fields and must not overwrite each other's meaning. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md; /Users/lijiaxin/.codex/skills/result-to-claim/SKILL.md; bin/lib/ljx-result-to-claim-tools.cjs; bin/lib/ljx-claim-gate-tools.cjs]
2. **RESOLVED:** the shared helper is named `ljx-experiment-evidence-tools.cjs` because the bundle is scoped to experiment/review/claim evidence and should not look like a global lifecycle evidence controller. [VERIFIED: .planning/PROJECT.md; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
3. **RESOLVED:** Phase 11 does not change lifecycle routing. Current public specs continue to place `result-to-claim` as a direct/internal evaluator concept and `claim-gate` as the analysis execute route; lifecycle routing changes remain out of scope unless a later phase explicitly reopens them. [VERIFIED: LJX-GSD-CORE-COMMAND-SPECS.md; bin/lib/ljx-lifecycle-shell-tools.cjs]

### Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | This research remains valid until 2026-05-11 unless Phase 11 helper files change substantially. [ASSUMED] | Metadata | Planner could overtrust stale helper details after implementation changes land. |

## Sources

### Primary

- `.planning/ROADMAP.md` - Phase 11 goal, plan slots, success criteria, and IMPL-05 linkage. [VERIFIED: .planning/ROADMAP.md]
- `.planning/REQUIREMENTS.md` - IMPL-05 and related research-state requirements. [VERIFIED: .planning/REQUIREMENTS.md]
- `.planning/PROJECT.md` - control-plane, preservation, and integration guardrails. [VERIFIED: .planning/PROJECT.md]
- `.planning/STATE.md` - current Phase 11 risk notes and generated-surface risks. [VERIFIED: .planning/STATE.md]
- `.planning/IMPLEMENTATION-LESSONS.md` - semantic reuse, truth-engine, install-output, and review-depth lessons. [VERIFIED: .planning/IMPLEMENTATION-LESSONS.md]
- `.planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md` - locked Phase 11 constraints and discretion. [VERIFIED: .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
- `.planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md` - accepted state family policy for experiments, reviews, claims, papers, and research subfamilies. [VERIFIED: .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md]
- `.planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md` - phase-local markdown plus structured summary/link record pattern. [VERIFIED: .planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md]
- `.planning/phases/10-complete-discovery-and-refinement-workflows/10-CONTEXT.md` and `10-03-SUMMARY.md` - research-state and generated-surface precedent. [VERIFIED: .planning/phases/10-complete-discovery-and-refinement-workflows/10-CONTEXT.md; .planning/phases/10-complete-discovery-and-refinement-workflows/10-03-SUMMARY.md]
- `bin/lib/ljx-runtime-state.cjs`, `bin/lib/ljx-runtime-core.cjs`, and `bin/lib/ljx-phase-context.cjs` - runtime state, phase context, and core routing helpers. [VERIFIED: bin/lib/ljx-runtime-state.cjs; bin/lib/ljx-runtime-core.cjs; bin/lib/ljx-phase-context.cjs]
- `bin/lib/ljx-experiment-plan-tools.cjs`, `bin/lib/ljx-experiment-bridge-tools.cjs`, `bin/lib/ljx-review-loop-tools.cjs`, `bin/lib/ljx-research-review-tools.cjs`, `bin/lib/ljx-result-to-claim-tools.cjs`, and `bin/lib/ljx-claim-gate-tools.cjs` - six Phase 11 helper flows. [VERIFIED: bin/lib/ljx-experiment-plan-tools.cjs; bin/lib/ljx-experiment-bridge-tools.cjs; bin/lib/ljx-review-loop-tools.cjs; bin/lib/ljx-research-review-tools.cjs; bin/lib/ljx-result-to-claim-tools.cjs; bin/lib/ljx-claim-gate-tools.cjs]
- `bin/lib/build-skills.cjs` and `bin/lib/codex-conversion.cjs` - generated skill and preview-install surfaces. [VERIFIED: bin/lib/build-skills.cjs; bin/lib/codex-conversion.cjs]
- `/Users/lijiaxin/.codex/skills/experiment-plan/SKILL.md`, `/Users/lijiaxin/.codex/skills/experiment-bridge/SKILL.md`, `/Users/lijiaxin/.codex/skills/auto-review-loop/SKILL.md`, `/Users/lijiaxin/.codex/skills/research-review/SKILL.md`, `/Users/lijiaxin/.codex/skills/result-to-claim/SKILL.md`, and `/Users/lijiaxin/.codex/skills/ablation-planner/SKILL.md` - Auto workflow preservation targets. [VERIFIED: /Users/lijiaxin/.codex/skills/experiment-plan/SKILL.md; /Users/lijiaxin/.codex/skills/experiment-bridge/SKILL.md; /Users/lijiaxin/.codex/skills/auto-review-loop/SKILL.md; /Users/lijiaxin/.codex/skills/research-review/SKILL.md; /Users/lijiaxin/.codex/skills/result-to-claim/SKILL.md; /Users/lijiaxin/.codex/skills/ablation-planner/SKILL.md]

### Secondary

- `LJX-GSD-DESIGN-DECISION-LOG.md`, `LJX-GSD-CORE-COMMAND-SPECS.md`, `LJX-GSD-INTERFACES.md`, and `LJX-GSD-SKILL-MIGRATION-DETAILED.md` - accepted design and interface-level constraints used to validate routing recommendations. [VERIFIED: LJX-GSD-DESIGN-DECISION-LOG.md; LJX-GSD-CORE-COMMAND-SPECS.md; LJX-GSD-INTERFACES.md; LJX-GSD-SKILL-MIGRATION-DETAILED.md]
- Existing test files under `tests/` - focused verification patterns and generated skill expectations. [VERIFIED: tests/experiment-plan-bridge.test.cjs; tests/experiment-bridge-bridge.test.cjs; tests/review-loop-bridge.test.cjs; tests/research-review-bridge.test.cjs; tests/result-to-claim-bridge.test.cjs; tests/claim-gate-bridge.test.cjs; tests/skill-build.test.cjs]

### Tertiary

- None. No web-only or unverified external sources were used. [VERIFIED: this research session]

## Metadata

**Confidence breakdown:** Standard stack HIGH, architecture HIGH, pitfalls HIGH, exact JSON field names MEDIUM. [VERIFIED: package.json; .planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md]
**Research date:** 2026-04-11. [VERIFIED: environment context]
**Valid until:** 2026-05-11 for local repository architecture, or earlier if Phase 11 helper files change substantially. [ASSUMED]
