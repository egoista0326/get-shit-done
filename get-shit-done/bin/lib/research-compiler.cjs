/**
 * Research compiler — converts Auto/ARIS command intent into GSD-owned guidance.
 */
'use strict';

const fs = require('fs');
const { output } = require('./core.cjs');
const { requireSafePath, sanitizeForPrompt, scanForInjection } = require('./security.cjs');
const { loadResearchConfig } = require('./research-config.cjs');
const { getResearchCommand } = require('./research-command-map.cjs');
const { getPromptPack } = require('./research-prompt-packs.cjs');
const { renderResearchPhase } = require('./research-phase-render.cjs');

const SUPPORTED_RESEARCH_MODES = ['insert', 'research-first'];
const UNSAFE_PARAMETER_KEYS = new Set(['__proto__', 'prototype', 'constructor']);

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function cloneParameterValue(value) {
  if (Array.isArray(value)) {
    return [...value];
  }
  if (isPlainObject(value)) {
    const cloned = {};
    for (const [key, nested] of Object.entries(value)) {
      if (UNSAFE_PARAMETER_KEYS.has(key)) continue;
      cloned[key] = cloneParameterValue(nested);
    }
    return cloned;
  }
  return value;
}

function mergeParameterObjects(...sources) {
  const merged = {};
  for (const source of sources) {
    if (!isPlainObject(source)) continue;
    for (const [key, value] of Object.entries(source)) {
      if (UNSAFE_PARAMETER_KEYS.has(key)) continue;
      merged[key] = isPlainObject(merged[key]) && isPlainObject(value)
        ? mergeParameterObjects(merged[key], value)
        : cloneParameterValue(value);
    }
  }
  return merged;
}

function resolveResearchMode(command, mode) {
  const normalized = String(mode || 'insert').trim();
  if (!SUPPORTED_RESEARCH_MODES.includes(normalized)) {
    throw new Error(`Unsupported research mode: ${normalized}`);
  }
  if (normalized === 'research-first' && command.key !== 'research-pipeline') {
    throw new Error('research-first mode is only supported for research-pipeline');
  }
  return normalized;
}

function compileResearchCommand(cwd, commandKey, options = {}) {
  const command = getResearchCommand(commandKey);
  const config = loadResearchConfig(cwd, { preset: options.preset });
  const mode = resolveResearchMode(command, options.mode || command.defaultMode || 'insert');
  const intent = sanitizeForPrompt(options.intent || '');
  const intentSafety = scanForInjection(intent, { strict: true });
  const promptPack = getPromptPack(command.promptPack);
  const commandConfig = config.commands[command.key] && typeof config.commands[command.key] === 'object'
    ? config.commands[command.key]
    : {};
  const parameters = mergeParameterObjects(
    command.parameters,
    config.presetParameters,
    commandConfig,
    options.parameters
  );
  const phase = renderResearchPhase({ command, intent, mode, intentSafety });
  const researchFirst = mode === 'research-first';

  return {
    command: command.key,
    publicCommand: command.publicCommand,
    family: command.family,
    preset: config.preset,
    depth: config.depth,
    mode,
    intent,
    intentSafety,
    phase,
    promptPack,
    parameters,
    artifacts: {
      index: 'research/RESEARCH_INDEX.md',
      required: [...command.artifacts.required],
    },
    evidence: {
      required: [...command.evidence.required],
    },
    gates: {
      autoProceed: config.autoProceed,
      humanCheckpoint: config.humanCheckpoint,
      externalSideEffects: config.externalSideEffects,
      allowQualityGateOverride: config.allowQualityGateOverride,
      requireAuditArtifacts: config.requireAuditArtifacts,
      phase08BridgeOnly: true,
    },
    lifecycle: {
      owner: 'gsd',
      mutation: researchFirst ? 'roadmap-planning-intent' : 'phase-insert-intent',
      directWrites: [],
    },
    roadmap: researchFirst ? {
      numbering: 'integer',
      insertAfterCurrentPhase: false,
    } : null,
    configWarnings: config.warnings,
  };
}

function parseResearchCompileArgs(args) {
  const command = args[2];
  const flagStart = args.findIndex((arg, index) => index >= 3 && arg.startsWith('--'));
  const intentTokens = flagStart === -1 ? args.slice(3) : args.slice(3, flagStart);
  const flagArgs = flagStart === -1 ? [] : args.slice(flagStart);

  function valueFor(flag) {
    const idx = flagArgs.indexOf(`--${flag}`);
    return idx !== -1 && flagArgs[idx + 1] && !flagArgs[idx + 1].startsWith('--') ? flagArgs[idx + 1] : null;
  }

  return {
    command,
    intent: intentTokens.join(' '),
    preset: valueFor('preset'),
    mode: valueFor('mode'),
    phase: valueFor('phase'),
    intentFile: valueFor('intent-file'),
    dryRun: flagArgs.includes('--dry-run'),
  };
}

function cmdResearchCompile(cwd, args, raw) {
  const options = parseResearchCompileArgs(args);
  if (!options.command) {
    throw new Error('Usage: gsd-tools research compile <command> [intent...] [--intent-file path] [--preset safe|auto|danger-auto] [--mode insert|research-first] [--dry-run]');
  }
  if (options.intentFile) {
    const intentPath = requireSafePath(options.intentFile, cwd, 'Research intent file', { allowAbsolute: true });
    options.intent = fs.readFileSync(intentPath, 'utf8').replace(/\r?\n$/, '');
  }
  const compiled = compileResearchCommand(cwd, options.command, options);
  output(compiled, raw);
}

module.exports = {
  compileResearchCommand,
  cmdResearchCompile,
};
