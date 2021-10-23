import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, Checkbox, IconButton, CircularProgress, Collapse } from '@material-ui/core/';
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function createData(nombre, grupo, participante, dispositivo, tiempoMedicion, valor) {
    return { nombre, grupo, participante, dispositivo, tiempoMedicion, valor };
}
function crearData(id, nombre, seleccionado) {
    return { id, nombre, seleccionado };
}
function createDataTest(name, estado) {
    return {
        name, estado,
        history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
        ],
    };
}
const rows = [
    createDataTest('Intensidad', false),
    createDataTest('Tiempo Habla', false),
    createDataTest('Posturas', false),
    createDataTest('Gestos', false),
    createDataTest('Expresiones', false),
];
// function createDataTest(name, calories, fat, carbs, protein, price) {
//     return {
//         name,
//         calories,
//         fat,
//         carbs,
//         protein,
//         price,
//         history: [
//             { date: '2020-01-05', customerId: '11091700', amount: 3 },
//             { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//         ],
//     };
// }
// // const rows = [
// //     createData('Speech Count', '01', '04', 'Mic.', '05:30', '02:00'),
// //     createData('Pos. Mic', '01', '04', 'Mic.', '05:32', 'Coord'),
// //     createData('Speech Count', '03', '01', 'Mic.', '05:35', '05:00'),
// //     createData('Pos. Hombros', '02', '03', 'Cam.', '05:38', 'Coord'),
// //     createData('Speech Count', '01', '02', 'Mic.', '05:45', '10:00'),
// //     createData('Pos. Manos', '01', '04', 'Cam.', '05:46', 'Coord'),
// //     createData('Gestos', '01', '05', 'Cam.', '05:49', 'Coord'),
// //     createData('Pos. Mic', '01', '02', 'Mic.', '05:49', 'Coord'),
// //     createData('Pos. Mic', '01', '02', 'Mic.', '05:50', 'Coord'),
// //     createData('Pos. Mic', '01', '03', 'Mic.', '05:51', 'Coord'),
// //     createData('Speech Count', '01', '04', 'Mic.', '05:52', '03:00'),
// // ];
// const rows = [
//     createDataTest('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//     createDataTest('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//     createDataTest('Eclair', 262, 16.0, 24, 6.0, 3.79),
//     createDataTest('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//     createDataTest('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];
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

