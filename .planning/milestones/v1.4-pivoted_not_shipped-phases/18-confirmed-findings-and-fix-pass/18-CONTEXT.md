# Phase 18: Confirmed Findings And Fix Pass - Context

**Gathered:** 2026-04-12
**Status:** Ready for planning and execution
**Mode:** Auto-generated from user request; all grey-area defaults selected by the agent per explicit autonomous instruction.

<domain>
## Phase Boundary

This phase runs Round 1 of the v1.1 whole-repo review using the Phase 17 rubric and scenario matrix. It collects candidate findings, performs second-pass confirmation, fixes accepted bugs with minimal changes, updates the user-facing bug ledger, and reruns verification.

This phase may edit implementation code only after a candidate bug is confirmed. If Round 1 is clean, this phase records a clean round and Phase 19 continues the second clean-round closure check.

</domain>

<decisions>
## Implementation Decisions

### Review Split

Run parallel review lanes where possible:

- lifecycle/state/GSD parity
- Auto/ARIS research parity
- generated install/preview/test/config surface

The main agent coordinates evidence, performs second-pass confirmation, applies fixes, and owns final ledger/state updates.

### Confirmation Rule

No implementation fix is allowed from a single review note. Each candidate must be confirmed against:

- current implemented-surface contract
- Phase 15 upstream parity notes
- Phase 16 implementation index
- Phase 17 rubric and scenario matrix
- concrete local file/test/helper evidence

### Fix Rule

Fix only confirmed issues, use minimal changes, update generated preview output/tests/docs where needed, and keep the review loop bounded.

</decisions>

<code_context>
## Review Inputs

- `.planning/review/v1.1/REVIEW-RUBRIC.md`
- `.planning/review/v1.1/SCENARIO-MATRIX.md`
- `.planning/review/v1.1/REVIEW-PROTOCOL.md`
- `.planning/review/v1.1/GSD-REFERENCE-NOTES.md`
- `.planning/review/v1.1/AUTO-ARIS-REFERENCE-NOTES.md`
- `.planning/review/v1.1/LJX-GSD-IMPLEMENTATION-INDEX.md`
- `bin/lib/`
- `bin/install.js`
- `bin/lib/manifest.cjs`
- `.build/codex-preview/`
- `tests/`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/state/phase-records/`

</code_context>

<specifics>
## Specific Ideas

- Record Round 1 candidates before fixing.
- Run baseline verification before and after fixes when feasible.
- Log rejected candidates that are likely to be rediscovered.
- If no confirmed P0/P1/P2 bugs are found, record Round 1 as clean and do not invent fixes.

</specifics>

<deferred>
## Deferred Ideas

- A second consecutive clean review round is Phase 19 even if Phase 18 is clean.
- Final v1.1 closure report is Phase 19.

</deferred>
