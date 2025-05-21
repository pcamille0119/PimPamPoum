# Site du gîte Pim sur l'île de Pam à Poum
###### ECF AT1

### Contributeurs
_Développeur web et web mobile :
- Patrick

###  Refactorisation et améliorations apportées
- Réservation de chambre
- Sélection des dates d’arrivée et de départ.
- Nombre d'invités.
- Liste des chambres disponibles dynamiquement filtrée.
- Intégration d’un système de pop-up centrée pour confirmation.
- Génération automatique d’un numéro de réservation (ex: CH25040123)
- Enregistrement des réservations dans le localStorage.
- Intégration d’un module météo affichant les prévisions à la date d’arrivée (API WeatherAPI).

### Réservation d’activité
- Un seul formulaire centralisé pour toutes les activités : repas, kayak, bagne, cheval, garderie
- Affichage dynamique des créneaux selon l’activité sélectionnée
- Adaptation du formulaire (libellés, options) selon le contexte (ex: “Nombre d’enfants” pour la garderie)
- Bloc météo synchronisé avec la date sélectionnée
### Couplage avec la réservation de chambre
- L’utilisateur doit fournir un numéro de réservation de chambre valide
- Les dates de réservation d'activité sont automatiquement limitées aux dates de séjour enregistrées
- Vérification instantanée du numéro saisi :
- Si valide → le formulaire est débloqué
- Si invalide → le formulaire reste désactivé


### Prochaine étape
- Ajout du Logo de connexion
- Ajout d'une page de connexion
- Ajout du panneau admin
- Ajout de la partie Back du projet

