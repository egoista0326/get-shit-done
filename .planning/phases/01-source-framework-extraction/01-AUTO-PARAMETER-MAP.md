# 01-AUTO-PARAMETER-MAP

**Status:** build-round draft
**Evidence boundary:** Synthesized from Auto/ARIS subagent reports. Current external model/service availability was not verified.

## Global And Cross-Workflow Knobs

| Parameter | Extracted default/values | Applies to | v2.0 preservation rule |
|---|---|---|---|
| `effort` | `lite`, `balanced`, `max`, `beast`; default `balanced` | All research skills | Changes breadth/depth/iterations, not hard invariants. |
| Reviewer reasoning effort | Codex review hard invariant xhigh in upstream reports | Review-capable skills | Do not downgrade review quality for low effort; disclose degraded backend. |
| `AUTO_PROCEED` | Often `true` in upstream orchestrators | Stage gates/checkpoints | May continue only through safe local steps after required evidence and service policy are satisfied; never overrides hard gates. |
| `HUMAN_CHECKPOINT` | Often `false`; review-loop intervention knob | Review loops and wrappers | If true, forces pause at review/decision checkpoints even when `AUTO_PROCEED=true`. |
| `REVIEWER_MODEL` | Source reports cite `gpt-5.4` | Review-capable commands | Model/provider must be configurable and recorded. |
| `COMPACT` | `false` default in several flows | Recovery/context reduction | Preserve as artifact-output mode. |

## Canonical Continuation Rule

Precedence for v2.0 research commands:

1. Hard gates block first: missing required evidence, blocking audit/verification failure, external-service confirmation, destructive write, budget limit, or explicit human stop.
2. `HUMAN_CHECKPOINT=true` pauses at review/decision checkpoints.
3. `AUTO_PROCEED=true` may continue only through safe local steps whose required inputs/evidence are present and whose service policy is already satisfied.
4. Review loops stop successfully only when score >= `POSITIVE_THRESHOLD` and reviewer verdict is positive/accept/pass.
5. `AUTO_PROCEED=false` pauses at the next non-trivial stage boundary after writing current evidence.

## Literature And Discovery Knobs

| Parameter | Extracted default/values | Contract |
|---|---|---|
| `sources` | `zotero`, `obsidian`, `local`, `web`, `deepxiv`, `all`; Semantic Scholar is part of `web`, while `deepxiv` is explicit opt-in beyond default `all` | Preserve exact semantics or rename to avoid surprise. |
| `ARXIV_DOWNLOAD` | `false` | Download opt-in. |
| `ARXIV_MAX_DOWNLOAD` | `5` | Explicit cap. |
| `REF_PAPER` | `false` or path/URL/arXiv URL | Produces `REF_PAPER_SUMMARY.md`. |
| `BASE_REPO` | `false` or repo URL | Context for later implementation; front half should not clone/build by default. |
| `MAX_PILOT_IDEAS` | `3` | Pilot cap. |
| `MAX_TOTAL_GPU_HOURS` | `8h` | Total pilot budget. |
| `PILOT_MAX_HOURS` | `2h` | Skip expensive pilots. |
| `PILOT_TIMEOUT_HOURS` | `3h` | Hard timeout with partial results. |

## Refinement And Experiment Planning Knobs

| Parameter | Extracted default/values | Contract |
|---|---|---|
| `MAX_ROUNDS` | `5` for refinement; `4` in auto review loop | Stop loop bound. |
| `SCORE_THRESHOLD` | `9` for refinement | Stop if ready and no drift. |
| `MAX_LOCAL_PAPERS` | `20` for lit, `15` for refine | Command-specific defaults. |
| `MAX_PRIMARY_CLAIMS` | `2` | Prevents claim sprawl. |
| `MAX_CORE_BLOCKS` | `5` | Keeps must-run evidence compact. |
| `MAX_BASELINE_FAMILIES` | `3` | Baseline cap. |
| `DEFAULT_SEEDS` | `3` | Use for variance/budget-sensitive experiments. |

