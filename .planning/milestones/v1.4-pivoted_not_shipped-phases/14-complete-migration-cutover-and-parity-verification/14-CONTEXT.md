# Phase 14: Migration Cutover And Parity Verification - Context

**Gathered:** 2026-04-12
**Status:** Ready for research and planning
**Mode:** User-directed defaulting: use the closest installed local GSD/Auto implementation semantics wherever a comparable boundary exists; where no comparable local boundary exists, choose the lowest-drift approach from accepted ljx-GSD project rules.

<domain>
## Phase Boundary

This phase completes the first usable `ljx-GSD` migration cutover. It turns the accepted Phase 4-6 migration architecture and Phase 7-13 runtime slices into a bridge-ready implementation that can import legacy GSD and Auto artifacts, release migrated projects back to normal lifecycle routing, complete the `ljx-GSD-research-pipeline` umbrella without creating a second control plane, and verify parity across lifecycle, research, paper, and admin surfaces.

This phase is responsible for:

- implementing the migration import, conflict, repair, suggested-branch, and release record flow under canonical `.planning/state/migration/` families and root migration reports
- exposing migration-safe command behavior through existing bridge surfaces, especially `ljx-GSD-progress`, `ljx-GSD-help`, and explicit helper-backed import/inspect/conflict/repair/release actions
- promoting `ljx-GSD-research-pipeline` from a compatibility wrapper to bridge-ready semantics only if it stays inside the formal typed phase chain and helper-backed roadmap admin boundary
- verifying end-to-end parity across installed/generated skills, preview install output, runtime helpers, docs, and regression tests before any wider cutover claim
- reconciling the known Phase 04-06 accepted-baseline evidence gap enough that stock GSD progress/session routing no longer misrepresents the active milestone

This phase is not responsible for:

- replacing globally installed production skills outside this repo before parity verification
- inventing a new migration root outside `.planning/`
- making legacy files active control inputs after successful import
- turning `research-pipeline`, migration tooling, hooks, or adapters into independent control planes
- deleting GSD or Auto capability as a shortcut to a green result

</domain>

<decisions>
## Implementation Decisions

### Reference hierarchy and defaulting

- **D-01:** For every migration and research-pipeline boundary, implementation should first reuse or mirror the closest installed local GSD/Auto behavior. GSD is preferred for lifecycle, roadmap, workstream, pause/resume, routing, and `STATE.md` discipline. Auto is preferred for research-stage intent, paper/rebuttal stage structure, review-loop/refine-loop semantics, and direct research workflow user expectations.
- **D-02:** When an installed local GSD/Auto behavior conflicts with accepted ljx-GSD project invariants, the accepted ljx-GSD invariant wins. The most important invariants are one authoritative `.planning/` state substrate, no second control plane, read legacy broadly / normalize once / write new truth only, and minimal modification as semantic reuse rather than surface-only reuse.
- **D-03:** When no useful local GSD/Auto reference exists, implementation may use project-local best judgment, but it must document the boundary and keep the solution narrow, helper-backed, test-covered, and aligned with existing runtime helpers.

### Migration import and release semantics

- **D-04:** The import flow must preserve the Phase 5 locked rule: read legacy broadly, normalize once, write new truth only.
- **D-05:** The one-shot project/workspace import remains the default. Incremental per-phase import should not become the default migration behavior in Phase 14.
- **D-06:** Migration detection and preflight should be visible and guided. In safe/default mode, import must generate a migration summary and require confirmation before writing converted state.
- **D-07:** Normal lifecycle, roadmap mutation, umbrella orchestration, and mutating workstream commands remain blocked while a project is migration-blocked. `progress`, `help`, explicit import/inspect/conflict-review/repair/release actions, `pause-work`, and `resume-work` remain the safe command surface.
- **D-08:** Legacy artifacts must move to or be represented under `.planning/legacy-backups/{source_family}/{session_id}/original/` with exact relative path preservation, plus `manifest.json` and `conversion-report.md`. Backups are archival evidence only, never active control truth.
- **D-09:** Structured migration runtime truth must live under `.planning/state/migration/` using the accepted families: `import-sessions`, `conflict-reports`, `repair-bundles`, `releases`, `promotions`, and `suggested-branches`.
- **D-10:** Human-readable migration reports must use the accepted root/report surface: `.planning/MIGRATION_SUMMARY.md`, `.planning/CONFLICT_REPORT.md`, `.planning/REPAIR_BUNDLE.md`, `.planning/SUGGESTED_BRANCHES.md`, `.planning/migration/promotions/{promotion_id}-DIFF.md`, and backup `conversion-report.md`.
- **D-11:** Reports explain and recommend. They may not override structured state or become control truth.
- **D-12:** Release from migration-blocked state requires a structured release record proving import completion, no unresolved blocking conflicts, complete backup/report output, consistent roadmap/state/phase/artifact references, and resolvable current position plus `next` routing.

