/*
* Dans cette section, on se propose de factoriser de creer un model Contact
* dans le fichier src/models/contactModel.js
* qui va etre persister dans la BDD MongoDB local.
* Pour faire ce travail, on utilise le module mongoose
* https://www.npmjs.com/package/mongoose
*/

const express = require("express");
const contactRouter = require("../src/routes/contactsRoute");
const app = express();
// On importe le module mongoose
const mongoose = require('mongoose');

//Connexion au serveur MongoDb local
mongoose.connect('mongodb://localhost/ContactsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use("/api/contacts", contactRouter);

module.exports = app;