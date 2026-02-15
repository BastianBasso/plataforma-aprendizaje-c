const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');

// Importar rutas modularizadas
const authRoutes = require('./routes/registro'); // rutas de autenticación
const userRoutes = require('./routes/userRoutes'); // rutas de usuario  
const staticRoutes = require('./routes/staticRoutes'); // rutas estáticas
const progresoRoutes = require('./routes/progreso.r.js');


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
const reactDist = path.join(__dirname, '../frontend/react-spa/dist');
const legacyDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(reactDist));

// Assets legacy usados por protected_html (HTML de módulos) como /assets/content-01sust.css
// Importante: no reemplaza los assets de React; solo sirve los que no existan en reactDist.
app.use('/assets', express.static(path.join(legacyDist, 'assets')));

app.use('/js-spa', express.static(path.join(__dirname, '../frontend/js-spa'))); // Aplicacion del SP
app.use('/react', express.static(reactDist));

// Montar rutas
app.use('/', authRoutes); // mantiene compatibilidad con frontend existente
app.use('/', userRoutes); // rutas de usuario
app.use('/', staticRoutes); // rutas estáticas
app.use('/api', progresoRoutes);

// Fallback SPA para React (Express 5 compatible)
app.get(/^\/react(\/.*)?$/, (req, res) => {
    res.sendFile(path.join(reactDist, 'index.html'));
});

// Ruta raíz
app.get('/', (req, res) => {
    res.redirect(302, `/react${req.originalUrl}`);
});

// Inicio del servidor
app.listen(8080, () => {
    console.log("Hola, servidor iniciado en el puerto 8080");
});