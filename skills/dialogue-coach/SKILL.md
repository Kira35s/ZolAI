---
name: dialogue-coach
description: "Polish dialogue in a drafted scene or chapter — sharpen subtext, trim flat exposition-via-speech, and most importantly catch characters whose voices have started to sound interchangeable. Use this skill when the user wants dialogue specifically reviewed or punched up: \"check this dialogue\", \"does this conversation sound natural\", \"make this scene's dialogue snappier\", \"do these two characters sound too alike\", \"polish the dialogue in chapter 5\". Unlike beta-reader's broader reader reaction or chapter-writer's drafting, this skill's distinct job is checking every line against each speaker's bible voice profile and proposing concrete rewrites, not just questions."
---

# Dialogue Coach

Dialogue is its own craft, separate from narrative prose: the rhythm of an exchange,
what's left unsaid, and — the thing most likely to drift unnoticed on a long
manuscript — whether each character still sounds like themselves. This skill exists
for that specific gap: `chapter-writer` writes dialogue in the moment and
`beta-reader` reacts to a scene as a whole, but neither audits every speaker,
line by line, against their own voice profile.

## Memory
Read the orchestrator's `references/memory-spec.md`. This skill reads the target
`manuscript/<NN>-<slug>.md`, the `.book/bible/characters/*.md` entries for every
character who speaks in it (specifically their "Voix & présence" / way-of-speaking
fields), and `.book/style-charter.md` for the general voice. It edits the manuscript
only with the user's approval, and updates a character's bible entry if the session
sharpens or corrects their speech profile.

## Method
1. **Pull each speaker's voice profile** from the bible before reading a single
   line — rhythm, vocabulary, tics, what they leave unsaid. This is the yardstick
   everything else gets measured against.
2. **The blind test.** Read the dialogue with speaker tags covered (mentally strip
   "she said" / names) — can you tell who's talking from word choice and rhythm
   alone? Flag any two characters whose lines are interchangeable; this is the
   single most valuable thing this skill catches that nothing else in the system
   checks for.
3. **Craft pass**, watching for:
   - **On-the-nose dialogue** — characters stating exactly what they think or
     feel, with no subtext or evasion.
   - **Said-bookisms and adverb crutches** — "she said angrily" instead of
     letting word choice carry the emotion.
   - **Info-dumping** — exposition smuggled in as dialogue ("As you know, Bob...").
   - **Uniform rhythm** — every line roughly the same length and cadence
     regardless of character or the scene's emotional temperature.
   - **Dead air** — exchanges with no escalation, subtext shift, or stakes; lines
     that could be cut without losing anything.
   See `references/dialogue-craft.md` for the full checklist with examples.
4. **Propose concrete rewrites**, not just diagnosis. For the weakest lines, offer
   an alternative phrasing anchored to that character's established voice, and say
   why the original was weaker. Concrete alternatives do more work here than
   questions — dialogue problems are usually fixed by a better line, not a better
   question.

## Output
Group findings by what they reveal: voice-differentiation issues first (the
highest-value catch), then craft issues, each citing the line in question and a
proposed rewrite. Let the user accept, reject, or riff on each suggestion
individually — never batch-apply silently.

## After the session
Apply only the rewrites the user approved, directly to the manuscript file. If the
session sharpened or corrected how a character actually sounds, update their bible
entry's voice fields so future chapters start from the refined version, and log the
change in `decisions.md`. Skip `state.json` — like `beta-reader`, this is an
optional polish pass, not a phase change.
