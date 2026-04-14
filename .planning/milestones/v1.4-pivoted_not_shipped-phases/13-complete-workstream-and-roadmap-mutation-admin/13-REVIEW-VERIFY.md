# Phase 13 Review/Verify

## Status

Current verdict: complete. Phase 13 passed two consecutive current-head review/verify rounds after the latest state-CLI parser confirmed-finding repair.

Clean-round count: 2. Comprehensive reviews after `c8f4105`, `26224a5`, the attempted first clean round after `6e3674d`, Round 1 after `5c7be79`, the attempted clean rounds after `d35e76f`, `b6e47b3`, and `60625b5`, and the attempted clean rounds after `6ad069c`, `01db3fe`, `36c8287`, `3ad6197`, `e47a25f`, `7457398`, `1283c97`, `5aae815`, `4b6cb00`, `603704e`, `93c7c37`, `17b12b8`, `ad7fb2b`, and `dd2821a` found follow-up issues. The two clean rounds after `b49edfc` found no blocking findings under the updated threshold that allows purely low-risk display details or extreme non-mutating edge cases to be recorded as non-blocking.

## Reviewed Implementation Artifacts

- `13-01-SUMMARY.md`: mutating `workstreams` semantics.
- `13-02-SUMMARY.md`: typed `add-phase`, `insert-phase`, and `remove-phase` roadmap admin semantics.
- `13-03-SUMMARY.md`: admin mutation records and safety rules.

## Follow-Up Scope

The first current-head review verified additional issues after the initial Phase 13 summaries:

- active structured workstreams were not represented honestly by `progress` / `next` routing;
- inactive-only structured workstream records could be treated as an active workstream candidate;
- session-local workstream switching did not include `GSD_SESSION_KEY`;
- completing a workstream active in another session could leave stale session pointers;
- `.planning/workstreams` and `.planning/phases` file blockers needed structured stops;
- roadmap admin needed GSD-style planning lock reuse, project-code-aware phase directories, malformed mirror detection, phase-name validation, and remove-phase state-family validation;
- Phase 13 planning mirrors and the architecture command taxonomy caveat were stale.

The subsequent current-head review after `26224a5` found and independently verified additional gaps:

- the installed runtime bundle omitted the new `ljx-planning-lock.cjs` dependency used by roadmap-admin helpers;
- the planning lock timeout path could remove a fresh lock and run a callback without acquiring the lock;
- `progress` / `next` could route to root phase actions when active workstream state resolution failed;
- roadmap-admin remove did not match long configured project-code phase directories such as `MEGA-10-*`;
- remove did not validate `.planning/phases` before mutating state;
- unknown `project.phase_naming` values were treated as sequential instead of stopping;
- Phase 13 and `ljx-GSD-research-pipeline` user-facing docs had stale review/deferred-compatibility wording.

The attempted first clean current-head review after `6e3674d` found and independently verified additional gaps:

- planning-lock callback errors with `code: EEXIST` were retried as acquisition conflicts instead of being propagated once;
- structured workstream validation error codes for duplicate or mismatched records were not classified as workstream state blockers by `progress` / `next`;
- roadmap-admin remove could prefer scanned directory aliases over the authoritative phase-record directory;
- roadmap-admin remove could mutate unsupported custom `project.phase_naming` chains instead of stopping like add/insert;
- unsafe `project.code` values could escape the `.planning/phases` directory when used as a phase-directory prefix;
- `.planning/REQUIREMENTS.md`, `progress.md`, and `task_plan.md` still advertised stale Phase 12 / Phase 13 review-gate state.

The Round 1 current-head review after `5c7be79` found and independently verified additional gaps:

- the actual repository lacked typed `.planning/state/phase-records/13.json`, so `progress` / `next` stopped with `missing_phase_type` despite Phase 13 being the current review target;
- planning-lock stale recovery and release did not prove lock ownership before unlinking, allowing stale-looking live locks or another owner's fresh lock to be stolen;
- a directory at `.planning/active-workstream` produced raw `EISDIR` errors instead of structured workstream-state stops;
- fresh `ljx-GSD-new-project` roadmap headings with typed labels such as `Phase 1 [discovery]` were not accepted by roadmap-admin mirror parsers;
- direct lifecycle contexts could resolve and return root phase artifact paths while a secondary workstream was active;
- `ljx-GSD-new-project` CLI missing values for `--config-template`, `--config-template=`, and `--brief --auto` were not handled honestly;
- long configured `project.code` values were accepted for directory creation but not normalized consistently by runtime phase aliasing;
- `remove-phase` could remove one matching phase directory while leaving another orphan when `paths.directory` was missing;
- `remove-phase` treated present but malformed `phase_id` values as absent and could proceed with destructive mutation.

