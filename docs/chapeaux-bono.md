
# 6 Chapeaux de Bono — NakaBus

## HMW analysé

"Comment pourrions-nous construire un service léger, sans app, porté par la communauté des usagers de l'axe Pikine → Plateau, qui redonne à Aissatou le contrôle de sa matinée en lui envoyant une seule information fiable avant qu'elle quitte son domicile ?"

## 🤍 Chapeau Blanc — Faits & Données

- Aissatou dispose d'un smartphone d'entrée de gamme avec un forfait data limité et une connexion souvent en 2G aux heures de pointe (6h–8h) : toute solution doit fonctionner sans app à installer, avec des messages texte courts et légers, consultables hors connexion stable.
- Le trajet Pikine → Plateau dure entre 45 minutes et 2 heures selon le trafic, sans horaire officiel affiché aux arrêts, sans application de suivi fiable et sans information en temps réel disponible pour les usagers — l'incertitude est structurelle, pas accidentelle.
- Plus de 70 % des Sénégalais utilisent WhatsApp quotidiennement, y compris sur des forfaits très bas : c'est le canal numérique le plus accessible, le plus économe en data et le plus familier pour Aissatou, sans aucune friction d'installation ni d'apprentissage.

## ❤️ Chapeau Rouge — Émotions & Intuitions

- Aissatou vit une résignation apprise : à force de subir les retards sans pouvoir les anticiper, elle a intériorisé que le système ne changera pas — toute solution devra d'abord reconstruire sa confiance avant de changer son comportement, ce qui exige une fiabilité démontrée dès les premiers usages.
- Recevoir un message WhatsApp « Pars à 6h15 aujourd'hui » avant de quitter son domicile déclencherait chez Aissatou un sentiment immédiat de contrôle et de dignité : elle ne subirait plus son trajet, elle le déciderait — la récompense émotionnelle est forte et peut devenir le principal moteur d'adoption et de fidélisation.
- L'intuition de terrain suggère que les usagers réguliers de l'arrêt (sentinelles potentielles) seraient motivés à signaler les passages de bus si la reconnaissance sociale est immédiate et visible — un simple accusé de réception automatique suffira à maintenir leur engagement sans rémunération.

## 🖤 Chapeau Noir — Risques & Critique

- La fiabilité des estimations d'heure est le point de défaillance critique du système : si NakaBus recommande « Pars à 6h15 » et qu'Aissatou arrive en retard à cause d'un incident non signalé, elle abandonnera le service après la première expérience négative — un système sans données terrain en temps réel est plus dangereux qu'aucun système.
- Les sentinelles volontaires sont un point de fragilité structurelle : sans incitation durable, le réseau se dégradera après quelques semaines — les premières sentinelles seront enthousiastes, mais la régularité quotidienne à 5h30 du matin exige une motivation que le bénévolat seul ne garantit pas sur la durée.
- La dépendance à WhatsApp comme canal unique expose le service à une rupture totale en cas de panne de Meta, de modification des politiques d'accès à l'API WhatsApp Business ou de hausse des coûts d'envoi — une solution de repli SMS doit être anticipée dès le MVP.

## 💛 Chapeau Jaune — Optimisme & Valeur

- Un seul message fiable par matin suffit à transformer la matinée d'Aissatou : elle n'a pas besoin d'un suivi GPS en temps réel, elle a besoin d'une seule information actionnable avant de quitter son domicile — la simplicité de la valeur livrée est une force, pas une limite.
- WhatsApp est déjà dans la main d'Aissatou : si NakaBus s'ancre dans un canal qu'elle utilise quotidiennement pour sa famille et ses collègues, la friction d'adoption est quasi nulle — le service s'installe dans son quotidien sans changer ses habitudes, il les complète.
- Le réseau de l'axe Pikine → Plateau est dense et communautaire : si Aissatou constate un gain tangible sur sa ponctualité, cinq voisines et collègues le savent avant la semaine suivante — l'effet bouche-à-oreille est le canal de croissance naturel le plus puissant sur cet axe, sans budget marketing.

## 💚 Chapeau Vert — Créativité & Idées

- Créer un chatbot WhatsApp ultra-léger en 3 messages maximum : Aissatou envoie son heure d'arrivée souhaitée, NakaBus répond « Pars à 6h15 » avec l'axe et le jour — court, lisible sur tout écran, mémorisable avant de sortir, sans image ni carte qui alourdiraient le message en 2G.
- Imaginer un réseau de sentinelles communautaires rémunérées en données : chaque usager régulier de l'axe qui signale un passage de bus reçoit une semaine d'accès prioritaire aux alertes — les usagers deviennent co-producteurs du service, pas seulement consommateurs, ce qui crée une boucle de valeur partagée.
- Tester une notification proactive du soir : la veille à 22h, NakaBus envoie automatiquement « Demain mardi, pour 8h au Plateau : pars à 6h10 » — Aissatou règle son réveil et dort sereinement, sans avoir à consulter le service au réveil dans la précipitation du matin.

## 💙 Chapeau Bleu — Processus & Organisation

- La prochaine étape opératoire est une collecte terrain de 2 semaines sur l'axe Pikine → Plateau pour établir les données historiques minimales (temps de trajet par heure et par jour de semaine) avant de construire quoi que ce soit techniquement — le risque zéro est de coder un moteur d'estimation autour de données que personne n'a encore vérifiées sur le terrain.
- L'atelier suivant doit impérativement inclure au moins 3 usagers réguliers de l'arrêt Pikine comme participants ou interviewés : comprendre leurs habitudes de partage d'information orale est indispensable pour calibrer le système de sentinelles sans créer une rupture avec les pratiques communautaires existantes.
- Un protocole de fiabilité des données doit être défini dès le départ (combien de signaux sentinelles pour valider une estimation ? quel délai de péremption d'une recommandation ? quelle alerte si aucune sentinelle n'a signalé depuis plus de 30 minutes ?) pour que la crédibilité du service soit défendable dès le premier usage d'Aissatou.

## 🔵 Synthèse Chapeau Bleu

**HMW révisé :** "Comment pourrions-nous envoyer à Aissatou, chaque matin avant qu'elle quitte Pikine, une recommandation d'heure de départ fiable et vérifiable — basée sur des données terrain collectées par la communauté des usagers de l'axe — pour qu'elle arrive au Plateau à l'heure depuis une position informée et sereine ?"

**Risques prioritaires :** Fiabilité et fraîcheur des données d'estimation (une recommandation erronée lors du premier usage détruit la confiance immédiatement et définitivement) / Durabilité du réseau de sentinelles (l'enthousiasme initial des volontaires s'érode sans incitation durable — le modèle de motivation doit être conçu avant le lancement, pas après le premier signe d'essoufflement).

**Question ouverte :** Qui alimente le moteur d'estimation chaque matin entre 5h et 6h sur l'axe Pikine → Plateau, avec quelle incitation réelle, selon quelle méthode vérifiable — et comment NakaBus garantit-il la continuité de ce flux de données sans dépendre d'un seul point de défaillance humain ou technique ?
