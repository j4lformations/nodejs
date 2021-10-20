// Crée par Joachim Zadi le 11/05/2020 à 07:19
// ===========================================
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/UserModel");
const {promisify} = require("util");
const factory = require("./HandlerFactory");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/Email");

const signToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        return next(new AppError("Attention, cet utilisateur existe déjà !!!", 401));
    }
    const newUser = await User.create({
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
        passwordConfirmed: req.body.passwordConfirmed,
        role: req.body.role,
    });

    const token = signToken(newUser._id);

    res.status(201)
        .json({
            status: "succes",
            token,
            data: {
                user: newUser
            }
        });
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    //1 ==> On verifie que l'email & le mdp existent bien
    if (!email || !password) {
        return next(new AppError("Attention, email et/ou mot de passe manquant", 400));
    }

    //2 ==> On verifie l'existence d'User correspondant à cet email & mdp
    const user = await User.findOne({email: email}).select("+password");

    if (!user || !(await user.isValidPassword(password, user.password))) {
        return next(new AppError("Email et/ou mot de passe incorrect(s)", 401));
    }

    //3 ==> Si tout est OK, on envoie le token au client
    const token = signToken(user._id);
    res.status(200)
        .json({
            status: "succes",
            token,
        });
});

exports.protect = catchAsync(async (req, res, next) => {

    // 1) Obtent le jeton et vérifie qu'il est bien present
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Accès refusé. Pas de jeton fourni.", 401));
    }

    // 2) On verifie la validite du token
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    // 3) Vérifie si l'utilisateur existe toujours
    const freshUser = await User.findById(decode.id);
    if (!freshUser) {
        return next(new AppError("L'utilisateur appartenant à ce jeton n'existe plus.", 401));
    }

    // 4) Vérifie si l'utilisateur a changé de mot de passe après l'émission du token
    if (await freshUser.isChangedPasswordAfter(decode.iat)) {
        return next(new AppError("L'utilisateur a récemment changé de mot de passe! Veuillez vous reconnecter.", 401));
    }

    // ACCÉDER À LA ROUTE PROTÉGÉE
    req.user = freshUser;
    res.locals.user = freshUser;

    next();
});

exports.restricTo = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("Vous n'êtes pas autorisé à effectuer cette action", 403));
        }
        next();
    }
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
// 1) Obtenir l'utilisateur en fonction de l'e-mail posté
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return next(new AppError(`Il n'y a aucun utilisateur avec l'adresse ${req.body.email} !!!`, 404));
    }

    // 2) Générez le jeton de réinitialiser aléatoirement
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});

    // 3) L'envoyer à l'email de l'utilisateur
    const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`;

    const message = `Vous avez oublié votre mdp ? Cliquez sur le lien suivant <a href='${resetURL}'>${resetURL}</a> pour le reinitialiser\n.
    Sinon, merci d'ignorer ce message`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Reinitialisation du mdp : Validité 10 minutes",
            message: message
        });

        res.status(200)
            .json({
                status: "succes",
                message: "Un lien d'initialisation a été envoyé à votre adresse email"
            });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({validateBeforeSave: false});

        return next(
            new AppError("Une erreur s'est produite lors de l'envoi de l'e-mail. Réessayez plus tard!", 500)
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {

});
