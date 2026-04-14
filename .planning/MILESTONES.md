# Milestones

## v1.0 Runtime Unification And Migration Cutover (Completed: 2026-04-12)

**Archive:** `.planning/milestones/v1.0-ROADMAP.md`, `.planning/milestones/v1.0-REQUIREMENTS.md`
**Scope:** Phases 1-14, covering the accepted architecture baseline, runtime implementation, workflow completion, admin mutation helpers, migration cutover, and parity verification.
**Evidence:** 48 roadmap plans total; 38 phase-local summary artifacts exist for Phases 4-14, where formal phase-local GSD artifacts begin.
**Status:** Completed with known verification debt carried forward.

**Key accomplishments:**

- Accepted the Phases 1-6 architecture, command-surface, migration, parallelism, and hook-ownership baseline.
- Landed the shared `.planning/state` runtime substrate, typed lifecycle shell, review/verify quality gates, and generated-skill alignment.
- Completed the discovery/refinement and experiment/review/claim workflow families on one evidence model.
- Completed roadmap/workstream mutation helpers with typed safety rules and state mirrors.
- Completed migration cutover readiness with structured import, conflict, repair, release, parity, and operator runbook artifacts.
- Backfilled Phase 04-06 accepted-baseline evidence summaries without rewriting their historical meaning.

**Known gaps:**

- `IMPL-06` / Phase 12 remains implementation-complete but still needs a whole-repo review/verify clean round.
- Global installed production skill replacement remains out of scope for v1.0; Phase 14 verified in-repo cutover readiness only.

**Next milestone:** v1.1 Skill Verification. Scope is intentionally high level: verify the skill surface before expanding detailed requirements or phase structure.

---

## v1.4 Self-Contained Runtime And Scenario Review (Pivoted: 2026-04-13)

**Status:** pivoted_not_shipped
**Archive:** `.planning/milestones/v1.4-PIVOT-SNAPSHOT-2026-04-13.md`, `.planning/milestones/v1.4-pivoted_not_shipped-ARCHIVE-MANIFEST.md`
**Scope:** Historical ljx-GSD self-contained runtime and scenario review work through Stage B Round 4.
**Disposition:** Do not continue this review loop by default. v2.0 replaces the effort with a framework-first rebuild.

**Key reasons for pivot:**

- Existing planning and implementation produced too many structural drift failures.
- Research flows did not integrate cleanly into GSD lifecycle/git/artifact/review behavior.
- Typed-phase and bridge-ready semantics had too much blast radius.
- State, roadmap, summary, phase-record, and review artifacts could drift.
- Continuing review rounds would optimize the wrong architecture.

**Next milestone:** v2.0 Framework-First GSD Rebuild.

---
