# v1.4 Self-Contained Runtime And Scenario Review Protocol

**Started:** 2026-04-13
**Trigger:** User clarified that `ljx-GSD` must run independently even when upstream GSD and Auto/ARIS are not installed, and must stay inside its own `ljx-GSD-*` workflow when upstream GSD or Auto/ARIS are installed.
**Supersedes:** v1.3 capped Stage 1 gate for the next review attempt. v1.3 remains historical capped_not_clean evidence.

## Hard Invariants

- `ljx-GSD` must be an independent closed-loop skill system.
- A machine with only `ljx-GSD` installed must be able to run the supported `ljx-GSD-*` workflows without relying on global upstream GSD or Auto/ARIS skills.
- A machine that also has upstream GSD or Auto/ARIS installed must still keep `ljx-GSD-*` execution inside the `ljx-GSD` command/runtime system.
- Upstream GSD and Auto/ARIS are reference baselines and build-time capability sources, not runtime workflow dependencies.
- Bundled upstream-derived docs/templates/scripts are allowed only as `ljx-GSD` internal assets when they are shipped and resolved through the `ljx-gsd/` install tree.
- Generated `ljx-GSD-*` skills must not call raw `$gsd-*`, `/gsd-*`, raw Auto/ARIS skills, or global helper paths such as `$HOME/.codex/get-shit-done`.
- Capability preservation remains mandatory: removing raw upstream calls is not enough if the replacement prompt/stage drops GSD or Auto/ARIS quality requirements.

## Review Structure

### Stage A: Regular Skill Review

- Maximum rounds: 10.
- Early exit: after two consecutive clean rounds.
- If 10 rounds are reached without two consecutive clean rounds, record `regular_capped_not_clean` and proceed to Stage B anyway.
- Scope: source helpers, build/install code, generated `SKILL.md`, packaged runtime/assets, docs that affect behavior, tests, config propagation, artifact/state mapping, and external dependency isolation.

### Stage B: Scenario Review

- Starts only after Stage A exits, whether clean or capped.
- Maximum rounds: 10.
- Early exit: after two consecutive clean scenario rounds.
- Each round uses temporary scenario workspaces and subagents. The main agent simulates user prompts and requires every subagent to report:
  - exact `ljx-GSD-*` skills used,
  - ordered execution chain,
  - artifacts created/read/updated,
  - observed config values and overrides,
  - whether raw GSD or raw Auto/ARIS skills were invoked,
  - hook/support-asset expectations and observations,
  - stop/confirmation points,
  - cleanup status.

## Clean Accounting

- P0/P1/P2 findings reset the current stage clean streak to 0 after fixes.
- P3/minor findings may be fixed while still counting a round as clean only if they are extreme, rare, or normal-use-non-impacting.
- `.planning` review/accounting document updates do not reset clean count by themselves.
- `.planning` updates do count as implementation findings if they affect skill routing, artifact lookup, state recovery, config inheritance, hidden implementation defects, install output, or verification reliability.
- Every accepted issue must be second-pass confirmed against upstream behavior, accepted `ljx-GSD` design, generated install output, runtime correctness, or a failing scenario transcript.
- Every accepted issue must be recorded in `BUG-LEDGER.md` with root cause, fix summary, affected files, and verification.

## Regular Review Matrix

Each Stage A round must cover these families:

1. **Independent install/runtime closure**
   - Verify generated skills and runtime helper paths are self-contained.
   - Check no runtime dependency on global GSD, global Auto/ARIS, user skill inventory, or local upstream clone paths.
   - Include poison tests where raw upstream skills exist but must not be called.

2. **Generated skill self-containment**
   - Scan generated `ljx-GSD-*` skills for raw GSD/Auto `$...`, slash aliases, bare imperatives, backticked names, recommendation slots, local suffix names, and caller override maps.
   - Check generated descriptions do not cause users or implicit matching to select raw upstream skills.

3. **Prompt-fidelity preservation**
   - Compare high-risk prompts to upstream GSD and Auto/ARIS intent.
   - Ensure internal stages preserve Auto/ARIS quality details such as reviewer independence, raw review logs, result-analysis tables, claim weakening, experiment integrity, citation discipline, and paper/rebuttal gates.
   - Ensure GSD lifecycle prompts preserve phase routing, progress, pause/resume, workstreams, code review, verification, and bounded autonomous behavior.

