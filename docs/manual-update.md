# Manual Update (Non-npm Install)

Use this procedure when `npx get-shit-done-cc@latest` is unavailable — e.g. during a publish outage or if you are working directly from the source repo.

## Prerequisites

- Node.js installed
- This repo cloned locally (`git clone https://github.com/gsd-build/get-shit-done`)

## Steps

```bash
# 1. Pull latest code
git pull --rebase origin main

# 2. Build the hooks dist (required because hooks/dist/ is source checkout build output)
npm run build:hooks
# Equivalent direct command: node scripts/build-hooks.js

# 3. Run the installer directly
node bin/install.js --claude --global

# 4. Clear the update cache so the statusline indicator resets
rm -f ~/.cache/gsd/gsd-update-check.json
```

**Step 5 — Restart your runtime** to pick up the new commands and agents.

## Runtime flags

Replace `--claude` with the flag for your runtime:

| Runtime | Flag |
|---|---|
| Claude Code | `--claude` |
| Gemini CLI | `--gemini` |
| OpenCode | `--opencode` |
| Kilo | `--kilo` |
| Codex | `--codex` |
| Copilot | `--copilot` |
| Cursor | `--cursor` |
| Windsurf | `--windsurf` |
| Augment | `--augment` |
| All runtimes | `--all` |

Use `--local` instead of `--global` for a project-scoped install.

For verification probes, use `--config-dir` with a temporary path so installer output can be inspected without touching your live runtime config:

```bash
tmp_dir="$(mktemp -d)"
node bin/install.js --claude --global --config-dir "$tmp_dir/.claude"
```

## Generated output paths

The installer writes managed files under the target runtime config directory selected by `--global`, `--local`, runtime environment variables, or `--config-dir`.

The installer performs a clean wipe-and-replace of GSD-managed directories only:

- `get-shit-done/` under the target runtime config directory — workflows, references, templates
- `skills/gsd-*/SKILL.md` under the target runtime config directory — GSD skills for global Claude Code 2.1.88+, Codex, Qwen Code, and other skill-based runtimes
- `commands/gsd/` under the target runtime config directory — local Claude Code commands and command-based runtime output
- `agents/gsd-*.md` under the target runtime config directory — GSD agents where supported
- `hooks/` under the target runtime config directory — installed hooks. Hooks install to hooks/ under the target runtime config directory.

**What is preserved:**
- Custom agents not prefixed with `gsd-`
- Custom commands outside `commands/gsd/`
- Your `CLAUDE.md` files
- Custom hooks

Locally modified GSD files are automatically backed up to `gsd-local-patches/` before the install. Run `/gsd-reapply-patches` after updating to merge your modifications back in.
