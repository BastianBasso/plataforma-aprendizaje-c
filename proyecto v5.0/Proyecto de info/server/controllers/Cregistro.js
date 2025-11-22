const bcrypt = require('bcryptjs');
const db = require('../db');
const { validatePassword, validateEmail, validateRequiredFields } = require('../utils/validators');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soportepcmultimedia@gmail.com', 
        pass: 'vdpa kfsw bbpx bhgq' 
    }
});

/**
 * Registra un nuevo usuario en el sistema
 */
const register = async (req, res) => {
    console.log("Cuerpo de la solicitud (req.body):", req.body);
    const { text, email, password } = req.body; // 'text' es el nombre de usuario desde el frontend

    // 1. Validación de campos requeridos
    const fieldsValidation = validateRequiredFields({ text, email, password }, ['text', 'email', 'password']);
    if (!fieldsValidation.isValid) {
        return res.status(400).json({ success: false, message: fieldsValidation.error });
    }

    // 2. Validación de formato de email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        return res.status(400).json({ success: false, message: emailValidation.error });
    }

    // 3. Validación de seguridad de la contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        return res.status(400).json({
            success: false,
            message: "La contraseña no cumple con los requisitos de seguridad.",
            errors: passwordValidation.errors
        });
    }

    const defaultRole = 'Usuario';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO Usuario (Usuario, Correo, Contraseña, Rol) VALUES ($1, $2, $3, $4) RETURNING ID";
        const result = await db.query(query, [text, emailValidation.normalizedEmail, hashedPassword, defaultRole]);

        console.log("Usuario registrado, resultado de la BD:", result.rows[0]);
        res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
        
    } catch (error) {
        console.error("Error en el bloque try/catch de /register:", error);

        if (error.code === '23505') { // Código de error de PostgreSQL para violación de unicidad
            if (error.constraint === 'usuario_correo_key') {
                 return res.status(409).json({ success: false, message: 'El correo ya existe' });
            } else if (error.constraint === 'usuario_usuario_key') {
                return res.status(409).json({ success: false, message: 'El usuario ya existe' });
            }
             return res.status(409).json({ success: false, message: 'El usuario o el correo ya existen.' });
        }

        res.status(500).json({ success: false, message: "Error en el servidor al intentar registrar el usuario." });
    }
};

/**
 * Inicia sesión del usuario
 */
const login = async (req, res) => {
    const { user, password } = req.body;

    const query = 'SELECT ID, Usuario, Contraseña FROM Usuario WHERE Usuario = $1';
    
    try {
        const results = await db.query(query, [user]);
        const rows = results.rows; 

        if (rows.length > 0) {
            const foundUser = rows[0];

            const isMatch = await bcrypt.compare(password, foundUser.contraseña);

            if (isMatch) {
                // Actualizar último acceso
                const userIdToUpdate = foundUser.id;
                const updateLoginQuery = 'UPDATE Usuario SET Ultimo_acceso = CURRENT_TIMESTAMP WHERE ID = $1';

                try {
                    await db.query(updateLoginQuery, [userIdToUpdate]);
                    console.log(`Fecha de último inicio de sesión actualizada para el usuario ID: ${userIdToUpdate}`);
                } catch (updateErr) {
                    console.error('Error al actualizar la fecha de último inicio de sesión para el usuario', userIdToUpdate, ':', updateErr);
                }

                // Establecer sesión
                req.session.userId = foundUser.id;
                req.session.username = foundUser.usuario;
                req.session.loggedIn = true;

                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.', userId: foundUser.id });
                
            } else {
                res.status(401).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrecta).' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrecta).' });
        }
    } catch (err) {
        console.error('Error de base de datos al buscar usuario (login):', err);
        return res.status(500).json({ success: false, message: 'Error del servidor. Por favor, inténtalo de nuevo más tarde.' });
    }
};

/**
 * Cierra la sesión del usuario
 */
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'No se pudo cerrar la sesión.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Sesión cerrada exitosamente.' });
    });
};

