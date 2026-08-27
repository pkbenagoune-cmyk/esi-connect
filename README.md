# ESI-Connect — Plateforme de tutorat entre pairs

Application de mise en relation étudiants-tuteurs avec messagerie temps réel,
système d'avis, statistiques et classement bayésien.

## Stack technique

- **Backend** : Node.js, Express, PostgreSQL, Socket.IO
- **Frontend** : React, Tailwind CSS
- **Authentification** : JWT (access token)

## Démarrage rapide

### Prérequis

- PostgreSQL installé et démarré
- Node.js 18+

### Base de données

```bash
sudo service postgresql start
sudo -u postgres psql -c "CREATE USER esi WITH PASSWORD 'votre_mot_de_passe';"
sudo -u postgres psql -c "CREATE DATABASE esi_connect OWNER esi;"
psql -h localhost -U esi -d esi_connect -f database/schema.sql
psql -h localhost -U esi -d esi_connect -f database/seed.sql
```

### Backend

```bash
cd backend
cp .env.example .env      # renseigner DB_PASSWORD et JWT_SECRET
npm install
npm run dev               # http://localhost:5000
```

### Frontend

```bash
cd frontend-react
npm install
npm run dev               # http://localhost:5173
```

## Architecture

    esi-connect/
    ├── backend/
    │   ├── middlewares/
    │   │   ├── authMiddleware.js  # vérification JWT + rôles
    │   │   └── validateRequest.js # validation des données
    │   ├── routes/
    │   │   ├── auth.routes.js     # register, login
    │   │   ├── request.routes.js  # demandes + messages + avis
    │   │   ├── subject.routes.js  # matières
    │   │   └── tutor.routes.js    # stats, classement
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   ├── request.controller.js
    │   │   ├── message.controller.js
    │   │   ├── rating.controller.js
    │   │   ├── tutor.controller.js
    │   │   └── subject.controller.js
    │   └── sockets/
    │       └── index.js           # événements temps réel
    ├── database/
    │   ├── schema.sql
    │   └── seed.sql
    └── frontend-react/
        ├── src/
        │   ├── pages/             # routes React
        │   ├── components/        # composants réutilisables
        │   ├── services/          # api.js, socket.js
        │   └── context/           # AuthContext
        └── index.html

## API REST

### Authentification

| Méthode | Route | Description | Rôle |
|---|---|---|---|
| POST | /api/auth/register | Inscription | public |
| POST | /api/auth/login | Connexion | public |

### Demandes

| Méthode | Route | Description | Rôle |
|---|---|---|---|
| GET | /api/requests/completed/public | Mur public | public |
| GET | /api/requests/stats/public | Stats publiques | public |
| POST | /api/requests | Créer une demande | STUDENT |
| GET | /api/requests/my | Mes demandes | STUDENT |
| GET | /api/requests/pending | Demandes en attente | TUTOR |
| GET | /api/requests/tutor/my | Mes demandes (tuteur) | TUTOR |
| PATCH | /api/requests/:id/accept | Accepter une demande | TUTOR |
| PATCH | /api/requests/:id/respond | Répondre | TUTOR |
| PATCH | /api/requests/:id/complete | Terminer | TUTOR |
| GET | /api/requests/conversations | Liste des conversations | authentifié |

### Messages

| Méthode | Route | Description | Rôle |
|---|---|---|---|
| GET | /api/requests/:id/messages | Messages d'une demande | participant |
| POST | /api/requests/:id/messages | Envoyer un message | participant |
| PATCH | /api/requests/:id/messages/read | Marquer comme lus | participant |

### Avis

| Méthode | Route | Description | Rôle |
|---|---|---|---|
| POST | /api/requests/:id/rating | Créer un avis | STUDENT |
| PATCH | /api/requests/:id/rating | Modifier un avis (24h) | STUDENT |
| GET | /api/requests/:id/rating | Voir l'avis | participant |

### Tuteurs

| Méthode | Route | Description | Rôle |
|---|---|---|---|
| GET | /api/tutors/top | Classement bayésien | public |
| GET | /api/tutors/me/stats | Mes stats | TUTOR |
| GET | /api/tutors/:id/stats | Stats d'un tuteur | public |
| GET | /api/subjects | Liste des matières | public |

