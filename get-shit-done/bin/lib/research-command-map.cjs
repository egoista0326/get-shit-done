/**
 * Research command map — data-only Auto/ARIS command metadata.
 */
'use strict';

const DISCOVERY_COMMAND_KEYS = [
  'research-lit',
  'idea-discovery',
  'idea-creator',
  'novelty-check',
  'research-review',
  'research-refine',
  'research-refine-pipeline',
  'research-pipeline',
];

const INDEX_ARTIFACT = 'research/RESEARCH_INDEX.md';

function withIndex(required) {
  return [INDEX_ARTIFACT, ...required.filter(item => item !== INDEX_ARTIFACT)];
}

const RESEARCH_COMMANDS = {
  'research-lit': {
    key: 'research-lit',
    family: 'discovery',
    publicCommand: 'gsd-ljx-research-lit',
    promptPack: 'researchLitDeep',
    defaultMode: 'insert',
    defaultPhaseTitle: 'Research literature reading',
    defaultPhaseGoal: 'Use Auto/ARIS literature-reading prompts inside an ordinary GSD phase while producing source-grounded reading evidence.',
    artifacts: { required: withIndex(['research/literature/LITERATURE_EVIDENCE.md']) },
    evidence: { required: ['literature'] },
    parameters: { sources: ['local', 'web'], max_literature_items: 20 },
    sideEffects: ['network-literature-search'],
  },
  'idea-discovery': {
    key: 'idea-discovery',
    family: 'discovery',
    publicCommand: 'gsd-ljx-idea-discovery',
    promptPack: 'ideaDiscoveryDeep',
    defaultMode: 'insert',
    defaultPhaseTitle: 'Research idea discovery',
    defaultPhaseGoal: 'Use Auto/ARIS idea-discovery prompts inside an ordinary GSD phase while requiring literature and novelty evidence.',
    artifacts: { required: withIndex([
      'research/literature/LITERATURE_EVIDENCE.md',
      'research/ideas/IDEA_REPORT.md',
      'research/novelty/NOVELTY_REVIEW.md',
    ]) },
    evidence: { required: ['literature', 'ideas', 'novelty'] },
    parameters: { sources: ['local', 'web'], max_literature_items: 20, require_literature_evidence: true },
    sideEffects: ['network-literature-search'],
  },
  'idea-creator': {
    key: 'idea-creator',
    family: 'discovery',
    publicCommand: 'gsd-ljx-idea-creator',
    promptPack: 'ideaCreatorDeep',
    defaultMode: 'insert',
    defaultPhaseTitle: 'Research idea creation',
    defaultPhaseGoal: 'Generate research ideas through Auto/ARIS prompts compiled into ordinary GSD planning guidance.',
    artifacts: { required: withIndex(['research/literature/LITERATURE_EVIDENCE.md', 'research/ideas/IDEA_REPORT.md']) },
    evidence: { required: ['literature', 'ideas'] },
    parameters: { sources: ['local', 'web'], max_literature_items: 20 },
    sideEffects: ['network-literature-search'],
  },
  'novelty-check': {
    key: 'novelty-check',
    family: 'discovery',
    publicCommand: 'gsd-ljx-novelty-check',
    promptPack: 'noveltyCheckDeep',
    defaultMode: 'insert',
    defaultPhaseTitle: 'Research novelty check',
    defaultPhaseGoal: 'Check novelty through literature-grounded comparison inside ordinary GSD phase execution.',
    artifacts: { required: withIndex(['research/literature/LITERATURE_EVIDENCE.md', 'research/novelty/NOVELTY_REVIEW.md']) },
    evidence: { required: ['literature', 'novelty'] },
    parameters: { sources: ['local', 'web'], novelty_threshold: 0.8 },
    sideEffects: ['network-literature-search'],
  },
  'research-review': {
    key: 'research-review',
    family: 'discovery',
    publicCommand: 'gsd-ljx-research-review',
    promptPack: 'researchReviewDeep',
    defaultMode: 'insert',
    defaultPhaseTitle: 'Research review',
    defaultPhaseGoal: 'Review a research proposal with Auto/ARIS critique prompts while preserving GSD review and verification gates.',
    artifacts: { required: withIndex(['research/review/REVIEW_REPORT.md']) },
    evidence: { required: ['review'] },
    parameters: { review_difficulty: 'hard', max_review_rounds: 3 },
    sideEffects: ['external-reviewer-optional'],
  },
  'research-refine': {
    key: 'research-refine',
    family: 'discovery',
    publicCommand: 'gsd-ljx-research-refine',
    promptPack: 'researchRefineDeep',
    defaultMode: 'insert',
    defaultPhaseTitle: 'Research refinement',
    defaultPhaseGoal: 'Refine a research idea through bounded review iterations compiled into ordinary GSD tasks and evidence artifacts.',
    artifacts: { required: withIndex(['research/refine/REFINE_STATE.json', 'research/refine/FINAL_PROPOSAL.md']) },
    evidence: { required: ['review', 'refinement'] },
    parameters: { max_review_rounds: 5, score_threshold: 9 },
    sideEffects: ['external-reviewer-optional'],
  },
  'research-refine-pipeline': {
    key: 'research-refine-pipeline',
    family: 'discovery',
    publicCommand: 'gsd-ljx-research-refine-pipeline',
    promptPack: 'researchRefinePipelineDeep',
    defaultMode: 'insert',
    defaultPhaseTitle: 'Research refinement pipeline',
    defaultPhaseGoal: 'Run literature, review, and refinement prompt packs as one ordinary GSD phase with plan-level decomposition.',
    artifacts: { required: withIndex([
      'research/literature/LITERATURE_EVIDENCE.md',
      'research/refine/REFINE_STATE.json',
      'research/refine/FINAL_PROPOSAL.md',
    ]) },
    evidence: { required: ['literature', 'review', 'refinement'] },
    parameters: { sources: ['local', 'web'], max_review_rounds: 5, score_threshold: 9 },
    sideEffects: ['network-literature-search', 'external-reviewer-optional'],
  },
  'research-pipeline': {
    key: 'research-pipeline',
    family: 'discovery',
    publicCommand: 'gsd-ljx-research-pipeline',
    promptPack: 'researchPipelineDeep',
    defaultMode: 'research-first',
    defaultPhaseTitle: 'Research pipeline',
    defaultPhaseGoal: 'Create a research-first GSD roadmap using integer phases and Auto/ARIS prompt obligations.',
    artifacts: { required: withIndex(['research/literature/LITERATURE_EVIDENCE.md', 'research/ideas/IDEA_REPORT.md']) },
    evidence: { required: ['literature', 'ideas', 'review'] },
    parameters: { sources: ['local', 'web'], max_literature_items: 20, max_review_rounds: 3 },
    sideEffects: ['network-literature-search', 'external-reviewer-optional'],
  },
};

function getResearchCommand(command) {
  const key = String(command || '').trim();
  const entry = RESEARCH_COMMANDS[key];
  if (!entry) {
    throw new Error(`Unknown research command: ${key}`);
  }
  return {
    ...entry,
    artifacts: { required: [...entry.artifacts.required] },
    evidence: { required: [...entry.evidence.required] },
    parameters: { ...(entry.parameters || {}) },
    sideEffects: [...(entry.sideEffects || [])],
  };
}

module.exports = {
  DISCOVERY_COMMAND_KEYS,
  INDEX_ARTIFACT,
  RESEARCH_COMMANDS,
  getResearchCommand,
};
