/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, Checkbox, IconButton, CircularProgress } from '@material-ui/core/';
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core/';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core/';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { Stepper, Step, StepButton, LinearProgress } from '@material-ui/core/'
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import routesBD, {rutasFront} from '../helpers/routes';


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
    fawesome: {
        '& > .fa': {
            margin: theme.spacing(2),
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function createData(nombre, grupo, participante, dispositivo, tiempoMedicion, valor) {
    return { nombre, grupo, participante, dispositivo, tiempoMedicion, valor };
}
function crearData(id, nombre, seleccionado) {
    return { id, nombre, seleccionado };
}

const rows = [
    createData('Speech Count', '01', '04', 'Mic.', '05:30', '02:00'),
    createData('Pos. Mic', '01', '04', 'Mic.', '05:32', 'Coord'),
    createData('Speech Count', '03', '01', 'Mic.', '05:35', '05:00'),
    createData('Pos. Hombros', '02', '03', 'Cam.', '05:38', 'Coord'),
    createData('Speech Count', '01', '02', 'Mic.', '05:45', '10:00'),
    createData('Pos. Manos', '01', '04', 'Cam.', '05:46', 'Coord'),
    createData('Gestos', '01', '05', 'Cam.', '05:49', 'Coord'),
    createData('Pos. Mic', '01', '02', 'Mic.', '05:49', 'Coord'),
    createData('Pos. Mic', '01', '02', 'Mic.', '05:50', 'Coord'),
    createData('Pos. Mic', '01', '03', 'Mic.', '05:51', 'Coord'),
    createData('Speech Count', '01', '04', 'Mic.', '05:52', '03:00'),
];
const fila = [
    crearData('1', 'Speech Count', false),
    crearData('2', 'Pos. Mic', false),
    crearData('3', 'Speech Count', false),
    crearData('4', 'Pos. Hombros', false),
    crearData('5', 'Speech Count', false),
    crearData('6', 'Pos. Manos', false),
    crearData('7', 'Gestos', false),
    crearData('8', 'Pos. Mic', false),
    crearData('9', 'Pos. Mic', false),
    crearData('10', 'Pos. Mic', false),
    crearData('11', 'Speech Count', false),
];
const Intensidad = [
    createData('Speech Count', '01', '04', 'Mic.', '05:30', '02:00'),
    createData('Pos. Mic', '01', '04', 'Mic.', '05:32', '02:00'),
    createData('Speech Count', '03', '01', 'Mic.', '05:35', '05:00'),
    createData('Pos. Hombros', '02', '03', 'Mic.', '05:38', '05:00'),
    createData('Speech Count', '01', '02', 'Mic.', '05:45', '10:00'),
    createData('Pos. Manos', '01', '04', 'Mic.', '05:46', '02:00'),
    createData('Gestos', '01', '05', 'Mic.', '05:49', '05:00'),
    createData('Pos. Mic', '01', '02', 'Mic.', '05:49', '05:00'),
    createData('Pos. Mic', '01', '02', 'Mic.', '05:50', '10:00'),
    createData('Pos. Mic', '01', '03', 'Mic.', '05:51', '10:00'),
    createData('Speech Count', '01', '04', 'Mic.', '05:52', '03:00'),
];
const Postura = [
    createData('Speech Count', '01', '04', 'Cam.', '05:30', 'Coord'),
    createData('Pos. Mic', '01', '04', 'Cam.', '05:32', 'Coord'),
    createData('Speech Count', '03', '01', 'Cam.', '05:35', 'Coord'),
    createData('Pos. Hombros', '02', '03', 'Cam.', '05:38', 'Coord'),
    createData('Speech Count', '01', '02', 'Cam.', '05:45', 'Coord'),
    createData('Pos. Manos', '01', '04', 'Cam.', '05:46', 'Coord'),
    createData('Gestos', '01', '05', 'Cam.', '05:49', 'Coord'),
    createData('Pos. Mic', '01', '02', 'Cam.', '05:49', 'Coord'),
    createData('Pos. Mic', '01', '02', 'Cam.', '05:50', 'Coord'),
    createData('Pos. Mic', '01', '03', 'Cam.', '05:51', 'Coord'),
    createData('Speech Count', '01', '04', 'Cam.', '05:52', 'Coord'),
];


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

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }
let FaseActivaGlobal = 0;
export default function PreparacionExp() {

    const location = useLocation();
    const idUrl = useParams();
    const classes = useStyles();
    const [datosGrupos, setDatosGrupos] = useState({
        grupo: '',
        dispositivos: [],
    })
    const [datosParticipantes, setDatosParticipantes] = useState({
        participante: '',
        dispositivos: [],
    })

    const [open, setOpen] = React.useState(false);
    const [urlconsulta, setUrlConsulta] = useState('');
    const [tab, setTab] = React.useState(0);
    const [tab2, setTab2] = React.useState(0);
    const [fases, setFases] = React.useState([]);
    const [idmediciones, setIdmediciones] = React.useState('');
    const [nombreMediciones, setNombresMediciones] = React.useState([]);
    const [idObserv, setIdObserv] = React.useState([]);
    const [faseActiva, setFaseActiva] = React.useState(0);
    const [nombreExp, setNombreExp] = React.useState('');
    const [idExp, setIdExp] = React.useState('');
    const [fasesExp, setFasesExp] = React.useState([]);
    const [actualizarTabla, setActualizarTabla] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const [grupoSeleccionado, setGrupoSeleccionado] = React.useState(false);
    const [banderaGrupo, setBanderaGrupo] = React.useState(false);
    const [banderaParticipantes, setBanderaParticipantes] = React.useState(false);
    const [conteoSelectedG, setConteoSelectedG] = React.useState(0);
    const [conteoSelectedPart, setConteoSelectedPart] = React.useState(0);
    const [dataGrupos, setDataGrupos] = React.useState([]);
    const [dataParticipantes, setDataParticipantes] = React.useState([]);
    const [participanteActivo, setParticipanteActivo] = React.useState('');
    const [grupoEditar, setGrupoEditar] = React.useState('');
    const [arrarrParticipantes, setArrArrParticipantes] = React.useState([]);
    const [arrFasesxGrupo, setArrFasesxGrupo] = React.useState([]);
    const [arrFasesxParticipantesxGrupo, setArrFasesxParticipantesxGrupo] = React.useState([]);
    const [nombreGrupoHeader, setNombreGrupoHeader] = React.useState('');
    const [hiddenParticipantes, setHiddenParticipantes] = React.useState(true);
    const [grupoComparacion, setGrupoComparacion] = React.useState([]);
    const [particiComparacion, setParticiComparacion] = React.useState([]);
    const [arregloFasesGrupos, setArregloFasesGrupos] = React.useState([]);
    const [banderaComparacion, setBanderaComparacion] = React.useState(0);
    const [direccionFaseActiva, setDireccionFaseActiva] = React.useState(0);

    const [openModalGrupo, setOpenModalGrupo] = React.useState(false);
    const [openModalParticipante, setOpenModalParticipante] = React.useState(false);
    const [openModalNuevoGrupo, setOpenModalNuevoGrupo] = React.useState(false);
    const [openModalNuevoParticipante, setOpenModalNuevoParticipante] = React.useState(false);
    const [openModalGuardarDatos, setOpenModalGuardarDatos] = React.useState(false);
    const [banderaTabla, setBanderaTabla] = React.useState(true);
    const [medicionesSelected, setMedicionesSelected] = React.useState([]);
    const [medicionesFases, setMedicionesFases] = useState([]);
    const [cambiarBoton, setCambiarBoton] = useState(true);
    const [idExperimento, setIdExperimento] = React.useState('');
    const [asignaciones, setAsignaciones] = useState(true);
    const [datosNuevoGrupo, setDatosNuevoGrupo] = useState({
        nombreGrupo: '',
    })
    const [arrGruposDisabled, setArrGruposDisabled] = useState([]);
    const [gruposParticipantes, setGruposParticipantes] = useState([]);
    const [datosDispositivos, setDatosDispositivos] = useState([]);
    const [tiposDispositivosBD, setTiposDispositivosBD] = useState([]);
    const [tipoDispositivo, setTipoDispositivo] = useState('');
    const [nombreDispositivo, setNombreDispositivo] = useState('');
    const [numeroCanales, setNumeroCanales] = useState('');
    const [banderaDispositivos, setBanderaDispositivos] = useState(false);
    const [banderaParticipantesGrupo, setBanderaParticipantesGrupo] = useState(false);
    const [filas, setFilas] = React.useState([]);
    const [nombreAsignacionesGrupo, setNombreAsignacionesGrupo] = useState('');
    const [grupoActual, setGrupoActual] = useState('');
    const [gruposParticipantesAsignaciones, setGruposParticipantesAsignaciones] = useState([]);
    const [banderaParticipantesAsignaciones, setBanderaParticipantesAsignaciones] = useState(false);
    const [banderaAsignaciones, setBanderaAsignaciones] = useState(false);
    const [datosDispositivosAsignaciones, setDatosDispositivosAsignaciones] = useState([]);
    const [participanteActual, setParticipanteActual] = useState('');
    const [datosCanales, setDatosCanales] = useState([]);
    const [dispositivosGrupo, setDispositivosGrupo] = useState([]);
    const [grupoActualCreacion, setGrupoActualCreacion] = useState([]);
    const [banderaDispositivosTotal, setBanderaDispositivosTotal] = useState(false);
    const [banderaParticipantesGrupoTotal, setBanderaParticipantesGrupoTotal] = useState(false);
    const [dispositivosAsignaciones, setDispositivosAsignaciones] = useState([]);
    const [canalesAsignaciones, setCanalesAsignaciones] = useState([]);
    const [banderaAsignacionesTotales, setBanderaAsignacionesTotales] = useState(false);
    const [participanteActualAsignacion, setParticipanteActualAsignacion] = useState([]);
    const [grupoActualAsignacion, setGrupoActualAsignacion] = useState([]);
    const [canalSeleccionado, setCanalSeleccionado] = useState([]);
    const [indexCanal, setIndexCanal] = useState(0)

    const [arregloGruposSelect, setArregloGruposSelect] = React.useState([
        {
            "Grupo 1": false,
            "Grupo 2": false,
            "Grupo 3": false,
            "Grupo 4": false
        }
    ]);

    useEffect(() => {
        dataFase();

        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        // setActualizarTabla(!actualizarTabla);
        const url = () => {
            const urlconsulta = location.pathname.split('/ejecucion/');

            setUrlConsulta(urlconsulta);
        };

        const traerDispositivos = async () => {
            const resDispositivos = await axios.get(routesBD.dispositivos);
            setTiposDispositivosBD(resDispositivos.data);
        };

        url();
        traerDispositivos();
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const traerGrupos = async (fasesExp) => {
        let fases = fasesExp;
        let arrGrupos = new Array();
        let arrTotal = new Array();
        let arrFasesGrupos = new Array();
        for (let i = 0; i < fases.length; i++) {
            arrGrupos.push(fasesExp[i].idGrupos);
        }
        for (let i = 0; i < arrGrupos.length; i++) {
            for (let j = 0; j < arrGrupos[i].length; j++) {
                if (arrGrupos[i][j] != '') {
                    const res = await axios.get(routesBD.grupos + arrGrupos[i][j]);
                    arrTotal.push(res.data.grupo);
                }
            }
            arrFasesGrupos.push(arrTotal);
            arrTotal = [];
        }
        let gruposFase = arrFasesGrupos[0];
        console.log('arrFasesGrupos', arrFasesGrupos);
        setArrFasesxGrupo([...arrFasesGrupos]);
        console.log('arrFasesGrupos[FaseActivaGlobal]', arrFasesGrupos[FaseActivaGlobal]);
        setDataGrupos([...arrFasesGrupos[FaseActivaGlobal]]);
        // setDataGrupos(arrFasesxGrupo[fase]);

        traerParticipantes(arrFasesGrupos[FaseActivaGlobal], 'inicio');
        // setBanderaParticipantesGrupo(false);
        // setBanderaDispositivosTotal(false);
        // setBanderaParticipantesGrupoTotal(false);
        // setBanderaParticipantesGrupo(false);
        // setBanderaDispositivos(false);
    }

    const traerGruposIniciales = async (fasesExpe) => {
        let fases = fasesExpe;
        let arreGrupos = new Array();
        let arreTotal = new Array();
        let arreFasesGrupos = new Array();
        for (let i = 0; i < fases.length; i++) {
            arreGrupos.push(fases[i].idGrupos);
        }
        for (let i = 0; i < arreGrupos.length; i++) {
            for (let j = 0; j < arreGrupos[i].length; j++) {
                if (arreGrupos[i][j] != '') {
                    const res = await axios.get(routesBD.grupos + arreGrupos[i][j]);
                    arreTotal.push(res.data.grupo);
                }
            }
            arreFasesGrupos.push(arreTotal);
            arreTotal = [];
        }
        setArregloFasesGrupos(arreFasesGrupos);
        setGrupoComparacion(arreFasesGrupos[0]);
        traerParticipantesIniciales(arreFasesGrupos[0]);
    }

    const traerParticipantesIniciales = async (arGrupos) => {
        let arregloGrupos = arGrupos;
        let arreParticipantes = new Array();
        let arrarrGruposComp = new Array();
        let banderaComp = banderaComparacion + 1;
        let arrTotal = new Array();

        for (let i = 0; i < arregloGrupos.length; i++) {
            arreParticipantes.push(arregloGrupos[i].participantes);
        }
        for (let i = 0; i < arreParticipantes.length; i++) {
            for (let j = 0; j < arreParticipantes[i].length; j++) {
                if (arreParticipantes[i][j] != '') {
                    const res = await axios.get(routesBD.participantes + arreParticipantes[i][j]);
                    arrTotal.push(res.data.participante);
                }
            }
            arrarrGruposComp.push(arrTotal);
            arrTotal = new Array();
        }
        setBanderaComparacion(banderaComp);
        setParticiComparacion(arrarrGruposComp);
    }

    const traerParticipantes = async (arrGrupos, cuando) => {
        let aregloGrupos = arrGrupos;
        let arrParticipantes = new Array();
        let arrarrGrupos = new Array();
        let banderaComp = banderaComparacion + 1;
        let arrComp = new Array();
        let arrInicioComp = new Array();

        let arrTotal = new Array();
        for (let i = 0; i < aregloGrupos.length; i++) {
            arrParticipantes.push(aregloGrupos[i].participantes);
        }
        for (let i = 0; i < arrParticipantes.length; i++) {
            for (let j = 0; j < arrParticipantes[i].length; j++) {
                if (arrParticipantes[i][j] != '') {
                    const res = await axios.get(routesBD.participantes + arrParticipantes[i][j]);
                    arrTotal.push(res.data.participante);
                }
            }
            arrarrGrupos.push(arrTotal);
            arrTotal = new Array();
        }
        setArrArrParticipantes(arrarrGrupos);
        if (cuando === 'durante') {
            setDataParticipantes(arrTotal);
        }
    }

    const dataFase = async () => {
        const res = await axios.get(routesBD.experimentos + idUrl['id']);

        setIdExperimento(idUrl['id']);
        obtenerFases(res.data.experimento.fasesId);
        setNombreExp(res.data.experimento.nombreExp);
        setIdExp(res.data.experimento._id);

    };

    const obtenerFases = async (fases) => {
        let arrfases = fases;
        let arregloNFase = new Array;
        for (var i = 0; i < arrfases.length; i++) {
            let resF = await axios.get(routesBD.fases+ arrfases[i]);
            arregloNFase.push(resF.data.fase);
        }
        setFasesExp(arregloNFase);
        traerGrupos(arregloNFase);
        traerGruposIniciales(arregloNFase);
    }

    useEffect(() => {
        if (fasesExp.length > 0) {
        }
        if (FaseActivaGlobal === (fasesExp.length - 1)) {
            setCambiarBoton(false);
        } else {
            setCambiarBoton(true);
        }
        return () => {
        }
    }, [faseActiva, fasesExp]);

    const handleOpenModalNuevoGrupo = () => {
        setOpenModalNuevoGrupo(true);
        setDatosNuevoGrupo({
            ...datosNuevoGrupo,
            nombreGrupo: ''
        })
    };

    const closeModalNuevoGrupo = () => {
        setOpenModalNuevoGrupo(false);
    };

    const guardarNuevoGrupo = async () => {
        let arregloGruposActuales = dataGrupos;
        let nuevosParticipantes = new Array();
        let nuevosDispositivos = new Array();
        let gruposDisabled = arrGruposDisabled;
        // let nuevoGrupoDisabled = {
        //     disabled: false
        // }
        // gruposDisabled.push(nuevoGrupoDisabled);
        // console.log('arregloGruposActuales');
        // console.log(arregloGruposActuales);
        // console.log('datosNuevoGrupo.nombreGrupo');
        // console.log(datosNuevoGrupo.nombreGrupo);
        let arrFasesExp = fasesExp;
        let nuevoGrupo = {
            participantes: nuevosParticipantes,
            descripcion: datosNuevoGrupo.nombreGrupo,
            dispositivos: nuevosDispositivos,
        }
        const resNuevoGrupo = await axios.post(routesBD.grupos, nuevoGrupo);

        let idFaseActiva = fasesExp[FaseActivaGlobal]['_id'];
        let idFaseGrupos = fasesExp[FaseActivaGlobal]['idGrupos'];
        idFaseGrupos.push(resNuevoGrupo.data.mensaje);
        let arrGruposID = {
            idGrupos: idFaseGrupos
        }
        console.log('Actualizando Fase - Grupos');
        const resFases = await axios.put(routesBD.fases+'agregarGrupos/' + idFaseActiva, arrGruposID);

        // ----------------- le estoy pasando mal el arreglo de fasesExp para que traiga de nuevo los grupos
        const resFasesActiva = await axios.get(routesBD.fases + idFaseActiva);
        arrFasesExp[FaseActivaGlobal] = resFasesActiva.data.fase;
        setFasesExp(arrFasesExp);
        // setArrGruposDisabled(gruposDisabled);
        traerGrupos(arrFasesExp);

        // obtenerFases('ActualizarGrupos');
        // let grupos = dataGrupos;
        // let contador = 0;
        // let arrTotal = new Array();
        // let dispositivosN = new Array();

        // if (grupos.length === 0) {
        //     contador = 1;
        //     let descrip = 'Grupo ' + contador;
        //     let arregloVacio = new Array();
        //     let arrNuevo = {
        //         descripcion: descrip,
        //         dispositivos: dispositivosN,
        //         participantes: arregloVacio,
        //     }
        //     arrTotal.push(arrNuevo);
        //     let arrParticipantesTotal = arrarrParticipantes;
        //     arrParticipantesTotal.push(arrNuevo['participantes'])
        //     setDataGrupos(arrTotal);
        //     setArrArrParticipantes(arrParticipantesTotal);
        // }

        // if (grupos.length > 0) {
        //     contador = 1;
        // };
        // for (let i = 0; i < grupos.length; i++) {
        //     contador = contador + 1;
        //     arrTotal.push(grupos[i]);

        //     if (i === (grupos.length - 1)) {
        //         let descrip = 'Grupo ' + contador;
        //         let arregloVacio = new Array();
        //         let nuevosDisp = new Array();
        //         let arrNuevo = {
        //             descripcion: descrip,
        //             dispositivos: nuevosDisp,
        //             participantes: arregloVacio,
        //         }
        //         arrTotal.push(arrNuevo);
        //         setDataGrupos(arrTotal);
        //         let arrParticipantesTotal = arrarrParticipantes;
        //         arrParticipantesTotal.push(arrNuevo['participantes']);
        //         setArrArrParticipantes(arrParticipantesTotal);
        //     }

        // }
        closeModalNuevoGrupo();
    }

    const cambiarFaseActiva = async (fase) => {
        let limpiar = new Array();
        if (fase < 0) {
            setFaseActiva(fase + 1);
            FaseActivaGlobal = fase + 1;
        }
        if (fase < fasesExp.length) {
            console.log(arrFasesxGrupo);
            // setGrupoComparacion(arregloFasesGrupos[fase]);
            setFaseActiva(fase);
            FaseActivaGlobal = fase;
            if (arrFasesxGrupo[fase]!=null && arrFasesxGrupo[fase].length > 0) {
                setDataGrupos(arrFasesxGrupo[fase]);
                traerParticipantes(arrFasesxGrupo[fase], 'inicio');

                setDataParticipantes([]);
                setNombreGrupoHeader('');
                setHiddenParticipantes(true);
                setNombreAsignacionesGrupo('');
                setBanderaDispositivos(false);
                setBanderaDispositivosTotal(false);
                setBanderaParticipantesGrupoTotal(false);
                setBanderaParticipantesGrupo(false);

                setParticipanteActual('');
                setDatosCanales(limpiar);
                setBanderaAsignaciones(false);
                setBanderaAsignacionesTotales(false);
                setBanderaParticipantesAsignaciones(false);
            } else {
                if (fase === 0) {
                    setDataGrupos(arrFasesxGrupo[fase]);
                    traerParticipantes(arrFasesxGrupo[fase], 'inicio');

                    setDataParticipantes([]);
                    setNombreGrupoHeader('');
                    setHiddenParticipantes(true);
                    setNombreAsignacionesGrupo('');
                    setBanderaDispositivos(false);
                    setBanderaDispositivosTotal(false);
                    setBanderaParticipantesGrupoTotal(false);
                    setBanderaParticipantesGrupo(false);
                    setParticipanteActual('');
                    setDatosCanales(limpiar);
                    setBanderaAsignaciones(false);
                    setBanderaAsignacionesTotales(false);
                    setBanderaParticipantesAsignaciones(false);
                } else {
                    //aqui deberia replicar lo de esta fase en la base de datos de las otras fases
                    let arrFase = fasesExp;
                    console.log('arrFase', arrFase);
                    let idFaseActiva = arrFase[fase]['_id'];

                    let gruposNuevoArr = new Array();
                    for (let i = 0; i < arrFase[fase - 1]['idGrupos'].length; i++){
                        const resGrupo = await axios.get(routesBD.grupos + arrFase[fase - 1]['idGrupos'][i]);
                        let datoGrupo = resGrupo.data.grupo;
                        console.log('datoGrupo', datoGrupo)
                        let participantesArr = new Array();
                        for(let j = 0; j < datoGrupo['participantes'].length; j++){
                            const resParticipante = await axios.get(routesBD.participantes + datoGrupo['participantes'][j]);
                            let datoParticipante = resParticipante.data.participante;
                            let crearParticipante = {
                                dispositivos: datoParticipante['dispositivos'],
                                descripcion: datoParticipante['descripcion']
                            };
                            const resParticipanteNuevo = await axios.post(routesBD.participantes, crearParticipante);
                            participantesArr.push(resParticipanteNuevo.data.mensaje);
                        }
                        let crearGrupo = {
                            participantes: participantesArr,
                            descripcion: datoGrupo['descripcion'],
                            dispositivos: datoGrupo['dispositivos'],
                        };
                        console.log('crearGrupo', crearGrupo);
                        const resGrupoNuevo = await axios.post(routesBD.grupos, crearGrupo);
                        gruposNuevoArr.push(resGrupoNuevo.data.mensaje);
                    }
                    let copiarGrupoAnterior = {
                        idGrupos: gruposNuevoArr
                    };
                    const resFasesGrupos = await axios.put(routesBD.fases+'agregarGrupos/' + idFaseActiva, copiarGrupoAnterior);
                    arrFase[fase]['idGrupos'] = gruposNuevoArr;
                    setFasesExp([...arrFase]);
                    traerGrupos(arrFase, fase);

                    setDataParticipantes([...limpiar]);
                    setNombreGrupoHeader('');
                    setHiddenParticipantes(true);
                    setNombreAsignacionesGrupo('');
                    setBanderaDispositivos(false);
                    setBanderaDispositivosTotal(false);
                    setBanderaParticipantesGrupoTotal(false);
                    setBanderaParticipantesGrupo(false);
                    setParticipanteActual('');
                    setDatosCanales([...limpiar]);
                    setBanderaAsignaciones(false);
                    setBanderaAsignacionesTotales(false);
                    setBanderaParticipantesAsignaciones(false);
                }
            }

        } else {
            //usar replace para evitar retrocesos de pagina
            // window.location.replace("http://");
            window.location.href = rutasFront.PreparacionVerific + idUrl['id'];
        }
    }


    const botonCancelar = () => {
        setTimeout(
            function () {
                window.location.href = rutasFront.inicio;
            },
            2000
        );
    }

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    const handleChange2 = (event, newTab) => {
        setTab2(newTab);
    };

    const handleSaveNuevoGrupo = (e) => {
        setDatosNuevoGrupo({
            ...datosNuevoGrupo,
            [e.target.name]: e.target.value
        })
    };

    const eliminarGrupos = async (idGrupo, participantes) => {
        let arrFase = fasesExp;
        let idFaseActiva = arrFase[FaseActivaGlobal]['_id']

        for (let i = 0; i < participantes.length; i++) {
            let idParticipante = participantes[i];

            const resDelParticipantes = await axios.delete(routesBD.participantes + idParticipante);
        }
        const resDelGrupos = await axios.delete(routesBD.grupos + idGrupo);
        for (let i = 0; i < arrFase[FaseActivaGlobal]['idGrupos'].length; i++) {
            if (arrFase[FaseActivaGlobal]['idGrupos'][i] === idGrupo) {
                arrFase[FaseActivaGlobal]['idGrupos'].splice(i, 1);
            }
        }
        let arregloIdGrupos = {
            idGrupos: arrFase[FaseActivaGlobal]['idGrupos']
        };

        const resFasesGrupos = await axios.put(routesBD.fases+'agregarGrupos/' + idFaseActiva, arregloIdGrupos);
        setFasesExp(arrFase);
        setBanderaDispositivosTotal(false);
        setBanderaParticipantesGrupoTotal(false);
        setBanderaParticipantesGrupo(false);
        setBanderaDispositivos(false);
        traerGrupos(arrFase);
    }

    const nuevoDispositivo = () => {
        let dispositivosActuales = datosDispositivos;
        let nuevoDispositivo = {
            tipoDispositivo: '',
            nombreDispositivo: '',
            numeroCanales: '',
        }
        dispositivosActuales.push(nuevoDispositivo);
        setBanderaDispositivos(true);
        setDatosDispositivos([...dispositivosActuales]);
    }

    const eliminarDispositivo = (dispositivo, indexDispositivo) => {
        setBanderaDispositivos(false);
        let datosDisp = datosDispositivos;
        datosDisp.splice(indexDispositivo, 1);
        setDatosDispositivos([...datosDisp]);

        setTimeout(
            function () {
                setBanderaDispositivos(true);
            },
            10
        );
    }

    const cambiarTipoDispositivo = (casillaDispositivos, indexFila, nombreTipoDispositivo, canales) => {
        let datosDisp = datosDispositivos;
        casillaDispositivos['tipoDispositivo'] = nombreTipoDispositivo;
        casillaDispositivos['numeroCanales'] = canales
        datosDisp[indexFila] = casillaDispositivos;
        setDatosDispositivos([...datosDisp]);
    }

    const cambiarNombreDispositivo = (e) => {
        let datosDisp = datosDispositivos;
        datosDisp[e.target.name]['nombreDispositivo'] = e.target.value;
        setDatosDispositivos([...datosDisp]);
    }

    const nuevoParticipante = () => {
        let participantesActuales = gruposParticipantes;
        let dispositivosNuevos = new Array();
        let nuevoParticipante = {
            descripcion: '',
            dispositivos: dispositivosNuevos,
        }
        participantesActuales.push(nuevoParticipante);
        setBanderaParticipantesGrupo(true);
        setGruposParticipantes([...participantesActuales]);
    }

    const cambiarNombreParticipante = (e) => {
        let nombreParticipantes = gruposParticipantes;
        nombreParticipantes[e.target.name]['descripcion'] = e.target.value;
        setGruposParticipantes([...nombreParticipantes]);
    }

    const eliminarParticipante = (participante, indexParticipante) => {
        setBanderaParticipantesGrupo(false);
        let participantes = gruposParticipantes;
        participantes.splice(indexParticipante, 1);
        setGruposParticipantes([...participantes]);

        setTimeout(
            function () {
                setBanderaParticipantesGrupo(true);
            },
            10
        );
    }
    const cambiarGrupo = async (grupo) => {

        setNombreAsignacionesGrupo(grupo['descripcion']);
        setGrupoActualCreacion(grupo);
        let limpiar = new Array();
        setDatosDispositivos([...limpiar]);
        setGruposParticipantes([...limpiar]);
        setBanderaParticipantesGrupo(false);
        setBanderaDispositivosTotal(true);
        setBanderaParticipantesGrupoTotal(true);
        setBanderaParticipantesGrupo(false);
        setBanderaDispositivos(false);

        //A la hora de cambiar grupos, deberia consultar de nuevo por la informacion de este grupo y rellenar el arreglo, al final de esto debo actualizar la info del grupo y no solo los participantes

        // const resGrupoData = await axios.get(routesBD.grupos + grupoSeleccionado['_id']);
        // let grupo = resGrupoData.data.grupo;
        // setGrupoActualCreacion(grupo);
        let dispositivosGrupo = grupo['dispositivos'];
        let participantes = grupo['participantes'];
        let arregloParticipantes = new Array();
        let arrDispParticipantes = new Array();

        if (participantes.length > 0) {
            for (let i = 0; i < participantes.length; i++) {
                const resParticipantes = await axios.get(routesBD.participantes + participantes[i]);
                let nuevoArrPartici = {
                    _id: resParticipantes.data.participante._id,
                    descripcion: resParticipantes.data.participante.descripcion,
                    dispositivos: arrDispParticipantes
                }
                arregloParticipantes.push(nuevoArrPartici)
            }
            setGruposParticipantes([...arregloParticipantes]);
            setTimeout(
                function () {
                    setBanderaParticipantesGrupo(true);
                },
                20
            );
        }
        if (dispositivosGrupo.length > 0) {
            setDatosDispositivos([...dispositivosGrupo]);
            setTimeout(
                function () {
                    setBanderaDispositivos(true);
                },
                20
            );
        }
    }


    const guardarDatosDispositivos = async () => {
        let actualizarDispositivos = {
            dispositivos: datosDispositivos
        }
        let idGrupoActual = grupoActualCreacion['_id']

        const resDispositivos = await axios.put(routesBD.grupos+'actualizarDispositivos/' + idGrupoActual, actualizarDispositivos);
        // setDataGrupos([...grupos]);
        const resGrupoData = await axios.get(routesBD.grupos + idGrupoActual);

        let actualizarDataGrupos = dataGrupos;
        for (let i = 0; i < actualizarDataGrupos.length; i++) {
            if (actualizarDataGrupos[i]['_id'] === idGrupoActual) {
                actualizarDataGrupos[i] = resGrupoData.data.grupo;
            }
        }
        setDataGrupos([...actualizarDataGrupos]);
        console.log(resDispositivos.data.mensaje);
    }

    const guardarDatosParticipantes = async () => {
        let grupoActual = grupoActualCreacion;
        let grupoParticipantesActual = grupoActualCreacion['participantes'];
        let idGrupoActual = grupoActualCreacion['_id'];
        let datosParticipantes = gruposParticipantes;
        let grupos = dataGrupos;
        let nuevoArregloParticipantes = new Array();
        let nuevoDisp = new Array();
        let encontradoParticipante = false;

        for (let i = 0; i < grupoParticipantesActual.length; i++) {
            encontradoParticipante = false;
            for (let j = 0; j < datosParticipantes.length; j++) {
                if (datosParticipantes[j].hasOwnProperty('_id')) {
                    if (grupoParticipantesActual[i] === datosParticipantes[j]['_id']) {
                        let participanteNuevo = {
                            descripcion: datosParticipantes[j]['descripcion'],
                            dispositivos: datosParticipantes[j]['dispositivos']
                        }
                        //actualizar la id y mantener su id en el nuevoArregloParticipantes
                        const resGrupoParticipantes = await axios.put(routesBD.participantes+ datosParticipantes[j]['_id'], participanteNuevo);
                        nuevoArregloParticipantes.push(datosParticipantes[j]['_id']);
                        encontradoParticipante = true;
                    }

                }
            }
            if (encontradoParticipante === false) {
                const resDelParticipantes = await axios.delete(routesBD.participantes + grupoParticipantesActual[i]);
                // solo eliminar porque se actualizara si existe y si esta en el nuevoArregloParticipantes hecho por datosParticipantes
            }
        }

        for (let j = 0; j < datosParticipantes.length; j++) {
            if (datosParticipantes[j].hasOwnProperty('_id')) {

            } else {
                //enviar por POST
                let participanteNuevo = {
                    descripcion: datosParticipantes[j]['descripcion'],
                    dispositivos: datosParticipantes[j]['dispositivos']
                }
                const resNuevoParticipante = await axios.post(routesBD.participantes, participanteNuevo);
                nuevoArregloParticipantes.push(resNuevoParticipante.data.mensaje);
            }
        }

        let arrParticipantes = {
            participantes: nuevoArregloParticipantes
        }
        const resGrupoParticipantes = await axios.put(routesBD.grupos+'agregarParticipantes/' + idGrupoActual, arrParticipantes);
        console.log(resGrupoParticipantes.data.mensaje);

        for (let i = 0; i < grupos.length; i++) {
            if (grupos[i]['_id'] === idGrupoActual) {
                grupos[i]['participantes'] = nuevoArregloParticipantes;
                cambiarGrupo(grupos[i])
            }
        }
        setDataGrupos([...grupos]);

    }

    const cambiarGrupoSeleccionado = async (grupo, indexGrupo) => {
        setBanderaParticipantesAsignaciones(false);
        setBanderaAsignacionesTotales(false);
        let limpiar = new Array();
        setDatosCanales([...limpiar]);
        setBanderaAsignaciones(false);
        setParticipanteActual('');
        setParticipanteActualAsignacion([...limpiar]);
        setDispositivosGrupo(limpiar);
        // debo colocar la bandera en caso de que no hayan participantes en este grupo para que no muestre el +
        setGrupoActual(grupo);

        let participantes = grupo['participantes'];
        let dispositivos = grupo['dispositivos'];
        setDispositivosAsignaciones([...dispositivos]);
        console.log(dispositivos);
        let arregloParticipantes = new Array();
        let arrDispParticipantes = new Array();

        if (participantes.length > 0) {
            for (let i = 0; i < participantes.length; i++) {
                const resParticipantes = await axios.get(routesBD.participantes + participantes[i]);
                let nuevoArrPartici = {
                    _id: resParticipantes.data.participante._id,
                    descripcion: resParticipantes.data.participante.descripcion,
                    dispositivos: resParticipantes.data.participante.dispositivos
                }
                arregloParticipantes.push(nuevoArrPartici);
            }

            setGruposParticipantesAsignaciones([...arregloParticipantes]);
            setTimeout(
                function () {
                    setBanderaParticipantesAsignaciones(true);
                },
                20
            );
        }
    }

    const cambiarParticipantesAsignaciones = (participante) => {
        //participante debe de guardar ID del tipo de Dipositivo
        setBanderaAsignacionesTotales(true);
        // console.log(participante);
        let limpiar = new Array();
        setDatosCanales([...limpiar]);
        setBanderaAsignaciones(false);
        setParticipanteActual(participante['descripcion']);
        setParticipanteActualAsignacion(participante);
        // console.log('grupoActual');
        // console.log(grupoActual);
        let datosC = limpiar;
        let dispositivoParticipante = participante['dispositivos'];

        if (dispositivoParticipante.length > 0) {
            // datosC = datosCanales;
            for (let i = 0; i < dispositivoParticipante.length; i++) {
                let nuevosCanales = new Array();

                for (let j = 0; j < dispositivosAsignaciones.length; j++) {
                    if (dispositivoParticipante[i]['dispositivo'] === dispositivosAsignaciones[j]['nombreDispositivo']) {
                        for (let k = 0; k < dispositivosAsignaciones[j]['numeroCanales']; k++) {
                            // nuevosCanales = dispositivosAsignaciones[j]['numeroCanales'];
                            nuevosCanales.push(k);
                        }
                    }
                }

                let nuevoCanal = {
                    dispositivo: dispositivoParticipante[i]['dispositivo'],
                    canal: dispositivoParticipante[i]['canal'],
                    idTipo: dispositivoParticipante[i]['idTipo'],
                    tipoDispositivo: dispositivoParticipante[i]['tipoDispositivo'],
                    canalesAsignaciones: nuevosCanales,
                }
                datosC.push(nuevoCanal);
                console.log('datosC');
                console.log(datosC);
                // console.log(dispositivoParticipante[i], i);
                // cambiarDispositivoAsignaciones(dispositivoParticipante[i], i, 'Participantes')
            }
            setDatosCanales([...datosC]);
            setTimeout(
                function () {
                    setBanderaAsignaciones(true);
                },
                200
            );
        }

    }

    const nuevaAsignacion = () => {
        let asignaciones = datosCanales;
        // let dispositivosGrupos = grupoActual['dispositivos'];
        // let nombresDisp = new Array();
        // let canalesDisp = new Array();
        // for (let i = 0; i < dispositivosGrupos.length; i++){
        //     nombresDisp.push(dispositivosGrupos[i]['nombreDispositivos']);
        //     canalesDisp.push(dispositivosGrupos[i]['canales']);
        //     let 

        //aqui debo traer el nombre de los dispositivos que tiene un grupo
        let arregloDispositivosBD = new Array()

        let nuevosCanales = new Array();
        let nuevoCanal = {
            dispositivo: '',
            canal: '',
            idTipo: '',
            tipoDispositivo: '',
            canalesAsignaciones: nuevosCanales,
        }
        asignaciones.push(nuevoCanal);
        setBanderaAsignaciones(true);
        setDatosCanales([...asignaciones]);
        setDispositivosGrupo(arregloDispositivosBD);
    }

    const cambiarDispositivoAsignaciones = (dispositivo, indexDatosCanales, direccion) => {
        // console.log('dispositivo');
        // console.log(dispositivo);
        // console.log('indexDatosCanales');
        // console.log(indexDatosCanales);
        let datosC = datosCanales;
        let arregloCanales = new Array();
        // if (direccion === 'Participantes') {
        //     datosC[indexDatosCanales]['dispositivo'] = dispositivo['dispositivo'];
        //     datosC[indexDatosCanales]['tipoDispositivo'] = dispositivo['tipoDispositivo'];
        // }
        // else if (direccion === 'Select') {
        datosC[indexDatosCanales]['dispositivo'] = dispositivo['nombreDispositivo'];
        datosC[indexDatosCanales]['tipoDispositivo'] = dispositivo['tipoDispositivo'];

        for (let i = 0; i < dispositivo['numeroCanales']; i++) {
            arregloCanales.push(i);
        }
        // }
        datosC[indexDatosCanales]['canalesAsignaciones'] = arregloCanales;
        setDatosCanales([...datosC]);
        // setCanalesAsignaciones([...arregloCanales]);
    }

    const cambiarCanales = (indexDispositivos, canalSeleccionado) => {
        let datosC = datosCanales;
        datosC[indexDispositivos]['canal'] = canalSeleccionado;
        setDatosCanales([...datosC]);
    }

    const eliminarAsignacion = (asignacion, indexAsignacion) => {
        setBanderaAsignaciones(false);
        let datosC = datosCanales;
        datosC.splice(indexAsignacion, 1);
        setDatosCanales([...datosC]);

        setTimeout(
            function () {
                setBanderaAsignaciones(true);
            },
            10
        );
    }

    const guardarAsignacion = async () => {
        let particiActual = participanteActualAsignacion;
        let datosC = datosCanales;
        let arrFiltrado = new Array();
        for (let i = 0; i < datosC.length; i++) {
            let asignaciones = {
                idTipo: datosC[i]['idTipo'],
                canal: datosC[i]['canal'],
                dispositivo: datosC[i]['dispositivo'],
                tipoDispositivo: datosC[i]['tipoDispositivo']
            }
            arrFiltrado.push(asignaciones);
        }
        let guardarDispositivo = {
            dispositivos: arrFiltrado
        }
        particiActual['dispositivos'] = arrFiltrado;

        const resDispParticipantes = await axios.put(routesBD.participantes+'agregarDispositivos/' + particiActual['_id'], guardarDispositivo);
        console.log(resDispParticipantes.data.mensaje);
        //actualizar con nuevo arreglo creado
        setParticipanteActualAsignacion(particiActual);
    }

    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Preparación Experimento - Etapa Configuración</h3>
                <div className="card">
                    <div className="card-header">
                        <Grid container spacing={12}>
                            <Grid item xs={12}>
                                <div style={{ float: "left" }}>
                                    <Button
                                        variant="outlined"
                                        // color="secondary"
                                        size="small"
                                        style={{ margin: 3, textAlign: 'center' }}
                                        onClick={() => (window.location.href = rutasFront.PlanificacionExp + idUrl['id'])}
                                    >
                                        ← Volver Planificación
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ marginLeft: 30, }}>
                                    <h4>{nombreExp}</h4>
                                </div>

                            </Grid>

                        </Grid>

                    </div>
                    <div>
                        <Stepper activeStep={FaseActivaGlobal} alternativeLabel>
                            {
                                fasesExp.map(fase => (
                                    <Step key={fase._id}>
                                        <StepButton
                                            onClick={() => cambiarFaseActiva(fase.numeroFase - 1)}
                                        >Fase {fase.numeroFase}</StepButton>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </div>
                    <div className="container-fluid">
                        <div>
                            {
                                asignaciones ?
                                    <Button variant="outlined" color="primary" onClick={() => setAsignaciones(!asignaciones)} style={{ margin: 'auto', display: "flex" }}>
                                        Ir a Asignaciones Dispositivos
                                    </Button>
                                    :
                                    <Button variant="outlined" color="primary" onClick={() => setAsignaciones(!asignaciones)} style={{ margin: 'auto', display: "flex" }}>
                                        Ir a Creacion de Grupos
                                    </Button>
                            }

                            {
                                asignaciones ?
                                    <div className="card-body">
                                        <div className="card-header">
                                            <h3>Creación de Grupos</h3>
                                            <br />
                                            <Grid container spacing={12}>
                                                <Grid item xs={3}>
                                                    <Grid item xs={11}>
                                                        <Grid container spacing={12}>
                                                            <Grid item xs={4}>
                                                                <h4 >Grupos</h4>
                                                            </Grid>
                                                            <Grid item xs={2} >
                                                                <div style={{ float: "right" }} className={classes.fawesome} >
                                                                    <IconButton size="small" variant="contained" color="primary" onClick={handleOpenModalNuevoGrupo} style={{ margin: 0, textAlign: 'left' }}>
                                                                        <Icon className="fa fa-plus-square" color="primary" />
                                                                    </IconButton >
                                                                </div>
                                                                <Modal
                                                                    backdropColor="transparent"
                                                                    open={openModalNuevoGrupo}
                                                                    onClose={closeModalNuevoGrupo}
                                                                    closeAfterTransition
                                                                    BackdropComponent={Backdrop}
                                                                    BackdropProps={{
                                                                        timeout: 500,
                                                                    }}
                                                                >
                                                                    <Fade in={openModalNuevoGrupo} >
                                                                        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                                                            <Grid item xs={4} >
                                                                                <div className="card" >
                                                                                    <div className="card-header">
                                                                                        <h4>Agregar Nuevo Grupo</h4>
                                                                                    </div>
                                                                                    <div className="card-body">
                                                                                        <h5>Ingrese un Nombre para el Nuevo Grupo</h5>
                                                                                        <Grid item xs={12}>
                                                                                            <TextField
                                                                                                variant="filled"
                                                                                                // multiline
                                                                                                autoFocus
                                                                                                // margin="dense"
                                                                                                id="standard-multiline-static"
                                                                                                label="Nombre Nuevo Grupo"
                                                                                                fullWidth
                                                                                                onChange={handleSaveNuevoGrupo}
                                                                                                name="nombreGrupo"
                                                                                            />
                                                                                        </Grid>
                                                                                    </div>
                                                                                    <div className="card-footer">
                                                                                        <div style={{ float: "right" }}>
                                                                                            <Button variant="contained" onClick={closeModalNuevoGrupo} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                                Cancelar
                                                                                            </Button>
                                                                                            <Button variant="contained" type="submit" onClick={guardarNuevoGrupo} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                                Guardar
                                                                                            </Button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Grid>
                                                                        </div>
                                                                    </Fade>
                                                                </Modal>
                                                            </Grid>
                                                        </Grid>
                                                        <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 300, backgroundColor: "white" }}>
                                                            {
                                                                dataGrupos.map((row, index) => (
                                                                    <Grid container >
                                                                        <Grid item xs={8}>
                                                                            <Button
                                                                                fullWidth
                                                                                variant="contained"
                                                                                color="primary"
                                                                                // onClick={()=> console.log(arrGruposDisabled[index]['disabled'])}
                                                                                onClick={() => cambiarGrupo(row)}

                                                                                // disabled={arrGruposDisabled[index]['disabled']}
                                                                                // disabled={false}
                                                                                // onClick={() => handleOpenModalGuardarDatosGrupos(faseActiva + 1)}
                                                                                size="small"
                                                                                style={{ margin: 10, marginLeft: 20 }}
                                                                            >
                                                                                {row.descripcion}
                                                                            </Button>
                                                                        </Grid>

                                                                        <Grid item xs={1}>
                                                                            {/* <div style={{ float: "left" }} className={classes.fawesome} > */}
                                                                            <IconButton size="small" variant="contained" color="secondary" style={{ marginTop: 11, marginLeft: 25 }}>
                                                                                <Icon className="fa fa-minus-square" onClick={() => eliminarGrupos(row._id, row.participantes)} color="secondary" />
                                                                            </IconButton >
                                                                            {/* </div> */}
                                                                        </Grid>
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </TableContainer>
                                                    </Grid>
                                                    <br />
                                                </Grid>
                                                <Grid item xs={9} style={{ float: 'none', margin: 'auto', }}>
                                                    <h4>Asignaciones grupo : {nombreAsignacionesGrupo}</h4>
                                                    <div className={classes.tabsStyles}>
                                                        <AppBar position="static">
                                                            <Tabs value={tab}
                                                                onChange={handleChange}
                                                                indicatorColor="primary" variant="scrollable" scrollButtons="auto" aria-label="simple tabs example">
                                                                <Tab label="Dispositivos" />
                                                                <Tab label="Participantes" />
                                                            </Tabs>
                                                        </AppBar>
                                                        {
                                                            banderaDispositivosTotal ?
                                                                <TabPanel value={tab} index={0}>
                                                                    <Grid item xs={2} >
                                                                        <div style={{ float: "left" }} className={classes.fawesome} >
                                                                            <IconButton onClick={() => nuevoDispositivo()} size="small" variant="contained" color="primary" style={{ margin: 0, textAlign: 'left' }}>
                                                                                <Icon className="fa fa-plus-square" color="primary" />
                                                                            </IconButton >
                                                                        </div>
                                                                    </Grid>
                                                                    <br />

                                                                    {
                                                                        banderaDispositivos ?
                                                                            <Grid container spacing={2}>

                                                                                <Grid container spacing={2}>
                                                                                    <Grid item xs={12}>
                                                                                        <Grid container spacing={2}>
                                                                                            <Grid item xs={4}>
                                                                                                Tipo
                                                                                            </Grid>
                                                                                            <Grid item xs={4}>
                                                                                                Nombre
                                                                                            </Grid>
                                                                                            <Grid item xs={3}>
                                                                                                N° Canales
                                                                                            </Grid>
                                                                                            <Grid item xs={1}>
                                                                                                Elimi.
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                    {
                                                                                        datosDispositivos.map((row, index) => (
                                                                                            <Grid item xs={12}>
                                                                                                <Grid container spacing={2}>
                                                                                                    <Grid item xs={4}>
                                                                                                        <FormControl fullWidth variant="filled" >
                                                                                                            <InputLabel id="demo-simple-select-filled-label">Tipos</InputLabel>
                                                                                                            <Select
                                                                                                                labelId="demo-simple-select-filled-label"
                                                                                                                id="demo-simple-select-filled"
                                                                                                                value={row.tipoDispositivo}
                                                                                                            >
                                                                                                                {
                                                                                                                    tiposDispositivosBD.map((tipos) => (
                                                                                                                        <MenuItem value={tipos.nombre} onClick={() => cambiarTipoDispositivo(row, index, tipos.nombre, tipos.canales)}>
                                                                                                                            {tipos.nombre}
                                                                                                                        </MenuItem>
                                                                                                                    ))
                                                                                                                }
                                                                                                            </Select>
                                                                                                        </FormControl>
                                                                                                    </Grid>
                                                                                                    <Grid item xs={4}>
                                                                                                        {/* <Grid item xs={12}> */}

                                                                                                        <TextField
                                                                                                            variant="filled"
                                                                                                            // multiline
                                                                                                            autoFocus
                                                                                                            // margin="dense"
                                                                                                            id="standard-multiline-static"
                                                                                                            label="Agregar Nombre Dispositivo"
                                                                                                            fullWidth
                                                                                                            defaultValue={row.nombreDispositivo}
                                                                                                            value={row.nombreDispositivo}
                                                                                                            onChange={cambiarNombreDispositivo}
                                                                                                            name={index}
                                                                                                        />
                                                                                                        {/* </Grid> */}
                                                                                                    </Grid>
                                                                                                    <Grid item xs={3}>
                                                                                                        <TextField
                                                                                                            disabled
                                                                                                            variant="filled"
                                                                                                            value={row.numeroCanales}
                                                                                                            // multiline
                                                                                                            autoFocus
                                                                                                            // margin="dense"
                                                                                                            id="standard-multiline-static"
                                                                                                            label="Numeros"
                                                                                                            fullWidth
                                                                                                            // onChange={handleSave}
                                                                                                            name="numeroCanales"
                                                                                                        />
                                                                                                    </Grid>
                                                                                                    <Grid item xs={1}>
                                                                                                        <div style={{ float: "left" }} className={classes.fawesome} >
                                                                                                            <IconButton onClick={() => eliminarDispositivo(row, index)} size="small" variant="contained" color="secondary" style={{ marginTop: 13, textAlign: 'center' }}>
                                                                                                                <Icon className="fa fa-minus-square" color="secondary" />
                                                                                                            </IconButton >
                                                                                                        </div>
                                                                                                    </Grid>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        ))
                                                                                    }
                                                                                </Grid>

                                                                                <Grid item xs={12}>
                                                                                    <Button
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                        size="medium"
                                                                                        style={{ margin: 3, textAlign: 'right', float: 'right' }}
                                                                                        onClick={() => guardarDatosDispositivos()}
                                                                                    >
                                                                                        Guardar
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                            :
                                                                            <Grid></Grid>
                                                                    }
                                                                </TabPanel>
                                                                :
                                                                <Grid></Grid>
                                                        }

                                                        {
                                                            banderaParticipantesGrupoTotal ?
                                                                <TabPanel value={tab} index={1}>
                                                                    <Grid item xs={2} >
                                                                        <div style={{ float: "left" }} className={classes.fawesome} >
                                                                            <IconButton onClick={() => nuevoParticipante()} size="small" variant="contained" color="primary" style={{ margin: 0, textAlign: 'left' }}>
                                                                                <Icon className="fa fa-plus-square" color="primary" />
                                                                            </IconButton >
                                                                        </div>
                                                                    </Grid>
                                                                    <br />

                                                                    {
                                                                        banderaParticipantesGrupo ?
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12}>
                                                                                    <Grid container spacing={2}>
                                                                                        <Grid item xs={4}>
                                                                                            Nombre
                                                                                        </Grid>
                                                                                        <Grid item xs={1}>
                                                                                            Elimi.
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    {gruposParticipantes.map((row, index) => (
                                                                                        <Grid container spacing={2}>
                                                                                            <Grid item xs={4}>
                                                                                                <TextField
                                                                                                    variant="filled"
                                                                                                    autoFocus
                                                                                                    id="standard-multiline-static"
                                                                                                    label="Nombre Participante"
                                                                                                    fullWidth
                                                                                                    defaultValue={row.descripcion}
                                                                                                    value={row.descripcion}
                                                                                                    onChange={cambiarNombreParticipante}
                                                                                                    name={index}
                                                                                                />
                                                                                            </Grid>
                                                                                            <Grid item xs={1}>
                                                                                                <div style={{ float: "left" }} className={classes.fawesome} >
                                                                                                    <IconButton onClick={() => eliminarParticipante(row, index)} size="small" variant="contained" color="secondary" style={{ marginTop: 13, textAlign: 'center' }}>
                                                                                                        <Icon className="fa fa-minus-square" color="secondary" />
                                                                                                    </IconButton >
                                                                                                </div>
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                    ))
                                                                                    }
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <Button
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                        size="medium"
                                                                                        style={{ margin: 3, textAlign: 'right', float: 'right' }}
                                                                                        onClick={() => guardarDatosParticipantes()}
                                                                                    >
                                                                                        Guardar
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                            :
                                                                            <Grid></Grid>
                                                                    }
                                                                </TabPanel>
                                                                :
                                                                <Grid></Grid>
                                                        }
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                    :
                                    <div className="card-body">
                                        <div className="card-header">
                                            <h3>Asignaciones de Dispositivos</h3>
                                            <br />
                                            <Grid container spacing={12}>
                                                <Grid item xs={3}>
                                                    <Grid item xs={11}>
                                                        <Grid container spacing={12}>
                                                            {/* <Grid item xs={4}> */}
                                                            <FormControl fullWidth variant="filled" >
                                                                <InputLabel id="demo-simple-select-filled-label" style={{ backgroundColor: "#0d47a1", color: 'white' }}>Grupos</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-filled-label"
                                                                    id="demo-simple-select-filled"
                                                                    style={{ backgroundColor: "#0d47a1", color: 'white' }}
                                                                    value={grupoActual['descripcion']}
                                                                >
                                                                    {
                                                                        dataGrupos.map((grupos, index) => (
                                                                            <MenuItem value={grupos.descripcion} onClick={() => cambiarGrupoSeleccionado(grupos, index)}>
                                                                                {grupos.descripcion}
                                                                            </MenuItem>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                            {/* </Grid> */}
                                                        </Grid>

                                                        <br />
                                                        {
                                                            banderaParticipantesAsignaciones ?
                                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 300, backgroundColor: "white" }}>
                                                                    {
                                                                        gruposParticipantesAsignaciones.map((row) => (
                                                                            <Grid container >
                                                                                <Grid item xs={10}>
                                                                                    <Button
                                                                                        fullWidth
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                        // disabled
                                                                                        onClick={() => cambiarParticipantesAsignaciones(row)}
                                                                                        size="small"
                                                                                        style={{ margin: 10, marginLeft: 20 }}
                                                                                    >
                                                                                        {row.descripcion}
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>
                                                                        ))
                                                                    }
                                                                </TableContainer>
                                                                :
                                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 300, backgroundColor: "white" }}></TableContainer>

                                                        }
                                                    </Grid>
                                                    <br />
                                                </Grid>
                                                <Grid item xs={9} style={{ float: 'none', margin: 'auto', }}>
                                                    <h4>Asignaciones Participante: {participanteActual}</h4>
                                                    <div className={classes.tabsStyles}>
                                                        <AppBar position="static">
                                                            <Tabs value={tab2}
                                                                onChange={handleChange2}
                                                                indicatorColor="primary" variant="scrollable" scrollButtons="auto" aria-label="simple tabs example">
                                                                <Tab label="Canales" />
                                                            </Tabs>
                                                        </AppBar>

                                                        {
                                                            banderaAsignacionesTotales ?
                                                                <TabPanel value={tab2} index={0}>
                                                                    <Grid item xs={2} >
                                                                        <div style={{ float: "left" }} className={classes.fawesome} >
                                                                            <IconButton onClick={() => nuevaAsignacion()} size="small" variant="contained" color="primary" style={{ margin: 0, textAlign: 'left' }}>
                                                                                <Icon className="fa fa-plus-square" color="primary" />
                                                                            </IconButton >
                                                                        </div>
                                                                    </Grid>
                                                                    <br />
                                                                    {
                                                                        banderaAsignaciones ?
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12}>
                                                                                    <Grid container spacing={2}>
                                                                                        <Grid item xs={4}>
                                                                                            Dispositivo
                                                                                        </Grid>
                                                                                        <Grid item xs={4}>
                                                                                            Canal
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    {
                                                                                        datosCanales.map((row, index) => (
                                                                                            <Grid container spacing={2}>
                                                                                                <Grid item xs={4}>
                                                                                                    <FormControl fullWidth variant="filled" >
                                                                                                        <InputLabel id="demo-simple-select-filled-label">Dispositivos</InputLabel>
                                                                                                        <Select
                                                                                                            labelId="demo-simple-select-filled-label"
                                                                                                            id="demo-simple-select-filled"
                                                                                                            defaultValue={datosCanales[index]['dispositivo']}
                                                                                                            value={datosCanales[index]['dispositivo']}
                                                                                                        // onChange={() => cambiarDispositivoAsignaciones(canalSeleccionado, indexCanal)}
                                                                                                        >
                                                                                                            {
                                                                                                                dispositivosAsignaciones.map((rows) => (
                                                                                                                    // onClick={() => cambiarDispositivoAsignaciones(rows, index)}
                                                                                                                    // onClick={() => setCanalSeleccionado(rows), setIndexCanal(index)}
                                                                                                                    // onClick={() => cambiarCanalIndex(rows, index)}
                                                                                                                    <MenuItem value={rows.nombreDispositivo} onClick={() => cambiarDispositivoAsignaciones(rows, index, 'Select')}>
                                                                                                                        {rows.nombreDispositivo}
                                                                                                                    </MenuItem>
                                                                                                                ))
                                                                                                            }
                                                                                                        </Select>
                                                                                                    </FormControl>
                                                                                                </Grid>
                                                                                                <Grid item xs={4}>
                                                                                                    <FormControl fullWidth variant="filled" >
                                                                                                        <InputLabel id="demo-simple-select-filled-label">Canales</InputLabel>
                                                                                                        <Select
                                                                                                            labelId="demo-simple-select-filled-label"
                                                                                                            id="demo-simple-select-filled"
                                                                                                            defaultValue={datosCanales[index]['canal']}
                                                                                                            value={datosCanales[index]['canal']}
                                                                                                        >
                                                                                                            {
                                                                                                                // onClick={() => cambiarCanales(index, canalDisp)}
                                                                                                                datosCanales[index]['canalesAsignaciones'].map((canalDisp) => (
                                                                                                                    <MenuItem value={canalDisp} onClick={() => cambiarCanales(index, canalDisp)} >
                                                                                                                        {canalDisp}
                                                                                                                    </MenuItem>
                                                                                                                ))
                                                                                                            }
                                                                                                        </Select>
                                                                                                    </FormControl>
                                                                                                </Grid>
                                                                                                <Grid item xs={1}>
                                                                                                    <div style={{ float: "left" }} className={classes.fawesome} >
                                                                                                        <IconButton onClick={() => eliminarAsignacion(row, index)} size="small" variant="contained" color="secondary" style={{ marginTop: 13, textAlign: 'center' }}>
                                                                                                            <Icon className="fa fa-minus-square" color="secondary" />
                                                                                                        </IconButton >
                                                                                                    </div>
                                                                                                </Grid>
                                                                                            </Grid>
                                                                                        ))
                                                                                    }
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <Button
                                                                                        variant="contained"
                                                                                        color="primary"
                                                                                        size="medium"
                                                                                        style={{ margin: 3, textAlign: 'right', float: 'right' }}
                                                                                        onClick={() => guardarAsignacion()}
                                                                                    >
                                                                                        Guardar
                                                                                    </Button>
                                                                                </Grid>

                                                                            </Grid>
                                                                            :
                                                                            <Grid></Grid>
                                                                    }

                                                                </TabPanel>
                                                                :
                                                                <Grid></Grid>
                                                        }

                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="card-footer">

                        <div style={{ float: "right" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                                onClick={() => botonCancelar()}
                            >
                                Salir
                            </Button>
                            {
                                cambiarBoton ?
                                    <Button
                                        variant="contained"
                                        color="default"
                                        // onClick={() => handleOpenModalGuardarDatos(faseActiva + 1)}
                                        onClick={() => cambiarFaseActiva(FaseActivaGlobal + 1)}
                                        size="small"
                                        style={{ margin: 3 }}
                                    >
                                        Continuar Fase
                                    </Button>
                                    :
                                    <Button
                                        variant="contained"
                                        color="green"
                                        onClick={() => cambiarFaseActiva(FaseActivaGlobal + 1)}
                                        size="small"
                                        style={{ margin: 3 }}
                                    >
                                        Continuar Ejecución
                                    </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}