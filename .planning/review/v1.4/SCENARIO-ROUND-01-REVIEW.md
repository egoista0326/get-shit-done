# v1.4 Stage B Scenario Round 1 Review

**Status:** fixed_not_clean
**Clean count after round:** 0
**Reason:** The first live scenario round found two P2 implementation defects and one P3 prompt/runtime traceability defect. All accepted defects were second-pass confirmed against the `ljx-GSD` prompt contracts and fixed, but P2 findings reset the Stage B clean streak.

## Setup

- Scenario root: `/tmp/ljx-gsd-stageb-r1`
- Installed test Codex home: `/tmp/ljx-gsd-stageb-r1/codex-home`
- Install command: `node bin/install.js --target-dir /tmp/ljx-gsd-stageb-r1/codex-home`
- Installed surface: 34 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred active skills, 0 `upstreamAutoSkills`.
- Hard rule: scenario agents could use only the installed `ljx-GSD-*` skill surface and `/tmp/ljx-gsd-stageb-r1/codex-home/ljx-gsd/runtime` helpers; raw upstream GSD/Auto skills were treated as poison, not as dependencies.

## Scenario Coverage

| Scenario | Result | Notes |
| --- | --- | --- |
| Engineering lifecycle | Pass | Ran `new-project -> progress -> discuss-phase -> plan-phase -> execute-phase -> code-review -> code-review-fix -> code-review -> verify-work -> next` on a tiny brownfield repo. The scenario project's own counter bug was fixed inside the temp workspace; no `ljx-GSD` implementation defect accepted. |
| Research lifecycle | Pass | Ran discovery, novelty, refine, experiment-plan/bridge, review-loop, research-review, result-to-claim, claim-gate, and ablation-planner contexts/state writes. No raw upstream skill usage. |
| Auto artifact ledger and migration | Pass with rejected watch candidate | Migration imported legacy artifacts and ignored a poison symlink. The umbrella research-pipeline reported `repair_required` for mismatched phase metadata, which was rejected as expected fail-closed behavior. |
| Pause/resume/workstreams/workspace/config | Fail then fixed | Workstreams, pause/resume, and workspace containment worked. `automation_profile: "autonomous"` was masked by generated safe defaults after `new-project`; accepted as V14-155. |
| Paper/rebuttal/result-to-claim | Fail then fixed | Paper/rebuttal config and state routing worked, but missing experiment audit did not block final supported claims, and paper round-PDF/compile diagnostics were not tracked; accepted as V14-154 and V14-156. |
| Self-contained poison install | Pass | Fake raw upstream `gsd-*` and Auto skills did not get called. One read-only `.claude/skills` mention remains a P4 note because it is explicit legacy policy context, not execution. |

## Confirmed And Fixed

See `.planning/review/v1.4/BUG-LEDGER.md` for V14-154 through V14-156.

- V14-154: `result-to-claim` and `claim-gate` now reject positive supported/final claim writes when phase-local integrity audit is missing or intentionally pending. Root Auto audit handoff remains a compatibility context, not a blocking active-control-plane audit.
- V14-155: `new-project` generated configs now carry an `_ljx_gsd` safe-default marker, and `loadProjectConfig` strips only generated safe-default values when a non-safe automation profile is selected, preserving explicit user overrides.
- V14-156: paper evidence now tracks optional round PDFs and compile/format diagnostics required by the paper-pipeline prompt: `paper/main_round0_original.pdf`, `paper/main_round1.pdf`, `paper/main_round2.pdf`, `paper/compile.log`, and `paper/PAPER_FORMAT_CHECK.md`.

## Rejected Or Watch Candidates

- Research-pipeline `repair_required` for phase-type/artifact mismatch: rejected as an implementation bug because it is a deliberate fail-closed metadata repair route when an `analysis` phase carries experiment/paper artifacts.
- Code-review helper treating `- None` as a selected list item: rejected for now as a scenario artifact-format issue; the prompt and state sync already support explicit `overall_verdict: clean` plus plain-text `None` sections.
- Read-only `.claude/skills` mention in `ljx-GSD-code-review`: P4 informational; the installed prompt constrains it to legacy policy reading and does not execute or route to Claude skills.
- Peer-reviewed/preprint classification pending in the research scenario: accepted as honest degradation because no external literature search was run in the local no-network scenario chain.

## Verification

- Targeted regression suite passed: `node --test tests/result-to-claim-bridge.test.cjs tests/claim-gate-bridge.test.cjs tests/runtime-core.test.cjs tests/new-project-bridge.test.cjs tests/paper-evidence-tools.test.cjs tests/paper-pipeline-bridge.test.cjs` with 136/136 passing.
- Preview rebuild passed: `npm run build:preview` produced 34 active `ljx-GSD-*` skills.
- Reinstall into the scenario Codex home passed: `node bin/install.js --target-dir /tmp/ljx-gsd-stageb-r1/codex-home`.
- Installed-runtime probes passed:
  - supported result-to-claim without integrity audit returns `claim_integrity_audit_missing`
  - supported claim-gate without integrity audit returns `claim_integrity_audit_missing`
  - generated `new-project` config plus `automation_profile: "autonomous"` resolves autonomous gates and external-service confirmation defaults
  - paper pipeline context reports round PDFs and compile/format diagnostics as present optional artifacts when files exist
- Docs contract passed: `node --test tests/docs-contract.test.cjs` with 16/16 passing.
- Full suite passed: `npm test` with 831/831 passing.
- Final preview install surface scan passed: 34 active skills, 34 manifest-built skills, no missing/extra/non-`ljx-GSD-*` active skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`.
- Final active generated skill raw-upstream scan passed with no actionable raw GSD/Auto slash or dollar command calls.
- `git diff --check` passed.

## Clean Decision

Not clean. Stage B Round 1 accepted P2 findings, so Stage B clean count remains 0. Continue with Stage B Round 2.
