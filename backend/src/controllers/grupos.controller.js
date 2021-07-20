const GrupoCtrl = {};

const Grupo = require('../models/Grupo');
const GrupoModel = require('../models/Grupo');

GrupoCtrl.getGrupos = async (req, res) => {
    const grupos = await GrupoModel.find();
    res.json(grupos);
}

GrupoCtrl.createGrupo = async (req, res) => {
    const { idFase, participantes, descripcion } = req.body;
    const newGrupo = new Grupo({
        idFase: idFase,
        participantes: participantes,
        descripcion: descripcion
    });
    await newGrupo.save();
    res.json({mensaje: 'Grupo Guardada'});
};

GrupoCtrl.getGrupo = async (req, res) => {
    const grupo = await Grupo.findById(req.params.id)
    res.json({ grupo });
};

GrupoCtrl.updateGrupo = async (req, res) => {
    const { idFase, participantes, descripcion } = req.body;
    await Grupo.findOneAndUpdate({_id: req.params.id}, {
        idFase,
        participantes,
        descripcion
    });
    res.json({mensaje: 'Grupo Actualizada'});
};

GrupoCtrl.deleteGrupo = async (req, res) => {
    await Grupo.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Grupo Eliminada'})
};

module.exports = GrupoCtrl;