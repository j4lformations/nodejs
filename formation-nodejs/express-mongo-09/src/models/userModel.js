// Crée par Joachim Zadi le 15/04/2020 à 13:54
// ===========================================

const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

/*CREATION DU SCHEMA USER*/
const UserSchema = new Schema({
    prenom: {
        type: String,
        required: [true, "Le prénom est requis"]
    },
    email: {
        type: String,
        required: [true, "L'email est requis"],
        unique: [true, "Cette adresse email est deja utilisée"],
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    mdp: {
        type: String,
        required: [true, "Le mot de passe est requis"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
