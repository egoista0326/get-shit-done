# v1.2 Round 05 Candidate Intake

**Date:** 2026-04-12
**Purpose:** re-review after Round 4 fixes with extra emphasis on prompt self-containment, prompt-fidelity preservation, Codex-vs-Claude conformance, and runtime/lifecycle regression risks.

## Candidate Matrix

| Lane | Source | Candidate | Disposition |
| --- | --- | --- | --- |
| Self-contained invocation coverage | user addendum + local generated-skill tests | The scanner did not have an explicit `$run-experiment` / `$gsd-progress` dollar-call fixture, and local ljx-GSD suffix nouns such as `review-loop`, `code-review`, and `claim-gate` could survive in backticks without the `$ljx-GSD-*` prefix. | confirmed as V12-045 |
| Prompt fidelity | Darwin prompt review | `ljx-GSD-research-pipeline` prohibited raw Auto commands but named only a truncated accepted stage set, conflicting with the full phase-chain route. | confirmed as V12-046 |
| Prompt fidelity | Darwin prompt review | `ljx-GSD-experiment-bridge` prompt-quality floor required ablation follow-through, but the downstream allowlist omitted `$ljx-GSD-ablation-planner`. | confirmed as V12-047 |
| Prompt fidelity | Darwin prompt review | `ljx-GSD-review-loop` required supported/partial results to route through result-to-claim first, but its downstream allowlist omitted `$ljx-GSD-result-to-claim`. | confirmed as V12-048 |
| Runtime-state safety | Helmholtz runtime review + local TDD fixture | Atomic state writes used a predictable temp path and could follow a pre-existing temp-path symlink before rename. | confirmed as V12-049 |
| Code-review scope | Helmholtz runtime review + local git fixture | Code-review git fallback coerced alphanumeric phase ids such as `12A` to numeric `12`, allowing unrelated phase commits to be selected. | confirmed as V12-050 |
| Verify-work gate semantics | Helmholtz runtime review + local gate fixture | Verification frontmatter `status: blocked` was not treated as an authoritative blocked gate when `gate_status` was absent. | confirmed as V12-051 |
| Pause/resume atomicity | Helmholtz runtime review + local failure-injection fixtures | `writePauseArtifacts` could leave orphaned handoff files or a partial paused `STATE.md` if a later handoff/state write failed. | confirmed as V12-052 |

## Notes

- Round 5 is not clean because it confirmed normal-use P1/P2 issues in prompt-fidelity and runtime/lifecycle behavior.
- The user's self-contained requirement is now tested for raw `$...` calls, raw slash calls, bare imperative references, routing/handoff slots, backticked raw upstream names, and local short ljx-GSD suffixes.
- The prompt-fidelity findings remain capability-preservation bugs, not cosmetic wording bugs: downstream allowlists must not contradict the prompt-quality floor or quietly skip an upstream Auto/GSD behavior preserved as an internal ljx-GSD stage.
