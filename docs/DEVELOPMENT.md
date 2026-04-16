<!-- generated-by: gsd-doc-writer -->
# Development

This guide covers local development for the GSD repository.

## Local Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/gsd-build/get-shit-done.git
cd get-shit-done
npm install
```

Build hook artifacts before testing installer behavior:

```bash
npm run build:hooks
```

Run a local install for a target runtime when validating installer changes. For example:

```bash
node bin/install.js --claude --local
```

## Build Commands

The root [package.json](../package.json) defines these npm scripts:

| Command | Description |
| --- | --- |
| `npm run build:hooks` | Builds hook source files through `scripts/build-hooks.js`. |
| `npm run prepublishOnly` | Runs `npm run build:hooks` before publishing. |
| `npm test` | Runs `node scripts/run-tests.cjs`, which executes every `tests/*.test.cjs` file with Node's built-in test runner. |
| `npm run test:coverage` | Runs the test suite through `c8` with a 70% line coverage threshold for `get-shit-done/bin/lib/*.cjs`. |

## Code Style

No root ESLint, Prettier, Biome, or EditorConfig file is present in this checkout. Follow the existing CommonJS style for root runtime files:

- Use `'use strict';` in `.cjs` modules that already follow that pattern.
- Keep test files under `tests/` as `*.test.cjs`.
- Prefer the existing helper APIs in [tests/helpers.cjs](../tests/helpers.cjs) for temporary projects and cleanup.
- Keep generated installer/runtime files in the established directories: `bin/`, `commands/`, `get-shit-done/`, `agents/`, `hooks/`, and `scripts/`.

The SDK has its own TypeScript/Vitest setup under [sdk/](../sdk/), including [sdk/vitest.config.ts](../sdk/vitest.config.ts).

## Branch Conventions

The repository enforces branch and PR hygiene through GitHub workflows and templates. Local branch names are not documented as a strict pattern in the root docs, but PRs must use the correct typed template and must link to an approved issue.

## PR Process

Follow [CONTRIBUTING.md](../CONTRIBUTING.md):

- Open or use the right issue type before coding: bug fix, enhancement, or feature.
- Wait for the required label before opening enhancement or feature PRs.
- Use the matching PR template in [.github/PULL_REQUEST_TEMPLATE/](../.github/PULL_REQUEST_TEMPLATE/).
- Include `Fixes #...`, `Closes #...`, or `Resolves #...` so automation can connect the PR to the issue.
- Run the relevant tests locally before opening the PR.
- Keep the implementation scoped to the approved issue.

## Useful Paths

| Path | Purpose |
| --- | --- |
| [bin/install.js](../bin/install.js) | Installer entry point and runtime-specific install conversion logic. |
| [get-shit-done/bin/gsd-tools.cjs](../get-shit-done/bin/gsd-tools.cjs) | CLI tool dispatcher for GSD internal operations. |
| [get-shit-done/workflows/](../get-shit-done/workflows/) | Command workflow bodies installed into supported runtimes. |
| [commands/gsd/](../commands/gsd/) | Source command files used by installer conversions. |
| [agents/](../agents/) | GSD subagent prompt definitions. |
| [tests/](../tests/) | Root CommonJS test suite. |
| [sdk/](../sdk/) | TypeScript SDK package and Vitest tests. |
