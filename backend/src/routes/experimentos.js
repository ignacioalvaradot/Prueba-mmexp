//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getExp, createExp, getExps, getExperimentos, updateExp, updateExpFase, updateFaseActiva, deleteExp } = require('../controllers/experimentos.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getExp)
    .post(createExp);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/traerExp/:tipoExp')
    .get(getExperimentos);
router.route('/:id')
    .get(getExps)
    .put(updateExp)
    .delete(deleteExp);

router.route('/agregarFases/:id')
    .put(updateExpFase);

router.route('/faseActiva/:id')
    .put(updateFaseActiva);

module.exports = router;