const db = require('../db');
const { requireAuth } = require('../middlewares/auth');

/**
 * Obtiene información del usuario autenticado
 */
const getUserProfile = async (req, res) => {
    const userId = req.session.userId; 

    if (!userId) {
        return res.status(401).json({ success: false, message: 'No se encontró el ID de usuario en la sesión.' });
    }

    const userQuery = 'SELECT Usuario, Rol FROM Usuario WHERE ID = $1';
    
    try {
        const results = await db.query(userQuery, [userId]);
        const rows = results.rows;

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Información del usuario no encontrada.' });
        }

        const user = rows[0];
        res.json({ success: true, user: { username: user.usuario, role: user.rol } });
        
    } catch(err) {
        console.error('Error interno del servidor al obtener la información del usuario:', err);
        res.status(500).json({ success: false, message: 'Error interno del servidor al obtener la información del usuario.' });
    }
};

module.exports = {
    getUserProfile
};