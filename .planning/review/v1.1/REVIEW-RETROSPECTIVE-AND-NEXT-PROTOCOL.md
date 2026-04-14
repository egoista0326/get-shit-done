# v1.1 Review Retrospective And Next Review Protocol

**Generated:** 2026-04-12
**Scope:** ljx-GSD skill verification milestone, Round 01 through Round 11.
**Current closure state:** `capped_not_clean`.
**Important status distinction:** the roadmap has `59/59` plans complete, and the final test/preview checks passed after Round 11 fixes, but the strict review loop did **not** achieve two consecutive clean rounds before the 11-round cap.

This document is intentionally written as an operator-facing复盘 and future review playbook. It should be read before any next review milestone so the next effort starts from the combined lessons rather than repeating the incremental Round 04-Round 11 discovery pattern.

## 1. What We Reviewed

The review expanded from ordinary runtime correctness into a full parity, prompt-quality, and Codex-adapter audit.

### 1.1 Source Baselines And Generated Surfaces

- Upstream GSD implementation and lifecycle semantics.
- Upstream Auto/ARIS research skill implementation, artifacts, loops, and capability expectations.
- Official upstream Codex conversions where present.
- Local ljx-GSD source generators and runtime helpers.
- Installed/generated Codex preview surface under `.build/codex-preview/`.
- Support assets copied into active preview paths, including tools, templates, MCP server directories, and archived upstream references.

The key lesson is that the generated preview must be treated as a first-class artifact. A source fix is not complete until the active installed surface is checked for stale Claude hooks, stale MCP interface syntax, bytecode residue, prompt capability deletion, and path mismatches.

### 1.2 Runtime And State Families

The review covered:

- `bin/lib/ljx-runtime-core.cjs`
- `bin/lib/ljx-runtime-state.cjs`
- `bin/lib/ljx-state-tools.cjs`
- lifecycle shell helpers
- quality gate helpers
- code-review / code-review-fix helpers
- research-pipeline, experiment, claim, migration, rebuttal, workstream, pause/resume helpers
- `.planning/STATE.md`, `.planning/ROADMAP.md`, phase records, and review-loop records

The main runtime focus became: fail closed, never follow unsafe symlinks, do not accept directories as evidence, do not let stale persisted state override fresher current artifacts, and never report a lifecycle gate as clean while a blocking review condition remains.

### 1.3 User Scenario Families

The review specifically covered these user-intended scenarios:

- Migrating projects previously completed with GSD into ljx-GSD.
- Running GSD-style engineering lifecycle: discuss, research, plan, execute, code-review, fix, verify.
- Running Auto-style research lifecycle: idea discovery, literature review, novelty check, research refinement, experiment planning, experiment bridge, review loops, result-to-claim, ablation, paper/rebuttal workflows.
- Performing code review and code-review-fix without skipping required reruns.
- Performing literature/research work without deleting upstream citation, reviewer, and evidence obligations.
- Performing autonomous research without unbounded loops or false completion claims.
- Analyzing experiment results and claim support with evidence and experiment-integrity gates.
- Proposing research directions without losing Auto/ARIS prompt depth.
- Pausing, resuming, and switching workstreams without corrupting active state.
- Distinguishing workstreams from workspaces and keeping active pointers safe.
- Switching between safe/human-confirmed and autonomous modes without silently launching expensive compute.
- Checking planned configuration aliases and default policies.
- Verifying Claude Code to Codex conversion details, including file paths, hook residue, MCP/tool interface syntax, subagent APIs, and environment identifiers.

### 1.4 Prompt-Quality And Capability-Preservation Review

This became one of the highest-value lanes. The review did not stop at "helper routes correctly"; it compared whether the generated skill prompt still preserves the substantive capability of upstream GSD/Auto:

- planner/checker independence
- reviewer difficulty and direct inspection requirements
- bounded fix/review loops
- raw review and structured state capture
- evidence and audit artifact requirements
- experiment launch confirmation
- literature/citation discipline
- contribution and research-brief artifacts
- rebuttal provenance and venue-limit confirmation
- pause/resume handoff completeness

