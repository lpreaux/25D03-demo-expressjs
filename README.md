# demo-express

Petite API REST de démonstration construite avec [Express 5](https://expressjs.com/), à vocation **pédagogique**. Elle gère une ressource « villes » et illustre la différence entre une route qui mélange HTTP et données, et une architecture séparant le **router** (HTTP) du **model** (données) — une première approche du patron **MVC**.

## Prérequis

- [Node.js](https://nodejs.org/) (version supportant les ES Modules et `node --watch`, soit Node 18+)
- npm

## Installation

```bash
npm install
```

## Démarrage

```bash
# Mode normal
npm start

# Mode développement (redémarrage auto à chaque modification)
npm run dev
```

Le serveur écoute sur le port défini par la variable d'environnement `PORT`, ou `3000` par défaut.

Vérification rapide :

```bash
curl http://localhost:3000/
# → Hello World!
```

## API — ressource `villes`

Les données sont stockées **en mémoire** : elles sont réinitialisées à chaque redémarrage du serveur (jeu de départ : `Paris`, `Lyon`).

| Méthode | Route          | Description                  | Corps (JSON)        |
|---------|----------------|------------------------------|---------------------|
| GET     | `/villes`      | Lister toutes les villes     | —                   |
| GET     | `/villes/:id`  | Récupérer une ville          | —                   |
| POST    | `/villes`      | Créer une ville              | `{ "nom": "Lille" }`|
| PUT     | `/villes/:id`  | Modifier une ville           | `{ "nom": "Lille" }`|
| DELETE  | `/villes/:id`  | Supprimer une ville          | —                   |

### Exemples

```bash
# Lister
curl http://localhost:3000/villes

# Créer
curl -X POST http://localhost:3000/villes \
  -H "Content-Type: application/json" \
  -d '{"nom":"Lille"}'

# Modifier
curl -X PUT http://localhost:3000/villes/1 \
  -H "Content-Type: application/json" \
  -d '{"nom":"Marseille"}'

# Supprimer
curl -X DELETE http://localhost:3000/villes/1
```

## Structure du projet

```
src/
├── app.js                          # Point d'entrée : crée le serveur, branche les middlewares et le router
├── models/
│   └── ville.model.js              # Couche données : findAll, findById, create, update, delete
└── routers/
    ├── villes-avec-model.js        # Router REST qui délègue au model (version recommandée, utilisée par app.js)
    └── villes.router.js            # Même API, mais données et logique écrites dans le router (à comparer)
```

## Note pédagogique

Deux routers offrent **la même API** pour comparer deux approches :

- **`villes.router.js`** — les données et la logique d'accès sont écrites directement dans le router. Le fichier mélange deux responsabilités (HTTP + données) et la logique n'est pas réutilisable.
- **`villes-avec-model.js`** *(branché dans `app.js`)* — le router se concentre sur le HTTP et délègue toute la manipulation des données à `VillesModel`. C'est la bonne pratique : code plus court, réutilisable et plus simple à faire évoluer (par exemple pour brancher une vraie base de données, seul le model changerait).

Pour tester l'autre version, modifiez l'import dans [src/app.js](src/app.js#L15) :

```js
import { router as villesRouter } from './routers/villes.router.js';
```
