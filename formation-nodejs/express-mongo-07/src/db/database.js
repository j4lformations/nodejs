const mongoose = require("mongoose");

//Le serveur MongoDB local
const server = "localhost:27017";
const database = "j4ldb";

/**
 * Cette classe permet de realisée une connection à la base de données MongoDB
 */
class MongoConnexion {

    constructor() {
        this.connexion();
    }

    connexion = () => {
        mongoose.connect(`mongodb://${server}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(function () {
            console.log("CONNEXION AU SERVEUR OK ✌");
        }, function (error) {
            console.log(`CONNEXION AU SERVEUR NOK 👎 : ${error}`);
        });
    }
}

//On exporte une instance unique de la classe en tant que module
module.exports = new MongoConnexion();