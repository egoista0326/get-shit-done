---
name: gsd-ljx-research-pipeline
description: GSD LJX research-first pipeline
argument-hint: "[research program]"
allowed-tools:
  - Read
  - Bash
---

<objective>
GSD LJX research-first pipeline. This is an Auto/ARIS research overlay command that compiles prompt, config, artifact, and evidence obligations into ordinary GSD lifecycle guidance.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/gsd-ljx-research-command.md
</execution_context>

<context>
research command key: research-pipeline
public command: /gsd-ljx-research-pipeline
Arguments: $ARGUMENTS
</context>

<process>
Execute the shared research workflow from @~/.claude/get-shit-done/workflows/gsd-ljx-research-command.md end-to-end.
Do not create independent lifecycle state, do not add typed phase metadata, and do not bypass GSD phase/plan/verify ownership.
</process>
