# Phase 12: Paper And Rebuttal Completion - Context

**Gathered:** 2026-04-11
**Status:** Ready for research and planning
**Mode:** Auto-selected recommended path: stay closest to GSD and Auto, prefer reuse, and preserve minimal modification.

## Phase Boundary

This phase completes `paper-pipeline` and `rebuttal` so paper drafting, paper improvement, external-review response, venue constraints, and paper/rebuttal state all converge on one bounded paper-phase model.

This phase is responsible for:

- making `paper-pipeline` own a bounded paper workspace and linked paper-state record coherently
- making `rebuttal` resume and continue from the bounded rebuttal workspace without inventing a second submission control plane
- connecting paper and rebuttal routing back to experiment evidence, claim readiness, and later lifecycle steps with explicit venue and evidence constraints
- preserving Auto paper-writing and rebuttal stage structure while adapting them into the `ljx-GSD` `.planning/` control plane
- adding regression tests that cover direct helper invocation, generated skill wording, install/runtime helper copies, state writer safety, and routing behavior across paper and rebuttal helpers

This phase is not responsible for:

- replacing Auto `paper-plan`, `paper-figure`, `paper-illustration`, `paper-write`, `paper-compile`, or `auto-paper-improvement-loop` with a new paper engine
- replacing Auto rebuttal's workspace-stage flow with a new submission controller
- implementing final `research-pipeline` orchestration or migration cutover; those remain Phase 14
- adding mutating workstream or roadmap admin behavior; that remains Phase 13
- silently launching rebuttal-time experiments, claiming submission readiness without venue constraints, or mutating lifecycle completion from direct paper/rebuttal helpers

## Locked Inbound Decisions

- **D-01:** GSD remains the outer control plane and `.planning/` remains the authoritative root.
- **D-02:** Auto Research workflows are absorbed as a native workflow family, but their behavior, skill content, and companion-skill intent must be preserved unless a change is required for correctness.
- **D-03:** Minimal modification means reusing established GSD and Auto semantics and shared-rule owners whenever practical, not merely preserving command names.
- **D-04:** Phase-local markdown artifacts remain the human-readable operator surface. Structured state is added only where routing, continuity, evidence ownership, venue constraints, or freshness cannot be represented safely by local markdown alone.
- **D-05:** Direct workflow invocation and lifecycle-driven invocation must converge on the same artifacts and state records.
- **D-06:** `next` and downstream recommendations must remain one-step and honest. They may recommend the next workflow but must not imply it has already run.
- **D-07:** Phase 11's evidence/claim model is now the accepted upstream source for paper-facing claim readiness. Phase 12 should link to it rather than rebuilding claim evaluation.

## Implementation Decisions

### Paper state and artifact ownership

- **D-08:** `papers/{phase}.json` is the structured paper-state family for this phase. It should carry paper story, manuscript, compile, improvement, rebuttal linkage, venue, and routing summaries only.
- **D-09:** The paper-state record is a link and recovery layer, not a replacement for phase-local `PAPER_PLAN` / `PAPER_PIPELINE` artifacts or the repo-local `paper/` workspace.
- **D-10:** Context reads may expose intended paper-state and workspace paths, but must not create empty `.planning/state/papers/{phase}.json` records.
- **D-11:** Any paper-state writer must stop honestly on malformed existing records or mismatched existing `phase_id`; it must not overwrite ownership state for another phase.
- **D-12:** If a coherent helper can own repeated paper/rebuttal path and readiness logic, create a small shared paper evidence helper rather than duplicating path rules across `paper-pipeline` and `rebuttal`.

### Paper-pipeline completion

