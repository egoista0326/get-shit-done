# Auto Research Skills Reference

生成日期：2026-04-16

本文档面向需要理解新增 research skills 的人类读者。事实来源是 `commands/gsd/ljx-*.md` 下的 25 个新增 skill/command 文档。它们是一个“薄实现”的 research overlay：每个能力都是一个可安装的 Markdown command，不引入独立 helper、config、compiler 或第二套运行时；生命周期、计划、执行、评审和状态记录仍由 GSD 本体负责。

## 设计定位

这些 skills 的目标不是替代 GSD，而是补足普通 GSD 不天然覆盖的 research 判断：

- 文献检索、citation/source discipline、novelty 判断。
- idea 生成、筛选、review、refinement。
- claim-driven experiment planning、运行授权、监控、结果分析、完整性审计。
- 从实验结果到论文/公开 claim 的保守门控。
- paper/rebuttal 的 evidence discipline、venue boundary 和 bounded review loop。

共同约束：

- 所有 authoritative artifacts 都写在 `.planning/phases/<phase>/research/` 下。
- 实现、代码修改、执行计划仍通过普通 GSD phase、`/gsd-plan-phase`、`/gsd-execute-phase`、`/gsd-code-review`、`/gsd-verify-work` 等完成。
- 外部资源、远程任务、付费计算、W&B/SSH、submission portal 都需要显式授权。
- 不能从 `RESULT_TO_CLAIM.md` 直接进入 paper/rebuttal/release/public summary；必须经过 `/gsd-ljx-claim-gate`。

## Skill 总览

| 阶段 | Skill | 主要用途 |
| --- | --- | --- |
| 文献 | `/gsd-ljx-research-lit` | 建立有 source discipline 的文献地图。 |
| 构思 | `/gsd-ljx-idea-creator` | 从方向和文献生成 8-12 个可验证研究 idea 并排序。 |
| 新颖性 | `/gsd-ljx-novelty-check` | 抽取 claim、多源检索 closest prior work，给 novelty 0-10 分。 |
| 评审 | `/gsd-ljx-research-review` | 对 proposal/results/paper/code 做独立 research review，保存原始反馈。 |
| 精炼 | `/gsd-ljx-research-refine` | 围绕 Problem Anchor 精炼 idea，避免 scope drift。 |
| 精炼流水线 | `/gsd-ljx-research-refine-pipeline` | 把选中 idea 精炼成 proposal 和 preliminary experiment roadmap。 |
| idea 总管 | `/gsd-ljx-idea-discovery` | 串起 literature -> idea -> novelty -> review -> refine。 |
| 全流程总管 | `/gsd-ljx-research-pipeline` | 串起 idea、experiment、execution、audit、claim、paper/rebuttal。 |
| 实验计划 | `/gsd-ljx-experiment-plan` | 生成 claim-driven formal experiment plan、claim map、tracker、risk budget。 |
| 实验桥接 | `/gsd-ljx-experiment-bridge` | 把实验计划转为 GSD implementation tasks 和授权执行说明。 |
| 运行 | `/gsd-ljx-run-experiment` | 只运行已授权 experiment command，并记录 evidence。 |
| 监控 | `/gsd-ljx-monitor-experiment` | 查看进程、log、result files，更新 tracker，不做科学结论。 |
| 训练健康 | `/gsd-ljx-training-check` | 检查 NaN、divergence、plateau、baseline regression 等训练质量。 |
| 结果分析 | `/gsd-ljx-analyze-results` | 把 raw outputs 转为 table、delta、statistics、next experiments。 |
| 完整性审计 | `/gsd-ljx-experiment-audit` | 检查 raw evidence、missing evidence、claim impact、threats。 |
| 消融 | `/gsd-ljx-ablation-planner` | 设计 reviewer-driven ablations，并估算 claim impact/compute。 |
| 结果到 claim | `/gsd-ljx-result-to-claim` | 把结果归类为 yes/partial/no/unsupported。 |
| claim gate | `/gsd-ljx-claim-gate` | 把 claim 判为 GO/NARROW/MORE_EVIDENCE/NO_CLAIM。 |
| 自动评审循环 | `/gsd-ljx-auto-review-loop` | 30 轮上限、两轮连续 clean 的 bounded research review loop。 |
| 论文计划 | `/gsd-ljx-paper-plan` | 从已 gate 的 claim 和 evidence 生成 paper plan。 |
| 论文写作 | `/gsd-ljx-paper-write` | 从 approved plan 写 draft，所有 claim 必须可追踪。 |
| 论文编译 | `/gsd-ljx-paper-compile` | 本地编译 PDF，记录 warnings、page count、citation 状态。 |
| 论文改进 | `/gsd-ljx-paper-improve` | 有界 paper review/fix loop，保护 claim/citation discipline。 |
| rebuttal 计划 | `/gsd-ljx-rebuttal-plan` | 把外部 review 解析成 issue board、strategy、blockers。 |
| rebuttal 草稿 | `/gsd-ljx-rebuttal-draft` | 基于 approved evidence 写 venue-limited rebuttal。 |

