//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getGrupos, createGrupo, getGrupo, updateGrupo, updateArrParticipantes, updateDispositivos, deleteGrupo } = require('../controllers/grupos.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getGrupos)
    .post(createGrupo);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getGrupo)
    .put(updateGrupo)
    .delete(deleteGrupo);

router.route('/agregarParticipantes/:id')
    .put(updateArrParticipantes);

router.route('/actualizarDispositivos/:id')
    .put(updateDispositivos);

module.exports = router;