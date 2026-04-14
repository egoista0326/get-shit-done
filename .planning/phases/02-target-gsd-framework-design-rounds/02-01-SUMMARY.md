---
phase: 02-target-gsd-framework-design-rounds
plan: 01
subsystem: architecture
tags: [research, gsd, compiler, proposals, phase-02]
requires:
  - phase: 01-source-framework-extraction
    provides: Source-indexed framework artifacts for upstream GSD, Auto/ARIS, and ljx-GSD history
provides:
  - Independent target-framework proposal round
  - GSD-first lifecycle proposal
  - Research Command Compiler proposal
  - Minimal adapter proposal
  - Adversarial risk register
  - Round 1 comparison and Round 2 inputs
affects: [phase-02, phase-03, research-command-framework]
tech-stack:
  added: []
  patterns:
    - Research Command Compiler under GSD lifecycle ownership
    - Minimal adapter surface for future implementation
    - Evidence-based completion semantics for research commands
key-files:
  created:
    - .planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-GSD-FIRST.md
    - .planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RESEARCH-COMPILER.md
    - .planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-MINIMAL-ADAPTER.md
    - .planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RISK-REGISTER.md
  modified:
    - .planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md
key-decisions:
  - Research Command Compiler is the controlling architecture for Round 2 revision.
  - GSD remains the lifecycle/control-plane owner; research commands do not own canonical state writes.
  - Round 2 should merge compiler architecture with minimal adapter implementation discipline.
  - danger-auto requires audit artifacts, status taint, and honest degraded/provisional/overridden completion.
patterns-established:
  - Proposal lanes write scoped artifacts only; main agent owns comparison and canonical state updates.
  - Round reports distinguish agreement, disagreement, unresolved questions, rejected directions, and next-round inputs.
requirements-addressed: [ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05, ARCH-06, ARCH-07]
requirements-completed: []
duration: 7min
completed: 2026-04-13T23:56:01+02:00
---

# Phase 02-01 Summary: Independent Target-Framework Proposal Round

**Four independent proposal lanes converged on Research Command Compiler under GSD-first lifecycle ownership, with minimal-adapter implementation boundaries and explicit danger-auto/false-completion risk controls.**

## Performance

- **Duration:** 7 min execution window for the proposal round after plan creation
- **Started:** 2026-04-13T23:49:00+02:00
- **Completed:** 2026-04-13T23:56:01+02:00
- **Tasks:** 3
- **Files created:** 4 proposal files
- **Files modified:** 1 round report
- **Subagent lanes:** 4 independent workers

## Accomplishments

- Created the round-1 coordination contract with proposal lanes, write ownership, comparison axes, required source reads, and output shape.
- Ran four independent proposal workers for GSD-first lifecycle, Research Command Compiler, Minimal Adapter, and Adversarial Risk Register perspectives.
- Appended the round-1 comparison covering agreement points, disagreements, unresolved questions, rejected directions, ARCH coverage, and Round 2 inputs.
- Preserved Phase 02's hard constraints: no `phase_type`, no typed routing, no broad phase schema expansion, no second control plane, and no canonical state writes by research commands.

## Files Created/Modified

- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md` - Round contract and comparison report.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-GSD-FIRST.md` - Strict GSD-first lifecycle proposal.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RESEARCH-COMPILER.md` - Research Command Compiler proposal.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-MINIMAL-ADAPTER.md` - Minimal adapter implementation-boundary proposal.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RISK-REGISTER.md` - Adversarial risk register and blocker criteria.

## Decisions Made

- Round 1 does not declare the final target framework; it narrows the design space for cross-read revision.
- The strongest shared architecture is Research Command Compiler plus GSD-first lifecycle ownership.
- The strongest implementation stance is minimal adapter first: command wrappers, research config loader, prompt-pack indexer, phase insertion request helper, artifact indexer, evidence checker, danger-auto audit writer, and side-effect handoff.
- `safe`, `auto`, and `danger-auto` all default to deep review/research. `safe` is default; `auto` is not shallow; `danger-auto` is maximum authorized automation with maximum audit burden.
- Completion semantics must reject summaries, checkboxes, file presence, plan counts, `progress`, `next`, context helpers, caches, root Auto files, W&B links, PR links, and bridge-ready output as sufficient evidence.

## Deviations From Plan

None. The plan called for four independent proposal lanes and a main-agent comparison report. The workers wrote only their assigned proposal files, and the main agent wrote the round report and summary.

## Issues Encountered

- `verify references` on `02-01-PLAN.md` produced expected false positives because it treats planned output files and backticked verification command paths as missing references before execution.
- The risk is documented in the working notes but does not block execution because `verify plan-structure`, file existence checks, proposal coverage greps, and `git diff --check` passed.

## Verification

- `node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" verify plan-structure .planning/phases/02-target-gsd-framework-design-rounds/02-01-PLAN.md --cwd "$PWD"` reported `valid: true`.
- All four proposal files exist.
- `02-PROPOSAL-ROUND-1.md` contains `Agreement Points`, `Disagreements`, `Unresolved Questions`, `Rejected Directions`, `ARCH-01`, `ARCH-07`, and `Round 2 Inputs`.
- Proposal coverage grep found `Research Command Compiler`, `phase_type`, `danger-auto`, `.planning/research.config.json`, and completion semantics coverage.
- `git diff --check -- .planning/phases/02-target-gsd-framework-design-rounds` passed.

## Next Phase Readiness

`02-02` can start. Its cross-read workers should treat the following as the narrowed Round 2 target:

- Public architecture: Research Command Compiler under GSD-first lifecycle ownership.
- Implementation stance: minimal adapter surface first, not GSD core rewrite.
- Required risk blockers: danger-auto audit/status taint, missing authorization behavior, root artifact adoption, package/source latest reconciliation, SDK boundary, subagent write ownership, and false-completion negative cases.
- Required deferrals: paper/rebuttal/slides/poster/camera-ready packs, broad execution side-effect wrappers until scenario tests exist, and ljx-GSD helper reuse until quarantine review.

## User Setup Required

None.

---
*Phase: 02-target-gsd-framework-design-rounds*
*Completed: 2026-04-13T23:56:01+02:00*