## 调用关系

推荐的完整关系如下：

```text
/gsd-ljx-research-pipeline
  -> /gsd-ljx-idea-discovery
       -> /gsd-ljx-research-lit
       -> /gsd-ljx-idea-creator
       -> /gsd-ljx-novelty-check
       -> /gsd-ljx-research-review
       -> /gsd-ljx-research-refine-pipeline
            -> /gsd-ljx-experiment-plan
  -> /gsd-plan-phase + /gsd-execute-phase + review/verify/doc gates
  -> /gsd-ljx-experiment-bridge
  -> /gsd-ljx-run-experiment
  -> /gsd-ljx-monitor-experiment
       -> optional /gsd-ljx-training-check
  -> /gsd-ljx-analyze-results
  -> /gsd-ljx-experiment-audit
  -> /gsd-ljx-result-to-claim
  -> /gsd-ljx-claim-gate
       -> GO/NARROW + ready/pass: paper or rebuttal path
       -> MORE_EVIDENCE/NO_CLAIM: ablation, more experiments, ordinary GSD plan, or pivot
```

Paper path:

```text
/gsd-ljx-claim-gate
  -> /gsd-ljx-paper-plan
  -> /gsd-ljx-paper-write
  -> /gsd-ljx-paper-compile
  -> /gsd-ljx-paper-improve
```

Rebuttal path:

```text
/gsd-ljx-rebuttal-plan
  -> /gsd-ljx-rebuttal-draft
```

Review loop can be used around proposals, results, paper drafts, or code:

```text
/gsd-ljx-auto-review-loop
  -> accepted code findings: ordinary GSD fix path
  -> accepted claim-affecting findings: RESULT_TO_CLAIM + CLAIM_GATE
```

## Human-Readable Skill Details

### `/gsd-ljx-research-lit`

Use this when a topic or direction needs a disciplined literature map before idea generation or novelty scoring.

It first ensures the work belongs to a GSD phase. If there is no phase, it asks the operator to create one with `/gsd-add-phase` or `/gsd-insert-phase`, then discuss it with `/gsd-discuss-phase`. It searches local `papers/` and `literature/` before web sources, records what was actually read, uses at least three query formulations, deduplicates by DOI/arXiv/title/author, and separates confirmed facts from interpretation.

Expected outputs are `research/LITERATURE_REVIEW.md`, `research/PAPER_TABLE.md`, `research/SEARCH_LOG.md`, and optionally `research/CITATION_NOTES.md`. The key human discipline is: no invented citations, uncertain metadata stays unresolved, and peer-reviewed work is distinguished from preprints.

### `/gsd-ljx-idea-creator`

Use this after there is a direction or literature map, but before committing to implementation.

It generates 8-12 concrete ideas, each with problem, hypothesis, minimum experiment, expected contribution type, feasibility, risk, and likely reviewer objection. It explicitly treats the user input as a direction, not as a finished proposal. It filters ideas by compute, data, complexity, novelty risk, and reviewer interest.

Expected outputs are `research/IDEA_CANDIDATES.md` and `research/IDEA_RANKING.md`. Top ideas should include text ready for `/gsd-ljx-novelty-check`.

### `/gsd-ljx-novelty-check`

Use this before claiming an idea is novel or starting implementation based on assumed novelty.

It extracts 3-5 core technical claims, searches each with multiple query formulations, records source metadata, and builds a closest-prior-work table. It scores novelty with `Score: X/10` and produces one of `PROCEED`, `PROCEED WITH CAUTION`, or `ABANDON`.

The important human interpretation is that novelty has two axes: method novelty and experimental-setting novelty. Applying X to Y is not enough unless it reveals surprising insight. Lack of search results is not proof of novelty.

### `/gsd-ljx-research-review`

