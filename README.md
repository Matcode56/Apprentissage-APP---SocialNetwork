# SocialNetwork

Réalisation de mon projet Perso SocialNetwork.

Objectif du projet: Réalisation d'un réseau social dédiés au sportif.

MVP prévu:

1) Inclure sur le profil, sa diet alimentaire et ses objectifs sportifs.
2) Poster du texte ainsi que des images. (vidéo par la suite)
3) Une partie admistrateur
4) Follow/Unfollow User
5) Like/Unlike post
6) Comment post


Ambition du projet:

1) Section partage de ressources/conseils/expérience: vidéo, article, témoignage..
2) Section diet alimentaire
3) Section Objectif/Performance
4) Section général
5) Algorithme de rencontre de partenaire d'entrainement près de chez soit selon le sport pratiqué.



Réalisation effectué au 17/11/2021:

Backend: l'API et la base de données.

User:

- Création de la collection User dans la base de données.
- Fonctionnalité CRUD User fait.
- Middleware pour check les donnés des requetes avant interaction avec la base de données.
- Fonctionnalité follow/unfollow ajouté
- Téléchargement et mise à jour photo de profil.

Authentification:

- Mise en place des routes fonctionnelles permettant de se connecter/déconnecter/inscription.
- Hashage automatique des passwords fait.
- Validator email et password mis en place

Post: 

- Middleware pour check les donnés des requete avant interaction avec la base de données fait.
- Création de la collection Post dans la base de données.
- Fonctionnalité Post User fait.
- Fonctionnalité comment/like sur le posts ajotuté.






