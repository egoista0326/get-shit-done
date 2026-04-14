# Phase 02 No-Phase-Type Compatibility Note

**Status:** approved target under Phase 05 final review
**Generated:** 2026-04-14
**Target architecture:** Research Command Compiler under GSD lifecycle ownership

## Claim

The target framework does not need `phase_type`, typed phase routing, broad phase schema changes, a second state root, or a second control plane.

Research behavior is represented by:

- Command invocation and CLI arguments.
- Prompt-pack provenance.
- GSD phase title and `CONTEXT.md` material.
- GSD `PLAN.md` tasks, checkpoints, must-haves, and verification text.
- Phase-local `research/RESEARCH_INDEX.md` evidence map.
- Phase-local raw evidence, reviews, audits, side-effect logs, and taint labels.

None of these surfaces route lifecycle state. They provide context and evidence for ordinary GSD lifecycle commands.

## Disallowed Schema And Routing Surfaces

The framework rejects:

- `phase_type`.
- `phaseKind`, `researchPhase`, `primaryCommand`, or equivalent routing aliases.
- Typed phase route tables.
- Broad phase-record schema expansion for research.
- Research-specific canonical state roots.
- Root Auto artifact state as lifecycle authority.
- Support-tool state as lifecycle authority.
- Bridge-ready status as completion or phase state.

## Existing GSD Primitives Are Sufficient

| Research need | Existing representation | Why no `phase_type` is needed |
| --- | --- | --- |
| Identify why a phase exists | Phase title, roadmap goal, `CONTEXT.md`, command invocation summary | Human and planner context already carry intent. |
| Preserve Auto/ARIS prompt provenance | Prompt-pack source refs in context and `RESEARCH_INDEX.md` | Provenance is audit metadata, not lifecycle routing. |
| Express research steps | GSD `PLAN.md` files, tasks, checkpoints, waves, dependencies | GSD already has executable breakdown below phase level. |
| Keep tightly coupled experiment design together | One phase with plan/task structure | Avoids splitting metrics/dataset/baseline/method across roadmap phases. |
| Insert research into existing roadmap | Decimal phase insertion after current phase | Existing GSD supports decimal phase directories/roadmap entries. |
| Build research-first roadmap | Normal integer phases | Whole roadmap is research-centered; no special type needed. |
| Store research outputs | `.planning/phases/<phase>/research/` | Phase-local convention avoids global state changes. |
| Map evidence | `research/RESEARCH_INDEX.md` | Evidence map only; completion remains GSD lifecycle decision. |
| Enforce completion gates | Review/verify/UAT plus evidence checker outputs | Gates read artifacts; they do not require schema routing. |
| Handle side effects | Side-effect policy and audit artifacts | Authorization is command/preset policy, not phase type. |
| Resume command-local loops | Phase-local control caches | Caches support resume only; they do not route phases. |

## Scenario Proofs

### Idea Discovery In Existing Roadmap

Input:

```text
gsd idea-discovery "topic" --preset safe
```

Output:

- Insert decimal phase after current completed phase.
- Generated phase context includes literature, reading, idea generation, novelty, review, and evidence requirements.
- Generated plan tasks require literature retrieval/reading evidence before idea output completion.
- Research artifacts live under `research/`.

No `phase_type` needed. The command and phase context explain research intent; GSD plan tasks execute it.

### Experiment Planning

Input:

```text
gsd experiment-plan --claim "claim" --preset auto
```

Output:

- One phase by default.
- Metrics, dataset, split, baseline, method, success criteria, failure interpretation, run order, must-run/nice-to-have blocks stay together.
- Plan tasks and artifact contracts express detail.

No `phase_type` needed. The phase is the goal boundary; plans/tasks are the fine-grained breakdown.

### Execution Boundary

Input:

```text
gsd run-experiment --preset danger-auto
```

Output:

- If remote/GPU/raw evidence collection creates a hard work-mode boundary, GSD planner may split into an execution/evidence phase.
- Side effects are policy-bound and audited.
- Raw evidence is required before clean completion.

No `phase_type` needed. The boundary is a normal roadmap/plan dependency decision, not typed routing.

### Research-First Roadmap

Input:

```text
gsd research-pipeline "project idea"
```

Output:

- Roadmap uses normal integer phases.
- Phases represent true research goals, not every Auto/ARIS internal stage.

No `phase_type` needed. The whole roadmap is research-centered.

### Root Auto Artifact Import

Input:

```text
adopt root Auto artifact into active phase
```

Output:

- Artifact is copied/linked/summarized under `research/imports/`.
- `RESEARCH_INDEX.md` records provenance, source path, timestamp, evidence class, conflict behavior, and adoption decision.

No `phase_type` needed. Adoption is evidence provenance, not lifecycle routing.

## Remove-The-Adapter Proof

After a research command compiles and the owning phase exists, ordinary GSD should still be able to proceed if the adapter is removed:

1. `ROADMAP.md` has an ordinary phase entry.
2. `CONTEXT.md` contains the research intent and evidence requirements.
3. `PLAN.md` files contain executable tasks/checkpoints and must-haves.
4. `research/RESEARCH_INDEX.md` maps evidence and status.
5. Raw evidence/review/audit files are phase-local.
6. GSD execute/review/verify/UAT reads these ordinary artifacts.

If the phase needs `phase_type` or a compiler-owned state file after this point, the implementation violated the framework.

## Compatibility Decision

The target framework should preserve upstream GSD phase schema and artifact naming. Research integration is expressed through command-generated ordinary artifacts and phase-local conventions.

`phase_type` is not only unnecessary; it is actively harmful because it creates a second routing axis, increases upgrade surface, invites hidden lifecycle branching, and repeats the earlier typed-phase blast radius.
