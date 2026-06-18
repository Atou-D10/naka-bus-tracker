## Connexions 6 Chapeaux → VPC — NakaBus

### Profil Client — Origines

#### Jobs To Be Done

| Job | Chapeau d'origine | Citation exacte |
|---|---|---|
| Connaître l'heure exacte à laquelle partir de Pikine pour arriver au Plateau à temps chaque matin | Chapeau Blanc | "le trajet Pikine → Plateau dure entre 45 min et 2h selon le trafic, sans horaire officiel ni information en temps réel disponible aux arrêts" |
| Identifier rapidement quel bus ou car rapide prendre sans dépendre des autres voyageurs à l'arrêt | Chapeau Blanc | "Dakar Dem Dikk et les cars rapides cohabitent sur les mêmes axes sans système de tracking public ni application officielle fiable" |
| Recevoir une information de mobilité via WhatsApp, sans app à installer et sans data lourde | Chapeau Blanc | "plus de 70% des Sénégalais utilisent WhatsApp quotidiennement : c'est le canal numérique le plus accessible et le plus économe en data" |

#### Pains

| Pain | Chapeau d'origine | Citation exacte |
|---|---|---|
| Incertitude totale à l'arrêt — attendre entre 5 et 45 minutes sans savoir si le bus viendra | Chapeau Rouge | "partir sans savoir génère une tension permanente qui commence la journée dans le stress" |
| Résignation apprise — Aissatou ne croit plus qu'une solution existe | Chapeau Rouge | "à force de subir, Aissatou ne croit plus qu'une solution existe — toute innovation devra d'abord regagner sa confiance" |
| Fracture d'usage si la solution est trop lourde ou complexe | Chapeau Noir | "une interface trop complexe ou trop lourde sera abandonnée dès la première connexion lente" |
| Données de trafic inexistantes ou non structurées — estimation fiable difficile | Chapeau Noir | "bâtir une estimation fiable sans data de qualité est le premier risque technique" |

#### Gains

| Gain | Chapeau d'origine | Citation exacte |
|---|---|---|
| Heure de départ simple et actionnable — un seul chiffre résout 80% du problème | Chapeau Jaune | "l'heure de départ idéale est une valeur simple et actionnable : un seul chiffre suffit à résoudre 80% du problème d'Aissatou" |
| Intelligence collective de l'arrêt formalisée et accessible via WhatsApp | Chapeau Jaune | "la communauté d'arrêt existe déjà : les voyageurs s'informent oralement entre eux — un outil numérique peut formaliser et amplifier cette intelligence collective" |
| Service sans app, compatible avec les forfaits les plus bas | Chapeau Jaune | "WhatsApp comme infrastructure : aucune app à installer, aucun espace de stockage consommé, compatible avec les forfaits les plus bas" |

---

### Proposition de Valeur — Origines

#### Produits & Services

| Produit / Service | Job ou Pain adressé | Chapeau d'origine |
|---|---|---|
| Recommandation d'heure de départ via WhatsApp — format « Pars à HH:MM » en un message texte | Job "connaître l'heure exacte de départ" + Pain "incertitude totale à l'arrêt" | Chapeau Vert |
| Réseau de sentinelles volontaires signalant le passage des bus via mot-clé WhatsApp | Job "identifier quel bus prendre" + Gain "intelligence collective formalisée" | Chapeau Vert |
| Alerte précoce si bus en retard ou annulé, avec alternative immédiate (car rapide, autre ligne) | Pain "incertitude totale" + Gain "avoir une alternative fiable" | Chapeau Vert |

#### Pain Relievers

| Pain Reliever | Pain adressé | Chapeau d'origine |
|---|---|---|
| Réponse en moins de 3 secondes, sans image ni carte — texto uniquement | Fracture d'usage si solution trop lourde en 2G | Chapeau Noir (mitigation du risque "interface lourde abandonnée dès la première connexion lente") |
| Zéro inscription, zéro compte — premier message = première réponse | Résignation apprise — regagner la confiance dès la première interaction | Chapeau Rouge (levier émotionnel "soulagement immédiat quand ça fonctionne du premier coup") |
| Données historiques par heure et par jour de semaine — estimation sans GPS ni tracking temps réel | Données de trafic inexistantes ou non structurées | Chapeau Noir (mitigation du risque "données inexistantes = estimation non fiable") |

