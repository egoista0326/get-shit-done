---
name: gsd-ljx-research-review
description: GSD LJX research review
argument-hint: "[proposal or artifact]"
allowed-tools:
  - Read
  - Bash
---

<objective>
GSD LJX research review. This is an Auto/ARIS research overlay command that compiles prompt, config, artifact, and evidence obligations into ordinary GSD lifecycle guidance.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/gsd-ljx-research-command.md
</execution_context>

<context>
research command key: research-review
public command: /gsd-ljx-research-review
Arguments: $ARGUMENTS
</context>

<process>
Execute the shared research workflow from @~/.claude/get-shit-done/workflows/gsd-ljx-research-command.md end-to-end.
Do not create independent lifecycle state, do not add typed phase metadata, and do not bypass GSD phase/plan/verify ownership.
</process>
