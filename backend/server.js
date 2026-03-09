const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');

// 1. Importar rutas modularizadas 
const authRoutes = require('./routes/registroRoutes'); 
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/usersRoutes');  
const staticRoutes = require('./routes/staticRoutes'); 
const progresoRoutes = require('./routes/progresoRoutes'); 

const adminRoutes = require('./routes/adminRoutes'); 

// 2. Configuración de sesión 
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

// 3. Archivos estáticos 
const reactDist = path.join(__dirname, '../frontend/react-spa/dist');
app.use(express.static(reactDist));
app.use('/react', express.static(reactDist));

// =========================================================
// 4. MONTAR RUTAS 
// =========================================================

app.use('/api', authRoutes);     // endpoints de registro
app.use('/api', loginRoutes);    // endpoints de login/logout
app.use('/api', userRoutes);     // endpoints de usuarios
app.use('/api', progresoRoutes); // endpoints de progreso 

app.use('/api', adminRoutes); 


app.use('/', staticRoutes); 

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