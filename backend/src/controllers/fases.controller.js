const fasesCtrl = {};

const Fase = require('../models/Fase');
const FaseModel = require('../models/Fase');

fasesCtrl.getFases = async (req, res) => {
    const fases = await FaseModel.find();
    res.json(fases);
}

fasesCtrl.createFase = async (req, res) => {
    const { numeroFase, fechaFase, tiempoInicio, tiempoFin, enlaceDocumentos, estadoFase } = req.body;
    const newFase = new Fase({
        numeroFase: numeroFase,
        fechaFase: fechaFase,
        tiempoInicio: tiempoInicio,
        tiempoFin: tiempoFin,
        enlaceDocumentos: enlaceDocumentos,
        estadoFase: estadoFase
    });
    await newFase.save();
    res.json({mensaje: 'Fase Guardada'});
};

fasesCtrl.getFase = async (req, res) => {
    const fase = await Fase.findById(req.params.id)
    res.json({ fase });
};

fasesCtrl.updateFase = async (req, res) => {
    const { numeroFase, enlaceDocumentos, estadoFase } = req.body;
    await Fase.findOneAndUpdate({_id: req.params.id}, {
        numeroFase,
        enlaceDocumentos,
        estadoFase
    });
    res.json({mensaje: 'Fase Actualizada'});
};

fasesCtrl.updateFaseMediciones = async (req, res) => {
    const { idMediciones } = req.body;
    await Fase.findOneAndUpdate({_id: req.params.id}, {
        idMediciones
    });
    res.json({mensaje: 'Mediciones agregadas a la Fase'});
}

fasesCtrl.updateFaseObservaciones = async (req, res) => {
    const { idObservaciones } = req.body;
    await Fase.findOneAndUpdate({_id: req.params.id}, {
        idObservaciones
    });
    res.json({mensaje: 'Observaciones agregadas a la Fase'});
}

fasesCtrl.updateFaseGrupos = async (req, res) => {
    const { idGrupos } = req.body;
    await Fase.findOneAndUpdate({_id: req.params.id}, {
        idGrupos
    });
    res.json({mensaje: 'Grupos agregados a la Fase'});
}


fasesCtrl.deleteFase = async (req, res) => {
    await Fase.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Fase Eliminada'})
};

module.exports = fasesCtrl;