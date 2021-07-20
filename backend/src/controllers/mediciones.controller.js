const MedicionCtrl = {};

const Medicion = require('../models/Medicion');
const MedicionModel = require('../models/Medicion');

MedicionCtrl.getMediciones = async (req, res) => {
    const mediciones = await MedicionModel.find();
    res.json(mediciones);
}

MedicionCtrl.createMedicion = async (req, res) => {
    const { idTipoMedicion, nombre } = req.body;
    const newMedicion = new Medicion({
        idTipoMedicion: idTipoMedicion,
        // idParticipante: idParticipante,
        nombre: nombre,
        // tiempo: tiempo
    });
    await newMedicion.save();
    res.json({mensaje: 'Medicion Guardada'});
};

MedicionCtrl.getMedicion = async (req, res) => {
    const medicion = await Medicion.findById(req.params.id)
    res.json({ medicion });
};

MedicionCtrl.updateMedicion = async (req, res) => {
    const { idTipoMedicion, idParticipante, nombre } = req.body;
    await Medicion.findOneAndUpdate({_id: req.params.id}, {
        idTipoMedicion,
        // idParticipante,
        nombre
    });
    res.json({mensaje: 'Medicion Actualizada'});
};

MedicionCtrl.deleteMedicion = async (req, res) => {
    await Medicion.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Medicion Eliminada'})
};

module.exports = MedicionCtrl;