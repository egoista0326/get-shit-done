# Phase 6: Unified Hook Ownership - Research

**Date:** 2026-04-09
**Status:** Draft accepted baseline

## Research Framing

This phase should not invent a novel hook system from scratch when GSD already contains mature runtime-wiring and hook-registration patterns.

The preferred strategy is:

- preserve GSD's command/workflow-first ownership model
- preserve GSD's installer/runtime-helper separation
- preserve GSD's preference for minimal safe hooks in Codex
- absorb only the useful hook lessons from `planning-with-files` and Auto
- reject any hook pattern that turns hooks into a second control plane

Reference observations from current implementations:

- GSD Codex installation currently keeps hook usage light; the visible Codex install mainly registers a `SessionStart` update-check hook in config.
- GSD's installer already cleanly separates:
  - command/workflow semantics
  - runtime translation via the Codex adapter header
  - hook registration and idempotent config mutation
- `planning-with-files` demonstrates a stronger hook-driven context-reinjection style (`UserPromptSubmit`, `PreToolUse`, `PostToolUse`), which is useful as a warning and as a source of ideas for observer/reminder hooks, but not as a model for authoritative state ownership.
- Auto research demonstrates that external logging and meta hooks are useful for passive recording, but not suitable as authoritative workflow owners.

## Matrix 1: Lifecycle Ownership Matrix

| Lifecycle Action | Primary Owner | Hook Role | Runtime Helper Role | Adapter Role | Notes |
|---|---|---|---|---|---|
| `discuss-phase` progression | command/workflow | may warn or block on accepted gates | can validate/write deterministic state updates | may translate interaction API | GSD-style workflow semantics stay in command/workflow layer |
| `plan-phase` progression | command/workflow | may warn or block on accepted gates | can normalize plan artifacts and state writes | may translate interaction API | adapter must not decide planning meaning |
| `execute-phase` progression | command/workflow | may emit guard warnings or required-quality reminders | can handle deterministic run-state writes | may adapt tool/runtime usage | execution completion is not hook-owned |
| `code-review` gate update | command/workflow | may detect stale/missing required review | can write phase-record summary deterministically | no semantic ownership | review verdict remains workflow-owned |
| `verify-work` gate result | command/workflow | may enforce freshness/integrity blockers | can compute deterministic completeness checks | no semantic ownership | broad evidence verdict must not be hook-owned |
| `next` routing result | command/workflow | may veto on explicit accepted blockers only | can read structured state and compute candidate transitions | no semantic ownership | hooks may not redirect mainline |
| roadmap mutation | command/workflow | no direct ownership; may warn | deterministic file/state mutation helpers only | none | must remain command-owned |
| active workstream pointer | command/workflow | may inspect/warn only | deterministic pointer write helper | none | no hook-controlled switching |

**Accepted rule**

- commands/workflows own lifecycle truth transitions
- hooks may veto, annotate, render, and append evidence
- hooks may not steer the mainline

## Matrix 2: Render Hook Permission Matrix

| Hook Family | May Create Derived Artifact | May Mirror Narrow Metadata | May Rewrite Control Truth | Recommended Notes |
|---|---|---|---|---|
| summary/report render hook | yes | yes | no | can write `render_status`, `rendered_at`, artifact path/hash |
| code-review artifact refresh | yes | yes | no | can refresh `CODE_REVIEW.md` and mirror review-artifact metadata only |
| paper compile/render hook | yes | yes | no | compile success/failure is local artifact status, not phase verdict |
| migration-report render hook | yes | yes | no | reports are derived views, not authoritative migration truth |
| visual/report export hook | yes | yes | no | exporter must not mutate roadmap or lifecycle state |

**Allowed mirror-back examples**

- `render_status`
- `rendered_at`
- `artifact_path`
- `artifact_hash`
- execution trace references

**Forbidden writes**

- active phase / current position
- roadmap or workstream mutation
- continuation verdicts
- claim/review judgments

## Matrix 3: Integration Evidence Matrix

| Integration Source | Allowed Writes | Allowed Local Status | Forbidden Writes | Notes |
|---|---|---|---|---|
| experiment monitoring / W&B | metrics, logs, run summaries, artifact refs | run status (`running/failed/completed`) | phase completion, claim support, next routing | facts are evidence, not decisions |
| remote execution/deploy | job ids, sync logs, remote traces, stderr/stdout refs | deploy/run status | roadmap/workstream mutation | local object status only |
| paper compile | compile logs, PDF path, warnings, error summaries | compile status | paper-ready verdict, phase completion | compile result must later be interpreted by workflow |
| notification integrations | notification trace, message id, delivery result | sent/failed | workflow progression | notifications never own mainline state |
| external benchmark/report tools | result tables, benchmark logs, artifact refs | tool run status | verification verdict, claim support | workflow interprets outputs later |

**Accepted rule**

- integration hooks may report facts and local integration-object status
- only workflows may interpret those facts into project decisions

## Matrix 4: Adapter Boundary Matrix

| Concern | Public Command / Workflow | Runtime Helper / Script | Hook | Codex Adapter |
|---|---|---|---|---|
| user-facing workflow meaning | owner | support only | no | no |
| phase routing and `next` semantics | owner | support only | no | no |
| deterministic state-file write helpers | no | owner | no | no |
| schema normalization / report generation | no | owner | support when explicitly delegated | no |
| observe / warn / block on accepted gates | no | support only | owner | no |
| render derived artifacts | no | support only | owner | no |
| invocation syntax translation | no | no | no | owner |
| `AskUserQuestion -> request_user_input` | no | no | no | owner |
| `Task -> spawn_agent` mapping | no | no | no | owner |
| text-mode / host fallback UX | no | support only | no | owner |
| authoritative state-write policy | owner | deterministic execution only | no | no |

**Accepted rule**

- Codex adapters own runtime translation only
- they do not own project semantics or lifecycle authority

## GSD-Reference Implementation Bias

When implementation begins, prefer these GSD-style patterns:

1. **Command/workflow semantics stay in prompt/workflow specs**
   - do not migrate core lifecycle meaning into hooks or adapters
2. **Runtime translation stays in installer/adapter helpers**
   - mirror the current `getCodexSkillAdapterHeader()` philosophy
3. **Hook registration stays explicit and testable**
   - follow GSD's idempotent registration style rather than ad hoc hidden hook injection
4. **Hook config surface stays small**
   - follow the existing GSD preference for a narrow `hooks.*` namespace
5. **Codex-specific behavior stays compatibility-oriented**
   - host/runtime differences should be absorbed by adapters, not by changing the project semantics

## Research Conclusion

Phase 6 does not need a fundamentally new ownership architecture.

The stable direction is:

- keep lifecycle ownership with commands/workflows
- keep deterministic file/state mutation in runtime helpers
- keep hooks in observer/guard/render/evidence roles
- keep Codex adapters in runtime-translation roles
- keep all authoritative project semantics out of both hooks and adapters

---

*Phase: 06-unified-hook-ownership*
*Research drafted: 2026-04-09*
