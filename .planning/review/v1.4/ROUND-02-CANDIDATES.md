# v1.4 Stage A Round 2 Candidates

**Date:** 2026-04-13
**Stage:** A - regular skill review
**Round:** 2
**Method:** six focused subagents plus local second-pass checks, preview install, generated-skill scans, and regression design.

## Review Slices

- Independent runtime closure and packaged install layout.
- Generated `ljx-GSD-*` prompt fidelity against upstream GSD and Auto/ARIS capability floors.
- Codex conversion and config/CLI variable propagation.
- Artifact ledger, Auto import classification, and structured state pointer portability.
- Lifecycle, migration, workstream, pause/resume, code-review, and verify-work gates.
- Test/doc contract coverage for self-contained routing, hook `cwd`, and raw upstream skill avoidance.

## Accepted Candidates

| ID | Candidate | Severity | Second-Pass Confirmation | Disposition |
| --- | --- | --- | --- | --- |
| R2-C01 | `ljx-GSD-experiment-bridge` direct CLI overrides were not carried into the final workflow context read. | P2 | Reproduced with a direct helper invocation using `--base-repo`, `--max-parallel-runs`, and `--no-auto-deploy`; the context ignored the override path before the fix. | Accepted as V14-016 |
| R2-C02 | `ljx-GSD-idea-discovery` and `ljx-GSD-rebuttal` accepted documented direct workflow flags neither as effective overrides nor as unsupported errors. | P2 | Added helper CLI checks for discovery/rebuttal knobs and unknown flags; before the fix, the parsers had no shared override path. | Accepted as V14-017 |
| R2-C03 | Codex hook stdin `cwd` and `research_stage_handoff` propagation had insufficient regression coverage after Round 1. | P3 | Compared against official Codex hook stdin `cwd` shape and Round 1 runtime fixes; issue is verification depth, not a new runtime behavior failure. | Accepted as V14-018 |
| R2-C04 | Damaged pause state, explicit handoff markdown paths, and relocated handoff projects could route incorrectly or consume unsafe files. | P2 | Local tests reproduced pause/resume edge cases: paused without `HANDOFF.json`, explicit markdown path pointing at `ROADMAP.md`, symlinked phase ancestors, relocated project roots, and `HANDOFF.json` path collisions. | Accepted as V14-019 |
| R2-C05 | Deleted implementation files were omitted from code-review and verify-work scope. | P2 | Summary `key_files` with `deleted`/`removed` actions did not trigger material code review for deleted implementation files. | Accepted as V14-020 |
| R2-C06 | Git fallback matching was too narrow for normal phase-scoped change commits. | P2 | Synthetic phase history with change-style commit subjects failed to feed code-review fallback scope before widening the commit subject pattern. | Accepted as V14-021 |
| R2-C07 | `--legacy-source` was a no-op migration flag and could make users think legacy imports were selected when they were not. | P2 | Direct migration CLI invocation accepted the flag without a source-family effect. | Accepted as V14-022 |
| R2-C08 | Canonical Auto refine, paper-improvement, and rebuttal artifacts were still classified as residue instead of importable phase-chain evidence. | P2 | Migration fixture with these canonical Auto files did not place them in the accepted evidence bucket. | Accepted as V14-023 |
| R2-C09 | Root-level Auto `EXPERIMENT_AUDIT.json` could act as a blocking claim gate instead of compatibility evidence during migration/attachment. | P2 | Root Auto audit fixture with a failing audit blocked supported result-to-claim/claim-gate payloads even when phase-local ljx evidence existed. | Accepted as V14-024 |
| R2-C10 | Paper/rebuttal/claim state pointers mixed absolute paths, omitted `PAPER_IMPROVEMENT_LOG`, and were harder to relocate or inspect. | P2 | State writer fixtures persisted absolute `artifactPath`/workspace paths; paper evidence did not track the Auto paper improvement log. | Accepted as V14-025 |
| R2-C11 | Prompt fidelity floors were incomplete for project-specific code-review rules, full Auto idea-discovery continuation, experiment audit independence, hard/nightmare review-loop mechanics, and paper-pipeline quality gates. | P2 | Generated preview prompts were compared against upstream GSD/Auto requirements and lacked explicit quality-preserving constraints, even though runtime routing was self-contained. | Accepted as V14-026 |
| R2-C12 | User-facing docs still used raw internal stage names in actionable routing examples. | P3 | `LJX-GSD-USER-SKILL-GUIDE.md` and extended command specs contained raw stage names in slots that look like commands. | Accepted as V14-027 |

## Rejected Or Watch Candidates

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Stale empty `.build` support directories | Rejected as implementation bug | Preview install regenerated correctly and no active raw upstream skill directory was installed; empty generated-output residue is not a runtime dependency. |
| Raw upstream strings inside `ljx-gsd/upstream-auto` archive | Rejected as runtime bug | Internal reference archive is allowed by v1.4 protocol when it is not installed as active top-level Codex skills and generated `ljx-GSD-*` prompts do not call it as raw skills. |
| Initial planned skill content parity as a separate finding | Covered by accepted prompt-fidelity and artifact-ledger findings | The parity check found no additional independent bug beyond V14-023, V14-025, and V14-026. |

