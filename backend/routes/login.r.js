const { requireAuth } = require('../middlewares/auth'); 

const express = require('express');
const router = express.Router();
const authController = require('../controllers/login.c');

// Rutas de autenticación

router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Creas una ruta GET para verificar la sesión
router.get('/status', requireAuth, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Sesión activa',
        user: {
            id: req.session.userId,
            username: req.session.username,
            role: req.session.role // Si aplicas lo del rol
        }
    });
});


module.exports = router;