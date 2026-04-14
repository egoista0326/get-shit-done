# 01-FRAMEWORK-SYNTHESIS

**Status:** final Phase 01 synthesis after one subagent build round, three subagent review rounds, and main-agent final check.
**Evidence boundary:** Synthesized only from Phase 01 subagent outputs and accepted R1/R2/R3 review fixes. This is not a new source-reading artifact.

## Core Decision

v2.0 rebuilds `gsd` as upstream GSD plus a bounded research-command extension. It does not continue ljx-GSD bridge architecture and does not introduce `phase_type`, typed routing, or broad phase schema changes.

```text
upstream GSD lifecycle/control plane
  -> ordinary phases and .planning artifacts
  -> standalone research commands
  -> phase-local research artifacts/evidence conventions
  -> same git/review/verify/state discipline
```

## Framework Rules

1. Upstream GSD remains the outer lifecycle/control-plane base.
2. Public commands stay thin and route into workflow/runtime contracts.
3. `.planning/` remains the authoritative planning root for v2.0 framework design.
4. Authoritative research outputs live under `.planning/phases/<phase>/research/`.
5. Root Auto/ARIS artifacts are import/export mirrors only until explicitly adopted into the phase-local research root.
6. Canonical lifecycle state has one writer per operation; subagents and helper commands route updates through that owner and lock/atomic-write path.
7. Completion requires command-specific raw evidence plus independent review and verification/UAT gates.
8. Summaries, roadmap checkboxes, plan counts, file existence, `progress`, and `next` are cross-check/advisory signals only.
9. `idea-discovery` cannot complete from context/state/idea-report output alone; literature retrieval/reading evidence is mandatory.
10. `AUTO_PROCEED`, `HUMAN_CHECKPOINT`, stop predicates, reviewer backend fallback, and external services follow one canonical gate-precedence contract.
11. Default reviewer backend is Codex subagents when available; fallback providers require explicit configuration and service-policy allowance.
12. Current ljx-GSD is historical evidence and selective salvage material, not the implementation base.
13. `ljx-*` names, bridge-ready completion semantics, typed route tables, primary-command routing, and broad bridge policy modules are historical-only unless reimplemented under reviewed v2.0 contracts.
14. Implementation starts later in a clean repo copy/worktree, after framework design and review phases.

## Source Systems

| Source system | Phase 01 role | Final stance |
|---|---|---|
| Upstream GSD | Lifecycle, runtime, config, state, git, hooks, package, SDK, tests, templates, agents. | Behavioral base and upgrade boundary. |
| Current ljx-GSD/history | Failure evidence, salvage candidates, bug taxonomy, review lessons. | Historical evidence; only narrow reviewed ideas may be reused. |
| Auto/ARIS | Research workflows, artifacts, parameters, reviewer loops, experiments, papers, rebuttals, tooling. | Capability source for standalone `gsd` commands and phase-local artifact contracts. |

## Review Results Incorporated

- R1 corrected source coverage, root/path locator conventions, package/test/SDK indexing, Auto parameters, public manifest count, and prompt-template indexing.
- R2 resolved cross-framework consistency issues around phase-local research roots, experiment/claim command preservation, auto-review-loop stop predicate, and ljx helper quarantine.
- R3 hardened historical-regression rules for review parser drift, research chain handoff, claim/audit gating, idea-discovery literature evidence, gate precedence, external-service policy, false-completion prevention, single-writer state, and context hygiene.

## Phase 02 Handoff

Phase 02 should design the target framework from these constraints rather than reopening source extraction. Remaining choices are design choices, not Phase 01 blockers:

- Choose the upstream runtime baseline: reference `1.35.0`, installed `1.34.2`, or a reconciled diff.
- Decide SDK package inclusion/adaptation/deferment.
- Define exact research command surface and artifact subdirectory layout under `.planning/phases/<phase>/research/`.
- Decide which root Auto import/export mirrors are supported.
- Finalize audit category severity defaults within the claim/paper blocking policy.
- Decide initial venue matrix and paper-review deferral or addition.
