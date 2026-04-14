# 02-PROPOSAL-RISK-REGISTER

**Lane:** Adversarial risk register  
**Round:** Phase 02 proposal round 1  
**Status:** Round-1 proposal input; not final framework synthesis  
**Write scope:** This file only

## 1. Position Summary

The dominant Phase 02 risk is not that research commands are impossible to fit into GSD. The risk is that underspecified integration makes the new system look GSD-compatible while recreating the historical ljx-GSD failures: multiple truth surfaces, false completion, implicit typed routing, side-effect ambiguity, and unreviewed package/runtime drift.

From an adversarial perspective, the safest target is a Research Command Compiler with GSD-first lifecycle ownership and a minimal adapter surface. That means:

- Research commands may select prompt packs, read `.planning/research.config.json`, and generate ordinary GSD phase context, plans, artifact contracts, checkpoint text, and evidence requirements.
- GSD remains the only lifecycle owner for discuss, plan, execute, review, verify, canonical state, phase completion, git discipline, and lock/atomic write paths.
- Research artifacts become authoritative only under `.planning/phases/<phase>/research/` and only within their declared command contract.
- Completion must never be inferred from summaries, checkboxes, plan counts, `progress`, `next`, context helpers, or file presence alone.
- `danger-auto` must be treated as maximum automation with maximum audit burden, not as a shortcut to clean completion.

The strongest adversarial recommendation for Round 2 is to block any proposal that cannot define exact behavior for `danger-auto`, missing credentials, quality-gate overrides, root Auto artifacts, package/source version drift, SDK ambiguity, subagent write boundaries, and no-`phase_type` compatibility.

## 2. Source Evidence Used

### Sourced Facts

