
# User Stories pour Buildinguerie

## 1. Nouvel utilisateur

Lorsqu'un nouvel utilisateur découvre l'application Buildinguerie, il a besoin de s'inscrire pour accéder aux fonctionnalités principales. L'inscription doit être rapide et facile pour maximiser l'engagement.

### Titre : Création d'un compte utilisateur
- **En tant que** : Nouvel utilisateur découvrant Buildinguerie pour la première fois
- **Je veux** : M'inscrire en utilisant mon adresse e-mail ou un réseau social (Google, Facebook)
- **Afin de** : Accéder à la plateforme, découvrir les offres, et commencer à prêter ou emprunter des objets

#### Détails supplémentaires :
- Après avoir cliqué sur "S'inscrire", je remplis un formulaire simple avec mon nom, adresse e-mail et mot de passe ou me connecte via Google/Facebook.
- Une fois mon compte créé, je suis invité à compléter mon profil avec une photo et des informations de contact pour renforcer la confiance avec mes futurs voisins.
- Ensuite, je reçois une confirmation d'inscription et accède directement à la page d'accueil.

---

## 2. Utilisateur enregistré (prêteur)

L'utilisateur qui possède des objets inutilisés et souhaite les prêter à ses voisins doit pouvoir facilement publier une annonce. Il s'assure que ses objets sont bien visibles pour maximiser les chances de les prêter rapidement.

### Titre : Publication d’une annonce pour un objet à prêter
- **En tant que** : Utilisateur enregistré ayant des objets à prêter
- **Je veux** : Publier une nouvelle annonce avec des informations détaillées sur l’objet
- **Afin de** : Permettre aux autres utilisateurs de voir et emprunter mon objet

#### Détails supplémentaires :
- Je clique sur "Publier une offre", puis je renseigne les détails de l'objet : type, état, disponibilité, etc.
- Je prends une ou plusieurs photos pour montrer l'état réel de l’objet.
- Je peux définir les conditions d'emprunt, telles que la durée maximale de prêt et si je souhaite un dépôt de garantie.
- Une fois l'annonce soumise, elle est automatiquement visible dans les recherches et sur la carte des objets à proximité.

### Titre : Suivi des objets prêtés
- **En tant que** : Utilisateur qui prête régulièrement des objets
- **Je veux** : Pouvoir consulter l'état de mes objets prêtés et gérer les retours
- **Afin de** : Suivre qui a mes objets et m'assurer qu'ils sont retournés à temps

#### Détails supplémentaires :
- Dans ma section "Mes prêts", je vois une liste de tous les objets actuellement prêtés, avec les détails de l'emprunteur et les dates de retour prévues.
- Si un objet n’est pas retourné à temps, je peux envoyer un rappel à l'emprunteur.
- Lorsque l’objet est retourné, je mets à jour son statut pour le rendre à nouveau disponible.

---

## 3. Utilisateur enregistré (emprunteur)

L'utilisateur qui souhaite emprunter un objet utilise l'application pour trouver rapidement ce qu'il cherche. Il souhaite s'assurer que l'objet est proche et disponible dans un état satisfaisant.

### Titre : Recherche et emprunt d’un objet
- **En tant que** : Utilisateur ayant besoin d'emprunter un objet particulier
- **Je veux** : Rechercher un objet spécifique disponible près de chez moi
- **Afin de** : Pouvoir l'emprunter rapidement sans avoir à l'acheter

#### Détails supplémentaires :
- Je saisis un mot-clé dans la barre de recherche, comme "perceuse" ou "échelle".
- Je filtre les résultats par proximité, état de l'objet, et notes des prêteurs pour m'assurer de la qualité.
- Une fois l'objet trouvé, je consulte les conditions de prêt et contacte le prêteur pour organiser le retrait.
- Je reçois une confirmation avec les détails du prêt et les instructions pour récupérer l’objet.

### Titre : Gestion de mes emprunts
- **En tant que** : Emprunteur régulier
- **Je veux** : Suivre mes objets empruntés et connaître les dates de retour
- **Afin de** : M’assurer de rendre les objets à temps et maintenir de bonnes relations avec les prêteurs

#### Détails supplémentaires :
- Dans ma section "Mes emprunts", je vois une liste de tous les objets que j’ai empruntés, avec les dates de retour et les coordonnées des prêteurs.
- Je reçois un rappel avant la date limite de retour pour éviter tout retard.
- Une fois l’objet retourné, je peux évaluer l’expérience avec le prêteur pour donner un feedback sur la qualité de l'échange.

---

## 4. Administrateur

L'administrateur est responsable de la gestion de la plateforme, de la modération des annonces, et du maintien de la sécurité de la communauté. Il doit avoir des outils pour réagir rapidement en cas de problème.

### Titre : Modération des annonces publiées
- **En tant que** : Administrateur de la plateforme
- **Je veux** : Examiner toutes les nouvelles annonces avant qu'elles ne soient visibles pour la communauté
- **Afin de** : M’assurer que les objets publiés respectent les règles de la plateforme et garantir la sécurité des utilisateurs

#### Détails supplémentaires :
- Je reçois une notification chaque fois qu’une nouvelle annonce est soumise.
- Je peux examiner les détails de l'annonce et rejeter celles qui ne respectent pas les directives (objet interdit, description inappropriée).
- Si une annonce est rejetée, j’envoie une notification à l'utilisateur expliquant les raisons du rejet et lui permettant de modifier son annonce.

### Titre : Gestion des utilisateurs
- **En tant que** : Administrateur
- **Je veux** : Accéder à une liste complète des utilisateurs avec leurs niveaux d'activité et signalements
- **Afin de** : Prendre des mesures appropriées pour suspendre ou bannir les utilisateurs problématiques

#### Détails supplémentaires :
- Je consulte les profils d’utilisateurs signalés par la communauté pour non-respect des règles.
- Si un utilisateur a reçu plusieurs signalements, je peux suspendre son compte temporairement ou le bannir définitivement après enquête.
- Je peux aussi approuver les nouvelles inscriptions pour vérifier que les utilisateurs complètent correctement leurs informations de profil.
