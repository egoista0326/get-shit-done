# Phase 5: Migration And Parallelism Strategy - Research

**Gathered:** 2026-04-09
**Status:** Matrices 1-5 initial draft filled

This research artifact converts the accepted Phase 5 discuss decisions into implementation-ready matrices.

## Matrix 1: Legacy Object Mapping Matrix

| Legacy Source Family | Legacy Artifact / Object | Legacy Role | ljx-GSD Target Object | ljx-GSD Target Artifact / State Location | Migration Notes |
|---|---|---|---|---|---|
| GSD | `.planning/PROJECT.md` | Project charter, constraints, key decisions | `project_charter` | `.planning/PROJECT.md` | Keep path stable; remains authoritative for project identity and hard constraints |
| GSD | `.planning/REQUIREMENTS.md` | Requirement inventory and completion trace | `requirements_register` | `.planning/REQUIREMENTS.md` | Keep path stable; migrate formatting only if needed, not semantics |
| GSD | `.planning/ROADMAP.md` | Phase sequence, dependencies, plan inventory | `roadmap` | `.planning/ROADMAP.md` | Keep path stable; authoritative for expected phase structure |
| GSD | `.planning/STATE.md` | Runtime position, blockers, session continuity | `runtime_state` | `.planning/STATE.md` | Keep path stable; remains the human-readable runtime truth mirror |
| GSD | `.planning/phases/{phase}/{phase_num}-CONTEXT.md` | Locked phase decisions and constraints | `phase_context` | `.planning/phases/{phase_id}/{phase_num}-CONTEXT.md` plus `.planning/state/phase-records/{phase_id}.json` | Preserve markdown artifact; structured mirror should index locked decisions |
| GSD | `.planning/phases/{phase}/{phase_num}-RESEARCH.md` | Pre-plan research and implementation findings | `phase_research_brief` | `.planning/phases/{phase_id}/{phase_num}-RESEARCH.md` | Evidence artifact, not control truth |
| GSD | `.planning/phases/{phase}/{phase}-{plan}-PLAN.md` | Execution contract for a plan | `phase_plan_contract` | `.planning/phases/{phase_id}/{phase_num}-{plan_num}-PLAN.md` plus `.planning/state/phase-records/{phase_id}.json` | Contract truth for what a plan should do |
| GSD | `.planning/phases/{phase}/{phase}-{plan}-SUMMARY.md` | Actual plan outcome and execution evidence | `phase_plan_outcome` | `.planning/phases/{phase_id}/{phase_num}-{plan_num}-SUMMARY.md` | Execution evidence; later drives resume/archive logic |
| GSD | `.planning/phases/{phase}/{phase_num}-VERIFICATION.md` and optional `UAT.md` | Phase-level verification and acceptance evidence | `phase_verification_report` | `.planning/phases/{phase_id}/{phase_num}-VERIFICATION.md` plus optional `UAT.md` | Verification truth should remain phase-local, with status mirrored into structured phase record |
| GSD | `.planning/HANDOFF.json`, `.planning/.continue-here.md`, phase `.continue-here.md` | Pause/resume handoff | `session_handoff` | `.planning/HANDOFF.json` plus `.planning/state/sessions/` index | Treat as transient session truth, not long-term project truth |
| GSD | `.planning/workstreams/{name}/ROADMAP.md|STATE.md|REQUIREMENTS.md|phases/` | Logical parallel branch scope | `workstream_scope` | `.planning/workstreams/{workstream}/...` plus `.planning/state/workstreams/{workstream}.json` | Scoped copy of roadmap/state/requirements/phases; shared files remain at root |
| GSD | `~/gsd-workspaces/{workspace}/WORKSPACE.md` and workspace-local `.planning/` | Physical isolation manifest | `workspace_manifest` | `~/gsd-workspaces/{workspace}/WORKSPACE.md` | Outside core `.planning` truth; orchestration metadata only |
| GSD | `.planning/milestones/{version}-*`, optional `.planning/MILESTONES.md` | Archived milestone snapshot | `milestone_archive` | `.planning/milestones/{version}-*` | Historical truth, not active runtime truth |
| GSD | `.planning/codebase/` | Shared codebase intel and map outputs | `shared_codebase_intel` | `.planning/codebase/` | Shared auxiliary evidence; never active control truth |
| Auto | `CLAUDE.md` pipeline status, `docs/research_contract.md` | Project-level pipeline status and research contract | `research_program_contract` | Split into `.planning/PROJECT.md`, `.planning/STATE.md`, and phase-local context/plan artifacts | Do not preserve as a second control plane; normalize once into ljx-GSD truth |
| Auto | `IDEA_REPORT.md`, `IDEA_CANDIDATES.md` | Candidate idea portfolio and compact shortlist | `research.idea_portfolio` | `.planning/phases/{phase_id}/{phase_num}-IDEA_REPORT.md` plus `.planning/state/research/idea-portfolios/{phase_id}.json` | Portfolio truth, not current-control truth; compact shortlist can map into portfolio metadata |
| Auto | `refine-logs/REFINE_STATE.json`, `round-*-review.md`, `round-*-refinement.md`, `score-history.md` | Refine-loop state and round history | `research.refinement_session` | `.planning/state/research/refinement-sessions/{phase_id}.json` plus optional phase notes appendix | Internal loop state; preserve rounds as evidence, not as top-level control plane |
| Auto | `refine-logs/FINAL_PROPOSAL.md`, `REVIEW_SUMMARY.md`, `REFINEMENT_REPORT.md` | Canonical method proposal and refine conclusions | `research.method_spec` | `.planning/phases/{phase_id}/{phase_num}-METHOD_SPEC.md` plus `.planning/state/phase-records/{phase_id}.json` | `FINAL_PROPOSAL` becomes the clean method-spec artifact; summary/report remain supporting evidence |
| Auto | `refine-logs/EXPERIMENT_PLAN.md`, `EXPERIMENT_TRACKER.md`, optional `EXPERIMENT_LOG.md` | Claim-driven experiment program and run tracking | `research.experiment_program` | `.planning/phases/{phase_id}/{phase_num}-EXPERIMENT_PLAN.md`, `.planning/phases/{phase_id}/{phase_num}-EXPERIMENT_TRACKER.md`, `.planning/state/experiments/{phase_id}.json` | Plan + tracker become first-class experiment objects under one phase-aware program |
| Auto | `AUTO_REVIEW.md`, `REVIEW_STATE.json` | Review-loop log and machine state | `research.review_cycle` | `.planning/phases/{phase_id}/{phase_num}-REVIEW_LOOP.md` plus `.planning/state/reviews/{phase_id}.json` | Review log stays human-readable; loop state moves to structured review object |
| Auto | `CLAIMS_FROM_RESULTS.md`, lightweight `findings.md` | Claim judgment from results | `research.claims_assessment` | `.planning/phases/{phase_id}/{phase_num}-CLAIMS.md` plus `.planning/state/claims/{phase_id}.json` | This is claim-scope truth, not method truth; preserve both verdict and caveats |
| Auto | `NARRATIVE_REPORT.md`, `PAPER_PLAN.md` | Paper story bridge and writing outline | `paper.story_outline` | `.planning/phases/{phase_id}/{phase_num}-PAPER_PLAN.md` plus `.planning/state/papers/{phase_id}.json` | `NARRATIVE_REPORT` should be absorbed into structured paper-story metadata and a paper-plan mirror |
| Auto | `paper/` bundle, `PAPER_IMPROVEMENT_LOG.md`, `PAPER_IMPROVEMENT_STATE.json` | Manuscript source, compiled outputs, and improvement-loop state | `paper.manuscript_bundle` | repo-local `paper/` bundle referenced from `.planning/state/papers/{phase_id}.json` | Keep manuscript files repo-local; `.planning` stores provenance, status, and routing metadata rather than replacing the paper directory |

