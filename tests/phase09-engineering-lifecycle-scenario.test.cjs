'use strict';

const { describe, test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { runGsdTools, createTempProject, cleanup } = require('./helpers.cjs');

const repoRoot = path.join(__dirname, '..');
const tmpProjects = [];

function makeTempProject() {
  const tmpDir = createTempProject('gsd-09-01-scenario-');
  tmpProjects.push(tmpDir);
  return tmpDir;
}

function readRepoFile(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function writeFileEnsured(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function writeScenarioFixture(tmpDir) {
  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'PROJECT.md'),
    [
      '# Project',
      '',
      '## What This Is',
      '',
      'Temporary Phase 09 engineering lifecycle scenario fixture.',
      '',
      '## Core Value',
      '',
      'GSD lifecycle helpers remain the owner of phase, state, roadmap, and verification behavior.',
      '',
      '## Requirements',
      '',
      'SCEN-01 is represented as an ordinary engineering lifecycle requirement.',
      '',
    ].join('\n')
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'config.json'),
    JSON.stringify({ model_profile: 'balanced', commit_docs: true }, null, 2) + '\n'
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'ROADMAP.md'),
    [
      '# Roadmap',
      '',
      '## Phases',
      '',
      '- [ ] **Phase 01: Foundation** - Setup',
      '- [ ] **Phase 02: Follow Up** - Continue',
      '',
      '## Phase Details',
      '',
      '### Phase 1: Foundation',
      '**Goal:** Setup ordinary GSD lifecycle state',
      '**Depends on:** Nothing',
      '**Requirements:** [SCEN-01]',
      '**Plans:** 1 plan',
      '',
      'Plans:',
      '- [x] 01-01: Setup',
      '',
      '### Phase 2: Follow Up',
      '**Goal:** Continue ordinary GSD lifecycle state',
      '**Depends on:** Phase 1',
      '**Requirements:** [SCEN-01]',
      '**Plans:** 1 plan',
      '',
      'Plans:',
      '- [x] 02-01: Continue',
      '',
    ].join('\n')
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'STATE.md'),
    [
      '# Project State',
      '',
      '**Status:** Ready',
      '**Current Phase:** 1',
      '**Total Plans in Phase:** 1',
      '**Current Plan:** 1',
      '',
      'Progress: 2/2 roadmap plans summarized',
      '',
    ].join('\n')
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'REQUIREMENTS.md'),
    [
      '# Requirements',
      '',
      '- [ ] **SCEN-01**: Preserve ordinary engineering lifecycle behavior.',
      '',
    ].join('\n')
  );

  for (const [phaseDir, id] of [
    ['01-foundation', '01-01'],
    ['02-follow-up', '02-01'],
  ]) {
    const dir = path.join(tmpDir, '.planning', 'phases', phaseDir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${id}-PLAN.md`), validPlanContent(phaseDir, id));
    fs.writeFileSync(path.join(dir, `${id}-SUMMARY.md`), `# Summary\n\n${id} complete.\n`);
  }
}

function validPlanContent(phase, planId) {
  return [
    '---',
    `phase: ${phase}`,
    `plan: ${planId.split('-').at(-1)}`,
    'type: execute',
    'wave: 1',
    'depends_on: []',
    'files_modified: [src/example.js]',
    'autonomous: true',
    'requirements: [SCEN-01]',
    'must_haves:',
    '  truths:',
    '    - "ordinary engineering lifecycle ownership remains intact"',
    '---',
    '',
    '<objective>',
    `Probe ${phase} ${planId}.`,
    '</objective>',
    '',
    '<tasks>',
    '<task type="auto">',
    '  <name>Task 1: Probe ordinary lifecycle helper</name>',
    '  <files>src/example.js</files>',
    '  <action>Use a GSD-owned helper surface.</action>',
    '  <verify><automated>node --version</automated></verify>',
    '  <done>Probe completed</done>',
    '</task>',
    '</tasks>',
    '',
    '<threat_model>',
    '| Boundary | Mitigation |',
    '|----------|------------|',
    '| temp fixture to GSD CLI | Use local temp project only. |',
    '</threat_model>',
    '',
  ].join('\n');
}

afterEach(() => {
  while (tmpProjects.length > 0) {
    cleanup(tmpProjects.pop());
  }
});

