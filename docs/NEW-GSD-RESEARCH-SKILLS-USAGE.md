# How To Use The New GSD Research Skills

生成日期：2026-04-16

本文档说明如何实际使用新增的 `/gsd-ljx-*` research skills。它假设这些 skills 已安装为 GSD slash commands，并且你希望用 GSD 做生命周期管理，而不是启动一套独立 research automation。

## 快速原则

1. 先有 GSD phase，再做 research artifact。
2. 所有 research 输出都进入 `.planning/phases/<phase>/research/`。
3. 代码变更仍走 `/gsd-plan-phase` 和 `/gsd-execute-phase`。
4. 外部资源、长任务、付费计算、SSH、W&B、submission portal 都必须显式授权。
5. 实验结果不能直接写成论文 claim；必须经过 `analyze -> audit -> result-to-claim -> claim-gate`。
6. Paper/rebuttal/release/public summary 只能使用 `GO` 或 in-scope `NARROW`，并且必须有 `normal_workflow_ready: true` 和 `integrity_status: pass`。

## 原 Auto Research 参数如何处理

这个实现故意不保留原 Auto Research 的全局 helper/config/compiler。没有 `.planning/research.config.json`、prompt pack registry、source registry、model matrix 或自动 research dispatcher。每个 research 能力都写成一个薄的 GSD skill 文档，参数通过自然语言进入当前调用，再写入当前 phase 的 research artifact。

保留下来的不是旧系统的运行时参数，而是 research 语义参数：

| 参数类型 | 现在的位置 | 说明 |
| --- | --- | --- |
| Review 轮数 | `/gsd-ljx-auto-review-loop` 文本和 `research/reviews/` artifacts | 硬上限 30 轮，连续两轮 clean 才结束。可以在调用时指定更低上限。 |
| Clean 判定 | `/gsd-ljx-auto-review-loop` | non-minor finding、not-ready、低分或负面 verdict 都不能算 clean；minor、措辞、罕见边界不影响 clean。 |
| Novelty 分数 | `/gsd-ljx-novelty-check` 输出 | 使用 `Score: X/10`，并输出 `PROCEED`、`PROCEED WITH CAUTION` 或 `ABANDON`。 |
| Novelty 定义 | `/gsd-ljx-novelty-check` | 同时看 method novelty 和 experimental-setting novelty，并记录 closest prior work。 |
| Idea 数量 | `/gsd-ljx-idea-creator` | 默认生成 8-12 个 idea，可以用自然语言要求更少或更多候选。 |
| Refine 目标 | `/gsd-ljx-research-refine` 和 `/gsd-ljx-research-refine-pipeline` | 默认向 9/10 质量 proposal 收敛，除非调用时指定不同标准。 |
| 实验优先级 | `/gsd-ljx-experiment-plan` | 使用 `MUST-RUN`、`NICE-TO-HAVE` 等优先级，并写入 experiment plan/tracker。 |
| 预算、seed、metric | `/gsd-ljx-experiment-plan`、`/gsd-ljx-experiment-bridge`、`/gsd-ljx-run-experiment` | 通过自然语言传入，然后写进 `EXPERIMENT_PLAN.md`、`EXPERIMENT_TRACKER.md` 或 `RUN_LOG.md`。 |
| Ablation 优先级 | `/gsd-ljx-ablation-planner` | 使用 1-5 优先级，并记录 reviewer concern、compute cost 和 claim impact。 |
| Claim 支持状态 | `/gsd-ljx-result-to-claim` | 使用 `yes`、`partial`、`no`、`unsupported`，同时记录 `integrity_status`。 |
| Claim gate | `/gsd-ljx-claim-gate` | 输出 `GO`、`NARROW`、`MORE_EVIDENCE` 或 `NO_CLAIM`。 |

### 自然语言指定参数

可以。推荐把参数直接写进 skill 调用中，尤其是当前 phase、预算、轮数、novelty 阈值、metric、venue、review 严格度等。

示例：

```text
/gsd-ljx-auto-review-loop "审核 phase 08.1，最多 12 轮，连续两轮 clean 结束；minor 文案问题不影响 clean"
/gsd-ljx-experiment-plan "预算 8 GPU-hours，3 个 seed，primary metric 是 F1，baseline 必须包含 BM25 和 current SOTA"
/gsd-ljx-novelty-check "如果 novelty <7/10 标记 caution，<5/10 标记 abandon；重点看 method novelty"
/gsd-ljx-paper-plan "目标 venue 是 ACL，8 页正文，claim 只能使用 CLAIM_GATE 中 GO/NARROW 的内容"
```

