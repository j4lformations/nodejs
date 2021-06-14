const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user')

router
    .route('/signup')
    .get(authController.formSignup)
    .post(authController.signup);

router
    .route('/login')
    .get(authController.formLogin)
    .post(authController.login);

router.get('/logout', authController.logout);

// Protéger toutes les routes après ce middleware
router.use(authController.protection);

// router.put('/updateMyPassword')
router.put('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.put('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Les routes pour les admins
router.use(authController.restricTo('admin'));

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .put(userController.getUser)
    .delete(userController.getUser)


module.exports = router;