| Source | Relevant facts used |
| --- | --- |
| `02-PROPOSAL-ROUND-1.md` | All proposal lanes must cover lifecycle ownership, command surface, granularity, artifact root, config/presets, side-effect gates, completion semantics, git/hooks, subagents, upgrade boundary, SDK boundary, and no-phase-type proof. This risk lane must focus on `danger-auto`, false completion, external services, package/SDK drift, and no-phase-type compatibility. |
| `02-CONTEXT.md` | Phase 02 designs the target framework; it does not implement. Decisions D-01 through D-04 select a Research Command Compiler where research prompts compile into ordinary GSD inputs. D-25 through D-30 isolate research config. D-31 through D-44 define `safe`, `auto`, `danger-auto`, side effects, missing authorization behavior, and danger-auto audit artifacts. D-48 through D-51 define phase-local research roots and root Auto artifacts as import/export mirrors. D-54 through D-57 define completion semantics. |
| `01-FRAMEWORK-SYNTHESIS.md` | Upstream GSD remains the outer lifecycle/control plane. Authoritative research outputs are phase-local. Canonical lifecycle state has one writer. Completion requires raw evidence plus independent review/verification/UAT gates. `idea-discovery` cannot complete from context/state/report output alone. Current ljx-GSD is historical evidence and selective salvage, not implementation base. |
| `01-CROSS-FRAMEWORK-GAP-MAP.md` | Phase 02 must decide upstream baseline version, SDK inclusion, command surface, artifact sublayout, import/export mirror policy, audit category defaults, reviewer provider policy, external-service policy, and paper-review scope. Future implementation risks include dirty repo, explicit quarantine review for current ljx-GSD, package/runtime compatibility testing, external service scenario coverage, and avoiding a second untracked state engine. |
| `01-LJX-HISTORY-FAILURE-TAXONOMY.md` | Historical failure families include false completion, multi-surface truth drift, prompt fidelity loss, filesystem/evidence safety bugs, state/accounting drift, typed-phase blast radius, research chain handoff failures, claim/audit gating failures, review parser drift, config/override fragmentation, hook/adapter conformance drift, write races, backfilled evidence confusion, bridge-ready status overloading, and review matrix instability. |
| `01-AUTO-CAPABILITY-PRESERVATION-CHECKLIST.md` | Research commands must preserve standalone invocation, raw reviewer responses, citation integrity, experiment integrity, gate precedence, phase-local root ownership, and optional support tools as support only. The external-service matrix marks GPU/remote execution, Vast, Modal, W&B, paid compute, persistent external logging, git push, PR creation, publication, and submission upload as blocking by default unless policy and approval allow them. |
| `01-AUTO-ARTIFACT-CONTRACTS.md` | Artifact classes separate inputs, workflow artifacts, control-state caches, primary evidence, review evidence, and derived summaries. Phase-local research root is authoritative. Root-level Auto artifacts are import/export mirrors unless adopted. Control-state cache may support resume only inside the phase-local research root and cannot route phases or complete work by itself. |
| `01-GSD-UPGRADE-BOUNDARIES.md` | `.planning/` artifact names, `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase artifact names, `gsd-tools.cjs`, workstream routing, locks, orchestrator ownership, git planning commits, hooks, agents, package manifests, tests, and SDK package boundary are compatibility inputs. Reference checkout is `1.35.0` while installed runtime reports `1.34.2`; Phase 02 must decide baseline/diff policy. Config reads can mutate files and unknown-key/config drift is a known risk. |

### Inferred Risks

The risks below are adversarial inferences from the sourced facts above. They should be treated as design blockers only where the table marks them as blocking for Phase 02 synthesis.

- If a proposal says """compile prompts into GSD""" but does not define produced artifacts, evidence gates, and lifecycle write ownership, it can still create a shadow control plane.
- If `danger-auto` is described only as """auto-approve everything,""" it will either perform unsafe side effects or falsely report success when credentials/policies are missing.
- If research config is allowed to flow into upstream `.planning/config.json`, unknown keys and migration-on-read behavior can cause upstream compatibility regressions.
- If root Auto artifacts are convenient to read and write, downstream agents will eventually treat them as authoritative unless the framework defines adoption and provenance rules.
- If package/source/latest and SDK boundaries are deferred without explicit blockers, implementation may target the wrong upstream behavior and make tests pass against the wrong runtime.
- If subagents can write summaries or caches that GSD interprets as completion, parallelism will recreate the historical write-race and false-completion failures.

## 3. Proposed Architecture

This lane does not propose a fourth architecture. It proposes a risk boundary that any accepted architecture must satisfy.

### Risk-Control Architecture

1. **Outer owner:** Upstream GSD owns lifecycle state, phase state, roadmap mutation, review/verification, completion, git discipline, and locks.
2. **Research compiler:** Research commands own only command interpretation: read research config, select prompt pack, compile ordinary GSD inputs, declare evidence contracts, and request lifecycle operations through normal GSD paths.
3. **Minimal adapter:** Adapters translate command flags/config/prompt-pack metadata into GSD-compatible phase/context/plan artifacts without broad schema changes.
4. **Phase-local evidence root:** Authoritative research evidence lives under `.planning/phases/<phase>/research/`. Root Auto files are import/export mirrors until adopted into that root by an explicit GSD command.
5. **Completion gate:** Completion is a derived decision from required raw evidence, review evidence, verification/UAT, disk state consistency, and explicit acceptance. Advisory signals are never sufficient.
6. **Danger audit root:** Every `danger-auto` run writes audit artifacts under the owning phase's `research/` root and propagates degraded/provisional/overridden status into downstream artifacts.
7. **Version boundary:** Phase 02 synthesis must name source/package/SDK ambiguity as a later implementation blocker if not resolved now.

### Family-Level Adversarial Comparison

| Design family | Main strength | Main adversarial failure | Required guardrail |
| --- | --- | --- | --- |
| GSD-first lifecycle | Strongest protection against second control plane, state races, and false completion. | Can become too strict and erase Auto/ARIS command semantics if research obligations are compressed into generic GSD phases. | Require command-specific evidence contracts, prompt-pack provenance, and research artifact indexes inside ordinary GSD phases. |
| Minimal adapter | Smallest implementation surface and lowest core-schema risk. | Can underspecify semantics and become a thin wrapper that preserves names but loses gate, side-effect, and evidence behavior. | Require each adapter command to declare inputs, outputs, evidence, side effects, preset behavior, and completion status mapping. |
| Compiler/hybrid | Best fit for Phase 02 decisions: Auto/ARIS prompts become ordinary GSD inputs without lifecycle takeover. | Can secretly become a second planner if compiled outputs carry routing/state semantics or generated mini-roadmaps by default. | Default to one inserted phase, plan-level decomposition, no `phase_type`, and lifecycle writes only through GSD owner paths. |

## 4. Comparison Against Other Design Families

### Against A Pure GSD-First Proposal

A strict GSD-first proposal is safer for state ownership but vulnerable to semantic loss. If it treats research commands as ordinary phase descriptions without preserving Auto/ARIS-specific artifacts, raw literature evidence, reviewer independence, experiment lineage, and side-effect policy, it will satisfy ARCH-01 while failing ARCH-02, ARCH-03, ARCH-05, and ARCH-07.

Round 2 should require a GSD-first lane to answer: """What exact command-specific evidence prevents `idea-discovery`, experiment execution, review loops, and result-to-claim from completing as generic summaries?"""

### Against A Minimal Adapter Proposal

A minimal adapter proposal is attractive because it avoids schema changes, but it is the most likely to underspecify dangerous behavior. A minimal adapter that only maps CLI names to prompt templates can still fail on config precedence, checkpoint semantics, `danger-auto`, external services, artifact adoption, and completion status propagation.

Round 2 should require the adapter lane to answer: """What is the minimum contract that prevents a thin wrapper from becoming dishonest automation?"""

### Against A Compiler/Hybrid Proposal

The compiler/hybrid family best matches current Phase 02 decisions, but it has the highest temptation to invent a compiler-owned runtime state. Generated prompt packs, command manifests, indexes, and control caches can become an implicit route table if the framework does not freeze their authority boundary.

Round 2 should require the compiler lane to answer: """Which compiled outputs are ordinary GSD inputs, which are research evidence, which are resumable caches, and which are explicitly non-authoritative mirrors?"""

## 5. Required GSD Changes

The risk register recommends small, contract-level changes rather than broad schema changes.

| Needed change | Why it is needed | Broad schema change? |
| --- | --- | --- |
| Add standalone research commands that compile into ordinary GSD phase/context/plan inputs. | Preserves Auto/ARIS standalone invocation without making research a typed phase. | No. |
| Add `.planning/research.config.json` parsing in the research compiler/adapters only. | Avoids unknown-key drift and upstream `.planning/config.json` pollution. | No. |
| Add phase-local `research/RESEARCH_INDEX.md` convention. | Lets GSD and reviewers distinguish required evidence, raw records, summaries, provisional outputs, and mirrors. | No. |
| Add command-specific artifact contracts under the research root. | Prevents file-presence-only completion and generic summary completion. | No. |
| Add danger-auto audit artifact requirements. | Makes maximum automation auditable and prevents clean-success lies. | No. |
| Add side-effect policy checks in research command wrappers. | Prevents PR/push/W&B/SSH/Modal/Vast/GPU operations from becoming implicit. | No. |
| Add package/source/SDK compatibility decision points to implementation planning. | Avoids targeting stale upstream or the wrong SDK boundary. | No. |
| Add scenario tests later for config precedence, side effects, missing credentials, and completion states. | Prevents historical ljx-GSD regressions. | No. |

Rejected changes:

- Do not add `phase_type`.
- Do not add typed research phase routing.
- Do not add broad phase schema expansion.
- Do not let research commands write `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, or milestone records directly.
- Do not make root Auto artifacts authoritative by default.

