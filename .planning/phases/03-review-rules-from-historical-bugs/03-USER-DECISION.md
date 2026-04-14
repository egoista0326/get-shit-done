# Phase 03 User Decision

## Decision

The user approved Phase 03 review rules and stop gates for Phase 05, with one controlling principle:

GSD must remain the complete underlying framework. Auto/ARIS is only a prompt/orchestration overlay that calls into GSD by compiling research prompts, parameters, artifact contracts, and gate semantics into ordinary GSD phases, plans, context, artifacts, and verification flow.

## Accepted Boundaries

- GSD remains the only lifecycle/control-plane owner.
- GSD owns roadmap mutation, phase insertion, plan decomposition, execution, review, verify/UAT, progress, next, pause/resume, workstream/workspace, git behavior, completion, state, and canonical docs.
- Auto/ARIS preserves its research prompt obligations, review expectations, and evidence semantics only as prompt packs and compiler inputs.
- Auto/ARIS must not add an authoritative lifecycle, phase schema, root control state, docs hierarchy, artifact root, or file system that competes with GSD.
- Research commands may create phase-local research artifacts under GSD ownership, but root Auto-style artifacts are mirrors/import/export surfaces until adopted through GSD rules.

## Resolved 03-02 Discussion Items

- P2+ findings block clean rounds by default. A P2 can avoid resetting the clean streak only if it is explicitly downgraded, rejected, or accepted as advisory before the round result is counted.
- SDK remains covered by the artifacts/hooks/install lane as a cross-cutting compatibility boundary. Phase 05 adds a dedicated SDK lane only if SDK/headless behavior materially changes lifecycle, gate, or completion semantics.
- Scenario readiness does not block Phase 05 static framework clean rounds if every hard gate has planned scenario coverage. Full scenario execution remains a Phase 09/release readiness blocker.
- `danger-auto` hard-gate principles are fixed now. Phase 05 may refine wording or subcategories without resetting the clean streak, but weakening any hard gate resets clean-round accounting.

## Phase 05 Handoff

Phase 05 reviewers must treat Auto/ARIS as an overlay, not as a second framework. Any finding that shows Auto/ARIS owning lifecycle state, docs hierarchy, phase routing, roadmap mutation, completion, or canonical evidence paths should cite R-01, R-02, R-04, R-12, or R-13 and block clean completion.

Phase 05 may review prompt fidelity deeply, but the pass condition is not "Auto Research files are preserved." The pass condition is "Auto Research obligations are represented as GSD-owned prompt packs, phase-local artifacts, evidence gates, and review/verification requirements."

## Open Concerns

- Scenario execution is deferred to Phase 09/release readiness.
- External side effects remain high risk until scenario tests cover credentials, budget, cleanup, logs, and retained raw evidence.
- SDK/headless behavior remains a compatibility surface and can become a dedicated review lane if Phase 05 finds material divergence.

