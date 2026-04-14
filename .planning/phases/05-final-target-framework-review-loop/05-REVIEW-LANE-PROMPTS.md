# Phase 05 Review Lane Prompts

**Status:** schema-v2-after-round-05-fix
**Generated:** 2026-04-14
**Purpose:** Provide the required Phase 05 reviewer lanes with concrete prompts, target docs, mandatory Phase 04 probes, and one stable finding schema.

## Reviewer operating rules

- Review framework docs only. Do not propose implementation code changes.
- Treat Phase 03 rules and stop gates as frozen.
- Treat Phase 04 outputs as reviewed evidence, not as assumptions that automatically pass.
- Emit candidate findings only. Final accepted findings require main-agent confirmation.
- If evidence is weak or missing, report that as the finding rather than guessing.

## Finding schema

Every candidate finding must contain:

| Field | Required | Notes |
| --- | --- | --- |
| `id` | Yes | Use canonical schema-v2 shape `F05-RXX-<LANE>-###`; allowed lane codes are `GL`, `RC`, `CE`, `SC`, `AH`, and `HR`. |
| `severity` | Yes | P0, P1, P2, or P3. |
| `rule` | Yes | One or more Phase 03 rule ids. |
| `dimension` | Yes | One matrix dimension. |
| `evidence` | Yes | Exact file path and section or line cue where possible. |
| `historical_failure` | Yes | Failure family or user-observed regression being prevented. |
| `body` | Yes | Concrete explanation of the gap. |
| `required_change` | Yes for blockers | Exact framework-doc or evidence-doc change needed. |
| `verification_requirement` | Yes for blockers | Deterministic grep, diff, artifact, or review condition required before the finding can be marked fixed. |
| `status` | Yes | Start as `candidate`. |

## GSD lifecycle reviewer

Primary dimensions:

- GSD fidelity
- No second control plane
- Minimal modification

Target docs:

- `02-TARGET-GSD-FRAMEWORK.md`
- `02-NO-PHASE-TYPE-COMPATIBILITY.md`
- `02-UPGRADE-BOUNDARIES.md`

Mandatory Phase 04 probes:

- `04-IMPLEMENTATION-BOUNDARIES.md`
- `04-IMPLEMENTATION-WORKTREE.md`

Prompt:

Review whether the framework still keeps GSD as the only lifecycle/control-plane owner. Look for any place where the research compiler, prompt-pack registry, research index, root Auto artifact adoption, workspace logic, or wrapper layer could mutate canonical lifecycle state, roadmap progress, completion, or routing. Confirm that the clean workspace strategy does not sneak in a second owner by treating copied planning state or later wrapper helpers as lifecycle authority. Report any drift toward typed routing, bridge-ready lifecycle status, or framework changes broader than the narrow adapter slice.

## Research capability reviewer

Primary dimensions:

- Auto/ARIS capability preservation
- Prompt fidelity
- Research handoff depth

Target docs:

- `02-TARGET-GSD-FRAMEWORK.md`
- `02-COMPLETION-SEMANTICS.md`
- `02-CONFIG-PRESET-SPEC.md`

Mandatory Phase 04 probes:

- `04-IMPLEMENTATION-FEASIBILITY.md`
- `04-REUSE-CANDIDATES.md`

Prompt:

Review whether the kept research command families preserve Auto/ARIS obligations as prompt packs, phase-local artifacts, evidence requirements, and review gates rather than as thin command-name wrappers. Check that deferred families are deferred honestly, not quietly dropped while still implied as supported. Confirm that `idea-discovery` still requires literature retrieval/reading evidence, that refinement/review loops retain deterministic stop predicates, and that experiment/claim/audit semantics are preserved without creating a second framework.

## Completion and evidence reviewer

Primary dimensions:

- Evidence-first completion
- Danger-auto and side effects
- False-completion prevention

Target docs:

- `02-COMPLETION-SEMANTICS.md`
- `02-TARGET-GSD-FRAMEWORK.md`
- `02-CONFIG-PRESET-SPEC.md`

