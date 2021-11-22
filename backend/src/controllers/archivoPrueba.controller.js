const ArchivoPruebaCtrl = {};

const ArchivoPrueba = require('../models/ArchivoPrueba');
const ArchivoPruebaModel = require('../models/ArchivoPrueba');

ArchivoPruebaCtrl.getArchivos = async (req, res) => {
    const archivoPrueba = await ArchivoPruebaModel.find();
    res.json(archivoPrueba);
}

ArchivoPruebaCtrl.createArchivo = async (req, res) => {
    const { medicion } = req.body;
    const newArchivo = new ArchivoPrueba({
        medicion: medicion
    });
    console.log(req.file);
    if(req.file){
        newArchivo.archivo = req.file.path
    }
    await newArchivo.save();
    res.json({mensaje: 'ArchivoPrueba Creado'});
};

ArchivoPruebaCtrl.getArchivopost = async (req, res) => {
    const { medicion } = req.body;
    const archivoPrueba = await ArchivoPrueba.findOne({medicion: medicion});
    res.json({ archivoPrueba });
};

ArchivoPruebaCtrl.updateArchivo = async (req, res) => {
    const { archivo } = req.body;
    await ArchivoPrueba.findOneAndUpdate({_id: req.params.id}, {
        archivo
    });
    res.json({mensaje: 'ArchivoPrueba Actualizado'});
};

ArchivoPruebaCtrl.deleteArchivo = async (req, res) => {
    await ArchivoPrueba.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'ArchivoPrueba Eliminado'})
};

module.exports = ArchivoPruebaCtrl;