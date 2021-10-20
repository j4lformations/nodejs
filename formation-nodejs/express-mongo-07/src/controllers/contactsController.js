const mongoose = require("mongoose");

//On importe le module de connexion à la BDD
const database = require("../db/database");

//On importe le module du Schema
const ContactSchema = require("../models/contactModel");

let Contact = mongoose.model("Contact", ContactSchema);

//EXPORT DES CONSTANTES DE GESTIONS DES ROUTES EN TANT QUE MODULE
exports.tousLesContacts = function (request, response) {
    Contact.find({}, function (error, contacts) {
        if (error) {
            response.send(error);
        }
        response
            .status(200)
            .json(contacts);
    });
};

exports.ajouterUnContact = function (request, response) {
    let nouveauContact = new Contact(request.body);
    nouveauContact.save()
        .then(function (contact) {
            response
                .status(200)
                .json(contact);
        })
        .catch(function (error) {
            response
                .status(500)
                .json({
                    "message": "Echec de la persistence",
                    // "cause": `${error}`
                    "cause": error.keyPattern
                });
        });
};

exports.rechercherUnContact = function (request, response) {
    Contact.findById(request.params.id)
        .then((contact) => {
            response.json(contact);
        })
        .catch((error) => {
            response.json({
                "message": `Contact d'id ${request.params.id} introuvable dans le système`
            });
        });
};

exports.modiferUnContact = function (request, response) {
    Contact
        .findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
        .then(contact => {
            response
                .status(200)
                .json(contact);
        })
        .catch(error => {
            response.json({
                "message": `Contact d'id ${request.params.id} introuvable dans le système`
            });
        });
};

exports.supprimerUnContact = function (request, response) {
    Contact
        .findOneAndRemove({
            _id: request.params.id
        })
        .then(contact => {
            response
                .status(200)
                .json({
                    "message": `Le Contact d'id ${request.params.id} a été supprimé avec succes ✌`
                });
        })
        .catch(error => {
            response.json({
                "message": `Contact d'id ${request.params.id} introuvable dans le système 😓`
            });
        });
};