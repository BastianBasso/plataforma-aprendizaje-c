const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("./db");
const validator = require('validator');
const session = require('express-session');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soportepcmultimedia@gmail.com', 
        pass: 'vdpa kfsw bbpx bhgq' 

    }

});

app.use(session({
    secret: 'tu_secreto_muy_seguro_y_largo',
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        secure: false, 
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

function isAuthenticated(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        console.log('Acceso denegado: Usuario no autenticado. Redirigiendo a /');
        res.redirect('/?auth_error=true');
    }
}


app.use(express.static(path.join(__dirname, "../proyecto/dist")));

// Ruta para login
app.get("/index", (req, res) => { 
    res.sendFile(path.join(__dirname, "../proyecto/dist/index.html"));
});

// Ruta para registro
app.get("/registro", (req, res) => { 
    res.sendFile(path.join(__dirname, "../proyecto/dist/registro.html"));
});

// Ruta para forgot-password
app.get("/forgot-password", (req, res) => { 
    res.sendFile(path.join(__dirname, "../proyecto/dist/forgot-password.html"));
});

// Ruta para restore-password
app.get("/restore-password", (req, res) => { 
    res.sendFile(path.join(__dirname, "../proyecto/dist/restore-password.html"));
});



// Para agregar más rutas
// app.get("/otra", (req, res) => { 
//     res.sendFile(path.join(__dirname, "../proyecto/dist/otra.html"));
// });


app.get('/inicio', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,"../proyecto/dist/protected_html/inicio.html")); 
});

app.get('/inicio.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname,"../proyecto/dist/protected_html/inicio.html")); 
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

//ruta para registro

router.post("/register", async (req, res) => {
    console.log("Cuerpo de la solicitud (req.body):", req.body);
    const { text, email, password } = req.body; // 'text' es el nombre de usuario desde el frontend

    const cleanedEmail = email ? email.trim() : '';
    const lowerCaseEmail = cleanedEmail.toLowerCase();

    // 1. Validación de campos requeridos
    if (!text || !email || !password) {
        return res.status(400).json({ success: false, message: "Todos los campos (nombre, email, contraseña) son requeridos." });
    }

    // 2. Validación de formato de email
    if (!validator.isEmail(lowerCaseEmail)) {
        return res.status(400).json({ success: false, message: "El formato del correo electrónico no es válido." });
    }

    // ====================================================================
    // 3. NUEVAS VALIDACIONES DE SEGURIDAD DE LA CONTRASEÑA (¡Backend!)
    // ====================================================================
    const passwordErrors = [];

    // Longitud mínima: Mayor a 8 caracteres (es decir, 9 o más)
    if (password.length <= 8) {
        passwordErrors.push('La contraseña debe tener al menos 9 caracteres.');
    }

    // Contener al menos una letra mayúscula
    if (!/[A-Z]/.test(password)) {
        passwordErrors.push('La contraseña debe contener al menos una letra mayúscula.');
    }

    // Contener al menos un carácter especial (utiliza el mismo regex que en el frontend)
    if (!/[^0-9a-zA-Z]/.test(password)) {
        passwordErrors.push('La contraseña debe contener al menos un carácter especial (ej. !, @, #, $, %).');
    }

        // NUEVA REGLA: Contener al menos un número
    if (!/[0-9]/.test(password)) { // Busca cualquier dígito del 0 al 9
        passwordErrors.push('La contraseña debe contener al menos un número.');
    }


    // Si hay errores de contraseña, envía la respuesta de error
    if (passwordErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "La contraseña no cumple con los requisitos de seguridad.",
            errors: passwordErrors // Opcional: enviar los errores específicos si quieres gestionarlos en el frontend
        });
    }
    // ====================================================================

    const defaultRole = 'Usuario';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO Usuario (Usuario, Correo, Contraseña, Rol) VALUES (?, ?, ?, ?)";

        db.query(query, [text, email, hashedPassword, defaultRole], (err, result) => {
            if (err) {
                console.error("Error al insertar en la base de datos:", err);

                if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
                    if (err.sqlMessage && err.sqlMessage.includes("'usuario.Correo'")) {
                        return res.status(409).json({ success: false, message: 'El correo ya existe' });
                    } else if (err.sqlMessage && err.sqlMessage.includes("'usuario.Usuario'")) {
                        return res.status(409).json({ success: false, message: 'El usuario ya existe' });
                    }
                }

                return res.status(500).json({ success: false, message: "Error al registrar el usuario debido a un problema interno del servidor." });
            }

            console.log("Usuario registrado, resultado de la BD:", result);
            res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
        });
    } catch (error) {
        console.error("Error en el bloque try/catch de /register:", error);
        res.status(500).json({ success: false, message: "Error en el servidor al intentar registrar el usuario." });
    }
});

