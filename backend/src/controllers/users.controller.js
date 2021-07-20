const userCtrl = {};
const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.createUser = async (req, res) => {
    const {tipoUsuario,nombreUsuario} = req.body;
    const nuevoUsuario = new User({tipoUsuario,nombreUsuario});
    await nuevoUsuario.save();
    res.json('Usuario Creado');
};

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json({ user });
};

userCtrl.updateUser = async (req, res) => {
    const { tipoUsuario, nombreUsuario } = req.body;
    await User.findOneAndUpdate({_id: req.params.id}, {
        tipoUsuario,
        nombreUsuario
    });
    res.json({mensaje: 'Usuario Actualizado'});
};

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json('Usuario Eliminado');
};

// para actualizar o editar, se usa lo mismo que notes.controller.js

module.exports = userCtrl;