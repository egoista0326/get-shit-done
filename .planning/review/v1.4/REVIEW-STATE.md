# v1.4 Review State

**Started:** 2026-04-13
**Protocol:** `.planning/review/v1.4/PROTOCOL.md`
**Trigger:** User required `ljx-GSD` to run independently of upstream GSD and Auto/ARIS, and required a regular-review stage followed by live scenario review with subagent-reported skill chains.

## Current Status

- Stage: B — live scenario review
- Stage A cap: 10 rounds
- Stage B cap: 10 rounds
- Current round: Stage B Round 4 fixed_not_clean; Stage B Round 5 next
- Stage A consecutive clean rounds: 0
- Stage B consecutive clean rounds: 0
- Stage transition: Stage A exited at the Round 10 cap without two consecutive clean rounds; Stage B Rounds 1-4 are complete and fixed_not_clean.
- Final success: Stage B exits after two consecutive clean scenario rounds; otherwise report scenario capped_not_clean at Round 10.
- Hard gate: `ljx-GSD-*` must not depend on globally installed upstream GSD or Auto/ARIS skills, and must not call raw upstream skills even if they are installed.

## Stage A Required Coverage

- independent install/runtime closure
- generated skill self-containment
- prompt-fidelity preservation
- build source selection and Codex conversion quality
- artifact ledger and file traceability
- config and variable propagation
- Codex hook and adapter conformance
- runtime state/path safety
- lifecycle quality gates
- migration/workstreams/workspace boundary
- research/paper/rebuttal evidence

## Stage B Required Coverage

- full engineering lifecycle
- full research lifecycle
- result-analysis and claim judgment
- legacy Auto artifact import/attach and lookup
- pause/resume
- workstream/workspace boundary
- safe/autonomous config behavior
- code-review defect/fix/verify loop
- paper/rebuttal
- external dependency poison scenario

## Round Accounting

| Stage | Round | Status | Clean Count After Round | Notes |
| --- | --- | --- | --- | --- |
| A | 1 | fixed_not_clean | 0 | Confirmed/fixed V14-001 through V14-015; full verification passed, but P1/P2 findings reset clean count. |
| A | 2 | fixed_not_clean | 0 | Confirmed/fixed V14-016 through V14-027; full verification passed with 737/737 tests, but P2 findings reset clean count. |
| A | 3 | fixed_not_clean | 0 | Confirmed/fixed V14-028 through V14-037; full verification passed with 743/743 tests, but P2 findings reset clean count. |
| A | 4 | fixed_not_clean | 0 | Confirmed/fixed V14-038 through V14-050; full verification passed with 759/759 tests, but P2 findings reset clean count. |
| A | 5 | fixed_not_clean | 0 | Confirmed/fixed V14-051 through V14-066; full verification passed with 770/770 tests, but P1/P2 findings reset clean count. |
| A | 6 | fixed_not_clean | 0 | Confirmed/fixed V14-067 through V14-087; full verification passed with 788/788 tests, but P1/P2 findings reset clean count. |
| A | 7 | fixed_not_clean | 0 | Confirmed/fixed V14-088 through V14-109; full verification passed with 804/804 tests, but P1/P2 findings reset clean count. |
| A | 8 | fixed_not_clean | 0 | Confirmed/fixed V14-110 through V14-123; full verification passed with 811/811 tests, but P1/P2 findings reset clean count. |
| A | 9 | fixed_not_clean | 0 | Confirmed/fixed V14-124 through V14-134; full verification passed with 817/817 tests, but P2 findings reset clean count. |
| A | 10 | fixed_not_clean; regular_capped_not_clean | 0 | Confirmed/fixed V14-135 through V14-153; full verification passed with 828/828 tests, but P1/P2 findings reset clean count and Stage A cap was reached. |
| B | 1 | fixed_not_clean | 0 | Live engineering/research/artifact/workstate/paper/self-containment scenarios confirmed/fixed V14-154 through V14-156; targeted Stage B suite passed with 136/136, full suite passed with 831/831, final preview scans passed, but P2 findings reset clean count. |
| B | 2 | fixed_not_clean | 0 | Live claim, migration, engineering, paper/rebuttal, config/workstate, and self-containment scenarios confirmed/fixed V14-157 through V14-162; targeted suite passed with 156/156, full suite passed with 835/835, preview/install scans passed, but P2 findings reset clean count. |
| B | 3 | fixed_not_clean | 0 | Live claim-audit, migration-ledger, engineering-quality-gates, research-paper, config-recovery, and self-containment scenarios confirmed/fixed V14-163; targeted claim/paper suite passed with 64/64, final full suite passed with 837/837, preview/fixed-install self-containment scans passed, and Round 3 temp directories were clean, but the P2 paper-pipeline finding reset clean count. |
| B | 4 | fixed_not_clean | 0 | Live paper/claim, engineering lifecycle, research-pipeline, migration/file-trace, recovery/workstream/workspace, config/Codex-hook, self-contained poison, and prompt-coverage scenarios confirmed/fixed V14-164 through V14-166; targeted suite passed with 145/145, docs-contract 16/16, full suite 840/840, preview/fixed-install probes, self-containment scans, and cleanup passed, but P2 findings reset clean count. |