## Execution And Provider Knobs

| Parameter | Extracted values | Contract |
|---|---|---|
| `gpu` | `local`, `remote`, `vast`, `modal` | Selects execution backend adapter. |
| Remote SSH/code sync | SSH alias, GPU inventory, conda, code dir, `rsync`/`git` | Store in project config, not scattered prompt text. |
| W&B | `wandb`, `wandb_project`, `wandb_entity`, `WANDB_API_KEY` | Optional evidence provider; store run URL/id. |
| Vast.ai | `auto_destroy`, `max_budget`, image, offer/instance IDs, `vast-instances.json` | Never destroy before collecting results. |
| Modal | GPU type, timeout, volume | Optional backend; pricing/current availability must be verified at implementation time. |
| Watchdog | `--base-dir`, `--interval`, task fields, GPU idle/speed thresholds | Process monitoring only, not claim evidence. |

## Review And Paper Knobs

| Parameter | Extracted default/values | Contract |
|---|---|---|
| `difficulty` | `medium`, `hard`, `nightmare` | Preserve as direct flag with clear independence semantics. |
| `POSITIVE_THRESHOLD` | Score threshold for review-loop success; v2.0 canonical predicate is score >= threshold AND reviewer verdict is positive/accept/pass | Preserve the stricter deterministic stop predicate across docs, prompts, tests, and implementation. |
| `VENUE` / `TARGET_VENUE` | `ICLR` default; `ICLR`, `NeurIPS`, `ICML`, `CVPR`, `ACL`, `AAAI`, `ACM`, `IEEE_JOURNAL`, `IEEE_CONF` | Drives style/page/citation rules. |
| `MAX_PAGES` | Venue-sensitive | Enforce with compile gate. |
| `ANONYMOUS` | `true` for submissions, false for camera-ready; IEEE often non-anonymous | Preserve anonymity checks. |
| `DBLP_BIBTEX` | `true` | Citation verification default. |
| `MAX_IMPROVEMENT_ROUNDS` | `2` | Paper improvement bound. |
| `MAX_STRESS_TEST_ROUNDS` | `1` | Rebuttal stress test bound. |
| `MAX_FOLLOWUP_ROUNDS` | `3` | Rebuttal follow-up bound. |
| `AUTO_EXPERIMENT` | `false` | Rebuttal evidence-sprint switch; keep explicit. |
| `QUICK_MODE` | `false` | Rebuttal shortcut switch. |

## Reviewer Backend Knobs

| Backend | Source-extracted config | v2.0 rule |
|---|---|---|
| Generic OpenAI-compatible | `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL`, `LLM_FALLBACK_MODEL`, `LLM_SERVER_NAME` | Provider abstraction with provenance. |
| MiniMax | `MINIMAX_API_KEY`, `MINIMAX_BASE_URL`, `MINIMAX_MODEL`, optional temperature | Optional reviewer adapter. |
| Gemini bridge | `GEMINI_REVIEW_BACKEND=api`, model/API model/API key, async review tools | Prefer async for long prompts. |
| Claude bridge | `CLAUDE_REVIEW_MODEL`, `CLAUDE_REVIEW_TOOLS`, `CLAUDE_BIN` | Optional local CLI reviewer path. |

Default v2.0 reviewer policy:

- Use Codex subagents as the default reviewer backend when available.
- Fallback order is configured OpenAI-compatible LLM, then Gemini/Claude/MiniMax adapters only when configured and allowed by service policy.
- `difficulty` changes review depth, number of rounds, and independence strength. It does not silently change provider unless the reviewer backend policy explicitly says so.

## Policy Decisions Needed

- Which audit categories are always blocking versus downgrade-only within the default claim/paper blocking policy?
- Should `sources: all` preserve upstream DeepXiv opt-in semantics or be renamed?
- Which venue matrix is in initial scope for paper/rebuttal commands?
- Which root Auto import/export mirrors should v2.0 support in addition to authoritative phase-local artifacts?
