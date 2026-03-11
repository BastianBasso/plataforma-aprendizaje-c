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


// Obtener todos los usuarios (Para Admin y Super Admin)
const getAllUsers = async (req, res) => {
    try {
        const { rows: adminCheck } = await db.query(
            'SELECT rol FROM usuario WHERE id = $1', 
            [req.session.userId]
        );

        // CORRECCIÓN DEL ERROR 403: Permitimos a ambos roles
        const rolUsuario = adminCheck[0]?.rol;
        if (!rolUsuario || (rolUsuario !== 'Administrador' && rolUsuario !== 'Super Administrador')) {
            return res.status(403).json({ success: false, message: 'Acceso denegado. Solo administradores.' });
        }

        const query = `
            SELECT id, COALESCE(nombre, usuario) as name, rol as role, correo as email, ultimo_acceso as lastconnection
            FROM usuario ORDER BY id ASC
        `;
        const { rows } = await db.query(query);

        const usersConProgreso = rows.map(u => ({ ...u, progress: 0 }));
        res.json({ success: true, users: usersConProgreso });

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ success: false, message: 'Error del servidor al obtener usuarios' });
    }
};

// Actualizar el rol de un usuario
const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { newRole } = req.body;
    const adminId = req.session.userId;
    const adminRole = req.session.role; 

    const validRoles = ['Usuario', 'Administrador', 'Super Administrador'];
    if (!validRoles.includes(newRole)) return res.status(400).json({ success: false, message: 'Rol inválido' });

    if (adminRole !== 'Super Administrador' && (newRole === 'Administrador' || newRole === 'Super Administrador')) {
        return res.status(403).json({ success: false, message: 'No tienes permisos para asignar este rol.' });
    }

    try {
        if (parseInt(id) === adminId) return res.status(400).json({ success: false, message: 'No puedes cambiar tu propio rol desde aquí.' });

        await db.query('UPDATE usuario SET rol = $1 WHERE id = $2', [newRole, id]);
        res.json({ success: true, message: 'Rol actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor.' });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const adminId = req.session.userId;

    try {
        if (parseInt(id) === adminId) return res.status(400).json({ success: false, message: 'No puedes eliminar tu propia cuenta.' });

        await db.query('DELETE FROM usuario WHERE id = $1', [id]);
        res.json({ success: true, message: 'Usuario eliminado del sistema.' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar. Verifica si el usuario tiene datos asociados.' });
    }
};

module.exports = {
    getUsers,
    getUserStats,
    getQuizStatsByUser,
    getUserProgressDetail,
    getAllUsers,
    updateUserRole,
    deleteUser
};