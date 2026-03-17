const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { requireAuth } = require('../middlewares/auth');

// Ruta para obtener la lista de cursos para el selector
router.get('/cursos', requireAuth, cursoController.getCursos);

// Ruta para obtener los módulos de un curso en particular
router.get('/cursos/:cursoId/modulos', requireAuth, cursoController.getModulosByCurso);

router.post('/cursos/:cursoId/modulos', requireAuth, cursoController.createModulo);

module.exports = router;