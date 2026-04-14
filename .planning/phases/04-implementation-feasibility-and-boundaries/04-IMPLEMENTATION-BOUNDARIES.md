# Phase 04 Implementation Boundaries

**Status:** draft-ready-for-phase-05-review
**Generated:** 2026-04-14
**Scope:** Operational implementation rules for Phase 05 review, Phase 06 foundation work, and Phase 08 research command integration.

## Boundary Intent

This document does not redesign the framework.

It translates the approved framework and the `04-01` feasibility map into operational implementation rules so later phases know:

- where implementation may happen,
- which surfaces remain upstream-owned,
- which surfaces may be added as the new research adapter,
- which current-repo materials are out of bounds,
- and what review discipline must hold before implementation begins.

## Repo-copy strategy

### Primary strategy

The default implementation workspace strategy is:

- do not implement in the current dirty repository,
- create a clean implementation workspace handoff in Phase `04-03`,
- treat that clean workspace as the only place where Phase 06 foundation code may begin.

### Preferred workspace choice

Because the current repository contains uncommitted planning state and historical dirtiness, the preferred order is:

1. Prefer a clean workspace copy when planning-state continuity matters and there is no safe committed baseline yet.
2. Prefer a clean git worktree only if the authoritative planning state required for implementation has been committed or otherwise safely mirrored into the clean workspace.

Operational rule:

- `04-03` must choose between copy and worktree explicitly and record why.
- Convenience is not enough reason to choose a worktree if it would lose authoritative planning context.
- A clean workspace that starts from the wrong baseline is not acceptable just because it is easier to create.

### Workspace containment rules

- The clean implementation workspace must live outside the active dirty working path or as an isolated worktree with a dedicated branch.
- The clean implementation workspace must preserve `.planning/` because the target system remains GSD-owned.
- The clean implementation workspace must not preserve old generated bridge outputs, transient build artifacts, or legacy managed wrappers unless they are explicitly required as historical evidence.
- The clean implementation workspace must record baseline path, branch, and selection rationale in `04-IMPLEMENTATION-WORKTREE.md`.

## Branch policy

### Core rule

Implementation code does not begin on the current dirty branch.

### Allowed branch model

- Phase 04 planning may continue in the current planning branch/worktree.
- Phase 06 foundation work must begin on a dedicated clean implementation branch inside the clean workspace created by `04-03`.
- The implementation branch should be named for the new system and phase goal, not for `ljx`, bridge, or typed-routing legacy.

### Branch discipline

- No implementation branch may treat the current dirty repo state as canonical just because it is convenient.
- Branch creation must happen after the clean workspace strategy is fixed.
- Foundation work, lifecycle parity work, and research integration work may later use narrower phase branches, but they must all inherit from the same clean implementation base.
- Planning-document updates and code implementation should remain intentionally separated when possible so review can distinguish framework/planning state from runtime code changes.

## Naming

### Public naming rules

- Public system name: `gsd`
- Public research command surface: `gsd` research commands
- Public package, managed marker, generated wrapper, and install messaging must not use `ljx-gsd`, `ljx-GSD`, or `egoista` naming.

### Internal naming rules

- New runtime helpers should use neutral `research-*` or `gsd-*` naming rather than `ljx-*` naming.
- New adapter modules should describe function, not migration history.
- The presence of old `ljx-*` names in the current repo is not a reason to continue the naming line.

### Phase-local artifact naming rules

- Preserve GSD artifact names such as `CONTEXT.md`, `*-PLAN.md`, `*-SUMMARY.md`, `STATE.md`, and `ROADMAP.md`.
- Research evidence remains phase-local under `.planning/phases/<phase>/research/`.
- `RESEARCH_INDEX.md` is the authoritative phase-local evidence map for research work, but it is not canonical lifecycle state.
- File evidence must be a regular file under the owning phase's resolved `research/` root unless the evidence class explicitly permits a directory, URL, external run id, or other non-file record type.
- Adoption and evidence checks must use canonical resolved paths, not string-prefix checks. Sibling-prefix matches, root-only Auto artifacts, dangling links, stale copied paths, and unvalidated symlinks cannot satisfy required evidence.
- Root Auto artifacts remain non-evidence mirrors until a phase-local adoption record validates source, adoption mode, evidence class, freshness or staleness, status, and conflict handling.