## Matrix 2: Conflict And Repair Matrix

| Conflict Class | Example | Blocking? | Default Resolution Direction | Repair Suggestion? | Auto-Apply Allowed? | Explicit Repair Required? |
|---|---|---|---|---|---|---|
| `phase_graph_reconstruction_failure` | Legacy inputs disagree on phase numbering, ordering, `phase_type`, or dependency graph | Yes | Halt release; preserve new structured state if present; require graph repair before normal lifecycle unlock | Yes | No | Yes |
| `unresolved_current_position` | Multiple plausible active phases or no trustworthy active-phase pointer | Yes | Keep project migration-blocked until one active position is chosen and recorded | Yes | No | Yes |
| `high_weight_control_field_conflict` | Completion state, active phase, milestone position, or `next` route target disagree across sources | Yes | New structured `.planning` state wins by default; otherwise block for explicit override or repair | Yes | No | Yes |
| `core_artifact_attachment_failure` | A core `CONTEXT`, `PLAN`, `EXPERIMENT_PLAN`, `CLAIMS`, or equivalent artifact cannot be attached to one phase/object confidently | Yes | Block release and require artifact-ownership repair rather than guessing a host object | Yes | No | Yes |
| `structured_state_integrity_failure` | Required structured object missing, dangling reference, orphan core artifact, or broken object link set | Yes | Attempt only unambiguous relink/index repair; otherwise remain blocked until integrity is restored | Yes | Low-risk only | Yes if ambiguous |
| `backup_output_incomplete` | `original/`, `manifest.json`, or `conversion-report.md` missing from the import session | Yes | Regenerate or complete backup outputs before migration can pass validation | Yes | Low-risk regeneration only | Yes if any source content must be reinterpreted |
| `key_legacy_input_damage` | Critical legacy control or research artifacts are unreadable, corrupted, or mutually contradictory enough to prevent safe reconstruction | Yes | Preserve damaged originals in backup, emit conflict report, and require explicit repair/import judgment | Yes | No | Yes |
| `duplicate_low_value_artifacts` | Repeated summaries, duplicate notes, or duplicate review logs with no control-truth impact | No | Keep one canonical artifact, archive or mark the rest as duplicates/residue | Yes | Yes | No |
| `optional_artifact_gap` | Poster, slides, or other non-core outputs are missing | No | Note the gap in the conversion report; do not block migration release | Yes | No | No |
| `naming_or_directory_drift` | Same logical object appears under variant legacy filenames or directories | No | Normalize to canonical ljx-GSD naming/path conventions | Yes | Yes | No |
| `low_value_metadata_drift` | Stale labels, legacy parameter remnants, inconsistent timestamps, or superficial metadata mismatch | No | Normalize or drop low-value metadata while preserving provenance in reports | Yes | Yes | No |
| `unmapped_noncore_legacy_material` | Scratch notes or non-authoritative residue cannot be mapped to a formal ljx-GSD object | No | Preserve in backup, classify as residue, and mention in the conversion report rather than forcing an object mapping | Yes | Yes | No |
| `obsolete_parallel_residue` | Legacy branch leftovers do not qualify as formal workstreams or suggested branches | No | Archive as residue; optionally surface only as historical residue in migration reporting | Yes | Yes | No |
| `unambiguous_index_or_reference_gap` | Structured state is missing an obvious link to a uniquely identifiable artifact | No | Backfill the missing reference and log the repair bundle entry | Yes | Yes | No |

