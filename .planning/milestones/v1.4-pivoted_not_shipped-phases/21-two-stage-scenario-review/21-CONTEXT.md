# Phase 21 Context: Two-Stage Scenario Review

## Objective

Run a post-v1.2 `ljx-GSD` review under the upgraded v1.3 protocol:

- Stage 1: up to 5 detailed static/implementation review rounds.
- Stage 2: up to 4 live task-scenario review rounds.
- Each stage exits only after two consecutive clean rounds, with the documented P3/minor exception.

## User Requirements

- First five review rounds remain detailed and comprehensive.
- Every discovered issue receives second-pass confirmation against upstream GSD, upstream Auto/ARIS, accepted `ljx-GSD` design, generated preview/install contract, or direct runtime correctness before fixing.
- Extreme/rare/minor issues may be fixed without making the round fail, but must still be recorded and verified.
- Focus especially on cases where upstream GSD/Auto works but `ljx-GSD` diverges, plus any `ljx-GSD`-specific invented behavior.
- The later four scenario rounds must simulate real tasks through subagents, require skill-chain reporting, and verify actual `ljx-GSD` behavior.
- Stage 2 must use only `ljx-GSD-*` skills; no raw GSD or Auto skill workflow calls.
- Temporary scenario files must be cleaned after each scenario round unless a failing case is intentionally preserved and documented.
- `.planning` review/accounting mirror updates are bookkeeping and do not reset clean count unless they affect skill behavior, install/runtime routing, state recovery, hidden implementation defects, or verification reliability.

## Current Baseline

- v1.2 fixed V12-001 through V12-063 but ended `capped_not_clean`.
- Fresh baseline before v1.3:
  - `node --test tests/*.test.cjs` passed 694/694.
  - `node bin/install.js --preview` passed.
  - generated preview self-containment scans returned no raw upstream GSD/Auto skill invocation matches.
  - `git diff --check` passed.
