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
app.use(express.static(path.join(__dirname, "../proyecto/dist/protected_html")));
// linea anteriror añadida ayuda a que cargue los archivos html protegidos, pero ojo con esto puede generar vulnerabilidades si no se maneja bien  test hecho para cursos-selec.html
// >Bastian: bastante inseguro si no se maneja bien, pero si el acceso a las rutas protegidas esta bien hecho no habria problema


// Rutas estáticas de páginas
app.get("/index", (req, res) => { 
    res.sendFile(path.join(__dirname, "../proyecto/dist/index.html"));
});

app.get("/registro", (req, res) => { 
    res.sendFile(path.join(__dirname, "../proyecto/dist/registro.html"));
});

app.get("/forgot-password", (req, res) => { 
    res.sendFile(path.join(__dirname, "../proyecto/dist/forgot-password.html"));
});

app.get("/restore-password", (req, res) => { 
    res.sendFile(path.join(__dirname, "../proyecto/dist/restore-password.html"));
});


// Rutas protegidas
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

    // Validación de seguridad de la contraseña
    const passwordErrors = [];
    if (password.length <= 8) {
        passwordErrors.push('La contraseña debe tener al menos 9 caracteres.');
    }
    if (!/[A-Z]/.test(password)) {
        passwordErrors.push('La contraseña debe contener al menos una letra mayúscula.');
    }
    if (!/[^0-9a-zA-Z]/.test(password)) {
        passwordErrors.push('La contraseña debe contener al menos un carácter especial (ej. !, @, #, $, %).');
    }
    if (!/[0-9]/.test(password)) { 
        passwordErrors.push('La contraseña debe contener al menos un número.');
    }
    if (passwordErrors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "La contraseña no cumple con los requisitos de seguridad.",
            errors: passwordErrors
        });
    }

    const defaultRole = 'Usuario';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // POSTGRESQL: Marcadores de posición cambiados de '?' a '$1, $2, $3, ...'
        const query = "INSERT INTO Usuario (Usuario, Correo, Contraseña, Rol) VALUES ($1, $2, $3, $4) RETURNING ID";

        // POSTGRESQL: Uso de .query() con la librería 'pg'
        const result = await db.query(query, [text, email, hashedPassword, defaultRole]);

        console.log("Usuario registrado, resultado de la BD:", result.rows[0]);
        res.status(201).json({ success: true, message: "Usuario registrado exitosamente" });
        
    } catch (error) {
        console.error("Error en el bloque try/catch de /register:", error);

        // POSTGRESQL: La lógica de error debe usar los códigos de error de 'pg' (ej. 23505 para violación de unicidad)
        if (error.code === '23505') { // Código de error de PostgreSQL para violación de unicidad (unique constraint)
            if (error.constraint === 'usuario_correo_key') { // Este es un nombre de restricción auto-generado común
                 return res.status(409).json({ success: false, message: 'El correo ya existe' });
            } else if (error.constraint === 'usuario_usuario_key') {
                return res.status(409).json({ success: false, message: 'El usuario ya existe' });
            }
             // Fallback genérico para 23505 si el nombre de la restricción es desconocido
             return res.status(409).json({ success: false, message: 'El usuario o el correo ya existen.' });
        }

        res.status(500).json({ success: false, message: "Error en el servidor al intentar registrar el usuario." });
    }
});

