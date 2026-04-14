# Phase 4: Skill Migration Matrix - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

## Phase Boundary

This phase decides how the current `gsd-*` skill set and the core Auto research skills should map into the future `ljx-GSD-*` system.

This phase is responsible for:

- assigning a disposition to each meaningful existing skill
- deciding whether it stays public, becomes internal, becomes optional, or is dropped
- defining the future branded destination command or engine name
- recording any critical implementation caveat needed for later rewrite work

This phase is not responsible for:

- rewriting prompts or workflow files
- changing hooks or runtime code
- implementing adapters
- editing installed skills

## Implementation Decisions

### Control-plane invariants
- **D-01:** `ljx-GSD` keeps GSD as the outer control plane and absorbs Auto as the internal research engine family.
- **D-02:** `.planning/` remains the authoritative root.
- **D-03:** `phase` naming remains public and primary.
- **D-04:** `phase_type` is first-class, user-visible, and drives internal routing.

### Public-surface invariants
- **D-05:** The default user mainline remains GSD-shaped: `new-project -> discuss-phase -> plan-phase -> execute-phase -> verify-work -> next`.
- **D-06:** Auto main research workflows must remain visible on the public surface rather than being buried behind internal-only routing.
- **D-07:** `review-loop` and `claim-gate` must both support standalone phase usage and embedded-gate usage.
- **D-08:** Manual invocation and automatic `next` progression must share one resolver, so every top-level command can recommend next actions in the GSD style.

### Migration-destination invariants
- **D-09:** Every existing skill must be classified into one of: `keep`, `adapt`, `merge`, `internal`, `optional`, `hide`, or `drop`.
- **D-10:** Compatibility matters more than novelty for lifecycle commands; preserve GSD public vocabulary unless there is a strong reason not to.
- **D-11:** Direct research tools such as `novelty-check`, `research-review`, `result-to-claim`, and `ablation-planner` remain publicly callable even when they also serve as stage engines.

### Parameter and documentation invariants
- **D-12:** Rewritten skills must use the canonical lowercase dotted parameter language only.
- **D-13:** Legacy GSD and Auto parameter names survive only as external compatibility aliases.
- **D-14:** Migration tables must be detailed enough to drive both later skill implementation and later skill-document rewriting.

### Process invariants for this redesign effort
- **D-15:** From this point forward, the redesign work should itself be documented in a GSD-like phase workflow rather than only top-level synthesis docs.
- **D-16:** This phase should produce discuss/context artifacts, planning artifacts, and a detailed migration spec before any implementation rewrite starts.

### The agent's Discretion
- exact table layout and grouping of commands
- whether a low-frequency command is hidden or moved to an optional maintenance pack
- whether a compatibility alias should remain documented or only adapter-visible

## Specific Ideas

- Keep user-facing brand as `ljx-GSD-*`.
- Preserve manual expert control: users should still be able to call direct tools and direct workflows explicitly.
- Preserve GSD-style “what can I do next” guidance at the end of commands.
- Keep `safe` and `autonomous` as the initial named operating presets.
- Use GSD planning discipline for the redesign itself so the migration work does not drift.

## Canonical References

### Overall system shape
- `/Users/lijiaxin/Downloads/new-gsd/LJX-GSD-ARCHITECTURE.md` — core control-plane and state-direction decisions
- `/Users/lijiaxin/Downloads/new-gsd/LJX-GSD-DESIGN-DECISION-LOG.md` — accepted decisions that this phase must not violate
- `/Users/lijiaxin/Downloads/new-gsd/LJX-GSD-INTERFACES.md` — public command surface and routing model

### Configuration and parameter rules
- `/Users/lijiaxin/Downloads/new-gsd/LJX-GSD-CONFIGURATION-DESIGN.md` — parameter layering and profile design
- `/Users/lijiaxin/Downloads/new-gsd/LJX-GSD-PARAMETER-DICTIONARY.md` — canonical parameter vocabulary
- `/Users/lijiaxin/Downloads/new-gsd/LJX-GSD-PARAMETER-MIGRATION-MATRIX.md` — legacy key migration contract
- `/Users/lijiaxin/Downloads/new-gsd/.planning/config.json` — current effective defaults
- `/Users/lijiaxin/Downloads/new-gsd/.planning/config.reference.jsonc` — commented configuration template

### Existing migration baselines
- `/Users/lijiaxin/Downloads/new-gsd/LJX-GSD-SKILL-MIGRATION.md` — earlier high-level migration summary
- `/Users/lijiaxin/Downloads/new-gsd/findings.md` — source-repo and integration findings
- `/Users/lijiaxin/Downloads/new-gsd/progress.md` — chronological design progress log

### Upstream source systems
- `/Users/lijiaxin/.codex/skills/gsd-plan-phase/SKILL.md` — current GSD planning entrypoint
- `/Users/lijiaxin/.codex/skills/gsd-discuss-phase/SKILL.md` — current GSD discuss entrypoint
- `/tmp/codex-skill-repos/get-shit-done/README.md` — current upstream GSD command and config model
- `/tmp/codex-skill-repos/Auto-claude-code-research-in-sleep/README_CN.md` — current Auto workflow overview

## Existing Code Insights

### Reusable Assets
- The current `LJX-GSD-SKILL-MIGRATION.md` already contains a workable high-level categorization that can be refined into a one-by-one matrix.
- The current interface and architecture docs already fix most public-surface constraints, so this phase can focus on per-skill disposition rather than re-opening top-level architecture.
- The installed `gsd-*` skills provide a direct on-disk source of truth for the current public command set and its actual Codex packaging.

### Established Patterns
- GSD is command-first and installer-generated for Codex, so migration decisions should preserve command-surface discipline and state ownership.
- Auto is workflow-first and skill-authored directly, so migration decisions should separate public workflows from stage engines more aggressively.
- Earlier accepted design decisions prefer compatibility on public lifecycle vocabulary and stronger explicitness on research workflows.

### Integration Points
- The future skill rewrite will need this phase to decide:
  - which command names survive
  - which command families collapse together
  - which old skills become hidden compatibility aliases
  - which Auto artifacts need adapter handling

## Deferred Ideas

- Exact prompt rewrite for each future `ljx-GSD-*` skill
- Exact agent-role rewrite and file-read contracts
- Hook implementation details
- Optional-pack packaging for provider-specific or domain-specific skills
- Any actual code changes to installed local skills

---

*Phase: 04-skill-migration-matrix*
*Context gathered: 2026-04-09*