这些参数默认只影响本次调用和当前 phase artifacts。若希望后续 skill 继续遵守同一参数，需要要求当前 skill 把它们写入对应 artifact，例如 `RISK_BUDGET.md`、`EXPERIMENT_TRACKER.md`、`CLAIM_GATE.md` 或 `AUTO_REVIEW_LOOP.md`。

### 不能用自然语言覆盖的边界

以下约束属于安全边界，不应靠一句自然语言绕过：

- `/gsd-ljx-auto-review-loop` 的硬上限是 30 轮；更高上限需要修改 skill 文本。
- 外部资源、付费计算、SSH、W&B、后台长任务、submission portal 都需要显式授权。
- `RESULT_TO_CLAIM.md` 不能直接授权 paper/rebuttal/release/public summary。
- `warn`、`fail` 或 `unavailable` integrity 不能被当作公开 claim 的 pass。
- `MORE_EVIDENCE` 和 `NO_CLAIM` 不能写成正向 public claim。

## 最常用入口

### 从一个研究方向开始

```text
/gsd-ljx-research-pipeline <research direction>
```

这会按照完整生命周期推进：

```text
idea discovery
-> experiment planning
-> GSD implementation planning/execution
-> authorized experiment execution
-> result analysis
-> audit
-> result-to-claim
-> claim gate
-> paper/rebuttal only if explicitly in scope
```

### 只想做 idea discovery

```text
/gsd-ljx-idea-discovery <research direction>
```

适合你还没有确定具体 idea，只想从方向出发得到候选 idea、novelty 风险、review 意见和 refined proposal。

### 已经有 proposal，想规划实验

```text
/gsd-ljx-experiment-plan <proposal or final idea>
```

输入最好包括：

- `research/refine/FINAL_PROPOSAL.md`
- preliminary `research/refine/EXPERIMENT_PLAN.md`
- preliminary `research/refine/EXPERIMENT_TRACKER.md`
- `research/refine/PIPELINE_SUMMARY.md`
- novelty report
- review actions

输出正式实验 artifact：

- `research/experiments/EXPERIMENT_PLAN.md`
- `research/experiments/CLAIM_MAP.md`
- `research/experiments/EXPERIMENT_TRACKER.md`
- `research/experiments/RISK_BUDGET.md`

### 已经有实验结果，想判断能不能写 claim

```text
/gsd-ljx-analyze-results <result directory or tracker>
/gsd-ljx-experiment-audit <experiment results or phase>
/gsd-ljx-result-to-claim <results and intended claim>
/gsd-ljx-claim-gate <claim decision, audit, or result summary>
```

不要跳过 audit。`/gsd-ljx-analyze-results` 只负责透明分析结果，不负责判断 paper claim 是否成立。

### 已经有 claim gate，想写 paper

```text
/gsd-ljx-paper-plan <claim ledger or results>
/gsd-ljx-paper-write <paper plan or section>
/gsd-ljx-paper-compile <paper directory>
/gsd-ljx-paper-improve <paper draft or directory>
```

如果 `CLAIM_GATE.md` 缺失，或者 gate 不是合格的 `GO/NARROW`，paper claim 文案应停止并回到 `/gsd-ljx-claim-gate`。

### 已经收到外部 review，想写 rebuttal

```text
/gsd-ljx-rebuttal-plan <reviews, paper, or venue rules>
/gsd-ljx-rebuttal-draft <strategy plan or rebuttal directory>
```

Rebuttal 的基本顺序是：先 preserve raw reviews，再建 issue board，再做 strategy plan，最后写 draft。不要直接开始写 paste-ready 文案。

## 推荐工作流

### Workflow A: 完整 idea-to-paper

```text
1. /gsd-ljx-research-pipeline "broad direction"
2. 它会先进入 /gsd-ljx-idea-discovery
3. idea 稳定后，进入 /gsd-ljx-experiment-plan
4. 需要代码时，运行 /gsd-plan-phase 和 /gsd-execute-phase
5. 需要外部运行时，先 /gsd-ljx-experiment-bridge
6. 明确授权后，/gsd-ljx-run-experiment
7. 运行中用 /gsd-ljx-monitor-experiment 或 /gsd-ljx-training-check
8. 完成后 /gsd-ljx-analyze-results
9. 然后 /gsd-ljx-experiment-audit
10. 然后 /gsd-ljx-result-to-claim
11. 然后 /gsd-ljx-claim-gate
12. Gate 通过后再进入 paper/rebuttal
```

