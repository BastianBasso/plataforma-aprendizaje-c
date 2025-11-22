const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');

// Importar rutas modularizadas
const authRoutes = require('./routes/registro'); // rutas de autenticación
const userRoutes = require('./routes/userRoutes'); // rutas de usuario  
const staticRoutes = require('./routes/staticRoutes'); // rutas estáticas

// Configuración de sesión
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


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "../proyecto/dist")));

// Montar rutas
app.use('/', authRoutes); // mantiene compatibilidad con frontend existente
app.use('/', userRoutes); // rutas de usuario
app.use('/', staticRoutes); // rutas estáticas

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡El servidor Express está funcionando!');
});

// Inicio del servidor
app.listen(8080, () => {
    console.log("Hola, servidor iniciado en el puerto 8080");
});