## Stage B Round 1 Summary

- Review method: six live scenario subagents plus local second-pass confirmation, a fresh independent install into `/tmp/ljx-gsd-stageb-r1/codex-home`, targeted regression tests, preview rebuild, reinstall, and installed-runtime probes.
- Scenario coverage:
  - engineering lifecycle from `new-project` through code-review fix, verify-work, and next
  - research lifecycle from discovery through ablation planning
  - legacy Auto artifact migration/lookup and poison symlink handling
  - pause/resume, workstreams, workspace admin, and safe/autonomous config switching
  - paper/rebuttal/result-to-claim/claim-gate flow
  - poisoned raw upstream GSD/Auto skill install surface
- Main confirmed bug families:
  - supported result-to-claim and claim-gate writes could finalize claims while the phase-local experiment audit was missing
  - generated safe config defaults from `new-project` masked the autonomous automation profile
  - paper-pipeline evidence did not expose round PDFs or compile/format diagnostics required by the prompt
- Rejected/watch findings:
  - research-pipeline `repair_required` on mismatched phase metadata is expected fail-closed repair behavior
  - code-review `- None` parsing was a scenario artifact-format problem, not a confirmed runtime bug
  - read-only `.claude/skills` wording remains P4 informational, not execution
  - peer-reviewed/preprint classification can remain pending in a no-search local scenario
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - targeted Stage B suite passed with 136/136 tests
  - docs-contract passed with 16/16 tests
  - full suite passed with 831/831 tests
  - `npm run build:preview` passed and produced 34 active `ljx-GSD-*` skills
  - scenario Codex home reinstall passed
  - installed-runtime probes passed for missing-audit claim gates, autonomous generated config resolution, and paper round artifact links
  - final preview manifest/active-skill and raw-upstream scans passed
  - `git diff --check` passed
- Clean decision: not clean, because Stage B Round 1 found P2 issues.

## Stage A Round 1 Summary

- Review method: six focused subagents plus local preview install, active-skill scans, official Codex hook/skill doc checks, and full test verification.
- Main confirmed bug families:
  - active raw upstream Auto skills/support roots violated independent ljx-GSD runtime closure
  - Codex hook template and cwd propagation were stale
  - research handoff/config/CLI variables did not propagate consistently
  - lifecycle/migration/workstream stops could leak raw commands or drop context
  - Auto artifact evidence ledgers were incomplete
  - prompt-fidelity floors were missing concrete Auto experiment-audit checks
  - internal Auto base skill archive was incomplete after removing active raw-skill install
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - `node bin/install.js --preview` passed
  - `node --test tests/*.test.cjs` passed with 723/723 tests
