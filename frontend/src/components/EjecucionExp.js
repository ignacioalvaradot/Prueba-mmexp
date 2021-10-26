/* eslint-disable */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Backdrop, Fade, Modal } from '@material-ui/core/';
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";

import { Stepper, Step, StepButton, LinearProgress } from '@material-ui/core/'
import CancelIcon from '@material-ui/icons/Cancel';

import 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker} from '@material-ui/pickers';
import { es } from "date-fns/locale";
import io from 'socket.io-client';
import routesBD from '../helpers/routes';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    tabsStyles: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

// const hoy = new Date();

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


let barraProgreso;
let intervaloActualizacion;
let tiempoActual = new Date();
var socket;
var nombreMedicionVariable = 'Tabla General';

export default function EjecucionExp() {

    // const location = useLocation();
    const idUrl = useParams();
    const classes = useStyles();
    const [datos, setDatos] = useState({
        obs: '',
        horas: '',
        minutos: ''
    })
    const [open, setOpen] = React.useState(false);
    // const [urlconsulta, setUrlConsulta] = useState('');
    const [tab, setTab] = React.useState(0);
    // const [idmediciones, setIdmediciones] = React.useState('');
    const [nombreMediciones, setNombresMediciones] = React.useState([]);
    // const [minutosActual, setMinutos] = React.useState(hoy.getMinutes());
    const [idObserv, setIdObserv] = React.useState([]);
    const [faseActiva, setFaseActiva] = React.useState(0);
    const [nombreExp, setNombreExp] = React.useState('');
    const [idExp, setIdExp] = React.useState('');
    const [fasesExp, setFasesExp] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    // const [tiempoInicio, setTiempoInicio] = React.useState('');
    // const [tiempoFin, setTiempoFin] = React.useState('');
    const [tiempoDuracionSec, setTiempoDurSec] = React.useState(0);
    const [progreso, setProgreso] = React.useState(0);
    const [progresoTiempo, setProgresoTiempo] = React.useState(0);
    const [horas, setHoras] = React.useState(0);
    const [minutos, setMinuto] = React.useState(0);
    const [segundos, setSegundos] = React.useState(0);
    const [tiempoString, setTiempoString] = React.useState('');
    const [observacionesTabla, setObservacionesTabla] = React.useState([]);
    const [actualizarTabla, setActualizarTabla] = React.useState(false);
    const [horaInicio, setHoraInicio] = React.useState(new Date());
    const [tiempoInicioActual, setTiempoInicioActual] = useState('');
    const [tiempoFinActual, setTiempoFinActual] = useState('');
    // const [horasObs, setHorasObs] = useState('');
    // const [minutosObs, setMinutosObs] = useState('');
    const [arrMedicionesRecibidas, setArrMedicionesRecibidas] = useState([]);
    const [direccionFaseActiva, setDireccionFaseActiva] = useState(0);
    const [openModalContinuar, setOpenModalContinuar] = React.useState(false);
    const [cambiarBoton, setCambiarBoton] = React.useState(true);
    const [idExperimento, setIdExperimento] = React.useState('');
    const [banderaOvertime, setBanderaOvertime] = useState(true);
    const [banderaDetenido, setBanderaDetenido] = useState(true);
    // const [intervalId, setIntervalId] = useState(0);
    // const [intervalo, setIntervalo] = useState(1000);
    // const [estadoIntervaloActivo, setEstadoIntervaloActivo] = useState(true);
    // const [estadoDetenido, setEstadoDetenido] = useState(true);
    // const [estadoMediciones, setEstadoMediciones] = useState([]);
    const [medicionesGeneral, setMedicionesGeneral] = useState([]);
    // const [medicionesTabs, setMedicionesTabs] = useState([]);
    const [nombresMedicionesSocket, setNombresMedicionesSocket] = useState([]);
    const [conexionSockets, setConexionSockets] = useState([]);
    const [nombreMedicionActual, setNombreMedicionActual] = useState('Tabla General');
    // const [banderaTabla, setBanderaTabla] = useState(true);

    let progresoraro = progress;

    useEffect(() => {
        dataFase();
        intervaloProgreso();
        setActualizarTabla(!actualizarTabla);
        // const url = () => {
        //     const urlconsulta = location.pathname.split('/ejecucion/');

        //     setUrlConsulta(urlconsulta);
        // };
        // url();
        return () => clearInterval(barraProgreso);
    }, []);

    const intervaloProgreso = () => {
        barraProgreso = setInterval(() => {
            progresoraro = progresoraro + 1;
            setProgress(progresoraro);
        }, 1000);
    }

    const dataFase = async () => {
        const res = await axios.get(routesBD.experimentos + idUrl['id']);
        let faseActivaBD = parseInt(res.data.experimento.faseActiva)
        // console.log(faseActivaBD);
        setFaseActiva(faseActivaBD);
        setIdExperimento(idUrl['id']);
        // al cambiar la fase activa, no se actualiza el tiempo, traigo el primer tiempo y no lo cambia hasta que muevo la fase
        // setFaseActivaLocal(faseActivaBD)
        obtenerFases(res.data.experimento.fasesId);
        setNombreExp(res.data.experimento.nombreExp);
        setIdExp(res.data.experimento._id);
    };

    const obtenerFases = async (fases) => {
        let arrfases = fases;
        let arregloNFase = new Array;
        for (var i = 0; i < arrfases.length; i++) {
            let resF = await axios.get(routesBD.fases + arrfases[i]);
            arregloNFase.push(resF.data.fase);
        }
        setFasesExp(arregloNFase);
    }

    const traerMedicionesRegistrar = async (arregloNFase) => {
        let fase = arregloNFase;
        let arrTotalMediciones = new Array();
        let medicionesFase = fase['idMediciones'];
        let arrMediciones = new Array();

        for (let j = 0; j < medicionesFase.length; j++) {
            const resMediciones = await axios.get(routesBD.mediciones + medicionesFase[j]);
            resMediciones.data.medicion.estado = false;
            arrMediciones.push(resMediciones.data.medicion);
            //por cada medicion, yo debo traer los dispositivos que tengan el mismo tipo de dispositivo que los asociados dentro de cada grupo
        }
        arrTotalMediciones.push(arrMediciones);

        // setMedicionesFases(arrTotalMediciones);
        // setMedicionesSelected(arrTotalMediciones[0]);
        // traerGrupos(arregloNFase, arrTotalMediciones[0]);
        traerGruposParticipantes(arregloNFase, arrTotalMediciones[0]);
    }

    const traerMediciones = async (faseActual, fasesExpe) => {
        // de primera debe entrar la primera fase del experimento actual
        let medicionesFase = fasesExpe;
        let arrNombreMediciones = new Array();
        let arrMediciones = arrMedicionesRecibidas;

        //Cuando llegue nueva info, debo actualizar ArrMediciones, y subirla a la misma posicion de NombreMediciones, en el espacio de su arreglo, por indice i;
        // setIdmediciones(medicionesFase);
        for (let i = 0; i < medicionesFase.length; i++) {
            let nuevoArr = new Array();
            //este paso no es necesario, ya que el arreglo de objetos llegara mas tarde, lo que debe conservarse es crear el arreglo para la medicion
            let newObject = {
                nombre: "",
                dispositivo: "",
                grupo: "",
                participante: "",
                tiempoMedicion: "",
                valor: ""
            };
            nuevoArr.push(newObject);
            const res = await axios.get(routesBD.mediciones + medicionesFase[i]);
            arrNombreMediciones.push([res.data.medicion.nombre, i, nuevoArr]);
            arrMediciones.push(nuevoArr);
        }
        //Yo no paso fases hacia atras, solo avanzo fases en esta etapa, asi que no deberia haber problemas
        setArrMedicionesRecibidas(arrMediciones);
        setNombresMediciones(arrNombreMediciones);

        let separador = '';
        let medicionFinal = '';
        let arrNombresSocket = new Array();
        for (let i = 0; i < arrNombreMediciones; i++) {
            let medicion = arrNombreMediciones[i][0].toLowerCase();
            let medicionFiltro = medicion.split(separador);
            if (medicionFiltro.length > 1) {
                medicionFinal = medicionFiltro[0] + medicionFiltro[1];
            } else {
                medicionFinal = medicionFiltro[0];
            }
            arrNombresSocket.push(medicionFinal);
        }
        setNombresMedicionesSocket([...arrNombresSocket]);
        traerMedicionesRegistrar(faseActual);
    }

    const calcularTiempoFases = (tInicio, tFin) => {
        let Inicio = tInicio.toString();
        let Fin = tFin.toString();

        let primeroI = Inicio.slice(0, -2);
        let HoraI = parseInt(primeroI * 3600);
        let segundoI = '';
        let MinutosI = 0;
        if (Inicio.length < 4) {
            segundoI = Inicio.slice(1);
            MinutosI = parseInt(segundoI * 60);
        } else {
            segundoI = Inicio.slice(2);
            MinutosI = parseInt(segundoI * 60);
        }

        let primeroF = Fin.slice(0, -2);
        let HoraF = parseInt(primeroF * 3600);
        let MinutosF = 0;
        let segundoF = ''
        if (Fin.length < 4) {
            segundoF = Fin.slice(1);
            MinutosF = parseInt(segundoF * 60);
        } else {
            segundoF = Fin.slice(2);
            MinutosF = parseInt(segundoF * 60);
        }
        let tiempoT = (HoraF + MinutosF) - (HoraI + MinutosI);
        // setTiempoInicio(primeroI + ':' + segundoI);
        // setTiempoFin(primeroF + ':' + segundoF);
        let separador = " ";
        let separador2 = ":";
        let tiempoActualInicial = (tiempoActual.toString()).split(separador);
        let tiempoIniActual = (tiempoActualInicial[4]).split(separador2);
        let tiempoCalcularInicial = tiempoIniActual[0] + tiempoIniActual[1];
        setTiempoInicioActual(tiempoIniActual[0] + ':' + tiempoIniActual[1]);

        calcularTiemposActuales(tiempoCalcularInicial, tiempoT);
        setTiempoDurSec(tiempoT);
    };

    const calcularTiemposActuales = (timeActual, timeTotalSegundos) => {
        let primeroI = parseInt(timeActual.slice(0, -2));
        let tiempoTotalFinal = '';
        // let HoraI = (parseInt(primeroI) * 60);
        // let segundoI = '';
        let horasAdd = Math.floor(timeTotalSegundos / 3600);
        let minutosAdd = Math.floor((timeTotalSegundos / 60) % 60);
        let tiempoAddTotal = (horasAdd + ':' + minutosAdd);
        let MinutosI = 0;
        if (timeActual.length < 4) {
            MinutosI = (parseInt(timeActual.slice(1)));
        } else {
            MinutosI = (parseInt(timeActual.slice(2)));
        }
        // let minutosFinal = (timeTotalSegundos / 60);
        let minutosTotal = MinutosI + minutosAdd;
        let horasTotal = primeroI + horasAdd;
        if (minutosTotal > 59) {
            horasTotal = horasTotal + 1;
            minutosTotal = minutosTotal - 60;
            if (minutosTotal < 10) {
                minutosTotal = '0' + minutosTotal;
            }

            if (horasTotal < 24) {

                tiempoTotalFinal = (horasTotal + ':' + minutosTotal);
                setTiempoFinActual(tiempoTotalFinal);
            } else {
                horasTotal = horasTotal - 24;
                if (horasTotal < 10) {
                    horasTotal = '0' + horasTotal;
                }
                tiempoTotalFinal = (horasTotal + ':' + minutosTotal);
                setTiempoFinActual(tiempoTotalFinal);
            }
        } else {
            if (minutosTotal < 10) {
                minutosTotal = '0' + minutosTotal;
            }

            if (horasTotal < 24) {
                tiempoTotalFinal = (horasTotal + ':' + minutosTotal);
                setTiempoFinActual(tiempoTotalFinal)
            } else {
                horasTotal = horasTotal - 24;
                if (horasTotal < 10) {
                    horasTotal = '0' + horasTotal;
                }
                tiempoTotalFinal = (horasTotal + ':' + minutosTotal);
                setTiempoFinActual(tiempoTotalFinal);
            }
        }
        // console.log('timeActual');
        // console.log(timeActual);
        // console.log('horasAdd');
        // console.log(horasAdd);
        // console.log('minutosAdd');
        // console.log(minutosAdd);
        // console.log('tiempoAddTotal');
        // console.log(tiempoAddTotal);
        // console.log('tiempoTotalFinal');
        // console.log(tiempoTotalFinal);
    }

    const guardarFaseActiva = async (faseGuardar) => {
        let faseActivaGuardar = {
            faseActiva: faseGuardar,
        }
        console.log('Guardando Fase Activa: ');
        console.log(faseActivaGuardar)
        const resFaseActiva = await axios.put(routesBD.experimentos + 'faseActiva/' + idUrl['id'], faseActivaGuardar);
    }

    useEffect(() => {
        // const normalizar = (progresoraro) => {
        let progreTiempo = progresoTiempo;
        let tiempoDurSec = tiempoDuracionSec;

        let varSegundos = segundos;

        let valor = (progreTiempo * 100) / tiempoDurSec;
        let progTiempo = progreTiempo + 1;
        let Nsegundos = varSegundos + 1;
        let Nminutos = minutos;
        let Nhoras = horas;
        let segundosString = '';
        let minutosString = '';
        let horasString = '';

        // if (progTiempo > tiempoDurSec) {

        // } else {
        // if (progTiempo === tiempoDurSec) {
        //     // clearInterval(barraProgreso);
        //     setTiempoString('¡Fase Completada!');
        //     setProgreso(100);
        //     // console.log('Fase Finalizada por tiempo');
        // } else {
        if (Nsegundos === 60) {
            Nsegundos = 0;
            Nminutos = Nminutos + 1;
            if (Nminutos === 60) {
                Nminutos = 0;
                Nhoras = Nhoras + 1;
                if (Nhoras === 24) {
                    Nhoras = 0;
                    setHoras(Nhoras);
                    setMinuto(Nminutos);
                    setSegundos(Nsegundos);
                } else {
                    setHoras(Nhoras);
                    setMinuto(Nminutos);
                    setSegundos(Nsegundos);
                }
            } else {
                setMinuto(Nminutos);
                setSegundos(Nsegundos);
            }
        } else {
            setSegundos(Nsegundos);
        }

        if ((Nsegundos.toString()).length < 2) {
            segundosString = '0' + Nsegundos.toString();
        } else {
            segundosString = Nsegundos.toString();
        }
        if ((Nminutos.toString()).length < 2) {
            minutosString = '0' + Nminutos.toString();
        } else {
            minutosString = Nminutos.toString();
        }
        if ((Nhoras.toString()).length < 2) {
            horasString = '0' + Nhoras.toString();
        } else {
            horasString = Nhoras.toString();
        }
        if (progTiempo < tiempoDurSec) {
            setProgreso(valor);
            setBanderaOvertime(true);
        }
        if (progTiempo === tiempoDurSec) {
            setProgreso(100);
        }
        if (progTiempo > tiempoDurSec) {
            setBanderaOvertime(false);
        }
        setProgresoTiempo(progTiempo);
        setTiempoString(horasString + ':' + minutosString + ':' + segundosString);
        // console.log(tiempoDuracionSec);

    }, [progress, faseActiva]);

    useEffect(() => {
        console.log('Fase: ' + faseActiva);
        let numerofaseActual = faseActiva + 1;

        if (faseActiva < fasesExp.length) {
            if (fasesExp != '') {
                setCambiarBoton(true);
                let faseAct = fasesExp[faseActiva];
                const medicionesFase = faseAct['idMediciones'];
                let arrNombreMediciones = new Array();
                let arrObsv = fasesExp[faseActiva].idObservaciones;
                // console.log(arrObsv);
                setIdObserv(arrObsv);
                // setIdObserv([...idObserv]);
                // setIdmediciones(medicionesFase);
                if (fasesExp != '') {
                    clearInterval(intervaloActualizacion);
                    clearInterval(barraProgreso);
                    setBanderaOvertime(true);
                    setBanderaDetenido(true);
                    setProgresoTiempo(0);
                    setHoras(0);
                    // setMinutos(0);
                    setMinuto(0);
                    tiempoActual = new Date();
                    // setTiempoActual(date);

                    setSegundos(0);
                    setTiempoString('00:00:00');
                    intervaloProgreso();
                    let arregloNFase = fasesExp;
                    // setTiempoInicio(arregloNFase[faseActiva].tiempoInicio);
                    // setTiempoFin(arregloNFase[faseActiva].tiempoFin);
                    calcularTiempoFases(arregloNFase[faseActiva].tiempoInicio, arregloNFase[faseActiva].tiempoFin);
                }
                // traerMedicionesFase(medicionesFase);
                setArrMedicionesRecibidas([]);
                setNombresMediciones([]);
                traerMediciones(faseAct, medicionesFase);
                guardarFaseActiva(faseActiva);
                // traerMedicionesRegistrar(faseAct);
                // conectarSocket();
                if (faseActiva === (fasesExp.length - 1)) {
                    setCambiarBoton(false);
                }
            }
        }
        // if (fasesExp.length > 0) {
        //     console.log('fasesExp.length');
        //     console.log(fasesExp.length);
        //     if (faseActiva === fasesExp.length) {
        //         guardarFaseActiva(faseActiva - 1);
        //         setTimeout(
        //             function () {
        //                 window.location.href = "http://localhost/analisis/" + idUrl['id'];
        //             },
        //             3000
        //         );
        //     }
        // }

        return () => {
        }
    }, [faseActiva, fasesExp]);

    useEffect(() => {
        const getObservaciones = async (obs, arrObs, i, termino) => {
            if (obs === 'vacio') {
                setObservacionesTabla(arrObs);
            } else {
                const res = await axios.get(routesBD.observaciones + obs);
                if (res.data.observacion != null) {
                    arrObs.push(res.data.observacion);
                    if (i === termino) {
                        setObservacionesTabla(arrObs);
                    }
                } else {
                    if (i === termino) {
                        setObservacionesTabla(arrObs);
                    }
                }
            }

        }
        let arrObs = new Array();
        const obs = idObserv;
        let termino = 0;
        if (obs.length > 0) {
            termino = (obs.length) - 1;
            for (let i = 0; i < obs.length; i++) {
                getObservaciones(obs[i], arrObs, i, termino);
            }
        } else {
            getObservaciones('vacio', arrObs, 0, termino);
        }

    }, [idObserv, actualizarTabla]);


    const onDeleteObs = async (id) => {
        await axios.delete(routesBD.observaciones + id);
        let arrdelete = idObserv;
        // console.log(arrdelete.length);
        for (let i = 0; i < arrdelete.length; i++) {
            if (id == arrdelete[i]) {
                arrdelete.splice(i, 1);
                setIdObserv(arrdelete);
                let datoIdObsFase = {
                    idObservaciones: arrdelete
                };
                const resq = await axios.put(routesBD.fases+ 'agregarObservaciones/' + fasesExp[faseActiva]._id, datoIdObsFase);
                setActualizarTabla(!actualizarTabla);

                console.log(resq);
            }
        }
    };

    // const onEditObs = (id) => {
    //     return (<EditDialog />)
    // };

    const handleHoraInicio = (HoraIni) => {
        setHoraInicio(HoraIni);
    };

    const handleChange = (event, newTab) => {
        setTab(newTab);
        let medicion = nombreMedicionActual;
        if (newTab === 0) {
            medicion = 'Tabla General';
            setNombreMedicionActual(medicion);
            nombreMedicionVariable = medicion;
        } else {
            medicion = nombreMediciones[newTab - 1][0];
            setNombreMedicionActual(medicion);
            nombreMedicionVariable = medicion;

        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    };

    const enviarDatos = async () => {
        // e.preventDefault();
        let separador = " ";
        let separador2 = ":";
        let tiempoObs = horaInicio.toString();
        let arregloTiempo = tiempoObs.split(separador);
        let tiempoTotal = arregloTiempo[4].split(separador2);
        let horas = tiempoTotal[0];
        let minutos = tiempoTotal[1];
        // setHorasObs(horas);
        // setMinutosObs(minutos);
        let data = {
            idFase: fasesExp[faseActiva]._id,
            descripcion: datos.obs,
            tiempo: horas + ':' + minutos
        };

        guardarObservacion(data);
    }

    const guardarObservacion = async (data) => {
        if (!data) {
            return (console.log('help'))
        } else {
            const res = await axios.post(routesBD.observaciones, data);

            let arrObservaciones = idObserv;
            arrObservaciones.push(res.data.mensaje);
            setActualizarTabla(!actualizarTabla);
            let datoIdObs = {
                idObservaciones: arrObservaciones
            }
            const resq = await axios.put(routesBD.fases + 'agregarObservaciones/' + fasesExp[faseActiva]._id, datoIdObs);
            handleClose();
        }
    }

    const guardarySalir = () => {
        guardarFaseActiva(faseActiva);
        setTimeout(
            function () {
                window.location.href = "http://localhost/inicio";
            },
            3000
        );
    }

    const handleOpenModalContinuarFase = (direccionFase) => {
        setOpenModalContinuar(true);
        let dirFaseActiva = direccionFase;
        setDireccionFaseActiva(dirFaseActiva);
    }


    const closeModalContinuarFase = async (estadoContinuar) => {
        if (estadoContinuar === 'NoContinuar') {
            setOpenModalContinuar(false);
            setDireccionFaseActiva(faseActiva);
        };
        if (estadoContinuar === 'Continuar') {
            desconectarSocket();
            setFaseActiva(direccionFaseActiva);
            setOpenModalContinuar(false);

            if (faseActiva === (fasesExp.length - 1)) {
                guardarFaseActiva(faseActiva);
                let Etapa = {
                    nombreExp: nombreExp,
                    estado: 'Analisis'
                }
                const resEtapa = await axios.put(routesBD.experimentos + idExperimento, Etapa);
                setTimeout(
                    function () {
                        window.location.href = "http://localhost/analisis/" + idUrl['id'];
                    },
                    3000
                );
            }
        }
    }

    const detenerFase = () => {
        let fechaFinalizacion = new Date();
        let separador = " ";
        let tiempoFinalizacion = (fechaFinalizacion.toString()).split(separador);
        tiempoFinalizacion = tiempoFinalizacion[4];
        console.log('tiempoFinalizacion para enviar');
        console.log(tiempoFinalizacion);
        setBanderaDetenido(false);
        // setEstadoDetenido(false);
        clearInterval(barraProgreso);
        desconectarSocket();
    }

    const traerGruposParticipantes = async (fasesExp, medicionesFase) => {
        // 3 arreglos y 3 push, cada uno anidado

        let fase = fasesExp;
        let arrGrupos = new Array();
        let arrTotal = new Array();
        let arrFasesGrupos = new Array();
        let participantes = new Array();

        for (let i = 0; i < fase['idGrupos'].length; i++) {
            if (fase['idGrupos'][i] != '') {
                const res = await axios.get(routesBD.grupos + fase['idGrupos'][i]);
                arrTotal.push(res.data.grupo);
            }
        }
        for (let i = 0; i < arrTotal.length; i++) {
            let arregloParticipantes = new Array();
            for (let j = 0; j < arrTotal[i]['participantes'].length; j++) {
                const resP = await axios.get(routesBD.participantes + arrTotal[i]['participantes'][j]);
                arregloParticipantes.push(resP.data.participante);
            }
            participantes.push(arregloParticipantes);
        }

        let gruposActuales = arrTotal;
        let medicionesActuales = medicionesFase;
        let arregloMedicionesGruposParticipantes = new Array();
        let indiceIDFila = 0;

        for (let i = 0; i < medicionesActuales.length; i++) {
            let gruposArr = new Array();
            for (let j = 0; j < gruposActuales.length; j++) {
                let participantesArr = new Array();
                for (let k = 0; k < participantes[j].length; k++) {

                    for (let h = 0; h < participantes[j][k]['dispositivos'].length; h++) {

                        if (participantes[j][k]['dispositivos'][h]['tipoDispositivo'] === medicionesActuales[i]['dispositivosAsociados'][0]) {
                            let participante = {
                                nombre: participantes[j][k]['descripcion'],
                                dispositivo: participantes[j][k]['dispositivos'][h]['dispositivo'],
                                canal: participantes[j][k]['dispositivos'][h]['canal'],
                                estadoOpen: false,
                                estadoMedicion: false,
                                respuestaMedicion: ''
                            }
                            participantesArr.push(participante);
                        }
                    }
                }
                let grupos = {
                    nombre: gruposActuales[j]['descripcion'],
                    participantes: participantesArr,
                    estadoOpen: false,
                    estadoMedicion: false
                }
                gruposArr.push(grupos);
            }
            let arregloMedicion = {
                id: medicionesActuales[i]['_id'],
                nombre: medicionesActuales[i]['nombre'],
                estadoOpen: false,
                estadoMedicion: false,
                grupos: gruposArr
            }
            arregloMedicionesGruposParticipantes.push(arregloMedicion);
        }
        // console.log('arregloMedicionesGruposParticipantes');
        // console.log(arregloMedicionesGruposParticipantes);
        // setEstadoMediciones([...arregloMedicionesGruposParticipantes]);
        conectarSocket(arregloMedicionesGruposParticipantes);
    }

    const conectarSocket = (arregloMedicionesGruposParticipantes) => {
        // Medicion, grupo, participante, dispositivo, canal, valor.
        let dispositivosParticipantes = new Array();
        let dispositivosGrupo = new Array();
        let medicionesRegistrarEstado = new Array();
        let vacio = new Array();
        setMedicionesGeneral([...vacio]);


        let medicionesFaseActual = arregloMedicionesGruposParticipantes;
        let nombresMediciones = nombresMedicionesSocket;
        let arrConexiones = new Array();
        let arregloMensajesGenerales = new Array();

        let medicion = '';
        let separador = ' ';
        let medicionFinal = '';
        // console.log('medicionesFaseActual');
        // console.log(medicionesFaseActual);
        // console.log('nombresMediciones');
        // console.log(nombresMediciones);

        let arregloMedicionesTablas = new Array();
        let nuevoObject = new Object();

        let fechaInicio = new Date();
        let tiempoInicioSocket = (fechaInicio.toString()).split(separador);
        tiempoInicioSocket = tiempoInicioSocket[4];

        for (let i = 0; i < medicionesFaseActual.length; i++) {
            arregloMedicionesTablas.push(nuevoObject);
        }
        for (let i = 0; i < medicionesFaseActual.length; i++) {
            let arregloMedicionMensajes = new Array();
            medicion = medicionesFaseActual[i]['nombre'].toLowerCase();
            let medicionFiltro = medicion.split(separador);
            if (medicionFiltro.length > 1) {
                medicionFinal = medicionFiltro[0] + medicionFiltro[1];
            } else {
                medicionFinal = medicionFiltro[0];
            }
            let mensajeInicio = {
                idExp: idExperimento,
                idFase: fasesExp[faseActiva]['_id'],
                tiempoInicio: tiempoInicioSocket
            }
            console.log(medicionFinal);

            window[socket + medicionFinal] = io.connect('http://192.168.0.8:200/' + medicionFinal);
            arrConexiones.push(window[socket + medicionFinal])

            window[socket + medicionFinal].emit("iniciar", mensajeInicio);


            window[socket + medicionFinal].on('SendMetrics', function (msg) {

                if (nombreMedicionVariable === 'Tabla General' || nombreMedicionVariable === medicionesFaseActual[i]['nombre']) {
                    console.log(nombreMedicionVariable);
                    for (let k = 0; k < medicionesFaseActual[i]['grupos'].length; k++) {
                        if (medicionesFaseActual[i]['grupos'][k]['participantes'].length > 0) {
                            for (let l = 0; l < medicionesFaseActual[i]['grupos'][k]['participantes'].length; l++) {
                                for (let j = 0; j < msg.data.devices.length; j++) {
                                    let dispositivoRecibido = msg.data.devices[j];
                                    if (dispositivoRecibido['name'] === medicionesFaseActual[i]['grupos'][k]['participantes'][l]['dispositivo']) {

                                        let datoMedicionGeneral = {
                                            Medicion: medicionesFaseActual[i]['nombre'],
                                            Grupo: medicionesFaseActual[i]['grupos'][k]['nombre'],
                                            Participante: medicionesFaseActual[i]['grupos'][k]['participantes'][l]['nombre'],
                                            Dispositivo: medicionesFaseActual[i]['grupos'][k]['participantes'][l]['dispositivo'],
                                            Canal: dispositivoRecibido['channel'][medicionesFaseActual[i]['grupos'][k]['participantes'][l]['canal']]['channelId'],
                                            Valor: dispositivoRecibido['channel'][medicionesFaseActual[i]['grupos'][k]['participantes'][l]['canal']]['valor']
                                        }
                                        if (arregloMensajesGenerales.length > 20) {

                                            arregloMensajesGenerales.splice(0, 1);
                                            arregloMensajesGenerales.push(datoMedicionGeneral);
                                        } else {
                                            arregloMensajesGenerales.push(datoMedicionGeneral);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            });



            window[intervaloActualizacion + (i).toString()] = setInterval(() => {
                // if (arregloMensajesGenerales.length > 0) {
                setMedicionesGeneral(arregloMensajesGenerales);

            }, 1000);
        }
        // intervaloBandera = setInterval(() => {
        //     setBanderaTabla(false);

        // }, 2000);

        setConexionSockets([...arrConexiones])

    }

    const desconectarSocket = () => {
        let conexionesSocketsCerrar = conexionSockets;
        // console.log(nombreMedicionActual);
        // clearInterval(intervaloBandera);
        
        let fechaFinalizacion = new Date();
        let separador = " ";
        let tiempoFinalizacion = (fechaFinalizacion.toString()).split(separador);
        tiempoFinalizacion = tiempoFinalizacion[4];

        let datosDetener = {tiempo: tiempoFinalizacion}
        for (let i = 0; i < conexionesSocketsCerrar.length; i++) {
            conexionesSocketsCerrar[i].emit("detener", datosDetener);

            clearInterval(window[intervaloActualizacion + (i).toString()]);
            conexionesSocketsCerrar[i].disconnect();
        }
    }


    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Ejecucion Experimento</h3>
                <div className="card">
                    <div className="card-header">
                        <div align="left" style={{ float: 'left' }}><h4>{nombreExp}</h4></div>
                        <div align="right" style={{ float: 'right' }}><Button variant="outlined" color="secondary" onClick={() => detenerFase()}>Detener Fase</Button></div>
                    </div>
                    <div>
                        <Stepper activeStep={faseActiva} alternativeLabel>
                            {
                                fasesExp.map(fase => (
                                    <Step key={fase._id}>
                                        <StepButton onClick={() => setFaseActiva(fase.numeroFase - 1)}>Fase {fase.numeroFase}</StepButton>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </div>
                    <div className="container-fluid">
                        <LinearProgress variant="determinate"
                            value={progreso}
                        />
                        <div>
                            <div align="left" style={{ float: 'left' }}>{tiempoInicioActual}</div>
                            <div align="right" style={{ float: 'right' }}>{tiempoFinActual}</div>
                            <div align="center" style={{ float: 'center' }}>{tiempoString}</div>
                            {
                                banderaOvertime ?
                                    <div></div>
                                    :
                                    <div align="center" style={{ float: 'center', color: 'red' }}><h6>¡Tiempo Fase Excedido!</h6></div>

                            }
                            {
                                banderaDetenido ?
                                    <div></div>
                                    :
                                    <div align="center" style={{ float: 'center', color: 'red' }}><h6>¡Fase Finalizada!</h6></div>

                            }
                        </div>
                        <br />
                        <div>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ margin: 'auto', display: "flex" }}>
                                Agregar Observacion
                            </Button>
                            <Dialog fullWidth maxWidth={'xs'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Observacion</DialogTitle>
                                <DialogContent >
                                    <form onSubmit={enviarDatos}>
                                        <Grid item xs={12}>

                                            <TextField
                                                multiline
                                                autoFocus
                                                margin="dense"
                                                id="standard-multiline-static"
                                                label="Agregar Observacion"
                                                fullWidth
                                                onChange={handleSave}
                                                name="obs"
                                            />
                                        </Grid>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                            <Grid item xs={10}>
                                                <br />
                                                <h5 >Tiempo Observación</h5>
                                                <TimePicker
                                                    margin="normal"
                                                    id="time-picker"
                                                    value={horaInicio}
                                                    onChange={handleHoraInicio}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change time',
                                                    }}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button type="submit" onClick={enviarDatos} color="primary">
                                        Guardar
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            {/* </div> */}
                            <div className="card-body">
                                <div className="card-header">
                                    <h4>Mediciones Registradas</h4>
                                    <div className={classes.tabsStyles}>
                                        <AppBar position="static">
                                            <Tabs value={tab} onChange={handleChange} indicatorColor="primary" variant="scrollable" scrollButtons="auto" aria-label="simple tabs example">
                                                <Tab label="Tabla General" />
                                                {
                                                    nombreMediciones.map(nombre => (
                                                        <Tab label={nombre[0]} />
                                                    ))
                                                }
                                            </Tabs>
                                        </AppBar>

                                        <TabPanel value={0} index={0}>
                                            <Grid container spacing={12}>
                                                <Grid item xs={12}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                            <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                <TableHead>
                                                                    <TableRow style={{ height: '50px' }}>
                                                                        <TableCell>Medicion</TableCell>
                                                                        <TableCell>Grupo</TableCell>
                                                                        <TableCell>Participante</TableCell>
                                                                        <TableCell>Dispositivo</TableCell>
                                                                        <TableCell>Canal</TableCell>
                                                                        <TableCell>Valor</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {/* {rows.map((row) => ( */}
                                                                    {/* {banderaTabla ? */}
                                                                        {medicionesGeneral.map((row) => (
                                                                            <TableRow key={row.name}>
                                                                                <TableCell component="th" scope="row">{row.Medicion}</TableCell>
                                                                                <TableCell component="th" scope="row">{row.Grupo}</TableCell>
                                                                                <TableCell component="th" scope="row">{row.Participante}</TableCell>
                                                                                <TableCell component="th" scope="row">{row.Dispositivo}</TableCell>
                                                                                <TableCell component="th" scope="row">{row.Canal}</TableCell>
                                                                                <TableCell >{row.Valor}</TableCell>
                                                                            </TableRow>
                                                                        ))
                                                                    //     :
                                                                    //     <TableCell align="center" colSpan={5}>
                                                                    //         <Box sx={{ width: "auto", padding: 10 }}>
                                                                    //             <CircularProgress color="inherit" />
                                                                    //         </Box>
                                                                    //     </TableCell>

                                                                    }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        {/* {
                                            nombreMediciones.map(nombre => (
                                                <TabPanel value={tab} index={nombre[1] + 1}>
                                                    <Grid container spacing={12}>
                                                        <Grid item xs={12}>
                                                            <Grid item xs={12}>
                                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                                    <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                        <TableHead>
                                                                            <TableRow style={{ height: '50px' }}>
                                                                                <TableCell>Nombre</TableCell>
                                                                                <TableCell>Grupo</TableCell>
                                                                                <TableCell>Participante</TableCell>
                                                                                <TableCell>Dispositivo</TableCell>
                                                                                <TableCell>Tiempo</TableCell>
                                                                                <TableCell>Valor</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {/* {rows.map((row) => ( 

                                                                            {medicionesGeneral.map((row) => (
                                                                                <TableRow key={row.name}>
                                                                                    <TableCell component="th" scope="row">{row.Medicion}</TableCell>
                                                                                    <TableCell component="th" scope="row">{row.Grupo}</TableCell>
                                                                                    <TableCell component="th" scope="row">{row.Participante}</TableCell>
                                                                                    <TableCell component="th" scope="row">{row.Dispositivo}</TableCell>
                                                                                    <TableCell component="th" scope="row">{row.Canal}</TableCell>
                                                                                    <TableCell align="right">{row.Valor}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </TabPanel>
                                            ))
                                        } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-header">
                            <Grid container spacing={12}>
                                <Grid item xs={12}>
                                    {
                                        <div>
                                            <h5>Observaciones</h5>
                                            <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                    <TableHead>
                                                        <TableRow style={{ height: '50px' }}>
                                                            <TableCell>Tiempo</TableCell>
                                                            <TableCell align="center">Valor</TableCell>
                                                            <TableCell align="right">Accion</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {observacionesTabla.map((row) => (
                                                            <TableRow key={row._id} >
                                                                <TableCell component="th" scope="row">{row.tiempo}</TableCell>
                                                                <TableCell align="center">{row.descripcion}</TableCell>
                                                                <TableCell align="right" >
                                                                    {/* <VisibilityIcon onClick={() => onEditObs(row._id)}></VisibilityIcon> */}
                                                                    <CancelIcon onClick={() => onDeleteObs(row._id)} /></TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        // </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div style={{ float: "right" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                                onClick={() => window.location.href = "http://localhost/inicio"}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                                onClick={() => guardarySalir()}
                            >
                                Guardar y Salir
                            </Button>
                            {/* <Button
                                variant="contained"
                                color="default"
                                onClick={() => setFaseActiva(faseActiva + 1)}
                                size="small"
                                style={{ margin: 3 }}
                            >
                                Continuar Fase
                            </Button> */}
                            {
                                cambiarBoton ?
                                    <Button
                                        variant="contained"
                                        color="default"
                                        onClick={() => handleOpenModalContinuarFase(faseActiva + 1)}
                                        size="small"
                                        style={{ margin: 3 }}
                                    >
                                        Continuar Fase
                                    </Button>
                                    :
                                    <Button
                                        variant="contained"
                                        color="green"
                                        onClick={() => handleOpenModalContinuarFase(faseActiva)}
                                        size="small"
                                        style={{ margin: 3 }}
                                    >
                                        Continuar Análisis
                                    </Button>
                            }
                            <Modal
                                backdropColor="transparent"
                                open={openModalContinuar}
                                onClose={() => closeModalContinuarFase()}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={openModalContinuar} >
                                    <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                        <Grid item xs={4} >
                                            <div className="card" >
                                                <div className="card-header">
                                                    <h4>Continuar</h4>
                                                </div>
                                                <div className="card-body">
                                                    <h5>¿Desea continuar a la siguiente Fase/Etapa del Experimento?</h5>
                                                </div>
                                                <div className="card-footer">
                                                    <div style={{ float: "right" }}>
                                                        <Button variant="contained" onClick={() => closeModalContinuarFase('NoContinuar')} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                            No
                                                        </Button>
                                                        <Button variant="contained" type="submit" onClick={() => closeModalContinuarFase('Continuar')} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
                                                            Si
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
}