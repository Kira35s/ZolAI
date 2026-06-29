# `.book/` memory convention — shared reference

Every skill in `book-writer` reads and writes to a `.book/` folder at the root of
the book project. It is the **only** persistent source of truth, and it's
versioned by git: every significant write deserves a commit, which gives the
project an auditable history of decisions.

## Canonical tree

```
<book-project>/
├── .book/
│   ├── state.json          # current phase, progress, next action
│   ├── concept.md          # pitch, audience, genre, target length
│   ├── style-charter.md    # voice validated by the user (absolute reference)
│   ├── decisions.md        # timestamped log of editorial decisions
│   ├── outline.md          # detailed chapter-by-chapter plan
│   ├── bible/
│   │   ├── characters/<name>.md
│   │   ├── places/<name>.md
│   │   ├── lore.md         # world rules, magic, technology, context
│   │   └── timeline.md     # chronology of events
│   ├── summaries/
│   │   └── <NN>-<slug>.md  # ~5-line summary of each written chapter
│   └── critiques/
│       └── <NN>-<slug>.md  # beta-reader feedback on each chapter
└── manuscript/
    └── <NN>-<slug>.md      # the chapters' text
```

For **non-fiction**, `bible/` instead contains:
- `argument-map.md`: central thesis, sub-arguments, logical structure
- `sources.md`: references, citations, facts to verify
- `glossary.md`: terms and definitions to use consistently

## `state.json` — schema

```json
{
  "title": "Working title",
  "author": "Author name",
  "kind": "fiction | nonfiction",
  "phase": "concept | style | bible | outline | drafting | revision | export",
  "language": "en",
  "target_length_words": 80000,
  "chapters_total": 0,
  "chapters_drafted": 0,
  "next_action": "Plain-language description of the next step",
  "updated_at": "ISO-8601"
}
```

`phase` drives the orchestrator's routing. `next_action` is what gets proposed
to the user when a session resumes.

## Golden rule for every skill

1. **On startup**: read `state.json`, then whichever `.book/` files are relevant
   to the task (always `style-charter.md` when writing prose).
2. **Never write without the user's validation** on structural decisions
   (the chosen voice, a character's death, a change of direction).
3. **At the end of a task**: update `state.json` (at least `phase`,
   `next_action`, `updated_at`) and log any decision in `decisions.md`.
4. **Context economy**: on a long manuscript, load `summaries/` rather than
   full chapters; load the previous chapter in full only.

## `decisions.md` — format

One entry per decision, most recent at the top:

```markdown
## 2025-01-15 — Darker register from act 2 onward
Decided with the user. Reason: dramatic tension. Affects chapters 12+.
```