- Clean decision: not clean, because Round 1 found P1/P2 implementation issues.

## Stage A Round 2 Summary

- Review method: six focused subagents plus local second-pass confirmation, targeted fixtures, generated preview install, active-skill raw invocation scan, and full test verification.
- Main confirmed bug families:
  - direct research helper CLI/config overrides did not propagate consistently
  - pause/resume damaged-state handling and explicit handoff markdown path validation could route or clean up incorrectly
  - deleted implementation files and some phase-scoped git commits could escape code-review/verify gates
  - migration and paper/rebuttal/claim ledgers still missed or misclassified Auto research artifacts
  - root Auto experiment audit files could block ljx-GSD claim gates as active control-plane state
  - generated prompt floors still preserved routing more strongly than upstream GSD/Auto task-quality details
  - docs had actionable raw stage names that should have been `ljx-GSD-*` commands
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - targeted Round 2 suite passed with 416/416 tests
  - `node --test tests/*.test.cjs` passed with 737/737 tests
  - `node bin/install.js --preview` passed
  - generated preview runtime syntax check passed
  - generated preview active-skill scan found no actionable raw upstream skill invocation
  - `git diff --check` passed
- Clean decision: not clean, because Round 2 found P2 implementation and prompt-fidelity issues.

## Stage A Round 3 Summary

- Review method: six focused subagents plus local second-pass confirmation, worker patch review for code-review gate persistence, generated preview install, active-skill raw invocation scan, and full test verification.
- Main confirmed bug families:
  - remaining raw Auto hook support skill-shaped reference
  - restored Auto Research variables/limits not fully propagated through config, CLI, handoff, prompts, docs, and direct helper contexts
  - cross-phase research artifact lookup gaps
  - migration-blocked direct helper routing gaps
  - experiment audit JSON/Markdown/root fallback source classification
  - unresolved review-loop/post-fix quality-gate states routing too far forward
  - research-pipeline CLI parser strictness gaps
  - handoff required-reading omissions for research/paper/rebuttal artifacts
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - targeted parser/docs/runtime suite passed with 65/65 tests
  - targeted audit/claim suite passed with 46/46 tests
  - research helper suite passed with 89/89 tests
  - quality-gate suite passed with 157/157 tests
  - migration/runtime/build suite passed with 206/206 tests
  - `node --test tests/*.test.cjs` passed with 743/743 tests
  - `node bin/install.js --preview` passed
  - generated preview runtime syntax check passed
  - generated preview active-skill scan found no actionable raw upstream skill invocation
  - `git diff --check` passed
- Clean decision: not clean, because Round 3 found P2 implementation, artifact, config, and prompt-fidelity issues.

## Stage A Round 4 Summary

- Review method: six focused subagent reviews plus local second-pass confirmation, generated preview install, active-skill raw invocation scans, Codex variable evidence checks, targeted regression tests, and full-suite verification.
- Main confirmed bug families:
  - Codex conversion/support material still depended on unproven `CODEX_PROJECT_DIR` or preserved a sample `codex_thread_id`
  - missing self-contained workspace admin surface
  - research-pipeline/shared CLI/config propagation gaps and parser strictness gaps
  - dependency phase evidence gaps across experiment evidence, pause/resume, and rebuttal context
  - migration known-artifact gaps for novelty/review-loop/ablation evidence
  - paper-pipeline routing without supported claim evidence
  - workstream/roadmap admin paths where structured state did not fully dominate markdown/root state
  - config validation too narrow for legitimate claim score and W&B values, while unknown rerun policy remains fail-closed
  - prompt-fidelity floors still missing concrete experiment/rebuttal controls
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - targeted Round 4 suite passed with 424/424 tests
  - targeted config/claim/experiment/fix repair suite passed with 94/94 tests
  - `npm test` passed with 759/759 tests
  - `npm run build:preview` passed
  - generated preview variable scan found no `CODEX_PROJECT_DIR`, `CODEX_SESSION_ID`, `CLAUDE_PROJECT_DIR`, or sample `codex_thread_id`
  - generated preview active-skill raw invocation scan found no actionable raw upstream GSD/Auto workflow invocation
