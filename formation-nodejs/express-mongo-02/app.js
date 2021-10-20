// UTILISATION DE GESTIONNAIRE DES ROUTE :
// https://expressjs.com/fr/guide/routing.html

// Import du module express
const express = require("express");

// Creation de l'instance du serveur
const app = express();

/*
* Dans cette partie, nous nous proposons de factoriser
* le codes de routage dans des constantes
*/

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

//FACTORISATION DES ROUTES
app.get("/api/contacts", tousLesContacts);
app.post("/api/contacts", ajouterUnContact);
app.get("/api/contacts/:id", rechercherUnContact);
app.put("/api/contacts/:id", modiferUnContact);
app.delete("/api/contacts/:id", supprimerUnContact);

app.listen(4500, () => {
    console.log(`Vos requetes sont en ecoutes sur le port 4500`);
});