# Phase 02 Research Config And Preset Spec

**Status:** approved target under Phase 05 final review
**Generated:** 2026-04-14
**Target architecture:** Research Command Compiler under GSD lifecycle ownership

## Config Boundary

Research config lives at:

```text
.planning/research.config.json
```

Research config must not pollute upstream GSD `.planning/config.json`. Research commands read research config, normalize/prune it, then compile the result into ordinary GSD context, plan constraints, artifact contracts, checkpoint text, side-effect policy, and completion policy.

GSD core receives generated ordinary artifacts and lifecycle requests, not raw research config.

## Precedence

Precedence is fixed:

```text
CLI override > command-specific config > preset > built-in defaults
```

Hard gates still outrank all config:

1. Missing required evidence.
2. Blocking audit/verification failure.
3. External-service confirmation requirement.
4. Destructive write or cleanup risk.
5. Budget or payment limit.
6. Explicit human stop.
7. Missing authorization for required operation.

## Presets

Supported presets:

- `safe`
- `auto`
- `danger-auto`

Default preset:

```text
safe
```

All presets default to deep research and deep review. `auto` does not mean shallow, quick, or low-evidence.

| Preset | Research depth | Review depth | Checkpoints | External side effects | Quality gates | Completion |
| --- | --- | --- | --- | --- | --- | --- |
| `safe` | deep | deep | Pause at important decisions and review/decision checkpoints. | Confirmation required. | Blocking gates stop. | Clean only with raw evidence and gates passed. |
| `auto` | deep | deep | Auto ordinary non-blocking checkpoints. | Requires preauthorization. | Blocking gates stop. | Clean only with raw evidence and gates passed. |
| `danger-auto` | deep | deep | Auto-select recommended decisions where allowed. | May use available authorized capabilities once selected. | May override research-quality gates only where policy allows and with records. | Not clean after missing authorization, skipped required operation, unknown side effect, or override. |

## First-Pass Preserved Parameters

These parameters are preserved in the first-pass config model:

| Parameter | Purpose | Rule |
| --- | --- | --- |
| `preset` | Selects `safe`, `auto`, or `danger-auto`. | Default `safe`. |
| `effort` | Controls breadth/depth/iterations. | Cannot weaken hard evidence/review invariants. |
| `review_depth` | Controls review breadth and independence. | Default deep for all presets. |
| `auto_proceed` | Allows non-blocking automatic continuation. | Never overrides hard gates. |
| `human_checkpoint` | Forces pause at review/decision boundaries. | Wins over `auto_proceed`. |
| `max_review_rounds` | Bounds review loops. | Stop only on valid predicate or max/stall/block. |
| `sources` | Literature/source selectors. | Preserve semantics or rename to avoid surprise. |
| `max_literature_items` | Bounds literature breadth. | Command-specific default allowed. |
| `review_difficulty` | Controls reviewer challenge level. | Does not silently change provider without policy. |
| `score_threshold` | Review/refinement stop threshold. | Must pair score with positive/accept/pass verdict. |
| `novelty_threshold` | Novelty/refinement threshold. | Same stop predicate discipline. |
| `require_literature_evidence` | Forces literature evidence before completion. | Mandatory for `idea-discovery`. |

## Deferred Or Scoped Parameters

These are not global first-pass research config keys:

| Parameter family | Status | Reason |
| --- | --- | --- |
| GPU backend, W&B, SSH, Modal, Vast.ai | Execution command pack or side-effect policy | Should not affect literature/idea commands globally. |
| Venue, max pages, anonymity, citation package, DBLP/CrossRef | Deferred paper/rebuttal packs | User deferred paper/rebuttal-style workflows. |
| Paper improvement rounds, rebuttal rounds, slides, poster, camera-ready | Deferred packs | Out of default v2.0 pipeline. |
| Provider-specific reviewer credentials | Service policy/provider config | Must be recorded with provenance and allowed provider policy. |
| Cleanup/auto-destroy | Execution side-effect policy | Must preserve/export evidence before cleanup. |

## Suggested Config Shape

Exact property names may be implementation-refined, but the target semantics are:

