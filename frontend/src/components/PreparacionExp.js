import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, Checkbox, IconButton, CircularProgress } from '@material-ui/core/';
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core/';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { Stepper, Step, StepButton, LinearProgress } from '@material-ui/core/'
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';


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
export default function PreparacionExp() {

    const location = useLocation();
    const idUrl = useParams();
    const classes = useStyles();
    const [datosGrupos, setDatosGrupos] = useState({
        grupo: '',
        numeroSerie: '',
    })
    const [datosParticipantes, setDatosParticipantes] = useState({
        participante: '',
        numeroSerie: '',
    })

    const [open, setOpen] = React.useState(false);
    const [urlconsulta, setUrlConsulta] = useState('');
    const [tab, setTab] = React.useState(0);
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

    const [filas, setFilas] = React.useState([
        {
            "id": "1",
            "nombre": 'Grupo 1',
            "seleccionado": false
        },
        {
            "id": "2",
            "nombre": "Grupo 2",
            "seleccionado": false
        },
        {
            "id": "3",
            "nombre": "Grupo 3",
            "seleccionado": false
        },
        {
            "id": "4",
            "nombre": "Grupo 4",
            "seleccionado": false
        },
        {
            "id": "5",
            "nombre": "Grupo 5",
            "seleccionado": false
        },
        {
            "id": "6",
            "nombre": "Grupo 6",
            "seleccionado": false
        },
        {
            "id": "7",
            "nombre": "Grupo 7",
            "seleccionado": false
        },
        {
            "id": "8",
            "nombre": "Grupo 8",
            "seleccionado": false
        },
        {
            "id": "9",
            "nombre": "Grupo 9",
            "seleccionado": false
        },
    ]);

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
        url();
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
                    const res = await axios.get('http://localhost:81/api/grupos/' + arrGrupos[i][j]);
                    arrTotal.push(res.data.grupo);
                }
            }
            arrFasesGrupos.push(arrTotal);
            arrTotal = [];
        }
        setArrFasesxGrupo(arrFasesGrupos);
        setDataGrupos(arrFasesGrupos[0]);

        traerParticipantes(arrFasesGrupos[0], 'inicio');

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
                    const res = await axios.get('http://localhost:81/api/grupos/' + arreGrupos[i][j]);
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
                    const res = await axios.get('http://localhost:81/api/participantes/' + arreParticipantes[i][j]);
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
                    const res = await axios.get('http://localhost:81/api/participantes/' + arrParticipantes[i][j]);
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
        const res = await axios.get('http://localhost:81/api/experimentos/' + idUrl['id']);

        setIdExperimento(idUrl['id']);
        obtenerFases(res.data.experimento.fasesId);
        setNombreExp(res.data.experimento.nombreExp);
        setIdExp(res.data.experimento._id);

    };

    const obtenerFases = async (fases) => {
        let arrfases = fases;
        let arregloNFase = new Array;
        for (var i = 0; i < arrfases.length; i++) {
            let resF = await axios.get('http://localhost:81/api/fases/' + arrfases[i]);
            arregloNFase.push(resF.data.fase);
        }
        setFasesExp(arregloNFase);
        traerGrupos(arregloNFase);
        traerGruposIniciales(arregloNFase);
        traerMedicionesRegistrar(arregloNFase);
    }

    const traerMedicionesRegistrar = async (arregloNFase) => {
        let fases = arregloNFase;
        let arrTotalMediciones = new Array();
        for (let i = 0; i < fases.length; i++) {
            let medicionesFase = fases[i].idMediciones;
            let arrMediciones = new Array();
            for (let j = 0; j < medicionesFase.length; j++) {
                const resMediciones = await axios.get('http://localhost:81/api/mediciones/' + medicionesFase[j]);
                resMediciones.data.medicion.estado = false;
                arrMediciones.push(resMediciones.data.medicion);
            }
            arrTotalMediciones.push(arrMediciones);
        }
        setMedicionesFases(arrTotalMediciones);
        setMedicionesSelected(arrTotalMediciones[faseActiva]);
    }

    useEffect(() => {
        if (fasesExp.length > 0) {
            if (medicionesFases.length > 0) {
                let medicionesActuales = medicionesFases[faseActiva];
                setMedicionesSelected(medicionesActuales);
            }
        }
        if (faseActiva === (fasesExp.length - 1)) {
            setCambiarBoton(false);
        }
        return () => {
        }
    }, [faseActiva, fasesExp]);

    const handleOpenModalGrupo = (nombreGrupo) => {
        setOpenModalGrupo(true);
        setGrupoEditar(nombreGrupo);
    };

    const handleCloseModalGrupo = () => {
        let estado = !openModalGrupo;
        setOpenModalGrupo(estado);
    };

    const handleOpenModalParticipante = (nombreParticipante) => {
        setOpenModalParticipante(true);
        setParticipanteActivo(nombreParticipante);
    };

    const handleCloseModalParticipante = () => {
        let estado = !openModalParticipante;
        setOpenModalParticipante(estado);
    };

    const handleOpenModalNuevoGrupo = () => {
        setOpenModalNuevoGrupo(true);
    };

    const closeModalNuevoGrupo = () => {
        setOpenModalNuevoGrupo(false);
    };

    const guardarNuevoGrupo = () => {
        //debo preguntar si tengo participantes eliminados
        let grupos = dataGrupos;
        let contador = 0;
        let arrTotal = new Array();

        if (grupos.length === 0) {
            contador = 1;
            let descrip = 'Grupo ' + contador;
            let arregloVacio = new Array();
            let arrNuevo = {
                descripcion: descrip,
                numeroSerie: "",
                participantes: arregloVacio,
            }
            arrTotal.push(arrNuevo);
            let arrParticipantesTotal = arrarrParticipantes;
            arrParticipantesTotal.push(arrNuevo['participantes'])
            setDataGrupos(arrTotal);
            setArrArrParticipantes(arrParticipantesTotal);
        }

        if (grupos.length > 0) {
            contador = 1;
        };
        for (let i = 0; i < grupos.length; i++) {
            contador = contador + 1;
            arrTotal.push(grupos[i]);

            if (i === (grupos.length - 1)) {
                let descrip = 'Grupo ' + contador;
                let arregloVacio = new Array();
                let arrNuevo = {
                    descripcion: descrip,
                    numeroSerie: "",
                    participantes: arregloVacio,
                }
                arrTotal.push(arrNuevo);
                setDataGrupos(arrTotal);
                let arrParticipantesTotal = arrarrParticipantes;
                arrParticipantesTotal.push(arrNuevo['participantes']);
                setArrArrParticipantes(arrParticipantesTotal);
            }

        }
        closeModalNuevoGrupo();
    }

    const handleOpenModalNuevoParticipante = () => {
        setOpenModalNuevoParticipante(true);
    };

    const closeModalNuevoParticipante = () => {
        setOpenModalNuevoParticipante(false);
    };

    const guardarNuevoParticipante = () => {
        let participantes = dataParticipantes;
        let grupoSelected = grupoSeleccionado;
        let separador = " ";
        let grupoString = grupoSelected.split(separador);
        let indiceGrupo = parseInt(grupoString[1]) - 1;
        let contador = 0;
        let arrarrGrupo = arrarrParticipantes;
        let arrTotal = new Array();

        if (participantes.length === 0) {
            contador = 1;
            let descrip = 'Participante ' + contador;
            let arregloVacio = "";
            let arrNuevo = {
                descripcion: descrip,
                numeroSerie: arregloVacio,
                grupoAsociado: grupoSelected,
            }
            arrTotal.push(arrNuevo);
            arrarrGrupo[indiceGrupo] = arrTotal;
            setDataParticipantes(arrTotal);
            setArrArrParticipantes(arrarrGrupo);
        }
        if (participantes.length > 0) {
            contador = 1;
        };

        for (let i = 0; i < participantes.length; i++) {
            contador = contador + 1;
            arrTotal.push(participantes[i]);

            if (i === (participantes.length - 1)) {
                let descrip = 'Participante ' + contador;
                let arregloVacio = "";
                let arrNuevo = {
                    descripcion: descrip,
                    numeroSerie: arregloVacio,
                    grupoAsociado: grupoSelected,
                }
                arrTotal.push(arrNuevo);
                setDataParticipantes(arrTotal);
                arrarrGrupo[indiceGrupo] = arrTotal;
                setArrArrParticipantes(arrarrGrupo);
            }
        }
        closeModalNuevoParticipante();
    }


    const mientrasCambiaGrupo = (e) => {
        setDatosGrupos({
            ...datosGrupos,
            [e.target.name]: e.target.value
        })
    };

    const mientrasCambiaParticipante = (e) => {
        setDatosParticipantes({
            ...datosParticipantes,
            [e.target.name]: e.target.value
        })
    };

    const enviarDatos = async () => {
        // e.preventDefault();
        let data = {
            idFase: fases[faseActiva]._id,
            descripcion: 'a',
            tiempo: 'hola'
        };
        guardarObservacion(data);
    }

    const guardarDatosGrupo = async () => {
        // e.preventDefault();
        let grupo = grupoEditar;
        let arregloGrupos = dataGrupos;
        let dispositivoGrupo = '';
        let dispositivoNuevo = datosGrupos.numeroSerie;

        if (dispositivoNuevo != '') {
            for (let i = 0; i < arregloGrupos.length; i++) {
                if (arregloGrupos[i].descripcion === grupo) {
                    dispositivoGrupo = dispositivoNuevo;
                    arregloGrupos[i].numeroSerie = dispositivoGrupo;
                    setDataGrupos(arregloGrupos);
                }
            }
        }
        handleCloseModalGrupo();
    }

    const guardarDatosParticipante = async () => {
        let participante = participanteActivo;
        let arregloParticipantes = dataParticipantes;
        let dispositivoPart = '';
        let dispositivoNuevo = datosParticipantes.numeroSerie;

        if (dispositivoNuevo != '') {
            for (let i = 0; i < arregloParticipantes.length; i++) {
                if (arregloParticipantes[i].descripcion === participante) {
                    dispositivoPart = dispositivoNuevo;
                    arregloParticipantes[i].numeroSerie = dispositivoPart;
                    setDataParticipantes(arregloParticipantes);
                }
            }
        }
        handleCloseModalParticipante();
    }

    const eliminarFila = (descripcion) => {

        let separador = " ";
        let tipo = descripcion.split(separador);
        let arregloInicial;

        if (tipo[0] === 'Grupo') { arregloInicial = dataGrupos; };
        if (tipo[0] === 'Participante') { arregloInicial = dataParticipantes; };
        let arregloFinal = arregloInicial;

        for (let i = 0; i < arregloInicial.length; i++) {
            if (arregloInicial[i]['descripcion'] === descripcion) {
                arregloInicial.splice(i, 1);
                if (i < arregloInicial.length) {
                    let actual = i;
                    for (let j = i; j < arregloFinal.length; j++) {
                        let ajuste = arregloFinal[actual]['descripcion'].split(separador);
                        if (tipo[0] === 'Grupo') {
                            arregloFinal[actual]['descripcion'] = ('Grupo ' + (parseInt(ajuste[1]) - 1));
                        }
                        if (tipo[0] === 'Participante') {
                            arregloFinal[actual]['descripcion'] = ('Participante ' + (parseInt(ajuste[1]) - 1));
                        }
                        if (actual < arregloFinal.length - 1) {
                            actual = actual + 1
                        }
                    }
                    if (tipo[0] === 'Grupo') {
                        let arrarrParticipantesB = arrarrParticipantes;
                        arrarrParticipantesB.splice(i, 1);
                        for (let h = i; h < arrarrParticipantesB.length; h++) {
                            for (let g = 0; g < arrarrParticipantesB[h].length; g++) {
                                if (arrarrParticipantesB[h][g].hasOwnProperty('grupoAsociado')) {
                                    let ajusteArrArr = arrarrParticipantesB[h][g]['grupoAsociado'].split(separador);
                                    arrarrParticipantesB[h][g]['grupoAsociado'] = ('Grupo ' + (parseInt(ajusteArrArr[1]) - 1));
                                }
                            }
                        }

                        setDataGrupos(arregloFinal);
                        setDataParticipantes([]);
                        setBanderaGrupo(!banderaGrupo);
                        setBanderaParticipantes(!banderaParticipantes);

                    }
                    if (tipo[0] === 'Participante') {
                        setDataParticipantes(arregloFinal);
                        setBanderaParticipantes(!banderaParticipantes);
                    }
                } else {
                    if (tipo[0] === 'Grupo') {
                        let arrarrParticipantesB = arrarrParticipantes;
                        arrarrParticipantesB.splice(i, 1);

                        setDataGrupos(arregloFinal);
                        setDataParticipantes([]);
                        setBanderaGrupo(!banderaGrupo);
                        setBanderaParticipantes(!banderaParticipantes);
                    }
                    if (tipo[0] === 'Participante') {
                        setDataParticipantes(arregloFinal);
                        setBanderaParticipantes(!banderaParticipantes);
                    }
                }
            }
        }
    }

    const guardarObservacion = async (data) => {
    }

    const guardarDispositivoGrupo = async (data) => {
        handleCloseModalGrupo();
        handleCloseModalParticipante();
    }

    const clickGrupos = (name) => {
        let seleccionado = selected;
        let arregloGrupo = dataGrupos;
        // let participantes = dataParticipantes;
        let idGrupo = name;
        let conteoSelec = conteoSelectedG;

        for (let i = 0; i < arregloGrupo.length; i++) {
            if (conteoSelec < 1 || (conteoSelec === 1)) {
                if (arregloGrupo[i]['descripcion'] === idGrupo) {
                    setSelected(!seleccionado);
                    let arregloGruposSeleccionados = arregloGruposSelect;
                    if (conteoSelec === 0) {
                        if (arregloGruposSeleccionados[0][idGrupo] === false) {
                            let conteo = conteoSelec + 1;
                            setConteoSelectedG(conteo);
                            setGrupoSeleccionado(idGrupo);
                            arregloGruposSeleccionados[0][idGrupo] = !(arregloGruposSeleccionados[0][idGrupo]);

                            traerParticipantesGrupo(arregloGrupo[i]);
                            setNombreGrupoHeader(name);
                            setHiddenParticipantes(false);
                        }
                    }
                    if (conteoSelec === 1) {
                        if (arregloGruposSeleccionados[0][idGrupo] === true) {
                            let conteo = conteoSelec - 1;
                            setConteoSelectedG(conteo);
                            setGrupoSeleccionado(idGrupo);
                            arregloGruposSeleccionados[0][idGrupo] = !(arregloGruposSeleccionados[0][idGrupo]);
                            setDataParticipantes([]);
                            setNombreGrupoHeader('');
                            setHiddenParticipantes(true);
                        }
                    }
                    setFilas(arregloGrupo);
                    setBanderaGrupo(!banderaGrupo);
                }
            }
        };
    }

    const traerParticipantesGrupo = (grupo) => {
        let infoGrupo = grupo;
        let separador = " ";
        let indiceArrPart = infoGrupo['descripcion'].split(separador);
        if (infoGrupo.hasOwnProperty('_id')) {
            setDataParticipantes(arrarrParticipantes[(parseInt(indiceArrPart[1]) - 1)]);
        } else {
            //reevaluar porque sea quien sea, debe tener el parametro de participantes y debe estar vacio o no entonces debo guardarlo o no
            setDataParticipantes(arrarrParticipantes[(parseInt(indiceArrPart[1]) - 1)]);
        }
    }

    const guardarTodo = () => {
        let arregloGrupo = dataGrupos;
        let arregloParticipantes = dataParticipantes;
        let id;
        for (let i = 0; i < arregloGrupo.length; i++) {
        }
        for (let i = 0; i < arregloParticipantes.length; i++) {
            if (arregloParticipantes[i].hasOwnProperty('_id')) {
                console.log(arregloParticipantes[i]);
                //necesito actualizar por PUT
                //tengo que volver a traer por GET los participantes y comparar si es que no alguno en bd de los que ahora tengo
                // si no existe alguno, entonces debo eliminar ese participante de su tabla y del arreglo de tabla Grupos
            }
            //else - si no tiene id necesito agregarlo por POST y traer su id para colocarla en el arreglo de tabla Grupos
        }
    }

    const cambiarFaseActiva = (fase) => {

        if (fase < fasesExp.length) {

            setGrupoComparacion(arregloFasesGrupos[fase]);
            traerParticipantesIniciales(arrFasesxGrupo[fase])
            setFaseActiva(fase);

            setDataGrupos(arrFasesxGrupo[fase]);
            traerParticipantes(arrFasesxGrupo[fase], 'inicio');

            setDataParticipantes([]);
            setNombreGrupoHeader('');
            setHiddenParticipantes(true);
            setConteoSelectedG(0);
            let arregloGruposSeleccionados = arregloGruposSelect[0];
            let tamañoObjetos = Object.keys(arregloGruposSeleccionados)
            for (let i = 0; i < tamañoObjetos.length; i++) {
                let grupo = tamañoObjetos[i]
                if (arregloGruposSeleccionados[grupo] === true) {
                    arregloGruposSeleccionados[grupo] = false;
                }
            }
        } else {
            //usar replace para evitar retrocesos de pagina
            // window.location.replace("http://");
            window.location.href = "http://localhost/ejecucion/" + idUrl['id'];
        }


    }

    const handleOpenModalGuardarDatos = (estado) => {
        let dirFaseActiva = direccionFaseActiva
        setOpenModalGuardarDatos(true);
        dirFaseActiva = estado;
        setDireccionFaseActiva(dirFaseActiva);
    }

    const closeModalGuardarDatos = async (estado) => {
        if (estado === 'Salir') {
            setOpenModalGuardarDatos(false);
            console.log('salir')
            setTimeout(
                function () {
                    window.location.href = "http://localhost/inicio";
                },
                2000
            );
        }
        if (direccionFaseActiva > (fasesExp.length - 1)) {
            console.log(faseActiva);
            setOpenModalGuardarDatos(false);
            let Etapa = {
                nombreExp: nombreExp,
                estado: 'Ejecucion'
            }
            const resEtapa = await axios.put('http://localhost:81/api/experimentos/' + idExperimento, Etapa);
            setTimeout(
                function () {
                    window.location.href = "http://localhost/ejecucion/" + idExperimento;
                },
                2000
            );
        }
        else if (direccionFaseActiva === (fasesExp.length - 1)) {
            cambiarFaseActiva(estado)
            setCambiarBoton(false);
            setOpenModalGuardarDatos(false);
        }
        else {
            setCambiarBoton(true);
            cambiarFaseActiva(estado)
            setOpenModalGuardarDatos(false);
        }
    }

    const guardarDatosFase = async (estado) => {
        // una vez que este en la ultima fase, debo de guardar los datos y reedireccionar a ejecucion, ademas de cambiar el estado de la fase o experimento
        let arrIdParticipantes = new Array();
        let arrIdGrupos = new Array();

        let idFase = fasesExp[faseActiva]['_id'];
        let arregloGrupos = dataGrupos;
        let arregloParticipantesxGrupo = arrarrParticipantes;
        let comparacionGrupo = grupoComparacion;
        let comparacionParticipantes = particiComparacion;
        let grupoEliminado = false;
        let nuevaData = false;

        // comparacion de arreglos y eliminacion de datos por DELETE +Solo para saber si se requiere eliminar de BD+
        // lo importante es determinar cual grupo o participante ya no esta, para asi eliminarlos y actualizar sus arreglos
        if (comparacionGrupo.length > 0) {
            let comparacionG = comparacionGrupo.length;
            for (let i = 0; i < comparacionG; i++) {
                let idComGr = comparacionGrupo[i]['_id'];
                let encontradoG = '';

                for (let m = 0; m < arregloGrupos.length; m++) {
                    if (arregloGrupos[m].hasOwnProperty('_id')) {
                        if (arregloGrupos[m]['_id'] === idComGr) {
                            encontradoG = idComGr;
                        }
                    }
                }
                if (encontradoG === '') {
                    //cambiar el arreglo de la fase y actualizar la fase sin la id del grupo actual
                    let fase = faseActiva;
                    let idFaseActiva = idFase;
                    let idFaseGrupos = fasesExp[fase]['idGrupos'];
                    let numeroGrupos = idFaseGrupos.length;
                    let arregIdGrupos = new Array();
                    for (let n = 0; n < numeroGrupos; n++) {
                        if (idFaseGrupos[n] != idComGr) {
                            arregIdGrupos.push(idFaseGrupos[n]);
                        }
                    }
                    //la fase debe recibir el arreglo de grupos especificamente
                    let arrGruposID = {
                        idGrupos: arregIdGrupos
                    }
                    console.log('Actualizando Fase - Grupo Eliminado... ');
                    const resFases = await axios.put('http://localhost:81/api/fases/agregarGrupos/' + idFaseActiva, arrGruposID);
                    let arrDelGrupo = comparacionGrupo[i]['_id'];
                    console.log('Eliminando Grupo... ');
                    const resGrupos = await axios.delete('http://localhost:81/api/grupos/' + arrDelGrupo);

                    let arrDelPart = comparacionParticipantes[i];
                    for (let p = 0; p < arrDelPart.length; p++) {
                        console.log('Eliminando varios Participantes...  ');
                        const resParticipantes = await axios.delete('http://localhost:81/api/participantes/' + arrDelPart[p]['_id']);
                    }
                    comparacionGrupo.splice(i, 1)
                    comparacionParticipantes.splice(i, 1);
                    comparacionG = comparacionG - 1;
                }

                if (comparacionParticipantes.length > 0) {
                    let comparacionP = comparacionParticipantes[i].length;
                    for (let j = 0; j < comparacionP; j++) {
                        let idComPart = comparacionParticipantes[i][j]['_id'];
                        let encontradoP = '';
                        for (let k = 0; k < arregloParticipantesxGrupo.length; k++) {
                            for (let l = 0; l < arregloParticipantesxGrupo[k].length; l++) {
                                if (arregloParticipantesxGrupo[k][l].hasOwnProperty('_id')) {
                                    if (arregloParticipantesxGrupo[k][l]['_id'] === idComPart) {
                                        encontradoP = idComPart;
                                    }
                                }
                            }
                        }
                        if (encontradoP === '') {
                            let idGrupoArreglo = idComGr;
                            let idParticipante = idComPart;
                            let idParticipantes = comparacionGrupo[i]['participantes'];
                            let nuevoArrIdParticipantes = comparacionGrupo[i]['participantes'];
                            for (let o = 0; o < idParticipantes.length; o++) {
                                if (idParticipantes[o] === idParticipante) {
                                    nuevoArrIdParticipantes.splice(o, 1);
                                    let arrParticipantesID = {
                                        participantes: nuevoArrIdParticipantes,
                                    }

                                    console.log('Actualizando Grupos con nuevosParticipantes... ');
                                    const res = await axios.put('http://localhost:81/api/grupos/agregarParticipantes/' + idGrupoArreglo, arrParticipantesID);
                                }
                            }
                            comparacionGrupo[i]['participantes'] = nuevoArrIdParticipantes;

                            console.log('Eliminando Participante... ');
                            const resParticipante = await axios.delete('http://localhost:81/api/participantes/' + idParticipante);
                            comparacionParticipantes[i].splice(j, 1);
                            comparacionP = comparacionP - 1;

                            //comprobar que se esta elminando bien del arreglo y revisar lo siguiente, se debe eliminar del arreglo de grupos y actualizar y eliminar el participante
                        }
                    }
                }
            }
        }

        if (arregloGrupos.length > 0) {
            let arrIdGrupos = new Array();
            for (let i = 0; i < arregloGrupos.length; i++) {
                let arrIdParticipantes = new Array();
                if (arregloParticipantesxGrupo.length > 0) {
                    if (arregloParticipantesxGrupo[i].length > 0) {
                        for (let j = 0; j < arregloParticipantesxGrupo[i].length; j++) {
                            if (arregloParticipantesxGrupo[i][j].hasOwnProperty('_id')) {
                                let datosParticipante = {
                                    numeroSerie: arregloParticipantesxGrupo[i][j]['numeroSerie'],
                                    descripcion: arregloParticipantesxGrupo[i][j]['descripcion']
                                };

                                console.log('Actualizando Participante..');
                                const resParticipante = await axios.put('http://localhost:81/api/participantes/' + arregloParticipantesxGrupo[i][j]['_id'], datosParticipante);
                                arrIdParticipantes.push(arregloParticipantesxGrupo[i][j]['_id']);

                            }
                            if (arregloParticipantesxGrupo[i][j].hasOwnProperty('_id') === false) {
                                let datosParticipante = {
                                    numeroSerie: arregloParticipantesxGrupo[i][j]['numeroSerie'],
                                    descripcion: arregloParticipantesxGrupo[i][j]['descripcion']
                                };
                                const resParticipante = await axios.post('http://localhost:81/api/participantes', datosParticipante);
                                arrIdParticipantes.push(resParticipante.data.mensaje);
                                console.log('Nuevo Participante creado... ');
                                //ademas debo recibir su id y guardarla en arrIDParticipantes para subirlo a grupos
                            }
                        }
                    }
                }

                //actualizar la info de arregloGrupos con el nuevo arrIdParticipantes
                if (arregloGrupos[i].hasOwnProperty('_id')) {
                    let datosGrupo = {
                        participantes: arrIdParticipantes,
                        descripcion: arregloGrupos[i]['descripcion'],
                        numeroSerie: arregloGrupos[i]['numeroSerie'],
                    }
                    console.log('Actualizando Grupo...');
                    const resGrupos = await axios.put('http://localhost:81/api/grupos/' + arregloGrupos[i]['_id'], datosGrupo);
                    arrIdGrupos.push(arregloGrupos[i]['_id']);
                    nuevaData = true;
                    arrIdParticipantes = new Array();
                    // actualizar por por PUT toda su info nueva
                }
                if (arregloGrupos[i].hasOwnProperty('_id') === false) {
                    //subir por POST toda su info
                    let datosGrupo = {
                        participantes: arrIdParticipantes,
                        descripcion: arregloGrupos[i]['descripcion'],
                        numeroSerie: arregloGrupos[i]['numeroSerie'],
                    }
                    console.log('Creando Grupo Nuevo... ');
                    const resGrupos = await axios.post('http://localhost:81/api/grupos', datosGrupo);
                    arrIdGrupos.push(resGrupos.data.mensaje);

                    nuevaData = true;
                    arrIdParticipantes = new Array();
                    // debo actualizar el arreglo de fases al crear nuevo grupo
                }
            }

            if (nuevaData === true) {
                let arregloIdGrupos = {
                    idGrupos: arrIdGrupos
                };
                console.log('actualizando fase arregloGrupos... ')
                const resFases = await axios.put('http://localhost:81/api/fases/agregarGrupos/' + idFase, arregloIdGrupos);
                arregloIdGrupos = new Array();
            }
        }
        closeModalGuardarDatos(estado);
        // cambiarFaseActiva(faseActiva + 1);
    }

    const botonCancelar = () => {
        // ========= este deberia eliminar todo lo creado hasta ahora
        setTimeout(
            function () {
                window.location.href = "http://localhost/inicio";
            },
            2000
        );
    }

    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Preparacion Experimento</h3>
                <div className="card">
                    <div className="card-header">
                        <h4>{nombreExp}</h4>
                    </div>
                    <div>
                        <Stepper activeStep={faseActiva} alternativeLabel>
                            {
                                fasesExp.map(fase => (
                                    <Step key={fase._id}>
                                        {/* esta funcion debe ser igual que la anterior y debe de llamar un modal igualmente */}
                                        <StepButton onClick={() => handleOpenModalGuardarDatos(fase.numeroFase - 1)}>Fase {fase.numeroFase}</StepButton>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </div>
                    <div className="container-fluid">
                        <div>
                            <div className="card-body">
                                <div className="card-header">
                                    <Grid container spacing={12}>
                                        <Grid item xs={5}>
                                            <Grid item xs={11}>
                                                <Grid container spacing={12}>
                                                    <Grid item xs={3}>
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
                                                                                <h5>¿Desea Agregar un Nuevo Grupo para la fase?</h5>
                                                                            </div>
                                                                            <div className="card-footer">
                                                                                <div style={{ float: "right" }}>
                                                                                    {/* ========================================= PARA ADONDE VOY ADELANTE O UNO ESPECIFICO ============================================ */}
                                                                                    <Button variant="contained" onClick={closeModalNuevoGrupo} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                        no
                                                                                    </Button>
                                                                                    <Button variant="contained" type="submit" onClick={guardarNuevoGrupo} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                        Si
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </div>
                                                            </Fade>
                                                        </Modal>
                                                        <Modal
                                                            backdropColor="transparent"
                                                            open={openModalGrupo}
                                                            onClose={handleCloseModalGrupo}
                                                            closeAfterTransition
                                                            BackdropComponent={Backdrop}
                                                            BackdropProps={{
                                                                timeout: 500,
                                                            }}
                                                        >
                                                            <Fade in={openModalGrupo} >
                                                                <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                                                    <Grid item xs={4} >
                                                                        <div className="card" >
                                                                            <div className="card-header">
                                                                                <h4>Agregar Dispositivo Grupo</h4>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <form onSubmit={guardarDatosGrupo}>
                                                                                    <TextField
                                                                                        multiline
                                                                                        autoFocus
                                                                                        margin="dense"
                                                                                        id="standard-multiline-static"
                                                                                        label="Agregar ID Dispositivo para grupo"
                                                                                        fullWidth
                                                                                        onChange={mientrasCambiaGrupo}
                                                                                        name="numeroSerie"
                                                                                    />
                                                                                </form>
                                                                            </div>
                                                                            <div className="card-footer">
                                                                                <div style={{ float: "right" }}>
                                                                                    <Button variant="contained" onClick={handleCloseModalGrupo} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                        Cancelar
                                                                                    </Button>
                                                                                    <Button variant="contained" type="submit" onClick={guardarDatosGrupo} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
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
                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                    <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                        <TableBody onChange={banderaGrupo}>
                                                            {dataGrupos.map((row) => (
                                                                // <TableRow key={row._id} selected={row.seleccionado} >
                                                                //     <TableCell onClick={() => clickF(row.seleccionado, row.id)} component="th" scope="row">{row.nombre}</TableCell>
                                                                <TableRow key={row._id} hover selected={arregloGruposSelect[0][row.descripcion]}>
                                                                    <TableCell component="th" scope="row" onClick={() => clickGrupos(row.descripcion)}>{row.descripcion} </TableCell>
                                                                    <TableCell align="right">
                                                                        <div style={{ float: "right", margin: 2, textAlign: 'left' }} className={classes.fawesome}><CancelIcon onClick={() => eliminarFila(row.descripcion)} style={{ color: 'red' }} /></div>
                                                                        <div style={{ float: "right" }} className={classes.fawesome} >
                                                                            <IconButton size="small" variant="contained" color="primary" onClick={() => handleOpenModalGrupo(row.descripcion)} style={{ margin: 0, textAlign: 'left' }}>
                                                                                <Icon className="fa fa-plus-square" color="primary" />
                                                                            </IconButton >
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>


                                            <br />
                                            <Grid item xs={11}>

                                                <Grid container spacing={12}>
                                                    <Grid item xs={7}>
                                                        <h4>Participantes {nombreGrupoHeader}</h4>
                                                    </Grid>
                                                    <Grid item xs={2} >
                                                        <div hidden={hiddenParticipantes} style={{ float: "right" }} className={classes.fawesome} >
                                                            <IconButton size="small" variant="contained" color="primary" onClick={handleOpenModalNuevoParticipante} style={{ margin: 0, textAlign: 'left' }}>
                                                                <Icon className="fa fa-plus-square" color="primary" />
                                                            </IconButton >
                                                        </div>
                                                        <Modal
                                                            backdropColor="transparent"
                                                            open={openModalNuevoParticipante}
                                                            onClose={closeModalNuevoParticipante}
                                                            closeAfterTransition
                                                            BackdropComponent={Backdrop}
                                                            BackdropProps={{
                                                                timeout: 500,
                                                            }}
                                                        >
                                                            <Fade in={openModalNuevoParticipante} >
                                                                <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                                                    <Grid item xs={4} >
                                                                        <div className="card" >
                                                                            <div className="card-header">
                                                                                <h4>Agregar Nuevo Participante</h4>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <h5>¿Desea Agregar un Nuevo Participante al Grupo?</h5>
                                                                            </div>
                                                                            <div className="card-footer">
                                                                                <div style={{ float: "right" }}>
                                                                                    <Button variant="contained" onClick={closeModalNuevoParticipante} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                        No
                                                                                    </Button>
                                                                                    <Button variant="contained" type="submit" onClick={guardarNuevoParticipante} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                        Si
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </div>
                                                            </Fade>
                                                        </Modal>
                                                        <Modal
                                                            backdropColor="transparent"
                                                            open={openModalParticipante}
                                                            onClose={handleCloseModalParticipante}
                                                            closeAfterTransition
                                                            BackdropComponent={Backdrop}
                                                            BackdropProps={{
                                                                timeout: 500,
                                                            }}
                                                        >
                                                            <Fade in={openModalParticipante} >
                                                                <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                                                    <Grid item xs={4} >
                                                                        <div className="card" >
                                                                            <div className="card-header">
                                                                                <h4>Agregar Dispositivo Participante</h4>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <form onSubmit={guardarDatosParticipante}>
                                                                                    <TextField
                                                                                        multiline
                                                                                        autoFocus
                                                                                        margin="dense"
                                                                                        id="standard-multiline-static"
                                                                                        label="Agregar ID Dispositivo para grupo"
                                                                                        fullWidth
                                                                                        onChange={mientrasCambiaParticipante}
                                                                                        name="numeroSerie"
                                                                                    />
                                                                                </form>
                                                                            </div>
                                                                            <div className="card-footer">
                                                                                <div style={{ float: "right" }}>
                                                                                    <Button variant="contained" onClick={handleCloseModalParticipante} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                        Cancelar
                                                                                    </Button>
                                                                                    <Button variant="contained" type="submit" onClick={guardarDatosParticipante} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
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
                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                    <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                        <TableBody onChange={banderaParticipantes}>
                                                            {dataParticipantes.map((row) => (
                                                                <TableRow key={row._id} >
                                                                    {/* <TableRow key={row._id} selected={row.seleccionado} onClick={() => clickParticipantes(row.seleccionado, row.id)}></TableRow> */}
                                                                    <TableCell component="th" scope="row">{row.descripcion}</TableCell>
                                                                    <TableCell align="right">
                                                                        <div style={{ float: "right", margin: 3, textAlign: 'left' }} className={classes.fawesome}><CancelIcon onClick={() => eliminarFila(row.descripcion)} style={{ color: 'red' }} /></div>
                                                                        <div style={{ float: "right" }} className={classes.fawesome} >
                                                                            <IconButton size="small" variant="contained" color="primary" onClick={() => handleOpenModalParticipante(row.descripcion)} style={{ margin: 0, textAlign: 'left' }}>
                                                                                <Icon className="fa fa-plus-square" color="primary" />
                                                                            </IconButton >
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={7} style={{ float: 'none', margin: 'auto', }}>
                                            <h4>Mediciones a Registrar</h4>
                                            <Grid container spacing={12}>
                                                <Grid item xs={12}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                            <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                <TableHead >
                                                                    <TableRow style={{ height: 50, }}>
                                                                        <TableCell>Nombre</TableCell>
                                                                        <TableCell>Descripcion</TableCell>
                                                                        <TableCell>Tipo de Medicion</TableCell>
                                                                        <TableCell>Dispositivo</TableCell>
                                                                        <TableCell>Estado</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                {
                                                                    banderaTabla ?
                                                                        <TableBody>
                                                                            {medicionesSelected.map((row) => {
                                                                                return (
                                                                                    <TableRow key={row._id}>
                                                                                        <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                                        <TableCell component="th" style={{ textAlign: "center" }} scope="row">{row.idTipoMedicion}</TableCell>
                                                                                        <TableCell component="th" scope="row">Tipo Dispositivo</TableCell>
                                                                                        {
                                                                                            // al usar socket.io, se debe alterar esta variable
                                                                                            row.estado ?
                                                                                                <TableCell onClick={() => console.log(row)} component="th" scope="row"><Icon style={{ color: 'green' }} className="fa fa-circle"></Icon> </TableCell>
                                                                                                :
                                                                                                <TableCell onClick={() => console.log(row)} component="th" scope="row"><Icon style={{ color: 'red' }} className="fa fa-circle"></Icon></TableCell>
                                                                                        }
                                                                                    </TableRow>
                                                                                )
                                                                            })}
                                                                        </TableBody>
                                                                        : <TableRow>
                                                                            <TableCell align="center" colSpan={5}>
                                                                                <Box sx={{ width: "auto", padding: 10 }}>
                                                                                    <CircularProgress color="inherit" />
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                }
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Modal
                            backdropColor="transparent"
                            open={openModalGuardarDatos}
                            onClose={() => closeModalGuardarDatos(direccionFaseActiva)}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={openModalGuardarDatos} >
                                <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                    <Grid item xs={4} >
                                        <div className="card" >
                                            <div className="card-header">
                                                <h4>Cambiar Fase</h4>
                                            </div>
                                            <div className="card-body">
                                                <h5>¿Desea guardar los cambios realizados en esta fase?</h5>
                                            </div>
                                            <div className="card-footer">
                                                <div style={{ float: "right" }}>
                                                    {/*  ========================================= PARA DONDE VOY ADELANTE O UNO ESPECIFICO ================================ */}
                                                    <Button variant="contained" onClick={() => closeModalGuardarDatos(direccionFaseActiva)} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                        No
                                                    </Button>
                                                    <Button variant="contained" type="submit" onClick={() => guardarDatosFase(direccionFaseActiva)} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
                                                        Si
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </Fade>
                        </Modal>
                        <div style={{ float: "right" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                                onClick={() => botonCancelar()}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                                onClick={() => guardarDatosFase('Salir')}
                            >
                                Guardar y Salir
                            </Button>
                            {
                                cambiarBoton ?
                                    <Button
                                        variant="contained"
                                        color="default"
                                        onClick={() => handleOpenModalGuardarDatos(faseActiva + 1)}
                                        size="small"
                                        style={{ margin: 3 }}
                                    >
                                        Continuar Fase
                                    </Button>
                                    :
                                    <Button
                                        variant="contained"
                                        color="green"
                                        onClick={() => handleOpenModalGuardarDatos(faseActiva + 1)}
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

        </div >

    );
}