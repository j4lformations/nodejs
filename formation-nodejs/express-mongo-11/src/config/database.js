// Crée par Joachim Zadi le 23/04/2020 à 10:15
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

class MongoConnexion {

    constructor() {
        this.connexion();
    }

    async connexion() {
        try {
            const connection = await mongoose.connect(MONGO_SERVER, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log("CONNEXION AU SERVER MONGO OK 👌");
        } catch (err) {
            console.error("CONNEXION AU SERVER MONGO NOK 🔥");
        }
    }
}

module.exports = new MongoConnexion();
