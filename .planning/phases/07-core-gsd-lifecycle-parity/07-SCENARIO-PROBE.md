# Phase 07 Scenario Probe

**Date:** 2026-04-14
**Probe file:** `tests/core-gsd-parity-scenario.test.cjs`
**Workspace:** `/Users/lijiaxin/Downloads/new-gsd-implementation-workspace-20260414-012813`
**Verdict:** PASS

## Purpose

The scenario probe validates the ordinary GSD lifecycle surfaces that Phase 08 should call from the future `/gsd-ljx-*` Auto/ARIS overlay. It is intentionally a smoke/contract probe, not broad upstream GSD QA and not Auto/ARIS implementation.

## Temp-Project Flow

The probe creates an isolated temporary GSD project with minimal `.planning/PROJECT.md`, `.planning/config.json`, `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, and two completed phase directories. This setup is fixture construction only; it does not mutate the implementation workspace's canonical planning state.

Inside that temp project, the probe then exercises GSD-owned helper surfaces:

1. Insert an ordinary decimal phase after Phase 01.
2. Confirm the inserted phase has no typed schema or research-specific control root.
3. Resolve the inserted phase through GSD phase lookup.
4. Build the phase plan index through GSD plan indexing.
5. Verify the inserted plan structure through GSD verification helpers.
6. Verify phase completeness through GSD verification helpers.
7. Read project progress through GSD progress helpers.
8. Create and read a session-scoped workstream through GSD workstream helpers.
9. Validate root state through GSD state helpers.
10. Validate project health through GSD health helpers.

## Commands Exercised

| Surface | Command | Expected Result |
|---|---|---|
| Phase mutation | `gsd-tools phase insert 01 "Research overlay readiness probe"` | Creates `01.1` inserted phase through GSD, not direct roadmap editing. |
| Phase lookup | `gsd-tools find-phase 01.1` | Resolves the inserted phase directory. |
| Plan index | `gsd-tools phase-plan-index 01.1` | Reports the inserted plan and summary. |
| Plan verification | `gsd-tools verify plan-structure <inserted plan>` | Reports `valid: true`. |
| Phase verification | `gsd-tools verify phase-completeness 01.1` | Reports `complete: true`. |
| Progress | `gsd-tools progress json` | Reports 3 plans and 3 summaries after insertion. |
| Workstream create | `gsd-tools workstream create research-track --no-migrate --raw` | Creates `research-track` through GSD helper ownership. |
| Workstream get | `gsd-tools workstream get --raw` | Returns `research-track` through session-scoped routing. |
| State validation | `gsd-tools state validate` | Reports valid state. |
| Health | `gsd-tools validate health` | Reports healthy temp project. |

## Expected State Transitions

| Step | Expected Transition |
|---|---|
| Initial fixture | Two ordinary completed phases exist: Phase 01 and Phase 02. |
| Insert phase | Roadmap gains `Phase 01.1: Research overlay readiness probe (INSERTED)` with dependency on Phase 01. |
| Add phase-local plan/summary fixture | The inserted phase becomes verifiable by ordinary GSD plan and phase completeness helpers. |
| Progress read | Total plan/summary count becomes 3/3. |
| Workstream create/get | Active workstream resolves to `research-track` by session key, without writing shared `.planning/active-workstream`. |
| Health/state validation | The temporary project remains valid and healthy after the inserted phase and workstream operations. |

## Canonical Write Boundary

The probe does not directly write the implementation workspace's canonical lifecycle files. It also does not manually edit root lifecycle files in the temp project as part of the scenario mutation path.

The only direct writes are fixture setup files and phase-local plan/summary fixtures inside the temp project. The lifecycle mutations being tested are performed through GSD helper commands:

- Root roadmap mutation is performed by `gsd-tools phase insert`.
- State checking is performed by `gsd-tools state validate`.
- Progress checking is performed by `gsd-tools progress json`.
- Workstream routing is performed by `gsd-tools workstream` and validated to avoid shared active-pointer writes.
- Phase resolution and verification are performed by `find-phase`, `phase-plan-index`, and `verify` helper commands.

This is the intended Phase 08 integration pattern: Auto/ARIS overlay code may compute research obligations, but it must call GSD-owned lifecycle surfaces for canonical mutation and routing.

## Boundary Guards

The scenario also checks the implementation workspace source tree:

- No `/gsd-ljx-*` command files exist yet.
- No idea-discovery, literature, novelty, experiment, claim, paper, rebuttal, ablation, or result-analysis command files exist yet.
- Existing upstream `research-phase.md` is allowed as baseline upstream GSD behavior and is not treated as Phase 08 implementation.
- Production surfaces contain no `phase_type`, typed code-review routing, source planning repo dependency, or `ljx-gsd` production reference.

## Outcome

The scenario passed together with the 07-01 and 07-02 parity probes:

```text
node --test tests/core-lifecycle-planning-parity.test.cjs tests/core-review-workspace-git-parity.test.cjs tests/core-gsd-parity-scenario.test.cjs
# tests 20, pass 20, fail 0
```

Phase 08 can use this as the minimal contract for `/gsd-ljx-*` command implementation: generate research-specific prompts and artifacts, but let GSD own phase insertion, roadmap/state/progress, review, verification, workspace, workstream, and git lifecycle behavior.
