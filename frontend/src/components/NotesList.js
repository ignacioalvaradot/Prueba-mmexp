import axios from 'axios'
import React, { Component } from 'react'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'

export default class NotesList extends Component {
    
    state = {
        notes: []
    }
    
    componentDidMount() {
        this.getNotes();
    }

    deleteNote = async (id) => {
        await axios.delete('http://localhost:81/api/notes/' + id);
        this.getNotes();
    }

    async getNotes() {
        const res = await axios.get('http://localhost:81/api/notes');
        this.setState({notes: res.data});
    }

    render() {
        return (
            <div className="row">
                {                
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.titulo}</h5>
                                    <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                                        Editar
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{note.contenido}</p>
                                    <p>{note.autor}</p>
                                    <p>{format(note.date)}</p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Borrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
