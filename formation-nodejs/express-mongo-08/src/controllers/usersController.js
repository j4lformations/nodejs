// Crée par Joachim Zadi le 17/04/2020 à 13:55
// ===========================================

/*CHARGEMENT DU MODEL Message*/
const User = require("../models/userModel");
const passport = require("passport");

exports.afficheFormLogin = (req, res) => {
    res.render("users/login");
}

exports.afficheFormRegister = (req, res) => {
    res.render("users/register");
}

exports.checkbody = (req, res, next) => {
    req.errors = [];
    if (!req.body.prenom || req.body.prenom.trim() === '') {
        req.errors.push({text: "Merci de saisir votre prénom !"});
    }
    if (!req.body.email || req.body.email.trim() === '') {
        req.errors.push({text: "Merci de saisir votre email !"});
    }
    if (!req.body.mdp || req.body.mdp.trim() === '') {
        req.errors.push({text: "Merci de saisir votre mot de passe !"});
    }
    if (!req.body.mdp2 || req.body.mdp2.trim() === '') {
        req.errors.push({text: "Merci de confirmer votre mot de passe !"});
    }
    if (req.body.mdp !== req.body.mdp2) {
        req.errors.push({text: 'Les mots de passes saisis ne correspondent pas'})
    }
    next();
};

exports.postUserLogin = (req, res, next) => {
    passport.authenticate(
        'local', {
            successRedirect: "/msg",
            failureRedirect: "/users/login",
            failureFlash: true
        }
    )(req, res, next);
}

exports.userLogout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Vous avez été deconnecté avec succès");
    res.redirect("/users/login");
}