## Événements Socket.IO

| Événement | Direction | Description |
|---|---|---|
| join-conversation | client → serveur | Rejoindre une room |
| leave-conversation | client → serveur | Quitter une room |
| send-message | client → serveur | Envoyer un message |
| typing | client → serveur | Indiquer qu'on écrit |
| new-message | serveur → client | Nouveau message reçu |
| user-typing | serveur → client | L'autre écrit |
| unread-notification | serveur → client | Notification de non-lu |

## Décisions de conception

### Pourquoi les messages sont rattachés à une demande

Une conversation n'existe pas indépendamment d'une demande de tutorat. L'URL
/api/requests/4/messages se lit : "les messages de la demande 4". Cette
hiérarchie REST reflète la structure métier : pas de message sans contexte
pédagogique.

### Pourquoi 404 et non 403 à un non-participant

Quand un utilisateur tente d'accéder à une conversation sans y participer,
le serveur renvoie 404 (Not Found), pas 403 (Forbidden). C'est une
décision de sécurité : 403 révélerait l'existence de la conversation. 404
donne la même réponse que si l'ID n'existait pas — impossible de différencier
"n'existe pas" de "tu n'y as pas accès".

### Pourquoi tutor_id est dupliqué dans ratings

La table ratings contient request_id (la demande) et tutor_id (le tuteur

## Décisions de conception

### Pourquoi les messages sont rattachés à une demande

Une conversation n'existe pas indépendamment d'une demande de tutorat. L'URL
/api/requests/4/messages se lit : "les messages de la demande 4". Cette
hiérarchie REST reflète la structure métier : pas de message sans contexte
pédagogique.

### Pourquoi 404 et non 403 à un non-participant

Quand un utilisateur tente d'accéder à une conversation sans y participer,
le serveur renvoie 404 (Not Found), pas 403 (Forbidden). C'est une
décision de sécurité : 403 révélerait l'existence de la conversation. 404
donne la même réponse que si l'ID n'existait pas — impossible de différencier
"n'existe pas" de "tu n'y as pas accès".

### Pourquoi tutor_id est dupliqué dans ratings

La table ratings contient request_id (la demande) et tutor_id (le tuteur
noté). Cette duplication dénormalisée évite une jointure systématique avec
tutoring_requests pour connaître le tuteur noté. Le coût en espace est
minime ; le gain en lisibilité et performance des requêtes de classement est
significatif.

### Pourquoi on attrape le code 23505 plutôt qu'un SELECT préalable

Le code 23505 est l'erreur PostgreSQL de violation d'unicité. Quand un
étudiant tente de créer un deuxième avis sur la même demande, la contrainte
UNIQUE(request_id) déclenche cette erreur. Attraper l'exception est atomique
et sans course critique : entre le SELECT et l'INSERT, un autre processus
pourrait insérer la même ligne. La contrainte en base est le garde-fou ultime.

### Pourquoi une moyenne bayésienne

Le classement des tuteurs utilise une moyenne bayésienne plutôt qu'une
moyenne arithmétique simple. Cela évite qu'un tuteur avec un seul avis à 5
étoiles dépasse un tuteur avec cinquante avis à 4,8.

Formule : (C × moyenne_globale + N × moyenne_tuteur) / (C + N)

- C = constante de confiance (10) — nombre d'avis "fictifs" de la moyenne
  globale
- N = nombre d'avis réels du tuteur
- moyenne_globale = moyenne de tous les avis de la plateforme

Avec C = 10, un tuteur doit avoir au moins 10 avis pour que sa moyenne
personnelle pèse autant que la moyenne globale. C'est un compromis entre
nouveauté (les bons débutants montent) et fiabilité (les tuteurs établis
sont protégés du bruit).

## Comptes du seed

| Email | Rôle | id |
|---|---|---|
| alex.martin@esi.dz | STUDENT | 1 |
| sara.belkacem@esi.dz | STUDENT | 2 |
| yasmine.hamidi@esi.dz | TUTOR | 3 |
| karim.benali@esi.dz | TUTOR | 4 |

Les mots de passe sont : password123
