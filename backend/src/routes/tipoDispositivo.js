//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getTipoDispositivos, createTipoDispositivo, getTipoDispositivo, updateTipoDispositivo, deleteTipoDispositivo } = require('../controllers/tipoDispositivos.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getTipoDispositivos)
    .post(createTipoDispositivo);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getTipoDispositivo)
    .put(updateTipoDispositivo)
    .delete(deleteTipoDispositivo);

module.exports = router;