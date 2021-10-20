// Crée par Joachim Zadi le 09/05/2020 à 20:07
// ===========================================
const Message = require("../models/messageModel");

//Pour les requtes lire ici :
// ==> https://sequelize.org/master/manual/model-querying-basics.html


//OPRETAIONS CRUD
exports.getAllMsgs = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res
            .status(200)
            .json({
                status: "succes",
                messages: messages
            });
    } catch (error) {
        res
            .status(400)
            .json({
                status: "echec",
                cause: error.message
            });
    }
}

exports.createMsg = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res
            .status(200)
            .json({
                status: "succes",
                message: message
            });
    } catch (error) {
        res
            .status(400)
            .json({
                status: "echec",
                cause: error.message
            });
    }
}

exports.updateMsg = async (req, res) => {
    try {
        const message = await Message.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res
            .status(200)
            .json({
                status: "succes",
                message: `Le message d'id '${req.params.id}' a été mis à jour avec succès !!!`
            });
    } catch (error) {
        res
            .status(400)
            .json({
                status: "echec",
                cause: error.message
            });
    }
}

exports.deleteMsg = async (req, res) => {
    try {
        await Message.destroy({
            where: {
                id: req.params.id
            }
        });
        res
            .status(200)
            .json({
                status: "succes",
                message: `Le message d'id '${req.params.id}' a été effacé avec succès !!!`
            });
    } catch (error) {
        res
            .status(400)
            .json({
                status: "echec",
                cause: error.message
            });
    }
}

exports.findMsgById = async (req, res) => {
    try {
        const message = await Message.findByPk(req.params.id);
        res
            .status(200)
            .json({
                status: "succes",
                message: message != null ? message : `Le message d'id ${req.params.id} est introuvable en BDD`
            });
    } catch (error) {
        res
            .status(400)
            .json({
                status: "echec",
                cause: error.message
            });
    }
}
