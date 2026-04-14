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

const PRESET_OVERRIDE_KEYS = {
  effort: 'effort',
  reviewDepth: 'reviewDepth',
  review_depth: 'reviewDepth',
  autoProceed: 'autoProceed',
  auto_proceed: 'autoProceed',
  humanCheckpoint: 'humanCheckpoint',
  human_checkpoint: 'humanCheckpoint',
  externalSideEffects: 'externalSideEffects',
  external_side_effects: 'externalSideEffects',
  allowQualityGateOverride: 'allowQualityGateOverride',
  allow_quality_gate_override: 'allowQualityGateOverride',
  requireAuditArtifacts: 'requireAuditArtifacts',
  require_audit_artifacts: 'requireAuditArtifacts',
};

const PRESET_PARAMETER_KEYS = {
  sources: 'sources',
  sourcePolicy: 'source_policy',
  source_policy: 'source_policy',
  maxLiteratureItems: 'max_literature_items',
  max_literature_items: 'max_literature_items',
  maxReviewRounds: 'max_review_rounds',
  max_review_rounds: 'max_review_rounds',
  reviewDifficulty: 'review_difficulty',
  review_difficulty: 'review_difficulty',
  scoreThreshold: 'score_threshold',
  score_threshold: 'score_threshold',
  noveltyThreshold: 'novelty_threshold',
  novelty_threshold: 'novelty_threshold',
  requireLiteratureEvidence: 'require_literature_evidence',
  require_literature_evidence: 'require_literature_evidence',
};

const UNSAFE_CONFIG_KEYS = new Set(['__proto__', 'prototype', 'constructor']);

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

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function normalizePresetOverrides(overrides) {
  if (!isPlainObject(overrides)) return {};
  const normalized = {};
  for (const [key, value] of Object.entries(overrides)) {
    const target = PRESET_OVERRIDE_KEYS[key];
    if (!target) continue;
    normalized[target] = value;
  }
  return normalized;
}

function cloneConfigValue(value) {
  if (Array.isArray(value)) {
    return value.map(cloneConfigValue);
  }
  if (isPlainObject(value)) {
    const cloned = {};
    for (const [key, nested] of Object.entries(value)) {
      if (UNSAFE_CONFIG_KEYS.has(key)) continue;
      cloned[key] = cloneConfigValue(nested);
    }
    return cloned;
  }
  return value;
}

function normalizePresetParameterOverrides(overrides) {
  if (!isPlainObject(overrides)) return {};
  const normalized = {};
  for (const [key, value] of Object.entries(overrides)) {
    const target = PRESET_PARAMETER_KEYS[key];
    if (!target) continue;
    normalized[target] = cloneConfigValue(value);
  }
  return normalized;
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
  const selectedPresetConfig = effective && isPlainObject(raw.presets)
    ? raw.presets[preset.preset]
    : {};
  const presetOverrides = normalizePresetOverrides(selectedPresetConfig);
  const presetParameters = normalizePresetParameterOverrides(selectedPresetConfig);
  const resolvedPreset = {
    ...preset,
    ...presetOverrides,
    preset: preset.preset,
  };

  return {
    ...resolvedPreset,
    depth: resolvedPreset.effort,
    exists: loaded.exists,
    effective,
    configPath,
    commands: effective && raw.commands && typeof raw.commands === 'object' && !Array.isArray(raw.commands)
      ? raw.commands
      : {},
    presetParameters,
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
