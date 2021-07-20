//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getMediciones, createMedicion, getMedicion, updateMedicion, deleteMedicion } = require('../controllers/mediciones.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getMediciones)
    .post(createMedicion);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getMedicion)
    .put(updateMedicion)
    .delete(deleteMedicion);

module.exports = router;