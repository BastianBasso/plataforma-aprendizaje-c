/**
 * Middleware de autenticación
 * Verifica si el usuario tiene una sesión válida
 */
function isAuthenticated(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        console.log('Acceso denegado: Usuario no autenticado. Redirigiendo a /');
        res.redirect('/?auth_error=true');
    }
}

/**
 * Middleware para APIs que requieren autenticación
 * Devuelve JSON en lugar de redireccionar
 */
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        return res.status(401).json({ 
            success: false, 
            message: 'No autenticado. Inicia sesión primero.' 
        });
    }
}

module.exports = { 
    isAuthenticated, 
    requireAuth 
};