Use this when a proposal, paper, result set, or code needs independent research judgment.

The command gathers primary artifacts and asks for novelty, soundness, significance, clarity, evidence strength, missing experiments, and venue readiness. It preserves the raw reviewer response before extracting structured actions. Code-review findings can go through `/gsd-code-review-fix`; normal research actions can become ordinary GSD plan updates.

If a finding affects result-derived claims, contribution claims, or publication-facing text, it must go through `/gsd-ljx-result-to-claim` and `/gsd-ljx-claim-gate` before paper/rebuttal/release text changes.

Expected outputs are `research/reviews/RESEARCH_REVIEW.md` and `research/reviews/REVIEW_ACTIONS.md`.

### `/gsd-ljx-research-refine`

Use this to turn a rough idea into a stable, focused proposal without scope drift.

It freezes a Problem Anchor, tracks the dominant contribution and optional supporting contribution, and iterates only on changes that strengthen the anchored problem. It uses reviewer feedback but allows pushback when feedback adds complexity or drifts away from the core problem.

Expected outputs are `research/refine/PROBLEM_ANCHOR.md`, `research/refine/REFINEMENT_LOG.md`, and `research/refine/FINAL_PROPOSAL.md`. The refined proposal includes method thesis, claims, evidence needs, risks, and next GSD plan step.

### `/gsd-ljx-research-refine-pipeline`

Use this after a candidate idea has survived novelty and review.

It stabilizes the thesis, creates a preliminary experiment roadmap, and prepares a handoff to formal experiment planning. Its `research/refine/EXPERIMENT_PLAN.md` is explicitly preliminary and not execution-ready.

Expected outputs are `research/refine/FINAL_PROPOSAL.md`, preliminary `research/refine/EXPERIMENT_PLAN.md`, preliminary `research/refine/EXPERIMENT_TRACKER.md`, and `research/refine/PIPELINE_SUMMARY.md`. Formal execution still requires `/gsd-ljx-experiment-plan`, which creates the real `research/experiments/EXPERIMENT_PLAN.md`, `CLAIM_MAP.md`, `EXPERIMENT_TRACKER.md`, and `RISK_BUDGET.md`.

### `/gsd-ljx-idea-discovery`

Use this as the idea-discovery orchestrator for a broad research direction.

It runs the idea-side pipeline: literature mapping, idea creation, novelty checking, research review, and refinement. It prevents skipping stages, kills weak ideas early, and stops before expensive pilots unless those are separately planned and authorized.

Expected outputs are `research/IDEA_DISCOVERY_SUMMARY.md` and `research/IDEA_REPORT.md`. The report links literature, novelty, review, refinement artifacts, preliminary roadmap/tracker links, and next route to `/gsd-ljx-experiment-plan`.

### `/gsd-ljx-research-pipeline`

Use this as the full lifecycle coordinator.

It starts with idea discovery, moves into formal experiment planning, uses ordinary GSD for code mutation and verification, then handles authorized experiment execution, monitoring, analysis, audit, result-to-claim, and claim gate. Paper/rebuttal only happen after claim gate says `GO` or `NARROW` with `normal_workflow_ready: true` and `integrity_status: pass`.

Expected output is `research/RESEARCH_PIPELINE_SUMMARY.md`, which records current stage, artifacts, decisions, next GSD command, experiment count/compute, review state, remaining TODOs, and key files changed.

### `/gsd-ljx-experiment-plan`

Use this after a refined proposal exists and before implementation or runs.

It reads refinement artifacts, novelty reports, and review actions. It freezes primary claim, optional supporting claim, and anti-claim, then defines minimum convincing evidence for each. Every experiment must defend a claim; each block includes dataset, compared systems, metrics, setup, success criterion, failure interpretation, table/figure target, and priority.

Expected outputs are `research/experiments/EXPERIMENT_PLAN.md`, `CLAIM_MAP.md`, `EXPERIMENT_TRACKER.md`, and `RISK_BUDGET.md`.

### `/gsd-ljx-experiment-bridge`

Use this to convert an approved experiment plan into implementation tasks and authorized execution instructions.

It checks whether scripts already cover the plan, defines sanity-first execution, records expected output formats, and updates the tracker. It requires explicit authorization for paid compute, SSH, W&B, long-running jobs, or background processes.

Expected output is `research/experiments/EXPERIMENT_BRIDGE.md`, plus tracker updates and suggested `/gsd-plan-phase` or `/gsd-execute-phase` next steps when code work is required.

