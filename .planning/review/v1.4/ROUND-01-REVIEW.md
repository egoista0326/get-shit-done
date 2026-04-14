# v1.4 Stage A Round 1 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** The round found P1/P2 implementation issues, so it cannot count as clean even though fixes now verify.

## Scope Covered

- Independent install/runtime closure: active skill surface, support asset layout, unmanaged upstream coexistence.
- Prompt fidelity: generated skill floors for Auto experiment-audit quality and preserved base Auto skill archive.
- Artifact traceability: Auto experiment, review, claim, and paper outputs in migration/evidence ledgers.
- Config/variables: `research_stage_handoff`, legacy aliases, paper defaults, direct helper CLI overrides, autonomous profile policy.
- Codex conversion: current `hooks.json`, supported hook events, hook stdin `cwd`, installed path quoting.
- Lifecycle/workstreams/migration: raw route override rejection, installed helper safe actions, blocked mutation context.

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-001 through V14-015.

## Verification

- `node bin/install.js --preview` passed.
- `node --test tests/runtime-core.test.cjs tests/review-loop-bridge.test.cjs tests/experiment-bridge-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/migration-cutover.test.cjs tests/workstreams-bridge.test.cjs tests/source-roots.test.cjs tests/parity-cutover.test.cjs tests/skill-build.test.cjs` passed with 199/199 tests.
- `node --test tests/*.test.cjs` passed with 723/723 tests.

## Next Round Focus

- Re-run the self-contained install scan after the base Auto archive change.
- Check generated `ljx-GSD-*` prompts for any hidden dependency on archived raw skills.
- Pressure-test config/CLI/hook propagation with fresh fixtures rather than relying only on updated regression tests.
- Confirm artifact lookup paths cover root Auto artifacts and phase-local ljx-GSD artifacts without making Auto root files authoritative control-plane state.
