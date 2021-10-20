// Crée par Joachim Zadi le 15/04/2020 à 13:20
// ===========================================

const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

/*ROUTE USER-LOGIN*/
router.get("/login", usersController.afficheFormLogin);

/*ROUTE USER-REGISTER*/
router.get("/register", usersController.afficheFormRegister);

/*ROUTE USER-REGISTER POST*/
router.post("/register", usersController.checkbody, usersController.postUserRegister);

/*ROUTE USER-LOGIN POST*/
router.post("/login", usersController.postUserLogin);

/*ROUTE USER-LOGOUT*/
router.get("/logout", usersController.userLogout);

module.exports = router;