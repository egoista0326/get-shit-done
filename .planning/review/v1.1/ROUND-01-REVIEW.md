# v1.1 Round 01 Review

**Date:** 2026-04-12
**Scope:** Whole current `ljx-GSD` repository: runtime helpers, installer/build output, generated Codex skills, tests, planning state, upstream GSD/Auto parity expectations, and Phase 17 scenario matrix.
**Rubric:** `.planning/review/v1.1/REVIEW-RUBRIC.md`
**Scenario matrix:** `.planning/review/v1.1/SCENARIO-MATRIX.md`

## Baseline Probes

- `node bin/install.js --print-manifest`: passed; manifest listed 30 bridge-ready skills.
- `node bin/lib/ljx-state-tools.cjs progress --cwd /Users/lijiaxin/Downloads/new-gsd`: resolved current Phase 18 and recommended `ljx-GSD-execute-phase 18`.
- `node bin/lib/ljx-state-tools.cjs next --cwd /Users/lijiaxin/Downloads/new-gsd`: returned a bridge-ready, non-inline handoff for `ljx-GSD-execute-phase 18`.
- `node bin/install.js --preview`: initially failed without explicit source-root environment variables because it looked only at stale `/tmp/codex-skill-repos/*` defaults.
- `LJX_GSD_GSD_SOURCE=.planning/references/upstreams/get-shit-done LJX_GSD_AUTO_SOURCE=.planning/references/upstreams/auto-claude-code-research-in-sleep node bin/install.js --preview`: passed when source roots were provided explicitly.
- `node --test tests/docs-contract.test.cjs tests/parity-cutover.test.cjs tests/skill-build.test.cjs`: exposed stale live-repo canary assertions and source-root sensitivity.
- Targeted research/Auto parity lanes reported their scoped tests green.

## Parallel Review Lanes

- **Install, manifest, config, generated skills:** no manifest count drift and no hidden second control plane in `research-pipeline`; candidate findings in source-root defaults, experiment launch confirmation, and legacy config aliases.
- **Auto/ARIS research parity:** research lifecycle remained phase-local and companion Auto execution skills were preserved; candidate finding in `experiment-bridge` launch confirmation.
- **GSD lifecycle/state parity:** migration, lifecycle `next`, code-review/fix/verify, pause/resume, workstream, and workspace static coverage remained intact; candidate finding in stale Phase 14 canary tests.

## Candidate Findings

| Candidate | Severity | Surface | Evidence | Confirmation Check |
|-----------|----------|---------|----------|--------------------|
| CF-01 | P1/P2 | Installer/source roots | `node bin/install.js --preview` failed in this checkout unless upstream paths were injected through env vars, despite repo-local snapshots under `.planning/references/upstreams/`. | Confirm whether preview build is a Phase 17 baseline gate and whether repo-local upstream snapshots should be accepted source truth. |
| CF-02 | P1 | `experiment-bridge` runtime and generated skill | `workflow.confirm_experiment_launch=true` is in defaults, but helper context exposed only `autoDeploy`, `sanityFirst`, and `maxParallelRuns`; generated `ljx-GSD-experiment-bridge` did not instruct the agent to stop before compute launch when confirmation is enabled. | Confirm against parameter design and experiment-launch safety rule. |
| CF-03 | P2 | Runtime config compatibility | Docs and prior design say legacy aliases are accepted at external input boundaries; `loadProjectConfig()` merged raw top-level aliases without normalizing them. | Confirm with explicit config fixture using top-level Auto/GSD aliases. |
| CF-04 | P2/P3 | Live-repo tests | `tests/docs-contract.test.cjs`, `tests/parity-cutover.test.cjs`, and `tests/runtime-shell.test.cjs` still hard-coded Phase 14 as current after v1.1 moved current state to Phase 18. | Confirm whether the intended invariant is exact Phase 14 or "at/after Phase 14 cutover baseline." |

## Clean Observations

- GSD lifecycle routing stayed bridge-ready and explicit: no hidden inline execution for phase commands through `next`.
- Research workflows stayed phase-local and did not mutate roadmap/lifecycle truth from helper context reads.
- `research-pipeline` stayed proposal/admin-handoff backed and did not reintroduce Auto as a separate control plane.
- Code-review, review-fix, verify-work, pause/resume, workstream, workspace, migration, paper, rebuttal, claim, result-to-claim, novelty, and ablation surfaces had no confirmed Round 1 blocking issue beyond the candidates above.
- Preserved Auto companion skills such as `$run-experiment`, `$monitor-experiment`, and `$training-check` remain intentionally referenced where direct execution belongs to those tools.

## Result

Round 1 was not clean. Four candidate findings advanced to second-pass confirmation.
