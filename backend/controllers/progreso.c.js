// server/controllers/progreso.controller.js
const db = require('../db'); 

/*
 1. POST /api/progreso/paso/completar
 Registra la finalización de un paso/lección (para el botón 'Next').
 */


exports.progreso = async (req, res) => {
    const { usuarioId, leccionId, moduloId } = req.body; 

    try {
        
        const resultadoLeccion = await db.query(
            'SELECT ID, Tipo_Contenido FROM Leccion WHERE ID = $1 AND Modulo_ID = $2',
            [leccionId, moduloId]
        );

        if (resultadoLeccion.rows.length === 0) {
            return res.status(404).json({ 
                error: 'Lección no encontrada en este módulo (o los datos no coinciden).' 
            });
        }

        const checkUsuario = await db.query('SELECT ID FROM Usuario WHERE ID = $1', [usuarioId]);
        if (checkUsuario.rows.length === 0) {
            return res.status(404).json({ error: 'El usuario no existe.' });
        }

        const { tipo_contenido } = resultadoLeccion.rows[0];

        if (tipo_contenido === 'Ejercicio_Codigo') {
            return res.status(403).json({ 
                error: 'La lección de código solo se puede completar mediante evaluación.' 
            });
        }

        await db.query(
            `INSERT INTO progreso (Usuario_ID, Leccion_ID, Completada) 
             VALUES ($1, $2, TRUE) 
             ON CONFLICT (Usuario_ID, Leccion_ID) DO NOTHING`,
            [usuarioId, leccionId]
        );

        const queryCalculo = `
            SELECT 
                COALESCE(ROUND((CAST(COUNT(p.Leccion_ID) AS NUMERIC) * 100) / NULLIF(COUNT(l.ID), 0), 2), 0) AS nuevo_porcentaje
            FROM Leccion l
            LEFT JOIN progreso p ON p.Leccion_ID = l.ID AND p.Usuario_ID = $1
            WHERE l.Modulo_ID = $2;
        `;
        
        const result = await db.query(queryCalculo, [usuarioId, moduloId]);

        const nuevoPorcentaje = result.rows.length > 0 ? result.rows[0].nuevo_porcentaje : 0;

        res.status(200).json({ 
            mensaje: `Paso completado (${tipo_contenido}) registrado.`, 
            nuevoPorcentaje: nuevoPorcentaje 
        });

    } catch (error) {
        console.error('Error en la función progreso:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error del servidor al registrar progreso.' });
        }
    }
};
    