- Clean decision: not clean, because Round 4 found P2 implementation, config, artifact, prompt-fidelity, and self-containment issues.

## Stage A Round 5 Summary

- Review method: six focused subagent reviews plus local second-pass confirmation, generated preview install, active-skill surface scans, Codex Stop hook JSON smoke test, targeted regression suites, and full-suite verification.
- Main confirmed bug families:
  - prompt-fidelity gaps in `map-codebase`, `idea-discovery`, and the missing `autonomous` phase loop
  - artifact rediscovery gaps across migration, dependency phase context, pause/resume, and paper evidence
  - structured research state writer overwrite risks
  - lifecycle/verification gates where stale markdown could override newer structured blocked state
  - direct helper/admin CLI fail-open behavior and invalid code-review depth fallback
  - Codex Stop hook JSON/doc conversion drift
  - research-pipeline and shared CLI/config variable propagation gaps
  - optional paper-improvement state and stale active install-root cleanup edge cases
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - targeted Round 5 suite passed with 364/364 tests
  - lifecycle repair suite passed with 49/49 tests
  - `npm test` passed with 770/770 tests
  - `npm run build:preview` passed and produced 33 active `ljx-GSD-*` skills
  - generated preview install surface had no non-`ljx-GSD-*` top-level active skill directories and manifest `upstreamAutoSkills` was empty
  - generated Codex Stop hook emitted parseable JSON with `continue` and `systemMessage`
  - `git diff --check` passed
- Clean decision: not clean, because Round 5 found P1/P2 implementation, lifecycle, prompt-fidelity, hook, config, and artifact issues.

## Stage A Round 6 Summary

- Review method: six focused subagent reviews plus local second-pass confirmation, targeted red/green regression tests, full-suite verification, preview install, active-skill surface scans, Codex/Claude conversion scans, and installed runtime `require()` smoke tests.
- Main confirmed bug families:
  - prompt-fidelity gaps in direct reviewer-backed research helpers, novelty-check, paper-pipeline, and rebuttal
  - migration-preserved `IDEAS.md` and `refine-logs/*` artifacts not rediscovered by downstream context and pause/resume required reading
  - documented GSD aliases and Auto execution/review variables not fully normalized, validated, or handed off
  - lifecycle route overrides validated only by prefix rather than installed manifest command surface and supported route kinds
  - resume critical anti-patterns not durable after handoff consumption, and plan-phase did not surface the pause safety gate
  - code-review fallback missed untracked implementation files, while structured review-state precedence needed exact staleness ordering
  - Codex build/runtime gaps in hook event coverage, empty legacy support-root cleanup, runtime manifest packaging, and legacy `.claude/skills` wording
  - rebuttal `character_limit` invalid-value semantics needed fail-closed validation with visible validation details
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - initial targeted regression run reproduced 16 accepted failures before fixes
  - targeted Round 6 suite passed with 362/362 tests
  - focused code-review/verify repair suite passed with 94/94 tests
  - rebuttal/runtime/phase-context repair suite passed with 78/78 tests
  - skill-build suite passed with 60/60 tests
  - `npm test` passed with 788/788 tests
  - `npm run build:preview` passed and produced 33 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred entries, and installed runtime `manifest.cjs`
  - preview active-skill scan found no non-`ljx-GSD-*` top-level skill directories
  - generated preview raw-command scan found no actionable raw upstream skill invocation; remaining hits were state-family paths, manifest source archive paths, or non-actionable prose
  - preview runtime `require()` smoke test passed
  - `git diff --check` passed
- Clean decision: not clean, because Round 6 found P1/P2 prompt-fidelity, lifecycle, config, artifact, and self-containment issues.

