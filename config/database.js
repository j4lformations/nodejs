const mongoose = require('mongoose');

const LOCAL_SERVER = process.env.DB_HOST_LOCAL
    .replace('<DATABASE>', process.env.DB_NAME);

const REMOTE_SERVER = process.env.DB_HOST_REMOTE
    .replace('<USER>', process.env.DB_USER_REMOTE)
    .replace('<PASSWORD>', process.env.DB_PASS_REMOTE)
    .replace('<DATABASE>', process.env.DB_NAME);

const MONGO_SERVER = process.env.NODE_ENV === 'production' ? REMOTE_SERVER : LOCAL_SERVER;

/**
 * Classe permettant de realiser une connexion à la base de données
 */
class MongoConnexion {

    //Le constructeur
    constructor() {
        this.connexion()
            .then(r => r);
    }

    // la methode qui realise la connexion à Mongo DB
    connexion = async () => {
        await mongoose.connect(MONGO_SERVER, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(() => {
            console.log("CONNEXION AU SERVEUR MONGO OK");
        }).catch(reason => {
            console.log("CONNEXION AU SERVEUR MONGO NOK", `${reason}`);
        });
    }
}

module.exports = new MongoConnexion();