//ruta para login
router.post('/login', (req, res) => {
    const { user, password } = req.body;

    // 1. Modificar la consulta para seleccionar también el campo 'Estado'
    // Asegúrate de que 'Estado' es el nombre correcto de la columna en tu tabla 'Usuario'
    const query = 'SELECT ID, Usuario, Contraseña, Estado FROM Usuario WHERE Usuario = ?';
    
    db.query(query, [user], async (err, results) => {
        if (err) {
            console.error('Error de base de datos al buscar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error del servidor. Por favor, inténtalo de nuevo más tarde.' });
        }

        if (results.length > 0) {
            const foundUser = results[0];

            // Comparar la contraseña ingresada con la hash almacenada
            const isMatch = await bcrypt.compare(password, foundUser.Contraseña);

            if (isMatch) {
                // 2. AÑADIR VERIFICACIÓN DEL ESTADO DE LA CUENTA
                if (foundUser.Estado === 'Activo') { // <-- ¡Aquí verificamos el estado!
                    // Si la cuenta está 'Activo', procede con el login y la actualización del último acceso

                    // --- INICIO: Lógica para actualizar Ultimo_acceso ---
                    const userIdToUpdate = foundUser.ID;

                    // CORRECCIÓN: La columna en tu tabla es 'Ultimo_acceso', no 'lastLogin'
                    const updateLoginQuery = 'UPDATE Usuario SET Ultimo_acceso = NOW() WHERE ID = ?';

                    db.query(updateLoginQuery, [userIdToUpdate], (updateErr, updateResults) => {
                        if (updateErr) {
                            console.error('Error al actualizar la fecha de último inicio de sesión para el usuario', userIdToUpdate, ':', updateErr);
                            // Se loguea el error, pero se permite el login principal para no frustrar al usuario.
                        } else {
                            console.log(`Fecha de último inicio de sesión actualizada para el usuario ID: ${userIdToUpdate}`);
                        }

                        // --- FIN: Lógica para actualizar Ultimo_acceso ---

                        // Después de intentar actualizar Ultimo_acceso (con éxito o error),
                        // continuamos con el proceso de inicio de sesión exitoso.
                        req.session.userId = foundUser.ID;
                        req.session.username = foundUser.Usuario;
                        req.session.loggedIn = true;

                        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.', userId: foundUser.ID });
                    });

                } else {
                    // Si la cuenta NO está 'Activo' (ej. 'Inactivo', 'Bloqueado', etc.)
                    // Denegar el acceso y enviar un aviso específico.
                    // Se usa status 403 Forbidden porque las credenciales son correctas, pero el acceso está denegado por otra razón.
                    return res.status(403).json({ 
                        success: false, 
                        message: `Tu cuenta está ${foundUser.Estado.toLowerCase()}. Contacta al administrador.` 
                        // El mensaje puede ser más genérico como: 'Tu cuenta no está activa. Contacta al administrador.'
                    });
                }

            } else {
                // Contraseña incorrecta
                res.status(401).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrecta).' });
            }
        } else {
            // Usuario no encontrado (o usuario y contraseña no coinciden)
            // Es buena práctica usar un mensaje genérico aquí para no dar pistas sobre si el usuario existe o no.
            res.status(404).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrecta).' });
        }
    });
});

