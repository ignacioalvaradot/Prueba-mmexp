const TipoDispositivoCtrl = {};

const TipoDispositivo = require('../models/TipoDispositivo');
const TipoDispositivoModel = require('../models/TipoDispositivo');

TipoDispositivoCtrl.getTipoDispositivos = async (req, res) => {
    const tipoDispositivos = await TipoDispositivoModel.find();
    res.json(tipoDispositivos);
}

TipoDispositivoCtrl.createTipoDispositivo = async (req, res) => {
    const { modelo, marca } = req.body;
    const newTipoDispositivo = new TipoDispositivo({
        modelo: modelo,
        marca: marca
    });
    await newTipoDispositivo.save();
    res.json({mensaje: 'TipoDispositivo Guardada'});
};

TipoDispositivoCtrl.getTipoDispositivo = async (req, res) => {
    const tipoDispositivo = await TipoDispositivo.findById(req.params.id)
    res.json({ tipoDispositivo });
};

TipoDispositivoCtrl.updateTipoDispositivo = async (req, res) => {
    const { modelo, marca } = req.body;
    await TipoDispositivo.findOneAndUpdate({_id: req.params.id}, {
        modelo,
        marca
    });
    res.json({mensaje: 'TipoDispositivo Actualizada'});
};

TipoDispositivoCtrl.deleteTipoDispositivo = async (req, res) => {
    await TipoDispositivo.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'TipoDispositivo Eliminada'})
};

module.exports = TipoDispositivoCtrl;