const Category = require('../models/category');
const {capitalCase} = require('capital-case');
const {errorHandler} = require('../utils/dbErrorHandler')

exports.categories = async (req, res) => {
    try {
        const categories = await Category.find({})
            .select('-__v -createdAt -updatedAt')
            .sort('name');
        await res
            .status(200)
            .json(categories)
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};

exports.create = async (req, res) => {
    try {
        const {name} = req.body;
        let category = new Category({
                name: name
            }
        )
        category = await category.save();
        await res
            .status(200)
            .json(category)
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};

exports.category = async (req, res) => {
    try {
        const category = await Category.findById({_id: req.params.id});
        if (!category) {
            throw {message: `Category of id ${req.params.id} could not be found`};
        }
        await res
            .status(200)
            .json(category)
    } catch (error) {
        await res
            .status(400)
            .json(error);
    }
};

exports.update = async (req, res) => {
    try {
        req.body.name = capitalCase(req.body.name);
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        await res
            .status(200)
            .json(category)
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};

exports.delete = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id, req.body);
        await res
            .status(200)
            .json({
                message: "Catégory supprimée avec succès !!!"
            })
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};