# 01-GSD-SOURCE-INDEX

**Status:** R3-reviewed draft
**Evidence boundary:** Synthesized from upstream GSD lifecycle/control-plane and runtime/helper subagent reports, then corrected by R1 source-coverage reviewers.

## Path Convention

All non-absolute paths in this index are prefixed by an explicit source root token:

- `UPSTREAM_GSD_REF`: `/Users/lijiaxin/Downloads/new-gsd/.planning/references/upstreams/get-shit-done/`
- `UPSTREAM_GSD_INSTALLED`: `/Users/lijiaxin/.codex/get-shit-done/`
- `CURRENT_LJX_GSD`: `/Users/lijiaxin/Downloads/new-gsd/`
- `AUTO_ARIS_REF`: `/Users/lijiaxin/Downloads/new-gsd/.planning/references/upstreams/auto-claude-code-research-in-sleep/`

## Canonical Source Roots

Phase 01 has three primary source systems, plus one installed-runtime orientation source:

| Source system | Root | Use in Phase 01 |
|---|---|---|
| Upstream GSD reference checkout | `UPSTREAM_GSD_REF` | Source baseline for ordinary GSD lifecycle, runtime helpers, prompts, templates, SDK package, packaging, hooks, tests, and docs. |
| Installed local GSD runtime | `UPSTREAM_GSD_INSTALLED` | Orientation only for current installed behavior; not authoritative until Phase 02 resolves `1.35.0` reference versus `1.34.2` installed divergence. |
| Current ljx-GSD and history | `CURRENT_LJX_GSD` | Historical evidence, failure taxonomy, salvage candidates, root docs, current `bin/lib`, tests, `.planning/review`, and archived v1.4 phase/state material. |
| Auto/ARIS reference checkout | `AUTO_ARIS_REF` | Source baseline for research command workflows, artifacts, parameters, provider overlays, paper/rebuttal tooling, and support tools. |

Version note: upstream reference checkout reports `1.35.0`; installed local runtime reports `1.34.2`.

## Upstream GSD Lifecycle And Workflow Sources

| Behavior | Source files |
|---|---|
| Architecture layering | `UPSTREAM_GSD_REF:docs/ARCHITECTURE.md` |
| User guide lifecycle | `UPSTREAM_GSD_REF:docs/USER-GUIDE.md` |
| Command reference and `next` routing | `UPSTREAM_GSD_REF:docs/COMMANDS.md`; `UPSTREAM_GSD_REF:commands/gsd/next.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/next.md` |
| New project | `UPSTREAM_GSD_REF:commands/gsd/new-project.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/new-project.md` |
| New milestone | `UPSTREAM_GSD_REF:commands/gsd/new-milestone.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/new-milestone.md` |
| Discuss phase | `UPSTREAM_GSD_REF:commands/gsd/discuss-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/discuss-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/discuss-phase-assumptions.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/discuss-phase-power.md` |
| Plan phase | `UPSTREAM_GSD_REF:commands/gsd/plan-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/plan-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/research-phase.md` |
| Execute phase | `UPSTREAM_GSD_REF:commands/gsd/execute-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/execute-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/execute-plan.md` |
| Verify/UAT | `UPSTREAM_GSD_REF:commands/gsd/verify-work.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/verify-work.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/verify-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/references/verification-patterns.md`; `UPSTREAM_GSD_REF:get-shit-done/references/verification-overrides.md` |
| Progress | `UPSTREAM_GSD_REF:commands/gsd/progress.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/progress.md` |
| Pause/resume | `UPSTREAM_GSD_REF:commands/gsd/pause-work.md`; `UPSTREAM_GSD_REF:commands/gsd/resume-work.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/pause-work.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/resume-project.md` |
| Internal transition | `UPSTREAM_GSD_REF:get-shit-done/workflows/transition.md` |
| Autonomous mode | `UPSTREAM_GSD_REF:commands/gsd/autonomous.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/autonomous.md` |
| Manager mode | `UPSTREAM_GSD_REF:commands/gsd/manager.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/manager.md` |
| Workspaces | `UPSTREAM_GSD_REF:commands/gsd/new-workspace.md`; `UPSTREAM_GSD_REF:commands/gsd/list-workspaces.md`; `UPSTREAM_GSD_REF:commands/gsd/remove-workspace.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/new-workspace.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/list-workspaces.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/remove-workspace.md` |
| Milestone audit and completion | `UPSTREAM_GSD_REF:commands/gsd/audit-milestone.md`; `UPSTREAM_GSD_REF:commands/gsd/complete-milestone.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/audit-milestone.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/complete-milestone.md` |
| Code review and fix | `UPSTREAM_GSD_REF:commands/gsd/code-review.md`; `UPSTREAM_GSD_REF:commands/gsd/code-review-fix.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/code-review.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/code-review-fix.md` |
| UI/security/validation workflows | `UPSTREAM_GSD_REF:get-shit-done/workflows/ui-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/ui-review.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/secure-phase.md`; `UPSTREAM_GSD_REF:get-shit-done/workflows/validate-phase.md` |

