# Phase 02 Proposal Round 2

**Status:** In progress
**Purpose:** Cross-read and revise the round-1 target-framework proposals before main-agent synthesis.
**Source contract:** `.planning/phases/02-target-gsd-framework-design-rounds/02-02-PLAN.md`
**Started:** 2026-04-14T00:00:38+02:00

## Readiness

Round 2 may proceed because all required round-1 inputs exist:

| Required Input | Status | Role |
| --- | --- | --- |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-01-SUMMARY.md` | present | Execution summary and verification record for round 1. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-ROUND-1.md` | present | Round-1 comparison, agreements, disagreements, unresolved questions, rejected directions, and Round 2 inputs. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-GSD-FIRST.md` | present | Strict GSD-first lifecycle proposal. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RESEARCH-COMPILER.md` | present | Research Command Compiler proposal. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-MINIMAL-ADAPTER.md` | present | Minimal adapter implementation-boundary proposal. |
| `.planning/phases/02-target-gsd-framework-design-rounds/02-PROPOSAL-RISK-REGISTER.md` | present | Adversarial risk register and blocker criteria. |

No blocker is present at readiness check time.

## Cross-Read Worker Lanes

| Lane | Output File | Required Revision Focus |
| --- | --- | --- |
| Revised GSD-first | `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-GSD-FIRST.md` | Revise strict GSD-first stance after accepting/rejecting compiler, adapter, and risk-register arguments. |
| Revised Research Compiler | `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-RESEARCH-COMPILER.md` | Convert the public compiler architecture into a synthesis-ready design that imports minimal-adapter and risk constraints. |
| Revised Minimal Adapter | `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-MINIMAL-ADAPTER.md` | Convert the minimal helper surface into a concrete implementation slice under the compiler architecture. |

## Worker Requirements

Each worker must:

- Read all four round-1 proposals and `02-PROPOSAL-ROUND-1.md`.
- Explicitly name all four round-1 proposal files in a source/evidence section.
- Include sections named `Accepted From Other Lanes`, `Rejected From Other Lanes`, `Remaining Disagreements`, and `Synthesis Recommendations`.
- Preserve the no-`phase_type`, no typed routing, no broad schema expansion, and no second-control-plane constraint.
- Address `safe`, `auto`, and `danger-auto`, including deep defaults, missing authorization, side-effect audit artifacts, and clean/degraded/provisional/overridden status.
- Distinguish final framework decisions, implementation-boundary recommendations, and deferred details.
- Write only its assigned output file.

## Round 2 Narrowing Target

The cross-read revision should assume this narrowed target unless a worker gives evidence-based reasons to alter it:

1. Public architecture: Research Command Compiler under GSD-first lifecycle ownership.
2. Implementation stance: minimal adapter surface first, not GSD core rewrite.
3. Required companion specs: no-phase-type proof, completion semantics, config/preset spec, side-effect policy, artifact/index contract, and upgrade/SDK boundary.
4. Required risk blockers: danger-auto audit/status taint, missing authorization behavior, root artifact adoption, package/source latest reconciliation, SDK boundary, subagent write ownership, and false-completion negative cases.
5. Required deferrals: paper/rebuttal/slides/poster/camera-ready packs, broad execution side-effect wrappers until scenario tests exist, and ljx-GSD helper reuse until quarantine review.

## Pending Outputs

- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-GSD-FIRST.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-RESEARCH-COMPILER.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-MINIMAL-ADAPTER.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONSENSUS-GAPS.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-02-SUMMARY.md`

## Round 2 Outcome

The three revised proposal lanes completed and converged on a synthesis candidate:

```text
Research Command Compiler under GSD lifecycle ownership
```

### Revised Proposal Outputs

- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-GSD-FIRST.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-RESEARCH-COMPILER.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-REVISED-MINIMAL-ADAPTER.md`

### Consensus Artifact

- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONSENSUS-GAPS.md`

### Outcome Summary

- Public architecture: Research Command Compiler under GSD-first lifecycle ownership.
- Implementation stance: minimal adapter surface first.
- Stable invariants: no `phase_type`, no typed routing, no broad phase schema expansion, no second control plane, no research-owned canonical state writes.
- Stable evidence model: phase-local `research/` root, required `RESEARCH_INDEX.md`, raw evidence plus review/verify/UAT gates, advisory-only summaries/checklists/file presence.
- Stable preset model: `safe`, `auto`, `danger-auto`; default `safe`; all deep by default; `danger-auto` requires audit artifacts and cannot falsely report clean completion.
- Remaining decisions: first-pass command table, `RESEARCH_INDEX` sidecar, `auto` preauthorization storage, side-effect vocabulary, gate taxonomy, SDK boundary, upstream baseline reconciliation, unknown config key policy, root artifact adoption field names, and execution-heavy command timing.

Round 2 does not mark Phase 02 complete. It provides the input for `02-03` main-agent synthesis and user review.