- **D-13:** `paper-pipeline` owns phase-local `PAPER_PLAN` and `PAPER_PIPELINE` artifacts plus the bounded `paper/` workspace path.
- **D-14:** `paper-pipeline` should preserve the accepted Auto paper-writing stage structure: `paper-plan`, `paper-figure`, `paper-illustration`, `paper-write`, `paper-compile`, and `auto-paper-improvement-loop`.
- **D-15:** Venue and page-limit settings from `research.paper.*` are paper constraints, not global lifecycle truth. Generated skill wording should make those constraints explicit.
- **D-16:** `autoProceed` and `humanCheckpoint` settings must remain visible in helper context and skill wording so the wrapper does not silently chain through all Auto paper stages when the configuration says to pause.
- **D-17:** `paper-pipeline` may write a structured paper-state summary only through an explicit writer command, never by direct `.planning/state/` file mutation.

### Rebuttal completion

- **D-18:** `rebuttal` owns the bounded `rebuttal/` workspace and preserves the accepted Auto rebuttal stage structure: review normalization, issue board, strategy plan, experiment plan if needed, experiments log, draft, paste-ready output, rich draft, stress test, state, and follow-up log.
- **D-19:** `rebuttal` should link to the same paper-state record as `paper-pipeline` instead of inventing a separate rebuttal state family or root-level submission controller.
- **D-20:** Missing external reviews should remain an honest stop for initial rebuttal, but an existing rebuttal workspace should be resumable even if root review files are not present.
- **D-21:** If venue character-limit settings are missing, `rebuttal` must surface that confirmation is required before claiming paste-ready output.
- **D-22:** If `autoExperiment = false`, rebuttal should recommend `ljx-GSD-experiment-bridge` for evidence sprints instead of silently launching experiments. If `autoExperiment = true`, the route must still stay explicit and bounded.
- **D-23:** `rebuttal` may update paper-state linkage only through an explicit writer command that preserves paper-pipeline-owned fields.

### Routing and evidence constraints

- **D-24:** Paper routing should consider upstream evidence and claims from Phase 11 via artifact links and paper-state summaries, but should not rerun `claim-gate` or `result-to-claim` invisibly.
- **D-25:** `paper-pipeline` downstream routes may include `review-loop`, `rebuttal`, and `next`; `rebuttal` downstream routes may include `experiment-bridge`, `paper-pipeline`, and `next`. These remain recommendations, not hidden execution.
- **D-26:** Direct paper/rebuttal helpers must not mutate roadmap or phase completion. Lifecycle state remains owned by the outer GSD shell and quality gates.
- **D-27:** Build/install output and generated skill wording are part of the product surface. If runtime paper/rebuttal semantics change, generated skills and preview install behavior must stay aligned.

### Reuse and minimal-change discipline

- **D-28:** Start from `bin/lib/ljx-paper-pipeline-tools.cjs`, `bin/lib/ljx-rebuttal-tools.cjs`, `bin/lib/ljx-runtime-state.cjs`, `bin/lib/ljx-phase-context.cjs`, `bin/lib/codex-conversion.cjs`, and `bin/lib/build-skills.cjs`. Do not replace them wholesale.
- **D-29:** Follow the Phase 11 pattern where applicable: shared helper for repeated evidence/state logic, explicit writer commands for state updates, generated skill wording aligned to runtime, and tests for malformed/mismatched existing state.
- **D-30:** Preserve original Auto paper/rebuttal skill intent. If a user explicitly wants the original rich Auto flow, delegate or preserve its companion-stage structure rather than collapsing it into a generic paper summary.
- **D-31:** When fixing review-discovered bugs, check related helpers, generated skills, install output, and tests rather than applying the narrowest visible patch only.

### the agent's Discretion

- Exact JSON schema fields for paper-state stage summaries and rebuttal linkage, provided paper-pipeline and rebuttal do not overwrite each other's owned fields.
- Whether to extend `ljx-paper-pipeline-tools.cjs` directly or add a small `ljx-paper-evidence-tools.cjs` helper, provided repeated path/readiness semantics do not drift.
- Exact paper/rebuttal readiness status vocabulary, provided tests distinguish missing, present, intentionally pending, stale or needs-confirmation states where routing depends on them.
- Exact generated skill wording, provided it remains runnable, explicit, and faithful to Auto stage ownership.

