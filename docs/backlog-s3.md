
# Backlog S3 — NakaBus

### HMW Définitif

"Comment pourrions-nous construire un service léger, sans app, porté par la communauté des usagers de l'axe Pikine → Plateau, qui redonne à Aissatou le contrôle de sa matinée en lui envoyant une seule information fiable avant qu'elle quitte son domicile ?"

---

### User Stories MUST

*(À construire obligatoirement en S3)*

#### US-01

**Story :** En tant qu'Aissatou, je veux envoyer un message WhatsApp avec mon heure d'arrivée souhaitée au Plateau pour recevoir immédiatement l'heure exacte à laquelle quitter Pikine, afin de partir sans incertitude et sans marge de sécurité excessive.
**Priorité :** MUST
**Outil :** Typebot ou ManyChat (chatbot WhatsApp, zéro app à installer, accessible depuis tout smartphone basique)
**Effort :** Moyen
**Adresse :** Pain Reliever — Éliminer l'incertitude totale à l'arrêt + Gain Creator — Heure de départ exacte envoyée chaque matin avant 6h
**Critère d'acceptation :** Aissatou envoie « 8h00 » et reçoit « Pars à 6h15 aujourd'hui » en moins de 3 secondes, le message ne dépasse pas 2 lignes de texte, fonctionne sur connexion 2G, et aucune inscription ni mot de passe n'est requis pour le premier usage.

---

#### US-02

