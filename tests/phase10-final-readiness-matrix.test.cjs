'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const repoRoot = path.resolve(__dirname, '..');
const phaseDir = path.join(
  repoRoot,
  '.planning',
  'phases',
  '10-cutover-packaging-and-final-verification'
);

const finalReadinessPath = path.join(phaseDir, '10-FINAL-READINESS.md');
const reviewPath = path.join(phaseDir, '10-REVIEW.md');

const finalReadinessRelative =
  '.planning/phases/10-cutover-packaging-and-final-verification/10-FINAL-READINESS.md';
const reviewRelative =
  '.planning/phases/10-cutover-packaging-and-final-verification/10-REVIEW.md';

const requiredCommands = [
  'npm test',
  'node --test tests/phase09-engineering-lifecycle-scenario.test.cjs tests/phase09-research-lifecycle-scenario.test.cjs tests/phase09-policy-migration-concurrency-scenario.test.cjs',
  'npm pack --dry-run --json --ignore-scripts',
  'node get-shit-done/bin/gsd-tools.cjs state validate',
  'node get-shit-done/bin/gsd-tools.cjs validate health',
  'node get-shit-done/bin/gsd-tools.cjs verify phase-completeness 10',
];

const requiredMatrixRows = [
  'Package inventory',
  'Generated install output',
  'Hook build freshness',
  'Docs alignment',
  'Phase 09 scenarios',
  'Full npm test',
  'GSD state validation',
  'GSD health validation',
  'Phase completeness',
  'Review gate evidence',
  'Docs/generation evidence',
  'Diff hygiene',
];

const noReleaseCaveat =
  'No npm publish, package version bump, @latest claim, shipped claim, or public release claim was performed.';

function readRequiredFile(filePath, label) {
  assert.ok(fs.existsSync(filePath), `${label} should exist`);
  return fs.readFileSync(filePath, 'utf8');
}

function assertIncludes(haystack, needle, label) {
  assert.ok(haystack.includes(needle), `${label} should contain exact text: ${needle}`);
}

function assertMatrixRow(documentText, rowLabel) {
  const rowPattern = new RegExp(`\\|\\s*${rowLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\|`, 'i');
  assert.match(documentText, rowPattern, `Final Readiness Matrix should include row: ${rowLabel}`);
}

describe('Phase 10 final readiness matrix', () => {
  test('10-FINAL-READINESS.md records the required final evidence matrix', () => {
    const finalReadiness = readRequiredFile(finalReadinessPath, finalReadinessRelative);

    for (const expected of [
      '# Phase 10 Final Readiness',
      'Final Readiness Matrix',
      'Milestone Closure Decision',
      noReleaseCaveat,
    ]) {
      assertIncludes(finalReadiness, expected, finalReadinessRelative);
    }

    for (const rowLabel of requiredMatrixRows) {
      assertMatrixRow(finalReadiness, rowLabel);
    }

    for (const command of requiredCommands) {
      assertIncludes(finalReadiness, command, finalReadinessRelative);
    }
  });

  test('10-REVIEW.md records a clean or not-clean review gate status', () => {
    const review = readRequiredFile(reviewPath, reviewRelative);

    assert.match(
      review,
      /Status:\s*(?:clean|not-clean)\b/,
      `${reviewRelative} should include Status: clean or Status: not-clean`
    );
  });
});
