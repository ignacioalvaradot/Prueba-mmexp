// /* eslint-disable */
import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Backdrop, Fade } from '@material-ui/core/';
// import {DataGrid, GridToolbarContainer, GridToolbarExport,} from '@mui/x-data-grid';
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from "react-router-dom";

import { Stepper, Step, StepButton } from '@material-ui/core/'
import 'date-fns';
import routesBD from '../helpers/routes';
import useAuth from './auth/useAuth';


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

// const rows = [
//     createData('Speech Count', '01', '04', 'Mic.', '05:30', '02:00'),
//     createData('Pos. Mic', '01', '04', 'Mic.', '05:32', 'Coord'),
//     createData('Speech Count', '03', '01', 'Mic.', '05:35', '05:00'),
//     createData('Pos. Hombros', '02', '03', 'Cam.', '05:38', 'Coord'),
//     createData('Speech Count', '01', '02', 'Mic.', '05:45', '10:00'),
//     createData('Pos. Manos', '01', '04', 'Cam.', '05:46', 'Coord'),
//     createData('Gestos', '01', '05', 'Cam.', '05:49', 'Coord'),
//     createData('Pos. Mic', '01', '02', 'Mic.', '05:49', 'Coord'),
//     createData('Pos. Mic', '01', '02', 'Mic.', '05:50', 'Coord'),
//     createData('Pos. Mic', '01', '03', 'Mic.', '05:51', 'Coord'),
//     createData('Speech Count', '01', '04', 'Mic.', '05:52', '03:00'),
// ];

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

    const [observacionesTabla, setObservacionesTabla] = React.useState([]);
    const [actualizarTabla, setActualizarTabla] = React.useState(false);
    const [tab, setTab] = React.useState(0);
    const [arrMedicionesRecibidas, setArrMedicionesRecibidas] = useState([]);
    const [tablaArchivo, setTablaArchivo] = useState([]);
    const [headerTablaArchivo, setHeaderTablaArchivo] = useState([]);
    const [botonDescarga, setBotonDescarga] = useState('');
    const [gruposActuales, setGruposActuales] = useState([]);
    const [arregloParticipantesActuales, setArregloParticipantesActuales] = useState([]);
    const [tablaGeneral, setTablaGeneral] = useState([]);
    const [headerTablaGeneral, setHeaderTablaGeneral] = useState([]);
    const [arregloDataArchivos, setArregloDataArchivos] = useState([]);
    const [openModalDescargar, setOpenModalDescargar] = useState(false);
    const [estadoModal, setEstadoModal] = useState(false);

    const { user } = useAuth();

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

            traerMediciones(medicionesFase);

        }
        return () => {
        }
    }, [faseActiva, fasesExp]);

    useEffect(() => {
        const getObservaciones = async (obs, arrObs, i, termino) => {
            const res = await axios.get(routesBD.observaciones + obs);
            // const res = await axios.get('http://localhost:81/api/observaciones/' + obs);


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
            const medicionesExp = await axios.get(routesBD.observaciones);

        }
        url();
        traerMedicionesRegistrar();

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const dataFase = async () => {
        const res = await axios.get(routesBD.experimentos + idUrl.id);
        setIdExperimento(idUrl.id);
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
            const res = await axios.get(routesBD.mediciones + medicionesFase[i]);
            arrNombreMediciones.push([res.data.medicion.nombre, i, nuevoArr]);
            arrMediciones.push(nuevoArr);
        }
        //Yo no paso fases hacia atras, solo avanzo fases en esta etapa, asi que no deberia haber problemas
        setArrMedicionesRecibidas(arrMediciones);
        setNombresMediciones(arrNombreMediciones);
        parametrosGenerales();
        // traerArchivos();

    }

    const cambiarFaseActiva = (fase) => {
        if (fase === fasesExp.length - 1) {
            setFaseActiva(fase);
            setTab(0);
        } else {
            setFaseActiva(fase);
            setTab(0);
        }

    }

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType })

        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }

    // const exportToJson = e => {
    //     e.preventDefault()
    //     downloadFile({
    //         data: JSON.stringify(rows),
    //         fileName: 'users.json',
    //         fileType: 'text/json',
    //     })
    // }

    const exportToCsv = e => {
        e.preventDefault()
        // window.open(botonDescarga);

        // Headers for each column
        // let headers = ['Nombre;Grupo;Participante;Dispositivo;tiempoMedicion;valor']
        let headers = ['Grupo;Participante;Dispositivo;Canal'];

        // Convert users data to a csv
        let usersCsv = tablaGeneral.reduce((acc, user) => {
            const { Grupo, Participante, Dispositivo, Canal } = user
            acc.push([Grupo, Participante, Dispositivo, Canal].join(';'))
            return acc
        }, [])

        downloadFile({
            data: [...headers, ...usersCsv].join('\n'),
            fileName: 'configuracionExp.csv',
            fileType: 'text/csv',
        })
    }

    const parametrosGenerales = async () => {
        let gruposFase = [];
        for (let i = 0; i < fasesExp[faseActiva]['idGrupos'].length; i++) {
            const grupos = await axios.get(routesBD.grupos + fasesExp[faseActiva]['idGrupos'][i]);
            gruposFase.push(grupos.data.grupo);
        }
        // console.log('gruposFase');
        // console.log(gruposFase);
        setGruposActuales([...gruposFase]);
        let arrGeneralParticipantes = [];
        for (let j = 0; j < gruposFase.length; j++) {
            let arrParticipantes = [];
            for (let k = 0; k < gruposFase[j]['participantes'].length; k++) {
                const participantes = await axios.get(routesBD.participantes + gruposFase[j]['participantes'][k]);
                arrParticipantes.push(participantes.data.participante);
            }
            arrGeneralParticipantes.push(arrParticipantes);
        }
        // console.log('arrGeneralParticipantes');
        // console.log(arrGeneralParticipantes);
        setArregloParticipantesActuales([...arrGeneralParticipantes]);
        //necesito arreglar esta informacion para tablaGeneral
        let tablaGeneralActual = [];
        for (let i = 0; i < gruposFase.length; i++) {
            for (let j = 0; j < arrGeneralParticipantes.length; j++) {
                for (let k = 0; k < arrGeneralParticipantes[j].length; k++) {
                    for (let l = 0; l < arrGeneralParticipantes[j][k]['dispositivos'].length; l++) {
                        let dataArr = {
                            Grupo: gruposFase[i]['descripcion'],
                            Participante: arrGeneralParticipantes[j][k]['descripcion'],
                            Dispositivo: arrGeneralParticipantes[j][k]['dispositivos'][l]['dispositivo'],
                            Canal: arrGeneralParticipantes[j][k]['dispositivos'][l]['canal']
                        };
                        tablaGeneralActual.push(dataArr);
                    }
                }
            }
        }
        setTablaGeneral(tablaGeneralActual);
        let headers = ['Grupo', 'Participante', 'Dispositivo', 'Canal'];
        setHeaderTablaGeneral([...headers]);
    }

    const traerArchivos = async (idMedicion) => {
        let data = {
            medicion: idMedicion,
            correoUsuario: user.correo,
            idExperimento: idExperimento,
            idFase: fasesExp[faseActiva]['_id'],
            idGrupos: gruposActuales,
            participantes: arregloParticipantesActuales
        };
        //Solo debe enviar correoUsuario, idExperimento, idFase, idGrupos, idParticipantes, Dispositivos, canales, medicion
        // participantes contiene la informacion del dispositivo y del canal
        // let idFase = fasesExp[faseActiva]['_id'];
        let arrArchivos = [];
        const archivo = await axios.post(routesBD.archivosPruebas, data);
        let file = {};

        //en caso de traer varios archivos
        // if (archivo.data.archivoPrueba.length > 1) {
        //     arrArchivos.push(archivo.data.archivoPrueba.archivo);
        //     setArregloDataArchivos(arrArchivos);
        //     file = routesBD.rutaLocal + archivo.data.archivoPrueba[0].archivo;
        // } else {
        setArregloDataArchivos(archivo.data.archivoPrueba);
        file = routesBD.rutaLocal + archivo.data.archivoPrueba.archivo;
        // }
        // let file = routesBD.rutaLocal + archivo.data.archivoPrueba.archivo;
        file = file.replace(/\\/g, '/');
        const archivoReader = await axios.get(file);
        let archivoSplit = archivoReader.data.split("\n");
        let headers = archivoSplit[0].split(";");
        setHeaderTablaArchivo([...headers]);
        archivoSplit.splice(0, 1);
        // arrArchivos.push(archivoSplit);
        setTablaArchivo([...archivoSplit]);
    }

    const handleModalDescargar = async () => {
        // medicion, correoUsuario, archivo, idExperimento, idFase, idGrupos, Participantes tiene -> Dispositivos y canales
        let medicionesFase = [];
        for (let i = 0; i < nombreMediciones.length; i++) {
            medicionesFase.push(nombreMediciones[i][0]);
        }
        let data = {
            medicion: medicionesFase,
            correoUsuario: user.correo,
            idExperimento: idExperimento,
            idFase: fasesExp[faseActiva]['_id'],
            idGrupos: gruposActuales,
            participantes: arregloParticipantesActuales
        };
        const estadoPeticion = await axios.post(routesBD.descargaTest, data);
        if (estadoPeticion.data.mensaje === 'Ok') {
            setEstadoModal(true);
            setOpenModalDescargar(true);
        } else {
            setEstadoModal(false);
            setOpenModalDescargar(true);
        }
    }

    const closeModalDescargar = () => {
        setOpenModalDescargar(false);
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
                                                        <Tab label={nombre[0]} onClick={() => traerArchivos(nombre[0])} />
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
                                                                    < TableRow style={{ height: '50px' }}>
                                                                        {
                                                                            headerTablaGeneral.map(header => (
                                                                                <TableCell>{header}</TableCell>
                                                                            ))
                                                                        }
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {
                                                                        tablaGeneral.map((row) => (
                                                                            <TableRow>
                                                                                {/* {
                                                                                    row.split(";").map((column) => ( */}
                                                                                <TableCell component="th" scope="row">{row.Grupo}</TableCell>
                                                                                <TableCell component="th" scope="row">{row.Participante}</TableCell>
                                                                                <TableCell component="th" scope="row">{row.Dispositivo}</TableCell>
                                                                                <TableCell component="th" scope="row">{row.Canal}</TableCell>
                                                                                {/* )) */}
                                                                                {/* } */}
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
                                                                                {
                                                                                    headerTablaArchivo.map((header) => (
                                                                                        <TableCell>{header}</TableCell>

                                                                                    ))
                                                                                }
                                                                                {/* <TableCell>Grupo</TableCell>
                                                                                <TableCell>Participante</TableCell>
                                                                                <TableCell>Dispositivo</TableCell>
                                                                                <TableCell>Tiempo</TableCell>
                                                                                <TableCell>Valor</TableCell> */}
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {
                                                                                tablaArchivo.map(row => (
                                                                                    <TableRow>
                                                                                        {
                                                                                            row.split(";").map((column) => (
                                                                                                <TableCell component="th" scope="row">{column}</TableCell>
                                                                                            ))
                                                                                        }
                                                                                        {/* <TableCell component="th" scope="row">{row.tiempoMedicion}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.valor}</TableCell> */}
                                                                                    </TableRow>
                                                                                ))
                                                                            }
                                                                            {/* {
                                                                                nombre[2].map(row => (
                                                                                    <TableRow key={row.name}>
                                                                                        <TableCell component="th" scope="row">{row.grupo}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.participante}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.dispositivo}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.tiempoMedicion}</TableCell>
                                                                                        <TableCell component="th" scope="row">{row.valor}</TableCell>
                                                                                    </TableRow>
                                                                                ))
                                                                            } */}
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
                            <br />
                            <div style={{ float: "right" }}>
                                <Button
                                    variant="outlined"
                                    // color="primary"
                                    size="small"
                                    style={{ margin: 3, textAlign: 'center', color: 'green' }}
                                    // onClick={() => { console.log(faseActiva) }}
                                    onClick={exportToCsv}
                                >
                                    Descargar Configuracion General
                                </Button>
                                <Button
                                    variant="outlined"
                                    // color="primary"
                                    size="small"
                                    style={{ margin: 3, textAlign: 'center', color: 'green' }}
                                    // onClick={() => { console.log(faseActiva) }}
                                    onClick={handleModalDescargar}
                                >
                                    Descargar Mediciones
                                </Button>
                                <Modal
                                    backdropColor="transparent"
                                    open={openModalDescargar}
                                    onClose={() => closeModalDescargar()}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                >
                                    <Fade in={openModalDescargar} >
                                        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                            <Grid item xs={4} >
                                                <div className="card" >
                                                    <div className="card-header">
                                                        <h4>¡Aviso!</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5>Se notificará al siguiente correo: '{user.correo}', una vez se genere el Link de descarga de los Documentos del Experimento</h5>
                                                    </div>
                                                    <div className="card-footer">
                                                        <div style={{ float: "right" }}>
                                                            <Button variant="contained" type="submit" onClick={() => closeModalDescargar()} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
                                                                Continuar
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
        </div >
    );

}