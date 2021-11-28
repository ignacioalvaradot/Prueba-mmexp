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
    const [redireccion, setRedireccion] = useState(rutasFront.Experimentos);
    const [tipoExperimento, setTipoExperimento] = React.useState('');
    const [getExperimentos, setGetExperimentos] = React.useState([]);
    const [tipoEdicion, setTipoEdicion] = useState('');
    const [idExperimentoEliminar, setIdExperimentoEliminar] = useState('');
    const [openModalEliminarExp, setOpenModalEliminarExp] = useState(false);


    useEffect(() => {

        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        const url = () => {
            const urlconsulta = location.pathname.split('/experimentos/');
            setTipoExperimento(urlconsulta[1]);
            setUrlConsulta(urlconsulta);
            traerExperimentos(urlconsulta[1]);
        };

        const traerExperimentos = (tipoExp) => {
            let tipo = '';
            if (tipoExp === 'planificados') {
                tipo = 'Planificacion';
            } else if (tipoExp === 'preparados') {
                tipo = 'Preparacion';
            } else if (tipoExp === 'ejecutados') {
                tipo = 'Ejecucion';
            } else if (tipoExp === 'finalizados') {
                tipo = 'Analisis';
            }

            if (tipo != '') {
                console.log(tipo);
                setTipoEdicion(tipo);
                axios.get(routesBD.experimentos + 'traerExp/' + tipo).then((value) => { setGetExperimentos(value.data.experimento) });
                if(tipo==='Preparacion'){
                    setTipoEdicion('preparacionConfig');
                }
            }
        }

        url();
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const reedireccionExperimentos = (idDireccion) => {
        window.location.href = rutasFront.rutaLocal + tipoEdicion + "/" + idDireccion;
    }

    const openModalEliminarExperimentos = (idExpEliminar) => {
        setIdExperimentoEliminar(idExpEliminar);
        setOpenModalEliminarExp(true);
    }

    const closeModalEliminarExp = (estadoEliminar) => {
        if (estadoEliminar === 'NoEliminar') {
            setOpenModalEliminarExp(false);
        } else if (estadoEliminar === 'Eliminar') {
            eliminarExperimentos()
            setTimeout(
                function () {
                    setOpenModalEliminarExp(false);
                },
                2000
            );
            
        }
    }

    const eliminarExperimentos = async () => {
        let idExperEliminar = idExperimentoEliminar;
        let Experimentos = getExperimentos;
        let idFases = new Array();
        let idGrupos = new Array();
        let idParticipantes = new Array();
        let idObservaciones = new Array();
        for (let i = 0; i < Experimentos.length; i++) {
            if (Experimentos[i]['_id'] === idExperEliminar) {
                idFases = Experimentos[i]['fasesId'];
                if (idFases.length > 0) {
                    for (let j = 0; j < idFases.length; j++) {
                        const resFases = await axios.get(routesBD.fases + idFases[j]);
                        idGrupos = resFases.data.fase.idGrupos;
                        if (idGrupos.length > 0) {
                            for (let k = 0; k < idGrupos.length; k++) {
                                const resGrupos = await axios.get(routesBD.grupos + idGrupos[k]);
                                idParticipantes = resGrupos.data.grupo.participantes;
                                if (idParticipantes.length > 0) {
                                    for (let l = 0; l < idParticipantes.length; l++) {
                                        const resDelParticipantes = await axios.delete(routesBD.participantes + idParticipantes[l]);
                                    }
                                }
                                const resDelGrupos = await axios.delete(routesBD.grupos + idGrupos[k]);
                            }
                        }
                        idObservaciones = resFases.data.fase.idObservaciones
                        if (idObservaciones.length > 0) {
                            for (let m = 0; m < idObservaciones.length; m++) {
                                const resDelObservaciones = await axios.delete(routesBD.observaciones + idObservaciones[m]);
                            }
                        }
                        const resDelFases = await axios.delete(routesBD.fases + idFases[j]);
                    }
                }
                const resDelExperimento = await axios.delete(routesBD.experimentos + idExperEliminar);
                Experimentos.splice(i, 1);
            }
        }
        setGetExperimentos([...Experimentos]);
        console.log('Experimento Eliminado: ');
    }

    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Experimentos</h3>
                <div className="card">

                    <div className="container-fluid">
                        <div className="card-body">
                            <Grid container spacing={12}>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <div className="card">
                                            <div className="card-footer">
                                                <Grid container spacing={12}>
                                                    <h4>Experimentos {tipoExperimento}</h4>

                                                    <Grid item xs={12}>
                                                        <Grid item xs={12}>
                                                            <div style={{ textAlign: 'center' }} className="card">
                                                                <div className="card-body">
                                                                    <Grid item xs={12} style={{ float: 'none', margin: 'auto', }}>
                                                                        <div className={classes.tabsStyles}>
                                                                            <Grid container spacing={12}>
                                                                                <Grid item xs={12}>
                                                                                    <Grid item xs={12}>
                                                                                        <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                                                            <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                                                <TableHead>
                                                                                                    <TableRow>
                                                                                                        <TableCell>Descripcion</TableCell>
                                                                                                        <TableCell>Fecha Experimento</TableCell>
                                                                                                        <TableCell>Ultima Modificacion</TableCell>
                                                                                                        <TableCell>Accion</TableCell>
                                                                                                    </TableRow>
                                                                                                </TableHead>
                                                                                                <TableBody>
                                                                                                    {getExperimentos.map((row) => (
                                                                                                        <TableRow key={row.name}>
                                                                                                            <TableCell component="th" scope="row">{row.nombreExp}</TableCell>
                                                                                                            <TableCell component="th" scope="row">{row.createdAt}</TableCell>
                                                                                                            <TableCell component="th" scope="row">{row.updatedAt}</TableCell>
                                                                                                            <TableCell component="th" scope="row">
                                                                                                                <Button variant="contained"
                                                                                                                    color="primary"
                                                                                                                    size="small"
                                                                                                                    style={{ margin: 3, textAlign: 'center' }}
                                                                                                                    onClick={() => reedireccionExperimentos(row._id)}
                                                                                                                >
                                                                                                                    Editar
                                                                                                                </Button>
                                                                                                                <Button variant="contained"
                                                                                                                    color="secondary"
                                                                                                                    size="small"
                                                                                                                    style={{ margin: 3, textAlign: 'center' }}
                                                                                                                    onClick={() => openModalEliminarExperimentos(row._id)}
                                                                                                                >
                                                                                                                    Eliminar
                                                                                                                </Button>
                                                                                                            </TableCell>

                                                                                                        </TableRow>
                                                                                                    ))}
                                                                                                </TableBody>
                                                                                            </Table>
                                                                                        </TableContainer>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                            <Modal
                                                                                backdropColor="transparent"
                                                                                open={openModalEliminarExp}
                                                                                onClose={() => closeModalEliminarExp()}
                                                                                closeAfterTransition
                                                                                BackdropComponent={Backdrop}
                                                                                BackdropProps={{
                                                                                    timeout: 500,
                                                                                }}
                                                                            >
                                                                                <Fade in={openModalEliminarExp} >
                                                                                    <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                                                                        <Grid item xs={4} >
                                                                                            <div className="card" >
                                                                                                <div className="card-header">
                                                                                                    <h4>Eliminar Experimento</h4>
                                                                                                </div>
                                                                                                <div className="card-body">
                                                                                                    <h5>¿Desea ELIMINAR todo este Experimento?</h5>
                                                                                                </div>
                                                                                                <div className="card-footer">
                                                                                                    <div style={{ float: "right" }}>
                                                                                                        <Button variant="contained" onClick={() => closeModalEliminarExp('NoEliminar')} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                                            No
                                                                                                        </Button>
                                                                                                        <Button variant="contained" type="submit" onClick={() => closeModalEliminarExp('Eliminar')} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
                                                                                                            Si
                                                                                                        </Button>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </Grid>
                                                                                    </div>
                                                                                </Fade>
                                                                            </Modal>
                                                                        </div>
                                                                    </Grid>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}