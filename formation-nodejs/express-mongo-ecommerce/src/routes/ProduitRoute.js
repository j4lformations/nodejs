// Crée par Joachim Zadi le 08/05/2020 à 17:06
// ===========================================
const express = require("express");
const controller = require("../controllers/ProduitsController");
const router = express.Router();

router
    .route("/")
    .get(controller.getAllProduits)
    .post(controller.addProduit)

router
    .route("/:id")
    .get(controller.findProduit)
    .put(controller.updateProduit);

module.exports = router;
