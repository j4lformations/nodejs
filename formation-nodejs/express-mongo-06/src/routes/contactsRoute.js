const express = require("express");
const router = express.Router();

//On importe les constantes de gestions des routes
const contactsController = require("../controllers/contactsController");

//UTILISATION DE express.Router() COMME GESTIONNAIRE DES ROUTES
router
    .route("/")
    .get(contactsController.tousLesContacts)
    .post(contactsController.ajouterUnContact);

router
    .route("/:id")
    .get(contactsController.rechercherUnContact)
    .put(contactsController.modiferUnContact)
    .delete(contactsController.supprimerUnContact);

//On exporte le router en tant que module
module.exports = router;
