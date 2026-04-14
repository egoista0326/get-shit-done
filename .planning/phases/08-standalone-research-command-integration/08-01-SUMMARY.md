---
phase: 08-standalone-research-command-integration
plan: 01
subsystem: research-overlay-commands
tags: [gsd-ljx, research-overlay, discovery, literature, novelty, refinement, phase-08]
requires:
  - phase: 07-core-gsd-lifecycle-parity
    provides: GSD lifecycle parity and insertion boundary
provides:
  - Discovery/literature/novelty/refinement research command family
  - Thin research compiler under GSD lifecycle ownership
  - Phase-local research index and evidence checks
  - Safe/auto/danger-auto research config loading
  - Sixteen-round review accounting with two consecutive clean rounds
affects: [phase-08, research-commands, gsd-lifecycle-boundary]
tech-stack:
  added: []
  patterns:
    - Thin Auto/ARIS prompt/config/artifact compiler above GSD
    - Phase-local research evidence ledger
    - Separate research.config.json from GSD config
    - Prefixed /gsd-ljx-* overlay commands
key-files:
  created:
    - get-shit-done/bin/lib/research-config.cjs
    - get-shit-done/bin/lib/research-command-map.cjs
    - get-shit-done/bin/lib/research-prompt-packs.cjs
    - get-shit-done/bin/lib/research-phase-render.cjs
    - get-shit-done/bin/lib/research-compiler.cjs
    - get-shit-done/bin/lib/research-index.cjs
    - get-shit-done/bin/lib/research-evidence.cjs
    - get-shit-done/workflows/gsd-ljx-research-command.md
    - commands/gsd/gsd-ljx-research-lit.md
    - commands/gsd/gsd-ljx-idea-discovery.md
    - commands/gsd/gsd-ljx-idea-creator.md
    - commands/gsd/gsd-ljx-novelty-check.md
    - commands/gsd/gsd-ljx-research-review.md
    - commands/gsd/gsd-ljx-research-refine.md
    - commands/gsd/gsd-ljx-research-refine-pipeline.md
    - commands/gsd/gsd-ljx-research-pipeline.md
    - tests/research-config.test.cjs
    - tests/research-compiler-discovery.test.cjs
    - tests/research-artifacts.test.cjs
    - tests/research-evidence.test.cjs
    - .planning/phases/08-standalone-research-command-integration/08-01-REVIEW.md
    - .planning/phases/08-standalone-research-command-integration/08-01-SUMMARY.md
  modified:
    - get-shit-done/bin/gsd-tools.cjs
    - tests/core-lifecycle-planning-parity.test.cjs
    - tests/core-gsd-parity-scenario.test.cjs
    - .planning/phases/08-standalone-research-command-integration/08-01-PLAN.md
key-decisions:
  - GSD remains lifecycle owner; the research layer compiles prompts/config/artifacts/evidence only.
  - New research commands use `/gsd-ljx-*` names to avoid confusion with upstream/core GSD commands.
  - Existing-roadmap research work routes through GSD phase insertion intent; research-first pipeline uses ordinary integer roadmap planning intent.
  - The research compiler never directly writes canonical `ROADMAP.md` or `STATE.md`.
  - Phase 08 external side effects remain policy/bridge/evidence only; no GPU, W&B, SSH, paid compute, push, PR, or publication action is executed by 08-01.
requirements-addressed: [RSCH-01, RSCH-02, RSCH-05, RSCH-06, RSCH-07, RSCH-08, RSCH-09]
requirements-completed: []
review_rounds: 16
review_cap_reached: false
final_clean_streak: 2
completed: 2026-04-14T18:08:41+02:00
---

# 08-01 Summary: Discovery/Literature/Novelty/Refinement Command Family

## Outcome

08-01 implemented the first standalone research command family as a thin Auto/ARIS overlay that compiles research intent into ordinary GSD-owned phase guidance, artifacts, and evidence checks.

The implementation deliberately did not change the GSD phase schema, did not add `phase_type`, did not create a second roadmap/state system, and did not make the research layer an authoritative lifecycle writer.

## Commands Added

- `/gsd-ljx-research-lit`
- `/gsd-ljx-idea-discovery`
- `/gsd-ljx-idea-creator`
- `/gsd-ljx-novelty-check`
- `/gsd-ljx-research-review`
- `/gsd-ljx-research-refine`
- `/gsd-ljx-research-refine-pipeline`
- `/gsd-ljx-research-pipeline`

All wrappers route to `get-shit-done/workflows/gsd-ljx-research-command.md`.

## Runtime Surfaces Added

- `gsd-tools research compile <command> ...`
- `gsd-tools research index <phase-id> --command <command>`
- `gsd-tools research evidence-check <phase-id> --command <command>`

## Core Behavior

- `research compile` returns deterministic JSON with command metadata, prompt packs, artifact requirements, evidence requirements, gate policy, lifecycle owner, and insertion/research-first intent.
- `research index` initializes or previews the phase-local research index as a human-readable evidence ledger, not lifecycle state.
- `research evidence-check` distinguishes `clean`, `incomplete`, and `blocked` evidence states.
- The research config file is separate from the GSD config file, supports `safe`, `auto`, and `danger-auto`, and defaults to deep effort/review depth.
- Strict research config mode fails closed on unknown top-level and nested preset/command keys.
- `danger-auto` requires phase-local audit artifacts and cannot disable its audit/side-effect invariants through preset overrides.
- Unknown nested command config keys are ignored with warnings in default mode and cannot become effective compiler parameters.
- `research-first` mode is accepted only for `/gsd-ljx-research-pipeline`; other research commands compile to phase-insert intent.

## Review Accounting

The user increased the review cap to 20 rounds and requested multi-subagent review with main-agent confirmation. The loop stopped early after two consecutive clean rounds.

- Rounds executed: 16
- Consecutive clean rounds achieved after final fix: 2
- Cap reached: no
- Known accepted P0/P1/P2 findings after final fixes: none
- Clean confirmation: Round 15 and Round 16 both returned clean across lifecycle, research semantics, security, and maintainability lanes.

Detailed accounting is in `08-01-REVIEW.md`.

## Test Evidence

Final commands passed:

```text
node --test tests/research-config.test.cjs tests/research-compiler-discovery.test.cjs tests/research-artifacts.test.cjs tests/research-evidence.test.cjs
48 tests, 48 pass, 0 fail
```

```text
node --test tests/foundation-boundaries.test.cjs tests/core-lifecycle-planning-parity.test.cjs tests/core-review-workspace-git-parity.test.cjs tests/core-gsd-parity-scenario.test.cjs
28 tests, 28 pass, 0 fail
```

```text
rg '\$\{ARGUMENTS\}|Arguments: \$ARGUMENTS|GSD_RESEARCH_INTENT|gsd-ljx-research-intent\.txt|phase_type|code_review_requirements_by_phase_type' commands/gsd/gsd-ljx-*.md get-shit-done/workflows/gsd-ljx-research-command.md get-shit-done/bin/lib/research-*.cjs || true
no matches
```

```text
git diff --check
passed
```

```text
node get-shit-done/bin/gsd-tools.cjs state validate --cwd "$PWD"
valid true
```

## Residual Risks

- Experiment/audit/result/claim commands remain 08-02 scope.
- Paper/rebuttal/ablation command families remain later Phase 08 scope per plan.
- External side-effect execution remains intentionally unimplemented in 08-01.

## Next Step

Proceed to 08-02: experiment/audit/result/claim command family.

## Self-Check

All automated checks passed.
