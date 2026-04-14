---
phase: 02-target-gsd-framework-design-rounds
plan: 03
subsystem: architecture
tags: [research, gsd, compiler, synthesis, phase-02]
requires:
  - phase: 02-target-gsd-framework-design-rounds
    provides: Round-2 revised proposal artifacts and consensus/gap report
provides:
  - Target GSD framework
  - No-phase-type compatibility proof
  - Research completion semantics
  - Research config and preset contract
  - Upgrade boundary and implementation feasibility assessment
affects: [phase-02, phase-03, phase-04, research-command-framework]
tech-stack:
  added: []
  patterns:
    - Research Command Compiler under GSD lifecycle ownership
    - Single-phase default for research commands with plan-level granularity
    - Separate research config compiled into ordinary GSD lifecycle inputs
    - Evidence-first completion semantics with danger-auto audit taint
key-files:
  created:
    - .planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md
    - .planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md
    - .planning/phases/02-target-gsd-framework-design-rounds/02-COMPLETION-SEMANTICS.md
    - .planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md
    - .planning/phases/02-target-gsd-framework-design-rounds/02-UPGRADE-BOUNDARIES.md
  modified: []
key-decisions:
  - Target architecture is Research Command Compiler under GSD lifecycle ownership.
  - Research commands compile Auto/ARIS prompt packs, config, artifact contracts, and gate semantics into ordinary GSD phase/context/plan inputs.
  - Default research command output is one inserted phase; plan/tasks handle fine-grained research decomposition.
  - Research-first pipeline roadmaps use ordinary integer phases rather than decimal insertion.
  - `.planning/research.config.json` is separate from `.planning/config.json`, with CLI > command config > preset > built-in defaults precedence.
  - Presets are `safe`, `auto`, and `danger-auto`; default is `safe`; all default to deep research and deep review.
  - `danger-auto` may use available authorized capabilities, but missing credentials, skipped required operations, unknown side effects, or gate overrides block clean completion.
  - No `phase_type`, typed routing, broad phase schema expansion, second state root, or second control plane is accepted.
patterns-established:
  - Phase-local `research/` directories own authoritative research outputs.
  - `RESEARCH_INDEX.md` is an evidence map and advisory check surface, not lifecycle state.
  - Completion requires raw evidence plus review/verify/UAT gates and explicit GSD lifecycle acceptance.
  - Upgrade boundaries classify implementation work as feasible-now, feasible-with-review, defer-until-scenario-tests, implementation-boundary, or release-blocker.
requirements-addressed: [ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05, ARCH-06, ARCH-07]
requirements-completed: [ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05, ARCH-06, ARCH-07]
duration: 11min
completed: 2026-04-14T00:19:10+02:00
---

# Phase 02-03 Summary: Target Framework Synthesis

**The synthesized target framework is `Research Command Compiler under GSD lifecycle ownership`: Auto/ARIS capabilities become standalone `gsd` commands, but GSD remains the only lifecycle owner for roadmap mutation, planning, execution, review, verification, state, and completion.**

## Performance

- **Duration:** 11 min synthesis and review-checkpoint window
- **Started:** 2026-04-14T00:08:00+02:00
- **Completed:** 2026-04-14T00:19:10+02:00
- **Tasks:** 3
- **Files created:** 5 framework/spec files plus this summary
- **Files modified:** 0 before checkpoint approval
- **User checkpoint:** Approved in chat with an explicit continue signal.

## Accomplishments

- Synthesized the Phase 02 target architecture from the round-1 proposals, round-2 revisions, and consensus/gap report.
- Defined the Research Command Compiler as a compile-time/input-generation layer that injects research prompt packs, config, artifact contracts, and gate semantics into ordinary GSD phases and plans.
- Preserved GSD as the lifecycle/control-plane owner and explicitly rejected `phase_type`, typed phase routing, broad phase schema expansion, a second state root, and a second control plane.
- Documented single-phase default behavior for research commands, decimal insertion after the current phase, and ordinary integer phases for research-first roadmap construction.
- Defined phase-local research artifacts under `.planning/phases/<phase>/research/`, with root Auto artifacts treated only as mirrors/import sources until adopted.
- Defined `safe`, `auto`, and `danger-auto` presets, with `safe` as default and deep research/review as the default depth for all presets.
- Defined evidence-first completion semantics that reject summaries, checkboxes, file presence, skeletons, plan counts, `progress`, `next`, PR links, W&B URLs, bridge-ready reports, and caches as sufficient completion evidence.
- Added an implementation feasibility assessment separating feasible core compiler work from scenario-test-gated external side effects and release-blocking package/install/hook baseline reconciliation.

