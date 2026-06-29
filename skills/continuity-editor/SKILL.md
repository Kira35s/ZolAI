---
name: continuity-editor
description: "Check a manuscript for consistency against its own canon — contradictions in facts, character details, timeline, knowledge state, or abandoned plot threads. Use this skill when the user wants a consistency pass: \"check for continuity errors\", \"did I contradict myself\", \"does the timeline hold\", \"make sure the lore is consistent\", \"any loose threads\". It compares the written chapters against the bible and flags discrepancies for the user to resolve, rather than silently changing the text."
---

# Continuity Editor

Long books develop contradictions: eyes change color, a character knows something
before they could, a thread is dropped. This skill audits the manuscript against its
own canon and surfaces problems — it diagnoses, it doesn't silently "fix".

## Memory
Read the orchestrator's `references/memory-spec.md`. This skill reads `manuscript/`,
`.book/bible/`, and `.book/summaries/`; it proposes fixes but writes changes only on
the user's say-so.

## What to check
1. **Facts & traits** — physical details, names, established facts vs. the bible.
2. **Timeline** — event order and causality vs. `timeline.md`. Can B happen before A?
3. **Knowledge state** — does a character act on something they shouldn't know yet?
   This is the subtlest and most common error; lean on the bible's "sait que /
   ignore que" fields.
4. **Lore consistency** — are the world's rules applied consistently, with their
   stated costs and limits?
5. **Loose threads** — setups without payoffs, characters who vanish, promises to
   the reader left unmet.

## Output
Produce a clear report grouped by severity (breaks vs. minor nits), each item citing
the chapter and the conflicting canon. Propose a resolution for each, then let the
user decide. Apply only approved fixes; when a fix changes canon, update the bible
and log it in `decisions.md`. Scope passes to recently written chapters when doing
this routinely; do a full sweep before export.
