// Crée par Joachim Zadi le 09/05/2020 à 20:12
// ===========================================
const Sequelize = require("sequelize");

//Cette façon de proceder est un choix personnel
//On aurait pu faire autrement

class SequelizeConfig {

    constructor(dialect, dbName, user, password) {

        this.dialect = dialect;
        this.dbName = dbName;
        this.user = user;
        this.password = password;

        //J'etabli la connexion dans le constructeur
        try {
            this.sequelize = new Sequelize(this.dbName, this.user, this.password, {
                host: "localhost",
                dialect: this.dialect
            });

            //On test la connexion au serveur
            this.sequelize.authenticate();
            //Si OK, on affiche ce message
            console.log(`CONNEXION AU SERVEUR MYSQL OK 👍`);
        } catch (error) {
            //Si NOK, on affiche ce message
            console.error(`CONNEXION AU SERVEUR MYSQL NOK 🔥`, error);
        }
    }
}

//On exporte une instance de la classe
module.exports = new SequelizeConfig("mysql", "db_sequelize", "root", "");

