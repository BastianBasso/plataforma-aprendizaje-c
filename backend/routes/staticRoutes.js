const express = require('express');
const router = express.Router();
const path = require('path');
const { isAuthenticated } = require('../middlewares/auth');

// Rutas estáticas públicas
router.get("/index", (req, res) => { 
    res.redirect(302, "/react/");
});

router.get("/login", (req, res) => { 
    res.redirect(302, "/react/login");
});

router.get("/registro", (req, res) => { 
    res.redirect(302, "/react/registro");
});

router.get("/forgot-password", (req, res) => { 
    res.redirect(302, "/react/forgot-password");
});

router.get("/restore-password", (req, res) => { 
    const qs = req.originalUrl.includes('?') ? req.originalUrl.substring(req.originalUrl.indexOf('?')) : '';
    res.redirect(302, `/react/restore-password${qs}`);
});

// Rutas protegidas
router.get('/inicio', isAuthenticated, (req, res) => {
    res.redirect(302, '/react/inicio');
});

router.get('/inicio.html', isAuthenticated, (req, res) => {
    res.redirect(302, '/react/inicio');
});

router.get('/cursos-selec.html',isAuthenticated ,(req, res) => {
    res.redirect(302, '/react/cursos');
});

router.get('/admin.html',isAuthenticated ,(req, res) => {
    res.redirect(302, '/react/admin');
});

// Modulos de contenido  igual usan un isAuthenticated
const modulosRoutes = require('./modulosRoutes');
router.use(modulosRoutes);




module.exports = router;