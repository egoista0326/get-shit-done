---
name: gsd:ljx-experiment-audit
description: Audit experiment integrity using raw evidence, missing evidence, claim impact, and threats to validity.
argument-hint: "[experiment results or phase]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - Task
  - SlashCommand
---

<objective>
Check whether experiment evidence is trustworthy enough to support research decisions.
</objective>

<gsd_phase_construction>
- Audit phase-local experiment artifacts before claim gating or paper writing.
- Store audit outputs under `.planning/phases/<phase>/research/audit/`.
- Convert blocking audit gaps into ordinary GSD fix plans.
</gsd_phase_construction>

<research_instructions>
- Trace every claimed number to a raw evidence file.
- Every claimed number must trace to an actual output file.
- Check for fake ground truth, baseline-as-ground-truth, self-normalized scores, phantom results, and overbroad claims from tiny scope.
- Check ground-truth provenance, score normalization, result file existence, dead code, scope, and evaluation type.
- Label evaluation type: real_gt, synthetic_proxy, self_supervised_proxy, simulation_only, or human_eval.
- Identify missing evidence and explain claim impact.
- List threats to validity and whether they are blocking for normal workflow claims.
- Use an independent reviewer agent when allowed; pass file paths and objective, not a persuasive summary.
- The executor collects file paths. The reviewer reads code and judges integrity.
- `FAIL` blocks downstream claim progression until linked GSD fixes or follow-up evidence clear the integrity gap.
- `WARN` records non-blocking integrity risk and must be carried into `/gsd-ljx-result-to-claim` and `/gsd-ljx-claim-gate`.
- Route blocking and warning gaps through GSD fixes without treating the audit as claim-ready.
</research_instructions>

<required_outputs>
- `research/audit/EXPERIMENT_AUDIT.md` with raw evidence, missing evidence, claim impact, threats to validity, and verdict.
- Include `Overall Verdict: PASS | WARN | FAIL`, `Integrity Status`, checks A-F with evidence, action items, claim impact, raw evidence, missing evidence, and threats to validity.
- `research/audit/EXPERIMENT_AUDIT.json` with `overall_verdict`, `integrity_status`, per-check statuses, `eval_type`, raw evidence paths, missing evidence, and per-claim impact.
- `research/audit/AUDIT_FIXES.md` with blocking and non-blocking fixes.
</required_outputs>

<quality_dimensions>
- Evidence traceability.
- Integrity of evaluation target.
- Claim ceiling honesty.
- Reproducibility risk.
</quality_dimensions>

<non_goals>
- Do not demand extreme edge-case coverage unless it affects the normal claim.
- Do not rerun experiments automatically.
- Do not approve unsupported claims.
</non_goals>