### Conflict, repair, and suggested branch boundaries

- **D-13:** New structured `.planning` state wins by default over legacy-derived values when they disagree. Reverse application of legacy values over new state requires explicit import/repair override.
- **D-14:** Blocking conflicts include graph reconstruction failure, unresolved current position, irreconcilable control-field contradictions, core artifact attachment failure, structured-state integrity failure, incomplete backup output, and unrecoverable key-input damage.
- **D-15:** Non-blocking conflicts include duplicate summaries, optional artifact gaps, naming/timestamp drift, low-value metadata drift, safely archivable unmapped residue, and obsolete historical leftovers.
- **D-16:** Low-risk auto-repairs may include index repair, reference relinking, non-semantic naming normalization, duplicate low-value archive marking, and non-blocking metadata cleanup.
- **D-17:** Repairs that change phase graph semantics, `phase_type`, active phase, completion state, milestone position, core artifact ownership, backup completeness, legacy overwrite direction, or `next` routing require explicit repair action or human confirmation.
- **D-18:** Suggested branches stay out of formal workstream state and default `next` routing until explicitly promoted. Promotion must record lineage, selected baseline, diff-summary reference, current-primary reference, and resulting workstream id.

### `research-pipeline` cutover

- **D-19:** `ljx-GSD-research-pipeline` remains public and should graduate from compatibility-wrapper-only status in this phase if the implementation can stay within helper-backed phase-chain semantics.
- **D-20:** The bridge-ready `research-pipeline` must not run a hidden linear upstream Auto pipeline. It must inspect the current roadmap and structured phase records, propose reuse/create/repair of formal typed phases, route structural mutations through helper-backed `add-phase`, `insert-phase`, and `remove-phase`, then recommend the next explicit `ljx-GSD-*` stage command.
- **D-21:** `research-pipeline` may consume direct research artifacts already present in the active workstream as evidence for phase-chain proposal and routing, but it must not claim downstream research stages ran unless phase-local artifacts and structured state prove they did.
- **D-22:** The default stage chain remains discovery -> refine -> experiment -> analysis -> paper, with Auto stage intent preserved through the existing bridge-ready direct commands.

### Parity and cutover evidence

- **D-23:** Phase 14 parity is whole-repo, not phase-local only. Runtime helpers, generated skills, preview/install output, docs/state, tests, GSD/Auto reuse, migration fixtures, and minimum-modification compliance all count.
- **D-24:** Parity verification must include at least: a legacy GSD-like fixture, an Auto-like research fixture, a mixed fixture, current repo `progress` / `next` routing, generated skill wording, preview install, docs contract tests, targeted migration tests, targeted `research-pipeline` tests, and full `npm test`.
- **D-25:** Wider cutover is not allowed until parity reports show that bridge-ready preview shells can be replaced with final accepted semantics without breaking existing projects.
- **D-26:** Global installed production skills remain out of scope until Phase 14 parity passes in-repo.

### Phase 04-06 evidence reconciliation

- **D-27:** The known stock `gsd-tools` progress issue for accepted-baseline Phases 04-06 is in Phase 14 scope as a minimal reconciliation task. The goal is not to rewrite accepted history; it is to prevent progress/session tooling from treating accepted architecture baselines as unexecuted work.
- **D-28:** The reconciliation should prefer a small evidence/backfill or routing fix that preserves the accepted baseline status in `ROADMAP.md`, `STATE.md`, requirements traceability, and runtime progress output.

### the agent's Discretion

