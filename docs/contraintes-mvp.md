## Contraintes MVP — NakaBus

### Persona

Aissatou Ndiaye · 27 ans · Employée de commerce · Pikine → Plateau · Smartphone d'entrée de gamme · Forfait data limité · Connexion 2G instable

---

### Contraintes Non Négociables

#### Contrainte 1

**Critère :** Le MVP DOIT délivrer chaque recommandation d'heure de départ en moins de 2 lignes de texte, en français simple, lisible sur tout écran de smartphone sans défilement, avec le format strict : "Pars à HH:MM aujourd'hui — axe Pikine → Plateau" — sans image, sans carte, sans lien URL.
**Origine :** Chapeau Blanc (connexion 2G instable, forfait data limité)
**Élimine :** Toute interface cartographique, toute notification push enrichie, tout message avec image ou lien, tout dashboard web consulté depuis le téléphone — aucune de ces formes n'est utilisable de manière fiable sur le réseau de Pikine aux heures de pointe.

---

#### Contrainte 2

**Critère :** Le MVP DOIT fonctionner sans aucune application à installer — le canal unique est WhatsApp, déjà présent sur le téléphone d'Aissatou — et NE DOIT PAS exiger d'inscription, de création de compte ou de saisie de mot de passe pour le premier usage.
**Origine :** Chapeau Noir (risque fracture d'usage et abandon immédiat)
**Élimine :** Toute application native Android ou iOS, tout formulaire d'inscription en ligne, tout système de login, tout onboarding multi-étapes — la friction d'installation ou d'inscription est une barrière d'abandon avant même le premier usage pour un profil comme Aissatou.

---

#### Contrainte 3

**Critère :** Le MVP DOIT répondre à chaque requête WhatsApp en moins de 3 secondes, y compris sur une connexion 2G avec un débit dégradé, et NE DOIT PAS dépendre d'un traitement lourd côté serveur qui introduit un délai supérieur à ce seuil.
**Origine :** Chapeau Blanc (réseau Pikine dégradé entre 6h et 8h) + Chapeau Noir (risque abandon si délai perçu)
**Élimine :** Tout appel API externe avec latence non maîtrisée, tout traitement d'image ou de carte en temps réel, tout workflow de calcul complexe non mis en cache — au-delà de 3 secondes, Aissatou referme WhatsApp et part sans l'information.

---

#### Contrainte 4

**Critère :** Le MVP DOIT couvrir au minimum l'axe Pikine → Plateau avec les créneaux horaires 6h–9h (heures de pointe du matin), et NE DOIT PAS tenter de couvrir l'ensemble du réseau de transport dakarois dès la V1.
**Origine :** Chapeau Blanc (absence de données de trafic structurées à Dakar) + Chapeau Bleu (collecte terrain préalable obligatoire)
**Élimine :** Toute ambition de couverture multi-axes dès le lancement, tout système de personnalisation d'itinéraire complexe, toute intégration avec d'autres lignes non documentées — deux créneaux bien calibrés sur un axe réel valent mieux que dix axes sous-documentés.

---

#### Contrainte 5

**Critère :** Le MVP DOIT reposer sur au moins 3 signaux sentinelles humains actifs sur l'axe avant de générer une recommandation d'heure, et NE DOIT PAS envoyer d'estimation si aucun signal terrain n'a été reçu dans les 30 dernières minutes.
**Origine :** Chapeau Noir (risque données obsolètes — une recommandation erronée détruit la confiance dès le premier usage)
**Élimine :** Tout système de recommandation basé uniquement sur des données historiques sans validation temps réel, tout algorithme de prédiction non alimenté par des signaux terrain frais — une estimation périmée est pire qu'aucune estimation.

---

#### Contrainte 6

**Critère :** Le MVP NE DOIT PAS inclure de module de suivi GPS des bus, de géolocalisation en temps réel des véhicules, ou d'intégration avec les opérateurs de transport — ces éléments constituent un périmètre distinct qui allonge le délai de mise sur le marché sans valider l'hypothèse centrale (la valeur de la recommandation d'heure communautaire seule).
**Origine :** Chapeau Noir (risque dépendance infrastructure non contrôlable) + Chapeau Bleu (priorisation de la preuve de valeur)
**Élimine :** Toute négociation de partenariat avec Dakar Dem Dikk ou les opérateurs de cars rapides en V1, tout tracking GPS embarqué dans les véhicules, tout système de données temps réel dépendant d'une infrastructure tierce non maîtrisée — ces fonctionnalités sont légitimes mais appartiennent à la V2.

---

### Fonctionnalités Éliminées

- **Application mobile (Android/iOS)** → éliminée parce qu'Aissatou n'installe pas d'application inconnue sans recommandation de confiance préalable, et que le temps d'installation et d'apprentissage dépasse la fenêtre d'attention disponible à 6h du matin avant de partir au travail.
- **Carte interactive ou plan du réseau de transport** → éliminée parce que les images et cartes sont trop lourdes en 2G sur le réseau de Pikine aux heures de pointe, et qu'Aissatou n'a pas besoin d'une carte — elle connaît son arrêt, elle a besoin d'une heure.
- **Géolocalisation GPS des bus en temps réel** → éliminée parce que l'infrastructure de tracking des véhicules n'existe pas à Dakar et qu'une dépendance à un partenariat technique avec les opérateurs de transport est un risque de blocage non maîtrisable pour la V1.
- **Système de paiement ou d'abonnement** → éliminé en V1 parce que monétiser avant la preuve de valeur entraîne l'attrition immédiate ; le modèle économique est une question de V2, conditionnée à la validation terrain de la V1 sur au moins 30 jours d'usage actif.
- **Support multilingue (wolof, anglais)** → éliminé en V1 parce que le français simple est compris par Aissatou et suffit pour le test de validation ; le wolof est une évolution légitime à intégrer en V2 si les données terrain confirment une barrière linguistique réelle.
- **Historique personnalisé des trajets** → éliminé parce que la persistance de données utilisateur suppose une base de données par numéro WhatsApp avec des implications RGPD non adressées en V1, et que la valeur de l'historique n'est pas encore validée comme besoin réel d'Aissatou.
- **Comparaison multi-axes (Pikine → Plateau vs Guédiawaye → Plateau)** → éliminée parce que la capacité de collecte de données au lancement est limitée à un axe ; un axe bien calibré vaut mieux que deux axes sous-documentés qui génèrent des recommandations non fiables.

---

### Critère de Validation Final

Le MVP est valide si et seulement si : au moins 20 usagers de l'axe Pikine → Plateau déclarent, après 4 semaines d'utilisation de NakaBus, être arrivés en retard moins d'une fois par semaine — contre une moyenne de 3 retards par semaine avant l'usage du service — et avoir réduit leur heure de lever d'au moins 20 minutes grâce à la recommandation d'heure reçue.
