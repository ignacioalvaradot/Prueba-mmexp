//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getArchivos, createArchivo, getArchivopost, updateArchivo, deleteArchivo } = require('../controllers/archivoPrueba.controller');
const upload = require('../middleware/upload');

// Tomar de la ruta inicial, consultas HTTP
router.route('/')
    .get(getArchivos)
    .post(upload.single('archivo'), createArchivo);

router.route('/consultaMedicion/')
    .post(getArchivopost);

    // Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    // .get(getArchivo)
    .put(updateArchivo)
    .delete(deleteArchivo);

module.exports = router;