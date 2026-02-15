const db = require('../db'); 

exports.obtenerAnalisis = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const result = await db.query(
            `SELECT 
                c.Nombre AS categoria,
                COUNT(r.ID) AS total_respondidas,
                SUM(CASE WHEN r.Es_Correcta THEN 1 ELSE 0 END) AS aciertos,
                ROUND((SUM(CASE WHEN r.Es_Correcta THEN 1 ELSE 0 END)::numeric / COUNT(r.ID)) * 100, 2) AS porcentaje_exito
             FROM Respuesta_Quiz_Usuario r
             JOIN Pregunta_Quiz p ON r.Pregunta_ID = p.ID
             JOIN Categoria_Pregunta c ON p.Categoria_ID = c.ID
             WHERE r.Usuario_ID = $1
             GROUP BY c.Nombre`,
            [usuarioId]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al generar estadísticas.' });
    }
};

module.exports = {
    obtenerAnalisis
};