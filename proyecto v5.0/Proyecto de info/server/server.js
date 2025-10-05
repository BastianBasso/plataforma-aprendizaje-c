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

app.get('/obtener-productos', (req, res) => {
    const searchTerm = req.query.search;

    let query = `
        SELECT
            id_producto AS id,
            nombre_producto AS name,
            marca_producto AS brand,
            categoria_producto AS category,
            color_producto AS color,
            precio_venta_producto AS price_venta,
            precio_compra_producto AS price_compra,
            stock_producto AS quantity,
            estado_producto AS status,
            fecha_compra_producto AS purchase_date,
            disponibilidad_producto AS availability
        FROM
            Producto
    `;
    let queryParams = [];

    
    if (searchTerm) {
        const likeTerm = `%${searchTerm}%`; 
        query += `
            WHERE
                nombre_producto LIKE ? OR
                marca_producto LIKE ? OR
                categoria_producto LIKE ? OR
                color_producto LIKE ? OR
                estado_producto LIKE ? OR
                disponibilidad_producto LIKE ? OR
                CAST(id_producto AS CHAR) LIKE ? OR
                CAST(precio_venta_producto AS CHAR) LIKE ? OR
                CAST(precio_compra_producto AS CHAR) LIKE ? OR
                CAST(stock_producto AS CHAR) LIKE ?
        `;
        
        queryParams = [
            likeTerm,
            likeTerm,
            likeTerm,
            likeTerm,
            likeTerm,
            likeTerm,
            likeTerm,
            likeTerm,
            likeTerm,
            likeTerm
        ];
    }

    
    query += ` ORDER BY id_producto ASC`;

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error al obtener productos de la base de datos:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor al obtener productos.' });
        }
        res.json({ success: true, products: results });
    });
});


