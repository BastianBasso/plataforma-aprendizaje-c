const e = require('express');
const db = require('../db');

const getUsers = async (req, res) => {
    try {
        const query = 'SELECT ID, Usuario, Correo, Rol, Ultimo_acceso FROM Usuario ORDER BY ID ASC';
        const result = await db.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de usuarios.' });
    }
};

const getUserStats = async (req, res) => {
    const { userId } = req.params;
    try {
        const query = 'SELECT * FROM Estadistica_Usuario WHERE Usuario_ID = $1';
        const result = await db.query(query, [userId]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estadísticas para este usuario.' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar estadísticas globales.' });
    }
};

const getQuizStatsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const query = `
            SELECT 
                l.Titulo as leccion,
                COUNT(r.ID) as total_preguntas,
                SUM(CASE WHEN r.Es_Correcta THEN 1 ELSE 0 END) as correctas,
                SUM(CASE WHEN NOT r.Es_Correcta THEN 1 ELSE 0 END) as incorrectas
            FROM Respuesta_Quiz_Usuario r
            JOIN Pregunta_Quiz p ON r.Pregunta_ID = p.ID
            JOIN Leccion l ON p.Leccion_ID = l.ID
            WHERE r.Usuario_ID = $1
            GROUP BY l.Titulo
        `;
        const result = await db.query(query, [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al analizar resultados de quizzes.' });
    }
};

const getUserProgressDetail = async (req, res) => {
    const { userId } = req.params;
    try {
        const query = `
            SELECT 
                m.Nombre as modulo,
                l.Titulo as leccion,
                l.Tipo_Contenido,
                CASE WHEN pp.ID IS NOT NULL THEN 'Completado' ELSE 'Pendiente' END as estado,
                pp.Fecha_Completado
            FROM Modulo m
            JOIN Leccion l ON m.ID = l.Modulo_ID
            LEFT JOIN Progreso_Paso pp ON l.ID = pp.Leccion_ID AND pp.Usuario_ID = $1
            ORDER BY m.ID, l.ID
        `;
        const result = await db.query(query, [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener detalle de progreso.' });
    }
};

exports = module.exports = {
    getUsers,
    getUserStats,
    getQuizStatsByUser,
    getUserProgressDetail
};