//ruta para login
router.post('/login', async (req, res) => {
    const { user, password } = req.body;

   
    const query = 'SELECT ID, Usuario, Contraseña FROM Usuario WHERE Usuario = $1';
    
    try {
        const results = await db.query(query, [user]);
        const rows = results.rows; 

        if (rows.length > 0) {
            const foundUser = rows[0];

            // Comparar la contraseña ingresada con la hash almacenada
            const isMatch = await bcrypt.compare(password, foundUser.contraseña);

            if (isMatch) {
               
                
                // --- INICIO: Lógica para actualizar Ultimo_acceso ---
                const userIdToUpdate = foundUser.ID;

                const updateLoginQuery = 'UPDATE Usuario SET Ultimo_acceso = CURRENT_TIMESTAMP WHERE ID = $1';

                try {
                    await db.query(updateLoginQuery, [userIdToUpdate]);
                    console.log(`Fecha de último inicio de sesión actualizada para el usuario ID: ${userIdToUpdate}`);
                } catch (updateErr) {
                    console.error('Error al actualizar la fecha de último inicio de sesión para el usuario', userIdToUpdate, ':', updateErr);
                    // Se loguea el error, pero se permite el login principal.
                }
                // --- FIN: Lógica para actualizar Ultimo_acceso ---

                // Inicio de sesión exitoso.
                req.session.userId = foundUser.ID;
                req.session.username = foundUser.Usuario;
                req.session.loggedIn = true;

                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso.', userId: foundUser.ID });
                
            } else {
                // Contraseña incorrecta
                res.status(401).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrecta).' });
            }
        } else {
            // Usuario no encontrado
            res.status(404).json({ success: false, message: 'Credenciales inválidas (usuario o contraseña incorrecta).' });
        }
    } catch (err) {
        console.error('Error de base de datos al buscar usuario (login):', err);
        return res.status(500).json({ success: false, message: 'Error del servidor. Por favor, inténtalo de nuevo más tarde.' });
    }
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
        // POSTGRESQL: Marcador de posición cambiado a '$1'
        const userQuery = 'SELECT ID, Correo, Usuario FROM Usuario WHERE Correo = $1';
        
        // POSTGRESQL: Uso de .query() con async/await
        const userResults = await db.query(userQuery, [email]);
        const user = userResults.rows[0];

        if (!user) {
            console.warn(`Intento de recuperación de contraseña para correo no existente: ${email}`);
            // Siempre se devuelve 200 para no dar pistas de si el correo existe
            return res.status(200).json({ success: true, message: 'Si el correo electrónico proporcionado está registrado, se te enviará un enlace para restablecer tu contraseña.' });
        }

        
        const token = require('crypto').randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 600000); // Token expira en 10 minutos (600.000 ms)


        // POSTGRESQL: Marcadores de posición cambiados a '$1, $2, $3'
        const insertTokenQuery = 'INSERT INTO tokens_recuperar_contraseña (user_id, token, expira) VALUES ($1, $2, $3)';
        
        // POSTGRESQL: Uso de .query() con async/await
        try {
            await db.query(insertTokenQuery, [user.ID, token, expiresAt]);
        } catch (err) {
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

    // Validación de seguridad de la contraseña (redundante, pero necesario)
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
        // POSTGRESQL: Marcador de posición cambiado a '$1'
        const selectTokenQuery = 'SELECT user_id, expira FROM tokens_recuperar_contraseña WHERE token = $1';
        
        // POSTGRESQL: Uso de .query() con async/await
        const tokenResults = await db.query(selectTokenQuery, [token]);
        const tokenRecord = tokenResults.rows[0];

        if (!tokenRecord) {
            console.warn(`Intento de restablecimiento con token no encontrado: ${token}`);
            return res.status(400).json({ success: false, message: 'Token de restablecimiento inválido o ya utilizado.' });
        }

        const now = new Date();
        // NOTA: Si 'expira' se almacena como TIMESTAMP sin zona horaria, esto debería funcionar.
        if (now > tokenRecord.expira) { 
            console.warn(`Intento de restablecimiento con token expirado: ${token}`);
            // POSTGRESQL: Marcador de posición cambiado a '$1'
            db.query('DELETE FROM tokens_recuperar_contraseña WHERE token = $1', [token]).catch(deleteErr => {
                if (deleteErr) console.error('Error al eliminar token expirado:', deleteErr);
            });
            return res.status(400).json({ success: false, message: 'El token de restablecimiento ha expirado. Por favor, solicita uno nuevo.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // POSTGRESQL: Marcadores de posición cambiados a '$1, $2'
        const updatePasswordQuery = 'UPDATE Usuario SET Contraseña = $1 WHERE ID = $2';
        
        // POSTGRESQL: Uso de .query() con async/await
        await db.query(updatePasswordQuery, [hashedPassword, tokenRecord.user_id]);

        // POSTGRESQL: Marcador de posición cambiado a '$1'
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
});

app.get('/search-user', isAuthenticated, async (req, res) => {
    const userId = req.session.userId; 

    if (!userId) {
        return res.status(401).json({ success: false, message: 'No se encontró el ID de usuario en la sesión.' });
    }

    // POSTGRESQL: Marcador de posición cambiado a '$1'
    const userQuery = 'SELECT Usuario, Rol FROM Usuario WHERE ID = $1';
    
    // POSTGRESQL: CAMBIO: Ya no usamos db.promise().query() (propio de mysql2).
    // Si 'db' es un Pool de 'pg', usamos db.query() con async/await (o .then/.catch).
    try {
        const results = await db.query(userQuery, [userId]);
        const rows = results.rows; // Resultados en 'pg' están en 'rows'

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Información del usuario no encontrada.' });
        }

        const user = rows[0];
        res.json({ success: true, user: { username: user.usuario, role: user.rol } });
        
    } catch(err) {
        console.error('Error interno del servidor al obtener la información del usuario:', err);
        res.status(500).json({ success: false, message: 'Error interno del servidor al obtener la información del usuario.' });
    };
});

app.use(router);

app.get('/', (req, res) => {
    res.send('¡El servidor Express está funcionando!');
});

app.listen(8080, () => {
  console.log("Hola, servidor iniciado en el puerto 8080");
});