describe('Phase 09 engineering lifecycle scenario', () => {
  test('engineering lifecycle scenario runs through ordinary GSD helpers end to end', () => {
    const tmpDir = makeTempProject();
    writeScenarioFixture(tmpDir);

    const insert = runGsdTools(
      ['phase', 'insert', '01', 'Engineering lifecycle scenario'],
      tmpDir
    );
    assert.ok(insert.success, `phase insert failed: ${insert.error}`);

    const inserted = JSON.parse(insert.output);
    assert.strictEqual(inserted.phase_number, '01.1');
    assert.strictEqual(inserted.after_phase, '01');
    assert.match(inserted.directory, /^\.planning\/phases\/01\.1-/);

    const insertedDir = path.join(tmpDir, inserted.directory);
    const insertedPlan = path.join(insertedDir, '01.1-01-PLAN.md');
    const insertedSummary = path.join(insertedDir, '01.1-01-SUMMARY.md');
    writeFileEnsured(
      insertedPlan,
      validPlanContent('01.1-engineering-lifecycle-scenario', '01.1-01')
    );
    writeFileEnsured(insertedSummary, '# Summary\n\nEngineering lifecycle scenario complete.\n');

    const roadmap = fs.readFileSync(path.join(tmpDir, '.planning', 'ROADMAP.md'), 'utf8');
    assert.ok(roadmap.includes('Phase 01.1: Engineering lifecycle scenario (INSERTED)'));
    assert.ok(!roadmap.includes('phase_type'), 'inserted phase must stay ordinary GSD schema');
    assert.ok(!fs.existsSync(path.join(tmpDir, '.planning', 'research.config.json')));
    assert.ok(!fs.existsSync(path.join(tmpDir, '.planning', 'auto-research')));
    assert.ok(!fs.existsSync(path.join(tmpDir, '.planning', 'aris')));

    const found = runGsdTools(['find-phase', '01.1'], tmpDir);
    assert.ok(found.success, `find-phase failed: ${found.error}`);
    assert.strictEqual(JSON.parse(found.output).directory, inserted.directory);

    const planIndex = runGsdTools(['phase-plan-index', '01.1'], tmpDir);
    assert.ok(planIndex.success, `phase-plan-index failed: ${planIndex.error}`);
    const indexData = JSON.parse(planIndex.output);
    assert.strictEqual(indexData.phase, '01.1');
    assert.strictEqual(indexData.plans[0].id, '01.1-01');
    assert.strictEqual(indexData.plans[0].has_summary, true);

    const planStructure = runGsdTools(
      ['verify', 'plan-structure', path.posix.join(inserted.directory, '01.1-01-PLAN.md')],
      tmpDir
    );
    assert.ok(planStructure.success, `verify plan-structure failed: ${planStructure.error}`);
    assert.strictEqual(JSON.parse(planStructure.output).valid, true);

    const phaseCompleteness = runGsdTools(['verify', 'phase-completeness', '01.1'], tmpDir);
    assert.ok(phaseCompleteness.success, `verify phase-completeness failed: ${phaseCompleteness.error}`);
    assert.strictEqual(JSON.parse(phaseCompleteness.output).complete, true);

    const progress = runGsdTools(['progress', 'json'], tmpDir);
    assert.ok(progress.success, `progress json failed: ${progress.error}`);
    const progressData = JSON.parse(progress.output);
    assert.ok(progressData.phases.some(phase => phase.number === '01.1'));
    assert.strictEqual(progressData.total_plans, 3);
    assert.strictEqual(progressData.total_summaries, 3);

    const rootState = runGsdTools(['state', 'validate'], tmpDir);
    assert.ok(rootState.success, `state validate failed: ${rootState.error}`);
    assert.strictEqual(JSON.parse(rootState.output).valid, true);

    const health = runGsdTools(['validate', 'health'], tmpDir);
    assert.ok(health.success, `validate health failed: ${health.error}`);
    const healthData = JSON.parse(health.output);
    assert.strictEqual(healthData.status, 'healthy');
    assert.deepStrictEqual(healthData.errors, []);
  });

  test('engineering command surface routes through ordinary GSD workflows', () => {
    const commandWorkflowPairs = [
      ['discuss-phase.md', 'get-shit-done/workflows/discuss-phase.md'],
      ['plan-phase.md', 'get-shit-done/workflows/plan-phase.md'],
      ['execute-phase.md', 'get-shit-done/workflows/execute-phase.md'],
      ['code-review.md', 'get-shit-done/workflows/code-review.md'],
      ['code-review-fix.md', 'get-shit-done/workflows/code-review-fix.md'],
      ['verify-work.md', 'get-shit-done/workflows/verify-work.md'],
      ['pause-work.md', 'get-shit-done/workflows/pause-work.md'],
      ['resume-work.md', 'get-shit-done/workflows/resume-project.md'],
      ['next.md', 'get-shit-done/workflows/next.md'],
    ];

    for (const [commandFile, workflowPath] of commandWorkflowPairs) {
      const commandPath = path.join('commands', 'gsd', commandFile);
      assert.ok(fs.existsSync(path.join(repoRoot, commandPath)), `${commandPath} should exist`);
      assert.ok(
        readRepoFile(commandPath).includes(workflowPath),
        `${commandPath} should reference ${workflowPath}`
      );
      assert.ok(fs.existsSync(path.join(repoRoot, workflowPath)), `${workflowPath} should exist`);
    }
  });

  test('blocking resume constraints remain visible to engineering scenario executors', () => {
    const handoff = readRepoFile(
      '.planning/phases/09-scenario-and-regression-harness/.continue-here.md'
    );

    assert.ok(handoff.includes('Do not reintroduce the old research helper/config/compiler route'));
    assert.ok(handoff.includes('Do not trigger global installer side effects'));
    assert.ok(handoff.includes('blocking'));
    assert.ok(handoff.includes('Prevention Mechanism'));
  });
});
