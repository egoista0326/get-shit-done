---
phase: 12-complete-paper-and-rebuttal-workflows
type: review-verify
status: in_progress
baseline_commit: 0a1c16a
current_review_start: whole-repo-after-followup-fix-a751744
clean_rounds_required: 2
clean_rounds_after_latest_fix: 0
requirements:
  - IMPL-06
---

# Phase 12 Review And Verification

## Purpose

Phase 12 is not complete until two consecutive comprehensive review/verify rounds after the latest fix report no findings.

This file is the rubric and audit trail for the review loop. Per the 2026-04-11 scope clarification, the two clean rounds must cover the current whole `ljx-gsd` repository, not only the Phase 12 diff.

## Review Rubric

Every review round must evaluate these angles:

1. Planned skill content and logic: generated `ljx-GSD-paper-pipeline` and `ljx-GSD-rebuttal` must match the original Phase 12 context, research, and plans.
2. Scenario correctness: helper commands and generated skills must behave correctly for no state, existing paper state, existing rebuttal state, malformed payloads, missing review artifacts, workspace resume, follow-up, venue-limit uncertainty, and installed-skill runtime.
3. Common scenarios: reviewers must focus on the likely user paths first, especially paper drafting after claim/evidence review, rebuttal from raw reviews, rebuttal resume from `rebuttal/`, and paste-ready finalization with venue constraints.
4. GSD and Auto alignment: the implementation must preserve Auto paper-writing and rebuttal stage semantics while using GSD-style explicit state helpers, lifecycle truth, and generated skill routing.
5. Minimal modification: do not delete or weaken existing GSD/Auto behavior; add link/writer layers only where needed for integration.
6. Bug and error review: check for crashes, unsafe state writes, bad type handling, incorrect path handling, hidden side effects during context reads, lifecycle truth drift, and failing verification commands.
7. Redundancy review: check for duplicated helper logic, duplicated generated skill prose that can drift, repeated tests without added coverage, and unnecessary new control planes.
8. Efficiency review: helper code should remain lightweight, avoid unnecessary filesystem writes, avoid repeated expensive scans, and keep install/generation behavior simple.
9. Skill surface review: generated skill text must mention the correct explicit writer commands, bounded workspaces, required Auto stages, venue/evidence constraints, and must not instruct direct writes into `.planning/state`.
10. Test adequacy: automated tests must cover the above behaviors and include focused tests plus full `npm test`; review must also inspect whether tests are proving the intended behavior rather than only snapshots.

## Required Review Process

1. Spawn focused subagents by review angle. If subagent capacity is limited, run multiple batches rather than broadening prompts.
2. If any subagent reports a finding, spawn a separate verifier subagent for that finding or finding group.
3. The verifier must confirm whether the issue is real, cite concrete files/commands, and propose a fix plan grounded in existing GSD or Auto patterns.
4. The main agent makes the final call, integrates related fixes, and may delegate independent file-disjoint fixes to subagents.
5. After every fix, run focused checks plus full verification, commit the fix, and reset `clean_rounds_after_latest_fix` to `0`.
6. Only a review round after the latest fix with no findings increments `clean_rounds_after_latest_fix`.
7. Phase 12 passes only when `clean_rounds_after_latest_fix` reaches `2`.

## Current Scope

Scope override: review the current whole `ljx-gsd` repository after every latest fix. Phase 12 is still the active gate because it introduced the paper/rebuttal slice, but clean-round credit requires whole-repo confidence across runtime helpers, generated skills, docs/state, install output, tests, and GSD/Auto preservation.

The whole-repo review must include at least:

- runtime helper logic across `bin/lib/*.cjs` and CLI entry points
- generated and preserved skill content, including preview install output
- `.planning/` docs, roadmap, state, requirements, and phase artifacts
- scenario behavior for common lifecycle, research, paper, rebuttal, workstream, and admin paths
- GSD/Auto reuse, minimal-modification compliance, redundancy, and efficiency

Also review all Phase 12 changes since `0a1c16a`, especially:

- `bin/lib/ljx-paper-evidence-tools.cjs`
- `bin/lib/ljx-paper-pipeline-tools.cjs`
- `bin/lib/ljx-rebuttal-tools.cjs`
- `bin/lib/codex-conversion.cjs`
- `bin/lib/build-skills.cjs`
- `tests/paper-evidence-tools.test.cjs`
- `tests/paper-pipeline-bridge.test.cjs`
- `tests/rebuttal-bridge.test.cjs`
- `tests/skill-build.test.cjs`
- `tests/lifecycle-next.test.cjs`
- `tests/execute-phase-shell.test.cjs`
- `.planning/phases/12-complete-paper-and-rebuttal-workflows/12-*.md`

## Round Log

### Pre-rubric Review

Earlier review after `713ed76` found and fixed:

- Non-object paper/rebuttal payloads were accepted.
- Directory review artifacts could bypass missing-review stop.
- Venue confirmation predicate was too permissive.
- Rebuttal evidence-sprint generated wording did not align with experiment-bridge input semantics.
- Paper-illustration generated wording looked mandatory although Auto makes it conditional.
- Missing-review stop branch lacked shared paper context.
- Paper/rebuttal did not expose Phase 11 experiment evidence and claim context.
- Historical Phase 12 markdown diff had trailing whitespace.

