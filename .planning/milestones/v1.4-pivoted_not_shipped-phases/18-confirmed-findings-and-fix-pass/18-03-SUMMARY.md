---
phase: 18
plan: 18-03
status: completed
completed_at: 2026-04-12
key_files:
  - bin/lib/source-roots.cjs
  - bin/install.js
  - bin/lib/ljx-experiment-bridge-tools.cjs
  - bin/lib/codex-conversion.cjs
  - bin/lib/ljx-runtime-core.cjs
  - tests/source-roots.test.cjs
  - tests/experiment-bridge-bridge.test.cjs
  - tests/runtime-core.test.cjs
  - tests/skill-build.test.cjs
  - tests/docs-contract.test.cjs
  - tests/parity-cutover.test.cjs
  - tests/runtime-shell.test.cjs
---

# 18-03 Summary: Accepted Fixes

Implemented minimal fixes for all confirmed Round 1 bugs:

- Source roots now prefer explicit env values, then existing configured defaults, then repo-local upstream snapshots under `.planning/references/upstreams/`, before falling back to the historical `/tmp` defaults.
- Preview/install now calls `resolveSourceRoots({ repoRoot })`, making repo-local snapshot fallback deterministic from the current checkout.
- `experiment-bridge` context now exposes `confirmExperimentLaunch` and `experimentLaunchConfirmationGranularity`.
- Generated `ljx-GSD-experiment-bridge` instructions now require explicit confirmation before compute launch when `confirmExperimentLaunch = true` and `autoDeploy = true`.
- `loadProjectConfig()` now normalizes accepted top-level legacy aliases such as `AUTO_DEPLOY`, `HUMAN_CHECKPOINT`, `REVIEWER_MODEL`, literature aliases, and recovery aliases before merging into canonical config.
- Phase 14 canary tests now assert the durable invariant: current routing is typed and at or after the Phase 14 cutover baseline.

TDD evidence:

- Added failing regression coverage before implementation for source-root fallback, experiment launch confirmation, legacy alias normalization, and generated skill policy wording.
- Updated stale canary tests to match the intended post-cutover invariant.