## Upstream Runtime, Package, Hook, And Test Sources

| Runtime domain | Source files/functions from subagent reports and R1 review |
|---|---|
| CLI dispatch | `UPSTREAM_GSD_REF:get-shit-done/bin/gsd-tools.cjs`; `main()` |
| Root/config/workstream core | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/core.cjs`; `findProjectRoot`, `CONFIG_DEFAULTS`, `loadConfig`, `withPlanningLock`, `planningDir`, `atomicWriteFileSync` |
| Config schema and creation | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/config.cjs`; `VALID_CONFIG_KEYS`, `buildNewProjectConfig` |
| State frontmatter and writes | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/state.cjs`; `buildStateFrontmatter`, `writeStateMd`, `cmdSignalWaiting`, `cmdSignalResume` |
| Phase indexing/completion | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/phase.cjs`; `cmdPhasePlanIndex`, `cmdPhaseComplete` |
| Roadmap analysis | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/roadmap.cjs`; `cmdRoadmapAnalyze` |
| Milestone archival | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/milestone.cjs`; `cmdMilestoneComplete` |
| Git planning commits | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/commands.cjs`; `cmdCommit`, `cmdCommitToSubrepo` |
| Model profiles | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/model-profiles.cjs`; `MODEL_PROFILES` |
| Agent install checks | `UPSTREAM_GSD_REF:get-shit-done/bin/lib/core.cjs`; `checkAgentsInstalled` |
| Installer/runtime adapters | `UPSTREAM_GSD_REF:bin/install.js`; `getGlobalDir`, Codex adapter generation, hook registration, uninstall, manifests, patch preservation |
| Hook sources | `UPSTREAM_GSD_REF:hooks/*.js`; `UPSTREAM_GSD_REF:hooks/*.sh`; `UPSTREAM_GSD_REF:scripts/build-hooks.js` |
| Package manifest and build surface | `UPSTREAM_GSD_REF:package.json`; `UPSTREAM_GSD_REF:package-lock.json`; `UPSTREAM_GSD_REF:scripts/run-tests.cjs`; `UPSTREAM_GSD_REF:scripts/build-hooks.js` |
| Package/install regression tests | `UPSTREAM_GSD_REF:tests/package-manifest.test.cjs`; `UPSTREAM_GSD_REF:tests/install-hooks-copy.test.cjs`; `UPSTREAM_GSD_REF:tests/atomic-write-coverage.test.cjs`; `UPSTREAM_GSD_REF:tests/hook-validation.test.cjs`; `UPSTREAM_GSD_REF:tests/orphaned-hooks.test.cjs` |
| Broader regression corpus | `UPSTREAM_GSD_REF:tests/*.test.cjs`; includes lifecycle, command, config, hook, install, package, concurrency, state, worktree, and migration contract tests. |

## Upstream SDK Package Boundary

The SDK is a package boundary, not only a wrapper. Its status for v2.0 consumption is a Phase 02 decision.

| SDK surface | Source files |
|---|---|
| Package manifest | `UPSTREAM_GSD_REF:sdk/package.json` |
| Public API and CLI entrypoint | `UPSTREAM_GSD_REF:sdk/src/index.ts`; `UPSTREAM_GSD_REF:sdk/src/cli.ts` |
| Runtime transport | `UPSTREAM_GSD_REF:sdk/src/gsd-tools.ts`; `UPSTREAM_GSD_REF:sdk/src/cli-transport.ts`; `UPSTREAM_GSD_REF:sdk/src/ws-transport.ts` |
| Phase/session/milestone runners | `UPSTREAM_GSD_REF:sdk/src/phase-runner.ts`; `UPSTREAM_GSD_REF:sdk/src/session-runner.ts`; `UPSTREAM_GSD_REF:sdk/src/init-runner.ts`; `UPSTREAM_GSD_REF:sdk/src/milestone-runner.test.ts` |
| Prompt assembly and sanitization | `UPSTREAM_GSD_REF:sdk/src/prompt-builder.ts`; `UPSTREAM_GSD_REF:sdk/src/prompt-sanitizer.ts`; `UPSTREAM_GSD_REF:sdk/src/assembled-prompts.test.ts`; `UPSTREAM_GSD_REF:sdk/src/headless-prompts.test.ts` |
| SDK tests | `UPSTREAM_GSD_REF:sdk/src/*.test.ts`; `UPSTREAM_GSD_REF:sdk/src/*.integration.test.ts` |

