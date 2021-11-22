// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const archivoPruebaSchema = new Schema({
    // medicion, correoUsuario, archivo, idExperimento, idFase, idGrupos, Participantes tiene -> Dispositivos y canales
    archivo: {
        type: String, 
    },
    // idExperimento: {
    //     type: String,
    // },
    faseId: {
        type: String,
    },
    // idGrupos: {
    //     type: String,
    // },
    // Participantes: {
    //     type: String,
    // },
    medicion: {
        type: String,
    },
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('ArchivoPrueba', archivoPruebaSchema);