Mandatory Phase 04 probes:

- `04-IMPLEMENTATION-FEASIBILITY.md`
- `04-IMPLEMENTATION-BOUNDARIES.md`

Prompt:

Review whether clean completion remains impossible without raw evidence, review/audit/verify gates, and explicit GSD acceptance. Probe for any wording that would let summaries, checkboxes, `RESEARCH_INDEX` skeletons, W&B links, PR links, caches, bridge-ready language, or workspace creation imply completion. Review `safe`, `auto`, and `danger-auto` semantics for skipped operations, missing authorization, unknown side effects, and overridden gates. Any path that still permits clean completion after those conditions is a blocker.

## State/config/concurrency reviewer

Primary dimensions:

- State/config/concurrency
- Single-writer ownership
- Config precedence

Target docs:

- `02-CONFIG-PRESET-SPEC.md`
- `02-TARGET-GSD-FRAMEWORK.md`
- `02-UPGRADE-BOUNDARIES.md`

Mandatory Phase 04 probes:

- `04-IMPLEMENTATION-FEASIBILITY.md`
- `04-IMPLEMENTATION-BOUNDARIES.md`

Prompt:

Review whether `.planning/research.config.json` stays separate, precedence stays canonical, `human_checkpoint` still outranks `auto_proceed`, and canonical docs/state remain single-writer GSD-owned surfaces. Look for any place where prompt packs, side-effect helpers, caches, imported root Auto artifacts, or future wrapper layers could become writable truth surfaces. Flag any ambiguity around derived mirrors, lock ownership, parallel writes, or config keys leaking into upstream `.planning/config.json`.

## Artifacts/hooks/install reviewer

Primary dimensions:

- Git/hooks/artifacts
- Path safety
- Install/build/SDK boundary

Target docs:

- `02-UPGRADE-BOUNDARIES.md`
- `02-TARGET-GSD-FRAMEWORK.md`
- `02-COMPLETION-SEMANTICS.md`

Mandatory Phase 04 probes:

- `04-IMPLEMENTATION-BOUNDARIES.md`
- `04-REUSE-CANDIDATES.md`
- `04-IMPLEMENTATION-WORKTREE.md`

Prompt:

Review whether phase-local research artifacts, root-artifact adoption, hook/install boundaries, package/build assumptions, and workspace strategy are safe and honest. Confirm that required evidence cannot be satisfied by stale paths, directories, sibling-prefix matches, or root-only artifacts. Check that the clean workspace decision does not quietly approve implementation in the dirty repo, and that wrapper emission or install/build logic does not carry forward bridge-oriented behavior or hidden `ljx-gsd` assumptions. Review SDK as a compatibility boundary only, not a lifecycle owner.

## Historical regression reviewer

Primary dimensions:

- Historical regression
- Context hygiene
- Review parser/accounting

Target docs:

- `02-TARGET-GSD-FRAMEWORK.md`
- `02-NO-PHASE-TYPE-COMPATIBILITY.md`
- `02-COMPLETION-SEMANTICS.md`
- `02-CONFIG-PRESET-SPEC.md`
- `02-UPGRADE-BOUNDARIES.md`

Mandatory Phase 04 probes:

- `04-IMPLEMENTATION-FEASIBILITY.md`
- `04-IMPLEMENTATION-BOUNDARIES.md`
- `04-REUSE-CANDIDATES.md`
- `04-IMPLEMENTATION-WORKTREE.md`

Prompt:

Review the current framework against the historical failure families from Phase 03. Focus on false clean completion, typed-routing relapse, parser/accounting drift, hidden control-plane growth, unsafe side-effect honesty, workspace contamination, and accidental `ljx-gsd` carry-over. Also check that the framework remains source-indexed and that open questions are surfaced honestly rather than buried in synthesis language. If review artifacts or future round accounting would be hard to parse deterministically, report that as a blocker.
