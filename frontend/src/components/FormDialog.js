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
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";


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
    const classes = useStyles();
    const [datos, setDatos] = useState({
        obs: '',
        horas: '',
        minutos: ''
    })
    const [open, setOpen] = React.useState(false);
    const [observacion, setObs] = useState({
        idExperimento: '',
        descripcion: '',
        tiempo: ''
    });
    const [urlconsulta, setUrlConsulta] = useState('');
    const [tab, setTab] = React.useState(0);
    const [fases, setFases] = React.useState([]);
    const [idMediciones, setIdMediciones] = React.useState('');
    const [nombreMediciones, setNombresMediciones] = React.useState([]);
    const [nombreMed, setNombreMed] = React.useState([]);
    const [medicionesIntensidad, setMedicionesIntensidad] = React.useState(Intensidad);
    const [medicionesPostura, setMedicionesPostura] = React.useState(Postura);
    const [medicionesRegistrar, setMedicionesRegistrar] = React.useState([]);
    const [hora, setHora] = React.useState(hoy.getHours());
    const [minutos, setMinutos] = React.useState(hoy.getMinutes());

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };


    useEffect(() => {
        const url = () => {
            const urlconsulta = location.pathname.split('/ejecucion/');

            setUrlConsulta(urlconsulta);
        };
        const traerFases = async () => {
            const fasesExp = await axios.get('http://localhost:81/api/fases');
            setFases(fasesExp.data);
            traerMediciones(fasesExp.data);
        }
        const traerMediciones = async (fasesExp) => {
            let mediciones = fasesExp;
            const medicionesFase = mediciones.[0].idMediciones;
            let arrNombreMediciones = new Array();
            let arrMedicionesRegistrar = new Array();
            setIdMediciones(medicionesFase);
            for (let i = 0; i < medicionesFase.length; i++) {
                const res = await axios.get('http://localhost:81/api/mediciones/' + medicionesFase[i]);
                if (res.data.medicion.nombre == 'Intensidad') {
                    arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
                    setNombresMediciones(arrNombreMediciones);
                }
                if (res.data.medicion.nombre == 'Tiempo Habla') {
                    arrNombreMediciones.push([res.data.medicion.nombre, i, Intensidad]);
                    setNombresMediciones(arrNombreMediciones);
                }
                if (res.data.medicion.nombre == 'Postura') {
                    arrNombreMediciones.push([res.data.medicion.nombre, i, Postura]);
                    setNombresMediciones(arrNombreMediciones);
                }
            }
            // console.log(arrMedicionesRegistrar)
        }
        url();
        traerFases();
        
    }, []);


    // const traerFases = async () => {
    //     const fasesExp =  await axios.get('http://localhost:81/api/fases');
    //     setFases(fasesExp);
    //     // console.log(fases);
    // }

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
            idExperimento: urlconsulta[1],
            descripcion: datos.obs,
            tiempo: datos.horas + ':' + datos.minutos
        };
        guardarObservacion(data);
    }

    const guardarObservacion = async (data) => {
        if (!data) {
            return (console.log('help'))
        } else {
            await axios.post('http://localhost:81/api/observaciones', data);
            handleClose();
        }
    }


    return (
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
                                    value={hora}
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
                                    value={minutos}
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
    );
}