Several official Codex overlays were found to be thinner than base Auto prompts. Future reviews must therefore treat "official Codex version exists" as evidence to inspect, not as automatic truth.

## 2. What Bugs Were Found And How They Were Fixed

Round 01 through Round 11 produced BUG-001 through BUG-093. BUG-058 was later superseded by BUG-071; all confirmed non-superseded issues were fixed before the Round 11 cap report.

The useful view is by root-cause family rather than by chronological order.

### 2.1 Install, Source Root, And Active Preview Drift

Representative bugs:

- BUG-001: preview install ignored repo-local upstream snapshots.
- BUG-059: active install copied an archived Claude-review override generator.
- BUG-061: active prompts retained old Codex MCP / Claude Code interface shapes.
- BUG-062 and BUG-072: active preview retained Python bytecode, stale hook residue, or stale Claude wording.

Fix pattern:

- Added repo-local upstream fallback source-root resolution.
- Filtered support asset installation so archived Claude-specific tooling remains only under reference archives.
- Added Codex tool-block schema rewriting and stale-interface grep checks.
- Added active preview cleanup for bytecode and empty stale directories.
- Verified with `node bin/install.js --preview` plus direct preview scans.

Review lesson:

- The installed preview is not a passive build product. It is a separate audit surface because stale files can survive even when source files look correct.

### 2.2 Prompt Capability Deletion And Prompt-Quality Regression

Representative bugs:

- BUG-016 to BUG-018: generated lifecycle/research prompts were too thin compared with upstream GSD/Auto.
- BUG-033 and BUG-034: Auto-facing prompt floors missed claim grounding, experiment audit, novelty, and workflow-continuation obligations.
- BUG-057: official Codex `auto-review-loop` source still failed the reviewer-difficulty floor.
- BUG-060: official Codex overlays for `auto-review-loop`, `result-to-claim`, `experiment-bridge`, and `rebuttal` deleted base Auto capabilities.
- BUG-073 to BUG-075: `monitor-experiment`, `idea-discovery`, and `paper-plan` official Codex sources dropped material Auto prompt obligations.
- BUG-080 to BUG-082: plan-phase, code-review-fix, and pause/resume prompts weakened core GSD behavior.

Fix pattern:

- Added generated `prompt_quality_floor` sections.
- Added skill-build regression assertions for concrete obligations instead of only checking command routing.
- Added source opt-outs so selected skills use richer base Auto prompts converted for Codex rather than thinner official Codex overlays.
- Strengthened generated prompt wording for independent plan-checker review, bounded same-scope code-review-fix loops, and detailed pause/resume handoff content.

Review lesson:

- "The flow runs" is a weak criterion for skills. A skill can route correctly and still be wrong if the prompt silently removes the planning depth, reviewer discipline, evidence requirements, or artifact content that made the upstream skill useful.

### 2.3 Lifecycle, Code-Review, And Verify Gate Correctness

Representative bugs:

- BUG-025: pending review-loop statuses could route as ready.
- BUG-027: execute-phase could recommend verify before required code review.
- BUG-037 and BUG-038: exact review/verification artifacts and alternate pending fields were mishandled.
- BUG-052 to BUG-056: stale or ambiguous review/verify artifacts could falsely appear clean.
- BUG-077 to BUG-079: code-review-fix and post-fix rerun policy had weak artifact and policy handling.
- BUG-089: capped Phase 20 state still routed to verification until terminal capped routing was added.

Fix pattern:

- Centralized pending-status and rerun-policy classification.
- Required regular-file evidence for review/fix/verification artifacts.
- Stopped stale persisted pending states from overriding current clean artifacts.
- Routed terminal capped review records to progress/status rather than re-entering verify-work.
- Added focused tests for code-review, code-review-fix, verify-work, runtime-shell, and bridge-contract behavior.

Review lesson:

- Quality gates need adversarial inputs: pending aliases, stale states, mixed "None." plus bullet findings, directories masquerading as artifacts, and unknown policy values.

### 2.4 Research Evidence, Claim Support, And Experiment Integrity

