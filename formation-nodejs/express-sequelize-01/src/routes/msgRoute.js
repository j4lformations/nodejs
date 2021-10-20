// Crée par Joachim Zadi le 09/05/2020 à 20:04
// ===========================================
const express = require("express");
const router = express.Router();
const controller = require("../controllers/msgController");

router.route("/")
    .get(controller.getAllMsgs)
    .post(controller.createMsg);

router.route("/:id")
    .get(controller.findMsgById)
    .put(controller.updateMsg)
    .delete(controller.deleteMsg);

module.exports = router;
