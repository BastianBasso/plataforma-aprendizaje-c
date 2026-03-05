function isAuthenticated(req, res, next) {
    if (req.session && req.session.loggedIn && req.session.userId) {
        next();
    } else {
        console.log('Acceso denegado: Usuario no autenticado. Redirigiendo a /');
        res.redirect('/?auth_error=true');
    }
}

function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn && req.session.userId) {
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