Representative bugs:

- BUG-013: `supported` result-to-claim state could be persisted without evidence.
- BUG-031: `claim_supported: yes` alias bypassed the same evidence gate.
- BUG-032: experiment integrity audit was not first-class enough.
- BUG-069: root Auto `EXPERIMENT_AUDIT` handoff and severity were not recognized.
- BUG-070: claim-gate/result-to-claim could self-satisfy using `RESULT_TO_CLAIM` or `CLAIMS`.
- BUG-071: `CLAIMS` freshness needed to mark prior result-to-claim stale.
- BUG-076 and BUG-090: positive verdict aliases such as `ready`, `supported`, and `overall_verdict: passed` could bypass evidence/audit gates.

Fix pattern:

- Centralized support-evidence checks on real result/review evidence.
- Removed self-authored claim/judgment artifacts from support evidence.
- Normalized verdict aliases through the same support-level mapper.
- Added experiment-audit readiness, severity parsing, and fail-audit blocking.
- Reintroduced claim freshness into stale-result judgment logic.
- Added claim/result/evidence regression suites.

Review lesson:

- Evidence gates must be alias-complete and self-evidence-resistant. Any field that semantically means "positive verdict" must pass through the same real-evidence and audit checks.

### 2.5 Migration, Backup, And Provenance Safety

Representative bugs:

- BUG-009 and BUG-010: canonical Auto discovery artifacts and duplicate migration sessions were mishandled.
- BUG-020 and BUG-029: migration release/status accepted directories or stale backup roots.
- BUG-067: backup proof was not bound to the canonical backup root.
- BUG-087 and BUG-088: backup/report/context checks were not symlink-safe enough.
- BUG-092: migration report target checks happened too late, after durable writes.

Fix pattern:

- Expanded known artifact inventories.
- Added duplicate session/release guards.
- Required regular-file report/manifest evidence while preserving backup roots as directories.
- Bound backup roots and proof paths to canonical realpaths under `.planning/legacy-backups`.
- Prechecked unsafe migration report targets before backup/state writes.

Review lesson:

- Migration code is high-risk because it touches existing user work. Preflight must complete before durable writes, and provenance checks must use realpath/symlink-safe ancestry rather than nominal string containment.

### 2.6 Filesystem Evidence, Path Containment, And Symlink Safety

Representative bugs:

- BUG-007 and BUG-008: unsafe record ids and prefix-based containment.
- BUG-011, BUG-012, BUG-019, BUG-026, BUG-037, BUG-068, BUG-077: directories accepted as evidence.
- BUG-063 to BUG-065: state-family and active-workstream symlink escapes.
- BUG-083 to BUG-086: resume, state, active pointer, `.planning`, and context reads/writes could follow symlinks or partially mutate state.
- BUG-091 and BUG-093: dangling symlinks bypassed write/read guards.

Fix pattern:

- Added safe record-id validation.
- Replaced string-prefix containment with `path.relative()` style containment.
- Required regular non-symlink files for evidence artifacts.
- Used `lstat`-based guards for reads and writes.
- Treated dangling symlinks as invalid rather than absent.
- Moved companion handoff path validation before state mutation.

Review lesson:

- Filesystem review must be layered: normal file, missing file, directory, symlink to file, symlink to directory, symlink escape, dangling symlink, unsafe id, sibling-prefix path, and stale artifact must all be tested explicitly. Stopping at "exists" checks is not enough.

### 2.7 State, Documentation, And Review Accounting

Representative bugs:

- BUG-004: tests hard-coded an obsolete current phase.
- BUG-022 to BUG-024: review-loop and roadmap/status docs still claimed earlier success after later fixes reset the clean counter.
- BUG-035: docs drifted after stricter prompt-fidelity scenarios.
- BUG-089: docs and state accounting stopped before Round 10/Round 11 and did not record the capped final state.

Fix pattern:

- Updated canaries to assert durable invariants rather than exact old phase ids.
- Synchronized loop state, final verification, roadmap, state, phase records, review reports, task/progress mirrors, and bug ledger.
- Added docs-contract tests and final `git diff --check`.

