const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { createTempProject, cleanup } = require('./helpers.cjs');
const {
  SUPPORTED_RESEARCH_PRESETS,
  loadResearchConfig,
  resolveResearchPreset,
} = require('../get-shit-done/bin/lib/research-config.cjs');

describe('research config defaults and preset policy', () => {
  test('defaults to safe preset with deep effort and review depth', () => {
    const tmp = createTempProject('gsd-research-config-');
    try {
      const resolved = loadResearchConfig(tmp);

      assert.deepStrictEqual(SUPPORTED_RESEARCH_PRESETS, ['safe', 'auto', 'danger-auto']);
      assert.equal(resolved.exists, false);
      assert.equal(resolved.preset, 'safe');
      assert.equal(resolved.effort, 'deep');
      assert.equal(resolved.reviewDepth, 'deep');
      assert.equal(resolved.autoProceed, false);
      assert.equal(resolved.humanCheckpoint, true);
      assert.equal(resolved.externalSideEffects, 'confirm-required');
      assert.deepStrictEqual(resolved.warnings, []);
    } finally {
      cleanup(tmp);
    }
  });

  test('loads .planning/research.config.json without reading root GSD research config as authoritative', () => {
    const tmp = createTempProject('gsd-research-config-');
    const planningDir = path.join(tmp, '.planning');
    const gsdConfigPath = path.join(planningDir, 'config.json');
    const researchConfigPath = path.join(planningDir, 'research.config.json');
    const gsdConfig = {
      workflow: { research: true },
      research: { preset: 'danger-auto' },
    };

    fs.writeFileSync(gsdConfigPath, `${JSON.stringify(gsdConfig, null, 2)}\n`);
    const before = fs.readFileSync(gsdConfigPath, 'utf8');
    fs.writeFileSync(researchConfigPath, `${JSON.stringify({
      preset: 'auto',
      commands: {
        'idea-discovery': {
          sources: ['local'],
          max_literature_items: 7,
        },
      },
    }, null, 2)}\n`);

    try {
      const resolved = loadResearchConfig(tmp);

      assert.equal(resolved.exists, true);
      assert.equal(resolved.configPath, researchConfigPath);
      assert.equal(resolved.preset, 'auto');
      assert.equal(resolved.autoProceed, true);
      assert.equal(resolved.humanCheckpoint, false);
      assert.deepStrictEqual(resolved.commands['idea-discovery'].sources, ['local']);
      assert.equal(resolved.commands['idea-discovery'].max_literature_items, 7);
      assert.equal(fs.readFileSync(gsdConfigPath, 'utf8'), before, 'GSD config must not be mutated by research config reads');
    } finally {
      cleanup(tmp);
    }
  });

  test('ignores root .planning/config.json research block when research.config.json is absent', () => {
    const tmp = createTempProject('gsd-research-config-');
    fs.writeFileSync(path.join(tmp, '.planning', 'config.json'), `${JSON.stringify({
      workflow: { research: true },
      research: { preset: 'danger-auto' },
    }, null, 2)}\n`);

    try {
      const resolved = loadResearchConfig(tmp);

      assert.equal(resolved.preset, 'safe');
      assert.equal(resolved.autoProceed, false);
      assert.equal(resolved.humanCheckpoint, true);
    } finally {
      cleanup(tmp);
    }
  });

  test('applies selected preset overrides from research.config.json presets block', () => {
    const tmp = createTempProject('gsd-research-config-');
    fs.writeFileSync(path.join(tmp, '.planning', 'research.config.json'), `${JSON.stringify({
      preset: 'auto',
      presets: {
        auto: {
          external_side_effects: 'confirm-required',
          allow_quality_gate_override: true,
          require_audit_artifacts: true,
          sources: ['local', 'web'],
          source_policy: {
            deepxiv: false,
          },
        },
      },
    }, null, 2)}\n`);

    try {
      const resolved = loadResearchConfig(tmp);

      assert.equal(resolved.preset, 'auto');
      assert.equal(resolved.externalSideEffects, 'confirm-required');
      assert.equal(resolved.allowQualityGateOverride, true);
      assert.equal(resolved.requireAuditArtifacts, true);
      assert.deepStrictEqual(resolved.presetParameters.sources, ['local', 'web']);
      assert.equal(resolved.presetParameters.source_policy.deepxiv, false);
    } finally {
      cleanup(tmp);
    }
  });

  test('rejects unsupported presets before compiling research context', () => {
    assert.throws(
      () => resolveResearchPreset('fast'),
      /Unsupported research preset: fast/
    );
  });

  test('warns and ignores unknown top-level research config keys by default', () => {
    const tmp = createTempProject('gsd-research-config-');
    fs.writeFileSync(path.join(tmp, '.planning', 'research.config.json'), `${JSON.stringify({
      preset: 'safe',
      gpu: 'vast',
      unexpected_key: true,
    }, null, 2)}\n`);

    try {
      const resolved = loadResearchConfig(tmp);

      assert.equal(resolved.preset, 'safe');
      assert.deepStrictEqual(
        resolved.warnings.map(warning => warning.key).sort(),
        ['gpu', 'unexpected_key']
      );
      assert.equal(Object.hasOwn(resolved, 'gpu'), false);
      assert.equal(Object.hasOwn(resolved, 'unexpected_key'), false);
    } finally {
      cleanup(tmp);
    }
  });

  test('treats quarantined legacy research config metadata as non-effective provenance', () => {
    const tmp = createTempProject('gsd-research-config-');
    fs.writeFileSync(path.join(tmp, '.planning', 'research.config.json'), `${JSON.stringify({
      schema: 'research-config-quarantine-v1',
      status: 'quarantined-legacy-config',
      effective: false,
      source: '.planning/config.json#research',
      migrated_at: '2026-04-14T02:02:18+02:00',
      reason: 'legacy quarantine record',
      activation_rule: 'non-effective until adopted by loader contract',
      legacy_research: {
        defaults: {
          auto_proceed: true,
          human_checkpoint: false,
        },
      },
    }, null, 2)}\n`);

    try {
      const resolved = loadResearchConfig(tmp);

      assert.equal(resolved.exists, true);
      assert.equal(resolved.effective, false);
      assert.equal(resolved.preset, 'safe');
      assert.equal(resolved.autoProceed, false);
      assert.equal(resolved.humanCheckpoint, true);
      assert.deepStrictEqual(resolved.warnings, []);
    } finally {
      cleanup(tmp);
    }
  });

  test('ignores preset fields when research config is explicitly non-effective', () => {
    const tmp = createTempProject('gsd-research-config-');
    fs.writeFileSync(path.join(tmp, '.planning', 'research.config.json'), `${JSON.stringify({
      effective: false,
      preset: 'danger-auto',
      default_preset: 'danger-auto',
    }, null, 2)}\n`);

    try {
      const resolved = loadResearchConfig(tmp);

      assert.equal(resolved.effective, false);
      assert.equal(resolved.preset, 'safe');
      assert.equal(resolved.autoProceed, false);
      assert.equal(resolved.humanCheckpoint, true);
      assert.equal(resolved.externalSideEffects, 'confirm-required');
    } finally {
      cleanup(tmp);
    }
  });
});
