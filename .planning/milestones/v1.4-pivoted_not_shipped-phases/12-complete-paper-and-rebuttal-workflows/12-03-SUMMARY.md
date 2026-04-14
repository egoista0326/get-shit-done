# Plan 12-03 Summary: Routing, Generated Skills, And Install Surface

**Completed:** 2026-04-11
**Status:** Implemented and locally verified
**Requirement:** IMPL-06

## What Changed

- Updated generated `ljx-GSD-paper-pipeline` wording to mention shared paper/rebuttal artifact links and `paperReadiness`.
- Updated generated `ljx-GSD-rebuttal` wording to preserve the fuller Auto rebuttal artifact structure, including rebuttal experiment plan/log files, venue confirmation, and explicit `write-rebuttal-state`.
- Added install/runtime copy support for `ljx-paper-evidence-tools.cjs`.
- Strengthened `tests/skill-build.test.cjs` to assert full paper/rebuttal writer commands and installed paper evidence helper availability.

## Verification

```bash
node --check bin/lib/codex-conversion.cjs
node --check bin/lib/build-skills.cjs
node --test tests/skill-build.test.cjs
node bin/install.js --preview
node --test tests/execute-phase-shell.test.cjs tests/lifecycle-next.test.cjs
```

Result: pass.

## Notes

- Paper/rebuttal routing remains recommendation-only; lifecycle completion is still owned by the outer GSD shell.
- Generated skills continue to preserve Auto companion-stage intent instead of replacing paper/rebuttal workflows with a new engine.
- Preview install now includes the shared paper evidence helper required by installed paper-pipeline and rebuttal helpers.
