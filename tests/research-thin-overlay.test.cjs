'use strict';

const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');
const commandsDir = path.join(repoRoot, 'commands', 'gsd');

const expectedCommands = [
  'ljx-research-lit',
  'ljx-idea-creator',
  'ljx-novelty-check',
  'ljx-research-review',
  'ljx-research-refine',
  'ljx-research-refine-pipeline',
  'ljx-idea-discovery',
  'ljx-research-pipeline',
  'ljx-experiment-plan',
  'ljx-experiment-bridge',
  'ljx-run-experiment',
  'ljx-monitor-experiment',
  'ljx-analyze-results',
  'ljx-experiment-audit',
  'ljx-auto-review-loop',
  'ljx-result-to-claim',
  'ljx-claim-gate',
  'ljx-ablation-planner',
  'ljx-paper-plan',
  'ljx-paper-write',
  'ljx-paper-compile',
  'ljx-paper-improve',
  'ljx-rebuttal-plan',
  'ljx-rebuttal-draft',
  'ljx-training-check',
];

function readCommand(name) {
  return fs.readFileSync(path.join(commandsDir, `${name}.md`), 'utf8');
}

function readCommandBody(name) {
  return readCommand(name).replace(/^---\n[\s\S]*?\n---\n/, '');
}

function legacyResearchLib(suffix) {
  return path.join('get-shit-done/bin/lib', `${['research', suffix].join('-')}.cjs`);
}

function assertIncludes(content, needle, label) {
  assert.ok(content.includes(needle), `${label} should include ${needle}`);
}

