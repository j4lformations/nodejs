const mongoose = require("mongoose");

/*DEFINITION DU SERVEUR*/
const LOCAL_SERVER = process.env.DB_HOST_LOCAL
    .replace('<DATABASE>', process.env.DB_NAME);

const REMOTE_SERVER = process.env.DB_HOST_REMOTE
    .replace('<DATABASE>', process.env.DB_NAME)
    .replace('<USER>', process.env.DB_USER_REMOTE)
    .replace('<PASSWORD>', process.env.BD_PASS_REMOTED);

/*SELECTION DU SERVEUR MONGO EN FONCTION DE L'ENVIRONEMENT DE DEVELOPPEMENT*/
const MONGO_SERVER = process.env.NODE_ENV === 'production' ? REMOTE_SERVER : LOCAL_SERVER;

/**
 * Cette classe permet de realisée une connection à la base de données MongoDB
 */
class MongoConnexion {

    constructor() {
        this.connexion();
    }

    connexion = () => {
        mongoose.connect(MONGO_SERVER, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log(`CONNEXION AU SERVEUR MONGO OK ✌`);
        }).catch((error) => {
            console.log(`CONNEXION AU SERVEUR MONGO NOK 👎 : ${error}`);
        });
    }
}

//On exporte une instance unique de la classe en tant que module
module.exports = new MongoConnexion();