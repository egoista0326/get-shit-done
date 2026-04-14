const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { createTempProject, cleanup, runGsdTools } = require('./helpers.cjs');
const { initResearchIndex } = require('../get-shit-done/bin/lib/research-index.cjs');
const { checkResearchEvidence } = require('../get-shit-done/bin/lib/research-evidence.cjs');

function createPhase(tmp, phaseDir = '01-test-phase') {
  const dir = path.join(tmp, '.planning', 'phases', phaseDir);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function writeArtifact(phaseDir, relativePath, content) {
  const filePath = path.join(phaseDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${content}\n`);
}

describe('research evidence completeness', () => {
  test('idea-discovery is incomplete when literature, idea, and novelty evidence are absent', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    createPhase(tmp);

    try {
      const result = checkResearchEvidence(tmp, '01', 'idea-discovery');

      assert.equal(result.command, 'idea-discovery');
      assert.equal(result.status, 'incomplete');
      assert.equal(result.clean, false);
      assert.deepStrictEqual(result.missing.sort(), [
        'research/RESEARCH_INDEX.md',
        'research/ideas/IDEA_REPORT.md',
        'research/literature/LITERATURE_EVIDENCE.md',
        'research/novelty/NOVELTY_REVIEW.md',
      ].sort());
      assert.match(result.reason, /Missing required research evidence/);
    } finally {
      cleanup(tmp);
    }
  });

  test('skeleton RESEARCH_INDEX.md alone is not clean completion evidence', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    createPhase(tmp);

    try {
      initResearchIndex(tmp, '01', 'idea-discovery');
      const result = checkResearchEvidence(tmp, '01', 'idea-discovery');

      assert.equal(result.status, 'incomplete');
      assert.equal(result.clean, false);
      assert.equal(result.present.includes('research/RESEARCH_INDEX.md'), true);
      assert.equal(result.missing.includes('research/literature/LITERATURE_EVIDENCE.md'), true);
      assert.equal(result.missing.includes('research/ideas/IDEA_REPORT.md'), true);
      assert.equal(result.missing.includes('research/novelty/NOVELTY_REVIEW.md'), true);
    } finally {
      cleanup(tmp);
    }
  });

  test('idea-discovery is clean when all required phase-local evidence artifacts are present and non-empty', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    const phaseDir = createPhase(tmp);

    try {
      initResearchIndex(tmp, '01', 'idea-discovery');
      writeArtifact(phaseDir, 'research/literature/LITERATURE_EVIDENCE.md', 'sources: local, web\naccepted papers and reading notes');
      writeArtifact(phaseDir, 'research/ideas/IDEA_REPORT.md', 'candidate ideas and eliminations');
      writeArtifact(phaseDir, 'research/novelty/NOVELTY_REVIEW.md', 'novelty comparison against retained papers');

      const result = checkResearchEvidence(tmp, '01', 'idea-discovery');

      assert.equal(result.status, 'clean');
      assert.equal(result.clean, true);
      assert.deepStrictEqual(result.missing, []);
    } finally {
      cleanup(tmp);
    }
  });

  test('directories at required artifact paths block evidence completion', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    const phaseDir = createPhase(tmp);

    try {
      fs.mkdirSync(path.join(phaseDir, 'research', 'RESEARCH_INDEX.md'), { recursive: true });
      fs.mkdirSync(path.join(phaseDir, 'research', 'literature', 'LITERATURE_EVIDENCE.md'), { recursive: true });
      fs.mkdirSync(path.join(phaseDir, 'research', 'ideas', 'IDEA_REPORT.md'), { recursive: true });
      fs.mkdirSync(path.join(phaseDir, 'research', 'novelty', 'NOVELTY_REVIEW.md'), { recursive: true });

      const result = checkResearchEvidence(tmp, '01', 'idea-discovery');

      assert.equal(result.status, 'blocked');
      assert.equal(result.clean, false);
      assert.deepStrictEqual(result.present, []);
      assert.deepStrictEqual(result.blocked.sort(), [
        'research/RESEARCH_INDEX.md',
        'research/ideas/IDEA_REPORT.md',
        'research/literature/LITERATURE_EVIDENCE.md',
        'research/novelty/NOVELTY_REVIEW.md',
      ].sort());
      assert.deepStrictEqual(result.missing.sort(), [
        'research/RESEARCH_INDEX.md',
        'research/ideas/IDEA_REPORT.md',
        'research/literature/LITERATURE_EVIDENCE.md',
        'research/novelty/NOVELTY_REVIEW.md',
      ].sort());
    } finally {
      cleanup(tmp);
    }
  });

  test('symlinks escaping the phase directory return blocked evidence status', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    const phaseDir = createPhase(tmp);
    const outsidePath = path.join(tmp, 'outside-evidence.md');
    const artifactPath = path.join(phaseDir, 'research', 'literature', 'LITERATURE_EVIDENCE.md');

    try {
      fs.writeFileSync(outsidePath, 'outside evidence\n');
      initResearchIndex(tmp, '01', 'research-lit');
      fs.mkdirSync(path.dirname(artifactPath), { recursive: true });
      fs.symlinkSync(outsidePath, artifactPath);

      const result = checkResearchEvidence(tmp, '01', 'research-lit');

      assert.equal(result.status, 'blocked');
      assert.equal(result.clean, false);
      assert.equal(result.blocked.includes('research/literature/LITERATURE_EVIDENCE.md'), true);
      assert.equal(
        result.checked.find(item => item.path === 'research/literature/LITERATURE_EVIDENCE.md').invalidType,
        'path-escape'
      );
    } finally {
      cleanup(tmp);
    }
  });

  test('CLI research evidence-check returns incomplete status for missing idea-discovery evidence', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    createPhase(tmp);

    try {
      const result = runGsdTools(['research', 'evidence-check', '01', '--command', 'idea-discovery'], tmp);

      assert.equal(result.success, true, result.error);
      const parsed = JSON.parse(result.output);
      assert.equal(parsed.status, 'incomplete');
      assert.equal(parsed.clean, false);
    } finally {
      cleanup(tmp);
    }
  });

  test('research-review is incomplete without raw reviewer responses', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    const phaseDir = createPhase(tmp);

    try {
      initResearchIndex(tmp, '01', 'research-review');
      writeArtifact(phaseDir, 'research/review/REVIEW_REPORT.md', 'summary of reviewer findings');

      const result = checkResearchEvidence(tmp, '01', 'research-review');

      assert.equal(result.status, 'incomplete');
      assert.equal(result.clean, false);
      assert.equal(result.missing.includes('research/review/REVIEWS_RAW.md'), true);
    } finally {
      cleanup(tmp);
    }
  });

  test('research-refine is incomplete without upstream literature and idea context', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    const phaseDir = createPhase(tmp);

    try {
      initResearchIndex(tmp, '01', 'research-refine');
      writeArtifact(phaseDir, 'research/refine/REVIEW_EVIDENCE.md', 'raw reviewer response and score');
      writeArtifact(phaseDir, 'research/refine/REFINE_STATE.json', '{"round":1}');
      writeArtifact(phaseDir, 'research/refine/FINAL_PROPOSAL.md', 'refined proposal');

      const result = checkResearchEvidence(tmp, '01', 'research-refine');

      assert.equal(result.status, 'incomplete');
      assert.equal(result.clean, false);
      assert.equal(result.missing.includes('research/literature/LITERATURE_EVIDENCE.md'), true);
      assert.equal(result.missing.includes('research/ideas/IDEA_REPORT.md'), true);
    } finally {
      cleanup(tmp);
    }
  });

  test('research-refine is incomplete when review evidence lacks required refinement markers', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    const phaseDir = createPhase(tmp);

    try {
      initResearchIndex(tmp, '01', 'research-refine');
      writeArtifact(phaseDir, 'research/literature/LITERATURE_EVIDENCE.md', 'sources and reading notes');
      writeArtifact(phaseDir, 'research/ideas/IDEA_REPORT.md', 'candidate idea');
      writeArtifact(phaseDir, 'research/refine/REVIEW_EVIDENCE.md', 'generic review notes only');
      writeArtifact(phaseDir, 'research/refine/REFINE_STATE.json', '{"round":1}');
      writeArtifact(phaseDir, 'research/refine/FINAL_PROPOSAL.md', 'refined proposal');

      const result = checkResearchEvidence(tmp, '01', 'research-refine');

      assert.equal(result.status, 'incomplete');
      assert.equal(result.clean, false);
      assert.deepStrictEqual(result.incompleteContent, [
        {
          path: 'research/refine/REVIEW_EVIDENCE.md',
          missingMarkers: ['problem anchor', 'round logs', 'reviewer responses', 'score', 'verdict', 'stop predicate'],
        },
      ]);
    } finally {
      cleanup(tmp);
    }
  });

  test('research-refine-pipeline is incomplete when review evidence lacks required refinement markers', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    const phaseDir = createPhase(tmp);

    try {
      initResearchIndex(tmp, '01', 'research-refine-pipeline');
      writeArtifact(phaseDir, 'research/literature/LITERATURE_EVIDENCE.md', 'sources and reading notes');
      writeArtifact(phaseDir, 'research/ideas/IDEA_REPORT.md', 'candidate idea');
      writeArtifact(phaseDir, 'research/refine/REVIEW_EVIDENCE.md', 'generic review notes only');
      writeArtifact(phaseDir, 'research/refine/REFINE_STATE.json', '{"round":1}');
      writeArtifact(phaseDir, 'research/refine/FINAL_PROPOSAL.md', 'refined proposal');
      writeArtifact(phaseDir, 'research/refine/EXPERIMENT_HANDOFF.md', 'experiment metrics and protocol');

      const result = checkResearchEvidence(tmp, '01', 'research-refine-pipeline');

      assert.equal(result.status, 'incomplete');
      assert.equal(result.clean, false);
      assert.deepStrictEqual(result.incompleteContent, [
        {
          path: 'research/refine/REVIEW_EVIDENCE.md',
          missingMarkers: ['problem anchor', 'round logs', 'reviewer responses', 'score', 'verdict', 'stop predicate'],
        },
      ]);
    } finally {
      cleanup(tmp);
    }
  });

  test('research-refine is clean when review evidence contains refinement completion markers', () => {
    const tmp = createTempProject('gsd-research-evidence-');
    const phaseDir = createPhase(tmp);

    try {
      initResearchIndex(tmp, '01', 'research-refine');
      writeArtifact(phaseDir, 'research/literature/LITERATURE_EVIDENCE.md', 'sources and reading notes');
      writeArtifact(phaseDir, 'research/ideas/IDEA_REPORT.md', 'candidate idea');
      writeArtifact(phaseDir, 'research/refine/REVIEW_EVIDENCE.md', [
        'Problem Anchor: target problem',
        'Round Logs: round 1 changes',
        'Reviewer Responses: raw reviewer response',
        'Score: 9',
        'Verdict: accept',
        'Stop Predicate: score >= threshold and verdict accept',
      ].join('\n'));
      writeArtifact(phaseDir, 'research/refine/REFINE_STATE.json', '{"round":1}');
      writeArtifact(phaseDir, 'research/refine/FINAL_PROPOSAL.md', 'refined proposal');

      const result = checkResearchEvidence(tmp, '01', 'research-refine');

      assert.equal(result.status, 'clean');
      assert.equal(result.clean, true);
      assert.deepStrictEqual(result.incompleteContent, []);
    } finally {
      cleanup(tmp);
    }
  });
});
