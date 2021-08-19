import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/';
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from "react-router-dom";

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
}));

function createData(nombre, grupo, participante, dispositivo, tiempoMedicion, valor) {
    return { nombre, grupo, participante, dispositivo, tiempoMedicion, valor };
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
    const [datos, setDatos] = useState({
        obs: '',
        horas: '',
        minutos: ''
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

    useEffect(() => {
        dataFase();
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
        url();
        traerFases();
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

    const onDeleteObs = async (id) => {
        // await axios.delete('http://localhost:81/api/observaciones/' + id);
        console.log('borrar')
    };

    const onEditObs = (id) => {
        console.log('editar')
    };

    // const handleClick = () => {
    //     console.log('Se hizo click');
    // };

    const handleChange = (event, newTab) => {
        setTab(newTab);
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
        //dejarlo en pos de grupos y participantes
        //debo verificar que lleguen datos - enviar - responder
        let data = {
            idFase: fases.[faseActiva]._id,
            descripcion: 'a',
            tiempo: 'hola'
        };
        guardarObservacion(data);
    }

    const guardarObservacion = async (data) => {
        console.log('guardar datos')
    }

    // const { faseActiva } = this.state;

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
                                                    {/* Item a {nombre[0]} */}
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
                                    </div>
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

        </div>

    );
}