// express.Router
// Utilisez la classe express.Router pour créer des gestionnaires de route modulaires et pouvant être montés.
// Une instance Router est un middleware et un système de routage complet.
// https://expressjs.com/fr/guide/routing.html

const express = require("express");
const app = express();

/*
* Dans cette partie, on se propose de modulariser notre code.
* On creer pour cela un fichier de gestion des routes que nous
* allons utiliser comme middleware. "express.Router()"
*/

//On import le ficher des routes
const contactRouter = require("./src/routes/contactsRoute");

//Utilisation du middleware Router
app.use("/api/contacts", contactRouter);

app.listen(4500, () => {
    console.log(`Vos requetes sont en ecoutes sur le port 4500`);
});

