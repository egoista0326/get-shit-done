# v1.1 Round 10 Expanded Review

**Date:** 2026-04-12
**Scope:** Fresh post-Round09 review with more granular subagent lanes for prompt capability preservation, Codex conversion, lifecycle/quality gates, runtime/path safety, migration safety, and documentation accounting.
**Status:** Not clean; confirmed issues fixed; clean streak remains 0.

## Review Inputs

- Current implementation after Round 09 fixes.
- User constraint: do not reduce GSD or Auto research skill capability while making the surface run in Codex.
- User constraint: explicitly audit Claude Code -> Codex conversion, including paths, hooks, MCP assets, support tools, and subagent interface vocabulary.
- User constraint: use more specialized subagents and stricter scenario coverage.

## Review Lanes

| Lane | Result |
|------|--------|
| Codex conversion/install residue | Confirmed stale active support residue and conversion wording around bytecode, stale hook directories, and `Claude's context` phrasing. |
| Auto prompt/source fidelity | Confirmed official Codex overlays for `monitor-experiment`, `idea-discovery`, and `paper-plan` deleted base Auto capability details. |
| Claim/evidence semantics | Confirmed positive verdict aliases could bypass supported-claim evidence and audit gates. |
| Code-review/fix lifecycle gates | Confirmed directory masquerade artifacts, stale persisted pending status precedence, unknown rerun policy drift, and thin code-review-fix auto prompt semantics. |
| GSD lifecycle prompt fidelity | Confirmed `plan-phase` weakened independent plan-checker expectations into self-review-style wording. |
| Pause/resume handoff | Confirmed handoff prompt/runtime context was too thin and resume could partially consume a handoff when the markdown path was invalid. |
| Runtime state/path safety | Confirmed symlink-following gaps across state records, active workstream pointers, state-family paths, `.planning`, and project state discovery. |
| Migration/context path safety | Confirmed migration backup/report/context checks could accept symlinked paths or non-real project roots. |

## Confirmed Findings

