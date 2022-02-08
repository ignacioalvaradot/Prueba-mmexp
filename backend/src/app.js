//Importar y definir el servidor mediante express
const express = require('express');
const cors = require('cors');
const app = express();

// settings
 app.set('port', 81);
//cambiar para dockers
//app.set('port', process.env.PORT || 80);

// middlewares = definir funciones antes de las rutas
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', require('./routes/users'));
app.use('/api/experimentos', require('./routes/experimentos'));
app.use('/api/experimentosVis', require('./routes/experimentosVis'));
app.use('/api/fases', require('./routes/fases'));
app.use('/api/mediciones', require('./routes/mediciones'));
app.use('/api/tipoMediciones', require('./routes/tipoMediciones'));
app.use('/api/observaciones', require('./routes/observaciones'));
app.use('/api/participantes', require('./routes/participantes'));
app.use('/api/grupos', require('./routes/grupos'));
app.use('/api/dispositivos', require('./routes/dispositivos'));
app.use('/api/tipoDispositivo', require('./routes/tipoDispositivo'));
app.use('/api/reporteResultados', require('./routes/reporteResultados'));
app.use('/api/descargaTest', require('./routes/descargaTest'));
app.use('/api/archivos', require('./routes/archivoPrueba'));
app.use('/src/uploads', express.static('src/uploads'));
// - Variables globales o validaciones - 
module.exports = app;