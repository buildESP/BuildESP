# Dictionnaire de données

## Table : Utilisateur
Cette table contient les informations relatives aux utilisateurs de l'application.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_utilisateur       | INT (PK)       | Identifiant unique de l'utilisateur                           |
| nom                  | VARCHAR(50)    | Nom de l'utilisateur                                           |
| prénom               | VARCHAR(50)    | Prénom de l'utilisateur                                        |
| email                | VARCHAR(100)   | Adresse email unique de l'utilisateur                          |
| mot_de_passe         | VARCHAR(255)   | Mot de passe crypté pour la connexion                          |
| adresse              | VARCHAR(255)   | Adresse complète de l'utilisateur                              |
| code_postal          | VARCHAR(10)    | Code postal de la zone de résidence de l'utilisateur           |
| téléphone            | VARCHAR(15)    | Numéro de téléphone de l'utilisateur                           |
| note_moyenne         | FLOAT          | Note moyenne basée sur les avis reçus                          |
| date_inscription     | DATETIME       | Date d'inscription de l'utilisateur                           |
| photo_profil         | VARCHAR(255)   | URL de la photo de profil                                      |
| admin                | BOOLEAN        | Indicateur si l'utilisateur est administrateur (true/false)    |

## Table : Bien
Cette table contient les informations relatives aux biens proposés à la location.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_bien             | INT (PK)       | Identifiant unique du bien                                     |
| id_propriétaire      | INT (FK)       | Identifiant de l'utilisateur propriétaire du bien              |
| nom_bien            | VARCHAR(100)   | Nom du bien proposé                                            |
| description         | TEXT           | Description détaillée du bien                                  |
| id_sous_categorie   | INT (FK)       | Identifiant de la sous-catégorie associée au bien              |
| tarif_journalier    | FLOAT          | Tarif journalier de location du bien                           |
| caution             | FLOAT          | Montant de la caution pour la location du bien                 |
| durée_max_location  | INT            | Durée maximale de location en jours                            |
| photos_bien         | VARCHAR(255)   | URL des photos du bien                                         |
| date_publication    | DATETIME       | Date de publication du bien                                    |
| statut              | ENUM           | Statut du bien : Disponible, Loué, Indisponible                |

## Table : Catégorie
Cette table contient les informations relatives aux catégories principales des biens.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_categorie        | INT (PK)       | Identifiant unique de la catégorie                             |
| nom_categorie       | VARCHAR(100)   | Nom de la catégorie (ex : Outils, Électronique)                |

## Table : Sous-catégorie
Cette table contient les informations relatives aux sous-catégories des biens, rattachées à une catégorie.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_sous_categorie   | INT (PK)       | Identifiant unique de la sous-catégorie                        |
| id_categorie        | INT (FK)       | Identifiant de la catégorie à laquelle appartient la sous-catégorie |
| nom_sous_categorie  | VARCHAR(100)   | Nom de la sous-catégorie (ex : Perceuses, Appareils photo)     |

## Table : Location
Cette table gère les transactions de location entre un locataire et un propriétaire pour un bien.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_location         | INT (PK)       | Identifiant unique de la transaction de location               |
| id_bien             | INT (FK)       | Identifiant du bien loué                                       |
| id_locataire        | INT (FK)       | Identifiant de l'utilisateur locataire                         |
| date_début          | DATETIME       | Date et heure de début de la location                          |
| date_fin            | DATETIME       | Date et heure de fin de la location                            |
| statut_location     | ENUM           | Statut de la location : En attente, Approuvée, Terminée, Annulée|

## Table : Avis
Cette table contient les avis laissés par les utilisateurs après une location.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_avis             | INT (PK)       | Identifiant unique de l'avis                                   |
| id_location         | INT (FK)       | Identifiant de la transaction de location concernée            |
| id_auteur           | INT (FK)       | Identifiant de l'utilisateur ayant laissé l'avis               |
| note                | INT            | Note donnée (1 à 5)                                            |
| commentaire         | TEXT           | Commentaire optionnel laissé par l'auteur de l'avis            |
| date_publication    | DATETIME       | Date de publication de l'avis                                  |

## Table : Message
Cette table gère les messages échangés entre les utilisateurs via l’application.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_message          | INT (PK)       | Identifiant unique du message                                  |
| id_envoyeur         | INT (FK)       | Identifiant de l'utilisateur envoyant le message               |
| id_recepteur        | INT (FK)       | Identifiant de l'utilisateur recevant le message               |
| contenu_message     | TEXT           | Contenu du message                                             |
| date_envoi          | DATETIME       | Date et heure d'envoi du message                               |

## Table : Groupe
Cette table contient les informations relatives aux groupes auxquels les utilisateurs et les biens peuvent être associés.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_groupe           | INT (PK)       | Identifiant unique du groupe                                   |
| nom_groupe          | VARCHAR(100)   | Nom du groupe                                                  |
| description_groupe  | TEXT           | Description du groupe                                          |
| date_creation       | DATETIME       | Date de création du groupe                                     |
| id_admin_groupe     | INT (FK)       | Identifiant de l'utilisateur administrateur du groupe          |

## Table : Appartenance Groupe Utilisateur
Cette table gère l'appartenance des utilisateurs à des groupes.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_appartenance     | INT (PK)       | Identifiant unique de l'appartenance                           |
| id_utilisateur      | INT (FK)       | Identifiant des utilisateurs admin                                   |
| id_groupe           | INT (FK)       | Identifiant du groupe                                          |

## Table : Appartenance Groupe Bien
Cette table gère l'appartenance des biens à des groupes.

| Attribut            | Type           | Description                                                   |
|---------------------|----------------|---------------------------------------------------------------|
| id_appartenance     | INT (PK)       | Identifiant unique de l'appartenance                           |
| id_bien             | INT (FK)       | Identifiant du bien                                            |
| id_groupe           | INT (FK)       | Identifiant du groupe                 