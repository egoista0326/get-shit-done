# v1.1 Upstream Source Inventory

**Phase:** 15 — Upstream Reference Baseline
**Generated:** 2026-04-12
**Purpose:** Durable index of the upstream source snapshots used as review baselines for `ljx-GSD`.

## Repository Snapshots

| Baseline | Path | GitHub | Commit |
|----------|------|--------|--------|
| GSD | `.planning/references/upstreams/get-shit-done/` | `https://github.com/gsd-build/get-shit-done` | `553d9db56eab6ad2ab26e943ff806a8bc92c22cc` |
| Auto/ARIS | `.planning/references/upstreams/auto-claude-code-research-in-sleep/` | `https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep` | `1e150ea4e955b4f47bc549280a5c6c2a0c498b9a` |

## GSD Source Areas To Preserve

Primary inspected files:

- `.planning/references/upstreams/get-shit-done/README.md` — user-facing install and current feature surface.
- `.planning/references/upstreams/get-shit-done/docs/ARCHITECTURE.md` — command/workflow/agent/CLI/filesystem/hook architecture.
- `.planning/references/upstreams/get-shit-done/commands/gsd/` — user command surface; Codex install converts these to skills.
- `.planning/references/upstreams/get-shit-done/agents/` — specialized agent definitions.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/discuss-phase.md` — phase-context capture and grey-area process.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/plan-phase.md` — research/planner/checker flow.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/execute-phase.md` — wave-based execution and verification.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/autonomous.md` — autonomous discuss/plan/execute/review lifecycle.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/progress.md` — state snapshot, current-position report, and next-action routing.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/new-project.md` and `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/new-milestone.md` — project/milestone initialization.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/code-review.md` — file-scope resolution and reviewer flow.
- `.planning/references/upstreams/get-shit-done/get-shit-done/workflows/verify-work.md` — UAT/verification gate.
- `.planning/references/upstreams/get-shit-done/commands/gsd/workstreams.md` — parallel workstream command surface.
- `.planning/references/upstreams/get-shit-done/commands/gsd/new-workspace.md` and `.planning/references/upstreams/get-shit-done/commands/gsd/list-workspaces.md` — workspace management entry points.
- `.planning/references/upstreams/get-shit-done/get-shit-done/bin/gsd-tools.cjs` — CLI entry point for state/config/phase/roadmap/etc.
- `.planning/references/upstreams/get-shit-done/get-shit-done/templates/` — canonical planning artifact templates.
- `.planning/references/upstreams/get-shit-done/hooks/` — runtime hook surface.
- `.planning/references/upstreams/get-shit-done/tests/` — behavior-regression expectations, including install, workstream, autonomous, code review, verify, import, and security tests.

Review expectation: `ljx-GSD` may adapt naming and state ownership, but must not lose the GSD control-plane properties: file-backed state, phase lifecycle, routing, context recovery, workstreams/workspaces, code review, verification, autonomous progression, and Codex conversion honesty.

## Auto/ARIS Source Areas To Preserve

Primary inspected files:

- `.planning/references/upstreams/auto-claude-code-research-in-sleep/README.md` — public ARIS positioning, new features, and pipeline overview.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/AGENT_GUIDE.md` — AI-agent routing index, common parameters, workflow table, artifact contracts, and cross-model protocol.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/README.md` — Codex-native mirror scope and installation.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/research-pipeline/SKILL.md` — end-to-end idea to experiment to review pipeline.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/idea-discovery/SKILL.md` — research-lit → idea-creator → novelty-check → research-review → refine/experiment plan chain.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/research-lit/SKILL.md` — literature-source policy and arXiv/DeepXiv handling.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/research-refine/SKILL.md` — problem-anchor and iterative refinement loop.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/experiment-bridge/SKILL.md` — experiment implementation/deploy/collect bridge.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/auto-review-loop/SKILL.md` — multi-round autonomous external review and fix loop.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/result-to-claim/SKILL.md` — claim support judgment gate.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/paper-writing/SKILL.md` — paper-plan → paper-figure → paper-write → paper-compile → improvement chain.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/rebuttal/SKILL.md` — grounded rebuttal workflow and safety gates.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/analyze-results/SKILL.md` — experiment-result interpretation.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/ablation-planner/SKILL.md` — reviewer-facing ablation design.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/research-review/SKILL.md` — external review entry point.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/novelty-check/SKILL.md` — novelty check entry point.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/shared-references/` and `.planning/references/upstreams/auto-claude-code-research-in-sleep/skills/skills-codex/shared-references/` — reviewer independence, experiment integrity, effort contract, citation discipline, writing principles, and venue checklists.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/tools/` — arXiv, DeepXiv, research wiki, smart update, watchdog, and conversion utilities.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/mcp-servers/` — optional cross-model/review backend servers.
- `.planning/references/upstreams/auto-claude-code-research-in-sleep/templates/` — research contract, experiment plan/log, narrative report, and paper plan templates.

Review expectation: `ljx-GSD` may absorb Auto/ARIS into a GSD-style phase/state model, but must preserve research lifecycle strength: literature-informed ideation, novelty checking, problem-anchored refinement, experiment bridge, training/result monitoring, adversarial review loops, claim judgment, paper writing, rebuttal safety, shared research references, and configurable autonomy.
