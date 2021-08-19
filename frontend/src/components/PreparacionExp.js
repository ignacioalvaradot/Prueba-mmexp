import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, Checkbox, IconButton } from '@material-ui/core/';
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
    const [openModalGrupo, setOpenModalGrupo] = React.useState(false);
    const [openModalParticipante, setOpenModalParticipante] = React.useState(false);
    const [openModalNuevoGrupo, setOpenModalNuevoGrupo] = React.useState(false);
    const [openModalNuevoParticipante, setOpenModalNuevoParticipante] = React.useState(false);
    const [dataGrupos, setDataGrupos] = React.useState([]);
    const [dataParticipantes, setDataParticipantes] = React.useState([]);
    const [participanteActivo, setParticipanteActivo] = React.useState('');
    const [grupoEditar, setGrupoEditar] = React.useState('');
    const [arrarrParticipantes, setArrArrParticipantes] = React.useState([]);

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
    const [filasPart, setFilasPart] = React.useState([
        {
            "id": "1",
            "nombre": 'Participante 1',
            "seleccionado": false
        },
        {
            "id": "2",
            "nombre": 'Participante 2',
            "seleccionado": false
        },
        {
            "id": "3",
            "nombre": 'Participante 3',
            "seleccionado": false
        }
    ]);
    // const isItemSelected = isSelected(row.descripcion);
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
        const traerFases = async () => {
            //solo deberia traer la primera fase
            const fasesExp = await axios.get('http://localhost:81/api/fases');

            setFases(fasesExp.data);
            traerMediciones(fasesExp.data);
            traerGrupos(fasesExp.data);
        }
        const traerMediciones = async (fasesExp) => {
            let mediciones = fasesExp;
            // de primera debe entrar la primera fase del experimento actual
            const medicionesFase = mediciones[0].idMediciones;
            let arrNombreMediciones = new Array();
            setIdmediciones(medicionesFase);
            for (let i = 0; i < medicionesFase.length; i++) {
                const res = await axios.get('http://localhost:81/api/mediciones/' + medicionesFase[i]);
                if (res.data.medicion.nombre === 'Intensidad') {
                    arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
                    setNombresMediciones(arrNombreMediciones);
                }
                if (res.data.medicion.nombre === 'Tiempo Habla') {
                    arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
                    setNombresMediciones(arrNombreMediciones);
                }
                if (res.data.medicion.nombre === 'Postura') {
                    arrNombreMediciones.push([res.data.medicion.nombre, i, Postura]);
                    setNombresMediciones(arrNombreMediciones);
                }
            }
        }
        const traerGrupos = async (fasesExp) => {
            let fases = fasesExp;
            let arrGrupos = new Array();
            let arrTotal = new Array();
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
            }
            setDataGrupos(arrTotal);
            traerParticipantes(arrTotal);
        }

        const traerParticipantes = async (arrGrupos) => {
            let aregloGrupos = arrGrupos;
            let arrParticipantes = new Array();
            // let arrGrupos = new Array();
            let arrTotal = new Array();
            for (let i = 0; i < aregloGrupos.length; i++) {
                arrParticipantes.push(aregloGrupos[i].participantes);
            }
            for (let i = 0; i < arrParticipantes.length; i++) {
                for (let j = 0; j < arrParticipantes[i].length; j++) {
                    if (arrParticipantes[i][j] != '') {
                        const res = await axios.get('http://localhost:81/api/participantes/' + arrParticipantes[i][j]);
                        arrTotal.push(res.data.participante);
                        // console.log(res.data);
                    }
                }
            }
            // console.log(arrTotal);
            setDataParticipantes(arrTotal);
            // console.log(arrGrupos);
        }

        url();
        traerFases();
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);


    const dataFase = async () => {
        const res = await axios.get('http://localhost:81/api/experimentos/' + idUrl.id);
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

    }

    useEffect(() => {
        console.log('Fase: ' + faseActiva);
        let numerofaseActual = faseActiva + 1;

        if (fases != '') {
            let faseAct = fases.[faseActiva];
            const medicionesFase = faseAct.['idMediciones'];
            let arrNombreMediciones = new Array();
            setIdmediciones(medicionesFase);

            const traerMedicionesFase = async (medicionesFase) => {
                for (let i = 0; i < medicionesFase.length; i++) {
                    const res = await axios.get('http://localhost:81/api/mediciones/' + medicionesFase[i]);
                    if (res.data.medicion.nombre === 'Intensidad') {
                        arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
                        setNombresMediciones(arrNombreMediciones);
                    }
                    if (res.data.medicion.nombre === 'Tiempo Habla') {
                        arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
                        setNombresMediciones(arrNombreMediciones);
                    }
                    if (res.data.medicion.nombre === 'Postura') {
                        arrNombreMediciones.push([res.data.medicion.nombre, i, Postura]);
                        setNombresMediciones(arrNombreMediciones);
                    }
                }
            };
            traerMedicionesFase(medicionesFase);
        }
        return () => {
        }
    }, [faseActiva, fases]);

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
        // console.log(nombreParticipante)
        setParticipanteActivo(nombreParticipante);
    };

    const handleCloseModalParticipante = () => {
        let estado = !openModalParticipante;
        setOpenModalParticipante(estado);
    };
    const onDeleteObs = async (id) => {
        // await axios.delete('http://localhost:81/api/observaciones/' + id);
        console.log('borrar')
    };

    const onEditObs = (id) => {
        console.log('editar')
    };

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    const handleOpenModalNuevoGrupo = () => {
        setOpenModalNuevoGrupo(true);
    };

    const closeModalNuevoGrupo = () => {
        setOpenModalNuevoGrupo(false);
    };

    const guardarNuevoGrupo = () => {
        let grupos = dataGrupos;
        let contador = 0;
        let arrTotal = new Array();

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
                    participantes: arregloVacio,
                }
                arrTotal.push(arrNuevo);
                setDataGrupos(arrTotal);
                console.log(arrTotal);
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
        let contador = 0;
        let arrTotal = new Array();
        // console.log(participantes);
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
                console.log(arrTotal);
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
        //dejarlo en pos de grupos y participantes
        //debo verificar que lleguen datos - enviar - responder
        let data = {
            idFase: fases.[faseActiva]._id,
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
        // console.log(arregloGrupos);

        if (dispositivoNuevo != '') {
            for (let i = 0; i < arregloGrupos.length; i++) {
                if (arregloGrupos[i].descripcion === grupo) {
                    dispositivoGrupo = dispositivoNuevo;
                    arregloGrupos[i].numeroSerie = dispositivoGrupo;
                    console.log(arregloGrupos);
                    setDataGrupos(arregloGrupos);
                }
            }
        }
        handleCloseModalGrupo();
        // let data = {
        //     idFase: fases.[faseActiva]._id,
        //     grupo: datosGrupos.grupo,
        //     dispositivo: datosGrupos.idDispositivo
        // };
        // guardarDispositivoGrupo(data);
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
                    console.log(arregloParticipantes);
                    setDataParticipantes(arregloParticipantes);
                }
            }
        }

        // let data = {
        //     idFase: fases.[faseActiva]._id,
        //     participante: participante,
        //     numeroSerie: dispositivoPart
        // };

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
                arregloInicial.splice(i, 1)
                if (i < arregloInicial.length) {
                    let actual = i;
                    for (let j = 0; j < arregloFinal.length; j++) {
                        let ajuste = arregloFinal[actual]['descripcion'].split(separador);
                        if (tipo[0] === 'Grupo') {
                            arregloFinal[actual]['descripcion'] = ('Grupo ' + (parseInt(ajuste[1]) - 1));
                        }
                        if (tipo[0] === 'Participante') {
                            arregloFinal[actual]['descripcion'] = ('Participante ' + (parseInt(ajuste[1]) - 1));
                        }
                        console.log(arregloFinal);
                    }
                    if (tipo[0] === 'Grupo') {
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
                if (tipo[0] === 'Grupo') {
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

    const guardarObservacion = async (data) => {
        console.log('guardar datos: ', data)
    }

    const guardarDispositivoGrupo = async (data) => {
        console.log('guardar datos: ', data);
        handleCloseModalGrupo();
        handleCloseModalParticipante();
    }

    const clickGrupos = (name) => {
        let seleccionado = selected;
        let arregloGrupo = dataGrupos;
        let idGrupo = name;
        let conteoSelec = conteoSelectedG;
        for (let i = 0; i < arregloGrupo.length; i++) {
            if (conteoSelec < 1 || (conteoSelec === 1)) {
                if (arregloGrupo[i]['descripcion'] === idGrupo) {
                    setSelected(!seleccionado);
                    // arregloGrupo[i].seleccionado = !seleccionado;
                    let arregloGruposSeleccionados = arregloGruposSelect;
                    if (conteoSelec === 0) {
                        if (arregloGruposSeleccionados[0][idGrupo] === false) {
                            let conteo = conteoSelec + 1;
                            setConteoSelectedG(conteo);
                            arregloGruposSeleccionados[0][idGrupo] = !(arregloGruposSeleccionados[0][idGrupo]);
                            traerParticipantesGrupo(arregloGrupo[i]);
                        }
                    }
                    if (conteoSelec === 1) {
                        if (arregloGruposSeleccionados[0][idGrupo] === true) {
                            let conteo = conteoSelec - 1;
                            setConteoSelectedG(conteo);
                            arregloGruposSeleccionados[0][idGrupo] = !(arregloGruposSeleccionados[0][idGrupo]);
                        }
                    }
                    setFilas(arregloGrupo);
                    setBanderaGrupo(!banderaGrupo);
                }
            }
        };
    }

    const traerParticipantesGrupo = async (grupo) => {
        // let arregloGrupos = dataGrupos;
        let nuevoArreglo = new Array();
        let infoGrupo = grupo;
        if (infoGrupo.hasOwnProperty('_id')) {
            // console.log(infoGrupo);
            for (let i = 0; i < infoGrupo['participantes'].length; i++) {
                console.log(infoGrupo['participantes'][i]);
                //debo consultar los participantes y actualizar dataParticipantes, ademas de agregarlos todos al arreglo de participantes para asi
                //cambiar del arreglo de participantes a dataParticipantes
            }

        }else{
            console.log('Este Grupo no tiene Id, es Local');
        }
        // let participantes = dataParticipantes;
       
        // nuevoArreglo.push(participantes);

        // let aregloGrupos = arrGrupos;
        // let arrParticipantes = new Array();
        // // let arrGrupos = new Array();
        // let arrTotal = new Array();
        // for (let i = 0; i < aregloGrupos.length; i++) {
        //     arrParticipantes.push(aregloGrupos[i].participantes);
        // }
        // for (let i = 0; i < arrParticipantes.length; i++) {
        //     for (let j = 0; j < arrParticipantes[i].length; j++) {
        //         if (arrParticipantes[i][j] != '') {
        //             const res = await axios.get('http://localhost:81/api/participantes/' + arrParticipantes[i][j]);
        //             arrTotal.push(res.data.participante);
        //             // console.log(res.data);
        //         }
        //     }
        // }
        // // console.log(arrTotal);
        // setDataParticipantes(arrTotal);
        //poner los Arreglos dentro de un arreglo de Arreglos
    }

    // const isSelected = (name) => selected.indexOf(name) !== -1;

    // const clickParticipantes = (seleccionado, name) => {
    //     let arregloParticipantes = filasPart;
    //     let idParticipantes = name;
    //     let conteoSelec = conteoSelectedPart;
    //     for (let i = 0; i < arregloParticipantes.length; i++) {
    //         if (conteoSelec < 1 || (conteoSelec === 1 && seleccionado === true)) {
    //             if (arregloParticipantes[i].id === idParticipantes) {
    //                 arregloParticipantes[i].seleccionado = !seleccionado;
    //                 if (arregloParticipantes[i].seleccionado === true) {
    //                     conteoSelec = conteoSelec + 1;
    //                     setConteoSelectedPart(conteoSelec);
    //                 } else {
    //                     conteoSelec = conteoSelec - 1;
    //                     setConteoSelectedPart(conteoSelec);

    //                 }
    //                 setFilasPart(arregloParticipantes);
    //                 setBanderaParticipantes(!banderaParticipantes);
    //             }
    //         }
    //     };
    // }

    const guardarTodo = () => {
        let arregloGrupo = dataGrupos;
        let arregloParticipantes = dataParticipantes;
        let id;
        for (let i = 0; i < arregloGrupo.length; i++) {
            console.log(arregloGrupo[i]);
        }
        for (let i = 0; i < arregloParticipantes.length; i++) {
            if (arregloParticipantes[i].hasOwnProperty('_id')) {
                console.log(arregloParticipantes[i]);
                //necesito actualizar por PUT
                //tengo que volver a traer por GET los participantes y comparar si es que no alguno en bd de los que ahora tengo
                // si no existe alguno, entonces debo eliminar ese participante de su tabla y del arreglo de tabla Grupos
            }
            //else - si no tiene id necesito agregarlo por POST y traer su id para colocarla en el arreglo de tabla Grupos
            // console.log(arregloParticipantes[i]);
        }
    }

    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Ejecucion Experimento</h3>
                <div className="card">
                    <div className="card-header">
                        <h4>{nombreExp}</h4>
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
                                                        <h4>Participantes Grupo 1</h4>
                                                    </Grid>
                                                    <Grid item xs={2} >
                                                        <div style={{ float: "right" }} className={classes.fawesome} >
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
                                            <h4>Estado de Mediciones</h4>
                                            <div className={classes.tabsStyles}>
                                                <TabPanel value={tab} index={0}>
                                                    <Grid container spacing={12}>
                                                        <Grid item xs={12}>
                                                            <Grid item xs={12}>
                                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                                    <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>Estado</TableCell>
                                                                                <TableCell>Nombre</TableCell>
                                                                                <TableCell>Participante</TableCell>
                                                                                <TableCell>Dispositivo</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {rows.map((row) => (
                                                                                <TableRow key={row.name}>
                                                                                    <TableCell padding="checkbox">
                                                                                        <Checkbox
                                                                                            checked={true}
                                                                                            style={{ color: 'blue' }}
                                                                                        // inputProps={{ 'aria-labelledby': labelId }}
                                                                                        />
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                                    <TableCell component="th" scope="row">{row.participante}</TableCell>
                                                                                    <TableCell component="th" scope="row">{row.dispositivo}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </TabPanel>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-header">
                            <Grid container spacing={12}>
                                <Grid item xs={12}>
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
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                                onClick={guardarTodo}
                            >
                                Guardar y Salir
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                onClick={() => setFaseActiva(faseActiva + 1)}
                                size="small"
                                style={{ margin: 3 }}
                            >
                                Continuar Fase
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </div >

    );
}