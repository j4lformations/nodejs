// Le lien de reference
// https://expressjs.com/fr/starter/hello-world.html
// https://expressjs.com/fr/starter/basic-routing.html

// Import du module express
const express = require("express");

// Creation de l'instance du serveur
const app = express();

// Creation de la route GET
app.get("/api/contacts", function (request, response) {
    response
        .status(200)
        .json({
            "message": "GET Ok !"
        });
});

// Creation de la route POST
app.post("/api/contacts", function (request, response) {
    response
        .status(200)
        .json({
            "message": "POST Ok !"
        });
});

// Creation de la route parametrée GET
app.get("/api/contacts/:id", function (request, response) {
    response
        .status(200)
        .json({
            "message": `GET/${request.params.id} paramètre Ok !`
        });
});

//Creation de la route PUT
app.put("/api/contacts/:id", function (request, response) {
    response
        .status(200)
        .json({
            "message": `PUT/${request.params.id} paramètre Ok !`
        });
});

//Creation de la route DELETE
app.delete("/api/contacts/:id", function (request, response) {
    response
        .status(200)
        .json({
            "message": `DELETE/${request.params.id} paramètre Ok !`
        });
});

app.listen(4500, () => {
    console.log(`Vos requetes sont en ecoutes sur le port 4500`);
});