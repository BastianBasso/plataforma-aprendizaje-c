const db = require('../db');
const bcrypt = require('bcryptjs'); 
const { validatePassword, validateEmail, validateRequiredFields } = require('../utils/validators');

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

  const fieldsValidation = validateRequiredFields({ usuario, correo }, ['usuario', 'correo']);
  if (!fieldsValidation.isValid) {
      return res.status(400).json({ success: false, message: fieldsValidation.error });
  }

  const emailValidation = validateEmail(correo);
  if (!emailValidation.isValid) {
      return res.status(400).json({ success: false, message: emailValidation.error });
  }

  try {
      await db.query(
        'UPDATE usuario SET usuario=$1, nombre=$2, correo=$3, bio=$4 WHERE id=$5',
        [usuario, nombre, emailValidation.normalizedEmail, bio || '', req.session.userId]
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

const updatePassword = async (req, res) => {
  const { nuevaContrasena } = req.body;

  if (!nuevaContrasena) {
      return res.status(400).json({ success: false, message: 'La nueva contraseña es requerida.' });
  }

  const passwordValidation = validatePassword(nuevaContrasena);
  if (!passwordValidation.isValid) {
      return res.status(400).json({
          success: false,
          message: "La contraseña no cumple con los requisitos de seguridad.",
          errors: passwordValidation.errors 
      });
  }

  try {
      const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

      await db.query(
          'UPDATE usuario SET contraseña=$1 WHERE id=$2',
          [hashedPassword, req.session.userId]
      );

      res.json({ success: true, message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
      console.error('Error al cambiar contraseña desde perfil:', error);
      res.status(500).json({ success: false, message: 'Error interno al cambiar la contraseña.' });
  }
};

module.exports = {
    getPerfil,
    updatePerfil,
    uploadImagen,
    updatePassword 
};