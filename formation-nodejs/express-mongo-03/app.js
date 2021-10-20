// app.route()
// Vous pouvez créer des gestionnaires de routage sous forme de chaîne pour un chemin de routage en utilisant app.route().
// Etant donné que le chemin est spécifié à une seul emplacement, la création de routes modulaires est utile car elle
// réduit la redondance et les erreurs.
// https://expressjs.com/fr/guide/routing.html

const express = require("express");
const app = express();

//CREATION DES CONSTANTES DE GESTIONS DES ROUTES
const tousLesContacts = function (request, response) {
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

//FACTORISATION DES ROUTES PAR CHAINAGE
app.route("/api/contacts")
    .get(tousLesContacts)
    .post(ajouterUnContact);

app.route("/api/contacts/:id")
    .get(rechercherUnContact)
    .put(modiferUnContact)
    .delete(supprimerUnContact);

app.listen(4500, () => {
    console.log(`Vos requetes sont en ecoutes sur le port 4500`);
});
