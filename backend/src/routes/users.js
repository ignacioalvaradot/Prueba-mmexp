//Especificar Rutas - "Enrutadores"
const { Router } = require('express');
const router = Router();

const { getUsers, createUser, getUser, loginUsuarios, updateUser, deleteUser } = require('../controllers/users.controller');

// Tomar de la ruta inicial, una peticion de tipo request, response
router.route('/')
    .get(getUsers)
    .post(createUser);

// Si ingreso con una id, interactuar con estas peticiones
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/login')
    .post(loginUsuarios);
    
module.exports = router;