## Stage A Round 7 Summary

- Review method: six focused subagent reviews plus local second-pass confirmation, targeted red/green regression tests, full-suite verification, preview install, empty support-root scan, executable raw-upstream call scan, source-root leak scan, and diff whitespace validation.
- Main confirmed bug families:
  - stale top-level preview support roots and ambient source-root fallbacks weakened self-contained installation guarantees
  - route overrides and quality-gate recommendations accepted shell payload suffixes or raw upstream command tokens
  - final merged config validation and flat GSD aliases were incomplete, and generated research handoff values could override explicit workflow settings
  - summary-scope code review hid later dirty/untracked files, deletion-only reviews were treated stale forever, and structured review authority was not consistently preserved across code-review/code-review-fix/verify-work
  - `refine-logs/*`, unprefixed research artifacts, and direct Auto-like research-pipeline artifacts were still incompletely rediscovered
  - paper workspace path preflight, new-project unknown flags, and workspace default namespace needed self-contained fail-closed behavior
  - prompt-fidelity floors still missed ablation prefilter prevention, experiment sanity-rescue second opinion, paper citation anti-hallucination, rebuttal follow-up semantics, and autonomous audit/complete/cleanup lifecycle
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - targeted Round 7 suite passed with 413/413 tests
  - `npm test` passed with 804/804 tests
  - `npm run build:preview` passed and produced 33 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`
  - preview empty support-root scan found no stale empty top-level `tools`, `templates`, or `mcp-servers` directories
  - preview executable raw-upstream call scan found no actionable raw upstream GSD/Auto calls in active generated skills
  - preview source-root leak scan found no `/tmp/codex-skill-repos` or `.planning/references/upstreams` references in preview runtime or active generated skills
  - `git diff --check` passed
- Clean decision: not clean, because Round 7 found P1/P2 implementation, artifact, config, self-containment, and prompt-fidelity issues.

## Stage A Round 8 Summary

- Review method: six focused subagent reviews plus local second-pass confirmation, targeted red/green regression tests, official Codex hook contract recheck, build-surface tests, workstreams parser regression, and prompt-source hardening.
- Main confirmed bug families:
  - raw upstream command tokens inside argument values escaped the accepted-command sanitizer
  - `spawn_agent` model/reasoning-effort prompt conversion could drop explicit reviewer-quality requirements
  - phase `config_overrides` skipped legacy Auto/GSD alias normalization and launch handoff aliases needed coverage
  - install CLI unknown flags/positional arguments could silently fall back to default install behavior
  - Codex hook notes/tests overclaimed Skill/subagent hook capture; current tests now prove advisory Bash `PostToolUse` payload handling only
  - verify-work and experiment evidence missed unprefixed execution artifacts, `REVIEW_STATE.json`, and `GPT54_AUTO_REVIEW.md`
  - research-pipeline direct Auto evidence collected only the first artifact per stage
  - pause handoff manual `Required Reading` disabled automatically discovered research artifacts
  - deleted files that reappeared could remain treated as reviewed deletions
  - phase-tagged git commits hid later dirty/untracked implementation files
  - route command overrides and routeKind overrides could form incompatible lifecycle tuples
  - workstreams CLI unknown flags were classified as subcommands instead of parser errors
  - prompt builder source kept raw upstream companion-stage tokens even though generated active skills were sanitized
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - targeted Round 8 suite passed with 370/370 tests
  - workstreams regression passed with 44/44 tests
  - skill-build regression passed with 62/62 tests after prompt-source hardening
  - `npm test` passed with 811/811 tests
  - `npm run build:preview` passed and produced 33 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`
  - preview manifest/active-skill set equality scan passed, with no non-`ljx-GSD-*` active skill directories and no top-level `tools`, `templates`, or `mcp-servers` support roots
  - preview raw-command scan found no actionable raw upstream GSD/Auto commands in active generated skills
  - preview source-root leak scan found no `/tmp/codex-skill-repos` or `.planning/references/upstreams` references in preview runtime or active generated skills
  - `git diff --check` passed
