const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middlewares/auth');

router.get('/admin/usuarios', requireAuth, adminController.getAllUsers);

router.put('/admin/usuarios/:id/rol', requireAuth, adminController.updateUserRole);
router.delete('/admin/usuarios/:id', requireAuth, adminController.deleteUser);

module.exports = router;