#!/usr/bin/env node
// Interactive installer for book-writer — `npx github:Kira35s/ZolAI`, run
// from inside the folder where you want your book project to live. Outputs
// land in the current directory; the skills/.book-template content this
// reads from lives alongside this script (wherever npx/git put the clone).
//
// Claude Code reads skills/*/SKILL.md natively — nothing to generate there.
// Every other agentic tool gets a single generated AGENTS.md, assembled from
// the same skills/ source so there is only one place to maintain content.

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ROOT = __dirname; // where book-writer itself lives (source of skills/ + .book-template/)
const CWD = process.cwd(); // the book project being set up
const SKILLS_DIR = path.join(ROOT, "skills");
const TEMPLATE_DIR = path.join(ROOT, ".book-template");
const MEMORY_SPEC = path.join(
  SKILLS_DIR,
  "book-orchestrator",
  "references",
  "memory-spec.md"
);
const ORCHESTRATOR = path.join(SKILLS_DIR, "book-orchestrator", "SKILL.md");
const AGENTS_OUTPUT = path.join(CWD, "AGENTS.md");
const BOOK_DIR = path.join(CWD, ".book");
const MANUSCRIPT_DIR = path.join(CWD, "manuscript");
const MARKER = "GENERATED FILE";

// Canonical phase order, matching the orchestrator's routing table.
const SKILL_ORDER = [
  "book-concept",
  "style-studio",
  "story-bible",
  "outline-architect",
  "chapter-writer",
  "beta-reader",
  "dialogue-coach",
  "revision-editor",
  "continuity-editor",
  "manuscript-export",
];

// ---- AGENTS.md generation (assembled from skills/) -------------------------

function shiftHeadings(markdown, levels = 1) {
  const lines = markdown.split("\n");
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^```/.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = lines[i].match(/^(#+)( .*)$/);
    if (m) lines[i] = "#".repeat(m[1].length + levels) + m[2];
  }
  return lines.join("\n");
}

function dropFirstHeading(markdown) {
  const lines = markdown.split("\n");
  const idx = lines.findIndex((l) => /^#\s+/.test(l));
  if (idx !== -1) lines.splice(idx, 1);
  return lines.join("\n").trim();
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { name: "", description: "", body: raw.trim() };
  const [, fm, body] = m;
  const nameMatch = fm.match(/^name:\s*(.+)$/m);
  const descMatch = fm.match(/description:\s*"((?:[^"\\]|\\.)*)"/);
  return {
    name: nameMatch ? nameMatch[1].trim() : "",
    description: descMatch ? descMatch[1].replace(/\\"/g, '"') : "",
    body: body.trim(),
  };
}

// In a single merged file there's no separate orchestrator file to point to —
// fold every "see references/memory-spec.md" pointer into a same-document anchor.
function adaptMemoryRefs(markdown) {
  return markdown
    .replace(
      /the orchestrator's `references\/memory-spec\.md`/g,
      "the **Memory model** section above"
    )
    .replace(/`references\/memory-spec\.md`/g, "the **Memory model** section above");
}

function buildSkillSection(skillName) {
  const raw = fs.readFileSync(path.join(SKILLS_DIR, skillName, "SKILL.md"), "utf8");
  const { description, body } = parseFrontmatter(raw);
  let content = shiftHeadings(dropFirstHeading(body), 1);
  content = adaptMemoryRefs(content);

  let section = `## Skill: ${skillName}\n\n`;
  if (description) section += `*${description}*\n\n`;
  section += content + "\n";

  const refsDir = path.join(SKILLS_DIR, skillName, "references");
  if (fs.existsSync(refsDir)) {
    const refFiles = fs.readdirSync(refsDir).filter((f) => f.endsWith(".md")).sort();
    for (const refFile of refFiles) {
      const refRaw = fs.readFileSync(path.join(refsDir, refFile), "utf8");
      const refBody = shiftHeadings(dropFirstHeading(refRaw), 2);
      section += `\n### Reference: ${refFile}\n\n${refBody}\n`;
    }
  }
  return section;
}

