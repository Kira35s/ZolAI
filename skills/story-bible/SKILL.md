---
name: story-bible
description: "Build and maintain the persistent knowledge base of a book — characters, places, lore, and timeline for fiction, or thesis/argument map and sources for non-fiction. Use this skill whenever the user wants to develop a character, flesh out the world, track the timeline, define the rules of a magic/tech system, map out their argument, or keep facts consistent. Trigger for \"let's develop the protagonist\", \"what's the world like\", \"build the lore\", \"map my argument\", \"keep track of who's who\". Everything it records becomes the canon that chapter writing and continuity checks rely on."
---

# Story Bible

The living canon of the book. A 300-page manuscript stays coherent only if there's
a single place that remembers eye colors, who knows what when, the rules of the
world, or the logical spine of an argument. That place is `.book/bible/`.

## Memory
Read the orchestrator's `references/memory-spec.md`. This skill owns `.book/bible/`.
One file per entity keeps things modular and lets `chapter-writer` load only what a
scene needs.

## Fiction mode
Maintain, as the project grows:
- `characters/<nom>.md` — role, want vs. need, voice, physical traits, arc,
  relationships, secrets, what they know and when. See
  `references/character-template.md`.
- `places/<nom>.md` — sensory identity, function in the story, who's associated.
- `lore.md` — rules of the world (magic, tech, politics, social order). Rules must
  be consistent; note their costs and limits, that's where stories break.
- `timeline.md` — ordered events, including off-page backstory, so causality holds.

## Non-fiction mode
- `argument-map.md` — central thesis, sub-arguments in logical order, the evidence
  each rests on, anticipated objections.
- `sources.md` — references and claims to verify. Flag anything asserted but not yet
  sourced so it doesn't slip into the manuscript unchecked.
- `glossary.md` — key terms used consistently throughout.

## Working style
Develop interactively — propose options for a character's flaw or an argument's
framing, let the user choose, then record. Don't invent canon wholesale and present
it as fixed; co-create it. When a new fact contradicts existing canon, surface the
conflict instead of silently overwriting, and log the resolution in `decisions.md`.

## Output
Update the relevant bible files, refresh `state.json`, commit as
"bible: <what changed>". Keep entries tight and scannable — they're reference cards,
not essays.