## 6. Research Capability Preservation

The following capabilities are at risk if proposals optimize only for GSD compatibility or minimal implementation:

| Capability | Preservation risk | Required protection |
| --- | --- | --- |
| `idea-discovery` | Context/state/report output can be mistaken for full discovery. | Require literature retrieval/reading evidence and retained raw source references before completion. |
| `research-lit` | Source selector semantics can drift or web/Semantic Scholar/deepxiv can be collapsed incorrectly. | Preserve valid source values and source metadata in `literature/LITERATURE_EVIDENCE.md` or equivalent indexed bundle. |
| `research-refine` | Problem anchor and round state can be lost across summaries. | Preserve round logs, original problem anchor, and `REFINE_STATE.json` as phase-local control cache only. |
| `experiment-plan` | Metrics, dataset, splits, baselines, method, success criteria, and run order can be split across phases and lose coherence. | Default to one phase with plan-level decomposition unless execution/audit boundaries require separate phases. |
| `experiment-bridge` | Runnable blocks can be treated as execution evidence. | Mark bridge output as plan/bridge artifact, not raw result evidence. |
| `run-experiment` | Terminal output, W&B links, or monitor status can replace raw results. | Require command/config/backend/commit plus raw JSON/CSV/log paths and W&B ID/URL if used. |
| `monitor-experiment` | Operational status can be mistaken for research evidence. | Treat monitor output as operational only until raw results are collected and analyzed. |
| `experiment-audit` | Missing audit can be treated as pass. | Missing audit means no audit; downstream claim status must block or downgrade. |
| `auto-review-loop` | Reviewer summaries can replace raw responses or stop predicate can drift. | Preserve raw reviewer responses, reviewer memory, deterministic stop predicate, and bounded rounds. |
| `result-to-claim` | Unsupported or partial claims can flow into papers as supported. | Require yes/partial/no verdicts with audit and raw evidence lineage. |
| Paper/rebuttal packs | Deferred scope can silently delete future capability. | Mark as deferred compiler packs with preserved artifact-chain requirements, not removed features. |

## 7. Preset, Gate, And Side-Effect Semantics

### Minimum Preset Semantics

| Preset | Allowed behavior | Blocking behavior | Completion status implication |
| --- | --- | --- | --- |
| `safe` | Deep research/review with human participation at important decisions and confirmation before external side effects. | Stops before non-trivial decisions, missing required evidence, blocking gates, destructive writes, and external services unless approved. | Can be clean only if evidence and gates pass. |
| `auto` | Deep research/review with automatic ordinary checkpoint handling. | Stops on blocking quality gates and external side effects unless preauthorized by config/policy/user record. | Can be clean if no gate is blocked or overridden and all evidence exists. |
| `danger-auto` | Deep research/review plus maximum available automation permissions; auto-selects recommended decisions and may override research quality gates with records. | Cannot fabricate missing credentials, platform access, SSH access, payment setup, API keys, budget, or authorization. Must not override hard safety gates that policy marks non-overridable. | Clean only if no required evidence is missing, no blocking operation was skipped, and no quality gate was overridden. Otherwise degraded/provisional/overridden/blocked as appropriate. |

