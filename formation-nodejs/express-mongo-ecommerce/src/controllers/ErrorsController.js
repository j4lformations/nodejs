// Crée par Joachim Zadi le 01/05/2020 à 11:54
// ===========================================
const AppError = require("../utils/AppError");

const sendErrorDev = (err, req, res) => {
    res
        .status(err.statusCode)
        .json({
            status: err.status,
            message: err.message,
            stack: err.stack
        });
}

const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        res
            .status(err.statusCode)
            .json({
                status: err.status,
                message: err.message
            });
    } else {

        console.log('ERROR 🔥', err)
        res
            .status(500)
            .json({
                status: "ERROR",
                message: "Attention, quelque chose de pas sympa s'est produit"
            });
    }
}

const handleCastErrorDB = (error) => {
    const message = `L'ID '${error.value}' est invalide`;
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (error) => {
    const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const champs = error.keyPattern;
    let champ = null;
    for (let key in champs) {
        champ = key
    }
    const message = `Attention, vous essayez de dupliquer la valeur '${value}' dans le champ ${champ}. Veuillez utiliser une autre valeur svp !`;
    return new AppError(message, 400);
}

const handleValidationErrorDB = (error) => {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Attention, saisie non valide : ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const handleJWTError = () => {
    return new AppError("Token invalid. Reconnectez vous svp !!!", 401);
}

const handleJWTExpireError = () => {
    return new AppError("La durée de votre Token a expiré. Reconnectez vous svp !!!", 401);
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "ERROR";

    if (process.env.NODE_ENV === "production") {
        sendErrorProd(err, req, res);
    } else if (process.env.NODE_ENV === "development") {
        let error = {...err};
        error.message = err.message;

        if (error.name === 'CastError') {
            error = handleCastErrorDB(error);
        }

        if (error.code === 11000) {
            error = handleDuplicateFieldsDB(error);
        }

        if (error.name === 'ValidationError') {
            error = handleValidationErrorDB(error);
        }

        if (error.name === 'JsonWebTokenError') {
            error = handleJWTError();
        }

        if (error.name === 'TokenExpiredError') {
            error = handleJWTExpireError();
        }
        sendErrorDev(error, req, res);
    }
}