## Upstream Reference, Contract, And Template Sources

| Contract | Source files |
|---|---|
| Agent contracts and marker formats | `UPSTREAM_GSD_REF:get-shit-done/references/agent-contracts.md` |
| Gate taxonomy and prompts | `UPSTREAM_GSD_REF:get-shit-done/references/gates.md`; `UPSTREAM_GSD_REF:get-shit-done/references/gate-prompts.md` |
| Revision loops | `UPSTREAM_GSD_REF:get-shit-done/references/revision-loop.md` |
| Checkpoints | `UPSTREAM_GSD_REF:get-shit-done/references/checkpoints.md` |
| Context budgeting | `UPSTREAM_GSD_REF:get-shit-done/references/context-budget.md` |
| Continuation format | `UPSTREAM_GSD_REF:get-shit-done/references/continuation-format.md` |
| Planner source audit | `UPSTREAM_GSD_REF:get-shit-done/references/planner-source-audit.md` |
| Git planning commit behavior | `UPSTREAM_GSD_REF:get-shit-done/references/git-planning-commit.md`; `UPSTREAM_GSD_REF:get-shit-done/references/git-integration.md` |
| Workstream flag semantics | `UPSTREAM_GSD_REF:get-shit-done/references/workstream-flag.md` |
| Planning config docs | `UPSTREAM_GSD_REF:get-shit-done/references/planning-config.md` |
| Core project artifact templates | `UPSTREAM_GSD_REF:get-shit-done/templates/project.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/requirements.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/roadmap.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/state.md` |
| Phase artifact templates | `UPSTREAM_GSD_REF:get-shit-done/templates/phase-prompt.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/context.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/summary.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/summary-standard.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/summary-complex.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/summary-minimal.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/verification-report.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/UAT.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/VALIDATION.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/UI-SPEC.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/AI-SPEC.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/SECURITY.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/DEBUG.md` |
| Milestone/user/setup templates | `UPSTREAM_GSD_REF:get-shit-done/templates/milestone.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/milestone-archive.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/retrospective.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/claude-md.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/copilot-instructions.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/dev-preferences.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/user-profile.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/user-setup.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/config.json` |
| Subagent prompt templates | `UPSTREAM_GSD_REF:get-shit-done/templates/planner-subagent-prompt.md`; `UPSTREAM_GSD_REF:get-shit-done/templates/debug-subagent-prompt.md` |
| SDK prompt templates | `UPSTREAM_GSD_REF:sdk/prompts/templates/project.md`; `UPSTREAM_GSD_REF:sdk/prompts/templates/requirements.md`; `UPSTREAM_GSD_REF:sdk/prompts/templates/roadmap.md`; `UPSTREAM_GSD_REF:sdk/prompts/templates/state.md`; `UPSTREAM_GSD_REF:sdk/prompts/templates/research-project/*.md` |

## Upstream Agent Prompt Index

Long agent prompt bodies are indexed, not copied:

- `UPSTREAM_GSD_REF:agents/*.md`
- Key prompts identified by subagents: `gsd-planner.md`, `gsd-plan-checker.md`, `gsd-executor.md`, `gsd-verifier.md`, `gsd-integration-checker.md`
- SDK prompt variants: `UPSTREAM_GSD_REF:sdk/prompts/workflows/*.md`, `UPSTREAM_GSD_REF:sdk/prompts/agents/*.md`, `UPSTREAM_GSD_REF:sdk/prompts/templates/*.md`

## Current ljx-GSD And History Source Index

