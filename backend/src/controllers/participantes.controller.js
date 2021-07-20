const ParticipanteCtrl = {};

const Participante = require('../models/Participante');
const ParticipanteModel = require('../models/Participante');

ParticipanteCtrl.getParticipantes = async (req, res) => {
    const participantes = await ParticipanteModel.find();
    res.json(participantes);
}

ParticipanteCtrl.createParticipante = async (req, res) => {
    const { idParticipanteMM, idGrupo, numeroSerie, descripcion } = req.body;
    const newParticipante = new Participante({
        idParticipanteMM: idParticipanteMM,
        idGrupo: idGrupo,
        numeroSerie: numeroSerie,
        descripcion: descripcion
    });
    await newParticipante.save();
    res.json({mensaje: 'Participante Guardada'});
};

ParticipanteCtrl.getParticipante = async (req, res) => {
    const participante = await Participante.findById(req.params.id)
    res.json({ participante });
};

ParticipanteCtrl.updateParticipante = async (req, res) => {
    const { idParticipanteMM, idGrupo, numeroSerie, descripcion } = req.body;
    await Participante.findOneAndUpdate({_id: req.params.id}, {
        idParticipanteMM,
        idGrupo,
        numeroSerie,
        descripcion
    });
    res.json({mensaje: 'Participante Actualizada'});
};

ParticipanteCtrl.deleteParticipante = async (req, res) => {
    await Participante.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Participante Eliminada'})
};

module.exports = ParticipanteCtrl;