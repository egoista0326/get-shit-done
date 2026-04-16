/**
 * Phase 07-03 integrated scenario probe.
 *
 * This is a smoke/contract scenario for the GSD lifecycle surfaces that the
 * future gsd-ljx installed research overlay should call. It intentionally does not
 * implement Auto/ARIS commands or a research-specific control plane.
 */

const { test, describe, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { runGsdTools, createTempProject, cleanup } = require('./helpers.cjs');

const repoRoot = path.join(__dirname, '..');
const tmpProjects = [];
const phase08IntegrationPath = 'GSD phase insert via gsd-tools (D-09..D-12)';

function makeTempProject() {
  const tmpDir = createTempProject('gsd-07-03-scenario-');
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
    `# Project

## What This Is

Temporary Phase 07-03 parity scenario fixture.

## Core Value

GSD lifecycle helpers remain the owner of phase, state, roadmap, verification, and workstream behavior.

## Requirements

CORE-01 through CORE-05 are represented as parity requirements in this fixture.
`
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'config.json'),
    JSON.stringify({ model_profile: 'balanced', commit_docs: true }, null, 2) + '\n'
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'ROADMAP.md'),
    `# Roadmap

## Phases

- [ ] **Phase 01: Foundation** - Setup
- [ ] **Phase 02: Follow Up** - Continue

## Phase Details

### Phase 1: Foundation
**Goal:** Setup ordinary GSD lifecycle state
**Depends on:** Nothing
**Requirements:** [CORE-01]
**Plans:** 1 plan

Plans:
- [x] 01-01: Setup

### Phase 2: Follow Up
**Goal:** Continue ordinary GSD lifecycle state
**Depends on:** Phase 1
**Requirements:** [CORE-02]
**Plans:** 1 plan

Plans:
- [x] 02-01: Continue
`
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'STATE.md'),
    `# Project State

**Status:** Ready
**Current Phase:** 1
**Total Plans in Phase:** 1
**Current Plan:** 1

Progress: 2/2 roadmap plans summarized
`
  );

  fs.writeFileSync(
    path.join(tmpDir, '.planning', 'REQUIREMENTS.md'),
    `# Requirements

- [ ] **CORE-01**: Preserve ordinary lifecycle behavior.
- [ ] **CORE-02**: Preserve planning and roadmap mutation behavior.
- [ ] **CORE-03**: Preserve review and verification ownership.
- [ ] **CORE-04**: Preserve workspace and workstream ownership.
- [ ] **CORE-05**: Preserve git-facing lifecycle discipline.
`
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
    'must_haves:',
    '  truths:',
    '    - "ordinary GSD lifecycle ownership remains intact"',
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
  ].join('\n');
}

function listGsdCommandFiles() {
  return fs.readdirSync(path.join(repoRoot, 'commands', 'gsd'))
    .filter(file => file.endsWith('.md'))
    .sort();
}

function legacySharedResearchWorkflowName() {
  return `${['gsd', 'ljx', 'research', 'command'].join('-')}.md`;
}

afterEach(() => {
  while (tmpProjects.length > 0) {
    cleanup(tmpProjects.pop());
  }
});

