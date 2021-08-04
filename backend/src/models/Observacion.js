// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const observacionSchema = new Schema({
    idFase: {
        type: Schema.ObjectId, 
        ref: "Fase",
        required: true 
    },
    descripcion: {
        type: String,
        required: true
    },
    tiempo: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('Observacion', observacionSchema);