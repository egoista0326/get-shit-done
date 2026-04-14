# v1.3 Stage 1 Round 2 Candidates

**Round:** Stage 1 Round 2
**Status:** completed after fixes
**Verdict:** fixed_not_clean
**Clean-count rule:** `.planning` review/accounting updates are ignored for clean count unless they change skill behavior, generated install output, runtime routing, or verification reliability.

## Review Inputs

- Fresh preview install after Round 1 fixes.
- Subagent reviews:
  - Parfit: generated install surface, self-contained scans, prompt quality for complete/pause/resume/fix/claim/rebuttal/plan.
  - Goodall: runtime/path safety around pause/resume, symlink handling, roadmap admin, migration, workstreams.
  - Jason: upstream GSD/Auto prompt fidelity for research-pipeline, verify-work, complete/pause/fix/workstreams/experiment/review/paper/rebuttal.
  - Boole: original planned skill surface parity, complete-milestone, workspace/workstream boundary, managed upstream Auto inventory policy.
- Local repros for confirmed resume cleanup path issues.
- Targeted and full test runs after fixes.

## Confirmed Candidates

| ID | Candidate | Severity | Confirmation | Clean impact | Fix status |
| --- | --- | --- | --- | --- | --- |
| V13-023 | `resumeFromHandoff` could delete arbitrary regular files under `.planning` when `HANDOFF.json` forged `handoff_markdown_path_abs`. | P1 | Local repro deleted `.planning/ROADMAP.md` before the fix; helper returned `resumed: true`. | fail | fixed |
| V13-024 | `resumeFromHandoff` could delete project-external files through a symlinked phase ancestor. | P1 | Local repro using `.planning/phases/03-link -> /tmp/outside` deleted `/tmp/outside/.continue-here.md` before the fix. | fail | fixed |
| V13-025 | `ljx-GSD-research-pipeline` proposal did not preserve Auto research policy/handoff controls. | P2 | Jason compared helper output to Auto requirements and found missing auto-proceed, human-checkpoint, reviewer difficulty/model, score/round stops, top-idea gate, GPU budget, and graceful-failure handoff fields. | fail | fixed |
| V13-026 | `ljx-GSD-resume-work` lacked an explicit prompt-quality floor for upstream resume depth. | P3 hardening | Parfit marked needs-more-evidence; the generated prompt had helper restoration instructions but the build contract did not lock resume-project fidelity. | no extra clean reset because Round 2 already failed | fixed |

## Rejected Or Needs More Evidence

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Raw GSD/Auto calls in generated Round 2 preview | rejected | Parfit and build tests found no raw upstream skill invocations in generated `ljx-GSD-*` skills. |
| `ljx-GSD-complete-milestone` still missing or not self-contained | rejected | Boole confirmed manifest/docs/generated skill parity and self-contained routing. |
| Workspace/workstream boundary dishonest in static docs/prompt | rejected for static review | Boole confirmed the static boundary is explicit; Stage 2 still needs a live physical-workspace request scenario. |
| Managed upstream Auto library as top-level support inventory | needs policy evidence | Existing design permits managed support/reference inventory while forbidding `ljx-GSD-*` prompts from calling raw Auto; product policy would be needed to hide it completely. |
| `ljx-GSD-verify-work` compresses UAT/goal-backward verification | needs Stage 2 evidence | Prompt floor is acceptable statically, but live engineering UAT should prove it does not collapse to summary-only verification. |
| Pause handoff git status edge cases | needs-more-evidence | No injection or confirmed normal-use bug found; future hardening can add quoted/renamed path coverage. |
