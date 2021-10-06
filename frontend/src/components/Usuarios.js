import React, { useEffect, useState, useRef } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios'

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        getUsers();
        let users = usuarios;
        console.log(users);

        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        // setActualizarTabla(!actualizarTabla);
        // const url = () => {
        //     const urlconsulta = location.pathname.split('/gestionarUsuarios/');

        //     setUrlConsulta(urlconsulta);
        // };
        // url();
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const getUsers = async () => {
        const res = await axios.get('http://localhost:81/api/users');
        setUsuarios(res.data);
    }

    const onChangeUsername = (e) => {
        setNombreUsuario(e.target.value);
        console.log(e.target.value);
    }

    const onSubmit = async e => {
        e.preventDefault();
        let nuevoNombreUsuario = {
            nombreUsuario: nombreUsuario
        }
        await axios.post('http://localhost:81/api/users', nuevoNombreUsuario)
        setNombreUsuario('')
        getUsers();
    }

    const deleteUser = async (idUsuario) => {
        await axios.delete('http://localhost:81/api/users/' + idUsuario);
        getUsers();
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Crear nuevo Usuario</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                value={nombreUsuario}
                                onChange={onChangeUsername}
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
                        usuarios.map(user => (
                            <li
                                className="list-group-item list-group-item-action"
                                key={user._id}
                                onDoubleClick={() => deleteUser(user._id)}
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