4. **Build source selection**
   - Audit `ACTIVE_AUTO_CODEX_SOURCE_OPTOUTS` and any similar source choice.
   - Codex-native upstream skills are preferred only when they do not compress base Auto/ARIS capability.
   - If base Auto/ARIS is converted instead, the converter must produce Codex-valid output and preserve quality floors.

5. **Artifact ledger and file traceability**
   - For every research workflow, map upstream Auto/ARIS artifacts to `ljx-GSD` canonical phase-local paths, structured state pointers, and mirrors.
   - Test create -> locate -> read -> update -> resume -> migrate behavior.
   - Prevent orphan root-level Auto artifacts from becoming a second control plane.

6. **Config and variable propagation**
   - Check global `.planning/config.json`, automation profiles, phase `config_overrides`, phase `workflow_overrides`, CLI flags, and legacy uppercase Auto aliases.
   - Verify safe/autonomous, human checkpoints, auto proceed, reviewer difficulty/model, launch confirmation, base repo, compact mode, GPU budgets, seeds, W&B, and paper/rebuttal limits.
   - Identify any path where raw GSD config readers ignore `ljx-GSD` config keys.

7. **Codex hook and adapter conformance**
   - Use Codex hook schema fields only; do not invent Claude hook environment variables.
   - Hooks are advisory/fail-open and cannot own authoritative state.
   - Check generated hook/support assets use Codex-compatible paths and do not depend on `.claude` or Claude-only config.

8. **Runtime state/path safety**
   - Recheck exact symlinks, symlinked ancestors, dangling paths, directory-as-file, state-family roots, temp writes, rollback, and happy paths.
   - Include packaged install roots and scenario temp roots, not only source tree paths.

9. **Lifecycle quality gates**
   - Verify code-review/fix/verify freshness, blocked/warning/terminal/pending states, git fallback, and goal-backward verification.
   - Do not accept `SUMMARY.md` alone as proof of delivery.

10. **Migration, workstreams, and workspace boundary**
   - Check old GSD `.planning` projects and old Auto root artifacts can be detected/imported/attached or safely rejected.
   - Keep workstream as logical branch and workspace/worktree as physical isolation.

11. **Research/paper/rebuttal evidence**
   - Cover idea discovery, literature, novelty, refinement, experiment planning/execution, review loops, result analysis, claim gates, paper, and rebuttal.
   - Validate no-fabrication, no-overclaim, bounded loop, and evidence-linking contracts.

## Scenario Matrix

Stage B must cover these scenario families across rounds:

- Full engineering lifecycle.
- Full research lifecycle from idea to paper.
- Result-analysis and claim judgment from JSON/CSV/log-backed outputs.
- Legacy Auto root artifact import/attach and later lookup.
- Pause/resume mid-phase with structured handoff and workstream context.
- Workstream and workspace/worktree boundary.
- Safe versus autonomous config behavior.
- Code-review defect -> fix -> verify loop.
- Paper/rebuttal with venue/evidence constraints.
- External dependency poison scenario with raw GSD/Auto installed but not used.

## Required Verification Commands

Minimum verification after any fix:

- targeted regression tests for touched families,
- `node bin/install.js --preview`,
- generated `ljx-GSD-*` raw invocation scan,
- independent packaged-path scan for global GSD/Auto dependency,
- relevant scenario transcript or non-automatable evidence,
- `node --test tests/docs-contract.test.cjs`,
- full `node --test tests/*.test.cjs` before stage/round closure when feasible,
- `git diff --check`.

## Round Artifacts

Each round writes:

- `ROUND-XX-CANDIDATES.md`
- `ROUND-XX-REVIEW.md`
- bug ledger rows for confirmed issues
- verification evidence
- scenario cleanup notes for Stage B

Round verdicts:

- `clean`
- `minor_clean`
- `fixed_not_clean`
- `regular_capped_not_clean`
- `scenario_capped_not_clean`
- `blocked`
