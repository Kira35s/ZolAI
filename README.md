# book-writer

A book-writing agent for Claude Code: an orchestrated **collection of skills**
that carry a project from idea to finished manuscript, with git-versioned
**persistent memory**.

## Guiding idea

Not one big monolithic skill, but single-responsibility skills, driven by
an orchestrator, that share a `.book/` memory folder at the root of the book
project. This memory (style charter, story bible, outline, decision log)
is versioned Markdown/JSON: git becomes the project's auditable history.

## The skills

| Skill | Role |
|---|---|
| `book-orchestrator` | Entry point. Reads state, orients, suggests, routes. |
| `book-concept` | Frames the project: genre, pitch, audience, structure. |
| `style-studio` | Proposes 3–4 voices, locks in the validated style charter. |
| `story-bible` | Characters, places, lore, timeline / argument map. |
| `outline-architect` | Concept + bible → chapter-by-chapter outline. |
| `chapter-writer` | Writes one chapter at a time, using the charter + bible + rolling summaries. |
| `continuity-editor` | Audits the manuscript's consistency against its bible. |
| `manuscript-export` | Compiles to .docx / PDF / EPUB. |

## Memory — `.book/`

```
<project>/
├── .book/
│   ├── state.json        # phase, progress, next action
│   ├── concept.md        # project brief
│   ├── style-charter.md  # validated voice (single source of truth)
│   ├── decisions.md      # timestamped log of decisions
│   ├── outline.md        # detailed outline
│   ├── bible/            # characters, places, lore, timeline
│   └── summaries/        # ~5-line summaries per chapter (rolling context)
└── manuscript/           # the chapters
```

A ready-to-copy template is provided in `.book-template/`.

## Cross-cutting principles

- **Interactivity**: every skill proposes options and waits for validation
  before writing a structural decision.
- **Anti voice-drift**: `chapter-writer` self-checks against the charter
  (sentence length, banned tics, register) after each chapter.
- **Controlled context**: for a long book, rolling summaries are loaded
  instead of every chapter; only the previous chapter is loaded in full.
- **Decision memory**: every decision goes into `decisions.md` so the
  agent doesn't reverse course three sessions later.

## Starting a project

From a new book's folder, ask Claude to start a book: the orchestrator
scaffolds `.book/` (copying `.book-template/`) and kicks off the framing phase.
