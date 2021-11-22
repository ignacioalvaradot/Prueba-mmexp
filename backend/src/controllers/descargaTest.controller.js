const DescargaTestCtrl = {};
const DescargaTest = require('../models/DescargaTest');

DescargaTestCtrl.getDescargaTests = async (req, res) => {
    const descarga = await DescargaTest.find();
    res.json(descarga);
};

DescargaTestCtrl.createDescargaTest = async (req, res) => {
    // console.log(req.body)
    const data = req.body;
    const descargaNueva = new DescargaTest({data});
    await descargaNueva.save();
    res.json('Ok');
};

DescargaTestCtrl.getDescargaTest = async (req, res) => {
    const descarga = await DescargaTest.findById(req.params.id)
    res.json({ descarga });
};

DescargaTestCtrl.updateDescargaTest = async (req, res) => {
    const { mensaje } = req.body;
    await DescargaTest.findOneAndUpdate({_id: req.params.id}, {
        mensaje
    });
    res.json({mensaje: 'DescargaTest Actualizado'});
};

DescargaTestCtrl.deleteDescargaTest = async (req, res) => {
    await DescargaTest.findByIdAndDelete(req.params.id);
    res.json('DescargaTest Eliminado');
};

// para actualizar o editar, se usa lo mismo que notes.controller.js

module.exports = DescargaTestCtrl;