/**
 * Procesa solicitud de recuperación de contraseña
 */
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'El correo electrónico es requerido.' });
    }

    try {
        const userQuery = 'SELECT ID, Correo, Usuario FROM Usuario WHERE Correo = $1';
        const userResults = await db.query(userQuery, [email]);
        const user = userResults.rows[0];

        if (!user) {
            console.warn(`Intento de recuperación de contraseña para correo no existente: ${email}`);
            return res.status(200).json({ success: true, message: 'Si el correo electrónico proporcionado está registrado, se te enviará un enlace para restablecer tu contraseña.' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 600000); // Token expira en 10 minutos

        const insertTokenQuery = 'INSERT INTO tokens_recuperar_contraseña (user_id, token, expira) VALUES ($1, $2, $3)';
        
        try {
            await db.query(insertTokenQuery, [user.id, token, expiresAt]);
        } catch (err) {
            console.error('Error al guardar el token en BD:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor al generar el enlace.' });
        }

        const resetLink = `http://localhost:8080/restore-password.html?token=${token}`;

        const mailOptions = {
            from: 'soportepcmultimedia@gmail.com',
            to: user.correo,
            subject: 'Restablecimiento de Contraseña',
            html: `<p>Hola ${user.usuario},</p>
                   <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                   <p><a href="${resetLink}">Restablecer mi contraseña</a></p>
                   <p>Este enlace expirará en 10 minutos.</p>
                   <p>Si no solicitaste esto, puedes ignorar este correo.</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo de restablecimiento:', error);
                return res.status(200).json({ success: true, message: 'Si el correo electrónico proporcionado está registrado, se te enviará un enlace para restablecer tu contraseña (hubo un problema con el envío, pero se procesó la solicitud).' });
            }
            console.log('Correo de restablecimiento enviado:', info.response);
            res.status(200).json({ success: true, message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.' });
        });
        
    } catch (error) {
        console.error('Error general en /forgot-password:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al procesar tu solicitud.' });
    }
};

/**
 * Restablece la contraseña usando un token válido
 */
const restorePassword = async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos.' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden.' });
    }

    // Validación de seguridad de la contraseña
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
        return res.status(400).json({
            success: false,
            message: "La nueva contraseña no cumple con los requisitos de seguridad.",
            errors: passwordValidation.errors
        });
    }

    try {
        const selectTokenQuery = 'SELECT user_id, expira FROM tokens_recuperar_contraseña WHERE token = $1';
        const tokenResults = await db.query(selectTokenQuery, [token]);
        const tokenRecord = tokenResults.rows[0];

        if (!tokenRecord) {
            console.warn(`Intento de restablecimiento con token no encontrado: ${token}`);
            return res.status(400).json({ success: false, message: 'Token de restablecimiento inválido o ya utilizado.' });
        }

        const now = new Date();
        if (now > tokenRecord.expira) { 
            console.warn(`Intento de restablecimiento con token expirado: ${token}`);
            db.query('DELETE FROM tokens_recuperar_contraseña WHERE token = $1', [token]).catch(deleteErr => {
                if (deleteErr) console.error('Error al eliminar token expirado:', deleteErr);
            });
            return res.status(400).json({ success: false, message: 'El token de restablecimiento ha expirado. Por favor, solicita uno nuevo.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePasswordQuery = 'UPDATE Usuario SET Contraseña = $1 WHERE ID = $2';
        await db.query(updatePasswordQuery, [hashedPassword, tokenRecord.user_id]);

        const deleteTokenQuery = 'DELETE FROM tokens_recuperar_contraseña WHERE token = $1';
        db.query(deleteTokenQuery, [token]).then(() => {
            console.log('Token de restablecimiento eliminado correctamente.');
        }).catch(deleteErr => {
            console.error('Error al eliminar el token de la base de datos:', deleteErr);
        });

        res.status(200).json({ success: true, message: 'Tu contraseña ha sido restablecida exitosamente.' });
        
    } catch (error) {
        console.error('Error general en /restore-password:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al procesar tu solicitud.' });
    }
};

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    restorePassword
};