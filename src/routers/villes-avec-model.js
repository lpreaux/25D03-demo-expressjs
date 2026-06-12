// ===================================================================
//  ROUTER DES VILLES  —  VERSION "AVEC MODEL"  (recommandée)
// -------------------------------------------------------------------
//  Ce router définit les routes HTTP (GET, POST, PUT, DELETE) pour la
//  ressource "villes". C'est une API REST : chaque verbe HTTP correspond
//  à une action (lire, créer, modifier, supprimer).
//
//  POINT IMPORTANT — le rôle du model :
//  Ici, le router NE manipule PAS directement les données. Il délègue
//  tout au VillesModel (VillesModel.findAll(), .create(), etc.).
//  Le router se concentre donc sur le HTTP :
//     - lire les informations de la requête (req) ;
//     - appeler la bonne fonction du model ;
//     - renvoyer la réponse (res) avec le bon code de statut.
//
//  Comparez ce fichier avec "villes.router.js" : ce dernier mélange
//  les données ET le HTTP dans le même fichier. Ici, c'est séparé : c'est
//  plus clair, plus réutilisable et plus facile à faire évoluer.
// ===================================================================

import express from 'express';

// On importe le model : c'est lui qui sait où et comment sont stockées les données.
import { VillesModel } from '../models/ville.model.js';

// express.Router() crée un mini-routeur que l'on exporte vers app.js.
export const router = express.Router();


// GET /villes  →  lister toutes les villes
// res.json(...) renvoie la réponse au format JSON (code 200 par défaut).
router.get('/', (req, res) => {
  res.json(VillesModel.findAll());
});

// GET /villes/:id  →  récupérer une ville précise
// ":id" est un paramètre d'URL, récupéré via req.params.id (toujours sous forme de texte).
// parseInt() le convertit en nombre pour pouvoir le comparer aux ID du model.
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  res.json(VillesModel.findById(id));
});

// POST /villes  →  créer une ville
router.post('/', (req, res) => {
  // On récupère le nom envoyé dans le corps de la requête (grâce à express.json()).
  const { nom } = req.body;

  // C'est le model qui crée la ville et gère l'ID : le router ne s'en occupe pas.
  const nouvelleVille = VillesModel.create(nom);

  // 201 = "Created" : code de statut HTTP standard après une création réussie.
  res.status(201).json(nouvelleVille);
});

// PUT  /villes/:id  →  modifier une ville
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const { nom } = req.body;

  // Le model renvoie la ville modifiée, ou -1 si l'ID n'existe pas.
  const ville = VillesModel.update(id, nom);

  // Gestion d'erreur : si la ville n'existe pas, on renvoie 404 (Not Found).
  // "return" stoppe l'exécution pour ne pas envoyer deux réponses.
  if(ville === -1) {
    return res.status(404).json({
      ok: false,
      message: "Ville demandé non trouvé. Id demandé : " + id
    });
  }

  res.json(ville);
});

// === Alternative - algo ====
// Version "manuelle" du PUT (sans model), gardée à titre pédagogique :
// elle montre l'algorithme étape par étape pour bien comprendre la logique.
// router.put('/:id', (req, res) => {
//   // ETAPE 1 : récupérer l'ID de la ville à modifier depuis les paramètres de l'URL
//   const id = parseInt(req.params.id);

//   // ETAPE 2 : récupérer le nouveau nom de la ville depuis le corps de la requête
//   const { nom } = req.body;

//   // ETAPE 3 : trouver la ville à modifier dans la liste des villes
//   for (ville of villes){
//     if (ville.id === id) {
//       // ETAPE 4 : mettre à jour le nom de la ville
//       ville.nom = nom;

//       // ETAPE 5 : retourner la ville modifiée dans la réponse
//       return res.json(ville);
//     }
//   }
// });


// DELETE /villes/:id  →  supprimer une ville
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Le model renvoie true (supprimé) ou false (ID introuvable).
  const result = VillesModel.delete(id);

  if (!result) {
    return res.status(404).json({
      ok: false,
      message: "Ville demandé non trouvé. Id demandé : " + id
    });
  }

  res.json({
    ok: true,
    message: "Ville supprimé. Id: " + id
  })
});
