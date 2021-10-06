import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, Checkbox, IconButton, TextareaAutosize, CircularProgress } from '@material-ui/core/';
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

import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, DateTimePicker } from '@material-ui/pickers';
import { es } from "date-fns/locale";


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

export default function AnalisisExp() {

    const [idExperimento, setIdExperimento] = React.useState('');
    const location = useLocation();
    const idUrl = useParams();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [urlconsulta, setUrlConsulta] = useState('');
    const [fasesComparacion, setFasesComparacion] = React.useState([]);
    const [idmediciones, setIdmediciones] = React.useState('');
    const [nombreMediciones, setNombresMediciones] = React.useState([]);
    const [idObserv, setIdObserv] = React.useState([]);
    const [faseActiva, setFaseActiva] = React.useState(0);
    const [nombreExp, setNombreExp] = React.useState('');
    const [idExp, setIdExp] = React.useState('');
    const [fasesExp, setFasesExp] = React.useState([]);
    const [idObservaciones, setIdObservaciones] = React.useState([]);
    const [idGrupos, setIdGrupos] = React.useState([]);



    const [fases, setFases] = React.useState([]);
    const [tiempoInicio, setTiempoInicio] = React.useState('');
    const [tiempoFin, setTiempoFin] = React.useState('');
    const [tiempoString, setTiempoString] = React.useState('');
    const [observacionesTabla, setObservacionesTabla] = React.useState([]);
    const [actualizarTabla, setActualizarTabla] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [arrMedicionesRecibidas, setArrMedicionesRecibidas] = useState([]);


    useEffect(() => {
        console.log('Fase: ' + faseActiva);
        let numerofaseActual = faseActiva + 1;

        if (fasesExp != '') {
            // setCambiarBoton(true);
            let faseAct = fasesExp[faseActiva];
            const medicionesFase = faseAct['idMediciones'];
            let arrNombreMediciones = new Array();
            let arrObsv = fasesExp[faseActiva].idObservaciones;
            setIdObserv(arrObsv);
            setIdmediciones(medicionesFase);
            setArrMedicionesRecibidas([]);
                setNombresMediciones([]);

            // const traerMedicionesFase = async (medicionesFase) => {
            //     for (let i = 0; i < medicionesFase.length; i++) {
            //         const res = await axios.get('http://localhost:81/api/mediciones/' + medicionesFase[i]);
            //         if (res.data.medicion.nombre === 'Intensidad') {
            //             arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
            //             setNombresMediciones(arrNombreMediciones);
            //         }
            //         if (res.data.medicion.nombre === 'Tiempo Habla') {
            //             arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
            //             setNombresMediciones(arrNombreMediciones);
            //         }
            //         if (res.data.medicion.nombre === 'Postura') {
            //             arrNombreMediciones.push([res.data.medicion.nombre, i, Postura]);
            //             setNombresMediciones(arrNombreMediciones);
            //         }
            //     }
            // };
            // traerMedicionesFase(medicionesFase);
            traerMediciones(medicionesFase);

        }
        // if (faseActiva === (fasesExp.length - 1)) {
        //     setCambiarBoton(false);
        // }

        return () => {
        }
    }, [faseActiva, fasesExp]);

    useEffect(() => {
        const getObservaciones = async (obs, arrObs, i, termino) => {
            const res = await axios.get('http://localhost:81/api/observaciones/' + obs);

            if (res.data.observacion != null) {
                arrObs.push(res.data.observacion);
                // console.log(i);

                if (i === termino) {
                    // console.log(arrObs)
                    // setObservaciones(arrObs);
                    setObservacionesTabla(arrObs);
                }
            } else {
                if (i === termino) {
                    // console.log(arrObs)
                    // setObservaciones(arrObs);
                    setObservacionesTabla(arrObs);
                }
            }

        }

        if (idObserv != '') {
            let arrObs = new Array();
            const obs = idObserv;
            let termino = (obs.length) - 1;

            for (let i = 0; i < obs.length; i++) {
                // const obs = obs.[i];
                getObservaciones(obs[i], arrObs, i, termino);
            }
        }
    }, [idObserv, actualizarTabla]);

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    useEffect(() => {
        dataFase();

        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        const url = () => {
            const urlconsulta = location.pathname.split('/ejecucion/');

            setUrlConsulta(urlconsulta);
        };

        const traerMedicionesRegistrar = async () => {
            const medicionesExp = await axios.get('http://localhost:81/api/mediciones');

        }
        url();
        traerMedicionesRegistrar();

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const dataFase = async () => {
        const res = await axios.get('http://localhost:81/api/experimentos/' + idUrl.id);
        setIdExperimento(idUrl.id);
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
        // traerMediciones(arregloNFase);
    }

    const traerMediciones = async (fasesExpe) => {
        // de primera debe entrar la primera fase del experimento actual
        let medicionesFase = fasesExpe;
        let arrNombreMediciones = new Array();
        let arrMediciones = arrMedicionesRecibidas;

        //Cuando llegue nueva info, debo actualizar ArrMediciones, y subirla a la misma posicion de NombreMediciones, en el espacio de su arreglo, por indice i;
        setIdmediciones(medicionesFase);
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
            const res = await axios.get('http://localhost:81/api/mediciones/' + medicionesFase[i]);
            arrNombreMediciones.push([res.data.medicion.nombre, i, nuevoArr]);
            arrMediciones.push(nuevoArr);
        }
        //Yo no paso fases hacia atras, solo avanzo fases en esta etapa, asi que no deberia haber problemas
        setArrMedicionesRecibidas(arrMediciones);
        setNombresMediciones(arrNombreMediciones);

    }

    // const traerMediciones = async (fasesExp) => {
    //     let mediciones = fasesExp;
    //     // de primera debe entrar la primera fase del experimento actual
    //     const medicionesFase = mediciones[0].idMediciones;
    //     let arrNombreMediciones = new Array();
    //     setIdmediciones(medicionesFase);
    //     for (let i = 0; i < medicionesFase.length; i++) {
    //         const res = await axios.get('http://localhost:81/api/mediciones/' + medicionesFase[i]);
    //         if (res.data.medicion.nombre === 'Intensidad') {
    //             arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
    //             setNombresMediciones(arrNombreMediciones);
    //         }
    //         if (res.data.medicion.nombre === 'Tiempo Habla') {
    //             arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
    //             setNombresMediciones(arrNombreMediciones);
    //         }
    //         if (res.data.medicion.nombre === 'Postura') {
    //             arrNombreMediciones.push([res.data.medicion.nombre, i, Postura]);
    //             setNombresMediciones(arrNombreMediciones);
    //         }
    //     }
    // }

    const cambiarFaseActiva = (fase) => {
        if (fase === fasesExp.length - 1) {
            setFaseActiva(fase);
        } else {
            setFaseActiva(fase);
        }

    }


    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Analisis Experimento</h3>
                <div className="card">
                    <div className="card-header">
                        <h4>{nombreExp}</h4>
                    </div>
                    <div>
                        <Grid container spacing={12}>
                            <Grid item xs={12}>

                                <div>
                                    <br />
                                    <div style={{ textAlign: 'center' }}>
                                        <h4>Fases del Experimento</h4>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Stepper activeStep={'Button'} alternativeLabel>
                                    {
                                        fasesExp.map(fase => (
                                            <Step key={fase._id} active={true} onClick={() => { cambiarFaseActiva(fase.numeroFase - 1); console.log(faseActiva) }}>
                                                <StepButton >
                                                    Fase {fase.numeroFase}
                                                </StepButton>
                                            </Step>
                                        ))
                                    }
                                </Stepper>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="container-fluid">
                        <div>
                            <div className="card-body">
                            <h4>Fase Activa: {faseActiva + 1}</h4>
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
                                                <Tab label={'Observaciones'} />
                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={tab} index={0}>
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
                                                                    {rows.map((row) => (
                                                                        <TableRow key={row.name}>
                                                                            <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.grupo}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.participante}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.dispositivo}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.tiempoMedicion}</TableCell>
                                                                            <TableCell align="right">{row.valor}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        {
                                            nombreMediciones.map(nombre => (
                                                <TabPanel value={tab} index={nombre[1] + 1}>
                                                    {/* Item a {nombre[0]} */}
                                                    <Grid container spacing={12}>
                                                        <Grid item xs={12}>
                                                            <Grid item xs={12}>
                                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                                    <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                        <TableHead>
                                                                            <TableRow style={{ height: '50px' }}>
                                                                                <TableCell>Grupo</TableCell>
                                                                                <TableCell>Participante</TableCell>
                                                                                <TableCell>Dispositivo</TableCell>
                                                                                <TableCell>Tiempo</TableCell>
                                                                                <TableCell>Valor</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {
                                                                                nombre[2].map(row => (
                                                                                    <TableRow key={row.name}>
                                                                                        <TableCell component="th" scope="row">{row.grupo}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.participante}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.dispositivo}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.tiempoMedicion}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.valor}</TableCell>
                                                                                    </TableRow>
                                                                                ))
                                                                            }
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </TabPanel>
                                            ))
                                        }
                                        {
                                            <TabPanel value={tab} index={nombreMediciones.length + 1}>
                                                <Grid container spacing={12}>
                                                    <Grid item xs={12}>
                                                        <Grid item xs={12}>
                                                            <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                                <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Tiempo</TableCell>
                                                                            <TableCell align="center">Valor</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {observacionesTabla.map((row) => (
                                                                            <TableRow key={row._id}>
                                                                                <TableCell component="th" scope="row">{row.tiempo}</TableCell>
                                                                                <TableCell align="center">{row.descripcion}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* <div className="card-body">
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
                                                <Tab label={'Observaciones'} />

                                            </Tabs>
                                        </AppBar>
                                        <TabPanel value={tab} index={0}>
                                            <Grid container spacing={12}>
                                                <Grid item xs={12}>
                                                    <Grid item xs={12}>
                                                        <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                            <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Nombre</TableCell>
                                                                        <TableCell>Grupo</TableCell>
                                                                        <TableCell>Participante</TableCell>
                                                                        <TableCell>Dispositivo</TableCell>
                                                                        <TableCell>Tiempo</TableCell>
                                                                        <TableCell>Valor</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {rows.map((row) => (
                                                                        <TableRow key={row.name}>
                                                                            <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.grupo}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.participante}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.dispositivo}</TableCell>
                                                                            <TableCell component="th" scope="row">{row.tiempoMedicion}</TableCell>
                                                                            <TableCell align="right">{row.valor}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TabPanel>
                                        {
                                            nombreMediciones.map(nombre => (
                                                <TabPanel value={tab} index={nombre[1] + 1}>
                                                    {/* Item a {nombre[0]} 
                                                    <Grid container spacing={12}>
                                                        <Grid item xs={12}>
                                                            <Grid item xs={12}>
                                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                                    <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>Grupo</TableCell>
                                                                                <TableCell>Participante</TableCell>
                                                                                <TableCell>Dispositivo</TableCell>
                                                                                <TableCell>Tiempo</TableCell>
                                                                                <TableCell>Valor</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {
                                                                                nombre[2].map(row => (
                                                                                    <TableRow key={row.name}>
                                                                                        <TableCell component="th" scope="row">{row.grupo}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.participante}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.dispositivo}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.tiempoMedicion}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.valor}</TableCell>
                                                                                    </TableRow>
                                                                                ))
                                                                            }
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </TabPanel>
                                            ))
                                        }
                                        {
                                            <TabPanel value={tab} index={nombreMediciones.length + 1}>
                                                <Grid container spacing={12}>
                                                    <Grid item xs={12}>
                                                        <Grid item xs={12}>
                                                            <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                                <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>Tiempo</TableCell>
                                                                            <TableCell align="center">Valor</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {observacionesTabla.map((row) => (
                                                                            <TableRow key={row._id}>
                                                                                <TableCell component="th" scope="row">{row.tiempo}</TableCell>
                                                                                <TableCell align="center">{row.descripcion}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>
                                        }

                                    </div>
                                </div>
                            </div> */}
                            <br />
                            <div style={{ float: "right" }}>
                                <Button
                                    variant="contained"
                                    // color="primary"
                                    size="small"
                                    style={{ margin: 3, textAlign: 'center', color: 'green' }}
                                    onClick={() => { console.log(faseActiva) }}

                                >
                                    Descargar Mediciones
                                </Button>

                            </div>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div style={{ float: "right" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                                onClick={() => window.location.href = "http://localhost/inicio"}

                            >
                                Finalizar Experimento
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}