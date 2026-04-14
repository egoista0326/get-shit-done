# v1.1 Round 08 Expanded Review

**Date:** 2026-04-12
**Scope:** Fresh post-Round07 review lane focused on lifecycle, quality gates, code-review, verify, prompt quality, and false-clean risks.
**Status:** Not clean; confirmed issues fixed; clean streak remains 0.

## Review Inputs

- Current implementation after Round 07 fixes.
- User-added constraint: do not only check that flows run; verify that specific prompts preserve GSD/Auto task quality and do not delete upstream capabilities.
- User-added constraint: keep Claude Code -> Codex conversion conformance in scope, including file paths, hooks, MCPs, and Codex interface vocabulary.
- Files requested for the read-only Round08 lane:
  - `bin/lib/ljx-lifecycle-shell-tools.cjs`
  - `bin/lib/ljx-quality-gates-tools.cjs`
  - `bin/lib/ljx-code-review-tools.cjs`
  - `bin/lib/ljx-verify-tools.cjs`
  - `bin/lib/ljx-bridge-contract.cjs`
  - related tests

## Review Lanes

| Lane | Result |
|------|--------|
| Lifecycle and post-execute routing | Rechecked material code-change routing, phase-type routing, and pending clean-round gate behavior; no new separate lifecycle bug beyond shared scope/rerun findings. |
| Code-review scope | Confirmed flat `key_files` summary lists could be dropped, causing scope loss. Existing fail-closed git fallback behavior held. |
| Verify freshness and stale scope | Confirmed verify freshness watched only the latest summary while review scope merged all summaries. |
| Quality-gate false clean pass | Confirmed stale persisted ready verification state and mixed `None.` + bullet sections could create false clean/ready behavior. |
| Post-fix rerun policy | Confirmed `recommend` still routed too easily to verify-work instead of requiring a code-review rerun recommendation. |
| Prompt fidelity | Confirmed official Codex `auto-review-loop` still needed an explicit direct repo/results/log reviewer-difficulty floor. |
| Experiment claim evidence | Confirmed a result-to-claim staleness issue around `claims`; the Round 08 interpretation was later superseded by BUG-071 in Round 09. |

## Confirmed Findings

| ID | Severity | Finding | Confirmation | Fix |
|----|----------|---------|--------------|-----|
| BUG-052 | P2 | Flat `key_files:` summary lists could be ignored. | Regression showed flat lists were not extracted by `extractSummaryKeyFiles()`. | Added flat-list parsing and bridge-contract coverage. |
| BUG-053 | P2 | Stale persisted verification ready state could override current blockers. | Verification sync allowed old ready state to survive a current stale-code-review preflight blocker. | Current blockers now override stale ready state and route review blockers to code-review. |
| BUG-054 | P2 | Verify freshness watched only the latest phase summary. | Code-review and verify used different phase-summary scope breadth. | Verify/state freshness now merges all phase summaries. |
| BUG-055 | P2 | Post-fix `recommend` policy still allowed verify-work too soon. | Bridge/quality-gate policy differed from the strict post-fix rerun contract. | `recommend` routes to code-review and persists as blocked `rerun_recommended`. |
| BUG-056 | P2 | `None.` markers could mask real bullet findings. | Mixed marker/bullet artifacts were counted as empty or non-fixable. | Section counters and fixable-finding extraction now count real bullets. |
| BUG-057 | P1/P2 | Official Codex `auto-review-loop` prompt could miss direct evidence inspection. | Existing injection skipped because `REVIEWER_DIFFICULTY` existed without the direct repo/results/log floor. | Added preserved reviewer-difficulty quality floor. |
| BUG-058 | P2 | `claims` staleness handling around result-to-claim needed correction. | Round 08 interpreted `claims` as downstream-only. | Superseded by BUG-071 in Round 09, which reintroduced `claims` as a freshness input after stricter review. |

## Verification After Fixes

Commands run after Round 08 fixes:

- `node --check bin/lib/ljx-bridge-contract.cjs && node --check bin/lib/ljx-verify-tools.cjs && node --check bin/lib/ljx-quality-gates-tools.cjs`
- `node --test tests/bridge-contract.test.cjs tests/code-review-fix-bridge.test.cjs tests/verify-work-bridge.test.cjs`
- `node --test tests/runtime-shell.test.cjs`
- `node --test tests/execute-phase-shell.test.cjs tests/lifecycle-next.test.cjs tests/research-pipeline-cutover.test.cjs`
- `node --test tests/skill-build.test.cjs`
- `node --check bin/lib/ljx-experiment-evidence-tools.cjs`
- `node --test tests/experiment-evidence-tools.test.cjs`
- `node --test tests/*.test.cjs` -> 611/611 pass, 39 suites during Round 08. Later Round 09 verification passed 622/622, and later Round 11 verification passed 642/642.
- `node bin/install.js --preview` -> success, 30 bridge-ready skills, no compatibility wrappers.
- Active preview grep over `.build/codex-preview/skills`, `.build/codex-preview/templates`, and `.build/codex-preview/mcp-servers` for stale Claude/Codex interface strings returned no matches.
- `git diff --check` -> clean.

## Clean-Round Accounting

Round 08 is not clean because it confirmed and fixed issues. The clean streak remains 0.

Next required actions:

- Round 09 through Round 11 superseded this next-step plan by finding additional confirmed issues.
- The final capped status is recorded in `REVIEW-LOOP-STATE.md` and `ROUND-11-FINAL-REVIEW.md`.
