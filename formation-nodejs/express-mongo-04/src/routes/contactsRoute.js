const express = require("express");
const router = express.Router();

//LES CONSTANTES DE GESTIONS DES ROUTES
const tousLesContacts = (request, response)=> {
    response
        .status(200)
        .json({
            "message": "GET Ok !"
        });
};

const ajouterUnContact = function (request, response) {
    response
        .status(200)
        .json({
            "message": "POST Ok !"
        });
};

const rechercherUnContact = function (request, response) {
    response
        .status(200)
        .json({
            "message": `GET/${request.params.id} paramètre Ok !`
        });
};

const modiferUnContact = function (request, response) {
    response
        .status(200)
        .json({
            "message": `PUT/${request.params.id} paramètre Ok !`
        });
};

const supprimerUnContact = function (request, response) {
    response
        .status(200)
        .json({
            "message": `DELETE/${request.params.id} paramètre Ok !`
        });
};

//UTILISATION DE express.Router() COMME GESTIONNAIRE DES ROUTES
router
    .route("/")
    .get(tousLesContacts)
    .post(ajouterUnContact);

router
    .route("/:id")
    .get(rechercherUnContact)
    .put(modiferUnContact)
    .delete(supprimerUnContact);

//On exporte le router en tant que module
module.exports = router;