## Source ownership

### Ownership classes

| Surface class | Owner | Mutation rule |
| --- | --- | --- |
| Canonical GSD lifecycle runtime | Upstream GSD baseline | Copy/reuse baseline first; patch only with explicit reviewable deltas. |
| Canonical lifecycle docs and state | GSD owner path only | No research helper or imported artifact writes them directly. |
| Workflow shell prompts | Upstream GSD baseline | Preserve structure; integrate research through generated context and plan inputs rather than replacing workflows. |
| Research compiler adapter | New code owned by this milestone | New narrow layer allowed under the approved framework. |
| Research artifact/index helpers | New code owned by this milestone | May write phase-local `research/` artifacts only. |
| Root Auto artifacts | Mirror/import-export surfaces | Reference or adopt with provenance; never canonical by default. |
| Historical `ljx-gsd` code | Historical evidence only by default | No structural reuse unless a later Phase 05 review explicitly allows a tiny generic utility reimplementation. |

### Practical ownership rule

The default source path is:

- upstream GSD for lifecycle, runtime, workflow, state, roadmap, and verification foundations,
- new adapter code for research command compilation,
- source-indexed Auto/ARIS prompt and artifact contracts for semantic preservation,
- no structural dependence on `ljx-gsd` implementation modules.

## Config and state ownership

### Config and state ownership

| Surface | Owner | Implementation boundary |
| --- | --- | --- |
| `.planning/config.json` | Upstream GSD config layer | Research-specific raw keys do not belong here. |
| `.planning/research.config.json` | Research adapter config loader | Read, validate, and compile only; never canonical lifecycle state. |
| `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md` | Canonical GSD owner path | Single-writer only. No adapter direct writes. |
| Phase records and milestone records | Canonical GSD owner path | Single-writer only. |
| `.planning/phases/<phase>/research/RESEARCH_INDEX.md` | Research artifact/index helper | Evidence map only; no completion authority. |
| Phase-local raw evidence | Producing command under GSD ownership | Must be phase-local and provenance-aware. |
| Imported root Auto artifacts | Adoption helper plus index metadata | Import/export mirrors until adopted explicitly. |

### State mutation rules

- Canonical lifecycle state mutations always route through the upstream-equivalent owner path.
- Research helpers may compute, summarize, or seed advisory artifacts, but not canonical completion or roadmap state.
- Parallel agents may not race on canonical docs.
- Derived mirrors must not become writable truth surfaces.
- Before Phase 06 imports upstream GSD, the implementation workspace must be checked for raw research keys in `.planning/config.json`; any legacy `research` block must be migrated to `.planning/research.config.json` or quarantined as non-effective.
- Typed-routing-like legacy config keys, including `code_review_requirements_by_phase_type`, must not remain active in upstream `.planning/config.json` for the implementation handoff unless Phase 05 explicitly proves they are non-routing. The default Phase 05 action is quarantine as non-effective.
- Research config unknown keys warn-and-ignore by default with an explicit diagnostic record, and fail closed in strict mode before any compiler output or side-effect policy is produced.

## Hook behavior

### Hook behavior

- Hook ownership stays aligned with upstream install/uninstall behavior.
- Research integration must not create a parallel research-specific hook ownership model.
- Generated research wrappers may rely on the same install/build infrastructure as the future GSD package, but they must not invent a second registration path.
- Existing bridge-style installer behavior is evidence that install/build is a real concern, not evidence that the current installer is acceptable.
- Phase 05 must review whether upstream install/build surfaces are copied first or replaced by a narrower installer before any wrapper emission is considered stable.

