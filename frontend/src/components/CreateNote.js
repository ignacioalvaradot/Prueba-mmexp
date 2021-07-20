import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state= {
        users: [],
        userSelected: '',
        titulo: '',
        contenido: '',
        date: new Date(),
        editando: false,
        _id: ''
    }

    async componentDidMount() {
        //console.log(this.props.match.params) <- rescatar id url
        const res = await axios.get('http://localhost:81/api/users');
        this.setState({
            users: res.data.map(user => user.nombreUsuario),
            userSelected: res.data[0].nombreUsuario
        });
        if (this.props.match.params.id) {
            const res = await axios.get('http://localhost:81/api/notes/' + this.props.match.params.id);
            // console.log(res.data.note);
            this.setState({
                titulo: res.data.note.titulo,
                contenido: res.data.note.contenido,
                date: new Date(res.data.note.fecha),
                userSelected: res.data.note.autor,
                editando: true,
                _id: this.props.match.params.id
            })
        }
    }

    onSubmit = async (e) =>{
        e.preventDefault();
        const nuevaNota = {
            titulo: this.state.titulo,
            contenido: this.state.contenido,
            fecha: this.state.date,
            autor: this.state.userSelected
        }
        if (this.state.editando){
            await axios.put('http://localhost:81/api/notes/' + this.state._id, nuevaNota);
        }else{
            await axios.post('http://localhost:81/api/notes', nuevaNota);
        }
        // console.log(res)
        // console.log(this.state.titulo, this.state.contenido);
        window.location.href="/";
    }

    //cada vez que cambie un estado, utilizare esta funcion que toma nombre x valor
    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({date});
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear una nota</h4>

                    {/* Select User - Posiblemente guardar usuario en Session o cookie*/}
                    <div className="form-group separate">
                        <select
                            className="form-control"
                            name="userSelected"
                            onChange={this.onInputChange}
                            value={this.state.userSelected}
                        >
                            {
                                this.state.users.map(user => 
                                <option key={user} value={user}>
                                    {user}
                                </option>)
                            }
                        </select>
                    </div>

                    <div className="form-group separate">
                        <input type="text" className="form-control" placeholder="Titulo" name="titulo" required onChange={this.onInputChange} value={this.state.titulo}/>
                    </div>

                    <div className="form-group separate">
                        <textarea name="contenido" className="form-control" placeholder="contenido" onChange={this.onInputChange} value={this.state.contenido}>

                        </textarea>
                    </div>

                    <div className="form-group separate">
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
