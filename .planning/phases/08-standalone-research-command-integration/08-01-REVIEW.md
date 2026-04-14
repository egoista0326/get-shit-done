# 08-01 Review: Discovery/Literature/Novelty/Refinement Command Family

## Result

Status: capped after 10 review rounds.

The requested multi-subagent review loop ran through the 10-round cap. It did not achieve two consecutive clean rounds because Round 10 produced confirmed P2 findings. The confirmed Round 10 findings were fixed immediately after the cap and verified with focused and full test runs, but no Round 11 was run.

Final known blocker state after fixes: no accepted P0/P1/P2 findings remain open.

## Review Protocol

- Review lanes per round: lifecycle/GSD boundary, Auto/ARIS semantic preservation, security/path safety/side-effect policy, tests/maintainability/CLI contract.
- Main-agent rule: subagent candidate findings were second-pass confirmed before fixes.
- Stop rule: stop at two consecutive clean rounds or at 10 review rounds.
- Actual stop reason: 10-round cap reached.

## Round Accounting

| Round | Result | Accepted findings | Fix commits |
| --- | --- | --- | --- |
| 1 | not clean | Evidence/artifact gaps, raw argument shell risk, non-effective config leak, directory evidence false positive | `35a0708`, `3299025` |
| 2 | not clean | Predictable temp file, prompt-injection intent rendering, source selector semantics | `f685d14`, `85ffa89` |
| 3 | not clean | Heredoc breakout, index ledger too shallow, raw review evidence gaps, refinement upstream context gaps | `a7e9770`, `aef5548` |
| 4 | clean | none | none |
| 5 | not clean | Shallow `source_policy` merge, danger-auto audit/override policy not propagated | `03fa30c`, `bf43c76` |
| 6 | not clean | Dry-run index preview omitted content, invalid mode fallback, preset overrides ignored, prototype pollution risk | `f9c6432`, `eb12324` |
| 7 | not clean | Preset-level source parameters not propagated | `24af475`, `48bce5c` |
| 8 | not clean | Evidence check flattened blocked status into incomplete | `a7bd1a7`, `d236bb6` |
| 9 | not clean | Plan security contract gaps, stale Phase 07 scenario assertion, symlink/path escape blocked semantics, strict mode, refine-pipeline experiment handoff | `a09bca7`, `e0055e1` |
| 10 | not clean | Nested strict-mode config keys, brittle exact overlay command list test | `b408ff2`, `2df3a8b` |

## Confirmed Fix Themes

- Added `/gsd-ljx-*` research command wrappers for literature, idea discovery, idea creation, novelty check, review, refinement, refinement pipeline, and research pipeline.
- Added a shared `gsd-ljx-research-command.md` workflow that routes through ordinary GSD lifecycle paths and forbids direct canonical state/roadmap writes.
- Removed raw shell argument interpolation from research intent ingress and made intent rendering untrusted-data-aware.
- Added `research compile`, `research index`, and `research evidence-check` helper surfaces.
- Added separate `.planning/research.config.json` loading with safe/auto/danger-auto presets, deep defaults, strict mode, preset parameter propagation, and non-effective quarantine handling.
- Preserved source selector semantics including `zotero`, `obsidian`, `local`, `web`, `deepxiv`, and `all`; Semantic Scholar is folded into `web` and `deepxiv` remains explicit policy.
- Added phase-local `research/RESEARCH_INDEX.md` ledger scaffolding and evidence checks with `clean`, `incomplete`, and `blocked` statuses.
- Added raw review evidence, refinement upstream context, and refinement-pipeline experiment handoff artifact requirements.
- Hardened parameter merge against prototype pollution and invalid mode fallback.
- Updated Phase 07 parity scenario expectations so `/gsd-ljx-*` wrappers are allowed only when prefixed and routed through the shared GSD lifecycle workflow.

## Verification After Final Fix

Commands passed after the Round 10 fix:

```text
node --test tests/research-config.test.cjs tests/research-compiler-discovery.test.cjs tests/research-artifacts.test.cjs tests/research-evidence.test.cjs
35 tests, 35 pass, 0 fail
```

```text
node --test tests/foundation-boundaries.test.cjs tests/core-lifecycle-planning-parity.test.cjs tests/core-review-workspace-git-parity.test.cjs tests/core-gsd-parity-scenario.test.cjs
28 tests, 28 pass, 0 fail
```

```text
rg '\$\{ARGUMENTS\}|Arguments: \$ARGUMENTS|GSD_RESEARCH_INTENT|gsd-ljx-research-intent\.txt|phase_type|code_review_requirements_by_phase_type' commands/gsd/gsd-ljx-*.md get-shit-done/workflows/gsd-ljx-research-command.md get-shit-done/bin/lib/research-*.cjs || true
no matches
```

```text
git diff --check
passed
```

```text
node get-shit-done/bin/gsd-tools.cjs state validate --cwd "$PWD"
valid true, warnings [], drift {}
```

```text
node get-shit-done/bin/gsd-tools.cjs validate health --cwd "$PWD"
healthy; only expected info about missing Phase 08 summaries before this summary was written
```

## Residual Risk

The loop stopped because the 10-round cap was reached, not because two consecutive clean rounds were achieved after the final fix. The final accepted findings were fixed and tests are green, but there was no post-fix Round 11 subagent review.