describe('integrated GSD lifecycle scenario for Phase 08 readiness', () => {
  test('runs lifecycle mutation, verification, progress, and workstream routing through GSD helpers', () => {
    const tmpDir = makeTempProject();
    writeScenarioFixture(tmpDir);

    const insert = runGsdTools(
      ['phase', 'insert', '01', 'Research overlay readiness probe'],
      tmpDir
    );
    assert.ok(insert.success, `phase insert failed: ${insert.error}`);
    const inserted = JSON.parse(insert.output);
    assert.strictEqual(inserted.phase_number, '01.1', phase08IntegrationPath);
    assert.strictEqual(inserted.after_phase, '01');
    assert.match(inserted.directory, /^\.planning\/phases\/01\.1-/);

    const insertedDir = path.join(tmpDir, inserted.directory);
    const insertedPlan = path.join(insertedDir, '01.1-01-PLAN.md');
    const insertedSummary = path.join(insertedDir, '01.1-01-SUMMARY.md');
    writeFileEnsured(
      insertedPlan,
      validPlanContent('01.1-research-overlay-readiness-probe', '01.1-01')
    );
    writeFileEnsured(insertedSummary, '# Summary\n\nIntegrated scenario probe complete.\n');

    const roadmap = fs.readFileSync(path.join(tmpDir, '.planning', 'ROADMAP.md'), 'utf8');
    assert.ok(roadmap.includes('Phase 01.1: Research overlay readiness probe (INSERTED)'));
    assert.ok(roadmap.includes('**Depends on:** Phase 01'));
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
      ['verify', 'plan-structure', '.planning/phases/01.1-research-overlay-readiness-probe/01.1-01-PLAN.md'],
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

    const sessionEnv = { GSD_SESSION_KEY: 'phase-07-03-scenario' };
    const created = runGsdTools(
      ['workstream', 'create', 'research-track', '--no-migrate', '--raw'],
      tmpDir,
      sessionEnv
    );
    assert.ok(created.success, `workstream create failed: ${created.error}`);
    const createdData = JSON.parse(created.output);
    assert.strictEqual(createdData.created, true);
    assert.strictEqual(createdData.workstream, 'research-track');

    const active = runGsdTools(['workstream', 'get', '--raw'], tmpDir, sessionEnv);
    assert.ok(active.success, `workstream get failed: ${active.error}`);
    assert.strictEqual(active.output, 'research-track');
    assert.ok(
      !fs.existsSync(path.join(tmpDir, '.planning', 'active-workstream')),
      'session-scoped workstream routing should not write shared lifecycle pointer'
    );

    const rootState = runGsdTools(['state', 'validate'], tmpDir);
    assert.ok(rootState.success, `state validate failed: ${rootState.error}`);
    assert.strictEqual(JSON.parse(rootState.output).valid, true);

    const health = runGsdTools(['validate', 'health'], tmpDir);
    assert.ok(health.success, `validate health failed: ${health.error}`);
    const healthData = JSON.parse(health.output);
    assert.strictEqual(healthData.status, 'healthy');
    assert.deepStrictEqual(healthData.errors, []);
  });

  test('scenario boundary keeps Phase 08 command family thin and lifecycle-owned', () => {
    const commandFiles = listGsdCommandFiles();
    const overlayCommands = commandFiles.filter(file => /^ljx-/.test(file)).sort();
    const expectedMinimumOverlayCommands = [
      'ljx-ablation-planner.md',
      'ljx-analyze-results.md',
      'ljx-auto-review-loop.md',
      'ljx-claim-gate.md',
      'ljx-experiment-audit.md',
      'ljx-experiment-bridge.md',
      'ljx-experiment-plan.md',
      'ljx-idea-creator.md',
      'ljx-idea-discovery.md',
      'ljx-monitor-experiment.md',
      'ljx-novelty-check.md',
      'ljx-paper-compile.md',
      'ljx-paper-improve.md',
      'ljx-paper-plan.md',
      'ljx-paper-write.md',
      'ljx-rebuttal-draft.md',
      'ljx-rebuttal-plan.md',
      'ljx-research-lit.md',
      'ljx-research-pipeline.md',
      'ljx-research-refine-pipeline.md',
      'ljx-research-refine.md',
      'ljx-research-review.md',
      'ljx-result-to-claim.md',
      'ljx-run-experiment.md',
      'ljx-training-check.md',
    ];
    for (const expected of expectedMinimumOverlayCommands) {
      assert.ok(overlayCommands.includes(expected), `${expected} should be present`);
    }
    assert.deepStrictEqual(commandFiles.filter(file => /^gsd-ljx-/.test(file)), []);
    for (const file of overlayCommands) {
      const content = readRepoFile(path.join('commands', 'gsd', file));
      assert.match(content, new RegExp(`^name:\\s+gsd:${file.replace(/\.md$/, '')}$`, 'm'));
      assert.ok(content.includes('<gsd_phase_construction>'), `${file} must carry GSD phase construction guidance`);
      assert.ok(!content.includes(legacySharedResearchWorkflowName()), `${file} must not route through a shared compiler workflow`);
    }

    const forbiddenCommandPatterns = [
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

    const unexpected = commandFiles.filter(file => {
      if (file === 'research-phase.md') {
        return false;
      }
      return forbiddenCommandPatterns.some(pattern => pattern.test(file));
    });
    assert.deepStrictEqual(unexpected, []);

    const scenarioPlan = readRepoFile('.planning/phases/07-core-gsd-lifecycle-parity/07-03-PLAN.md');
    assert.ok(scenarioPlan.includes('insert-phase'), 'Phase 08 integration path is documented as GSD phase insertion');
    assert.ok(scenarioPlan.includes('not implemented here') || scenarioPlan.includes('not implementing Auto/ARIS'));
  });

  test('production lifecycle surface still has no typed research routing or source-workspace dependency', () => {
    const productionFiles = [
      'package.json',
      ...['bin', 'commands', 'get-shit-done', 'hooks', 'scripts', 'sdk']
        .flatMap(root => walkFiles(path.join(repoRoot, root))),
    ].filter(relativePath => !relativePath.startsWith('hooks/dist/'));

    const forbidden = [
      { pattern: /\bphase_type\b/, label: 'phase_type' },
      { pattern: /\bcode_review_requirements_by_phase_type\b/, label: 'typed code-review routing' },
      { pattern: /\/Users\/lijiaxin\/Downloads\/new-gsd\b/, label: 'source planning repo path' },
      { pattern: /\bljx-gsd\b/i, label: 'ljx-gsd reference' },
    ];
    const hits = [];

    for (const relativePath of productionFiles) {
      const content = readRepoFile(relativePath);
      for (const { pattern, label } of forbidden) {
        if (pattern.test(content)) {
          hits.push(`${relativePath}: ${label}`);
        }
      }
    }

    assert.deepStrictEqual(hits, []);
  });
});

function walkFiles(rootPath) {
  if (!fs.existsSync(rootPath)) {
    return [];
  }

  const files = [];
  const excludedDirs = new Set(['node_modules', '.git', 'dist']);

  function visit(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!excludedDirs.has(entry.name)) {
          visit(path.join(current, entry.name));
        }
        continue;
      }
      if (entry.isFile()) {
        files.push(path.relative(repoRoot, path.join(current, entry.name)));
      }
    }
  }

  visit(rootPath);
  return files.sort();
}
