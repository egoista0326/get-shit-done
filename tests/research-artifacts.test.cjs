const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { createTempProject, cleanup, runGsdTools } = require('./helpers.cjs');
const { initResearchIndex } = require('../get-shit-done/bin/lib/research-index.cjs');

function createPhase(tmp, phaseDir = '01-test-phase') {
  const dir = path.join(tmp, '.planning', 'phases', phaseDir);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

describe('research artifact index', () => {
  test('initializes RESEARCH_INDEX.md inside the target phase research directory only', () => {
    const tmp = createTempProject('gsd-research-artifacts-');
    const phaseDir = createPhase(tmp);
    const statePath = path.join(tmp, '.planning', 'STATE.md');
    const roadmapPath = path.join(tmp, '.planning', 'ROADMAP.md');
    fs.writeFileSync(statePath, '---\ncurrent_phase: 01\n---\n\n# State\n');
    fs.writeFileSync(roadmapPath, '# Roadmap\n');
    const stateBefore = fs.readFileSync(statePath, 'utf8');
    const roadmapBefore = fs.readFileSync(roadmapPath, 'utf8');

    try {
      const result = initResearchIndex(tmp, '01', 'idea-discovery');

      assert.equal(result.written, true);
      assert.equal(result.command, 'idea-discovery');
      assert.equal(
        fs.realpathSync(result.indexPath),
        fs.realpathSync(path.join(phaseDir, 'research', 'RESEARCH_INDEX.md'))
      );
      assert.equal(fs.existsSync(result.indexPath), true);
      const content = fs.readFileSync(result.indexPath, 'utf8');
      assert.match(content, /Command: idea-discovery/);
      assert.match(content, /research\/literature\/LITERATURE_EVIDENCE\.md/);
      assert.match(content, /research\/ideas\/IDEA_REPORT\.md/);
      assert.match(content, /research\/novelty\/NOVELTY_REVIEW\.md/);
      assert.match(content, /## Required Evidence/);
      assert.match(content, /## Raw Records/);
      assert.match(content, /## Summaries/);
      assert.match(content, /## Reviews/);
      assert.match(content, /## Audits/);
      assert.match(content, /## Side Effect Records/);
      assert.match(content, /## Imports/);
      assert.match(content, /## Exports/);
      assert.match(content, /## Missing Evidence/);
      assert.match(content, /## Taint And Degraded Status/);
      assert.match(content, /## Completion Labels/);
      assert.equal(fs.readFileSync(statePath, 'utf8'), stateBefore);
      assert.equal(fs.readFileSync(roadmapPath, 'utf8'), roadmapBefore);
    } finally {
      cleanup(tmp);
    }
  });

  test('CLI research index initializes the phase-local index and returns JSON', () => {
    const tmp = createTempProject('gsd-research-artifacts-');
    createPhase(tmp);

    try {
      const result = runGsdTools(['research', 'index', '01', '--command', 'idea-discovery'], tmp);

      assert.equal(result.success, true, result.error);
      const parsed = JSON.parse(result.output);
      assert.equal(parsed.command, 'idea-discovery');
      assert.equal(parsed.written, true);
      assert.equal(fs.existsSync(parsed.indexPath), true);
    } finally {
      cleanup(tmp);
    }
  });

  test('rejects missing phase instead of writing research artifacts at planning root', () => {
    const tmp = createTempProject('gsd-research-artifacts-');
    try {
      assert.throws(
        () => initResearchIndex(tmp, '99', 'idea-discovery'),
        /Phase not found: 99/
      );
      assert.equal(fs.existsSync(path.join(tmp, '.planning', 'research')), false);
    } finally {
      cleanup(tmp);
    }
  });
});
