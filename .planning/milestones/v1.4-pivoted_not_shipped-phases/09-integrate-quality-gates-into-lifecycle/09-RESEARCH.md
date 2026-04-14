# Phase 09 Research: Lifecycle Quality Gates

**Date:** 2026-04-10  
**Status:** Research complete  
**Phase:** 09-integrate-quality-gates-into-lifecycle  
**Requirement focus:** `IMPL-03`

## User Constraints

The implementation approach for Phase 09 must preserve these project-level constraints:

1. Study and reuse the current GSD implementation and the current Auto research implementation before inventing new quality-gate behavior.
2. Follow a minimal-modification principle: do not delete or intentionally narrow original GSD or Auto capabilities as a shortcut.
3. Reuse GSD as the outer runtime base where practical, and integrate Auto research as a native workflow family without deleting Auto's existing workflow strengths or skill semantics.

These constraints are already reflected in:

- `.planning/PROJECT.md`
- `LJX-GSD-DESIGN-DECISION-LOG.md`
- `.planning/phases/09-integrate-quality-gates-into-lifecycle/09-CONTEXT.md`

## Summary

Phase 09 should not add a second lifecycle beside `discuss -> plan -> execute`. It should make `code-review`, hidden `code-review-fix`, and `verify-work` authoritative post-execute quality gates owned by the same phase record and consumed by the same recommendation path.

The most important current gap is not missing commands. The commands already exist. The gap is that current routing still mostly reasons from artifact existence and staleness alone:

- `next` and `progress` can treat a phase as effectively done when a `CODE_REVIEW.md` or `VERIFICATION.md` exists, even if the recorded verdict is blocking.
- `verify-work` parses review freshness and findings on the fly, but those judgments are not persisted into authoritative phase-record quality-gate state.
- `code-review-fix` preserves bounded fix semantics, but the lifecycle shell does not yet consume explicit post-fix invalidation / rerun state as lifecycle-owned truth.

The practical recommendation is:

1. Add one shared quality-gate state helper under `bin/lib/` for phase-record-local `quality_gates.code_review` and `quality_gates.verify_work`.
2. Keep phase-local `CODE_REVIEW.md`, `CODE_REVIEW_FIX.md`, and `VERIFICATION.md` as operator-facing artifacts, but persist the summarized gate truth into the phase record.
3. Update `ljx-state-tools` so `next` / `progress` route from structured quality-gate summaries first, using artifacts as evidence and freshness anchors.
4. Update generated skill prompts and preview packaging so installed `code-review`, `code-review-fix`, and `verify-work` flows know how to maintain the same authoritative gate summaries.

## Standard Stack

### Runtime modules

- Use the existing Node CommonJS style already used across `bin/lib/*.cjs`.
- Keep quality-gate logic in reusable library modules under `bin/lib/`, not buried inside prompt text.
- Reuse the Phase 07 and 08 substrate:
  - `bin/lib/ljx-runtime-core.cjs`
  - `bin/lib/ljx-runtime-state.cjs`
  - `bin/lib/ljx-phase-context.cjs`
  - `bin/lib/ljx-lifecycle-shell-tools.cjs`

### Authoritative state and mirrors

- Structured machine truth for this phase should live in `.planning/state/phase-records/{phase}.json`.
- Human-readable artifacts remain phase-local:
  - `CODE_REVIEW.md`
  - `CODE_REVIEW_FIX.md`
  - `VERIFICATION.md`
  - `UAT.md` when engineering-style operator wording is still useful
- Phase 09 should not create new top-level `.planning/state/code-reviews/` or `.planning/state/verifications/` directories.

### Verification stack

- Unit and bridge coverage should stay in `node:test` suites under `tests/`.
- Preview/install verification should continue using `node bin/install.js --preview`.
- Full regression should continue using `npm test`.

## Reference Implementations To Reuse

### GSD references

#### `~/.codex/get-shit-done/workflows/code-review.md`

Use as the reference for:

- file-scope precedence (`--files` -> summary-derived files -> git diff fallback)
- review depth defaults and input validation
- treating code review as a distinct phase-level gate instead of folding it into verification

