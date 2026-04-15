---
phase: 10-cutover-packaging-and-final-verification
plan: 02
subsystem: documentation
tags: [cutover, docs, installer-paths, node-test, release-readiness]

requires:
  - phase: 08-standalone-research-command-integration
    provides: Thin `commands/gsd/ljx-*.md` research overlay and final clean review evidence.
  - phase: 10-cutover-packaging-and-final-verification
    provides: CUT-01 package and installer self-containment evidence from Plan 10-01.
provides:
  - CUT-02 static docs contract for cutover/install path alignment.
  - Cutover readiness notes without version, registry, or release-channel authorization.
  - Manual source-update guidance aligned to target runtime config output paths.
affects: [phase-10, cutover-docs, installer-docs, localized-readmes]

tech-stack:
  added: []
  patterns:
    - "CommonJS node:test static docs assertions"
    - "Readiness-only cutover notes with exact no-release caveat"

key-files:
  created:
    - tests/phase10-docs-cutover-alignment.test.cjs
    - docs/CUTOVER.md
    - docs/GETTING-STARTED.md
  modified:
    - docs/README.md
    - docs/manual-update.md
    - README.md
    - README.zh-CN.md
    - README.ja-JP.md
    - README.ko-KR.md
    - README.pt-BR.md

key-decisions:
  - "Cutover notes are readiness evidence only and do not authorize a version bump, npm publish, shipped claim, or @latest claim."
  - "Localized packaged READMEs use a short tested English-authoritative note instead of broad translation rewrites."
  - "Manual source-update docs describe installed hooks under hooks/ in the target runtime config directory; hooks/dist/ remains source checkout build output."

patterns-established:
  - "Docs drift is caught by exact static assertions rather than live npm registry checks."
  - "Source-based verification probes should use --config-dir with a temporary runtime config path."

requirements-completed: [CUT-01, CUT-02]

duration: 5min
completed: 2026-04-15
---

# Phase 10 Plan 02: Write Migration/Cutover Docs And Release Notes Summary

**Readiness-only cutover documentation with static docs alignment tests for installer paths, localized README authority, and no public release claims**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-15T20:03:57Z
- **Completed:** 2026-04-15T20:08:51Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments

- Added `tests/phase10-docs-cutover-alignment.test.cjs`, a CommonJS `node:test` contract for cutover notes, manual source-update paths, README install distinctions, localized README authority notes, and release-claim caveats.
- Added `docs/CUTOVER.md` as readiness notes, not a release announcement, with exact installer surface statements for global Claude skills, local Claude commands, target `hooks/`, and thin research overlay sources.
- Updated `docs/manual-update.md`, `README.md`, `docs/README.md`, `docs/GETTING-STARTED.md`, and packaged localized READMEs to point users at current authoritative cutover/install path guidance.

## Task Commits

Each task was committed atomically:

1. **Task 10-02-00: Create docs cutover alignment test** - `af9a3f7` (test)
2. **Task 10-02-01: Align cutover docs with installer output** - `7387031` (docs)

## Files Created/Modified

- `tests/phase10-docs-cutover-alignment.test.cjs` - CUT-02 static docs alignment contract.
- `docs/CUTOVER.md` - Cutover readiness notes with exact no-release caveat and installer surface facts.
- `docs/GETTING-STARTED.md` - Source-checkout setup note linking to cutover install paths.
- `docs/manual-update.md` - Source-based update procedure using `npm run build:hooks`, `--config-dir`, and target runtime config output paths.
- `docs/README.md` - Documentation index link to cutover install paths.
- `README.md` - User-facing local-vs-global Claude install distinction and cutover link.
- `README.zh-CN.md` - Packaged localized authoritative cutover note.
- `README.ja-JP.md` - Packaged localized authoritative cutover note.
- `README.ko-KR.md` - Packaged localized authoritative cutover note.
- `README.pt-BR.md` - Packaged localized authoritative cutover note.

## Decisions Made

- Kept `docs/CUTOVER.md` strictly readiness-only so it cannot be read as version, registry, or release-channel authorization.
- Used a short exact English note in localized READMEs to avoid broad localized rewrites while still making English cutover docs authoritative for current install paths.
- Documented hooks as installed under `hooks/` in the target runtime config directory, while keeping `hooks/dist/` as source checkout build output.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- The first GREEN pass had one exact-string mismatch in `docs/manual-update.md` because `hooks/` was code-formatted. The wording was made explicit before the task commit, and the focused docs gate then passed.

## Verification

Passed:

```bash
node --test tests/phase10-docs-cutover-alignment.test.cjs && git diff --check -- tests/phase10-docs-cutover-alignment.test.cjs docs/CUTOVER.md docs/README.md docs/GETTING-STARTED.md docs/manual-update.md README.md README.zh-CN.md README.ja-JP.md README.ko-KR.md README.pt-BR.md
```

Result: 4 tests passed, 0 failed; `git diff --check` exited 0.

Additional checks:

- `package.json` version remained `1.35.0`.
- `docs/CUTOVER.md` contains the exact no-version/no-publish/no-release-channel caveat and no other `published`, `shipped`, `@latest`, or `npm publish` wording.
- Plan file status is clean after the task commits.

## Known Stubs

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 10-03 can use the docs alignment test and cutover readiness notes as one input to the final evidence agreement matrix. Any version bump, npm registry action, `@latest` wording, or shipped/public release claim still requires a separate explicit decision.

## Self-Check: PASSED

- Found `tests/phase10-docs-cutover-alignment.test.cjs`
- Found `docs/CUTOVER.md`
- Found `docs/README.md`
- Found `docs/GETTING-STARTED.md`
- Found `docs/manual-update.md`
- Found `README.md`
- Found `README.zh-CN.md`
- Found `README.ja-JP.md`
- Found `README.ko-KR.md`
- Found `README.pt-BR.md`
- Found `.planning/phases/10-cutover-packaging-and-final-verification/10-02-SUMMARY.md`
- Found commit `af9a3f7`
- Found commit `7387031`

---
*Phase: 10-cutover-packaging-and-final-verification*
*Completed: 2026-04-15*
