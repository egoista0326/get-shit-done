# gsd

## What This Is

`gsd` is the next framework-first rebuild of the current ljx-GSD experiment. The goal is not to keep expanding the existing ljx-GSD implementation. The goal is to return to upstream GSD as the outer control-plane base, then integrate Auto/ARIS research capabilities with the smallest possible interference to normal GSD behavior.

The previous ljx-GSD line is preserved as historical evidence. v1.4 is recorded as `pivoted_not_shipped` because its review loop kept exposing structural planning and integration failures. v2.0 starts over from Phase 01 with a clean framework extraction and design process before any implementation work.

## Core Value

GSD should remain a reliable phase/milestone control plane while gaining research-native commands that produce evidence, artifacts, reviews, and papers without creating a second workflow system or changing the core phase schema.

## Current Milestone: v2.0 Framework-First GSD Rebuild

**Goal:** Build a new `gsd` implementation by first extracting frameworks from upstream GSD, current ljx-GSD history, and Auto/ARIS, then designing and reviewing a minimal-modification target framework before implementing it from a clean implementation workspace with an explicit upstream GSD baseline import.

**Target features:**

- Source-indexed framework documents for upstream GSD, current ljx-GSD/history, and Auto/ARIS.
- Phase 01 framework construction uses one subagent build round, three subagent review rounds, and one main-agent final check before acceptance.
- Target `gsd-framework` that keeps upstream GSD as the outer lifecycle and treats Auto/ARIS as standalone `gsd` commands backed by ordinary GSD phases and research artifact conventions.
- Phase-local research artifact root: authoritative research outputs live under `.planning/phases/<phase>/research/`; root Auto artifacts are import/export mirrors only until adopted.
- Canonical gate policy for `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, reviewer backends, and external-service confirmation before implementation.
- Review rules derived from historical bugs before the framework review loop starts.
- Up to 15 framework review rounds with specialized reviewer lanes and main-agent confirmation, exiting early after two clean rounds.
- Clean implementation workspace handoff after framework approval, with Phase 06 importing upstream GSD before code work starts.
- Research command integration without `phase_type`, typed phase routing, or broad phase schema changes.

## v1.4 Disposition

v1.4 is `pivoted_not_shipped`.

**Historical files:**

- Pivot snapshot: `.planning/milestones/v1.4-PIVOT-SNAPSHOT-2026-04-13.md`
- Archive manifest: `.planning/milestones/v1.4-pivoted_not_shipped-ARCHIVE-MANIFEST.md`
- Archived phase dirs: `.planning/milestones/v1.4-pivoted_not_shipped-phases/`
- Archived phase records: `.planning/milestones/v1.4-pivoted_not_shipped-state/phase-records/`
- Review artifacts remain under `.planning/review/`
- Upstream reference snapshots remain under `.planning/references/`

No further effort should be spent completing the old ljx-GSD review loop unless explicitly reopened.

## Requirements

### Validated

- ✓ v1.4 pivot is recorded as `pivoted_not_shipped` instead of being falsely shipped.
- ✓ v2.0 will use the name `gsd`, not `egoista` or `ljx-GSD`, for the new target system.
- ✓ v2.0 phase numbering resets to Phase 01 after old phase directories are archived.
- ✓ Auto/ARIS capabilities should be exposed as standalone `gsd` commands.
- ✓ Auto/ARIS standalone commands should use ordinary GSD phases plus narrow research artifact conventions internally.
- ✓ `phase_type`, typed phase routing, and broad phase schema extensions are out of scope.
- ✓ Implementation must happen in the clean implementation workspace after framework approval and upstream baseline import.

### Active

- [x] Extract source frameworks from upstream GSD, current ljx-GSD/history, and Auto/ARIS with source indexes and clean context boundaries.
- [x] Run the Phase 01 extraction framework through three subagent review rounds and one main-agent final check.
- [ ] Design the target `gsd-framework` through multi-agent proposal rounds and user discussion.
- [ ] Derive and discuss review rules from historical bugs before running framework review.
- [ ] Run bounded framework review rounds until two consecutive clean rounds or cap.
- [ ] Define implementation boundaries and create a clean implementation workspace handoff before coding.
- [ ] Implement from upstream GSD foundation first, then preserve core GSD parity, then integrate research commands.
- [ ] Verify with scenario and regression harness before any cutover or shipped claim.

### Out of Scope

- Continuing the current ljx-GSD v1.4 review loop by default.
- Introducing `phase_type` or typed phase routing.
- Replacing GSD's ordinary phase schema to accommodate research.
- Building a greenfield research orchestrator detached from upstream GSD.
- Letting Auto/ARIS root artifacts become a second authoritative control plane.
- Global install/cutover before framework review, scenario probes, and packaging verification pass.

## Context

- Upstream GSD is the behavior and architecture baseline for lifecycle, state, planning, review, workstreams, git, hooks, and package behavior.
- Auto/ARIS is the capability baseline for idea discovery, literature work, novelty checks, research refinement, experiment planning/execution/audit, review loops, claims, ablations, papers, and rebuttals.
- Current ljx-GSD is historical evidence, not the implementation base. It provides failure data, partial reusable code, tests, docs, and bug ledgers.
- The previous typed-phase direction had too much blast radius and should not be repeated.
- Research workflows must produce traceable execute evidence before any completion state is written.
- `idea-discovery` requires literature retrieval/reading evidence; context/state generation alone is non-evidence.
- Completion requires raw command evidence plus independent review and verification/UAT gates; summaries and roadmap checkboxes are cross-check/advisory only.
- Parallel subagents may read independently, but authoritative state/document writes must be serialized by the main agent or a single owner.
- Main agent does not substitute for missing subagent source-reading or review lanes; insufficient subagent capacity is handled by later batches.

## Constraints

- **Name:** Use `gsd` externally and internally for the new system.
- **Base:** Start from upstream GSD reuse/copy where practical.
- **Research command surface:** Expose Auto/ARIS-style capabilities as standalone `gsd` commands.
- **Internal integration:** Research commands operate through ordinary GSD phases plus artifact conventions.
- **No phase schema expansion:** No `phase_type`, typed phase routing, or broad phase-record schema changes.
- **State:** `.planning/` remains the authoritative planning root.
- **Research artifacts:** Authoritative research command outputs live under phase-local `.planning/phases/<phase>/research/`.
- **Gate precedence:** Hard gates and explicit human stops override `AUTO_PROCEED`; `HUMAN_CHECKPOINT` pauses review/decision checkpoints; external-service policies must pass before continuation.
- **Git:** Research flows that mutate project artifacts must follow GSD-like git/review/verify discipline.
- **Concurrency:** No parallel writes to the same authoritative state family.
- **Implementation isolation:** Code implementation happens in the clean implementation workspace after framework approval and upstream baseline import.
- **Verification:** Completion claims require tests, scenario probes, review gates, docs, and state artifacts to agree.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Mark v1.4 as `pivoted_not_shipped` | The remaining review loop is not the right investment; structural planning problems need a framework-first rebuild | Active |
| Start v2.0 from Phase 01 | Clean numbering makes the rebuild easier to reason about and avoids carrying old ljx-GSD phase semantics | Active |
| Archive old phase dirs and phase records | Reset numbering requires historical dirs to be removed from active `.planning/phases/` | Active |
| Use `gsd` as the new name | The user used `egoista` only as a placeholder and explicitly wants naming to remain GSD | Active |
| Expose Auto/ARIS as standalone `gsd` commands | The user needs direct research commands, but with minimal GSD interference | Active |
| Use ordinary phases plus research artifact conventions internally | This gives research a special execution convention without changing GSD's phase schema | Active |
| Ban `phase_type` and typed phase routing | The earlier typed-phase approach had too large a blast radius | Active |
| Phase 01 requires build plus three subagent reviews plus main-agent final check | A single extraction pass is not enough for this framework layer, and main-agent source reading would pollute context and weaken independence | Active |
| Use phase-local research artifact roots | Avoids root Auto artifacts becoming a second authoritative control plane while preserving Auto artifact shapes | Active |
| Define canonical gate/service/reviewer policy before implementation | Prevents v1.x autoProceed, external-service, and review-backend drift from recurring | Active |
| Treat summaries and roadmap checkboxes as cross-check/advisory only | Prevents false completion through file presence or shallow progress signals | Active |
| Build from a clean implementation workspace with explicit upstream import | Current workspace is heavily polluted with historical work and review artifacts | Active |

## Evolution

This document evolves at milestone boundaries and after major framework review decisions.

For v2.0, updates should happen only after a serialized main-agent write. Subagents may write scoped reports, but they must not directly rewrite canonical `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, or `STATE.md`.

---
*Last updated: 2026-04-13 after v2.0 canonicalization*
