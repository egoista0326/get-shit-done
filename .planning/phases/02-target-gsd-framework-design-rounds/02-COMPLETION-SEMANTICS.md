# Phase 02 Completion Semantics

**Status:** approved target under Phase 05 final review
**Generated:** 2026-04-14
**Target architecture:** Research Command Compiler under GSD lifecycle ownership

## Principle

Research command completion is evidence-based. It cannot be inferred from summaries, checkboxes, file presence, or command progress text.

Clean completion requires raw evidence plus relevant review/verify/UAT gates and explicit lifecycle acceptance.

## Completion Authority

GSD owns phase completion.

Research helpers may report evidence readiness, missing artifacts, side-effect status, and taint labels. They do not close phases, mutate roadmap completion, or override GSD verify/UAT.

## Completion Labels

| Label | Meaning | Can be final clean completion? |
| --- | --- | --- |
| `clean` | Required raw evidence exists, review/audit/verify gates pass, required side effects succeeded or were not required, no gate was overridden, and GSD accepts completion. | Yes. |
| `degraded` | Work produced useful artifacts but a non-critical source, provider, side effect, or path was unavailable and recorded. | No clean completion unless degraded part is explicitly non-required. |
| `provisional` | Work is useful but lacks required review, audit, raw evidence, final acceptance, or claim support. | No. |
| `overridden` | `danger-auto` overrode a research-quality gate with records. | No clean completion; downstream taint required. |
| `blocked` | Required input, evidence, gate, side effect, or decision is missing or failed. | No. |
| `missing-authorization` | Required capability could not run due to missing credentials, login, SSH, API key, payment, platform, budget, or permission. | No if capability was required. |
| `backfill-non-execution` | Artifact was imported or historical, not produced by current execution. | No as execute evidence; may be context/input. |

## Advisory-Only Signals

These are never sufficient for clean completion:

- `SUMMARY.md` existence.
- Roadmap checkbox.
- Plan count or summary count.
- File presence.
- Empty or skeleton `RESEARCH_INDEX.md`.
- `progress` or `next` output.
- Context helper output.
- Bridge-ready report.
- Monitor says process completed.
- W&B URL or run ID alone.
- PR link or GitHub status alone.
- Reviewer summary without raw reviewer response where required.
- Root Auto artifact outside phase-local adoption.
- Cache files such as `REVIEW_STATE.json` or `REFINE_STATE.json` alone.

## Required Evidence Classes

Research commands define required evidence by command family.

Examples:

| Command family | Required clean-completion evidence |
| --- | --- |
| `research-lit` | Query/source metadata, retained source IDs/URLs/paths, accepted/rejected papers, reading notes, timestamp, source selector. |
| `idea-discovery` | Literature retrieval/reading evidence plus idea generation, eliminations, novelty/review evidence, and final idea report. |
| `research-refine`, `research-refine-pipeline` | Problem anchor, round logs, reviewer responses, score/verdict, final proposal, stop predicate result. `research-refine-pipeline` also requires experiment-planning handoff evidence. |
| `experiment-plan` | Claim map, metrics, dataset/split, baselines, method, run order, success criteria, failure interpretation, budget. |
| `run-experiment` | Command, config, backend, commit, seed, raw result files, logs, W&B ID/URL if used, cleanup/export record. |
| `experiment-audit` | Audit JSON/Markdown, raw evidence lineage, pass/partial/fail verdicts, missing evidence list. |
| `result-to-claim` | Claim support table, yes/partial/no verdict, audit links, unsupported claim list. |

## `danger-auto` Completion Rules

`danger-auto` can automate decisions and side effects only when capabilities and authorization exist.

`danger-auto` clean completion is forbidden if:

- Required authorization is missing.
- A required operation is skipped.
- A side-effect result is unknown.
- A research-quality gate was overridden.
- Required evidence is missing.
- Required audit/review/verify output is missing.
- Cleanup destroyed required evidence without export/provenance.

Required `danger-auto` audit artifacts under the owning phase `research/` root:

- `RESEARCH_RUN_LOG.md`
- `AUTHORIZATION_ACTIONS.json`
- `DANGER_AUTO_OVERRIDES.md`
- `SIDE_EFFECTS.md`
- `RESEARCH_INDEX.md` entries marking status and taint

## Side-Effect Status

| Status | Meaning |
| --- | --- |
| `disabled` | Operation disabled by config/policy. |
| `confirm-required` | Human confirmation required before operation. |
| `preauthorized` | Operation allowed under `auto` or explicit policy. |
| `danger-auto-available` | `danger-auto` may run if authorization exists. |
| `missing-authorization` | Required credentials/platform/access missing. |
| `blocked` | Operation cannot proceed. |
| `degraded` | Operation skipped or changed path but non-required evidence still useful. |
| `executed` | Operation ran and result recorded. |
| `skipped` | Operation intentionally skipped and reason recorded. |
| `failed` | Operation attempted and failed; logs retained. |

## Review And Verification Relationship

Research evidence readiness is input to GSD review/verify/UAT. It is not a replacement.

GSD verify/UAT may accept, reject, or request remediation. If research evidence is provisional or overridden, downstream claims must carry the same taint unless later remediation clears it.

## Negative Scenarios

The implementation and review phases must reject clean completion for:

- Context-only `idea-discovery` with no literature retrieval/reading evidence.
- Skeleton-only `RESEARCH_INDEX.md`.
- W&B-link-only experiment output.
- PR-link-only implementation evidence.
- Missing or stale experiment audit before `result-to-claim`.
- Missing GitHub/W&B/SSH/Modal/Vast credentials under `danger-auto`.
- Quality-gate override without downstream taint.
- Root Auto artifact conflict without adoption/provenance.
- Cache-only review/refine state.
- Typed-routing or bridge-ready lifecycle status.
