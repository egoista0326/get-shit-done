# Phase 6: Unified Hook Ownership - Context

**Gathered:** 2026-04-09
**Status:** Discuss in progress

## Phase Boundary

This phase defines one hook/runtime ownership model for `ljx-GSD`.

This phase is responsible for:

- deciding which layer owns lifecycle transitions such as `discuss-phase`, `plan-phase`, `execute-phase`, `code-review`, `verify-work`, and `next`
- deciding which hook families may observe, warn, block, append evidence, or mutate structured state
- deciding the boundary between authoritative state writes and derived artifact rendering
- deciding how Codex-specific adapter logic fits relative to public skills, internal workflows, runtime helpers, and hooks
- deciding how external integrations should feed evidence back into the system without becoming a second control plane

This phase is not responsible for:

- reopening the `.planning/` root or state-family namespace from earlier phases
- reopening migration semantics from Phase 5
- changing the accepted `phase_type` taxonomy
- rewriting installed skills yet

## Locked Inbound Decisions

- **D-01:** `.planning/` remains the authoritative root.
- **D-02:** `.planning/phases/` holds human-readable phase artifacts; `.planning/state/` holds structured machine state.
- **D-03:** GSD remains the outer control plane; Auto research remains a native workflow family inside it.
- **D-04:** Migration direction remains `read legacy broadly -> normalize once -> write new truth only`.
- **D-05:** `primary` remains rooted at top-level `.planning/`, while still having a formal `primary` workstream record.
- **D-06:** `ljx-GSD-code-review` remains a distinct quality gate between `execute-phase` and `verify-work` for code-bearing phases.
- **D-07:** Derived reports and backups may exist, but they must not silently become control truth.

## Hook-Ownership Interpretation

The current working interpretation is:

- authoritative state transitions should have one clear owner
- hooks should default to observer, validator, renderer, or evidence-emitter roles
- hooks should not silently become a second transition engine
- external integrations may provide evidence and side effects, but not roadmap or phase-truth mutation by default

## Accepted Phase 6 Decisions So Far

- **D-08:** Commands and their internal workflows own lifecycle truth transitions by default.
- **D-09:** Hooks may observe, validate, block, append evidence, and render derived artifacts, but they may not independently advance the phase/workstream mainline.
- **D-10:** Authoritative lifecycle writes such as active phase, current position, phase status, roadmap mutation, workstream pointer, and formal continuation verdicts must remain under command/workflow ownership rather than hook ownership.
- **D-11:** Hooks may block only by enforcing an already-accepted gate or integrity rule; they may not invent new progression semantics ad hoc.
- **D-12:** Artifact/render hooks may write derived artifacts plus narrow render metadata, but they may not rewrite lifecycle truth or domain verdicts.
- **D-13:** Allowed render-hook mirror-back is limited to non-semantic metadata such as render status, timestamps, output paths, hashes, and trace data.
- **D-14:** Render hooks may not mutate active phase, roadmap, workstream pointer, continuation verdicts, claim judgments, or other steering state.
- **D-15:** Integration hooks may write evidence and local integration-object status, but they may not write lifecycle progression or domain verdicts.
- **D-16:** Integration hooks may report facts such as run status, metrics, compile status, external job ids, notification results, and remote execution traces, but only workflows may interpret those facts into project decisions.
- **D-17:** Integration hooks may not directly set phase completion, verification pass/fail, claim support, roadmap mutation, or next-action routing.
- **D-18:** Codex adapters own runtime translation only, not project semantics or lifecycle authority.
- **D-19:** Codex adapters may translate invocation syntax, interaction APIs, tool mappings, runtime capability detection, and host-specific UX fallback, but they may not own phase routing, gate meaning, migration semantics, or authoritative state-write policy.

Working shorthand:

- hooks may `veto`
- hooks may `annotate`
- hooks may `render`
- hooks may not `steer` the mainline

## Highest-Value Gray Areas

1. **Lifecycle hook ownership**
   - Which layer owns state transitions for `discuss-phase`, `plan-phase`, `execute-phase`, `code-review`, `verify-work`, and `next`?
   - When may hooks block, and when may they only warn?

2. **Artifact and render hook boundaries**
   - Which hook families may create or refresh derived artifacts such as reports, compile outputs, summaries, and migration views?
   - Which of those hooks may mirror structured state, and which must remain one-way renderers only?

3. **Integration hook boundaries**
   - How should experiment monitoring, W&B, Feishu, paper compile, and remote execution hooks feed evidence back into the system?
   - Which integration outputs are append-only evidence versus control-truth mutation?

4. **Codex adapter ownership**
   - Which behavior belongs in public command skill prompts?
   - Which behavior belongs in reusable scripts/runtime helpers?
   - Which behavior belongs in hooks rather than prompt logic?

## Recommended Default Answers For Lower-Priority Items

- **Lifecycle state writes:** commands/workflows own authoritative phase and transition state by default; hooks may validate and summarize but should not own phase progression.
- **Lifecycle blocking:** hooks may veto only by applying an already-accepted gate such as missing required code review, migration-blocked state, or stale review; otherwise they should warn rather than redirecting the lifecycle.
- **Artifact rendering:** render hooks may create `SUMMARY`, `CODE_REVIEW`, compile, and migration-report artifacts as derived outputs, but they should not rewrite control truth unless an explicit owner table later grants that permission.
- **Render mirror-back:** render hooks may write narrow metadata such as `render_status`, `rendered_at`, `artifact_path`, `artifact_hash`, and execution trace references, but may not write lifecycle progression or domain-judgment state.
- **Integration evidence:** remote systems should write evidence records, logs, and result summaries into approved artifact/state locations instead of directly editing roadmap or phase-truth fields.
- **Integration local status:** integration hooks may mirror narrow object-local status such as run/compile/notification success or failure, but that local status must not be treated as a project-level verdict by itself.
- **Blocking behavior:** hooks may block only when they enforce an already-accepted gate or integrity rule; otherwise they should warn and attach evidence.
- **Idempotency:** hook runs should be safely repeatable whenever practical, especially for render/report hooks.
- **Codex adapter boundary:** Codex-specific prompt adapters should translate interaction style and tool usage, but should not own canonical project truth.
- **Adapter ownership:** Codex adapters may normalize runtime semantics such as `AskUserQuestion -> request_user_input`, `Task -> spawn_agent`, text-mode fallback, and capability detection, but workflow meaning and control-truth rules stay with commands/workflows plus shared runtime helpers.

## Discuss Checkpoint

The four highest-value hook-ownership questions now have accepted baseline answers:

1. lifecycle truth remains command/workflow-owned
2. render hooks are limited to derived artifacts plus narrow metadata
3. integration hooks may report facts/evidence but not project verdicts
4. Codex adapters translate runtime semantics but do not own project semantics

The next likely move is to convert Phase 6 from open discussion into formal research/planning artifacts rather than continue expanding gray-area discussion indefinitely.

## The Agent's Discretion

- exact file names for later hook-ownership tables
- exact split between runtime helper scripts and hook declarations
- exact logging format for hook execution traces

## Deferred Ideas

- hook visualizers for render pipelines
- automatic hook trace summaries
- per-hook latency budgeting

---

*Phase: 06-unified-hook-ownership*
*Context gathered: 2026-04-09*