## Files Created/Modified

- `.planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md` - Target architecture, command surface, runtime flow, state ownership, artifact model, presets, side effects, SDK boundary, and feasibility analysis.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md` - Proof that ordinary phases, plans, decimal insertion, and phase-local artifacts are sufficient without typed routing or schema expansion.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-COMPLETION-SEMANTICS.md` - Completion authority, evidence classes, advisory-only signals, side-effect statuses, and `danger-auto` no-false-clean rules.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md` - Separate research config contract, precedence, preserved/deferred parameters, preset semantics, unknown-key policy, and audit requirements.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-UPGRADE-BOUNDARIES.md` - Baseline policy, SDK boundary, ljx-GSD reuse quarantine, feasibility matrix, recommended implementation sequence, and release blockers.
- `.planning/phases/02-target-gsd-framework-design-rounds/02-03-SUMMARY.md` - This completion summary.

## Decisions Made

- The target framework is approved for Phase 03 review-rule derivation.
- Research command integration is a compiler/advisory layer over GSD, not a new lifecycle runtime.
- Minimal Adapter is the first implementation slice: command wrappers, research config loader, prompt-pack registry, phase request renderer, artifact index helper, evidence checker, danger-auto audit writer, side-effect handoff, and root artifact adoption helper.
- Single inserted research phase is the default because plan-level decomposition preserves continuity between literature, ideas, experiment methods, metrics, evidence, and claims better than many micro-phases.
- Multiple phases remain allowed when there is a genuine work-mode boundary, such as remote/GPU execution, raw evidence collection, independent audit, result-to-claim gating, or implementation handoff.
- Paper/rebuttal/slides/poster/camera-ready packs are deferred from the default v2.0 research command slice.
- Remote/GPU/W&B/SSH/Modal/Vast and other external side-effect integrations are deferred until scenario tests cover credentials, payment, cleanup, and raw evidence retention.

## Implementation Feasibility

- **High feasibility:** Core compiler architecture, command wrappers, separate research config loading, prompt-pack registry, phase-local research root, and `RESEARCH_INDEX.md`.
- **Medium feasibility:** Phase request rendering, preset/gate precedence, evidence checker, and danger-auto audit/taint behavior because they need scenario tests and review.
- **High-risk until tested:** External paid/remote side effects, including GitHub push/PR, W&B, SSH, Modal/Vast/GPU, cleanup, and retained evidence.
- **Release blockers:** Upstream source/package/install/hook baseline reconciliation, SDK compatibility decision, package tests, and no-false-completion negative scenarios.

## Deviations From Plan

None. The plan required synthesis documents, a blocking user review checkpoint, and summary creation only after approval. The user approved the framework before this summary was written.

## Issues Encountered

- Phase 01 recorded a source/package mismatch: local source `1.35.0` versus installed/npm `1.34.2`. This does not block the framework, but it is recorded as a Phase 05/06 implementation and release-readiness blocker.
- Full research parity remains intentionally deferred for paper/rebuttal and external execution-heavy command families.

## Verification

- `node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" verify plan-structure .planning/phases/02-target-gsd-framework-design-rounds/02-03-PLAN.md --cwd "$PWD"` reported `valid: true`.
- Required target-framework coverage was found for `Research Command Compiler`, `single-phase default`, `decimal insertion`, `research-first roadmap`, `state ownership`, `git`, `hooks`, `SDK`, `paper`, `rebuttal`, and `Non-Goals`.
- Required companion-spec coverage was found for `phase_type`, `typed routing`, `second state root`, `clean completion`, `degraded`, `danger-auto`, `research.config.json`, `safe`, `auto`, `latest upstream`, and `SDK`.
- All five 02-03 output files existed before approval.
- `git diff --check -- .planning/phases/02-target-gsd-framework-design-rounds` passed.

## Next Phase Readiness

Phase 03 can start. It should derive framework review rules from historical bug ledgers, failed scenario reviews, and user-observed failures before Phase 04 begins reviewing the target framework.

The Phase 03 rule set should explicitly test:

- Whether target framework review catches accidental `phase_type` or typed routing reintroduction.
- Whether completion semantics reject summaries/checklists/file presence without raw evidence.
- Whether `danger-auto` remains auditable and unable to claim clean completion after skipped or overridden gates.
- Whether implementation boundaries prevent ljx-GSD historical defects from being copied without quarantine.
- Whether SDK/package/install/hook compatibility remains visible before implementation and release.

## User Setup Required

None.

---
*Phase: 02-target-gsd-framework-design-rounds*
*Completed: 2026-04-14T00:19:10+02:00*
