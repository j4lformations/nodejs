const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const {protection, restricTo} = require('../controllers/auth');

router
    .route("/")
    .get(productController.products)
    .post(protection, restricTo('admin'), productController.create);

router
    .route("/:id")
    .get(productController.product)
    .put(productController.update)
    .delete(productController.delete);

module.exports = router;