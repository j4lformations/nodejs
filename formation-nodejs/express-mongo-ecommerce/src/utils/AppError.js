// Crée par Joachim Zadi le 30/04/2020 à 20:26
// ===========================================
class AppError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? "FAIL" : "ERROR";
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;