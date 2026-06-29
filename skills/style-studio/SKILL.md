---
name: style-studio
description: "Define, propose, and lock in the writing voice for a book project. Use this skill whenever the user wants to choose a writing style, explore tones, hear how their book could sound, compare narrative voices, or revise an established style. It generates several distinct style samples on the same passage so the user can hear the differences, then captures the chosen voice as a persistent style charter that every other skill obeys. Trigger for phrases like \"what should this sound like\", \"show me some style options\", \"I want it more literary / punchier / warmer\", \"set the tone\", or whenever a book project reaches the style phase. The style charter it produces is the single source of truth for voice across the whole manuscript."
---

# Style Studio

Voice is what makes a book feel like *this* book and not a generic draft. This skill
turns a vague wish ("I want it atmospheric but not slow") into a concrete, reusable
**style charter** that every chapter obeys.

## Memory

Read the orchestrator's `references/memory-spec.md` for the `.book/` convention.
This skill owns `.book/style-charter.md`. It reads `concept.md` for genre and
audience context before proposing voices — including a "Style intent" section
if the install wizard (`setup.js`) captured one. Treat that as a starting hint
for the 3–4 voices below, not a finished charter; still generate real samples
and let the user react to them.

## Workflow

### 1. Gather a test passage
Pick a short, representative moment to render in different voices — ideally drawn
from the user's own outline or concept (a key scene, the opening, a turning point).
If nothing concrete exists yet, write one neutral paragraph that fits the genre and
use it as the constant across samples. Using the *same* passage every time is what
lets the user actually hear the difference between voices.

### 2. Research style-inspiring authors, if requested
Check `concept.md` for a "Style-inspiring authors" section. If it's there and
research was opted in, look into what's known about each author's work and
writing style — web search if you have one available, otherwise your own
knowledge of them — before generating samples. Extract concrete, usable traits
(sentence rhythm, point of view, imagery habits, register, structural quirks),
not vague labels like "literary". If research wasn't opted in, the authors were
named for context only — don't go digging for style traits, just keep the names
in mind as a vague compass.

### 3. Propose 3–4 distinct voices
Generate the same passage in 3–4 genuinely different registers. Don't make them
near-duplicates — vary the real levers (see `references/style-dimensions.md`):
sentence rhythm, distance/POV intimacy, density of imagery, diction register,
humor, interiority. Label each evocatively and name the tradeoff. Example labels:

- **Sober & literary** — ample sentences, rare but striking imagery, controlled distance
- **Brisk & cinematic** — short sentences, present tense, sensation-driven, little introspection
- **Warm & conversational** — close, familiar voice, tender digressions
- **Dense & demanding** — wrought syntax, rich vocabulary, an engaged reader

If step 2 surfaced real traits from the user's named authors, fold one or two into
the options as a labeled influence ("channels <author>'s short, declarative
rhythm") — but never present an outright imitation as one of the choices. The goal
is an original voice informed by what the user admires, not a pastiche.

Present them, then ask which lands — and crucially, invite a *mix* ("the rhythm
of #2, but the imagery of #1"). Voice is often a blend.

### 4. Iterate to a winner
Re-render the passage in the chosen blend. Repeat until the user says "that's it".
Don't rush this — it's the highest-leverage decision in the project.

### 5. Write the style charter
Capture the locked voice in `.book/style-charter.md` using the exact template in
`references/charter-template.md`. The charter must be *operational*, not poetic:
concrete rules a writer skill can follow and self-check against (target sentence
length range, tense, POV, tics to avoid, reference works, a gold-standard sample
paragraph). Vague charters ("write beautifully") are useless downstream.

### 6. Record and update state
Log the decision in `decisions.md`, set `state.json` phase forward, and tell the
orchestrator the next step. Commit as "style: lock voice charter".

## Revising an existing voice
If a charter already exists and the user wants to shift it ("darker from act 2
onward"), don't overwrite blindly — either amend the charter with a scoped
rule or create a section for the new register, and log *why* in `decisions.md`.
Chapters already written stay as they are unless the user asks to retrofit them.

## Why a sample paragraph matters
Always store one gold-standard paragraph in the charter. Downstream, `chapter-writer`
can compare its output against measurable traits of this sample (avg sentence
length, presence of banned tics) — far more reliable than "write in the right
style". This is the anchor that keeps a 300-page manuscript from drifting.
