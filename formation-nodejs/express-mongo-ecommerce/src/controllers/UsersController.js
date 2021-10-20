// Crée par Joachim Zadi le 30/04/2020 à 20:05
// ===========================================
const User = require("../models/UserModel");
const factory = require("../controllers/HandlerFactory");

exports.getAllUsers = factory.getAll(User);
exports.postUser = factory.createOne(User);
exports.findUser = factory.findOne(User);