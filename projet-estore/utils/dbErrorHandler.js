/**
 * Obtenir le message d'erreur de l'objet d'erreur
 * @param error
 * @returns {{path: *, message: *}[]}
 */
exports.errorHandler = (error) => {
    return Object.values(error.errors).map(el => {
            return {
                "path": el.path,
                "message": el.message
            }
        }
    );
}