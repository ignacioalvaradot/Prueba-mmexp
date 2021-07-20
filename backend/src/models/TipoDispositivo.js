// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const tipoDispositivoSchema = new Schema({
    modelo: {
        type: String, 
        required: true 
    },
    marca: {
        type: String, 
        required: true 
    },
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('TipoDispositivo', tipoDispositivoSchema);