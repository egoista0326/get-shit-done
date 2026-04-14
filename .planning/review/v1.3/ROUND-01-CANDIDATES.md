# v1.3 Stage 1 Round 1 Candidates

**Round:** Stage 1 Round 1
**Status:** completed after fixes
**Verdict:** fixed_not_clean
**Clean-count rule:** `.planning` review/accounting updates are ignored for clean count unless they change skill behavior, generated install output, runtime routing, or verification reliability.

## Review Inputs

- Full current implementation and generated preview install.
- Upstream GSD and Auto references under `.planning/references/upstreams/`.
- v1.2 bug ledger and v1.3 protocol.
- Subagent reviews:
  - Schrodinger: help-visible guide/raw auxiliary exposure.
  - Erdos/Gauss: roadmap admin path safety.
  - Hume/Anscombe: Codex conversion and MCP schema/source.
  - Ohm: helper downstream lists and prompt-quality floors.
  - Kepler/Nietzsche: GSD lifecycle parity.
  - Sagan/Volta: code-review/fix/gate.
  - Boyle: original planned active skill content.
  - Kant: lifecycle prompt-fidelity second review.
  - Laplace: research/Auto/paper prompt-fidelity second review.

## Confirmed Candidates

| ID | Candidate | Severity | Confirmation | Clean impact | Fix status |
| --- | --- | --- | --- | --- | --- |
| V13-001 | Help-visible user guide advertised raw auxiliary skill names such as research-lit/paper-plan/code-review-fix. | P2 | Guide is read by `ljx-GSD-help`; raw names are not accepted `ljx-GSD-*` workflow routes. | fail | fixed |
| V13-002 | `ljx-GSD-review-loop` helper omitted `ljx-GSD-result-to-claim` downstream route. | P2 | Auto review-loop should bridge supported/partial outputs through result-to-claim before claim/paper routing. | fail | fixed |
| V13-003 | `ljx-GSD-result-to-claim` helper omitted pivot routes for unsupported claims. | P2 | Upstream Auto result-to-claim splits pivot/supplement/confirm; unsupported claims should route to refine/idea-discovery. | fail | fixed |
| V13-004 | `ljx-GSD-experiment-bridge` helper omitted ablation-planner downstream route. | P2 | Positive/partial results need ablation planning before strong paper claims. | fail | fixed |
| V13-005 | `ljx-GSD-research-refine` prompt quality lost reviewer rubric dimensions and comparable re-review contract. | P2 | Upstream Auto refine depends on Problem Fidelity, Method Specificity, Contribution Quality, Frontier Awareness, Technical Elegance, Experimental Feasibility, and Paper-Readiness. | fail | fixed |
| V13-006 | `ljx-GSD-experiment-plan` prompt quality lost the five-block evidence story. | P2 | Upstream Auto planning expects main anchor, novelty isolation, simplicity/elegance, frontier necessity, and failure analysis. | fail | fixed |
| V13-007 | `ljx-GSD-paper-pipeline` paper-plan contract was too high level. | P2 | Auto paper stages require one-sentence contribution, section plan, figure/table plan, and citation scaffold. | fail | fixed |
| V13-008 | Converted upstream Auto docs still contained active Codex/settings JSON drift and malformed fences. | P2 | Codex installs must not present Claude/settings JSON as active Codex config. | fail | fixed |
| V13-009 | Gemini/Claude review MCP reply schemas did not require a thread identifier. | P2 | Reply tools cannot safely route stateful reviewer interaction without thread/agent identity. | fail | fixed |
| V13-010 | Roadmap add/insert could scan symlinked `phase-records` before validating the state family. | P2 | State-family path validation must happen before authoritative phase-id collection. | fail | fixed |
| V13-011 | Roadmap remove accepted symlink/dangling authoritative phase directories. | P2 | Future-phase deletion must not follow or remove unsafe path targets. | fail | fixed |
| V13-012 | Code-review git fallback could choose unrelated dirty files or miss decimal/conventional phase commits. | P2 | Review scope must be phase-proven before freshness/gate decisions. | fail | fixed |
| V13-013 | Code-review-fix and gate parsing mismatched upstream-style blocked findings. | P2 | GSD REVIEW.md can use `### CR-`/`### WR-` and blocked status without the newer overall verdict field. | fail | fixed |
| V13-014 | Malformed CODE_REVIEW artifacts could be treated as clean. | P2 | Quality gates must fail closed on malformed review evidence. | fail | fixed |
| V13-015 | Lifecycle helpers silently ignored unsupported upstream flags. | P2 | Unknown flags such as `--force`/`--gaps` must fail closed instead of changing meaning. | fail | fixed |
| V13-016 | Progress/next could mask an incomplete earlier plan when a later summary existed. | P2 | Lifecycle completion must respect the current plan inventory, not later unrelated summaries. | fail | fixed |
| V13-017 | Terminal review phase record detection was case sensitive. | P3 | Capped terminal states should be recognized consistently. | minor but fixed | fixed |
| V13-018 | `ljx-GSD-complete-milestone` was missing from the built command surface. | P2 | Original migration docs and architecture require preserving `gsd-complete-milestone`; upstream includes audit/archive/PROJECT/tag semantics. | fail | fixed |
| V13-019 | `ljx-GSD-pause-work` still dropped upstream handoff depth. | P2 | Upstream GSD writes contextual `.continue-here.md`, required reading, anti-patterns, infra, pre-exec critique, uncommitted files, and WIP commit status. | fail | fixed |
| V13-020 | `code-review-fix` prompt did not explicitly preserve upstream atomic per-finding commit/no-commit reporting. | P3 hardening | Kant marked needs-more-evidence; preserving the upstream safety signal is low-risk and prevents future prompt degradation. | no extra clean reset because Round 1 already failed | fixed |
| V13-021 | Claim-gate/rebuttal prompt-quality floors were not asserted explicitly. | P3 hardening | Laplace found generated output currently acceptable, but tests did not lock these high-risk prompts. | no extra clean reset | fixed |
| V13-022 | Exported `buildRebuttalSkill` did not pass through the same self-contained builder wrapper as most other research builders. | P3 hardening | Generated install was clean; builder-level fixture coverage was weaker. | no extra clean reset | fixed |

## Rejected Or Needs More Evidence

| Candidate | Disposition | Reason |
| --- | --- | --- |
| Original active skill content surface incomplete | rejected | Boyle found no confirmed mismatch against the accepted active manifest; several conceptual commands remain intentionally out of the built surface. |
| Research/paper generated prompts call raw Auto/GSD skills | rejected | Laplace found false positives only; generated ljx-GSD prompts route through formal `ljx-GSD-*` skills or internal stage prose. |
| `ljx-GSD-workspace-admin` absent | needs policy evidence | Design distinguishes logical workstreams and physical workspaces, but workspace admin is marked less specified. Stage 2 must verify that workspace scenarios stop honestly or route correctly. |
| Upstream Auto skill library installed as top-level compatibility/reference skills | needs policy evidence | Current design/tests permit installing the upstream library as managed support/reference inventory while forbidding `ljx-GSD-*` prompts from invoking raw Auto skills. |

