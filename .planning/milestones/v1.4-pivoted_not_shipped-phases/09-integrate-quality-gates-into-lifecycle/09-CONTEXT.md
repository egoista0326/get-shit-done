# Phase 09: Lifecycle Quality Gates - Context

**Gathered:** 2026-04-10
**Status:** Ready for planning

## Phase Boundary

Integrate `code-review`, hidden `code-review-fix`, and `verify-work` into the typed lifecycle shell so review freshness, blocking semantics, and continuation routing become authoritative lifecycle quality gates.

This phase does **not** redesign research-domain workflows, reopen the accepted code-review policy defaults, or invent a second control plane for review and verification. It turns the already accepted quality-gate contract into one coherent runtime path.

## Implementation Decisions

### Quality-Gate State Ownership
- **D-01:** Keep the outer lifecycle shell stages as `discuss -> plan -> execute`. Phase 09 must not redefine the shell into a larger top-level stage machine.
- **D-02:** Represent review and verification as first-class post-execute quality gates stored on the existing phase record, preferably under a dedicated phase-record quality-gate subtree such as `quality_gates.{code_review,verify_work}`, rather than by introducing `lifecycle.review` / `lifecycle.verify` as new outer lifecycle stages.
- **D-03:** Do not create new top-level `.planning/state/code-reviews/` or `.planning/state/verifications/` families in this phase. Human-readable truth remains phase-local `CODE_REVIEW.md` and `VERIFICATION.md`; structured state stores only the authoritative gate summary needed for routing and freshness checks.

### Gate Routing And Applicability
- **D-04:** The typed requirement map already encoded in config remains authoritative for whether code review is required. Phase 09 should integrate that map into lifecycle routing rather than redefining a new per-phase eligibility matrix.
- **D-05:** The canonical code-bearing continuation path for required-review cases is `execute-phase -> code-review -> verify-work -> next`.
- **D-06:** When a phase type or requirement rule does not require code review, the quality-gate path may remain `execute-phase -> verify-work -> next`, but this must still be decided by the same authoritative routing layer instead of scattered helper-local heuristics.

### Blocking, Fix, And Freshness Semantics
- **D-07:** `code-review-fix` remains a hidden repair step, not an automatic lifecycle stage. `next` may recommend it, but must not silently execute a fix loop on the user's behalf.
- **D-08:** Missing required review, stale review, blocking review findings, and missing execution evidence all block `verify-work` and `next`.
- **D-09:** Warning-only findings remain visible, but whether they block continuation must continue to respect `workflow.code_review_block_policy.allow_warning_pass`.
- **D-10:** After `code-review-fix`, the system should route according to `workflow.code_review_rerun_after_fix`; fixes must not implicitly mark the old review fresh or verified.
- **D-11:** Freshness remains `latest-material-scope`: only the latest review may be fresh, and freshness invalidation must be driven by authoritative reviewed scope plus material evidence changes, not by reinterpreting prose artifacts or duplicating git heuristics across commands.

### Integration Boundary
- **D-12:** Phase 09 is an integration phase, not a greenfield rewrite. Reuse the current `ljx-code-review-tools`, `ljx-code-review-fix-tools`, `ljx-verify-tools`, `ljx-state-tools`, and `ljx-lifecycle-shell-tools` paths wherever practical.
- **D-13:** Phase-local artifacts and structured state must agree, but artifacts must not become a second control plane. Routing should prefer authoritative structured gate summaries and use artifacts as evidence and operator-facing detail.
- **D-14:** `next` continues to be one-step and honest. It may surface `code-review`, `code-review-fix`, or `verify-work`, but must not silently chain multiple quality-gate actions in one jump.

### the agent's Discretion
- Exact field names inside the phase-record quality-gate subtree, as long as they remain phase-record-local and do not overload the outer lifecycle shell.
- Exact normalization of summary fields mirrored from `CODE_REVIEW.md` and `VERIFICATION.md`, provided the mirror is sufficient for freshness and blocking decisions.
- Whether an engineering-style `UAT` mirror remains useful as a secondary artifact, as long as `VERIFICATION.md` and structured gate state remain authoritative.

