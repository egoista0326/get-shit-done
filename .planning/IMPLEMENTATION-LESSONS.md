# Implementation Lessons

This file records implementation-level lessons that should influence future `ljx-GSD` phases, reviews, and migration work.

## 2026-04-10 - Phase 07-09 review hardening

### Why so many bugs appeared

1. Structural reuse was stronger than behavioral reuse.
   We aligned on GSD-like command names, `.planning/` ownership, typed lifecycle shells, and Auto preservation, but some low-level lifecycle and quality-gate semantics were still rederived inside multiple helpers instead of being shared from one owner.

2. Too many small truth engines existed at once.
   Runtime state, quality gates, lifecycle shell adoption, generated skill wording, and preview-install output each held part of the truth. That made it easy for one layer to look correct while another still drifted.

3. Early tests emphasized isolated happy paths more than cross-helper and time-based semantics.
   The later failures were mostly about stale state, rerun-after-fix behavior, provenance persistence, install-time compatibility, and preserved Auto assets. Those are interaction bugs, not single-command syntax bugs.

4. The preservation goal enlarged the review surface.
   Because the project intentionally keeps GSD and Auto capabilities instead of deleting them, build/install conversion, compatibility wrappers, template copying, and path rewriting all became part of correctness. That was the right scope, but it meant more edge cases existed than a clean-room rewrite would have.

### Did we really reference GSD and Auto?

Yes, but unevenly.

- Yes at the architectural level: GSD remained the outer control plane, `.planning/` remained the root, phase artifacts and lifecycle terminology were preserved, and Auto stayed as an integrated workflow family rather than being discarded.
- Yes at the workflow-shape level: the lifecycle shell, typed routing, roadmap/state discipline, and bridge strategy were explicitly designed around GSD, while direct research workflows and preserved assets were taken from Auto.
- Not enough at the micro-semantic level during the first implementation passes: some lifecycle freshness, rerun, and adoption rules were re-derived locally instead of being pulled into shared helpers immediately. That is the main reason several review rounds were needed.

### Did we really follow the minimal modification principle?

Mostly yes in scope, incompletely yes in execution discipline.

- Yes in scope: we preserved the public command surface, kept compatibility wrappers, preserved Auto skill content and assets, and avoided solving integration by deleting difficult workflows.
- Not fully enough in execution discipline: in several places we added new helper logic instead of first proving that an existing shared owner could carry the rule. That still counted as feature preservation, but it was not the strongest form of minimal modification.

The main correction is:

- minimal modification must mean "reuse existing semantics and rule owners whenever practical", not only "avoid deleting features"

### Required rules going forward

1. Reuse behavior, not just shape.
   If GSD already has a coherent routing or lifecycle precedent, prefer adapting that behavior over re-deriving a similar rule in a new helper.

2. Put each authoritative rule under one owner.
   Freshness, rerun-after-fix, lifecycle progression, and plan adoption provenance should each have one shared implementation path.

3. Treat install/build output as part of the product, not an afterthought.
   Preview-install artifacts, generated skills, preserved Auto templates, and compatibility wrappers must be reviewed along with runtime code.

4. Add both "sticky" and "superseded" regression tests.
   Any rule that keeps prior state alive must also be tested for the moment when newer clean evidence should clear that state.

5. Do not declare a bridge slice stable from single-lane tests alone.
   A phase is not truly bridge-ready until runtime logic, generated skills, preserved assets, and roadmap/documentation all agree.

6. Keep explicit notes when implementation falls short of ideal reuse.
   If a phase cannot directly reuse a GSD or Auto behavior, document why and what regression coverage compensates for the gap.

## 2026-04-11 - Whole-repo review gate after Phase 12

The Phase 12 review clarified that a phase-local diff review is not enough for `ljx-GSD`. The current system spans runtime helpers, generated skills, install/preview output, preserved upstream Auto references, `.planning` mirrors, and historical scratch docs. Any one of those can make the system unsafe or misleading even when the phase-specific paper/rebuttal code is correct.

Going forward, review gates should explicitly include:

1. Malformed filesystem shape tests for every authoritative state family touched by a phase.
2. Install/reinstall safety checks for generated skills, deferred commands, preserved upstream assets, and symlinked paths.
3. Public documentation checks for commands that are designed but not currently installed or still deferred.
4. A separate decision on whether a finding calls for narrow repair or broader consolidation; consolidation is correct only when it reduces drift without deleting GSD/Auto behavior or widening the active phase beyond its accepted scope.
