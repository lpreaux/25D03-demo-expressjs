// ===================================================================
//  EXERCICE À COMPLÉTER
// -------------------------------------------------------------------
//  Les routes GET sont déjà écrites comme exemple.
//  À toi de compléter les routes POST, PUT et DELETE en suivant les
//  ETAPES indiquées en commentaire dans chaque fonction.
//  Inspire-toi de la version corrigée : src/routers/villes.router.js
// ===================================================================

import express from 'express';

export const router = express.Router();


// Données en mémoire (pour cet exercice, on les place dans le router).
let compteurID = 3;
const villes = [{id: 1, nom: 'Paris'}, {id: 2, nom: 'Lyon'}];

// GET /villes  →  lister toutes les villes (déjà fait)
router.get('/', (req, res) => {
  res.json(villes);
});

// GET /villes/:id  →  récupérer une ville par son ID (déjà fait)
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ville = villes.find(v => v.id === id);
  res.json(ville);
});

// POST /villes           → créer une ville
router.post('/', (req, res) => {
  // ETAPE 1 : récupérer le nom de la ville à créer depuis le corps de la requête
  // ETAPE 2 : créer une nouvelle ville avec un ID unique
  // ETAPE 3 : ajouter la nouvelle ville à la liste des villes
  // ETAPE 4 : retourner la nouvelle ville créée dans la réponse
});

// // PUT  /villes/:id       → modifier une ville
// app.put('/villes/:id', (req, res) => {
//   // ETAPE 1 : récupérer l'ID de la ville à modifier depuis les paramètres de l'URL
//   // ETAPE 2 : récupérer le nouveau nom de la ville depuis le corps de la requête
//   // ETAPE 3 : trouver la ville à modifier dans la liste des villes
//   // ETAPE 4 : mettre à jour le nom de la ville
//   // ETAPE 5 : retourner la ville modifiée dans la réponse
// });

// // DELETE /villes/:id     → supprimer une ville
// app.delete('/villes/:id', (req, res) => {
//   // ETAPE 1 : récupérer l'ID de la ville à supprimer depuis les paramètres de l'URL
//   // ETAPE 2 : trouver la ville à supprimer dans la liste des villes
//   // ETAPE 3 : supprimer la ville de la liste des villes
//   // ETAPE 4 : retourner une réponse indiquant que la ville a été supprimée
// });