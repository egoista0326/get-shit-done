/**
 * Research phase renderer — ordinary GSD guidance text from compiled research intent.
 */
'use strict';

function renderResearchPhase({ command, intent, mode }) {
  const safeIntent = intent || 'No additional user intent supplied.';
  const title = command.defaultPhaseTitle;
  const goal = mode === 'research-first'
    ? `${command.defaultPhaseGoal} The resulting roadmap uses ordinary integer GSD phases.`
    : `${command.defaultPhaseGoal} The work should be inserted as an ordinary GSD phase after the current phase by default.`;

  const guidance = [
    `Public command: /${command.publicCommand}`,
    `Research command key: ${command.key}`,
    `User intent: ${safeIntent}`,
    'GSD remains lifecycle owner: use ordinary discuss, plan, execute, verify, and phase insertion paths.',
    'Research overlay provides prompt obligations, artifact contracts, preset policy, and evidence checks only.',
  ].join('\n');

  return { title, goal, guidance };
}

module.exports = { renderResearchPhase };
