const mongoose = require("mongoose");

//Le serveur MongoDB local

const DATABASE_NAME = "j4ldb";
const PASSWORD = "P@$$w0rd123"
const SERVER_PROD = `mongodb+srv://Formateur:${PASSWORD}@jfourl-ladqe.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
const SERVER_DEV = `mongodb://localhost:27017/${DATABASE_NAME}`

const server = process.env.NODE_ENV === "production" ? SERVER_PROD : SERVER_DEV;

/**
 * Cette classe permet de realisée une connection à la base de données MongoDB
 */
class MongoConnexion {

    constructor() {
        this.connexion()
            .then(function () {
                console.log("CONNEXION AU SERVEUR OK 👍");
            })
            .catch(error => {
                    console.log(`CONNEXION AU SERVEUR NOK 👎 : ${error}`);
                }
            );
    }

    connexion = async () => {
        await mongoose.connect(`${server}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    }
}

//On exporte une instance unique de la classe en tant que module
module.exports = new MongoConnexion();