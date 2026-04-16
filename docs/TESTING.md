<!-- generated-by: gsd-doc-writer -->
# Testing

This guide documents the test setup for the GSD repository.

## Test Framework And Setup

The root test suite uses Node.js built-in `node:test` with `node:assert/strict`. The custom runner [scripts/run-tests.cjs](../scripts/run-tests.cjs) discovers every `*.test.cjs` file in [tests/](../tests/) and executes them with `node --test`.

The SDK uses Vitest through [vitest.config.ts](../vitest.config.ts) and [sdk/vitest.config.ts](../sdk/vitest.config.ts). Root `npm test` does not invoke Vitest directly.

Install dependencies before running tests:

```bash
npm ci
```

## Running Tests

Run the full root test suite:

```bash
npm test
```

Run the root suite with coverage:

```bash
npm run test:coverage
```

Run a single root test file:

```bash
node --test tests/phase.test.cjs
```

Run a focused group of root tests:

```bash
node --test tests/phase.test.cjs tests/core.test.cjs
```

Control root test concurrency while debugging:

```bash
TEST_CONCURRENCY=1 npm test
```

Run SDK Vitest tests directly from the repository root:

```bash
npx vitest run --config vitest.config.ts
```

## Writing New Tests

Root tests live in [tests/](../tests/) and use the `*.test.cjs` naming convention. Import Node test APIs directly:

```javascript
const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
```

Use [tests/helpers.cjs](../tests/helpers.cjs) for common temporary project setup:

| Helper | Use |
| --- | --- |
| `createTempProject(prefix?)` | Creates a temporary project with `.planning/phases/`. |
| `createTempGitProject(prefix?)` | Creates a temporary GSD project initialized as a git repository. |
| `createTempDir(prefix?)` | Creates a bare temporary directory. |
| `cleanup(tmpDir)` | Removes temporary directories during teardown. |
| `runGsdTools(args, cwd, env?)` | Executes `gsd-tools.cjs` for CLI-oriented tests. |

Prefer `beforeEach` / `afterEach` or `t.after()` cleanup patterns, matching [CONTRIBUTING.md](../CONTRIBUTING.md). Do not add Jest, Mocha, or Chai to root tests.

## Coverage Requirements

The coverage script is:

```bash
npm run test:coverage
```

It runs `c8 --check-coverage --lines 70 --reporter text --include 'get-shit-done/bin/lib/*.cjs' --exclude 'tests/**' --all node scripts/run-tests.cjs`.

| Type | Threshold |
| --- | --- |
| Lines | 70% |
| Branches | No threshold configured |
| Functions | No threshold configured |
| Statements | No threshold configured |

## CI Integration

The main test workflow is [.github/workflows/test.yml](../.github/workflows/test.yml). It runs on pushes to `main`, `release/**`, and `hotfix/**`, on pull requests to `main`, and on manual dispatch.

CI runs:

```bash
npm ci
npm run test:coverage
```

The matrix covers Ubuntu with Node.js 22 and 24, plus macOS with Node.js 24. Pull requests also run [.github/workflows/pr-gate.yml](../.github/workflows/pr-gate.yml), which labels PR size and warns on large changes.
