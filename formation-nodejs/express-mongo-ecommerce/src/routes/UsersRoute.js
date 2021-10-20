// Crée par Joachim Zadi le 30/04/2020 à 20:01
// ===========================================
const express = require("express");
const userController = require("../controllers/UsersController");
const authController = require("../controllers/AuthController");
const router = express.Router();

router
    .route("/signup")
    .post(authController.signup);

router
    .route("/login")
    .post(authController.login);

router
    .route("/forgotPassword")
    .post(authController.forgotPassword);

router
    .route("/resetPassword/:token")
    .put(authController.resetPassword);

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.postUser);

router
    .route("/:id")
    .get(userController.findUser)

module.exports = router;