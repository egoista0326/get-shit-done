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

function assertIncludes(content, needle, label) {
  assert.ok(content.includes(needle), `${label} should include ${needle}`);
}

function assertOrdered(content, tokens, label) {
  let previous = -1;
  for (const token of tokens) {
    const current = content.indexOf(token);
    assert.ok(current !== -1, `${label} should include ${token}`);
    assert.ok(current > previous, `${label} should order ${token} after previous token`);
    previous = current;
  }
}

describe('Phase 09 idea-to-paper research lifecycle scenario', () => {
  test('thin overlay command set remains the scenario source of truth', () => {
    const commandFiles = fs.readdirSync(commandsDir)
      .filter(file => file.endsWith('.md'))
      .sort();

    assert.deepStrictEqual(
      commandFiles.filter(file => file.startsWith('gsd-ljx-')),
      [],
      'old source wrappers should not exist'
    );

    for (const name of expectedCommands) {
      const file = `${name}.md`;
      assert.ok(commandFiles.includes(file), `${file} should exist`);
      assert.match(readCommand(name), new RegExp(`^name:\\s+gsd:${name}$`, 'm'));
    }

    const removedPaths = [
      '.planning/research.config.json',
      'get-shit-done/bin/lib/research-command-map.cjs',
      'get-shit-done/bin/lib/research-compiler.cjs',
      'get-shit-done/bin/lib/research-config.cjs',
      'get-shit-done/bin/lib/research-evidence.cjs',
      'get-shit-done/bin/lib/research-index.cjs',
      'get-shit-done/bin/lib/research-phase-render.cjs',
      'get-shit-done/bin/lib/research-prompt-packs.cjs',
      'get-shit-done/bin/lib/research-side-effects.cjs',
      'get-shit-done/workflows/gsd-ljx-research-command.md',
    ];

    for (const relativePath of removedPaths) {
      assert.ok(!fs.existsSync(path.join(repoRoot, relativePath)), `${relativePath} should remain absent`);
    }
  });

  test('research lifecycle orders idea, experiment, claims, and paper gates', () => {
    const pipeline = readCommand('ljx-research-pipeline');

    assertOrdered(
      pipeline,
      [
        '/gsd-ljx-idea-discovery',
        '/gsd-ljx-research-refine-pipeline',
        '/gsd-ljx-experiment-plan',
        '/gsd-plan-phase',
        '/gsd-ljx-experiment-bridge',
        '/gsd-ljx-analyze-results',
        '/gsd-ljx-experiment-audit',
        '/gsd-ljx-result-to-claim',
        '/gsd-ljx-claim-gate',
      ],
      'research pipeline'
    );

    for (const gate of ['/gsd-code-review', '/gsd-verify-work', '/gsd-validate-phase', '/gsd-docs-update']) {
      assertIncludes(pipeline, gate, 'research pipeline GSD gate');
    }
    assertIncludes(
      pipeline,
      'A result-to-claim decision is not enough for public claims; run claim gate before paper or rebuttal routing.',
      'research pipeline claim gate rule'
    );
    assertIncludes(
      pipeline,
      '`GO` or `NARROW` with `normal_workflow_ready: true` and `integrity_status: pass`',
      'research pipeline public claim gate'
    );

    assertOrdered(
      pipeline,
      [
        '/gsd-ljx-claim-gate',
        '/gsd-ljx-paper-plan',
        '/gsd-ljx-paper-write',
        '/gsd-ljx-paper-compile',
        '/gsd-ljx-paper-improve',
      ],
      'research pipeline paper branch'
    );

    assertOrdered(
      pipeline,
      [
        '/gsd-ljx-claim-gate',
        '/gsd-ljx-rebuttal-plan',
        '/gsd-ljx-rebuttal-draft',
      ],
      'research pipeline rebuttal branch'
    );

    for (const reroute of ['/gsd-ljx-ablation-planner', '/gsd-ljx-experiment-plan', '/gsd-plan-phase']) {
      assertIncludes(pipeline, reroute, 'research pipeline more-evidence reroute');
    }
  });

  test('idea discovery cannot complete from context or state alone', () => {
    const ideaDiscovery = readCommand('ljx-idea-discovery');

    for (const step of [
      '/gsd-ljx-research-lit',
      '/gsd-ljx-idea-creator',
      '/gsd-ljx-novelty-check',
      '/gsd-ljx-research-review',
      '/gsd-ljx-research-refine-pipeline',
    ]) {
      assertIncludes(ideaDiscovery, step, 'idea discovery pipeline');
    }

    assertIncludes(
      ideaDiscovery,
      'No claim of completion from context/state text alone',
      'idea discovery completion boundary'
    );
    assertIncludes(
      ideaDiscovery,
      'Links to literature, novelty, review, and refinement artifacts.',
      'idea discovery completion evidence'
    );
    assertIncludes(
      ideaDiscovery,
      'preliminary refine roadmap/tracker links and the next route to `/gsd-ljx-experiment-plan`',
      'idea discovery preliminary experiment handoff'
    );
  });

  test('paper and rebuttal work require claim gate and local-only compile boundaries', () => {
    const paperPlan = readCommand('ljx-paper-plan');
    assertIncludes(
      paperPlan,
      'if `CLAIM_GATE.md` is missing, run `/gsd-ljx-claim-gate`',
      'paper plan claim gate'
    );
    assertIncludes(
      paperPlan,
      'plan positive paper claims only for `GO` or evidence-matched `NARROW`',
      'paper plan positive gate'
    );
    assertIncludes(
      paperPlan,
      '`normal_workflow_ready: true` and `integrity_status: pass`',
      'paper plan integrity gate'
    );
    assertIncludes(
      paperPlan,
      'for `MORE_EVIDENCE` or `NO_CLAIM`, write blockers and next GSD routes',
      'paper plan blocked gate'
    );
    assertIncludes(
      paperPlan,
      'Do not plan paper, rebuttal, release, or public-claim text from `RESULT_TO_CLAIM.md` alone',
      'paper plan result-to-claim boundary'
    );

    const paperWrite = readCommand('ljx-paper-write');
    for (const required of [
      'CLAIM_TRACE.md',
      'CITATION_CHECKLIST.md',
      'Do not invent results',
      'only when the claim gate is `GO` or inside the narrowed scope of `NARROW`',
      '`normal_workflow_ready: true` and `integrity_status: pass`',
      'route `MORE_EVIDENCE` and `NO_CLAIM` items back to claim-gate follow-up work',
      'Do not submit, upload, publish, or contact external systems without explicit user authorization',
    ]) {
      assertIncludes(paperWrite, required, 'paper write boundary');
    }

    const paperCompile = readCommand('ljx-paper-compile');
    for (const required of [
      'Compile locally only',
      'COMPILE_REPORT.md',
      'Do not upload or submit the PDF',
      'Do not claim scientific readiness from a clean build alone',
    ]) {
      assertIncludes(paperCompile, required, 'paper compile boundary');
    }

    for (const name of ['ljx-rebuttal-plan', 'ljx-rebuttal-draft']) {
      const content = readCommand(name);
      assertIncludes(content, 'research/claims/CLAIM_GATE.md', `${name} claim gate`);
      assertIncludes(content, '/gsd-ljx-claim-gate', `${name} claim gate`);
    }

    const rebuttalPlan = readCommand('ljx-rebuttal-plan');
    assertIncludes(
      rebuttalPlan,
      'Only `GO` or evidence-matched `NARROW` can support rebuttal claims',
      'rebuttal plan approving gate'
    );
    assertIncludes(
      rebuttalPlan,
      '`normal_workflow_ready: true` and `integrity_status: pass`',
      'rebuttal plan integrity gate'
    );
    assertIncludes(
      rebuttalPlan,
      '`MORE_EVIDENCE` and `NO_CLAIM` must be recorded as blocked claims',
      'rebuttal plan blocking gate'
    );

    const rebuttalDraft = readCommand('ljx-rebuttal-draft');
    assertIncludes(
      rebuttalDraft,
      'only when the gate is `GO` or inside the narrowed scope of `NARROW`',
      'rebuttal draft approving gate'
    );
    assertIncludes(
      rebuttalDraft,
      '`normal_workflow_ready: true` and `integrity_status: pass`',
      'rebuttal draft integrity gate'
    );
    assertIncludes(
      rebuttalDraft,
      'route `MORE_EVIDENCE` and `NO_CLAIM` to blockers',
      'rebuttal draft blocking gate'
    );

    assertIncludes(
      rebuttalDraft,
      'Do not upload a revised PDF or mutate venue systems without explicit user authorization',
      'rebuttal draft external boundary'
    );
  });
});