## Specific Ideas

- Reuse the already accepted review-lane defaults and blocking-class policy instead of reopening the policy discussion in Phase 09.
- Treat this phase as the place where the runtime stops calling review and verification “sidecars” and starts treating them as lifecycle-owned gates.
- Preserve the accepted hidden-fix behavior: `code-review-fix` should be discoverable and routable, but never silently substituted for explicit user intent.

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Scope And Requirements
- `.planning/ROADMAP.md` — Defines Phase 09 goal, dependencies, success criteria, and the three plan slots.
- `.planning/REQUIREMENTS.md` — `IMPL-03` is the requirement this phase must satisfy.
- `.planning/PROJECT.md` — Locks the reuse, preservation, and integration policies that Phase 09 must not violate.
- `.planning/STATE.md` — Current project position and the accepted statement that Phase 09 is the next blocker after the Phase 08 shell.

### Accepted Quality-Gate Contract
- `LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md` — Public contract for `ljx-GSD-code-review` and hidden `ljx-GSD-code-review-fix`, including freshness and fix semantics.
- `LJX-GSD-CORE-COMMAND-SPECS.md` — Public contract for `ljx-GSD-verify-work` and typed continuation behavior.
- `LJX-GSD-INTERFACES.md` — High-level routing position of `code-review` and `verify-work` in the public interface model.
- `LJX-GSD-DESIGN-DECISION-LOG.md` — Accepted defaults for review depth, multi-agent policy, blocking classes, freshness, and typed requirement mapping.

### Immediate Upstream Dependency
- `.planning/phases/08-complete-core-lifecycle-shell/08-04-SUMMARY.md` — The latest lifecycle-shell summary; Phase 09 must extend this shell rather than replacing it.

## Existing Code Insights

### Reusable Assets
- `bin/lib/ljx-code-review-tools.cjs` — Already resolves review scope, lane assignments, typed requirement rules, and phase-local review artifact targets.
- `bin/lib/ljx-code-review-fix-tools.cjs` — Already models hidden fix routing and rerun-after-fix behavior.
- `bin/lib/ljx-verify-tools.cjs` — Already computes verification blockers, code-review freshness, and evidence-gate recommendations.
- `bin/lib/ljx-state-tools.cjs` — Already owns lifecycle-aware routing and `next` / snapshot recommendations, so this is the main integration point for authoritative quality-gate progression.
- `bin/lib/ljx-lifecycle-shell-tools.cjs` — Already owns typed phase lifecycle status and should remain the shell-side authority that Phase 09 extends rather than bypasses.
- `bin/lib/ljx-bridge-contract.cjs` — Already centralizes typed review requirement rules and post-fix recommendation policy.

### Established Patterns
- Phase-local markdown artifacts plus phase-record summary mirrors are the accepted truth split.
- Typed phase resolution and honest-stop semantics already flow through `readCommandPhaseContext()` and should stay centralized.
- Freshness and continuation logic should converge into one runtime recommendation path rather than separate per-command heuristics.

### Integration Points
- Post-execute routing in `bin/lib/ljx-state-tools.cjs`
- Review context and assignment generation in `bin/lib/ljx-code-review-tools.cjs`
- Fix-loop handoff in `bin/lib/ljx-code-review-fix-tools.cjs`
- Verification preflight in `bin/lib/ljx-verify-tools.cjs`
- Generated skill wording in `bin/lib/codex-conversion.cjs` for `code-review`, `code-review-fix`, and `verify-work`

## Deferred Ideas

- Reworking discovery, refine, experiment, claim, paper, and rebuttal workflow ownership beyond the existing typed requirement map belongs to Phases 10-12.
- Reopening the accepted code-review policy defaults or public command taxonomy is out of scope for this phase.
- Adding new top-level review-state families under `.planning/state/` is deferred unless a later schema decision explicitly reopens that topic.
- Fully autonomous `fix -> rerun review -> verify` chaining inside `next` is deferred; this phase keeps one-step progression.

---

*Phase: 09-integrate-quality-gates-into-lifecycle*
*Context gathered: 2026-04-10*