- Clean decision: not clean, because Round 8 found P1/P2 runtime, artifact, install, config, hook-contract, and prompt-hardening issues.

## Stage A Round 9 Summary

- Review method: six focused subagent reviews plus local second-pass confirmation, targeted red/green regression tests, docs contract, full-suite verification, preview install, manifest/active-skill equality scan, active raw-command scan, source-root leak scan, and preview runtime `require()` smoke test.
- Main confirmed bug families:
  - root Auto `GPT54_AUTO_REVIEW.md` and unprefixed experiment-result artifacts were still not consistently recognized by every evidence consumer
  - autonomous milestone closure preserved cleanup as guidance instead of a self-contained `ljx-GSD-cleanup` maintenance command
  - CLI/config propagation missed launch-confirmation flags, paper/rebuttal/claim workflow overrides, and several uppercase Auto aliases
  - workspace explicit paths and preview bytecode cleanup needed tighter self-contained managed-root boundaries
  - lifecycle command/routeKind overrides still needed final tuple validation after all overrides were applied
  - `code-review-fix --auto` could recreate an old post-fix blocker after a newer clean review rerun
  - paper-pipeline builder source still carried raw upstream paper-stage tokens even though generated skills were sanitized
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - targeted Round 9 suite passed with 207/207 tests
  - `node --test tests/docs-contract.test.cjs` passed with 16/16 tests
  - `npm test` passed with 817/817 tests
  - `npm run build:preview` passed and produced 34 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`
  - preview manifest/active-skill equality scan found no extra/missing active skills, no non-`ljx-GSD-*` skill dirs, and no top-level `tools`, `templates`, or `mcp-servers` support roots
  - preview raw-command scan found no actionable raw upstream GSD/Auto calls in active generated skills
  - preview source-root leak scan found no `/tmp/codex-skill-repos` or `.planning/references/upstreams` references in preview runtime or active generated skills
  - preview runtime `require()` smoke test passed
  - `git diff --check` passed
- Clean decision: not clean, because Round 9 found P2 artifact, config, lifecycle, path-safety, prompt-fidelity, and self-containment issues.

## Stage A Round 10 Summary

- Review method: six focused subagent reviews plus local second-pass confirmation, targeted red/green regression tests, generated preview rebuild, manifest/active-skill equality scan, active raw/stale prompt scan, and prompt-quality positive scans.
- Main confirmed bug families:
  - cleanup no-arg and autonomous milestone closure were narrower than upstream GSD lifecycle behavior
  - complete-milestone stopped on missing preexisting audit instead of doing its own self-contained readiness audit
  - Auto recovery-state prompts for refine/review/paper and discovery portfolio state could reduce recovery quality by treating checkpoint state as optional
  - literature and novelty prompts lacked peer-reviewed versus preprint classification requirements
  - migration, phase context, result-to-claim, paper-pipeline, and research-pipeline artifact readers still diverged for preserved Auto research artifacts and symlink safety
  - autonomous config, workflow overrides, and shared CLI flags still missed several documented knobs
  - code-review model precedence and code-review-fix selected-finding preservation needed stronger prompt/runtime gates
  - execute-phase and direct gate helpers needed broader unprefixed artifact and flag-shaped-token handling
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md`
- Verification:
  - `node --test tests/skill-build.test.cjs` passed with 62/62 tests
  - targeted Round 10 suite passed with 218/218 tests
  - `node --test tests/docs-contract.test.cjs` passed with 16/16 tests
  - `npm test` passed with 828/828 tests
  - `npm run build:preview` passed and produced 34 active `ljx-GSD-*` skills, 0 compatibility skills, 0 deferred entries, and 0 `upstreamAutoSkills`
  - preview manifest/active-skill equality scan found no extra/missing active skills, no non-`ljx-GSD-*` skill dirs, and no top-level `tools`, `templates`, or `mcp-servers` support roots
  - preview raw/stale prompt scan found no actionable raw upstream GSD/Auto calls and no stale cleanup/audit/optional-recovery strings in active generated skills
  - `git diff --check` passed
