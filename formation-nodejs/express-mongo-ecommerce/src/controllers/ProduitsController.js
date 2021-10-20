// Crée par Joachim Zadi le 08/05/2020 à 17:09
// ===========================================
const Produit = require("../models/ProduitModel");
const factory = require("./HandlerFactory");

exports.getAllProduits = factory.getAll(Produit);
exports.addProduit = factory.createOne(Produit);
exports.findProduit = factory.findOne(Produit);
exports.updateProduit = factory.updateOne(Produit);
