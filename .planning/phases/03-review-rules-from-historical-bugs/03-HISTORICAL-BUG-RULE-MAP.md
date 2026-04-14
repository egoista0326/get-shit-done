# Phase 03 Historical Bug To Review Rule Map

## Scope

This map derives Phase 05 review obligations from v1.1-v1.4 failure mechanisms.

Primary traceability comes from:

- `.planning/phases/01-source-framework-extraction/01-LJX-HISTORY-FAILURE-TAXONOMY.md`
- `.planning/phases/01-source-framework-extraction/01-REVIEW-R3-HISTORICAL-REGRESSION.md`
- `.planning/phases/01-source-framework-extraction/01-CROSS-FRAMEWORK-GAP-MAP.md`
- sampled raw ledgers under `.planning/review/v1.1/`, `.planning/review/v1.2/`, `.planning/review/v1.3/`, and `.planning/review/v1.4/`

Raw historical ledgers are large, so this file does not restate every bug row. Phase 01 already established source-indexed historical synthesis and scale. Phase 03 uses that synthesis as the durable index and samples raw rows to confirm mechanisms.

## Historical Scale

Phase 01 extracted at least 361 accepted/fixed historical issues across v1.1-v1.4, excluding superseded or rejected rows.

The scale matters because several failures were not one-off defects. They repeated across lifecycle state, generated prompts, research command artifacts, review accounting, migration/cutover, external-service policy, and scenario probes.

## Rule Family Map

