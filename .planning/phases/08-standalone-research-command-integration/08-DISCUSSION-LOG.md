# Phase 08 Discussion Log

**Phase:** 08-standalone-research-command-integration
**Date:** 2026-04-14
**Status:** Decisions captured for planning

## Scope

Phase 08 discussion clarified how standalone Auto/ARIS research commands should be implemented without changing GSD into an Auto/ARIS framework. The guiding rule is that Auto/ARIS compiles research prompts, config, evidence obligations, and side-effect policy into ordinary GSD phases and plans.

## Discussed Areas

### 1. Review cadence and strength

**Question:** Should Phase 08 implementation use ordinary end-of-plan review, or frequent review after each implementation slice?

**Decision:** Use frequent multi-dimensional review.

**Locked behavior:**
- Review after every meaningful implementation slice or task.
- Use multiple subagents focused on separate dimensions when implementation begins.
- Main agent second-pass verifies subagent findings before making changes.
- Continue review loops until two consecutive clean rounds.
- Use an explicit cap per plan; default to 10 rounds if the plan does not choose a different cap.

**Review dimensions:**
- GSD lifecycle compatibility.
- Auto/ARIS prompt preservation.
- Minimal/reuse/no-wheel discipline.
- Evidence and completion correctness.
- Config, gate, and side-effect policy.
- Tests and integration coverage.

### 2. Implementation shape

**Question:** Should Phase 08 start with a thin compiler/minimal adapter or a broader internal runtime?

**Decision:** Use thin compiler/minimal adapter first.

**Locked behavior:**
- `/gsd-ljx-*` command wrappers parse intent and research config.
- The overlay renders ordinary GSD context, plan requirements, evidence contracts, and side-effect policy.
- Canonical lifecycle work is delegated to GSD-owned helpers and workflows.
- Do not modify GSD core unless a confirmed blocker makes it unavoidable.

### 3. Command family depth and external side effects

**Question:** How much should each command family do in the first pass, and what does bridge-only side-effect handling mean?

**Decision:** Implement useful compiler behavior first, but keep external side effects bridge-only in Phase 08.

**Locked behavior:**
- Discovery/literature/novelty/refinement should be functional first-pass compiler commands.
- Experiment/audit/result/claim should be functional first-pass compiler commands, but external execution is not performed by research commands in Phase 08.
- Paper/rebuttal/ablation should be limited to command wrapper, prompt-pack contract, artifact contract, and GSD phase/plan compilation unless a later plan proves a safe minimal extension.
- Policy/bridge means commands may generate execution plans, command blocks, credential checklists, authorization records, side-effect records, and blocked/degraded status records.
- Policy/bridge does not mean actually running GPU, W&B, SSH, Modal, Vast, paid compute, remote cleanup, PR creation, push, or publishing from the research command.
- Bridge-ready is not completion. If required execution is not actually performed, the research work cannot clean-complete as if the evidence exists.

### 4. Config and presets

**Question:** Should research config be broad and provider-heavy now, or narrow first-pass config plus side-effect policy?

**Decision:** Use narrow first-pass config plus side-effect policy.

**Locked behavior:**
- `.planning/research.config.json` is the research config root.
- `.planning/config.json` remains upstream GSD config and must not receive raw research config.
- Supported presets are `safe`, `auto`, and `danger-auto`; default is `safe`.
- All presets default to deep research and deep review.
- Preserve only core first-pass parameters such as preset, effort, review depth, auto proceed, human checkpoint, max review rounds, source/literature settings, thresholds, and side-effect policy.
- Drop or defer global GPU/W&B/SSH/Modal/Vast/provider-heavy parameters unless a command pack needs policy metadata for bridge records.

### 5. Artifact and evidence contract

**Question:** Should Phase 08 introduce a machine-readable research state immediately, or start with a human-readable phase-local evidence index?

**Decision:** Choose option A: `research/RESEARCH_INDEX.md` first.

**Explanation:**
- The evidence index is a phase-local ledger that tells reviewers what evidence is required, where it lives, what is missing, what was imported, and which outputs are degraded or tainted.
- It is not a lifecycle state file and cannot complete a phase.
- It prevents false completion from polished summaries alone.
- A JSON mirror can be added later only if deterministic tests need it, and it must remain a mirror rather than a second state root.

**Locked behavior:**
- Authoritative research outputs live under `.planning/phases/<phase>/research/`.
- `research/RESEARCH_INDEX.md` is required for research phases.
- It must record required evidence, raw records, summaries, reviews, audits, side effects, imports, exports, missing evidence, taint/degraded labels, and completion-relevant statuses.
- Root Auto/ARIS artifacts remain mirrors until adopted with provenance and validation recorded.

## User Priorities Captured

- Preserve GSD completely as the framework.
- Auto/ARIS should call and prompt GSD, not replace GSD internals.
- Keep implementation minimal, precise, and reusable.
- Avoid repeatedly building new framework machinery when existing GSD helpers can be used.
- Review implementation frequently and strictly.
- Do not let side-effect bridges pretend external execution has happened.
- Avoid phase over-fragmentation when plan-level decomposition keeps related research work together better.

## Next Step

Run `/gsd-plan-phase 08` using this context. The plan should explicitly include the multi-dimensional review loop and should keep implementation slices small enough to review after each slice.
