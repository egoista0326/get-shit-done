# v1.2 Round 04 Candidate Intake

**Date:** 2026-04-12
**Purpose:** re-review after Round 3 fixes with the upgraded protocol, using a stricter split between normal-use blockers, prompt-fidelity regressions, Codex-conformance drift, and rare/minor issues.

## Candidate Matrix

| Lane | Source | Candidate | Disposition |
| --- | --- | --- | --- |
| Self-contained invocation coverage | local generated-skill tests + James add-on review | The direct exported builder coverage did not include every bridge builder and could miss raw upstream names before install postprocessing. | confirmed as V12-028 |
| Self-contained invocation coverage | local test design | Raw upstream skill names in recommendation/handoff command slots could appear as backticked commands without `$` or `/` syntax. | confirmed as V12-028 |
| Path safety | local code-review/verify/lifecycle tests | Parent-directory symlinks under reviewed or verified evidence paths could still pass some scope/evidence checks. | confirmed as V12-029 |
| Quality gates | local verify-work tests | Explicit `blocked` code-review state could be ignored when the artifact looked otherwise fresh. | confirmed as V12-030 |
| Runtime-state IO | local runtime-state failure injection | Direct state writes could leave partial/corrupt records if a write failed mid-file. | confirmed as V12-031 |
| Install safety | local install fixture | Exact dangling symlink support asset files could be written through before managed-install conflict checks caught them. | confirmed as V12-032 |
| Migration safety | local migration fixture | Exact dangling symlink suggested-branch records could be written through. | confirmed as V12-033 |
| Pause/resume | local runtime-shell fixture | Resume cleanup failure could produce contradictory state by consuming one handoff artifact but not the other. | confirmed as V12-034 |
| Codex conformance | local skill-build inspection | MiniMax environment guidance still used stale or ambiguous config wording after conversion. | confirmed as V12-035 |
| Codex hook conformance | local skill-build inspection | Preserved upstream Auto docs could still tell Codex users to paste Claude JSON hooks into Codex config. | confirmed as V12-036 |
| Codex hook conformance | local preview inspection | Generated Codex TOML hook templates did not explicitly enable `codex_hooks`. | confirmed as V12-037 |
| Code-review scope | local git fixture | Git fallback phase-diff detection was overbroad and could match unrelated commit messages such as `phase 06 changes`. | confirmed as V12-038 |
| Prompt fidelity | prompt-quality review | `ljx-GSD-research-pipeline` did not fully carry Auto's policy knobs and final-report expectations into the typed phase-chain prompt. | confirmed as V12-039 |
| Prompt fidelity | prompt-quality review | `ljx-GSD-experiment-bridge` still needed stronger recovery/log/budget/audit/ablation follow-through requirements. | confirmed as V12-040 |
| Prompt fidelity | prompt-quality review | `ljx-GSD-review-loop` still needed stronger termination, citation, method-output, and supported-result routing requirements. | confirmed as V12-041 |
| GSD parity | upstream workstream comparison | `ljx-GSD-workstreams create` did not match upstream GSD's create-and-activate behavior. | confirmed as V12-042 |
| GSD parity | upstream pause-work comparison | `ljx-GSD-pause-work` prompt compressed upstream handoff richness and did not preserve WIP commit/no-commit recovery guidance. | confirmed as V12-043 |
| Self-contained invocation coverage | James add-on review + local test | Backticked descriptive raw skill names such as `idea-discovery`, `result-to-claim`, and `auto-review-loop` could survive without call verbs. | confirmed as V12-044 |

## Round 4 Self-Contained Addendum

The user's added requirement is stricter than "no runtime bug": every `ljx-GSD-*` skill must be prompt-self-contained. Round 4 therefore treats these as blocking unless they are only extreme/rare minor cases:

- no raw GSD or Auto skill invocation through `$...`, `/...`, bare imperatives, recommendation/handoff slots, or backticked descriptive names
- direct builder output must satisfy the same rule before install postprocessing
- generated preview output must satisfy the rule after prompt-quality floors and converter rewrites
- preserving Auto/GSD capability must happen by restating the needed behavior as internal `ljx-GSD` stage semantics, not by delegating to raw upstream skill names

## Notes

- Round 4 is not clean because it confirmed normal-use P1/P2 issues across prompt fidelity, state safety, Codex conformance, and GSD parity.
- The self-contained lane is now a first-class test class and a preview-output scan, not just a manual grep.
- The prompt-fidelity findings are capability-preservation bugs: a flow can execute without crashing but still be defective if the prompt quietly removes upstream GSD/Auto behavior that affects task quality.
