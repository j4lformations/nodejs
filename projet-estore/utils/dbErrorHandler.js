/**
 * Obtenir le message d'erreur de l'objet d'erreur
 * @param error
 * @returns {string}
 */
exports.errorHandler = error => {
    let message = "";
    for (let errorName in error.errors) {
        if (error.errors[errorName].message) {
            message = error.errors[errorName].message;
        }
    }
    return message;
}