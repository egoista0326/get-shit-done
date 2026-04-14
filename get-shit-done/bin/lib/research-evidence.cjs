/**
 * Research evidence — structural completeness checks for phase-local artifacts.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { findPhaseInternal, output } = require('./core.cjs');
const { requireSafePath } = require('./security.cjs');
const { loadResearchConfig } = require('./research-config.cjs');
const { artifactsForConfig, getResearchCommand } = require('./research-command-map.cjs');

function resolvePhaseDir(cwd, phaseId) {
  const phaseInfo = findPhaseInternal(cwd, phaseId);
  if (!phaseInfo || !phaseInfo.directory) {
    throw new Error(`Phase not found: ${phaseId}`);
  }
  return fs.realpathSync(path.join(cwd, phaseInfo.directory));
}

function artifactStatus(phaseDir, relativePath) {
  let filePath;
  try {
    filePath = requireSafePath(path.join(phaseDir, relativePath), phaseDir, 'Research artifact', { allowAbsolute: true });
  } catch (error) {
    return { relativePath, filePath: null, present: false, empty: false, invalidType: 'path-escape', error: error.message };
  }
  if (!fs.existsSync(filePath)) {
    return { relativePath, filePath, present: false, empty: false };
  }
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
    return { relativePath, filePath, present: false, empty: false, invalidType: 'not-file' };
  }
  const empty = stat.isFile() && fs.readFileSync(filePath, 'utf8').trim().length === 0;
  return { relativePath, filePath, present: true, empty };
}

function missingContentMarkers(status, markers = []) {
  if (!status.present || status.empty || status.invalidType || markers.length === 0) {
    return [];
  }
  const content = fs.readFileSync(status.filePath, 'utf8').toLowerCase();
  return markers.filter(marker => !content.includes(marker.toLowerCase()));
}

function checkResearchEvidence(cwd, phaseId, commandKey, options = {}) {
  const command = getResearchCommand(commandKey || 'research-lit');
  const config = loadResearchConfig(cwd, { preset: options.preset });
  const phaseDir = resolvePhaseDir(cwd, phaseId);
  const requiredArtifacts = artifactsForConfig(command, config);
  const statuses = requiredArtifacts.map(relativePath => artifactStatus(phaseDir, relativePath));
  const incompleteContent = statuses
    .map(status => ({
      path: status.relativePath,
      missingMarkers: missingContentMarkers(status, command.artifacts.content?.[status.relativePath]),
    }))
    .filter(status => status.missingMarkers.length > 0);
  const blocked = statuses
    .filter(status => status.invalidType)
    .map(status => status.relativePath);
  const missing = statuses
    .filter(status => !status.present || status.empty)
    .map(status => status.relativePath);
  const present = statuses
    .filter(status => status.present && !status.empty)
    .map(status => status.relativePath);
  const clean = missing.length === 0 && blocked.length === 0 && incompleteContent.length === 0;
  const status = blocked.length > 0 ? 'blocked' : clean ? 'clean' : 'incomplete';

  return {
    command: command.key,
    phase: phaseId,
    status,
    clean,
    present,
    missing,
    blocked,
    incompleteContent,
    checked: statuses.map(status => ({
      path: status.relativePath,
      present: status.present,
      empty: status.empty,
      invalidType: status.invalidType || null,
      error: status.error || null,
    })),
    reason: clean
      ? 'All required phase-local research evidence artifacts are present.'
      : blocked.length > 0
        ? 'Blocked by invalid research evidence artifact paths; required evidence must be phase-local files.'
        : incompleteContent.length > 0
          ? 'Required research evidence artifacts are present but missing required completion markers.'
        : 'Missing required research evidence artifacts; summaries, skeleton indexes, and lifecycle state are not sufficient.',
  };
}

function parseCommandFlag(args, defaultCommand) {
  const idx = args.indexOf('--command');
  return idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--') ? args[idx + 1] : defaultCommand;
}

function parsePresetFlag(args) {
  const idx = args.indexOf('--preset');
  return idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--') ? args[idx + 1] : null;
}

function cmdResearchEvidenceCheck(cwd, args, raw) {
  const phaseId = args[2];
  if (!phaseId) throw new Error('Usage: gsd-tools research evidence-check <phase-id> [--command <command>] [--preset safe|auto|danger-auto]');
  const command = parseCommandFlag(args, 'research-lit');
  const preset = parsePresetFlag(args);
  output(checkResearchEvidence(cwd, phaseId, command, { preset }), raw);
}

module.exports = {
  checkResearchEvidence,
  cmdResearchEvidenceCheck,
};
