## Métriques de Succès — NakaBus

### MVP

Service WhatsApp envoyé en moins de 3 secondes avec recommandation
d'heure de départ (heure · axe · conditions trafic) à des navetteurs
de l'axe Pikine → Plateau — smartphone uniquement, sans app à
installer, sans inscription, sans coût perçu pour l'utilisateur.

---

### ⭐ Métrique Nord

**Indicateur :** Taux d'utilisation active en décision de départ —
pourcentage d'usagers actifs qui déclarent avoir suivi la recommandation
NakaBus pour décider de leur heure de départ au moins une fois dans
la semaine écoulée.

**Valeur cible à 30 jours :** 60% des usagers actifs (soit au minimum
18 usagers sur 30) déclarent avoir agi sur la base de la recommandation
reçue sur les 7 derniers jours.

**Comment mesurer :** Appel vocal ou message WhatsApp hebdomadaire de
3 minutes par un membre NakaBus à chaque usager actif, avec une seule
question directe : "Est-ce que tu as utilisé l'heure que NakaBus t'a
envoyée cette semaine pour décider quand partir ?" — réponse oui/non
reportée dans un carnet de suivi avec date et trajet concerné.
Consolidation manuelle chaque lundi matin.

---

### 📈 Métriques de Progression

#### Métrique P1

**Indicateur :** Taux de rétention à 30 jours — pourcentage d'usagers
ayant utilisé le service en J1 qui sont toujours actifs et n'ont pas
arrêté d'envoyer des messages à J30.

**Valeur cible à 30 jours :** 60% de rétention (soit 18 usagers sur
30 encore actifs à J30 sans relance active de NakaBus).

**Comment mesurer :** Liste des numéros actifs avec date du premier et
du dernier message entrant, tenue manuellement par le membre NakaBus
en charge des logs WhatsApp Business ; un usager est considéré inactif
s'il n'a envoyé aucun message depuis 7 jours consécutifs.

---

#### Métrique P2

**Indicateur :** Fiabilité perçue de la recommandation d'heure —
pourcentage de recommandations jugées "dans le bon ordre de grandeur"
par l'usager après son trajet du jour, c'est-à-dire avec un écart
inférieur à 10 minutes entre l'heure recommandée et l'heure d'arrivée
réelle au Plateau.

**Valeur cible à 30 jours :** 70% des recommandations évaluées jugées
fiables par les usagers interrogés (mesure sur un échantillon de
10 trajets déclarés par semaine).

**Comment mesurer :** Le membre NakaBus pose la question le soir du
trajet : "L'heure que NakaBus t'a donnée ce matin, tu es arrivé(e)
à l'heure au travail ?" — réponse sur 3 niveaux (oui, à peu près,
non) reportée dans le carnet ; écart estimé noté si l'usager
se souvient de son heure d'arrivée réelle.

---

#### Métrique P3

**Indicateur :** Taux de bouche-à-oreille organique — nombre de
nouveaux usagers recrutés par recommandation directe d'un usager
existant, sans démarchage actif de NakaBus.

**Valeur cible à 30 jours :** 5 nouveaux usagers recrutés spontanément
par recommandation d'un pair sur les 30 jours du MVP (soit un
coefficient de viralité minimal de 0,17 sur la base de 30 usagers
initiaux).

**Comment mesurer :** À la première interaction de chaque nouvel
usager, le membre NakaBus demande en message de bienvenue :
"Comment tu as entendu parler de NakaBus ?" — si le nom ou le
numéro cité est celui d'un usager existant, la source est notée
dans le carnet ; aucun outil numérique requis.

---

### 🚨 Métriques d'Alerte

#### Alerte A1

**Signal :** Taux de non-réponse du service avant 6h — proportion
d'usagers qui, lors du check hebdomadaire, déclarent ne pas avoir
reçu de réponse NakaBus un ou plusieurs matins dans la semaine
écoulée, ou avoir reçu une réponse après 6h.

**Seuil :** Déclenchement si plus de 20% des usagers actifs signalent
une non-réponse ou un délai excessif sur une même semaine, soit
6 usagers sur 30 affectés — ce seuil indique une défaillance
systémique du service, et non un incident isolé.

**Action corrective :** Suspension de l'opération automatique le
lendemain + audit en 24h de la chaîne complète (opérateur WhatsApp
Business disponible ? connexion du serveur stable ? collecte des
données trafic effectuée ?) + message vocal d'excuse aux usagers
affectés pour maintenir la confiance avant la reprise.

---

#### Alerte A2

**Signal :** Taux d'abandon hebdomadaire — nombre d'usagers n'ayant
envoyé aucun message pendant 7 jours consécutifs dans la même
semaine calendaire.

**Seuil :** Déclenchement si 3 abandons ou plus sont constatés dans
la même semaine (soit 10% du panel initial en 7 jours) — ce rythme,
s'il se répète deux semaines consécutives, conduit à un panel non
représentatif avant J30 et invalide la Métrique Nord.

**Action corrective :** Message WhatsApp individuel de compréhension
auprès de chaque usager inactif dans les 48h ("on t'a plus vu cette
semaine — est-ce qu'il y a quelque chose qu'on peut améliorer ?")
pour distinguer une cause corrigeable (réponse trop tardive, format
peu clair, heure inexacte) d'un rejet de fond (service non pertinent
pour son trajet) — résultat présenté en rétrospective NakaBus avant
la semaine suivante.

---

### Tableau de Bord S6

À la démo S6, nous présenterons ces 3 chiffres :

1. **Métrique Nord — Taux d'utilisation en décision de départ :**
   X% des usagers actifs ont suivi la recommandation NakaBus
   cette semaine (cible : 60%)
2. **Métrique P1 — Taux de rétention à 30 jours :** X usagers sur 30
   encore actifs sans relance (cible : 18/30)
3. **Alerte A1 — Fiabilité de la chaîne de réponse :**
   déclenchée / non déclenchée — et si déclenchée, cause identifiée
   et action corrective appliquée
