# v1.3 Stage 1 Round 3 Candidate Findings

**Round:** Stage 1 Round 3
**Date:** 2026-04-12
**Scope:** post-Round-2 static/implementation re-review after regenerating the preview install.
**Clean-count rule:** `.planning` accounting updates are ignored for clean counting unless they expose skill behavior or verification unreliability.

## Review Inputs

- Turing: runtime/path safety, resume/pause transactionality, workstream context.
- Gibbs: prompt-fidelity and Auto/GSD quality-preservation depth.
- Lagrange: generated-surface self-containment and Claude-to-Codex conversion.
- McClintock: original planned skill content parity.
- Ampere: regression coverage against V13-023 through V13-026.

## Accepted Findings

| Candidate | Severity | Disposition | Evidence | Fix Direction |
| --- | --- | --- | --- | --- |
| Research-pipeline `HUMAN_CHECKPOINT=false` did not flow into review-loop handoff. | P2 | accepted as V13-027 | Gibbs reproduced `--no-human-checkpoint`: proposal top-level policy was false, but `researchPolicy.reviewLoop.humanCheckpoint` and `analysis.stageHandoff.reviewLoop.humanCheckpoint` remained true. | Mirror legacy/CLI human-checkpoint controls into `research.review_loop.human_checkpoint` unless an explicit nested value exists. |
| Research-pipeline apply dropped `stageHandoff` policy metadata when creating phases. | P2 | accepted as V13-028 | Proposal/operation objects carried `stageHandoff`, but `applyResearchPipelineProposal` called `mutateRoadmap` with only structural fields; created phase records were generic. | Pass sanitized stage-handoff metadata through roadmap-admin and persist it on created phase records. |
| Resume helper still lacked helper-level STATE reconstruction/checkpoint/incomplete-plan discovery. | P2 | accepted as V13-029 | Round 2 prompt floor said resume should restore upstream depth, but `resumeFromHandoff` returned generic progress when `STATE.md` was missing and did not surface phase `.continue-here*` or PLAN-without-SUMMARY discovery. | Add resume-discovery scanning and structured `state_reconstruction_required` output. |
| Pause/resume cleanup rollback could leave partially consumed handoff files on compound FS cleanup failures. | P3 | accepted as V13-030, minor/no extra reset | Turing showed resume could delete markdown then fail JSON cleanup and only restore `STATE.md`; pause rollback did not report residual cleanup failures. | Capture handoff file snapshots and restore/report residual cleanup failures during rollback. |

## Rejected Or Watch Candidates

| Candidate | Disposition | Reason |
| --- | --- | --- |
| V13-023/V13-024 resume cleanup path-safety regressions still open. | rejected | Turing confirmed stored markdown path validation now requires `.continue-here.md`, safe realpath containment, and the regression tests preserve `ROADMAP.md` and project-external symlink targets. |
| Workstream context is lost during normal pause/resume. | rejected | Turing confirmed `active_workstream` and pointer source are recorded and resume blocks until the recorded workstream is active. |
| Generated `ljx-GSD-*` prompts call raw GSD/Auto skills. | rejected | Lagrange and local scans found no callable raw `$gsd-*`, raw Auto `$skill`, or raw slash command use in generated `ljx-GSD-*` prompts. |
| Managed upstream Auto skill library remains installed as top-level skills. | watch / policy evidence | Lagrange and McClintock found this active-surface exposure, but no `ljx-GSD-*` prompt calls it. Treat as product-policy risk and Stage 2 scenario guard, not a confirmed internal self-containment bug in Round 3. |
| Self-contained scanner over-reports negative prose such as "do not call raw X." | watch | The strict scanner may force less explicit safety prose, but it does not create runtime behavior loss. |
| Task/AskUserQuestion Codex adapter exact schema needs live runtime confirmation. | watch | Generated adapter is consistent with current Codex tool names, but Stage 2 live scenario transcripts should continue checking actual subagent/request-user-input chain behavior. |
| Git status parsing for quoted/renamed pause handoff paths. | needs-more-evidence | Turing did not complete a normal-use repro. Existing parser is a coverage candidate, not a confirmed Round 3 bug. |
| Every research-pipeline operation should have non-null `stageHandoff`. | covered by accepted fix | Ampere suggested this as optional coverage; V13-028 persists stage handoff into created phase records and the targeted tests lock the critical path. |