Review lesson:

- In GSD-style work, documentation and state are runtime-adjacent artifacts. If they route the next action incorrectly or claim a false pass, they are not "just docs."

## 3. Why New Problems Kept Appearing

The recurring new findings were not mainly because previous fixes were careless. The deeper cause was that the review protocol was expanded while the review was already underway, and each expansion exposed a new dimension of the same system.

### 3.1 The Early Rubric Was Too Lane-Local

The first clean result was produced under a narrower rubric: runtime, install, and representative parity. After the user added stricter requirements, the review expanded to prompt fidelity, Codex conversion correctness, official Codex overlay trustworthiness, richer scenario tests, symlink safety, and capped-loop accounting.

This means "Round 02/Round 03 clean" and "later rounds found bugs" are not contradictory. The target moved from "runs and broadly matches" to "preserves upstream capability, survives adversarial artifacts, and remains correct in generated Codex install output."

### 3.2 The System Has Multiple Truth Surfaces

The same capability can exist in several places:

- upstream GSD/Auto source
- official Codex overlay
- ljx generator source
- local runtime helper
- generated `SKILL.md`
- copied support assets
- preview install output
- tests
- `.planning` roadmap/state/docs

A fix in one surface often revealed drift in another. For example, selecting an official Codex overlay fixed one kind of conversion concern, but later comparison showed the overlay had deleted base Auto prompt obligations. Likewise, source cleanup did not automatically remove stale active preview residue.

### 3.3 Prompt Fidelity Is A Semantic Contract, Not A Grep

The original checks could prove "this skill calls the right helper." They could not prove "this skill will ask the model to do the same quality of work as upstream GSD/Auto."

Prompt bugs appeared late because the review needed to compare:

- base Auto prompt
- official Codex prompt
- converted ljx prompt
- installed preview prompt
- expected research/lifecycle artifact obligations

Only after that comparison did it become obvious that some prompts were thin wrappers that preserved routing while deleting task quality.

### 3.4 Edge Cases Arrived In Layers

The path-safety review evolved in layers:

1. accept only existing artifact
2. require regular file, not directory
3. reject symlinked file/directory
4. reject symlinked parent/family pointers
5. reject dangling symlink before write
6. validate all companion paths before mutation
7. bind backup/report proof to canonical realpaths

Each layer was a stricter version of the same contract. Future review should enumerate all layers at the start rather than discovering them sequentially.

### 3.5 Alias And State Normalization Was Incomplete By Construction

Several gates accepted multiple human-readable or legacy field names: `supportLevel`, `claim_supported`, `verdict`, `status`, `overall_verdict`, and pending/ready aliases. Early fixes normalized one or two fields; later review found another semantically equivalent field that bypassed the same gate.

The correct method is not "fix the next alias." It is to define canonical semantic classes first:

- positive support verdict
- pending review closure
- rerun required/recommended
- terminal capped state
- stale evidence state

Then every input field must normalize through those classes before any routing or persistence decision.

### 3.6 Fixes Created New Accounting Obligations

Every confirmed P0/P1/P2 fix reset the clean-round counter. That means docs, state, and `next` routing had to reflect the new loop state. Several late findings were about stale accounting rather than the original implementation.

This is a GSD-specific lesson: after every fix, the workflow state itself becomes part of the product under review.

### 3.7 Official Codex Conversion Could Not Be Assumed Correct

A major late discovery was that upstream projects originally built for Claude sometimes included official Codex overlays, but those overlays were not uniformly better. Some were more compatible syntactically while weaker semantically.

Future review must separate two questions:

- Does the prompt/tool interface follow Codex conventions?
- Does the prompt still preserve the base skill's capability?

Passing the first does not imply passing the second.

### 3.8 GSD Native Tools And ljx-GSD Extensions Have An Adapter Boundary

Running `$gsd-progress` exposed warnings about extra `.planning/config.json` keys such as `automation_profile`, `discussion`, `models`, `runtime`, `workspace`, `project`, `research`, and `safety` being ignored by native GSD tooling.

