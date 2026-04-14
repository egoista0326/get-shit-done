# v1.4 Stage A Round 9 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** Round 9 confirmed P2 issues across artifact traceability, autonomous cleanup parity, config/CLI propagation, workspace path safety, lifecycle tuple validation, and quality-gate rerun state. The accepted issues were fixed and full verification passed, but the round cannot count as clean because P2 findings reset the Stage A clean streak.

## Scope Covered

- Artifact ledger and file traceability: root Auto `GPT54_AUTO_REVIEW.md`, unprefixed phase-local experiment results, direct execute adoption, and cross-consumer evidence parity.
- Prompt fidelity and capability preservation: upstream GSD milestone cleanup semantics in `ljx-GSD-autonomous`, source prompt raw paper-stage tokens, and ensuring cleanup is a self-contained `ljx-GSD-*` capability rather than prose.
- Config and variables: launch confirmation CLI flags, phase `workflow_overrides`, paper/rebuttal/claim restored Auto knobs, and uppercase legacy Auto aliases.
- Independent install/runtime closure: preview active-skill set, manifest equality, no compatibility skills, no deferred entries, no active top-level support roots, and no global upstream Auto/GSD runtime dependency.
- Runtime path safety: workspace-admin explicit `--path` containment under the configured workspace base and bytecode cleanup limited to managed internal support roots.
- Lifecycle and quality gates: final lifecycle command/routeKind tuple validation and code-review-fix clean-rerun state handling.
- Codex conversion: preview runtime `require()` smoke test and source-root leak scan for generated active skills and packaged runtime files.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-124 through V14-134.

## Key Root Causes

- Artifact readers had been expanded incrementally. That made individual consumers pass while shared artifact families still diverged between root Auto fallback, phase/dependency lookup, and direct lifecycle adoption.
- Earlier autonomous cleanup work preserved the milestone closure idea but not the actual maintenance command surface, so the system could be self-contained and still narrower than upstream GSD.
- Config normalization had too many entry points: project config, phase `config_overrides`, phase `workflow_overrides`, CLI flags, and legacy Auto uppercase aliases were not all backed by the same coverage.
- Some path-safety fixes were scoped to the first observed unsafe path. Workspace `--path` and preview bytecode cleanup needed the same self-contained-base discipline as other runtime helpers.
- Quality-gate sync code still had an ordering issue: old post-fix bookkeeping could run before a newer clean rerun result had a chance to clear it.
- Source prompt hardening was still relying on downstream sanitizers in a few places. Generated output was clean, but source strings should not keep avoidable raw upstream command tokens.

## Verification

- Targeted Round 9 suite passed: `node --test tests/cli-parser-contract.test.cjs tests/experiment-bridge-bridge.test.cjs tests/runtime-core.test.cjs tests/experiment-evidence-tools.test.cjs tests/workspace-admin-bridge.test.cjs tests/execute-phase-shell.test.cjs tests/code-review-fix-bridge.test.cjs tests/skill-build.test.cjs` with 207/207 passing.
- Docs contract passed: `node --test tests/docs-contract.test.cjs` with 16/16 passing.
- Full suite passed: `npm test` with 817/817 passing.
- Preview build passed: `npm run build:preview` produced 34 active `ljx-GSD-*` skills, including `ljx-GSD-cleanup`.
- Preview manifest/active-skill scan passed: active skills exactly matched manifest `built`, no non-`ljx-GSD-*` active skill dirs, 0 compatibility skills, 0 deferred entries, 0 `upstreamAutoSkills`, and no top-level `tools`, `templates`, or `mcp-servers` support roots.
- Preview raw-command scan passed: no actionable `$raw` or `/raw` upstream GSD/Auto command references in active generated `SKILL.md` files.
- Preview source-root leak scan passed: no `/tmp/codex-skill-repos` or `.planning/references/upstreams` references in active generated skills or packaged runtime files.
- Preview runtime `require()` smoke test passed for manifest, runtime core, lifecycle shell, and workspace-admin helper modules.
- `git diff --check` passed.

## Clean Decision

Not clean. Round 9 accepted P2 findings, so Stage A clean count remains 0.

## Next Round Focus

- Stage A Round 10 is the final regular-review round under the v1.4 cap unless it becomes the first of two clean rounds before the cap transition.
- Focus on remaining shared evidence consumers after the cleanup addition, especially research/paper/rebuttal artifact families that must be located, read, and resumed consistently.
- Re-check generated active skills after the new 34-skill preview surface, including `ljx-GSD-cleanup`, `ljx-GSD-autonomous`, and raw upstream command denial.
- Re-run config and variable propagation probes across project config, phase overrides, CLI overrides, and legacy Auto aliases with attention to Codex-only variable names.
- If Round 10 still finds P1/P2 issues, record `regular_capped_not_clean` and move to Stage B scenario review as required by the protocol.
