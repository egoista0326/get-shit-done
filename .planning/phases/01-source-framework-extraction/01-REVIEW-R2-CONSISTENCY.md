# 01-REVIEW-R2-CONSISTENCY

**Status:** R2 complete; accepted fixes applied locally.
**Round:** Cross-framework consistency and minimal-interference fit.
**Evidence model:** Six read-only subagent reviewers inspected corrected Phase 01 artifacts and cited sources only where needed. Main agent aggregated findings and did not substitute review lanes.

## Reviewer Verdicts

| Lane | Reviewer | Verdict | Summary |
|---|---|---|---|
| GSD-first lifecycle consistency | Pauli | PASS | Corrected artifacts keep upstream GSD as primary control plane. |
| No `phase_type` / no typed routing | Sagan | PASS | Mentions are historical/banned; no implementation direction found. |
| Auto/ARIS capability preservation | McClintock | NEEDS_FIXES | `auto-review-loop` stop predicate remains ambiguous. |
| ljx-GSD reuse/discard consistency | Gibbs | NEEDS_FIXES | `ljx-bridge-contract.cjs` and bridge-aware helpers remain too close to reuse. |
| State/config/git/hook integration | Heisenberg | PASS | No concrete multi-writer, hidden control state, hook drift, or false-completion contradiction found. |
| Upgrade boundary/minimal-modification fit | Beauvoir | NEEDS_FIXES | Research artifact roots are too deferred; experiment/claim command family is underprotected. |

## Accepted Findings

### R2-001: Research artifact root model is under-specified

**Severity:** High
**Artifacts affected:** `01-FRAMEWORK-SYNTHESIS-DRAFT.md`, `01-AUTO-FRAMEWORK.md`, `01-AUTO-ARTIFACT-CONTRACTS.md`

The framework says research commands use explicit contracts and ordinary phases, but leaves the authoritative write target as a later decision. This creates ambiguity for standalone commands and risks root Auto artifacts becoming a second control plane.

### R2-002: Experiment/claim command family is underprotected

**Severity:** Medium
**Artifacts affected:** `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`

The checklist names some experiment/claim invariants but does not explicitly preserve the full command chain: `experiment-plan`, `experiment-bridge`, `run-experiment`, `monitor-experiment`, `analyze-results`, `experiment-audit`, `auto-review-loop`, `result-to-claim`, `ablation-planner`, and `training-check`.

### R2-003: Auto review-loop stop predicate is still ambiguous

**Severity:** High
**Artifacts affected:** `01-AUTO-PARAMETER-MAP.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`

The artifacts preserve an upstream inconsistency instead of choosing a deterministic v2.0 gate. For minimal-interference and safety, v2.0 should use the stricter runtime-style predicate: stop only when both the score meets `POSITIVE_THRESHOLD` and the reviewer verdict is positive/accept/pass.

### R2-004: `ljx-bridge-contract.cjs` is too bridge-specific for strong reuse

**Severity:** High
**Artifacts affected:** `01-LJX-REUSE-OR-DISCARD-MATRIX.md`

The module emits `ljx-GSD-*` commands and post-fix bridge recommendations. The reusable idea is only neutral key-file extraction; the current module must not be copied as a policy module.

### R2-005: Bridge-aware lifecycle/state helpers need stricter quarantine wording

**Severity:** Medium
**Artifacts affected:** `01-LJX-REUSE-OR-DISCARD-MATRIX.md`

`ljx-lifecycle-shell-tools.cjs` and `ljx-state-tools.cjs` can leak `ljx-*`, `primaryCommand`, and `bridge-ready` semantics unless the reuse matrix explicitly prohibits those surfaces.

## R2 Outcome

R2 found no new typed-phase reintroduction and no GSD-first lifecycle conflict. Accepted fixes were reflected in the Phase 01 framework artifacts and local verification passed. R3 may proceed, but Phase 01 is not complete.