**Story :** En tant qu'Aissatou, je veux que NakaBus tienne compte du jour de la semaine dans sa recommandation d'heure de départ, afin d'obtenir une estimation adaptée à la réalité du trafic (lundi matin plus chargé que mercredi, veilles de fêtes exceptionnelles).
**Priorité :** MUST
**Outil :** Dify (workflow de calcul d'heure de départ avec variable jour de semaine + données historiques de trafic Pikine → Plateau par créneau horaire)
**Effort :** Moyen
**Adresse :** Pain Reliever — Fiabilité de l'estimation d'heure de départ + Gain Creator — Récupérer du sommeil les jours de trafic fluide
**Critère d'acceptation :** L'heure recommandée un lundi à 8h cible est différente de celle d'un mercredi à même heure, l'écart entre estimation et arrivée réelle est inférieur à 10 minutes dans au moins 70 % des cas mesurés sur 2 semaines de test.

---

#### US-03

**Story :** En tant qu'Aissatou, je veux recevoir une alerte automatique si mon bus habituel est en retard ou annulé, accompagnée d'une alternative concrète (ligne + heure estimée), afin de ne jamais rester bloquée à l'arrêt sans solution de repli.
**Priorité :** MUST
**Outil :** Dify (workflow d'alerte déclenché par signal sentinelle) + Typebot (envoi du message alternatif via WhatsApp)
**Effort :** Moyen
**Adresse :** Pain Reliever — Alternative fiable en cas de panne ou retard + Gain Creator — Ne jamais rester bloquée sans solution
**Critère d'acceptation :** Lorsqu'une sentinelle signale un incident sur l'axe, Aissatou reçoit dans le même message l'alerte ET l'alternative (ex : « Dem Dikk supprimé — prends car rapide ligne 7, départ dans ~15 min ») en moins de 2 minutes, sans aucune action de sa part.

---

#### US-04

**Story :** En tant que sentinelle volontaire sur l'axe Pikine → Plateau, je veux signaler le passage ou le retard d'un bus en envoyant un mot-clé simple via WhatsApp, afin d'alimenter le système sans formulaire ni app à installer.
**Priorité :** MUST
**Outil :** Typebot (réception du mot-clé sentinelle) + Dify (intégration du signal dans le moteur d'estimation)
**Effort :** Faible
**Adresse :** Produit & Service — Réseau de sentinelles communautaires + Pain Reliever — Données terrain en temps réel sans infrastructure lourde
**Critère d'acceptation :** Un seul mot suffit (ex : « passé » ou « bloqué »), la sentinelle reçoit un accusé de réception automatique en moins de 2 secondes, et le signal est intégré dans le moteur d'estimation dans les 30 secondes suivant la réception.

---

#### US-05

**Story :** En tant qu'Aissatou, je veux pouvoir utiliser NakaBus sans créer de compte ni saisir un mot de passe, afin que le premier message soit aussi la première réponse utile, sans friction d'onboarding.
**Priorité :** MUST
**Outil :** Typebot (flux sans authentification, identification par numéro WhatsApp automatique)
**Effort :** Faible
**Adresse :** Contrainte MVP — Zéro inscription + Pain Reliever — Adoption immédiate sans barrière technique
**Critère d'acceptation :** Aissatou envoie son premier message et reçoit une réponse utile sans étape d'inscription, la première interaction complète dure moins de 30 secondes, et le service mémorise son axe habituel dès le deuxième usage sans demande explicite.

---

### User Stories SHOULD

*(À construire si le temps le permet en S3)*

#### US-06

**Story :** En tant qu'Aissatou, je veux recevoir chaque soir avant 22h une recommandation d'heure de départ pour le lendemain matin basée sur le jour de la semaine et les données historiques, afin de pouvoir me lever à l'heure juste sans consulter NakaBus au réveil.
**Priorité :** SHOULD
**Outil :** Dify (workflow d'envoi programmé à 22h) + Typebot (message proactif WhatsApp)
**Effort :** Moyen
**Adresse :** Gain Creator — Partir l'esprit tranquille + Métrique d'impact — Heure de lever quotidien repoussée à 5h30 minimum
**Critère d'acceptation :** Aissatou reçoit chaque soir ouvré avant 22h un message du type « Demain mardi, pour 8h au Plateau : pars à 6h10 », le service ne s'envoie pas les week-ends, et Aissatou peut désactiver la notification proactive sans désactiver le service principal.

---

#### US-07

**Story :** En tant qu'administrateur NakaBus, je veux consulter un tableau de bord hebdomadaire affichant le taux d'utilisation du service, le nombre de sentinelles actives et la précision des estimations d'heure, afin de suivre les métriques clés de la démo S6 sans outil analytique externe.
**Priorité :** SHOULD
**Outil :** Bolt.new (dashboard avec 3 KPIs affichés en temps réel depuis la base de données Dify)
**Effort :** Moyen
**Adresse :** Métriques de succès — Taux de rétention J+7, précision d'estimation < 10 min, nombre de messages envoyés par jour
**Critère d'acceptation :** Le dashboard affiche en temps réel : nombre de requêtes WhatsApp reçues par jour, nombre de sentinelles ayant signalé au moins 1 événement dans la semaine, et écart moyen estimation vs arrivée réelle — toutes les données sont issues de la base sans saisie manuelle supplémentaire.

---

### User Stories COULD

*(Roadmap post-MVP — S4 et au-delà)*

#### US-08

**Story :** En tant qu'usager abonné, je veux parrainer 5 voisins de l'axe pour recevoir un mois de service premium (alertes proactives + historique de trajet), afin d'être récompensé de ma contribution à la croissance du réseau sans démarche administrative.
**Priorité :** COULD
**Outil :** Typebot (suivi parrainage) + Wave API (crédit automatique) + WhatsApp (confirmation)
**Effort :** Élevé
**Adresse :** Gain Creator — Effet réseau naturel sur l'axe Pikine → Plateau + modèle de croissance organique sans budget marketing
**Critère d'acceptation :** Lorsque le 5ème filleul s'inscrit avec le code parrain d'Aissatou, un crédit d'un mois de service premium est automatiquement activé sur son compte avec notification WhatsApp de confirmation — sans intervention manuelle de NakaBus.

---

#### US-09

**Story :** En tant qu'usager, je veux déclarer le temps de trajet réellement effectué après mon arrivée en envoyant un message court (format : LIGNE DURÉE), afin que mes données enrichissent les estimations du lendemain et que je devienne acteur de la fiabilité collective du service.
**Priorité :** COULD
**Outil :** Dify (parsing du message entrant + validation du format + intégration en base) + Typebot (accusé de réception automatique)
**Effort :** Élevé
**Adresse :** Gain Creator — Intelligence collective de l'axe + Produit & Service — Amélioration continue du moteur d'estimation
**Critère d'acceptation :** Un message entrant au format « DDD 55MIN » est parsé, validé et intégré dans la base en moins de 30 secondes, l'usager reçoit un accusé de réception automatique, et les données déclarées sont visibles dans l'interface admin avec flag « terrain » pour les distinguer des données historiques.

---

#### US-10

**Story :** En tant qu'usager sans WhatsApp, je veux interroger NakaBus via USSD (*NKB#) pour consulter la recommandation d'heure de départ du moment, afin d'accéder au service même depuis un feature phone sans data ni application.
**Priorité :** COULD
**Outil :** USSD Gateway (Africa's Talking) + Dify (logique de requête) + base données historiques
**Effort :** Élevé
**Adresse :** Pain Reliever — Accessibilité maximale sur feature phone sans data + Job To Be Done — Décider à quelle heure partir sans dépendre des autres voyageurs
**Critère d'acceptation :** La composition de *NKB# depuis un feature phone Orange ou Free Sénégal affiche en moins de 5 secondes la recommandation d'heure de départ pour l'axe Pikine → Plateau, sans coût pour l'utilisateur, avec heure de collecte visible sur l'écran du menu USSD.

---

### Sprint S3

**Semaine 1 — Construction du moteur de recommandation :** US-01 (chatbot WhatsApp recommandation d'heure) + US-05 (flux sans inscription) + US-04 (réception signal sentinelle) — objectif : avoir un flux WhatsApp fonctionnel de bout en bout, testé sur 5 numéros réels de l'axe Pikine → Plateau d'ici vendredi.

**Semaine 2 — Construction du moteur d'alerte et calibration :** US-02 (prise en compte du jour de semaine) + US-03 (alerte alternative en cas de retard) — objectif : envoyer une recommandation d'heure différenciée lundi vs mercredi et déclencher une alerte alternative réelle depuis un signal sentinelle simulé, le jeudi de la semaine 2.

Si avance constatée en fin de semaine 2 : démarrer US-06 (notification proactive du soir) ou US-07 (dashboard KPIs admin).

**Démo S6 — À démontrer obligatoirement :** US-01 (recommandation d'heure en live depuis WhatsApp devant le jury) + US-03 (alerte alternative déclenchée par signal sentinelle en temps réel) + US-04 (preuve de réception du signal sentinelle et intégration dans le moteur, avec log horodaté visible sur le dashboard).