This does not automatically mean ljx-GSD is broken, but it is a real adapter-boundary signal: future reviews must explicitly check which config/state keys are native GSD-compatible and which are ljx-GSD extensions. Tool warnings should become review evidence, not background noise.

## 4. Improved Review Scheme For Future Milestones

The next review should not repeat an 11-round incremental loop. It should begin with a consolidated, adversarial inventory and contract matrix, then fix by root-cause batches.

### 4.1 Phase 0: Freeze And Inventory Before Fixing

Before editing any code, produce an inventory with these columns:

- Capability / skill name.
- Upstream GSD or Auto baseline file.
- Official Codex source file, if any.
- ljx generator source.
- runtime helper owner.
- generated preview `SKILL.md`.
- active support assets copied into preview.
- state/artifact families owned.
- current tests.
- expected prompt-quality obligations.
- known adapter risks.

No implementation edits should happen during this inventory phase. The output is a review map, not a patch queue.

### 4.2 Use A Cross-Product Review Matrix

For each important capability, review the cross-product below:

- Source surface: GSD base, Auto base, official Codex overlay, ljx generator, generated preview, archived upstream reference.
- Behavior surface: install/runtime, prompt quality, state mutation, evidence gate, path safety, docs/accounting.
- Input shape: normal file, missing file, directory, symlink, dangling symlink, stale artifact, conflicting state, legacy alias, malformed JSON, disabled config, safe-mode config, autonomous config.
- Lifecycle state: fresh start, mid-phase, post-execute before review, post-fix before rerun, pending clean rounds, capped review, paused, resumed, secondary workstream active.

The reviewer should not stop after one positive path. Each row needs at least one negative/adversarial probe where the contract is safety-sensitive.

### 4.3 Contract-First Finding Protocol

Every candidate finding must be written in this form before a fix:

- Violated contract.
- Evidence/counterexample.
- Affected source surface and generated preview surface.
- Upstream parity reference.
- User scenario affected.
- Minimal root-cause batch it belongs to.
- Proposed invariant.
- Required regression test.
- Expected docs/state update.

If these fields cannot be filled, the item is not ready to fix. This prevents blind edits and "越改越偏" behavior.

### 4.4 Fix By Root-Cause Batch, Not By Symptom

Future fixes should group issues by invariant:

- positive verdict normalization
- pending/rerun state normalization
- regular-file evidence validation
- symlink/dangling-symlink write guards
- prompt capability preservation
- Codex tool-interface rewriting
- migration report preflight
- generated preview cleanup
- review-loop accounting

For each batch:

- update the shared helper or generator once
- add a table-driven regression matrix
- regenerate preview if needed
- run targeted tests
- inspect the active preview output
- update docs/state only after behavior is stable

Do not fix the same invariant in several unrelated local branches unless a shared helper cannot represent the behavior.

### 4.5 Prompt Fidelity Gate

For every generated or preserved skill, create a small "capability obligation checklist" before judging pass/fail:

- required input artifacts
- required output artifacts
- reviewer/evaluator independence
- max rounds / stop condition
- thresholds and severity policy
- evidence requirements
- raw and structured state capture
- human checkpoint or autonomous policy
- external compute/network launch boundary
- continuation/resume semantics
- citation/provenance requirements when research-facing
- Codex tool/API syntax expectations

Pass requires preserving the obligations that make the upstream skill effective, not merely preserving command names. If an official Codex overlay omits required obligations, prefer converting the richer base prompt and documenting the opt-out.

### 4.6 Claude Code To Codex Adapter Gate

Every review must include an explicit adapter lane for:

- active prompt references to Claude Code-only concepts
- stale hook paths, hook templates, or Claude-specific support tools in active install output
- MCP/tool schema differences such as `message` versus old `prompt` blocks
- `reasoning_effort` versus old config field names
- subagent API parameter names accepted by current Codex
- invalid `send_input` / `wait` prose or examples
- `CODEX_SESSION_ID` and session-id validation
- model-name examples that imply Claude-only usage
- archived reference assets clearly separated from active tools
- official Codex overlay semantic parity with base prompt