## Matrix 3: Migration Gating Matrix

| Migration Stage | Allowed Commands | Blocked Commands | Validation Requirement | Output Artifact | Notes |
|---|---|---|---|---|---|
| Detect / Pre-import | `progress`, `help`, import-preview / inspect actions, `pause-work`, `resume-work` | `plan-phase`, `execute-phase`, `verify-work`, `next`, `research-pipeline`, `add-phase`, `insert-phase`, `remove-phase`, mutating `workstreams` actions | Legacy inputs detected; project is classified as migration-required; structured migration summary is generated; in `safe`, user confirms entering one-shot import | Proposed `MIGRATION_SUMMARY.md` plus `.planning/state/migration/import-session.json` | This is the point where the project enters migration-blocked mode; normal lifecycle stays locked |
| Import / Normalize | import-run actions, `inspect`, `progress`, `pause-work`, `resume-work` | Same lifecycle and structural commands remain blocked | One-shot import completes; normalized `.planning` artifacts/state are written; backup session is created; conflict report is generated | `.planning/legacy-backups/{source}/{session}/original/`, `manifest.json`, `conversion-report.md`, proposed `.planning/state/migration/conflict-report.json` | Default policy is read-old broadly, normalize once, write new truth only |
| Validate / Repair | `progress`, `help`, inspect actions, conflict-review actions, repair actions, `pause-work`, `resume-work` | Lifecycle shell, roadmap mutation, umbrella orchestration, and mutating workstream actions stay blocked until pass | No unresolved blocking conflict remains; low-risk repair bundle has been applied or explicitly reviewed; active phase/current position/`next` resolver are all determinable; state/artifact references are internally consistent | Proposed `.planning/state/migration/repair-bundle.json`, updated `conversion-report.md`, validated `manifest.json` | In `safe`, low-risk repairs are batched visibly before apply; in `autonomous`, they may apply inline but must still be logged |
| Release to Normal Lifecycle | Full lifecycle shell, direct research workflows, roadmap mutation commands, and mutating `workstreams` actions | No command is blocked by migration gating anymore; import/repair actions become optional admin flows rather than the default path | All migration pass criteria are satisfied: import complete, no blocking conflict, roadmap/state/typed phases reconstructed, references consistent, backup complete, reports generated, and current position plus `next` routing are resolvable | Finalized `conversion-report.md`, finalized backup session, proposed `.planning/state/migration/release-record.json`, updated `.planning/STATE.md` | After release, legacy artifacts remain backup-only by default and do not re-enter the active control path |

