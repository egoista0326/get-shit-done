# Phase 07: Core GSD Lifecycle Parity - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-14T14:07:49+0200
**Phase:** 07-core-gsd-lifecycle-parity
**Areas discussed:** parity depth, plan split, GSD lifecycle mutation path, research boundary, Auto/ARIS command naming

---

## Parity Depth

| Option | Description | Selected |
| --- | --- | --- |
| Upstream QA | Review and improve upstream GSD itself | |
| Integration-readiness parity | Verify copied upstream GSD remains usable as the local lifecycle substrate | yes |
| Minimal no-op | Trust the import without extra parity probes | |

**User's concern:** Phase 07 should not care whether upstream GSD has bugs and should not try to improve GSD.

**Captured decision:** Phase 07 validates target integration readiness only. Pure upstream bugs are not blockers unless introduced by the import/adaptation or unless they block a lifecycle surface Phase 08 must call.

---

## Plan Split

| Option | Description | Selected |
| --- | --- | --- |
| Keep 3 plans | Use 07-01, 07-02, 07-03 as roadmap-defined plan-level decomposition | yes |
| Split state/concurrency into its own roadmap phase | More isolation but more fragmentation | |
| Merge all parity into one plan | Simpler but too broad for review and verification | |

**Captured decision:** Keep Phase 07 as one phase with three plans. State ownership and concurrency are cross-cutting acceptance criteria rather than a separate phase.

---

## GSD Lifecycle Mutation Path

| Option | Description | Selected |
| --- | --- | --- |
| Auto/ARIS writes canonical docs directly | Fast but creates a second lifecycle owner | |
| Auto/ARIS calls GSD lifecycle commands | Uses GSD insert-phase/state/roadmap helpers as canonical mutation path | yes |
| Hybrid direct writes plus later sync | Ambiguous ownership and unsafe under concurrency | |

**User's idea:** Auto Research layer can call GSD `insert-phase` to implement inserted research work.

**Captured decision:** Future Auto/ARIS commands must call GSD lifecycle mutation surfaces, especially `insert-phase`, rather than directly writing `ROADMAP.md` or `STATE.md`.

---

## Research Boundary

| Option | Description | Selected |
| --- | --- | --- |
| Treat all research-named upstream features as forbidden | Would incorrectly reject upstream GSD baseline `research-phase` | |
| Distinguish upstream baseline research from new Auto/ARIS integration | Allows upstream `research-phase`, blocks new Phase 08 command families | yes |
| Start implementing research commands during parity | Violates phase boundary | |

**Captured decision:** Upstream GSD `research-phase` remains allowed baseline behavior. New Auto/ARIS research command/compiler/config/artifact behavior remains deferred.

---

## Auto/ARIS Command Naming

| Option | Description | Selected |
| --- | --- | --- |
| Use generic `/gsd-*` names | Short but can be confused with upstream GSD commands | |
| Use `/gsd-ljx-*` for new Auto/ARIS commands | Easy to search and distinguish from upstream surfaces | yes |
| Use a separate non-GSD namespace | Clear distinction but weakens GSD-as-owner model | |

**User's request:** Future newly added Auto Research functionality should be named `/gsd-ljx-*` to avoid confusion and improve searchability.

**Captured decision:** New Auto/ARIS command surfaces should use the public `/gsd-ljx-*` prefix. This is a naming/ownership marker only; it does not create a second framework or second state root.

---

## the agent's Discretion

- Exact parity probe implementation method.
- Exact test/fixture naming.
- Whether specific checks are shell smoke tests, Node tests, or review checklist items, as long as they provide repeatable evidence.

## Deferred Ideas

- Implementing `/gsd-ljx-*` commands.
- Implementing research config/compiler/prompt-pack logic.
- Implementing danger-auto side-effect audit behavior.
- Full scenario harness beyond lightweight Phase 07 parity probes.
