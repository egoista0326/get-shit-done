# 08-01 Review: Discovery/Literature/Novelty/Refinement Command Family

## Result

Status: clean after 16 review rounds.

The requested multi-subagent review loop was extended from 10 to 20 rounds. It stopped early after Round 15 and Round 16 both returned clean across all review lanes.

Final blocker state after fixes: no accepted P0/P1/P2 findings remain open.

## Review Protocol

- Review lanes per round: lifecycle/GSD boundary, Auto/ARIS semantic preservation, security/path safety/side-effect policy, tests/maintainability/CLI contract.
- Main-agent rule: subagent candidate findings were second-pass confirmed before fixes.
- Stop rule: stop at two consecutive clean rounds or at 20 review rounds.
- Actual stop reason: two consecutive clean rounds in Round 15 and Round 16.

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
| 11 | not clean | Refinement evidence marker contract, refine-pipeline prompt-pack experiment handoff consistency | `bf76ebb`, `26bfd46` |
| 12 | not clean | Non-pipeline `research-first` mode leak, refine-pipeline marker coverage, production command-key source drift, brittle serialized-object assertions | `0047c82`, `674ff7f` |
| 13 | not clean | Refine-pipeline stop predicate prompt obligation, `danger-auto` audit artifact evidence requirement | `504d541`, `d49af45` |
| 14 | not clean | `danger-auto` invariant downgrade via config override, unknown command nested keys becoming effective, phase lookup order and CLI preset coverage | `93312e8`, `ca6a617` |
| 15 | clean | none | none |
| 16 | clean | none | none |

## Confirmed Fix Themes

- Added `/gsd-ljx-*` research command wrappers for literature, idea discovery, idea creation, novelty check, review, refinement, refinement pipeline, and research pipeline.
- Added a shared `gsd-ljx-research-command.md` workflow that routes through ordinary GSD lifecycle paths and forbids direct canonical state/roadmap writes.
- Removed raw shell argument interpolation from research intent ingress and made intent rendering untrusted-data-aware.
- Added `research compile`, `research index`, and `research evidence-check` helper surfaces.
- Added separate `.planning/research.config.json` loading with safe/auto/danger-auto presets, deep defaults, strict mode, preset parameter propagation, and non-effective quarantine handling.
- Preserved source selector semantics including `zotero`, `obsidian`, `local`, `web`, `deepxiv`, and `all`; Semantic Scholar is folded into `web` and `deepxiv` remains explicit policy.
- Added phase-local `research/RESEARCH_INDEX.md` ledger scaffolding and evidence checks with `clean`, `incomplete`, and `blocked` statuses.
- Added raw review evidence, refinement upstream context, and refinement-pipeline experiment handoff artifact requirements.
- Added refinement completion markers for problem anchor, round logs, reviewer responses, score, verdict, and stop predicate.
- Enforced `research-first` as `research-pipeline`-only; non-pipeline research commands remain phase-insert intent.
- Added `danger-auto` phase-local audit artifact requirements without executing external side effects.
- Clamped `danger-auto` hard invariants so config overrides cannot disable audit artifacts or downgrade side-effect policy.
- Normalized command-specific research config so unknown nested keys warn and remain non-effective by default.
- Hardened parameter merge against prototype pollution and invalid mode fallback.
- Updated Phase 07 parity scenario expectations so `/gsd-ljx-*` wrappers are allowed only when prefixed and routed through the shared GSD lifecycle workflow.

## Verification After Final Fix

Commands passed after the Round 14 fix and before the Round 15/Round 16 clean reviews:

```text
node --test tests/research-config.test.cjs tests/research-compiler-discovery.test.cjs tests/research-artifacts.test.cjs tests/research-evidence.test.cjs
48 tests, 48 pass, 0 fail
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

08-01 now has two consecutive clean multi-subagent review rounds after the final accepted fix. Residual scope is limited to later Phase 08 plans: experiment/audit/result/claim commands, paper/rebuttal command families, and any future live external side-effect execution. 08-01 remains bridge-only for external side effects.