| Source family | Source files |
|---|---|
| Root design docs | `CURRENT_LJX_GSD:LJX-GSD-ARCHITECTURE.md`; `CURRENT_LJX_GSD:LJX-GSD-CONFIGURATION-DESIGN.md`; `CURRENT_LJX_GSD:LJX-GSD-CORE-COMMAND-SPECS.md`; `CURRENT_LJX_GSD:LJX-GSD-DESIGN-DECISION-LOG.md`; `CURRENT_LJX_GSD:LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md`; `CURRENT_LJX_GSD:LJX-GSD-INTERFACES.md`; `CURRENT_LJX_GSD:LJX-GSD-OPEN-QUESTIONS.md`; `CURRENT_LJX_GSD:LJX-GSD-PARAMETER-DICTIONARY.md`; `CURRENT_LJX_GSD:LJX-GSD-PARAMETER-MIGRATION-MATRIX.md`; `CURRENT_LJX_GSD:LJX-GSD-SKILL-MIGRATION.md`; `CURRENT_LJX_GSD:LJX-GSD-SKILL-MIGRATION-DETAILED.md`; `CURRENT_LJX_GSD:LJX-GSD-USER-PARAMETER-GUIDE.md`; `CURRENT_LJX_GSD:LJX-GSD-USER-SKILL-GUIDE.md` |
| Runtime/helper implementation | `CURRENT_LJX_GSD:bin/install.js`; `CURRENT_LJX_GSD:bin/lib/*.cjs` |
| Current tests | `CURRENT_LJX_GSD:tests/*.test.cjs` |
| Historical milestone archive | `CURRENT_LJX_GSD:.planning/milestones/v1.4-PIVOT-SNAPSHOT-2026-04-13.md`; `CURRENT_LJX_GSD:.planning/milestones/v1.4-pivoted_not_shipped-ARCHIVE-MANIFEST.md`; `CURRENT_LJX_GSD:.planning/milestones/v1.4-pivoted_not_shipped-phases/`; `CURRENT_LJX_GSD:.planning/milestones/v1.4-pivoted_not_shipped-state/` |
| Review ledgers and protocols | `CURRENT_LJX_GSD:.planning/review/v1.1/`; `CURRENT_LJX_GSD:.planning/review/v1.2/`; `CURRENT_LJX_GSD:.planning/review/v1.3/`; `CURRENT_LJX_GSD:.planning/review/v1.4/` |

## Auto/ARIS Source Index

| Source family | Source files |
|---|---|
| Routing and repository overview | `AUTO_ARIS_REF:AGENT_GUIDE.md`; `AUTO_ARIS_REF:README.md`; `AUTO_ARIS_REF:README_CN.md` |
| Codex skill bodies | `AUTO_ARIS_REF:skills/skills-codex/*/SKILL.md` |
| Discovery/refinement skills | `AUTO_ARIS_REF:skills/skills-codex/research-lit/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/idea-creator/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/novelty-check/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/research-review/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/research-refine/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/research-refine-pipeline/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/research-pipeline/SKILL.md` |
| Experiment/claim skills | `AUTO_ARIS_REF:skills/skills-codex/experiment-plan/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/experiment-bridge/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/run-experiment/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/monitor-experiment/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/analyze-results/SKILL.md`; `AUTO_ARIS_REF:skills/experiment-audit/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/auto-review-loop/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/result-to-claim/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/ablation-planner/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/training-check/SKILL.md` |
| Paper/rebuttal skills | `AUTO_ARIS_REF:skills/skills-codex/paper-plan/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/paper-writing/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/paper-write/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/paper-figure/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/paper-compile/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/auto-paper-improvement-loop/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/rebuttal/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/paper-slides/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/paper-poster/SKILL.md` |
| Reviewer/tooling overlays | `AUTO_ARIS_REF:skills/skills-codex/auto-review-loop-llm/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex/auto-review-loop-minimax/SKILL.md`; `AUTO_ARIS_REF:skills/skills-codex-gemini-review/`; `AUTO_ARIS_REF:skills/skills-codex-claude-review/`; `AUTO_ARIS_REF:mcp-servers/gemini-review/`; `AUTO_ARIS_REF:mcp-servers/claude-review/`; `AUTO_ARIS_REF:skills/research-wiki/SKILL.md`; `AUTO_ARIS_REF:tools/research_wiki.py`; `AUTO_ARIS_REF:tools/watchdog.py`; `AUTO_ARIS_REF:docs/WATCHDOG_GUIDE.md` |

## Absence And Broad-Claim Locator Rule

Claims about absence, coverage, or broad behavior must name the exact source family searched. Example: the Auto/ARIS no-typed-phase claim is scoped to `AUTO_ARIS_REF:skills/skills-codex/*/SKILL.md`, `AUTO_ARIS_REF:AGENT_GUIDE.md`, and repository docs searched by the Auto build/review lanes; it is not a global proof over future upstream versions.

## Gaps Remaining After R1 Fixes

- Installed `1.34.2` versus reference `1.35.0` divergence was sampled but not fully diffed.
- SDK package boundary is now indexed, but Phase 02 must decide whether v2.0 consumes it as upstream source, generated adapter, or out-of-scope package.
- Runtime tests are indexed by file families and key contract tests, but not all upstream tests were read line-by-line.
- Auto overlay/tooling paths beyond Codex skill bodies may need a narrower source walk before implementation.
