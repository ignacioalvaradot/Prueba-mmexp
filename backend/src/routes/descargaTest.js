//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getDescargaTests, createDescargaTest, getDescargaTest, updateDescargaTest, deleteDescargaTest } = require('../controllers/descargaTest.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getDescargaTests)
    .post(createDescargaTest);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getDescargaTest)
    .put(updateDescargaTest)
    .delete(deleteDescargaTest);

module.exports = router;