//On importe le module mongoose
const mongoose = require("mongoose");
const validator = require('validator');
const Schema = mongoose.Schema;

let ContactSchema = new Schema({
    prenom: {
        type: String,
        required: true,
        length: 30
    },
    nom: {
        type: String,
        required: true,
        length: 20
    },
    email: {
        type: String,
        require: true,
        default: `${this.prenom}.${this.nom}@j4ltechnologies.com`,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value);
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

/*
 * Une propriete virtuelle est une propriete transiante
 * En d'autre termes, c'est une propriete qui n'est pas
 * persistente. Elle est optionnelle
 */
//Le Getter de la propriete virtuelle
ContactSchema.virtual("nomComplet").get(function () {
    return `${this.prenom} ${this.nom}`;
});

//Le Setter de la propriete virtuelle
ContactSchema.virtual("nomComplet").set(function (value) {
    let str = value.split(' ');
    this.model.prenom = str[0];
    this.model.nom = str[1];
});

//On exporte ContactSchema en tant que mo
module.exports = ContactSchema;
