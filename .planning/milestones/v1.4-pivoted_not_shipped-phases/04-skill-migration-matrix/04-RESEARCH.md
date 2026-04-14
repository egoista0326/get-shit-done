# Phase 4: Skill Migration Matrix - Research

**Compiled:** 2026-04-09
**Status:** Ready for planning

## Source Coverage

This phase is based on cross-reading:

- installed `gsd-*` Codex skills under `/Users/lijiaxin/.codex/skills/`
- installed Auto-related Codex skills under `/Users/lijiaxin/.codex/skills/`
- upstream GSD repo at `/tmp/codex-skill-repos/get-shit-done`
- upstream Auto repo at `/tmp/codex-skill-repos/Auto-claude-code-research-in-sleep`

## GSD Inventory Findings

- Installed GSD public command set currently contains 68 `gsd-*` skills.
- The set includes four broad families:
  - control-plane and session substrate
  - lifecycle and planning commands
  - quality / audit / review / repair commands
  - workspace / admin / community / maintenance commands
- Several commands are strong candidates to remain mostly intact because they carry the operating-system behavior that Auto lacks:
  - `gsd-do`
  - `gsd-progress`
  - `gsd-next`
  - `gsd-discuss-phase`
  - `gsd-plan-phase`
  - `gsd-execute-phase`
  - `gsd-pause-work`
  - `gsd-resume-work`
  - `gsd-workstreams`
- Several commands are structurally useful but need research-native semantics:
  - `gsd-new-project`
  - `gsd-new-milestone`
  - `gsd-complete-milestone`
  - `gsd-research-phase`
  - `gsd-review`
  - `gsd-verify-work`
- Several commands are good capability slices but should likely collapse into fewer research-oriented command families:
  - backlog and idea capture commands
  - code review and audit/fix commands
  - milestone audit and gap planning commands
- Several commands are likely maintenance-only or optional in a research-focused fork:
  - workspace admin commands
  - PR/ship/community commands
  - update/reapply-patches/cleanup style commands

## Auto Inventory Findings

- Auto separates naturally into:
  - end-to-end workflows
  - main research workflows
  - direct evaluators / direct tools
  - stage engines
  - optional provider/domain/integration packs
- The workflows most appropriate to preserve as visible public research workflows are:
  - `research-pipeline`
  - `idea-discovery`
  - `research-refine`
  - `experiment-plan`
  - `experiment-bridge`
  - `paper-writing`
  - `rebuttal`
- The direct tools most appropriate to preserve as public expert tools are:
  - `novelty-check`
  - `research-review`
  - `result-to-claim`
  - `ablation-planner`
- The clearest internal stage engines are:
  - `research-lit`
  - `idea-creator`
  - `run-experiment`
  - `monitor-experiment`
  - `training-check`
  - `analyze-results`
  - `paper-plan`
  - `paper-write`
  - `paper-compile`
  - `paper-figure`
  - `auto-paper-improvement-loop`
- The clearest optional packs are:
  - provider-specific review variants
  - robotics-only ideation variant
  - DSE loop
  - grant proposal
  - Feishu integration

## Migration Constraints

### Constraint 1: No second control plane

Absorbed Auto workflows must not remain parallel orchestrators with their own authoritative root-level state.

### Constraint 2: Public compatibility matters

GSD lifecycle names and command habits should be preserved where practical, especially for:

- `new-project`
- `discuss-phase`
- `plan-phase`
- `execute-phase`
- `verify-work`
- `next`

### Constraint 3: Research workflows must stay visible

Auto’s main research workflows should not disappear behind internal routing only. The public system needs both:

- phase-driven orchestration
- explicit direct research commands

### Constraint 4: One skill can become multiple things

Some old skills map to:

- a public command
- an internal stage engine
- and a compatibility alias

The migration matrix needs to record the primary destination clearly enough for future rewrite work.

## Recommended Output Shape For This Phase

This phase should produce:

- one detailed GSD one-by-one migration table
- one detailed Auto one-by-one migration table
- one branded `ljx-GSD-*` namespace table showing the intended v1 public surface
- phase-local plan files covering those three deliverables
