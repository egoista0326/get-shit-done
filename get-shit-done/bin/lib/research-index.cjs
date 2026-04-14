/**
 * Research index — phase-local artifact ledger helpers.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { atomicWriteFileSync, findPhaseInternal } = require('./core.cjs');
const { requireSafePath } = require('./security.cjs');
const { getResearchCommand } = require('./research-command-map.cjs');

function renderResearchIndex(commandKey, artifacts) {
  const lines = [
    '# Research Index',
    '',
    `Command: ${commandKey}`,
    '',
    '## Required Artifacts',
    '',
    ...artifacts.map(artifact => `- [ ] ${artifact}`),
    '',
    '## Status',
    '',
    'incomplete - evidence artifacts have not been verified yet.',
    '',
  ];
  return lines.join('\n');
}

function resolvePhaseResearchDir(cwd, phaseId) {
  const phaseInfo = findPhaseInternal(cwd, phaseId);
  if (!phaseInfo || !phaseInfo.directory) {
    throw new Error(`Phase not found: ${phaseId}`);
  }
  const phaseDir = path.join(cwd, phaseInfo.directory);
  const researchDir = requireSafePath(path.join(phaseDir, 'research'), phaseDir, 'Research directory', { allowAbsolute: true });
  return { phaseDir, researchDir };
}

function initResearchIndex(cwd, phaseId, commandKey, options = {}) {
  const command = getResearchCommand(commandKey || 'research-lit');
  const { phaseDir, researchDir } = resolvePhaseResearchDir(cwd, phaseId);
  const indexPath = requireSafePath(path.join(researchDir, 'RESEARCH_INDEX.md'), phaseDir, 'Research index', { allowAbsolute: true });
  const content = renderResearchIndex(command.key, command.artifacts.required);

  if (!options.dryRun) {
    fs.mkdirSync(researchDir, { recursive: true });
    atomicWriteFileSync(indexPath, content);
  }

  return {
    phaseDir,
    indexPath,
    command: command.key,
    artifacts: command.artifacts.required,
    written: !options.dryRun,
    content,
  };
}

module.exports = {
  renderResearchIndex,
  initResearchIndex,
};
