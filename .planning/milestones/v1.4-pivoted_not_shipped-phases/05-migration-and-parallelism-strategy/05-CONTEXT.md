# Phase 5: Migration And Parallelism Strategy - Context

**Gathered:** 2026-04-09
**Status:** Discuss in progress

## Phase Boundary

This phase defines how the current GSD and Auto world should transition into `ljx-GSD` without breaking workflow continuity or creating ambiguous parallel truths.

This phase is responsible for:

- defining how legacy GSD and Auto artifacts remain readable during migration
- defining how legacy artifacts are converted into `ljx-GSD`-native state and artifact forms
- defining what happens to legacy artifacts after conversion
- defining workstream-safe parallel semantics under the unified state model
- defining staged cutover checkpoints between the current and future systems

This phase is not responsible for:

- rewriting installed skills
- final hook ownership rules
- provider-specific or optional-pack behavior
- changing the authoritative root away from `.planning/`

## Locked Decisions

### Migration direction
- **D-01:** `ljx-GSD` must be able to read old GSD `.planning/` artifacts and old Auto root-level artifacts.
- **D-02:** `ljx-GSD` must be able to transform legacy inputs into the new `ljx-GSD` file style and state format.
- **D-03:** After conversion, legacy files should no longer participate in future decision-making as authoritative sources.
- **D-04:** When legacy artifact content and new structured `.planning/` state disagree, the new structured state wins by default.
- **D-05:** Legacy files remain valid as import candidates and diagnostic evidence, but should not silently overwrite the new authoritative state.
- **D-06:** Conflict handling should emit a structured conflict report rather than auto-applying legacy values over new state.
- **D-07:** Any override of the new state with legacy-derived content should require explicit user confirmation or an explicit repair/import flow.

### Legacy artifact handling after conversion
- **D-08:** The preferred default is to move legacy files into one unified backup folder.
- **D-09:** Deleting legacy files entirely is also acceptable, but only after communication with the user or explicit user choice.
- **D-10:** The backup location should be easy for the user to inspect and easy to manually delete later.

### Existing cross-phase constraints that this phase must obey
- **D-11:** `.planning/` remains the authoritative root.
- **D-12:** `phase` remains the public lifecycle unit.
- **D-13:** `workstream` remains a logical parallel branch, not a physical workspace.
- **D-14:** `research-pipeline` may not become a second control plane during migration.

## Migration Interpretation

The currently preferred migration principle is:

- **read legacy broadly**
- **normalize once**
- **write new truth only**

Meaning:

1. `ljx-GSD` may inspect old GSD and Auto artifacts to reconstruct intent, progress, and outputs.
2. Once a conversion/import step succeeds, the normalized `ljx-GSD` representation becomes the only future control truth.
3. Legacy artifacts become backup material, mirror material, or removable leftovers rather than active control inputs.
4. If old files disagree with the new structured state, the new structured state remains authoritative unless the user explicitly chooses a repair/import override.
5. The default conversion trigger should be guided rather than silent: detect legacy inputs, present a structured migration summary, then require confirmation in normal `safe` operation before mutating state.
6. The default parallel migration rule should be shared imported baseline, fork on write: workstreams may share the same imported legacy baseline initially, but once a workstream mutates the imported state or artifacts, it must fork into its own branch-local copy.
7. The default cutover style should be read-old, write-new only: legacy artifacts remain readable during transition, but once imported, future writes should target only the new `ljx-GSD` truth unless an explicit export or compatibility action is requested.
8. The default backup layout should live under `.planning/legacy-backups/`, split first by source family such as `gsd/` and `auto/`, then by timestamped import session.
9. Each backup session should contain:
   - `original/` for preserved legacy files
   - `manifest.json` for machine-readable import metadata
   - `conversion-report.md` for human-readable migration summary
10. Inside each backup session, `original/` should preserve the legacy relative path layout exactly rather than reorganizing files by artifact category.
11. Human-friendly browsing should come from `manifest.json` and `conversion-report.md`, not from mutating the preserved original layout.
12. The default import granularity should be one-shot at the project/workspace migration level rather than incremental by phase or workflow.
13. That one-shot import should spend extra effort on review and validation so context, phase history, and artifact relationships are migrated correctly before the new system proceeds normally.
14. Once a legacy project is detected and one-shot migration is required, normal lifecycle commands should be blocked by default until migration completes and passes validation.
15. During that blocked state, only migration-safe inspection and migration-related actions should remain available by default.
16. The allowed command surface during migration-blocked state should default to:
   - `ljx-GSD-progress`
   - `ljx-GSD-help`
   - dedicated import commands
   - dedicated inspect commands
   - dedicated conflict-review commands
   - dedicated repair commands
   - `ljx-GSD-pause-work`
   - `ljx-GSD-resume-work`