- Exact helper filenames and CLI subcommand names for migration internals, provided the public/operator surfaces remain understandable and docs/tests match.
- Exact JSON schema field names for migration records, provided accepted state-family paths, ownership, release gates, and provenance fields are preserved.
- Exact fixture layout for migration parity tests, provided it covers GSD-like, Auto-like, mixed, and current-repo cases.
- Exact implementation split across existing helpers versus a new small migration helper, provided rules are not duplicated across adapters and generated skills stay thin.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase and project contracts

- `.planning/ROADMAP.md` - Phase 14 goal, success criteria, plan slots, and dependency on Phase 13.
- `.planning/REQUIREMENTS.md` - `IMPL-08` and migration/research requirements traceability.
- `.planning/PROJECT.md` - project-level GSD/Auto preservation, `.planning` authority, and minimal-modification guardrails.
- `.planning/STATE.md` - current focus, known blockers, pending todos, and Phase 04-06 progress reconciliation risk.
- `.planning/IMPLEMENTATION-LESSONS.md` - semantic reuse, generated output, malformed path, and review-depth lessons from Phases 07-13.

### Locked migration decisions

- `.planning/phases/05-migration-and-parallelism-strategy/05-CONTEXT.md` - locked migration direction, conflict, repair, blocked-state, workstream, suggested-branch, and promotion defaults.
- `.planning/phases/05-migration-and-parallelism-strategy/05-01-PLAN.md` - import/normalization, validation/conflict/repair, and workstream/suggested-branch engine work packages.
- `.planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md` - canonical migration state-family namespaces and report contracts.
- `.planning/phases/05-migration-and-parallelism-strategy/05-03-PLAN.md` - execution cutover order and `research-pipeline` placement in the rewrite waves.
- `LJX-GSD-DESIGN-DECISION-LOG.md` - accepted migration, research-pipeline, phase/workstream/workspace, and minimal-modification decisions.
- `LJX-GSD-ARCHITECTURE.md` - accepted control-plane, research-core, and no-second-control-plane architecture.
- `LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md` - current public contract for `research-pipeline` and helper-backed roadmap admin commands.
- `LJX-GSD-USER-SKILL-GUIDE.md` - current installed/preview truth and user-facing migration guidance.

### Existing implementation references

- `bin/lib/ljx-runtime-state.cjs` - accepted structured state family registry and read/write helpers.
- `bin/lib/ljx-runtime-core.cjs` - `.planning` resolution, phase/workstream parsing, config, and malformed path handling.
- `bin/lib/ljx-state-tools.cjs` - `progress`, `next`, pause/resume, and lifecycle recommendation behavior.
- `bin/lib/ljx-roadmap-admin-tools.cjs` - helper-backed phase-chain mutation behavior that `research-pipeline` must reuse instead of editing roadmap state directly.
- `bin/lib/ljx-workstreams-tools.cjs` - primary/secondary workstream semantics and structured pointer behavior.
- `bin/lib/codex-conversion.cjs` - generated skill wording, current `research-pipeline` compatibility wrapper, and bridge-honesty language.
- `bin/lib/build-skills.cjs` - preview/install runtime helper copy and generated-skill output.
- `bin/lib/manifest.cjs` - bridge-ready versus deferred manifest truth, especially `ljx-GSD-research-pipeline`.
- `bin/install.js` - preview/install manifest output and compatibility-skill handling.

### Existing test references

- `tests/runtime-state.test.cjs` - structured state-family safety coverage.
- `tests/runtime-core.test.cjs` - runtime path and phase/workstream resolution coverage.
- `tests/runtime-shell.test.cjs` - lifecycle shell routing and direct artifact adoption coverage.
- `tests/lifecycle-state-sync.test.cjs` - lifecycle state sync behavior.
- `tests/roadmap-admin-bridge.test.cjs` - helper-backed roadmap mutation and dependency safety coverage.
- `tests/workstreams-bridge.test.cjs` - workstream mutation and active pointer coverage.
- `tests/skill-build.test.cjs` - generated skill, manifest, preview install, and preserved asset coverage.
- `tests/docs-contract.test.cjs` - documentation truthfulness and compatibility-wrapper overpromise prevention.

### Upstream local implementation references

