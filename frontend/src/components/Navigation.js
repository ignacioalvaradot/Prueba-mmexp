import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import useAuth from './auth/useAuth'
import roles from '../helpers/roles';
import { useState } from 'react';
import { useEffect } from 'react';


// export default class Navigation extends Component {
// let estadoNav = false;
// let estadoCompleto = true;
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
                    Plataforma MMLA
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

                                {/* <li className="nav-item">
                            <Link className="nav-link" to="/planificacion/60dfb8ba56b0354b1c20c77f">Planificación Exp</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/preparacionConfig/60dfb8ba56b0354b1c20c77f">Preparación Exp - Config</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/preparacionVerific/60dfb8ba56b0354b1c20c77f">Preparación Exp - Verific</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ejecucion/60dfb8ba56b0354b1c20c77f">Ejecución Exp</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/analisis/60dfb8ba56b0354b1c20c77f">Análisis Exp</Link>
                        </li> */}
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

// render() {


//     return (
//         <nav className="navbar navbar-expand-lg navbar-white bg-white">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/inicio">
//                     Plataforma MMLA
//                 </Link>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/inicio">Inicio</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/gestionarUsuarios">Usuarios</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/experimentos/">Experimentos</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/planificacion/60dfb8ba56b0354b1c20c77f">Planificación Exp</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/preparacion/60dfb8ba56b0354b1c20c77f">Preparación Exp</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/preparacionConfig/60dfb8ba56b0354b1c20c77f">Preparación Exp - Config</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/preparacionVerific/60dfb8ba56b0354b1c20c77f">Preparación Exp - Verific</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/ejecucion/60dfb8ba56b0354b1c20c77f">Ejecución Exp</Link>
//                         </li>

//                         <li className="nav-item">
//                             <Link className="nav-link" to="/analisis/60dfb8ba56b0354b1c20c77f">Análisis Exp</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/testSocket">Test WebSocket</Link>
//                         </li>

//                         <li className="nav-item">
//                             <Link className="nav-link" onClick={logout}>Cerrar Sesión</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     )
// }
// }