17. The blocked command surface during migration-blocked state should default to:
   - `ljx-GSD-plan-phase`
   - `ljx-GSD-execute-phase`
   - `ljx-GSD-verify-work`
   - `ljx-GSD-next`
   - `ljx-GSD-research-pipeline`
   - `ljx-GSD-add-phase`
   - `ljx-GSD-insert-phase`
   - `ljx-GSD-remove-phase`
   - mutating `ljx-GSD-workstreams` actions such as create, switch, and complete

## Gray Areas Identified

The highest-value remaining gray areas for this phase are:

1. **Phase 5 planning deliverable structure**
   - Which formal tables and spec outputs should `05-RESEARCH` and the first Phase 5 plans produce so implementation can start without reopening the migration semantics?

## Recommended Default Answers For Lower-Priority Items

These are not yet final, but currently recommended unless later discussion overrides them:

- **Conversion trigger:** detect legacy inputs and show a structured migration/import summary first; in `safe` require confirmation, while higher-autonomy modes may auto-apply
- **Cutover style:** read-old, write-new only; keep legacy export or mirror behavior as an explicit compatibility action rather than the default path
- **Backup folder location:** under `.planning/legacy-backups/`
- **Backup organization:** group by source family such as `gsd/` and `auto/`, then timestamped import sessions
- **Backup session contents:** `original/`, `manifest.json`, `conversion-report.md`
- **Backup path preservation:** keep the original relative path layout exactly inside `original/`
- **Import granularity:** perform one-shot import at the project/workspace migration level rather than incremental phase-by-phase import
- **Lifecycle gating after import detection:** block normal lifecycle commands until the one-shot migration completes and passes validation
- **Blocked-state allowed commands:** keep only `progress`, `help`, explicit import/inspect/conflict-review/repair actions, and `pause-work` / `resume-work`
- **Blocked-state disallowed commands:** keep lifecycle, roadmap mutation, umbrella research orchestration, and mutating workstream actions blocked until validation passes
- **Migration validation pass criteria:** require all of the following before lifting migration blocking:
  - one-shot import has completed with no unresolved blocking conflict
  - `ROADMAP.md`, `STATE.md`, typed phases, and phase ordering/dependencies have been reconstructed
  - structured state and phase artifacts reference each other consistently with no orphan artifact or dangling reference
  - legacy backup session is complete with `original/`, `manifest.json`, and `conversion-report.md`
  - import summary and conflict report have been generated, and in `safe` mode they have been human-confirmed
  - the system can resolve current active phase, current position, and next-action routing without remaining in a half-migrated state
- **Blocking conflicts:** treat the following as blocking by default:
  - phase graph cannot be reconstructed reliably, including numbering, ordering, `phase_type`, or dependency contradictions
  - current active phase or current position cannot be resolved
  - high-weight control fields conflict without a safe default tie-break, such as completion state, active phase pointer, milestone position, or next-route target
  - core artifacts cannot be attached reliably to a phase or structured state object
  - structured state integrity fails, including dangling references, orphan core artifacts, or missing required objects
  - backup output is incomplete, including missing `original/`, `manifest.json`, or `conversion-report.md`
  - key legacy inputs are damaged or contradictory enough that the mainline cannot be reconstructed safely
- **Non-blocking conflicts:** treat the following as non-blocking by default:
  - duplicate summaries, duplicate notes, or duplicate review records
  - optional artifact gaps such as poster, slides, or other non-core outputs
  - timestamp, naming-style, or directory-shape inconsistencies
  - low-value metadata drift such as stale labels or legacy parameter remnants
  - legacy files that cannot be mapped precisely to a new object but do not affect the main phase mainline
  - historical residue from non-current branches or obsolete experiment runs that can be archived without breaking current control truth
- **Repair suggestion behavior:** generate repair suggestions automatically by default when migration conflicts or integrity gaps are found, rather than requiring the user to infer the repair path manually
- **Auto-applicable repairs:** allow direct application by default only for low-risk structural fixes such as:
  - pure index repair
  - reference backfilling or relinking
  - non-semantic naming normalization
  - archive marking for duplicate low-value artifacts
  - non-blocking metadata cleanup
- **Repairs requiring explicit repair command or human confirmation:** require an explicit repair action for:
  - any change to phase graph, `phase_type`, active phase, completion state, or milestone position
  - any reassignment of core artifact ownership
  - any repair that overwrites current new-state truth with legacy-derived content
  - any repair that deletes core legacy originals or weakens backup completeness
  - any repair that changes `next` routing outcomes
