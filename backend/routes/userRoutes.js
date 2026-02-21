const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.C');
const { requireAuth } = require('../middlewares/auth');

console.log("Lo que tiene userController adentro es:", Object.keys(userController));

// Ruta para obtener información del usuario autenticado
router.get('/search-user', requireAuth, userController.getPerfil);

module.exports = router;