const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const {errorHandler} = require('../utils/dbErrorHandler');

/**
 * Permet d'afficher le formulaire d'inscription
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.formRegsiter = async (req, res) => {
    await res
        .status(200)
        .json({
            msg: "Affichage du formulaire Register"
        });
}

/**
 * Permet de poster les saisies du formulaire Register
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.postFormRegsiter = async (req, res) => {
    try {
        let user = await new User(req.body);

        user = await user.save();
        user.salt = undefined;
        user.hashed_password = undefined;

        await res
            .status(200)
            .json(user);
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
}

/**
 * Permet d'afficher le formulaire de login
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.formLogin = async (req, res) => {
    await res
        .status(200)
        .json({
            msg: "Affichage du formulaire Login"
        });
}

/**
 * Permet de poster les saisies du formulaire de login
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.postFormLogin = async (req, res) => {
    try {
        //On recherche le user a partir de son email
        const {email, password} = req.body;
        let user = await User.findOne({email});

        // le login n'est pas dans le systeme
        if (!user) {
            return await res
                .status(401)
                .json(
                    {
                        error: `System unknown user with email ${email} !!!`
                    }
                );
        }

        // Le login utilisé est correcte mais le mot de passe ne correspond pas
        if (!user.authenticate(password)) {
            return await res
                .status(401)
                .json({
                    error: "Email and/or password is/are incorrect"
                });
        }

        // Ici, l'utilisateur est totalement reconnu
        // On genere le token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        // On met le token dans un cookie
        res.cookie('t', token, {expire: new Date() + 9999});

        // On masque l'affichage des champs salt & hashed_password
        user.salt = undefined;
        user.hashed_password = undefined;

        // On affiche la reponse à l'utilisateur
        await res
            .status(200)
            .json({
                token,
                user: user
            });
    } catch (err) {
        await res
            .status(401)
            .json(
                {
                    error: err
                }
            );
    }
}

/**
 * Mermet de deconnecter un utilisateur
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.formLogout = async (req, res) => {
    res.clearCookie('t');
    await res
        .status(200)
        .json(
            {
                msg: "Deconnexion du systeme !!!"
            }
        );
}
