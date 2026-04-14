# Phase 17: Review Rubric And Scenario Matrix - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning
**Mode:** Auto-generated from user request; all grey-area defaults selected by the agent per explicit autonomous instruction.

<domain>
## Phase Boundary

This phase defines how to review `ljx-GSD` before judging or changing implementation code. It converts the user's requested review scope, Phase 15 upstream parity notes, and Phase 16 local implementation index into a severity-ordered review rubric, scenario matrix, and bounded review-loop protocol.

This phase does not classify concrete code findings as bugs. Candidate findings begin in Phase 18 and must be second-pass confirmed before fixes.

</domain>

<decisions>
## Implementation Decisions

### Review Order

Review will be shallow-to-deep:

1. hard failures, crashes, data loss, unsafe mutation, install/test failures
2. lifecycle/state correctness and generated-skill/helper contract drift
3. GSD parity and Auto/ARIS parity
4. user-scenario coverage
5. minimal-modification and efficiency
6. documentation, naming, and polish

### Evidence Policy

- Treat automated tests and helper JSON as primary evidence for runtime behavior.
- Treat generated `.build/codex-preview/skills/ljx-GSD-*` Markdown as primary evidence for Codex-facing behavior.
- Treat upstream Phase 15 notes as parity baselines.
- Treat top-level design docs as intended behavior only after checking whether the manifest marks that behavior current or future/deferred.

### Candidate Findings

- A candidate issue is not a confirmed bug until a second-pass review explains the failure mode, reproduces or cites concrete evidence, checks whether it is in scope, and identifies a minimal fix.
- Rejected candidates must be logged when useful so later review does not rediscover the same non-issue.

</decisions>

<code_context>
## Existing Review Inputs

- `.planning/review/v1.1/GSD-REFERENCE-NOTES.md`
- `.planning/review/v1.1/AUTO-ARIS-REFERENCE-NOTES.md`
- `.planning/review/v1.1/LJX-GSD-IMPLEMENTATION-INDEX.md`
- `.planning/review/v1.1/BUG-LEDGER.md`
- `.planning/review/v1.1/REVIEW-LOOP-STATE.md`
- `bin/lib/manifest.cjs`
- `bin/lib/ljx-*.cjs`
- `.build/codex-preview/skills/ljx-GSD-*`
- `.build/codex-preview/ljx-gsd/runtime/`
- `tests/*.test.cjs`

</code_context>

<specifics>
## Specific Ideas

- Keep the review matrix executable enough for subagents: every scenario should name scope, probe examples, expected evidence, pass criteria, and bug triggers.
- Include the user's explicit scenarios: migrated GSD projects, engineering lifecycle, research lifecycle, code review, literature review, automatic research loop, result analysis, research direction generation, pause/continue, workstreams, workspaces, safe/autonomous switching, and parameter implementation.
- Require review of docs and generated output, not only source code.
- Allow no more than 11 rounds and require two consecutive clean rounds before final success.

</specifics>

<deferred>
## Deferred Ideas

- Actual review execution begins in Phase 18.
- Fix implementation begins only after second-pass confirmation of candidate findings.
- Final closure/reporting is Phase 19.

</deferred>
