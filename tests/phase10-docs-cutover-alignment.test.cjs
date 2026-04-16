const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

const repoRoot = path.resolve(__dirname, '..');

const docs = {
  cutover: 'docs/CUTOVER.md',
  manualUpdate: 'docs/manual-update.md',
  docsReadme: 'docs/README.md',
  gettingStarted: 'docs/GETTING-STARTED.md',
  readme: 'README.md',
  zhCN: 'README.zh-CN.md',
  jaJP: 'README.ja-JP.md',
  koKR: 'README.ko-KR.md',
  ptBR: 'README.pt-BR.md',
};

const releaseCaveat =
  'No version bump, npm publish, shipped claim, or @latest claim is authorized by this document.';
const authoritativeLocalizedNote =
  'Current cutover/install path details are authoritative in README.md and docs/CUTOVER.md.';

function readDoc(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assertContains(documentText, expected, label) {
  assert.ok(
    documentText.includes(expected),
    `${label} should contain exact text: ${expected}`,
  );
}

describe('Phase 10 docs cutover alignment', () => {
  it('records cutover readiness without public release claims', () => {
    const cutover = readDoc(docs.cutover);

    for (const expected of [
      '# Cutover Readiness Notes',
      'Status: readiness verification only',
      releaseCaveat,
      '## Install Surfaces',
      'Global Claude Code 2.1.88+ installs use ~/.claude/skills/gsd-*/SKILL.md.',
      'Local Claude installs use ./.claude/commands/gsd/*.md.',
      'Hooks install to hooks/ under the target runtime config directory; hooks/dist/ is source checkout build output.',
      'Thin research sources remain commands/gsd/ljx-*.md and install as gsd-ljx-* skills.',
      'Source-based installs must run npm run build:hooks or node scripts/build-hooks.js before installer probes that depend on hooks.',
      '## Verification Gates',
    ]) {
      assertContains(cutover, expected, docs.cutover);
    }

    const releaseClaims = cutover.replace(releaseCaveat, '');
    assert.doesNotMatch(releaseClaims, /\b(?:published|shipped)\b|@latest|npm publish/i);
  });

  it('keeps manual source update paths aligned with installer output', () => {
    const manualUpdate = readDoc(docs.manualUpdate);

    for (const expected of [
      'target runtime config directory',
      'hooks/ under the target runtime config directory',
      'npm run build:hooks',
      '--config-dir',
    ]) {
      assertContains(manualUpdate, expected, docs.manualUpdate);
    }

    assert.doesNotMatch(manualUpdate, /~\/\.claude\/hooks\/dist\//);
  });

  it('documents Claude global skills versus local commands in user entrypoints', () => {
    for (const file of [docs.readme, docs.docsReadme, docs.gettingStarted]) {
      const documentText = readDoc(file);

      for (const expected of [
        'docs/CUTOVER.md',
        '~/.claude/skills/gsd-*/SKILL.md',
        './.claude/commands/gsd/*.md',
      ]) {
        assertContains(documentText, expected, file);
      }
    }
  });

  it('marks localized packaged READMEs as deferring to English cutover docs', () => {
    for (const file of [docs.zhCN, docs.jaJP, docs.koKR, docs.ptBR]) {
      assertContains(readDoc(file), authoritativeLocalizedNote, file);
    }
  });
});
