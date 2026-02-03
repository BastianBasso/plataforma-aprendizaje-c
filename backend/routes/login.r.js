const express = require('express');
const router = express.Router();
const authController = require('../controllers/login.c');

// Rutas de autenticación

router.post('/login', authController.login);
router.post('/logout', authController.logout);


module.exports = router;