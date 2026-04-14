/**
 * Research prompt packs — Auto/ARIS prompt obligations as data.
 */
'use strict';

const PACKS = {
  researchLitDeep: {
    key: 'researchLitDeep',
    sections: ['source selection', 'literature retrieval', 'reading notes', 'accepted and rejected papers'],
  },
  ideaDiscoveryDeep: {
    key: 'ideaDiscoveryDeep',
    sections: ['literature retrieval', 'idea generation', 'novelty comparison', 'review-ready evidence'],
  },
  ideaCreatorDeep: {
    key: 'ideaCreatorDeep',
    sections: ['literature-grounded ideation', 'candidate ranking', 'risk notes'],
  },
  noveltyCheckDeep: {
    key: 'noveltyCheckDeep',
    sections: ['literature comparison', 'novelty decision', 'missing evidence'],
  },
  researchReviewDeep: {
    key: 'researchReviewDeep',
    sections: ['independent critique', 'blocking issues', 'score and verdict'],
  },
  researchRefineDeep: {
    key: 'researchRefineDeep',
    sections: ['review loop', 'proposal refinement', 'stop predicate'],
  },
  researchRefinePipelineDeep: {
    key: 'researchRefinePipelineDeep',
    sections: ['literature retrieval', 'review loop', 'proposal refinement', 'final proposal', 'stop predicate', 'experiment-planning handoff'],
  },
  researchPipelineDeep: {
    key: 'researchPipelineDeep',
    sections: ['research-first roadmap', 'integer phase planning', 'evidence gates'],
  },
};

function getPromptPack(key) {
  const pack = PACKS[key];
  if (!pack) throw new Error(`Unknown research prompt pack: ${key}`);
  return { key: pack.key, sections: [...pack.sections] };
}

module.exports = { PACKS, getPromptPack };
