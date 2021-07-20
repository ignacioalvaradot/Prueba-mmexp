//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getParticipantes, createParticipante, getParticipante, updateParticipante, deleteParticipante } = require('../controllers/participantes.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getParticipantes)
    .post(createParticipante);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getParticipante)
    .put(updateParticipante)
    .delete(deleteParticipante);

module.exports = router;