| ID | Severity | Finding | Confirmation | Fix |
|----|----------|---------|--------------|-----|
| BUG-072 | P3 | Active install could retain bytecode/stale Claude hook residue and a support-tool comment still said `Claude's context`. | Preview scans and source inspection found active `tools/__pycache__`, empty `templates/claude-hooks`, and stale wording. | Generalized bytecode cleanup, pruned stale empty hook dirs, and rewrote the support comment to `Codex context`. |
| BUG-073 | P1 | The active `monitor-experiment` Codex source dropped base Auto monitoring capabilities such as Vast.ai, Modal, W&B, and cost/progress checks. | Prompt comparison against base Auto confirmed the official Codex overlay was materially thinner. | Added `monitor-experiment` to the Codex-source opt-out list so the richer base Auto prompt is converted for Codex. |
| BUG-074 | P2 | The active `idea-discovery` Codex source dropped `RESEARCH_BRIEF.md` continuation semantics. | Prompt comparison confirmed the generated active prompt no longer carried that upstream artifact obligation. | Added `idea-discovery` to the Codex-source opt-out list and regression-checked the generated prompt. |
| BUG-075 | P2 | The active `paper-plan` Codex source dropped the one-sentence contribution requirement. | Prompt comparison confirmed the official Codex overlay omitted the base Auto paper-planning obligation. | Added `paper-plan` to the Codex-source opt-out list and regression-checked the generated prompt. |
| BUG-076 | P1 | Positive verdict aliases such as verdict-only `ready` / `supported` could bypass evidence and audit gates. | Targeted result-to-claim and claim-gate tests showed supported claims could be persisted without the same support-evidence checks. | Normalized positive verdict aliases through the supported/partial/unsupported mapper and applied the existing evidence/audit gates. |
| BUG-077 | P2 | `code-review-fix` accepted directories masquerading as `CODE_REVIEW` or fix-report artifacts. | Directory fixtures were treated as usable artifacts because the helper checked existence rather than regular-file type. | Added regular-file validation for review artifacts, fix reports, and persisted post-fix state paths. |
| BUG-078 | P2 | Stale persisted pending review/verification states could override newer clean current artifacts. | Quality-gate tests showed a clean artifact could be downgraded by old pending status state. | Removed stale pending statuses from current-artifact override precedence so fresh clean/ready artifacts supersede old pending state. |
| BUG-079 | P2 | Unknown post-fix rerun policies normalized to the wrong recommendation path. | Bridge-contract review found an unsupported policy could avoid the intended conservative recommendation. | Normalized unknown post-fix rerun policies to `recommend`. |
| BUG-080 | P2 | `ljx-GSD-plan-phase` prompt wording weakened the independent GSD plan-checker expectation. | Prompt review found `plan-checker style self-review` language that did not require a fresh-context independent checker. | Strengthened the prompt quality floor to require an independent fresh-context plan-checker review. |
| BUG-081 | P2 | `ljx-GSD-code-review-fix --auto` prompt lacked the GSD fix-loop bounds and same-scope rerun semantics. | Prompt review confirmed no max-iteration cap, same-depth/same-scope rerun requirement, or final sync requirement. | Added max three fix/review iterations, same phase/scope/depth reruns, and final sync instructions. |
| BUG-082 | P2 | `pause-work` / `resume-work` handoff content was too thin for GSD-quality continuation. | Prompt/runtime review found missing completed tasks, remaining work, decisions, modified files, blockers, background processes, and context notes. | Added detailed handoff fields and rendered/restored those sections in pause/resume artifacts. |
| BUG-083 | P1 | `resumeFromHandoff()` could partially consume a handoff if `.continue-here.md` was a directory. | A regression fixture showed `HANDOFF.json` could be consumed before validating the markdown companion path. | Validated both `HANDOFF.json` and `.continue-here.md` before mutation and returned restored context only after both paths were safe. |
| BUG-084 | P1 | Existing symlinked state record and active-workstream pointer files could be followed on write. | Runtime/workstream tests showed write guards rejected some paths but still followed existing symlinks. | Added lstat-based symlink/non-regular checks before state record and active pointer writes. |
| BUG-085 | P1 | Runtime state-family and active-workstream reads could follow symlinked state paths. | Review found `stat`/existence checks that treated symlinked state families as ordinary directories/files. | Switched reads and family validation to symlink-safe lstat checks. |
| BUG-086 | P1 | Symlinked `.planning` or `STATE.md` paths could be accepted during project discovery/context reads. | Runtime-core and phase-context review found project discovery and context collectors followed symlinks. | Rejected symlinked `.planning`, required safe regular-file state/context files, and added regressions. |
| BUG-087 | P1 | Migration backup provenance could be mis-bound when the backup ancestor was a symlink. | Migration review found backup copy containment used nominal paths instead of realpath/lstat ancestry. | Bound backup roots and ancestors to symlink-safe realpaths under `.planning/legacy-backups`. |
| BUG-088 | P2 | Migration reports and phase context could accept symlinked files as evidence. | Migration/context review found report and context collectors that accepted symlinked files. | Added symlink-safe report/context path validation and regular-file checks. |

## Verification After Fixes

Commands run after Round 10 fixes:

- `node --check bin/lib/build-skills.cjs`
- `node --check bin/lib/codex-conversion.cjs`
- `node --check bin/lib/ljx-code-review-fix-tools.cjs && node --check bin/lib/ljx-quality-gates-tools.cjs && node --check bin/lib/ljx-state-tools.cjs`
- `node --check bin/lib/ljx-runtime-core.cjs && node --check bin/lib/ljx-runtime-state.cjs && node --check bin/lib/ljx-workstreams-tools.cjs && node --check bin/lib/ljx-migration-tools.cjs`
- Focused regression suites for skill-build, claim/result gates, code-review/verify gates, runtime state/shell/core/workstreams, and migration cutover.
- `node bin/install.js --preview`
- `node --test tests/*.test.cjs` after the Round 10 fix pass.

## Clean-Round Accounting

Round 10 is not clean because it confirmed and fixed BUG-072 through BUG-088. The clean streak remains 0.

Because the hard cap is 11 total rounds, Round 11 became the final allowed review round. It would have needed to be clean and still could not satisfy the two-clean-round rule by itself after Round 10 found issues.