//ruta para logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'No se pudo cerrar la sesión.' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, message: 'Sesión cerrada exitosamente.' });
    });
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'El correo electrónico es requerido.' });
    }

    try {
        const userQuery = 'SELECT ID, Correo, Usuario FROM Usuario WHERE Correo = ?';
        db.query(userQuery, [email], async (err, results) => {
            if (err) {
                console.error('Error de BD al buscar usuario para recuperar contraseña:', err);
                return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
            }

            const user = results[0];


            if (!user) {
                console.warn(`Intento de recuperación de contraseña para correo no existente: ${email}`);
                return res.status(200).json({ success: true, message: 'Si el correo electrónico proporcionado está registrado, se te enviará un enlace para restablecer tu contraseña.' });
            }

            
            const token = require('crypto').randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 600000); // Token expira en 10 minutos (600.000 ms)


            const insertTokenQuery = 'INSERT INTO tokens_recuperar_contraseña (user_id, token, expira) VALUES (?, ?, ?)';
            db.query(insertTokenQuery, [user.ID, token, expiresAt], async (err) => {
                if (err) {
                    console.error('Error al guardar el token en BD:', err);
                    return res.status(500).json({ success: false, message: 'Error interno del servidor al generar el enlace.' });
                }

                const resetLink = `http://localhost:8080/restore-password.html?token=${token}`;

                const mailOptions = {
                    from: 'soportepcmultimedia@gmail.com',
                    to: user.Correo,
                    subject: 'Restablecimiento de Contraseña',
                    html: `<p>Hola ${user.Usuario},</p>
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
            });
        });

    } catch (error) {
        console.error('Error general en /forgot-password:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al procesar tu solicitud.' });
    }
});

app.post('/restore-password', async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;

    if (!token || !newPassword || !confirmPassword) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos.' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Las contraseñas no coinciden.' });
    }


    const passwordErrors = [];


    if (newPassword.length <= 8) {
        passwordErrors.push('La contraseña debe tener al menos 9 caracteres.');
    }


    if (!/[A-Z]/.test(newPassword)) {
        passwordErrors.push('La contraseña debe contener al menos una letra mayúscula.');
    }

    if (!/[^0-9a-zA-Z]/.test(newPassword)) {
        passwordErrors.push('La contraseña debe contener al menos un carácter especial (ej. !, @, #, $, %).');
    }


    if (!/[0-9]/.test(newPassword)) { 
        passwordErrors.push('La contraseña debe contener al menos un número.');
    }


    if (passwordErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "La nueva contraseña no cumple con los requisitos de seguridad.",
            errors: passwordErrors
        });
    }


    try {
        const selectTokenQuery = 'SELECT user_id, expira FROM tokens_recuperar_contraseña WHERE token = ?';
        db.query(selectTokenQuery, [token], async (err, results) => {
            if (err) {
                console.error('Error de BD al buscar el token de restablecimiento:', err);
                return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
            }

            const tokenRecord = results[0];

            if (!tokenRecord) {
                console.warn(`Intento de restablecimiento con token no encontrado: ${token}`);
                return res.status(400).json({ success: false, message: 'Token de restablecimiento inválido o ya utilizado.' });
            }

            const now = new Date();
            if (now > tokenRecord.expira) {
                console.warn(`Intento de restablecimiento con token expirado: ${token}`);
                db.query('DELETE FROM tokens_recuperar_contraseña WHERE token = ?', [token], (deleteErr) => {
                    if (deleteErr) console.error('Error al eliminar token expirado:', deleteErr);
                });
                return res.status(400).json({ success: false, message: 'El token de restablecimiento ha expirado. Por favor, solicita uno nuevo.' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            const updatePasswordQuery = 'UPDATE Usuario SET Contraseña = ? WHERE ID = ?';
            db.query(updatePasswordQuery, [hashedPassword, tokenRecord.user_id], (updateErr) => {
                if (updateErr) {
                    console.error('Error de BD al actualizar la contraseña:', updateErr);
                    return res.status(500).json({ success: false, message: 'Error interno del servidor al actualizar la contraseña.' });
                }

                const deleteTokenQuery = 'DELETE FROM tokens_recuperar_contraseña WHERE token = ?';
                db.query(deleteTokenQuery, [token], (deleteErr) => {
                    if (deleteErr) {
                        console.error('Error al eliminar el token de la base de datos:', deleteErr);
                    }
                    console.log('Token de restablecimiento eliminado correctamente.');
                });

                res.status(200).json({ success: true, message: 'Tu contraseña ha sido restablecida exitosamente.' });
            });
        });

    } catch (error) {
        console.error('Error general en /restore-password:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor al procesar tu solicitud.' });
    }
});

app.get('/search-user', isAuthenticated, (req, res) => {
    const userId = req.session.userId; // Obtenemos el userId de la sesión

    if (!userId) {
        // Esto no debería pasar si 'protect' funciona, pero es una buena salvaguarda
        return res.status(401).json({ success: false, message: 'No se encontró el ID de usuario en la sesión.' });
    }

    const userQuery = 'SELECT Usuario, Rol FROM Usuario WHERE ID = ?';
    // Usar db.promise().query para consistencia con el resto del código y manejo de async/await
    db.promise().query(userQuery, [userId])
        .then(([results]) => {
            if (results.length === 0) {
                return res.status(404).json({ success: false, message: 'Información del usuario no encontrada.' });
            }

            const user = results[0];
            // Tu formato de respuesta con 'username' y 'role' anidados en 'user'
            res.json({ success: true, user: { username: user.Usuario, role: user.Rol } });
        })
        .catch(err => {
            console.error('Error interno del servidor al obtener la información del usuario:', err);
            res.status(500).json({ success: false, message: 'Error interno del servidor al obtener la información del usuario.' });
        });
});

app.use(router);

app.get('/', (req, res) => {
    res.send('¡El servidor Express está funcionando!');
});

app.listen(8080, () => {
  console.log("Hola, servidor iniciado en el puerto 8080");
});






