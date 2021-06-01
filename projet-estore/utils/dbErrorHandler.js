/**
 * Obtenir le message d'erreur de l'objet d'erreur
 * @param error
 * @returns {{path: *, message: *}[]}
 */
exports.errorHandler = error => {
    // let message = "";
    // for (let errorName in error.errors) {
    //     if (error.errors[errorName].message) {
    //         message = error.errors[errorName].message;
    //     }
    // }
    // const message = `${errors.join('. ')}`;
    return Object.values(error.errors).map(el => {
        return {
            "path": el.path,
            "message": el.message
        }
    });
}