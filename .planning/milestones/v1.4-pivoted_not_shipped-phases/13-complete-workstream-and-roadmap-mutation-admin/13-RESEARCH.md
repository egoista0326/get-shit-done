# Phase 13: Workstream And Roadmap Mutation Admin - Research

**Researched:** 2026-04-11
**Status:** Ready for planning
**Research mode:** Implementation research grounded in current ljx-GSD runtime, generated skill/install surface, and original GSD admin workflows.

## Standard Stack

Use the existing Node.js/CommonJS stack. The package already targets Node `>=22.0.0`, helper modules are `.cjs`, and tests run through `node --test tests/*.test.cjs`. Do not add npm dependencies for Phase 13.

Use these current implementation surfaces:

- `bin/lib/ljx-workstreams-tools.cjs` for workstream read/mutation behavior.
- `bin/lib/ljx-runtime-core.cjs` for phase/workstream resolution, phase-token normalization, active workstream interpretation, and typed phase taxonomy.
- `bin/lib/ljx-runtime-state.cjs` for structured state read/write helpers, `workstreams`, `phase-records`, and `ensurePrimaryWorkstreamRecord()`.
- `bin/lib/manifest.cjs`, `bin/lib/codex-conversion.cjs`, and `bin/lib/build-skills.cjs` for build/install/generator truth.
- Original GSD references:
  - `/Users/lijiaxin/.codex/get-shit-done/workflows/add-phase.md`
  - `/Users/lijiaxin/.codex/get-shit-done/workflows/insert-phase.md`
  - `/Users/lijiaxin/.codex/get-shit-done/workflows/remove-phase.md`
  - `/Users/lijiaxin/.codex/get-shit-done/bin/lib/roadmap.cjs`

Original GSD should be reused as a semantic reference, not copied wholesale. Reuse the safe behavior: next-integer add, next-decimal insert, future-only removal checks, phase directory creation, and roadmap mirror updates. Avoid importing legacy behavior that would conflict with typed phase records, `primary` semantics, or safe-mode mutation boundaries.

## Architecture Patterns

### Workstream Mutation

Extend `bin/lib/ljx-workstreams-tools.cjs` rather than introducing a separate workstream engine. It already centralizes:

- `.planning` detection
- primary-first list/status/progress behavior
- structured record preference
- legacy `.planning/workstreams/<name>/` read compatibility
- stale active-pointer surfacing

New writes should prefer structured `.planning/state/workstreams/<name>.json` records. Legacy `.planning/workstreams/<name>/` directories should remain readable but should not be deleted or rewritten in Phase 13 unless required for compatibility.

Use structured `active` flags as the authoritative active workstream source and mirror `.planning/active-workstream` only if needed to prevent resolver split-brain. `resolveActiveWorkstream()` already reports `multiple_active_workstreams`, `stale_active_workstream_pointer`, and `workstream_resolution_conflict`; mutation helpers should stop on these states rather than guessing.

Keep `primary` strict:

- `primary` remains rooted at root `.planning/`.
- `switch primary` only points active state back to the root mainline.
- Phase 13 must not create `.planning/workstreams/primary/`.
- `primary` cannot be completed, removed, renamed, or archived.
- Switching/resuming a secondary workstream must not imply adoption, import, or merge-back into `primary`.

### Roadmap Mutation

Add one small helper such as `bin/lib/ljx-roadmap-admin-tools.cjs` for `add`, `insert`, and `remove`. Generated skills should stay thin and invoke that helper instead of embedding mutation logic in skill prose.

The helper should centralize:

- `phase_type` validation using `KNOWN_PHASE_TYPES`
- safe slug generation and phase-token handling
- next integer phase calculation for `add-phase`
- next decimal phase calculation for `insert-phase`
- future/unstarted/evidence-free validation for `remove-phase`
- phase directory creation/removal/renaming
- `.planning/ROADMAP.md` summary/detail/progress mirror updates
- `.planning/state/phase-records/{phase}.json` writes
- structured JSON stop reasons and recommendations

`add-phase` and `insert-phase` should prefer explicit `--type <phase_type>`. If no explicit type is supplied, infer only when deterministic and surface the inference; otherwise return `missing_phase_type`.

`remove-phase` is the highest-risk path. Original GSD can renumber later phases, but this bridge slice must not silently renumber completed history. Stop unless the target and any affected later phases are future, unstarted, and evidence-free.

### Build And Docs Surface

Promote `ljx-GSD-add-phase`, `ljx-GSD-insert-phase`, and `ljx-GSD-remove-phase` from `deferred` to `bridge-ready` only after runtime behavior, generated skill wording, install helper copy, manifest output, user docs, and tests agree. Keep `ljx-GSD-research-pipeline` deferred for Phase 14.

Do not delete, narrow, or replace Auto Research workflows. Phase 13 is an admin mutation slice; it should not simplify by removing Auto capabilities or changing the research workflow family.

## Don't Hand-Roll

| Problem | Do not build | Reuse |
|---|---|---|
| Phase type taxonomy | A second list of phase types | `KNOWN_PHASE_TYPES` in `ljx-runtime-core.cjs` |
| State persistence | Ad hoc JSON path writes | `writeStateRecord()`, `listStateRecords()`, `ensurePrimaryWorkstreamRecord()` in `ljx-runtime-state.cjs` |
| Workstream discovery | A new directory scanner | Existing discovery in `ljx-workstreams-tools.cjs` |
| Phase matching | String contains checks | `normalizePhaseId()`, `normalizePhaseIdForPlanning()`, `phaseTokenMatches()`, `comparePhaseKeys()` |
| Generated command behavior | Skill-local direct `.planning` edits | Thin generated skills that call runtime helpers |
| Auto cleanup | Removing deferred Auto skills | Preserve Auto skills; only promote Phase 13 admin commands |

