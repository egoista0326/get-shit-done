'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, test } = require('node:test');

const repoRoot = path.resolve(__dirname, '..');
const cutoverPath = path.join(repoRoot, 'docs', 'CUTOVER.md');
const docsIndexPath = path.join(repoRoot, 'docs', 'README.md');

const requiredCutoverText = [
  'Status: readiness verification only',
  'No version bump, npm publish, shipped claim, or @latest claim is authorized by this document.',
  'Thin research sources remain commands/gsd/ljx-*.md and install as gsd-ljx-* skills.',
  'npm run build:hooks',
  'npm pack --dry-run --json --ignore-scripts',
  'temporary `HOME`',
  '--config-dir',
];

function readRequiredFile(filePath, label) {
  assert.ok(fs.existsSync(filePath), `${label} should exist`);
  return fs.readFileSync(filePath, 'utf8');
}

function assertIncludes(haystack, needle, label) {
  assert.ok(haystack.includes(needle), `${label} should contain exact text: ${needle}`);
}

describe('Phase 10 release readiness docs', () => {
  test('CUTOVER.md records release-safe readiness gates without requiring planning artifacts', () => {
    const cutover = readRequiredFile(cutoverPath, 'docs/CUTOVER.md');

    for (const expected of requiredCutoverText) {
      assertIncludes(cutover, expected, 'docs/CUTOVER.md');
    }

    assert.match(cutover, /## Install Surfaces\b/);
    assert.match(cutover, /## Verification Gates\b/);
  });

  test('docs index links the research reference and usage guides', () => {
    const docsIndex = readRequiredFile(docsIndexPath, 'docs/README.md');

    assertIncludes(
      docsIndex,
      'AUTO-RESEARCH-SKILLS-REFERENCE.md',
      'docs/README.md'
    );
    assertIncludes(
      docsIndex,
      'NEW-GSD-RESEARCH-SKILLS-USAGE.md',
      'docs/README.md'
    );
  });
});
