# Phase 10 Research: Discovery And Refinement Completion

**Date:** 2026-04-10  
**Status:** Research complete  
**Phase:** 10-complete-discovery-and-refinement-workflows  
**Requirement focus:** `IMPL-04`

## User Constraints

The implementation approach for Phase 10 must preserve these project-level constraints:

1. Study and reuse the current GSD implementation and the current Auto research implementation before inventing new discovery/refine behavior.
2. Follow a minimal-modification principle: do not delete or intentionally narrow original GSD or Auto capabilities as a shortcut.
3. Reuse GSD as the outer runtime base where practical, integrate Auto research as a native workflow family, and preserve semantic reuse rather than only structural similarity.

These constraints are already reflected in:

- `.planning/PROJECT.md`
- `.planning/IMPLEMENTATION-LESSONS.md`
- `LJX-GSD-DESIGN-DECISION-LOG.md`
- `.planning/phases/10-complete-discovery-and-refinement-workflows/10-CONTEXT.md`

## Summary

Phase 10 should stop treating `idea-discovery` and `research-refine` as report-oriented bridge wrappers and instead make them real typed-phase workflows that:

1. own accepted discovery/refine artifacts under the phase directory
2. write structured research runtime state only when the workflow actually needs persistent iteration state
3. remain bounded and honest about downstream handoff
4. stay adoptable by the lifecycle shell without re-deriving truth

The most important current gap is semantic depth, not command availability:

- `ljx-GSD-idea-discovery` already resolves the right phase and phase-local artifact paths, but it still exposes a deliberately narrow "one report plus optional shortlist" contract.
- `ljx-GSD-research-refine` already resolves the right phase and phase-local artifact paths, but it still centers a bridge-era `METHOD_SPEC.md` artifact instead of the accepted Auto canonical proposal semantics.
- `ljx-lifecycle-shell-tools.cjs` currently adopts discovery/refine outputs using bridge-era artifact specs, so even a deeper workflow would still look thin to the shell unless those adoption rules are expanded.
- `ljx-runtime-state.cjs` currently only supports `phase-records`, `sessions`, and `workstreams`, while Phase 5 already accepted `idea-portfolios` and `refinement-sessions` as the correct runtime homes for discovery/refine iteration state.

The practical recommendation is:

1. keep the existing helper modules as the integration base
2. extend `ljx-runtime-state.cjs` to support the accepted research families:
   - `.planning/state/research/idea-portfolios/{phase_id}.json`
   - `.planning/state/research/refinement-sessions/{phase_id}.json`
3. deepen `ljx-GSD-idea-discovery` into a phase-owned discovery engine that can maintain portfolio/shortlist state when needed but still stops at the discovery boundary
4. deepen `ljx-GSD-research-refine` into a phase-owned refine engine with `FINAL_PROPOSAL.md` as the canonical proposal artifact and `METHOD_SPEC.md` as a compatibility mirror
5. update lifecycle adoption, generated skill wording, and preview/install plumbing so repo-local and installed surfaces describe the same deeper semantics

## Standard Stack

### Runtime modules

- Keep the implementation in Node CommonJS under `bin/lib/*.cjs`.
- Reuse the Phase 07-09 substrate and shell instead of adding a second discovery/refine stack:
  - `bin/lib/ljx-runtime-core.cjs`
  - `bin/lib/ljx-runtime-state.cjs`
  - `bin/lib/ljx-phase-context.cjs`
  - `bin/lib/ljx-lifecycle-shell-tools.cjs`
  - `bin/lib/ljx-state-tools.cjs`

### Structured state

- Use `.planning/state/research/idea-portfolios/{phase_id}.json` for discovery runtime objects that actually need persistent candidate/shortlist state.
- Use `.planning/state/research/refinement-sessions/{phase_id}.json` for refine runtime objects that actually need persistent round/history/score state.
- Continue to mirror lifecycle-owned truth in `phase-records/{phase_id}.json`.
- Do not create these research-state records eagerly for trivial one-shot runs.

### Canonical phase-local artifacts

- Discovery:
  - canonical: `{phase}-IDEA_REPORT.md`
  - optional compact companion: `{phase}-IDEA_CANDIDATES.md`
- Refine:
  - canonical proposal: `{phase}-FINAL_PROPOSAL.md`
  - supporting evidence: `{phase}-REFINEMENT_REPORT.md`
  - compatibility mirror: `{phase}-METHOD_SPEC.md`

### Build and install surface

