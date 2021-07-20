//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getNotes, createNote, getNote, updateNote, deleteNote } = require('../controllers/notes.controller');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getNotes)
    .post(createNote);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;