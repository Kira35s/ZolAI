# book-writer

A book-writing agent: an orchestrated **collection of skills** that carry a
project from idea to finished manuscript, with git-versioned **persistent
memory**. Works natively with Claude Code, and with any other agentic tool
via a generated `AGENTS.md`.

## Guiding idea

Not one big monolithic skill, but single-responsibility skills, driven by
an orchestrator, that share a `.book/` memory folder at the root of the book
project. This memory (style charter, story bible, outline, decision log)
is versioned Markdown/JSON: git becomes the project's auditable history.

## Installation

Run the installer from inside the folder where your book project should live
(not from inside this repo, unless that's where you want it):

```
node /path/to/book-writer/setup.js
```

It first asks which tool you're using:

- **Claude Code** — nothing to generate. It already reads `skills/` and
  `.claude-plugin/` natively; add this repo as a plugin marketplace and
  install `book-writer`.
- **Anything else** (Cursor, Copilot, Codex CLI, ChatGPT, Gemini CLI, ...) —
  generates a single `AGENTS.md` in the current folder, assembled from the
  same `skills/*/SKILL.md` files. Most agentic tools auto-load `AGENTS.md`;
  for tools that don't, paste its content in as custom/system instructions.

`AGENTS.md` is generated, not committed — `skills/` stays the only source of
truth. Re-run `setup.js` (option 2) any time a skill changes to refresh it.

It then offers to scaffold a new book project right there: working title,
author name, language, and — optional — inspirations/comparable works, a
short synopsis, and the tone/voice you're going for. This seeds `.book/`
(title, author, language in `state.json`; the rest in `concept.md`) so that
when you open the folder in your AI tool, `book-concept` and `style-studio`
pick up from a real starting brief instead of a blank slate.

## The skills

| Skill | Role |
|---|---|
| `book-orchestrator` | Entry point. Reads state, orients, suggests, routes. |
| `book-concept` | Frames the project: genre, pitch, audience, structure. |
| `style-studio` | Proposes 3–4 voices, locks in the validated style charter. |
| `story-bible` | Characters, places, lore, timeline / argument map. |
| `outline-architect` | Concept + bible → chapter-by-chapter outline. |
| `chapter-writer` | Writes one chapter at a time, using the charter + bible + rolling summaries. |
| `beta-reader` | Reacts to a drafted chapter like a real reader and asks questions to improve it. |
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
│   ├── summaries/        # ~5-line summaries per chapter (rolling context)
│   └── critiques/        # beta-reader feedback per chapter
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

The installer (above) is the fastest path — it scaffolds `.book/` and captures
the basics up front. You can also skip it: from a new book's folder, just ask
your AI tool to start a book — the orchestrator scaffolds `.book/` (copying
`.book-template/`) and kicks off the framing phase from scratch.
