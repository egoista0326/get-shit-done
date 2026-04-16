/**
 * Phase 07-02 parity probes for review, verify, workspace, workstream, and git
 * lifecycle surfaces.
 *
 * These tests intentionally check imported GSD surfaces as GSD-owned command
 * and workflow contracts. They do not implement or route Auto/ARIS commands.
 */

const { test, describe, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { runGsdTools, createTempProject, cleanup } = require('./helpers.cjs');

const repoRoot = path.join(__dirname, '..');
const temporaryProjects = [];

function relPath(...parts) {
  return path.join(repoRoot, ...parts);
}

function readRepoFile(...parts) {
  return fs.readFileSync(relPath(...parts), 'utf-8');
}

function expectFileContains(relativePath, tokens) {
  const content = readRepoFile(...relativePath.split('/'));
  for (const token of tokens) {
    assert.ok(
      content.includes(token),
      `${relativePath} should contain ${JSON.stringify(token)}`
    );
  }
}

function expectFileContainsAny(relativePath, alternatives) {
  const content = readRepoFile(...relativePath.split('/'));
  assert.ok(
    alternatives.some(token => content.includes(token)),
    `${relativePath} should contain one of ${JSON.stringify(alternatives)}`
  );
}

function makeTempProject() {
  const tmpDir = createTempProject('gsd-07-02-');
  temporaryProjects.push(tmpDir);
  return tmpDir;
}

function validPlanContent() {
  return [
    '---',
    'phase: 01-test',
    'plan: 01',
    'type: execute',
    'wave: 1',
    'depends_on: []',
    'files_modified: [src/example.js]',
    'autonomous: true',
    'must_haves:',
    '  truths:',
    '    - "plan remains owned by GSD"',
    '---',
    '',
    '<tasks>',
    '<task type="auto">',
    '  <name>Task 1: Verify lifecycle parity</name>',
    '  <files>src/example.js</files>',
    '  <action>Check the imported command surface.</action>',
    '  <verify><automated>node --version</automated></verify>',
    '  <done>Lifecycle parity probe passes</done>',
    '</task>',
    '</tasks>',
    '',
  ].join('\n');
}

afterEach(() => {
  while (temporaryProjects.length > 0) {
    cleanup(temporaryProjects.pop());
  }
});

describe('core lifecycle command routing parity', () => {
  const workflowBackedCommands = {
    'code-review': 'code-review',
    'code-review-fix': 'code-review-fix',
    'verify-work': 'verify-work',
    'new-workspace': 'new-workspace',
    'list-workspaces': 'list-workspaces',
    'remove-workspace': 'remove-workspace',
    'pr-branch': 'pr-branch',
    ship: 'ship',
    undo: 'undo',
  };

  test('review, verification, workspace, and git commands route to imported workflows', () => {
    for (const [commandName, workflowName] of Object.entries(workflowBackedCommands)) {
      const commandRel = `commands/gsd/${commandName}.md`;
      const workflowRel = `get-shit-done/workflows/${workflowName}.md`;
      assert.ok(fs.existsSync(relPath(...commandRel.split('/'))), `${commandRel} should exist`);
      assert.ok(fs.existsSync(relPath(...workflowRel.split('/'))), `${workflowRel} should exist`);

      expectFileContains(commandRel, [
        '<execution_context>',
        `workflows/${workflowName}.md`,
        'workflow',
      ]);
    }
  });

  test('workstreams command dispatches through the imported GSD query surface', () => {
    expectFileContains('commands/gsd/workstreams.md', [
      'gsd-sdk query',
      'workstream.list',
      'workstream.create',
      'workstream.status',
      'workstream.set',
      'workstream.progress',
      'workstream.complete',
      'session-locally',
    ]);
  });
});

describe('core lifecycle workflow artifact parity', () => {
  test('code review workflows preserve review gates, artifacts, and agents', () => {
    expectFileContains('get-shit-done/workflows/code-review.md', [
      'workflow.code_review',
      'workflow.code_review_depth',
      'SUMMARY.md',
      'git diff',
      'gsd-code-reviewer',
      'REVIEW.md',
    ]);

    expectFileContains('get-shit-done/workflows/code-review-fix.md', [
      'workflow.code_review',
      'REVIEW.md',
      'REVIEW-FIX.md',
      'gsd-code-fixer',
      'gsd-code-reviewer',
      'MAX_ITERATIONS',
    ]);
  });

  test('verify-work remains the owner of UAT, verification, security, and transition gates', () => {
    expectFileContains('get-shit-done/workflows/verify-work.md', [
      'UAT.md',
      'SUMMARY.md',
      'VERIFICATION.md',
      'SECURITY_CFG',
      'transition.md',
      'AskUserQuestion',
    ]);
  });

  test('workspace workflows preserve manifest, worktree, clone, and dirty-tree safeguards', () => {
    expectFileContains('get-shit-done/workflows/new-workspace.md', [
      'WORKSPACE.md',
      'worktree',
      'clone',
      'AskUserQuestion',
    ]);

    expectFileContains('get-shit-done/workflows/list-workspaces.md', [
      'WORKSPACE.md',
      'workspace_base',
      'workspace_count',
    ]);

    expectFileContains('get-shit-done/workflows/remove-workspace.md', [
      'has_dirty_repos',
      'uncommitted changes',
      'git worktree remove',
      'AskUserQuestion',
    ]);
  });

  test('git workflows preserve PR, review, branch, and safe undo discipline', () => {
    expectFileContains('get-shit-done/workflows/pr-branch.md', [
      'PR_BRANCH',
      'git checkout -b',
      'git cherry-pick',
      'STATE.md',
      'ROADMAP.md',
    ]);

    expectFileContains('get-shit-done/workflows/ship.md', [
      'git push',
      'gh pr create',
      'workflow.code_review_command',
      'VERIFICATION.md',
      'SUMMARY.md',
    ]);

    expectFileContains('get-shit-done/workflows/undo.md', [
      'dependency_check',
      'git revert --no-commit',
      'Dirty-tree guard',
      'AskUserQuestion',
      'NEVER git reset',
    ]);
  });
});

describe('core lifecycle remains free of Auto/ARIS command routing', () => {
  const scannedFiles = [
    'commands/gsd/code-review.md',
    'commands/gsd/code-review-fix.md',
    'commands/gsd/verify-work.md',
    'commands/gsd/workstreams.md',
    'commands/gsd/new-workspace.md',
    'commands/gsd/list-workspaces.md',
    'commands/gsd/remove-workspace.md',
    'commands/gsd/pr-branch.md',
    'commands/gsd/ship.md',
    'commands/gsd/undo.md',
    'get-shit-done/workflows/code-review.md',
    'get-shit-done/workflows/code-review-fix.md',
    'get-shit-done/workflows/verify-work.md',
    'get-shit-done/workflows/new-workspace.md',
    'get-shit-done/workflows/list-workspaces.md',
    'get-shit-done/workflows/remove-workspace.md',
    'get-shit-done/workflows/pr-branch.md',
    'get-shit-done/workflows/ship.md',
    'get-shit-done/workflows/undo.md',
  ];

  const forbiddenCoreRoutingTokens = [
    '/gsd-ljx-',
    'phase_type',
    'research.config',
    'code_review_requirements_by_phase_type',
    'idea-discovery',
  ];

  test('review, workspace, and git lifecycle files do not route through research overlay tokens', () => {
    for (const relativePath of scannedFiles) {
      const content = readRepoFile(...relativePath.split('/'));
      for (const forbidden of forbiddenCoreRoutingTokens) {
        assert.ok(
          !content.includes(forbidden),
          `${relativePath} should not contain research overlay routing token ${JSON.stringify(forbidden)}`
        );
      }
    }
  });
});

describe('gsd-tools lifecycle helper parity', () => {
  test('verify and workstream helper modules remain exported through gsd-tools', () => {
    expectFileContains('get-shit-done/bin/gsd-tools.cjs', [
      "case 'verify':",
      "case 'workstream':",
      'cmdVerifyPlanStructure',
      'cmdVerifyPhaseCompleteness',
      'cmdWorkstreamCreate',
      'cmdWorkstreamSet',
      'cmdWorkstreamProgress',
    ]);

    expectFileContains('get-shit-done/bin/lib/verify.cjs', [
      'function cmdVerifyPlanStructure',
      'function cmdVerifyPhaseCompleteness',
      'cmdVerifySchemaDrift',
      'module.exports',
    ]);

    expectFileContains('get-shit-done/bin/lib/workstream.cjs', [
      'function cmdWorkstreamCreate',
      'function cmdWorkstreamList',
      'function cmdWorkstreamSet',
      'function cmdWorkstreamGet',
      'function cmdWorkstreamProgress',
      'module.exports',
    ]);
  });

  test('verify helper commands validate plan structure and phase completeness', () => {
    const tmpDir = makeTempProject();
    const phaseDir = path.join(tmpDir, '.planning', 'phases', '01-test');
    fs.mkdirSync(phaseDir, { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, '.planning', 'ROADMAP.md'),
      '# Roadmap\n\n### Phase 1: Test\n**Goal**: Validate helper commands\n'
    );

    fs.writeFileSync(path.join(phaseDir, '01-01-PLAN.md'), validPlanContent());
    fs.writeFileSync(path.join(phaseDir, '01-01-SUMMARY.md'), '# Summary\n');

    const planResult = runGsdTools(
      'verify plan-structure .planning/phases/01-test/01-01-PLAN.md',
      tmpDir
    );
    assert.ok(planResult.success, `verify plan-structure failed: ${planResult.error}`);
    const planData = JSON.parse(planResult.output);
    assert.strictEqual(planData.valid, true);
    assert.strictEqual(planData.task_count, 1);

    const phaseResult = runGsdTools('verify phase-completeness 01', tmpDir);
    assert.ok(phaseResult.success, `verify phase-completeness failed: ${phaseResult.error}`);
    const phaseData = JSON.parse(phaseResult.output);
    assert.strictEqual(phaseData.complete, true);
    assert.strictEqual(phaseData.plan_count, 1);
    assert.strictEqual(phaseData.summary_count, 1);
  });

  test('workstream helper commands keep routing session-scoped when sessions differ', () => {
    const tmpDir = makeTempProject();

    for (const [name, status] of [['alpha', 'Alpha active'], ['beta', 'Beta active']]) {
      const wsDir = path.join(tmpDir, '.planning', 'workstreams', name);
      fs.mkdirSync(path.join(wsDir, 'phases'), { recursive: true });
      fs.writeFileSync(path.join(wsDir, 'STATE.md'), `# State\n**Status:** ${status}\n`);
      fs.writeFileSync(path.join(wsDir, 'ROADMAP.md'), `# Roadmap\n\n### Phase 1: ${name}\n`);
    }

    const alphaSet = runGsdTools(
      ['workstream', 'set', 'alpha', '--raw'],
      tmpDir,
      { GSD_SESSION_KEY: 'phase-07-02-alpha' }
    );
    const betaSet = runGsdTools(
      ['workstream', 'set', 'beta', '--raw'],
      tmpDir,
      { GSD_SESSION_KEY: 'phase-07-02-beta' }
    );
    assert.ok(alphaSet.success, `alpha set failed: ${alphaSet.error}`);
    assert.ok(betaSet.success, `beta set failed: ${betaSet.error}`);
    assert.ok(
      !fs.existsSync(path.join(tmpDir, '.planning', 'active-workstream')),
      'session-scoped set should not write shared active-workstream'
    );

    const alphaGet = runGsdTools(
      ['workstream', 'get', '--raw'],
      tmpDir,
      { GSD_SESSION_KEY: 'phase-07-02-alpha' }
    );
    const betaGet = runGsdTools(
      ['workstream', 'get', '--raw'],
      tmpDir,
      { GSD_SESSION_KEY: 'phase-07-02-beta' }
    );
    assert.ok(alphaGet.success, `alpha get failed: ${alphaGet.error}`);
    assert.ok(betaGet.success, `beta get failed: ${betaGet.error}`);
    assert.strictEqual(alphaGet.output, 'alpha');
    assert.strictEqual(betaGet.output, 'beta');

    fs.writeFileSync(path.join(tmpDir, '.planning', 'active-workstream'), 'beta\n');
    const alphaState = runGsdTools(
      ['state', 'json', '--raw'],
      tmpDir,
      { GSD_SESSION_KEY: 'phase-07-02-alpha' }
    );
    assert.ok(alphaState.success, `alpha state failed: ${alphaState.error}`);
    assert.strictEqual(JSON.parse(alphaState.output).status, 'Alpha active');
  });

  test('workstream list, status, and progress commands expose GSD planning state', () => {
    const tmpDir = makeTempProject();
    const wsDir = path.join(tmpDir, '.planning', 'workstreams', 'feature');
    fs.mkdirSync(path.join(wsDir, 'phases', '01-init'), { recursive: true });
    fs.writeFileSync(path.join(wsDir, 'STATE.md'), '# State\n**Status:** In progress\n**Current Phase:** 2\n');
    fs.writeFileSync(path.join(wsDir, 'ROADMAP.md'), '# Roadmap\n\n### Phase 1: Init\n### Phase 2: Build\n');
    fs.writeFileSync(path.join(wsDir, 'phases', '01-init', '01-01-PLAN.md'), '# Plan\n');
    fs.writeFileSync(path.join(wsDir, 'phases', '01-init', '01-01-SUMMARY.md'), '# Summary\n');
    fs.writeFileSync(path.join(tmpDir, '.planning', 'active-workstream'), 'feature\n');

    const list = runGsdTools(['workstream', 'list', '--raw'], tmpDir);
    assert.ok(list.success, `workstream list failed: ${list.error}`);
    const listData = JSON.parse(list.output);
    assert.strictEqual(listData.mode, 'workstream');
    assert.strictEqual(listData.count, 1);

    const status = runGsdTools(['workstream', 'status', 'feature', '--raw'], tmpDir);
    assert.ok(status.success, `workstream status failed: ${status.error}`);
    const statusData = JSON.parse(status.output);
    assert.strictEqual(statusData.found, true);
    assert.strictEqual(statusData.files.state, true);
    assert.strictEqual(statusData.files.roadmap, true);

    const progress = runGsdTools(['workstream', 'progress', '--raw'], tmpDir);
    assert.ok(progress.success, `workstream progress failed: ${progress.error}`);
    const progressData = JSON.parse(progress.output);
    assert.strictEqual(progressData.mode, 'workstream');
    assert.strictEqual(progressData.workstreams[0].name, 'feature');
    assert.strictEqual(progressData.workstreams[0].active, true);

    expectFileContainsAny('commands/gsd/workstreams.md', [
      '/gsd-resume-work --ws <name>',
      '/gsd-resume-work',
    ]);
  });
});
