const db = require('../db');

// 1. Obtener todos los cursos
const getCursos = async (req, res) => {
    try {
        // Asumo que tu tabla se llama 'curso' y tiene 'id' y 'nombre' o 'titulo'
        const query = 'SELECT id, nombre, descripcion FROM curso ORDER BY id ASC';
        const { rows } = await db.query(query);
        
        res.status(200).json({ success: true, cursos: rows });
    } catch (error) {
        console.error('Error al obtener cursos:', error);
        res.status(500).json({ success: false, message: 'Error del servidor al cargar cursos.' });
    }
};

// 2. Obtener los módulos de un curso específico (con cantidad de lecciones)
const getModulosByCurso = async (req, res) => {
    const { cursoId } = req.params;

    try {
        const query = `
            SELECT 
                m.id, 
                m.titulo, 
                m.descripcion, 
                COUNT(l.id) as total_lecciones
            FROM modulo m
            LEFT JOIN leccion l ON m.id = l.modulo_id
            WHERE m.curso_id = $1
            GROUP BY m.id
            ORDER BY m.id ASC
        `;
        const { rows } = await db.query(query, [cursoId]);
        
        const modulosConEstado = rows.map((modulo, index) => ({
            ...modulo,
            orden: index + 1,
            estado: 'Publicado' 
        }));

        res.status(200).json({ success: true, modulos: modulosConEstado });
    } catch (error) {
        console.error('Error al obtener módulos:', error);
        res.status(500).json({ success: false, message: 'Error del servidor al cargar módulos.' });
    }
};

// 3. Crear un nuevo módulo
const createModulo = async (req, res) => {
    const { cursoId } = req.params;
    const { titulo, descripcion } = req.body;

    try {
        // 1. Averiguar cuál es el número de orden más alto para este curso
        const ordenQuery = 'SELECT COALESCE(MAX(orden), 0) + 1 AS proximo_orden FROM modulo WHERE curso_id = $1';
        const ordenResult = await db.query(ordenQuery, [cursoId]);
        const proximoOrden = ordenResult.rows[0].proximo_orden;

        // 2. Insertar el nuevo módulo en la base de datos
        const insertQuery = `
            INSERT INTO modulo (curso_id, titulo, descripcion, orden) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
        const result = await db.query(insertQuery, [cursoId, titulo, descripcion, proximoOrden]);

        // Formatear la respuesta para React (con 0 lecciones al inicio)
        const nuevoModulo = {
            ...result.rows[0],
            nombre: result.rows[0].titulo, // Para mantener compatibilidad con tu frontend
            total_lecciones: 0,
            estado: 'Borrador' // Por defecto lo creamos como Borrador
        };

        res.status(201).json({ success: true, modulo: nuevoModulo, message: 'Módulo creado con éxito.' });
    } catch (error) {
        console.error('Error al crear módulo:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al crear módulo.' });
    }
};

module.exports = {
    getCursos,
    getModulosByCurso,
    createModulo
};