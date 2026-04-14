# Auto/ARIS Reference Notes For v1.1 Review

**Baseline commit:** `1e150ea4e955b4f47bc549280a5c6c2a0c498b9a`
**Source root:** `.planning/references/upstreams/auto-claude-code-research-in-sleep/`

These notes are an implementation baseline for reviewing `ljx-GSD` research-native capabilities.

## Core Model

ARIS is a plain-Markdown research harness. It is intentionally lightweight: skills communicate through files, not a database or daemon. Codex-native skills live in `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/`. Source: `.planning/references/upstreams/auto-claude-code-research-in-sleep/AGENT_GUIDE.md`.

Common parameters:

- `effort: lite | balanced | max | beast`
- `human checkpoint: true | false`
- `AUTO_PROCEED: true | false`
- workflow-specific `difficulty`, `venue`, `sources`, and `gpu`

Artifact contracts:

- `IDEA_REPORT.md` from idea discovery.
- `EXPERIMENT_PLAN.md` from experiment planning.
- `EXPERIMENT_LOG.md` and `refine-logs/EXPERIMENT_TRACKER.md` from experiment execution.
- `NARRATIVE_REPORT.md` from auto-review.
- `paper/main.tex` and `paper/main.pdf` from paper workflow.
- `EXPERIMENT_AUDIT.md` / `.json` from experiment integrity.
- `research-wiki/` as optional persistent knowledge.
- `.aris/meta/events.jsonl` for meta-optimization.

Parity expectation: `ljx-GSD` can move these artifacts under `.planning/` or typed state records only if it keeps the handoff semantics visible and migration-readable.

## Cross-Model And Reviewer Independence

ARIS separates executor from reviewer. It prefers cross-model review because same-model self-review can miss repeated patterns. Shared references encode this:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/shared-references/reviewer-independence.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/shared-references/experiment-integrity.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/shared-references/effort-contract.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/shared-references/citation-discipline.md`

Parity expectation: `ljx-GSD` review loops and claim gates must not silently collapse reviewer/executor roles unless they mark the verdict as local/pending external review.

Codex adaptation has multiple reviewer layers that should not be flattened accidentally:

- Base Codex mirror: `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/`.
- Codex + Claude reviewer overlay: `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex-claude-review/`.
- Codex + Gemini reviewer overlay: `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex-gemini-review/`.

The overlay contract is intentionally narrow: review, reply, start, reply-start, and status style calls. Long prompts should prefer async review. Gemini overlay can carry `imagePaths` for multimodal review, especially poster/visual outputs.

Parity expectation: install/build logic should preserve overlay order and capability boundaries instead of merging all reviewer variants into one untestable monolith.

## Idea Discovery And Literature Review

Source files:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/idea-discovery/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/research-lit/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/idea-creator/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/novelty-check/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/research-review/SKILL.md`

Idea discovery chains:

```text
research-lit -> idea-creator -> novelty-check -> research-review -> research-refine-pipeline
```

It handles reference papers, literature survey, idea filtering, pilots, novelty verification, external critical review, and final `IDEA_REPORT.md` with refine logs. It has pilot budgets and auto-proceed checkpoints.

Research-lit uses optional source selection across Zotero, Obsidian, local PDFs, web/arXiv, and DeepXiv. It supports arXiv metadata by default and PDF download only when explicitly enabled.

Parity expectation: `ljx-GSD` must not reduce literature review to a generic web search wrapper; source selection, graceful degradation, de-duplication, arXiv/DeepXiv handling, and citation discipline are part of the capability.

## Research Refinement

Source: `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/research-refine/SKILL.md`.

The refine workflow freezes a problem anchor and iterates proposal/review/refinement until score >= 9 or max rounds. It writes:

- `refine-logs/REFINE_STATE.json`
- `round-N-review.md`
- `round-N-refinement.md`
- `REVIEW_SUMMARY.md`
- `FINAL_PROPOSAL.md`
- `REFINEMENT_REPORT.md`
- `score-history.md`

It explicitly values smallest adequate mechanism, one dominant contribution, and frontier-native leverage only when it directly serves the bottleneck.

Parity expectation: `ljx-GSD` refinement should preserve problem-anchor discipline and score-gated iteration, not become a one-shot method summary.

## Experiment Bridge, Monitoring, And Results

Source files:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/experiment-bridge/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/run-experiment/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/monitor-experiment/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/training-check/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/analyze-results/SKILL.md`

Experiment bridge reads `refine-logs/EXPERIMENT_PLAN.md`, `EXPERIMENT_TRACKER.md`, `FINAL_PROPOSAL.md`, compact idea files, or `IDEA_REPORT.md`. It implements experiments, runs sanity checks, deploys, monitors, updates tracker/log files, and can invoke ablation planning after positive main results.

Parity expectation: `ljx-GSD` should keep experiment execution claim-driven and evidence-backed. It must not mark experiments ready for review unless sanity and result collection are explicit.

Additional high-risk details from the broader ARIS skill set:

- GPU lifecycle safety includes sanity-first deployment, retry/debug behavior, W&B training quality checks, watchdog health checks, Vast instance tracking/destruction, and Modal cost confirmation.
- Experiment integrity includes fake ground-truth checks, self-normalized metric detection, phantom-result checks, and scope-inflation checks. These should be reviewed by a secondary reviewer, not by the executor alone.
- Result files should be parseable, typically JSON/CSV/log-backed, so later result analysis, claim gating, and paper figure generation do not depend on prose-only summaries.

## Review Loop And Claim Gate

Source files:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/auto-review-loop/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/result-to-claim/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/experiment-audit/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/ablation-planner/SKILL.md`

