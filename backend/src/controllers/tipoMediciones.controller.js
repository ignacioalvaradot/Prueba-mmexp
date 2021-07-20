const TipoMedicionCtrl = {};

const TipoMedicion = require('../models/TipoMedicion');
const TipoMedicionModel = require('../models/TipoMedicion');

TipoMedicionCtrl.getTipoMediciones = async (req, res) => {
    const tipoMediciones = await TipoMedicionModel.find();
    res.json(tipoMediciones);
}

TipoMedicionCtrl.createTipoMedicion = async (req, res) => {
    const { idTipoMedicion, codTipoMedicionMM, descripcion } = req.body;
    const newTipoMedicion = new TipoMedicion({
        idTipoMedicion: idTipoMedicion,
        codTipoMedicionMM: codTipoMedicionMM,
        descripcion: descripcion
    });
    await newTipoMedicion.save();
    res.json({mensaje: 'TipoMedicion Guardada'});
};

TipoMedicionCtrl.getTipoMedicion = async (req, res) => {
    const tipoMedicion = await TipoMedicion.findById(req.params.id)
    res.json({ tipoMedicion });
};

TipoMedicionCtrl.updateTipoMedicion = async (req, res) => {
    const { idTipoMedicion, codTipoMedicionMM, descripcion } = req.body;
    await TipoMedicion.findOneAndUpdate({_id: req.params.id}, {
        idTipoMedicion,
        codTipoMedicionMM,
        descripcion
    });
    res.json({mensaje: 'TipoMedicion Actualizada'});
};

TipoMedicionCtrl.deleteTipoMedicion = async (req, res) => {
    await TipoMedicion.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'TipoMedicion Eliminada'})
};

module.exports = TipoMedicionCtrl;