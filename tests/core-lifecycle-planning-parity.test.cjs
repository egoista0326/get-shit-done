/**
 * Core lifecycle/planning parity probes for Phase 07.
 *
 * These checks protect the Auto/ARIS overlay path. Research commands must call
 * ordinary GSD lifecycle helpers such as phase insert instead of becoming a
 * second control plane.
 */

const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { runGsdTools, createTempProject, cleanup } = require('./helpers.cjs');

const repoRoot = path.join(__dirname, '..');

const workflowBackedCommands = [
  ['new-project', 'new-project.md'],
  ['new-milestone', 'new-milestone.md'],
  ['discuss-phase', 'discuss-phase.md'],
  ['plan-phase', 'plan-phase.md'],
  ['execute-phase', 'execute-phase.md'],
  ['progress', 'progress.md'],
  ['next', 'next.md'],
  ['pause-work', 'pause-work.md'],
  ['resume-work', 'resume-project.md'],
  ['insert-phase', 'insert-phase.md'],
  ['add-phase', 'add-phase.md'],
  ['remove-phase', 'remove-phase.md'],
  ['analyze-dependencies', 'analyze-dependencies.md'],
];

const forbiddenUnprefixedResearchCommandPatterns = [
  /^idea-discovery/,
  /^literature/,
  /^novelty/,
  /^experiment/,
  /^claim/,
  /^paper/,
  /^rebuttal/,
  /^ablation/,
  /^result-analysis/,
];

function readUtf8(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function mustExist(relativePath) {
  assert.ok(fs.existsSync(path.join(repoRoot, relativePath)), `${relativePath} should exist`);
}

function listCommandFiles() {
  return fs.readdirSync(path.join(repoRoot, 'commands', 'gsd'))
    .filter(name => name.endsWith('.md'))
    .sort();
}

function assertNoPhase08ControlPlane(content, label) {
  const forbidden = [
    /\bphase_type\b/,
    /\bcode_review_requirements_by_phase_type\b/,
    /\.planning\/research\.config\.json loader/,
    /\bResearch Command Compiler implementation\b/,
  ];
  const hits = forbidden
    .filter(pattern => pattern.test(content))
    .map(pattern => `${label}: ${pattern}`);

  assert.deepStrictEqual(hits, []);
}

function writeLifecycleFixture(tmpDir) {
  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'ROADMAP.md'),
    `# Roadmap

## Phases

- [ ] **Phase 01: Foundation** - Setup
- [ ] **Phase 02: Follow Up** - Continue

## Phase Details

### Phase 1: Foundation
**Goal:** Setup
**Depends on:** Nothing
**Requirements:** [CORE-01]
**Plans:** 1 plan

Plans:
- [ ] 01-01: Setup

### Phase 2: Follow Up
**Goal:** Continue
**Depends on:** Phase 1
**Requirements:** [CORE-02]
**Plans:** 1 plan

Plans:
- [ ] 02-01: Continue
`
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'STATE.md'),
    `# Project State

**Status:** Ready
**Current Phase:** 1
**Total Plans in Phase:** 1
**Current Plan:** 1
`
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'REQUIREMENTS.md'),
    `# Requirements

- [ ] **CORE-01**: Preserve ordinary lifecycle behavior.
- [ ] **CORE-02**: Preserve planning and roadmap mutation behavior.
`
  );

  fs.mkdirSync(path.join(tmpDir, '.planning', 'phases', '01-foundation'), { recursive: true });
}

