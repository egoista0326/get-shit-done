---
phase: 10-cutover-packaging-and-final-verification
plan: 01
subsystem: testing
tags: [npm-pack, installer, hooks, node-test, packaging]

requires:
  - phase: 08-standalone-research-command-integration
    provides: Thin `commands/gsd/ljx-*.md` research overlay and old-route absence contract.
  - phase: 09-scenario-and-regression-harness
    provides: Existing temp-root installer and old-route regression baselines.
provides:
  - CUT-01 package dry-run inventory gate.
  - Temp-root installer output probes for normal runtime surfaces.
  - Hook source/dist freshness verification before package checks.
affects: [phase-10, packaging, installer, release-readiness]

tech-stack:
  added: []
  patterns:
    - "Node built-in test runner with child-process npm pack and installer probes"
    - "Installer probes run with temp HOME, XDG_CONFIG_HOME, and runtime config env dirs"

key-files:
  created:
    - tests/phase10-packaging-self-containment.test.cjs
  modified:
    - tests/phase10-packaging-self-containment.test.cjs

key-decisions:
  - "Installer CLI probes must not set GSD_TEST_MODE because that disables bin/install.js main execution."
  - "Gemini and Kilo assertions follow their existing supported install surfaces: Gemini TOML commands plus hooks, Kilo flat command output."

patterns-established:
  - "CUT-01 package checks parse npm pack --dry-run --json --ignore-scripts instead of walking the source tree."
  - "Generated install output checks must confine every runtime config path under a temp root."

requirements-completed: [CUT-01]

duration: 6min
completed: 2026-04-15
---

# Phase 10 Plan 01: Prepare Packaging And Install Self-Containment Summary

**CUT-01 packaging evidence with npm dry-run inventory, hook freshness checks, old-route absence, and temp-root installer probes**

## Performance

- **Duration:** 6 min
- **Started:** 2026-04-15T19:53:48Z
- **Completed:** 2026-04-15T19:59:52Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Added `tests/phase10-packaging-self-containment.test.cjs` covering package inventory, required package paths, forbidden old research-route paths, and all nine hook source/dist pairs.
- Added temp-root installer probes for Claude global skills, Claude local commands, Codex skills/config, Qwen skills, Gemini TOML commands/hooks, OpenCode and Kilo XDG command output, and Cline local `.clinerules`.
- Verified no package version bump, publish step, real global install, old research helper/config/compiler route, or production installer/package change was needed for CUT-01.

## Task Commits

1. **Task 10-01-00: Create packaging self-containment test** - `072e285` (test)
2. **Task 10-01-01: Make packaging and install checks pass** - `ea37d18` (fix)

## Files Created/Modified

- `tests/phase10-packaging-self-containment.test.cjs` - CUT-01 package dry-run, hook freshness, old-route absence, and temp-root installer output test.

## Decisions Made

- Installer child-process probes delete `GSD_TEST_MODE` so `bin/install.js` runs through its real CLI path instead of exporting test helpers only.
- Gemini install checks assert the existing supported `commands/gsd/*.toml` plus hook output rather than introducing an unsupported Gemini skills surface.
- Kilo install checks assert the existing supported XDG `command/gsd-*.md` output.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed installer probe test harness**
- **Found during:** Task 10-01-01 (Make packaging and install checks pass)
- **Issue:** The first RED test passed `GSD_TEST_MODE=1` to child-process installer commands, which prevented `bin/install.js` from executing its CLI install path.
- **Fix:** Removed `GSD_TEST_MODE` from child-process env while preserving temp `HOME`, `XDG_CONFIG_HOME`, and all runtime config env vars.
- **Files modified:** `tests/phase10-packaging-self-containment.test.cjs`
- **Verification:** `node --test tests/phase10-packaging-self-containment.test.cjs` exited 0.
- **Committed in:** `ea37d18`

**2. [Rule 1 - Bug] Aligned generated-output assertions with supported runtime surfaces**
- **Found during:** Task 10-01-01 (Make packaging and install checks pass)
- **Issue:** The initial test expected Gemini skills and Kilo rules output, but the existing installer-supported surfaces are Gemini TOML commands/hooks and Kilo flat command output.
- **Fix:** Updated assertions to check `commands/gsd/ljx-run-experiment.toml` for Gemini and `command/gsd-ljx-run-experiment.md` for Kilo.
- **Files modified:** `tests/phase10-packaging-self-containment.test.cjs`
- **Verification:** Focused Phase 10 suite exited 0.
- **Committed in:** `ea37d18`

---

**Total deviations:** 2 auto-fixed (2 Rule 1 bugs)
**Impact on plan:** No production scope expansion. The resulting test exercises normal supported installer output only and keeps all installer writes sandboxed.

## Issues Encountered

- No package, hook-build, or installer production change was required after the test harness was corrected.

## Verification

Passed:

```bash
npm run build:hooks && node --test tests/phase10-packaging-self-containment.test.cjs tests/package-manifest.test.cjs tests/install-hooks-copy.test.cjs tests/bug-1736-local-install-commands.test.cjs tests/research-thin-overlay.test.cjs && git diff --check -- tests/phase10-packaging-self-containment.test.cjs package.json bin/install.js scripts/build-hooks.js hooks/dist
```

Result: 43 tests passed, 0 failed; `git diff --check` exited 0.

## Known Stubs

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Plan 10-02 can build docs/cutover alignment on top of the verified CUT-01 package and generated-output contract. Remaining Phase 10 work still must avoid `npm publish`, version bumps, and any `@latest` shipped/public release claim until a later explicit release decision.

## Self-Check: PASSED

- Found `tests/phase10-packaging-self-containment.test.cjs`
- Found `.planning/phases/10-cutover-packaging-and-final-verification/10-01-SUMMARY.md`
- Found commit `072e285`
- Found commit `ea37d18`

---
*Phase: 10-cutover-packaging-and-final-verification*
*Completed: 2026-04-15*
