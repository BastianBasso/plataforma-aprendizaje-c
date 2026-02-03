

const authorizeRole = (roleRequired) => {
    return (req, res, next) => {
        // Verificar si hay sesión y si el rol coincide
        if (req.session && req.session.loggedIn && req.session.role === roleRequired) {
            return next(); // Acceso permitido
        } else {
            return res.status(403).json({ 
                success: false, 
                message: 'Acceso denegado. Se requieren privilegios de administrador.' 
            });
        }
    };
};

module.exports = { 
    authorizeRole 
};