### Side-Effect Policy

| Side effect | Default adversarial stance | Required design behavior |
| --- | --- | --- |
| Git push | Blocking unless explicitly authorized or already covered by selected `danger-auto` environment policy. | Record branch, remote, commit range, command, result, and failure/skip reason in `SIDE_EFFECTS.md` and `AUTHORIZATION_ACTIONS.json`. |
| PR creation | Blocking unless explicitly authorized or preauthorized. | Record URL/ID, draft/ready status, base/head, and missing authorization if GitHub auth is absent. |
| W&B logging | Blocking/guided because it can persist external experiment data. | Record project/entity/run ID/URL, API-key availability without exposing secrets, and whether logging is disabled/degraded. |
| SSH/rsync/scp/remote commands | Blocking because it can mutate remote machines and leak data. | Record host alias, command class, path roots, dry-run/real status, and missing SSH authorization. |
| Modal/Vast.ai/GPU | Blocking because of spend, remote execution, and cleanup obligations. | Record provider, budget, instance/job ID, image/environment, cleanup plan, raw result path, and skipped/degraded state if unavailable. |
| Reviewer APIs outside Codex subagents | Guided/blocking because artifacts may leave local environment. | Record provider/model, transmitted artifact paths/classes, policy allowance, and raw response provenance. |
| Notifications/Feishu/Lark | Guided because it sends external messages. | Record channel target class, message purpose, and missing webhook/token behavior. |
| Cleanup/destructive writes | Blocking if destructive or irreversible. | Require explicit path scope, backup/rollback plan where possible, and post-cleanup verification. |

### Required Danger-Auto Artifacts

A `danger-auto` run must produce, at minimum, under `.planning/phases/<phase>/research/`:

- `RESEARCH_RUN_LOG.md`
- `AUTHORIZATION_ACTIONS.json`
- `DANGER_AUTO_OVERRIDES.md`
- `SIDE_EFFECTS.md`
- `RESEARCH_INDEX.md` entries marking clean/degraded/provisional/overridden outputs

If any of those are missing, Round 2 should treat the design as unable to support honest `danger-auto` completion.

## 8. Completion Semantics

### Completion States

| State | Meaning | Allowed to advance? | Allowed to claim clean completion? |
| --- | --- | --- | --- |
| Clean | Required raw evidence exists; review/verify/UAT gates pass; no blocking side effect skipped; no quality gate overridden; canonical GSD state is consistent. | Yes. | Yes. |
| Blocked | Required evidence, authorization, credentials, budget, review, verification, or user decision is missing and cannot be skipped under policy. | No, except to a remediation phase/plan. | No. |
| Degraded | Optional or conditionally allowed service/path is unavailable, and policy allows continuing with reduced capability. | Yes only if command contract permits degradation. | No. |
| Provisional | Output is useful but lacks required independent review, audit, verification, raw evidence, or final acceptance. | Yes only as input to review/audit/remediation, not as final evidence. | No. |
| Overridden | `danger-auto` overrode a research quality gate and recorded the override. | Yes only where policy allows and downstream artifacts carry override status. | No. |
| Backfill/non-execution | Artifact records history, imported material, or accepted baseline but not current execution evidence. | No as execution proof. | No. |

### Advisory Signals Only

These signals may help cross-check state but cannot satisfy research completion by themselves:

- Summary files.
- Roadmap checkboxes.
- Plan counts.
- File presence.
- `progress` output.
- `next` output.
- Context helper output.
- State/cache files.
- Imported/root Auto files.
- Backfilled summaries.
- Monitor status.
- Bridge-ready reports.

### Command-Specific Evidence Examples

| Command family | Minimum completion evidence |
| --- | --- |
| Literature/discovery | Query/source metadata, retained source IDs/URLs/paths, accepted/rejected papers, reading notes, literature evidence bundle, and relevant review/verification. |
| Idea/refinement | Candidate report plus source-backed novelty/refinement evidence, problem anchor, review rounds, and unresolved `[VERIFY]` markers preserved. |
| Experiment planning | Claim map, metric definitions, dataset/split/baseline/method/run-order, minimum convincing evidence, budget, and feasibility/sanity checks. |
| Experiment execution | Raw JSON/CSV/logs, command/config/backend/commit, seed/run metadata, W&B/run URLs if used, and reproducibility command. |
| Analysis/audit/claims | Analysis linked to raw numbers, `EXPERIMENT_AUDIT.md` and `.json`, raw reviewer responses where relevant, and yes/partial/no claim verdicts. |

