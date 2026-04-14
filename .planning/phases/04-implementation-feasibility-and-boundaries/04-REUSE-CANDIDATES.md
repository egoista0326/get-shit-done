# Phase 04 Reuse Candidates

**Status:** provisional-review-input
**Generated:** 2026-04-14
**Scope:** Preliminary copy/wrap/reference/quarantine classification for upstream GSD, Auto/ARIS-derived materials, and historical `ljx-gsd` code.

## Classification rule

This file is intentionally conservative.

It does not approve reuse. It groups materials into likely buckets so Phase 05 can review concrete candidates instead of re-arguing the whole codebase.

Given the current user direction, `ljx-gsd` is not treated as a meaningful reuse pool. Its default status is historical-only unless a very small generic utility later proves worth independent reimplementation.

## Likely copy

| Candidate | Source evidence | Why copy is plausible | Phase 05 sensitivity |
| --- | --- | --- | --- |
| Upstream GSD runtime CLI and canonical lifecycle libs | Upstream reference `bin/gsd-tools.cjs`, `bin/lib/core.cjs`, `config.cjs`, `state.cjs`, `phase.cjs`, `roadmap.cjs`, `commands.cjs`, `verify.cjs`, `workstream.cjs` | These are the actual control-plane baseline and already satisfy the framework's ownership model. | Medium: Phase 05 must confirm baseline source reconciliation and exact patch boundary. |
| Upstream workflow prompts for discuss/plan/execute/verify | Upstream reference `workflows/discuss-phase.md`, `plan-phase.md`, `execute-phase.md`, `execute-plan.md`, `verify-work.md` | These already provide the lifecycle shell the target framework wants to preserve. | Medium: review must confirm research integration stays input-driven rather than workflow-replacing. |
| Upstream planning templates and artifact naming contracts | Upstream reference `templates/*.md` | Preserving artifact names reduces upgrade and compatibility risk. | Low: mostly compatibility-preservation review. |
| Upstream lock and atomic-write discipline | Upstream `core.cjs`, `state.cjs`, `phase.cjs` contracts | Required to keep single-writer lifecycle behavior. | Low to medium: verify no regression in clean workspace. |

## Likely wrap

| Candidate | Source evidence | Why wrapping is more plausible than copying blindly | Phase 05 sensitivity |
| --- | --- | --- | --- |
| Standalone `gsd` research command surface | Phase 02 target framework plus `04-01` feasibility map | Public research commands should be thin wrappers over compiler outputs and ordinary GSD lifecycle work. | High: wrapper emission surface is a major review point. |
| Upstream install/build surface for generated wrappers | Upstream upgrade-boundary evidence plus current repo install/build evidence | Wrapper emission likely needs to ride on a controlled install/build path, but not by keeping the current bridge installer. | High: install/build boundary must be explicitly approved. |
| Auto/ARIS prompt-pack obligations | Auto framework and parameter map documents | Semantic obligations should be wrapped as source-indexed prompt-pack contracts rather than copied as raw unstable prompt bodies. | High: prompt fidelity is a major Phase 05 review lane. |
| Root Auto artifact adoption | Auto artifact contract documents | Root artifacts should be wrapped by a provenance-aware adoption flow into phase-local `research/`. | Medium to high: review must confirm no second control plane. |

## Likely reference-only

| Candidate | Source evidence | Why reference-only is preferred | Phase 05 sensitivity |
| --- | --- | --- | --- |
| Auto/ARIS artifact contracts and parameter map | `01-AUTO-ARTIFACT-CONTRACTS.md`, `01-AUTO-PARAMETER-MAP.md`, `02-CONFIG-PRESET-SPEC.md` | These should guide adapter design, not be imported as authoritative runtime files. | Medium: review for fidelity and config precedence. |
| Auto/ARIS workflow families and command semantics | `01-AUTO-FRAMEWORK.md` | Needed as semantic preservation input, not as a second framework. | Medium to high: Phase 05 checks preserved obligations. |
| Historical `ljx-gsd` tests | Current `tests/*.test.cjs` corpus | Useful as historical evidence and occasional invariant hints, but too bridge-shaped for direct adoption. | Medium: review which invariants deserve re-expression later. |
| `bin/lib/source-roots.cjs` | Current repo utility surface | At most a tiny generic utility reference point; not architectural reuse. | Low to medium: only worth discussion if reused independently. |
| `bin/lib/ljx-runtime-state.cjs`, `bin/lib/ljx-cli-args.cjs`, `bin/lib/ljx-phase-context.cjs`, `bin/lib/ljx-code-review-artifact.cjs`, `bin/lib/ljx-planning-lock.cjs` | Current repo helper modules | The user now rates `ljx-gsd` as low-value reference material, so these are historical references by default, not a target implementation pool. | Medium: only reopen if a tiny generic utility cannot be obtained more safely from upstream or a clean reimplementation. |

