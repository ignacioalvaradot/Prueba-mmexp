//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getGrupos, createGrupo, getGrupo, updateGrupo, deleteGrupo } = require('../controllers/grupos.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getGrupos)
    .post(createGrupo);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getGrupo)
    .put(updateGrupo)
    .delete(deleteGrupo);

module.exports = router;