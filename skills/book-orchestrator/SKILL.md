---
name: book-orchestrator
description: "Orchestrate the full book-writing workflow from idea to finished manuscript. Use this skill whenever the user wants to write a book, novel, essay, non-fiction work, or any long-form manuscript, OR when they resume an existing book project. This is the entry point that reads project state, tells the user where they are, proposes the next step, and routes to the right specialized skill (concept, style, bible, outline, chapter writing, continuity, export). Trigger it for phrases like \"I want to write a book\", \"let's continue my novel\", \"where are we on my book\", \"help me start a manuscript\", even if the user doesn't name a specific phase. Always start here rather than jumping straight into writing."
---

# Book Orchestrator

The conductor of the book-writing system. It never writes prose itself — it reads
the project state, orients the user, proposes the next step, and hands off to the
right specialized skill. Its job is continuity and interactivity: the user should
always feel the project remembers itself across sessions.

## Memory model

Read `references/memory-spec.md` first. The entire system persists state in a
`.book/` folder at the project root, versioned by git. This is non-negotiable —
every other skill depends on this convention.

## On every invocation

1. **Locate the project.** Look for `.book/state.json` from the working directory.
   - If found → this is a resume. Read `state.json`, `decisions.md` (recent
     entries), and report: current phase, % drafted, and the recorded
     `next_action`. Then propose continuing from there.
   - If not found → this is a new project. Confirm the working directory, then
     scaffold `.book/` from the template (see below) and route to `book-concept`.

2. **Propose, don't assume.** Present the next step and 1–2 alternatives, then wait
   for the user to choose. The user drives; the orchestrator suggests.

3. **Route** to the skill matching the chosen phase (see routing table).

4. **After a sub-skill finishes**, re-read `state.json` and surface the new
   `next_action` so momentum carries to the next session.

## Scaffolding a new project

Create the `.book/` structure from `references/memory-spec.md`. Initialize
`state.json` with `phase: "concept"` and ask the user for a working title. If the
project is a git repo (or offer to `git init`), commit the scaffold as
"chore: initialize book project". Encourage committing after each phase so the
decision history is preserved.

If `.book/` already exists but its `state.json` shows `phase: "concept"` with a
title, author, and language already set, the install wizard (`setup.js`) likely
ran first — skip scaffolding and hand straight to `book-concept` to finish the
intake from there.

## Routing table

| Phase / user intent | Skill to invoke |
|---|---|
| New project, framing the idea | `book-concept` |
| Defining or revising the voice | `style-studio` |
| Building characters / world / argument map | `story-bible` |
| Turning concept + bible into a chapter plan | `outline-architect` |
| Writing or rewriting a chapter | `chapter-writer` |
| Getting reader-style feedback on a drafted chapter | `beta-reader` |
| Polishing dialogue / checking characters sound distinct | `dialogue-coach` |
| Checking consistency across the manuscript | `continuity-editor` |
| Assembling the final .docx / .pdf / EPUB | `manuscript-export` |

A healthy default order is: concept → style → bible → outline → drafting (loop with
beta-reader, dialogue-coach, and continuity passes) → export. But honor the user's
wishes — they may want to draft a sample chapter before fully building the bible,
and that's fine. When you deviate from the canonical order, note it so expectations
stay clear.

## Interactivity principle (applies system-wide)

Every skill in this collection proposes options and waits for confirmation before
writing structural decisions to memory. Where a tappable/option UI is available,
prefer offering 2–4 concrete choices over open-ended questions — it's faster for
the user and produces cleaner decisions to record.

## When the user seems lost (applies system-wide)

If the user signals confusion — "I don't know", "I'm lost", "what does that
mean", a one-word non-answer, or just stalling — don't just repeat the question.
Restate, in plain language, where the project stands and why this particular
question matters right now, then offer one reasonable default they can simply
accept instead of having to decide from scratch ("if you're not sure, I'd go
with X — want me to run with that?"). Let them take the default or redirect;
either way, note in `decisions.md` whether the choice was deliberate or a
default, so a later session can tell the difference.

This is the escape hatch for the interactivity principle above: still propose,
never assume — but make "just pick for me" a valid answer, not a dead end.

## Plain punctuation (applies system-wide)

Every skill writes plain, straight punctuation in anything that ends up in the
user's project — manuscript prose, `concept.md`, bible entries, `outline.md`,
`decisions.md`, critique notes, dialogue rewrites. Never the typographic
variants an editor or phone keyboard might auto-substitute:

- No em dashes (—) or en dashes (–). Rephrase, or use a comma, a colon, or a
  period instead.
- No curly/typographic quotation marks (" "  ' '). Use straight double (")
  and single (') quotes.
- No curly apostrophes ('). Use the straight apostrophe (').
- No non-breaking spaces (U+00A0). Use a regular space.
- No Unicode bullet characters (•, ‣, ▪, etc.) for lists. Use Markdown's plain
  list markers (`-` or `1.`) instead.

Check for these before saving or presenting content, the same way
`chapter-writer` checks prose against the style charter. This rule is about
character set, not voice — it applies regardless of how literary or casual
the locked style is.

## Keeping the user oriented

When resuming, lead with a short status line, e.g.:

> **"The Silver Tides"** — novel, phase *drafting*. 7/24 chapters written.
> Next planned step: chapter 8 (the confrontation at the harbor).
> Want to continue, or do something else?

Keep it warm and brief. The point is to make a long, multi-session project feel
coherent and alive.