This lane must inspect both source and `.build/codex-preview/`.

### 4.7 Negative Test Pack

Maintain a reusable negative test pack that every future review runs or extends:

- directory masquerading as required markdown/json evidence
- symlinked required artifact
- dangling symlinked required artifact
- symlinked `.planning`, `STATE.md`, state family, active-workstream pointer, and handoff files
- sibling-prefix path escape
- malformed but parseable non-object JSON
- duplicate migration/session ids
- stale persisted pending state plus newer clean current artifact
- all positive verdict aliases without real evidence
- all pending/rerun aliases across `status`, `verdict`, and canonical fields
- official Codex overlay capability diff against base prompt
- active preview grep for stale Claude/Codex interface strings
- active preview scan for bytecode and stale support-tool residue
- capped review state routing through `progress`, not verification

This pack should be treated as a baseline, not optional extra strictness.

### 4.8 Subagent Allocation For Future Deep Review

When subagents are used, assign non-overlapping lanes and require structured output. Suggested lanes:

- Runtime/state/path safety reviewer.
- GSD lifecycle and code-review/verify parity reviewer.
- Auto/ARIS research and prompt-capability reviewer.
- Claude-to-Codex adapter reviewer.
- Migration/workstream/pause-resume reviewer.
- Documentation/state-accounting reviewer.

Each reviewer must output:

- candidate findings only, no code edits unless explicitly assigned a fix lane
- violated contract
- exact evidence
- root-cause family
- suggested invariant/test
- confidence level
- whether it affects generated preview, docs/state, or both

The orchestrator should deduplicate findings by root-cause family before implementation. This avoids parallel agents producing conflicting local fixes.

### 4.9 Anti-Drift Rules For Fixing

Do not change implementation unless all are true:

- The contract is current scope, not a future wishlist.
- The failure has concrete evidence.
- The owner file/helper/generator is identified.
- The minimal shared invariant is known.
- A regression test or static preview check can be written.
- The generated preview impact is known.
- The docs/state impact is known.
- The change does not rewrite unrelated dirty worktree content.

After the fix:

- run the targeted regression
- run the generated preview build if prompt/install output changed
- inspect active preview for stale residue if support assets changed
- run docs/state checks if workflow state changed
- update the bug ledger last, after verification

### 4.10 Fewer-Round Success Model

The future goal should be:

1. One full inventory and candidate collection pass.
2. One second-pass confirmation and root-cause batching pass.
3. One implementation pass by batch.
4. One targeted verification pass.
5. One independent clean review pass.
6. One final confirmation pass.

If new bugs still appear after this, classify whether they are:

- missed by the initial matrix
- introduced by the fix
- revealed by newly expanded scope
- documentation/accounting drift
- invalid candidate/false positive

Do not simply continue round numbers. Update the matrix first, then continue.

## 5. Practical Checklist Before The Next Review Starts

- Read `BUG-LEDGER.md` and this retrospective.
- Regenerate or validate the source/generator/preview inventory.
- Build the capability obligation checklist for every high-risk skill.
- Run the negative test pack before fixing.
- Treat official Codex overlays as candidates, not authorities.
- Treat generated preview output as a first-class source.
- Treat docs/state routing as runtime-adjacent.
- Batch fixes by invariant.
- Require regression tests for every behavioral fix.
- Require prompt-fidelity assertions for every prompt-capability fix.
- Require active preview scans for every adapter/install fix.
- Stop and update the review matrix when a new family of issues appears.

## 6. Bottom-Line Diagnosis

The repeated findings came from an initially under-specified review strategy, not from a single isolated coding mistake. ljx-GSD is a generator/runtime/state/docs system that merges two upstream skill ecosystems and crosses a Claude Code to Codex adapter boundary. That creates combinatorial review risk.

The next review must therefore be contract-first, matrix-driven, and preview-aware from the beginning. It should check semantic prompt capability preservation as seriously as runtime behavior, and it should test adversarial state/filesystem inputs before declaring a lifecycle or research gate clean.
