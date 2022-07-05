const MedicionCtrl = {};

const Medicion = require('../models/Medicion');
const MedicionModel = require('../models/Medicion');

MedicionCtrl.getMediciones = async (req, res) => {
    const mediciones = await MedicionModel.find();
    res.json(mediciones);
}

MedicionCtrl.createMedicion = async (req, res) => {
    const { idTipoMedicion, nombre, url, dispositivosAsociados } = req.body;
    // let nuevosDispositivos = new Array();
    const newMedicion = new Medicion({
        idTipoMedicion: idTipoMedicion,
        // idParticipante: idParticipante,
        nombre: nombre,
        url: url,
        dispositivosAsociados: dispositivosAsociados
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

MedicionCtrl.updateMedicionDispositivos = async (req, res) => {
    const { dispositivosAsociados } = req.body;
    await Medicion.findOneAndUpdate({_id: req.params.id}, {
        dispositivosAsociados
    });
    res.json({mensaje: 'Dispositivos de la Medicion Actualizados'});
};

MedicionCtrl.deleteMedicion = async (req, res) => {
    await Medicion.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Medicion Eliminada'})
};

module.exports = MedicionCtrl;