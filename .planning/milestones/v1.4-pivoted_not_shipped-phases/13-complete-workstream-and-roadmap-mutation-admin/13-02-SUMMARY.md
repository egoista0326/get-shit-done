# 13-02 Summary: Typed Roadmap Admin Commands

**Status:** Implemented in scope
**Worker:** 13-02
**Scope:** `add-phase`, `insert-phase`, `remove-phase` helper/runtime and generated skill promotion

## Completed

- Added `bin/lib/ljx-roadmap-admin-tools.cjs` with helper-backed `add`, `insert`, and `remove` operations plus CLI argument parsing.
- Added `tests/roadmap-admin-bridge.test.cjs` covering typed add, decimal insert, missing/invalid phase type stops, future-only removal, and active/completed/evidence-bearing removal rejection.
- Promoted `ljx-GSD-add-phase`, `ljx-GSD-insert-phase`, and `ljx-GSD-remove-phase` from deferred to bridge-ready in `bin/lib/manifest.cjs`.
- Updated `bin/lib/build-skills.cjs` to copy the new roadmap admin helper into installed runtime output and generate the three admin skills.
- Added `buildRoadmapAdminSkill()` in `bin/lib/codex-conversion.cjs` so generated skills invoke the installed helper instead of instructing direct `.planning/` edits.
- Updated `tests/skill-build.test.cjs` so install output, helper copy, manifest built/deferred truth, and same-name user conflict semantics match the promoted admin commands.

## Safety Notes

- `add` and `insert` require an explicit phase type validated against `KNOWN_PHASE_TYPES`.
- `add` and `insert` write a phase directory, a structured phase record, and the roadmap summary/detail/progress mirrors.
- `insert` chooses the next decimal slot after the anchor and does not renumber existing phases.
- `remove` is intentionally conservative: it stops unless the target is future and evidence-free; it does not touch active, completed, or evidence-bearing history.
- `ljx-GSD-research-pipeline` remains unchanged as a deferred lifecycle truth entry with a compatibility wrapper; Auto Research skills are not modified.

## Verification

Passed in this worker turn:

- `node --check bin/lib/ljx-roadmap-admin-tools.cjs` passed.
- `node --check bin/lib/manifest.cjs` passed.
- `node --check bin/lib/build-skills.cjs` passed.
- `node --check bin/lib/codex-conversion.cjs` passed.
- `node --test tests/roadmap-admin-bridge.test.cjs tests/skill-build.test.cjs` passed with 46 passing tests and 0 failures.
- `node bin/install.js --print-manifest` passed and shows `ljx-GSD-add-phase`, `ljx-GSD-insert-phase`, and `ljx-GSD-remove-phase` as bridge-ready while `ljx-GSD-research-pipeline` remains deferred with a compatibility wrapper.
- scoped `git diff --check` passed.
