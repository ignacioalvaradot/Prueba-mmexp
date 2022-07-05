const ExpVisCtrl = {};
const Experimento = require('../models/Experimento');
const Fase = require('../models/Fase');
const Grupo = require('../models/Grupo');
const Participante = require('../models/Participante');
const Medicion = require('../models/Medicion');


ExpVisCtrl.getVisExp = async (req, res) => {
     experimento = await Experimento.findById(req.params.idExp)
     fase = await Fase.find({'_id':req.params.idFase})
    for ( var i in fase){
        fase[i]['idGrupos'] = await Grupo.find().where('_id').in(fase[i].idGrupos);
        fase[i]['idMediciones'] = await Medicion.find().where('_id').in(fase[i].idMediciones);
        for(var j in fase[i].idGrupos){
           fase[i].idGrupos[j]['participantes'] = await Participante.find().where('_id').in(fase[i].idGrupos[j].participantes);
        } 
        
    }
     

    
    //const participante = await Participante.findById(grupo.participantes) 
    res.json({experimento,fase});
    
    
    
    
};

module.exports = ExpVisCtrl;