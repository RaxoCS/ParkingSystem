const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

// Ruta para generar reportes
router.get('/', reportesController.generarReporte);

module.exports = router;
