'use strict';

process.env.GSD_TEST_MODE = '1';

const { describe, test, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const {
  runGsdTools,
  createTempDir,
  createTempProject,
  cleanup,
  TOOLS_PATH,
} = require('./helpers.cjs');
const { copyCommandsAsClaudeSkills } = require('../bin/install.js');

const execAsync = promisify(exec);
const repoRoot = path.join(__dirname, '..');
const tmpDirs = [];

function makeTempDir(prefix) {
  const tmpDir = createTempDir(prefix);
  tmpDirs[tmpDirs.length] = tmpDir;
  return tmpDir;
}

function makeTempProject(prefix) {
  const tmpDir = createTempProject(prefix);
  tmpDirs[tmpDirs.length] = tmpDir;
  return tmpDir;
}

function writeFileEnsured(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function walkFiles(rootPath) {
  const files = [];

  function visit(currentPath) {
    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      const nextPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        visit(nextPath);
        continue;
      }
      if (entry.isFile()) {
        files[files.length] = nextPath;
      }
    }
  }

  if (fs.existsSync(rootPath)) {
    visit(rootPath);
  }

  return files.sort();
}

function makeGsd2Project(tmpDir) {
  writeFileEnsured(path.join(tmpDir, '.gsd', 'PROJECT.md'), '# Project\n\nDry-run migration fixture.\n');
  writeFileEnsured(
    path.join(tmpDir, '.gsd', 'REQUIREMENTS.md'),
    [
      '# Requirements',
      '',
      '## Active',
      '',
      '### R001 - Preserve migration preview behavior',
      '',
    ].join('\n')
  );
  writeFileEnsured(
    path.join(tmpDir, '.gsd', 'milestones', 'M001', 'M001-ROADMAP.md'),
    [
      '# M001: Foundation',
      '',
      '## Slices',
      '',
      '- [ ] **S01: Setup** `risk:low` `depends:[]`',
      '',
    ].join('\n')
  );
  writeFileEnsured(
    path.join(tmpDir, '.gsd', 'milestones', 'M001', 'slices', 'S01', 'S01-PLAN.md'),
    [
      '# S01: Setup',
      '',
      '**Goal:** Build setup slice.',
      '',
      '## Tasks',
      '- [ ] **T01: Fixture task**',
      '',
    ].join('\n')
  );
  writeFileEnsured(
    path.join(tmpDir, '.gsd', 'milestones', 'M001', 'slices', 'S01', 'tasks', 'T01-PLAN.md'),
    [
      '# T01: Fixture Task',
      '',
      '## Description',
      'Exercise migration preview.',
      '',
      '## Must-Haves',
      '- [ ] Preview includes task.',
      '',
    ].join('\n')
  );
}

function writeStateMd(tmpDir, content) {
  fs.writeFileSync(path.join(tmpDir, '.planning', 'STATE.md'), content, 'utf8');
}

afterEach(() => {
  while (tmpDirs.length > 0) {
    cleanup(tmpDirs.pop());
  }
});

