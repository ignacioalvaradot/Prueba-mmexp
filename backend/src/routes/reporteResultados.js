//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getRResultados, createRResultado, getRResultado, updateRResultado, deleteRResultado } = require('../controllers/reporteResultados.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getRResultados)
    .post(createRResultado);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getRResultado)
    .put(updateRResultado)
    .delete(deleteRResultado);

module.exports = router;