- Clean decision: not clean, because Round 10 found P1/P2 implementation, artifact, config, lifecycle, prompt-fidelity, and self-containment issues.
- Stage decision: Stage A reached the 10-round cap with clean count 0, so Stage A is `regular_capped_not_clean`; Stage B scenario review starts next.

## Stage B Round 1 Summary

- Review method: live installed-skill scenarios under `/tmp/ljx-gsd-stageb-r1`, using only `ljx-GSD-*` skill prompts and installed runtime helpers.
- Main confirmed bug families:
  - supported claim writes could pass without a phase-local experiment integrity audit
  - generated `new-project` safe defaults could mask `automation_profile: "autonomous"`
  - paper-pipeline evidence did not track optional round PDFs and compile/format diagnostics required by the prompt
- Verification:
  - targeted Stage B suite passed with 136/136 tests
  - docs-contract passed with 16/16 tests
  - `npm test` passed with 831/831 tests
  - `npm run build:preview` passed and produced 34 active `ljx-GSD-*` skills
  - scenario reinstall, installed-runtime probes, preview self-containment scans, and `git diff --check` passed
- Cleanup: `/tmp/ljx-gsd-stageb-r1` was removed before Round 2 setup.
- Clean decision: not clean, because Stage B Round 1 accepted P2 findings. Stage B clean count remains 0.

## Stage B Round 2 Summary

- Review method: six live scenario agents under `/tmp/ljx-gsd-stageb-r2`, covering engineering code review/fix/verify, research claim gating, paper/rebuttal, config/workspace/workstream state, migration/file ledger, and self-contained poison installs.
- Main confirmed bug families:
  - root Auto audit compatibility evidence still cleared phase-local final-claim audit requirements
  - intentionally-pending audit handling existed in module APIs but was not exposed through the installed CLIs
  - migration import could overwrite human-readable report files and skipped source symlinks without a manifest trace
  - quality-gate persistence returned stale response timestamps and left legacy top-level gate mirrors stale
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md` V14-157 through V14-162.
- Verification:
  - targeted Stage B Round 2 suite passed with 156/156 tests
  - docs-contract passed with 16/16 tests
  - `npm test` passed with 835/835 tests
  - `npm run build:preview` passed and produced 34 active `ljx-GSD-*` skills
  - preview manifest/active-skill equality, raw command-shape, and source-root leak scans passed
  - reinstall into `/tmp/ljx-gsd-stageb-r2/codex-home` passed
  - installed manifest/active-skill equality and source-root leak scans passed
  - installed-runtime probes passed for root Auto audit gating, intentionally-pending CLI, migration report collision, and quality-gate mirror/timestamp persistence
  - `git diff --check` passed
- Cleanup: `/tmp/ljx-gsd-stageb-r2` and `/tmp/ljx-gsd-installed-*` probe directories were removed after verification.
- Clean decision: not clean, because Stage B Round 2 accepted P2 findings. Stage B clean count remains 0; proceed to Stage B Round 3.

## Stage B Round 3 Summary

- Review method: six live scenario agents under `/tmp/ljx-gsd-stageb-r3`, covering claim-audit CLI matrices, migration ledgers, engineering quality gates, research-to-paper, config/recovery/workstreams/workspace behavior, and self-contained poison installs.
- Main confirmed bug family:
  - paper-pipeline routing and `write-paper-state` did not reuse the unresolved-integrity-audit gate already enforced by result-to-claim and claim-gate writers.
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md` V14-163.
- Rejected/watch findings:
  - migration backup archives not auto-promoted into active phase-local artifacts are expected by the migration contract
  - default-equal top-level config values under the generated-safe marker remain a provenance limitation, not a confirmed regression
  - raw upstream examples inside internal archived support templates are non-active reference material
