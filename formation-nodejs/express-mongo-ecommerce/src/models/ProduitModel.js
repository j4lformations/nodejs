// Crée par Joachim Zadi le 08/05/2020 à 16:14
// ===========================================
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const AppService = require("../services/AppService");

const ProduitSchema = new Schema({
        enseigne: {
            type: mongoose.Schema.ObjectId,
            ref: "Enseigne",
            required: [true, "Renseignez l'id de l'enseigne' s'il vous plait !!!"]
        },
        nom: {
            type: String,
            required: [true, "Renseignez le champ 'nom' du produit s'il vous plait !!!"],
            unique: true,
            trim: true
        },
        cpu: {
            type: String,
            required: [true, "Renseignez le champ 'cpu' du produit s'il vous plait !!!"],
            trim: true
        },
        ram: {
            type: String,
            required: [true, "Renseignez le champ 'ram' du produit s'il vous plait !!!"],
            trim: true
        },
        ecran: {
            type: String,
            required: [true, "Renseignez le champ 'ecran' du produit s'il vous plait !!!"],
            trim: true
        },
        stockage: {
            type: String,
            required: [true, "Renseignez le champ 'stockage' du produit s'il vous plait !!!"],
            trim: true
        },
        vga: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            required: [true, "Renseignez le champ 'description' du produit s'il vous plait !!!"],
            trim: true
        },
        prix: {
            type: Number,
            required: [true, "Renseignez le champ 'prix' du produit s'il vous plait !!!"]
        },
        images: [String]
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
        timestamps: true
    });

ProduitSchema.pre("save", async function (next) {
    this.nom = AppService.capitilize(this.nom);
    next();
});

ProduitSchema.pre(/^find/, function (next) {
    this.populate({path: 'enseigne'})
        .select('-__v -createdAt -updatedAt');
    next();
});

module.exports = mongoose.model("Produit", ProduitSchema);