Do not copy its exact artifact naming or markdown-only truth assumptions. Reuse its review scoping and review-as-separate-gate shape.

#### `~/.codex/get-shit-done/workflows/verify-work.md`

Use as the reference for:

- verification as an explicit gate after execution
- verification preserving conversational / operator-facing output
- gap-oriented routing when acceptance fails

Do not copy its engineering-only UAT semantics as the only truth. Reuse the gate shape, not the narrow artifact model.

#### `~/.codex/get-shit-done/skills/gsd-code-review/SKILL.md` and `gsd-verify-work/SKILL.md`

Use as the reference for:

- keeping review and verification as separate public commands
- command-specific gates and failure handling
- clear output artifacts tied to each gate

#### `~/.codex/get-shit-done/bin/lib/core.cjs` and workflow orchestration patterns

Use as the reference for:

- centralized resolver organization
- keeping workflow prompts thin
- using one authoritative shared runtime rather than per-command ad hoc parsing

Do not copy the markdown-first truth model.

### Auto research references

#### `~/.codex/skills/auto-review-loop/SKILL.md`

Preserve:

- bounded review -> fix -> re-review rhythm
- explicit persisted review state
- resumable rounds instead of hidden long-lived agent memory

Phase 09 should not absorb Auto review-loop semantics into `verify-work`. It should keep `verify-work` as the broader acceptance gate and let review-loop remain a richer analysis tool for later phases.

#### `~/.codex/skills/research-review/SKILL.md`

Preserve:

- review as a distinct operation with its own artifact
- separation between critique and broader phase progression

This reinforces the Phase 09 principle that code review and verification should stay distinct rather than collapsing into one generic judgment command.

### Current ljx-GSD references

#### `bin/lib/ljx-code-review-tools.cjs`

Already provides:

- typed phase resolution through the shared phase context
- review lane assignment
- scope derivation
- requirement-rule handling

This should remain the main code-review context builder, but it needs structured phase-record quality-gate output instead of remaining artifact-only.

#### `bin/lib/ljx-code-review-fix-tools.cjs`

Already provides:

- honest stop behavior
- bounded fix scope from a phase-local review artifact
- rerun-after-fix recommendation policy

It should remain bounded and hidden, but Phase 09 should make its rerun consequence visible to lifecycle routing.

#### `bin/lib/ljx-verify-tools.cjs`

Already provides:

- unified gate preflight
- phase-type-specific primary verification question
- code-review freshness and blocking checks

It should become the consumer of shared quality-gate summaries rather than re-parsing all gate truth ad hoc.

#### `bin/lib/ljx-state-tools.cjs`

This is the main routing gap map for Phase 09:

- it currently checks whether review or verification artifacts exist and whether they are stale
- it does not treat blocking review findings as a lifecycle-owned stop state
- it does not treat failed verification verdicts as a stop state separate from mere artifact absence

Phase 09 should make this module consume authoritative gate summaries before it advances current or next phases.

#### `bin/lib/codex-conversion.cjs` and `bin/lib/build-skills.cjs`

These files matter because installed skills must preserve the same gate truth model:

- `code-review` should write or refresh `CODE_REVIEW.md` and sync `quality_gates.code_review`
- `verify-work` should write or refresh `VERIFICATION.md` and sync `quality_gates.verify_work`
- preview install must copy any new shared helper modules the generated skills rely on

## Architecture Patterns

### Pattern 1: Quality gates are phase-record-local summaries, not outer lifecycle stages

Recommended structure:

- keep outer lifecycle stages as `discuss`, `plan`, `execute`
- store review and verification under `phase_record.quality_gates`
- keep each gate phase-record-local:
  - `quality_gates.code_review`
  - `quality_gates.verify_work`

This preserves the accepted shell shape while still making review and verification authoritative lifecycle-owned gates.

### Pattern 2: Structured summary first, artifact evidence second

Recommended precedence for routing:

1. phase-record `quality_gates.*` summary fields
2. gate artifact presence and timestamps as evidence/freshness anchors
3. fallback artifact parsing only when the structured summary does not exist yet