/*
  2. POST /api/progreso/respuesta
  Registra la respuesta de una pregunta seleccionando la Alternativa_ID.
*/
exports.registrarRespuesta = async (req, res) => {
    const { usuarioId, preguntaId, alternativaIdSeleccionada } = req.body; 
    
    try {
        const consultaValidacion = await db.query(
            `SELECT a.Es_Correcta, p.Categoria_ID 
             FROM Alternativa_Quiz a
             JOIN Pregunta_Quiz p ON a.Pregunta_ID = p.ID
             WHERE a.ID = $1 AND p.ID = $2`,
            [alternativaIdSeleccionada, preguntaId]
        );

        if (consultaValidacion.rows.length === 0) {
            return res.status(404).json({ error: 'Datos no encontrados.' });
        }
        
        const { es_correcta, categoria_id } = consultaValidacion.rows[0];

        await db.query(
            `INSERT INTO Respuesta_Quiz_Usuario (Usuario_ID, Pregunta_ID, Alternativa_ID, Es_Correcta, Intento) 
             VALUES ($1, $2, $3, $4, 1) 
             ON CONFLICT (Usuario_ID, Pregunta_ID, Intento) 
             DO UPDATE SET Alternativa_ID = $3, Es_Correcta = $4, Fecha_Respuesta = CURRENT_TIMESTAMP`,
            [usuarioId, preguntaId, alternativaIdSeleccionada, es_correcta]
        );

        res.status(200).json({ 
            mensaje: 'Respuesta registrada.',
            esCorrecta: es_correcta,
            categoriaId: categoria_id 
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};
/*
  3. GET /api/progreso/curso/:usuarioId/:cursoId
  Calcula el porcentaje de avance general del curso (barra total).
 */
exports.obtenerProgresoCurso = async (req, res) => {
    const { usuarioId, cursoId } = req.params;
    
    const query = `
        SELECT
            COUNT(l.ID) AS Total_Pasos,
            COUNT(pp.Leccion_ID) AS Pasos_Completados,
            COALESCE(ROUND((CAST(COUNT(pp.Leccion_ID) AS NUMERIC) * 100) / NULLIF(COUNT(l.ID), 0), 2), 0)
            FROM Leccion l
        JOIN Modulo m ON m.ID = l.Modulo_ID
        LEFT JOIN Progreso pp ON pp.Leccion_ID = l.ID AND pp.Usuario_ID = $1
        WHERE m.Curso_ID = $2;
    `;

    try {
        const result = await db.query(query, [usuarioId, cursoId]);
        res.status(200).json({ progreso: result.rows[0] });
    } catch (error) {
        console.error('Error al obtener progreso del curso:', error);
        res.status(500).json({ error: 'Error del servidor al calcular progreso.' });
    }
};


 // 4. GET /api/progreso/modulo/:usuarioId/:moduloId
 // Calcula el porcentaje de avance dentro de un módulo.
 // (La lógica es idéntica a la anterior, solo cambia la cláusula WHERE)
 
exports.obtenerProgresoModulo = async (req, res) => {
    const { usuarioId, moduloId } = req.params;
    
    const query = `
        SELECT
            COUNT(l.ID) AS Total_Pasos,
            COUNT(pp.Leccion_ID) AS Pasos_Completados,
            COALESCE(ROUND((CAST(COUNT(pp.Leccion_ID) AS NUMERIC) * 100) / NULLIF(COUNT(l.ID), 0), 2), 0)
            FROM Leccion l
        LEFT JOIN Progreso pp ON pp.Leccion_ID = l.ID AND pp.Usuario_ID = $1
        WHERE l.Modulo_ID = $2; 
    `;

    try {
        const result = await db.query(query, [usuarioId, moduloId]);
        res.status(200).json({ progreso: result.rows[0] });
    } catch (error) {
        console.error('Error al obtener progreso del módulo:', error);
        res.status(500).json({ error: 'Error del servidor al calcular progreso.' });
    }
};

// 5. GET /api/progreso/acierto/:usuarioId/:leccionId
 // Calcula el porcentaje de acierto del quiz asociado a una lección.
 
exports.obtenerPorcentajeAcierto = async (req, res) => {
    const { usuarioId, leccionId } = req.params;

   const query = `
    SELECT
        COUNT(ru.Pregunta_ID) AS Total_Respuestas,
        SUM(CASE WHEN ru.Es_Correcta = TRUE THEN 1 ELSE 0 END) AS Aciertos,
        ROUND((CAST(SUM(CASE WHEN ru.Es_Correcta = TRUE THEN 1 ELSE 0 END) AS NUMERIC) * 100) / NULLIF(COUNT(ru.Pregunta_ID), 0), 2) AS Porcentaje_Acierto
        FROM Respuesta_Quiz_Usuario ru  
        JOIN Pregunta p ON p.ID = ru.Pregunta_ID
        WHERE ru.Usuario_ID = $1 AND p.Leccion_ID = $2;
      `;

    try {
        const result = await db.query(query, [usuarioId, leccionId]);
        // Si no hay respuestas, devuelve 0%
        const acierto = result.rows[0];
        if (!acierto.total_respuestas) {
            acierto.porcentaje_acierto = '0.00';
        }
        res.status(200).json({ acierto });
    } catch (error) {
        console.error('Error al obtener porcentaje de acierto:', error);
        res.status(500).json({ error: 'Error del servidor al calcular acierto.' });
    }
};


 // 6. POST /api/progreso/codigo/enviar
 // Registra el envío de código y marca la lección como completada si el score es perfecto.

exports.registrarEnvioCodigo = async (req, res) => {
    // ... Lógica para ejecutar el Juez en Línea y obtener el score ...
    
    // Obtener Puntos Máximos y Leccion_ID del Ejercicio
    const ejercicioResult = await db.query(
        `SELECT Puntos_Maximos, Leccion_ID FROM Ejercicio WHERE ID = $1`,
        [ejercicioId]
    );
    const { puntos_maximos, leccion_id } = ejercicioResult.rows[0];

    // ... INSERT en Envio_Codigo ...

    // Lógica de Progresión CRÍTICA
    if (scoreObtenido >= puntos_maximos) {
        await db.query(
            `INSERT INTO Progreso_Paso (Usuario_ID, Leccion_ID, Completada) 
             VALUES ($1, $2, TRUE) 
             ON CONFLICT (Usuario_ID, Leccion_ID) DO NOTHING`,
            [usuarioId, leccion_id]
        );
        res.status(200).json({ mensaje: 'Ejercicio resuelto con éxito. Progreso actualizado.', completado: true });
    }
    // ...
};

/*
  GET /api/quiz/alternativas/:leccionId
  Obtiene todas las preguntas y alternativas de una lección para renderizar en la UI.
*/
exports.obtenerPreguntaQuiz = async (req, res) => {
    const { leccionId } = req.params;
    try {
        const query = `
            SELECT
                p.ID AS pregunta_id,
                p.Texto_Pregunta AS pregunta_texto,
                p.Tipo_Conocimiento,
                json_agg(
                    json_build_object(
                        'id', a.ID,
                        'texto', a.Texto_Alternativa,
                        'orden', a.Orden
                    ) ORDER BY a.Orden
                ) AS alternativas
            FROM Pregunta p
            JOIN Alternativa_Quiz a ON p.ID = a.Pregunta_ID
            WHERE p.Leccion_ID = $1
            GROUP BY p.ID
            ORDER BY p.ID;
        `;
        const result = await db.query(query, [leccionId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener preguntas del quiz:', error);
        res.status(500).json({ error: 'Error del servidor.' });
    }
};