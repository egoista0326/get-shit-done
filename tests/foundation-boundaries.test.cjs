/**
 * Foundation boundary checks for the upstream-GSD implementation substrate.
 *
 * These tests intentionally distinguish upstream GSD lifecycle config
 * (`workflow.research`) from future Auto/ARIS research overlay config, which
 * must not become authoritative `.planning/config.json` state.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');

function readUtf8(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readUtf8(relativePath));
}

function walkFiles(relativeDir, options = {}) {
  const base = path.join(repoRoot, relativeDir);
  const excludeDirs = new Set(options.excludeDirs || []);
  const files = [];

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      const relative = path.relative(repoRoot, fullPath);
      if (entry.isDirectory()) {
        if (!excludeDirs.has(entry.name) && !excludeDirs.has(relative)) {
          walk(fullPath);
        }
        continue;
      }
      if (entry.isFile()) {
        files.push(relative);
      }
    }
  }

  walk(base);
  return files.sort();
}

function productionFoundationFiles() {
  const roots = [
    'bin',
    'commands',
    'get-shit-done',
    'hooks',
    'scripts',
    'sdk',
  ];
  return [
    'package.json',
    ...roots.flatMap(root => walkFiles(root, { excludeDirs: ['dist'] })),
  ].filter(relativePath => !relativePath.startsWith('hooks/dist/'));
}

describe('foundation config boundary', () => {
  test('static config template declares explicit foundation workflow defaults', () => {
    const config = readJson('get-shit-done/templates/config.json');

    assert.ok(config.workflow && typeof config.workflow === 'object', 'workflow object should exist');
    assert.strictEqual(config.workflow.research, true, 'upstream GSD workflow.research remains allowed');
    assert.strictEqual(config.workflow.nyquist_validation, true, 'nyquist validation should be explicit');
    assert.strictEqual(config.workflow.ai_integration_phase, true, 'AI integration phase should be explicit');
  });

  test('static config template does not introduce Auto/ARIS root research state', () => {
    const config = readJson('get-shit-done/templates/config.json');

    assert.equal(Object.hasOwn(config, 'research'), false, 'root research config belongs in research.config.json, not config.json');
    assert.equal(Object.hasOwn(config, 'auto_research'), false, 'Auto/ARIS config must not become root GSD config');
    assert.equal(Object.hasOwn(config, 'aris'), false, 'ARIS config must not become root GSD config');
  });

  test('config key surface keeps upstream GSD toggles but excludes typed research routing', () => {
    const { VALID_CONFIG_KEYS } = require('../get-shit-done/bin/lib/config.cjs');

    assert.ok(VALID_CONFIG_KEYS.has('workflow.research'), 'upstream workflow.research must remain supported');
    assert.ok(VALID_CONFIG_KEYS.has('workflow.ai_integration_phase'), 'workflow.ai_integration_phase must remain supported');
    assert.equal(VALID_CONFIG_KEYS.has('research'), false, 'root research config key is forbidden');
    assert.equal(VALID_CONFIG_KEYS.has('research.preset'), false, 'research config belongs in .planning/research.config.json');
    assert.equal(VALID_CONFIG_KEYS.has('phase_type'), false, 'typed phase routing is forbidden');
    assert.equal(
      VALID_CONFIG_KEYS.has('code_review_requirements_by_phase_type'),
      false,
      'typed phase code-review routing is forbidden'
    );
  });
});

describe('foundation source boundary', () => {
  test('production foundation files do not depend on current ljx-GSD or dirty source workspace', () => {
    const forbidden = [
      { pattern: /\bljx-gsd\b/i, label: 'ljx-gsd' },
      { pattern: /\bljx-GSD\b/, label: 'ljx-GSD' },
      { pattern: /\/Users\/lijiaxin\/Downloads\/new-gsd\b/, label: 'dirty source workspace path' },
    ];

    const hits = [];
    for (const relativePath of productionFoundationFiles()) {
      const content = readUtf8(relativePath);
      for (const { pattern, label } of forbidden) {
        if (pattern.test(content)) {
          hits.push(`${relativePath}: ${label}`);
        }
      }
    }

    assert.deepStrictEqual(hits, []);
  });

  test('production foundation files do not introduce typed phase routing', () => {
    const forbidden = [
      { pattern: /\bphase_type\b/, label: 'phase_type' },
      { pattern: /\bcode_review_requirements_by_phase_type\b/, label: 'code_review_requirements_by_phase_type' },
    ];

    const hits = [];
    for (const relativePath of productionFoundationFiles()) {
      const content = readUtf8(relativePath);
      for (const { pattern, label } of forbidden) {
        if (pattern.test(content)) {
          hits.push(`${relativePath}: ${label}`);
        }
      }
    }

    assert.deepStrictEqual(hits, []);
  });
});

describe('hook foundation surface', () => {
  test('every hook source listed by the build script exists', () => {
    const buildScript = readUtf8('scripts/build-hooks.js');
    const match = buildScript.match(/const HOOKS_TO_COPY = \[([\s\S]*?)\];/);
    assert.ok(match, 'HOOKS_TO_COPY list should exist in scripts/build-hooks.js');

    const hooks = [...match[1].matchAll(/'([^']+)'/g)].map(result => result[1]);
    assert.ok(hooks.length > 0, 'at least one hook source should be listed');

    const missing = hooks.filter(hook => !fs.existsSync(path.join(repoRoot, 'hooks', hook)));
    assert.deepStrictEqual(missing, []);
  });
});

describe('generated command and workflow foundation surface', () => {
  test('command files and workflow files are present', () => {
    const commands = walkFiles('commands/gsd').filter(file => file.endsWith('.md'));
    const workflows = walkFiles('get-shit-done/workflows').filter(file => file.endsWith('.md'));

    assert.ok(commands.length >= 70, `expected generated command surface, found ${commands.length}`);
    assert.ok(workflows.length >= 70, `expected workflow surface, found ${workflows.length}`);
  });

  test('command execution-context workflow references resolve', () => {
    const commands = walkFiles('commands/gsd').filter(file => file.endsWith('.md'));
    const missing = [];

    for (const command of commands) {
      const content = readUtf8(command);
      const refs = [...content.matchAll(/@~\/\.claude\/get-shit-done\/workflows\/([A-Za-z0-9._/-]+\.md)/g)]
        .map(result => result[1]);
      for (const ref of refs) {
        const relativeRef = path.join('get-shit-done', 'workflows', ref);
        if (!fs.existsSync(path.join(repoRoot, relativeRef))) {
          missing.push(`${command} -> ${relativeRef}`);
        }
      }
    }

    assert.deepStrictEqual(missing, []);
  });
});