Auto review loop:

- Max 4 rounds.
- Positive threshold is score >= 6/10 or ready/accept-style verdict.
- Writes cumulative `AUTO_REVIEW.md`.
- Persists `REVIEW_STATE.json` for recovery.
- Can use human checkpoints.
- Preserves raw reviewer responses.
- Writes method/pipeline description and can invoke `result-to-claim` at termination.

Difficulty semantics:

- `medium` is the standard review path.
- `hard` adds stronger reviewer memory/debate behavior.
- `nightmare` is expected to let the reviewer read repository/results/logs directly rather than trusting executor-curated context.

Parity expectation: if `ljx-GSD` exposes difficulty/autonomy knobs, it must either implement these distinctions or clearly mark them as unsupported. It must not map `nightmare` to a normal summarized review.

Result-to-claim:

- Collects W&B, experiment logs, trackers, log files, and intended claims.
- Sends evidence to a secondary Codex reviewer.
- Normalizes `claim_supported: yes | partial | no`.
- Routes no/partial/yes differently.
- Requires honest scope and records verdicts.

Parity expectation: `ljx-GSD` review and claim gates must preserve raw review evidence, bounded loops, checkpoint recovery, and strict claim weakening when evidence is partial.

## Paper And Rebuttal Workflows

Source files:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/paper-writing/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/paper-plan/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/paper-figure/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/paper-write/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/paper-compile/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/auto-paper-improvement-loop/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/rebuttal/SKILL.md`

Paper-writing chains:

```text
paper-plan -> paper-figure -> paper-write -> paper-compile -> auto-paper-improvement-loop
```

The paper plan builds a claims-evidence matrix. Figure generation produces plots/tables and optional AI illustration. Writing generates LaTeX, citations, stale-file cleanup, and de-AI polish. Compile does multi-pass build and auto-repair. Improvement loop runs two review/fix/recompile rounds.

Rebuttal:

- Requires paper, raw reviews, venue rules/limit, and current stage.
- Writes `rebuttal/REVIEWS_RAW.md`, `ISSUE_BOARD.md`, `STRATEGY_PLAN.md`, drafts, stress tests, and paste-ready output.
- Uses hard safety gates: provenance, commitment, and coverage.
- Does not auto-run new experiments unless `AUTO_EXPERIMENT=true`.

Parity expectation: `ljx-GSD` paper/rebuttal integration must keep bounded workspaces and safety gates. It must not invent paper claims, reviewer responses, or venue promises.

## Optional Tools And Backends

Relevant source areas:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/tools/arxiv_fetch.py`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/tools/deepxiv_fetch.py`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/tools/research_wiki.py`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/tools/smart_update.sh`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/tools/watchdog.py`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/mcp-servers/`

Parity expectation: optional providers can remain optional, but the combined system should preserve graceful degradation and clear user-facing requirements when a backend is missing.

## Research Wiki And Meta Optimization

Relevant files:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/research-wiki/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/meta-optimize/SKILL.md`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/templates/claude-hooks/meta_logging.json`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/tools/research_wiki.py`
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/tools/meta_opt/log_event.sh`

Research Wiki provides persistent memory for papers, ideas, experiments, and claims. Failed ideas should become anti-repetition memory, not disappear. Meta-optimize passively logs harness usage and proposes skill improvements through a reviewer-gated process.

Parity expectation: `ljx-GSD` does not need to make these mandatory in the base control plane, but if it claims Auto/ARIS capability preservation it must leave an integration path for research memory and meta-optimization.

## High-Risk Review Checks For ljx-GSD

- Are Auto/ARIS commands still discoverable on the public surface where prior design required them?
- Did any workflow lose critical artifacts such as `IDEA_REPORT.md`, `FINAL_PROPOSAL.md`, `EXPERIMENT_PLAN.md`, `EXPERIMENT_LOG.md`, `AUTO_REVIEW.md`, `CLAIMS_FROM_RESULTS.md`, or rebuttal issue boards?
- Are effort/autonomy/checkpoint parameters implemented or clearly mapped to canonical `ljx-GSD` config keys?
- Does `research-pipeline` remain an umbrella into the unified GSD state system instead of reintroducing an untracked parallel control plane?
- Are review loops bounded and externally judged, with raw responses preserved?
- Does result-to-claim weaken unsupported claims instead of promoting partial evidence?
- Do paper/rebuttal flows preserve no-fabrication, no-overpromise, and coverage gates?
- Does literature review still support local/library/web/arXiv/DeepXiv-style source policy and graceful degradation?
- Are `hard` and `nightmare` review modes either implemented faithfully or rejected honestly?
- Are W&B, watchdog, Vast, Modal, Feishu, Zotero, Obsidian, DeepXiv, Semantic Scholar, Claude-review, Gemini-review, MiniMax, and LLM-chat integrations fail-open when unconfigured?
- Are citation discipline and venue-specific style/page/citation differences preserved, especially IEEE versus natbib-style venues?
- Does Research Wiki retain typed entities, graph edges/query packs, and failed-idea anti-repetition memory if exposed?
- Does effort scaling avoid lowering invariant quality gates such as reviewer independence, citation integrity, experiment integrity, and sanity checks?
