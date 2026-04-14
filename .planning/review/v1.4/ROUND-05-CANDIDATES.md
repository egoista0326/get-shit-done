# v1.4 Stage A Round 5 Candidates

**Status:** triaged
**Round type:** regular skill review

## Review Inputs

- Six focused subagent reviews:
  - self-contained install/runtime closure
  - Auto Research prompt fidelity
  - GSD prompt fidelity
  - artifact/state traceability
  - lifecycle gates and helper CLI strictness
  - Codex hook/config/interface conformance
- Local second-pass confirmation against the bundled upstream GSD/Auto references, generated preview install output, active skill scans, and official Codex hook behavior.
- Targeted regression tests, full-suite verification, fresh preview install, manifest/install-surface scans, and live Stop hook JSON-output smoke test.

## Accepted Findings

| Candidate | Severity | Decision | Notes |
| --- | --- | --- | --- |
| `ljx-GSD-map-codebase` compressed upstream mapper quality and did not preserve refresh/update/skip policies, mapper role split, doc expectations, and secret-scan/no-auto-commit checks. | P2 | Accepted as V14-051 | Runtime route existed, but generated prompt quality was materially weaker than upstream GSD map-codebase. |
| `ljx-GSD-idea-discovery` dropped Auto source-selection semantics for Zotero/Obsidian/local/web/DeepXiv. | P2 | Accepted as V14-052 | Source choice is part of Auto Research quality, not a cosmetic option. |
| `ljx-GSD-idea-discovery` dropped broad-direction narrowing and cheap pilot/top-idea validation semantics. | P2 | Accepted as V14-053 | The command could run but would choose and validate ideas less rigorously than Auto Workflow 1. |
| Migration recognized more Auto artifacts than downstream dependency/resume/evidence readers could rediscover. | P2 | Accepted as V14-054 | Imported or preserved artifacts must be findable later by ljx-GSD phase context, paper evidence, and handoff readers. |
| Structured research state writers could overwrite malformed or phase-mismatched existing records. | P2 | Accepted as V14-055 | State-family writer ownership must fail closed rather than erase damaged research state. |
| New pause handoffs wrote an absolute `handoff_markdown_path_abs`. | P3 | Accepted as V14-056 | Reader compatibility remains, but new handoffs should be relocatable and project-relative. |
| Public `ljx-GSD-autonomous` was missing. | P2 | Accepted as V14-057 | GSD autonomous parity requires a self-contained multi-phase loop entrypoint, not only one-step `next` routing. |
| Pause/resume critical anti-patterns were surfaced but not enforced before discuss/execute continuation. | P2 | Accepted as V14-058 | Handoff anti-patterns must become an explicit safety gate before more work continues. |
| Structured blocked lifecycle stages could be bypassed by legacy markdown artifacts. | P1 | Accepted as V14-059 | Structured lifecycle records must dominate markdown when they explicitly say blocked/incomplete. |
| Older `VERIFICATION.md` artifacts could override newer structured blocked verification state. | P1 | Accepted as V14-060 | Fresh structured gate blockers must not be cleared by stale markdown. |
| Direct helper CLIs and roadmap/workspace/migration admin helpers failed open on unknown inline flags; code-review invalid depth collapsed to `standard`. | P2 | Accepted as V14-061 | Silent flag ignore is unsafe for skill prompts and scenario tests. |
| Generated Codex Stop hook emitted plain text and meta-opt docs described stale config targets/events. | P2 | Accepted as V14-062 | Codex Stop hooks require JSON stdout; install docs should point at `.codex/hooks.json` and `[features] codex_hooks = true`. |
| `ljx-GSD-research-pipeline --max-primary-claims` populated the wrong config branch. | P2 | Accepted as V14-063 | The umbrella proposal later reads refine policy, so this flag must land under `research.refine`. |
| `code_sync_method`, `wandb_enabled`, `compute_budget_hours`, and `review_loop.stop_condition` were documented/surfaced but under-validated or missing shared CLI flags. | P2 | Accepted as V14-064 | Restored Auto execution/review variables must be accepted consistently and reject invalid values. |
| Paper improvement state was rediscovered as a required paper artifact, blocking otherwise valid paper/rebuttal readiness. | P3 | Accepted as V14-065 | The state file is a useful optional artifact for traceability, not a normal readiness prerequisite. |
| Empty top-level `skills/shared-references` residue could survive preview rebuilds. | P3 | Accepted as V14-066 | It was empty and not callable, but the active install surface should not expose non-`ljx-GSD-*` skill-shaped directories. |

## Rejected Or Deferred Watch Items

| Candidate | Disposition | Reason |
| --- | --- | --- |
| `map-codebase` reference files use upstream GSD path labels. | Rejected as runtime bug | They are internal reference/build material; active generated skill output and runtime routes stay self-contained. |
| Raw upstream strings inside archived `ljx-gsd/upstream-auto` docs and base skills. | Rejected as runtime bug | The archive is not active skill surface. Active generated `skills/ljx-GSD-*` and runtime helper tests/scans are the enforcement target. |
| `.planning` accounting/doc updates produced by this review. | Not clean-impacting | They do not alter skill behavior unless they change routing/config/artifact contracts. |
