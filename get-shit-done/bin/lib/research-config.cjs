/**
 * Research config — Auto/ARIS overlay configuration.
 *
 * This intentionally reads .planning/research.config.json, not the upstream
 * GSD .planning/config.json root research key. GSD config remains lifecycle-owned
 * by core config.cjs.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { planningDir } = require('./core.cjs');
const { safeJsonParse } = require('./security.cjs');

const SUPPORTED_RESEARCH_PRESETS = ['safe', 'auto', 'danger-auto'];

const PRESET_DEFAULTS = {
  safe: {
    preset: 'safe',
    effort: 'deep',
    reviewDepth: 'deep',
    autoProceed: false,
    humanCheckpoint: true,
    externalSideEffects: 'confirm-required',
    allowQualityGateOverride: false,
    requireAuditArtifacts: false,
  },
  auto: {
    preset: 'auto',
    effort: 'deep',
    reviewDepth: 'deep',
    autoProceed: true,
    humanCheckpoint: false,
    externalSideEffects: 'preauthorized-only',
    allowQualityGateOverride: false,
    requireAuditArtifacts: false,
  },
  'danger-auto': {
    preset: 'danger-auto',
    effort: 'deep',
    reviewDepth: 'deep',
    autoProceed: true,
    humanCheckpoint: false,
    externalSideEffects: 'danger-auto-available',
    allowQualityGateOverride: true,
    requireAuditArtifacts: true,
  },
};

const KNOWN_TOP_LEVEL_KEYS = new Set([
  'preset',
  'default_preset',
  'presets',
  'commands',
  'side_effects',
  'strict',
  // Non-effective provenance keys created during Phase 05 quarantine.
  'schema',
  'status',
  'effective',
  'source',
  'migrated_at',
  'reason',
  'activation_rule',
  'legacy_research',
]);

function normalizePresetName(preset) {
  return String(preset || 'safe').trim();
}

function resolveResearchPreset(preset) {
  const normalized = normalizePresetName(preset);
  if (!SUPPORTED_RESEARCH_PRESETS.includes(normalized)) {
    throw new Error(`Unsupported research preset: ${normalized}`);
  }
  return { ...PRESET_DEFAULTS[normalized] };
}

function readResearchConfigFile(configPath) {
  if (!fs.existsSync(configPath)) {
    return { exists: false, raw: {}, warnings: [] };
  }

  const text = fs.readFileSync(configPath, 'utf8');
  const parsed = safeJsonParse(text, { label: '.planning/research.config.json' });
  if (!parsed.ok) {
    throw new Error(parsed.error);
  }
  if (!parsed.value || typeof parsed.value !== 'object' || Array.isArray(parsed.value)) {
    throw new Error('.planning/research.config.json must contain a JSON object');
  }

  const warnings = [];
  for (const key of Object.keys(parsed.value)) {
    if (!KNOWN_TOP_LEVEL_KEYS.has(key)) {
      warnings.push({ key, action: 'ignored', reason: 'unknown top-level research config key' });
    }
  }

  return { exists: true, raw: parsed.value, warnings };
}

function loadResearchConfig(cwd, overrides = {}) {
  const configPath = path.join(planningDir(cwd), 'research.config.json');
  const loaded = readResearchConfigFile(configPath);
  const raw = loaded.raw;
  const effective = raw.effective === false ? false : true;
  const presetName = overrides.preset || (effective ? raw.preset || raw.default_preset : null) || 'safe';
  const preset = resolveResearchPreset(presetName);

  return {
    ...preset,
    depth: preset.effort,
    exists: loaded.exists,
    effective,
    configPath,
    commands: effective && raw.commands && typeof raw.commands === 'object' && !Array.isArray(raw.commands)
      ? raw.commands
      : {},
    sideEffects: effective && raw.side_effects && typeof raw.side_effects === 'object' && !Array.isArray(raw.side_effects)
      ? raw.side_effects
      : {},
    warnings: loaded.warnings,
    raw,
  };
}

module.exports = {
  SUPPORTED_RESEARCH_PRESETS,
  PRESET_DEFAULTS,
  loadResearchConfig,
  resolveResearchPreset,
};