### `/gsd-ljx-run-experiment`

Use this only when an experiment command is explicitly authorized.

It validates the command against the GSD phase and tracker row, performs preflight checks, records environment and command details, captures stdout/stderr, stores seeds/config/output paths, and updates the tracker. GPU availability must be checked first when a GPU run is requested.

Expected output is a `research/experiments/RUN_LOG.md` entry and an updated `EXPERIMENT_TRACKER.md`.

### `/gsd-ljx-monitor-experiment`

Use this to observe active or completed runs without interpreting them as scientific results.

It checks logs, process status, result files, and error traces. It shows raw numbers or log excerpts before interpretation and flags NaN, divergence, missing files, stale logs, idle GPUs, or config mismatch. It does not kill or restart jobs without authorization.

Expected outputs are `research/experiments/MONITOR_LOG.md`, tracker status updates, and raw result pointers for `/gsd-ljx-analyze-results`.

### `/gsd-ljx-training-check`

Use this during active training when the question is quality, not just process health.

It checks loss trends, eval metrics, NaN/Inf, spikes, learning-rate schedule, gradient norm, throughput, and baseline regression. It classifies the run as `STOP`, `CONTINUE`, or `WAIT`. It avoids stopping on noisy metrics and requires evidence before recommending stop.

Expected output is `research/experiments/TRAINING_CHECKS.md` and tracker notes.

### `/gsd-ljx-analyze-results`

Use this after runs have produced raw outputs.

It parses JSON/CSV/logs/tables where possible, builds raw result tables before interpretation, computes deltas against the correct baseline, reports mean/std for multiple seeds, and separates observation, interpretation, implication, and next step.

Expected outputs are `research/experiments/RESULTS_TABLE.md`, `RESULTS_ANALYSIS.md`, and `NEXT_EXPERIMENTS.md` when gaps remain. The next handoff is `/gsd-ljx-experiment-audit` before `/gsd-ljx-result-to-claim`.

### `/gsd-ljx-experiment-audit`

Use this before any claim conversion or paper writing.

It traces every claimed number to raw evidence, checks for fake ground truth, baseline-as-ground-truth, self-normalized scores, phantom results, dead code, scope problems, and evaluation type. Evaluation types include `real_gt`, `synthetic_proxy`, `self_supervised_proxy`, `simulation_only`, and `human_eval`.

`FAIL` blocks downstream claim progression until GSD fixes or follow-up evidence clear the gap. `WARN` is non-blocking but must be carried into result-to-claim and claim-gate.

Expected outputs are `research/audit/EXPERIMENT_AUDIT.md`, `EXPERIMENT_AUDIT.json`, and `AUDIT_FIXES.md`.

### `/gsd-ljx-ablation-planner`

Use this when reviewers or claim gates require more evidence about components, design choices, or alternatives.

It starts from reviewer concerns and intended claims. It specifies what changes, what the ablation tests, expected result if the component matters, priority, claim impact, and compute estimate. It prioritizes component removal/replacement and config-only ablations over broad hyperparameter sweeps.

Expected output is `research/experiments/ABLATION_PLAN.md`, with tracker updates.

### `/gsd-ljx-result-to-claim`

Use this after result analysis and experiment audit exist.

It classifies an intended claim as `yes`, `partial`, `no`, or `unsupported`. It carries `integrity_status: pass | warn | fail | unavailable`, tags provisional claims, and records supported evidence, unsupported parts, missing evidence, suggested revision, next experiments, and confidence.

Expected output is `research/claims/RESULT_TO_CLAIM.md` plus updates to `CLAIM_LEDGER.md`. Every verdict routes to `/gsd-ljx-claim-gate`; this file alone never authorizes paper/rebuttal/release/public-claim text.

### `/gsd-ljx-claim-gate`

Use this before a research claim becomes public-facing text.

It converts result support and audit integrity into one of four gates:

- `GO`: `claim_supported: yes`, traceable evidence, no blocking findings.
- `NARROW`: `claim_supported: yes` or evidence-matched `partial`, but only after scope is reduced.
- `MORE_EVIDENCE`: plausible claim, but needs more experiment, ablation, literature, or reviewer evidence.
- `NO_CLAIM`: current evidence does not support the claim.

For paper/rebuttal/release/public summary, `GO` and `NARROW` both require `integrity_status: pass` and `normal_workflow_ready: true`. Warn/fail/unavailable integrity routes to `MORE_EVIDENCE` or `NO_CLAIM`.