- `/Users/lijiaxin/.codex/skills/gsd-progress/SKILL.md` - installed GSD progress behavior reference.
- `/Users/lijiaxin/.codex/skills/gsd-resume-work/SKILL.md` - installed GSD resume/handoff behavior reference.
- `/Users/lijiaxin/.codex/skills/gsd-import/SKILL.md` - installed GSD import workflow reference where applicable.
- `/Users/lijiaxin/.codex/skills/gsd-workstreams/SKILL.md` - installed GSD workstreams behavior reference.
- `/Users/lijiaxin/.codex/skills/research-pipeline/SKILL.md` - installed Auto research-pipeline intent reference.
- `/Users/lijiaxin/.codex/skills/idea-discovery/SKILL.md` - installed Auto discovery stage intent reference.
- `/Users/lijiaxin/.codex/skills/research-refine/SKILL.md` - installed Auto refinement stage intent reference.
- `/Users/lijiaxin/.codex/skills/experiment-plan/SKILL.md` - installed Auto experiment-planning stage intent reference.
- `/Users/lijiaxin/.codex/skills/experiment-bridge/SKILL.md` - installed Auto experiment execution bridge intent reference.
- `/Users/lijiaxin/.codex/skills/result-to-claim/SKILL.md` - installed Auto claim-judgment stage intent reference.
- `/Users/lijiaxin/.codex/skills/paper-writing/SKILL.md` - installed Auto paper pipeline intent reference.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `ljx-runtime-state.cjs`: already centralizes supported state families. Phase 14 should extend it for migration families instead of writing ad hoc `.planning/state/migration` paths from multiple helpers.
- `ljx-state-tools.cjs`: already owns `progress`, `next`, pause/resume, and recommendation behavior. Migration-blocked routing should integrate here so normal lifecycle gates stop in one place.
- `ljx-roadmap-admin-tools.cjs`: already owns helper-backed add/insert/remove semantics. `research-pipeline` must call or recommend these paths, not hand-edit `ROADMAP.md` or phase records.
- `ljx-workstreams-tools.cjs`: already owns `primary` and secondary workstream mutation semantics. Migration workstream import/promotion should reuse its record shape and safety checks.
- `codex-conversion.cjs` and `build-skills.cjs`: already generate skill text and install/runtime surfaces. Any new migration or research-pipeline behavior must update these and their tests together.
- `manifest.cjs`: already records `ljx-GSD-research-pipeline` as deferred with a compatibility wrapper. Phase 14 should change this only when runtime helper behavior and generated skill wording are bridge-ready.

### Established Patterns

- Context reads should not mutate `.planning/state`.
- Mutations should go through explicit helper commands.
- Generated skills should be thin and helper-driven.
- Structured state is routing/link/continuity truth; markdown remains human-readable operator surface and phase-local evidence.
- Build/install output is part of the product surface and must be tested with runtime code.
- Whole-repo review and verification are required for completion, not a narrow Phase 14 diff-only check.

### Integration Points

- Add migration state family support in `ljx-runtime-state.cjs`.
- Add migration detection, blocked routing, import/release status, and next-action behavior in shared state/runtime helpers.
- Add a bounded migration helper if shared rules would otherwise be duplicated.
- Promote `research-pipeline` in `manifest.cjs`, `codex-conversion.cjs`, generated skill tests, docs contract tests, and user guide only after helper-backed semantics exist.
- Add fixtures/tests that exercise GSD-like legacy artifacts, Auto-like root artifacts, mixed projects, and current repo parity.

</code_context>

<specifics>
## Specific Ideas

- Treat the user's instruction as the discuss-phase decision: "closest installed local GSD/Auto first; project-local best judgment where no reference exists."
- Make Phase 14 plans map closely to the roadmap slots:
  - 14-01: migration import/conflict/repair/release flow
  - 14-02: final bridge-ready `research-pipeline`
  - 14-03: parity verification across lifecycle/research/paper/admin surfaces
  - 14-04: operator cutover docs plus Phase 04-06 progress reconciliation
- The Phase 04-06 reconciliation should be minimal and auditable because those phases are accepted baselines, not unexecuted implementation plans.

</specifics>

<deferred>
## Deferred Ideas

- Global production skill replacement after in-repo Phase 14 parity passes.
- Rich UI/TUI for migration reports.
- Multi-project migration assistant.
- Full visual diff tooling for migration conversion reports.
- Provider-specific review backend promotion as core identity.

</deferred>

---

*Phase: 14-complete-migration-cutover-and-parity-verification*
*Context gathered: 2026-04-12*