#### Gain Creators

| Gain Creator | Gain adressé | Chapeau d'origine |
|---|---|---|
| « Pars à 6h20 aujourd'hui » — format mémorisable et actionnable avant de quitter le domicile | Heure de départ simple et actionnable en un seul chiffre | Chapeau Jaune ("un seul chiffre suffit à résoudre 80% du problème") + Chapeau Vert ("chatbot ultra-léger : réponse texte, sans image ni carte") |
| Adoption par bouche-à-oreille via 5 à 10 usagers réguliers de l'axe comme premiers ambassadeurs | Service sans app compatible avec les forfaits les plus bas | Chapeau Bleu ("prioriser l'adoption par le bouche-à-oreille : impliquer 5 à 10 usagers réguliers comme testeurs et ambassadeurs") |
| Sentinelles volontaires à l'arrêt — données communautaires en temps réel sans infrastructure lourde | Intelligence collective de l'arrêt formalisée et accessible | Chapeau Jaune ("les apprentis des cars rapides connaissent les temps de trajet réels mieux que tout GPS") + Chapeau Vert ("réseau de sentinelles volontaires") |

---

### Éléments Non Tracés

- **Formation ou guidage pour choisir entre Dem Dikk et car rapide** → identifié
  comme besoin dans le Chapeau Blanc ("véhicules hétérogènes sans qu'elle sache
  lequel sera le plus rapide aujourd'hui") mais absent des Produits & Services —
  [Non tracé comme fonctionnalité — à valider en interview S3 : Aissatou
  ressent-elle ce besoin comme prioritaire ou l'heure de départ seule lui
  suffit-elle ?]

- **Rôle des apprentis des cars rapides comme collecteurs de données terrain** →
  identifié dans le Chapeau Jaune ("les apprentis connaissent les temps de trajet
  réels mieux que tout GPS — source de données terrain inexploitée") mais sans
  Produit & Service ni Gain Creator dédié dans la proposition de valeur —
  [Non tracé comme levier opérationnel — à valider en interview S3 : les apprentis
  sont-ils un segment partenaire distinct ou un canal de collecte pour le même
  service ?]

- **SMS d'alerte programmable la veille au soir** → identifié dans le Chapeau Vert
  comme fonctionnalité possible ("la veille au soir, elle reçoit Demain, pour 8h
  au Plateau, pars à 6h10") mais non représenté comme Produit ou Service explicite
  dans le VPC — [Non tracé comme fonctionnalité V1 — à intégrer dans la roadmap
  opérationnelle S3, hors périmètre MVP]

---

### Synthèse de Cohérence

**Alignement :** Fort sur le cœur du service — les 3 Jobs, les 4 Pains et les 3
Gains du profil client ont chacun au moins un Pain Reliever ou Gain Creator
correspondant dans la proposition de valeur, et chaque élément du VPC est
traçable à au moins un chapeau source.

**Tension principale :** Le Pain Reliever "données historiques suffisent pour
estimer l'heure de départ" (Chapeau Noir) crée une promesse que la proposition
de valeur actuelle ne peut pas tenir seule — une estimation basée sur des moyennes
passées ne peut pas anticiper un incident de trafic ou une grève de chauffeurs
le matin même, ce qui laisse le Pain "incertitude totale à l'arrêt" partiellement
soulagé sans être résolu en temps réel.

**Recommandation avant S3 :** Conduire un test terrain de 5 matins consécutifs
en mode Wizard of Oz pour valider si une recommandation basée sur les données
historiques heure × jour de semaine suffit à modifier le comportement de départ
d'Aissatou, ou si un signal temps réel minimal (sentinelle confirmant le passage
du dernier bus) doit être intégré dès la V1 pour combler le gap de fiabilité
identifié.
