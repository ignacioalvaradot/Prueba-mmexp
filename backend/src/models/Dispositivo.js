// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const dispositivoSchema = new Schema({
    nombre: {
        type: String, 
        required: true 
    },
    canales: {
        type: Number,
        required: true 
    },
    // modelo: {
    //     type: String,
    //     required: true
    // },
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('Dispositivo', dispositivoSchema);