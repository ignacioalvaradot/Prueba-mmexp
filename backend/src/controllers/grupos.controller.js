const GrupoCtrl = {};

const Grupo = require('../models/Grupo');
const GrupoModel = require('../models/Grupo');

GrupoCtrl.getGrupos = async (req, res) => {
    const grupos = await GrupoModel.find();
    res.json(grupos);
}

GrupoCtrl.createGrupo = async (req, res) => {
    const { participantes, descripcion } = req.body;
    const newGrupo = new Grupo({
        participantes: participantes,
        descripcion: descripcion,
        dispositivos: [],
        // numeroSerie: numeroSerie
    });
    await newGrupo.save();
    res.json({mensaje: newGrupo._id});
};

GrupoCtrl.getGrupo = async (req, res) => {
    const grupo = await Grupo.findById(req.params.id)
    res.json({ grupo });
};

GrupoCtrl.updateGrupo = async (req, res) => {
    const { participantes, descripcion } = req.body;
    await Grupo.findOneAndUpdate({_id: req.params.id}, {
        participantes,
        descripcion,
        // numeroSerie
    });
    res.json({mensaje: 'Grupo Actualizada'});
};

GrupoCtrl.updateArrParticipantes = async (req, res) => {
    const { participantes } = req.body;
    await Grupo.findOneAndUpdate({_id: req.params.id}, {
        participantes
    });
    res.json({mensaje: 'Participantes agregados a la Fase'});
}

GrupoCtrl.updateDispositivos = async (req, res) => {
    const { dispositivos } = req.body;
    await Grupo.findOneAndUpdate({_id: req.params.id}, {
        dispositivos
    });
    res.json({mensaje: 'Dispositivos del Grupo Actualizados'});
}

GrupoCtrl.deleteGrupo = async (req, res) => {
    await Grupo.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Grupo Eliminada'})
};

module.exports = GrupoCtrl;