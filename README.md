# ESI-Connect — point de départ des séances de finalisation

État du projet : **fin de semaine 4**.
L'API tourne sur PostgreSQL, mais **il n'y a pas encore d'authentification** :
l'identité (studentId, tutorId) est encore transmise dans le corps ou l'URL de
la requête — c'est le bricolage assumé de la semaine 4, et c'est exactement le
problème que la séance 1 va résoudre.

## Structure actuelle

```
esi-connect/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── routes/          request.routes.js, subject.routes.js
│   └── controllers/     request.controller.js, subject.controller.js
├── database/            schema.sql, seed.sql
└── prototype/           prototype statique des semaines 1-2
```

## Lancer

```bash
sudo service postgresql start
sudo -u postgres psql -c "CREATE USER esi WITH PASSWORD 'esi123';"
sudo -u postgres psql -c "CREATE DATABASE esi_connect OWNER esi;"
psql -h localhost -U esi -d esi_connect -f database/schema.sql
psql -h localhost -U esi -d esi_connect -f database/seed.sql

cd backend
cp .env.example .env      # renseigner DB_USER / DB_PASSWORD
npm install
npm run dev               # http://localhost:5000
```

## Vérifier que tout marche (avant la séance)

```bash
curl "http://localhost:5000/api/subjects"
curl "http://localhost:5000/api/requests/pending"
curl "http://localhost:5000/api/requests/my?studentId=1"
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{"studentId":1,"subjectId":2,"title":"Test","description":"Test desc","difficulty":"Beginner"}'
```

Remarque la dernière commande : **n'importe qui peut créer une demande au nom
de n'importe quel étudiant.** C'est la démonstration d'ouverture de la séance 1.

## Ce qui sera ajouté

**Séance 1 — authentification et rôles**
- `npm install bcrypt jsonwebtoken`, `JWT_SECRET` dans .env
- `controllers/auth.controller.js` + `routes/auth.routes.js` (register, login)
- `middlewares/auth.middleware.js` (authenticate, authorizeRoles)
- gardes sur les routes, `req.user.id` à la place des identités du corps
- schema : `password_hash` réel + contraintes CHECK

**Séance 2 — frontend complet sans React**
- `frontend-vanilla/` : index.html + app.js connectés à l'API

## Comptes du seed

| Email | Rôle | id |
|---|---|---|
| alex.martin@esi.dz | STUDENT | 1 |
| sara.belkacem@esi.dz | STUDENT | 2 |
| yasmine.hamidi@esi.dz | TUTOR | 3 |
| karim.benali@esi.dz | TUTOR | 4 |

Les mots de passe ne sont pas encore gérés (`not_hashed_yet` en base).
