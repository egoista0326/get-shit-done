---
phase: "08-complete-core-lifecycle-shell"
plan: "04"
status: "completed"
key_files:
  created:
    - "tests/lifecycle-next.test.cjs"
  modified:
    - "bin/lib/ljx-lifecycle-shell-tools.cjs"
    - "bin/lib/ljx-state-tools.cjs"
    - "bin/lib/codex-conversion.cjs"
    - "bin/lib/manifest.cjs"
    - "tests/runtime-shell.test.cjs"
    - "tests/skill-build.test.cjs"
verification:
  - "node --test tests/lifecycle-next.test.cjs tests/runtime-shell.test.cjs"
  - "node --test tests/skill-build.test.cjs"
  - "node bin/install.js --preview"
  - "npm test"
---

# Summary

## Completed

- Replaced the old helper-safe/file-count `next` heuristic with lifecycle-aware recommendation logic that reads typed phase lifecycle status first, then falls back to thin lifecycle and direct-artifact evidence.
- Promoted bridge-ready lifecycle commands from deferred-only resolution into one-step continuation candidates on the public surface, while preserving honest-stop behavior for malformed state and genuinely deferred actions.
- Added regression coverage for direct-artifact convergence, structured-state-first routing, next-phase advancement after verification, and the updated preview/install skill surface.

## Verification

- `node --test tests/lifecycle-next.test.cjs tests/runtime-shell.test.cjs`
- `node --test tests/skill-build.test.cjs`
- `node bin/install.js --preview`
- `npm test`
