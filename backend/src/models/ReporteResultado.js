// Una vez definido el esquema, puedo consultar modelo de datos
const { Schema, model } = require('mongoose');

// Definir esquema de datos
const RResultadoSchema = new Schema({
    idMetricasMM: {
        type: String,
        required: true 
    },
    metricasTotales: [],
}, {
    timestamps: true
});

// Nombre del modelo, que utilizara el esquema configurado
module.exports = model('ReporteResultado', RResultadoSchema);