## Common Pitfalls

- Do not copy original GSD's legacy workstream storage model directly. Phase 13 requires `primary` to stay at root and new writes to prefer structured workstream records.
- Do not let `switch` or `resume` imply workstream adoption/import. Those are bounded future flows, not this phase's mutation behavior.
- Do not silently infer missing phase types. Stop with `missing_phase_type` unless the inference is deterministic and reported.
- Do not treat roadmap text as the only source of truth. Phase 13 requires structured `phase-records` plus consistent human-readable mirrors.
- Do not promote manifest entries before generated skill text and preview install output are updated.
- Do not leave docs tests describing add/insert/remove as deferred after the commands become bridge-ready.
- Do not reuse original GSD broad renumbering behavior unless every affected phase is future and unstarted.

## Code Examples

Workstream mutation should stay helper-driven and return structured JSON:

```js
const result = mutateWorkstream(projectRoot, {
  subcommand: 'switch',
  name: 'hypothesis-b',
});

if (!result.ok) {
  return {
    bridgeReady: false,
    stopReasonCode: result.stopReasonCode,
    stopReason: result.stopReason,
  };
}

return {
  bridgeReady: true,
  activeWorkstream: result.activeWorkstream,
  recordsWritten: result.recordsWritten,
};
```

Roadmap admin should write a phase record and roadmap mirror in one explicit helper operation:

```js
writeStateRecord(planningDir, 'phase-records', phaseId, {
  phase_id: phaseId,
  phase_type: phaseType,
  name,
  status: 'ready_to_discuss',
  active: false,
  inserted,
  depends_on,
  paths: {
    directory: `.planning/phases/${dirName}`,
    roadmap: '.planning/ROADMAP.md',
    state: '.planning/STATE.md',
  },
  created_at: now,
  updated_at: now,
});
```

Removal gates should stop before filesystem mutation if the target is not safely removable:

```js
if (!isFuturePhase(targetPhase, currentPhase)) {
  return stop('phase_not_future');
}

if (hasExecutionEvidence(targetPhaseDir, phaseRecord)) {
  return stop('phase_has_evidence');
}

if (renumberSet.some((phase) => hasExecutionEvidence(phase.dir, phase.record))) {
  return stop('renumber_would_touch_started_phase');
}
```

Generated skills should stay thin and invoke the installed runtime helper:

```bash
node "<installed-runtime>/ljx-roadmap-admin-tools.cjs" add \
  --cwd "$PWD" \
  --type engineering \
  --name "Workstream admin hardening"
```

## Recommended Implementation Slices

1. **Workstream mutation slice:** Implement `create`, `switch`, `resume`, and `complete` in `ljx-workstreams-tools.cjs`. Reject unsafe names, path traversal, `primary` creation, collisions, missing workstreams, and destructive `primary` operations. Write structured records and keep the active pointer unambiguous.
2. **Workstream lifecycle slice:** `switch primary` activates primary only; `resume <name>` activates and returns next-action guidance; `complete <name>` marks a mutable secondary complete/archived and returns active state to primary if needed.
3. **Roadmap admin helper slice:** Add a helper for `add`, `insert`, and `remove`. Reuse phase normalization/comparison helpers, require `--type`, create phase dirs and phase records, and update roadmap mirrors.
4. **GSD parity slice:** Match original GSD next-integer add, next-decimal insert, and conservative future removal. Do not match unsafe broad history rewrites.
5. **Build/manifest slice:** Promote add/insert/remove from deferred to bridge-ready, copy the new helper at install time, and keep `research-pipeline` deferred.
6. **Docs/tests slice:** Update generated skill text, `LJX-GSD-USER-SKILL-GUIDE.md`, docs contract tests, and install manifest tests so Phase 13 commands are represented as current bridge-ready operations while Auto Research remains preserved.

## Verification Plan

Focused tests:

```bash
node --test tests/workstreams-bridge.test.cjs tests/runtime-state.test.cjs tests/roadmap-admin-bridge.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs
node bin/install.js --print-manifest
node bin/install.js --preview
```

Full verification:

```bash
npm test
```

Required coverage:

- `workstreams create` creates a structured secondary record and rejects unsafe/colliding names.
- `workstreams switch primary` does not create `.planning/workstreams/primary/`.
- `workstreams switch/resume` updates active state without claiming lifecycle execution.
- `workstreams complete` rejects `primary`, missing, immutable, and already-complete workstreams.
- malformed structured workstream state stops honestly.
- `add-phase` creates a next integer phase with explicit type, directory, roadmap mirror, and phase record.
- `insert-phase` chooses the next decimal slot after the anchor without renumbering existing phases.
- `remove-phase` rejects active/completed/evidence-bearing phases.
- generated skills no longer describe Phase 13 commands as deferred after promotion.
- preview install includes the new helper and manifest truth.
- docs contract no longer forbids add/insert/remove public table entries once they are bridge-ready.

## Open Risks

- Roadmap mutation parsing is high risk because `.planning/ROADMAP.md` has checklist, progress table, phase detail sections, and per-plan checkboxes. Keep mutations conservative and stop on malformed or ambiguous shapes.
- Removal can require renumbering later phases. Stop unless every affected phase is future, unstarted, and evidence-free.
- Active workstream writes can split between structured records and legacy pointer files. Use one structured source and mirror the legacy pointer consistently if retained.
- Existing tests intentionally encode deferred behavior for Phase 13 commands. Plan tasks must update runtime, generated skills, docs, and tests together.
- Auto Research preservation is non-negotiable. Phase 13 must not delete, shrink, or repurpose Auto workflow skills to simplify admin mutation.