- Verification:
  - targeted claim/paper regression suite passed with 64/64 tests
  - `npm run build:preview` passed and produced 34 active `ljx-GSD-*` skills
  - fixed reinstall into `/tmp/ljx-gsd-stageb-r3-fixed/codex-home` passed
  - installed fixed-runtime probe passed for root-only audit, missing audit, and blocked `write-paper-state`
  - full suite before accounting update passed implementation tests but failed the stale v1.4 docs-contract accounting assertion; accounting docs and test expectations were updated before final rerun
  - final docs-contract rerun passed with 16/16 tests
  - final `npm test` passed with 837/837 tests
  - preview and fixed-install manifest/active-skill equality scans passed with 34 active `ljx-GSD-*` skills and 0 compatibility/deferred/upstreamAuto entries
  - preview and fixed-install source-root leak scans passed
  - `git diff --check` passed
- Cleanup: `/tmp/ljx-gsd-stageb-r3*` scenario directories were absent after final verification.
- Clean decision: not clean, because Stage B Round 3 accepted P2 V14-163. Stage B clean count remains 0; proceed to Stage B Round 4.

## Stage B Round 4 Summary

- Review method: six live scenario agents plus local self-contained poison and prompt-coverage probes under `/tmp/ljx-gsd-stageb-r4`, using only installed `ljx-GSD-*` skills/runtime helpers and requiring exact skill-chain reporting.
- Main confirmed bug families:
  - field-list structured code-review findings were overcounted by duplicated review/fix parsers
  - `workflow.code_review_rerun_after_fix=automatic` changed stored state but did not make the automatic fix -> rerun command path reachable
  - `safety.always_confirm_external_services` was loaded but not surfaced as an operational prompt/runtime gate
- Fix ledger: `.planning/review/v1.4/BUG-LEDGER.md` V14-164 through V14-166.
- Rejected/watch findings:
  - research-pipeline `repair_required` on the current review repo is expected fail-closed behavior for invalid phase records
  - migration claim-state write for phase `04` did not need to refresh phase `11` paper artifacts
  - rebuttal JSON recovery-state wording remains a watch item because the mandatory Auto recovery artifacts are already present
- Verification:
  - targeted code-review/config suite passed with 145/145 tests
  - `npm run build:preview` passed and produced 34 active `ljx-GSD-*` skills
  - fixed reinstall into `/tmp/ljx-gsd-stageb-r4-fixed/codex-home` passed
  - fixed-install probes passed for field-list finding counts, automatic rerun `autoMode`, external-service confirmation reasons, runtime parser packaging, and generated prompt text
  - fixed-install manifest/active-skill equality scan passed with 34 active `ljx-GSD-*` skills and 0 compatibility/deferred/upstreamAuto entries
  - fixed-install source-root leak scan passed
  - docs-contract passed with 16/16 tests
  - full suite passed with 840/840 tests
  - cleanup check passed: no `/tmp/ljx-gsd-stageb-r4*` or Round 4 installed-probe scenario directories remained
- Clean decision: not clean, because Stage B Round 4 accepted P2 V14-164 through V14-166. Stage B clean count remains 0; proceed to Stage B Round 5.

## Carry-Forward Watch Items

- v1.3 reached Stage 1 cap with clean streak 0 after fixing V13-001 through V13-040.
- v1.3 managed-upstream policy is superseded: raw upstream GSD/Auto may be reference or bundled internal assets only, not runtime skill dependencies.
- `.planning` accounting-only updates still do not affect clean count unless they affect behavior, routing, artifact lookup, recovery, config inheritance, install output, or verification reliability.
- Stage B must be live-scenario based, `ljx-GSD-*` only, and temporary-scenario cleanup must be tracked without counting `.planning` accounting-only updates as implementation findings.
