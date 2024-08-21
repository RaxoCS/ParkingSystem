const express = require('express');
const router = express.Router();
const entradaController = require('../controllers/entradaController');

// Ruta para registrar entrada
router.post('/registrar', entradaController.registrarEntrada);

module.exports = router;
