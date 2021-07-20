//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getTipoMediciones, createTipoMedicion, getTipoMedicion, updateTipoMedicion, deleteTipoMedicion } = require('../controllers/tipoMediciones.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getTipoMediciones)
    .post(createTipoMedicion);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getTipoMedicion)
    .put(updateTipoMedicion)
    .delete(deleteTipoMedicion);

module.exports = router;