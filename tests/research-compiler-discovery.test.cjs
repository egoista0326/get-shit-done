const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { createTempProject, cleanup, runGsdTools } = require('./helpers.cjs');
const {
  DISCOVERY_COMMAND_KEYS,
  getResearchCommand,
} = require('../get-shit-done/bin/lib/research-command-map.cjs');
const { compileResearchCommand } = require('../get-shit-done/bin/lib/research-compiler.cjs');

const discoveryCommands = [
  'research-lit',
  'idea-discovery',
  'idea-creator',
  'novelty-check',
  'research-review',
  'research-refine',
  'research-refine-pipeline',
  'research-pipeline',
];

describe('research discovery compiler contract', () => {
  test('declares all discovery and refinement command keys as data', () => {
    assert.deepStrictEqual(DISCOVERY_COMMAND_KEYS, discoveryCommands);

    for (const command of discoveryCommands) {
      const entry = getResearchCommand(command);

      assert.equal(entry.key, command);
      assert.match(entry.publicCommand, /^gsd-ljx-/);
      assert.ok(entry.promptPack, `${command} should declare a prompt pack`);
      assert.ok(Array.isArray(entry.artifacts.required), `${command} should declare required artifacts`);
      assert.ok(entry.artifacts.required.includes('research/RESEARCH_INDEX.md'), `${command} should use research index`);
    }
  });

  test('compiles idea-discovery into ordinary GSD phase guidance with literature and novelty evidence', () => {
    const tmp = createTempProject('gsd-research-compiler-');
    try {
      const compiled = compileResearchCommand(tmp, 'idea-discovery', {
        intent: 'discover graph retrieval ideas',
        preset: 'safe',
        mode: 'insert',
      });

      assert.equal(compiled.command, 'idea-discovery');
      assert.equal(compiled.publicCommand, 'gsd-ljx-idea-discovery');
      assert.equal(compiled.family, 'discovery');
      assert.equal(compiled.preset, 'safe');
      assert.equal(compiled.depth, 'deep');
      assert.equal(compiled.mode, 'insert');
      assert.equal(compiled.lifecycle.owner, 'gsd');
      assert.equal(compiled.lifecycle.mutation, 'phase-insert-intent');
      assert.deepStrictEqual(compiled.lifecycle.directWrites, []);
      assert.equal(compiled.phase.title, 'Research idea discovery');
      assert.match(compiled.phase.goal, /ordinary GSD phase/);
      assert.ok(compiled.promptPack.sections.some(section => /literature/i.test(section)));
      assert.ok(compiled.artifacts.required.includes('research/literature/LITERATURE_EVIDENCE.md'));
      assert.ok(compiled.artifacts.required.includes('research/ideas/IDEA_REPORT.md'));
      assert.ok(compiled.artifacts.required.includes('research/novelty/NOVELTY_REVIEW.md'));
      assert.ok(compiled.evidence.required.includes('literature'));
      assert.ok(compiled.evidence.required.includes('novelty'));
      assert.equal(compiled.gates.humanCheckpoint, true);
      assert.equal(compiled.gates.externalSideEffects, 'confirm-required');
      assert.equal(JSON.stringify(compiled).includes('phase_type'), false);
    } finally {
      cleanup(tmp);
    }
  });

  test('honors research.config.json and CLI preset override precedence', () => {
    const tmp = createTempProject('gsd-research-compiler-');
    fs.writeFileSync(path.join(tmp, '.planning', 'research.config.json'), `${JSON.stringify({
      preset: 'safe',
      commands: {
        'idea-discovery': {
          sources: ['local'],
          max_literature_items: 5,
        },
      },
    }, null, 2)}\n`);

    try {
      const compiled = compileResearchCommand(tmp, 'idea-discovery', {
        intent: 'use local papers only',
        preset: 'auto',
      });

      assert.equal(compiled.preset, 'auto');
      assert.equal(compiled.gates.autoProceed, true);
      assert.equal(compiled.gates.humanCheckpoint, false);
      assert.deepStrictEqual(compiled.parameters.sources, ['local']);
      assert.equal(compiled.parameters.max_literature_items, 5);
    } finally {
      cleanup(tmp);
    }
  });

  test('compiles research-first pipeline with integer roadmap planning intent', () => {
    const tmp = createTempProject('gsd-research-compiler-');
    try {
      const compiled = compileResearchCommand(tmp, 'research-pipeline', {
        intent: 'build a research-first project around retrieval agents',
        mode: 'research-first',
      });

      assert.equal(compiled.command, 'research-pipeline');
      assert.equal(compiled.mode, 'research-first');
      assert.equal(compiled.lifecycle.mutation, 'roadmap-planning-intent');
      assert.equal(compiled.roadmap.numbering, 'integer');
      assert.equal(compiled.roadmap.insertAfterCurrentPhase, false);
      assert.equal(JSON.stringify(compiled).includes('.1'), false);
    } finally {
      cleanup(tmp);
    }
  });

  test('CLI dry-run compile emits deterministic JSON and does not create canonical state changes', () => {
    const tmp = createTempProject('gsd-research-cli-');
    const statePath = path.join(tmp, '.planning', 'STATE.md');
    const roadmapPath = path.join(tmp, '.planning', 'ROADMAP.md');
    fs.writeFileSync(statePath, '---\ncurrent_phase: 01\nstatus: planning\n---\n\n# State\n');
    fs.writeFileSync(roadmapPath, '# Roadmap\n');
    const stateBefore = fs.readFileSync(statePath, 'utf8');
    const roadmapBefore = fs.readFileSync(roadmapPath, 'utf8');

    try {
      const result = runGsdTools([
        'research', 'compile', 'idea-discovery', 'discover', 'graph', 'retrieval', 'ideas',
        '--preset', 'safe',
        '--mode', 'insert',
        '--dry-run',
      ], tmp);

      assert.equal(result.success, true, result.error);
      const compiled = JSON.parse(result.output);
      assert.equal(compiled.command, 'idea-discovery');
      assert.equal(compiled.phase.title, 'Research idea discovery');
      assert.equal(fs.readFileSync(statePath, 'utf8'), stateBefore);
      assert.equal(fs.readFileSync(roadmapPath, 'utf8'), roadmapBefore);
    } finally {
      cleanup(tmp);
    }
  });
});
