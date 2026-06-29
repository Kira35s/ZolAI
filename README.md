# book-writer

Un agent d'écriture de livres pour Claude Code : une **collection de skills**
orchestrés qui mènent un projet de l'idée au manuscrit fini, avec une **mémoire
persistante** versionnée par git.

## Idée directrice

Pas un gros skill monolithique, mais des skills à responsabilité unique, pilotés par
un orchestrateur, qui partagent un dossier mémoire `.book/` à la racine du projet
livre. Cette mémoire (charte de style, bible narrative, plan, journal de décisions)
est en Markdown/JSON versionné : git devient l'historique auditable du projet.

## Les skills

| Skill | Rôle |
|---|---|
| `book-orchestrator` | Point d'entrée. Lit l'état, oriente, propose, route. |
| `book-concept` | Cadre le projet : genre, pitch, public, structure. |
| `style-studio` | Propose 3–4 voix, fige la charte de style validée. |
| `story-bible` | Personnages, lieux, lore, chronologie / carte d'arguments. |
| `outline-architect` | Concept + bible → plan chapitre par chapitre. |
| `chapter-writer` | Écrit un chapitre à la fois, charte + bible + résumés glissants. |
| `continuity-editor` | Audit de cohérence du manuscrit contre sa bible. |
| `manuscript-export` | Compile en .docx / PDF / EPUB. |

## Mémoire — `.book/`

```
<projet>/
├── .book/
│   ├── state.json        # phase, avancement, prochaine action
│   ├── concept.md        # brief du projet
│   ├── style-charter.md  # voix validée (référence absolue)
│   ├── decisions.md      # journal horodaté des arbitrages
│   ├── outline.md        # plan détaillé
│   ├── bible/            # personnages, lieux, lore, timeline
│   └── summaries/        # résumés ~5 lignes par chapitre (contexte glissant)
└── manuscript/           # les chapitres
```

Un template prêt à copier est fourni dans `.book-template/`.

## Principes transverses

- **Interactivité** : chaque skill propose des options et attend validation avant
  d'écrire une décision structurante.
- **Anti-dérive de voix** : `chapter-writer` s'auto-vérifie contre la charte
  (longueur de phrase, tics bannis, registre) après chaque chapitre.
- **Contexte maîtrisé** : sur un livre long, on charge les résumés glissants plutôt
  que tous les chapitres ; seul le chapitre précédent est chargé en entier.
- **Mémoire des décisions** : tout arbitrage va dans `decisions.md` pour éviter que
  l'agent reparte dans l'autre sens trois sessions plus tard.

## Démarrer un projet

Depuis le dossier d'un nouveau livre, demander à Claude de commencer un livre :
l'orchestrateur scaffolde `.book/` (copie de `.book-template/`) et lance le cadrage.
