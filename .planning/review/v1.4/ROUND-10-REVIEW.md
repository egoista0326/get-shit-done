# v1.4 Stage A Round 10 Review

**Status:** fixed_not_clean; Stage A regular review cap reached
**Clean count after round:** 0
**Reason:** Round 10 confirmed one P1 and multiple P2 issues across cleanup/autonomous parity, Auto prompt recovery quality, artifact traceability, config/CLI propagation, milestone closure, code-review model use, and lifecycle evidence handling. The accepted issues were fixed and targeted verification passed, but the round cannot count as clean because P1/P2 findings reset the Stage A clean streak. Because Round 10 is the Stage A cap, the next step is Stage B scenario review.

## Scope Covered

- Independent runtime and install closure: 34-skill preview rebuild, manifest/active-skill equality, no compatibility skills, no deferred entries, no `upstreamAutoSkills`, no top-level support roots, and no raw upstream GSD/Auto skill calls in active generated skills.
- Prompt fidelity and capability preservation: cleanup/autonomous milestone lifecycle, complete-milestone self-audit, code-review reviewer model precedence, Auto refine/review/paper recovery state, idea-discovery portfolio checkpoints, and peer-reviewed/preprint classification.
- Artifact ledger and file traceability: symlink-resistant direct Auto-like artifact evidence, root paper/rebuttal context gating, migration known-artifact coverage, result-to-claim Auto tracker/contract/finding context, and legacy root paper plan/draft context.
- Config and variables: autonomous external-service safety defaults, phase-chain CLI flags, and `workflow_overrides.reviewer_difficulty`.
- Lifecycle gates: code-review-fix selected-finding preservation after structured state sync, unprefixed experiment-plan execute prerequisites, and single-dash flag rejection in direct gate helpers.
- Codex conversion: no `audit_missing`, stale cleanup, stale raw-upstream, or optional portfolio-state prompt strings in generated active skills.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-135 through V14-153.

## Key Root Causes

- Stage A kept finding issues because the remaining defects were mostly cross-surface parity bugs: source prompt, generated preview, helper context, migration inventory, runtime config, and docs could each be correct in isolation while one sibling path still lagged.
- Auto Research in Sleep carries durable recovery behavior in prompts and artifacts, not only in helper commands. The bridge initially preserved the ability to write state but sometimes phrased that state as optional, which would reduce task quality even if the command ran.
- Artifact names expanded incrementally across migration, context readers, evidence readers, lifecycle adoption, and resume paths. Round 10 tightened more of the shared artifact family instead of treating each consumer separately.
- GSD lifecycle parity includes support commands and their default behavior, not only the main discuss/plan/execute sequence. Cleanup and complete-milestone needed to be self-contained commands with upstream-equivalent behavior.
- Config and CLI keys had too many ingress points. Project config, phase overrides, workflow overrides, and CLI flags need shared regression coverage because fixing one entry point does not prove the others.

## Verification

- Skill-build suite passed: `node --test tests/skill-build.test.cjs` with 62/62 passing.
- Targeted Round 10 suite passed: `node --test tests/runtime-core.test.cjs tests/cli-parser-contract.test.cjs tests/code-review-fix-bridge.test.cjs tests/execute-phase-shell.test.cjs tests/migration-cutover.test.cjs tests/result-to-claim-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/phase-context.test.cjs tests/research-pipeline-cutover.test.cjs` with 218/218 passing.
- Docs contract passed: `node --test tests/docs-contract.test.cjs` with 16/16 passing.
- Full suite passed: `npm test` with 828/828 passing.
- Preview build passed: `npm run build:preview` produced 34 active `ljx-GSD-*` skills.
- Preview manifest/active-skill scan passed: active skills exactly matched manifest `built`, no non-`ljx-GSD-*` active skill dirs, no top-level `tools`, `templates`, or `mcp-servers`, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Preview raw/stale prompt scan passed: no `most recently completed milestone`, `$ljx-GSD-cleanup <version>`, `audit_missing`, `if richer recovery is useful`, optional portfolio-state policy, or actionable raw upstream GSD/Auto skill invocation in active generated `SKILL.md` files.
- Preview positive prompt scan passed for portfolio-state checkpoint language, recovery-state floors, self-contained audit/closure, peer-reviewed/preprint classification, paper improvement state, preserved PDFs, overfull hbox handling, and code-review reviewer model precedence.
- `git diff --check` passed.

## Clean Decision

Not clean. Round 10 accepted P1/P2 findings, so Stage A clean count remains 0. Stage A has now reached its 10-round cap without two consecutive clean rounds and is recorded as `regular_capped_not_clean`.

## Next Stage Focus

- Start Stage B Round 1 scenario review.
- Use temporary scenario workspaces and clean them after each scenario batch.
- Require every scenario subagent to use only `ljx-GSD-*` skills from the generated preview/install surface and to report the exact skill chain, artifacts read/written, config values observed, raw upstream skill usage, stop points, and cleanup status.
- Cover full engineering, full research, result analysis and claim judgment, Auto artifact import/lookup, pause/resume, workstreams/workspaces, autonomous/safe config switching, code-review fix/verify, paper/rebuttal, and external dependency poison scenarios.
