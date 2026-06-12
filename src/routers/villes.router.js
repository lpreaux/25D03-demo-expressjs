// ===================================================================
//  ROUTER DES VILLES  —  VERSION "SANS MODEL"  (données dans le router)
// -------------------------------------------------------------------
//  Cette version fait exactement la même chose que "villes-avec-model.js",
//  MAIS ici les données (le tableau "villes") et la logique de
//  manipulation sont écrites DIRECTEMENT dans le router.
//
//  À OBSERVER (le but pédagogique de la comparaison) :
//  - Le router mélange deux responsabilités : gérer le HTTP ET gérer
//    les données. Le fichier devient vite plus long et moins lisible.
//  - La logique d'accès aux données (.find, .push, .splice...) n'est
//    réutilisable nulle part ailleurs : elle est "coincée" ici.
//  - Pour passer à une vraie base de données plus tard, il faudrait
//    modifier le router lui-même.
//
//  → Dans "villes-avec-model.js", cette logique est déplacée dans un MODEL
//    (ville.model.js). Le router devient alors plus court et ne fait
//    qu'appeler VillesModel.findAll(), .create(), etc. C'est la bonne
//    pratique : on sépare le "quoi" (HTTP) du "comment" (données).
// ===================================================================

import express from 'express';

export const router = express.Router();

// Données stockées en mémoire, ICI, dans le router (le point à éviter).
// Dans la version "avec model", ces deux lignes sont déplacées dans le model.
let compteurID = 3;
const villes = [{id: 1, nom: 'Paris'}, {id: 2, nom: 'Lyon'}];


// GET /villes  →  lister toutes les villes
router.get('/', (req, res) => {
  res.json(villes);
});

// GET /villes/:id  →  récupérer une ville précise
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // La recherche est faite directement ici (dans la version model, c'est VillesModel.findById).
  const ville = villes.find(v => v.id === id);
  res.json(ville);
});

// POST /villes  →  créer une ville
router.post('/', (req, res) => {
  const { nom } = req.body;

  // Création de la ville gérée directement dans le router.
  const nouvelleVille = {id: compteurID++, nom};
  villes.push(nouvelleVille);

  res.status(201).json(nouvelleVille);
});

// PUT  /villes/:id  →  modifier une ville
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const { nom } = req.body;

  const ville = villes.find(v => v.id === id);

  // Gestion d'erreur : .find() renvoie "undefined" si aucune ville ne correspond.
  if(ville === undefined) {
    return res.status(404).json({
      ok: false,
      message: "Ville demandé non trouvé. Id demandé : " + id
    });
  }

  ville.nom = nom;

  res.json(ville);
});

// === Alternative - algo ====
// Même opération de modification, mais écrite avec une boucle "for"
// pour visualiser l'algorithme étape par étape.
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
  // ETAPE 1 : récupérer l'ID de la ville à supprimer depuis les paramètres de l'URL
  const id = parseInt(req.params.id);

  // ETAPE 2 : trouver la POSITION de la ville dans le tableau (.findIndex renvoie -1 si absente)
  const index = villes.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      message: "Ville demandé non trouvé. Id demandé : " + id
    });
  }

  // ETAPE 3 : retirer 1 élément du tableau à partir de cette position
  villes.splice(index, 1);

  // ETAPE 4 : confirmer la suppression au client
  res.json({
    ok: true,
    message: "Ville supprimé. Id: " + id
  })
});