### Workflow B: 只做 research validation，不写代码

```text
1. /gsd-ljx-research-lit <topic>
2. /gsd-ljx-idea-creator <direction or literature summary>
3. /gsd-ljx-novelty-check <top idea>
4. /gsd-ljx-research-review <proposal>
5. /gsd-ljx-research-refine <idea or proposal>
```

这条路径的输出通常足够决定是否值得进入正式 GSD implementation phase。

### Workflow C: 已有代码和实验，只补 research rigor

```text
1. /gsd-ljx-experiment-plan <current proposal>
2. /gsd-ljx-analyze-results <existing results>
3. /gsd-ljx-experiment-audit <phase>
4. /gsd-ljx-result-to-claim <intended claim>
5. /gsd-ljx-claim-gate <claim decision>
```

如果 audit 发现 `FAIL`，claim progression 应停止，先用 GSD 计划修复或补证据。

### Workflow D: Paper draft 改进

```text
1. /gsd-ljx-paper-plan <claim ledger/results>
2. /gsd-ljx-paper-write <paper plan>
3. /gsd-ljx-paper-compile <paper directory>
4. /gsd-ljx-paper-improve <paper draft>
5. /gsd-ljx-auto-review-loop <paper or phase>    # 可选
```

注意：compile 通过只说明 PDF 构建成功，不说明科学 claim 成立。

### Workflow E: Rebuttal

```text
1. /gsd-ljx-rebuttal-plan <raw reviews and venue rules>
2. 对需要新证据的问题，转 /gsd-ljx-experiment-bridge 或 /gsd-ljx-ablation-planner
3. 对 claim 相关回复，确认 RESULT_TO_CLAIM 和 CLAIM_GATE
4. /gsd-ljx-rebuttal-draft <strategy plan>
```

不要在 rebuttal 中承诺未完成实验。需要未来工作的内容应标为 future-work boundary。

## Claim Gate 用法

`/gsd-ljx-claim-gate` 是公开 claim 的关键门。

| Gate | 含义 | 下一步 |
| --- | --- | --- |
| `GO` | 当前 evidence 足以支持 claim。 | 可进入 paper/rebuttal，但还要满足 `integrity_status: pass` 和 `normal_workflow_ready: true`。 |
| `NARROW` | 原 claim 太宽，但缩小范围后可支持。 | 只允许写 narrowed scope 内的 claim。 |
| `MORE_EVIDENCE` | claim 可能成立，但还缺实验、消融、文献或 review evidence。 | 回到 experiment/ablation/GSD plan。 |
| `NO_CLAIM` | 当前 evidence 不支持 claim。 | 不写公开 claim，记录 blocker 或 pivot。 |

`RESULT_TO_CLAIM.md` 只是输入，不是授权。公开 claim 必须看 `CLAIM_GATE.md`/`CLAIM_GATE.json`。

## Artifact 目录说明

典型目录结构：

```text
.planning/phases/<phase>/research/
  LITERATURE_REVIEW.md
  PAPER_TABLE.md
  SEARCH_LOG.md
  IDEA_CANDIDATES.md
  IDEA_RANKING.md
  NOVELTY_REPORT.md
  IDEA_DISCOVERY_SUMMARY.md
  IDEA_REPORT.md

  refine/
    PROBLEM_ANCHOR.md
    REFINEMENT_LOG.md
    FINAL_PROPOSAL.md
    EXPERIMENT_PLAN.md          # preliminary only
    EXPERIMENT_TRACKER.md       # preliminary only
    PIPELINE_SUMMARY.md

  experiments/
    EXPERIMENT_PLAN.md          # formal
    CLAIM_MAP.md
    EXPERIMENT_TRACKER.md
    RISK_BUDGET.md
    EXPERIMENT_BRIDGE.md
    RUN_LOG.md
    MONITOR_LOG.md
    TRAINING_CHECKS.md
    RESULTS_TABLE.md
    RESULTS_ANALYSIS.md
    NEXT_EXPERIMENTS.md
    ABLATION_PLAN.md

  audit/
    EXPERIMENT_AUDIT.md
    EXPERIMENT_AUDIT.json
    AUDIT_FIXES.md

  claims/
    RESULT_TO_CLAIM.md
    CLAIM_GATE.md
    CLAIM_GATE.json
    CLAIM_LEDGER.md

  reviews/
    RESEARCH_REVIEW.md
    REVIEW_ACTIONS.md
    AUTO_REVIEW_LOOP.md
    REVIEW_STATE.md

  paper/
    PAPER_PLAN.md
    PAPER_PLAN_REVIEW.md
    DRAFT.md
    CLAIM_TRACE.md
    CITATION_CHECKLIST.md
    COMPILE_REPORT.md
    PAPER_IMPROVEMENT_LOG.md

  rebuttal/
    REVIEWS_RAW.md
    ISSUE_BOARD.md
    STRATEGY_PLAN.md
    REBUTTAL_BLOCKERS.md
    REBUTTAL_DRAFT.md
    PASTE_READY.txt
    REBUTTAL_DRAFT_RICH.md
    SAFETY_CHECK.md
```