The attempted clean current-head review after `d35e76f` found and independently verified additional gaps:

- `insert-phase` accepted fresh typed `ljx-GSD-new-project` headings for mirror validation but still used non-typed anchor matchers for summary/detail insertion, so it could report success while omitting the inserted detail section or appending summary rows out of order;
- `.planning/active-workstream` path blockers were detected by the legacy pointer reader but overwritten as generic `workstream_resolution_conflict` when structured workstream state existed;
- mutating `ljx-GSD-workstreams` CLI stops returned structured JSON but process status `0`, unlike helper-backed roadmap mutations;
- `progress.md`, `task_plan.md`, and `.planning/STATE.md` still described the first Round 1 repair as local/uncommitted after it had been committed as `d35e76f`.

The attempted clean current-head review after `b6e47b3` found and verified additional gaps:

- `remove-phase` could delete the current phase when `STATE.md` used a configured project-code alias such as `Phase: MEGA-10`, because current-phase detection used legacy normalization rather than planning-aware alias normalization;
- unsupported `ljx-GSD-workstreams` subcommands returned structured JSON with process status `0`, and unknown helper modes threw a raw Node stack instead of returning structured JSON;
- `progress.md`, `task_plan.md`, and `.planning/STATE.md` still described the post-`d35e76f` follow-up repair as unfinished after it had already been committed as `b6e47b3`.

The attempted clean current-head review after `60625b5` found and verified additional gaps:

- roadmap-admin request parsing still used legacy normalization for configured project-code aliases such as `MEGA-10` in insert/remove requests, dependencies, and mutation metadata;
- `remove-phase` could destructively remove a future phase when its authoritative phase record existed but lacked `phase_id`;
- current status mirrors used commit-specific latest-repair wording that could become stale after each follow-up repair.

The attempted clean current-head review after `6ad069c` found and verified additional gaps:

- workstream mutating commands (`create`, `switch`, `resume`, `complete`) were not protected by the GSD planning lock and could corrupt structured active-workstream state under concurrent switches;
- `.planning/STATE.md`, `progress.md`, `.planning/PROJECT.md`, and the Phase 13 review log still used stale current-status wording tied to older Round 1 or `6e3674d` repair points.

The attempted clean current-head review after `01db3fe` found and verified additional gaps:

- `progress.md` used ambiguous shorthand saying implementation Phases 07-13 were complete even though Phase 13 still required clean review/verify rounds;
- `remove-phase` deleted future evidence-free phases without the GSD-style explicit destructive confirmation gate required by the current safe config and upstream remove-phase flow;
- `insert-phase` generated `12.1` instead of `12A.1` when inserting after lettered phase anchors;
- explicit roadmap-admin `dependsOn` inputs could reference missing phases or unsafe tokens without a structured stop.

The attempted clean current-head review after `36c8287` found and verified additional gaps:

- shipped interface and architecture docs still described `remove-phase` as a one-shot cleanup rather than the helper's `confirmation_required` then `--confirmed` flow;
- explicit roadmap-admin dependencies could point to a same-or-later phase, creating forward dependencies;
- confirmed `remove-phase` could delete a phase that surviving future phases still depended on.

The attempted clean current-head review after `3ad6197` found and verified additional gaps:

- `add-phase` detail insertion could place the new detail section before an existing lettered phase such as `12A` because detail heading discovery only recognized numeric ids;
- explicit roadmap-admin dependencies were validated but not de-duplicated, so repeated inputs could persist redundant `depends_on` entries and roadmap mirror text.

The attempted clean current-head review after `e47a25f` found and verified additional gaps:

- roadmap-admin docs described remove confirmation as unconditional even though runtime gates it behind `workflow.confirm_phase_chain_changes` or `safety.always_confirm_destructive`;
- `add-phase` / `insert-phase` could leave visible roadmap or phase-directory state if the final phase-record write failed;
- `remove-phase` could proceed destructively when `.planning/STATE.md` was missing or lacked a valid current-phase marker;
- `remove-phase` deleted phase artifacts before the final roadmap write, so a write failure could leave half-deleted state;
- roadmap/workstream mutation helpers had low-severity repeated inventory/active-state resolution that could be reduced without changing behavior;
- the proposed session-local workstream `active` flag finding was independently refuted because session records are intentional overlays over the shared structured active flag.

The attempted clean current-head review after `7457398` found and verified an additional gap:

- `remove-phase` dependency scanning could fail open when a later phase record was malformed JSON, because unreadable `depends_on` state was treated as no dependencies instead of blocking destructive deletion.

