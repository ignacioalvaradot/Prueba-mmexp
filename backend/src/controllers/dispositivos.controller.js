const DispositivoCtrl = {};

const Dispositivo = require('../models/Dispositivo');
const DispositivoModel = require('../models/Dispositivo');

DispositivoCtrl.getDispositivos = async (req, res) => {
    const dispositivos = await DispositivoModel.find();
    res.json(dispositivos);
}

DispositivoCtrl.createDispositivo = async (req, res) => {
    const { numeroSerie, idDispositivoMM, modelo } = req.body;
    const newDispositivo = new Dispositivo({
        numeroSerie: numeroSerie,
        idDispositivoMM: idDispositivoMM,
        modelo: modelo
    });
    await newDispositivo.save();
    res.json({mensaje: 'Dispositivo Guardada'});
};

DispositivoCtrl.getDispositivo = async (req, res) => {
    const dispositivo = await Dispositivo.findById(req.params.id)
    res.json({ dispositivo });
};

DispositivoCtrl.updateDispositivo = async (req, res) => {
    const { numeroSerie, idDispositivoMM, modelo } = req.body;
    await Dispositivo.findOneAndUpdate({_id: req.params.id}, {
        numeroSerie,
        idDispositivoMM,
        modelo
    });
    res.json({mensaje: 'Dispositivo Actualizada'});
};

DispositivoCtrl.deleteDispositivo = async (req, res) => {
    await Dispositivo.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Dispositivo Eliminada'})
};

module.exports = DispositivoCtrl;