describe('core lifecycle command surface', () => {
  test('workflow-backed lifecycle commands and workflows are present', () => {
    for (const [commandName, workflowName] of workflowBackedCommands) {
      const commandPath = `commands/gsd/${commandName}.md`;
      const workflowPath = `get-shit-done/workflows/${workflowName}`;

      mustExist(commandPath);
      mustExist(workflowPath);

      const command = readUtf8(commandPath);
      assert.match(
        command,
        new RegExp(`get-shit-done/workflows/${workflowName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`),
        `${commandName} should route to ${workflowName}`
      );
      assertNoPhase08ControlPlane(command, commandPath);
    }
  });

  test('Auto/ARIS research command families remain prefixed and lifecycle-routed', () => {
    const commandFiles = listCommandFiles();
    const unexpectedUnprefixed = commandFiles.filter(file => {
      if (file === 'research-phase.md') {
        return false;
      }
      return forbiddenUnprefixedResearchCommandPatterns.some(pattern => pattern.test(file));
    });
    const ljxCommands = commandFiles.filter(file => file.startsWith('gsd-ljx-'));

    assert.deepStrictEqual(unexpectedUnprefixed, []);
    assert.ok(commandFiles.includes('research-phase.md'), 'upstream GSD research-phase remains allowed baseline behavior');

    for (const file of ljxCommands) {
      const command = readUtf8(`commands/gsd/${file}`);
      assert.match(command, /gsd-ljx-research-command\.md/, `${file} should route to shared research workflow`);
      assertNoPhase08ControlPlane(command, file);
    }
  });

  test('dispatcher exposes GSD lifecycle helper routes without typed research routing', () => {
    const dispatcher = readUtf8('get-shit-done/bin/gsd-tools.cjs');
    const phase = readUtf8('get-shit-done/bin/lib/phase.cjs');
    const state = readUtf8('get-shit-done/bin/lib/state.cjs');
    const roadmap = readUtf8('get-shit-done/bin/lib/roadmap.cjs');

    assert.match(dispatcher, /case 'phase':/, 'phase dispatcher should exist');
    assert.match(dispatcher, /phase\.cmdPhaseInsert\(cwd, args\[2\]/, 'phase insert should route through phase.cjs');
    assert.match(dispatcher, /case 'roadmap':/, 'roadmap dispatcher should exist');
    assert.match(dispatcher, /case 'progress':/, 'progress dispatcher should exist');
    assert.match(dispatcher, /case 'find-phase':/, 'find-phase dispatcher should exist');
    assert.match(dispatcher, /case 'phase-plan-index':/, 'phase-plan-index dispatcher should exist');

    assert.match(phase, /function cmdPhaseInsert/, 'cmdPhaseInsert should exist');
    assert.match(state, /function readModifyWriteStateMd/, 'readModifyWriteStateMd should exist');
    assert.match(roadmap, /function cmdRoadmapAnalyze/, 'cmdRoadmapAnalyze should exist');
    assertNoPhase08ControlPlane(dispatcher, 'gsd-tools.cjs');
  });
});

describe('GSD-owned lifecycle mutation smoke', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = createTempProject('gsd-core-lifecycle-');
    writeLifecycleFixture(tmpDir);
  });

  afterEach(() => {
    cleanup(tmpDir);
  });

  test('phase insert creates ordinary decimal phase material through gsd-tools', () => {
    const insert = runGsdTools(['phase', 'insert', '01', 'Research readiness check'], tmpDir);
    assert.ok(insert.success, `phase insert failed: ${insert.error}`);

    const inserted = JSON.parse(insert.output);
    assert.strictEqual(inserted.phase_number, '01.1');
    assert.strictEqual(inserted.after_phase, '01');
    assert.strictEqual(inserted.directory, '.planning/phases/01.1-research-readiness-check');

    const phaseDir = path.join(tmpDir, inserted.directory);
    assert.ok(fs.existsSync(phaseDir), 'inserted decimal phase directory should exist');

    const roadmap = fs.readFileSync(path.join(tmpDir, '.planning', 'ROADMAP.md'), 'utf8');
    assert.ok(roadmap.includes('Phase 01.1: Research readiness check (INSERTED)'));
    assert.ok(roadmap.includes('**Depends on:** Phase 01'));
    assert.ok(!roadmap.includes('phase_type'), 'inserted phase should not use typed phase schema');
    assert.ok(!fs.existsSync(path.join(tmpDir, '.planning', 'research.config.json')), 'phase insert should not create root research config');

    const found = runGsdTools('find-phase 01.1', tmpDir);
    assert.ok(found.success, `find-phase failed: ${found.error}`);
    const foundPhase = JSON.parse(found.output);
    assert.strictEqual(foundPhase.found, true);
    assert.strictEqual(foundPhase.directory, inserted.directory);

    const index = runGsdTools('phase-plan-index 01.1', tmpDir);
    assert.ok(index.success, `phase-plan-index failed: ${index.error}`);
    assert.strictEqual(JSON.parse(index.output).phase, '01.1');

    const analyze = runGsdTools('roadmap analyze', tmpDir);
    assert.ok(analyze.success, `roadmap analyze failed: ${analyze.error}`);
    const analyzed = JSON.parse(analyze.output);
    assert.ok(analyzed.phases.some(phase => phase.number === '01.1'), 'roadmap analyze should see inserted phase');

    const progress = runGsdTools('progress json', tmpDir);
    assert.ok(progress.success, `progress json failed: ${progress.error}`);
    const progressJson = JSON.parse(progress.output);
    assert.ok(progressJson.phases.some(phase => phase.number === '01.1'), 'progress json should see inserted phase');
  });

  test('state patch and validation stay on canonical GSD state path', () => {
    const insert = runGsdTools(['phase', 'insert', '01', 'Research readiness check'], tmpDir);
    assert.ok(insert.success, `phase insert failed: ${insert.error}`);

    const patch = runGsdTools(
      'state patch --Status "Executing Phase 01.1" --"Current Phase" 01.1 --"Total Plans in Phase" 0 --"Current Plan" 1',
      tmpDir
    );
    assert.ok(patch.success, `state patch failed: ${patch.error}`);
    assert.deepStrictEqual(JSON.parse(patch.output).failed, []);

    const validate = runGsdTools('state validate', tmpDir);
    assert.ok(validate.success, `state validate failed: ${validate.error}`);
    const validation = JSON.parse(validate.output);
    assert.strictEqual(validation.valid, true);
    assert.deepStrictEqual(validation.warnings, []);

    const state = fs.readFileSync(path.join(tmpDir, '.planning', 'STATE.md'), 'utf8');
    assert.ok(state.includes('Executing Phase 01.1'));
    assert.ok(!state.includes('phase_type'), 'state should not gain typed phase schema');
  });
});