## Git discipline

### Git discipline

- No implementation code begins in the current dirty repo.
- The clean implementation workspace becomes the only valid code-mutation surface for Phase 06 and beyond.
- Canonical planning docs remain subject to single-writer discipline even after the clean workspace exists.
- Worktree or copy creation must record baseline commit or source snapshot honestly.
- Subagent or helper execution may write scoped artifacts, but canonical lifecycle files remain orchestrator-owned.
- Review and verification must be able to distinguish planning-state changes from runtime-code changes.
- If the clean workspace cannot preserve correct planning context, the workspace strategy must be revised instead of proceeding informally in the dirty repo.

## Review commands

### Review commands

Phase 05 and later implementation phases should at minimum preserve these review and verification surfaces:

- `node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" verify plan-structure <plan> --cwd "$PWD"`
- `node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" phase-plan-index <phase> --cwd "$PWD"`
- `node "$HOME/.codex/get-shit-done/bin/gsd-tools.cjs" verify phase-completeness <phase> --cwd "$PWD"`
- `git diff --check -- <relevant paths>`

When runtime code exists in the clean implementation workspace, later phases must add code-level verification appropriate to the selected baseline, such as package/build/install/test checks from the upstream-compatible runtime.

Operational rule:

- Phase 05 reviews the framework and these boundary rules.
- Phase 06 verifies copied foundation surfaces against baseline/runtime compatibility.
- Phase 07 verifies lifecycle parity.
- Phase 08 verifies research command integration against evidence and completion semantics.

## Boundary decisions by implementation surface

### Allowed new code surfaces

These surfaces are in-bounds for new implementation later:

- narrow research compiler modules under `bin/lib/`
- research config loader for `.planning/research.config.json`
- prompt-pack registry or equivalent provenance-aware source map
- phase request/context renderer
- phase-local research index and evidence helpers
- side-effect classification and `danger-auto` audit helpers
- wrapper emission surfaces for standalone `gsd` research commands

### Out-of-bounds surfaces

These surfaces remain out of bounds unless a later explicit review reopens them:

- `phase_type` or typed phase routing
- root Auto artifacts as authoritative lifecycle state
- a second roadmap or lifecycle state owner
- bridge-ready completion semantics
- direct structural reuse of `ljx` lifecycle shell or bridge modules
- broad schema expansion of phase or state records just to support research commands

## Phase 05 review inputs

Phase 05 should review the following boundary questions explicitly:

1. Is the chosen clean workspace strategy correct: minimal clean workspace handoff now, with repo initialization and upstream import deferred to Phase 06?
2. Is the wrapper emission surface narrow enough to avoid recreating the old bridge generator?
3. Are install/build responsibilities clearly separated from research compiler responsibilities?
4. Are canonical state boundaries strict enough that research helpers cannot drift into lifecycle ownership?
5. Are any proposed tiny current-repo utility reimplementations actually worth their review cost?

## Phase 06 guidance

Phase 06 should assume these rules are already fixed unless Phase 05 rejects them:

- Start from upstream GSD foundation, not from `ljx` shell code.
- Keep CommonJS/runtime-first implementation shape.
- Preserve canonical GSD ownership of lifecycle files and routing.
- Treat `ljx` as historical-only by default.
- Keep research adapter code narrow and phase-local artifact aware.

## Deferred to Phase 08

The following items are intentionally deferred to the research integration phase rather than being solved by boundary docs alone:

- final wrapper implementation details for each research command family
- exact prompt-pack storage and compile data structures
- exact `RESEARCH_INDEX.md` machine-readable mirrors, if any
- exact remote-execution command behavior for W&B, SSH, Modal, Vast.ai, and GPU backends
- exact provider fallback wiring for reviewers

## Operational conclusion

If these boundaries hold, Phase 06 can begin implementation without reopening the core architecture.

If these boundaries do not hold, the correct action is to stop in Phase 05 review rather than improvising inside the implementation workspace.