## 9. No-Phase-Type Proof

No risk mitigation in this register requires `phase_type`, typed phase routing, broad phase schema expansion, or a second control plane.

The design can stay no-phase-type because:

1. **Command identity lives at invocation and artifact contract level.** `gsd research-lit` or `gsd experiment-plan` can compile command-specific context and evidence requirements into ordinary phase files without marking the phase with a type.
2. **Research granularity fits GSD phases/plans/tasks.** The roadmap phase remains the goal boundary; GSD plans and tasks carry executable breakdowns and checkpoints.
3. **Decimal insertion already models existing-roadmap research insertion.** Research insert mode can use ordinary decimal phases after the current completed phase.
4. **Research-first mode can use normal integer phases.** A research-centered milestone does not need a typed route table; the roadmap itself defines the goals.
5. **Artifacts define evidence, not routing.** `RESEARCH_INDEX.md` and command-specific artifacts tell reviewers what evidence exists; they do not decide lifecycle state.
6. **State remains GSD-owned.** Research control caches can resume command loops but cannot complete phases, mutate roadmap state, or route `next`.
7. **Side-effect policy is command/preset behavior.** It does not require typed phases; it requires explicit command contracts and audit artifacts.

Reject any proposal that says a phase must carry a `phase_type` to know whether to run research behavior. The correct alternative is: the command creates ordinary GSD inputs, and GSD lifecycle commands execute them using normal phase/plan semantics.

## 10. Risks And Open Questions

### Risk Register

Severity scale: Critical blocks framework safety; High likely causes serious regression; Medium requires design/test coverage; Low is manageable documentation or implementation detail. """Block Phase 02 synthesis""" means the final Phase 02 target framework should not proceed unless the risk is explicitly resolved or deferred with a named later blocker.

