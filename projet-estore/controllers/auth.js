const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {promisify} = require('util');
const {errorHandler} = require('../utils/dbErrorHandler');

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
};

const createAndSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
    }
    res.cookie('t', token, cookieOptions);

    user.password = undefined;
    user.active = undefined;

    res
        .status(statusCode)
        .json({
            status: 'success',
            token,
            user
        });
};

exports.signup = async (req, res) => {
    try {
        const {name, email, password, passwordConfirm} = await req.body;
        let newUser = new User({
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        });
        console.log(newUser);
        newUser = await newUser.save();
        console.log(newUser);
        createAndSendToken(newUser, 201, res);
    } catch (error) {
        await res
            .status(401)
            .json(errorHandler(error));
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email}).select('+password');

        // On Verifie que les infos utilisateurs sont bonnes
        if (!user || !(await user.correctPassword(password, user.password))) {
            return await res
                .status(401)
                .json({
                    error: "Email and/or password is/are incorrect"
                });
        }

        // Ici, on est sûr que les données saisie par l'utilisateur sont bonnes
        createAndSendToken(user, 200, res);
    } catch (error) {
        await res
            .status(401)
            .json(errorHandler(error));
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('t');
    await res
        .status(200)
        .json({
            msg: "Deconnexion du systeme !!!"
        });
};

exports.protection = async (req, res, next) => {
    try { // Obtention du token utilisateur
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Si le token n'existe
        if (!token) {
            const error = {
                message: 'You are not logged in! Please log in to get access'
            };
            return res
                .status(401)
                .json(error);
        }

        // Ici, le token existe, on verifie qu'il est le bon
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // On recupere l'utilisateur correspondant au token
        const currentUser = await User.findById(decode.id);

        // On verifie l'existence du user
        if (!currentUser) {
            const error = {
                message: 'The user belonging to this token does no longer exist.'
            };
            return res
                .status(401)
                .json(error);
        }

        // Si le user a changé de mot de passe apres l'emission du token
        if (currentUser.changedPasswordAfter(decode.iat)) {
            const error = {
                message: 'The user recently changed password! Please log in again.'
            };
            return res
                .status(401)
                .json(error);
        }

        // Ici le suer rempli toutes les conditions pour acceder à l'itineraire protegé
        req.user = currentUser;
    } catch (error) {
        res
            .status(401)
            .json({
                name: error.name,
                message: "Invalide Token signature !!!"
            });
    }
    next();
};

exports.restricTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            const error = {
                message: 'You do not have permission to perform this action'
            };
            return res
                .status(403)
                .json(error);
        }
        next();
    }
};