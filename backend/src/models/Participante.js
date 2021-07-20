// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const participanteSchema = new Schema({
    idParticipanteMM: {
        type: Schema.ObjectId, 
        ref: "Participante",
        required: true 
    },
    idGrupo: {
        type: Schema.ObjectId, 
        ref: "Grupo",
        required: true 
    },
    numeroSerie: {
        type: Schema.ObjectId, 
        ref: "Dispositivo",
        required: true 
    },
    descripcion: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('Participante', participanteSchema);