'use strict';

const { describe, test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const repoRoot = path.join(__dirname, '..');

const expectedHooks = [
  'gsd-check-update.js',
  'gsd-context-monitor.js',
  'gsd-prompt-guard.js',
  'gsd-read-guard.js',
  'gsd-statusline.js',
  'gsd-workflow-guard.js',
  'gsd-session-state.sh',
  'gsd-validate-commit.sh',
  'gsd-phase-boundary.sh',
];

const forbiddenPackagePaths = [
  '.planning/research.config.json',
  'get-shit-done/workflows/gsd-ljx-research-command.md',
];

const expectedInstallSurfaces = {
  claudeGlobalSkill: 'skills/gsd-ljx-run-experiment/SKILL.md',
  claudeLocalCommand: '.claude/commands/gsd/ljx-run-experiment.md',
  clineLocalRules: '.clinerules',
};

function runNpmPackDryRun() {
  const raw = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return JSON.parse(raw)[0].files.map(file => file.path).sort();
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function makeTempRoot() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'gsd-phase10-'));
}

function sandboxEnv(tempRoot) {
  const xdgConfigHome = path.join(tempRoot, '.config');
  return {
    ...process.env,
    HOME: path.join(tempRoot, 'home'),
    XDG_CONFIG_HOME: xdgConfigHome,
    CLAUDE_CONFIG_DIR: path.join(tempRoot, 'home', '.claude'),
    CODEX_HOME: path.join(tempRoot, 'home', '.codex'),
    QWEN_CONFIG_DIR: path.join(tempRoot, 'home', '.qwen'),
    GEMINI_CONFIG_DIR: path.join(tempRoot, 'home', '.gemini'),
    OPENCODE_CONFIG_DIR: path.join(xdgConfigHome, 'opencode'),
    KILO_CONFIG_DIR: path.join(xdgConfigHome, 'kilo'),
    CLINE_CONFIG_DIR: path.join(tempRoot, 'home', '.cline'),
    GSD_TEST_MODE: '1',
  };
}

