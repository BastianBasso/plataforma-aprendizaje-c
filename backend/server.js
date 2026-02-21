const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');

// 1. Importar rutas modularizadas (Esto queda igual)
const authRoutes = require('./routes/registro'); 
const loginRoutes = require('./routes/login.r.js');
const userRoutes = require('./routes/userRoutes');  
const staticRoutes = require('./routes/staticRoutes'); 
const progresoRoutes = require('./routes/progreso.r.js');

// 2. Configuración de sesión (Queda igual)
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

// 3. Archivos estáticos (Queda igual)
const reactDist = path.join(__dirname, '../frontend/react-spa/dist');
app.use(express.static(reactDist));
app.use('/react', express.static(reactDist));

// =========================================================
// 4. MONTAR RUTAS (
// =========================================================


app.use('/api', authRoutes);     // endpoints de registro
app.use('/api', loginRoutes);    // endpoints de login/logout
app.use('/api', userRoutes);     // endpoints de usuarios
app.use('/api', progresoRoutes); // endpoints de progreso (este ya lo tenías bien)

// Nota sobre staticRoutes: Si estas son rutas que devuelven HTML antiguo
// quizás quieras dejarlas como app.use('/', staticRoutes); 
// Pero si devuelven datos JSON, déjalas con '/api' también.
app.use('/', staticRoutes); 
// =========================================================

app.get(/^\/react(\/.*)?$/, (req, res) => {
    res.sendFile(path.join(reactDist, 'index.html'));
});

app.get('/', (req, res) => {
    res.redirect(302, `/react${req.originalUrl}`);
});

// Inicio del servidor
app.listen(8080, () => {
    console.log("Hola, servidor iniciado en el puerto 8080");
});