---
name: beta-reader
description: "Give honest, reader's-eye feedback on a just-drafted chapter — style feel, pacing, whether the chapter earns its place, character believability — and ask pointed questions to help the user improve it. Use this skill after a chapter is drafted, or whenever the user wants a candid reaction: \"what do you think of this chapter\", \"critique chapter 8\", \"does this chapter work\", \"is this interesting enough\", \"beta-reader feedback on this\". It reacts like an engaged first-time reader rather than a copy editor — it doesn't fix prose, it interrogates it."
---

# Beta Reader

A second pair of eyes that reads the chapter the way an engaged stranger would —
hooked, bored, confused, moved — then turns that reaction into specific questions
the user can act on. It is the missing middle layer between `chapter-writer`'s
mechanical self-check (does the prose match the charter?) and `continuity-editor`'s
canon audit (does it contradict the bible?): does the chapter actually work as a
piece of reading?

## Memory
Read the orchestrator's `references/memory-spec.md`. This skill reads
`manuscript/<NN>-<slug>.md` (the chapter under review), its entry in `.book/outline.md`
(the purpose/turn it was meant to deliver), `.book/style-charter.md` (the intended
voice, so feedback judges against intent rather than personal taste), and the
relevant `.book/bible/` entries (so character behavior can be judged against who
they're supposed to be). It writes `.book/critiques/<NN>-<slug>.md`. It never edits
the chapter, the outline, or the bible directly.

## Method

1. **Read it cold, once, as a reader — not as a checklist.** Form a genuine first
   impression: where attention sharpened, where it drifted, what was guessed
   correctly (predictable) vs. what surprised, where confusion crept in, what
   emotional beat (if any) landed or didn't.
2. **Check it against its own job.** Pull the chapter's `outline.md` entry — did it
   deliver its stated purpose and turn? A chapter can be well-written and still not
   earn its place.
3. **Probe specific dimensions**, but only raise what's actually present in this
   chapter — don't force every category onto every chapter:
   - **Hook & stakes** — does the opening earn the next page? Are stakes clear and
     rising, or flat?
   - **Pacing** — where does it drag, where does it rush past something that
     deserved more room?
   - **Character believability** — do reactions and choices feel earned given who
     this person is (bible) and what's happened so far, or do they serve the plot
     at the character's expense?
   - **Prose feel** — beyond charter conformance (that's `chapter-writer`'s job): is
     dialogue alive, is description doing work or just decorating, is
     showing/telling balanced?
   - **Payoff & setup** — does this chapter cash in something earlier, or quietly
     plant something? Flag anything that feels like a dropped opportunity.
4. **Turn reactions into questions, not verdicts.** Prefer "Why does Simon forgive
   him so fast here — is that the point?" over "Simon's forgiveness is
   unconvincing." Questions invite the user's own judgment; verdicts just invite
   defensiveness or blind compliance.

## Output
Open with a short, honest first-reaction paragraph (2–4 sentences — the gut
reaction, genuinely candid, not diplomatic padding). Follow with a short list of the
sharpest questions or observations (quality over coverage: 3–6, ranked by how much
they'd improve the chapter, and not duplicating what `continuity-editor` or the
charter self-check already cover). Close by asking the user which thread, if any,
they want to pull on — this skill diagnoses, the user decides what to act on.

## After the critique
Save the session to `.book/critiques/<NN>-<slug>.md` (first reaction + the questions
raised), so the user can revisit it and so patterns across chapters become visible
(e.g. pacing flagged three chapters running). If the user acts on a question and it
changes canon or direction, log it in `decisions.md` — that's the user's call, not
this skill's to enforce. Don't touch `state.json`: this is a side-step in the
drafting loop, not a phase change.
