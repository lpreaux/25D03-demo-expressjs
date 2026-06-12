// ===================================================================
//  POINT D'ENTRÉE DE L'APPLICATION
// -------------------------------------------------------------------
//  C'est le fichier lancé par "npm start" (voir package.json).
//  Son rôle : créer le serveur, le configurer, et le mettre à l'écoute.
// ===================================================================

// On importe la bibliothèque Express (installée via npm).
// Express est un framework qui simplifie la création d'un serveur web en Node.js.
import express from 'express';

// On importe NOTRE router dédié aux villes.
// Un "router" regroupe toutes les routes liées à une même ressource (ici : les villes).
// Cela évite de tout écrire dans ce fichier et garde le code organisé.
import { router as villesRouter } from './routers/villes-avec-model.js';

// On crée l'application Express. L'objet "app" représente notre serveur.
const app = express();


// --- MIDDLEWARES (logiciels intermédiaires exécutés à chaque requête) ---

// express.json() lit le corps (body) des requêtes au format JSON
// et le rend disponible dans "req.body".
// Sans ce middleware, "req.body" serait "undefined" lors d'un POST ou d'un PUT.
app.use(express.json());

// On "branche" le router des villes sur le préfixe d'URL "/villes".
// Concrètement : une route "/" définie dans le router répondra à l'URL "/villes",
// et une route "/:id" répondra à "/villes/:id".
app.use('/villes', villesRouter);

// Route de base, juste pour vérifier que le serveur répond.
// req  = la requête reçue du client (navigateur, Postman...).
// res  = la réponse que l'on renvoie au client.
app.get('/', (req, res) => {
  console.log('Received a GET request to the root path.');
  res.send('Hello World!');
});

// --- DÉMARRAGE DU SERVEUR ---

// On choisit le port : celui défini dans l'environnement (process.env.PORT)
// ou, par défaut, le port 3000.
const PORT = process.env.PORT || 3000;

// app.listen() démarre le serveur et le met à l'écoute des requêtes sur ce port.
// La fonction passée en second argument s'exécute une fois le serveur prêt.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
