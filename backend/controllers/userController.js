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



module.exports = {
    getPerfil,
    updatePerfil,
    uploadImagen
};