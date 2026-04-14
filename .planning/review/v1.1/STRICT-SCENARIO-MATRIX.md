# v1.1 Strict Scenario Matrix Addendum

**Date:** 2026-04-12
**Review:** Phase 20 / Round 04 strict addendum
**Base:** Extends `.planning/review/v1.1/SCENARIO-MATRIX.md`

## Expanded Scenarios

| ID | Scenario | Probe Surface | Pass Criteria | Bug Trigger |
|----|----------|---------------|---------------|-------------|
| X01 | Fresh preview install from repo-local upstream snapshots | `node bin/install.js --preview`; source-root tests | preview succeeds without external env roots and generated skills are self-contained | install requires unavailable global upstream checkout or silently skips skills |
| X02 | Manifest truth vs generated skill surface | `node bin/install.js --print-manifest`; preview skills directory | manifest bridge-ready list equals generated public surface and compatibility entries are intentional | generated skill missing from manifest or manifest claims absent skill |
| X03 | CLI parser rejects missing/empty required options | parser contract tests and helper CLIs | structured JSON stop, no raw stack, no accidental cwd fallback | empty `--cwd` mutates or discovers real project unexpectedly |
| X04 | Canonical config wins over legacy aliases | runtime-core alias tests | legacy aliases normalize only when canonical key absent | legacy alias overrides canonical nested key or is ignored where documented |
| X05 | Safe-mode experiment launch confirmation | experiment-bridge helper and generated skill | confirmation requirement is surfaced to Codex instructions and helper context | safe mode with `autoDeploy` can launch compute without explicit confirmation boundary |
| X06 | GSD engineering lifecycle does not skip review/verify | lifecycle-next/runtime-shell/verify tests | executed code-bearing phase routes through fresh code review before verify/next | stale or missing review treated as clean |
| X07 | Post-fix rerun policy remains authoritative | code-review-fix and verify tests | required/automatic/recommend rerun policies preserve intended routing | fix report makes verify pass without required rerun |
| X08 | Deleted or scope-drifted files invalidate review freshness | verify-work tests | deleted reviewed files and newer material scopes mark review stale | review remains fresh after material scope drift |
| X09 | Workstream mutations do not corrupt primary | workstreams tests | create/switch/complete use structured records and rollback on activation write failures | primary silently changes on failed secondary workstream mutation |
| X10 | Roadmap admin destructive operations stay bounded | roadmap-admin tests | remove refuses non-future/nested evidence cases and persists audit records | remove deletes active/completed/nested-evidence phase |
| X11 | Migration/cutover remains structured and non-destructive | migration/parity tests | root reports explanatory; structured records authoritative; conflicts/repair explicit | import silently overwrites authoritative state |
| X12 | Research pipeline stays inside GSD control plane | research-pipeline cutover tests and generated skill text | creates/proposes typed phase chain rather than hidden Auto control plane | root Auto pipeline artifacts become lifecycle truth |
| X13 | Idea/refine direct artifacts adopt honestly | lifecycle-next and research helper tests | accepted direct artifacts can advance only when exact phase-scoped evidence exists | near-miss/wrong-directory artifacts satisfy execution |
| X14 | Literature/novelty/research-review boundaries are honest | generated skill text and helper tests | external evidence limits are explicit; novelty/review artifacts phase-scoped | command claims exhaustive literature review without live evidence |
| X15 | Experiment evidence and claim gate stay linked | experiment evidence/result-to-claim/claim tests | result/claim readiness is evidence-bounded and stale judgments are visible | claim supported with missing/stale experiment evidence |
| X16 | Paper/rebuttal do not create second submission control plane | paper/rebuttal tests/docs | bounded workspaces and state links are used; venue/evidence constraints remain explicit | paper or rebuttal root artifacts override phase/state truth |
| X17 | Pause/resume and progress survive malformed handoff/state | runtime-shell tests | malformed handoff/state stops honestly and current phase remains stable | raw exception or stale resume pointer changes current phase |
| X18 | Generated skills preserve Codex adapter semantics | preview skill grep/static inspection | inherited GSD AskUserQuestion/Task behavior is adapted or helper-mediated | generated skill instructs unsupported Claude-only tool usage without Codex mapping |
| X19 | Preserved Auto companion skills remain discoverable | manifest/preview asset inspection | literature, analysis, training, paper helper routes are preserved or explicitly mapped | companion capability silently missing from installed preview |
| X20 | Global production cutover boundary remains explicit | docs/progress/final report | docs say in-repo preview is verified and global replacement is future decision | docs imply global installed skills were replaced when they were not |
| X21 | Per-skill prompt fidelity preserves task quality | representative generated skills vs upstream GSD/Auto skills/workflows | each representative skill still tells Codex how to perform the substantive task, plan/review/check outputs, and preserve upstream stage quality | skill only calls a helper and writes a thin artifact, losing upstream planning/review/execution instructions |
| X22 | Research prompt depth preserves Auto/ARIS quality | generated `idea-discovery`, `research-refine`, `experiment-*`, `review-loop`, `paper-*` prompts vs upstream Auto prompts | core stage sequence, evidence boundaries, reviewer independence, bounded loops, and output content requirements remain explicit | prompt omits critical Auto stages, thresholds, review criteria, or artifact content so result quality degrades |
| X23 | GSD lifecycle prompt depth preserves engineering quality | generated lifecycle/admin/review prompts vs upstream GSD workflows | discuss/plan/execute/review/admin prompts still require scoped context, plan artifacts, review gates, state sync, and safe mutation rules | prompt weakens GSD planning discipline or mutating-command safety even if helper routing passes |
| X24 | No capability deletion through thin prompts | representative generated skills vs upstream GSD/Auto skill bodies and workflow docs | a generated skill may adapt to Codex and helper-first state boundaries, but it must not drop the original skill's core task stages, review criteria, evidence requirements, quality gates, or artifact content obligations for capabilities it claims | skill runs without errors but produces materially lower-quality work because the prompt removed upstream GSD/Auto task detail |

## Strict Gate

Round 04 is not counted as clean because it fixed confirmed findings. After the user's clarification, the strict addendum must satisfy the same two-consecutive-clean-round rule. Rounds 05 through 11 each found and fixed confirmed issues, so the clean streak is still 0 at the 11-round cap. Final strict success is not achieved under the current protocol.

External API, GPU, or live literature calls are not required. For those scenarios, the passing behavior is an honest preparation/confirmation/evidence boundary, not a fake live result.
