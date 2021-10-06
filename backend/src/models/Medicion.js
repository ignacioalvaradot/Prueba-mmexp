// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const medicionSchema = new Schema({
    // idTipoMedicion: {
    //     type: Schema.ObjectId, 
    //     ref: "TipoMedicion",
    //     required: true 
    // },
    idTipoMedicion: {
        type: String, 
        required: true 
    },
    // idParticipante: {
    //     type: Schema.ObjectId, 
    //     ref: "Participante",
    //     required: true 
    // },
    nombre: {
        type: String,
        required: true
    },
    tiempo: {
        type: Number
    },
    dispositivosAsociados: []
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('Medicion', medicionSchema);