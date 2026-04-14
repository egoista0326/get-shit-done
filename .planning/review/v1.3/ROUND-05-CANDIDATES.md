# v1.3 Stage 1 Round 5 Candidates

**Round:** Stage 1 Round 5
**Scope:** final capped static/implementation re-review after Round 4 fixes.
**Accounting rule:** `.planning` review/accounting updates are ignored for clean-count purposes unless they change skill behavior, install/runtime routing, state recovery, hidden defects, or verification reliability.

## Review Slices

| Reviewer | Focus | Outcome |
| --- | --- | --- |
| Nash | Research-pipeline policy/handoff fixes and code-review git fallback | No new confirmed defect. |
| Rawls | Resume/pause transactionality and workstream state | Confirmed P2 resume false-positive for valid phase-local handoff when unused root `.continue-here.md` residue is invalid. |
| Franklin | Prompt fidelity, experiment-bridge parity, self-containment | No new confirmed defect; kept result-analysis parity as Stage 2 watch before Ptolemy's stricter parity finding. |
| Carson | Codex conversion, preview hooks, helper paths, raw residues | No new confirmed defect; Stage 2 should still validate adapter behavior live. |
| Ptolemy | Original planning parity and public surface coverage | Confirmed P2 result-analysis parity gap inside `ljx-GSD-*` paths. |
| Bohr | Stage 2 readiness, code-review/fix loop, verify-work gate | Confirmed P2 code-review gate / fix-loop schema mismatch for upstream-style `CR-*` / `WR-*` artifacts. |

## Accepted Candidates

| ID | Severity | Clean Impact | Summary | Second-Pass Confirmation |
| --- | --- | --- | --- | --- |
| V13-038 | P2 | reset | `resumeFromHandoff` validated the root `.planning/.continue-here.md` path before parsing a structured handoff, so a valid phase-local handoff could be blocked by unrelated root residue. | Rawls repro plus local red test: valid `HANDOFF.json` pointing at `.planning/phases/03-experiment/.continue-here.md` returned `resumed: false` when root `.continue-here.md` was a directory. |
| V13-039 | P2 | reset | Code-review quality gate rejected upstream-style `### CR-*` / `### WR-*` findings as invalid schema, while `ljx-GSD-code-review-fix` accepted the same artifact as fixable. | Bohr evidence plus local red test showing `syncCodeReviewGateState` returned `invalid_artifact_schema` instead of routing to `ljx-GSD-code-review-fix`. |
| V13-040 | P2 | reset | `analyze-results` was preserved only as managed upstream inventory, not as a self-contained internal result-analysis stage in `ljx-GSD-review-loop`, `ljx-GSD-claim-gate`, and `ljx-GSD-result-to-claim`. | Ptolemy compared original planning docs and upstream Auto `analyze-results`; local red tests showed helper contexts/prompts omitted result-analysis stage details and prompt-quality assertions did not cover JSON/CSV tables, deltas, seed stats, trends, or outliers. |

## Rejected Or Deferred Candidates

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Round 4 research-pipeline fixes still broken | Rejected | Nash confirmed policy propagation, malformed-config fail-closed behavior, stage handoff metadata, and multi-commit code-review fallback. |
| Experiment-bridge BASE_REPO/COMPACT still incomplete | Rejected | Franklin confirmed helper and generated prompt preserve `baseRepo/base_repo`, `compactMode`, `IDEA_CANDIDATES`, `EXPERIMENT_LOG`, `defaultSeeds`, `codeSyncMethod`, and `wandbEnabled`. |
| Codex hook/helper path conversion broken | Rejected for Stage 1 | Carson confirmed generated preview hook TOML, installed helper paths, and raw Claude/GSD/Auto residue scans in the static scope. Live adapter behavior remains Stage 2 evidence. |
| Managed upstream Auto library violates self-containment by existing | Deferred policy/watch | Static rule is that generated/active `ljx-GSD-*` skills must not call raw upstream skills. Managed upstream support inventory is still present by design and must be controlled by Stage 2 exact chain transcripts. |
| Verify-work goal-backward quality | Deferred Stage 2 evidence | Bohr found prompt floor exists, but live scenario transcripts must prove ROADMAP/requirements/PLAN must-haves drive verification rather than SUMMARY-only review. |
| Workstreams/workspace boundary | Deferred Stage 2 evidence | Static docs/prompt distinguish logical workstreams from physical workspaces; Stage 2 must include a physical-workspace request scenario. |