| ID | Severity | Risk | Trigger | Impacted requirement | Detection | Mitigation | Block Phase 02 synthesis? | Fact/inference |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R-01 | Critical | `danger-auto` becomes a clean-completion shortcut. | Proposal says `danger-auto` auto-approves/overrides but does not define degraded/provisional/overridden statuses. | ARCH-05, ARCH-07 | Search proposal for clean/degraded/provisional/overridden semantics and required audit artifacts. | Require status taxonomy and audit artifacts; clean completion forbidden after skipped operations or overridden gates. | Yes | Sourced + inferred |
| R-02 | Critical | External side effects run without explicit authorization record. | Git push, PR, W&B, SSH, Modal, Vast, GPU, reviewer APIs, notifications, or cleanup are enabled by preset alone. | ARCH-05, ARCH-07 | Scenario review with missing and present credentials; inspect `SIDE_EFFECTS.md` and `AUTHORIZATION_ACTIONS.json`. | Require per-service policy, preauthorization record, command log, and missing-authorization behavior. | Yes | Sourced |
| R-03 | Critical | Missing credentials are hidden as success. | Provider/API/SSH/GitHub/W&B/Modal/Vast credentials absent but pipeline continues and reports done. | ARCH-05, ARCH-07 | Run missing-credential scenario; inspect completion status and audit logs. | Missing authorization must block that operation or degrade visibly; downstream outputs cannot be clean. | Yes | Sourced |
| R-04 | Critical | Quality gates can be overridden without downstream taint. | `danger-auto` overrides review/audit/verification but generated artifacts appear normal. | ARCH-05, ARCH-07 | Check for override propagation fields/status in `RESEARCH_INDEX.md` and downstream claim artifacts. | Require `DANGER_AUTO_OVERRIDES.md` and provisional/overridden/integrity-concern labels in all affected outputs. | Yes | Sourced |
| R-05 | Critical | False completion from summaries/checklists/file presence returns. | Completion is based on `SUMMARY.md`, roadmap checkbox, plan count, `progress`, `next`, report file, or checklist. | ARCH-07 | Negative tests with dummy files and no raw evidence; parser rejects clean completion. | Define advisory-only signals and command-specific raw evidence gates. | Yes | Sourced |
| R-06 | Critical | Root Auto artifacts become authoritative state. | Research commands read/write root `IDEA_REPORT.md`, `EXPERIMENT_PLAN.md`, or Auto state and GSD routes/completes from it. | ARCH-03, ARCH-05, ARCH-07 | Search for root artifact paths in routing/completion docs; scenario with conflicting root and phase-local files. | Root artifacts are import/export mirrors only until explicitly adopted into phase-local `research/` root with provenance. | Yes | Sourced |
| R-07 | Critical | Research command compiler becomes a second lifecycle controller. | Compiler writes `STATE.md`, `ROADMAP.md`, phase records, milestone records, or owns phase completion. | ARCH-01, ARCH-03, ARCH-04, ARCH-05 | Ownership table review; grep generated commands for canonical state writes. | Compiler may request GSD lifecycle operations only through lifecycle owner and lock/atomic paths. | Yes | Sourced |
| R-08 | Critical | `phase_type` or typed route table reappears by another name. | Proposal adds research kind/type fields, command route maps, or typed phase-chain logic. | ARCH-04 | Search for `phase_type`, `type`, `kind`, route table, typed routing, schema extension in phase semantics. | Keep command identity at invocation/artifact-contract level; ordinary phases/plans/tasks carry work. | Yes | Sourced |
| R-09 | Critical | Subagent write races corrupt canonical state or proposal artifacts. | Research workers/reviewers write shared state, summaries, indexes, or phase records concurrently. | ARCH-01, ARCH-05, ARCH-07 | Parallel execution scenario; inspect lock ownership and write map. | Single lifecycle writer; subagents write scoped outputs only; canonical writes serialized through lock/atomic path. | Yes | Sourced |
| R-10 | High | Unknown research config keys pollute upstream GSD config. | Research parameters are added to `.planning/config.json` or passed raw into GSD core. | ARCH-01, ARCH-03, ARCH-05 | Config validation review; unknown-key and migration-on-read scenario. | Use `.planning/research.config.json`; compiler normalizes CLI > command config > preset > defaults before emitting GSD inputs. | Yes | Sourced |
| R-11 | High | Config precedence fragments `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, presets, and overrides. | CLI flags, config, prompt text, and environment aliases disagree. | ARCH-05, ARCH-07 | Matrix test for CLI/config/preset/default combinations. | One precedence rule: CLI override > command-specific config > preset > built-in defaults; one alias normalizer. | Yes | Sourced |
| R-12 | High | `auto` is misread as shallow/quick mode. | Preset reduces review depth, source count, sanity checks, or evidence requirements. | ARCH-03, ARCH-05, ARCH-07 | Inspect preset table and generated prompts for effort/review defaults. | All presets default to deep research and deep review; effort cannot weaken integrity gates. | Yes | Sourced |
| R-13 | High | `safe` still performs external side effects. | Safe mode pushes, creates PRs, calls remote compute, or sends external reviewer artifacts without confirmation. | ARCH-05, ARCH-07 | Safe-mode side-effect scenario with instrumented commands. | Safe pauses before external side effects and important decisions. | Yes | Sourced |
| R-14 | High | Compiler over-splits research into many roadmap phases. | Auto internal stages named `phase/stage/step` mechanically become GSD phases. | ARCH-03, ARCH-04, ARCH-05 | Review generated roadmap for one-command research invocation. | Default one inserted phase; use plans/tasks for internals; multiple phases only for hard work-mode boundaries. | Yes | Sourced |
| R-15 | High | Compiler under-splits execution/audit boundaries. | Planning, remote execution, raw evidence collection, audit, and claim gates all hide in one unreviewed task. | ARCH-03, ARCH-05, ARCH-07 | Review experiment command outputs and gate transitions. | Allow separate phases/plans when execution, remote/GPU, audit, or claim readiness creates real lifecycle boundaries. | Yes | Inferred from sourced decisions |
| R-16 | High | Package/source latest drift targets wrong upstream behavior. | Implementation assumes local reference `1.35.0` or installed `1.34.2` without reconciliation. | ARCH-01, ARCH-05 | Baseline decision review; source/package diff check in implementation planning. | Phase 02 must record baseline policy and later implementation blocker for source/npm compatibility. | Yes, if unmentioned | Sourced |
| R-17 | High | SDK boundary is treated as a thin wrapper and broken later. | Proposal ignores SDK package/API/CLI/prompts/tests or assumes no impact. | ARCH-05 | SDK inclusion/adapt/defer section review. | Explicitly decide include/adapt/defer and protect future compatibility. | Yes, if unmentioned | Sourced |
| R-18 | High | Prompt-pack self-containment loses Auto obligations. | Prompt packs copy names/summaries but omit raw task obligations, stop predicates, review rules, or evidence contracts. | ARCH-02, ARCH-03, ARCH-05, ARCH-07 | Prompt source index and parity review. | Source-index prompt packs; compile stable contracts; do not wholesale copy without provenance. | Yes | Sourced |
| R-19 | High | Research support tools become hidden control planes. | Wiki/watchdog/smart update/reviewer overlays track task state and route work independently. | ARCH-01, ARCH-03, ARCH-04, ARCH-05 | Identify any support tool that controls routing/completion. | Treat support tools as optional operational overlays; no lifecycle authority. | Yes | Sourced |
| R-20 | High | Review loops stop on malformed or weak predicate. | Stop condition accepts score alone, summary sentiment, max rounds, or provider fallback output as pass. | ARCH-05, ARCH-07 | Review predicate text and raw reviewer artifacts; malformed review parser scenario. | Stop only when score >= threshold and verdict positive/accept/pass; otherwise continue until max/stall/block/human stop. | Yes | Sourced |
| R-21 | High | Reviewer independence is lost. | Executor summaries are sent to reviewers instead of raw artifacts; reviewer memory authored by executor. | ARCH-03, ARCH-05, ARCH-07 | Inspect reviewer input paths and raw response preservation. | Reviewers get raw paths/artifacts where possible; raw responses preserved; reviewer memory remains reviewer-owned. | Yes | Sourced |
| R-22 | High | Experiment evidence is reduced to monitor status or W&B URL. | Monitor says run complete, W&B URL exists, but no raw JSON/CSV/logs or config/commit record. | ARCH-03, ARCH-05, ARCH-07 | Negative experiment completion scenario with only terminal/W&B/monitor output. | Require raw result files, command/config/backend/commit/seed metadata, and W&B ID/URL when used. | Yes | Sourced |
| R-23 | High | Claim gate ignores missing/stale audit. | `result-to-claim` produces supported claims without audit JSON/Markdown lineage. | ARCH-05, ARCH-07 | Scenario with missing/stale audit and available analysis summary. | Missing audit means no audit, not pass; claims must be no/partial/provisional or blocked. | Yes | Sourced |
| R-24 | High | `idea-discovery` completes from context helper output. | Context/state/idea report exists without literature retrieval and reading evidence. | ARCH-02, ARCH-03, ARCH-07 | Negative test with context-only artifacts. | Require literature evidence bundle with raw source references and reading notes. | Yes | Sourced |
| R-25 | High | Workstream/cwd routing causes research artifacts in wrong root. | Command run from subrepo/workstream writes `.planning/phases/.../research/` in wrong location. | ARCH-03, ARCH-05 | Workstream `--cwd`, `--ws`, environment pointer scenario. | Preserve upstream workstream routing semantics and explicitly resolve active phase root before writes. | Yes | Sourced + inferred |
| R-26 | High | Hook/install behavior is changed without package parity tests. | Research commands modify install hooks or generated hook files without preserving ownership/uninstall symmetry. | ARCH-01, ARCH-05 | Install/uninstall/hook scenario tests; package build check. | Treat hooks/installer/package tests as compatibility inputs before implementation changes. | No, if deferred explicitly | Sourced |
| R-27 | Medium | Research config contains side-effect settings for every command. | GPU/W&B/SSH/Modal/Vast keys appear globally and influence literature commands. | ARCH-05 | Config schema review. | Keep execution side-effect parameters in execution command packs and authorization policy, not every command. | No, if scoped | Sourced |
| R-28 | Medium | Parameter pruning removes future paper/rebuttal capability accidentally. | Deferred venue/page/anonymity/citation/rebuttal/slides settings are undocumented and later forgotten. | ARCH-02, ARCH-05 | Deferral list review. | Mark paper/rebuttal/slides/poster/camera-ready as deferred compiler packs with preserved artifact contracts. | No, if deferred explicitly | Sourced |
| R-29 | Medium | Import/export mirror adoption is too vague. | User imports root Auto artifact; system cannot tell whether it is trusted evidence, input, or mirror. | ARCH-03, ARCH-05, ARCH-07 | Mirror/adoption scenario with provenance conflicts. | Adoption command writes provenance, source path, timestamp, producing command if known, and target evidence class in `RESEARCH_INDEX.md`. | Yes, if no policy | Inferred from sourced facts |
| R-30 | Medium | Research control caches become completion evidence. | `REVIEW_STATE.json`, `REFINE_STATE.json`, tracker files, or pipeline status are consumed as pass/fail truth. | ARCH-05, ARCH-07 | Cache-only completion scenario. | Define caches as resume support only; completion reads raw/review/verification evidence. | Yes | Sourced |
| R-31 | Medium | Backfilled or imported historical evidence satisfies current execution gates. | Accepted baseline/backfill summaries are treated as freshly executed plans. | ARCH-07 | Backfill marker scenario. | Require backfill/non-execution status and forbid it from satisfying execute/completion gates. | Yes | Sourced |
| R-32 | Medium | Review artifact parser drift creates false clean rounds. | Review files use inconsistent headings/fields; counts diverge. | ARCH-05, ARCH-07 | Parser/schema test with accepted formats and malformed files. | Later Phase 03 review rules must freeze review artifact schema and finding normalization. | No, if carried to Phase 03 | Sourced |
| R-33 | Medium | Model/reviewer profile drift changes quality unexpectedly. | `difficulty`, model profile, provider fallback, and review depth select different behavior across docs/runtime. | ARCH-05 | Profile/provider matrix review. | Normalize reviewer backend policy, provenance format, and difficulty semantics before implementation. | No, if deferred explicitly | Sourced |
| R-34 | Medium | Generated `RESEARCH_INDEX.md` is stale or treated as truth over files. | Index lists evidence that was moved/deleted or omits provisional status. | ARCH-03, ARCH-05, ARCH-07 | Index/file consistency check. | Treat index as map plus cross-check; completion verifies actual files and statuses. | No | Inferred |
| R-35 | Medium | Cleanup removes evidence needed for audit/reproduction. | `danger-auto` or execution cleanup deletes logs, raw outputs, remote artifacts, or W&B links. | ARCH-05, ARCH-07 | Cleanup scenario with post-cleanup audit. | Cleanup must preserve required raw evidence or record exported copies before deletion. | Yes for execution commands | Inferred from service policy |
| R-36 | Medium | Network literature source expansion leaks private sources or incurs paid API use. | `sources=all` or preset expands to paid/private APIs without confirmation. | ARCH-05 | Source-selector scenario. | Preserve source selector semantics; require policy entry for paid/private APIs and record source provenance. | No, if policy covers | Sourced |
| R-37 | Medium | Human checkpoint and auto-proceed conflict. | `HUMAN_CHECKPOINT=true` but `AUTO_PROCEED=true` advances through decisions. | ARCH-05, ARCH-07 | Gate precedence matrix test. | Hard safety gates win; human checkpoint forces pause; auto only continues safe satisfied steps. | Yes | Sourced |
| R-38 | Medium | Direct command workflows and generated prompt templates diverge. | CLI path and prompt-pack path produce different artifact/evidence requirements. | ARCH-02, ARCH-03, ARCH-05 | Golden output comparison for command compiler modes. | Keep one command contract source used by both direct workflow and generated prompt pack. | No, if tested later | Inferred |
| R-39 | Medium | Advisory `next`/bridge-ready output is overloaded again. | `next` suggests a command and downstream agents treat it as phase goal completion. | ARCH-07 | Scenario with incomplete phase and bridge-ready capability. | Separate capability availability from goal completion in wording and machine statuses. | Yes | Sourced |
| R-40 | Medium | Dirty repo context contaminates implementation assumptions. | Later implementation reuses current modified ljx-GSD files without quarantine review. | ARCH-05 | Implementation handoff check; git status and reuse matrix. | Record clean worktree/copy requirement and explicit quarantine review for ljx-GSD salvage. | No for Phase 02, yes for implementation | Sourced |

### Open Questions For Round 2

1. What exact minimal fields must `RESEARCH_INDEX.md` contain to map required evidence, raw records, summaries, imported mirrors, provisional outputs, and status taint without becoming a second state engine?
2. Should Phase 02 define a canonical side-effect policy table per command family, or should it define service classes now and leave per-command bindings to implementation planning?
3. How should `danger-auto` distinguish hard non-overridable gates from overridable research-quality gates without adding broad schema?
4. What is the exact adoption flow for root Auto artifacts into `.planning/phases/<phase>/research/`?
5. Does the target framework choose upstream source `1.35.0`, installed package `1.34.2`, or a required reconciliation step before implementation?
6. Is SDK integration deferred, adapted, or included in v2.0 command design, and what tests prove the boundary?
7. Which paper/rebuttal artifacts are preserved only as deferred packs versus included in default research pipeline command contracts?
8. How are review-provider provenance and transmitted-artifact boundaries recorded without exposing secrets or duplicating raw artifacts unnecessarily?

## 11. Recommendation For Round 2

Round 2 should converge on a compiler/hybrid design only if it accepts the GSD-first lifecycle boundary and the minimal adapter discipline. The final synthesis should explicitly reject designs that pass through any of these blockers:

- `danger-auto` has no audit artifacts or status taint propagation.
- Missing credentials or missing authorization can still produce clean completion.
- Completion can be inferred from summaries, checklists, plan counts, file presence, `progress`, `next`, context helpers, bridge-ready reports, caches, or root Auto files.
- Root Auto artifacts can control routing, resume, or completion without phase-local adoption.
- Research commands write canonical lifecycle state directly.
- Research config pollutes upstream `.planning/config.json` or relies on unknown keys.
- Side-effect policy is described generally but not tied to git push, PR, W&B, SSH, Modal, Vast.ai, GPU, reviewer APIs, notifications, cleanup, missing credentials, and skipped operations.
- Package/source latest drift and SDK ambiguity are ignored.
- Subagent write ownership is not serialized.
- Any proposal requires `phase_type`, typed routing, broad phase schema changes, or a second control plane.

The most implementable Round 2 direction is:

1. Adopt the Research Command Compiler as the public architecture.
2. Keep GSD as lifecycle owner and completion authority.
3. Keep adapter changes narrow: command entrypoints, research config parser, prompt-pack selector, artifact contract emitter, side-effect policy/audit helper, and phase-local index conventions.
4. Make completion semantics a first-class companion spec before implementation.
5. Carry package/source/SDK reconciliation as an explicit implementation blocker, not an implicit assumption.
