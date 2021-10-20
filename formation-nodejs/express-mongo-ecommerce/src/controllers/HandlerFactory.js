// Crée par Joachim Zadi le 30/04/2020 à 20:35
// ===========================================
const mongoose = require("mongoose");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

exports.getAll = Model => catchAsync(async (req, res, next) => {
    let documents = await Model.find().select('-__v');

    //Reponse
    await res.status(200)
        .json({
            status: "SUCCES",
            results: documents.length,
            data: {
                data: documents
            }
        });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    let document = await Model.create(req.body);
    //Reponse
    await res.status(201)
        .json({
            status: "SUCCES",
            data: {
                data: document
            }
        });
});

exports.findOne = Model => catchAsync(async (req, res, next) => {

    let document = await Model.findById(req.params.id);
    //On test si le document n'est pas trouvé
    if (!document) {
        return next(new AppError(`Aucun document correspondant à l'ID '${req.params.id}' n'existe en BDD`, 404));
    }

    //Reponse
    await res.status(200)
        .json({
            status: "SUCCES",
            data: document
        });
});

exports.updateOne = Model => catchAsync(async (req, res, next) => {

    let document = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true});
    //On test si le document n'est pas trouvé
    if (!document) {
        return next(new AppError(`Aucun document correspondant à l'ID '${req.params.id}' n'existe en BDD`, 404));
    }

    //Reponse
    await res.status(200)
        .json({
            status: "SUCCES",
            data: document
        });
});
