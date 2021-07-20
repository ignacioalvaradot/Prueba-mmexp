// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const tipoMedicionSchema = new Schema({
    idTipoMedicion: {
        type: String, 
        required: true 
    },
    codTipoMedicionMM: {
        type: String, 
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
module.exports = model('TipoMedicion', tipoMedicionSchema);