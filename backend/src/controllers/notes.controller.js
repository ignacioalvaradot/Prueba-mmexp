const notesCtrl = {};

const Note = require('../models/Note');
const NoteModel = require('../models/Note');

notesCtrl.getNotes = async (req, res) => {
    const notes = await NoteModel.find();
    res.json(notes);
}

notesCtrl.createNote = async (req, res) => {
    const { titulo, contenido, fecha, autor } = req.body;
    const newNote = new Note({
        titulo: titulo,
        contenido: contenido,
        fecha: fecha,
        autor: autor
    });
    await newNote.save();
    res.json({mensaje: 'Nota Guardada'});
};


notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id)
    console.log(note);
    res.json({ note });
};

notesCtrl.updateNote = async (req, res) => {
    const { titulo, contenido, autor } = req.body;
    await Note.findOneAndUpdate({_id: req.params.id}, {
        titulo,
        contenido,
        autor
    });
    res.json({mensaje: 'Nota Actualizada'});
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json({mensaje: 'Nota Eliminada'})
};

module.exports = notesCtrl;