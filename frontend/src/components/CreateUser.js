import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {
    
    state = {
        users: [],
        nombreUsuario: ''
    }

    async componentDidMount() {
        this.getUsers();
        console.log(this.state.users);
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:81/api/users');
        this.setState({ users: res.data });
    }

    onChangeUsername = (e) => {
        this.setState({
            nombreUsuario: e.target.value
        })
    }

    onSubmit  = async e => {
        e.preventDefault();
        await axios.post('http://localhost:81/api/users', {
            nombreUsuario: this.state.nombreUsuario
        })
        this.setState({nombreUsuario: ''});
        this.getUsers();
    }

    deleteUser = async (id) => {
        await axios.delete('http://localhost:81/api/users/' + id);
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Crear nuevo Usuario</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={this.state.nombreUsuario} 
                                    onChange={this.onChangeUsername} 
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li 
                                    className="list-group-item list-group-item-action" 
                                    key={user._id}
                                    onDoubleClick={() => this.deleteUser(user._id)}
                                    >
                                    {user.nombreUsuario}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
