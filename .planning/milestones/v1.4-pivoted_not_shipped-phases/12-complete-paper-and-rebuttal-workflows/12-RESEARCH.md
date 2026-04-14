# Phase 12: Paper And Rebuttal Completion - Research

**Researched:** 2026-04-11 [VERIFIED: environment context]
**Domain:** Local ljx-GSD Node/CommonJS workflow helper integration for paper-pipeline and rebuttal state, workspace, and routing semantics. [VERIFIED: package.json; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]
**Confidence:** HIGH for current repository facts and MEDIUM for exact paper-state JSON field naming because Phase 12 leaves schema vocabulary to implementation discretion. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

## Summary

Phase 12 should not create a submission controller beside GSD. The smallest coherent model is phase-local paper/rebuttal artifacts plus the already-accepted `.planning/state/papers/{phase}.json` link and recovery record. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md; .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md]

The recommended implementation is to add one narrow shared paper-state helper that both `paper-pipeline` and `rebuttal` call for paper-state paths, artifact links, and writer preflight validation. `paper-pipeline` should keep its explicit writer but change it from overwrite semantics to validated, field-preserving updates. `rebuttal` should add a narrow explicit writer that updates the same `papers` record without inventing a second rebuttal state family. [VERIFIED: bin/lib/ljx-paper-pipeline-tools.cjs; bin/lib/ljx-rebuttal-tools.cjs; bin/lib/ljx-runtime-state.cjs; bin/lib/ljx-experiment-evidence-tools.cjs]

Generated skill wording and preview install output must change with the runtime helper changes because this project treats generated skills as part of the product surface. [VERIFIED: .planning/IMPLEMENTATION-LESSONS.md; bin/lib/codex-conversion.cjs; bin/lib/build-skills.cjs]

**Primary recommendation:** reuse `papers/{phase}.json`; add `bin/lib/ljx-paper-evidence-tools.cjs` for paper/rebuttal state path, artifact-link, readiness, and validation rules; update `paper-pipeline` and `rebuttal` writers to preserve each other's owned fields and reject malformed or mismatched existing state before writing. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md; bin/lib/ljx-runtime-state.cjs; bin/lib/ljx-paper-pipeline-tools.cjs; bin/lib/ljx-rebuttal-tools.cjs]

## Phase Requirement

| ID | Description | Research Support |
|----|-------------|------------------|
| IMPL-06 | Paper and rebuttal workflows complete without inventing a second submission control plane. | Keep paper and rebuttal artifacts in bounded phase/workspace files, link them through `papers/{phase}.json`, and expose routing recommendations without hidden lifecycle mutation or hidden experiment execution. [VERIFIED: .planning/REQUIREMENTS.md; .planning/ROADMAP.md; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md] |

## User Constraints

The implementation approach for Phase 12 must preserve the project-level constraints already locked in the context file. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

- GSD remains the outer control plane and `.planning/` remains the authoritative root. [VERIFIED: .planning/PROJECT.md; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]
- Auto paper-writing and rebuttal workflows are adapted as native ljx-GSD workflows, but their companion-stage intent must not be deleted or collapsed into generic summaries. [VERIFIED: /Users/lijiaxin/.codex/skills/paper-writing/SKILL.md; /Users/lijiaxin/.codex/skills/rebuttal/SKILL.md; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]
- Minimal modification means extending current helpers and tests, not replacing the helper stack wholesale. [VERIFIED: bin/lib/ljx-paper-pipeline-tools.cjs; bin/lib/ljx-rebuttal-tools.cjs; .planning/IMPLEMENTATION-LESSONS.md]
- Context reads may expose intended state/workspace paths but must not create empty paper-state records. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]
- Paper-state writers must stop on malformed or mismatched existing records and must preserve owned fields from the other paper workflow. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

## Standard Stack

### Core