Important rule:

- structured summary should decide the logical verdict
- artifacts should backstop freshness and operator detail
- routing should not require reinterpreting large prose artifacts every time when structured summary already exists

### Pattern 3: One post-execute recommendation path must own all gate semantics

`code-review`, `code-review-fix`, `verify-work`, `next`, and `progress` should not each implement their own independent interpretation of:

- whether review is required
- whether the latest review is fresh
- whether blocking findings remain
- whether verification passed or failed

That logic should converge into one shared helper path consumed by:

- `ljx-state-tools.cjs`
- `ljx-verify-tools.cjs`
- `ljx-code-review-fix-tools.cjs` where relevant

### Pattern 4: Fixes invalidate review freshness but do not silently complete the gate

After `code-review-fix`:

- the prior review must not remain implicitly fresh
- rerun behavior must respect `workflow.code_review_rerun_after_fix`
- `next` may recommend rerunning review, but should not silently enter a hidden fix loop

This matches the accepted hidden-fix semantics and preserves operator visibility.

### Pattern 5: Verification verdict must gate advancement, not file existence

The lifecycle shell should not treat a phase as done just because `VERIFICATION.md` exists.

It should route based on the verification summary:

- ready to continue
- needs fixes
- needs replanning
- needs strategic intervention

This is the highest-impact Phase 09 correction because current routing can otherwise over-advance after a negative verification artifact is written.

### Pattern 6: Installed skills must maintain the same authoritative summaries

Generated `ljx-GSD-code-review`, `ljx-GSD-code-review-fix`, and `ljx-GSD-verify-work` skills should:

- consume helper-provided phase-record paths and quality-gate state-update payloads
- refresh the phase-local artifact
- update the phase-record quality-gate subtree

Without this, preview/install behavior would drift away from repo-local runtime semantics.

## Don't Hand-Roll

- Do not invent a second top-level review-state control plane under `.planning/state/code-reviews/` or `.planning/state/verifications/`.
- Do not make `verify-work` reinterpret `CODE_REVIEW.md` prose independently when a structured gate summary already exists.
- Do not collapse code review into verification or hide `code-review-fix` behind silent automation.
- Do not rewrite Auto review-loop semantics into `verify-work`; preserve Auto's richer multi-round review workflows for later phases.

## Common Pitfalls

- Letting `next` recommend `verify-work` or a next phase even when `CODE_REVIEW.md` exists but still contains blocking findings.
- Treating verification as "complete if the file exists" instead of reading its acceptance verdict.
- Letting `code-review-fix` mutate phase completion or pretend the old review is still fresh.
- Updating local helper code without updating generated skill prompts and preview-runtime packaging, causing install-time drift.
- Reintroducing per-command freshness heuristics so `verify-work` and `next` disagree about whether the latest review is stale.

## Code Examples

### Existing helper entrypoints to extend

- `bin/lib/ljx-code-review-tools.cjs`
- `bin/lib/ljx-code-review-fix-tools.cjs`
- `bin/lib/ljx-verify-tools.cjs`
- `bin/lib/ljx-state-tools.cjs`
- `bin/lib/codex-conversion.cjs`
- `bin/lib/build-skills.cjs`

### Recommended shared helper direction

One new helper module under `bin/lib/` should own:

- persisting `quality_gates.code_review` summaries into phase records
- persisting `quality_gates.verify_work` summaries into phase records
- reading those summaries back for routing
- artifact-backed freshness checks for review and verification evidence

This keeps Phase 09 additive and minimizes churn in the current command-specific helpers.

### Existing tests to extend

- `tests/code-review-bridge.test.cjs`
- `tests/code-review-fix-bridge.test.cjs`
- `tests/verify-work-bridge.test.cjs`
- `tests/runtime-shell.test.cjs`
- `tests/lifecycle-next.test.cjs`
- `tests/skill-build.test.cjs`

These suites already cover most of the bridge helpers and recommendation behavior, so they are the right regression boundary for this phase.

---

*Phase: 09-integrate-quality-gates-into-lifecycle*  
*Research completed: 2026-04-10*
