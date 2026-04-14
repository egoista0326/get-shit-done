# 01-CROSS-FRAMEWORK-GAP-MAP

**Status:** final Phase 01 gap map for Phase 02 and later phases.
**Evidence boundary:** Derived from Phase 01 final synthesis, source index, R1/R2/R3 review artifacts, and accepted fixes.

## Closed In Phase 01

| Gap | Resolution |
|---|---|
| v1.4 status ambiguity | v1.4 recorded as `pivoted_not_shipped`, not shipped/completed. |
| Phase numbering drift | v2.0 active roadmap resets to Phase 01. |
| Typed research phase direction | `phase_type`, typed routing, and broad phase schema changes are banned. |
| Missing delayed build lane | Auto/ARIS paper/rebuttal/tooling lane ran in a later subagent batch. |
| Source-index root ambiguity | `01-GSD-SOURCE-INDEX.md` defines explicit root tokens and path convention. |
| SDK/package/test underindexing | Package manifests, SDK package boundary, tests, and prompt templates are indexed. |
| Auto parameter errors | `sources`, `difficulty`, `research-pipeline`, paper-review/camera-ready, and stop predicate wording corrected. |
| Research artifact root ambiguity | Authoritative research writes are phase-local under `.planning/phases/<phase>/research/`. |
| ljx helper reuse overreach | Bridge-specific helpers and `ljx-*`/`bridge-ready` semantics are quarantined. |
| False-completion vectors | File presence, summaries, plan counts, roadmap checkboxes, `progress`, and `next` are advisory/cross-check only. |
| Single-writer ambiguity | Canonical lifecycle state requires one owner and lock/atomic-write path. |

## Phase 02 Design Gaps

| Gap | Why it matters | Required Phase 02 output |
|---|---|---|
| Upstream baseline version | Reference checkout is `1.35.0`; installed runtime is `1.34.2`. | Baseline decision and diff policy. |
| SDK inclusion | SDK has package/API/CLI/prompts/tests beyond a thin wrapper. | Include/adapt/defer decision with boundaries. |
| Research command surface | Auto/ARIS has many skills and wrappers; v2.0 needs a coherent `gsd` command set. | Command surface table with inputs, outputs, owner, evidence gates, and deferrals. |
| Research artifact sublayout | Phase-local root is chosen, but exact subdirectories and naming need design. | Artifact contract map under `.planning/phases/<phase>/research/`. |
| Import/export mirrors | Root Auto artifacts are non-authoritative, but some import/export support may be useful. | Mirror/adoption policy per artifact family. |
| Audit category defaults | Audit failures block claim/paper readiness by default, but categories need severity. | Blocking versus downgrade-only audit matrix. |
| Reviewer provider policy | Default/fallback is pinned, but provider setup and provenance format need design. | Reviewer backend config schema and provenance artifact format. |
| External-service policy | Default service classes are defined, but command-level bindings need design. | Per-command service policy table and scenario tests. |
| Paper-review scope | No standalone upstream `paper-review` command was found. | Explicit deferral or new command contract. |

## Phase 03 Review-Rule Inputs

- Review artifact schema/parser drift must become a review rule family.
- Research chain handoff must be reviewed separately from claim/audit gating.
- False-completion checks must reject file-presence-only evidence.
- Context helper output must not count as execution evidence.
- Backfilled summaries are historical accounting only.
- Hook/adapter conformance needs its own checks.
- Review matrix must be frozen before implementation review rounds count as clean.

## Phase 05-10 Implementation Risks To Carry Forward

- Dirty current repo means implementation must start in a clean copy/worktree.
- Current ljx-GSD code can only be reused after explicit quarantine review.
- Installer/hook/config behavior must be tested as package/runtime compatibility, not inferred from docs.
- External service calls require explicit policy and scenario coverage.
- Phase-local research artifacts must not become a second untracked state engine.
