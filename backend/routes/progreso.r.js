const express = require('express');
const router = express.Router();
const progresoController = require('../controllers/progreso.c');

// Rutas para el progreso de Contenido (Barra de 'Next')
// --------------------------------------------------------

//  Marca una lección/paso como completado. Usado al hacer clic en 'Next'.
router.post('/progreso/next', progresoController.progreso);

// Calcula y devuelve el porcentaje total de un CURSO.
router.get('/curso/:usuarioId/:cursoId', progresoController.obtenerProgresoCurso);

// Calcula y devuelve el porcentaje de un MÓDULO.
router.get('/modulo/:usuarioId/:moduloId', progresoController.obtenerProgresoModulo);

// Rutas para el Progreso de Evaluaciones (Aciertos/Fallos)
// --------------------------------------------------------

// Registra la respuesta del usuario a una pregunta y si fue correcta.
router.post('/respuesta', progresoController.registrarRespuesta);

// Obtiene el porcentaje de acierto de un usuario en un QUIZ/Lección.
router.get('/acierto/:usuarioId/:leccionId', progresoController.obtenerPorcentajeAcierto);

module.exports = router;