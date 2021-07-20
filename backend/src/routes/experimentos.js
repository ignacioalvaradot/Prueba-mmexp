//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getExp, createExp, getExps, updateExp, updateExpFase, deleteExp } = require('../controllers/experimentos.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getExp)
    .post(createExp);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getExps)
    .put(updateExp)
    .delete(deleteExp);

router.route('/agregarFases/:id')
    .put(updateExpFase);

module.exports = router;