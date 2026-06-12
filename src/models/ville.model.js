// ===================================================================
//  LE MODEL  (couche de données)
// -------------------------------------------------------------------
//  Un "model" centralise TOUT ce qui concerne l'accès et la
//  manipulation des données d'une ressource (ici : les villes).
//
//  Pourquoi passer par un model plutôt que tout écrire dans le router ?
//    1. SÉPARATION DES RESPONSABILITÉS :
//       - le router s'occupe du HTTP (lire la requête, renvoyer la réponse) ;
//       - le model s'occupe des données (lire, créer, modifier, supprimer).
//    2. RÉUTILISABILITÉ : plusieurs routes (ou d'autres parties de l'appli)
//       peuvent appeler les mêmes fonctions sans réécrire la logique.
//    3. MAINTENANCE : si demain on remplace ce tableau par une vraie base
//       de données (MySQL, MongoDB...), SEUL ce fichier change.
//       Le router, lui, continue d'appeler VillesModel.findAll(), etc.
//
//  C'est une première approche du patron d'architecture MVC
//  (Model - View - Controller).
// ===================================================================

// "Base de données" simulée en mémoire (un simple tableau d'objets).
// Attention : ces données disparaissent à chaque redémarrage du serveur.
let compteurID = 3;                       // prochain ID à attribuer
const villes = [{id: 1, nom: 'Paris'}, {id: 2, nom: 'Lyon'}];


// On exporte un objet qui regroupe toutes les opérations possibles sur les villes.
// Le router importera cet objet et appellera ses méthodes.
export const VillesModel = {

    // Renvoie la liste complète des villes.
    findAll() {
        return villes;
    },

    // Cherche une ville par son ID.
    // .find() renvoie le premier élément qui correspond, ou "undefined" si aucun.
    findById(id) {
        return villes.find(v => v.id === id);
    },

    // Crée une nouvelle ville, l'ajoute au tableau et la renvoie.
    // compteurID++ : on utilise la valeur actuelle PUIS on l'incrémente
    // pour garantir un ID unique à la prochaine création.
    create(nom) {
        const nouvelleVille = {id: compteurID++, nom};
        villes.push(nouvelleVille);
        return nouvelleVille;
    },

    // Modifie le nom d'une ville existante.
    // Renvoie la ville modifiée, ou -1 si l'ID n'existe pas (gestion d'erreur).
    update(id, nom) {
        const ville = villes.find(v => v.id === id);
        if (!ville) {
            return -1;
        }

        ville.nom = nom;
        return ville;
    },

    // Supprime une ville par son ID.
    // Renvoie true si la suppression a réussi, false si l'ID n'existe pas.
    delete(id) {
        // .findIndex() renvoie la POSITION de l'élément dans le tableau, ou -1 si absent.
        const index = villes.findIndex(v => v.id === id);
        if (index === -1) {
            return false;
        }

        // .splice(index, 1) retire 1 élément à partir de la position "index".
        villes.splice(index, 1);
        return true;
    },
}
