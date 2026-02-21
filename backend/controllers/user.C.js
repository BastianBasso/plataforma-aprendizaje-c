const db = require('../db');

const { requireAuth } = require('../middlewares/auth');



const getPerfil = async (req, res) => {
  try {
    const userId = req.session.userId; 

    if (!userId) {
        return res.status(401).json({ success: false, message: 'No autenticado' });
    }

    const { rows } = await db.query(
      'SELECT id, usuario, correo, nombre, imagen_url, bio, rol FROM usuario WHERE id=$1',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.status(200).json({
        success: true,      // React espera esto
        user: rows[0]       // Y React espera esto
    });

  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ success: false, message: 'Error al obtener perfil' });
  }
};

const updatePerfil = async (req, res) => {
  const { nombre, bio } = req.body;
  await db.query(
    'UPDATE usuario SET nombre=$1, bio=$2 WHERE id=$3',
    [nombre, bio, req.user.id]
  );
  res.json({ message: 'Perfil actualizado' });
};

const uploadImagen = async (req, res) => {
  const imagenUrl = `/imagen/${req.file.filename}`;
  await db.query(
    'UPDATE usuario SET imagen_url=$1 WHERE id=$2',
    [imagenUrl, req.user.id]
  );
  res.json({ imagenUrl });
};

const getUserProgress = async (req, res) => {
    const { usuarioId, moduloId } = req.params;

    try {
        const query = `
            SELECT 
                (SELECT COUNT(*) FROM Leccion WHERE Modulo_ID = $2) as total_pasos,
                COUNT(pp.ID) as pasos_completados
            FROM Progreso_Paso pp
            JOIN Leccion l ON pp.Leccion_ID = l.ID
            WHERE pp.Usuario_ID = $1 AND l.Modulo_ID = $2
        `;
        
        const result = await db.query(query, [usuarioId, moduloId]);
        const { total_pasos, pasos_completados } = result.rows[0];
        
        const porcentaje = total_pasos > 0 
            ? ((pasos_completados / total_pasos) * 100).toFixed(2) 
            : 0;

        res.status(200).json({
            total_pasos: parseInt(total_pasos),
            pasos_completados: parseInt(pasos_completados),
            porcentaje_progreso: porcentaje
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener progreso' });
    }
};

const getQuizStats = async (req, res) => {
    const { usuarioId, leccionId } = req.params;

    try {
        const query = `
            SELECT 
                COUNT(*) as total_respondidas,
                SUM(CASE WHEN Es_Correcta THEN 1 ELSE 0 END) as aciertos,
                SUM(CASE WHEN NOT Es_Correcta THEN 1 ELSE 0 END) as fallos
            FROM Respuesta_Quiz_Usuario r
            JOIN Pregunta_Quiz p ON r.Pregunta_ID = p.ID
            WHERE r.Usuario_ID = $1 AND p.Leccion_ID = $2
        `;

        const result = await db.query(query, [usuarioId, leccionId]);
        const stats = result.rows[0];

        const porcentajeAcierto = stats.total_respondidas > 0 
            ? ((stats.aciertos / stats.total_respondidas) * 100).toFixed(2) 
            : 0;

        res.status(200).json({
            ...stats,
            porcentaje_acierto: porcentajeAcierto
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al generar estadísticas de quiz' });
    }
};

module.exports = {
    getPerfil,
    updatePerfil,
    uploadImagen,
    getUserProgress,
    getQuizStats
};