## Review Loop 用法

```text
/gsd-ljx-auto-review-loop <phase, proposal, code, results, or paper>
```

规则：

- 上限 30 轮。
- 必须连续两轮 clean 才结束。
- clean 必须同时满足：无主审确认的 non-minor findings，并且 reviewer 给 ready/pass/accept/almost-ready 之类正向判断。
- not-ready、低分、负面 verdict 即使没有列出 bug，也不是 clean。
- minor、格式、措辞、罕见边界不影响 clean。
- 每轮 raw reviewer response 必须保存。
- 先修复，再复审。

## 外部资源授权

以下行为默认不能自动执行：

- paid compute
- SSH/remote server
- W&B/API/private tracker
- long-running background job
- killing/restarting/pause/resume training
- downloading PDFs when policy does not allow
- uploading/submitting paper or rebuttal
- mutating OpenReview/CMT/HotCRP/email/submission systems

如果需要这些操作，先取得明确授权，并在 artifact 中记录授权、命令、环境、日志和结果路径。

## 常见错误

### 错误：把 preliminary refine plan 当成正式 experiment plan

`research/refine/EXPERIMENT_PLAN.md` 只是 preliminary roadmap。正式执行前必须运行：

```text
/gsd-ljx-experiment-plan
```

并生成 `research/experiments/EXPERIMENT_PLAN.md`、`CLAIM_MAP.md`、`EXPERIMENT_TRACKER.md`、`RISK_BUDGET.md`。

### 错误：从结果分析直接写 paper claim

正确链路是：

```text
/gsd-ljx-analyze-results
-> /gsd-ljx-experiment-audit
-> /gsd-ljx-result-to-claim
-> /gsd-ljx-claim-gate
```

### 错误：用 `partial` 支撑 broad claim

`partial` 只能进入 `NARROW`，并且只能写 narrowed scope 内的 claim。

### 错误：compile 通过就认为 paper ready

`/gsd-ljx-paper-compile` 只验证本地构建。claim、citation、review issue 仍必须分别通过 gate/check。

### 错误：rebuttal 直接承诺新实验

Rebuttal 中的承诺必须属于 already done、approved for rebuttal、或 future-work boundary。新实验需要走 experiment bridge 或 ablation planner，并且要授权。

## 最短命令备忘

```text
# 从方向到 idea
/gsd-ljx-idea-discovery <direction>

# 文献
/gsd-ljx-research-lit <topic>

# novelty
/gsd-ljx-novelty-check <idea>

# 独立 research review
/gsd-ljx-research-review <proposal/results/paper/phase>

# 精炼 idea
/gsd-ljx-research-refine <proposal>
/gsd-ljx-research-refine-pipeline <selected idea>

# 实验
/gsd-ljx-experiment-plan <proposal>
/gsd-ljx-experiment-bridge <experiment plan>
/gsd-ljx-run-experiment <authorized command>
/gsd-ljx-monitor-experiment <run id/log/tracker>
/gsd-ljx-training-check <run id/log>

# 结果和 claim
/gsd-ljx-analyze-results <results>
/gsd-ljx-experiment-audit <phase>
/gsd-ljx-result-to-claim <claim>
/gsd-ljx-claim-gate <claim decision>

# evidence 补强
/gsd-ljx-ablation-planner <claim or method>

# paper
/gsd-ljx-paper-plan <claim ledger/results>
/gsd-ljx-paper-write <paper plan>
/gsd-ljx-paper-compile <paper directory>
/gsd-ljx-paper-improve <draft>

# rebuttal
/gsd-ljx-rebuttal-plan <reviews>
/gsd-ljx-rebuttal-draft <strategy plan>

# bounded review
/gsd-ljx-auto-review-loop <artifact or phase>
```
