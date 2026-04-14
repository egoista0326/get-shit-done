# Phase 14: Migration Cutover And Parity Verification - Research

**Researched:** 2026-04-12 [VERIFIED: environment current_date + local research session]
**Domain:** local `ljx-GSD` migration cutover, helper-backed research-pipeline promotion, and parity verification [VERIFIED: .planning/phases/14-complete-migration-cutover-and-parity-verification/14-CONTEXT.md]
**Confidence:** HIGH for local helper boundaries and current test state; MEDIUM for exact new helper filenames because Phase 14 explicitly leaves those to implementation discretion [VERIFIED: 14-CONTEXT.md + bin/lib/*.cjs + npm test]

<user_constraints>
## User Constraints (from CONTEXT.md)

Source for this section: copied from `.planning/phases/14-complete-migration-cutover-and-parity-verification/14-CONTEXT.md`. [VERIFIED: .planning/phases/14-complete-migration-cutover-and-parity-verification/14-CONTEXT.md]

### Locked Decisions

#### Reference hierarchy and defaulting

- **D-01:** For every migration and research-pipeline boundary, implementation should first reuse or mirror the closest installed local GSD/Auto behavior. GSD is preferred for lifecycle, roadmap, workstream, pause/resume, routing, and `STATE.md` discipline. Auto is preferred for research-stage intent, paper/rebuttal stage structure, review-loop/refine-loop semantics, and direct research workflow user expectations.
- **D-02:** When an installed local GSD/Auto behavior conflicts with accepted ljx-GSD project invariants, the accepted ljx-GSD invariant wins. The most important invariants are one authoritative `.planning/` state substrate, no second control plane, read legacy broadly / normalize once / write new truth only, and minimal modification as semantic reuse rather than surface-only reuse.
- **D-03:** When no useful local GSD/Auto reference exists, implementation may use project-local best judgment, but it must document the boundary and keep the solution narrow, helper-backed, test-covered, and aligned with existing runtime helpers.

#### Migration import and release semantics

- **D-04:** The import flow must preserve the Phase 5 locked rule: read legacy broadly, normalize once, write new truth only.
- **D-05:** The one-shot project/workspace import remains the default. Incremental per-phase import should not become the default migration behavior in Phase 14.
- **D-06:** Migration detection and preflight should be visible and guided. In safe/default mode, import must generate a migration summary and require confirmation before writing converted state.
- **D-07:** Normal lifecycle, roadmap mutation, umbrella orchestration, and mutating workstream commands remain blocked while a project is migration-blocked. `progress`, `help`, explicit import/inspect/conflict-review/repair/release actions, `pause-work`, and `resume-work` remain the safe command surface.
- **D-08:** Legacy artifacts must move to or be represented under `.planning/legacy-backups/{source_family}/{session_id}/original/` with exact relative path preservation, plus `manifest.json` and `conversion-report.md`. Backups are archival evidence only, never active control truth.
- **D-09:** Structured migration runtime truth must live under `.planning/state/migration/` using the accepted families: `import-sessions`, `conflict-reports`, `repair-bundles`, `releases`, `promotions`, and `suggested-branches`.
- **D-10:** Human-readable migration reports must use the accepted root/report surface: `.planning/MIGRATION_SUMMARY.md`, `.planning/CONFLICT_REPORT.md`, `.planning/REPAIR_BUNDLE.md`, `.planning/SUGGESTED_BRANCHES.md`, `.planning/migration/promotions/{promotion_id}-DIFF.md`, and backup `conversion-report.md`.
- **D-11:** Reports explain and recommend. They may not override structured state or become control truth.
- **D-12:** Release from migration-blocked state requires a structured release record proving import completion, no unresolved blocking conflicts, complete backup/report output, consistent roadmap/state/phase/artifact references, and resolvable current position plus `next` routing.

#### Conflict, repair, and suggested branch boundaries

- **D-13:** New structured `.planning` state wins by default over legacy-derived values when they disagree. Reverse application of legacy values over new state requires explicit import/repair override.
- **D-14:** Blocking conflicts include graph reconstruction failure, unresolved current position, irreconcilable control-field contradictions, core artifact attachment failure, structured-state integrity failure, incomplete backup output, and unrecoverable key-input damage.
- **D-15:** Non-blocking conflicts include duplicate summaries, optional artifact gaps, naming/timestamp drift, low-value metadata drift, safely archivable unmapped residue, and obsolete historical leftovers.
- **D-16:** Low-risk auto-repairs may include index repair, reference relinking, non-semantic naming normalization, duplicate low-value archive marking, and non-blocking metadata cleanup.
- **D-17:** Repairs that change phase graph semantics, `phase_type`, active phase, completion state, milestone position, core artifact ownership, backup completeness, legacy overwrite direction, or `next` routing require explicit repair action or human confirmation.
- **D-18:** Suggested branches stay out of formal workstream state and default `next` routing until explicitly promoted. Promotion must record lineage, selected baseline, diff-summary reference, current-primary reference, and resulting workstream id.

#### `research-pipeline` cutover

- **D-19:** `ljx-GSD-research-pipeline` remains public and should graduate from compatibility-wrapper-only status in this phase if the implementation can stay within helper-backed phase-chain semantics.
- **D-20:** The bridge-ready `research-pipeline` must not run a hidden linear upstream Auto pipeline. It must inspect the current roadmap and structured phase records, propose reuse/create/repair of formal typed phases, route structural mutations through helper-backed `add-phase`, `insert-phase`, and `remove-phase`, then recommend the next explicit `ljx-GSD-*` stage command.
- **D-21:** `research-pipeline` may consume direct research artifacts already present in the active workstream as evidence for phase-chain proposal and routing, but it must not claim downstream research stages ran unless phase-local artifacts and structured state prove they did.
- **D-22:** The default stage chain remains discovery -> refine -> experiment -> analysis -> paper, with Auto stage intent preserved through the existing bridge-ready direct commands.

#### Parity and cutover evidence

- **D-23:** Phase 14 parity is whole-repo, not phase-local only. Runtime helpers, generated skills, preview/install output, docs/state, tests, GSD/Auto reuse, migration fixtures, and minimum-modification compliance all count.
- **D-24:** Parity verification must include at least: a legacy GSD-like fixture, an Auto-like research fixture, a mixed fixture, current repo `progress` / `next` routing, generated skill wording, preview install, docs contract tests, targeted migration tests, targeted `research-pipeline` tests, and full `npm test`.
- **D-25:** Wider cutover is not allowed until parity reports show that bridge-ready preview shells can be replaced with final accepted semantics without breaking existing projects.
- **D-26:** Global installed production skills remain out of scope until Phase 14 parity passes in-repo.

#### Phase 04-06 evidence reconciliation

- **D-27:** The known stock `gsd-tools` progress issue for accepted-baseline Phases 04-06 is in Phase 14 scope as a minimal reconciliation task. The goal is not to rewrite accepted history; it is to prevent progress/session tooling from treating accepted architecture baselines as unexecuted work.
- **D-28:** The reconciliation should prefer a small evidence/backfill or routing fix that preserves the accepted baseline status in `ROADMAP.md`, `STATE.md`, requirements traceability, and runtime progress output.

### Claude's Discretion

- Exact helper filenames and CLI subcommand names for migration internals, provided the public/operator surfaces remain understandable and docs/tests match.
- Exact JSON schema field names for migration records, provided accepted state-family paths, ownership, release gates, and provenance fields are preserved.
- Exact fixture layout for migration parity tests, provided it covers GSD-like, Auto-like, mixed, and current-repo cases.
- Exact implementation split across existing helpers versus a new small migration helper, provided rules are not duplicated across adapters and generated skills stay thin.

### Deferred Ideas (OUT OF SCOPE)

- Global production skill replacement after in-repo Phase 14 parity passes.
- Rich UI/TUI for migration reports.
- Multi-project migration assistant.
- Full visual diff tooling for migration conversion reports.
- Provider-specific review backend promotion as core identity.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| IMPL-08 | Migration cutover can import legacy artifacts into the canonical runtime state and verify parity before release. | Use the canonical migration state families from Phase 5, add release gating to shared lifecycle/admin helpers, promote `research-pipeline` only through helper-backed phase-chain semantics, and require parity fixtures plus full `npm test`. [VERIFIED: .planning/REQUIREMENTS.md + 05-02-PLAN.md + 14-CONTEXT.md + npm test] |

</phase_requirements>

## Summary

Phase 14 should implement migration as an extension of the existing `.planning` runtime substrate, not as a separate importer with its own truth engine. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md + bin/lib/ljx-runtime-state.cjs] The current repo already has helper-owned state IO, lifecycle routing, roadmap admin mutation, workstream mutation, generated skill installation, and docs-contract tests, but it does not yet have the locked migration state families in `STATE_FAMILIES` or a helper that owns import/conflict/repair/release records. [VERIFIED: bin/lib/ljx-runtime-state.cjs + rg "migration" bin tests]

`ljx-GSD-research-pipeline` is currently installed as a deferred compatibility wrapper, and `node bin/install.js --print-manifest` still reports that status. [VERIFIED: bin/lib/manifest.cjs + bin/lib/codex-conversion.cjs + node bin/install.js --print-manifest] Phase 14 should promote it only after a helper-backed implementation can inspect roadmap/phase records, propose reuse/create/repair, route structural mutation through `ljx-roadmap-admin-tools.cjs`, and recommend one next explicit stage command without running the upstream Auto linear pipeline. [VERIFIED: 14-CONTEXT.md + LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md + /Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md]

**Primary recommendation:** implement a bounded `ljx-migration-tools.cjs` helper plus a bounded `ljx-research-pipeline-tools.cjs` helper, extend existing shared helpers for migration-blocked routing, then update runtime copy, manifest, generated skills, docs, and tests in the same phase wave. [VERIFIED: 14-CONTEXT.md + bin/lib/build-skills.cjs + bin/lib/manifest.cjs + tests/skill-build.test.cjs + tests/docs-contract.test.cjs]

## Project Constraints (from CLAUDE.md)

No repo-root `CLAUDE.md` file was found, so there are no additional CLAUDE.md directives to copy into Phase 14 research. [VERIFIED: find . -maxdepth 3 -name CLAUDE.md]

No project-local `.claude/skills/` or `.agents/skills/` directory was found in this workspace. [VERIFIED: find . -maxdepth 3 -type d -path './.claude/skills' -o -path './.agents/skills']

## Standard Stack

### Core

| Owner | Version / Status | Purpose | Why Standard |
|-------|------------------|---------|--------------|
| `bin/lib/ljx-runtime-state.cjs` | repo `ljx-gsd@0.1.0`; currently supports phase, session, workstream, review, experiment, claim, paper, and research state families, but not migration families yet | Canonical `.planning/state` family registry and read/write/list/update layer | Extend this for `migration/import-sessions`, `migration/conflict-reports`, `migration/repair-bundles`, `migration/releases`, `migration/promotions`, and `migration/suggested-branches` instead of ad hoc path writes. [VERIFIED: package.json + bin/lib/ljx-runtime-state.cjs + 05-02-PLAN.md] |
| New bounded migration helper, recommended name `bin/lib/ljx-migration-tools.cjs` | new in Phase 14 | Migration preflight, backup manifest, import session, conflict report, repair bundle, release record, suggested-branch index, promotion record, and operator report generation | A new helper is justified because migration has multiple related records and reports, but it must use `ljx-runtime-state.cjs` for structured state and must not own generic lifecycle routing. [VERIFIED: 14-CONTEXT.md + 05-01-PLAN.md + 05-02-PLAN.md] |
| `bin/lib/ljx-state-tools.cjs` | current helper passes `npm test` baseline | `progress`, `next`, pause/resume, installed-surface recommendation filtering | Add migration-blocked detection and safe recommendations here so lifecycle routing stops in one shared place. [VERIFIED: bin/lib/ljx-state-tools.cjs + tests/runtime-shell.test.cjs + npm test] |
| `bin/lib/ljx-roadmap-admin-tools.cjs` | current helper passes `npm test` baseline | Helper-backed add/insert/remove phase-chain mutation | `research-pipeline` must call or recommend this boundary for structural phase changes and must not edit `ROADMAP.md` or phase records directly. [VERIFIED: bin/lib/ljx-roadmap-admin-tools.cjs + tests/roadmap-admin-bridge.test.cjs + 14-CONTEXT.md] |
| `bin/lib/ljx-workstreams-tools.cjs` | current helper passes `npm test` baseline | Primary/secondary workstream list/status/progress/create/switch/resume/complete semantics | Migration should reuse its primary record shape and block mutating workstream subcommands while migration-blocked. [VERIFIED: bin/lib/ljx-workstreams-tools.cjs + tests/workstreams-bridge.test.cjs + 14-CONTEXT.md] |
| New bounded research-pipeline helper, recommended name `bin/lib/ljx-research-pipeline-tools.cjs` | new in Phase 14 | Roadmap/phase-record/direct-artifact inspection and typed phase-chain proposal for `ljx-GSD-research-pipeline` | A helper is needed to replace prose-only generated wrapper behavior without creating a second control plane. [VERIFIED: bin/lib/codex-conversion.cjs + bin/lib/manifest.cjs + 14-CONTEXT.md] |
| `bin/lib/codex-conversion.cjs` | current generated wrapper still says compatibility semantics | Generated skill text builders | Keep generated skills thin and helper-driven; update `buildResearchPipelineCompatibilitySkill` into a bridge-ready helper-backed builder when runtime semantics exist. [VERIFIED: bin/lib/codex-conversion.cjs + tests/skill-build.test.cjs] |
| `bin/lib/build-skills.cjs` and `bin/install.js` | current preview/install output passes `npm test` baseline | Runtime helper copy, skill generation, docs bundle, manifest output | Add new helper files to the runtime copy list and update manifest/preview install tests in the same implementation wave. [VERIFIED: bin/lib/build-skills.cjs + bin/install.js + tests/skill-build.test.cjs] |
| `bin/lib/manifest.cjs` | currently marks `ljx-GSD-research-pipeline` as `deferred` with `compatibilityWrapper: true` | Public bridge-ready/deferred truth | Promote `ljx-GSD-research-pipeline` here only after runtime helper behavior and generated skill tests are updated. [VERIFIED: bin/lib/manifest.cjs + node bin/install.js --print-manifest] |

### Supporting

| Owner | Version / Status | Purpose | When to Use |
|-------|------------------|---------|-------------|
| `/Users/lijiaxin/.codex/skills/gsd-progress/SKILL.md` | installed local GSD skill | Lifecycle status and progress behavior reference | Use as GSD semantics reference for visible progress/resume routing, but keep ljx runtime authority in `ljx-state-tools.cjs`. [VERIFIED: local installed skill read + bin/lib/ljx-state-tools.cjs] |
| `/Users/lijiaxin/.codex/skills/gsd-resume-work/SKILL.md` | installed local GSD skill | Resume/handoff behavior reference | Use for pause/resume expectation parity while keeping local state parsing in `ljx-state-tools.cjs`. [VERIFIED: local installed skill read + tests/runtime-shell.test.cjs] |
| `/Users/lijiaxin/.codex/skills/gsd-import/SKILL.md` | installed local GSD skill | Conflict-detect-before-write import reference | Use as a narrow semantic reference for conflict review before writing, not as a complete legacy project migration implementation. [VERIFIED: local installed skill read + 14-CONTEXT.md] |
| `/Users/lijiaxin/.codex/skills/gsd-workstreams/SKILL.md` | installed local GSD skill | Workstream command expectations | Use for comparable list/create/status/switch/progress/complete UX, while preserving ljx-specific primary protection and structured state ownership. [VERIFIED: local installed skill read + bin/lib/ljx-workstreams-tools.cjs] |
| `/Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md` | installed local Auto skill | End-to-end research-stage intent | Preserve stage intent and user expectation, but do not preserve its hidden linear control pipeline or root-style report ownership. [VERIFIED: local installed skill read + 14-CONTEXT.md] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| New migration helper plus shared runtime-state writes | Scatter migration writes across `progress`, `workstreams`, generated skills, and docs | Reject because Phase 14 requires structured migration truth and report ownership without duplicated rules. [VERIFIED: 14-CONTEXT.md + .planning/PROJECT.md + .planning/IMPLEMENTATION-LESSONS.md] |
| Helper-backed research-pipeline proposal | Preserve the upstream Auto `research-pipeline` linear chain directly | Reject because the upstream Auto skill chains `/idea-discovery -> implement -> /run-experiment -> /auto-review-loop`, while ljx-GSD requires the formal phase/state substrate and no second control plane. [VERIFIED: /Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md + 14-CONTEXT.md] |
| Extend `ljx-runtime-state.cjs` | Hand-code `.planning/state/migration/...` paths in every importer | Reject because the existing runtime-state helper already owns supported state families and rejects unsupported families explicitly. [VERIFIED: bin/lib/ljx-runtime-state.cjs + tests/runtime-state.test.cjs] |

**Installation:**

No npm dependency installation is required for Phase 14 because `package.json` has empty `dependencies` and `devDependencies`. [VERIFIED: package.json]

```bash
npm test
node bin/install.js --preview
node bin/install.js --print-manifest
```

**Version verification:** local package version is `ljx-gsd@0.1.0`, Node requirement is `>=22.0.0`, and the audited environment has Node `v24.14.1`, npm `11.11.0`, git `2.50.1`, and ripgrep `15.1.0`. [VERIFIED: package.json + local command: node --version; npm --version; git --version; rg --version]

## Architecture Patterns

### Recommended Project Structure

```text
bin/lib/
├── ljx-runtime-state.cjs              # extend state-family registry for migration families
├── ljx-migration-tools.cjs            # new migration preflight/import/conflict/repair/release owner
├── ljx-state-tools.cjs                # migration-blocked progress/next gate
├── ljx-roadmap-admin-tools.cjs        # phase-chain mutation owner reused by research-pipeline
├── ljx-workstreams-tools.cjs          # workstream mutation owner and migration-blocked mutating gate
├── ljx-research-pipeline-tools.cjs    # new helper-backed umbrella proposal owner
├── codex-conversion.cjs               # generated skill text builders
├── build-skills.cjs                   # preview/install runtime helper copying
└── manifest.cjs                       # public bridge-ready/deferred truth
tests/
├── migration-cutover.test.cjs         # new migration fixture/import/release tests
├── research-pipeline-cutover.test.cjs # new helper-backed proposal/routing tests
├── runtime-state.test.cjs             # extend migration state family coverage
├── runtime-shell.test.cjs             # extend migration-blocked progress/next coverage
├── roadmap-admin-bridge.test.cjs      # extend migration-blocked add/insert/remove coverage
├── workstreams-bridge.test.cjs        # extend migration-blocked mutating command coverage
├── skill-build.test.cjs               # update generated skill/install/manifest assertions
└── docs-contract.test.cjs             # update current docs truth after promotion
```

This structure follows the current helper ownership model and adds only two bounded helpers for domains that do not already have one owner. [VERIFIED: bin/lib/*.cjs + tests/*.test.cjs + 14-CONTEXT.md]

### Pattern 1: Migration State Truth Lives Under Runtime-State

**What:** Add migration state families to `STATE_FAMILIES`, then have the migration helper use `writeStateRecord`, `readStateRecord`, `listStateRecords`, and `validateStateFamilyPath` for import sessions, conflict reports, repair bundles, releases, promotions, and suggested branches. [VERIFIED: bin/lib/ljx-runtime-state.cjs + 05-02-PLAN.md]

**When to use:** Use this for every machine-readable migration record and never make root markdown reports authoritative. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]

**Implementation note:** `suggested-branches` is specified as a migration family, but the Phase 5 docs name it as an index-like state item; planners should require one explicit helper API for it so it does not become an ad hoc singleton path outside the family registry. [VERIFIED: 05-02-PLAN.md + 14-CONTEXT.md]

### Pattern 2: Migration-Blocked Routing Is a Shared Lifecycle Gate

**What:** Add a migration status reader in the migration helper, then call it from `ljx-state-tools.cjs` before normal phase routing, from `ljx-roadmap-admin-tools.cjs` before add/insert/remove, from `ljx-workstreams-tools.cjs` before mutating subcommands, and from the final research-pipeline helper before phase-chain proposal mutation. [VERIFIED: 14-CONTEXT.md + bin/lib/ljx-state-tools.cjs + bin/lib/ljx-roadmap-admin-tools.cjs + bin/lib/ljx-workstreams-tools.cjs]

**When to use:** Use this whenever a project has an import session with migration-blocked status and no passing release record. [VERIFIED: 14-CONTEXT.md]

**Expected safe recommendations:** `progress`, `help`, migration import/inspect/conflict-review/repair/release, `pause-work`, and `resume-work` stay safe while normal lifecycle, roadmap mutation, umbrella orchestration, and mutating workstream actions are blocked. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]

### Pattern 3: One-Shot Import Write Order

**What:** Migration writes should follow backup first, normalized state/artifacts second, reports third, and release gate last. [VERIFIED: 05-01-PLAN.md + 05-02-PLAN.md + 14-CONTEXT.md]

**When to use:** Use this for GSD-like legacy fixtures, Auto-like research fixtures, mixed fixtures, and current project parity dry-runs. [VERIFIED: 14-CONTEXT.md]

**Required release gate:** A release record must prove import completion, no unresolved blocking conflicts, complete backup/report output, consistent roadmap/state/phase/artifact references, and resolvable current position plus `next` routing. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]

### Pattern 4: Research-Pipeline as a Proposal Helper

**What:** `ljx-research-pipeline-tools.cjs` should inspect `.planning/ROADMAP.md`, `.planning/STATE.md`, phase records, and relevant direct research artifacts, then emit a structured proposal covering existing phases to reuse, missing phases to create, duplicate-looking phases to resolve, and missing/mismatched `phase_type` metadata. [VERIFIED: bin/lib/codex-conversion.cjs + LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md + 14-CONTEXT.md]

**When to use:** Use this when the user invokes `ljx-GSD-research-pipeline` or attaches current research artifacts to the formal chain. [VERIFIED: 14-CONTEXT.md + LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md]

**Mutation boundary:** The helper should not write `ROADMAP.md` or `phase-records` directly; it should call or recommend the existing `mutateRoadmap` owner for accepted add/insert/remove operations, and stop with a repair plan when metadata changes are outside those admin commands. [VERIFIED: bin/lib/ljx-roadmap-admin-tools.cjs + bin/lib/codex-conversion.cjs + 14-CONTEXT.md]

### Pattern 5: Install/Generated Surface Moves With Runtime

**What:** When a new helper becomes public or helper-backed, add it to `build-skills.cjs` runtime copy list, update `manifest.cjs`, update `codex-conversion.cjs` generated skill text, update `install.js --print-manifest`, and update docs contract expectations together. [VERIFIED: bin/lib/build-skills.cjs + bin/lib/manifest.cjs + bin/install.js + tests/skill-build.test.cjs + tests/docs-contract.test.cjs]

**When to use:** Use this for both migration helper surfacing and `research-pipeline` promotion. [VERIFIED: 14-CONTEXT.md + tests/skill-build.test.cjs]

### Pattern 6: Phase 04-06 Reconciliation Is Evidence Backfill, Not History Rewrite

**What:** Add minimal evidence/backfill or routing metadata so progress tooling stops treating accepted architecture baselines as unexecuted, while preserving accepted baseline status in `ROADMAP.md`, `STATE.md`, requirements traceability, and runtime progress output. [VERIFIED: 14-CONTEXT.md + .planning/STATE.md + .planning/ROADMAP.md]

**When to use:** Use this in plan slot 14-04 after migration/research-pipeline parity foundations exist, because it is cutover/operator-readiness work rather than core import parsing. [VERIFIED: .planning/ROADMAP.md + 14-CONTEXT.md]

### Anti-Patterns to Avoid

- **Reports as truth:** Do not let `.planning/MIGRATION_SUMMARY.md`, `.planning/CONFLICT_REPORT.md`, `.planning/REPAIR_BUNDLE.md`, or `.planning/SUGGESTED_BRANCHES.md` override structured migration records. [VERIFIED: 14-CONTEXT.md + 05-02-PLAN.md]
- **Legacy active-control drift:** Do not keep legacy files as active routing inputs after successful import; they are sources, backups, or residue. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]
- **Generated skill drift:** Do not change runtime helper behavior without updating generated skills, preview install output, manifest assertions, and docs contracts. [VERIFIED: .planning/IMPLEMENTATION-LESSONS.md + tests/skill-build.test.cjs + tests/docs-contract.test.cjs]
- **Silent phase-chain mutation:** Do not let `research-pipeline` silently add/insert/remove phases or rewrite metadata without explicit helper-backed mutation and confirmation policy. [VERIFIED: 14-CONTEXT.md + .planning/config.json + LJX-GSD-DESIGN-DECISION-LOG.md]
- **Over-import:** Do not promote ambiguous legacy branches into formal workstreams unless they are clear, stable, separable lines; otherwise keep them as suggested branches or archived residue. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Structured state IO | Custom JSON path writers under `.planning/state` | `ljx-runtime-state.cjs` | It already validates supported families, builds canonical record paths, reads malformed records honestly, and writes JSON records. [VERIFIED: bin/lib/ljx-runtime-state.cjs + tests/runtime-state.test.cjs] |
| Phase-chain add/insert/remove | Direct edits to `ROADMAP.md`, phase dirs, and `phase-records` from `research-pipeline` | `ljx-roadmap-admin-tools.cjs` / `mutateRoadmap` | It already owns roadmap mirrors, phase records, dependency checks, confirmation, lock handling, and rollback. [VERIFIED: bin/lib/ljx-roadmap-admin-tools.cjs + tests/roadmap-admin-bridge.test.cjs] |
| Workstream import/promotion writes | A separate workstream state format | `ljx-workstreams-tools.cjs` and `ensurePrimaryWorkstreamRecord` | Current workstream helper already protects `primary`, handles active pointers, session-local state, and mutation rollback. [VERIFIED: bin/lib/ljx-workstreams-tools.cjs + bin/lib/ljx-runtime-state.cjs + tests/workstreams-bridge.test.cjs] |
| Lifecycle `progress` / `next` gating | Per-skill migration blockers | `ljx-state-tools.cjs` plus migration helper status reader | Shared lifecycle routing already handles malformed state, active workstream conflicts, config errors, installed-surface filtering, and inline/bridge/deferred next actions. [VERIFIED: bin/lib/ljx-state-tools.cjs + tests/runtime-shell.test.cjs] |
| Auto research stage semantics | A new stage taxonomy | Installed Auto skill intent plus existing ljx stage commands | The accepted default chain is discovery -> refine -> experiment -> analysis -> paper, and current bridge-ready direct commands already exist for those stages. [VERIFIED: 14-CONTEXT.md + /Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md + node bin/install.js --print-manifest] |
| Generated skill/install behavior | Hand-written installed skill files | `codex-conversion.cjs`, `build-skills.cjs`, `manifest.cjs`, and `install.js` | Preview/install output is a product surface with tests that already verify generated wording, manifest truth, docs bundles, conflict safety, and symlink safety. [VERIFIED: bin/lib/codex-conversion.cjs + bin/lib/build-skills.cjs + bin/lib/manifest.cjs + tests/skill-build.test.cjs] |
| Migration release criteria | A boolean flag in a markdown report | Structured release record under `.planning/state/migration/releases` | Release requires multiple proofs and reports cannot override structured state. [VERIFIED: 14-CONTEXT.md + 05-02-PLAN.md] |

**Key insight:** Phase 14's risk is not missing a parser; it is letting multiple partial truth engines drift across runtime helpers, generated skills, docs, and installed preview output. [VERIFIED: .planning/STATE.md + .planning/IMPLEMENTATION-LESSONS.md + tests/skill-build.test.cjs]

## Runtime State Inventory

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | `.planning/state/phase-records/13.json` and `.planning/state/phase-records/14.json` exist; `.planning/state` currently has `phase-records` only in this workspace. [VERIFIED: find .planning -maxdepth 4 -type f + find .planning -maxdepth 4 -type d] | Add migration state families to `ljx-runtime-state.cjs`; create migration fixture data under temp projects in tests; do not mutate real current phase records except the planned Phase 04-06 reconciliation task. [VERIFIED: bin/lib/ljx-runtime-state.cjs + 14-CONTEXT.md] |
| Stored data | Legacy GSD/Auto artifacts are expected import inputs for Phase 14 fixtures, but no repo-local external database store such as Redis/Postgres/SQLite/n8n was found by the audit query. [VERIFIED: rg "sqlite|redis|postgres|n8n" bin tests .planning LJX-GSD-*.md package.json] | Model import fixtures as filesystem `.planning` and root artifact trees; do not plan external DB migration steps unless implementation discovers a concrete legacy fixture that contains one. [VERIFIED: 14-CONTEXT.md + rg audit] |
| Live service config | No Datadog, Cloudflare, Tailscale, n8n, Redis, Postgres, or SQLite service configuration was found in the required local files. [VERIFIED: rg "datadog|cloudflare|tailscale|n8n|redis|postgres|sqlite" bin tests .planning LJX-GSD-*.md package.json] | None for Phase 14 planning; keep migration reports filesystem-bound. [VERIFIED: rg audit + 14-CONTEXT.md] |
| OS-registered state | No `pm2`, `launchd`, `systemd`, or Windows Task Scheduler registration was found in the required local files. [VERIFIED: rg "pm2|launchd|systemd|Task Scheduler" bin tests .planning LJX-GSD-*.md package.json] | None for migration release; preview/install output remains the only install-surface state to verify. [VERIFIED: bin/install.js + tests/skill-build.test.cjs] |
| Secrets/env vars | Runtime helpers reference `GSD_WORKSTREAM`, `GSD_SESSION_ID`, `GSD_SESSION_KEY`, `CODEX_THREAD_ID`, `CODEX_SESSION_ID`, `CLAUDE_SESSION_ID`, and `CODEX_HOME`; docs mention `WANDB_PROJECT` and `WANDB_API_KEY` as research environment/secrets outside normal workflow policy. [VERIFIED: rg env audit + bin/lib/ljx-runtime-core.cjs + bin/install.js + LJX-GSD-PARAMETER-DICTIONARY.md] | Do not rename secret/env keys in Phase 14; ensure migration/import does not serialize secret values into reports. [VERIFIED: .planning/PROJECT.md + rg env audit] |
| Build artifacts | `.build/` exists; `node_modules` and `dist` were not found at max depth 3; preview install writes under `.build/codex-preview` when `--preview` is used. [VERIFIED: find . -maxdepth 3 -type d + bin/install.js] | Run `node bin/install.js --preview` and `tests/skill-build.test.cjs` after adding migration/research-pipeline helpers so runtime copied helpers and manifest output stay synchronized. [VERIFIED: package.json + bin/lib/build-skills.cjs + tests/skill-build.test.cjs] |

**Nothing found in live service config:** none beyond filesystem/docs configuration, verified by local `rg` audit. [VERIFIED: rg audit]

## Common Pitfalls

### Pitfall 1: Generated Skill Drift

**What goes wrong:** Runtime helper behavior changes, but installed skill text still describes deferred or compatibility-wrapper semantics. [VERIFIED: tests/skill-build.test.cjs + tests/docs-contract.test.cjs + node bin/install.js --print-manifest]

**Why it happens:** `research-pipeline` currently has explicit manifest/docs/tests that expect deferred compatibility semantics. [VERIFIED: bin/lib/manifest.cjs + tests/skill-build.test.cjs + tests/docs-contract.test.cjs]

**How to avoid:** Update `manifest.cjs`, `codex-conversion.cjs`, `build-skills.cjs`, `install.js --print-manifest`, `skill-build` assertions, docs, and docs-contract assertions in the same plan wave as helper promotion. [VERIFIED: bin/lib/*.cjs + tests/skill-build.test.cjs + tests/docs-contract.test.cjs]

**Warning signs:** `node bin/install.js --print-manifest` still says `ljx-GSD-research-pipeline` is deferred after the helper is claimed bridge-ready. [VERIFIED: local command: node bin/install.js --print-manifest]

### Pitfall 2: Install/Runtime Copy Drift

**What goes wrong:** A new helper works in the repo but is not copied into the preview/install runtime directory. [VERIFIED: bin/lib/build-skills.cjs + tests/skill-build.test.cjs]

**Why it happens:** `build-skills.cjs` manually copies each runtime helper into `ljx-gsd/runtime`. [VERIFIED: bin/lib/build-skills.cjs]

**How to avoid:** Add every new Phase 14 helper to the runtime copy list and include a preview install assertion that the helper file exists under `.build/codex-preview/ljx-gsd/runtime`. [VERIFIED: bin/lib/build-skills.cjs + tests/skill-build.test.cjs]

**Warning signs:** Generated skill text references a helper path that does not exist in the preview install tree. [VERIFIED: tests/skill-build.test.cjs]

### Pitfall 3: Legacy Active-Control Drift

**What goes wrong:** Legacy artifacts continue to influence normal routing after import/release. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]

**Why it happens:** A broad importer may preserve old files without marking whether they are archival, suggested-branch material, or canonical state. [VERIFIED: 05-01-PLAN.md + 05-02-PLAN.md]

**How to avoid:** Store original inputs under `.planning/legacy-backups/{source_family}/{session_id}/original/`, write structured migration state, and ensure release validation checks that normal routing reads canonical state. [VERIFIED: 14-CONTEXT.md + 05-02-PLAN.md]

**Warning signs:** Root reports or backup files are used by `progress` / `next` after release. [VERIFIED: 14-CONTEXT.md + bin/lib/ljx-state-tools.cjs]

### Pitfall 4: Silent Phase-Chain Mutation

**What goes wrong:** `research-pipeline` creates, repairs, or removes phases without explicit helper-backed admin flow. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]

**Why it happens:** The upstream Auto `research-pipeline` is a linear end-to-end pipeline rather than a formal phase-chain proposal tool. [VERIFIED: /Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md]

**How to avoid:** Make `research-pipeline` output a proposal and hand mutations to `ljx-roadmap-admin-tools.cjs` under `workflow.confirm_phase_chain_changes`. [VERIFIED: .planning/config.json + bin/lib/ljx-roadmap-admin-tools.cjs + 14-CONTEXT.md]

**Warning signs:** New phase directories or `phase-records` appear after `research-pipeline` without an admin mutation record or roadmap-admin helper result. [VERIFIED: bin/lib/ljx-roadmap-admin-tools.cjs + tests/roadmap-admin-bridge.test.cjs]

### Pitfall 5: Phase 04-06 Progress Miscount

**What goes wrong:** Stock `gsd-tools` progress/session routing treats accepted architecture baselines as unexecuted work. [VERIFIED: .planning/STATE.md + 14-CONTEXT.md]

**Why it happens:** Phases 04-06 have accepted baseline plan/research artifacts but lack the same summary/evidence shape used by later executed phases. [VERIFIED: find .planning -maxdepth 4 -type f + .planning/ROADMAP.md + .planning/STATE.md]

**How to avoid:** Add a minimal auditable reconciliation/backfill or routing fix that preserves the accepted baseline status and does not rewrite Phase 04-06 history. [VERIFIED: 14-CONTEXT.md]

**Warning signs:** `gsd-tools progress` or local progress routing reports Phases 04-06 as current/in-progress while `ROADMAP.md` marks them accepted baselines. [VERIFIED: .planning/STATE.md + .planning/ROADMAP.md]

### Pitfall 6: Over-Import of Legacy Branches

**What goes wrong:** Low-confidence legacy residue becomes formal workstream state. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]

**Why it happens:** Import logic treats every parallel-looking legacy artifact as a real workstream instead of separating promoted workstreams, suggested branches, and archived residue. [VERIFIED: 05-01-PLAN.md + LJX-GSD-DESIGN-DECISION-LOG.md]

**How to avoid:** Use explicit conflict classes, suggested-branch records, and promotion records; keep suggested branches out of default `next` routing until promotion. [VERIFIED: 14-CONTEXT.md + 05-02-PLAN.md]

**Warning signs:** `ljx-GSD-workstreams list` shows imported branches that were never promoted. [VERIFIED: bin/lib/ljx-workstreams-tools.cjs + 14-CONTEXT.md]

## Code Examples

Verified patterns from local sources:

### Canonical State-Family Write Pattern

Use this style for migration records after adding the accepted migration families to `STATE_FAMILIES`. [VERIFIED: tests/runtime-state.test.cjs + bin/lib/ljx-runtime-state.cjs + 05-02-PLAN.md]

```js
writeStateRecord(projectRoot, 'research/idea-portfolios', '10', {
  phase_id: '10',
  status: 'shortlisted',
  candidates: [{ id: 'idea-1', status: 'recommended' }],
});

const portfolio = readStateRecord(projectRoot, 'research/idea-portfolios', '10');
assert.equal(portfolio.exists, true);
assert.equal(portfolio.error, null);
```

### Migration Family Extension Target

Keep the migration families in the existing registry instead of constructing raw paths in the migration helper. [VERIFIED: bin/lib/ljx-runtime-state.cjs + 05-02-PLAN.md]

```js
const STATE_FAMILIES = new Set([
  'phase-records',
  'sessions',
  'workstreams',
  'reviews',
  'experiments',
  'claims',
  'papers',
  'research/idea-portfolios',
  'research/refinement-sessions',
  'migration/import-sessions',
  'migration/conflict-reports',
  'migration/repair-bundles',
  'migration/releases',
  'migration/promotions',
  'migration/suggested-branches',
]);
```

### Shared Gate Pattern for Blocked Routing

Imitate the existing `readProjectSnapshot` style: resolve `.planning`, return structured stop/recommendations, and do not throw on recoverable project-state issues. [VERIFIED: bin/lib/ljx-state-tools.cjs + tests/runtime-shell.test.cjs]

```js
const snapshot = readProjectSnapshot(projectRoot, { filterInstalled: false });
if (snapshot.phaseResolutionError) {
  return {
    ...snapshot,
    availability: 'none',
    reasonCode: snapshot.phaseResolutionError,
    executableNow: false,
  };
}
```

### Roadmap Mutation Boundary for Research-Pipeline

Use the helper boundary for accepted structural changes instead of writing roadmap/phase files from the pipeline helper. [VERIFIED: bin/lib/ljx-roadmap-admin-tools.cjs + tests/roadmap-admin-bridge.test.cjs + 14-CONTEXT.md]

```js
const result = mutateRoadmap(projectRoot, {
  operation: 'insert',
  after: '01',
  name: 'Typed Insert Probe',
  phaseType: 'engineering',
});

assert.equal(result.ok, true);
```

### Generated Skill Promotion Check

Update the current assertions that expect compatibility/deferred research-pipeline semantics when Phase 14 promotes the command. [VERIFIED: tests/skill-build.test.cjs + bin/lib/manifest.cjs]

```js
assert.deepStrictEqual(
  manifest.compatibility.map((entry) => entry.name),
  [],
  'research-pipeline is promoted out of compatibility wrappers'
);
assert.equal(
  manifest.deferred.some((entry) => entry.name === 'ljx-GSD-research-pipeline'),
  false,
  'research-pipeline is no longer deferred once helper-backed semantics exist'
);
```

## State of the Art

| Old / Current Local Approach | Phase 14 Approach | When Changed | Impact |
|------------------------------|-------------------|--------------|--------|
| `ljx-GSD-research-pipeline` is currently deferred and emitted as a compatibility wrapper. [VERIFIED: bin/lib/manifest.cjs + node bin/install.js --print-manifest] | Promote it to a helper-backed bridge-ready skill only after helper behavior and tests exist. [VERIFIED: 14-CONTEXT.md] | Phase 14 target. [VERIFIED: .planning/ROADMAP.md] | Removes the last explicit research umbrella compatibility gap without creating a second control plane. [VERIFIED: 14-CONTEXT.md] |
| Migration semantics are locked in Phase 5 docs but not implemented as runtime state families. [VERIFIED: 05-02-PLAN.md + bin/lib/ljx-runtime-state.cjs] | Implement canonical migration state families, root reports, and release gate. [VERIFIED: 14-CONTEXT.md] | Phase 14 target. [VERIFIED: .planning/ROADMAP.md] | Makes legacy import/release controllable by structured state rather than prose-only docs. [VERIFIED: 14-CONTEXT.md] |
| Upstream Auto `research-pipeline` chains `/idea-discovery`, implementation, `/run-experiment`, and `/auto-review-loop`. [VERIFIED: /Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md] | Preserve stage intent through formal typed phases and explicit `ljx-GSD-*` stage commands. [VERIFIED: 14-CONTEXT.md] | Phase 14 target. [VERIFIED: .planning/ROADMAP.md] | Keeps Auto user expectations while avoiding hidden lifecycle advancement. [VERIFIED: 14-CONTEXT.md + LJX-GSD-ARCHITECTURE.md] |
| Phase 04-06 accepted baseline evidence is inconsistent with stock progress/session expectations. [VERIFIED: .planning/STATE.md] | Add minimal reconciliation/backfill or routing fix. [VERIFIED: 14-CONTEXT.md] | Phase 14 slot 14-04. [VERIFIED: .planning/ROADMAP.md + 14-CONTEXT.md] | Prevents operator cutover docs and progress routing from misrepresenting accepted baseline status. [VERIFIED: .planning/STATE.md + 14-CONTEXT.md] |

**Deprecated/outdated locally:**

- Treating `ljx-GSD-research-pipeline` as final while it is still a deferred compatibility wrapper is outdated for Phase 14 planning. [VERIFIED: bin/lib/manifest.cjs + node bin/install.js --print-manifest + 14-CONTEXT.md]
- Treating root migration reports as machine truth is rejected by the locked Phase 14 and Phase 5 decisions. [VERIFIED: 14-CONTEXT.md + 05-02-PLAN.md]
- Using legacy GSD/Auto artifacts as active control truth after release is rejected by the migration read-old/write-new rule. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md]

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Exact new helper filenames `ljx-migration-tools.cjs` and `ljx-research-pipeline-tools.cjs` are recommendations, not locked names. [ASSUMED] | Standard Stack / Summary | Low; Phase 14 context explicitly leaves exact helper filenames to implementation discretion, so the planner can rename them if docs/tests stay aligned. [VERIFIED: 14-CONTEXT.md] |
| A2 | ASVS applicability is mapped at category level without fetching external ASVS text in this local-only research pass. [ASSUMED] | Security Domain | Low; Phase 14 is local CLI/file-state migration work, but a later security review can refine labels if needed. [VERIFIED: .planning/config.json + phase scope in 14-CONTEXT.md] |
| A3 | The 30-day validity window is an estimate for local architecture research, assuming helper surfaces do not change first. [ASSUMED] | Metadata | Low; planner can refresh the research if Phase 14 waits until after helper or manifest changes. [VERIFIED: local repo state at research time] |

## Open Questions

1. **Should Phase 14 add a public `ljx-GSD-migrate` skill, or keep migration actions as helper-invoked subcommands surfaced through `progress` / `help` first?** What we know: public/operator surfaces must remain understandable and safe, but exact migration CLI names are discretionary. [VERIFIED: 14-CONTEXT.md] Recommendation: plan a helper API first and add a generated public skill only if tests/docs need a named operator entrypoint. [VERIFIED: 14-CONTEXT.md + bin/lib/build-skills.cjs]
2. **Should Phase 14 close Phase 12's pending whole-repo review/verify note as part of parity, or only keep it visible?** What we know: `ROADMAP.md` says Phase 12 implementation is complete but whole-repo review/verify remained pending, while Phase 14 parity is whole-repo. [VERIFIED: .planning/ROADMAP.md + 14-CONTEXT.md] Recommendation: keep Phase 14 parity whole-repo and explicitly record whether Phase 12's note is resolved or still unrelated to cutover release. [VERIFIED: .planning/ROADMAP.md + 14-CONTEXT.md]
3. **What is the final JSON schema for each migration record?** What we know: paths, ownership, release gates, provenance requirements, and conflict classes are locked, while exact field names are discretionary. [VERIFIED: 14-CONTEXT.md + 05-02-PLAN.md] Recommendation: make 14-01 define schemas in tests before implementation writes real records. [VERIFIED: tests/runtime-state.test.cjs pattern + 14-CONTEXT.md]

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js | `node --test`, runtime helpers, `bin/install.js` | yes | `v24.14.1` | None needed; package requires `>=22.0.0`. [VERIFIED: local command + package.json] |
| npm | `npm test` | yes | `11.11.0` | Run `node --test tests/*.test.cjs` directly if npm script wrapper fails. [VERIFIED: local command + package.json] |
| git | code review / diff-oriented tests and operator cutover checks | yes | `2.50.1 (Apple Git-155)` | Use direct file lists only for local tests if git metadata is unavailable. [VERIFIED: local command + tests/code-review helper output in npm test] |
| ripgrep (`rg`) | local audits and fixture verification | yes | `15.1.0` | Use `grep` or Node filesystem scans if unavailable. [VERIFIED: local command] |
| Installed local GSD skills | parity reference for lifecycle/progress/resume/import/workstreams | yes | files under `/Users/lijiaxin/.codex/skills/gsd-*` were readable | Use local ljx docs only if installed reference files are missing. [VERIFIED: mandatory file reads] |
| Installed local Auto `research-pipeline` skill | parity reference for research umbrella intent | yes | file under `/Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md` was readable | Use preserved upstream Auto archive from preview install if local skill is missing. [VERIFIED: mandatory file read + tests/skill-build.test.cjs] |

**Missing dependencies with no fallback:** none found for the local Phase 14 research scope. [VERIFIED: local command audit + package.json]

**Missing dependencies with fallback:** none required for planning; no external service dependency was found in the audited local files. [VERIFIED: rg service audit]

## Validation Architecture

Validation is included because `.planning/config.json` does not explicitly set `workflow.nyquist_validation` to `false`. [VERIFIED: .planning/config.json + workflow instruction]

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node built-in test runner via `node --test`; package version `ljx-gsd@0.1.0`. [VERIFIED: package.json + npm test] |
| Config file | None detected for the test runner; tests are matched by the npm script `node --test tests/*.test.cjs`. [VERIFIED: package.json] |
| Quick run command | `node --test tests/runtime-state.test.cjs tests/runtime-shell.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs`. [VERIFIED: package.json + existing test filenames] |
| Full suite command | `npm test`. [VERIFIED: package.json + npm test] |
| Current baseline | `npm test` passes with 524 tests, 35 suites, 0 failures. [VERIFIED: local command: npm test] |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| IMPL-08 | Migration state families write/read via canonical runtime-state API. [VERIFIED: 05-02-PLAN.md + bin/lib/ljx-runtime-state.cjs] | unit | `node --test tests/runtime-state.test.cjs` | yes, extend existing file. [VERIFIED: tests/runtime-state.test.cjs] |
| IMPL-08 | GSD-like legacy fixture imports to canonical phase/workstream/session state with backup manifest and release gating. [VERIFIED: 14-CONTEXT.md] | integration | `node --test tests/migration-cutover.test.cjs` | no, Wave 0 create. [VERIFIED: local command: ls tests] |
| IMPL-08 | Auto-like research fixture imports direct artifacts into typed phase-chain proposal without claiming stages ran. [VERIFIED: 14-CONTEXT.md + /Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md] | integration | `node --test tests/migration-cutover.test.cjs tests/research-pipeline-cutover.test.cjs` | no, Wave 0 create. [VERIFIED: local command: ls tests] |
| IMPL-08 | Mixed fixture separates promoted workstreams, suggested branches, archived residue, and blocking conflicts. [VERIFIED: 14-CONTEXT.md + LJX-GSD-DESIGN-DECISION-LOG.md] | integration | `node --test tests/migration-cutover.test.cjs` | no, Wave 0 create. [VERIFIED: local command: ls tests] |
| IMPL-08 | Migration-blocked projects stop normal lifecycle, roadmap mutation, mutating workstream commands, and research-pipeline mutation. [VERIFIED: 14-CONTEXT.md] | integration | `node --test tests/runtime-shell.test.cjs tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/research-pipeline-cutover.test.cjs` | partial; new research-pipeline/migration tests needed. [VERIFIED: existing test files + 14-CONTEXT.md] |
| IMPL-08 | `ljx-GSD-research-pipeline` promotes out of deferred compatibility wrapper only after helper-backed proposal semantics exist. [VERIFIED: 14-CONTEXT.md + bin/lib/manifest.cjs] | unit/integration | `node --test tests/skill-build.test.cjs tests/docs-contract.test.cjs tests/research-pipeline-cutover.test.cjs` | partial; new helper tests needed and existing assertions must change. [VERIFIED: tests/skill-build.test.cjs + tests/docs-contract.test.cjs] |
| IMPL-08 | Preview install copies new helpers and manifest/docs reflect final semantics. [VERIFIED: bin/lib/build-skills.cjs + bin/install.js] | integration | `node --test tests/skill-build.test.cjs` | yes, extend existing file. [VERIFIED: tests/skill-build.test.cjs] |
| IMPL-08 | Current repo `progress` / `next` routing and Phase 04-06 reconciliation are truthful. [VERIFIED: .planning/STATE.md + 14-CONTEXT.md] | integration/smoke | `node --test tests/runtime-shell.test.cjs && node "/Users/lijiaxin/.codex/get-shit-done/bin/gsd-tools.cjs" init phase-op 14` | partial; add fixture/current-state assertion in Phase 14. [VERIFIED: tests/runtime-shell.test.cjs + gsd-tools init output] |
| IMPL-08 | Whole-repo regression parity remains green. [VERIFIED: 14-CONTEXT.md] | full suite | `npm test` | yes; current baseline green. [VERIFIED: npm test] |

### Sampling Rate

- **Per task commit:** run the narrow touched test file plus one affected contract test, for example `node --test tests/migration-cutover.test.cjs tests/runtime-state.test.cjs`. [VERIFIED: package.json + 14-CONTEXT.md]
- **Per wave merge:** run `node --test tests/runtime-state.test.cjs tests/runtime-shell.test.cjs tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs` after helper surface changes. [VERIFIED: existing test files + Phase 14 scope]
- **Phase gate:** run `npm test`, `node bin/install.js --print-manifest`, and `node bin/install.js --preview` before `/gsd-verify-work`. [VERIFIED: package.json + bin/install.js + 14-CONTEXT.md]

### Wave 0 Gaps

- [ ] `tests/migration-cutover.test.cjs` - covers legacy GSD-like, Auto-like, mixed, conflict/repair/release, suggested-branch, and backup/report fixtures. [VERIFIED: 14-CONTEXT.md + local command: ls tests]
- [ ] `tests/research-pipeline-cutover.test.cjs` - covers helper-backed proposal, no hidden Auto linear pipeline, migration-blocked stop, and admin-helper handoff. [VERIFIED: 14-CONTEXT.md + bin/lib/codex-conversion.cjs]
- [ ] Extend `tests/runtime-state.test.cjs` - covers migration state families and malformed migration family records. [VERIFIED: tests/runtime-state.test.cjs + 05-02-PLAN.md]
- [ ] Extend `tests/runtime-shell.test.cjs` - covers migration-blocked progress/next and current repo routing. [VERIFIED: tests/runtime-shell.test.cjs + 14-CONTEXT.md]
- [ ] Extend `tests/roadmap-admin-bridge.test.cjs` - covers add/insert/remove blocked during migration-blocked state. [VERIFIED: tests/roadmap-admin-bridge.test.cjs + 14-CONTEXT.md]
- [ ] Extend `tests/workstreams-bridge.test.cjs` - covers create/switch/resume/complete blocked during migration-blocked state while list/status/progress remain safe. [VERIFIED: tests/workstreams-bridge.test.cjs + 14-CONTEXT.md]
- [ ] Update `tests/skill-build.test.cjs` and `tests/docs-contract.test.cjs` - replace deferred compatibility assertions with final bridge-ready semantics after helper promotion. [VERIFIED: tests/skill-build.test.cjs + tests/docs-contract.test.cjs]

## Security Domain

Security domain is included because `.planning/config.json` does not explicitly disable security enforcement. [VERIFIED: .planning/config.json + workflow instruction]

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | no | Phase 14 does not add authentication behavior; keep any external service credentials out of migration reports. [VERIFIED: 14-CONTEXT.md + rg env audit] |
| V3 Session Management | partial | Existing session-local workstream env keys and session records should be preserved, not renamed. [VERIFIED: bin/lib/ljx-runtime-core.cjs + tests/workstreams-bridge.test.cjs] |
| V4 Access Control | partial | Local file mutation boundaries should use existing planning locks, safe path validation, and managed install conflict checks. [VERIFIED: bin/lib/ljx-roadmap-admin-tools.cjs + bin/lib/ljx-workstreams-tools.cjs + tests/skill-build.test.cjs] |
| V5 Input Validation | yes | Validate state-family paths, workstream names, phase ids, JSON payloads, backup paths, and CLI option values before writes. [VERIFIED: bin/lib/ljx-runtime-state.cjs + bin/lib/ljx-runtime-core.cjs + tests/*cli parser* output from npm test] |
| V6 Cryptography | no | Phase 14 has no new cryptographic primitive or secret storage requirement in the local scope. [VERIFIED: 14-CONTEXT.md + rg env audit] |

### Known Threat Patterns for Local CLI/File-State Migration

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Path traversal through legacy artifact names | Tampering | Normalize and validate paths through existing runtime-core/state patterns; reject unsafe phase/workstream/session names before writes. [VERIFIED: bin/lib/ljx-runtime-core.cjs + tests/runtime-core.test.cjs] |
| Symlink or unmanaged install overwrite during preview/install | Tampering | Keep `build-skills.cjs` conflict/symlink checks and add new helper copy assertions. [VERIFIED: bin/lib/build-skills.cjs + tests/skill-build.test.cjs] |
| State poisoning via malformed JSON migration records | Tampering / Denial of Service | Read malformed records honestly and stop with structured errors instead of falling back to legacy routing. [VERIFIED: bin/lib/ljx-runtime-state.cjs + tests/runtime-state.test.cjs + tests/runtime-shell.test.cjs] |
| Hidden second control plane via `research-pipeline` | Elevation of privilege / Tampering | Require helper-backed proposal and roadmap admin mutation boundary; do not run upstream Auto pipeline directly. [VERIFIED: 14-CONTEXT.md + /Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md] |
| Secret leakage into migration reports | Information disclosure | Treat env/secrets as environment-only and avoid serializing values into reports. [VERIFIED: rg env audit + LJX-GSD-PARAMETER-DICTIONARY.md] |
| Race or partial writes during migration release | Tampering / Denial of Service | Use existing planning lock and rollback patterns for mutation-adjacent operations; ensure release record is written only after backup/report/state validation. [VERIFIED: bin/lib/ljx-planning-lock.cjs via roadmap/workstream helpers + tests/roadmap-admin-bridge.test.cjs + 14-CONTEXT.md] |

## Sources

### Primary (HIGH confidence)

- `.planning/phases/14-complete-migration-cutover-and-parity-verification/14-CONTEXT.md` - locked Phase 14 decisions, discretion, deferred scope, canonical references. [VERIFIED: mandatory read]
- `.planning/ROADMAP.md` - Phase 14 goal, requirements, plan slots, Phase 04-06 baseline status. [VERIFIED: mandatory read]
- `.planning/REQUIREMENTS.md` - `IMPL-08` migration cutover requirement. [VERIFIED: mandatory read]
- `.planning/STATE.md` - current blockers, pending todos, Phase 04-06 progress issue, migration risks. [VERIFIED: mandatory read]
- `.planning/PROJECT.md` - project constraints for migration bridge, `.planning` authority, behavior reuse, minimal modification. [VERIFIED: mandatory read]
- `.planning/IMPLEMENTATION-LESSONS.md` - generated output as product, shared rule ownership, semantic reuse lessons. [VERIFIED: mandatory read]
- `.planning/phases/05-migration-and-parallelism-strategy/05-CONTEXT.md` and `05-01/02/03-PLAN.md` - migration architecture, state families, reports, cutover order. [VERIFIED: mandatory read]
- `.planning/phases/13-complete-workstream-and-roadmap-mutation-admin/13-CONTEXT.md` - admin/workstream helper boundaries and research-pipeline deferral. [VERIFIED: mandatory read]
- `LJX-GSD-DESIGN-DECISION-LOG.md`, `LJX-GSD-ARCHITECTURE.md`, `LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md`, `LJX-GSD-USER-SKILL-GUIDE.md` - accepted local design and public contract docs. [VERIFIED: mandatory read]
- `bin/lib/ljx-runtime-state.cjs`, `ljx-runtime-core.cjs`, `ljx-state-tools.cjs`, `ljx-roadmap-admin-tools.cjs`, `ljx-workstreams-tools.cjs`, `codex-conversion.cjs`, `build-skills.cjs`, `manifest.cjs`, `bin/install.js` - current helper and generated/install boundaries. [VERIFIED: mandatory read]
- `tests/runtime-state.test.cjs`, `runtime-core.test.cjs`, `runtime-shell.test.cjs`, `roadmap-admin-bridge.test.cjs`, `workstreams-bridge.test.cjs`, `skill-build.test.cjs`, `docs-contract.test.cjs` - current test patterns and assertions to extend/update. [VERIFIED: mandatory read]
- `/Users/lijiaxin/.codex/skills/gsd-progress/SKILL.md`, `gsd-resume-work/SKILL.md`, `gsd-import/SKILL.md`, `gsd-workstreams/SKILL.md`, `research-pipeline/SKILL.md` - installed local GSD/Auto semantic references. [VERIFIED: mandatory read]
- `package.json`, `.planning/config.json`, `npm test`, `node bin/install.js --print-manifest`, local tool version commands, and local `rg` audits. [VERIFIED: local commands]

### Secondary (MEDIUM confidence)

- None. This research intentionally used local implementation and installed local semantic references rather than web search because Phase 14 is local architecture/reuse work, not ecosystem selection. [VERIFIED: user objective + 14-CONTEXT.md]

### Tertiary (LOW confidence)

- None used for implementation recommendations. [VERIFIED: research notes]

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - all owners are local helper modules or explicitly recommended bounded helpers derived from locked Phase 14 discretion. [VERIFIED: bin/lib/*.cjs + 14-CONTEXT.md]
- Architecture: HIGH - migration state/report/release rules and no-second-control-plane constraints are locked in Phase 5/14 docs and existing helper boundaries are local. [VERIFIED: 05-02-PLAN.md + 14-CONTEXT.md + bin/lib/*.cjs]
- Pitfalls: HIGH - each pitfall is grounded in current docs/tests or explicit current manifest state. [VERIFIED: .planning/STATE.md + tests/skill-build.test.cjs + tests/docs-contract.test.cjs + node bin/install.js --print-manifest]
- Exact new helper filenames: MEDIUM - names are recommended for clarity but Phase 14 leaves exact filenames to implementation discretion. [VERIFIED: 14-CONTEXT.md]
- Security mapping: MEDIUM - local threat patterns are verified against code/tests, while ASVS category labeling is a planning-level mapping. [VERIFIED: bin/lib/*.cjs + tests/*.test.cjs] [ASSUMED]

**Research date:** 2026-04-12 [VERIFIED: environment current_date]
**Valid until:** 2026-05-12 for local architecture if the helper surfaces do not change first. [ASSUMED]
