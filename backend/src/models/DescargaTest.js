// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const descargaTestSchema = new Schema({
    // medicion, correoUsuario, archivo, idExperimento, idFase, idGrupos, Participantes tiene -> Dispositivos y canales
    data: {}
},{
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('DescargaTest', descargaTestSchema);