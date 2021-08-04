import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core/';
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from "react-router-dom";

import { Stepper, Step, StepButton, LinearProgress } from '@material-ui/core/'
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditDialog from './Vista Ejecucion/EditDialog';


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

const hoy = new Date();

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
export default function FormDialog() {

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
    // const [nombreMed, setNombreMed] = React.useState([]);
    // const [medicionesIntensidad, setMedicionesIntensidad] = React.useState(Intensidad);
    // const [medicionesPostura, setMedicionesPostura] = React.useState(Postura);
    // const [medicionesRegistrar, setMedicionesRegistrar] = React.useState([]);
    const [horaActual, setHora] = React.useState(hoy.getHours());
    const [minutosActual, setMinutos] = React.useState(hoy.getMinutes());

    const [idObserv, setIdObserv] = React.useState([]);
    const [faseActiva, setFaseActiva] = React.useState(0);
    const [nombreExp, setNombreExp] = React.useState('');
    const [idExp, setIdExp] = React.useState('');
    const [fasesExp, setFasesExp] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [observaciones, setObservaciones] = React.useState([]);
    const [tiempoInicio, setTiempoInicio] = React.useState('');
    const [tiempoFin, setTiempoFin] = React.useState('');
    // const [duracion, setDuracion] = React.useState(0);
    const [tiempoDuracionSec, setTiempoDurSec] = React.useState(0);
    const [progreso, setProgreso] = React.useState(0);
    const [progresoTiempo, setProgresoTiempo] = React.useState(0);
    const [horas, setHoras] = React.useState(0);
    const [minutos, setMinuto] = React.useState(0);
    const [segundos, setSegundos] = React.useState(0);
    const [tiempoString, setTiempoString] = React.useState('');
    const [observacionesTabla, setObservacionesTabla] = React.useState([]);
    const [actualizarTabla, setActualizarTabla] = React.useState(false);

    let barraProgreso = 0;
    let tablaObservaciones = 0;

    useEffect(() => {
        dataFase();
        setActualizarTabla(!actualizarTabla);
        // getObservaciones();
        let progresoraro = progress;

        barraProgreso = setInterval(() => {
            progresoraro = progresoraro + 1;
            setProgress(progresoraro);
            // normalizar(progresoraro);
        }, 1000);

        // tablaObservaciones = setInterval(() => {
        //     getObservaciones();
        // }, 5000);

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
        return () => clearInterval(barraProgreso);

    }, []);


    const dataFase = async () => {
        const res = await axios.get('http://localhost:81/api/experimentos/' + idUrl.id);
        obtenerFases(res.data.experimento.fasesId);
        setNombreExp(res.data.experimento.nombreExp);
        setIdExp(res.data.experimento._id);
    };
    // const componentWillUnmount = () => {
    //     clearInterval(barraProgreso);
    //     clearInterval(tablaObservaciones)
    // }

    const obtenerFases = async (fases) => {
        let arrfases = fases;
        let arregloNFase = new Array;
        for (var i = 0; i < arrfases.length; i++) {
            let resF = await axios.get('http://localhost:81/api/fases/' + arrfases[i]);
            arregloNFase.push(resF.data.fase);
        }
        setFasesExp(arregloNFase);
        setTiempoInicio(arregloNFase.[0].tiempoInicio);
        setTiempoFin(arregloNFase.[0].tiempoFin);
        calcularTiempoFases(arregloNFase.[0].tiempoInicio, arregloNFase.[0].tiempoFin);
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
        setTiempoInicio(primeroI + ':' + segundoI);
        setTiempoFin(primeroF + ':' + segundoF);
        setTiempoDurSec(tiempoT);
    };

    useEffect(() => {
        // const normalizar = (progresoraro) => {
        let progreTiempo = progresoTiempo;
        let tiempoDurSec = tiempoDuracionSec;
        // if(tiempoDuracionSec!=0){
        //     // console.log(tiempoDurSec);
        // };

        let varSegundos = segundos;

        let valor = (progreTiempo * 100) / tiempoDurSec;
        let progTiempo = progreTiempo + 1;
        let Nsegundos = varSegundos + 1;
        let Nminutos = minutos;
        let Nhoras = horas;
        let segundosString = '';
        let minutosString = '';
        let horasString = '';

        if (progTiempo === tiempoDurSec) {
            clearInterval(barraProgreso);
            console.log('Fase Finalizada por tiempo');
        } else {
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
            setProgreso(valor);
            setProgresoTiempo(progTiempo);
            setTiempoString(horasString + ':' + minutosString + ':' + segundosString);
            // console.log(tiempoDuracionSec);
            //que hacer cuando se llegue a 0 para el contador
        }
    }, [progress]);

    useEffect(() => {
        console.log('Fase: ' + faseActiva);
        let numerofaseActual = faseActiva + 1;

        if (fases != '') {
            let faseAct = fases.[faseActiva];
            const medicionesFase = faseAct.['idMediciones'];
            let arrNombreMediciones = new Array();
            let arrObsv = fases.[faseActiva].idObservaciones;
            setIdObserv(arrObsv);
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
            if (fasesExp != '') {
                clearInterval(barraProgreso);
                setProgresoTiempo(0);
                setHoras(0);
                setMinutos(0);
                setSegundos(0);
                setTiempoString('');

                let arregloNFase = fasesExp;
                setTiempoInicio(arregloNFase.[faseActiva].tiempoInicio);
                setTiempoFin(arregloNFase.[faseActiva].tiempoFin);
                calcularTiempoFases(arregloNFase.[faseActiva].tiempoInicio, arregloNFase.[faseActiva].tiempoFin);
            }
            traerMedicionesFase(medicionesFase);

        }

        return () => {
        }
    }, [faseActiva, fases]);

    // const arrObs = new Array();
    useEffect(() => {
        const getObservaciones = async (obs, arrObs, i, termino) => {
            const res = await axios.get('http://localhost:81/api/observaciones/' + obs);
            
            if (res.data.observacion != null) {
                arrObs.push(res.data.observacion);
                console.log(i);

                if (i === termino) { 
                    // console.log(arrObs)
                    // setObservaciones(arrObs);
                    setObservacionesTabla(arrObs);
                }
            }else{
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
            let termino = (obs.length)-1;
            
            for (let i = 0; i < obs.length; i++) {
                // const obs = obs.[i];
                
                getObservaciones(obs.[i], arrObs, i, termino);
            }
        }
    }, [idObserv, actualizarTabla]);

    // useEffect(() => {
    //     console.log('se ejecuto')
    //     if (observaciones != '') {
    //         // let bandera = actualizarTabla;
    //         // if(bandera===true){
    //         console.log(observaciones);
    //         setObservacionesTabla(observaciones);
    //         // setActualizarTabla(false);
    //         // }
    //         // for(let i=0; i<observaciones.length ; i++){
    //         //     console.log(observaciones.[i]);
    //         // }
    //     }
    // }, [observaciones]);

    const onDeleteObs = async (id) => {
        await axios.delete('http://localhost:81/api/observaciones/' + id);
        let arrdelete = idObserv;
        // for(let i; i<arrdelete.length; i++){
        //     if(id == arrdelete[i]){
        //         arrdelete.splice(i, 1);
        //         setIdObserv(arrdelete);
        //         const resq = await axios.put('http://localhost:81/api/fases/agregarObservaciones/' + fases.[faseActiva]._id, arrdelete);
        //         setActualizarTabla(!actualizarTabla);
                
        //         console.log(resq);
        //     }
        //     // if (idObserv != '') {
        //     //     let arrObservaciones = idObserv;
        //     //     arrObservaciones.push(res.data.mensaje);
        //     //     // setIdObserv(arrObservaciones);
        //     //     setActualizarTabla(!actualizarTabla);
        //     //     let datoIdObs = {
        //     //         idObservaciones: arrObservaciones
        //     //     }
        //     //     const resq = await axios.put('http://localhost:81/api/fases/agregarObservaciones/' + fases.[faseActiva]._id, datoIdObs);
        //     // }
        // }
        // getObservaciones();
    };

    const onEditObs = (id) => {
        return (<EditDialog />)
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
        let data = {
            idFase: fases.[faseActiva]._id,
            descripcion: datos.obs,
            tiempo: datos.horas + ':' + datos.minutos
        };
        guardarObservacion(data);
    }

    const guardarObservacion = async (data) => {
        if (!data) {
            return (console.log('help'))
        } else {
            const res = await axios.post('http://localhost:81/api/observaciones', data);
            console.log(res.data.mensaje);

            if (idObserv != '') {
                let arrObservaciones = idObserv;
                arrObservaciones.push(res.data.mensaje);
                // setIdObserv(arrObservaciones);
                setActualizarTabla(!actualizarTabla);
                let datoIdObs = {
                    idObservaciones: arrObservaciones
                }
                const resq = await axios.put('http://localhost:81/api/fases/agregarObservaciones/' + fases.[faseActiva]._id, datoIdObs);
            }
            handleClose();
        }
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
                        <LinearProgress variant="determinate"
                            value={progreso}
                        />
                        <div>
                            <div align="left" style={{ float: 'left' }}>{tiempoInicio}</div>
                            <div align="right" style={{ float: 'right' }}>{tiempoFin}</div>
                            <div align="center" style={{ float: 'center' }}>{tiempoString}</div>
                        </div>
                        <br />
                        <div>
                            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ margin: 'auto', display: "flex" }}>
                                Agregar Observacion
                            </Button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Observacion</DialogTitle>
                                <DialogContent >
                                    <form onSubmit={enviarDatos}>
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
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <TextField
                                                    size="small"
                                                    id="standard-number"
                                                    label="Hora"
                                                    type="number"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={handleSave}
                                                    name="horas"
                                                    value={horaActual}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    id="standard-number"
                                                    label="Minuto"
                                                    type="number"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={handleSave}
                                                    name="minutos"
                                                    value={minutosActual}
                                                />
                                            </Grid>
                                        </Grid>
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
                                                {/* <Tab label="Tabla General" {...a11yProps(0)} />
                                <Tab label="Item Two" {...a11yProps(1)} />
                                <Tab label="Item Three" {...a11yProps(2)} /> */}
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
                                    {
                                        <div>
                                            <h5>Observaciones</h5>
                                            <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Tiempo</TableCell>
                                                            <TableCell align="center">Valor</TableCell>
                                                            <TableCell align="right">Accion</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {observacionesTabla.map((row) => (
                                                            <TableRow key={row._id}>
                                                                <TableCell component="th" scope="row">{row.tiempo}</TableCell>
                                                                <TableCell align="center">{row.descripcion}</TableCell>
                                                                <TableCell align="right" ><VisibilityIcon onClick={() => onEditObs(row._id)}></VisibilityIcon><CancelIcon onClick={() => onDeleteObs(row._id)} /></TableCell>
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