# 01-LJX-HISTORY-FAILURE-TAXONOMY

**Status:** build-round draft
**Evidence boundary:** Synthesized from ljx-GSD history/failure subagent report and v1.4 pivot artifacts.

## Failure Families

| Family | Historical evidence extracted by subagent | v2.0 implication |
|---|---|---|
| False completion and process-gate drift | v1.1/Phase 19 appeared to close, but Phase 20 and final verification showed capped/not clean. | One closure predicate must reconcile roadmap, state, review, summary, UAT, and verification before any completion claim. |
| Multi-surface truth drift | Runtime state, quality gates, lifecycle shell adoption, generated skill wording, preview output, docs, and review records held separate truth. | Define source-of-truth ownership before implementation. |
| Prompt fidelity loss under self-containment | Removing raw upstream calls could delete Auto/GSD semantic obligations. | Self-contained replacements must preserve upstream task obligations, not just names. |
| Filesystem and evidence safety | Repeated bugs around directories-as-files, symlinks, dangling links, stale artifacts, non-atomic writes, partial rollback. | Start implementation with negative tests for path and evidence safety. |
| State/document/accounting drift | Roadmap, `STATE.md`, phase records, summaries, review state, and bug ledgers repeatedly diverged. | State mirrors are runtime-adjacent if routing/recovery consumes them; update atomically or derive them. |
| Typed-phase blast radius | `phase_type` spread into lifecycle, research, roadmap admin, migration, docs, tests, and reviews. | Ban `phase_type`, typed routing, typed phase-chain proposal machinery, and broad phase schema changes. |
| Research pipeline chain integrity and stage handoff | Research stages lost policy, handoff, or persistence boundaries across discovery, refinement, experiment planning, execution, analysis, claim, paper, and rebuttal stages. | Each research command must declare producer, consumer, artifact root, required inputs, and handoff evidence before Phase 02 accepts the command contract. |
| Evidence-backed claim/audit gating | Historical bugs allowed supported claims without phase-local audit lineage, stale result analysis, provisional no-audit outputs, or unresolved audit defects flowing into papers. | `result-to-claim`, claim gates, paper pipelines, rebuttal evidence sprints, and experiment audits must hard-stop or visibly downgrade claims when raw evidence/audit lineage is missing or stale. |
| Review artifact schema and parser drift | Malformed `CODE_REVIEW`/`VERIFICATION` artifacts, `CR-*`/`WR-*`/`IN-*` disagreement, warning-finding formats, and bullet-heavy findings caused clean/dirty counts to diverge. | Review artifacts require schema validation, deterministic finding-count normalization, and parser tests for accepted heading/field-list formats. |
| Config, alias, override, and policy fragmentation | `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, profiles, overrides, CLI flags, external-service policies, rerun policies drifted. | Define one config model, alias normalizer, CLI parser, and override precedence. |
| Hook and adapter conformance drift | v1.4 bug rows repeatedly covered Codex hook template shape, `cwd` propagation, stale hook assumptions, install output, and external-service confirmation wiring. | Generated hooks and runtime adapters need explicit contract tests, ownership boundaries, and install/runtime parity checks. |
| Write races and partial mutation | Lifecycle and workstream writes created stale mirrors and partial state. | Use transaction/rollback or single-writer serialized state writes. |
| Backfilled evidence confused progress semantics | Phase 04-06 summaries were explicit accepted-baseline backfills, not newly executed plans, but later blurred accounting. | Backfill must be visibly non-execution evidence and cannot satisfy execute/completion gates. |
| Bridge-ready status was misleading | `next`/parity reports could indicate invocable handoff without proving phase goal completion. | Separate capability availability from goal completion. |
| Review matrix instability | v1.1-v1.4 fixed hundreds of accepted issues but kept finding new surfaces because the review matrix changed while implementation continued. | Freeze review dimensions before implementation; a clean round only counts after the matrix is stable and parser/accounting rules are deterministic. |

## User-Observed Failure Mapping

| User-observed issue | Historical mapping | v2.0 rule |
|---|---|---|
| `ljx-idea-discovery-tools` wrote context/state but did not perform full literature execute. | History confirms helper/prompt was strengthened repeatedly to preserve discovery obligations. | A context helper is not execution. `idea-discovery` requires literature retrieval/reading evidence and retained raw source references before it can claim discovery work completed. |
| `autoProceed=true` and stop boundary did not continue as expected. | Config-policy propagation and alias failures are documented across v1.3/v1.4. | `autoProceed` semantics must be command-owned, testable, and separated from checkpoints. |
| Engineering phase stopped in confusing plan-inventory/direct-refine state. | Pivot snapshot records route ambiguity; archive corroborates route/config defects. | Avoid typed route tables; ordinary phase lifecycle should remain GSD-compatible. |
| `next` reported bridge-ready but phase goal was incomplete. | GSD verifier boundary and bridge-ready reports show status overloading. | `next` may suggest next action, not completion. |
| Docs/state/roadmap/phase records lagged. | Repeated drift bugs and phase-record mirror issues. | Canonical writes must be serialized and/or derived from one source. |
| Research flows did not use GSD git/hook/lifecycle/artifact discipline. | v1.4 review protocol and bug ledgers repeatedly flagged these surfaces. | Research commands must use the same mutation and evidence gates. |
| Concurrent lifecycle sync overwrote state. | Write-race and stale timestamp families documented. | No parallel writes to authoritative state families. |
| Artifacts were written without execute evidence. | Backfill summaries explicitly labeled as accepted baselines, not execution. | Distinguish backfill, planning, review, and execute evidence. |

## Bug Ledger Scale

History lane extracted at least:

| Version | Ledger outcome |
|---|---|
| v1.1 | 93 rows: 92 fixed, 1 superseded |
| v1.2 | 63 fixed issues |
| v1.3 | 40 fixed issues plus one rejected/watch-style row |
| v1.4 | 166 accepted fixed_not_clean issues |
| Total | At least 361 accepted/fixed issues excluding superseded/rejected rows |

## Review Rule Implications

- Start with framework inventory before implementation.
- Review by matrix, not ad hoc rounds.
- Require source plus generated-preview parity for prompt/install changes.
- Treat prompt fidelity as behavioral correctness.
- Treat generated hook and runtime-adapter conformance as its own review dimension, not as a generic docs/config issue.
- Treat review artifacts as parseable contracts; malformed review/verification output cannot count as a clean gate.
- Treat research command chains as staged evidence systems; stage handoff, audit lineage, and claim freshness are separate review checks.
- Every finding must name the violated contract before fixing.
- Batch fixes by invariant family, not symptom.
- Docs/state/accounting updates are part of the gate when routing or recovery consumes them.
- Scenario review follows static review; it cannot replace it.
- Clean-round success is meaningful only after the matrix is stable.

## Source Index

Primary historical source paths cited by subagent:

- `/Users/lijiaxin/Downloads/new-gsd/.planning/milestones/v1.4-PIVOT-SNAPSHOT-2026-04-13.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/milestones/v1.4-pivoted_not_shipped-ARCHIVE-MANIFEST.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/MILESTONES.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/IMPLEMENTATION-LESSONS.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.1/REVIEW-RETROSPECTIVE-AND-NEXT-PROTOCOL.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.1/BUG-LEDGER.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.1/FINAL-VERIFICATION-REPORT.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.2/BUG-LEDGER.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.2/REVIEW-STATE.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.3/RETROSPECTIVE-AND-PROTOCOL.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.3/BUG-LEDGER.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.4/PROTOCOL.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.4/BUG-LEDGER.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.4/SCENARIO-ROUND-01-REVIEW.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.4/SCENARIO-ROUND-02-REVIEW.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.4/SCENARIO-ROUND-03-REVIEW.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/review/v1.4/SCENARIO-ROUND-04-REVIEW.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/milestones/v1.4-pivoted_not_shipped-phases/13-complete-workstream-and-roadmap-mutation-admin/13-REVIEW-VERIFY.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/milestones/v1.4-pivoted_not_shipped-phases/14-complete-migration-cutover-and-parity-verification/14-CONTEXT.md`
- `/Users/lijiaxin/Downloads/new-gsd/.planning/milestones/v1.4-pivoted_not_shipped-phases/20-expanded-strict-review/20-VERIFICATION.md`