Expected outputs are `research/claims/CLAIM_GATE.md`, `CLAIM_GATE.json`, and `CLAIM_LEDGER.md` updates.

### `/gsd-ljx-auto-review-loop`

Use this when a research artifact needs bounded review and fixes.

It runs with maximum 30 rounds and ends only after two consecutive clean rounds. A clean round requires no confirmed non-minor findings and a positive assessment such as ready/pass/accept/almost-ready. Low-score or not-ready verdicts are non-clean even without itemized bugs. Minor issues and rare edge cases do not block clean.

Expected outputs are `research/reviews/AUTO_REVIEW_LOOP.md` and `REVIEW_STATE.md`. Claim-affecting review findings route to `RESULT_TO_CLAIM.md` and `CLAIM_GATE.md`.

### `/gsd-ljx-paper-plan`

Use this after claims have passed claim gate and before drafting.

It builds a paper plan from claim ledger, result-to-claim, claim gate, audit, literature, novelty, ablation, and review artifacts. It only plans positive paper claims for `GO` or evidence-matched `NARROW` with `normal_workflow_ready: true` and `integrity_status: pass`; blocked claims become blockers and next GSD routes.

Expected outputs are `research/paper/PAPER_PLAN.md`, `PAPER_PLAN_REVIEW.md`, and claim ledger updates when claims are narrowed.

### `/gsd-ljx-paper-write`

Use this when there is an approved paper plan and claim gate artifacts.

It drafts section by section, keeps abstract/introduction specific, maps every contribution to claim gate and evidence, uses measured language, marks unverified citations as `[VERIFY]`, and runs reverse-outline checks. If `CLAIM_GATE.md` is missing, claim-bearing drafting is blocked and routed back to `/gsd-ljx-claim-gate`.

Expected outputs are `research/paper/DRAFT.md` or approved LaTeX sections, `CLAIM_TRACE.md`, `CITATION_CHECKLIST.md`, and `DRAFT_REVIEW.md` when reviewer feedback is used.

### `/gsd-ljx-paper-compile`

Use this for local PDF build verification.

It checks local prerequisites, compiles locally only, preserves source files, diagnoses missing packages/figures/references/citations, checks page count, PDF existence, unresolved markers, and reports warnings honestly. A clean compile is not scientific readiness.

Expected outputs are `research/paper/COMPILE_REPORT.md`, optional `COMPILE_LOG_SUMMARY.md`, and updated GSD verification notes.

### `/gsd-ljx-paper-improve`

Use this to improve an existing draft through bounded review/fix rounds.

It reads draft, compile report, claim trace, citation checklist, claim gate, and reviewer feedback. Before changing empirical/result-derived/contribution claims, it requires a valid `CLAIM_GATE.md` with `GO` or `NARROW`, `normal_workflow_ready: true`, and `integrity_status: pass`. It defaults to maximum 2 improvement rounds.

Expected outputs are `research/paper/PAPER_IMPROVEMENT_LOG.md`, `PAPER_IMPROVEMENT_STATE.json`, and updated draft files or patch notes.

### `/gsd-ljx-rebuttal-plan`

Use this after receiving external reviews and before drafting response text.

It preserves raw reviews, validates venue rules, atomizes every reviewer concern into issue IDs such as `R1-C2`, classifies issue type/severity, chooses response modes, identifies global themes, and marks blocked claims. New experiments route through experiment bridge or ablation planner with authorization.

Expected outputs are `research/rebuttal/REVIEWS_RAW.md`, `ISSUE_BOARD.md`, `STRATEGY_PLAN.md`, and `REBUTTAL_BLOCKERS.md` when gates block drafting.

### `/gsd-ljx-rebuttal-draft`

Use this after rebuttal-plan has produced raw reviews, issue board, strategy, and venue constraints.

It enforces provenance, commitment, and coverage gates. Every factual sentence must map to paper/review/literature/future-work boundary or a `GO`/in-scope `NARROW` claim-gated result. Every promise must be already done, approved for rebuttal, or future-work only. Every issue ID must be answered, intentionally deferred, or marked needs user input.

Expected outputs are `research/rebuttal/REBUTTAL_DRAFT.md`, `PASTE_READY.txt`, `REBUTTAL_DRAFT_RICH.md`, `SAFETY_CHECK.md`, and updated issue-board statuses.

