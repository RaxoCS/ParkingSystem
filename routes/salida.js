const express = require('express');
const router = express.Router();
const salidaController = require('../controllers/salidaController');

// Ruta para registrar salida
router.post('/registrar', salidaController.registrarSalida);

module.exports = router;
