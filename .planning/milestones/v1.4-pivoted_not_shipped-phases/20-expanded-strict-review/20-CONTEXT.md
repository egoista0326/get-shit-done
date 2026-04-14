# Phase 20 Context: Expanded Strict Review

**Date:** 2026-04-12
**Milestone relation:** v1.1 post-pass addendum
**Phase type:** engineering
**Mode:** autonomous; no human feedback required unless the repository cannot be read or verification cannot be run

## User Request

After v1.1 passed with two consecutive clean review rounds, run one additional review with stricter expectations:

- more detailed review notes
- more review dimensions
- stricter audit thresholds
- richer scenario tests

## Scope

Review the current `ljx-GSD` repository as a whole, not only the Phase 18 fix diff.

Included surfaces:

- runtime helpers under `bin/lib/`
- installer/build entrypoints under `bin/`
- generated Codex preview output from `node bin/install.js --preview`
- generated and preserved skill contract text
- per-skill prompt quality and upstream task-planning fidelity
- tests under `tests/`
- `.planning` roadmap/state/phase records
- v1.1 review docs and bug ledger
- upstream GSD and Auto/ARIS parity notes from Phase 15
- scenario matrix coverage for GSD engineering, Auto research, review/fix/verify, migration, workstreams, pause/resume, autonomous/safe policies, and paper/rebuttal flows

## Review Interpretation

This is not a new feature phase. It is a stricter audit pass over the current implementation and documentation, intended to catch defects the prior bounded review loop might have missed.

For this phase:

- confirmed P0/P1/P2 issues must be fixed or explicitly converted into out-of-scope debt with technical justification
- P3 issues can remain if recorded as residual maintainability or documentation risk
- scenario probes may be static, fixture-driven, or helper-driven; external API/GPU/literature calls are not required and should stop at confirmation boundaries
- prompt-quality review must check whether concrete `ljx-GSD-*` skills still instruct the agent to do the substantive GSD/Auto work, not only call helper preflights and write placeholder artifacts
- subagent findings are candidates until locally second-pass confirmed against code, tests, and docs

## Success Criteria

- strict scenario matrix is expanded beyond the original S01-S15 baseline
- at least three independent review lanes are used
- dynamic probes cover install/build, lifecycle state, config alias policy, migration/admin, workstreams, pause/resume, generated skill contracts, and representative research helper contracts
- representative generated skill prompts are compared against upstream GSD/Auto source prompts for task depth, planning discipline, evidence boundaries, review loops, and stage-specific output quality
- full test suite and preview install pass after any edits
- Phase 20 summary and strict review report record findings, confirmations, fixes if any, and residual risks