The attempted clean current-head review after `1283c97` found and verified additional gaps:

- secondary-workstream `switch` / `resume` success guidance still overpromised root `progress` / `next` behavior instead of routing users to workstream-aware status/progress commands;
- `.planning/STATE.md` and `.planning/ROADMAP.md` path blockers could surface as raw filesystem errors or misleading usable-state booleans in workstreams, progress, and roadmap-admin helpers;
- `add-phase`, `insert-phase`, and `remove-phase` did not mirror GSD-style Roadmap Evolution / phase-count updates into `.planning/STATE.md`;
- `remove-phase` dependency scanning still failed open for valid-JSON but semantically invalid later phase-record objects;
- structured workstream activation wrote active pointers before all structured workstream records, so activation write failures could leave pointer/session state inconsistent.

The attempted clean current-head review after `5aae815` found and verified additional gaps:

- `workstreams create` was not transactional when the secondary workstream record or active pointer/session pointer write failed, leaving partial structured state and raw errors;
- `progress` / `next` CLI missing `--cwd` values emitted raw Node stacks instead of structured JSON stops;
- `progress` / `next` continued routing when `.planning/ROADMAP.md` existed but was not a readable file;
- roadmap fallback dependency scanning missed roadmap-only dependents when later structured phase records were absent;
- public `research-pipeline` docs overpromised direct downstream artifacts/state even though the installed command is a deferred compatibility wrapper;
- one roadmap-admin regression test depended on the live repository roadmap and would fail under normal future roadmap evolution.

## Current Repair Plan

- Add regression tests for every verified behavior issue before production edits.
- Keep fixes inside shared runtime/admin helper boundaries rather than editing generated skills directly.
- Reuse GSD's `.planning/.lock` pattern for roadmap mutations.
- Keep custom phase naming out of the helper-backed add/insert path until an explicit custom-id flow exists; stop rather than silently mixing numeric and custom schemes.
- Keep Phase 13 marked as complete because two consecutive clean current-head review/verify rounds passed after the state-CLI parser repair.

## Verification Evidence

Targeted red tests were added in:

- `tests/workstreams-bridge.test.cjs`
- `tests/roadmap-admin-bridge.test.cjs`
- `tests/runtime-shell.test.cjs`
- `tests/skill-build.test.cjs`
- `tests/docs-contract.test.cjs`

Commands run after the `e47a25f` follow-up repair:

- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `node --test tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/docs-contract.test.cjs tests/admin-mutation-integration.test.cjs tests/skill-build.test.cjs` -> 138/138 passed.
- `node bin/install.js --preview` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 486/486 passed.
- `git diff --check` -> passed.

Commands run after the `26224a5` follow-up repair:

- `node --check bin/lib/ljx-runtime-core.cjs`
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-state-tools.cjs`
- `node --check bin/lib/build-skills.cjs`
- `node --check bin/lib/ljx-planning-lock.cjs`
- `node --test tests/roadmap-admin-bridge.test.cjs tests/runtime-shell.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs` -> 127/127 passed.
- `npm test` -> 448/448 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-followup-codex-3` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `git diff --check` -> passed.

Commands run after the `6e3674d` follow-up repair:

- `node --check bin/lib/ljx-planning-lock.cjs`
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-state-tools.cjs`
- `node --test tests/roadmap-admin-bridge.test.cjs tests/runtime-shell.test.cjs tests/docs-contract.test.cjs` -> 92/92 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-followup-codex-5` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 453/453 passed.
- `git diff --check` -> passed.

Commands run after the Round 1 `5c7be79` repair:

- `node --check bin/lib/ljx-planning-lock.cjs`
- `node --check bin/lib/ljx-runtime-core.cjs`
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-new-project-tools.cjs`
- `node --check bin/lib/ljx-phase-context.cjs`
- `node --check bin/lib/ljx-lifecycle-shell-tools.cjs`
- `node --check bin/lib/ljx-state-tools.cjs`
- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `node --test tests/roadmap-admin-bridge.test.cjs tests/new-project-bridge.test.cjs tests/runtime-core.test.cjs tests/runtime-shell.test.cjs tests/workstreams-bridge.test.cjs tests/discuss-phase-shell.test.cjs tests/plan-phase-shell.test.cjs tests/execute-phase-shell.test.cjs tests/docs-contract.test.cjs` -> 198/198 passed.
- `node bin/lib/ljx-state-tools.cjs progress --cwd /Users/lijiaxin/Downloads/new-gsd` -> Phase 13 resolved with `phase_type` `engineering` and recommendation `ljx-GSD-code-review 13`.
- `node bin/lib/ljx-state-tools.cjs next --cwd /Users/lijiaxin/Downloads/new-gsd` -> no `missing_phase_type`; routed to `ljx-GSD-code-review 13` as bridge-ready, not inline-executable.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-round1-repair-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 466/466 passed.

Commands run after the attempted-clean-round `d35e76f` repair:

- `node --test tests/roadmap-admin-bridge.test.cjs tests/runtime-core.test.cjs tests/runtime-shell.test.cjs tests/workstreams-bridge.test.cjs tests/docs-contract.test.cjs` -> 158/158 passed.
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-runtime-core.cjs`
- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-round1-followup-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 471/471 passed.
- `git diff --check` -> passed.

