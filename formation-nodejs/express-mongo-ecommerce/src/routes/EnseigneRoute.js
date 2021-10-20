// Crée par Joachim Zadi le 08/05/2020 à 17:06
// ===========================================
const express = require("express");
const controller = require("../controllers/EnseignesController");
const authController = require("../controllers/AuthController");
const router = express.Router();

router
    .route("/")
    .get(controller.getAllEnseignes)
    .post(controller.addEnseigne)

router
    .route("/:id")
    .get(controller.findEnseigne)
    .put(authController.restricTo("Admin"), controller.updateEnseigne);

module.exports = router;
