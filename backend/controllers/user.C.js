const db = require('../db');
const bcrypt = require('bcrypt');

const getPerfil = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT id, usuario, correo, nombre, imagen_url, bio, rol FROM usuario WHERE id=$1',
      [req.session.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.status(200).json({ success: true, user: rows[0] });

  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ success: false, message: 'Error al obtener perfil' });
  }
};

const updatePerfil = async (req, res) => {
  const { usuario, nombre, correo, bio } = req.body;

  try {
      if (!usuario || !correo) {
          return res.status(400).json({ success: false, message: 'El usuario y el correo no pueden estar vacíos' });
      }

      await db.query(
        'UPDATE usuario SET usuario=$1, nombre=$2, correo=$3, bio=$4 WHERE id=$5',
        [usuario, nombre, correo, bio || '', req.session.userId]
      );
      
      res.json({ success: true, message: 'Perfil actualizado correctamente' });
      
  } catch (error) {
      console.error('Error al actualizar perfil:', error);
      
      if (error.code === '23505') {
          const campo = error.constraint.includes('correo') ? 'correo electrónico' : 'nombre de usuario';
          return res.status(400).json({ success: false, message: `Este ${campo} ya está en uso. ¡Elige otro!` });
      }
      
      res.status(500).json({ success: false, message: 'Error del servidor al actualizar' });
  }
};

const uploadImagen = async (req, res) => {
  const imagenUrl = `/imagen/${req.file.filename}`;
  await db.query('UPDATE usuario SET imagen_url=$1 WHERE id=$2', [imagenUrl, req.session.userId]);
  res.json({ imagenUrl });
};

const getUserProgress = async (req, res) => {
    const { usuarioId, moduloId } = req.params;

    try {
        const query = `
            SELECT 
                (SELECT COUNT(*) FROM Leccion WHERE Modulo_ID = $2) as total_pasos,
                COUNT(pp.ID) as pasos_completados
            FROM Progreso pp
            JOIN Leccion l ON pp.Leccion_ID = l.ID
            WHERE pp.Usuario_ID = $1 AND l.Modulo_ID = $2
        `;
        
        const result = await db.query(query, [usuarioId, moduloId]);
        const { total_pasos, pasos_completados } = result.rows[0];
        
        const porcentaje = total_pasos > 0 ? ((pasos_completados / total_pasos) * 100).toFixed(2) : 0;

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

        const porcentajeAcierto = stats.total_respondidas > 0 ? ((stats.aciertos / stats.total_respondidas) * 100).toFixed(2) : 0;

        res.status(200).json({ ...stats, porcentaje_acierto: porcentajeAcierto });
    } catch (error) {
        res.status(500).json({ error: 'Error al generar estadísticas de quiz' });
    }
};

const updatePassword = async (req, res) => {
  const { nuevaContrasena } = req.body;
  
  if (!nuevaContrasena || nuevaContrasena.length < 6) {
      return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
      const hash = await bcrypt.hash(nuevaContrasena, 10);
      await db.query('UPDATE usuario SET contraseña=$1 WHERE id=$2', [hash, req.session.userId]);
      res.json({ success: true, message: 'Contraseña actualizada de forma segura' });
  } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      res.status(500).json({ success: false, message: 'Error al actualizar contraseña' });
  }
};

const getGlobalStats = async (req, res) => {
    try {
        const quizzesRes = await db.query(
            `SELECT COUNT(DISTINCT p.leccion_id) as aprobados 
             FROM respuesta_quiz_usuario r
             JOIN pregunta p ON r.pregunta_id = p.id
             WHERE r.usuario_id = $1 AND r.es_correcta = true`,
            [req.session.userId]
        );
        
        const modulosRes = await db.query(
            `SELECT COUNT(DISTINCT l.modulo_id) as completados 
             FROM progreso pp 
             JOIN leccion l ON pp.leccion_id = l.id 
             WHERE pp.usuario_id = $1`,
            [req.session.userId]
        );

        res.json({
            success: true,
            quizzes: parseInt(quizzesRes.rows[0]?.aprobados || 0),
            modulos: parseInt(modulosRes.rows[0]?.completados || 0)
        });
    } catch (error) {
        console.error('Error obteniendo stats:', error);
        res.json({ success: true, quizzes: 0, modulos: 0 }); 
    }
};

module.exports = {
    getPerfil,
    updatePerfil,
    uploadImagen,
    getUserProgress,
    getQuizStats,
    updatePassword, 
    getGlobalStats
};