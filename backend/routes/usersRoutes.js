const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const subidaImagen = require('../middlewares/subidaImagen');
const { requireAuth } = require('../middlewares/auth');

router.get('/search-user', requireAuth, userController.getPerfil);

router.get('/perfil', requireAuth, userController.getPerfil);
router.put('/perfil', requireAuth, userController.updatePerfil);
router.post('/perfil/imagen', requireAuth, subidaImagen.single('imagen'), userController.uploadImagen);
router.put('/perfil/password', requireAuth, userController.updatePassword);



module.exports = router;