- **Auto-repair execution timing:** in `safe`, stage auto-applicable low-risk repairs as one visible repair bundle inside the migration summary and apply them only when the user confirms the import; in `autonomous`, allow inline application of those same low-risk repairs, but log them fully in `manifest.json` and `conversion-report.md`
- **Legacy parallel-line mapping default:** create one primary workstream by default during migration, and only auto-create additional formal workstreams when a legacy parallel line is clear, stable, and separable; otherwise keep the extra material as archived residue or a suggested branch under the primary imported mainline
- **Threshold for auto-creating additional workstreams:** require all of the following before creating an additional formal workstream automatically:
  - the legacy parallel line has a clear independent theme, hypothesis, or objective
  - it shows a continuous artifact chain rather than one-off residue
  - it can map to a relatively independent set of phases or a coherent phase subchain
  - it does not rely on sharing the same active control truth as the primary mainline
  - importing it as a formal workstream would not make current position or `next` routing ambiguous
- **Imported workstream naming and ordering:** choose the primary imported workstream by mainline fit rather than by file count or lexical ordering, prioritizing the legacy line that is closest to the current active position, has the most complete phase chain, has the clearest control truth, and shows the strongest recent continuity; name additional imported workstreams with a stable `imported-` prefix plus a short semantic theme name, using an ordinal only when a stable theme name is insufficient
- **Suggested branch vs archived residue:** surface a non-promoted legacy parallel line as a suggested branch only when it still has a reasonably clear independent theme, at least some continuity beyond pure fragments, ongoing future value, and no strong naming or semantic collision with the imported primary line or formal workstreams; otherwise archive it as residue and keep it visible only through backup and migration reports
- **Suggested-branch visibility and storage:** do not represent suggested branches as formal workstream state objects and do not include them in default `next` routing; instead, list them explicitly in the migration report and store them in a lightweight migration-side index such as `.planning/state/migration/suggested-branches.json`, paired with a human-readable summary such as `.planning/SUGGESTED_BRANCHES.md`
- **Suggested-branch promotion path:** do not allow suggested branches to enter formal workstream state through implicit `next` behavior; require an explicit promotion flow, and before promotion require checks that:
  - the branch theme is still valid rather than obsolete residue
  - it can map cleanly to a coherent phase or phase subchain
  - promotion would not collide semantically with existing primary or imported workstreams
  - current position and `next` routing would remain unambiguous after promotion
- **Suggested-branch promotion baseline:** do not hard-code a default promotion baseline; require explicit user choice between promoting from the preserved migrated branch snapshot, promoting from the current primary baseline, or any later supported baseline mode
- **Promotion diff-summary requirement:** when a suggested branch is promoted, always show a summary comparing the chosen promotion baseline against the current primary mainline before finalizing promotion, including at least phase-chain differences, active-position differences, key artifact differences, and the expected impact on workstream structure and `next` routing
- **Promoted-workstream activation default:** promotion should create the formal workstream but should not auto-switch the current session into it; the promoted workstream remains inactive until an explicit switch or resume action
- **Promotion lineage and provenance recording:** whenever a suggested branch is promoted into a formal workstream, record at least:
  - the source suggested-branch identifier
  - the baseline mode chosen by the user for promotion
  - the current primary workstream reference at promotion time
  - a reference to the diff summary shown before promotion
  - promotion timestamp and actor
  - the resulting formal workstream identifier
- **Phase 5 discuss exit criteria:** Phase 5 discuss is considered sufficiently settled for planning once the migration rules can already support:
  - a legacy import specification
  - a conflict classification specification
  - a repair specification
  - a workstream migration specification
  - a suggested-branch promotion specification
  - and there are no remaining unresolved questions that would directly change the `.planning` truth model, `next` routing semantics, or workstream meaning
- **Phase 5 planning deliverable structure:** structure `05-RESEARCH` around five formal matrices:
  - `Legacy Object Mapping Matrix`
  - `Conflict And Repair Matrix`
  - `Migration Gating Matrix`
  - `Workstream Migration Matrix`
  - `Promotion Provenance Matrix`
- **Phase 5 first implementation-plan structure:** structure `05-01-PLAN` around three work packages:
  - `Import And Normalization Engine`
  - `Validation Conflict Repair Engine`
  - `Workstream And Suggested-Branch Engine`
- **Post-conversion legacy role:** backup only by default, not live mirror
- **User cleanup path:** allow simple manual deletion of the backup folder after confirmation the new state is correct
- **Parallel migration semantics:** share imported baseline first, then fork on first write at the workstream level

## The Agent's Discretion

- exact naming of backup subfolders
- exact timestamp/session naming convention
- exact import-report format

## Deferred Ideas

- automatic cleanup tooling for old backup folders
- diff visualizers for legacy-to-new conversion reports
- workspace-wide multi-project migration assistant

---

*Phase: 05-migration-and-parallelism-strategy*
*Context gathered: 2026-04-09*