## Specific Ideas

- Reuse and extend these runtime helpers instead of replacing them:
  - `bin/lib/ljx-paper-pipeline-tools.cjs`
  - `bin/lib/ljx-rebuttal-tools.cjs`
  - `bin/lib/ljx-runtime-state.cjs`
  - `bin/lib/ljx-phase-context.cjs`
  - `bin/lib/ljx-experiment-evidence-tools.cjs`
  - `bin/lib/codex-conversion.cjs`
  - `bin/lib/build-skills.cjs`
- Existing `writePaperPipelineState()` already writes `papers`; preserve that ownership while adding validation and field-preserving update behavior.
- `rebuttal` currently exposes `paperStateRecordPath` but has no writer. Phase 12 should decide whether rebuttal needs a narrow paper-state linkage writer, and if so it must preserve paper-pipeline-owned fields.
- `readRebuttalContext()` already stops on missing external reviews only for the initial stage while allowing existing workspace resume; keep that behavior.
- Tests should cover at least:
  - paper context reads do not create empty paper state
  - paper-state writers reject malformed and mismatched existing state records
  - paper-pipeline and rebuttal preserve each other's paper-state subfields
  - rebuttal initial missing reviews still stops honestly, while existing workspace resumes
  - missing venue character-limit marks paste-ready finalization as requiring confirmation
  - generated skill wording documents full writer commands and preserves Auto companion-stage intent
  - preview install copies any new paper helper runtime dependency

## Canonical References

**Downstream agents MUST read these before researching, planning, or implementing.**

### Phase and project contracts

- `.planning/ROADMAP.md` - Phase 12 goal, plan slots, and success criteria.
- `.planning/REQUIREMENTS.md` - `IMPL-06` and related paper-state requirements.
- `.planning/PROJECT.md` - project-level control-plane, preservation, and integration guardrails.
- `.planning/STATE.md` - current position and risk notes for Phase 12.
- `.planning/IMPLEMENTATION-LESSONS.md` - lessons about semantic reuse, shared-rule ownership, and review depth.

### Locked upstream decisions

- `.planning/phases/05-migration-and-parallelism-strategy/05-02-PLAN.md` - accepted `papers/{phase_id}.json` state family policy.
- `.planning/phases/08-complete-core-lifecycle-shell/08-CONTEXT.md` - direct/lifecycle convergence, paper route defaults, and minimal-modification policy.
- `.planning/phases/08-complete-core-lifecycle-shell/08-RESEARCH.md` - typed phase route table and paper/rebuttal scope deferral.
- `.planning/phases/11-complete-experiment-review-and-claim-workflows/11-CONTEXT.md` - evidence/claim model that Phase 12 must consume rather than rebuild.
- `.planning/phases/11-complete-experiment-review-and-claim-workflows/11-RESEARCH.md` - Phase 11 shared evidence helper pattern and generated-skill alignment discipline.
- `LJX-GSD-DESIGN-DECISION-LOG.md` - accepted control-plane, state-family, and paper phase decisions.
- `LJX-GSD-CORE-COMMAND-SPECS.md` - public paper lifecycle command contracts.
- `LJX-GSD-INTERFACES.md` - `paper-pipeline` and `rebuttal` public interface expectations.
- `LJX-GSD-SKILL-MIGRATION-DETAILED.md` - accepted stance for Auto paper/rebuttal skill adaptation.
- `LJX-GSD-PARAMETER-DICTIONARY.md` - canonical `research.paper.*` and `research.rebuttal.*` settings.

### Existing implementation references

