const DispositivoCtrl = {};

const Dispositivo = require('../models/Dispositivo');
const DispositivoModel = require('../models/Dispositivo');

DispositivoCtrl.getDispositivos = async (req, res) => {
    const dispositivos = await DispositivoModel.find();
    res.json(dispositivos);
}

DispositivoCtrl.createDispositivo = async (req, res) => {
    const { nombre, canales } = req.body;
    const newDispositivo = new Dispositivo({
        nombre: nombre,
        canales: canales
    });
    await newDispositivo.save();
    res.json({mensaje: 'Dispositivo Creado'});
};

DispositivoCtrl.getDispositivo = async (req, res) => {
    const dispositivo = await Dispositivo.findById(req.params.id)
    res.json({ dispositivo });
};

DispositivoCtrl.updateDispositivo = async (req, res) => {
    const { nombre, canales } = req.body;
    await Dispositivo.findOneAndUpdate({_id: req.params.id}, {
        nombre,
        canales
    });
    res.json({mensaje: 'Dispositivo Actualizado'});
};

DispositivoCtrl.deleteDispositivo = async (req, res) => {
    await Dispositivo.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Dispositivo Eliminada'})
};

module.exports = DispositivoCtrl;