---
name: gsd:ljx-result-to-claim
description: Decide what claims completed results support using yes, partial, no, or unsupported categories.
argument-hint: "[results and intended claim]"
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
Translate experimental results into defensible research claims.
</objective>

<gsd_phase_construction>
- Use completed phase-local result analysis and audit artifacts as input.
- Store claim decisions under `.planning/phases/<phase>/research/claims/`.
- Feed the decision into `/gsd-ljx-claim-gate` before any ablation, paper, rebuttal, release, or public-claim work.
</gsd_phase_construction>

<research_instructions>
- Collect intended claim, experiments run, raw metrics, baseline comparisons, caveats, and audit verdict.
- Carry audit integrity forward as `integrity_status: pass | warn | fail | unavailable`.
- Ask an independent reviewer when allowed; the reviewer judges evidence, the executor only collects it.
- Normalize support into exactly one category: `yes`, `partial`, `no`, or `unsupported`.
- Mark claims as provisional when the audit is unavailable, and visibly tag or downgrade `yes` claims when integrity is `warn` or `fail`.
- Identify what results support, what they do not support, missing evidence, suggested claim revision, next experiments, and confidence.
- Do not round `partial` up to `yes`.
- Do not inflate claims beyond what the data supports.
- A single positive result on one dataset does not support a general claim.
</research_instructions>

<required_outputs>
- `research/claims/RESULT_TO_CLAIM.md` with:
  - `claim_supported: yes | partial | no | unsupported`;
  - supported evidence;
  - unsupported parts;
  - missing evidence;
  - suggested claim revision;
  - next experiments;
  - `integrity_status: pass | warn | fail | unavailable`;
  - provisional or integrity-warning label when needed;
  - confidence.
- Updates to `research/claims/CLAIM_LEDGER.md`.
- Route every `claim_supported` verdict to `/gsd-ljx-claim-gate`; let the claim gate choose `GO`, `NARROW`, `MORE_EVIDENCE`, or `NO_CLAIM` and decide whether to proceed, narrow, gather supplementary evidence, run ablations, plan ordinary GSD work, postmortem, or pivot.
</required_outputs>

<quality_dimensions>
- Conservative claim scope.
- Evidence traceability.
- Reviewer independence.
- Clear routing after verdict.
</quality_dimensions>

<non_goals>
- Do not write paper claims before support is classified.
- Do not treat `RESULT_TO_CLAIM.md` alone as permission to enter paper, rebuttal, release, or public-claim work; run `/gsd-ljx-claim-gate` first.
- Do not ignore negative or inconclusive evidence.
- Do not use a single small positive result for a broad general claim.
</non_goals>
