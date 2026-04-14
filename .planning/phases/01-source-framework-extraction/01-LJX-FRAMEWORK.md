# 01-LJX-FRAMEWORK

**Status:** build-round draft
**Evidence boundary:** Synthesized from current ljx-GSD implementation and history subagent reports. Current ljx-GSD is historical evidence and selective salvage material, not the v2.0 implementation base.

## Current Implementation Shape

Current ljx-GSD is a bridge-era framework, not a thin installer. The implementation lane extracted these layers:

| Layer | Current shape | Main source index |
|---|---|---|
| Build/install surface | Manifest-driven public skill generation, upstream GSD/Auto conversion, runtime/docs/config packaging, managed-skill conflict protection. | `/Users/lijiaxin/Downloads/new-gsd/bin/install.js`; `/bin/lib/build-skills.cjs`; `/bin/lib/manifest.cjs`; `/bin/lib/codex-conversion.cjs` |
| Runtime control plane | Config loading, alias normalization, command sanitization, phase/workstream resolution, structured record handling. | `/bin/lib/ljx-runtime-core.cjs`; `/bin/lib/ljx-runtime-state.cjs`; `/bin/lib/ljx-cli-args.cjs` |
| Lifecycle helpers | Discuss/plan/execute shell contexts, route table, direct workflow evidence adoption, persisted lifecycle state. | `/bin/lib/ljx-lifecycle-shell-tools.cjs`; `/bin/lib/ljx-phase-context.cjs`; `/bin/lib/ljx-state-tools.cjs` |
| Quality gates | Code-review and verify-work freshness, structured review parsing, blocking/warning policy, post-fix rerun state. | `/bin/lib/ljx-quality-gates-tools.cjs`; `/bin/lib/ljx-code-review-*.cjs`; `/bin/lib/ljx-verify-tools.cjs` |
| Research extension | Direct helpers for discovery, refinement, novelty, experiment, review, claim, paper, rebuttal, evidence. | `/bin/lib/ljx-idea-discovery-tools.cjs`; `/bin/lib/ljx-research-*.cjs`; `/bin/lib/ljx-experiment-*.cjs`; `/bin/lib/ljx-paper-*.cjs`; `/bin/lib/ljx-rebuttal-tools.cjs` |
| Admin helpers | Roadmap mutation, workstreams, workspaces, migration/cutover, planning locks, mutation records. | `/bin/lib/ljx-roadmap-admin-tools.cjs`; `/bin/lib/ljx-workstreams-tools.cjs`; `/bin/lib/ljx-workspace-admin-tools.cjs`; `/bin/lib/ljx-migration-tools.cjs`; `/bin/lib/ljx-planning-lock.cjs` |
| Test surface | 41 ljx-GSD tests encode bridge-specific invariants and safety behavior. | `/Users/lijiaxin/Downloads/new-gsd/tests/*.test.cjs` |

## Structural Diagnosis

The history lane concluded that ljx-GSD failed as a lifecycle-system design because too many truth surfaces were coupled without one enforceable framework contract. Failures were not isolated bugs; they were repeated boundary failures across state, generated prompts, review accounting, config aliases, typed routes, research artifacts, and docs.

The implementation lane independently supports this: ljx-GSD encoded many useful invariants, but it also encoded bridge-era assumptions v2.0 rejects, especially broad `phase_type` routing and generated prompt conversion.

## Current Public Surface

`PUBLIC_SKILL_MANIFEST` in `bin/lib/manifest.cjs` declares 34 public skills, all currently marked `buildPolicy: 'bridge-ready'`. The current manifest does not expose separate compatibility or deferred groups. The installer builds installed skills, runtime helper bundles, docs, managed markers, and `ljx-gsd/manifest.json`.

v2.0 implication:

- Do not copy the bridge-ready public surface wholesale.
- Preserve selected safety and validation patterns.
- Remove `ljx-GSD-*`, `ljx-gsd`, `.ljx-gsd-managed.json`, and hard-coded ljx namespace from the target public surface.
- Expose the target system as `gsd`.

## Current State And Config Model

Extracted facts:

- `ljx-runtime-state.cjs` defines state families for phase records, sessions, workstreams, reviews, experiments, claims, papers, research idea/refinement sessions, and migration records.
- `ljx-runtime-core.cjs` loads defaults, automation profiles, global config, phase handoff/config overrides, workflow overrides, CLI overrides, and legacy aliases.
- Active config sets `automation_profile: safe`, `workflow.auto_advance_policy: guided`, review defaults, reviewer model, runtime language, and project type.
- Reference config documents broader research, literature, execution, review, rebuttal, and automation settings.

v2.0 implication:

- Reuse config validation and effective-config explanation ideas selectively.
- Do not preserve broad legacy aliasing as the runtime model; if needed, keep it as explicit migration adapter.
- Avoid state-family expansion unless the new framework proves it is necessary.
- Keep authoritative state smaller and derived where possible.

## Current Research Extension Shape

ljx-GSD research helpers are phase-aware direct helpers. They usually call shared phase context, declare phase-local artifact targets, expose downstream recommendations, and write structured state via validation helpers.

Useful pattern:

- Context readers should honestly stop when planning/config/phase/workstream/migration context is invalid.
- Research writers should validate payloads and ownership before writing state.
- Evidence helpers should distinguish phase-local evidence from dependency/root fallback evidence.

Discarded pattern:

- Research helper families should not be route-driven through broad phase types.
- Root Auto artifacts must not become authoritative lifecycle state.
- Thin context/write helpers must not be mistaken for actual execute evidence.

## Implementation Lessons For v2.0

- Reuse upstream GSD behavior and code patterns as the base, not just names and `.planning` vocabulary.
- Reuse ljx-GSD safety invariants only when their blast radius is small and review-approved.
- Reuse historical bug ledgers as review rule inputs.
- Reuse prompt-fidelity expectations as behavioral contracts, not grep checks.
- Discard `phase_type`, typed route tables, typed phase-chain proposal machinery, and broad phase schema changes.
- Discard bridge-ready as a completion concept.
- Discard backfilled `SUMMARY.md` as completion evidence.
- Discard helper-local config parsing and multiple truth engines.

## Open Questions

- Which ljx tests should become invariant v2.0 regression tests, and which remain bridge-archive tests?
- Which ljx helper patterns can be copied without bringing `phase_type` assumptions?
- Should v1.4 project compatibility be read-only import, active upgrade, or unsupported?
- Should language default remain `zh-CN`, be project-configured, or become English-first?