| Component | Version/Path | Purpose | Standard Use |
|-----------|--------------|---------|--------------|
| Node.js | Runtime available in the repository environment and package requires `>=22.0.0`. | Execute CommonJS helper modules and `node --test` suites. | Use the existing Node runtime and built-in modules; do not add a new runtime or package. [VERIFIED: package.json] |
| npm | Repository package manager. | Run `npm test` and preview install scripts. | Use existing npm scripts for test and preview verification. [VERIFIED: package.json] |
| CommonJS helpers | `bin/lib/*.cjs` | Host ljx-GSD runtime, workflow context, bridge helpers, generated-skill builders, and runtime-state helpers. | Extend current helper modules instead of replacing them. [VERIFIED: bin/lib/ljx-runtime-core.cjs; bin/lib/ljx-phase-context.cjs; bin/lib/codex-conversion.cjs] |
| `node:test` | Built into Node.js. | Run repository `.test.cjs` suites. | Add focused tests under `tests/*.test.cjs`; no external test framework is needed. [VERIFIED: package.json; tests/paper-pipeline-bridge.test.cjs; tests/rebuttal-bridge.test.cjs] |
| Runtime state helper | `bin/lib/ljx-runtime-state.cjs` | Own supported state families and JSON read/write/update helpers. | Keep `papers` writes behind this helper and do not bypass it with direct `.planning/state/` writes. [VERIFIED: bin/lib/ljx-runtime-state.cjs] |
| Phase context helpers | `bin/lib/ljx-phase-context.cjs` | Centralize phase resolution, context loading, artifact filtering, recommendations, and honest stops. | Reuse `readPhaseWorkflowContext()` and `readCommandPhaseContext()` rather than adding local phase resolvers. [VERIFIED: bin/lib/ljx-phase-context.cjs] |

### Paper And Rebuttal Helpers

| Component | Path | Purpose | Phase 12 Use |
|-----------|------|---------|--------------|
| Paper pipeline helper | `bin/lib/ljx-paper-pipeline-tools.cjs` | Exposes paper-pipeline context, paper workspace paths, Auto companion skills, downstream routes, and a `papers` writer. | Preserve context surface, add shared paper-state links/readiness, and harden the writer to validate and preserve existing state. [VERIFIED: bin/lib/ljx-paper-pipeline-tools.cjs] |
| Rebuttal helper | `bin/lib/ljx-rebuttal-tools.cjs` | Exposes rebuttal context, workspace paths, missing-review honest stop, resume inference, venue constraints, and downstream routes. | Preserve missing-review/resume behavior, add shared paper-state links/readiness, and add a narrow rebuttal writer into the same `papers` record. [VERIFIED: bin/lib/ljx-rebuttal-tools.cjs] |
| Experiment evidence helper | `bin/lib/ljx-experiment-evidence-tools.cjs` | Phase 11 pattern for shared link/readiness semantics and writer validation. | Use as the implementation pattern for a small paper-state helper, not as a paper-specific dependency. [VERIFIED: bin/lib/ljx-experiment-evidence-tools.cjs] |
| Lifecycle shell helper | `bin/lib/ljx-lifecycle-shell-tools.cjs` | Owns typed phase routing and direct workflow artifact adoption. | Keep paper phase routing deterministic: `paper-pipeline` as primary direct workflow and `rebuttal` as advanced direct tool. [VERIFIED: bin/lib/ljx-lifecycle-shell-tools.cjs] |
| Generated skill builders | `bin/lib/codex-conversion.cjs`, `bin/lib/build-skills.cjs` | Generate and install ljx-GSD public skill surfaces. | Update generated instructions and copied helper dependencies when runtime semantics change. [VERIFIED: bin/lib/codex-conversion.cjs; bin/lib/build-skills.cjs] |

## Architecture Pattern

### Recommended Layout

```text
.planning/
├── phases/{phase-dir}/
│   ├── {phase}-PAPER_PLAN.md
│   ├── {phase}-PAPER_PIPELINE.md
│   └── {phase}-...other phase-local artifacts...
├── state/
│   └── papers/{phase}.json
paper/
├── PAPER_IMPROVEMENT_LOG.md
└── ...compiled paper outputs...
rebuttal/
├── REVIEWS_RAW.md
├── ISSUE_BOARD.md
├── STRATEGY_PLAN.md
├── REBUTTAL_EXPERIMENT_PLAN.md
├── REBUTTAL_EXPERIMENTS.md
├── REBUTTAL_DRAFT_v1.md
├── PASTE_READY.txt
├── REBUTTAL_DRAFT_rich.md
├── MCP_STRESS_TEST.md
├── REBUTTAL_STATE.md
└── FOLLOWUP_LOG.md
```

