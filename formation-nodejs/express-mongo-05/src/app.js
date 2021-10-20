const express = require("express");
const app = express();

/*
* Dans cette section, on se propose de factoriser le code des constatntes
* de gestions des routes du fichier src/routes/contactsRoute.js dans un fichier
* src/controllers/contactsController.js puis le server dans un ficher server.js
*/

//On import le ficher des routes
const contactRouter = require("../src/routes/contactsRoute");

//Utilisation du middleware Router
app.use("/api/contacts", contactRouter);

//On exporte l'application en tant que module
module.exports = app;

