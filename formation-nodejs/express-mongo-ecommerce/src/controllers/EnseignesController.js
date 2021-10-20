// Crée par Joachim Zadi le 08/05/2020 à 17:09
// ===========================================
const enseigne = require("../models/EnseigneModel");
const factory = require("./HandlerFactory");

exports.getAllEnseignes = factory.getAll(enseigne);
exports.addEnseigne = factory.createOne(enseigne);
exports.findEnseigne = factory.findOne(enseigne);
exports.updateEnseigne = factory.updateOne(enseigne);
