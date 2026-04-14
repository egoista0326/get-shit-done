# ljx-GSD Implementation Index

**Generated:** 2026-04-12
**Purpose:** fast lookup for v1.1 review/fix work.

## 0. One-Line Model

`ljx-GSD` is a Codex-facing research operating system that keeps GSD as the outer `.planning` lifecycle/control plane and absorbs Auto/ARIS research workflows as typed phase-local workflows plus structured state. The primary design invariant is avoiding a second Auto control plane, not merely exposing two command sets under one prefix.

## 1. Source Anchors

Primary local implementation anchors:

- `LJX-GSD-ARCHITECTURE.md` - design goal, state direction, hook ownership, public taxonomy, GSD-vs-Auto integration rule.
- `LJX-GSD-INTERFACES.md` - concrete command behavior, typed routing, direct workflow attachment, `next`, auto-advance policy, workstream/workspace/phase boundaries.
- `bin/lib/manifest.cjs` - current generated/install command-surface truth.
- `bin/install.js` - preview/target install entrypoint; `--print-manifest` exposes the supported surface.
- `bin/lib/build-skills.cjs` and `bin/lib/codex-conversion.cjs` - generation/conversion implementation.
- `bin/lib/ljx-*.cjs` - runtime helper surface used by generated skills.
- `.build/codex-preview/skills/ljx-GSD-*/SKILL.md` - generated Codex-facing skill contracts.
- `.build/codex-preview/ljx-gsd/runtime/` - helper files copied into install preview.
- `.build/codex-preview/ljx-gsd/docs/` - docs shipped with preview install.
- `tests/*.test.cjs` - regression suite.
- `.planning/state/phase-records/*.json` - structured phase state used by resolver/helper surface.

Upstream baseline references from Phase 15:

- `.planning/review/v1.1/GSD-REFERENCE-NOTES.md`
- `.planning/review/v1.1/AUTO-ARIS-REFERENCE-NOTES.md`
- `.planning/review/v1.1/UPSTREAM-SOURCE-INVENTORY.md`

## 2. Accepted Design Invariants

Use these as review targets unless later artifacts explicitly supersede them.

- GSD remains the outer control plane: `.planning/` owns project, roadmap, phase lifecycle, progress, pause/resume, workstreams, quality gates, and verification.
- Auto/ARIS research content is absorbed into native typed phases instead of run as a hidden linear pipeline with late sync-back.
- Direct research commands and phase-driven commands must converge on the same phase artifact space and structured state model.
- Human-readable markdown stays visible, but structured state under `.planning/state/` is the runtime truth where implemented.
- Only one owner writes each authoritative state family; generated skills should use helper payload commands for structured writes.
- `phase`, `workstream`, and `workspace` remain distinct:
  - phase = sequential mainline inside one track
  - workstream = parallel branch inside the same workspace/code reality
  - workspace = physical isolation such as worktree/clone/environment
- `ljx-GSD-next` executes only inline-safe actions or returns a bridge-ready/deferred handoff; it must not pretend a separate workflow already ran.
- `research-pipeline` is public, but it is a helper-backed phase-chain proposal/admin-handoff entrypoint, not the default lifecycle and not a second control plane.
- Default policy remains guided unless explicit autonomous mode is configured by the invoking workflow.
- Production replacement of globally installed skills was explicitly out of scope for Phase 14; preview install is evidence, not global cutover.

## 3. Current Public Surface From Manifest

Manifest command truth was read through `node bin/install.js --print-manifest` and `bin/lib/manifest.cjs`.

Core:

- `ljx-GSD-help`
- `ljx-GSD-progress`
- `ljx-GSD-next`
- `ljx-GSD-pause-work`
- `ljx-GSD-resume-work`
- `ljx-GSD-workstreams`

Project/phase:

- `ljx-GSD-new-project`
- `ljx-GSD-map-codebase`
- `ljx-GSD-discuss-phase`
- `ljx-GSD-plan-phase`
- `ljx-GSD-execute-phase`
- `ljx-GSD-code-review`
- `ljx-GSD-verify-work`
- `ljx-GSD-add-phase`
- `ljx-GSD-insert-phase`
- `ljx-GSD-remove-phase`

Main research:

