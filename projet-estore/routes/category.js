const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const {protection, restricTo} = require('../controllers/auth');

router.route('/')
    .get(categoryController.categories)
    .post(protection, restricTo("admin"), categoryController.create);

router.route('/:id')
    .get(categoryController.category)
    .put(protection, restricTo("admin"), categoryController.update)
    .delete(protection, restricTo("admin"), categoryController.delete)

module.exports = router;