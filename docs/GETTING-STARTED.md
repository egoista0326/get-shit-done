<!-- generated-by: gsd-doc-writer -->
# Getting Started

This guide gets a local checkout of GSD installed and running for development or source-based testing.

## Prerequisites

- Node.js `>=22.0.0`, as declared in [package.json](../package.json).
- npm, using the checked-in [package-lock.json](../package-lock.json) for reproducible installs.
- Git, if you are cloning the repository or working on a contribution.

## Installation Steps

Clone the repository and install dependencies:

```bash
git clone https://github.com/gsd-build/get-shit-done.git
cd get-shit-done
npm ci
```

For active development, `npm install` is also valid. Use `npm ci` when you want an install that exactly follows `package-lock.json`.

## First Run

Run the test suite to verify the checkout:

```bash
npm test
```

To build the hook bundle used by the installer:

```bash
npm run build:hooks
```

To test a local Claude Code install from the source checkout:

```bash
node bin/install.js --claude --local
```

For current cutover install path details, see [docs/CUTOVER.md](CUTOVER.md). Claude Code global installs use `~/.claude/skills/gsd-*/SKILL.md`; Claude Code local installs use `./.claude/commands/gsd/*.md`.

## Common Setup Issues

- **Wrong Node.js version:** if install or tests fail on syntax or runtime features, confirm `node --version` is `22.x` or newer.
- **Hook files missing after local install:** run `npm run build:hooks` before `node bin/install.js --claude --local`. The npm package runs this during publish, but source checkouts need the build step.
- **Tests are slower than expected:** the root test runner uses Node's built-in test runner with `--test-concurrency=4`. Override with `TEST_CONCURRENCY=1 npm test` when debugging order-sensitive output.

## Next Steps

- Read [DEVELOPMENT.md](DEVELOPMENT.md) for build scripts, contribution workflow, and local development conventions.
- Read [TESTING.md](TESTING.md) for test commands, test file patterns, and CI coverage behavior.
- Read [CONFIGURATION.md](CONFIGURATION.md) for GSD runtime configuration.
