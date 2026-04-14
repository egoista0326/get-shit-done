<purpose>
Compile an Auto/ARIS research command into ordinary GSD phase guidance while preserving GSD lifecycle ownership.
</purpose>

<process>

## Step 1: Identify Research Command

Read the invoking command file and extract:

```text
research command key: <command-key>
```

The key must be one of the supported `/gsd-ljx-*` research command keys.

## Step 2: Capture Intent Safely

Do not place raw user arguments directly into a shell command. Store them as inert text first, then pass the file path to the compiler.

```bash
mkdir -p .planning/.tmp
INTENT_FILE="$(mktemp .planning/.tmp/gsd-ljx-research-intent.XXXXXX)"
trap 'rm -f "$INTENT_FILE"' EXIT
cat > "$INTENT_FILE" <<'GSD_RESEARCH_INTENT'
$ARGUMENTS
GSD_RESEARCH_INTENT
```

## Step 3: Compile Research Intent

Run the bounded research compiler with the intent file:

```bash
node get-shit-done/bin/gsd-tools.cjs research compile "$RESEARCH_COMMAND_KEY" --intent-file "$INTENT_FILE" --dry-run
rm -f "$INTENT_FILE"
trap - EXIT
```

If the user selected a preset, pass it with `--preset safe`, `--preset auto`, or `--preset danger-auto`.
If the command is a research-first pipeline, pass `--mode research-first`; otherwise use `--mode insert`.

## Step 4: Route Through GSD Lifecycle

Use the compiled phase title, goal, prompt pack, required artifacts, evidence requirements, and gate policy as ordinary GSD phase/context/plan guidance.

For an existing roadmap, use GSD insert phase semantics:

```bash
node get-shit-done/bin/gsd-tools.cjs phase insert "$CURRENT_PHASE" "$COMPILED_PHASE_TITLE"
```

For a research-first pipeline, create ordinary integer GSD roadmap phases during the normal GSD project or milestone planning flow.

## Hard Boundaries

- Do not directly write `ROADMAP.md`.
- Do not directly write `STATE.md`.
- Do not create a second roadmap, second state file, typed phase metadata, or typed phase routing.
- Do not execute external side effects from this command layer: no GPU, W&B, SSH, paid compute, push, PR, publication, destructive cleanup, or credentialed external mutation.
- Treat `research/RESEARCH_INDEX.md` as a phase-local artifact index, not lifecycle state.

</process>

<success_criteria>
- Research command intent compiled through `gsd-tools research compile`.
- Existing-roadmap work routes through GSD phase insert semantics.
- Research-first work uses ordinary integer GSD roadmap planning.
- Auto/ARIS behavior remains prompt/config/artifact/evidence guidance only.
</success_criteria>