- `ljx-GSD-idea-discovery`
- `ljx-GSD-research-refine`
- `ljx-GSD-experiment-plan`
- `ljx-GSD-experiment-bridge`
- `ljx-GSD-review-loop`
- `ljx-GSD-claim-gate`
- `ljx-GSD-paper-pipeline`
- `ljx-GSD-rebuttal`
- `ljx-GSD-research-pipeline`
- `ljx-GSD-novelty-check`
- `ljx-GSD-ablation-planner`
- `ljx-GSD-research-review`
- `ljx-GSD-result-to-claim`

Hidden utility:

- `ljx-GSD-code-review-fix`

Conceptual but not independently installed:

- `ljx-GSD-do`; host/freeform routing is documented as conceptual in `LJX-GSD-INTERFACES.md`.

## 4. Preview Install Layout

`.build/codex-preview/` contains three important surfaces:

- Generated `ljx-GSD-*` skills under `.build/codex-preview/skills/ljx-GSD-*`.
- Preserved upstream Auto/ARIS companion skills, tools, templates, shared references, docs, and MCP servers. This is important because not every Auto capability is collapsed into a single `ljx-GSD-*` wrapper; some are available as companion/internal tools.
- Shipped runtime and docs under `.build/codex-preview/ljx-gsd/`, including `manifest.json`, `runtime/*.cjs`, and user/config/design docs.

Review implication: a passing review must check both repo source and generated preview output, because Codex users read generated skill Markdown, not only helper code.

## 5. Generated Skill Contract

Representative generated skills inspected:

- `.build/codex-preview/skills/ljx-GSD-next/SKILL.md`
- `.build/codex-preview/skills/ljx-GSD-execute-phase/SKILL.md`
- `.build/codex-preview/skills/ljx-GSD-review-loop/SKILL.md`
- `.build/codex-preview/skills/ljx-GSD-research-pipeline/SKILL.md`

Common contract:

- Run the named helper first and treat helper JSON/context as authoritative.
- Stop honestly on missing `.planning/`, missing phase, malformed config, migration-blocked state, missing evidence, or deferred bridge boundary.
- Write phase-local artifacts where the helper says to write them.
- For structured state updates, write payload JSON and call helper update commands instead of editing `.planning/state/` directly.
- End with helper-provided recommendations, preserving bridge-ready vs deferred vs inline distinctions.
- Translate Claude-style `Task(...)` and `AskUserQuestion(...)` concepts to Codex tools where those patterns are still present in inherited GSD workflow text.

Special generated skill hotspots:

- `ljx-GSD-next` must never chain multiple lifecycle steps or claim bridge-ready actions ran.
- `ljx-GSD-execute-phase` must distinguish adoptable direct artifacts from work that still needs execution and must route typed phases correctly.
- `ljx-GSD-review-loop` must preserve Auto-style bounded review/fix/re-review rhythm, reviewer independence, max rounds, threshold, and human checkpoint settings.
- `ljx-GSD-research-pipeline` must never call raw upstream Auto linear commands or hand-edit roadmap/phase records. It should propose/apply via helper-backed roadmap admin semantics.

## 6. Runtime Helper Families

Core generation/install:

- `bin/lib/manifest.cjs`
- `bin/lib/build-skills.cjs`
- `bin/lib/codex-conversion.cjs`
- `bin/lib/source-roots.cjs`
- `bin/install.js`

Core runtime/state:

- `bin/lib/ljx-runtime-core.cjs`
- `bin/lib/ljx-runtime-state.cjs`
- `bin/lib/ljx-state-tools.cjs`
- `bin/lib/ljx-phase-context.cjs`
- `bin/lib/ljx-cli-args.cjs`
- `bin/lib/ljx-planning-lock.cjs`
- `bin/lib/ljx-bridge-contract.cjs`

Lifecycle and quality:

- `bin/lib/ljx-lifecycle-shell-tools.cjs`
- `bin/lib/ljx-code-review-tools.cjs`
- `bin/lib/ljx-code-review-fix-tools.cjs`
- `bin/lib/ljx-quality-gates-tools.cjs`
- `bin/lib/ljx-verify-tools.cjs`

Research workflows:

