# v1.1 Round 04 Strict Review

**Date:** 2026-04-12
**Scope:** Extra strict addendum review requested after v1.1 had already passed.
**Status:** Not clean for loop accounting; confirmed findings fixed and clean streak reset to 0.

## Objective

Review the current `ljx-GSD` implementation with more dimensions, stricter confirmation rules, richer scenario probes, and explicit prompt/task-planning fidelity checks.

This round intentionally went beyond "does the helper route correctly" and checked whether representative generated `ljx-GSD-*` skills still tell Codex how to do the substantive GSD/Auto work with enough planning, review, evidence, and output-quality detail.

## Review Lanes

| Lane | Reviewer | Result |
|------|----------|--------|
| Generated/install/docs | Subagent + local confirmation | Clean; preview builds 30 bridge-ready skills and no compatibility wrappers. Prompt-quality gaps were later found by the dedicated prompt lane and fixed in generated skill content. |
| Runtime/state/admin | Subagent + local confirmation | Confirmed P1/P2 defects in handoff JSON shape handling, config alias precedence, state-record id safety, and path containment. Fixed with regression tests. |
| Research/parity/scenario | Subagent + local confirmation | Confirmed P2/P3 defects in migration evidence import, duplicate migration sessions, direct-artifact file checks, experiment-plan prerequisite checks, result-to-claim evidence gating, rebuttal venue gating, and research-pipeline chaining. Fixed P2 defects; P3 rebuttal state normalization also fixed. |
| Prompt-quality | Subagent + local confirmation | Confirmed prompt-quality degradation risk in representative lifecycle/review/research skills. Fixed by adding generated `prompt_quality_floor` sections and skill-build regression tests. |

## Scenario Coverage

The expanded strict matrix is `.planning/review/v1.1/STRICT-SCENARIO-MATRIX.md` and covers X01-X24:

- install/manifest/preview self-containment
- parser and malformed-state honesty
- canonical config versus legacy alias precedence
- safe-mode experiment launch boundaries
- code-review/verify freshness and post-fix rerun semantics
- workstream and roadmap-admin safety
- migration/cutover non-destructive state handling
- research-pipeline typed phase-chain control plane
- direct artifact adoption and near-miss rejection
- literature, novelty, research-review, experiment, claim, paper, rebuttal boundaries
- generated skill Codex adapter semantics
- preserved Auto companion skill discoverability
- per-skill prompt fidelity for GSD lifecycle and Auto research workflows
- explicit no-capability-deletion checks for thin prompts that run successfully but remove upstream task depth

## Confirmed Fixes

The user-facing bug ledger records the full list as BUG-005 through BUG-018.

High-level fixed areas:

- malformed resume handoff JSON no longer throws raw TypeError when valid JSON is not an object
- legacy `workflow.code_review_block_on_severity` now overrides built-in defaults when canonical project policy is absent, while canonical project policy still wins when both are present
- runtime state record ids are rejected before they can escape a family directory
- quality-gate project-relative path normalization rejects sibling-prefix absolute paths
- migration import recognizes canonical Auto `IDEA_REPORT.md` as phase-chain evidence
- duplicate migration session ids stop before overwriting prior import/conflict/repair state
- research-pipeline apply creates a sequential typed chain after reused phases
- direct adoption checks require real files, not directories named like artifacts
- experiment-bridge requires a real file for `EXPERIMENT_PLAN.md`
- result-to-claim cannot persist `supported` without evidence/evaluator artifacts and now validates existing claim state before evidence gating
- rebuttal state cannot persist `paste_ready` while venue confirmation is still required
- generated representative skill prompts now include explicit prompt-quality floors for GSD planning/execution/review/verify and Auto discovery/refine/experiment/review/claim loops

## Prompt-Quality Confirmation

Added generated skill quality-floor checks for:

- `ljx-GSD-discuss-phase`: decision-capture depth, assumptions, rejected alternatives, unresolved risks
- `ljx-GSD-plan-phase`: research-to-planner-to-plan-checker loop, anti-shallow task decomposition, requirements coverage tracing
- `ljx-GSD-execute-phase`: wave-based dependency execution, dirty-worktree checkpoints, post-merge verification gate
- `ljx-GSD-code-review`: language-aware reviewer rubric, tight line findings, fail-closed scope handling
- `ljx-GSD-verify-work`: goal-backward verification and evidence corroboration beyond SUMMARY files
- `ljx-GSD-idea-discovery`: literature evidence, search notes, novelty deltas, reviewer objections, ranking rationale, pilot feasibility handoff
- `ljx-GSD-research-review`: top-tier PC-style critique, reject-level reasons, methodological threats
- `ljx-GSD-novelty-check`: search/query evidence, closest-prior comparisons, claim-by-claim novelty deltas
- `ljx-GSD-research-refine`: Anchor Check, Simplicity Check, raw reviewer response, score history, READY/REVISE/RETHINK
- `ljx-GSD-experiment-plan`: claim-to-experiment mapping and must-run versus nice-to-have separation
- `ljx-GSD-experiment-bridge`: argparse/config hyperparameters, seeds, JSON/CSV outputs, logging/tracking, ground-truth warning
- `ljx-GSD-result-to-claim`: `claim_supported: yes|partial|no`, confidence, evidence references, `[pending external review]` fallback
- `ljx-GSD-review-loop`: per-round raw reviewer response, reviewer identity, score history, implemented fixes before re-review

## Verification Evidence

Fresh commands run after fixes:

- `node --test tests/runtime-core.test.cjs tests/code-review-bridge.test.cjs tests/result-to-claim-bridge.test.cjs` -> 62/62 pass
- `node --test tests/skill-build.test.cjs` -> 40/40 pass
- focused strict scenario suite -> 192/192 pass
- `node bin/install.js --preview` -> success; 30 bridge-ready skills; no compatibility wrappers
- preview prompt grep -> 13 generated skills contain `<prompt_quality_floor>` sections
- `node bin/install.js --print-manifest` -> 30 bridge-ready public/hidden skills
- `node --test tests/*.test.cjs` -> 572/572 pass

## Residual Risk

- No confirmed P0/P1/P2 issue remains in Round 04.
- External API, live literature, and GPU execution were not launched; this was intentional. Passing behavior for those scenarios is honest preparation, confirmation, and evidence boundaries rather than fabricated live results.
- Historical Phase 12 whole-repo review/verify debt remains documented as pre-existing v1.0 archive debt, not a new Round 04 failure.
- Global production skill replacement remains out of scope; this round verified the in-repo preview/install surface.

## Outcome

Round 04 fixed confirmed issues, so it is not a clean round under `REVIEW-PROTOCOL.md`. The earlier Round 02/Round 03 clean streak was superseded by the strict addendum. Round 05 and Round 06 later found additional confirmed issues, so final success now requires two fresh clean rounds after the Round 06 fixes.
