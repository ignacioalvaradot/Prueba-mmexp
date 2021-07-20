const RResultadoCtrl = {};

const RResultados = require('../models/ReporteResultado');
const RResultadosModel = require('../models/ReporteResultado');

RResultadoCtrl.getRResultados = async (req, res) => {
    const rresultados = await RResultadosModel.find();
    res.json(rresultados);
}

RResultadoCtrl.createRResultado = async (req, res) => {
    const { idMetricasMM, metricasTotales } = req.body;
    const newRResultado = new RResultados({
        idMetricasMM: idMetricasMM,
        metricasTotales: metricasTotales
    });
    await newRResultado.save();
    res.json({mensaje: 'RResultados Guardada'});
};

RResultadoCtrl.getRResultado = async (req, res) => {
    const rresultado = await RResultados.findById(req.params.id)
    res.json({ rresultado });
};

RResultadoCtrl.updateRResultado = async (req, res) => {
    const { idMetricasMM, metricasTotales } = req.body;
    await RResultados.findOneAndUpdate({_id: req.params.id}, {
        idMetricasMM,
        metricasTotales
    });
    res.json({mensaje: 'RResultados Actualizada'});
};

RResultadoCtrl.deleteRResultado = async (req, res) => {
    await RResultados.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'RResultados Eliminada'})
};

module.exports = RResultadoCtrl;