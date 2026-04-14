# Phase 05 Round 04 Review

**Round:** 04
**Status:** not-clean
**Harness:** `05-REVIEW-HARNESS.md`, schema v2 after accepted parser/accounting fixes
**Parser/accounting:** Phase 05 finding schema v2
**Completed:** 2026-04-14T02:02:18+02:00

## Scope

Round 04 is the user-requested extra strict review using multiple subagents. It re-reviewed the Phase 02 target framework, Phase 04 feasibility/boundary/workspace evidence, Phase 03 stop gates, and the existing Round 01 through Round 03 accounting artifacts.

The main session treated subagent outputs as candidate findings only. Every candidate finding below was confirmed, deduplicated, assigned final status, fixed in allowed framework/accounting surfaces, and then carried into clean-streak reset accounting.

## Subagent lane coverage

| Lane | Subagent | Result | Notes |
| --- | --- | --- | --- |
| GSD lifecycle reviewer | Faraday `019d8946-f1ad-79a0-ace2-119ec1da7a10` | clean | P3 residuals only around copied planning-state wording, inserted-phase delegation, and optional JSON mirror authority. |
| Research capability reviewer | Hooke `019d8946-f21b-7012-843f-1c5595682fc7` | clean | P3 residuals only around thin-wrapper shorthand, deferred per-command details, and support-tool wording. |
| Completion and evidence reviewer | Avicenna `019d8946-f267-7b52-8a6b-37a52819d256` | clean | P3 residuals only around lifecycle-owner acceptance wording and later scenario coverage. |
| State/config/concurrency reviewer | Helmholtz `019d8946-f2e1-79d0-99d4-f893f62445ca` | clean | P3 residuals only around unknown-key wording and deferred wrapper/mirror details. |
| Artifacts/hooks/install reviewer | Confucius `019d8946-f31a-7a80-8d5b-8ff15381c801` | findings | One P1 path-safety finding accepted. |
| Historical regression reviewer | Bernoulli `019d8946-f35c-70b0-99a6-cfb46d8ed52c` | findings | Three P1 parser/accounting findings accepted. |

## Accepted findings

### F05-R04-AH-001

| Field | Value |
| --- | --- |
| `id` | `F05-R04-AH-001` |
| `severity` | P1 |
| `rule` | R-09, R-03, R-11 |
| `dimension` | Git/hooks/artifacts / Path safety |
| `historical_failure` | False clean completion from stale, root-only, path-ambiguous, directory-as-file, symlink, dangling-link, or sibling-prefix evidence. |
| `status` | accepted, fixed |
| `verification_requirement` | `rg -n "regular file|canonical resolved path|sibling-prefix|symlink evidence|freshness metadata|Validated source existence|non-authoritative mirror material" .planning/phases/02-target-gsd-framework-design-rounds/02-TARGET-GSD-FRAMEWORK.md .planning/phases/04-implementation-feasibility-and-boundaries/04-IMPLEMENTATION-BOUNDARIES.md` must show the path-safety contract in target and boundary docs. |

**Evidence:** `02-TARGET-GSD-FRAMEWORK.md` defined phase-local `research/`, `RESEARCH_INDEX.md`, and root Auto adoption fields, while `04-IMPLEMENTATION-BOUNDARIES.md` defined phase-local artifact ownership. Neither carried the Phase 03 path-safety requirements into the implementable target contract.

**Body:** An implementer could satisfy the target docs by recording a path, timestamp, and adoption decision while accepting a directory, stale path, sibling-prefix path, symlink target outside the phase, dangling link, root-only Auto artifact, or path-shaped placeholder as required evidence.

**Required change:** Add an explicit path-safety and evidence-type contract to `02-TARGET-GSD-FRAMEWORK.md` and `04-IMPLEMENTATION-BOUNDARIES.md` requiring regular files for file evidence unless the evidence class allows otherwise, canonical resolved-path containment under the owning phase `research/` root, rejection of sibling-prefix matches and unvalidated symlinks, freshness/staleness metadata, and validated root-artifact adoption before evidence can count.

**Fix applied:** Added `Research Artifact Path-Safety Contract` to `02-TARGET-GSD-FRAMEWORK.md`, expanded root Auto adoption fields, and added phase-local artifact path/adoption safety rules to `04-IMPLEMENTATION-BOUNDARIES.md`.

### F05-R04-HR-001

| Field | Value |
| --- | --- |
| `id` | `F05-R04-HR-001` |
| `severity` | P1 |
| `rule` | R-10 |
| `dimension` | Review parser/accounting |
| `historical_failure` | Review artifact parser drift, state/accounting drift, and review matrix instability. |
| `status` | accepted, fixed |
| `verification_requirement` | `rg -n "Status vocabulary and normalization|fixed-not-clean|clean-under-rule|clean-round-condition-met|Canonical result|Parser/accounting: Phase 05 finding schema v2" .planning/phases/05-final-target-framework-review-loop/05-REVIEW-HARNESS.md .planning/phases/05-final-target-framework-review-loop/review/ROUND-STATE.md` must show explicit normalization and canonical v2 accounting. |

