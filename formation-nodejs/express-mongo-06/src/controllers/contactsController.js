//EXPORT DES CONSTANTES DE GESTIONS DES ROUTES EN TANT QUE MODULE

exports.tousLesContacts = function (request, response) {
    response
        .status(200)
        .json({
            "message": "GET Ok !"
        });
};

exports.ajouterUnContact = function (request, response) {
    response
        .status(200)
        .json({
            "message": "POST Ok !"
        });
};

exports.rechercherUnContact = function (request, response) {
    response
        .status(200)
        .json({
            "message": `GET/${request.params.id} paramètre Ok !`
        });
};

exports.modiferUnContact = function (request, response) {
    response
        .status(200)
        .json({
            "message": `PUT/${request.params.id} paramètre Ok !`
        });
};

exports.supprimerUnContact = function (request, response) {
    response
        .status(200)
        .json({
            "message": `DELETE/${request.params.id} paramètre Ok !`
        });
};