| Historical failure family | Representative mechanism | Review-rule consequence |
|---|---|---|
| False completion | Summaries, roadmap checkboxes, plan counts, bridge-ready output, or stale review state implied completion without raw evidence and accepted gates. | Phase 05 must reject clean status unless raw evidence, review/verify/UAT gates, and explicit GSD lifecycle acceptance align. |
| Multi-surface truth drift | Roadmap, STATE, phase records, docs, quality gates, generated preview output, and review ledgers diverged. | Review must identify one owner per canonical state family and require mirrors to be derived, imported, or advisory. |
| Prompt fidelity loss | Thin generated skills preserved helper calls but dropped upstream GSD/Auto task obligations. | Review must compare claimed capability against substantive prompt obligations, not just command availability. |
| Path and evidence safety | Directories masqueraded as required files; symlinks, dangling links, sibling-prefix paths, and stale artifacts passed checks. | Review must require regular-file/path containment semantics for evidence and release artifacts. |
| State/accounting drift | Phase records, progress, review state, bug ledgers, summaries, and roadmap rows disagreed. | Review must treat accounting as a correctness surface when routing or recovery consumes it. |
| Typed-phase blast radius | `phase_type` spread through lifecycle routing, research-pipeline chain logic, roadmap admin, migration, tests, docs, and reviews. | Review must block any reintroduction of `phase_type`, typed routing, typed phase-chain ownership, or broad phase schema expansion. |
| Research chain handoff | Discovery, refinement, experiment planning, execution, analysis, claim, paper, and rebuttal stages lost producer/consumer and persistence boundaries. | Review must verify command contracts name inputs, outputs, owners, artifact roots, and handoff evidence. |
| Claim/audit gating | Supported claims, paper readiness, and rebuttal outputs proceeded with missing, stale, root-only, or unresolved audit evidence. | Review must require claim/audit freshness and downgrade/block semantics before downstream paper or rebuttal claims. |
| Review artifact parser drift | `CODE_REVIEW` and `VERIFICATION` formats, heading aliases, field-list findings, and finding counts diverged. | Review must require parseable review artifacts and deterministic blocker/advisory counts before clean rounds count. |
| Config and policy fragmentation | `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, aliases, profiles, CLI flags, reviewer fallback, rerun policy, and external-service policy drifted. | Review must verify one precedence contract and explicit override semantics across safe, auto, and danger-auto. |
| Hook and adapter conformance drift | Hook templates, cwd propagation, install output, generated skill adapter text, and Codex/Claude conversion drifted. | Review must include generated-hook/install/adapter parity as its own dimension. |
| Write races and partial mutation | Lifecycle sync, workstream mutations, pause/resume, migration import, and state writes could overwrite or partially update truth. | Review must require single-writer or locked/atomic-write semantics for canonical state families. |
| Backfilled evidence confusion | Backfilled baseline summaries were later confused with newly executed plan evidence. | Review must classify backfill as historical/accounting evidence only, never as execution evidence. |
| Bridge-ready ambiguity | `next`, helper context, or parity reports reported invocable handoff while phase goals were incomplete. | Review must separate capability availability from phase-goal completion. |
| Review matrix instability | Review rounds kept finding new surfaces because dimensions and parser/accounting rules changed while clean streaks were counted. | Review must freeze matrix and parser/accounting rules before clean-round counting starts. |

## User-Observed Failure Map

| User-observed failure | Historical mechanism | Required review check |
|---|---|---|
| `idea-discovery` wrote context/state but did not perform literature execution. | Context helper output was treated as execution. | Discovery commands must require literature retrieval/reading evidence before completion. |
| `autoProceed=true` and stop boundaries did not continue as expected. | Config precedence and checkpoint semantics drifted. | Presets, checkpoint behavior, and stop-boundary behavior must share one tested precedence model. |
| Engineering flow stopped in confusing inventory/direct-refine state. | Route ambiguity and typed/bridge layers obscured ordinary lifecycle progression. | Ordinary GSD lifecycle must remain understandable without research-specific routing tables. |
| `next` reported bridge-ready while phase goal was incomplete. | Capability availability was overloaded as completion. | Review must treat `next` recommendations as advisory routing only. |
| Docs, state, roadmap, and phase records lagged. | Multi-surface truth drift repeated across milestones. | State/accounting updates must be serialized or derived. |
| Research flows skipped GSD git/hook/lifecycle/artifact discipline. | Research helpers became a parallel workflow. | Research commands must use GSD mutation discipline and phase-local evidence. |
| Concurrent lifecycle sync overwrote state. | Single-writer boundaries were missing. | No parallel writes to authoritative state families. |
| Artifacts were written without execute evidence. | Backfills and skeletons were mistaken for completed work. | Completion must distinguish planning, backfill, review, and execute evidence. |

## Rule Families For Phase 05

| Rule family | Source failure families | Blocks clean review? |
|---|---|---|
| GSD lifecycle fidelity | false completion, bridge-ready ambiguity, state/accounting drift | Yes |
| No second control plane | typed-phase blast radius, root Auto artifact truth, research chain drift | Yes |
| Evidence-first completion | false completion, backfill confusion, claim/audit gating | Yes |
| Research capability preservation | prompt fidelity loss, research chain handoff, literature execution failure | Yes |
| Config/preset/authorization coherence | config fragmentation, autoProceed stop-boundary failure, external-service policy drift | Yes |
| Danger-auto auditability | external side effects, override taint, missing authorization | Yes |
| State and write ownership | multi-surface truth drift, write races, partial mutation | Yes |
| Artifact and path safety | directories-as-files, symlinks, stale artifacts, containment bugs | Yes |
| Review parser/accounting stability | parser drift, finding-count drift, matrix instability | Yes |
| Hook/install/adapter conformance | hook drift, generated skill conversion drift, install surface drift | Yes |
| Minimal modification and upgradeability | typed-phase blast radius, source/package drift, ljx-GSD reuse risk | Yes |
| Context hygiene and source traceability | context-window overload, unsupported synthesis, stale labels | Advisory by default; blocking when it causes unsupported decisions or missed evidence. |
| Scenario coverage | scenario matrix gaps, external-service boundary ambiguity | Blocking for release readiness; advisory during static framework review unless a hard gate lacks scenario plan. |

## Traceability Limitations

- Raw ledgers are large and sometimes more detailed than Phase 03 needs. This map samples raw ledgers and relies on Phase 01 source-indexed synthesis for complete coverage.
- Some historical v1.4 files are under archived milestone directories rather than active phase directories. Phase 03 treats them as historical evidence, not active execution artifacts.
- Bug counts are not used as direct proof. The review rules depend on repeated failure mechanisms and user-observed regressions.
