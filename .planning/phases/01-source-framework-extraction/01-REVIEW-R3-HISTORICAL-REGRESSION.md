# 01-REVIEW-R3-HISTORICAL-REGRESSION

**Status:** R3 complete; accepted fixes applied locally.
**Round:** Historical-bug regression and context hygiene.
**Evidence model:** Six read-only subagent reviewers inspected corrected Phase 01 artifacts, R1/R2 outputs, phase state, and sampled historical sources. Main agent aggregated findings and did not substitute review lanes.

## Reviewer Verdicts

| Lane | Reviewer | Verdict | Summary |
|---|---|---|---|
| Historical bug taxonomy | Dirac | NEEDS_FIXES | Add review-artifact parser drift family and split research lifecycle failures into concrete review families. |
| User-observed failure mapping | Russell | NEEDS_FIXES | Require literature-execution evidence for `idea-discovery`; define canonical autoProceed/checkpoint precedence. |
| False-completion/evidence semantics | Chandrasekhar | NEEDS_FIXES | File presence, roadmap checkboxes, and summaries must not become completion proof. |
| Config/autoProceed/stop-boundary | Feynman | NEEDS_FIXES | Define canonical checkpoint precedence, reviewer backend default/fallback, and external-service policy matrix. |
| Concurrency/state mirror drift | Rawls | NEEDS_FIXES | State single-writer rule and mirror taxonomy need to be normative. |
| Context hygiene/subagent boundary | Cicero | NEEDS_FIXES | Context hygiene status label is stale; other process checks passed. |

## Accepted Findings

### R3-001: Review artifact schema/parser drift is missing from taxonomy

**Severity:** High
**Artifacts affected:** `01-LJX-HISTORY-FAILURE-TAXONOMY.md`

Historical ledgers show malformed review artifacts, incompatible finding identifiers, and finding-count drift. Phase 02 review rules need a dedicated parser/schema failure family.

### R3-002: Research lifecycle failure family is too coarse

**Severity:** Medium
**Artifacts affected:** `01-LJX-HISTORY-FAILURE-TAXONOMY.md`

Research failures need separate chain-handoff and claim/audit gating families so Phase 02 can review stage persistence, phase-local audit lineage, claim staleness, and paper hard-stops.

### R3-003: `idea-discovery` lacks mandatory literature-execution evidence contract

**Severity:** High
**Artifacts affected:** `01-AUTO-ARTIFACT-CONTRACTS.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-LJX-HISTORY-FAILURE-TAXONOMY.md`

The historical failure was context/state output without real literature execution. The framework must say context-only output is non-evidence and that literature retrieval/reading evidence is mandatory.

### R3-004: Canonical autoProceed/checkpoint precedence is missing

**Severity:** High
**Artifacts affected:** `01-AUTO-PARAMETER-MAP.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`, milestone docs

`AUTO_PROCEED`, `HUMAN_CHECKPOINT`, GSD checkpoints, loop stop predicates, and external-service confirmations need one precedence rule.

### R3-005: Reviewer backend default/fallback is not pinned

**Severity:** Medium
**Artifacts affected:** `01-AUTO-PARAMETER-MAP.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`

The framework needs a default/fallback policy before implementation to avoid review quality drift.

### R3-006: External-service policy matrix is missing

**Severity:** Medium
**Artifacts affected:** `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`, milestone docs

GPU spend, W&B, Vast, Modal, external reviewer APIs, and networked literature sources need default action, confirmation trigger, and override semantics.

### R3-007: Completion semantics still leave false-completion vectors

**Severity:** High
**Artifacts affected:** `01-CONTEXT-HYGIENE-LOG.md`, `01-GSD-FRAMEWORK.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`

Review artifacts must contain passing or accepted-fixed outcomes and evidence references, not merely exist. Roadmap checkboxes are advisory/legacy and cannot override disk/review/verification/UAT state. Summaries are cross-check artifacts only.

### R3-008: Single-writer and mirror taxonomy need normative wording

**Severity:** High
**Artifacts affected:** `01-GSD-FRAMEWORK.md`, `01-GSD-UPGRADE-BOUNDARIES.md`, `01-AUTO-ARTIFACT-CONTRACTS.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`

Canonical lifecycle state requires one writer per state family, lock/atomic-write enforcement, and clear separation between canonical state, derived mirrors, imported mirrors, and control-state caches.

### R3-009: Context hygiene status label is stale

**Severity:** Medium
**Artifacts affected:** `01-CONTEXT-HYGIENE-LOG.md`

The hygiene log must reflect current R3 status and then R3-fixed status after patches.

## R3 Outcome

R3 found no need for implementation edits. Accepted fixes were applied and local verification passed. The main-agent final check may proceed, but Phase 01 is not complete until that final check is written.
