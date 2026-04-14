# Phase 03 Context: Review Rules From Historical Bugs

## Purpose

Phase 03 turns historical ljx-GSD failures into explicit review rules before Phase 05 reviews the target framework.

This phase is deliberately separate from Phase 05. Phase 03 defines the review rubric, evidence requirements, stop gates, and clean-round accounting. Phase 05 later applies those rules to the Phase 02 target framework.

## Phase Inputs

Primary current-framework inputs:

- `.planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-NO-PHASE-TYPE-COMPATIBILITY.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-COMPLETION-SEMANTICS.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-CONFIG-PRESET-SPEC.md`
- `.planning/phases/02-target-gsd-framework-design-rounds/02-UPGRADE-BOUNDARIES.md`

Primary historical synthesis inputs:

- `.planning/phases/01-source-framework-extraction/01-LJX-HISTORY-FAILURE-TAXONOMY.md`
- `.planning/phases/01-source-framework-extraction/01-REVIEW-R3-HISTORICAL-REGRESSION.md`
- `.planning/phases/01-source-framework-extraction/01-CROSS-FRAMEWORK-GAP-MAP.md`
- `.planning/phases/01-source-framework-extraction/01-FRAMEWORK-SYNTHESIS.md`

Primary raw historical inputs:

- `.planning/review/v1.1/BUG-LEDGER.md`
- `.planning/review/v1.2/BUG-LEDGER.md`
- `.planning/review/v1.3/BUG-LEDGER.md`
- `.planning/review/v1.4/BUG-LEDGER.md`
- `.planning/review/v1.1/SCENARIO-MATRIX.md`
- `.planning/review/v1.1/STRICT-SCENARIO-MATRIX.md`
- `.planning/milestones/v1.4-PIVOT-SNAPSHOT-2026-04-13.md`
- `.planning/milestones/v1.4-pivoted_not_shipped-ARCHIVE-MANIFEST.md`

If a listed raw historical file is absent, Phase 03 must use the Phase 01 source-indexed synthesis and record the absence as a traceability limitation.

## Required Outputs

Plan `03-01` produces:

- `03-HISTORICAL-BUG-RULE-MAP.md`
- `03-REVIEW-RULES.md`
- `03-REVIEW-MATRIX.md`

Plan `03-02` produces, after user discussion:

- `03-STOP-GATES.md`
- `03-USER-DECISION.md`
- revised `03-REVIEW-RULES.md` and `03-REVIEW-MATRIX.md` if the user requests changes.

## Non-Goals

- Do not review or modify implementation code.
- Do not run the Phase 05 framework review loop.
- Do not change the Phase 02 target architecture except by recording explicit proposed revisions for later user decision.
- Do not treat historical bug counts alone as proof of a rule. Each rule must name the failure mechanism it prevents.
- Do not allow a clean review round to count until the review matrix and parser/accounting rules are stable.

## Phase 03 Working Decisions

- Review rules must be derived from historical failure families, not invented as generic best practices.
- Review dimensions must include GSD fidelity, Auto/ARIS capability preservation, historical-bug regression, self-containment, state/config/concurrency, git/hooks/artifacts, minimal modification, upgradeability, and context hygiene.
- False completion and evidence semantics are first-class review dimensions.
- `danger-auto` must be reviewed as an auditability and honest-completion problem, not just as a permission mode.
- Review artifact parseability is part of correctness because prior review loops drifted through malformed artifacts and inconsistent counts.
- Scenario review supplements static review but cannot replace it.

## User Checkpoint

Phase 03 has a blocking user checkpoint in `03-02`.

Before Phase 05 begins, the user must accept or revise:

- Review dimensions.
- Blocking versus advisory findings.
- Two-clean-round exit semantics.
- Hard non-overridable gates.
- `danger-auto` override/taint expectations.
- Which Phase 02 issues become review findings versus design-change requests.
