/**
 * Research index — phase-local artifact ledger helpers.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { atomicWriteFileSync, findPhaseInternal, output } = require('./core.cjs');
const { requireSafePath } = require('./security.cjs');
const { getResearchCommand } = require('./research-command-map.cjs');

function renderResearchIndex(commandKey, artifacts) {
  const requiredRows = artifacts.map(artifact => `| ${artifact} | missing | Required for ${commandKey} completion evidence. |`);
  const lines = [
    '# Research Index',
    '',
    `Command: ${commandKey}`,
    '',
    '## Required Evidence',
    '',
    '| Artifact | Status | Completion relevance |',
    '|---|---|---|',
    ...requiredRows,
    '',
    '## Raw Records',
    '',
    '- Pending: raw source records, raw reviewer responses, run logs, and imported source files.',
    '',
    '## Summaries',
    '',
    '- Pending: human-readable synthesis reports derived from raw records.',
    '',
    '## Reviews',
    '',
    '- Pending: review reports, raw reviewer outputs, verdicts, scores, and round state.',
    '',
    '## Audits',
    '',
    '- Pending: audit records that check evidence completeness, novelty, claims, and side-effect policy.',
    '',
    '## Side Effect Records',
    '',
    '- Pending: requested, blocked, approved, or degraded external operations. Bridge-ready is not completion.',
    '',
    '## Imports',
    '',
    '- Pending: imported papers, repositories, datasets, review comments, or user-provided files.',
    '',
    '## Exports',
    '',
    '- Pending: generated reports, phase handoff files, proposals, or publication-facing artifacts.',
    '',
    '## Missing Evidence',
    '',
    ...artifacts.map(artifact => `- [ ] ${artifact}`),
    '',
    '## Taint And Degraded Status',
    '',
    '- Tainted: false until imported/generated evidence is explicitly marked tainted.',
    '- Degraded: false until a required operation is skipped, blocked, or substituted.',
    '- External side effects: not executed by this command layer.',
    '',
    '## Completion Labels',
    '',
    '- incomplete: required evidence has not been verified yet.',
    '- clean: all required evidence is present, non-empty, phase-local, and verified by GSD.',
    '- degraded: required external or evidence operation was not completed and is explicitly labeled.',
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

function parseCommandFlag(args, defaultCommand) {
  const idx = args.indexOf('--command');
  return idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--') ? args[idx + 1] : defaultCommand;
}

function cmdResearchIndex(cwd, args, raw) {
  const phaseId = args[2];
  if (!phaseId) throw new Error('Usage: gsd-tools research index <phase-id> [--command <command>] [--dry-run]');
  const command = parseCommandFlag(args, 'research-lit');
  const dryRun = args.includes('--dry-run');
  const result = initResearchIndex(cwd, phaseId, command, { dryRun });
  const { content, ...json } = result;
  output(dryRun ? result : json, raw);
}

module.exports = {
  renderResearchIndex,
  initResearchIndex,
  cmdResearchIndex,
};
