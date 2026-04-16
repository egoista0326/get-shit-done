/**
 * Regression test for #1736: local Claude install missing commands/gsd/
 *
 * After a fresh local install (`--claude --local`), all /gsd-* commands
 * except /gsd-help return "Unknown skill: gsd-quick" because
 * .claude/commands/gsd/ is not populated. Claude Code reads local project
 * commands from .claude/commands/gsd/ (the commands/ format), not from
 * .claude/skills/ — only the global ~/.claude/skills/ is used for skills.
 */

'use strict';

process.env.GSD_TEST_MODE = '1';

const { describe, test, before, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const INSTALL_SRC = path.join(__dirname, '..', 'bin', 'install.js');
const BUILD_SCRIPT = path.join(__dirname, '..', 'scripts', 'build-hooks.js');
const { install, copyCommandsAsClaudeSkills } = require(INSTALL_SRC);

// ─── Ensure hooks/dist/ is populated before install tests ────────────────────
// With --test-concurrency=4, other install tests (bug-1834, bug-1924) run
// build-hooks.js concurrently. That script creates hooks/dist/ empty first,
// then copies files — creating a window where this test sees an empty dir and
// install() fails with "directory is empty" → process.exit(1).

before(() => {
  execFileSync(process.execPath, [BUILD_SCRIPT], {
    encoding: 'utf-8',
    stdio: 'pipe',
  });
});

// ─── #1736: local install deploys commands/gsd/ ─────────────────────────────

describe('#1736: local Claude install populates .claude/commands/gsd/', () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gsd-local-install-1736-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('local install creates .claude/commands/gsd/ directory', (t) => {
    const origCwd = process.cwd();
    t.after(() => { process.chdir(origCwd); });
    process.chdir(tmpDir);
    install(false, 'claude');

    const commandsDir = path.join(tmpDir, '.claude', 'commands', 'gsd');
    assert.ok(
      fs.existsSync(commandsDir),
      '.claude/commands/gsd/ directory must exist after local install'
    );
  });

  test('local install deploys at least one .md command file to .claude/commands/gsd/', (t) => {
    const origCwd = process.cwd();
    t.after(() => { process.chdir(origCwd); });
    process.chdir(tmpDir);
    install(false, 'claude');

    const commandsDir = path.join(tmpDir, '.claude', 'commands', 'gsd');
    assert.ok(
      fs.existsSync(commandsDir),
      '.claude/commands/gsd/ must exist'
    );

    const files = fs.readdirSync(commandsDir).filter(f => f.endsWith('.md'));
    assert.ok(
      files.length > 0,
      `.claude/commands/gsd/ must contain at least one .md file, found: ${JSON.stringify(files)}`
    );
  });

  test('local install deploys quick.md to .claude/commands/gsd/', (t) => {
    const origCwd = process.cwd();
    t.after(() => { process.chdir(origCwd); });
    process.chdir(tmpDir);
    install(false, 'claude');

    const quickCmd = path.join(tmpDir, '.claude', 'commands', 'gsd', 'quick.md');
    assert.ok(
      fs.existsSync(quickCmd),
      '.claude/commands/gsd/quick.md must exist after local install'
    );
  });

  test('local install deploys thin ljx source commands under .claude/commands/gsd/', (t) => {
    const origCwd = process.cwd();
    t.after(() => { process.chdir(origCwd); });
    process.chdir(tmpDir);
    install(false, 'claude');

    const commandsDir = path.join(tmpDir, '.claude', 'commands', 'gsd');
    assert.ok(fs.existsSync(path.join(commandsDir, 'ljx-run-experiment.md')));
    assert.ok(!fs.existsSync(path.join(commandsDir, 'gsd-ljx-run-experiment.md')));
  });

  test('thin ljx sources convert to standard gsd-ljx global skills without custom relocation', () => {
    const gsdSrc = path.join(__dirname, '..', 'commands', 'gsd');
    const skillsDir = path.join(tmpDir, 'claude-skills');

    copyCommandsAsClaudeSkills(gsdSrc, skillsDir, 'gsd', '~/.claude/', 'claude', true);

    const skillPath = path.join(skillsDir, 'gsd-ljx-run-experiment', 'SKILL.md');
    assert.ok(fs.existsSync(skillPath), 'ljx-run-experiment.md should convert to gsd-ljx-run-experiment skill');
    assert.ok(!fs.existsSync(path.join(skillsDir, 'gsd-gsd-ljx-run-experiment')));

    const content = fs.readFileSync(skillPath, 'utf8');
    assert.match(content, /^name:\s+gsd-ljx-run-experiment$/m);
    assert.match(content, /Prepare and launch an authorized experiment run/);
  });
});
