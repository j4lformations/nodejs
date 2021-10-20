// Crée par Joachim Zadi le 10/05/2020 à 17:13
// ===========================================
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const AppService = require("../services/AppService");

const EnseigneSchema = new Schema({
        nom: {
            type: String,
            required: [true, "Renseignez le nom de l'enseigne' s'il vous plait !!!"],
            unique: true,
            trim: true,
            uppercase: true
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true
    });

EnseigneSchema.pre(/^find/, function (next) {
    this.select('-__v -createdAt -updatedAt');
    next();
});

module.exports = mongoose.model("Enseigne", EnseigneSchema);
