// Crée par Joachim Zadi le 15/04/2020 à 13:20
// ===========================================

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const usersController = require("../controllers/usersController");

/*ROUTE USER-LOGIN*/
router.get("/login", usersController.afficheFormLogin);

/*ROUTE USER-REGISTER*/
router.get("/register", usersController.afficheFormRegister);

/*ROUTE USER-REGISTER POST*/
router.post("/register", usersController.checkbody, (req, res) => {

    let errors = req.errors;

    if (errors.length > 0) {
        res.render("users/register", {
            prenom: req.body.prenom,
            email: req.body.email,
            mdp: req.body.mdp,
            mdp2: req.body.mdp2,
            errors: errors
        });
    } else {
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                req.flash("error_msg", "C'est email est deja utilisé !!!");
                res.redirect("/users/register");
            } else {
                const newUser = new User({
                    prenom: req.body.prenom,
                    email: req.body.email,
                    mdp: req.body.mdp
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.mdp, salt)
                        .then(hash => {
                            newUser.mdp = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash("success_msg", `Le compte ${user.email} a été créé avec succès`);
                                    res.redirect("/users/login");
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        }).catch((err) => {
                        console.log(err);
                    });
                });
            }
        })
    }
});

/*ROUTE USER-LOGIN POST*/
router.post("/login", usersController.postUserLogin);

/*ROUTE USER-LOGOUT*/
router.get("/logout", usersController.userLogout);

module.exports = router;