**Evidence:** The harness required `clean`, `not-clean`, or `capped-not-clean`, but `ROUND-STATE.md` used `clean-round-condition-met`, `clean-under-rule`, and `fixed-not-clean` without a versioned normalization table.

**Body:** Clean streaks depended on human interpretation rather than deterministic result parsing.

**Required change:** Add a versioned status-normalization contract, normalize round/final state fields to the harness vocabulary, and reset/recount clean streak after this material parser/accounting change.

**Fix applied:** Added `Status vocabulary and normalization` to `05-REVIEW-HARNESS.md`, normalized `ROUND-STATE.md` status/result fields, and reset clean streak after Round 04.

### F05-R04-HR-002

| Field | Value |
| --- | --- |
| `id` | `F05-R04-HR-002` |
| `severity` | P1 |
| `rule` | R-08, R-10, R-14 |
| `dimension` | Review parser/accounting |
| `historical_failure` | Multi-surface truth drift, state/accounting drift, and hidden control-plane growth. |
| `status` | accepted, fixed |
| `verification_requirement` | `rg -n "Control-doc exception|control-doc exception|PROJECT.md|REQUIREMENTS.md|ROADMAP.md" .planning/phases/05-final-target-framework-review-loop/05-REVIEW-HARNESS.md .planning/phases/05-final-target-framework-review-loop/review/ROUND-01-REVIEW.md .planning/phases/05-final-target-framework-review-loop/review/ROUND-STATE.md` must show the exception rule and affected prior fixes. |

**Evidence:** The harness allowed Phase 02/04 framework/evidence docs and limited harness changes, but Round 01 fixed `PROJECT.md`, `REQUIREMENTS.md`, and `ROADMAP.md` without an explicit control-doc exception record.

**Body:** A future parser could not distinguish a valid review/accounting fix from an unauthorized control-plane mutation.

**Required change:** Record a tightly scoped control-doc exception surface for active planning docs when an accepted finding directly concerns review requirements, cap/accounting truth, roadmap/status truth, workspace false-completion wording, or final state handoff. Backfill Round 01 exception records and preserve reset/recount behavior.

**Fix applied:** Added the control-doc exception rule to `05-REVIEW-HARNESS.md`, added Round 01 exception notes, and marked affected surfaces in `ROUND-STATE.md`.

### F05-R04-HR-003

| Field | Value |
| --- | --- |
| `id` | `F05-R04-HR-003` |
| `severity` | P1 |
| `rule` | R-10 |
| `dimension` | Review parser/accounting |
| `historical_failure` | Review artifact parser drift, finding-count drift, and false clean completion through incomplete review artifacts. |
| `status` | accepted, fixed |
| `verification_requirement` | `rg -n "verification_requirement" .planning/phases/05-final-target-framework-review-loop/05-REVIEW-HARNESS.md .planning/phases/05-final-target-framework-review-loop/05-REVIEW-LANE-PROMPTS.md .planning/phases/05-final-target-framework-review-loop/review/ROUND-01-REVIEW.md .planning/phases/05-final-target-framework-review-loop/review/ROUND-04-REVIEW.md` must show schema and accepted-finding coverage. |

**Evidence:** `05-REVIEW-LANE-PROMPTS.md` did not require `verification_requirement`, while Phase 03 stop gates require accepted findings to include a verification requirement before they can be marked fixed.

**Body:** A schema-compliant lane candidate could still be insufficient for stop-gate fix protocol, forcing main-agent accounting to infer verification outside the stable schema.

**Required change:** Add `verification_requirement` to harness/lane schema and consolidated artifact requirements. Treat this as a parser/accounting change and reset clean-round accounting.

**Fix applied:** Added `verification_requirement` to `05-REVIEW-HARNESS.md` and `05-REVIEW-LANE-PROMPTS.md`, and backfilled Round 01 accepted findings.

## Rejected findings

None.

## Advisory findings

P3 residuals were recorded by clean lanes but not accepted as blockers:

| Lane | Residual |
| --- | --- |
| GSD lifecycle | Copied planning-state wording, inserted-phase delegation, and optional JSON mirror authority require implementation watch but are already bounded by GSD ownership rules. |
| Research capability | Thin-wrapper shorthand, deferred per-command details, and support-tool wording require implementation watch but do not drop Auto/ARIS capability preservation. |
| Completion/evidence | Lifecycle-owner acceptance wording and later scenario coverage require implementation watch but do not permit clean completion from summaries or side-effect placeholders. |
| State/config/concurrency | Unknown-key wording and deferred wrapper/mirror details require implementation watch but do not create config/state authority drift. |

## Round result

Round 04 is not clean because it accepted four P1 findings and applied fixes.

Clean streak after Round 04: `0`.

Because `F05-R04-HR-001` and `F05-R04-HR-003` are material parser/accounting changes, clean-round accounting is reset and future clean rounds must run under schema v2.

## Verification

- Added path-safety language to Phase 02 and Phase 04 target/boundary docs.
- Added status normalization, control-doc exception rules, and `verification_requirement` schema to the Phase 05 harness and lane prompts.
- Backfilled Round 01 accepted findings with verification requirements and control-doc exception notes.
- `git diff --check` is required again after Round 05 and Round 06 recount.