## Matrix 4: Workstream Migration Matrix

| Legacy Parallel Material Type | Default Destination | Promotion Threshold | Stored Where | Visible Where | Notes |
|---|---|---|---|---|---|
| Primary mainline | Formal primary mainline / primary workstream record | N/A | Root `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, `.planning/phases/`, plus proposed `.planning/state/workstreams/primary.json` | Normal lifecycle shell, `progress`, `next`, roadmap views, workstream status views | Migration should not bury the active mainline under a nested imported branch by default; it stays the canonical root scope while still being recorded as the primary workstream identity |
| Qualified parallel line | Formal imported workstream | Must satisfy the `clear + stable + separable` threshold: independent theme, continuous artifact chain, relatively independent phase/subchain, no shared active control truth requirement, and no routing ambiguity | `.planning/workstreams/imported-{semantic}/...` plus proposed `.planning/state/workstreams/{workstream_id}.json` | Migration report, `workstreams list/status/progress`, explicit switch/resume flows | Primary is chosen by mainline fit; additional imported workstreams get semantic `imported-*` names and do not auto-activate |
| Suggested branch candidate | Suggested branch | Not auto-promoted; may become a formal workstream only through explicit promotion after theme-validity, phase coherence, semantic non-collision, and routing-safety checks | Proposed `.planning/state/migration/suggested-branches.json` plus `.planning/SUGGESTED_BRANCHES.md` | Migration report and suggested-branch summary only | Stays outside formal workstream state and default `next` routing until explicit promotion; promotion baseline must be user-chosen and provenance-recorded |
| Low-value residue | Archived residue | N/A | Legacy backup session under `.planning/legacy-backups/...` with classification in `manifest.json` / `conversion-report.md` | Conversion report, manifest, backup tree only | Preserve for traceability and manual later inspection, but do not let it occupy formal branch or suggested-branch surface area |

## Matrix 5: Promotion Provenance Matrix

| Promotion Aspect | Required Record | Stored Where | Why It Matters |
|---|---|---|---|
| Source suggested branch | Stable `suggested_branch_id` plus the stored branch title/theme at promotion time | Proposed `.planning/state/migration/promotions/{promotion_id}.json` and echoed into `.planning/state/workstreams/{workstream_id}.json` | Lets later audit and repair flows reconstruct exactly which suggested branch was promoted |
| Baseline choice | Explicit user-chosen baseline mode and baseline reference | Proposed promotion record plus promoted workstream record | Makes the branch origin interpretable; without it, later branch behavior looks arbitrary |
| Current primary reference | The primary/mainline workstream identity used for the comparison at promotion time | Proposed promotion record | Preserves the exact comparison anchor instead of assuming “current primary” is timeless |
| Diff summary reference | Pointer to the baseline-versus-primary diff shown before promotion, plus a compact verdict summary | Proposed promotion record and optional linked markdown summary under `.planning/state/migration/` | Makes the user's baseline choice auditable and reviewable later |
| Timestamp / actor | Promotion time, initiating actor/session, and profile context (`safe` / `autonomous`) | Proposed promotion record | Needed for audit, blame-free reconstruction, and later automated forensics |
| Resulting workstream id | The new formal workstream identifier and initial activation state (`inactive` by default) | Proposed promotion record and `.planning/state/workstreams/{workstream_id}.json` | Connects the promotion event to the formal branch that was created and preserves the “created but not auto-switched” rule |

## Open Research Notes

- Matrix 1 initial draft is now filled from local GSD runtime inspection, Auto artifact inspection, and parallel mapping summaries.
- Matrix 2 initial draft is now filled by converting the accepted blocking/non-blocking and repair-boundary rules into a formal table.
- Matrix 3 initial draft is now filled by formalizing the migration-blocked command surface, one-shot import gating, validation, and release semantics.
- Matrix 4 initial draft is now filled by formalizing the primary/imported/suggested/residue branch taxonomy and their storage/visibility rules.
- Matrix 5 initial draft is now filled by formalizing the provenance fields required when a suggested branch is promoted into a formal workstream.
- Next: refine `05-01-PLAN` into an execution-grade migration plan and review the few remaining provisional schema-location choices surfaced by the matrices.
- Prefer explicit mappings over narrative prose.

---

*Phase: 05-migration-and-parallelism-strategy*
*Research artifact created: 2026-04-09*
