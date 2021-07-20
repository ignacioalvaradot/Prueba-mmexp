const ObservacionCtrl = {};

const Observacion = require('../models/Observacion');
const ObservacionModel = require('../models/Observacion');

ObservacionCtrl.getObservaciones = async (req, res) => {
    const observaciones = await ObservacionModel.find();
    res.json(observaciones);
}

ObservacionCtrl.createObservacion = async (req, res) => {
    const { idExperimento, descripcion, tiempo } = req.body;
    const newMObservacion = new Observacion({
        idExperimento: idExperimento,
        descripcion: descripcion,
        tiempo: tiempo
    });
    await newMObservacion.save();
    res.json({mensaje: 'Observacion Guardada'});
};

ObservacionCtrl.getObservacion = async (req, res) => {
    const observacion = await Observacion.findById(req.params.id)
    res.json({ observacion });
};

ObservacionCtrl.updateObservacion = async (req, res) => {
    const { idExperimento, descripcion, tiempo } = req.body;
    await Observacion.findOneAndUpdate({_id: req.params.id}, {
        idExperimento,
        descripcion,
        tiempo
    });
    res.json({mensaje: 'Observacion Actualizada'});
};

ObservacionCtrl.deleteObservacion = async (req, res) => {
    await Observacion.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Observacion Eliminada'})
};

module.exports = ObservacionCtrl;