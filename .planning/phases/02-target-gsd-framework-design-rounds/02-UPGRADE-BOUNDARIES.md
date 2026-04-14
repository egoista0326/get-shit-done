# Phase 02 Upgrade Boundaries And Implementation Feasibility

**Status:** approved target under Phase 05 final review
**Generated:** 2026-04-14
**Target architecture:** Research Command Compiler under GSD lifecycle ownership

## Baseline Policy

The behavioral design baseline is latest upstream GSD source behavior captured by Phase 01 evidence.

Phase 01 evidence also recorded a source/package mismatch:

- Local reference source evidence: `get-shit-done-cc@1.35.0`.
- Installed/npm evidence around Phase 01: `1.34.2`.

Implementation must reconcile source, installed package, npm package, hooks, installer, SDK, and tests before release or shipped claims.

## Boundaries To Preserve

| Boundary | Rule |
| --- | --- |
| `.planning/` artifact names | Preserve names and frontmatter compatibility unless a reviewed migration exists. |
| `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md` | Runtime APIs; single canonical writer per operation. |
| Phase artifact naming | Preserve `CONTEXT.md`, `*-PLAN.md`, `*-SUMMARY.md`, verification/UAT conventions. |
| `gsd-tools.cjs` CLI | Preserve command names, `--cwd`, `--ws`, `--raw`, JSON shapes, and spillover behavior unless intentionally versioned. |
| Workstream routing | Preserve active workspace/workstream resolution before research artifact writes. |
| Locks and atomic writes | Preserve planning lock, state lock, and atomic-write behavior. |
| Git behavior | Preserve GSD planning commits, explicit staging, subrepo routing, branch policies, and review gates. |
| Hooks | Preserve hook ownership and install/uninstall symmetry. |
| Installer/package | Treat package manifests and build/install tests as compatibility inputs. |
| SDK | Keep compatible/adaptable, but do not make SDK lifecycle owner. |

## Research Integration Boundary

Research integration may add:

- Command wrappers.
- Research config loader.
- Prompt-pack registry.
- Phase request renderer.
- Phase-local artifact/index helper.
- Evidence checker.
- Side-effect handoff helper.
- `danger-auto` audit writer.
- Root artifact adoption helper.

Research integration must not add:

- Core phase schema changes.
- `phase_type` or aliases.
- Typed routing.
- Broad canonical state expansion.
- Second control-plane state root.
- Research-owned phase completion.
- Support-tool lifecycle authority.

## SDK Boundary

SDK is a compatibility boundary.

Target rule:

- Do not require SDK-first implementation for v2.0 research commands.
- Keep compiler inputs and outputs serializable.
- Keep helper contracts stable enough that SDK can later expose compile/advisory operations.
- SDK must not own lifecycle state, phase completion, roadmap mutation, or canonical writes.

Phase 05 final decision must record the SDK stance before Phase 06 starts. Default stance: defer SDK API exposure until after CLI/lifecycle parity unless Phase 05 finds a material SDK/headless divergence that must be handled earlier.

## ljx-GSD Reuse Boundary

Current ljx-GSD is historical evidence, not the implementation base.

Reuse is blocked until quarantine review identifies safe pieces.

Immediate bans:

- `ljx-*` naming in target public command surface.
- Bridge-ready lifecycle state.
- `primaryCommand` routing.
- Typed phase tables.
- Root Auto artifact authority.
- Completion by summary/checkbox/file presence.
- Parallel canonical writes outside lock owner.

Potentially salvageable later:

- Test ideas.
- Failure taxonomies.
- Some helper logic after review.
- Documentation patterns after cleanup.

## Implementation Feasibility Matrix

| Work item | Feasibility | Earliest phase | Required proof |
| --- | --- | --- | --- |
| Copy/reuse upstream GSD foundation | feasible-with-review | Phase 06 | Package/build/install/hook tests against selected baseline. |
| Add command wrappers | feasible-now after foundation | Phase 08 | Commands produce dry-run compiled phase requests. |
| Add `.planning/research.config.json` loader | feasible-now after foundation | Phase 08 | Config precedence and unknown-key tests. |
| Add prompt-pack registry | feasible-now after foundation | Phase 08 | Source path provenance and contract extraction tests. |
| Add phase request renderer | feasible-with-review | Phase 08 | Insert mode and research-first mode scenarios. |
| Add phase-local research root/index | feasible-now | Phase 08 | Index/file consistency checks and skeleton-not-evidence negative test. |
| Add evidence checker | feasible-with-review | Phase 08/09 | Negative completion scenarios per command family. |
| Add `danger-auto` audit writer | feasible-with-review | Phase 08/09 | Missing authorization and override-taint scenarios. |
| Enable git push/PR/W&B/SSH/Modal/Vast/GPU side effects | defer-until-scenario-tests | Phase 09+ | Service-policy matrix, dry-run/missing-credential tests, cleanup evidence retention. |
| Add paper/rebuttal packs | defer | Future phase after base research commands | Venue/citation/anonymity/page/audit tests. |
| SDK API exposure | implementation-boundary | Phase 05/06 decision | SDK compatibility plan and tests. |

## Practical Feasibility Assessment

The current planning is implementable because the architecture avoids invasive changes.

Strong feasibility factors:

- GSD already has phases, decimal insertion, plans, waves, checkpoints, summaries, verification, UAT, roadmap analysis, and state locks.
- Research-specific artifacts can live under phase-local `research/` without schema changes.
- The compiler can first operate as dry-run or generated input text before gaining automated lifecycle invocation.
- Prompt-pack provenance can be represented as source indexes and contracts.
- Config can stay separate and be normalized before GSD sees it.

Primary risks:

- Source/package mismatch may make implementation target the wrong upstream behavior.
- Config reads/migrations in upstream may mutate files unexpectedly if reused without review.
- Hook/installer behavior is monolithic and must not be changed casually.
- `danger-auto` can become unsafe or dishonest if audit and taint rules are not implemented first.
- Evidence checker can create false confidence if command-specific evidence contracts are too shallow.
- Execution-heavy commands require credentials, paid services, cleanup, and raw evidence retention tests.
- SDK surface can drift if ignored until after CLI behavior is fixed.

Recommended implementation sequence:

1. Phase 05: confirm the clean workspace handoff, baseline reconciliation plan, SDK stance, and package/hook test requirements.
2. Phase 06: initialize the implementation repo/branch in the clean workspace, import the selected upstream GSD baseline, and establish install/build/hook/state/lock parity.
3. Phase 07: preserve core GSD lifecycle parity before research integration.
4. Phase 08 early: implement dry-run compiler outputs, research config loader, prompt-pack registry, phase request renderer, and phase-local index conventions.
5. Phase 08 middle: implement first-pass literature/idea/refinement/experiment-plan/audit/claim wrappers without remote execution side effects.
6. Phase 09: add negative scenario tests and side-effect matrix before enabling execution-heavy wrappers.
7. Later: paper/rebuttal packs and SDK API exposure after base evidence semantics are stable.

## Release Blockers

No shipped/release claim until:

- Upstream source/package/install/hook baseline is reconciled.
- Core GSD lifecycle parity passes.
- Research commands produce phase-local raw evidence and indexes.
- Completion checker rejects false-completion negative scenarios.
- `safe`, `auto`, and `danger-auto` scenario tests pass.
- External side-effect policy is tested with missing credentials and dry-run paths.
- SDK decision is recorded and compatibility is not accidentally broken.
- Phase review/UAT gates agree with disk state and summaries.