Fixes were committed through `36478c3`.

### Clean Round 1

Status: findings confirmed and fixes applied; clean-round counter remains 0.

Findings confirmed by independent verifier agents:

- Malformed `rebuttal` workspace path as a regular file caused `readPaperPipelineContext()` and `readRebuttalContext()` to throw `ENOTDIR` during read-only artifact-link construction.
- Active fresh-build `$paper-writing` install used the top-level Auto source instead of the Codex overlay source, dropping the conditional `$paper-illustration` Auto stage.
- Active fresh-build `$rebuttal` install preserved the legacy silent Bash heredoc large-file fallback.
- `.planning/STATE.md` and the roadmap progress mirror still described Phase 12 as ready for discussion even though implementation artifacts existed and review/verify was underway.
- Related defensive handling gap: a directory at `.planning/HANDOFF.json` caused inline resume to throw `EISDIR` instead of stopping honestly.

Fix plan accepted:

- Treat `ENOENT` and `ENOTDIR` as missing artifact links for paper/rebuttal context reads.
- Harden rebuttal workspace file checks through one `statSync` try/catch helper.
- Treat `EISDIR` and `ENOTDIR` handoff reads as missing structured handoff data.
- Use the Codex overlay `SKILL.md` only for the active `paper-writing` source to preserve the conditional illustration stage without broadly changing unrelated Auto skills.
- Broaden legacy large-file fallback rewriting for active Auto skills while keeping legitimate heredoc examples untouched.
- Update human-readable STATE/ROADMAP mirrors without marking Phase 12 or IMPL-06 complete.

### Post-Round-1 Follow-Up Findings

Status: findings confirmed; fixes applied in working tree; clean-round counter remains 0 until committed and re-reviewed.

Findings confirmed by independent verifier agents:

- `.planning/STATE.md` frontmatter reported `completed_plans: 41`, but the human-readable metrics section still reported `Total plans completed: 38`.
- `readRebuttalContext()` still allowed a regular file at `rebuttal` to pass as a runnable rebuttal workspace when a root review source such as `EXTERNAL_REVIEWS.md` or `REVIEWS_RAW.md` existed; the next nested workspace write would fail with `ENOTDIR`.

Fix plan accepted:

- Keep paper evidence and paper pipeline behavior unchanged: malformed rebuttal artifact paths remain read-only missing artifacts there.
- Add a rebuttal-flow-only workspace root directory check before enabling downstream rebuttal tools or state writes.
- Preserve shared paper/evidence context and review source paths on the stop result, but return `invalid_rebuttal_workspace_path` and no advanced direct tools.
- Add regression coverage for missing reviews plus malformed workspace, root `EXTERNAL_REVIEWS.md` plus malformed workspace, root `REVIEWS_RAW.md` plus malformed workspace, and `writeRebuttalState()` refusal.
- Reconcile the `STATE.md` human-readable completed-plan metric with the frontmatter count.

### Whole-Repo Round 1 After `a751744`

Status: findings confirmed by primary reviewers and independently verified; the repair patch has passed focused regression, preview install, and full `npm test`. Clean-round counter remains 0 until the fix commit is re-reviewed.

Confirmed findings:

- Malformed `.planning/phases` as a regular file caused runtime context readers to surface low-level `ENOTDIR` behavior instead of a structured stop.
- `.planning/state/claims` or `.planning/state/papers` as a regular file caused state writers to throw low-level `EEXIST` behavior.
- Claim-state writer helpers accepted non-object payloads through object spread semantics instead of rejecting malformed inputs.
- Preview/install could delete user-created deferred `ljx-GSD-*` skills on reinstall because deferred manifest entries were treated like previously managed output.
- Preview/install could write through symlinked skill directories before checking path ownership.
- Missing `--target-dir` values could fall back to the real install target instead of failing closed.
- Missing `--cwd` values in helper CLIs caused raw TypeErrors instead of user-facing argument errors.
- Public docs still advertised not-installed or deferred commands as ordinary active skills and top-level status mirrors still looked Phase-12-local rather than whole-repo-gated.

Accepted fix plan:

- Add structured malformed-path guards in the shared runtime/state helpers and map them through `progress`, `next`, and phase-context readers.
- Add narrow claim payload validation for the current claim writer surfaces; keep adjacent idea/refine/review-loop payload hardening as backlog unless later review finds an active crash or corruption path.
- Preserve raw upstream Auto assets as reference material instead of sanitizing them destructively; add explicit installed reference README and manifest roles so they are not mistaken for active skill instructions.
- Harden install path handling for missing `--target-dir`, symlinked managed skill paths, and user-created deferred skills without removing deferred capability records from the manifest.
- Patch only the highest-risk missing `--cwd` parser surfaces now; broader CLI parser consolidation remains backlog to avoid widening this fix beyond confirmed findings.
- Update docs/status to reflect whole-repo review/verify gating without marking Phase 12 or IMPL-06 complete.

### Clean Round 2

Status: pending; must be a whole-repo round after the latest follow-up fix commit.