The layout keeps phase-local markdown artifacts as the operator-facing truth, keeps `paper/` and `rebuttal/` as bounded workspaces, and uses `papers/{phase}.json` only as a structured link and recovery record. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md; bin/lib/ljx-paper-pipeline-tools.cjs; bin/lib/ljx-rebuttal-tools.cjs]

### Pattern 1: Shared Paper-State Helper Owns Repeated Semantics

Create `bin/lib/ljx-paper-evidence-tools.cjs` to own repeated paper/rebuttal state behavior. It should build the `papers/{phase}.json` path, expose paper and rebuttal artifact links with present/missing/needs-confirmation statuses, and validate existing state before any writer updates it. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md; bin/lib/ljx-experiment-evidence-tools.cjs]

This helper should not become a second control plane. It should not decide that a phase is complete, mutate the roadmap, run paper compilation, run rebuttal experiments, or write state during context reads. [VERIFIED: .planning/PROJECT.md; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

### Pattern 2: Writers Are Explicit, Validated, And Field-Preserving

`writePaperPipelineState()` already exists but currently writes a fresh `papers` record from the incoming payload. Phase 12 should convert it to a validated, field-preserving update, so rebuttal-owned fields survive a later paper-pipeline update. [VERIFIED: bin/lib/ljx-paper-pipeline-tools.cjs]

`rebuttal` currently exposes `paperStateRecordPath` but has no state writer. Phase 12 should add an explicit `write-rebuttal-state` command that writes only rebuttal linkage/status fields into the same `papers` record and preserves paper-pipeline-owned fields. [VERIFIED: bin/lib/ljx-rebuttal-tools.cjs; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

Before writing, both writers should reject existing state records that are malformed, not JSON objects, or contain a `phase_id` that is missing, falsy-but-present, or different from the requested phase. This matches the Phase 11 writer-safety pattern and avoids silently taking ownership of another phase's state. [VERIFIED: bin/lib/ljx-experiment-evidence-tools.cjs; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

### Pattern 3: Preserve Auto Stage Structure In Generated Skills

The generated `paper-pipeline` skill should continue to name the accepted Auto stages: `paper-plan`, `paper-figure`, `paper-illustration`, `paper-write`, `paper-compile`, and `auto-paper-improvement-loop`. It should also make venue/page/improvement settings and `autoProceed`/`humanCheckpoint` behavior explicit. [VERIFIED: /Users/lijiaxin/.codex/skills/paper-writing/SKILL.md; bin/lib/codex-conversion.cjs]

The generated `rebuttal` skill should continue to name the accepted Auto stages: review normalization, issue board, strategy, optional experiment plan/log, draft, paste-ready text, rich draft, stress test, state, and follow-up log. It should explicitly say that missing root reviews stop the initial flow, existing rebuttal workspaces can resume, and venue character-limit confirmation is required before claiming paste-ready output. [VERIFIED: /Users/lijiaxin/.codex/skills/rebuttal/SKILL.md; bin/lib/codex-conversion.cjs]

### Pattern 4: Routing Remains Recommendation-Only

`paper-pipeline` may recommend `review-loop`, `rebuttal`, and `next`. `rebuttal` may recommend `experiment-bridge`, `paper-pipeline`, and `next`. These must remain next-step recommendations, not hidden execution or phase completion mutation. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md; bin/lib/ljx-paper-pipeline-tools.cjs; bin/lib/ljx-rebuttal-tools.cjs]

If `autoExperiment` is false, rebuttal should recommend `ljx-GSD-experiment-bridge` for evidence sprints rather than launching experiments. If it is true, the route still must stay explicit and bounded by the existing companion workflow surface. [VERIFIED: /Users/lijiaxin/.codex/skills/rebuttal/SKILL.md; bin/lib/ljx-rebuttal-tools.cjs]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Paper state family | A new `.planning/state/rebuttals/` or submission-controller state tree | Existing `papers/{phase}.json` through `ljx-runtime-state.cjs` | Phase 5 already accepted `papers` and Phase 12 explicitly says rebuttal should link to the same paper-state record. [VERIFIED: .planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md] |
| Paper/rebuttal path logic | Duplicated artifact and workspace path builders in both helpers | One shared paper-state/evidence helper | Avoids drift between `paper-pipeline` and `rebuttal`, matching Phase 11's shared-helper lesson. [VERIFIED: .planning/IMPLEMENTATION-LESSONS.md; bin/lib/ljx-experiment-evidence-tools.cjs] |
| State writes | Direct `fs.writeFileSync()` to `.planning/state/papers/...` | `updateStateRecord()` and writer preflight validation | The runtime-state helper centralizes allowed families and JSON formatting. [VERIFIED: bin/lib/ljx-runtime-state.cjs] |
| Paper engine | A new all-in-one manuscript writer | Existing Auto companion stages and generated ljx-GSD wrapper | Preserves Auto's stage structure and minimal-modification policy. [VERIFIED: /Users/lijiaxin/.codex/skills/paper-writing/SKILL.md; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md] |
| Rebuttal engine | A root-level submission controller | Existing bounded `rebuttal/` workspace and Auto rebuttal stage sequence | Avoids a second submission control plane and keeps venue constraints explicit. [VERIFIED: /Users/lijiaxin/.codex/skills/rebuttal/SKILL.md; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md] |
| Rebuttal experiments | Silent experiment execution from rebuttal | Explicit `ljx-GSD-experiment-bridge` recommendation or bounded `autoExperiment` path | Avoids hidden compute and keeps evidence-sprint routing visible. [VERIFIED: bin/lib/ljx-rebuttal-tools.cjs; /Users/lijiaxin/.codex/skills/rebuttal/SKILL.md] |
| Lifecycle truth | Helper-side roadmap or phase completion mutation | Existing lifecycle shell and phase-local artifacts | GSD remains the outer control plane. [VERIFIED: .planning/PROJECT.md; bin/lib/ljx-lifecycle-shell-tools.cjs] |

## Common Pitfalls

### Pitfall 1: Overwriting The Other Workflow's Paper State

**What goes wrong:** `paper-pipeline` writes a fresh `papers/{phase}.json` record after rebuttal has recorded venue/review status, or rebuttal writes a fresh record after paper-pipeline has recorded manuscript/compile status. [VERIFIED: bin/lib/ljx-paper-pipeline-tools.cjs; bin/lib/ljx-rebuttal-tools.cjs]

**How to avoid:** use `updateStateRecord()` after preflight validation and merge only the current writer's owned subobject or fields. Add tests that seed sibling fields and verify they survive each writer. [VERIFIED: bin/lib/ljx-runtime-state.cjs; bin/lib/ljx-experiment-evidence-tools.cjs]

### Pitfall 2: Creating Empty State During Context Reads

**What goes wrong:** a context command creates `.planning/state/papers/{phase}.json`, making routing or later operators think paper or rebuttal state exists even though no workflow wrote it. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

**How to avoid:** context reads should expose `paperStateRecordPath` and artifact links only. State files should appear only after `write-paper-state` or `write-rebuttal-state`. [VERIFIED: bin/lib/ljx-paper-pipeline-tools.cjs; bin/lib/ljx-rebuttal-tools.cjs]

### Pitfall 3: Treating Missing Venue Limits As Submission Readiness

**What goes wrong:** rebuttal emits or routes as if `PASTE_READY.txt` is final while the venue character limit is missing or unconfirmed. [VERIFIED: /Users/lijiaxin/.codex/skills/rebuttal/SKILL.md; .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

**How to avoid:** preserve `requiresVenueRuleConfirmation` and add readiness/status fields that mark paste-ready finalization as requiring confirmation when `research.rebuttal.characterLimit` is absent or not trusted. [VERIFIED: bin/lib/ljx-rebuttal-tools.cjs]

### Pitfall 4: Regressing Existing Rebuttal Resume Semantics

**What goes wrong:** missing root review files always stop rebuttal even when `rebuttal/REVIEWS_RAW.md` or follow-up artifacts already exist. [VERIFIED: bin/lib/ljx-rebuttal-tools.cjs; tests/rebuttal-bridge.test.cjs]

**How to avoid:** keep the current `initial` versus `resume`/`followup` stage inference and test both missing-review stop and workspace resume paths. [VERIFIED: bin/lib/ljx-rebuttal-tools.cjs; tests/rebuttal-bridge.test.cjs]

### Pitfall 5: Generated Skill Drift

**What goes wrong:** runtime helpers gain validated writers and new helper dependencies, but generated skills still tell agents to write state directly or installed preview output omits the new helper. [VERIFIED: bin/lib/codex-conversion.cjs; bin/lib/build-skills.cjs; tests/skill-build.test.cjs]

**How to avoid:** update `codex-conversion.cjs`, `build-skills.cjs`, and `tests/skill-build.test.cjs` in the same plan as runtime helper changes. [VERIFIED: .planning/IMPLEMENTATION-LESSONS.md; tests/skill-build.test.cjs]

## Implementation Notes

### Plan 12-01: Paper-Pipeline Stage Ownership And State Links

- Add shared paper-state helper functions for paper state paths, artifact links, readiness summaries, and writer validation.
- Update `readPaperPipelineContext()` to include shared paper-state links/readiness without writing empty state.
- Update `writePaperPipelineState()` to validate existing paper state and merge field-preserving updates.
- Add focused tests for no read-time state creation, malformed/mismatched existing state rejection, and preserving rebuttal-owned fields.

### Plan 12-02: Rebuttal Workspace And State Ownership

- Update `readRebuttalContext()` to reuse shared paper-state links/readiness while preserving missing-review stop and existing-workspace resume semantics.
- Add `writeRebuttalState()` plus CLI `write-rebuttal-state --payload-file` that updates the shared `papers` record and preserves paper-pipeline fields.
- Add tests for writer creation, sibling-field preservation, malformed/mismatched existing state rejection, and venue confirmation readiness.

### Plan 12-03: Routing, Generated Skills, And Install Surface

- Update generated paper/rebuttal skill wording to include full explicit writer commands, Auto stage preservation, venue/evidence constraints, and recommendation-only routing.
- Update preview/install runtime-copy plumbing if a new shared helper file is introduced.
- Add tests for generated skill wording, helper copy coverage, direct workflow artifact requirements, and relevant lifecycle routing.

## Verification Strategy

Run focused checks before full regression:

```bash
node --check bin/lib/ljx-paper-evidence-tools.cjs
node --check bin/lib/ljx-paper-pipeline-tools.cjs
node --check bin/lib/ljx-rebuttal-tools.cjs
node --check bin/lib/codex-conversion.cjs
node --check bin/lib/build-skills.cjs
node --test tests/paper-pipeline-bridge.test.cjs tests/rebuttal-bridge.test.cjs tests/skill-build.test.cjs
node --test tests/execute-phase-shell.test.cjs tests/plan-phase-shell.test.cjs tests/lifecycle-next.test.cjs
node bin/install.js --preview
npm test
git diff --check
```

If review agents find bugs, fixes must check related runtime helpers, generated skills, install output, and tests rather than only the surfaced line. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md; .planning/IMPLEMENTATION-LESSONS.md]

## Deferred Ideas

- Workstream and roadmap mutation administration belongs to Phase 13. [VERIFIED: .planning/ROADMAP.md]
- Full migration cutover and end-to-end `research-pipeline` parity verification belongs to Phase 14. [VERIFIED: .planning/ROADMAP.md]
- Camera-ready packaging and submission upload automation remain out of scope unless a later phase explicitly adds them. [VERIFIED: .planning/phases/12-complete-paper-and-rebuttal-workflows/12-CONTEXT.md]

---

*Phase: 12-complete-paper-and-rebuttal-workflows*
*Research complete: 2026-04-11*
