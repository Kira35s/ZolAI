# Convention mémoire `.book/` — référence partagée

Tous les skills de `book-writer` lisent et écrivent dans un dossier `.book/` à la
racine du projet livre. C'est la **seule** source de vérité persistante. Elle est
versionnée par git : chaque écriture significative mérite un commit, ce qui donne
un historique auditable des décisions.

## Arborescence canonique

```
<projet-livre>/
├── .book/
│   ├── state.json          # phase courante, avancement, prochaine action
│   ├── concept.md          # pitch, public, genre, longueur cible
│   ├── style-charter.md    # voix validée par l'utilisateur (référence absolue)
│   ├── decisions.md        # journal horodaté des arbitrages éditoriaux
│   ├── outline.md          # plan détaillé chapitre par chapitre
│   ├── bible/
│   │   ├── characters/<nom>.md
│   │   ├── places/<nom>.md
│   │   ├── lore.md         # règles du monde, magie, technologie, contexte
│   │   └── timeline.md     # chronologie des événements
│   └── summaries/
│       └── <NN>-<slug>.md  # résumé ~5 lignes de chaque chapitre écrit
└── manuscript/
    └── <NN>-<slug>.md      # texte des chapitres
```

Pour la **non-fiction**, `bible/` contient à la place :
- `argument-map.md` : thèse centrale, sous-arguments, structure logique
- `sources.md` : références, citations, faits à vérifier
- `glossary.md` : termes et définitions à employer de façon cohérente

## `state.json` — schéma

```json
{
  "title": "Titre provisoire",
  "kind": "fiction | nonfiction",
  "phase": "concept | style | bible | outline | drafting | revision | export",
  "language": "fr",
  "target_length_words": 80000,
  "chapters_total": 0,
  "chapters_drafted": 0,
  "next_action": "Description en clair de la prochaine étape",
  "updated_at": "ISO-8601"
}
```

`phase` pilote le routage de l'orchestrateur. `next_action` est ce qu'on propose
à l'utilisateur à la reprise d'une session.

## Règle d'or pour chaque skill

1. **Au démarrage** : lire `state.json`, puis les fichiers `.book/` pertinents pour
   la tâche (toujours `style-charter.md` quand on écrit de la prose).
2. **Ne jamais écrire sans validation** de l'utilisateur sur les décisions
   structurantes (style retenu, mort d'un personnage, changement de cap).
3. **En fin de tâche** : mettre à jour `state.json` (au moins `phase`,
   `next_action`, `updated_at`) et journaliser tout arbitrage dans `decisions.md`.
4. **Économie de contexte** : sur un manuscrit long, charger les `summaries/` plutôt
   que les chapitres entiers ; ne charger en entier que le chapitre précédent.

## `decisions.md` — format

Une entrée par décision, la plus récente en haut :

```markdown
## 2025-01-15 — Registre plus sombre à partir de l'acte 2
Décidé avec l'utilisateur. Raison : tension dramatique. Impacte chapitres 12+.
```
