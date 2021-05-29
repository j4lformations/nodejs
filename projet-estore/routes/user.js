const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

// La route par defaut
router
    .route('/users/register')
    .get(userController.formRegsiter)
    .post(userController.postFormRegsiter);

module.exports = router;