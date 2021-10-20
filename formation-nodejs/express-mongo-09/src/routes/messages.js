// Crée par Joachim Zadi le 15/04/2020 à 13:20
// ===========================================

const express = require("express");
const router = express.Router();
const msgController = require("../controllers/messagesController");

/*CHARGEMENT DU MODEL Message*/
const Message = require("../models/messageModel");

/*ROUTE FORM MESSAGE*/
router.get("/add", msgController.afficheFormAdd);

/*MIDDLEWARE CHECK-BODY*/
router.use(msgController.checkBody);

/*ROUTE POST FORM MESSAGE*/
router.post("/add", msgController.postFormAdd);

/*ROUTE LIST MESSAGE*/
router.get("/", msgController.afficheListeMsg);

/*ROUTE FORM UPDATE*/
router.get("/:id", msgController.afficheFormUpdate);

/*ROUTE POST FORM UPDATE*/
router.put("/:id", msgController.postFormUpdate);

/*ROUTE DELETE MESSAGE*/
router.delete("/:id", msgController.deleteMsg);

module.exports = router;
