# 01-LJX-REUSE-OR-DISCARD-MATRIX

**Status:** build-round draft
**Evidence boundary:** Synthesized from ljx-GSD implementation and history subagent reports.

## Strong Reuse Candidates

| Component or pattern | Source | Reason to reuse | Constraint |
|---|---|---|---|
| Safe state write helpers | `/bin/lib/ljx-runtime-state.cjs` | State-family whitelist, safe IDs, atomic writes, ownership validation, list/update helpers. | Rename and narrow schema; do not carry broad research state families by default. |
| Config validation pieces | `/bin/lib/ljx-runtime-core.cjs` | Config precedence, validation, phase/workstream resolution, command sanitization. | Remove `phase_type` assumptions and broad legacy aliasing from core. |
| Honest context readers | `/bin/lib/ljx-phase-context.cjs` | Stop contexts, dependency artifacts, phase artifact lookup, migration blocking. | Keep read-only context separate from execution proof. |
| Quality gate models | `/bin/lib/ljx-quality-gates-tools.cjs`; `/bin/lib/ljx-code-review-*.cjs`; `/bin/lib/ljx-verify-tools.cjs` | Stale/missing/blocked review and verify gate handling. | Re-align with upstream GSD review/verify semantics. |
| Review artifact parser | `/bin/lib/ljx-code-review-artifact.cjs` | Severity counting and structured marker parsing. | Review marker format must be approved for v2.0. |
| Shared CLI parser | `/bin/lib/ljx-cli-args.cjs` | Predictable structured CLI errors/overrides. | Use only after config precedence is defined. |
| Planning lock | `/bin/lib/ljx-planning-lock.cjs` | Lock, recovery, stale lock handling. | Coordinate with upstream planning/state locks. |
| Admin mutation records | `/bin/lib/ljx-admin-mutation-records.cjs` | Bounded audit trail for roadmap/workstream/workspace mutations. | Keep mutation records separate from lifecycle completion evidence. |
| Source root resolver | `/bin/lib/source-roots.cjs` | Env-first and repo-local fallback source resolution. | Use for reference imports, not runtime dependence on external skills. |
| Installer safety helpers | `/bin/lib/build-skills.cjs` | Managed markers, unmanaged conflict checks, runtime/docs packaging. | Do not reuse whole bridge generator. |
| Research state writer pattern | Various `write*State` helpers | Validated payloads and explicit ownership. | Narrow artifact/state contract first. |
| Experiment/paper evidence modeling | `/bin/lib/ljx-experiment-evidence-tools.cjs`; `/bin/lib/ljx-paper-evidence-tools.cjs` | Artifact status modeling, phase-local/dependency evidence distinction. | Root Auto fallback must be import-only. |

## Adapt With Caution

| Component | Why useful | Risk |
|---|---|---|
| Narrow adoption-state ideas from `ljx-lifecycle-shell-tools.cjs` | Artifact evidence adoption and lifecycle sync concepts may be useful. | The file is built around a typed route table and `ljx-*` primary commands; do not copy route tables, route kinds, `primaryCommand` routing, phase-type mechanics, or command names. |
| `ljx-runtime-core.cjs` | Mature config/phase/workstream utilities. | Alias and override sprawl; hidden behavior. |
| `ljx-state-tools.cjs` | Some progress/next/pause/resume shell ideas may be useful. | Current code uses bridge-ready/deferred labels; do not copy labels, completion semantics, or next-action routing. |
| From-scratch summary key-file parser idea | Key-file extraction could help review rerun targeting. | Do not reuse `ljx-bridge-contract.cjs` policy behavior or any emitted `ljx-GSD-*` command recommendations. |
| Research helper families | Useful context and artifact conventions. | Previously did not truly execute upstream research evidence chain. |
| Current tests | Encode valuable invariants. | Many are bridge/v1.4-specific and mention typed records or ljx names. |

## Discard Or Historical-Only

| Component or pattern | Reason |
|---|---|
| Whole bridge skill generator | Large bespoke conversion layer; rewrites prompts and compatibility behavior; high drift risk. |
| `codex-conversion.cjs` wholesale | Prompt conversion became a truth surface; use source indexes and native skills instead. |
| Broad `phase_type` route table | Directly rejected by v2.0; historical blast radius too large. |
| Raw upstream command compatibility maps | Keep only as migration reference, not public target architecture. |
| Root Auto artifact fallback as lifecycle truth | Recreates second control plane. |
| Monolithic command helpers as-is | Too many responsibilities; split resolver/validator/planner/mutator/CLI boundaries. |
| Prompt-quality patch table | Symptom patching of generated prompts; encode behavior in specs/tests instead. |
| `ljx-bridge-contract.cjs` policy module | Emits `ljx-GSD-*` post-fix commands and bridge-specific recommendations; only the neutral key-file parsing idea may be reimplemented from scratch. |
| Broad legacy config aliases in core runtime | Keep only in explicit migration adapter if needed. |
| Research pipeline auto-phase creation | Violates minimal interference unless explicitly approved later. |
| Installed Auto support asset mirroring | Avoid unless each asset has native v2.0 contract. |
| ljx namespace names | Target system must be `gsd`, not `ljx-GSD`, `ljx-gsd`, or `.ljx-gsd-managed.json`. |
| Bridge-ready completion semantics | Capability availability is not goal completion. |
| Backfilled summaries as completion proof | Historical accounting only, not execute evidence. |

## Test Reuse Triage

| Test family | Potential v2.0 use |
|---|---|
| Runtime state/path safety tests | Convert to invariant regression tests. |
| Config validation and CLI parser tests | Reuse after config model is defined. |
| Code-review/verify freshness tests | Reuse for quality gate semantics. |
| Experiment/paper evidence tests | Reuse after research artifact contract is narrowed. |
| Migration/cutover tests | Keep archival unless v1.x import becomes supported. |
| Roadmap/workstream/workspace admin tests | Reuse safety behaviors, remove typed-record expectations. |
| Skill-build self-containment tests | Reinterpret for native install output, not bridge conversion. |

## Required Review Checks

- Confirm no reuse candidate pulls in `phase_type` implicitly.
- Confirm reused code does not write canonical state from multiple surfaces.
- Confirm reused config aliases are migration-only.
- Confirm imported Auto artifacts cannot satisfy lifecycle completion without explicit adoption.
- Confirm every copied helper has tests that match v2.0 semantics, not v1.4 bridge semantics.