function generateAgentsMd() {
  const memoryBody = shiftHeadings(
    dropFirstHeading(fs.readFileSync(MEMORY_SPEC, "utf8")),
    1
  );

  const orch = parseFrontmatter(fs.readFileSync(ORCHESTRATOR, "utf8"));
  const orchBody = adaptMemoryRefs(shiftHeadings(dropFirstHeading(orch.body), 1));

  let out = "";
  out += "# book-writer — agent instructions\n\n";
  out += `<!-- ${MARKER} — do not edit by hand. Regenerate with \`node setup.js\`\n`;
  out += "     (option 2) after changing anything under skills/. Source of truth:\n";
  out += "     skills/*/SKILL.md -->\n\n";
  out += "An interactive book-writing agent: it carries a project from idea to finished\n";
  out += "manuscript through the phases below, with persistent memory in `.book/`\n";
  out += "versioned by git. This file merges every skill into one document because this\n";
  out += "tool doesn't support a dedicated skill/plugin mechanism — read the whole file,\n";
  out += "then act according to whichever phase matches the user's request.\n\n";
  out += "## How to use this file\n\n";
  out += "Start with **Orchestration** below to figure out the project state and the\n";
  out += "right phase. Each phase has its own `## Skill: <name>` section with the method\n";
  out += "to follow. Always check `.book/state.json` before acting, and update it (plus\n";
  out += "`decisions.md`) after any structural decision, per the **Memory model**.\n\n";
  out += "## Memory model\n\n" + memoryBody + "\n\n";
  out += "## Orchestration\n\n" + orchBody + "\n\n";

  for (const skillName of SKILL_ORDER) {
    out += buildSkillSection(skillName) + "\n";
  }

  return out.trimEnd() + "\n";
}

// ---- New project wizard -----------------------------------------------------

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirRecursive(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function buildConceptMd({
  title,
  author,
  language,
  inspirations,
  synopsis,
  styleIntent,
  styleAuthors,
  useAuthorStyle,
}) {
  let md = "# Concept — to be filled in by book-concept\n\n";
  md += "## Basics\n";
  md += `- **Title**: ${title}\n`;
  md += `- **Author**: ${author || "_TBD_"}\n`;
  md += `- **Language**: ${language}\n`;
  md += "- **Kind**: _TBD — fiction or non-fiction?_\n";
  md += "- **Premise / thesis**: _TBD_\n";
  md += "- **Audience**: _TBD_\n";
  md += "- **Target length & structure**: _TBD_\n";

  if (inspirations) md += `\n## Comparable works\n${inspirations}\n`;
  if (synopsis) md += `\n## Synopsis\n${synopsis}\n`;
  if (styleIntent) {
    md += `\n## Style intent (raw, pre-style-studio)\n${styleIntent}\n`;
    md += "\n_Collected at setup time — style-studio should treat this as a starting\npoint for the voice samples, not a final charter._\n";
  }
  if (styleAuthors) {
    md += "\n## Style-inspiring authors\n";
    md += `- **Authors**: ${styleAuthors}\n`;
    md += `- **Research their style for voice proposals**: ${useAuthorStyle ? "yes" : "no — mentioned for context only"}\n`;
    if (useAuthorStyle) {
      md +=
        "\n_style-studio should look into what's known about these authors' work and " +
        "writing style (web search if available, otherwise its own knowledge) and let " +
        "concrete traits — sentence rhythm, point of view, imagery, register — inform " +
        "the voice options it proposes. Draw on what makes their style distinctive; " +
        "don't present an outright imitation as one of the choices._\n";
    }
  }

  md += "\n---\n_Fields marked TBD are intentionally unfinished — book-concept (and\n";
  md += "style-studio for voice) should complete them interactively with the user._\n";
  return md;
}

async function runProjectWizard(ask) {
  const statePath = path.join(BOOK_DIR, "state.json");
  if (fs.existsSync(statePath)) {
    const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
    console.log(
      `\nA book project already exists here ("${state.title}", phase: ${state.phase}). Skipping project setup.`
    );
    return;
  }

  console.log("\nLet's set up a new book project in this folder.\n");
  const startNow = await ask("Start it now? [Y/n]: ");
  if (/^n/i.test(startNow)) {
    console.log(
      "\nSkipping. Open this folder in your AI tool whenever you're ready and ask it to start a book."
    );
    return;
  }

  const title = (await ask("\nWorking title of the book: ")) || "Untitled";
  const author = await ask("Author name: ");
  const language = (await ask("Language the book will be written in (e.g. en, fr, es) [en]: ")) || "en";
  const inspirations = await ask(
    "Comparable books — titles that situate this project, comma-separated (optional): "
  );
  const synopsis = await ask("A sentence or two about what the book is about (optional): ");
  const styleIntent = await ask(
    'Tone/voice you\'re going for, e.g. "dark and literary" (optional): '
  );

  const styleAuthors = await ask(
    "Any specific authors whose writing style inspires you for this book, comma-separated (optional): "
  );
  let useAuthorStyle = false;
  if (styleAuthors) {
    const answer = await ask(
      `Should style-studio look into ${styleAuthors}'s style and let it inform the voices it proposes? [Y/n]: `
    );
    useAuthorStyle = !/^n/i.test(answer);
  }

  copyDirRecursive(TEMPLATE_DIR, BOOK_DIR);
  fs.mkdirSync(MANUSCRIPT_DIR, { recursive: true });

  const state = JSON.parse(fs.readFileSync(statePath, "utf8"));
  state.title = title;
  state.author = author;
  state.language = language;
  state.next_action =
    "Continue book-concept: confirm fiction/non-fiction, premise, audience, " +
    "target length, and structure (inspirations/synopsis/style intent already captured).";
  state.updated_at = new Date().toISOString();
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2) + "\n", "utf8");

  fs.writeFileSync(
    path.join(BOOK_DIR, "concept.md"),
    buildConceptMd({
      title,
      author,
      language,
      inspirations,
      synopsis,
      styleIntent,
      styleAuthors,
      useAuthorStyle,
    }),
    "utf8"
  );

  const decisionsPath = path.join(BOOK_DIR, "decisions.md");
  let entry =
    `\n## ${today()} — Project initialized via setup.js\n` +
    "Captured title, author, and language, plus any inspirations, synopsis, " +
    "and style intent given. Recorded as a starting brief for book-concept and " +
    "style-studio to build on.";
  if (styleAuthors) {
    entry += useAuthorStyle
      ? ` Opted in to have style-studio research ${styleAuthors}'s style for inspiration.`
      : ` Noted ${styleAuthors} as influences, without opting in to style research.`;
  }
  entry += "\n";
  fs.writeFileSync(decisionsPath, fs.readFileSync(decisionsPath, "utf8").trimEnd() + "\n" + entry, "utf8");

  console.log(`\nScaffolded .book/ and manuscript/ in ${CWD}.`);
  console.log(
    "Open this folder in your AI tool and ask it to continue your book — it'll pick up\n" +
      "from the concept/style phase with everything captured here."
  );
}

