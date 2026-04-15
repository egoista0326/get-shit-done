# Cutover Readiness Notes

Status: readiness verification only

No version bump, npm publish, shipped claim, or @latest claim is authorized by this document.

This document records install-path and verification evidence for cutover preparation. It is not a release announcement.

## Install Surfaces

Global Claude Code 2.1.88+ installs use ~/.claude/skills/gsd-*/SKILL.md.

Local Claude installs use ./.claude/commands/gsd/*.md.

Codex, Qwen Code, and Gemini install GSD commands or skills under the selected target runtime config directory.

Hooks install to hooks/ under the target runtime config directory; hooks/dist/ is source checkout build output.

Source-based installs must run npm run build:hooks or node scripts/build-hooks.js before installer probes that depend on hooks.

Thin research sources remain commands/gsd/ljx-*.md and install as gsd-ljx-* skills.

## Verification Gates

Before treating this checkout as cutover-ready, verify:

- Hook build output is current with `npm run build:hooks`.
- Package inventory is checked with `npm pack --dry-run --json --ignore-scripts`.
- Installer probes use temporary `HOME` and `--config-dir` targets, not live user runtime directories.
- Generated output and docs agree on command, skill, hook, and research overlay paths.
- Phase 08 thin overlay and Phase 09 scenario evidence remain consistent with Phase 10 package checks.

Any version, registry, or release-channel action requires a separate explicit decision.
