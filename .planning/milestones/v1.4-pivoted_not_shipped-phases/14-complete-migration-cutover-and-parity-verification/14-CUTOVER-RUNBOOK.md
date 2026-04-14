# Phase 14 Cutover Runbook

## Scope

This runbook covers the in-repo Phase 14 migration cutover path after Plans 14-01 through 14-03. It is operator guidance for this repository, not a global install instruction.

Global installed production skill replacement remains out of scope until the user explicitly chooses a later production cutover. The only install action in Phase 14 verification is preview output under `.build/codex-preview`.

## Control Truth

Structured migration records control routing.

The authoritative migration records live under `.planning/state/migration/`:

- `.planning/state/migration/import-sessions/{session_id}.json`
- `.planning/state/migration/conflict-reports/{session_id}.json`
- `.planning/state/migration/repair-bundles/{session_id}.json`
- `.planning/state/migration/releases/{session_id}.json`
- `.planning/state/migration/promotions/{promotion_id}.json`
- `.planning/state/migration/suggested-branches.json`

The root migration reports are explanatory only:

- `.planning/MIGRATION_SUMMARY.md`
- `.planning/CONFLICT_REPORT.md`
- `.planning/REPAIR_BUNDLE.md`
- `.planning/SUGGESTED_BRANCHES.md`
- `.planning/migration/promotions/{promotion_id}-DIFF.md`

Backups under `.planning/legacy-backups/{source_family}/{session_id}/original/` are archival evidence only. They must not become active routing truth after release.

## Entrypoints

Use the helper-backed surface that is implemented today. Do not invent or document a new public migration skill in this phase.

```bash
node <ljx-gsd-runtime>/ljx-migration-tools.cjs status --cwd "$PWD"
node <ljx-gsd-runtime>/ljx-migration-tools.cjs import --cwd "$PWD" --source gsd=<legacy-gsd-root> --source auto=<legacy-auto-root>
node <ljx-gsd-runtime>/ljx-migration-tools.cjs preflight --cwd "$PWD" --source gsd=<legacy-gsd-root> --source auto=<legacy-auto-root>
node <ljx-gsd-runtime>/ljx-migration-tools.cjs release --cwd "$PWD" --session-id <session-id>
```

`<ljx-gsd-runtime>` is the installed `ljx-gsd/runtime` directory. Source checkout debugging may use `bin/lib`, but operator docs should follow the helper actions emitted by the installed runtime. Normal lifecycle, roadmap mutation, mutating workstream commands, and `research-pipeline` stay blocked while migration status requires release.

## Operator Flow

1. Preflight

Run:

```bash
node <ljx-gsd-runtime>/ljx-migration-tools.cjs status --cwd "$PWD"
node <ljx-gsd-runtime>/ljx-migration-tools.cjs import --cwd "$PWD" --source gsd=<legacy-gsd-root> --source auto=<legacy-auto-root>
node <ljx-gsd-runtime>/ljx-migration-tools.cjs preflight --cwd "$PWD" --source gsd=<legacy-gsd-root> --source auto=<legacy-auto-root>
```

Confirm the detected source families, planned backup location, blocking conflicts, non-blocking residue, and suggested repair bundle. In `safe` mode, do not write converted state silently.

2. Import

Use the helper-backed import flow. The import must preserve the read-old/write-new-only rule:

- preserve originals under `.planning/legacy-backups/{source_family}/{session_id}/original/`
- write structured migration state under `.planning/state/migration/`
- write explanatory root reports
- keep legacy inputs and backups out of active routing

3. Conflict Review

Read `.planning/CONFLICT_REPORT.md` for operator explanation, then verify the structured conflict record. The structured conflict report decides whether release can proceed.

Blocking conflict classes include graph reconstruction failure, unresolved current position, control-field contradiction, core artifact attachment failure, structured-state integrity failure, incomplete backup output, and unrecoverable key-input damage.

4. Repair

Read `.planning/REPAIR_BUNDLE.md` for the human-readable bundle. Low-risk repairs may be staged as preview entries, but repairs that alter graph semantics, `phase_type`, active phase, completion state, milestone position, core artifact ownership, legacy overwrite direction, backup completeness, or `next` routing require explicit repair action or confirmation.

5. Release

Run:

```bash
node <ljx-gsd-runtime>/ljx-migration-tools.cjs release --cwd "$PWD" --session-id <session-id>
```

Release requires:

- completed import session
- no unresolved blocking conflicts
- complete backup manifest and conversion reports
- root migration reports present
- consistent structured state and artifact references
- resolvable current position and `next` routing

6. Parity Verification

Run the Phase 14 verification set before claiming cutover readiness:

```bash
node --test tests/docs-contract.test.cjs tests/runtime-shell.test.cjs
node bin/lib/ljx-state-tools.cjs progress --cwd "$PWD"
node bin/lib/ljx-state-tools.cjs next --cwd "$PWD"
node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" init phase-op 14
node bin/install.js --print-manifest
node bin/install.js --preview
npm test
git diff --check
```

7. Rollback And Backup Evidence

If cutover cannot be released, keep the structured import/conflict/repair records and backup session intact. Use the backup manifest and `conversion-report.md` to inspect preserved originals. Do not restore legacy files into active control truth unless an explicit repair/import override is chosen.

## No-Go Conditions

Stop the cutover if any of these are true:

- unresolved blocking conflicts remain
- backup session output is incomplete
- migration reports are missing or disagree with structured state
- `.planning/state/migration/*` records are malformed
- current phase or `next` routing cannot be resolved
- suggested branches have been promoted into formal workstreams without explicit promotion provenance
- `research-pipeline` would run a hidden upstream Auto linear pipeline or claim downstream stages ran without phase-local evidence
- a proposed action would replace globally installed production skills without a separate user cutover decision

## Research-Pipeline Boundary

`ljx-GSD-research-pipeline` is bridge-ready only as a helper-backed phase-chain proposal/router. It may consume direct Auto-like artifacts as evidence, but it does not claim downstream research stages already ran unless phase-local artifacts and structured state prove they did.

Structural phase-chain changes must go through the roadmap-admin boundary (`ljx-GSD-add-phase`, `ljx-GSD-insert-phase`, or `ljx-GSD-remove-phase`) and normal confirmation policy.