## Likely quarantine

| Candidate | Source evidence | Why quarantine is the default | Phase 05 sensitivity |
| --- | --- | --- | --- |
| `bin/lib/ljx-lifecycle-shell-tools.cjs` | Contains `primaryCommand`, `routeKind`, typed lifecycle shell logic | Too tightly bound to the old bridge lifecycle and typed routing assumptions. | High: Phase 05 should keep this out explicitly. |
| `bin/lib/ljx-bridge-contract.cjs` | Bridge policy/recommendation module | Encodes the old bridge contract and command routing model. | High: explicit no-reuse confirmation. |
| `bin/lib/codex-conversion.cjs` | Builds `ljx-GSD-*` wrappers and compatibility surfaces | Represents exactly the old wrapper-conversion strategy the target system is moving away from. | High: must stay out. |
| `bin/lib/ljx-research-pipeline-tools.cjs` | Uses `phase_type`, stage reuse, auto phase creation | Violates the no-typed-routing, no-second-control-plane rule directly. | High: must stay out. |
| Direct historical research command implementations under `bin/lib/ljx-*` | Historical command modules such as `ljx-idea-discovery-tools.cjs` and related families | Bound to old shell assumptions and not preferred as the implementation reference source. | High: treat as historical-only. |
| Current install/build surface as currently written | `bin/install.js`, `bin/lib/build-skills.cjs` | Emits bridge-ready output and compatibility wrappers under `ljx` naming. | High: Phase 05 must reject direct carryover. |
| Current package identity and naming | `package.json` with `name: ljx-gsd` | Public naming line is incompatible with the target system. | Low to medium: reset is straightforward but mandatory. |

## Phase 05 sensitivity

### High-sensitivity items

These should receive direct Phase 05 scrutiny because a wrong decision here would distort the framework:

- wrapper emission surface
- install/build boundary
- prompt-pack fidelity strategy
- root artifact adoption strategy
- any proposal to carry forward bridge or typed-routing code

### Medium-sensitivity items

These need review, but are less likely to force architecture change if kept conservative:

- which historical tests deserve invariant extraction
- whether a tiny generic utility from `ljx` is worth independent reimplementation
- exact division between wrap and reference-only for Auto semantic materials
- source baseline reconciliation details when upstream snapshot is partial

### Low-sensitivity items

These are mostly hygiene rules as long as the upstream-first direction is preserved:

- reset of public naming from `ljx` to `gsd`
- reference-only use of historical documents and failure evidence
- preservation of upstream artifact naming and lock discipline

## Phase 06 guidance

Phase 06 should treat this classification as follows:

- start from the `Likely copy` upstream baseline,
- add only the narrow wrapper and adapter surfaces justified by `Likely wrap`,
- use `Likely reference-only` materials for semantic and historical guidance,
- keep `Likely quarantine` materials out of the active implementation base.

## Deferred to Phase 08

These items remain deferred even if their semantic families are already known:

- exact per-command wrapper implementation details
- remote execution backend enablement
- full provider fallback behavior for review backends
- paper/rebuttal command implementation beyond semantic preservation planning

## Operational conclusion

The reuse picture is now intentionally simple:

- upstream GSD is the real base,
- Auto/ARIS is the semantic source for prompt and evidence obligations,
- `ljx-gsd` is mostly historical evidence and quarantine material.

Phase 05 should only reopen this simplicity if a concrete, tiny, generic utility case survives stricter review than the default no-reuse stance.
