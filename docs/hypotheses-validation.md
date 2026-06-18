## Hypothèses de Validation — NakaBus

### HMW Définitif

"Comment pourrions-nous construire un service léger, sans app,
porté par la communauté des usagers, qui redonne à Aissatou
le contrôle de sa matinée en un seul message ?"

---

### Hypothèses CRITIQUES

#### Hypothèse C1 — Adoption réelle du chatbot WhatsApp au quotidien

**Affirmation :** Nous croyons qu'Aissatou est prête à envoyer un message WhatsApp chaque matin avant de quitter son domicile pour recevoir son heure de départ recommandée — et que cette action s'intègre naturellement dans sa routine sans représenter une friction supplémentaire dans une matinée déjà stressante.

**Indicateur :** Nous le saurons si au moins 4 usagers sur 5 recrutés sur l'axe Pikine → Plateau utilisent le service au moins 3 jours sur 5 lors d'un test de 5 jours consécutifs, sans relance de notre part après le premier jour.

**Méthode :** Prototype Wizard of Oz : un membre de NakaBus répond manuellement aux messages WhatsApp entrants pendant 5 jours, en simulant la réponse automatique « Pars à HH:MM » en moins de 3 secondes. Debriefing vocal de 5 minutes le soir du 3e et du 5e jour avec chaque testeur sur leur expérience d'utilisation et les frictions rencontrées.

**Qui valide :** 1 opérateur NakaBus (réponses manuelles) + 5 usagers recrutés à l'arrêt principal de Pikine via bouche-à-oreille.

**Délai S3 :** 5 jours de test + 2 jours d'analyse = résultat disponible en fin de semaine 1 du sprint S3.

---

#### Hypothèse C2 — Fiabilité suffisante des données historiques pour estimer l'heure de départ

**Affirmation :** Nous croyons que les données historiques de trafic sur l'axe Pikine → Plateau — collectées manuellement par heure et par jour de semaine sur 2 semaines — suffisent à produire une estimation d'heure de départ avec un écart moyen inférieur à 10 minutes par rapport au trajet réel, sans GPS ni tracking en temps réel.

**Indicateur :** Nous le saurons si, sur 30 trajets relevés et comparés à nos estimations, l'écart moyen entre heure recommandée et heure d'arrivée effective est inférieur à 10 minutes dans au moins 70 % des cas.

