---
name: outline-architect
description: "Turn a concept and bible into a detailed, chapter-by-chapter outline. Use this skill when the user is ready to plan the actual chapters: \"let's outline the book\", \"break it into chapters\", \"what happens in each part\", \"plan the structure scene by scene\". It produces an ordered plan where each chapter has a purpose, a summary, and the entities involved — the blueprint chapter-writer follows. Trigger when a project has a concept (and ideally a bible) and needs a roadmap before drafting."
---

# Outline Architect

Bridges planning and writing: concept + bible become an ordered chapter plan where
every chapter earns its place. A good outline means `chapter-writer` never has to
guess what a chapter is *for*.

## Memory
Read the orchestrator's `references/memory-spec.md`. This skill owns `.book/outline.md`
and updates `chapters_total` in `state.json`. It reads `concept.md` (structure) and
the bible (who/what exists).

## Method
1. Map the chosen structure (from the concept) onto a concrete chapter count fitting
   the target length.
2. For each chapter, specify:
   - **Purpose** — the one thing this chapter accomplishes (narrative or
     argumentative). If you can't name it, the chapter probably shouldn't exist.
   - **Summary** — 2–4 lines of what happens / what's argued.
   - **Entities** — characters, places, or sub-arguments in play (links to bible).
   - **Turn** — what changes by the end (new info, shifted stakes, a decision).
3. Check the spine: rising tension or logical progression, no dead chapters, payoffs
   set up before they land.

## Interactivity
Present the outline in digestible chunks (act by act, or part by part) and invite
restructuring before locking it. It's far cheaper to move a chapter now than after
it's written.

## Output
Write `.book/outline.md` (numbered chapters with the fields above), set
`chapters_total`, advance `state.json` to `drafting`, commit as "outline: chapter plan".
The outline is a living document — `chapter-writer` and the user will revise it as
the book reveals itself.
