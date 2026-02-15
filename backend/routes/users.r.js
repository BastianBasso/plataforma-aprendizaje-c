const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.C');
const subidaImagen = require('../middlewares/subidaImagen');
const { requireAuth } = require('../middlewares/auth');

// Ruta para obtener información del usuario autenticado
router.get('/search-user', requireAuth, userController.getPerfil);
router.get('/me', requireAuth, userController.getPerfil);
router.put('/me', requireAuth, userController.updatePerfil);
router.post('/me/imagen', requireAuth, subidaImagen.single('imagen'), userController.uploadImagen);

module.exports = router;