- `bin/lib/ljx-idea-discovery-tools.cjs`
- `bin/lib/ljx-research-refine-tools.cjs`
- `bin/lib/ljx-experiment-plan-tools.cjs`
- `bin/lib/ljx-experiment-bridge-tools.cjs`
- `bin/lib/ljx-experiment-evidence-tools.cjs`
- `bin/lib/ljx-review-loop-tools.cjs`
- `bin/lib/ljx-research-review-tools.cjs`
- `bin/lib/ljx-result-to-claim-tools.cjs`
- `bin/lib/ljx-claim-gate-tools.cjs`
- `bin/lib/ljx-ablation-planner-tools.cjs`
- `bin/lib/ljx-paper-pipeline-tools.cjs`
- `bin/lib/ljx-paper-evidence-tools.cjs`
- `bin/lib/ljx-rebuttal-tools.cjs`
- `bin/lib/ljx-novelty-check-tools.cjs`
- `bin/lib/ljx-research-pipeline-tools.cjs`

Admin/migration/workstreams:

- `bin/lib/ljx-roadmap-admin-tools.cjs`
- `bin/lib/ljx-admin-mutation-records.cjs`
- `bin/lib/ljx-workstreams-tools.cjs`
- `bin/lib/ljx-migration-tools.cjs`
- `bin/lib/ljx-new-project-tools.cjs`

Review implication: helper-family boundaries are part of the design. Bugs may be cross-family drift, not just isolated function errors.

## 7. Structured State Model Seen Locally

Phase state:

- Records live under `.planning/state/phase-records/<phase>.json`.
- v1.1 added records 15-19 with explicit `phase_type`, status, lifecycle, dependencies, and paths.
- Current resolver output after adding those records has no `phaseResolutionError` and identifies Phase 16 as current.

Human-readable mirrors:

- `.planning/PROJECT.md` records the current v1.1 milestone and active requirements.
- `.planning/REQUIREMENTS.md` records v1.1 reference, implementation-index, review, and fix requirements.
- `.planning/ROADMAP.md` records Phases 15-19 and progress.
- `.planning/STATE.md` records current focus, progress, pending todos, blockers, and recent trends.

Review state:

- `.planning/review/v1.1/BUG-LEDGER.md` is the user-facing record for fixed bugs.
- `.planning/review/v1.1/REVIEW-LOOP-STATE.md` is the bounded loop state for v1.1 review rounds.
- Phase 15 notes and this implementation index are read-only references for the later review loop.

## 8. Test Inventory

Current test files cover these surfaces:

- Build/manifest/preview: `skill-build.test.cjs`, `docs-contract.test.cjs`, `bridge-contract.test.cjs`.
- Runtime parsing/state: `runtime-core.test.cjs`, `runtime-state.test.cjs`, `runtime-shell.test.cjs`, `phase-context.test.cjs`, `lifecycle-state-sync.test.cjs`, `cli-parser-contract.test.cjs`.
- Lifecycle shell: `discuss-phase-shell.test.cjs`, `plan-phase-shell.test.cjs`, `execute-phase-shell.test.cjs`, `lifecycle-next.test.cjs`.
- Quality gates: `code-review-bridge.test.cjs`, `code-review-fix-bridge.test.cjs`, `verify-work-bridge.test.cjs`.
- Research direct workflows: `idea-discovery-bridge.test.cjs`, `research-refine-bridge.test.cjs`, `experiment-plan-bridge.test.cjs`, `experiment-bridge-bridge.test.cjs`, `review-loop-bridge.test.cjs`, `research-review-bridge.test.cjs`, `result-to-claim-bridge.test.cjs`, `claim-gate-bridge.test.cjs`, `ablation-planner-bridge.test.cjs`, `paper-pipeline-bridge.test.cjs`, `rebuttal-bridge.test.cjs`, `novelty-check-bridge.test.cjs`.
- Evidence helpers: `experiment-evidence-tools.test.cjs`, `paper-evidence-tools.test.cjs`.
- Admin/migration/workstreams: `workstreams-bridge.test.cjs`, `roadmap-admin-bridge.test.cjs`, `admin-mutation-records.test.cjs`, `admin-mutation-integration.test.cjs`, `migration-cutover.test.cjs`, `parity-cutover.test.cjs`, `research-pipeline-cutover.test.cjs`, `new-project-bridge.test.cjs`.

