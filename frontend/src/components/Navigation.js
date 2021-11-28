/* eslint-disable */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import useAuth from './auth/useAuth'
import roles from '../helpers/roles';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Navigation() {
    const { user, logout } = useAuth();
    const [estadoNav, setEstadoNav] = useState(false);
    const [estadoCompleto, setEstadoCompleto] = useState(false);

    useEffect(() => {
        if (user != null) {
            setEstadoCompleto(true);
            if (user['role'] === 'admin') {
                setEstadoNav(true);
            } else {
                setEstadoNav(false);
            }
        } else {
            setEstadoCompleto(false);
        }
    }, [user]);


    return (
        <nav className="navbar navbar-expand-lg navbar-white bg-white">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/inicio">
                    MMExp - Plataforma de Experimentos Multimodales
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {
                    estadoCompleto ?
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/inicio">Inicio</Link>
                                </li>
                                {estadoNav ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/gestionarUsuarios">Usuarios</Link>
                                    </li>
                                    :
                                    <li>
                                    </li>
                                }

                                <li className="nav-item">
                                    <Link className="nav-link" onClick={logout}>Cerrar Sesión</Link>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        </div>
                }
            </div>
        </nav>
    )
}