Commands run after the attempted-clean-round `b6e47b3` repair:

- `node --test tests/roadmap-admin-bridge.test.cjs` -> red before the current-phase alias fix, then passed after the fix.
- `node --test tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/docs-contract.test.cjs` -> 83/83 passed.
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `git diff --check` -> passed.

Commands run after the attempted-clean-round `60625b5` repair:

- `node --test tests/roadmap-admin-bridge.test.cjs tests/docs-contract.test.cjs` -> red before the repair with 4 expected failures, then 55/55 passed after the fix.
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `npm test` -> 475/475 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-alias-record-fix-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.

Commands run after the attempted-clean-round `6ad069c` repair:

- `node --test tests/workstreams-bridge.test.cjs tests/docs-contract.test.cjs` -> red before the repair with 2 expected failures, then 41/41 passed after the fix.
- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `npm test` -> 476/476 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-workstream-lock-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.

Commands run after the attempted-clean-round `7457398` repair:

- `node --test tests/roadmap-admin-bridge.test.cjs` -> red before the malformed dependent-record fix, then 56/56 passed after the fix.
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --test tests/roadmap-admin-bridge.test.cjs tests/docs-contract.test.cjs tests/workstreams-bridge.test.cjs` -> 97/97 passed.
- `node bin/install.js --preview` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 487/487 passed.
- `git diff --check` -> passed.

Commands run after the attempted-clean-round `1283c97` repair:

- `node --test tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/runtime-shell.test.cjs tests/docs-contract.test.cjs tests/skill-build.test.cjs` -> red before the repair with 12 expected failures, then 196/196 passed after the fix.
- `node --check bin/lib/ljx-runtime-core.cjs`
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `node --check bin/lib/ljx-state-tools.cjs`
- `node --check bin/lib/codex-conversion.cjs`
- `node bin/install.js --preview` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 497/497 passed.
- `git diff --check` -> passed.

Commands run after the attempted-clean-round `5aae815` repair:

- `node --test tests/workstreams-bridge.test.cjs tests/runtime-shell.test.cjs tests/roadmap-admin-bridge.test.cjs tests/docs-contract.test.cjs` -> red before the repair with 8 expected failures, then 160/160 passed after the fix.
- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `node --check bin/lib/ljx-state-tools.cjs`
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node bin/install.js --preview` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 501/501 passed.
- `git diff --check` -> passed.

Attempted clean Round 1 after `4b6cb00` found one additional issue:

- plan-compliance review reported that `LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md` still overpromised `ljx-GSD-research-pipeline` completion by saying it could have "successfully advanced the formal research phase chain through one or more stages", which conflicted with the Phase 13 deferred compatibility-wrapper boundary.
- independent verifier `019d7e17-b5ed-78a3-9fc6-c659818e0672` confirmed the issue and limited the required repair scope to `LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md` plus a docs-contract guard.
- `node --test tests/docs-contract.test.cjs` -> red before the repair with 1 expected failure on the stale completion phrase.

Commands run after the attempted-clean-round `4b6cb00` repair:

- `node --test tests/docs-contract.test.cjs` -> 10/10 passed.
- `npm test` -> 501/501 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-research-pipeline-docs-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `git diff --check` -> passed.
- `! rg -n "successfully advanced the formal research phase chain" LJX-GSD-EXTENDED-PUBLIC-COMMAND-SPECS.md` -> passed.

Attempted clean Round 1 after `603704e` found four additional confirmed issues:

