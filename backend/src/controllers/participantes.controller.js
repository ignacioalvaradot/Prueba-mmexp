const ParticipanteCtrl = {};

const Participante = require('../models/Participante');
const ParticipanteModel = require('../models/Participante');

ParticipanteCtrl.getParticipantes = async (req, res) => {
    const participantes = await ParticipanteModel.find();
    res.json(participantes);
}

ParticipanteCtrl.createParticipante = async (req, res) => {
    const {dispositivos, descripcion } = req.body;
    const newParticipante = new Participante({
        // idParticipanteMM: idParticipanteMM,
        dispositivos: dispositivos,
        descripcion: descripcion
    });
    await newParticipante.save();
    res.json({mensaje: newParticipante._id});
};

ParticipanteCtrl.getParticipante = async (req, res) => {
    const participante = await Participante.findById(req.params.id)
    res.json({ participante });
};

ParticipanteCtrl.updateParticipante = async (req, res) => {
    const { dispositivos, descripcion } = req.body;
    await Participante.findOneAndUpdate({_id: req.params.id}, {
        dispositivos,
        descripcion
    });
    res.json({mensaje: 'Participante Actualizado'});
};

ParticipanteCtrl.updateDispositivos = async (req, res) => {
    const { dispositivos } = req.body;
    await Participante.findOneAndUpdate({_id: req.params.id}, {
        dispositivos
    });
    res.json({mensaje: 'Asignaciones Dispositivos Actualizados'});
};

ParticipanteCtrl.deleteParticipante = async (req, res) => {
    await Participante.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Participante Eliminado'})
};

module.exports = ParticipanteCtrl;