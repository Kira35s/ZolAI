---
name: manuscript-export
description: "Assemble the finished (or partial) manuscript into a polished output file — Word .docx, PDF, or EPUB. Use this skill when the user wants to compile, export, format, or produce a shareable version of their book: \"export my book\", \"make a Word doc\", \"compile to PDF\", \"generate an EPUB\", \"put it all together for my editor\". It stitches the chapters in order with a title page, table of contents, and clean typography. Trigger when the user wants the manuscript as a deliverable file rather than scattered chapter files."
---

# Manuscript Export

Turns the chapter files into one polished, shareable document. The writing lives in
`manuscript/` as Markdown; this skill compiles it into a real deliverable.

## Memory
Read the orchestrator's `references/memory-spec.md`. Reads `manuscript/` (in order)
and `concept.md` (title, author intent).

## Process
1. Confirm the target format (.docx for editors/agents — most common; PDF for
   reading/print; EPUB for e-readers) and scope (whole book or a range).
2. Gather `manuscript/<NN>-*.md` in numeric order — the filename prefix is the
   canonical sequence.
3. Build the front matter: title page, optional dedication/epigraph, table of
   contents.
4. Compose the body with proper chapter breaks and consistent, book-like typography
   (readable serif, sensible margins, running heads / page numbers).

## Use the document skills
For the actual file generation, defer to the environment's document skills — the
**docx** skill for Word, the **pdf** skill for PDF. They encode the formatting
mechanics. This skill's job is assembly and ordering; theirs is rendering. Read the
relevant SKILL.md before generating the file.

## Output
Produce the file, save it to the project, and tell the user where it is. This is a
deliverable step, not a memory-state change — but note in `state.json` that an export
was produced. Offer the other formats as a follow-up.