app.post('/anadir-productos', (req, res) => {
    // Asegúrate de desestructurar 'estado_stock' del req.body
    const { name, brand, category, color, price_venta, price_compra, quantity, status, purchase_date, availability } = req.body;

    console.log('--- SOLICITUD DE AGREGAR PRODUCTO ---');
    console.log('Cuerpo de la solicitud (req.body):', req.body); // <<-- ¡Revisa este log cuando ocurra el error!
    console.log('name:', name, 'brand:', brand, 'category:', category, 'color:', color);
    console.log('price_venta:', price_venta, 'Tipo:', typeof price_venta);
    console.log('price_compra:', price_compra, 'Tipo:', typeof price_compra);
    console.log('quantity:', quantity, 'Tipo:', typeof quantity);
    console.log('status:', status, 'Tipo:', typeof status); // <<-- Este log debe mostrar un string
    console.log('purchase_date:', purchase_date);
    console.log('availability:', availability, 'Tipo:', typeof availability);

    // Asegúrate de que la columna en tu DB sea 'estado_producto' y que el orden coincida
    const query = `INSERT INTO Producto (nombre_producto, marca_producto, categoria_producto, color_producto, precio_compra_producto, precio_venta_producto, stock_producto, estado_producto, fecha_compra_producto, disponibilidad_producto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Asegúrate de que 'estado_stock' (la variable de Node.js) vaya en la posición correcta para 'estado_producto'
    db.query(query, [name, brand, category, color, price_compra, price_venta, quantity, status, purchase_date, availability], (err, result) => {
        if (err) {
            console.error('Error al insertar producto en la DB:', err);
            return res.status(500).json({ message: 'Error interno del servidor al agregar el producto.' });
        }
        res.status(201).json({ message: 'Producto agregado exitosamente.' });
    });
});


app.get('/ultimos5-productos', (req, res) => {
    const limit = parseInt(req.query.limit) || 5;

    const query = `SELECT * FROM Producto ORDER BY id_producto DESC LIMIT ?`;

    db.query(query, [limit], (err, results) => {
        if (err) {
            console.error('Error al obtener los últimos productos:', err);
            return res.status(500).json({ message: 'Error al obtener los últimos productos.' });
        }
        res.status(200).json(results);
    });
});

//rutas para obtener datos del resumen de stock

// GET /total-products - Total de Productos Registrados
app.get('/total-products', (req, res) => {
    db.query('SELECT COUNT(id_producto) AS totalProducts FROM Producto', (err, results) => {
        if (err) {
            console.error('Error al obtener el total de productos:', err);
            res.status(500).json({ error: 'Error interno del servidor al obtener el total de productos' });
            return;
        }
        res.json({ totalProducts: results[0].totalProducts });
    });
});

// GET /active-products - Productos Activos (Disponibles)
app.get('/active-products', (req, res) => {
    db.query("SELECT COUNT(id_producto) AS activeProducts FROM Producto WHERE disponibilidad_producto = 'Disponible'", (err, results) => {
        if (err) {
            console.error('Error al obtener productos activos:', err);
            res.status(500).json({ error: 'Error interno del servidor al obtener productos activos' });
            return;
        }
        res.json({ activeProducts: results[0].activeProducts });
    });
});

// GET /total-quantity - Existencias Totales (suma de todas las cantidades)
app.get('/total-quantity', (req, res) => {
    db.query('SELECT SUM(stock_producto) AS totalQuantity FROM Producto', (err, results) => {
        if (err) {
            console.error('Error al obtener existencias totales:', err);
            res.status(500).json({ error: 'Error interno del servidor al obtener existencias totales' });
            return;
        }
        // SUM puede retornar null si no hay filas, se convierte a 0 si es null
        res.json({ totalQuantity: results[0].totalQuantity || 0 });
    });
});

// GET /normal - Cantidad de productos con Stock Normal (>= 20)
app.get('/normal', (req, res) => {
    db.query('SELECT COUNT(id_producto) AS stockNormal FROM Producto WHERE stock_producto >= 20', (err, results) => {
        if (err) {
            console.error('Error al obtener stock normal:', err);
            res.status(500).json({ error: 'Error interno del servidor al obtener stock normal' });
            return;
        }
        res.json({ stockNormal: results[0].stockNormal });
    });
});

// GET /medium - Cantidad de productos con Stock Medio (>= 10 y <= 19)
app.get('/medium', (req, res) => {
    db.query('SELECT COUNT(id_producto) AS stockMedium FROM Producto WHERE stock_producto >= 10 AND stock_producto <= 19', (err, results) => {
        if (err) {
            console.error('Error al obtener stock medio:', err);
            res.status(500).json({ error: 'Error interno del servidor al obtener stock medio' });
            return;
        }
        res.json({ stockMedium: results[0].stockMedium });
    });
});

// GET /low - Cantidad de productos con Bajo Stock (>= 5 y <= 9)
app.get('/low', (req, res) => {
    db.query('SELECT COUNT(id_producto) AS stockLow FROM Producto WHERE stock_producto >= 5 AND stock_producto <= 9', (err, results) => {
        if (err) {
            console.error('Error al obtener bajo stock:', err);
            res.status(500).json({ error: 'Error interno del servidor al obtener bajo stock' });
            return;
        }
        res.json({ stockLow: results[0].stockLow });
    });
});

// GET /critical - Cantidad de productos con Stock Crítico (1 a 4)
app.get('/critical', (req, res) => {
    // Se ha estandarizado la tabla a 'products' y columna a 'quantity'
    db.query('SELECT COUNT(id_producto) AS stockCritical FROM Producto WHERE stock_producto >= 1 AND stock_producto <= 4', (err, results) => {
        if (err) {
            console.error('Error al obtener stock crítico:', err);
            res.status(500).json({ error: 'Error interno del servidor al obtener stock crítico' });
            return;
        }
        res.json({ stockCritical: results[0].stockCritical });
    });
});

// GET /api/stock/out-of-stock - Cantidad de productos Sin Stock (0)
app.get('/out-of-stock', (req, res) => {
    db.query('SELECT COUNT(id_producto) AS stockOut FROM Producto WHERE stock_producto = 0', (err, results) => {
        if (err) {
            console.error('Error al obtener productos sin stock:', err);
            res.status(500).json({ error: 'Error interno al obtener productos sin stock' });
            return;
        }
        res.json({ stockOut: results[0].stockOut });
    });
});

//SECCIÓN DE CONFIGURACIÓN

async function recalculateAllProductPrices(db) {
    try {
        // 1. Obtener las configuraciones de porcentajes de la tabla Porcentajes
        const [settingsRows] = await db.promise().query(
            'SELECT iva, categoria_1, categoria_2, categoria_3, categoria_4 FROM Porcentajes LIMIT 1'
        );

        if (settingsRows.length === 0) {
            console.error('No hay configuraciones de porcentajes en la tabla Porcentajes. Usando valores por defecto.');
            throw new Error('Configuraciones de porcentajes no encontradas en la base de datos.');
        }

        const currentSettings = settingsRows[0];
        const ivaRate = currentSettings.iva;
        const profitMargins = {
            "Computación": currentSettings.categoria_1,
            "Libreria": currentSettings.categoria_2,
            "Tintas": currentSettings.categoria_3,
            "Otros_productos": currentSettings.categoria_4
        };

        // Validar que los porcentajes sean números y estén en el rango 0-100
        const customRoundToNearestTen = (num) => {
            let roundedInt = Math.round(num);
            const lastDigit = roundedInt % 10;
            // Si termina en 0, se mantiene; si no, se redondea a la decena siguiente
            return lastDigit === 0 ? roundedInt : roundedInt + (10 - lastDigit);
        };

        // 2. Obtener todos los productos
        const [products] = await db.promise().query('SELECT id_producto, precio_compra_producto, categoria_producto FROM Producto');

        const updatePromises = [];

        // 3. Iterar y calcular nuevo precio de venta para cada producto
        for (const product of products) {
            const productId = product.id_producto;
            const precioCompra = parseFloat(product.precio_compra_producto);
            const productCategory = product.categoria_producto;

            if (isNaN(precioCompra) || precioCompra < 0) {
                console.warn(`Producto ${productId} tiene un precio_compra inválido: ${product.precio_compra_producto}. Se omite la actualización.`);
                continue;
            }

            const profitPercentage = profitMargins[productCategory] || profitMargins['Otros_productos'];

            if (typeof profitPercentage !== 'number' || profitPercentage < 0 || profitPercentage > 100) {
                console.warn(`No se pudo determinar un porcentaje de ganancia válido para la categoría '${productCategory}' del producto ${productId}. Se omite la actualización.`);
                continue;
            }

            // Fórmula de cálculo (IVA sobre el precio con ganancia)
            const precioVentaCalculado = (precioCompra * (1 + (profitPercentage / 100))) * (1 + (ivaRate / 100));
            
            // Redondear al número entero más cercano a la decena
            const newPrecioVenta = customRoundToNearestTen(precioVentaCalculado);

            const updateQuery = 'UPDATE Producto SET precio_venta_producto = ? WHERE id_producto = ?';
            updatePromises.push(db.promise().query(updateQuery, [newPrecioVenta, productId]));
        }

        await Promise.all(updatePromises);
        console.log('Todos los precios de productos han sido recalculados y actualizados.');
        return { success: true, message: 'Precios recalculados exitosamente.' };

    } catch (error) {
        console.error('Error en recalculateAllProductPrices:', error);
        return { success: false, message: `Error al recalcular precios: ${error.message}` };
    }
}

app.post('/ajustar-stock', async (req, res) => {
    const { name, quantity, cost, purchase_date } = req.body; // 'quantity' es el nuevo stock del producto

    console.log('--- SOLICITUD DE AJUSTAR STOCK ---');
    console.log('Cuerpo de la solicitud (req.body):', req.body);
    console.log('name:', name);
    console.log('quantity:', quantity, 'Tipo:', typeof quantity);
    console.log('cost:', cost, 'Tipo:', typeof cost);
    console.log('purchase_date:', purchase_date);      const quantityToAdjust = Number(quantity); // Asegurarse de que sea un número

    if (isNaN(quantityToAdjust)) {
        return res.status(400).json({ message: 'La cantidad a ajustar debe ser un número válido.' });
    }

    if (quantityToAdjust < 0){
        return res.status(400).json({ message: 'La cantidad a ajustar no puede ser negativa.' });
    }

    let newStockQuantity;
    let newEstadoProducto;
    let newDisponibilidadProducto;
    let updatedCosto;

    try {
        // Primero, obtener el stock actual del producto
        const getProductInfoQuery = `SELECT stock_producto, precio_compra_producto FROM Producto WHERE nombre_producto = ?`;
        const [productInfo] = await db.promise().query(getProductInfoQuery, [name]);

        if (productInfo.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        const currentStock = productInfo[0].stock_producto;
        const currentCost = productInfo[0].precio_compra_producto;       
        const quantityToAdjust = Number(quantity);
        newStockQuantity = currentStock + quantityToAdjust;

        // Validar que el nuevo stock no sea negativo
        if (newStockQuantity < 0) {
            return res.status(400).json({ message: 'El stock resultante no puede ser negativo.' });
        }       if (currentStock === 0 || currentCost === null || currentCost === 0) {
        // Si no hay stock actual o no hay costo registrado, el nuevo costo es simplemente el costo de las unidades que se agregan.
        updatedCosto = Number(cost);
        } else if (quantityToAdjust > 0) {
        // Si se está agregando stock, tomamos el mayor entre el costo actual y el costo del nuevo stock.
        updatedCosto = Math.max(currentCost, Number(cost));
        } else {
        // Si se está restando stock (quantityToAdjust <= 0), el costo unitario no cambia.
        updatedCosto = currentCost;
        }
        
        if (cost <  0) {
            return res.status(400).json({ message: 'El costo no puede ser negativo.' });
        }   

        updatedCosto = parseFloat(updatedCosto.toFixed(2)); // Por ejemplo, 2 decimales
   
        // Lógica para disponibilidad_producto
        if (newStockQuantity > 0) {
            newDisponibilidadProducto = 'Disponible';
        } else { // newStockQuantity === 0
            newDisponibilidadProducto = 'No Disponible';
        }

        // Lógica para estado_producto
        if (newStockQuantity === 0) {
            newEstadoProducto = 'Sin stock';
        } else if (newStockQuantity >= 20) {
            newEstadoProducto = 'Stock normal';
        } else if (newStockQuantity >= 10) {
            newEstadoProducto = 'Stock medio';
        } else if (newStockQuantity >= 5) {
            newEstadoProducto = 'Stock bajo';
        } else { // Cantidades entre 1 y 4
            newEstadoProducto = 'Stock crítico';
        }

        const updateQuery = `
            UPDATE Producto
            SET
                stock_producto = ?,
                estado_producto = ?,
                disponibilidad_producto = ?,
                precio_compra_producto = ?,
                fecha_compra_producto = ?
            WHERE
                nombre_producto = ?
        `;
        const queryParams = [newStockQuantity, newEstadoProducto, newDisponibilidadProducto, updatedCosto, purchase_date, name];

        const [result] = await db.promise().query(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ message: `Stock del producto "${name}" actualizado a ${newStockQuantity} (se ajustó por ${quantityToAdjust}).` });

        recalculateAllProductPrices(db);
    } catch (err) {
        console.error('Error al ajustar stock en la DB:', err);
        res.status(500).json({ message: 'Error interno del servidor al ajustar stock del producto.' });
    }
});

app.put('/editar-producto/:id', (req, res) => {
    const id = req.params.id; // El ID del producto a editar, desde la URL

    // Extraemos SOLO los campos que vienen del formulario (imagen)
    const {
        name,           // Para nombre_producto
        brand,          // Para marca_producto (asumo que "Tipo" se mapea a esto)
        category,       // Para categoria_producto
        color,          // Para color_producto
        price_compra,   // Para precio_compra_producto (asumo "Costo")
        availability
    } = req.body;

    // La consulta SQL solo incluye los campos que vas a actualizar
    const sql = `
        UPDATE producto SET
            nombre_producto = ?,
            marca_producto = ?,
            categoria_producto = ?,
            color_producto = ?,
            precio_compra_producto = ?,
            disponibilidad_producto = ?
        WHERE id_producto = ?
    `;

    // El arreglo 'values' solo incluye los valores para esas columnas, en el orden correcto
    const values = [
        name,
        brand,
        category,
        color,
        price_compra,
        availability,
        id 
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al editar producto:', err);
            // Puedes añadir más detalles del error en la respuesta para depuración:
            return res.status(500).json({ message: 'Error del servidor', error: err.message });
        }

        // Si no se afectó ninguna fila (por ejemplo, el ID no existe)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o no se realizaron cambios.' });
        }

        res.status(200).json({ message: 'Producto editado correctamente' });
        recalculateAllProductPrices(db);
    });
    
});

app.get('/api/productos/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM producto WHERE id_producto = ?';

    db.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Error al obtener producto por ID:', err);
            return res.status(500).json({ message: 'Error del servidor al obtener producto', error: err.message });        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(results[0]); // Devuelve el primer (y único) resultado
    });
});



// Ruta para buscar productos para autocompletado usando callbacks
app.get('/api/buscarProductos', (req, res) => { // Elimina 'async' aquí
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.json([]);
    }    // La consulta SQL
    const sql = `SELECT id_producto, nombre_producto FROM Producto WHERE LOWER(nombre_producto) LIKE LOWER(?) LIMIT 10`;
    const params = [`%${searchTerm}%`];

    // Ejecuta la consulta usando callbacks
    db.query(sql, params, (err, results) => {
        if (err) {
            // Manejo de errores
            console.error('Error al ejecutar la consulta de búsqueda de productos:', err);
            return res.status(500).json({ error: 'Error interno del servidor al buscar productos.' });
        }

        // Si no hay error, envía los resultados como JSON
        res.json(results); // 'results' contendrá los 'rows' en este caso
    });
});


app.post('/api/HistorialCosto', (req, res) => {
    const { id_producto, precio_compra, cantidad_afectada, tipo_movimiento, fecha_movimiento } = req.body;

    if (!id_producto || isNaN(id_producto) || !precio_compra || !cantidad_afectada || !tipo_movimiento || !fecha_movimiento) {
        return res.status(400).json({ message: 'Todos los campos del historial (id_producto, precio, cantidad, tipo, fecha) son obligatorios.' });
    }
    const parsedPrecioCompra = parseFloat(precio_compra);
    const parsedCantidadAfectada = parseInt(cantidad_afectada, 10);

    if (isNaN(parsedPrecioCompra) || parsedPrecioCompra < 0) {
        return res.status(400).json({ message: 'El precio de compra debe ser un número positivo o cero.' });
    }
    if (isNaN(parsedCantidadAfectada) || parsedCantidadAfectada === 0) {
        return res.status(400).json({ message: 'La cantidad afectada debe ser un número entero diferente de cero.' });
    }

    const sql = `INSERT INTO historial_compra (id_producto, precio_compra, cantidad_afectada, tipo_movimiento, fecha_movimiento) VALUES (?, ?, ?, ?, ?)`;
    const params = [id_producto, parsedPrecioCompra, parsedCantidadAfectada, tipo_movimiento, fecha_movimiento];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor al guardar el historial.' });
        }
        res.status(201).json({ message: 'Registro de historial de costo guardado con éxito.', id_movimiento: result.insertId });
    });
});

app.post('/api/HistorialVenta', (req, res) => {
    console.log('=== LLAMADA A /api/HistorialVenta ===');
    
    const { id_producto, cantidad_afectada, tipo_movimiento, fecha_movimiento } = req.body;

    // Validación básica
    if (!id_producto || isNaN(id_producto) || !cantidad_afectada || !tipo_movimiento || !fecha_movimiento) {
        return res.status(400).json({ message: 'Todos los campos del historial (id_producto, cantidad, tipo, fecha) son obligatorios.' });
    }    const parsedCantidadAfectada = parseInt(cantidad_afectada, 10);

    if (isNaN(parsedCantidadAfectada) || parsedCantidadAfectada === 0) {
        return res.status(400).json({ message: 'La cantidad afectada debe ser un número entero diferente de cero.' });
    }    // Convertir a número positivo para el historial de ventas
    const cantidadPositiva = Math.abs(parsedCantidadAfectada);
    
    console.log(`Cantidad original: ${parsedCantidadAfectada} → Cantidad guardada: ${cantidadPositiva}`);

    const sql = `INSERT INTO historial_venta (id_producto, cantidad_afectada, tipo_movimiento, fecha_movimiento) VALUES (?, ?, ?, ?)`;
    const params = [id_producto, cantidadPositiva, tipo_movimiento, fecha_movimiento];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error interno del servidor al guardar el historial de venta.' });
        }
        res.status(201).json({ message: 'Registro de historial de venta guardado con éxito.', id_movimiento: result.insertId });
    });
});


app.post('/Registrar-venta', async (req, res) => {
    const { name, quantity, purchase_date } = req.body; // 'quantity' es el nuevo stock del producto

    console.log('--- SOLICITUD DE AJUSTAR STOCK ---');
    console.log('Cuerpo de la solicitud (req.body):', req.body);
    console.log('name:', name);
    console.log('quantity:', quantity, 'Tipo:', typeof quantity);
    console.log('purchase_date:', purchase_date);


      const quantityToAdjust = Number(quantity); // Asegurarse de que sea un número

   
    if (isNaN(quantityToAdjust)) {
        return res.status(400).json({ message: 'La cantidad a ajustar debe ser un número válido.' });
    }

    let newStockQuantity;
    let newEstadoProducto;
    let newDisponibilidadProducto;

    try {
        // Primero, obtener el stock actual del producto
        const getProductInfoQuery = `SELECT stock_producto, precio_compra_producto FROM Producto WHERE nombre_producto = ?`;
        const [productInfo] = await db.promise().query(getProductInfoQuery, [name]);

        if (productInfo.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }        const currentStock = productInfo[0].stock_producto;

        const quantityToAdjust = Number(quantity);
        // Para ventas, siempre restar del stock (usar valor absoluto para asegurar resta)
        newStockQuantity = currentStock - Math.abs(quantityToAdjust);

        // Validar que el nuevo stock no sea negativo
        if (newStockQuantity < 0) {
            return res.status(400).json({ message: 'El stock resultante no puede ser negativo.' });
        }
    
   
        // Lógica para disponibilidad_producto
        if (newStockQuantity > 0) {
            newDisponibilidadProducto = 'Disponible';
        } else { // newStockQuantity === 0
            newDisponibilidadProducto = 'No Disponible';
        }

        // Lógica para estado_producto
        if (newStockQuantity === 0) {
            newEstadoProducto = 'Sin stock';
        } else if (newStockQuantity >= 20) {
            newEstadoProducto = 'Stock normal';
        } else if (newStockQuantity >= 10) {
            newEstadoProducto = 'Stock medio';
        } else if (newStockQuantity >= 5) {
            newEstadoProducto = 'Stock bajo';
        } else { // Cantidades entre 1 y 4
            newEstadoProducto = 'Stock crítico';
        }

        const updateQuery = `
            UPDATE Producto
            SET
                stock_producto = ?,
                estado_producto = ?,
                disponibilidad_producto = ?,
                fecha_compra_producto = ?
            WHERE
                nombre_producto = ?
        `;
        const queryParams = [newStockQuantity, newEstadoProducto, newDisponibilidadProducto, purchase_date, name];

        const [result] = await db.promise().query(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ message: `Stock del producto "${name}" actualizado a ${newStockQuantity} (se ajustó por ${quantityToAdjust}).` });

        recalculateAllProductPrices(db);
    } catch (err) {
        console.error('Error al ajustar stock en la DB:', err);
        res.status(500).json({ message: 'Error interno del servidor al ajustar stock del producto.' });
    }
});



// =========================================================
// NUEVO Endpoint: GET /api/settings (Obtener configuraciones)
// =========================================================
app.get('/settings', async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            'SELECT iva, categoria_1, categoria_2, categoria_3, categoria_4 FROM Porcentajes LIMIT 1'
        );

        if (rows.length === 0) {
            // Si no hay configuraciones, podrías insertar una por defecto o devolver un error/valores por defecto
            // Es crucial que haya al menos una fila en 'Porcentajes' antes de llamar a esto en producción.
            console.warn('No hay configuraciones en la tabla Porcentajes. Se devolverán valores por defecto JS.');
            return res.status(200).json({
                ivaRate: 19, // Valores por defecto si la tabla está vacía
                profitMargins: {
                    "Computación": 35,
                    "Libreria": 40,
                    "Tintas": 45,
                    "Otros_productos": 40
                },
                message: "No se encontraron configuraciones en la DB, se devolvieron valores por defecto."
            });
        }

        const settings = rows[0];
        res.status(200).json({
            ivaRate: settings.iva,
            profitMargins: {
                "Computación": settings.categoria_1,
                "Libreria": settings.categoria_2,
                "Tintas": settings.categoria_3,
                "Otros_productos": settings.categoria_4
            }
        });
    } catch (error) {
        console.error('Error al obtener configuraciones desde la DB:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener configuraciones.' });
    }
});


// =========================================================
// NUEVO Endpoint: PUT /api/settings (Actualizar configuraciones y recalcular)
// =========================================================
app.post('/settings', async (req, res) => {
    const { ivaRate, profitMargins } = req.body;

    // 1. Validaciones
    if (typeof ivaRate !== 'number' || ivaRate < 0 || ivaRate > 100) {
        return res.status(400).json({ message: 'El porcentaje de IVA debe ser un número entre 0 y 100.' });
    }
    if (typeof profitMargins !== 'object' || profitMargins === null) {
        return res.status(400).json({ message: 'Los porcentajes de ganancia por categoría son inválidos.' });
    }

    const categoryMap = {
        "Computación": "categoria_1",
        "Libreria": "categoria_2",
        "Tintas": "categoria_3",
        "Otros_productos": "categoria_4"
    };

    const dbCategoryValues = {};
    for (const categoryName in profitMargins) {
        const rate = profitMargins[categoryName];
        if (typeof rate !== 'number' || rate < 0 || rate > 100) {
            return res.status(400).json({ message: `El porcentaje de ganancia para ${categoryName} debe ser un número entre 0 y 100.` });
        }
        // Mapea el nombre de la categoría a la columna de la DB
        const dbColumnName = categoryMap[categoryName];
        if (dbColumnName) {
            dbCategoryValues[dbColumnName] = rate;
        } else {
            console.warn(`Categoría desconocida en profitMargins: ${categoryName}`);
            // Podrías devolver un error 400 si las categorías son estrictas
        }
    }

    // 2. Actualizar la tabla 'Porcentajes'
    try {
        // Asumimos que siempre actualizamos el primer (y único) registro.
        // Si no existe, lo insertamos.
        const [existingRows] = await db.promise().query('SELECT id_porcentajes FROM Porcentajes LIMIT 1');
        let query;
        let queryParams;

        if (existingRows.length > 0) {
            query = `
                UPDATE Porcentajes
                SET iva = ?, categoria_1 = ?, categoria_2 = ?, categoria_3 = ?, categoria_4 = ?
                WHERE id_porcentajes = ?
            `;
            queryParams = [
                ivaRate,
                dbCategoryValues.categoria_1,
                dbCategoryValues.categoria_2,
                dbCategoryValues.categoria_3,
                dbCategoryValues.categoria_4,
                existingRows[0].id_porcentajes // Usa el ID existente
            ];
        } else {
            query = `
                INSERT INTO Porcentajes (iva, categoria_1, categoria_2, categoria_3, categoria_4)
                VALUES (?, ?, ?, ?, ?)
            `;
            queryParams = [
                ivaRate,
                dbCategoryValues.categoria_1,
                dbCategoryValues.categoria_2,
                dbCategoryValues.categoria_3,
                dbCategoryValues.categoria_4
            ];
        }

        await db.promise().query(query, queryParams);
        console.log('Configuraciones de porcentajes actualizadas en la DB.');

        // 3. Disparar la recalculación de precios después de actualizar las configuraciones
        const recalculationResult = await recalculateAllProductPrices(db);

        if (recalculationResult.success) {
            res.status(200).json({ message: 'Configuraciones guardadas y precios recalculados exitosamente.' });
        } else {
            // Si la configuración se guardó pero la recalculación falló
            res.status(500).json({ message: `Configuraciones guardadas, pero error al recalcular precios: ${recalculationResult.message}` });
        }

    } catch (error) {
        console.error('Error al actualizar configuraciones o recalcular precios:', error);
        res.status(500).json({ message: 'Error interno del servidor al guardar configuraciones o recalcular precios.' });
    }
});

// ==========================================================
// MIDDLEWARES DE AUTENTICACIÓN Y AUTORIZACIÓN
// ==========================================================

// Middleware para verificar si el usuario está autenticado
function protect(req, res, next) {
    if (req.session && req.session.loggedIn && req.session.user) {
        // Adjuntar el objeto de usuario de la sesión a req.user para que authorizeRoles pueda usarlo
        req.user = req.session.user;
        next();
    } else {
        console.log('Acceso denegado: Usuario no autenticado.');
        res.status(401).json({ message: "No autorizado, inicie sesión." });
    }
}

// Middleware para autorizar roles (basado en req.session.user.Rol)
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.user || !req.user.Rol) {
            return res.status(403).json({ message: 'Acceso denegado: No se ha encontrado el rol del usuario.' });
        }
        if (!roles.includes(req.user.Rol)) {
            return res.status(403).json({ message: `Acceso denegado: Tu rol (${req.user.Rol}) no tiene permisos para esta acción.` });
        }
        next(); // El usuario tiene el rol requerido, continuar
    };
}


app.get('/obtener-usuarios', (req, res) => {


    let query = `
        SELECT
            ID AS id_user,
            Usuario AS name_user,
            Correo AS mail_user,
            Rol AS role_user,
            Fecha_creacion AS creation_date_user,
            Ultimo_acceso AS last_access_user,
            Estado AS status_user
        FROM
            Usuario
    `;
    let queryParams = [];

    

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error al obtener productos de la base de datos:', err);
            return res.status(500).json({ success: false, message: 'Error interno del servidor al obtener productos.' });
        }
        res.json({ success: true, users: results });
    });
});

// Coloca esta función al principio de tu archivo donde configuras 'db'
// O en un archivo de utilidades si manejas muchas consultas.
function queryPromise(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}


app.put('/editar-usuario/:id', async (req, res) => {
    const id = req.params.id; // El ID del usuario a editar
    const { username, email, user_category, account_status } = req.body;

    // 1. Validación básica de campos (opcional pero muy recomendable)
    if (!username || !email || !user_category || !account_status) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // 2. Pre-verificación de existencia de usuario o correo para OTROS usuarios
        // Esta consulta busca si ya existe un 'Usuario' o 'Correo' IGUAL
        // al que se intenta actualizar, pero que NO pertenezca al ID del usuario que se está editando.
        const checkDuplicateQuery = 'SELECT ID, Usuario, Correo FROM Usuario WHERE (Usuario = ? OR Correo = ?) AND ID != ?';
        const checkResults = await queryPromise(checkDuplicateQuery, [username, email, id]);

        if (checkResults.length > 0) {
            // Si se encontraron resultados, significa que ya existe un duplicado.
            const duplicateUser = checkResults[0]; // Tomamos el primer duplicado encontrado

            if (duplicateUser.Usuario === username) {
                return res.status(400).json({ message: 'El nombre de usuario ya existe.' });
            }
            if (duplicateUser.Correo === email) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
            }
            // Esto es un fallback, en teoría las condiciones anteriores deberían capturarlo
            return res.status(400).json({ message: 'Nombre de usuario o correo electrónico ya existen.' });
        }

        // 3. Si no hay duplicados, procede con la actualización del usuario
        const sql = `
            UPDATE Usuario SET
                Usuario = ?,
                Correo = ?,
                Rol = ?,
                Estado = ?
            WHERE ID = ?
        `;
        const values = [
            username,
            email,
            user_category,
            account_status,
            id // El ID del usuario para la cláusula WHERE
        ];

        const result = await queryPromise(sql, values);

        // Si no se afectó ninguna fila (por ejemplo, el ID no existe o no hubo cambios en los datos)
        if (result.affectedRows === 0) {
            // Podrías diferenciar entre 'no encontrado' y 'no se realizaron cambios'
            // Si quieres que solo se realice el update si hay cambios, podrías necesitar una lógica más compleja
            // o simplemente este mensaje si el ID es válido pero los datos son los mismos.
            return res.status(404).json({ message: 'Usuario no encontrado o no se realizaron cambios.' });
        }

        res.status(200).json({ message: 'Usuario editado correctamente' });

    } catch (err) {
        console.error('Error al editar usuario:', err);

        // Manejo específico para errores de clave única de la base de datos
        // (Aunque la pre-verificación debería capturarlos, es una buena segunda línea de defensa)
        if (err.code === 'ER_DUP_ENTRY') { // Código de error de MySQL para entrada duplicada
            if (err.sqlMessage && err.sqlMessage.includes('for key \'Usuario\'')) {
                 return res.status(400).json({ message: 'El nombre de usuario ya existe.' });
            }
            if (err.sqlMessage && err.sqlMessage.includes('for key \'Correo\'')) {
                 return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
            }
            return res.status(400).json({ message: 'Entrada duplicada. El usuario o correo ya existen.' });
        }
        
        // Error genérico del servidor
        res.status(500).json({ message: 'Error del servidor al actualizar el usuario.', error: err.message });
    }
});

app.get('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM Usuario WHERE ID = ?';

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario por ID:', err);
            return res.status(500).json({ message: 'Error del servidor al obtener producto', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(results[0]); // Devuelve el primer (y único) resultado
    });
});


app.use(router);

app.get('/', (req, res) => {
    res.send('¡El servidor Express está funcionando!');
});

app.listen(8080, () => {
  console.log("Hola, servidor iniciado en el puerto 8080");
});






