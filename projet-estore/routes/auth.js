const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/protege/:userId', authController.protection,authController.restricTo("admin"), (req, res) => {
    res.status(200).json({
        message: "Cette route est protegée"
    })
})

module.exports = router;