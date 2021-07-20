// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const experimentoSchema = new Schema({
    nombreExp: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fasesId: [],
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('Experimento', experimentoSchema);