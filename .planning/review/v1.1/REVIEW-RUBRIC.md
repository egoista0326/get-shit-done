# v1.1 Review Rubric

**Generated:** 2026-04-12
**Scope:** entire current `ljx-GSD` repository, generated Codex preview output, `.planning` state/docs, tests, and upstream GSD/Auto parity.

## 1. Severity

P0 - release blocker:

- data loss, unsafe deletion, irreversible mutation without confirmation, or state corruption
- generated skill/runtime helper cannot load or run at all
- install/preview generation is broken
- `next`, `research-pipeline`, or direct research commands create a second hidden control plane or claim work ran when it did not
- review/verify gates incorrectly report clean when known blocking defects remain

P1 - major behavior bug:

- a public `ljx-GSD-*` command violates its documented helper/state contract
- a user-requested core scenario is impossible or routes to the wrong lifecycle family
- GSD or Auto capability is materially removed without a deliberate compatibility path
- generated skill prompt content materially weakens a claimed GSD/Auto capability even if helper routing and tests still run
- structured state and human-readable mirrors diverge in a way that changes routing or recovery
- safe/autonomous or confirmation policy is ignored for expensive/risky actions

P2 - moderate correctness or parity issue:

- confusing but recoverable recommendation drift
- stale docs or generated skill wording that can mislead normal users
- prompt/task-planning omissions that degrade a claimed skill's expected output quality, reviewer discipline, evidence capture, or artifact completeness
- missing or weak regression coverage for implemented behavior
- duplicated logic that creates realistic drift risk
- optional Auto companion capability is present but not discoverable from relevant `ljx-GSD` route

P3 - polish / maintainability:

- naming inconsistency that does not change behavior
- minor docs incompleteness
- small efficiency issue without user-visible impact
- non-blocking test organization or comments

## 2. Review Order

1. Hard runtime and data-integrity checks.
2. Generated skill/helper contract checks.
3. Lifecycle/state correctness checks.
4. GSD parity checks.
5. Auto/ARIS research parity checks.
6. User scenario matrix checks.
7. Minimal-modification and efficiency checks.
8. Documentation and naming checks.

Reviewers should stop and flag P0/P1 candidates immediately, but still complete enough scoped reading to avoid false positives before confirmation.

## 3. Dimensions And Pass Criteria

### A. Runtime Load, Install, And Test Baseline

Evidence:

- `node bin/install.js --print-manifest`
- `node bin/install.js --preview`
- `node --test tests/*.test.cjs`
- representative helper context commands

Pass:

- install/preview generation succeeds
- manifest and preview generated skills agree
- tests pass or failures are explicitly attributable to environment-only causes
- helpers fail honestly on malformed/missing state instead of crashing

Bug triggers:

- broken install, missing generated skill, helper crash, unhandled exception, or test failure from repository logic

### B. Generated Skill / Helper Contract

Evidence:

- `.build/codex-preview/skills/ljx-GSD-*/SKILL.md`
- `.build/codex-preview/ljx-gsd/runtime/*.cjs`
- `bin/lib/ljx-*.cjs`
- `tests/skill-build.test.cjs`

Pass:

- generated skills call helper/context commands first
- generated skills respect helper-provided paths, recommendations, stop reasons, and payload-write boundaries
- no generated skill claims a bridge-ready or deferred action already ran
- generated skill paths match installed runtime paths
- generated skills preserve the substantive upstream task prompt for claimed capabilities, not just the routing shell

Bug triggers:

- direct structured-state edits from generated instructions where helper-mediated writes are required
- stale helper path in generated skill
- missing Codex adapter behavior where inherited GSD workflow text requires it
- wording that instructs unsafe or impossible behavior
- thin-wrapper wording that drops upstream planning/review/execution quality requirements, evidence boundaries, reviewer-state requirements, or required artifact content for a claimed GSD/Auto workflow

### C. Lifecycle And State Correctness

Evidence:

- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/state/phase-records/*.json`
- `bin/lib/ljx-state-tools.cjs`
- `bin/lib/ljx-lifecycle-shell-tools.cjs`
- lifecycle tests

Pass:

- current phase resolution matches roadmap/state
- explicit `phase_type` is visible and used for routing
- lifecycle shell writes only its owned artifacts/state
- `next` returns only inline-safe actions or bridge-ready/deferred handoffs
- pause/resume/progress do not corrupt current phase or workstream context

Bug triggers:

- `phaseResolutionError`, wrong current phase, silent phase type mutation, lifecycle step skipped, or unowned state mutation

### D. GSD Parity

Evidence:

- Phase 15 GSD reference notes
- local lifecycle/admin/workstream helpers
- generated `ljx-GSD-*` skills
- GSD scenario probes

Pass:

- GSD phase lifecycle, planning artifacts, review/verify gates, workstream/workspace distinction, migration/admin semantics, autonomous boundedness, and state durability remain represented
- any omitted GSD command is intentionally outside current public surface or preserved through a compatible route
- lifecycle/review/admin skill prompts preserve GSD's substantive planning, execution, verification, and mutation-safety discipline

Bug triggers:

- material GSD capability silently deleted, lifecycle gate weakened, workstream/workspace conflated, or autonomous loop made unbounded
- generated lifecycle/review prompts become materially shallower than upstream GSD in a way that lowers task quality while appearing to pass routing checks

### E. Auto/ARIS Research Parity

Evidence:

- Phase 15 Auto/ARIS reference notes
- local research helper families
- preserved Auto companion skills in preview output
- generated research `ljx-GSD-*` skills

Pass:

- idea discovery, refinement, experiment planning/execution, review loop, claim gate, paper/rebuttal, novelty, ablation, research review, result-to-claim, and literature/analysis companion capabilities remain available or intentionally mapped
- reviewer independence, max rounds, score thresholds, human checkpoint, raw/structured review state, experiment integrity, citation discipline, and rebuttal provenance are preserved where the local command claims ownership
- research skill prompts preserve Auto/ARIS stage depth, evidence expectations, reviewer/auditor state, thresholds, and artifact content requirements for the capability they claim

Bug triggers:

- direct research command writes root Auto artifacts outside phase/state contract as completion truth
- review loop loses boundedness/independence
- paper/rebuttal creates a second submission control plane
- companion capability is missing from preview install without an alternative
- generated research prompts omit critical upstream stages, thresholds, score histories, raw reviewer response capture, experiment integrity requirements, or claim/verdict normalization while still advertising the capability

### F. Scenario Coverage

Evidence:

- `.planning/review/v1.1/SCENARIO-MATRIX.md`
- focused helper probes
- existing tests and any new tests added during fixes

Pass:

- each user-requested scenario has a plausible command path, evidence boundary, pass criteria, and failure trigger
- expensive external actions stop at planning/confirmation unless autonomous policy explicitly allows them

Bug triggers:

- scenario cannot be initiated, routes to a wrong phase type, or claims external research/compute work completed without evidence

### G. Minimal Modification And Efficiency

Evidence:

- diff against upstream behavior notes
- helper family design
- duplicated logic search
- tests proving shared behavior

Pass:

- local implementation reuses GSD control-plane concepts and Auto research content instead of rebuilding unrelated systems
- duplicated logic is justified or low-risk
- optional integrations fail open
- new abstractions are scoped to real shared behavior

Bug triggers:

- redundant new control plane, avoidable duplicate helper logic causing drift, dead generated surface, or expensive default behavior without need

### H. Documentation And User-Facing Accuracy

Evidence:

- top-level docs
- generated skill descriptions
- user guides/config docs
- `.planning` milestone docs

Pass:

- docs distinguish current bridge-ready surface from future target taxonomy
- user-facing behavior matches helper reality
- known debt and out-of-scope production cutover are explicit

Bug triggers:

- docs say a command is production-ready when manifest says conceptual/deferred
- generated skill directs users to missing commands
- stale docs would cause unsafe or failed usage

## 4. Global Pass Gate

A review round is clean only if:

- no P0/P1/P2 confirmed bugs remain from the round
- any P3-only notes are either recorded as residual risk or fixed if trivial
- required baseline commands for that round run successfully or environment-only failures are documented
- scenario matrix coverage has no blocking gaps for the scope of that round

The milestone only passes after two consecutive clean rounds under `REVIEW-PROTOCOL.md`.

## 5. Future Review Addendum

For the next review milestone, apply the retrospective protocol in `.planning/review/v1.1/REVIEW-RETROSPECTIVE-AND-NEXT-PROTOCOL.md` before using this rubric.

Additional required dimensions:

- Cross-surface inventory: upstream GSD, base Auto/ARIS, official Codex overlay, ljx generator, runtime helper, generated preview, support assets, tests, and docs/state must be mapped before fixes.
- Prompt capability preservation: each claimed skill must preserve upstream planning depth, reviewer discipline, evidence requirements, bounded loops, artifact obligations, and continuation semantics, not only helper routing.
- Official Codex overlay skepticism: official Codex sources must be compared against base prompts for semantic capability deletion before being preferred.
- Adapter correctness: active preview output must be checked for Claude Code-only paths, hooks, model examples, MCP/tool schema drift, unsupported subagent parameters, and stale support tools.
- Negative input pack: each safety-sensitive gate must handle missing files, directories, symlinks, dangling symlinks, stale artifacts, conflicting states, legacy aliases, malformed JSON, disabled configs, and autonomous/safe-mode policy differences.
- Root-cause batching: confirmed fixes should be grouped by invariant and covered with table-driven regression tests where possible.
- Accounting correctness: docs, `.planning` state, phase records, and `next` routing must reflect the current review-loop state after every confirmed fix.
