# 01-GSD-FRAMEWORK

**Status:** build-round draft
**Evidence boundary:** This document synthesizes the Phase 01 upstream GSD subagent lanes only. It is not a main-agent source-reading artifact and is not final until review rounds 1-3 pass.

## Core Shape

Upstream GSD is an artifact-driven control plane with five interacting layers:

| Layer | Source-extracted contract | Main source index |
|---|---|---|
| User command layer | Thin command shims live under `commands/gsd/*.md` and route into workflow prompt bodies. | `/Users/lijiaxin/Downloads/new-gsd/.planning/references/upstreams/get-shit-done/docs/ARCHITECTURE.md`; `/commands/gsd/*.md` |
| Workflow layer | Long workflow prompts own orchestration, context loading, gates, subagent dispatch, state updates, and recovery. | `/Users/lijiaxin/Downloads/new-gsd/.planning/references/upstreams/get-shit-done/get-shit-done/workflows/*.md` |
| Runtime CLI layer | `gsd-tools.cjs` and `bin/lib/*.cjs` provide deterministic operations for config, state, roadmap, phase, milestone, validation, commits, UAT, workstreams, templates, and migration helpers. | `/Users/lijiaxin/Downloads/new-gsd/.planning/references/upstreams/get-shit-done/get-shit-done/bin/gsd-tools.cjs`; `/bin/lib/*.cjs` |
| Agent layer | Specialized agents implement planning, execution, verification, review, docs, security, UI, integration, and mapping tasks. | `/Users/lijiaxin/Downloads/new-gsd/.planning/references/upstreams/get-shit-done/agents/*.md`; `/get-shit-done/references/agent-contracts.md` |
| Artifact layer | `.planning/` files are runtime APIs, not just docs: `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase artifacts, `UAT.md`, `VERIFICATION.md`, milestone archives, workstreams, and workspace metadata. | `/Users/lijiaxin/Downloads/new-gsd/.planning/references/upstreams/get-shit-done/get-shit-done/templates/*.md`; `/bin/lib/state.cjs`; `/bin/lib/phase.cjs`; `/bin/lib/roadmap.cjs` |

## Lifecycle Framework

Primary lifecycle extracted by subagents:

```text
new-project/new-milestone
  -> discuss phase
  -> plan phase
  -> execute phase
  -> verify/UAT
  -> internal transition
  -> audit/complete milestone
  -> next milestone
```

Key lifecycle facts:

- `discuss-phase` freezes phase boundary and writes `CONTEXT.md` as the phase intent contract.
- `plan-phase` consumes `CONTEXT.md`, runs research and validation gates, invokes planner and plan checker, and blocks on plan quality and source coverage gaps.
- `execute-phase` indexes plan waves, dispatches executors, runs post-wave and post-merge checks, blocks partial phases from verification, invokes review/verify, and owns transition decisions.
- `verify-work` is a conversational UAT layer with persistent `UAT.md` debt and gap records; it is not equivalent to automated tests.
- `transition.md` is internal and should not be a public user command.
- `progress` and `next` route from artifact and state analysis; they should surface debt, not silently claim completion.
- `complete-milestone` archives requirements/roadmap/audit artifacts and changes project scope; it must remain separate from phase transition.

## False Completion Controls

Upstream GSD uses overlapping controls to reduce false completion:

| Control | Extracted purpose | Source index |
|---|---|---|
| Plan checker loop | Verifies the plan will achieve the phase goal before execution. | `/workflows/plan-phase.md`; `/agents/gsd-plan-checker.md` |
| Planner source audit | Ensures plan coverage of goal, requirements, research, and context. | `/get-shit-done/references/planner-source-audit.md` |
| Post-merge test gate | Prevents incomplete integration from being marked complete. | `/workflows/execute-phase.md` |
| Summary spot-check | Checks summaries, file mentions, commits, and self-check status. | `/bin/lib/verify.cjs` |
| Phase completeness check | Detects plans without summaries and orphan summaries. | `/bin/lib/verify.cjs`; `/bin/lib/phase.cjs` |
| Verification patterns | Explicitly rejects file existence as proof of implementation. | `/get-shit-done/references/verification-patterns.md` |
| UAT debt scan | Keeps user-observed verification debt visible. | `/workflows/verify-work.md`; `/workflows/progress.md` |
| State drift validation | Rebuilds and validates `STATE.md` against disk and verification status. | `/bin/lib/state.cjs` |
| Milestone audit | Cross-checks requirements, verification, summaries, and phase records. | `/workflows/audit-milestone.md`; `/workflows/complete-milestone.md` |

## Runtime Substrate

Runtime source facts extracted by the upstream runtime lane:

- Upstream package version in the reference checkout is `1.35.0`; installed local runtime reports `1.34.2`.
- The primary runtime is CommonJS: `get-shit-done/bin/gsd-tools.cjs` and `get-shit-done/bin/lib/*.cjs`.
- The TypeScript SDK is a package boundary with its own manifest, public API, CLI entrypoint, prompt assembly code, and tests; it still delegates durable lifecycle behavior through the GSD runtime and `.planning/` contracts rather than replacing them.
- `core.cjs` owns project-root resolution, config defaults, planning locks, workstream planning directories, and atomic writes.
- `config.cjs` defines known config keys and project config creation/mutation.
- `state.cjs` derives `STATE.md` frontmatter from markdown body plus disk state and uses `STATE.md.lock` for state writes.
- `phase.cjs` indexes plans/summaries/checkpoints and completes phases by updating roadmap, requirements, state, progress, and next phase.
- `roadmap.cjs` analyzes roadmap phase status, disk status, dependencies, plan counts, summary counts, and progress.
- `milestone.cjs` archives milestone artifacts.
- `commands.cjs` implements planning commits and subrepo commits.
- `model-profiles.cjs` defines model profiles used for agent selection.
- Hooks live under `hooks/`, are copied by `scripts/build-hooks.js`, and are registered by the installer.
- The installer is a large runtime adapter covering command/skill/agent conversion, hook registration, Codex config mutation, uninstall, manifesting, and patch preservation.
- The root package manifest, SDK package manifest, and upstream tests are source contracts for publish/build/install behavior. Package/hook/atomic-write tests should be treated as compatibility evidence, not merely as optional runtime tests.

## Subagent And Ownership Model

The extracted upstream boundary is important for v2.0:

- Orchestrator owns `STATE.md`, `ROADMAP.md`, phase advancement, and shared lifecycle artifacts.
- Executor subagents own implementation tasks, summaries, and scoped commits.
- Worktree execution must not let executor agents mutate orchestrator-owned shared lifecycle files directly.
- Manager/background modes synchronize through disk artifacts and require refresh/reconciliation from disk.
- Workstreams are planning-state namespaces; workspaces are physical repo isolation. They are separate concepts.

Normative v2.0 write rule:

- Canonical lifecycle families are `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`, phase records, milestone records, workstream pointers, and phase acceptance artifacts.
- Each canonical family has exactly one lifecycle owner for a given operation.
- Subagents and helper commands route requested canonical updates through that owner; they do not write shared lifecycle files directly.
- Concurrent canonical writes are forbidden. The implementation must use the upstream-equivalent planning lock, state lock, and atomic-write path for any canonical mutation.
- Derived mirrors may be regenerated, but they cannot become independent writable truth surfaces.

## GSD Framework Rules For v2.0

These are source-backed framework rules to carry into Phase 02:

1. Keep public commands thin; preserve workflow/runtime separation.
2. Preserve `.planning/` artifacts as compatibility boundaries unless a reviewed migration bridge replaces them.
3. Preserve orchestrator ownership of canonical lifecycle state.
4. Preserve UAT and verification as separate gates.
5. Preserve workstreams and workspaces as distinct primitives.
6. Preserve bounded revision loops and explicit checkpoints.
7. Preserve git behavior through controlled planning commits and subrepo routing.
8. Do not treat `progress`, `next`, plan counts, roadmap checkboxes, or summary files as goal completion by themselves.
9. Do not copy long workflow prompt bodies into v2.0 docs; cite paths and extract only reviewed contracts.
10. Treat upstream `1.35.0` reference and installed `1.34.2` divergence as a Phase 02 decision, not an assumption.
11. Treat roadmap checkbox completion as advisory/legacy status only; it must never override disk state, review outcomes, verification/UAT state, or explicit phase acceptance.

## Open Questions From Build Lanes

- Which upstream version is the v2.0 behavioral baseline: reference `1.35.0`, installed `1.34.2`, or a reconciled diff?
- Should v2.0 consume the SDK package as an upstream source surface, wrap it as an adapter, or leave it out of the initial target package?
- Should config reads remain allowed to mutate files through migration/sync, or should migration be explicit?
- Should `STATE.md` remain the source of truth, or become a generated mirror over structured state?
- Which runtimes are first-class in v2.0: Codex only, Claude plus Codex, or the full upstream runtime matrix?
- Should installer decomposition be required before implementation, given upstream installer monolith risk?
