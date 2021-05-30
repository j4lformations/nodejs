const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router
    .route('/register')
    .get(userController.formRegsiter)
    .post(userController.postFormRegsiter);

router
    .route('/login')
    .get(userController.formLogin)
    .post(userController.postFormLogin);

router
    .route('/logout')
    .get(userController.formLogout)


module.exports = router;