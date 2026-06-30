---
name: revision-editor
description: "Apply the user's own directed feedback to a drafted chapter — feedback anchored to a quoted line, a quoted phrase, or a line range, not a general critique. Use this skill when the user gives concrete, located edit requests on an existing chapter: \"lines 20 to 30 I don't like, I'd have preferred...\", \"can you push this point further\", or quoting an exact sentence and asking \"can you add a dialogue here about X\". Unlike beta-reader (the AI's own reaction) or dialogue-coach (an audit the AI initiates), this skill's feedback originates entirely from the user and is anchored to specific text; its job is to turn each anchored note into a precise, scoped rewrite proposal and apply only what's approved."
---

# Revision Editor

The user has already read the chapter and knows exactly what they want changed,
and where. This skill's only job is to locate each note precisely in the text,
turn it into a scoped rewrite that honors the rest of the chapter untouched, and
apply only what the user approves. It does not generate its own opinions about
the chapter (`beta-reader`'s job) or audit dialogue voice (`dialogue-coach`'s
job) — it is purely a translator from "here's what I want, here" to an applied
edit.

## Memory
Read the orchestrator's `references/memory-spec.md`. This skill reads the target
`manuscript/<NN>-<slug>.md`, `.book/style-charter.md` (so rewrites stay in
voice), and the relevant `.book/bible/` entries when a note touches a character
or place. It edits the manuscript directly, but only after the user approves
each change.

## Method

1. **Collect the notes.** The user may give one note or several in a single
   message, each anchored a different way:
   - A line range ("lines 20 to 30") — read those lines from the current file
     to confirm what's actually there before proposing anything.
   - A quoted phrase or sentence ("peux-tu ajouter un dialogue ici : '...'") —
     search the chapter for that exact (or near-exact, accounting for the
     plain-punctuation rule) string. If it appears more than once, ask which
     occurrence. If it isn't found verbatim, say so and ask the user to
     re-paste or point at a line range instead of guessing.
   - A vague pointer with intent only ("peux-tu accentuer ce point", "ajoute un
     dialogue ici dont voici l'objet : ...") — treat the cited anchor as the
     insertion or rewrite point, and the rest of the note as the brief for
     *what* to do there, not a request to touch anything else.
2. **Confirm the anchor before rewriting.** Echo back the exact span you
   located (quote it) so the user can correct a mismatch before you spend a
   rewrite on the wrong passage. Skip this confirmation only when the anchor
   is unambiguous (a unique quoted sentence found once).
3. **Scope the rewrite tightly.** Touch only the anchored span (or, for an
   insertion request, only the new material plus the minimum transition text
   on either side). Do not "improve" surrounding paragraphs the user didn't
   flag, even if something nearby looks off, surface it as a separate note
   in your reply instead of editing it unasked.
4. **Write the rewrite in the charter's voice**, consistent with the bible for
   any character or place involved. For an added scene/dialogue, check the
   relevant character's voice profile in `.book/bible/characters/` first so it
   doesn't drift from how they're established to sound (same discipline as
   `dialogue-coach`).
5. **Present each rewrite against its note**, original span and proposed
   replacement side by side (or before/after), so the user can compare
   directly. Apply the system-wide plain-punctuation rule to anything you
   write.

## Output
For multi-note sessions, work through notes in the order given (or document
order if that's clearer) and present them as a numbered list: note, located
span, proposed rewrite. Let the user approve, adjust, or reject each one
individually, never batch-apply silently, same principle as `dialogue-coach`.
If a note is ambiguous or the anchor can't be found, say so plainly instead of
making a best guess.

## After the session
Apply only the approved rewrites directly to `manuscript/<NN>-<slug>.md`. If a
rewrite changes canon (a new fact, a character trait, a scene that didn't exist
before), update the bible and log it in `decisions.md`. If the chapter's
`.book/summaries/<NN>-<slug>.md` is now stale because the changes shift what
happens in the chapter, update it too. Skip `state.json`, this is a revision
pass within drafting, not a phase change. Commit as
"revise: chapter <NN> — <short reason>" if the project is under git.
