# 01-FRAMEWORK-SYNTHESIS-DRAFT

**Status:** build-round draft; must pass three subagent review rounds before Phase 01 acceptance.
**Evidence boundary:** Synthesized from seven Phase 01 build lanes: upstream GSD lifecycle, upstream GSD runtime, ljx implementation, ljx history, Auto front half, Auto experiment/claim, and Auto paper/rebuttal/tooling.

## Main Synthesis

v2.0 should rebuild `gsd` as upstream GSD plus a bounded research command extension, not as a continuation of ljx-GSD bridge architecture.

The core architecture should be:

```text
upstream GSD lifecycle/control plane
  -> ordinary phases and .planning artifacts
  -> standalone research commands
  -> research artifacts/evidence conventions
  -> same git/review/verify/state discipline
```

It should not be:

```text
new phase_type schema
  -> typed route table
  -> research pipeline as second control plane
  -> root Auto artifacts as authoritative state
```

## Cross-Framework Agreements

| Agreement | GSD evidence | ljx evidence | Auto evidence | Design implication |
|---|---|---|---|---|
| Commands should be thin and artifact-driven | Upstream commands route to workflows/runtime helpers. | Bridge generator became a drift surface. | Auto skills compose through files and command handoffs. | Use native standalone commands and source-indexed prompt contracts. |
| Completion must be evidence-based | Upstream has verifier, UAT, summary, audit, and state drift checks. | False completion and bridge-ready drift were major failures. | Auto claim gates require raw results/audits/reviews. | Separate next action, capability availability, and goal completion. |
| State ownership must be explicit | Orchestrator owns `STATE.md`/`ROADMAP.md`. | Multi-surface truth drift and write races recurred. | Auto has loop state files but not GSD lifecycle state. | Keep one authoritative GSD control plane. |
| Research needs artifact conventions | GSD already uses phase artifacts as runtime API. | Research helpers lacked full lifecycle evidence discipline. | Auto has rich reports, logs, audits, claims, papers, rebuttals. | Add narrow research artifact contracts; do not change phase schema. |
| Review must be matrix-based | Upstream uses plan/review/verifier gates. | v1.x ad hoc loops did not converge. | Auto uses reviewer independence and raw review logs. | Use review rounds with fixed lanes and source coverage checks. |
| Upgradeability matters | Upstream prompt bodies should be indexed, not copied. | Bridge prompt conversion drifted. | Auto overlays can drift from base skills. | Prefer source indexes, native wrappers, and small adapters. |

## Primary Design Tensions For Phase 02

| Tension | Why it exists | Phase 02 must decide |
|---|---|---|
| Markdown as state vs structured state | Upstream derives state from `STATE.md` and disk; ljx added structured state families; Auto has local JSON loop states. | Keep markdown source, structured source with markdown mirror, or hybrid with strict ownership. |
| Research artifact mirroring | Auto uses root/refine-logs/paper/rebuttal/research-wiki; GSD uses phase dirs under `.planning/`. | Authoritative v2.0 writes go under the active phase's `.planning/phases/<phase>/research/` root; legacy/root Auto paths are import/export mirrors only. |
| Auto `AUTO_PROCEED` vs GSD checkpoints | Auto proceeds with best option; GSD has checkpoint types and auto-mode semantics. | Canonical precedence: hard gates and explicit human stops win; `HUMAN_CHECKPOINT` pauses decision/review checkpoints; `AUTO_PROCEED` only advances safe local steps after evidence and service policy pass. |
| Audit gate default | Auto audit can inform exploratory iteration, but user wants high reliability for claims/papers. | Audit failures block claim/paper readiness by default; exploratory iteration may continue only with visible low-confidence/advisory tags. |
| Reviewer backend | Auto supports Codex, Gemini, Claude, generic LLM, MiniMax; GSD subagents are already available. | Default to Codex subagents; fallback to configured OpenAI-compatible, then Gemini/Claude/MiniMax only when configured and allowed by service policy. |
| Installer scope | Upstream installer supports many runtimes; user operates in Codex. | Codex-first minimal installer or full upstream runtime matrix. |
| SDK package boundary | Upstream SDK has public API, CLI, prompt templates, and tests beyond a thin runtime wrapper. | Consume SDK, adapt SDK, or defer SDK from initial v2.0 scope. |
| v1.4 code salvage | ljx has reusable helpers but high blast radius. | Explicit reuse criteria and quarantine of typed assumptions. |

## Draft Architecture Direction

1. Start from upstream GSD package/runtime and preserve ordinary GSD lifecycle first.
2. Keep `.planning/` as authoritative planning root during v2.0 unless a reviewed migration replaces it.
3. Add research commands as ordinary `gsd` commands, for example `gsd idea-discovery`, `gsd research-lit`, `gsd research-pipeline`, `gsd experiment-plan`, `gsd experiment-audit`, `gsd result-to-claim`, `gsd paper-write`, `gsd rebuttal`.
4. Each research command should read/write artifacts under the active phase's `.planning/phases/<phase>/research/` root by default and should update GSD state only through the normal lifecycle owner.
5. Research commands can operate inside ordinary phases as a special convention: a phase can have research artifacts and evidence gates, but no `phase_type` field or typed route table.
6. Auto root artifacts are import/export mirrors unless explicitly adopted into the phase-local research root by a GSD command; they are not authoritative control state.
7. Completion requires command-specific raw evidence plus independent review and verification/UAT gates. Summaries are cross-check artifacts only; they never prove completion by themselves.
8. Implementation should copy/reuse upstream GSD first, then add minimal adapters; do not start from ljx-GSD bridge code.

## Canonical Control Policies

- **Continuation precedence:** missing required evidence, blocking audit/verification failures, external-service confirmations, destructive writes, budget limits, and explicit human stops block first; `HUMAN_CHECKPOINT=true` pauses at review/decision checkpoints; `AUTO_PROCEED=true` only continues safe local steps whose gates already passed.
- **Reviewer backend:** default reviewer backend is Codex subagents when available. Fallback order is configured OpenAI-compatible LLM, then Gemini/Claude/MiniMax adapters only when configured and allowed by service policy. `difficulty` changes review depth/independence, not provider selection unless policy explicitly says so.
- **External services:** local phase-root file operations are allowed inside command contracts; network literature expansion is guided; reviewer APIs outside Codex are guided/blocking; GPU/remote compute, Vast, Modal, W&B, paid compute, publication, and submission upload are blocking by default and require explicit approval/config.
- **Single writer:** canonical lifecycle state has one owner per operation. Subagents and research commands route updates through that owner and lock path; mirrors are not independent writable truth.

## Review-Resolved And Remaining Gaps

- R1 corrected source-index precision, prompt-template locator coverage, SDK package boundary, and Auto paper-lane wording.
- R2 chose the authoritative research artifact root: v2.0 research writes are phase-local under `.planning/phases/<phase>/research/`; root Auto artifacts are import/export mirrors only.
- R2 resolved the `auto-review-loop` predicate for v2.0: stop only when reviewer score meets `POSITIVE_THRESHOLD` and reviewer verdict is positive/accept/pass.
- R3 added false-completion, single-writer, checkpoint-precedence, reviewer-backend, external-service, literature-execution, review-parser, and research claim/audit gating rules.
- Installed GSD `1.34.2` versus reference `1.35.0` divergence remains a Phase 02/05 baseline decision.
- SDK package inclusion remains a Phase 02/05 decision, but its source locations are indexed.
- Root GSD agent prompt bodies are indexed; copying prompt bodies into Phase 01 docs remains out of scope.
- A standalone `paper-review` command remains an explicit deferral unless Phase 02 adds one.
