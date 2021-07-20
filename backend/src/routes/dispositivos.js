//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getDispositivos, createDispositivo, getDispositivo, updateDispositivo, deleteDispositivo } = require('../controllers/dispositivos.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getDispositivos)
    .post(createDispositivo);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getDispositivo)
    .put(updateDispositivo)
    .delete(deleteDispositivo);

module.exports = router;