- `bin/lib/ljx-paper-pipeline-tools.cjs` - current paper-pipeline context, state writer, artifact paths, companion skills, and downstream routes.
- `bin/lib/ljx-rebuttal-tools.cjs` - current rebuttal context, workspace paths, missing-review honest stop, stage inference, venue settings, and downstream routes.
- `bin/lib/ljx-runtime-state.cjs` - authoritative supported runtime-state family list and JSON read/write helpers.
- `bin/lib/ljx-experiment-evidence-tools.cjs` - Phase 11 shared helper pattern for link/readiness semantics and state-writer validation.
- `bin/lib/ljx-lifecycle-shell-tools.cjs` - typed paper phase routing and lifecycle adoption rules.
- `bin/lib/build-skills.cjs` and `bin/lib/codex-conversion.cjs` - generated skill and install surfaces that must remain aligned.
- `tests/paper-pipeline-bridge.test.cjs` - current paper helper coverage.
- `tests/rebuttal-bridge.test.cjs` - current rebuttal helper coverage.
- `tests/skill-build.test.cjs` - generated skill and runtime-install coverage.

### Auto skill references

- `/Users/lijiaxin/.codex/skills/paper-writing/SKILL.md` - Auto end-to-end paper-writing workflow intent.
- `/Users/lijiaxin/.codex/skills/paper-plan/SKILL.md` - Auto paper outline stage intent.
- `/Users/lijiaxin/.codex/skills/paper-figure/SKILL.md` - Auto paper figure/table stage intent.
- `/Users/lijiaxin/.codex/skills/paper-illustration/SKILL.md` - Auto paper illustration stage intent.
- `/Users/lijiaxin/.codex/skills/paper-write/SKILL.md` - Auto paper drafting stage intent.
- `/Users/lijiaxin/.codex/skills/paper-compile/SKILL.md` - Auto paper compile/verification stage intent.
- `/Users/lijiaxin/.codex/skills/auto-paper-improvement-loop/SKILL.md` - Auto iterative paper-improvement loop intent.
- `/Users/lijiaxin/.codex/skills/rebuttal/SKILL.md` - Auto rebuttal workflow intent.

## Existing Code Insights

### Reusable assets

- `readPhaseWorkflowContext()` and `readCommandPhaseContext()` already centralize phase resolution, config loading, honest stop metadata, and phase-local context discovery.
- `ljx-runtime-state.cjs` already allows the `papers` family and should remain the only state-family writer path.
- `writePaperPipelineState()` already demonstrates the explicit writer pattern for `papers/{phase}.json`.
- `readRebuttalContext()` already preserves Auto rebuttal resume semantics by distinguishing `initial`, `resume`, and `followup`.
- `buildPaperPipelineSkill()` and `buildRebuttalSkill()` already preserve major Auto stage names in generated skill text; Phase 12 should deepen those contracts rather than replacing them.

### Established patterns to preserve

- Phase-local artifacts are the operator-facing truth.
- Structured state is a routing/link/continuity summary, not a prose artifact replacement.
- Direct workflow helpers and lifecycle shell commands must converge on the same accepted artifacts.
- Missing upstream evidence should produce an honest stop or explicit recommendation, not fabricated completion.
- Generated skill wording and preview-install output must be reviewed with runtime code.

### Integration points

- Add or refine shared paper/rebuttal helper logic only if it reduces drift across helpers.
- Update `tests/paper-pipeline-bridge.test.cjs`, `tests/rebuttal-bridge.test.cjs`, and `tests/skill-build.test.cjs` before implementation so current bridge-era behavior fails for the new contract.
- If a new helper file is introduced, update `bin/lib/build-skills.cjs` so preview/install runtime copies it.
- After implementation, run focused paper/rebuttal tests, generated-skill tests, `node bin/install.js --preview`, syntax checks for changed helper files, and full `npm test`.

## Deferred Ideas

- Workstream and roadmap mutation administration belongs to Phase 13.
- Full migration cutover and end-to-end `research-pipeline` parity verification belong to Phase 14.
- Provider-specific external review engines remain optional V2 work.
- Camera-ready/submission packaging beyond the accepted paper/rebuttal workspace stays out of scope unless a later phase explicitly adds it.

---

*Phase: 12-complete-paper-and-rebuttal-workflows*
*Context gathered: 2026-04-11*
