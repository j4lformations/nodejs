// Crée par Joachim Zadi le 09/05/2020 à 20:59
// ===========================================
const {DataTypes} = require("sequelize");
const Connexion = require("../configs/SequelizeConfig");
const sequelize = Connexion.sequelize;

//Ici j'ai utilisé la premiere methode de creation de model
const Message = sequelize.define("Message", {
    // Pour sefinir les types de données,
    // lire ici ==> https://sequelize.org/master/variable/index.html#static-variable-DataTypes
    titre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contenu: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//Une lecture s'impose ici
// ==> https://sequelize.org/master/manual/model-basics.html
Message.sync();

module.exports = Message;