- implementation-logic review reported two `ljx-GSD-workstreams complete` consistency gaps: session-local completion could leave the shared active pointer targeting a completed workstream, and a partial target-record write during completion was not rolled back.
- GSD/Auto reuse review reported that the generated upstream Auto reference README claimed raw preservation even though upstream Auto Markdown docs are Codex-normalized support assets; independent verifier `019d7e24-3420-70a0-ab1f-4c3ac26cb0eb` confirmed this is a truthfulness issue and recommended a wording-only minimum-change repair.
- adversarial scenario review reported that `ljx-lifecycle-shell-tools.cjs` accepted flag-looking missing option values and emitted raw stacks for parse errors; independent verifier `019d7e24-7183-7a02-9956-2a9cd1ca4a8f` confirmed both subfindings.
- skill/docs review reported that parameter docs still implied current `ljx-GSD-next` can create phases through `workflow.allow_auto_phase_creation`; independent verifier `019d7e24-b53f-7bb0-bccc-26ad62f8db80` confirmed the current bridge helper only returns inline-safe execution or handoff metadata for `next`.

Commands run before the attempted-clean-round `603704e` repair:

- `node --test tests/workstreams-bridge.test.cjs` -> red before the repair with 2 expected failures for workstream completion rollback/shared-pointer consistency.
- `node --test tests/lifecycle-state-sync.test.cjs` -> red before the repair with 2 expected failures for structured CLI parse errors and flag-looking option values.
- `node --test tests/skill-build.test.cjs` -> red before the repair with 1 expected failure for the generated upstream Auto reference README wording.
- `node --test tests/docs-contract.test.cjs` -> red before the repair with 1 expected failure for parameter-doc `next` auto-phase-creation wording.

Commands run after the attempted-clean-round `603704e` repair:

- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `node --check bin/lib/ljx-lifecycle-shell-tools.cjs`
- `node --check bin/lib/build-skills.cjs`
- `node --test tests/workstreams-bridge.test.cjs tests/lifecycle-state-sync.test.cjs tests/skill-build.test.cjs tests/docs-contract.test.cjs` -> 103/103 passed.
- `npm test` -> 505/505 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-round1-confirmed-fixes-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `git diff --check` -> passed.
- `node bin/lib/ljx-state-tools.cjs progress --cwd /Users/lijiaxin/Downloads/new-gsd` -> Phase 13 `review_verify`, recommends `ljx-GSD-code-review 13`.
- `node bin/lib/ljx-state-tools.cjs next --cwd /Users/lijiaxin/Downloads/new-gsd` -> bridge-ready handoff to `ljx-GSD-code-review 13`, not inline completion.

This repair does not count as a clean review round. The next step is to rerun comprehensive current-head review/verify until two consecutive rounds report no findings.

Attempted clean Round 1 after `93c7c37` found three additional confirmed issues:

- implementation-logic and redundancy/efficiency reviews reported that Auto/GSD-adjacent bridge helper CLIs still duplicated brittle argument parsing and emitted raw Node stacks for missing `--cwd` values; independent verifier `019d7e34-3399-7432-b958-42efa6c8ac16` confirmed the raw-stack failures in `ljx-research-refine-tools.cjs`, `ljx-code-review-tools.cjs`, `ljx-verify-tools.cjs`, and `ljx-claim-gate-tools.cjs`, plus inline `--cwd=...=tail` truncation risk.
- roadmap-admin review reported that lettered phase ids were compared with `Number.parseInt`, so `12A.1` could be treated as historical/future incorrectly relative to `12B`, and insert could create non-future lettered children; independent verifier `019d7e37-0638-7952-9a7e-66089fbd1ab8` confirmed both the comparator and insert guard gaps.
- lifecycle-shell review reported that malformed or missing `sync-lifecycle-state --payload-file` inputs returned structured JSON but process status `0` and omitted `stopReasonCode`; independent verifier `019d7e37-0638-7952-9a7e-66089fbd1ab8` confirmed the nonzero/stop-code gap.

Commands run before the attempted-clean-round `93c7c37` repair:

- `node --test tests/cli-parser-contract.test.cjs tests/roadmap-admin-bridge.test.cjs tests/lifecycle-state-sync.test.cjs` -> red before the repair with 7 expected failures covering raw parser stacks, inline `=` truncation, lettered-phase ordering/insert guards, and lifecycle payload status codes.

Commands run after the attempted-clean-round `93c7c37` repair:

- `node --check bin/lib/ljx-cli-args.cjs`
- `node --check bin/lib/ljx-ablation-planner-tools.cjs`
- `node --check bin/lib/ljx-claim-gate-tools.cjs`
- `node --check bin/lib/ljx-code-review-fix-tools.cjs`
- `node --check bin/lib/ljx-code-review-tools.cjs`
- `node --check bin/lib/ljx-experiment-bridge-tools.cjs`
- `node --check bin/lib/ljx-experiment-plan-tools.cjs`
- `node --check bin/lib/ljx-idea-discovery-tools.cjs`
- `node --check bin/lib/ljx-lifecycle-shell-tools.cjs`
- `node --check bin/lib/ljx-novelty-check-tools.cjs`
- `node --check bin/lib/ljx-paper-pipeline-tools.cjs`
- `node --check bin/lib/ljx-rebuttal-tools.cjs`
- `node --check bin/lib/ljx-research-refine-tools.cjs`
- `node --check bin/lib/ljx-research-review-tools.cjs`
- `node --check bin/lib/ljx-result-to-claim-tools.cjs`
- `node --check bin/lib/ljx-review-loop-tools.cjs`
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-verify-tools.cjs`
- `node --check bin/lib/build-skills.cjs`
- `node --test tests/cli-parser-contract.test.cjs tests/roadmap-admin-bridge.test.cjs tests/lifecycle-state-sync.test.cjs tests/skill-build.test.cjs` -> 120/120 passed after the repair.
- `npm test` -> 512/512 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-cli-lettered-payload-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `git diff --check` -> passed.

This repair does not count as a clean review round. The next step remains two consecutive comprehensive current-head review/verify rounds with no findings.

Attempted clean Round 1 after `17b12b8` found one additional confirmed issue:

- adversarial/common-scenario review reported that malformed `--payload-file` JSON for writer CLIs returned structured nonzero stops but generic `invalid_cli_arguments` instead of payload-domain stop codes; independent verifier `019d7e4f-6000-7e32-b1e6-ef3b35952327` confirmed the issue and expanded the affected scope to seven writer helpers: `write-claim-readiness`, `write-claim-judgment`, `write-paper-state`, `write-rebuttal-state`, `write-portfolio-state`, `write-refinement-session-state`, and `write-review-state`.
- The minimum-change repair keeps existing non-object payload validators unchanged, adds shared payload JSON file classification in `ljx-cli-args.cjs`, and routes claim writers to `invalid_claim_state_payload`, paper/rebuttal writers to `invalid_paper_state_payload`, and generic research/review state writers to `invalid_state_payload`.

Commands run before the attempted-clean-round `17b12b8` repair:

- `node --test tests/cli-parser-contract.test.cjs` -> red before the repair with 1 expected failure for malformed payload JSON being classified as `invalid_cli_arguments`.

Commands run after the attempted-clean-round `17b12b8` repair:

- `node --check bin/lib/ljx-cli-args.cjs`
- `node --check bin/lib/ljx-claim-gate-tools.cjs`
- `node --check bin/lib/ljx-result-to-claim-tools.cjs`
- `node --check bin/lib/ljx-paper-pipeline-tools.cjs`
- `node --check bin/lib/ljx-rebuttal-tools.cjs`
- `node --check bin/lib/ljx-idea-discovery-tools.cjs`
- `node --check bin/lib/ljx-research-refine-tools.cjs`
- `node --check bin/lib/ljx-review-loop-tools.cjs`
- `node --test tests/cli-parser-contract.test.cjs` -> 3/3 passed.
- `node --test tests/claim-gate-bridge.test.cjs tests/research-refine-bridge.test.cjs tests/idea-discovery-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/rebuttal-bridge.test.cjs tests/result-to-claim-bridge.test.cjs tests/review-loop-bridge.test.cjs tests/cli-parser-contract.test.cjs` -> 82/82 passed.
- `npm test` -> 513/513 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-payload-classification-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `git diff --check` -> passed.

This repair does not count as a clean review round. The next step remains two consecutive comprehensive current-head review/verify rounds with no findings.

Attempted clean Round 1 after `903b41d` found three additional confirmed issue groups:

- redundancy/reuse and adversarial reviews reported that `ljx-roadmap-admin-tools.cjs` and `ljx-workstreams-tools.cjs` still carried local CLI option-value parsers that accepted single-dash flag-looking values such as `--cwd -x`; independent verifier `019d7e5b-59e8-70d3-9870-4c27bdb0c2e1` confirmed this as a behavior-level parser drift and also confirmed that lifecycle payload parsing should reuse the shared JSON payload helper for consistency.
- implementation-logic review reported that `add`/`insert` could create new `depends_on` edges to existing but malformed authoritative phase records; independent verifier `019d7e5e-b30e-7fe2-befc-b2bad00b0963` confirmed this as a blocking typed-dependency safety issue while preserving the intended legacy compatibility for absent roadmap-only records.
- adversarial/common-scenario review reported that generic recovery-state writers for `idea-discovery`, `research-refine`, and `review-loop` accepted valid JSON payloads with the wrong shape and could persist string/array index fields; independent verifier `019d7e60-43ea-7a40-8468-01a7215abd2e` confirmed the issue and limited the required fix to shared payload object validation plus writer tests.

Commands run before the attempted-clean-round `903b41d` repair:

- `node --test tests/cli-parser-contract.test.cjs` -> red before the repair with 1 expected failure for non-object JSON payload files being accepted.
- `node --test tests/roadmap-admin-bridge.test.cjs` -> red before the repair with 3 expected failures covering invalid dependency phase records and `--cwd -x` parser drift.
- `node --test tests/workstreams-bridge.test.cjs` -> red before the repair with 1 expected failure for `--cwd -x` parser drift.
- `node --test tests/idea-discovery-bridge.test.cjs tests/research-refine-bridge.test.cjs tests/review-loop-bridge.test.cjs` -> red before the repair with 3 expected failures for direct non-object recovery-state payloads.

Commands run after the attempted-clean-round `903b41d` repair:

- `node --check bin/lib/ljx-cli-args.cjs`
- `node --check bin/lib/ljx-roadmap-admin-tools.cjs`
- `node --check bin/lib/ljx-workstreams-tools.cjs`
- `node --check bin/lib/ljx-lifecycle-shell-tools.cjs`
- `node --check bin/lib/ljx-idea-discovery-tools.cjs`
- `node --check bin/lib/ljx-research-refine-tools.cjs`
- `node --check bin/lib/ljx-review-loop-tools.cjs`
- `node --check tests/roadmap-admin-bridge.test.cjs`
- `node --check tests/paper-pipeline-bridge.test.cjs`
- `node --check tests/rebuttal-bridge.test.cjs`
- `node --test tests/cli-parser-contract.test.cjs tests/roadmap-admin-bridge.test.cjs tests/workstreams-bridge.test.cjs tests/idea-discovery-bridge.test.cjs tests/research-refine-bridge.test.cjs tests/review-loop-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/rebuttal-bridge.test.cjs tests/lifecycle-state-sync.test.cjs` -> repaired target suites passed after test adjustment.
- `node --test tests/roadmap-admin-bridge.test.cjs tests/paper-pipeline-bridge.test.cjs tests/rebuttal-bridge.test.cjs` -> 99/99 passed after the test-harness correction.
- `node --test tests/docs-contract.test.cjs tests/skill-build.test.cjs` -> 51/51 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-confirmed-fixes-codex-2` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 520/520 passed.
- `git diff --check` -> passed.