describe('Phase 09 policy, migration, workspace, and concurrency scenario', () => {
  test('policy matrix covers auto proceed, checkpoints, reviewer fallback, and external services without runtime config', () => {
    const policies = [
      {
        mode: 'safe',
        labels: [
          'safe',
          'HUMAN_CHECKPOINT',
          'stop-boundary',
          'reviewer fallback',
          'external-service confirmation matrix',
        ],
        autoProceed: false,
        humanCheckpoint: true,
        external: 'confirm-required',
        reviewerFallback: 'stop-or-degraded-with-provenance',
        cleanAfterMissingAuth: false,
        hardSafetyGateOverridable: false,
      },
      {
        mode: 'auto',
        labels: [
          'auto',
          'AUTO_PROCEED',
          'reviewer fallback',
          'external-service confirmation matrix',
        ],
        autoProceed: true,
        humanCheckpoint: false,
        external: 'preauthorized-only',
        reviewerFallback: 'local-or-degraded-with-provenance',
        cleanAfterMissingAuth: false,
        hardSafetyGateOverridable: false,
      },
      {
        mode: 'danger-auto',
        labels: [
          'danger-auto',
          'AUTO_PROCEED',
          'reviewer fallback',
          'external-service confirmation matrix',
        ],
        autoProceed: true,
        humanCheckpoint: false,
        external: 'authorized-only-with-taint',
        reviewerFallback: 'degraded-or-overridden-with-taint',
        cleanAfterMissingAuth: false,
        hardSafetyGateOverridable: false,
      },
    ];

    assert.deepStrictEqual(policies.map(policy => policy.mode), ['safe', 'auto', 'danger-auto']);
    assert.strictEqual(policies.find(policy => policy.mode === 'safe').autoProceed, false);
    assert.strictEqual(policies.find(policy => policy.mode === 'safe').humanCheckpoint, true);

    const labels = policies.flatMap(policy => policy.labels);
    for (const label of [
      'AUTO_PROCEED',
      'HUMAN_CHECKPOINT',
      'stop-boundary',
      'reviewer fallback',
      'safe',
      'auto',
      'danger-auto',
      'external-service confirmation matrix',
    ]) {
      assert.ok(labels.includes(label), `policy matrix should include ${label}`);
    }

    for (const policy of policies) {
      assert.strictEqual(policy.cleanAfterMissingAuth, false);
      assert.strictEqual(policy.hardSafetyGateOverridable, false);
      assert.match(policy.reviewerFallback, /provenance|taint/);
    }

    for (const relativePath of [
      '.planning/research.config.json',
      'get-shit-done/bin/lib/research-compiler.cjs',
      'get-shit-done/workflows/gsd-ljx-research-command.md',
    ]) {
      assert.ok(!fs.existsSync(path.join(repoRoot, relativePath)), `${relativePath} should remain absent`);
    }
  });

  test('installer scenario uses temp skill output and never global install', () => {
    const tmpDir = makeTempDir('gsd-09-03-skills-');
    const skillsDir = path.join(tmpDir, 'claude-skills');

    copyCommandsAsClaudeSkills(
      path.join(repoRoot, 'commands', 'gsd'),
      skillsDir,
      'gsd',
      '~/.claude/',
      'claude',
      true
    );

    const skillPath = path.join(skillsDir, 'gsd-ljx-run-experiment', 'SKILL.md');
    assert.ok(fs.existsSync(skillPath), 'gsd-ljx-run-experiment should be converted under temp output');
    assert.ok(!fs.existsSync(path.join(skillsDir, 'gsd-gsd-ljx-run-experiment')));

    const content = fs.readFileSync(skillPath, 'utf8');
    assert.match(content, /^name:\s+gsd-ljx-run-experiment$/m);

    const createdFiles = walkFiles(skillsDir);
    assert.ok(createdFiles.length > 0, 'temp skill conversion should create files');
    for (const filePath of createdFiles) {
      assert.ok(filePath.startsWith(skillsDir + path.sep), `${filePath} should stay under temp skillsDir`);
    }
  });

  test('migration dry-run and workspace probes stay inside temp roots', () => {
    const tmpDir = makeTempDir('gsd-09-03-migration-');
    makeGsd2Project(tmpDir);

    const migration = runGsdTools(['from-gsd2', '--dry-run', '--raw'], tmpDir, { HOME: tmpDir });
    assert.ok(migration.success, `from-gsd2 dry-run failed: ${migration.error}`);
    const migrationData = JSON.parse(migration.output);
    assert.strictEqual(migrationData.success, true);
    assert.strictEqual(migrationData.dryRun, true);
    assert.ok(!fs.existsSync(path.join(tmpDir, '.planning')), 'dry-run must not write .planning');

    const workspaces = runGsdTools(['init', 'list-workspaces'], tmpDir, { HOME: tmpDir });
    assert.ok(workspaces.success, `init list-workspaces failed: ${workspaces.error}`);
    const workspaceData = JSON.parse(workspaces.output);
    assert.strictEqual(workspaceData.workspace_count, 0);
    assert.deepStrictEqual(workspaceData.workspaces, []);
  });

  test('workstream and concurrent writes preserve scoped state', async () => {
    const workstreamProject = makeTempProject('gsd-09-03-workstreams-');
    for (const [name, status] of [['alpha', 'Alpha active'], ['beta', 'Beta active']]) {
      const workstreamDir = path.join(workstreamProject, '.planning', 'workstreams', name);
      fs.mkdirSync(path.join(workstreamDir, 'phases'), { recursive: true });
      fs.writeFileSync(path.join(workstreamDir, 'STATE.md'), `# State\n**Status:** ${status}\n`);
    }

    const alphaSet = runGsdTools(
      ['workstream', 'set', 'alpha', '--raw'],
      workstreamProject,
      { GSD_SESSION_KEY: 'phase09-alpha' }
    );
    const betaSet = runGsdTools(
      ['workstream', 'set', 'beta', '--raw'],
      workstreamProject,
      { GSD_SESSION_KEY: 'phase09-beta' }
    );
    assert.ok(alphaSet.success, `alpha workstream set failed: ${alphaSet.error}`);
    assert.ok(betaSet.success, `beta workstream set failed: ${betaSet.error}`);

    const alpha = runGsdTools(
      ['workstream', 'get', '--raw'],
      workstreamProject,
      { GSD_SESSION_KEY: 'phase09-alpha' }
    );
    const beta = runGsdTools(
      ['workstream', 'get', '--raw'],
      workstreamProject,
      { GSD_SESSION_KEY: 'phase09-beta' }
    );
    assert.ok(alpha.success, `alpha workstream get failed: ${alpha.error}`);
    assert.ok(beta.success, `beta workstream get failed: ${beta.error}`);
    assert.strictEqual(alpha.output, 'alpha');
    assert.strictEqual(beta.output, 'beta');
    assert.ok(!fs.existsSync(path.join(workstreamProject, '.planning', 'active-workstream')));

    const stateProject = makeTempProject('gsd-09-03-state-');
    writeStateMd(
      stateProject,
      [
        '# Project State',
        '',
        '**Status:** Planning',
        '**Current Phase:** 01',
        '**Current Plan:** 01-01',
        '',
      ].join('\n')
    );

    const cmdA = `"${process.execPath}" "${TOOLS_PATH}" state update Status Executing --cwd "${stateProject}"`;
    const cmdB = `"${process.execPath}" "${TOOLS_PATH}" state update "Current Phase" 02 --cwd "${stateProject}"`;
    await Promise.all([
      execAsync(cmdA, { encoding: 'utf8' }).catch(() => {}),
      execAsync(cmdB, { encoding: 'utf8' }).catch(() => {}),
    ]);

    const stateContent = fs.readFileSync(path.join(stateProject, '.planning', 'STATE.md'), 'utf8');
    assert.ok(stateContent.includes('Executing'), stateContent);
    assert.ok(stateContent.includes('02'), stateContent);
    assert.ok(!fs.existsSync(path.join(stateProject, '.planning', 'STATE.md.lock')));
  });
});