**Méthode :** Relevé manuel de 30 trajets réels sur 2 semaines (heure de départ, heure d'arrivée, jour, conditions observées) par 2 membres NakaBus faisant eux-mêmes le trajet ou récoltant les données auprès d'usagers réguliers volontaires ; comparaison avec les estimations produites par notre modèle simplifié heure × jour.

**Qui valide :** 2 membres NakaBus (collecte terrain) + tableau de comparaison estimation vs réel sur 30 trajets.

**Délai S3 :** Collecte J1–J14, analyse J15–J16 — résultat complet à mi-sprint S3.

---

#### Hypothèse C3 — Recrutement et fiabilité des sentinelles volontaires

**Affirmation :** Nous croyons que des usagers réguliers de l'arrêt Pikine principal acceptent de signaler gratuitement le passage d'un bus via un mot-clé WhatsApp simple (ex : « passé »), sans app à installer et sans rémunération, à condition que la démarche soit perçue comme utile pour leur propre communauté d'arrêt.

**Indicateur :** Nous le saurons si 3 sentinelles recrutées sur 5 envoient au moins 1 signal par jour pendant 1 semaine consécutive sans relance quotidienne de notre part.

**Méthode :** Recrutement direct à l'arrêt lors de 2 sessions de terrain (pitch oral de 2 minutes, sans support écrit) ; onboarding par un seul message WhatsApp expliquant le mot-clé ; suivi des signaux entrants pendant 7 jours ; appel de 3 minutes à J7 pour recueillir leur retour sur la motivation à continuer.

**Qui valide :** 1 membre NakaBus (recrutement + suivi) + log des messages entrants sur 7 jours.

**Délai S3 :** Recrutement J1–J2, test opérationnel J3–J9, analyse J10 — parallélisable avec C1 et C2.

---

### Hypothèses IMPORTANTES

#### Hypothèse I1 — Utilisation de WhatsApp avant 6h du matin

**Affirmation :** Nous croyons qu'Aissatou utilise effectivement WhatsApp avant 6h du matin dans sa routine quotidienne, et que lui envoyer un message à cette heure ne représente ni une friction technique (connexion, batterie) ni une friction sociale (notifications, entourage endormi).

**Indicateur :** Nous le saurons si la confirmation orale de 5 usagers interrogés, croisée avec l'observation de leurs horaires d'envoi réels pendant le test C1, montre une activité WhatsApp effective avant 6h sur au moins 4 jours sur 5.

**Méthode :** Question directe lors de l'entretien de recrutement C1 + observation des horodatages réels des messages entrants pendant les 5 jours de test Wizard of Oz.

**Qui valide :** 1 membre NakaBus + données d'horodatage des messages WhatsApp entrants.

**Délai S3 :** Résultat obtenu en parallèle du test C1, sans effort additionnel — semaine 1 de S3.

---

#### Hypothèse I2 — Acceptabilité d'un service sans inscription ni compte

**Affirmation :** Nous croyons qu'Aissatou et les usagers cibles adoptent plus facilement un service où le premier message envoyé génère directement une réponse utile, sans étape d'inscription, de mot de passe ou de confirmation — et que cette absence de friction est un facteur d'adoption déterminant sur ce segment.

**Indicateur :** Nous le saurons si 100 % des testeurs recrutés pour C1 envoient leur premier message sans demander d'aide, et si aucun abandon n'est constaté à l'étape d'envoi initial.

**Méthode :** Observation silencieuse lors de la première interaction (le testeur envoie son premier message seul, sans guidage en temps réel) + question ouverte en debriefing : « Qu'est-ce qui t'aurait freiné si on t'avait demandé de créer un compte ? »

**Qui valide :** 1 facilitateur NakaBus en observation + verbatims de debriefing sur 5 testeurs.

**Délai S3 :** Données collectées en semaine 1, parallèle au test C1 — sans surcoût opérationnel.

---

### Hypothèses SECONDAIRES

#### Hypothèse S1 — Lisibilité et mémorisation du format de réponse

**Affirmation :** Nous croyons qu'Aissatou est capable de lire, comprendre et retenir une réponse au format « Pars à 6h20 aujourd'hui — trafic normal » sur son smartphone milieu de gamme, et d'agir en conséquence sans avoir besoin de relire le message au moment de quitter son domicile.

**Indicateur :** Nous le saurons si 8 testeurs sur 10 peuvent citer spontanément l'heure recommandée 30 minutes après réception, lors d'une question orale de contrôle, sans relire leur téléphone.

**Méthode :** Test de 3 formats de réponse différents (longueur, structure, niveau de détail) sur 10 usagers ; question de rappel oral 30 minutes après réception ; score de mémorisation sur grille simple à 3 critères (heure, message, action).

**Qui valide :** 1 facilitateur NakaBus + grille de mémorisation à 3 critères sur 10 testeurs.

**Délai S3 :** Test réalisable en 1 journée terrain + 1 journée d'analyse — à planifier en fin de S3 une fois le format C1 stabilisé.

---

#### Hypothèse S2 — Pertinence de l'axe Pikine → Plateau comme périmètre V1

**Affirmation :** Nous croyons que l'axe Pikine → Plateau concentre suffisamment d'usagers réguliers partageant les mêmes contraintes horaires (départ 5h30–6h30, arrivée souhaitée avant 8h) pour constituer un périmètre V1 cohérent et testé sans extension d'autres axes dès S3.

**Indicateur :** Nous le saurons si l'observation terrain à l'arrêt principal de Pikine sur 3 matins consécutifs (6h–7h) révèle au moins 20 usagers réguliers identifiables partageant la même destination (Plateau ou centre-ville) et la même plage horaire.

**Méthode :** Observation directe à l'arrêt sur 3 matins (comptage, destination déclarée, heure de départ) + 5 entretiens flash de 3 minutes pour confirmer la régularité du trajet et la frustration liée à l'attente.

**Qui valide :** 1 membre NakaBus (observation terrain) + données de comptage sur 3 matins.

**Délai S3 :** 3 jours terrain + 1 jour analyse — parallélisable avec les autres hypothèses dès J1 de S3.

---

### Priorité de Validation S3

La première chose à tester en S3 : envoyer manuellement pendant 5 matins consécutifs une recommandation d'heure de départ via WhatsApp à 5 usagers de l'axe Pikine → Plateau, puis les interviewer le soir même pour déterminer si l'heure recommandée était fiable, si elle a été suivie, et si elle a réduit le stress ou le retard du matin.