- Reuse `bin/lib/codex-conversion.cjs` and `bin/lib/build-skills.cjs` for all generated-skill wording changes.
- Keep `bin/lib/manifest.cjs` as the authoritative public-surface readiness table.
- Keep preview/install verification via `node bin/install.js --preview`.

### Verification stack

- Keep regression coverage in `node:test` suites under `tests/`.
- Use helper-level tests for context/state contracts.
- Use lifecycle-shell tests for adoption and progression semantics.
- Use skill-build/install tests for installed-surface truth.

## Reference Implementations To Reuse

### Auto references

#### `~/.codex/skills/idea-discovery/SKILL.md`

Preserve:

- Workflow 1 stage structure: literature -> idea generation -> novelty -> review
- explicit shortlist and ranking semantics
- honest checkpointed continuation into refine rather than hidden execution beyond refine

Do not copy:

- the old root-level ownership model
- automatic downstream continuation into experiment planning as the default typed-phase behavior

#### `~/.codex/skills/research-refine/SKILL.md`

Preserve:

- immutable problem-anchor semantics
- multi-round review/revise loop when the user requests or the run genuinely needs iterative refinement
- `FINAL_PROPOSAL.md`, `REVIEW_SUMMARY.md`, `REFINEMENT_REPORT.md`, and round-history semantics

Do not copy:

- the old root `refine-logs/` ownership as a second control plane
- a mandatory heavy loop for every trivial refine pass

### GSD references

#### `~/.codex/get-shit-done/bin/lib/init.cjs`, `core.cjs`, and lifecycle workflows

Reuse for:

- centralized init/bootstrap payload design
- phase/workstream resolution discipline
- one recommendation system shared by manual commands and `next`

Do not copy:

- markdown-as-primary-truth assumptions
- file-count-only lifecycle inference

### Current ljx-GSD references

#### `bin/lib/ljx-idea-discovery-tools.cjs`

Already provides:

- typed phase resolution through the shared phase context
- phase-local `IDEA_REPORT` and optional compact shortlist targeting
- reviewer/config/recommendation wiring

It should remain the discovery context entrypoint, but Phase 10 needs to deepen its state semantics and its bounded workflow contract.

#### `bin/lib/ljx-research-refine-tools.cjs`

Already provides:

- typed phase resolution
- reviewer/config/recommendation wiring
- phase-local refine artifact targeting

It should remain the refine context entrypoint, but Phase 10 needs to restore canonical `FINAL_PROPOSAL` semantics and optional refinement-session state.

#### `bin/lib/ljx-lifecycle-shell-tools.cjs`

This is where current bridge-era discovery/refine thinness is still encoded:

- discovery adoption expects only `IDEA_REPORT` and optional shortlist
- refine adoption expects only `METHOD_SPEC` plus `REFINEMENT_REPORT`

Phase 10 should broaden these artifact contracts so the lifecycle shell can adopt deeper, more faithful discovery/refine outputs without losing phase continuity.

#### `bin/lib/ljx-runtime-state.cjs`

This currently blocks proper Phase 10 implementation because it does not support the accepted research families yet.

Phase 10 should extend it to the locked Phase 5 destinations rather than inventing ad hoc JSON writes in command-local helpers.

## Architecture Patterns

### Pattern 1: Typed workflow core, optional persistent research runtime

Each workflow should always produce canonical phase-local artifacts, but structured research runtime state should only appear when the workflow actually needs memory across rounds or candidate selection.

This yields:

- cheap one-shot discovery/refine runs remain lightweight
- heavier portfolio/refinement sessions become resumable and phase-owned
- the repo does not fill `.planning/state/research/` with meaningless empty records

### Pattern 2: Canonical artifact plus compatibility mirror

Refine needs a clear primary artifact to undo bridge drift.

Recommended contract:

- `FINAL_PROPOSAL.md` is canonical proposal truth
- `REFINEMENT_REPORT.md` remains supporting evidence
- `METHOD_SPEC.md` mirrors the canonical proposal in a lifecycle-shell-friendly format until downstream consumers fully migrate

This is the cleanest way to satisfy:

- the accepted Auto migration target
- the current bridge install/tests surface
- minimal modification without freezing bridge-era naming forever

### Pattern 3: Lifecycle adoption should accept the deeper artifact set

`plan-phase`, `execute-phase`, and `next` should not force reruns just because Phase 10 writes richer outputs than Phase 08 originally expected.

Therefore lifecycle adoption should:

- accept deeper discovery/refine artifacts
- record adoption provenance and evidence artifacts
- tolerate compatibility mirrors while still recognizing the canonical proposal/report pair

