---
name: book-concept
description: "Frame a new book project — genre, audience, premise, scope, and structure — before any writing begins. Use this skill when the user is starting a book and needs to clarify what it actually is: \"I have an idea for a book\", \"help me figure out my premise\", \"what structure should my novel use\", \"who is this book for\". It runs an interactive intake (proposing options rather than interrogating), then writes a concept sheet to memory that anchors every later phase. Works for both fiction and non-fiction."
---

# Book Concept

The framing phase. A fuzzy idea becomes a concrete brief that the rest of the system
builds on. Skipping this leads to drift later, so it's worth doing well — but keep it
light and conversational, not a form to fill out.

## Memory
Read the orchestrator's `references/memory-spec.md`. This skill owns
`.book/concept.md` and initializes `state.json`.

## Intake (interactive, option-led)
Work through these, proposing concrete choices the user can pick from rather than
asking open questions where possible:

1. **Fiction or non-fiction** — sets which bible variant comes later.
2. **Premise / thesis** — the one-sentence core. For fiction: the dramatic hook.
   For non-fiction: the central argument or promise to the reader.
3. **Audience** — who reads this, and what they want from it.
4. **Comparable works** — 2–3 titles that situate the project (tone, ambition,
   shelf). Useful shorthand for everyone downstream.
5. **Scope** — target length (novella ~30k, novel ~80–100k, essay, etc.) and
   rough chapter count.
6. **Structure** — propose a fitting skeleton from `references/structures.md`
   (three-act, hero's journey, thriller beats, argumentative essay, professional
   how-to, children's arc). Let the user adapt it.

## Output
Write `.book/concept.md` with: title (provisional), kind, premise/thesis, audience,
comps, target length, chosen structure, and a short "north star" note (what success
looks like). Update `state.json` (`phase: "style"` next, sensible `next_action`).
Log any notable choice in `decisions.md`. Commit as "concept: project brief".

Then hand back to the orchestrator, which will typically route to `style-studio`.
