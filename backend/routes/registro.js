const express = require('express');
const router = express.Router();
const authController = require('../controllers/registro.c');

// Rutas de registro y recuperacion de contraseña
router.post('/register', authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/restore-password', authController.restorePassword);

module.exports = router;

