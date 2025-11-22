const express = require('express');
const router = express.Router();
const path = require('path');
const { isAuthenticated } = require('../middlewares/auth');

// Rutas estáticas públicas
router.get("/index", (req, res) => { 
    res.sendFile(path.join(__dirname, "../../proyecto/dist/index.html"));
});

router.get("/registro", (req, res) => { 
    res.sendFile(path.join(__dirname, "../../proyecto/dist/registro.html"));
});

router.get("/forgot-password", (req, res) => { 
    res.sendFile(path.join(__dirname, "../../proyecto/dist/forgot-password.html"));
});

router.get("/restore-password", (req, res) => { 
    res.sendFile(path.join(__dirname, "../../proyecto/dist/restore-password.html"));
});

// Rutas protegidas
router.get('/inicio', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../../proyecto/dist/protected_html/inicio.html")); 
});

router.get('/inicio.html', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../../proyecto/dist/protected_html/inicio.html")); 
});

module.exports = router;