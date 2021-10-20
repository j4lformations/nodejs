// Crée par Joachim Zadi le 17/04/2020 à 13:40
// ===========================================

/*CHARGEMENT DU MODEL Message*/
const Message = require("../models/messageModel");

exports.afficheFormAdd = (req, res) => {
    let titre = "Page Add";
    res.render("msg/add", {
        titre: titre
    });
}

exports.checkBody = (req, res, next) => {
    req.errors = [];
    if (!req.body.title || req.body.title.trim() === '') {
        req.errors.push({text: "Merci de saisir le titre de votre message !"});
    }
    if (!req.body.content || req.body.content.trim() === '') {
        req.errors.push({text: "Merci de saisir le contenu de votre message !"});
    }
    next();
}

exports.postFormAdd = async (req, res) => {

    let errors = req.errors;

    if (errors.length > 0) {
        res.render("msg/add", {
            errors: errors,
            title: req.body.title,
            content: req.body.content
        });
    } else {
        try {
            let message = await Message
                .create({
                    title: req.body.title,
                    content: req.body.content,
                    user: req.user.id
                });
            req.flash("success_msg", `Votre nouveau message de titre "${message.title}" a été ajouté avec succès !!!`);
            res.redirect("/msg");
        } catch (err) {
            console.log(`Erreur 🔥`, err);
        }
    }
}

exports.afficheListeMsg = async (req, res) => {
    try {
        let messages = await Message
            .find({user: req.user.id})
            // .where('user').equals(req.user.id)
            .sort({date: "desc"});

        let titre = "Page List";
        res.render("msg/list", {
            titre: titre,
            messages: messages
        });
    } catch (err) {
        console.log(`Erreur 🔥`, err);
    }
}

exports.afficheFormUpdate = async (req, res) => {
    try {
        let message = await Message
            .findOne({_id: req.params.id});

        res.render("msg/update", {
            titre: "Update",
            message: message
        });
    } catch (err) {
        console.log(`Erreur 🔥`, err);
    }
}

exports.postFormUpdate = async (req, res) => {
    let errors = req.errors;

    if (errors.length > 0) {
        console.log("Il y a des erreurs");
        res.render("msg/add", {
            errors: errors,
            title: req.body.title,
            content: req.body.content
        });
    } else {
        try {
            let message = await Message
                .findOne({_id: req.params.id});

            message.title = req.body.title;
            message.content = req.body.content;

            message = await Message.create(message);

            req.flash("success_msg", `Le message de titre "${message.title}" a été mis à jour avec succès !!!`);
            res.redirect("/msg");
        } catch (err) {
            console.log(`Erreur 🔥`, err);
        }
    }
}

exports.deleteMsg = async (req, res) => {
    try {
        let message = await Message
            .deleteOne({_id: req.params.id});

        req.flash("success_msg", `Le message de d'id "${message._id}" a été supprimé avec succès !!!`);
        res.redirect("/msg");
    } catch (err) {
        console.log(`Erreur 🔥`, err);
    }
}