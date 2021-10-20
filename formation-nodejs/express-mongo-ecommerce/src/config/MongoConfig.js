// Crée par Joachim Zadi le 30/04/2020 à 19:24
// ===========================================
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
 * Classe permettant d'etaglir la connexio au serveur Mongo
 */
class MongoConfig {

    constructor() {
        this.connexion();
    }

    async connexion() {
        try {
            await mongoose.connect(MONGO_SERVER, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                //autoIndex: false, // Ne construisez pas d'index
                poolSize: 10, // Maintenez jusqu'à 10 connexions de socket
                serverSelectionTimeoutMS: 5000, // Continuez à essayer d'envoyer des opérations pendant 5 secondes
                socketTimeoutMS: 45000, // Fermer les sockets après 45 secondes d'inactivité
                //family: 4 // Utilisez IPv4, évitez d'essayer IPv6
            });
            console.log("CONNEXION AU SERVER MONGO OK 👌");
        } catch (err) {
            console.error("CONNEXION AU SERVER MONGO NOK 🔥", err);
        }
    }
}

module.exports = new MongoConfig();