// ---- Entry point -------------------------------------------------------------

async function main() {
  // A hand-rolled prompt queue instead of rl.question(): when several answers
  // arrive in the same input chunk (piped input, or a multi-line paste),
  // rl.question() only wires its callback to the *next* line event and drops
  // the rest. Queuing both sides (pending asks and unclaimed lines) means no
  // answer is ever lost regardless of how the input arrives.
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const backlog = [];
  const waiters = [];
  rl.on("line", (line) => {
    const value = line.trim();
    if (waiters.length) waiters.shift()(value);
    else backlog.push(value);
  });
  const ask = (question) => {
    if (backlog.length) {
      const value = backlog.shift();
      process.stdout.write(question + value + "\n");
      return Promise.resolve(value);
    }
    process.stdout.write(question);
    return new Promise((resolve) => waiters.push(resolve));
  };

  try {
    console.log("book-writer setup\n");
    console.log("Which tool will you use to work with this project?\n");
    console.log("  1) Claude Code — native skills/plugin format (nothing to generate)");
    console.log("  2) Other agent (Cursor, Copilot, Codex CLI, ChatGPT, Gemini CLI, ...)");
    console.log("     -> generates a single AGENTS.md from skills/\n");
    const choice = await ask("Choice [1/2]: ");

    if (choice === "1") {
      console.log("\nNothing to do — Claude Code reads skills/ and .claude-plugin/ directly.");
      console.log('Add this repo as a plugin marketplace, then install "book-writer".');
    } else if (choice === "2") {
      if (fs.existsSync(AGENTS_OUTPUT)) {
        const existing = fs.readFileSync(AGENTS_OUTPUT, "utf8");
        if (!existing.includes(MARKER)) {
          console.error(
            "\nAGENTS.md already exists here and wasn't generated by this script.\n" +
              "Remove or rename it first if you want setup.js to regenerate it."
          );
          process.exitCode = 1;
          return;
        }
      }
      fs.writeFileSync(AGENTS_OUTPUT, generateAgentsMd(), "utf8");
      console.log(`\nWrote ${AGENTS_OUTPUT}`);
      console.log("Most agentic tools (Cursor, Codex CLI, Copilot, ...) auto-load AGENTS.md.");
      console.log("For tools that don't, paste its content as a system/custom instructions prompt.");
    } else {
      console.error("\nUnrecognized choice. Run `node setup.js` again and enter 1 or 2.");
      process.exitCode = 1;
      return;
    }

    await runProjectWizard(ask);
  } finally {
    rl.close();
  }
}

main();
