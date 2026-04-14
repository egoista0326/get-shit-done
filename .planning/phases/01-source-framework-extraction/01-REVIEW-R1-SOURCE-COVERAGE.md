# 01-REVIEW-R1-SOURCE-COVERAGE

**Status:** R1 complete; accepted fixes applied locally.
**Round:** Source coverage and index completeness.
**Evidence model:** Six read-only subagent reviewers inspected Phase 01 artifacts against source roots. Main agent only aggregated their reports and did not substitute missing review lanes.

## Reviewer Verdicts

| Lane | Reviewer | Verdict | Summary |
|---|---|---|---|
| Upstream GSD source coverage | Carson | NEEDS_FIXES | Package/test surface and SDK package boundary were underindexed. |
| ljx-GSD implementation/history coverage | Hooke | NEEDS_FIXES | Reuse guidance conflicts around typed lifecycle helper; history taxonomy misses hook/adapter conformance; public surface count stale. |
| Auto/ARIS source coverage | Euler | NEEDS_FIXES | `sources`, `difficulty`, `research-pipeline`, and camera-ready/paper-review notes need correction. |
| Source-index precision | Averroes | NEEDS_FIXES | Template paths use mixed/wrong roots; canonical roots omit ljx/history and Auto/ARIS; locators are too coarse. |
| Prompt-body locator | Linnaeus | NEEDS_FIXES | Subagent prompt templates and SDK prompt templates are not fully located. |
| Context hygiene | Boyle | PASS | Corrected process model and no-typed-routing rule are internally consistent; Phase 01 still must complete reviews/final check in order. |

## Accepted Findings

### R1-001: Upstream package/test surface underindexed

**Severity:** High
**Artifacts affected:** `01-GSD-SOURCE-INDEX.md`, `01-GSD-UPGRADE-BOUNDARIES.md`
**Evidence:** `.planning/references/upstreams/get-shit-done/package.json`, `sdk/package.json`, `tests/package-manifest.test.cjs`, `tests/install-hooks-copy.test.cjs`, `tests/atomic-write-coverage.test.cjs`

The source map did not explicitly cover the upstream publish/build/test boundary or the upstream regression corpus that encodes package, hook install, and atomic write contracts.

### R1-002: SDK package boundary underdescribed

**Severity:** Medium
**Artifacts affected:** `01-GSD-FRAMEWORK.md`, `01-GSD-SOURCE-INDEX.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`
**Evidence:** `sdk/package.json`, `sdk/src/index.ts`, `sdk/src/cli.ts`, broader `sdk/src/*.ts` and `sdk/src/*.test.ts`

The SDK was framed too narrowly as a wrapper. It is a package boundary with public API, CLI, prompt assembly, tests, and lifecycle helpers.

### R1-003: Lifecycle helper reuse guidance conflicts with no-typed-routing rule

**Severity:** High
**Artifacts affected:** `01-LJX-REUSE-OR-DISCARD-MATRIX.md`
**Evidence:** `bin/lib/ljx-lifecycle-shell-tools.cjs`, `LJX-GSD-DESIGN-DECISION-LOG.md`, `LJX-GSD-ARCHITECTURE.md`

The same helper was both a strong reuse candidate and a typed-route risk. v2.0 needs only narrow adoption-state ideas, not typed route-table mechanics.

### R1-004: History taxonomy missing hook/adapter conformance family

**Severity:** Medium
**Artifacts affected:** `01-LJX-HISTORY-FAILURE-TAXONOMY.md`
**Evidence:** `.planning/review/v1.4/BUG-LEDGER.md`, including hook template shape, `cwd` propagation, stale hook assumptions, and external-service confirmation wiring rows.

Hook/runtime-adapter drift is distinct from generic prompt/config drift and must become an explicit review family.

### R1-005: Public surface count stale

**Severity:** Medium
**Artifacts affected:** `01-LJX-FRAMEWORK.md`
**Evidence:** `bin/lib/manifest.cjs`

`PUBLIC_SKILL_MANIFEST` has 34 entries and all are `buildPolicy: 'bridge-ready'`; there are no current compatibility/deferred entries in the manifest.

### R1-006: Auto `sources` semantics incorrect

**Severity:** High
**Artifacts affected:** `01-AUTO-PARAMETER-MAP.md`, `01-AUTO-FRAMEWORK.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`
**Evidence:** Auto `skills/skills-codex/research-lit/SKILL.md`, `AGENT_GUIDE.md`

`semantic-scholar` is not an independent `sources` value; Semantic Scholar is folded into `web`. Valid values are `zotero`, `obsidian`, `local`, `web`, `deepxiv`, `all`.

### R1-007: Review-loop difficulty parameter name incorrect

**Severity:** High
**Artifacts affected:** `01-AUTO-PARAMETER-MAP.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`
**Evidence:** Auto `AGENT_GUIDE.md`, `skills/skills-codex/research-pipeline/SKILL.md`

The parameter is `difficulty`, with values `medium`, `hard`, `nightmare`; not `REVIEWER_DIFFICULTY`.

### R1-008: `research-pipeline` omitted from preservation checklist

**Severity:** Medium
**Artifacts affected:** `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`
**Evidence:** Auto `AGENT_GUIDE.md`, `skills/skills-codex/research-pipeline/SKILL.md`

`research-pipeline` is a first-class end-to-end wrapper and must be preserved or explicitly marked as wrapper scope.

### R1-009: Paper lane camera-ready statement overstated

**Severity:** Medium
**Artifacts affected:** `01-AUTO-FRAMEWORK.md`, `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md`, `01-FRAMEWORK-SYNTHESIS-DRAFT.md`, `01-CONTEXT-HYGIENE-LOG.md`
**Evidence:** Auto `paper-write/SKILL.md`, `paper-writing/SKILL.md`, README paper workflow entries.

No standalone `paper-review` was found, but camera-ready mode and post-acceptance `paper-slides`/`paper-poster` exist.

### R1-010: Template source paths and prompt-body locator incomplete

**Severity:** High
**Artifacts affected:** `01-GSD-SOURCE-INDEX.md`, `01-GSD-FRAMEWORK.md`
**Evidence:** `get-shit-done/templates/planner-subagent-prompt.md`, `get-shit-done/templates/debug-subagent-prompt.md`, `sdk/prompts/templates/*.md`, `sdk/prompts/templates/research-project/*.md`

The source index mixed root-relative and nested package-relative paths and missed prompt-template families required for faithful rebuild.

### R1-011: Canonical source roots incomplete and locator convention unclear

**Severity:** Medium
**Artifacts affected:** `01-GSD-SOURCE-INDEX.md`, source-backed synthesis docs
**Evidence:** `01-CONTEXT.md`, repo-root `LJX-GSD-*.md`, `.planning/milestones/`, `.planning/review/`, Auto/ARIS checkout root

Phase 01 has three primary source systems: upstream GSD, current ljx-GSD/history, and Auto/ARIS. The index must state path conventions and roots for all three.

## R1 Outcome

R1 did not block the Phase 01 approach. The accepted findings were reflected in the Phase 01 artifacts, then local verification passed. R2 may proceed, but Phase 01 is not complete.