This repair does not count as a clean review round. The next step remains two consecutive comprehensive current-head review/verify rounds with no findings.

Attempted clean Round 1 after `ad7fb2b` found two additional confirmed issue groups:

- redundancy/efficiency and independent verification reported that `ljx-GSD-new-project` still carried a local CLI option parser accepting single-dash flag-looking values such as `--cwd -x`, allowing initialization in a wrong `-x` directory instead of a structured `missing_option_value` stop.
- implementation/adversarial reviews and independent verification reported that writer helper `--payload-file` read failures leaked raw filesystem codes such as `ENOENT` and `EISDIR` instead of the payload-domain stop codes already used for malformed and non-object payload JSON.
- docs/skills, plan compliance, and GSD/Auto reuse reviews did not find additional actionable mismatch at `ad7fb2b`; the fix scope is intentionally limited to shared parser reuse and payload read classification.

Commands run before the attempted-clean-round `ad7fb2b` repair:

- `node --test tests/cli-parser-contract.test.cjs` -> red before the repair with 2 expected failures for missing and directory payload paths leaking raw filesystem codes.
- `node --test tests/new-project-bridge.test.cjs` -> red before the repair with 1 expected failure for `init --cwd -x --auto` initializing the `-x` directory.

Commands run after the attempted-clean-round `ad7fb2b` repair:

- `node --check bin/lib/ljx-cli-args.cjs`
- `node --check bin/lib/ljx-new-project-tools.cjs`
- `node --test tests/cli-parser-contract.test.cjs tests/new-project-bridge.test.cjs` -> 16/16 passed.
- `node --test tests/workstreams-bridge.test.cjs tests/roadmap-admin-bridge.test.cjs tests/lifecycle-state-sync.test.cjs` -> 121/121 passed.
- `node --test tests/docs-contract.test.cjs tests/skill-build.test.cjs` -> 51/51 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-parser-payload-fix-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 523/523 passed.
- `git diff --check` -> passed.

This repair does not count as a clean review round. The next step remains two consecutive comprehensive current-head review/verify rounds with no findings.

Attempted clean Round 1 after `dd2821a` found one additional confirmed issue:

