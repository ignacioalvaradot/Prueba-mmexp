const userCtrl = {};
const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

userCtrl.createUser = async (req, res) => {
    const {tipoUsuario,nombreUsuario, contraseña, correo} = req.body;
    const nuevoUsuario = new User({tipoUsuario,nombreUsuario,contraseña, correo});
    await nuevoUsuario.save();
    res.json('Usuario Creado');
};

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json({ user });
};

userCtrl.loginUsuarios = async (req, res) => {
    // console.log(req.body);
    const nombreUsuario = req.body.nombreUsuario;
    const contraseña = req.body.contraseña;
    const user = await User.find({nombreUsuario: nombreUsuario, contraseña: contraseña});
    // console.log(user);
    res.json(user);
    // if(user.lenght===1){
    //     res.json(true);
    // }else{
    //     res.json(false);
    // }
};

userCtrl.updateUser = async (req, res) => {
    const { tipoUsuario, nombreUsuario, contraseña, correo } = req.body;
    await User.findOneAndUpdate({_id: req.params.id}, {
        tipoUsuario,
        nombreUsuario,
        contraseña,
        correo
    });
    res.json({mensaje: 'Usuario Actualizado'});
};

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json('Usuario Eliminado');
};

// para actualizar o editar, se usa lo mismo que notes.controller.js

module.exports = userCtrl;