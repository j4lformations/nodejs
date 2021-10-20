// Crée par Joachim Zadi le 15/04/2020 à 13:20
// ===========================================

const express = require("express");
const router = express.Router();
const {protection} = require("../config/auth");
const msgController = require("../controllers/messagesController");

/*CHARGEMENT DU MODEL Message*/
const Message = require("../models/messageModel");

/*ROUTE FORM MESSAGE*/
router.get("/add", protection, msgController.afficheFormAdd);

/*MIDDLEWARE CHECK-BODY*/
router.use(msgController.checkBody);

/*ROUTE POST FORM MESSAGE*/
router.post("/add", protection, msgController.postFormAdd);

/*ROUTE LIST MESSAGE*/
router.get("/", protection, msgController.afficheListeMsg);

/*ROUTE FORM UPDATE*/
router.get("/:id", protection, msgController.afficheFormUpdate);

/*ROUTE POST FORM UPDATE*/
router.put("/:id", protection, msgController.postFormUpdate);

/*ROUTE DELETE MESSAGE*/
router.delete("/:id", protection, msgController.deleteMsg);

module.exports = router;