var socket;
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

    // const [open, setOpen] = React.useState(false);
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
    const [tablaMedicionesRegistrar, setTablaMedicionesRegistrar] = useState([]);

    // const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes2 = useRowStyles();

    const [estadoMediciones, setEstadoMediciones] = useState([]);
    // const [estadoMediciones, setEstadoMediciones] = useState([
    //     {
    //         nombre: 'Intensidad',
    //         estado: false,
    //         grupos: [
    //             {
    //                 nombre: 'Grupo 1',
    //                 estado: false,
    //                 participantes: [
    //                     { nombre: '2020-01-05', dispositivo: '11091700', canal: 3, estado: false },
    //                     { nombre: '2020-01-02', dispositivo: 'Anonymous', canal: 1, estado: false },
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         nombre: 'Tiempo Habla',
    //         estado: false,
    //         grupos: [
    //             {
    //                 nombre: 'Grupo 1',
    //                 estado: false,
    //                 participantes: [
    //                     { nombre: '2020-01-05', dispositivo: '11091700', canal: 3, estado: false },
    //                     { nombre: '2020-01-02', dispositivo: 'Anonymous', canal: 1, estado: false },
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         nombre: 'Posturas',
    //         estado: false,
    //         grupos: [
    //             {
    //                 nombre: 'Grupo 1',
    //                 estado: false,
    //                 participantes: [
    //                     { nombre: '2020-01-05', dispositivo: '11091700', canal: 3, estado: false },
    //                     { nombre: '2020-01-02', dispositivo: 'Anonymous', canal: 1, estado: false },
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         nombre: 'Gestos',
    //         estado: false,
    //         grupos: [
    //             {
    //                 nombre: 'Grupo 1',
    //                 estado: false,
    //                 participantes: [
    //                     { nombre: '2020-01-05', dispositivo: '11091700', canal: 3, estado: false },
    //                     { nombre: '2020-01-02', dispositivo: 'Anonymous', canal: 1, estado: false },
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         nombre: 'Expresiones',
    //         estado: false,
    //         grupos: [
    //             {
    //                 nombre: 'Grupo 1',
    //                 estado: false,
    //                 participantes: [
    //                     { nombre: '2020-01-05', dispositivo: '11091700', canal: 3, estado: false },
    //                     { nombre: '2020-01-02', dispositivo: 'Anonymous', canal: 1, estado: false },
    //                 ]
    //             }
    //         ]
    //     }
    // ]);

    // let desconectar = {
    //     disabled: true
    // }
    // let conectar = {
    //     disabled: false
    // }
    // let varDireccion= 'vad_doa';
    // var jobValue = document.getElementsByName('txtJob')[0].value

    const conectarSocket = () => {
        // conectando al servidor
        // socket = io.connect("http://localhost:5000/");
        // //Para emitir eventos al servidor socket
        // // socket.emit('request', /* */); 

        // // escuchando los eventos
        // socket.on('after connect', function(msg) {
        //     console.log('After connect', msg);
        //     // $('#log').append('<br>' + $('<div/>').text('Received: ' + msg.data).html());
        // });
        let tablaEstadoMediciones = estadoMediciones;
        let dispositivosParticipantes = new Array();
        let dispositivosGrupo = new Array();
        let medicionesRegistrarEstado = new Array();
        // for(let i = 0; i < tablaEstadoMediciones.length; i++){

        // }
        let tablaDispositivos = tablaMedicionesRegistrar;
        let medicionesFaseActual = medicionesFases;
        let medicion = '';
        let separador = ' ';
        let medicionFinal = '';
        // console.log('tablaEstadoMediciones');
        // console.log(tablaEstadoMediciones);
        // console.log('medicionesFaseActual');
        // console.log(medicionesFaseActual);
        for (let i = 0; i < medicionesFaseActual[0].length; i++) {
            medicion = medicionesFaseActual[0][i]['nombre'].toLowerCase();
            let medicionFiltro = medicion.split(separador);
            if (medicionFiltro.length > 1) {
                medicionFinal = medicionFiltro[0] + medicionFiltro[1];
            } else {
                medicionFinal = medicionFiltro[0];
            }
            // console.log('medicionFinal');
            // console.log(medicionFinal);
            let json = {
                idExp: 1,
                idFase: 1
            }

            // console.log(tablaEstadoMediciones[i]);

            window[socket + (i).toString()] = io.connect('http://192.168.0.8:200/' + medicionFinal);
            // console.log(window[socket + (i).toString()])
            // window[socket + (i).toString()].emit("my_event", { query: "foo=bar" })
            // console.log(window[socket + (i).toString()]);
            setTimeout(
                function () {
                    desconectarSocket(window[socket + (i).toString()]);
                },
                1000
            );
            window[socket + (i).toString()].on('SendMetrics', function (msg) {
                console.log(msg.data);
                //debe quedar en pos de los canales que recibe, primero, si encuentra el disp, luego si encuentra el canal, y eso
                let contadorGrupos = 0;
                for (let k = 0; k < tablaEstadoMediciones[i]['grupos'].length; k++) {
                    let contadorParticipantes = 0;
                    if (tablaEstadoMediciones[i]['grupos'][k]['participantes'].length > 0) {
                        for (let l = 0; l < tablaEstadoMediciones[i]['grupos'][k]['participantes'].length; l++) {
                            let banderaEncontrado = false;
                            // let contadorBandera = 0;
                            for (let j = 0; j < msg.data.devices.length; j++) {
                                let dispositivoRecibido = msg.data.devices[j];
                                if (dispositivoRecibido['name'] === tablaEstadoMediciones[i]['grupos'][k]['participantes'][l]['dispositivo']) {
                                    // banderaEncontrado = true;
                                    // contadorBandera = contadorBandera + 1;
                                    console.log('dispositivo Encontrado');
                                    banderaEncontrado = true;

                                }
                            }
                            if (banderaEncontrado === true) {
                                contadorParticipantes = contadorParticipantes + 1;
                                tablaEstadoMediciones[i]['grupos'][k]['participantes'][l]['estadoMedicion'] = true;
                            } else {
                                tablaEstadoMediciones[i]['grupos'][k]['participantes'][l]['estadoMedicion'] = false;
                            }

                            if (contadorParticipantes === tablaEstadoMediciones[i]['grupos'][k]['participantes'].length) {
                                tablaEstadoMediciones[i]['grupos'][k]['estadoMedicion'] = true;
                                contadorGrupos = contadorGrupos + 1;
                            } else {
                                tablaEstadoMediciones[i]['grupos'][k]['estadoMedicion'] = false;
                            }
                            // if ((tablaEstadoMediciones[i]['grupos'][k]['participantes'].length) === 0) {
                            //     tablaEstadoMediciones[i]['grupos'][k]['estadoMedicion'] = true;
                            //     contadorGrupos = contadorGrupos + 1;
                            // } 
                            // else {
                            //     tablaEstadoMediciones[i]['grupos'][k]['estadoMedicion'] = false;
                            // }
                            // else {
                            //     tablaEstadoMediciones[i]['grupos'][k]['participantes'][l]['estadoMedicion'] = false;
                            // }
                        }
                    } else if (tablaEstadoMediciones[i]['grupos'][k]['participantes'].length === 0) {
                        tablaEstadoMediciones[i]['grupos'][k]['estadoMedicion'] = true;
                        contadorGrupos = contadorGrupos + 1;
                    } else {
                        tablaEstadoMediciones[i]['grupos'][k]['estadoMedicion'] = false;
                    }
                }
                if (contadorGrupos === tablaEstadoMediciones[i]['grupos'].length) {
                    tablaEstadoMediciones[i]['estadoMedicion'] = true;
                } else {
                    tablaEstadoMediciones[i]['estadoMedicion'] = false;
                }
                // console.log(t)
                setEstadoMediciones([...tablaEstadoMediciones]);
                console.log('SendMetrics', msg);
                // $('#log').html('<br>' + $('<div/>').text('Received: ' + JSON.stringify(msg)).html());
            });
        }

    }
    const desconectarSocket = (sockete) => {
        // desconectar el socket del servidor
        // conectar['disabled'] = false;
        // desconectar['disabled'] = true;
        sockete.disconnect();
    }

    useEffect(() => {
        dataFase();

        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        // setActualizarTabla(!actualizarTabla);
        const url = () => {
            const urlconsulta = location.pathname.split('/preparacionVerific/');

            setUrlConsulta(urlconsulta);
        };
        url();
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const traerGrupos = async (fasesExp, medicionesFase) => {

        let fase = fasesExp;
        let arrGrupos = new Array();
        let arrTotal = new Array();
        let arrFasesGrupos = new Array();
        for (let i = 0; i < fase['idGrupos'].length; i++) {
            if (fase['idGrupos'][i] != '') {
                const res = await axios.get(routesBD.grupos + fase['idGrupos'][i]);
                arrTotal.push(res.data.grupo);
            }

        }
        // console.log('arrTotal');
        // console.log(arrTotal);
        setArrFasesxGrupo(arrTotal);
        let gruposActuales = arrTotal;
        let medicionesActuales = medicionesFase;
        let arregloDispositivosXGrupos = new Array();
        let indiceIDFila = 0;
        for (let i = 0; i < gruposActuales.length; i++) {
            let dispositivosGrupo = gruposActuales[i]['dispositivos'];
            for (let j = 0; j < medicionesActuales.length; j++) {
                for (let k = 0; k < medicionesActuales[j]['dispositivosAsociados'].length; k++) {
                    for (let h = 0; h < dispositivosGrupo.length; h++) {
                        if (medicionesActuales[j]['dispositivosAsociados'][k] === dispositivosGrupo[h]['tipoDispositivo']) {
                            let dispositivoMedicion = {
                                id: indiceIDFila,
                                nombreMedicion: medicionesActuales[j]['nombre'],
                                grupoDispositivos: dispositivosGrupo[h],
                                nombreGrupo: gruposActuales[i]['descripcion'],
                                estado: false
                            }
                            indiceIDFila = indiceIDFila + 1;
                            arregloDispositivosXGrupos.push(dispositivoMedicion);
                        }
                    }
                }
            }
        }
        // console.log('gruposActuales');
        // console.log(gruposActuales);
        // console.log('medicionesActuales');
        // console.log(medicionesActuales);
        // console.log('arregloDispositivosXGrupos');
        // console.log(arregloDispositivosXGrupos);
        setTablaMedicionesRegistrar([...arregloDispositivosXGrupos]);

        // setDataGrupos([...arrFasesGrupos[0]]);

        // traerParticipantes(arrFasesGrupos[0], 'inicio');

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

        // setArrFasesxGrupo(arrTotal);
        let gruposActuales = arrTotal;
        let medicionesActuales = medicionesFase;
        let arregloMedicionesGruposParticipantes = new Array();
        let indiceIDFila = 0;
        // console.log('gruposActuales');
        // console.log(gruposActuales);
        // console.log('participantes');
        // console.log(participantes);
        // console.log('medicionesActuales');
        // console.log(medicionesActuales);
        for (let i = 0; i < medicionesActuales.length; i++) {
            let gruposArr = new Array();
            for (let j = 0; j < gruposActuales.length; j++) {
                let participantesArr = new Array();
                for (let k = 0; k < participantes[j].length; k++) {
                    // console.log('participante del grupo');
                    // console.log(participantes[j][k]);
                    for (let h = 0; h < participantes[j][k]['dispositivos'].length; h++) {
                        // console.log('tipo dispositivo del participante del grupo');
                        // console.log(participantes[j][k]['dispositivos'][h]['tipoDispositivo']);
                        if (participantes[j][k]['dispositivos'][h]['tipoDispositivo'] === medicionesActuales[i]['dispositivosAsociados'][0]) {
                            let participante = {
                                nombre: participantes[j][k]['descripcion'],
                                dispositivo: participantes[j][k]['dispositivos'][h]['dispositivo'],
                                canal: participantes[j][k]['dispositivos'][h]['canal'],
                                estadoOpen: false,
                                estadoMedicion: false
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
        console.log('arregloMedicionesGruposParticipantes');
        console.log(arregloMedicionesGruposParticipantes);
        setEstadoMediciones([...arregloMedicionesGruposParticipantes]);
        // // for (let i = 0; i < gruposActuales.length; i++) {
        // //     let dispositivosGrupo = gruposActuales[i]['dispositivos'];
        // //     for (let j = 0; j < medicionesActuales.length; j++) {
        // //         for (let k = 0; k < medicionesActuales[j]['dispositivosAsociados'].length; k++) {
        // //             for (let h = 0; h < dispositivosGrupo.length; h++) {
        // //                 if (medicionesActuales[j]['dispositivosAsociados'][k] === dispositivosGrupo[h]['tipoDispositivo']) {
        // //                     let dispositivoMedicion = {
        // //                         id: indiceIDFila,
        // //                         nombreMedicion: medicionesActuales[j]['nombre'],
        // //                         grupoDispositivos: dispositivosGrupo[h],
        // //                         nombreGrupo: gruposActuales[i]['descripcion'],
        // //                         estado: false
        // //                     }
        // //                     indiceIDFila = indiceIDFila + 1;
        // //                     arregloDispositivosXGrupos.push(dispositivoMedicion);
        // //                 }
        // //             }
        // //         }
        // //     }
        // // }
        // // console.log('gruposActuales');
        // // console.log(gruposActuales);
        // // console.log('medicionesActuales');
        // // console.log(medicionesActuales);
        // console.log('arregloDispositivosXGrupos');
        // console.log(arregloDispositivosXGrupos);
        // setTablaMedicionesRegistrar([...arregloDispositivosXGrupos]);
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
            let resF = await axios.get(routesBD.fases + arrfases[i]);
            arregloNFase.push(resF.data.fase);
        }
        setFasesExp(arregloNFase);
        traerGruposIniciales(arregloNFase);
        traerMedicionesRegistrar(arregloNFase[0]);
    }

    const traerMedicionesRegistrar = async (arregloNFase) => {
        setBanderaTabla(false);
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

        setMedicionesFases(arrTotalMediciones);
        setMedicionesSelected(arrTotalMediciones[0]);
        traerGrupos(arregloNFase, arrTotalMediciones[0]);
        traerGruposParticipantes(arregloNFase, arrTotalMediciones[0]);
        setTimeout(
            function () {
                setBanderaTabla(true);
            },
            100
        );
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
        } else {
            setCambiarBoton(true);
        }
        return () => {
        }
    }, [faseActiva, fasesExp]);

    const cambiarFaseActiva = (fase) => {

        if (fase < fasesExp.length) {
            // console.log(fasesExp[fase]);
            traerMedicionesRegistrar(fasesExp[fase]);
            // setGrupoComparacion(arregloFasesGrupos[fase]);
            // traerParticipantesIniciales(arrFasesxGrupo[fase])
            setFaseActiva(fase);


            // setDataGrupos([...arrFasesxGrupo[fase]]);
            // traerParticipantes(arrFasesxGrupo[fase], 'inicio');

            // setDataParticipantes([]);
            // setNombreGrupoHeader('');
            // setHiddenParticipantes(true);
            // setConteoSelectedG(0);
            // let arregloGruposSeleccionados = arregloGruposSelect[0];
            // let tamañoObjetos = Object.keys(arregloGruposSeleccionados)
            // for (let i = 0; i < tamañoObjetos.length; i++) {
            //     let grupo = tamañoObjetos[i]
            //     if (arregloGruposSeleccionados[grupo] === true) {
            //         arregloGruposSeleccionados[grupo] = false;
            //     }
            // }
        } else {
            //usar replace para evitar retrocesos de pagina
            // window.location.replace("http://");
            // ====== una vez este listo su verificacion, debo de cambiar su estado a ejecucion, para que sepan que ya no puede prepararse el experimento
            // Yo creo que mientras no pase a analisis, el experimento tiene que pasar por verificacion, debe tener estado verificaion y abrir esta vista, hasta que se finalize
            //    para corroborar que el sistema necesita verificar los dispositivos antes de ejecutarse, sea en la fase en que haya quedado su ejecucion
            window.location.href = "http://localhost/ejecucion/" + idUrl['id'];
        }
    }

    const botonCancelar = () => {
        setTimeout(
            function () {
                window.location.href = "http://localhost/inicio";
            },
            2000
        );
    }

    const colapsarTabla = (fila, indexFila, estadoApertura) => {
        // console.log('fila');
        // console.log(fila);
        let estadoMedicionesColapsar = estadoMediciones;
        estadoMedicionesColapsar[indexFila]['estadoOpen'] = estadoApertura;
        // let tablaMediciones = tablaMedicionesRegistrar;
        // console.log('tablaMediciones');
        // console.log(tablaMediciones);
        // fila['estado'] = estadoApertura;
        // console.log('indexFila');
        // console.log(indexFila);
        // console.log('estadoApertura');
        // console.log(estadoApertura);
        // console.log('estadoMedicionesColapsar');
        // console.log(estadoMedicionesColapsar);
        setEstadoMediciones([...estadoMedicionesColapsar]);
    }

    const colapsarGrupos = (filagrupo, indexGrupo, indexFila, estadoAperturaGrupo) => {
        // console.log('filagrupo');
        // console.log(filagrupo);
        // console.log('indexGrupo');
        // console.log(indexGrupo);
        // console.log('indexFila');
        // console.log(indexFila);
        // console.log('estadoAperturaGrupo');
        // console.log(estadoAperturaGrupo);
        let estadoMedicionesColapsar = estadoMediciones;
        estadoMedicionesColapsar[indexFila]['grupos'][indexGrupo]['estadoOpen'] = estadoAperturaGrupo;
        setEstadoMediciones([...estadoMedicionesColapsar]);
    }

    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Preparación Experimento - Etapa Verificación</h3>
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
                                        onClick={() => (window.location.href = "http://localhost/preparacionConfig/" + idUrl['id'])}
                                    >
                                        ← Volver Configuración
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
                        <Stepper activeStep={faseActiva} alternativeLabel>
                            {
                                fasesExp.map(fase => (
                                    <Step key={fase._id}>
                                        <StepButton onClick={() => cambiarFaseActiva(fase.numeroFase - 1)}> Fase {fase.numeroFase}</StepButton>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </div>
                    <div className="container-fluid">
                        <div>
                            <div className="card-body">
                                <div className="card-header">
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} style={{ float: 'none', margin: 'auto', }}>
                                            <Grid container spacing={9}>
                                                <Grid item xs={6} style={{ float: 'none', margin: 'auto', }}>
                                                    <h4>Mediciones a Registrar</h4>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        size="small"
                                                        style={{ float: 'right', margin: 3, textAlign: 'center' }}
                                                        onClick={() => conectarSocket()}
                                                    >
                                                        Verificacion Metricas
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            {/* <Grid container spacing={12}>
                                                <Grid item xs={12}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                            <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                <TableHead >
                                                                    <TableRow style={{ height: 50, }}>
                                                                        <TableCell>Medicion</TableCell>
                                                                        <TableCell>Grupo</TableCell>
                                                                        <TableCell>Dispositivo Grupo</TableCell>
                                                                        <TableCell>Tipo Dispositivo</TableCell>
                                                                        <TableCell>Estado</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                {
                                                                    banderaTabla ?
                                                                        <TableBody>
                                                                            {tablaMedicionesRegistrar.map((row) => {
                                                                                return (
                                                                                    <TableRow key={row.indiceIDFila}>
                                                                                        <TableCell component="th" scope="row">{row.nombreMedicion}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.nombreGrupo}</TableCell>
                                                                                        <TableCell component="th" style={{ textAlign: "center" }} scope="row">{row.grupoDispositivos.nombreDispositivo}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.grupoDispositivos.tipoDispositivo}</TableCell>
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
                                                                        // <TableBody>
                                                                        //     {medicionesSelected.map((row) => {
                                                                        //         return (
                                                                        //             <TableRow key={row._id}>
                                                                        //                 <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                        //                 <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                        //                 <TableCell component="th" style={{ textAlign: "center" }} scope="row">{row.idTipoMedicion}</TableCell>
                                                                        //                 <TableCell component="th" scope="row">Tipo Dispositivo</TableCell>
                                                                        //                 {
                                                                        //                     // al usar socket.io, se debe alterar esta variable
                                                                        //                     row.estado ?
                                                                        //                         <TableCell onClick={() => console.log(row)} component="th" scope="row"><Icon style={{ color: 'green' }} className="fa fa-circle"></Icon> </TableCell>
                                                                        //                         :
                                                                        //                         <TableCell onClick={() => console.log(row)} component="th" scope="row"><Icon style={{ color: 'red' }} className="fa fa-circle"></Icon></TableCell>
                                                                        //                 }
                                                                        //             </TableRow>
                                                                        //         )
                                                                        //     })}
                                                                        // </TableBody>
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
                                            </Grid> */}
                                        </Grid>
                                        <Grid item xs={12} style={{ float: 'none', margin: 'auto', }}>
                                            <TableContainer component={Paper} style={{ maxHeight: 500, minHeight: 200 }}>
                                                <Table aria-label="collapsible table" stickyHeader size="small" >
                                                    <TableHead >
                                                        <TableRow style={{ height: '60px' }}>
                                                            <TableCell style={{ backgroundColor: " #4682B4 ", color: "#fff" }} />
                                                            <TableCell style={{ backgroundColor: " #4682B4", color: "#fff" }} align="left">Medición</TableCell>
                                                            <TableCell style={{ backgroundColor: " #4682B4", color: "#fff" }}>Estado</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    {estadoMediciones.map((row, index) => (
                                                        <TableBody>
                                                            <TableRow key={row.id}>
                                                                <TableCell>
                                                                    {/* <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}> */}
                                                                    <IconButton aria-label="expand row" onClick={() => colapsarTabla(row, index, !row.estadoOpen)}>
                                                                        {row.estadoOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                                    </IconButton>
                                                                </TableCell>
                                                                <TableCell >{row.nombre}</TableCell>
                                                                {
                                                                    // al usar socket.io, se debe alterar esta variable
                                                                    row.estadoMedicion ?
                                                                        <TableCell component="th" scope="row"><Icon style={{ color: 'green' }} className="fa fa-circle"></Icon> </TableCell>
                                                                        :
                                                                        <TableCell component="th" scope="row"><Icon style={{ color: 'red' }} className="fa fa-circle"></Icon></TableCell>
                                                                }
                                                                {/* <TableCell component="th" scope="row"><Icon style={{ color: 'green' }} className="fa fa-circle"></Icon> </TableCell> */}
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                                                                    <Collapse in={row.estadoOpen} timeout="auto" unmountOnExit>
                                                                        <TableContainer component={Paper} >
                                                                            <Table aria-label="collapsible table" size="small" >
                                                                                <TableHead >
                                                                                    <TableRow >
                                                                                        {/* <TableCell /> */}
                                                                                        {/* <TableCell align="left">Grupo</TableCell>
                                                                                        <TableCell >Estado</TableCell> */}
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                {row.grupos.map((grupo, indexG) => (
                                                                                    // <Box margin={0}>
                                                                                    <TableBody >
                                                                                        <TableRow className={classes2.root}>
                                                                                            <TableCell>
                                                                                                <IconButton aria-label="expand row" size="small" onClick={() => colapsarGrupos(grupo, indexG, index, !grupo.estadoOpen)}>
                                                                                                    {grupo.estadoOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                                                                </IconButton>
                                                                                            </TableCell>
                                                                                            <TableCell >{grupo.nombre}</TableCell>
                                                                                            {
                                                                                                // al usar socket.io, se debe alterar esta variable
                                                                                                grupo.estadoMedicion ?
                                                                                                    <TableCell component="th" scope="row"><Icon style={{ color: 'green' }} className="fa fa-circle"></Icon> </TableCell>
                                                                                                    :
                                                                                                    <TableCell component="th" scope="row"><Icon style={{ color: 'red' }} className="fa fa-circle"></Icon></TableCell>
                                                                                            }
                                                                                            {/* <TableCell component="th" scope="row"><Icon style={{ color: 'green' }} className="fa fa-circle"></Icon> </TableCell> */}
                                                                                        </TableRow>
                                                                                        <TableRow className={classes2.root}>
                                                                                            {/* {row.grupos.map((grupo, indexG) => ( */}
                                                                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                                                                                <Collapse in={grupo.estadoOpen} timeout="auto" unmountOnExit>
                                                                                                    <TableContainer component={Paper} style={{ backgroundColor: "#F7F7F7", minWidth: 700 }}>
                                                                                                        <Typography variant="h6" gutterBottom component="div">
                                                                                                            {grupo.nombre}
                                                                                                        </Typography>
                                                                                                        <Table size="small" aria-label="Participantes">
                                                                                                            <TableHead>
                                                                                                                <TableRow>
                                                                                                                    <TableCell>Participante</TableCell>
                                                                                                                    <TableCell>Dispositivo</TableCell>
                                                                                                                    <TableCell>Canal</TableCell>
                                                                                                                    <TableCell>Estado</TableCell>
                                                                                                                </TableRow>
                                                                                                            </TableHead>
                                                                                                            {grupo.participantes.map((participante, indexP) => (
                                                                                                                <TableBody>
                                                                                                                    <TableCell >{participante.nombre}</TableCell>
                                                                                                                    <TableCell >{participante.dispositivo}</TableCell>
                                                                                                                    <TableCell >{participante.canal}</TableCell>
                                                                                                                    {
                                                                                                                        // al usar socket.io, se debe alterar esta variable
                                                                                                                        participante.estadoMedicion ?
                                                                                                                            <TableCell component="th" scope="row"><Icon style={{ color: 'green' }} className="fa fa-circle"></Icon> </TableCell>
                                                                                                                            :
                                                                                                                            <TableCell component="th" scope="row"><Icon style={{ color: 'red' }} className="fa fa-circle"></Icon></TableCell>
                                                                                                                    }
                                                                                                                    {/* <TableCell component="th" scope="row"><Icon style={{ color: 'green' }} className="fa fa-circle"></Icon> </TableCell> */}
                                                                                                                </TableBody>
                                                                                                            ))}
                                                                                                        </Table>
                                                                                                    </TableContainer>

                                                                                                </Collapse>
                                                                                            </TableCell>
                                                                                            {/* ))} */}
                                                                                        </TableRow>
                                                                                    </TableBody>
                                                                                    // </Box>
                                                                                ))}
                                                                            </Table>
                                                                        </TableContainer>
                                                                    </Collapse>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    ))}
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div style={{ float: "right" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                            // onClick={() => botonCancelar()}
                            >
                                Cancelar
                            </Button>
                            {
                                cambiarBoton ?
                                    <Button
                                        variant="contained"
                                        color="default"
                                        // onClick={() => handleOpenModalGuardarDatos(faseActiva + 1)}
                                        onClick={() => cambiarFaseActiva(faseActiva + 1)}
                                        size="small"
                                        style={{ margin: 3 }}
                                    >
                                        Continuar Fase
                                    </Button>
                                    :
                                    <Button
                                        variant="contained"
                                        color="green"
                                        onClick={() => cambiarFaseActiva(faseActiva + 1)}
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