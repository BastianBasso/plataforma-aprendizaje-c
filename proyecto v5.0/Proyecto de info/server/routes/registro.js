const express = require('express');
const router = express.Router();
const authController = require('../controllers/Cregistro');

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/restore-password', authController.restorePassword);

module.exports = router;

