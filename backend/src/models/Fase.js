// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const fasesSchema = new Schema({
    // idExperimento: {
    //     type: Schema.ObjectId, 
    //     ref: "Experimento",
    //     required: true 
    // },
    //tiempo inicio y fin deben ser String, cambiar dependencias
    numeroFase: {
        type: Number,
        required: true
    },
    descripcion: String,

    // fechaFase: {
    //     type: Date,
    //     default: Date.now
    // },
    
    fechaFase: String,

    tiempoInicio: {
        type: Number,
        required: true
    },
    tiempoFin: {
        type: Number,
        required: true
    },
    enlaceDocumentos: String,
    // estadoFase: {
    //     type: String,
    // },
    idMediciones: [],
    idObservaciones: [],
    idGrupos: [],
    
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('Fase', fasesSchema);