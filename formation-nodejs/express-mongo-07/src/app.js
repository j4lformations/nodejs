/*
* Dans cette section, on se propose de d'implementer le code metier
* permettant de faire le CRUD sur la BDD, dans le fichier
* src/controllers/contactsController.js.
*
* Pour faire ce travail,
* 1==> nous allons creer un fichier src/db/database.js
* qui sera charger d'etablir la connexion a la BDD
*
* 2==> Nous mettons les methodes du controlleur à jours
*
* https://mongoosejs.com/docs/index.html
*/

const express = require("express");
const contactRouter = require("../src/routes/contactsRoute");
const app = express();

//Ce middleware permet de parser le format json de la requete
app.use(express.json());

//Middleware des routes
app.use("/api/contacts", contactRouter);

module.exports = app;