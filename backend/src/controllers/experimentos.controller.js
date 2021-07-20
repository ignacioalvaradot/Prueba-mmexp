const ExpCtrl = {};

const Experimento = require('../models/Experimento');
const ExpModel = require('../models/Experimento');

ExpCtrl.getExp = async (req, res) => {
    const experimentos = await ExpModel.find();
    res.json(experimentos);
}

ExpCtrl.createExp = async (req, res) => {
    const { nombreExp, descripcion } = req.body;
    const newExperimento = new Experimento({
        nombreExp: nombreExp,
        descripcion: descripcion,
    });
    await newExperimento.save();
    res.json({mensaje: 'Experimento Guardado'});
};


ExpCtrl.getExps = async (req, res) => {
    const experimento = await Experimento.findById(req.params.id)
    res.json({ experimento });
};

ExpCtrl.updateExp = async (req, res) => {
    const { nombreExp, descripcion } = req.body;
    await Experimento.findOneAndUpdate({_id: req.params.id}, {
        nombreExp,
        descripcion
    });
    res.json({mensaje: 'Experimento Actualizado'});
};

ExpCtrl.updateExpFase = async (req, res) => {
    const { fasesId } = req.body;
    await Experimento.findOneAndUpdate({_id: req.params.id}, {
        fasesId
    });
    res.json({mensaje: 'Fase Agregada'});
};

ExpCtrl.deleteExp = async (req, res) => {
    await Experimento.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Experimento Eliminado'})
};

module.exports = ExpCtrl;