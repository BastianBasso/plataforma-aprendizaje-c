const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middlewares/auth');

// Ruta para obtener información del usuario autenticado
router.get('/search-user', requireAuth, userController.getUserProfile);

module.exports = router;