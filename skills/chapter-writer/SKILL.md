---
name: chapter-writer
description: "Write or rewrite a single chapter of a book, in the project's locked voice, consistent with its bible and outline. Use this skill whenever the user wants to draft, write, continue, or revise a chapter or scene: \"write chapter 8\", \"draft the opening\", \"continue from where we left off\", \"rewrite this scene darker\". It loads the style charter, the relevant bible entries, the chapter's outline entry, and a rolling summary of prior chapters — then writes one unit at a time to avoid drift on long manuscripts. This is the workhorse skill for actually producing prose."
---

# Chapter Writer

The workhorse: it produces actual prose, one chapter at a time. Writing a whole book
in one pass guarantees drift — voice wanders, facts contradict, the context fills
with noise. Working chapter by chapter, with focused context, keeps quality high
across hundreds of pages.

## Memory
Read the orchestrator's `references/memory-spec.md`. This skill writes
`manuscript/<NN>-<slug>.md` and a matching `.book/summaries/<NN>-<slug>.md`.

## Context loading (the key discipline)
Before writing a chapter, load **only** what this chapter needs:
1. `.book/style-charter.md` — **always**. This is the voice. Non-negotiable.
2. The chapter's entry in `.book/outline.md` — its purpose, summary, turn.
3. The bible entries for the entities in play (those characters, those places) —
   not the whole bible.
4. The **previous chapter in full** (for seamless continuity of moment), plus the
   **rolling summaries** of earlier chapters from `.book/summaries/` (not their full
   text). This is what keeps context lean on a long book.
5. Recent `decisions.md` entries that affect this chapter (e.g. a register shift).

## Writing
Write the chapter to fulfill its outlined purpose, in the charter's voice. Honor the
canon — a character only knows what the bible says they know at this point. Aim for
the chapter to *turn* (end somewhere different from where it started).

## Self-check against the charter
After drafting, verify the prose against the charter's measurable traits before
presenting it:
- Average sentence length within the charter's target range?
- Correct tense and POV throughout?
- None of the banned tics present?
- Registre consistent with the gold-standard paragraph?

If it drifts, revise before showing the user. This automated check is far more
reliable than trusting "I wrote it in the right style" — it's the guardrail that
keeps voice stable across the whole manuscript. See `references/self-check.md`.

## After the chapter
1. Write a ~5-line summary to `.book/summaries/` (used as rolling context for future
   chapters — this is what makes long books tractable).
2. If the chapter revealed or established new canon (a name, a fact, a place),
   update the bible so it stays the source of truth.
3. Increment `chapters_drafted`, set `next_action` to the following chapter, update
   `state.json`. Commit as "draft: chapter <NN> — <title>".

## Revising an existing chapter
Load the existing text plus the reason for the rewrite. Preserve what works; change
what the user asked. If the rewrite alters canon (a character now survives), update
the bible and `decisions.md` accordingly, and flag downstream chapters that may need
a continuity pass.
