//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getObservaciones, createObservacion, getObservacion, updateObservacion, deleteObservacion } = require('../controllers/Observaciones.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getObservaciones)
    .post(createObservacion);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getObservacion)
    .put(updateObservacion)
    .delete(deleteObservacion);

module.exports = router;