function runInstaller(tempRoot, args) {
  execFileSync(process.execPath, ['bin/install.js', ...args], {
    cwd: repoRoot,
    env: sandboxEnv(tempRoot),
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function assertUnderTemp(tempRoot, filePath) {
  const relative = path.relative(tempRoot, filePath);
  assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative), `${filePath} should stay under ${tempRoot}`);
}

function assertExistsUnderTemp(tempRoot, filePath) {
  assertUnderTemp(tempRoot, filePath);
  assert.ok(fs.existsSync(filePath), `${filePath} should exist`);
}

describe('Phase 10 packaging self-containment', () => {
  let tempRoots = [];

  before(() => {
    execFileSync(process.execPath, ['scripts/build-hooks.js'], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: 'pipe',
    });
  });

  after(() => {
    for (const tempRoot of tempRoots) {
      fs.rmSync(tempRoot, { recursive: true, force: true });
    }
  });

  test('npm package dry-run includes self-contained runtime surfaces and excludes old research route', () => {
    const files = runNpmPackDryRun();

    for (const requiredPath of [
      'bin/install.js',
      'package.json',
      'scripts/build-hooks.js',
      'commands/gsd/ljx-research-pipeline.md',
      'commands/gsd/ljx-claim-gate.md',
      'commands/gsd/ljx-run-experiment.md',
      'get-shit-done/bin/gsd-tools.cjs',
    ]) {
      assert.ok(files.includes(requiredPath), `package should include ${requiredPath}`);
    }

    assert.ok(files.some(file => /^agents\/gsd-[^/]+\.md$/.test(file)), 'package should include at least one agents/gsd-*.md file');

    for (const hook of expectedHooks) {
      assert.ok(files.includes(`hooks/${hook}`), `package should include hooks/${hook}`);
      assert.ok(files.includes(`hooks/dist/${hook}`), `package should include hooks/dist/${hook}`);
    }

    for (const forbiddenPath of forbiddenPackagePaths) {
      assert.ok(!files.includes(forbiddenPath), `package should not include ${forbiddenPath}`);
    }

    assert.deepStrictEqual(
      files.filter(file => file.startsWith('get-shit-done/bin/lib/research-')),
      [],
      'package should not include get-shit-done/bin/lib/research-* files'
    );
    assert.deepStrictEqual(
      files.filter(file => file.startsWith('commands/gsd/gsd-ljx-')),
      [],
      'package should not include commands/gsd/gsd-ljx-* source wrappers'
    );

    for (const sourcePath of [
      '.planning/research.config.json',
      'get-shit-done/bin/lib/research-',
      'get-shit-done/workflows/gsd-ljx-research-command.md',
      'commands/gsd/gsd-ljx-',
    ]) {
      if (sourcePath.endsWith('-')) {
        const sourceDir = path.join(repoRoot, path.dirname(sourcePath));
        const prefix = path.basename(sourcePath);
        const matches = fs.existsSync(sourceDir)
          ? fs.readdirSync(sourceDir).filter(file => file.startsWith(prefix))
          : [];
        assert.deepStrictEqual(matches, [], `source tree should not contain ${sourcePath}*`);
        continue;
      }
      assert.ok(!fileExists(sourcePath), `source tree should not contain ${sourcePath}`);
    }
  });

  test('hooks/dist output is fresh from source hooks', () => {
    execFileSync('npm', ['run', 'build:hooks'], {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: 'pipe',
    });

    for (const hook of expectedHooks) {
      const source = fs.readFileSync(path.join(repoRoot, 'hooks', hook));
      const dist = fs.readFileSync(path.join(repoRoot, 'hooks', 'dist', hook));
      assert.deepStrictEqual(dist, source, `hooks/dist/${hook} should match hooks/${hook}`);
    }
  });

  test('installer generates normal runtime output only under temp roots', () => {
    const tempRoot = makeTempRoot();
    tempRoots.push(tempRoot);

    const home = path.join(tempRoot, 'home');
    const xdgConfigHome = path.join(tempRoot, '.config');
    const claudeDir = path.join(home, '.claude');
    const localProject = path.join(tempRoot, 'project');
    fs.mkdirSync(localProject, { recursive: true });

    runInstaller(tempRoot, ['--claude', '--global', '--config-dir', claudeDir]);
    runInstaller(tempRoot, ['--codex', '--global', '--config-dir', path.join(home, '.codex')]);
    runInstaller(tempRoot, ['--qwen', '--global', '--config-dir', path.join(home, '.qwen')]);
    runInstaller(tempRoot, ['--gemini', '--global', '--config-dir', path.join(home, '.gemini')]);
    runInstaller(tempRoot, ['--opencode', '--global', '--config-dir', path.join(xdgConfigHome, 'opencode')]);
    runInstaller(tempRoot, ['--kilo', '--global', '--config-dir', path.join(xdgConfigHome, 'kilo')]);

    execFileSync(process.execPath, [path.join(repoRoot, 'bin', 'install.js'), '--claude', '--local'], {
      cwd: localProject,
      env: sandboxEnv(tempRoot),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    execFileSync(process.execPath, [path.join(repoRoot, 'bin', 'install.js'), '--cline', '--local'], {
      cwd: localProject,
      env: sandboxEnv(tempRoot),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    assertExistsUnderTemp(tempRoot, path.join(claudeDir, expectedInstallSurfaces.claudeGlobalSkill));
    assertExistsUnderTemp(tempRoot, path.join(localProject, expectedInstallSurfaces.claudeLocalCommand));
    assertExistsUnderTemp(tempRoot, path.join(home, '.codex', 'skills', 'gsd-ljx-run-experiment', 'SKILL.md'));
    assertExistsUnderTemp(tempRoot, path.join(home, '.codex', 'config.toml'));
    assertExistsUnderTemp(tempRoot, path.join(home, '.qwen', 'skills', 'gsd-ljx-run-experiment', 'SKILL.md'));
    assertExistsUnderTemp(tempRoot, path.join(home, '.gemini', 'skills', 'gsd-ljx-run-experiment', 'SKILL.md'));
    assertExistsUnderTemp(tempRoot, path.join(home, '.gemini', 'hooks', 'gsd-check-update.js'));
    assertExistsUnderTemp(tempRoot, path.join(xdgConfigHome, 'opencode', 'command', 'gsd-ljx-run-experiment.md'));
    assertExistsUnderTemp(tempRoot, path.join(xdgConfigHome, 'kilo', 'rules', 'gsd-ljx-run-experiment.md'));
    assertExistsUnderTemp(tempRoot, path.join(localProject, expectedInstallSurfaces.clineLocalRules));
  });
});
