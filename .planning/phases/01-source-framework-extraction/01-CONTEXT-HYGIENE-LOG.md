# 01-CONTEXT-HYGIENE-LOG

**Status:** R3-fixed draft
**Purpose:** Record what was read by subagents, what was skipped, and what cannot count as evidence.

## Phase 01 Process Correction

User corrected the Phase 01 model after initial planning:

- Phase 01 must be one subagent build round, three subagent review rounds, and one main-agent final check.
- Main agent must not take over subagent source-reading or review duties.
- If subagent capacity is insufficient, missing lanes must run in later batches.

This log enforces that correction.

## Build Lanes

| Lane | Agent | Status | Coverage summary | Skips/limits |
|---|---|---|---|---|
| Upstream GSD lifecycle/control-plane | Mencius | Covered with gaps | Lifecycle, workflows, commands, verification, progress, next, autonomous, manager, workstreams/workspaces, milestone, prompt indexes. | Did not fully read every agent prompt, every non-lifecycle workflow, or every SDK template. |
| Upstream GSD runtime/helper | Plato | Covered with gaps | Runtime CJS substrate, config, state, git, hooks, subagents, package/install, tests, SDK package boundary. | Did not run tests; did not read every command/workflow/agent/test line-by-line. |
| Current ljx-GSD implementation | Epicurus | Covered with gaps | `bin/lib`, installer, tests, docs, active config, v2.0 draft, build/runtime/research/admin helpers. | Did not run install/build/test; did not read every line of tests or generated prompt bodies. |
| ljx-GSD history/failures | Raman | Covered with gaps | v1.4 pivot, archive manifest, implementation lessons, v1.1-v1.4 review docs, bug ledgers, selected archived phases/records. | Did not fully read all 260 requested files end-to-end; prioritized high-signal plus targeted search. |
| Auto/ARIS front half | Ramanujan | Covered with gaps | idea discovery, literature, novelty, review, refinement, source helpers, templates, Codex overlays, recovery docs. | Did not deeply read all 255 upstream files, tests, binary assets, most back-half/paper/rebuttal skills. |
| Auto/ARIS experiment/claim | Hypatia | Covered with gaps | experiment plan/bridge/run/monitor/analyze/audit, review loop, result-to-claim, ablation, training check, GPU backends, reviewer providers, watchdog. | Skipped paper/literature-only skills, unrelated MCP internals, binary/community assets. |
| Auto/ARIS paper/rebuttal/tooling | Descartes | Covered in later batch with gaps | paper-writing, paper-plan/write/compile, improvement loop, rebuttal, figures, slides/poster, Gemini/Claude overlays, templates, research wiki, watchdog, smart update. | Did not inspect front-half and experiment/claim lanes; no standalone `paper-review`; camera-ready handling is through venue/anonymity settings plus post-acceptance assets. |

## Non-Evidence Items

- Any local main-agent source scans before the correction do not count as Phase 01 source-lane evidence.
- `roadmap analyze` and `git diff --check` are process verification, not source extraction evidence.
- Subagent recommendations are not facts unless tied to source paths.
- Backfilled v1.4 summaries are historical accounting artifacts, not execute evidence.

## Build-Round Coverage Gaps

- Full GSD root agent prompt extraction still needs review. The lifecycle lane indexed key agents but did not deep-read every body.
- Upstream SDK prompt role is unresolved.
- Installed GSD `1.34.2` differs from reference `1.35.0`; no full diff has been run.
- Auto/ARIS has no stable default literature report filename according to front-half extraction.
- Auto/ARIS paper lane did not find a standalone `paper-review`; camera-ready behavior exists through venue/anonymity settings, with `paper-slides` and `paper-poster` as post-acceptance follow-ons.
- R1 checked source-index precision and corrected locator/path conventions; remaining Auto overlay/tooling paths are implementation-planning follow-up, not Phase 01 evidence.
- Current ljx-GSD tests were indexed by behavior, but all lines were not read.

## Review Round 1 Outcome

R1 ran six subagent reviewer lanes:

- upstream GSD source coverage,
- ljx-GSD/history source coverage,
- Auto/ARIS source coverage,
- source-index precision,
- prompt-body locator,
- context hygiene.

Accepted R1 fixes were applied to:

- upstream source roots, package/test surface, SDK package boundary, and prompt-template locator indexing,
- ljx public-surface count, typed-helper reuse guidance, and hook/adapter failure taxonomy,
- Auto `sources`, `difficulty`, `research-pipeline`, and paper/camera-ready wording,
- context hygiene wording and R1 process accounting.

R1 does not close Phase 01. R2 and R3 still require subagent review rounds before the main-agent final check.

## Review Round 2 Outcome

R2 ran six subagent reviewer lanes:

- GSD-first lifecycle consistency,
- no-`phase_type` and no typed-routing consistency,
- Auto/ARIS capability preservation,
- ljx-GSD reuse/discard consistency,
- state/config/git/hook integration,
- upgrade-boundary and minimal-modification fit.

Accepted R2 fixes were applied to:

- phase-local research artifact root ownership under `.planning/phases/<phase>/research/`,
- experiment/claim command-family preservation,
- canonical `auto-review-loop` stop predicate,
- quarantine of bridge-specific ljx helper modules and command labels.

R2 does not close Phase 01. R3 and the final check are still required.

## Review Round 3 Outcome

R3 ran six subagent reviewer lanes:

- historical bug taxonomy,
- user-observed failure mapping,
- false-completion and evidence semantics,
- config/autoProceed/stop-boundary regression,
- concurrency and state mirror drift,
- context hygiene and subagent boundary.

Accepted R3 fixes were applied to:

- review artifact parser/schema drift and research evidence taxonomy,
- mandatory `idea-discovery` literature execution evidence,
- canonical gate precedence for `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, stop predicates, reviewer fallback, and external services,
- false-completion protections for file presence, roadmap checkboxes, and summaries,
- single-writer canonical state rules and mirror taxonomy,
- stale context hygiene status labels.

R3 does not close Phase 01. The main-agent final check is still required.

## Review Rounds Required

Phase 01 acceptance requires these review artifacts to exist and contain passing or accepted-fixed outcomes, source/evidence references, and applied-fix verification notes:

1. `01-REVIEW-R1-SOURCE-COVERAGE.md` and `01-REVIEW-R1-FIXES.md`
2. `01-REVIEW-R2-CONSISTENCY.md` and `01-REVIEW-R2-FIXES.md`
3. `01-REVIEW-R3-HISTORICAL-REGRESSION.md` and `01-REVIEW-R3-FIXES.md`
4. `01-FINAL-CHECK.md`

## Main-Agent Role Boundary

The main agent may:

- coordinate subagents,
- synthesize subagent reports,
- apply accepted review corrections,
- write canonical planning files serially,
- perform final acceptance checks over artifacts and reports.

The main agent may not:

- replace a missing source-reading lane,
- treat local source scans as build-lane evidence,
- skip subagent review rounds,
- claim Phase 01 complete before review artifacts and final check exist.
