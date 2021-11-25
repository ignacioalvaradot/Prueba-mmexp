import React, { useEffect, useState } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import routesBD, {rutasFront} from '../helpers/routes';

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [correo, setCorreo] = useState('');

    useEffect(() => {
        getUsers();

        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const getUsers = async () => {
        const res = await axios.get(routesBD.users);
        setUsuarios(res.data);
    }

    const onChangeUsername = (e) => {
        setNombreUsuario(e.target.value);
    }
    const onChangeTipoUsuario = (e) => {
        setTipoUsuario(e.target.value);
    }
    const onChangeContraseña = (e) => {
        setContraseña(e.target.value);
    }
    const onChangeCorreo = (e) => {
        setCorreo(e.target.value);
    }

    const onSubmit = async e => {
        e.preventDefault();
        let nuevoNombreUsuario = {
            nombreUsuario: nombreUsuario,
            tipoUsuario: 'regular',
            contraseña: contraseña,
            correo: correo
        }
        await axios.post(routesBD.users, nuevoNombreUsuario)
        setNombreUsuario('');
        setContraseña('');
        setTipoUsuario('');
        setCorreo('');
        getUsers();
    }

    const onUpdate = async (e) => {
        e.preventDefault();
        // console.log(e.target[0].value);
        // console.log(e.target[1].name);
        // console.log(e.target[1].value);
        // console.log(e.target[2].value);
        let actualizarUsuario = {
            tipoUsuario: e.target[0].value,
            nombreUsuario: e.target[1].value,
            contraseña: e.target[2].value,
            correo: e.target[3].value
        }
        // console.log('actualizarUsuario', actualizarUsuario);
        await axios.put(routesBD.users + e.target[1].name, actualizarUsuario);
        getUsers();
    }

    const deleteUser = async (idUsuario) => {
        await axios.delete(routesBD.users + idUsuario);
        getUsers();
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Crear nuevo Usuario</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <h5>Nombre Usuario</h5>
                            <input
                                type="text"
                                className="form-control"
                                value={nombreUsuario}
                                onChange={onChangeUsername}
                            />
                        </div>
                        <div className="form-group">
                            <h5>Contraseña</h5>
                            <input
                                type="text"
                                className="form-control"
                                value={contraseña}
                                onChange={onChangeContraseña}
                            />
                        </div>
                        <div className="form-group">
                            <h5>Tipo Usuario</h5>
                            <input
                                type="text"
                                className="form-control"
                                value={tipoUsuario}
                                onChange={onChangeTipoUsuario}
                            />
                        </div>
                        <div className="form-group">
                            <h5>Correo</h5>
                            <input
                                type="text"
                                className="form-control"
                                value={correo}
                                onChange={onChangeCorreo}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{ margin: 3 }}
                        >
                            Guardar
                        </Button>
                    </form>
                </div>
            </div>
            <div className="col-md-8">
                <ul className="list-group">
                    <li
                        className="list-group-item list-group-item-action"
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={2}>
                                <h6>Tipo Usuario</h6>
                            </Grid>
                            <Grid item xs={3}>
                                <h6>Nombre Usuario</h6>
                            </Grid>
                            <Grid item xs={2}>
                                <h6>Contraseña</h6>
                            </Grid>
                            <Grid item xs={3}>
                                <h6>Correo</h6>
                            </Grid>
                            <Grid item xs={2}>
                                <h6>Acción</h6>
                            </Grid>
                        </Grid>
                    </li>
                    {
                        usuarios.map(user => (
                            <li
                                className="list-group-item list-group-item-action"
                                key={user._id}
                            >
                                <form onSubmit={onUpdate}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={2}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue={user.tipoUsuario}
                                                // onChange={user.tipoUsuario}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue={user.nombreUsuario}
                                                    name={user._id}
                                                // onChange={user.nombreUsuario}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue={user.contraseña}
                                                // onChange={user.contraseña}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    defaultValue={user.correo}
                                                // onChange={user.contraseña}
                                                />
                                            </div>
                                        </Grid>

                                        <Grid item xs={2}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                style={{ margin: 3 }}
                                            >
                                                Guardar
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                style={{ margin: 3 }}
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
