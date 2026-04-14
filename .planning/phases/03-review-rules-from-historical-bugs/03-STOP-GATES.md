# Phase 03 Stop Gates For Framework Review

## Purpose

These stop gates define how Phase 05 decides whether the target framework review can continue, must block, or can count a clean round.

They are drafted from:

- `03-HISTORICAL-BUG-RULE-MAP.md`
- `03-REVIEW-RULES.md`
- `03-REVIEW-MATRIX.md`
- Phase 02 target framework documents

This file is not final until the user accepts it in `03-02`.

## Hard Blockers

The following findings block Phase 05 clean rounds and cannot be overridden for clean completion:

| Gate | Blocks when | Related rules |
|---|---|---|
| No second control plane | Framework introduces `phase_type`, typed routing, broad phase schema expansion, root Auto control state, or a second lifecycle owner. | R-02, R-13 |
| GSD lifecycle ownership | Research compiler/helper/index owns roadmap mutation, canonical lifecycle state, progress, next, review, verify, or completion. | R-01, R-08 |
| Auto prompt-overlay boundary | Auto/ARIS introduces its own framework, lifecycle, docs hierarchy, control artifacts, or file/state system as authoritative instead of compiling prompt packs into GSD-owned phases/plans. | R-01, R-02, R-04, R-12, R-13 |
| Evidence-first completion | Clean completion can be inferred from summaries, checkboxes, file presence, skeletons, plan counts, `progress`, `next`, PR links, W&B URLs, bridge-ready reports, caches, or backfills. | R-03 |
| Research execution evidence | `idea-discovery`, literature, experiment, result-to-claim, claim gate, or paper readiness can complete without required raw evidence. | R-04, R-05 |
| Claim/audit lineage | Supported claims or downstream paper/rebuttal readiness can proceed with missing, stale, root-only, or unresolved audit evidence. | R-05 |
| Config precedence | `safe`, `auto`, `danger-auto`, checkpoints, reviewer fallback, stop predicates, rerun policy, or external-service policy have conflicting precedence. | R-06 |
| Danger-auto audit | `danger-auto` can use side effects or override gates without run log, authorization actions, override log, side-effect log, and taint propagation. | R-07 |
| State write ownership | Canonical state writes can happen in parallel without owner, lock/atomic-write path, or derived mirror boundary. | R-08 |
| Artifact/path safety | Required evidence can be a directory, symlink, stale path, sibling-prefix path, or unproven root artifact. | R-09 |
| Review parser/accounting | Review artifacts cannot be parsed into deterministic blocker/advisory counts before clean-round accounting. | R-10 |
| Prompt fidelity | Claimed GSD or Auto/ARIS capability drops mandatory upstream task obligations without deferral. | R-12 |
| Release boundary | Framework claims release readiness while source/package/install/hook/SDK baseline or scenario-test blockers remain unresolved. | R-11, R-13, R-15 |

## Advisory Findings

Advisory findings do not block clean rounds when they are explicitly marked P3 and do not hide a hard gate.

Examples:

- Wording clarity that does not change lifecycle ownership.
- Additional examples for an already enforceable rule.
- Future SDK exposure notes that do not affect current framework behavior.
- Scenario ideas beyond the hard gates already planned for Phase 09.

Advisory findings must still be recorded. They must not be used to bypass P0/P1/P2 gaps.

## Clean Round Counting

A Phase 05 review round counts as clean only if all conditions hold:

- Review matrix was frozen before the round started.
- Parser/accounting rules were frozen before the round started.
- Every required review lane ran or was explicitly marked not applicable with rationale.
- No accepted P0/P1/P2 findings remain.
- No hard blocker is downgraded without explicit user decision.
- Any framework change from a previous round was re-reviewed by affected lanes.
- Review artifacts include deterministic finding ids, severity, rule id, evidence, status, required change, and verification requirement.
- `danger-auto` did not override a gate, skip a required operation, or lose side-effect audit evidence for any clean-completion claim under review.

If Phase 05 changes the review matrix materially, the clean streak resets.

## Cap Behavior

Phase 05 has a bounded review loop.

- It may exit early after two consecutive clean rounds.
- It must stop after 15 rounds if the two-clean-round condition is not met.
- If it stops at the cap, the result must be reported as capped, not clean.
- Fixing an accepted P0/P1/P2 finding resets the clean streak to zero unless the finding was explicitly reclassified as advisory before the round result was counted.

## Accepted Finding Fix Requirements

An accepted finding is not fixed until:

- The affected framework/spec document is updated.
- The update directly addresses the cited rule.
- The verification command or grep/check listed by the reviewer passes.
- The affected review lane re-checks the changed surface.
- Summary/state/roadmap updates do not claim clean status before re-check.

## Danger-Auto Override Policy

`danger-auto` may automate decisions and use authorized capabilities only under the Phase 02 completion semantics.

For Phase 05 review:

- Missing authorization is a blocker for any required side effect.
- Unknown side-effect status is a blocker.
- Skipped required side effects block clean completion.
- Overridden research-quality gates taint downstream outputs.
- Hard non-overridable gates cannot be overridden for clean completion.
- Broad capability language must be paired with phase-local audit artifacts.

## Early Exit Conditions

Phase 05 may proceed to final framework handoff only after:

- Two consecutive clean rounds under the same stable matrix and parser/accounting rules.
- No accepted P0/P1/P2 findings remain.
- Advisory findings are recorded and do not mask hard gates.
- Phase 05 final report states which rules were applied and which scenario tests remain for Phase 09/release readiness.

## Accepted User Decisions

The user accepted the stop-gate policy in `03-02` with these locked decisions:

- GSD remains fully preserved as the framework, lifecycle, state, docs, artifact, review, verify, roadmap, and phase/plan system.
- Auto/ARIS is only a prompt/orchestration overlay. It may keep its prompt obligations and research semantics, but it must compile them into GSD-owned phases, plans, context, artifacts, and gates.
- Auto/ARIS must not introduce its own authoritative framework, docs hierarchy, lifecycle state, phase schema, roadmap owner, or file system as the new control plane.
- P2+ findings reset clean-round accounting by default unless they are explicitly downgraded, rejected, or accepted as advisory before the round result is counted.
- SDK remains inside artifacts/hooks/install review as a cross-cutting compatibility surface. A dedicated SDK lane is added only if Phase 05 finds SDK/headless behavior materially changes lifecycle, gate, or completion semantics.
- Scenario readiness does not block Phase 05 static clean rounds when every hard gate has a planned scenario mapping. Full scenario execution blocks Phase 09/release readiness.
- `danger-auto` hard-gate principles are fixed now. Phase 05 may refine subcategories or wording without resetting the clean streak, but weakening a hard gate resets clean-round accounting.