Expected baseline verification command: `node --test tests/*.test.cjs` unless Phase 17 selects narrower probes before the full suite.

## 9. User-Requested Scenario Mapping

Use this as a review starting point, not as a pass/fail result.

- GSD project migration into `ljx-GSD`: migration helper, phase records, roadmap admin, structured migration records, Phase 14 cutover docs.
- GSD-style engineering lifecycle: `discuss-phase`, `plan-phase`, `execute-phase`, `code-review`, `code-review-fix`, `verify-work`, `next`.
- Research lifecycle: `idea-discovery`, `research-refine`, `experiment-plan`, `experiment-bridge`, `review-loop`, `claim-gate`, `paper-pipeline`, `rebuttal`.
- Code review: `ljx-code-review-tools.cjs`, hidden fix helper, freshness/verify gates.
- Literature review and novelty: preserved Auto companion `research-lit`, `arxiv`, `comm-lit-review`, `semantic-scholar`, plus `ljx-GSD-novelty-check`.
- Autonomous research until expected effect: `review-loop`, `research-pipeline`, experiment bridge, monitor/training companion skills. Needs careful review because some fully autonomous execution remains policy/companion-dependent rather than a single always-on daemon.
- Analyze experiment results: preserved Auto companion `analyze-results`; local evidence/claim helpers consume summaries/results for claim decisions.
- Credible research direction: `idea-discovery`, `idea-creator` companion, `research-refine`, `research-review`, novelty checks.
- Pause/continue: core `pause-work`, `resume-work`, `progress`, `next`, structured handoff files.
- Workstreams/workspaces: `workstreams` implemented; workspace is heavier physical isolation in docs and may rely on preserved GSD/host workflow rather than a visible `ljx-GSD-new-workspace` command.
- Full-auto vs human-feedback switching: docs define safe/guided/autonomous policy; review must verify actual helpers expose/obey the intended knobs where implemented.
- Parameter aliases/canonical keys: configuration/parameter docs define lowercase dotted keys and aliases; review must test actual resolver/import behavior.

## 10. Known Debt And Non-Goals

- Phase 12 is marked "implementation complete; whole-repo review/verify clean rounds pending." The v1.1 review must cover the whole repo, not just paper/rebuttal files.
- Phase 14 declares global production skill replacement out of scope. Preview install verification under `.build/codex-preview` is not production install.
- Some docs contain target/recommended taxonomies that are broader than the current manifest. Review must separate "missing from current accepted bridge-ready surface" from "bug against implemented surface."
- `ljx-GSD-do` is conceptual/host freeform routing, not an independent installed skill.
- Compatibility with all optional Auto integrations should generally be fail-open/companion-based unless a specific generated `ljx-GSD-*` command promises direct ownership.

## 11. Review Hotspots For Phase 17/18

Highest-risk parity areas:

- Generated skill Markdown and helper code drift out of sync.
- Helper writes structured state directly from generated-skill instructions instead of helper-mediated payload updates.
- `next` or `research-pipeline` silently skips bridge-ready boundaries and behaves like a hidden second control plane.
- Phase type visibility/resolution fails on incomplete or migrated projects.
- Code-review/verify freshness misclassifies stale findings as clean or blocks on post-fix sync artifacts.
- Auto review loop loses reviewer independence, max-round/threshold settings, raw logging, or human-checkpoint semantics.
- Research commands produce root Auto-like artifacts that are not linked back into phase-local artifacts/state.
- Paper/rebuttal workflows create a second submission control plane or ignore venue/evidence constraints.
- Workstream commands collapse into workspace semantics or mutate primary/mainline state unexpectedly.
- Roadmap admin commands mutate future phases without typed records, admin mutation records, or confirmation gates.
- Preserved Auto companion capabilities are missing from preview install or are exposed but disconnected from `ljx-GSD` recommendations.
- Configuration parameters are documented but not read, aliases are not resolved before workflow logic, or safe/autonomous policy is ignored.

## 12. Immediate Next Use

Phase 17 should convert this index plus Phase 15 upstream notes into:

- a severity-ordered review rubric,
- a scenario matrix,
- concrete static/dynamic probes,
- pass/fail gates,
- and a bounded review loop rule that requires two consecutive clean rounds with a maximum of 11 total rounds.