describe('canonical lifecycle write ownership', () => {
  test('roadmap and state mutation helpers use lock or atomic write primitives', () => {
    const core = readUtf8('get-shit-done/bin/lib/core.cjs');
    const phase = readUtf8('get-shit-done/bin/lib/phase.cjs');
    const state = readUtf8('get-shit-done/bin/lib/state.cjs');
    const roadmap = readUtf8('get-shit-done/bin/lib/roadmap.cjs');

    assert.match(core, /function withPlanningLock/, 'withPlanningLock should be canonical lock primitive');
    assert.match(core, /function atomicWriteFileSync/, 'atomicWriteFileSync should be canonical write primitive');
    assert.match(phase, /function cmdPhaseInsert[\s\S]*withPlanningLock[\s\S]*atomicWriteFileSync/, 'phase insert should lock and atomically write');
    assert.match(phase, /function cmdPhaseRemove[\s\S]*withPlanningLock[\s\S]*atomicWriteFileSync/, 'phase remove should lock and atomically write');
    assert.match(state, /function cmdStatePatch[\s\S]*readModifyWriteStateMd/, 'state patch should use state owner helper');
    assert.match(state, /function readModifyWriteStateMd[\s\S]*atomicWriteFileSync/, 'state owner helper should write atomically');
    assert.match(roadmap, /function cmdRoadmapUpdatePlanProgress[\s\S]*withPlanningLock[\s\S]*atomicWriteFileSync/, 'roadmap progress update should lock and atomically write');
  });
});
