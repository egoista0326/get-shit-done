---
phase: 18
plan: 18-02
status: completed
completed_at: 2026-04-12
key_files:
  - .planning/review/v1.1/ROUND-01-CONFIRMATION.md
---

# 18-02 Summary: Candidate Confirmation

Each Round 1 candidate received a second-pass confirmation before implementation changes were made.

Confirmed:

- BUG-001: repo-local upstream source snapshots were not used as fallback source roots for preview/install.
- BUG-002: `experiment-bridge` did not surface or enforce the experiment-launch confirmation setting.
- BUG-003: `loadProjectConfig()` did not normalize accepted top-level legacy config aliases before workflow logic.
- BUG-004: live-repo canary tests hard-coded exact Phase 14 routing after the project had advanced to v1.1 Phase 18.

Rejected or non-bug:

- preserving Auto companion execution skills instead of wrapping every tool
- missing public `ljx-GSD-new-workspace`
- verifier-disabled `verify-work` honest stop
- treating source-root failure as environment-only in the v1.1 verification checkout

The clean-round counter was kept at 0 because Round 1 contained confirmed bugs.
