/**
 * Research evidence — structural completeness checks for phase-local artifacts.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { findPhaseInternal, output } = require('./core.cjs');
const { requireSafePath } = require('./security.cjs');
const { getResearchCommand } = require('./research-command-map.cjs');

function resolvePhaseDir(cwd, phaseId) {
  const phaseInfo = findPhaseInternal(cwd, phaseId);
  if (!phaseInfo || !phaseInfo.directory) {
    throw new Error(`Phase not found: ${phaseId}`);
  }
  return fs.realpathSync(path.join(cwd, phaseInfo.directory));
}

function artifactStatus(phaseDir, relativePath) {
  const filePath = requireSafePath(path.join(phaseDir, relativePath), phaseDir, 'Research artifact', { allowAbsolute: true });
  if (!fs.existsSync(filePath)) {
    return { relativePath, filePath, present: false, empty: false };
  }
  const stat = fs.statSync(filePath);
  const empty = stat.isFile() && fs.readFileSync(filePath, 'utf8').trim().length === 0;
  return { relativePath, filePath, present: true, empty };
}

function checkResearchEvidence(cwd, phaseId, commandKey) {
  const command = getResearchCommand(commandKey || 'research-lit');
  const phaseDir = resolvePhaseDir(cwd, phaseId);
  const statuses = command.artifacts.required.map(relativePath => artifactStatus(phaseDir, relativePath));
  const missing = statuses
    .filter(status => !status.present || status.empty)
    .map(status => status.relativePath);
  const present = statuses
    .filter(status => status.present && !status.empty)
    .map(status => status.relativePath);
  const clean = missing.length === 0;

  return {
    command: command.key,
    phase: phaseId,
    status: clean ? 'clean' : 'incomplete',
    clean,
    present,
    missing,
    checked: statuses.map(status => ({
      path: status.relativePath,
      present: status.present,
      empty: status.empty,
    })),
    reason: clean
      ? 'All required phase-local research evidence artifacts are present.'
      : 'Missing required research evidence artifacts; summaries, skeleton indexes, and lifecycle state are not sufficient.',
  };
}

function parseCommandFlag(args, defaultCommand) {
  const idx = args.indexOf('--command');
  return idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--') ? args[idx + 1] : defaultCommand;
}

function cmdResearchEvidenceCheck(cwd, args, raw) {
  const phaseId = args[2];
  if (!phaseId) throw new Error('Usage: gsd-tools research evidence-check <phase-id> [--command <command>]');
  const command = parseCommandFlag(args, 'research-lit');
  output(checkResearchEvidence(cwd, phaseId, command), raw);
}

module.exports = {
  checkResearchEvidence,
  cmdResearchEvidenceCheck,
};