describe('Phase 08.1 thin research overlay', () => {
  test('uses ljx source files with gsd frontmatter names', () => {
    const commandFiles = fs.readdirSync(commandsDir)
      .filter(file => file.endsWith('.md'))
      .sort();

    assert.deepStrictEqual(
      commandFiles.filter(file => file.startsWith('gsd-ljx-')),
      [],
      'old compiler-route gsd-ljx source wrappers should not exist'
    );

    for (const name of expectedCommands) {
      const file = `${name}.md`;
      assert.ok(commandFiles.includes(file), `${file} should exist`);
      assert.match(readCommand(name), new RegExp(`^name:\\s+gsd:${name}$`, 'm'));
    }
  });

  test('old research runtime files are absent and dispatcher has no old research routes', () => {
    const removedPaths = [
      legacyResearchLib('command-map'),
      legacyResearchLib('compiler'),
      legacyResearchLib('config'),
      legacyResearchLib('evidence'),
      legacyResearchLib('index'),
      legacyResearchLib('phase-render'),
      legacyResearchLib('prompt-packs'),
      legacyResearchLib('side-effects'),
      path.join('get-shit-done/workflows', `${['gsd', 'ljx', 'research', 'command.md'].join('-')}`),
      '.planning/research.config.json',
    ];

    for (const relativePath of removedPaths) {
      assert.ok(!fs.existsSync(path.join(repoRoot, relativePath)), `${relativePath} should not exist`);
    }

    const dispatcher = fs.readFileSync(path.join(repoRoot, 'get-shit-done', 'bin', 'gsd-tools.cjs'), 'utf8');
    assert.doesNotMatch(dispatcher, /case 'research':/);
    assert.doesNotMatch(dispatcher, /cmdResearch/);
  });

  test('preserves research-native semantics that GSD does not already provide', () => {
    const novelty = readCommand('ljx-novelty-check');
    assertIncludes(novelty, 'Score: X/10', 'novelty check');
    assertIncludes(novelty, 'closest prior work', 'novelty check');
    assertIncludes(novelty, 'PROCEED WITH CAUTION', 'novelty check');
    assertIncludes(novelty, 'source URL, DOI, arXiv id', 'novelty source discipline');
    assertIncludes(novelty, 'venue or preprint status', 'novelty source discipline');
    assertIncludes(novelty, 'Mark uncertain or missing metadata as unresolved', 'novelty source discipline');
    assertIncludes(novelty, 'State search/source limitations', 'novelty source discipline');

    const loop = readCommand('ljx-auto-review-loop');
    assertIncludes(loop, 'Maximum review rounds: 30', 'auto review loop');
    assertIncludes(loop, 'two consecutive clean rounds', 'auto review loop');
    assertIncludes(loop, 'non-minor findings', 'auto review loop');
    assertIncludes(loop, 'positive assessment', 'auto review loop');
    assertIncludes(loop, 'not-ready', 'auto review loop');
    assertIncludes(loop, 'Save the FULL raw response', 'auto review loop');
    assertIncludes(loop, 'research/claims/RESULT_TO_CLAIM.md', 'auto review loop claim handoff');
    assertIncludes(loop, 'research/claims/CLAIM_GATE.md', 'auto review loop claim handoff');

    const claim = readCommand('ljx-result-to-claim');
    assertIncludes(claim, 'yes | partial | no | unsupported', 'result to claim');
    assertIncludes(claim, 'integrity_status: pass | warn | fail | unavailable', 'result to claim');
    assertIncludes(claim, 'provisional', 'result to claim');
    assertIncludes(claim, 'Do not inflate claims beyond what the data supports', 'result to claim');
    assertIncludes(claim, '/gsd-ljx-claim-gate', 'result to claim gate routing');
    assertIncludes(claim, 'Route every `claim_supported` verdict to `/gsd-ljx-claim-gate`', 'result to claim gate routing');
    assertIncludes(claim, 'RESULT_TO_CLAIM.md` alone', 'result to claim gate routing');

    const claimGate = readCommand('ljx-claim-gate');
    assertIncludes(claimGate, 'GO', 'claim gate');
    assertIncludes(claimGate, 'NARROW', 'claim gate');
    assertIncludes(claimGate, 'MORE_EVIDENCE', 'claim gate');
    assertIncludes(claimGate, 'NO_CLAIM', 'claim gate');
    assertIncludes(claimGate, 'CLAIM_GATE.json', 'claim gate');
    assertIncludes(claimGate, 'normal_workflow_ready', 'claim gate');
    assertIncludes(claimGate, '`GO` requires `claim_supported: yes`', 'claim gate support invariant');
    assertIncludes(claimGate, '`NARROW` requires `claim_supported: yes` or evidence-matched `partial`', 'claim gate support invariant');
    assertIncludes(claimGate, '`claim_supported: no` or `unsupported` routes to `NO_CLAIM`', 'claim gate support invariant');
    assertIncludes(claimGate, 'For paper, rebuttal, release, or public-summary use, `GO` and `NARROW` both require `integrity_status: pass`', 'claim gate integrity');
    assertIncludes(claimGate, '`warn`, `fail`, or `unavailable` integrity routes to `MORE_EVIDENCE` or `NO_CLAIM`', 'claim gate integrity');

    const audit = readCommand('ljx-experiment-audit');
    for (const required of ['raw evidence', 'missing evidence', 'claim impact', 'threats to validity']) {
      assertIncludes(audit, required, 'experiment audit');
    }
    assert.doesNotMatch(audit, /Never block/, 'experiment audit should not turn blocking integrity gaps into warning-only flow');
    assertIncludes(audit, '`FAIL` blocks downstream claim progression', 'experiment audit blocking verdict');
    assertIncludes(audit, '`WARN` records non-blocking integrity risk', 'experiment audit warning verdict');
    assertIncludes(audit, 'EXPERIMENT_AUDIT.json', 'experiment audit');
    assertIncludes(audit, 'integrity_status', 'experiment audit');
    for (const label of ['real_gt', 'synthetic_proxy', 'self_supervised_proxy', 'simulation_only', 'human_eval']) {
      assertIncludes(audit, label, 'experiment audit labels');
    }

    const analysis = readCommand('ljx-analyze-results');
    assertIncludes(analysis, '/gsd-ljx-experiment-audit', 'analyze results audit handoff');
    assertIncludes(analysis, 'before `/gsd-ljx-result-to-claim`', 'analyze results audit handoff');

    const refine = readCommand('ljx-research-refine');
    assertIncludes(refine, 'independent `/gsd-ljx-research-review`', 'research refine');
    assertIncludes(refine, 'raw reviewer response', 'research refine');

    const review = readCommand('ljx-research-review');
    assertIncludes(review, 'claim-affecting research review findings', 'research review claim handoff');
    assertIncludes(review, '/gsd-ljx-result-to-claim', 'research review claim handoff');
    assertIncludes(review, '/gsd-ljx-claim-gate', 'research review claim handoff');

    const refinePipeline = readCommand('ljx-research-refine-pipeline');
    assertIncludes(refinePipeline, 'preliminary roadmap', 'research refine pipeline handoff');
    assertIncludes(refinePipeline, '/gsd-ljx-experiment-plan', 'research refine pipeline handoff');
    assertIncludes(refinePipeline, 'formal execution requires `research/experiments/EXPERIMENT_PLAN.md`, `research/experiments/CLAIM_MAP.md`, `research/experiments/EXPERIMENT_TRACKER.md`, and `research/experiments/RISK_BUDGET.md`', 'research refine pipeline handoff');
    assertIncludes(refinePipeline, 'research/experiments/CLAIM_MAP.md', 'research refine pipeline handoff');
    assertIncludes(refinePipeline, 'research/experiments/RISK_BUDGET.md', 'research refine pipeline handoff');
    assertIncludes(refinePipeline, 'Do not treat `research/refine/EXPERIMENT_PLAN.md` as execution-ready', 'research refine pipeline handoff');

    const experimentPlan = readCommand('ljx-experiment-plan');
    assertIncludes(experimentPlan, 'research/refine/EXPERIMENT_PLAN.md', 'experiment plan refine handoff');
    assertIncludes(experimentPlan, 'research/refine/EXPERIMENT_TRACKER.md', 'experiment plan refine handoff');
    assertIncludes(experimentPlan, 'research/refine/PIPELINE_SUMMARY.md', 'experiment plan refine handoff');

    const literature = readCommand('ljx-research-lit');
    assertIncludes(literature, '/gsd-add-phase <research description>', 'literature phase creation');
    assertIncludes(literature, '/gsd-discuss-phase <phase>', 'literature phase discussion');
    assertIncludes(literature, 'Record source paths, URLs, arXiv ids, titles, authors, years, and access dates', 'literature source discipline');
    assertIncludes(literature, 'Use at least three query formulations', 'literature source discipline');
    assertIncludes(literature, 'Deduplicate by arXiv id, DOI, title, and first author', 'literature source discipline');
    assertIncludes(literature, 'Never invent citations. Mark uncertain metadata as unresolved.', 'literature source discipline');
    assertIncludes(literature, 'Distinguish between peer-reviewed and preprints', 'literature source discipline');
    assertIncludes(literature, 'research/SEARCH_LOG.md', 'literature source discipline');
    assertIncludes(literature, '`Paper`, `Venue`, `Method`, `Key Result`, `Relevance to Us`, and `Source`', 'literature source discipline');

    const paperPlan = readCommand('ljx-paper-plan');
    assertIncludes(paperPlan, 'claims-evidence matrix', 'paper plan');
    assertIncludes(paperPlan, 'if `CLAIM_GATE.md` is missing, run `/gsd-ljx-claim-gate`', 'paper plan claim gate');
    assertIncludes(paperPlan, 'plan positive paper claims only for `GO` or evidence-matched `NARROW`', 'paper plan claim gate');
    assertIncludes(paperPlan, '`normal_workflow_ready: true` and `integrity_status: pass`', 'paper plan claim gate');
    assertIncludes(paperPlan, 'for `MORE_EVIDENCE` or `NO_CLAIM`, write blockers and next GSD routes', 'paper plan claim gate');
    assertIncludes(paperPlan, 'RESULT_TO_CLAIM.md` alone', 'paper plan claim gate');
    assertIncludes(paperPlan, 'PAPER_PLAN.md', 'paper plan');
    assertIncludes(paperPlan, 'citation plan', 'paper plan');
    assertIncludes(paperPlan, 'page budget', 'paper plan');

    const paperWrite = readCommand('ljx-paper-write');
    assertIncludes(paperWrite, 'CLAIM_TRACE.md', 'paper write');
    assertIncludes(paperWrite, 'CITATION_CHECKLIST.md', 'paper write');
    assertIncludes(paperWrite, 'Do not invent results', 'paper write');
    assertIncludes(paperWrite, 'only when the claim gate is `GO` or inside the narrowed scope of `NARROW`', 'paper write claim gate');
    assertIncludes(paperWrite, 'if `CLAIM_GATE.md` is missing, block claim-bearing drafting and route back to `/gsd-ljx-claim-gate`', 'paper write missing claim gate');
    assertIncludes(paperWrite, '`normal_workflow_ready: true` and `integrity_status: pass`', 'paper write claim gate');
    assertIncludes(paperWrite, 'route `MORE_EVIDENCE` and `NO_CLAIM` items back to claim-gate follow-up work', 'paper write claim gate');

    const paperCompile = readCommand('ljx-paper-compile');
    assertIncludes(paperCompile, 'COMPILE_REPORT.md', 'paper compile');
    assertIncludes(paperCompile, 'Compile locally only', 'paper compile');
    assertIncludes(paperCompile, 'Do not upload or submit the PDF', 'paper compile');

    const paperImprove = readCommand('ljx-paper-improve');
    assertIncludes(paperImprove, 'Default maximum improvement rounds: 2', 'paper improve');
    assertIncludes(paperImprove, 'full raw reviewer response', 'paper improve');
    assertIncludes(paperImprove, 'PAPER_IMPROVEMENT_LOG.md', 'paper improve');
    assertIncludes(paperImprove, 'require `research/claims/CLAIM_GATE.md`', 'paper improve claim gate');
    assertIncludes(paperImprove, '/gsd-ljx-claim-gate', 'paper improve claim gate');

    const rebuttalPlan = readCommand('ljx-rebuttal-plan');
    assertIncludes(rebuttalPlan, 'REVIEWS_RAW.md', 'rebuttal plan');
    assertIncludes(rebuttalPlan, 'ISSUE_BOARD.md', 'rebuttal plan');
    assertIncludes(rebuttalPlan, 'STRATEGY_PLAN.md', 'rebuttal plan');
    assertIncludes(rebuttalPlan, 'research/claims/CLAIM_GATE.md', 'rebuttal plan claim gate');
    assertIncludes(rebuttalPlan, '/gsd-ljx-claim-gate', 'rebuttal plan claim gate');
    assertIncludes(rebuttalPlan, 'Only `GO` or evidence-matched `NARROW` can support rebuttal claims', 'rebuttal plan claim gate');
    assertIncludes(rebuttalPlan, '`normal_workflow_ready: true` and `integrity_status: pass`', 'rebuttal plan claim gate');
    assertIncludes(rebuttalPlan, '`MORE_EVIDENCE` and `NO_CLAIM` must be recorded as blocked claims', 'rebuttal plan claim gate');
    assertIncludes(rebuttalPlan, 'every reviewer concern', 'rebuttal plan');

    const rebuttalDraft = readCommand('ljx-rebuttal-draft');
    assertIncludes(rebuttalDraft, 'provenance, commitment, and coverage', 'rebuttal draft');
    assertIncludes(rebuttalDraft, 'PASTE_READY.txt', 'rebuttal draft');
    assertIncludes(rebuttalDraft, 'SAFETY_CHECK.md', 'rebuttal draft');
    assertIncludes(rebuttalDraft, 'research/claims/CLAIM_GATE.md', 'rebuttal draft claim gate');
    assertIncludes(rebuttalDraft, '/gsd-ljx-claim-gate', 'rebuttal draft claim gate');
    assertIncludes(rebuttalDraft, 'only when the gate is `GO` or inside the narrowed scope of `NARROW`', 'rebuttal draft claim gate');
    assertIncludes(rebuttalDraft, '`normal_workflow_ready: true` and `integrity_status: pass`', 'rebuttal draft claim gate');
    assertIncludes(rebuttalDraft, 'route `MORE_EVIDENCE` and `NO_CLAIM` to blockers', 'rebuttal draft claim gate');
    assertIncludes(rebuttalDraft, 'SAFETY_CHECK.md` must record the gate status', 'rebuttal draft claim gate');
    assertIncludes(rebuttalDraft, 'Do not invent experiments', 'rebuttal draft');
  });

  test('slash-command orchestrators declare SlashCommand permission', () => {
    for (const name of expectedCommands) {
      const content = readCommand(name);
      const body = readCommandBody(name);
      if (!body.includes('/gsd')) {
        continue;
      }
      assert.match(content, /^  - SlashCommand$/m, `${name} should be allowed to invoke GSD handoff commands`);
    }
  });

  test('external experiment commands require explicit authorization', () => {
    for (const name of ['ljx-experiment-bridge', 'ljx-run-experiment', 'ljx-monitor-experiment', 'ljx-training-check']) {
      const content = readCommand(name).toLowerCase();
      assert.match(content, /explicit|authorization|authorized/, `${name} should require authorization`);
      assert.match(content, /paid|remote|ssh|w&b|wandb|external/, `${name} should mention external resources`);
    }
  });

  test('paper and rebuttal external publication actions require explicit authorization', () => {
    const paperWrite = readCommand('ljx-paper-write');
    assertIncludes(paperWrite, 'Do not submit, upload, publish, or contact external systems without explicit user authorization', 'paper write external boundary');

    const rebuttalDraft = readCommand('ljx-rebuttal-draft');
    assertIncludes(rebuttalDraft, 'Do not upload a revised PDF or mutate venue systems without explicit user authorization', 'rebuttal draft external boundary');
  });

  test('intra-overlay handoffs use installed gsd-ljx invocation names', () => {
    for (const name of expectedCommands) {
      const body = readCommandBody(name);
      assert.doesNotMatch(
        body,
        /(?<!gsd-)ljx-[a-z0-9-]+/,
        `${name} body should not reference bare ljx-* commands`
      );
    }

    const pipeline = readCommand('ljx-research-pipeline');
    for (const gate of ['/gsd-code-review', '/gsd-verify-work', '/gsd-validate-phase', '/gsd-docs-update']) {
      assertIncludes(pipeline, gate, 'research pipeline GSD gates');
    }
    assertIncludes(pipeline, '/gsd-ljx-result-to-claim', 'research pipeline claim flow');
    assertIncludes(pipeline, '/gsd-ljx-claim-gate', 'research pipeline claim flow');
    assertIncludes(pipeline, '`GO` or `NARROW` with `normal_workflow_ready: true` and `integrity_status: pass`', 'research pipeline public claim gate');
    for (const command of [
      '/gsd-ljx-paper-plan',
      '/gsd-ljx-paper-write',
      '/gsd-ljx-paper-compile',
      '/gsd-ljx-paper-improve',
      '/gsd-ljx-rebuttal-plan',
      '/gsd-ljx-rebuttal-draft',
      '/gsd-ljx-ablation-planner',
    ]) {
      assertIncludes(pipeline, command, 'research pipeline post-claim routing');
    }
    assert.ok(
      pipeline.indexOf('/gsd-ljx-result-to-claim') < pipeline.indexOf('/gsd-ljx-claim-gate'),
      'research pipeline should gate claims after result-to-claim'
    );
    assert.ok(
      pipeline.indexOf('/gsd-ljx-claim-gate') < pipeline.indexOf('/gsd-ljx-paper-plan'),
      'research pipeline should route paper work after claim gate'
    );
  });
});