- redundancy/efficiency, GSD/Auto reuse, and independent verification reported that `ljx-state-tools.cjs` still carried a local `--cwd` parser that accepted whitespace-only values such as `--cwd '   '` and `--cwd=   `. Read-only commands could resolve the parent project, and mutating `pause`/`resume` could write or delete handoff state in the wrong project instead of returning structured `missing_option_value`.
- the docs/skills, plan compliance, and implementation-logic reviews found no other actionable issue at `dd2821a`.
- a read-only adversarial review agent incorrectly committed `f2e0b4d` to mark Phase 13 complete before this confirmed finding was handled; the main agent reverted that premature state-only completion with `94617ef`, so it is not counted as a valid clean review round.

Commands run before the attempted-clean-round `dd2821a` repair:

- `node --test tests/runtime-shell.test.cjs` -> red before the repair with 1 expected failure for whitespace-only `--cwd` being accepted before project discovery/mutation.

Commands run after the attempted-clean-round `dd2821a` repair:

- `node --check bin/lib/ljx-state-tools.cjs`
- `node --check tests/runtime-shell.test.cjs`
- `node --test tests/runtime-shell.test.cjs tests/cli-parser-contract.test.cjs tests/new-project-bridge.test.cjs` -> 68/68 passed.
- `node --test tests/docs-contract.test.cjs tests/skill-build.test.cjs` -> 51/51 passed.
- `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-state-cli-parser-fix-codex-1` -> preview install completed with 29 bridge-ready skills plus the `ljx-GSD-research-pipeline` compatibility skill.
- `npm test` -> 524/524 passed.
- `git diff --check` -> passed.

This repair does not count as a clean review round. Per the 2026-04-11 user clarification, purely low-risk display details or extreme non-mutating edge cases may be recorded as non-blocking rather than resetting the clean-round counter.

## Clean Round Evidence After `b49edfc`

Round 1 found no blocking or non-blocking issues after the state-CLI parser repair. Evidence:

- Local verification: clean worktree at `b49edfc`, `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-clean-round1-head-b49edfc-codex`, `npm test` -> 524/524 passed, `git diff --check`, and a final clean `git status --short`.
- Implementation/runtime review: shared parser reuse, manual probes for `progress` / `next` / `pause` / `resume --cwd '   '` and `--cwd=   `, payload writer missing/dir checks, roadmap/workstream/lifecycle whitespace-cwd checks, focused 189/189 checks, docs/skill 51/51 checks, install preview, full 524/524 test suite, and clean diff/status.
- Docs/skills/state review: planning mirrors kept Phase 13 in review-pending before completion, manifest had 29 bridge-ready skills plus deferred compatibility `research-pipeline`, progress/next still routed Phase 13 to `code-review`, and full verification stayed clean.
- GSD/Auto reuse and minimum-modification review: shared parser and payload helpers were reused instead of copying local parser logic, lifecycle wrappers stayed thin adapters, Auto skills remained preserved, and focused/admin/workstream/docs/preview verification stayed clean.
- Adversarial scenario review: 25 temp-dir probes covered CLI cwd parsing, payload-file missing/directory failures, pause/resume mutation safety, workstream blockers, roadmap blockers, preview install, and Phase 13 progress/next routing.

Round 2 found no blocking or non-blocking issues. Evidence:

- Local verification: `node bin/install.js --preview --target-dir /tmp/ljx-gsd-preview-phase13-clean-round2-head-b49edfc-codex`, `npm test` -> 524/524 passed, `git diff --check`, and clean `git status --short`.
- Implementation/runtime review: state tools reused the shared parser; whitespace-only cwd values returned structured `missing_option_value` without mutation; payload writer missing/dir failures used domain stop codes; lifecycle, roadmap, and workstream boundary probes passed; focused 175/175, docs/skill 51/51, manual probes 24/24, preview install, and full 524/524 suite were clean.
- Docs/state/generated-skill review: `.planning/STATE.md`, `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, `progress.md`, and the Phase 13 review log accurately represented the pre-completion review state during the round; the premature `f2e0b4d` state-only completion was documented as reverted by `94617ef`; preview install still produced 29 bridge-ready skills plus the compatibility `research-pipeline` wrapper.
- GSD/Auto reuse and minimum-modification review: CLI parsing was centralized in `ljx-cli-args.cjs`, helper CLIs reused it, Auto research functionality remained present as bridge-ready skills or the deferred compatibility wrapper, and no second control plane was introduced.
- Scenario verification: 141 temp-dir checks covered CLI cwd parsing, payload-file missing/directory failures, pause/resume mutation safety, workstream blockers, roadmap blockers, preview install, progress/next routing, docs/skill/runtime checks, full 524/524 test suite, and clean status.

Status update: Phase 13 and `IMPL-07` are complete; Phase 14 migration cutover and parity verification is the next implementation slice.
