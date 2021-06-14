const Product = require('../models/product');
const {capitalCase} = require('capital-case');
const {errorHandler} = require('../utils/dbErrorHandler')

exports.products = async (req, res) => {
    try {
        const products = await Product.find({})
            .select('-__v -createdAt -updatedAt')
            .sort('name');
        await res
            .status(200)
            .json(products)
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};

// CREATION D'UN PRODUIT
exports.create = async (req, res) => {
    try {
        const {name, price, category} = await req.body;
        let product = new Product({
            name: name,
            price: price,
            category: category
        })
        product = await product.save();
        await res
            .status(200)
            .json(product);
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};

exports.product = async (req, res) => {
    try {
        const product = await Product.findById({_id: req.params.id})
            .select('-__v -createdAt -updatedAt');

        await res
            .status(200)
            .json(product)
    } catch (error) {
        await res
            .status(400)
            .json({
                path: error.path,
                message: error.message
            });
    }
};

exports.update = async (req, res) => {
    try {
        req.body.name = capitalCase(req.body.name);
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        await res
            .status(200)
            .json(product)
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};

exports.delete = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id, req.body);
        await res
            .status(200)
            .json({
                message: "Product successfully removed !!!"
            })
    } catch (error) {
        await res
            .status(400)
            .json(errorHandler(error));
    }
};