```json
{
  "default_preset": "safe",
  "presets": {
    "safe": {
      "effort": "deep",
      "review_depth": "deep",
      "auto_proceed": false,
      "human_checkpoint": true,
      "external_side_effects": "confirm-required"
    },
    "auto": {
      "effort": "deep",
      "review_depth": "deep",
      "auto_proceed": true,
      "human_checkpoint": false,
      "external_side_effects": "preauthorized-only"
    },
    "danger-auto": {
      "effort": "deep",
      "review_depth": "deep",
      "auto_proceed": true,
      "human_checkpoint": false,
      "external_side_effects": "danger-auto-available",
      "allow_quality_gate_override": true,
      "require_audit_artifacts": true
    }
  },
  "commands": {
    "idea-discovery": {
      "require_literature_evidence": true,
      "sources": ["local", "web"],
      "max_literature_items": 20,
      "max_review_rounds": 3
    },
    "experiment-plan": {
      "max_primary_claims": 2,
      "max_core_blocks": 5,
      "max_baseline_families": 3
    }
  },
  "side_effects": {
    "git_push": "confirm-required",
    "pr_create": "confirm-required",
    "wandb": "confirm-required",
    "ssh": "confirm-required",
    "modal": "confirm-required",
    "vast": "confirm-required",
    "gpu": "confirm-required",
    "cleanup": "confirm-required"
  }
}
```

This example is not a final implementation schema. It fixes semantics and precedence.

## Unknown-Key Policy

Target policy:

- Default mode warns and ignores unknown keys as non-effective, with an explicit diagnostic record.
- Strict mode fails closed on unknown keys before compiling research context or side-effect policy.
- Unknown command keys are non-effective unless the command pack declares them.
- Command-pack-declared extensions must state their owner, evidence effect, side-effect effect, and completion effect before they can influence compiler behavior.
- An `experimental` namespace may be allowed later, but keys inside it must not affect compiler behavior unless explicitly adopted by a command pack.
- Research config reads must not mutate upstream `.planning/config.json`.

Raw research config keys must not live in upstream `.planning/config.json`. If legacy planning state contains a `research` block there, the implementation handoff must migrate it to `.planning/research.config.json` or quarantine it as explicitly non-effective before Phase 06 imports the upstream GSD baseline.

Typed-routing-like legacy keys must not remain active in upstream `.planning/config.json` unless Phase 05 explicitly proves they are non-routing and unrelated to research lifecycle behavior. For this milestone, `code_review_requirements_by_phase_type` is quarantined as non-effective before Phase 06 import rather than treated as a supported research or lifecycle routing key.

## `auto` Preauthorization

`auto` may run external side effects only when preauthorization exists.

Allowed storage:

- Project-level intent in `.planning/research.config.json`.
- Phase-local execution record in `research/AUTHORIZATION_ACTIONS.json` when an operation is attempted, skipped, blocked, or executed.

A project-level setting is not enough by itself for clean completion. The phase-local operation record must state what happened.

## `danger-auto` Audit Requirements

Every `danger-auto` run must create or update, under the owning phase's `research/` root:

- `RESEARCH_RUN_LOG.md`
- `AUTHORIZATION_ACTIONS.json`
- `DANGER_AUTO_OVERRIDES.md`
- `SIDE_EFFECTS.md`
- `RESEARCH_INDEX.md` status entries

Missing audit artifacts block clean completion.

## Implementation Feasibility

Config/preset implementation is feasible if kept separate from GSD core config.

Low-risk pieces:

- Loading `.planning/research.config.json`.
- Applying precedence.
- Validating known keys.
- Rendering resolved config into generated context/plan text.

Medium-risk pieces:

- Unknown-key compatibility for future command packs.
- `auto` preauthorization semantics.
- Gate precedence tests.
- Provider/reviewer fallback provenance.

High-risk pieces:

- `danger-auto` side effects without full scenario tests.
- Remote/GPU/W&B/SSH/Modal/Vast cleanup behavior.
- Config drift with upstream GSD if research keys leak into `.planning/config.json`.

Implementation should therefore start with config resolution and dry-run compile output before enabling side-effect execution.