### Pattern 4: One handoff owner per boundary

Downstream recommendations should remain explicit:

- discovery -> novelty-check / research-review / research-refine
- refine -> experiment-plan

Do not widen:

- discovery -> experiment-plan directly
- refine -> claim-gate or next-as-canonical-successor

This preserves the already accepted phase chain and avoids scope creep into Phase 11.

### Pattern 5: Build/install surface is part of the semantic contract

Any Phase 10 semantic change must be reflected in:

- repo-local helper behavior
- generated `ljx-GSD-*` skill wording
- preview/install runtime helper copies
- retained upstream Auto fallback references

Otherwise the repository and installed skills drift apart again.

## Don't Hand-Roll

- Do not create discovery/refine JSON runtime state by writing arbitrary files directly from generated skill prompts.
- Do not invent new research-state namespaces outside the accepted `.planning/state/research/` families.
- Do not preserve `METHOD_SPEC.md` as the only refine canonical artifact just because current bridge tests are shaped that way.
- Do not silently chain discovery into experiment planning or refine into execution.
- Do not duplicate lifecycle adoption rules in multiple helpers when `ljx-lifecycle-shell-tools.cjs` can own them once.

## Common Pitfalls

1. **Bridge-naming lock-in**
   Treating `METHOD_SPEC.md` as the final semantic destination would keep a Phase 8 bridge compromise as the long-term contract and would contradict the accepted migration docs.

2. **Eager empty state objects**
   Writing `idea-portfolios` or `refinement-sessions` for every run makes structured state noisier and less meaningful.

3. **Phase-local artifacts drifting from installed skill wording**
   If helper code writes `FINAL_PROPOSAL.md` but generated skills still promise only `METHOD_SPEC.md`, preview installs become misleading immediately.

4. **Discovery/refine widening their own downstream routing**
   Letting discovery jump directly to experiments or letting refine imply claim-gating would reopen settled phase-chain boundaries.

5. **Compatibility fallback becoming primary truth again**
   Keeping compatibility mirrors is correct, but routing and adoption should still prefer the canonical proposal/report semantics once they exist.

## Code Examples

### Example 1: Extend runtime-state with accepted research families

```js
const STATE_FAMILIES = new Set([
  'phase-records',
  'sessions',
  'workstreams',
  'research/idea-portfolios',
  'research/refinement-sessions',
]);
```

The important point is not the exact string literal layout but that the final path resolves to the Phase 5 accepted directories under `.planning/state/research/`.

### Example 2: Prefer canonical proposal, retain compatibility mirror

```js
const finalProposalPath = path.join(phase.path, `${phase.id}-FINAL_PROPOSAL.md`);
const methodSpecPath = path.join(phase.path, `${phase.id}-METHOD_SPEC.md`);

// Canonical proposal content is written once, then mirrored to METHOD_SPEC only for compatibility.
```

### Example 3: Create research runtime only when needed

```js
if (roundHistory.length > 1 || explicitResumeStateNeeded) {
  writeStateRecord(projectRoot, 'research/refinement-sessions', phase.id, sessionState);
}
```

### Example 4: Lifecycle adoption should accept richer refine evidence

```js
const refineEvidence = [
  `${phase.id}-FINAL_PROPOSAL.md`,
  `${phase.id}-REFINEMENT_REPORT.md`,
  `${phase.id}-METHOD_SPEC.md`,
];
```

The exact required/optional split is implementation detail, but the shell should stop assuming Phase 8's smaller bridge set is the only valid refine output.

## Validation Architecture

Phase 10 verification should prove four things:

1. **Helper context correctness**
   - discovery/refine helpers resolve canonical artifact paths and optional research-state paths correctly
   - malformed config and missing phase/planning still stop honestly

2. **Lifecycle adoption correctness**
   - `plan-phase` / `execute-phase` adopt richer discovery/refine artifacts without rerunning valid work
   - `next` recommendations stay within the accepted downstream boundary

3. **Installed-surface correctness**
   - generated skills describe the deeper semantics accurately
   - preview installs include any new runtime helper dependencies

4. **Full regression**
   - `npm test`
   - `node bin/install.js --preview`

## Recommended Plan Split

1. `10-01`: complete typed `idea-discovery`
2. `10-02`: complete typed `research-refine`
3. `10-03`: land discovery/refine research-state families, lifecycle adoption, and installed-surface handoff semantics

This split keeps the domain engines understandable while still reserving one final slice for the cross-cutting state/adoption surface that caused earlier drift in Phases 07-09.
