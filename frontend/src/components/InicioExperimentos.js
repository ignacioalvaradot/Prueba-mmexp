/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Fab, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, Checkbox, IconButton, TextareaAutosize, CircularProgress } from '@material-ui/core/';
import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core/';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import 'date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, DateTimePicker } from '@material-ui/pickers';
import { es } from "date-fns/locale";
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
    const location = useLocation();
    const idUrl = useParams();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [urlconsulta, setUrlConsulta] = useState('');
    const [fases, setFases] = React.useState([]);
    const [redireccion, setRedireccion] = useState("http://localhost/experimentos/");
    const [openModalNuevoExperimento, setOpenModalNuevoExperimento] = useState(false);
    const [nombreNuevoExperimento, setNombreNuevoExperimento] = useState({
        nombreExp: '',
    })


    useEffect(() => {

        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        const url = () => {
            const urlconsulta = location.pathname.split('/ejecucion/');

            setUrlConsulta(urlconsulta);
        };

        url();
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const crearNuevoExperimento = async () => {
        console.log('dataNueva');
        // console.log(nombreNuevoExperimento);
        let fases = new Array();
        let nombreNuevoExp = nombreNuevoExperimento.nombreExp;
        let dataNueva = {
            estado: 'Planificacion',
            nombreExp: nombreNuevoExp,
            fasesId: fases,
        }
        const res = await axios.post(routesBD.experimentos, dataNueva);
        let idNuevoExp = res.data.mensaje
        console.log(idNuevoExp)

        handleCloseModalNuevoExp();
        setTimeout(
            function () {
                window.location.href = "http://localhost/planificacion/" + idNuevoExp;
            },
            2000
        );

    }

    const reedireccionExperimentos = (direccion) => {
        window.location.href = redireccion + direccion;
    }
    const handleOpenModalNuevoExperimento = () => {
        setOpenModalNuevoExperimento(true);
    };

    const handleCloseModalNuevoExp = () => {
        setOpenModalNuevoExperimento(false);
    };

    const mientrasCambiaNombreExp = (e) => {
        setNombreNuevoExperimento({
            ...nombreNuevoExperimento,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Inicio</h3>
                <div className="card">

                    <div className="container-fluid">
                        <div className="card-body">
                            <Grid container spacing={12}>
                                <Grid item xs={4}>
                                    <h4>Nuevo Experimento</h4>
                                    <Grid item xs={10}>

                                        <div className="card">

                                            <div className="container-fluid">
                                                <div style={{ textAlign: 'center' }} className="card-body">
                                                    <Grid item xs={12}>
                                                        <Button
                                                            fullWidth
                                                            size="large"
                                                            variant="contained"
                                                            color="primary"
                                                            style={{ margin: 3, textAlign: 'center' }}
                                                            onClick={() => { handleOpenModalNuevoExperimento() }}

                                                        >
                                                            <Icon fontSize='large' className="fa fa-plus-square" />

                                                        </Button>
                                                    </Grid>
                                                    <Modal
                                                        backdropColor="transparent"
                                                        open={openModalNuevoExperimento}
                                                        onClose={handleCloseModalNuevoExp}
                                                        closeAfterTransition
                                                        BackdropComponent={Backdrop}
                                                        BackdropProps={{
                                                            timeout: 500,
                                                        }}
                                                    >
                                                        <Fade in={openModalNuevoExperimento} >
                                                            <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                                                <Grid item xs={4} >
                                                                    <div className="card" >
                                                                        <div className="card-header">
                                                                            <h4>Nuevo Experimento</h4>
                                                                        </div>
                                                                        <div className="card-body">
                                                                            <form onSubmit={crearNuevoExperimento}>
                                                                                <TextField
                                                                                    multiline
                                                                                    autoFocus
                                                                                    margin="dense"
                                                                                    id="standard-multiline-static"
                                                                                    label="Ingrese un nombre para el nuevo Experimento"
                                                                                    fullWidth
                                                                                    onChange={mientrasCambiaNombreExp}
                                                                                    name="nombreExp"
                                                                                />
                                                                            </form>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <div style={{ float: "right" }}>
                                                                                <Button variant="contained" onClick={handleCloseModalNuevoExp} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                    Cancelar
                                                                                </Button>
                                                                                <Button variant="contained" type="submit" onClick={crearNuevoExperimento} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                    Crear Experimento
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                            </div>
                                                        </Fade>
                                                    </Modal>
                                                    <h4>Crear Experimento</h4>
                                                </div>
                                            </div>

                                        </div>
                                    </Grid>

                                </Grid>
                                <Grid item xs={8}>
                                    <Grid item xs={12}>

                                        <h4>Experimentos Registrados</h4>
                                        <div className="card">

                                            <div className="container-fluid">
                                                <div className="card-body">
                                                    <Grid container spacing={12}>
                                                        <Grid item xs={6}>
                                                            <Grid item xs={10}>
                                                                <div style={{ textAlign: 'center' }} className="card">
                                                                    <div className="card-body">
                                                                        <h4 >En Planificación</h4>
                                                                    </div>
                                                                    <div style={{ textAlign: "center" }} className="card-footer">
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            size="small"
                                                                            style={{ margin: 3, textAlign: 'center' }}
                                                                            onClick={() => { reedireccionExperimentos('planificados') }}
                                                                        >
                                                                            Ver Experimentos
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Grid item xs={10}>
                                                                <div style={{ textAlign: "center" }} className="card">
                                                                    <div className="card-body">
                                                                        <h4>En Preparación</h4>
                                                                    </div>
                                                                    <div className="card-footer">
                                                                        <Button
                                                                            variant="contained"
                                                                            color="primary"
                                                                            size="small"
                                                                            style={{ margin: 3, textAlign: 'center' }}
                                                                            onClick={() => { reedireccionExperimentos('preparados') }}
                                                                        >
                                                                            Ver Experimentos
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Box pt={3}>
                                                                <Grid item xs={10}>
                                                                    <div className="card" style={{ textAlign: 'center' }} >
                                                                        <div className="card-body">
                                                                            <h4>En Ejecución</h4>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                size="small"
                                                                                style={{ margin: 3, textAlign: 'center' }}
                                                                                onClick={() => { reedireccionExperimentos('ejecutados') }}
                                                                            >
                                                                                Ver Experimentos
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                            </Box>

                                                        </Grid>

                                                        <Grid item xs={6}>
                                                            <Box pt={3}>
                                                                <Grid item xs={10}>
                                                                    <div style={{ textAlign: 'center' }} className="card">
                                                                        <div className="card-body">
                                                                            <h4>Finalizados</h4>
                                                                        </div>
                                                                        <div className="card-footer">
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                size="small"
                                                                                style={{ margin: 3, textAlign: 'center' }}
                                                                                onClick={() => { reedireccionExperimentos('finalizados') }}
                                                                            >
                                                                                Ver Experimentos
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </Grid>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>


                                                </div>
                                            </div>

                                        </div>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </div>

                    </div>

                    {/* <div className="card-footer">
                        <div style={{ float: "right" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ margin: 3, textAlign: 'center' }}
                                onClick={() => { console.log('a') }}

                            >
                                Finalizar Experimento
                            </Button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );

}