const bcrypt = require('bcryptjs');
const db = require('../db');
const { validatePassword, validateEmail, validateRequiredFields } = require('../utils/validators');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Inicia sesión del usuario
const login = async (req, res) => {
    const { user, password } = req.body;

    const query = 'SELECT ID, Usuario, Contraseña, Rol FROM Usuario WHERE Usuario = $1';
    
    try {
        const results = await db.query(query, [user]);
        const rows = results.rows; 

        if (rows.length > 0) {
            const foundUser = rows[0];

            const isMatch = await bcrypt.compare(password, foundUser.contraseña);

            if (isMatch) {
                const userIdToUpdate = foundUser.id;
                const updateLoginQuery = 'UPDATE Usuario SET Ultimo_acceso = CURRENT_TIMESTAMP WHERE ID = $1';

                try {
                    await db.query(updateLoginQuery, [userIdToUpdate]);
                    console.log(`Fecha de último inicio de sesión actualizada para el usuario ID: ${userIdToUpdate}`);
                } catch (updateErr) {
                    console.error('Error al actualizar la fecha de último inicio de sesión para el usuario', userIdToUpdate, ':', updateErr);
                }

                req.session.userId = foundUser.id;
                req.session.username = foundUser.usuario;
                req.session.role = foundUser.rol; 
                req.session.loggedIn = true;

                res.status(200).json({ 
                    success: true, 
                    message: 'Inicio de sesión exitoso.', 
                    usuario: {
                        id: foundUser.id,
                        rol: foundUser.rol 
                    }
                });
                
            } else {
                res.status(401).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrecta).' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrecta).' });
        }
    } catch (err) {
        console.error('Error de base de datos al buscar usuario (login):', err);
        return res.status(500).json({ success: false, message: 'Error del servidor. Por favor, inténtalo de nuevo más tarde.' });
    }
};

// Cierra la sesión del usuario
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'No se pudo cerrar la sesión.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Sesión cerrada exitosamente.' });
    });
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

module.exports = {
    login,
    logout,
    updatePassword
};