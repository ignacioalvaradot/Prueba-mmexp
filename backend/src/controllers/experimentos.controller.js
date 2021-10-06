const ExpCtrl = {};

const Experimento = require('../models/Experimento');
const ExpModel = require('../models/Experimento');

ExpCtrl.getExp = async (req, res) => {
    const experimentos = await ExpModel.find();
    res.json(experimentos);
}

ExpCtrl.createExp = async (req, res) => {
    const { estado, nombreExp, fasesId } = req.body;
    const newExperimento = new Experimento({
        estado: estado,
        nombreExp: nombreExp,
        // descripcion: descripcion,
        fasesId: fasesId,
        faseActiva: 0,
    });
    await newExperimento.save();
    res.json({mensaje: newExperimento._id});
};


ExpCtrl.getExps = async (req, res) => {
    const experimento = await Experimento.findById(req.params.id)
    res.json({ experimento });
};

ExpCtrl.getExperimentos = async (req, res) => {
    const estado  = req.params.tipoExp
    // console.log(estado)
    const experimento = await Experimento.find({estado: estado})
    res.json({ experimento });
};


ExpCtrl.updateExp = async (req, res) => {
    const { nombreExp, estado } = req.body;
    await Experimento.findOneAndUpdate({_id: req.params.id}, {
        nombreExp,
        estado
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

ExpCtrl.updateFaseActiva = async (req, res) => {
    const { faseActiva } = req.body;
    await Experimento.findOneAndUpdate({_id: req.params.id}, {
        faseActiva
    });
    res.json({mensaje: 'Fase Activa Agregada'});
};

ExpCtrl.deleteExp = async (req, res) => {
    await Experimento.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Experimento Eliminado'})
};

module.exports = ExpCtrl;