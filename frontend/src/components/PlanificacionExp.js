/* eslint-disable */
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
                <Box p={2}>
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
let FaseActivaGlobal = 0;
export default function PlanificacionExp() {
    const [idExperimento, setIdExperimento] = React.useState('');
    const location = useLocation();
    const idUrl = useParams();
    const classes = useStyles();
    const [urlconsulta, setUrlConsulta] = useState('');
    const [tab, setTab] = React.useState(0);
    const [fasesComparacion, setFasesComparacion] = React.useState([]);
    const [faseActiva, setFaseActiva] = React.useState(0);
    const [nombreExp, setNombreExp] = React.useState('');
    const [idExp, setIdExp] = React.useState('');
    const [fasesExp, setFasesExp] = React.useState([]);
    const [openModalGuardarDatos, setOpenModalGuardarDatos] = React.useState(false);
    const [openModalGuardarExp, setOpenModalGuardarExp] = React.useState(false);
    const [descripcionFase, setDescripcionFase] = useState({ descripcion: '' });
    const [documentosFase, setDocumentosFase] = useState({ links: '' });
    const [idObservaciones, setIdObservaciones] = React.useState([]);
    const [idGrupos, setIdGrupos] = React.useState([]);

    const [fechaFase, setFechaFase] = React.useState(new Date());
    const [horaInicio, setHoraInicio] = React.useState(new Date());
    const [horaTermino, setHoraTermino] = React.useState(new Date());
    const [medicionesSelected, setMedicioneSelected] = React.useState([]);
    const [numeroFasesSelected, setNumeroFasesSelected] = React.useState([]);

    const [banderaFase, setBanderaFase] = useState(false);
    const [banderaTabla, setBanderaTabla] = React.useState(true);
    const [banderaSinFases, setBanderaSinFases] = React.useState(true);
    const [evitarRecarga, setEvitarRecarga] = React.useState(false);
    const [direccionFaseActiva, setDireccionFaseActiva] = React.useState(0);
    const [idFasesEliminadas, setIdFasesEliminadas] = React.useState([]);
    const [cambiarBoton, setCambiarBoton] = React.useState(true);

    const handleFechaFase = (fecha) => {
        setFechaFase(fecha);
        // console.log(fecha);
    };
    const handleHoraInicio = (HoraIni) => {
        setHoraInicio(HoraIni);
        // console.log(HoraIni);
    };
    const handleHoraTermino = (HoraTerm) => {
        setHoraTermino(HoraTerm);
        // console.log(HoraTerm);
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
            const medicionesExp = await axios.get(routesBD.mediciones);
            for (let i = 0; i < (medicionesExp.data).length; i++) {
                medicionesExp.data[i].boolean = false;
            }
            setMedicioneSelected(medicionesExp.data);
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
        obtenerFasesComparacion(res.data.experimento.fasesId);
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
        console.log(arregloNFase);
        if(arregloNFase.length>0){
            setBanderaFase(true);
        }
    }

    const obtenerFasesComparacion = async (fases) => {
        let arrefases = fases;
        let arreglosNFase = new Array;
        for (var i = 0; i < arrefases.length; i++) {
            let resFase = await axios.get(routesBD.fases + arrefases[i]);
            arreglosNFase.push(resFase.data.fase);
        }
        setFasesComparacion(arreglosNFase);
    }

    const rellenarCampos = (faseActual) => {
        checkboxFalseMediciones(false);
        let rellenar = fasesExp[faseActual];
        // console.log(rellenar);

        if (rellenar.hasOwnProperty('_id')) {
            let separador = " ";
            let fechaFaseR = rellenar['fechaFase'].split(separador);
            let tiempoInicioR = rellenar['tiempoInicio'].toString();
            let tiempoFinR = rellenar['tiempoFin'].toString();
            let fechaString = new Date(fechaFaseR[0] + ' ' + fechaFaseR[1] + ' ' + fechaFaseR[2] + ' ' + fechaFaseR[3]);
            setFechaFase(fechaString);
            let tiempoIniString = (horaInicio.toString()).split(separador);
            let tiempoFinString = (horaTermino.toString()).split(separador);
            let medicionesSeleccionadas = rellenar['idMediciones'];

            let tiempoI = '';
            let tiempoF = '';
            let fecha = tiempoIniString.slice(0, 4);
            if (tiempoInicioR.length < 4) {
                tiempoI = fecha + " " + "0" + tiempoInicioR[0] + ":" + tiempoInicioR[1] + tiempoInicioR[2] + ":00";
            } else {
                tiempoI = fecha + " " + tiempoInicioR[0] + tiempoInicioR[1] + ":" + tiempoInicioR[2] + tiempoInicioR[3] + ":00";
            }

            if (tiempoFinR.length < 4) {
                tiempoF = fecha + " " + "0" + tiempoFinR[0] + ":" + tiempoFinR[1] + tiempoFinR[2] + ":00";
            } else {
                tiempoF = fecha + " " + tiempoFinR[0] + tiempoFinR[1] + ":" + tiempoFinR[2] + tiempoFinR[3] + ":00";
            }
            setHoraInicio(new Date(tiempoI));
            setHoraTermino(new Date(tiempoF));
            // ========== Tomo el DATE lo convierto a STRING, le reemplazo caracteres y lo devuelvo a DATE
            // ============ Para guardarlo en Backend debo tomarlo en Date y pasarlo a String y parseINT 
            setDescripcionFase({
                ...descripcionFase,
                descripcion: rellenar['descripcion']
            });
            setDocumentosFase({
                ...documentosFase,
                links: rellenar['enlaceDocumentos']
            });
            setIdObservaciones(rellenar['idObservaciones']);
            setIdGrupos(rellenar['idGrupos']);

            for (let i = 0; i < medicionesSelected.length; i++) {
                for (let j = 0; j < medicionesSeleccionadas.length; j++) {
                    if (medicionesSeleccionadas[j] === medicionesSelected[i]['_id']) {
                        cargarCheckboxMediciones(medicionesSeleccionadas[j]);
                    }
                }
            }
        }
        if (rellenar.hasOwnProperty('_id') === false) {
            setFechaFase(new Date());
            setHoraInicio(new Date());
            setHoraTermino(new Date());
            // console.log(descripcion)
            setDescripcionFase({
                ...descripcionFase,
                descripcion: '',
            });
            setDocumentosFase({
                ...documentosFase,
                links: ''
            });
            checkboxFalseMediciones(false);
            setIdObservaciones(new Array());
            setIdGrupos(new Array());
        }
    }

    useEffect(() => {
        if(fasesExp.length>0){
            setBanderaFase(true)
        }else if(fasesExp.length===0){
            setBanderaFase(false);
        }
        if (evitarRecarga === false) {
            let faseSelected = FaseActivaGlobal + 1;
            if (FaseActivaGlobal != '') {
                if (fasesExp != '') {
                    rellenarCampos(FaseActivaGlobal);
                    setNumeroFasesSelected(faseSelected);
                }
            }

            if (FaseActivaGlobal === 0) {
                if (fasesExp != '') {
                    rellenarCampos(FaseActivaGlobal);
                    setNumeroFasesSelected(faseSelected);
                }
                if (fasesExp === '') {
                    setBanderaSinFases(false);
                    setNumeroFasesSelected(faseSelected);
                }
            }
        }
        if (FaseActivaGlobal === fasesExp.length - 1) {
            // console.log(fasesExp.length);
            setCambiarBoton(false);
        }
    }, [faseActiva, fasesExp]);

    const agregarNuevaFase = (fasesExperimento) => {
        setCambiarBoton(true);
        setBanderaSinFases(true);
        setBanderaTabla(true);
        setBanderaFase(true);
        // considerar a futuro que el estado viene a ser del Experimento no de la fase
        let arrfasesExp = fasesExperimento;
        let ideGrupos = new Array();
        let ideObservaciones = new Array();

        let nuevaFase = {
            // _id: arrfasesExp.length + 1,
            fechaFase: new Date(),
            tiempoInicio: new Date(),
            tiempoFin: new Date(),
            descripcion: '',
            enlaceDocumentos: '',
            idMediciones: '',
            idObservaciones: ideObservaciones,
            idGrupos: ideGrupos,
            numeroFase: arrfasesExp.length + 1,
        };

        arrfasesExp.push(nuevaFase);
        if (arrfasesExp != '') {
            setFasesExp([...fasesExp]);
        }
    }

    const mientrasCambiaDescripcion = (e) => {
        setDescripcionFase({
            ...descripcionFase,
            [e.target.name]: e.target.value
        })
    };

    const mientrasCambiaDocumentosFase = (e) => {
        setDocumentosFase({
            ...documentosFase,
            [e.target.name]: e.target.value
        })
    };

    const checkboxFalseMediciones = (limpiar) => {
        let mediciones = medicionesSelected;
        for (let i = 0; i < mediciones.length; i++) {
            mediciones[i]['boolean'] = limpiar
        }
        setMedicioneSelected(mediciones);
    }

    const checkboxMediciones = (medicion) => {
        let mediciones = medicionesSelected;
        for (let i = 0; i < mediciones.length; i++) {
            if (mediciones[i]['_id'] === medicion) {
                let estado = mediciones[i]['boolean']
                mediciones[i]['boolean'] = !estado;
            }
        }
        setMedicioneSelected(mediciones);
        setBanderaTabla(false);

        setTimeout(
            function () {
                setBanderaTabla(true);
            },
            10
        );
    }

    const cargarCheckboxMediciones = (idMedicion) => {
        let cargarMediciones = medicionesSelected;
        for (let i = 0; i < cargarMediciones.length; i++) {
            if (cargarMediciones[i]['_id'] === idMedicion) {
                cargarMediciones[i]['boolean'] = !(cargarMediciones[i]['boolean']);
            }
        }
        setMedicioneSelected(cargarMediciones);
    }

    const EliminarFase = (faseEliminar) => {
        let posEliminar = faseEliminar - 1;

        if (fasesExp[posEliminar].hasOwnProperty('_id')) {
            let arrEliminar = idFasesEliminadas;
            arrEliminar.push(fasesExp[posEliminar]['_id']);
            setIdFasesEliminadas(arrEliminar);
        }

        if (posEliminar != FaseActivaGlobal) {
            fasesExp.splice(posEliminar, 1);
            if (fasesExp[posEliminar]) {
                for (let i = posEliminar; i < fasesExp.length; i++) {
                    fasesExp[i]['numeroFase'] = fasesExp[i]['numeroFase'] - 1;
                }
            }
            if (FaseActivaGlobal > posEliminar) {
                setFaseActiva(FaseActivaGlobal - 1);
                FaseActivaGlobal=FaseActivaGlobal - 1;
            }
            setEvitarRecarga(true);
            setFasesExp([...fasesExp]);
        } else {
            if (fasesExp.length > 1) {
                setEvitarRecarga(false);
                if (fasesExp.length > FaseActivaGlobal + 1) {
                    fasesExp.splice(posEliminar, 1);
                    if (fasesExp[posEliminar]) {
                        for (let i = posEliminar; i < fasesExp.length; i++) {
                            fasesExp[i]['numeroFase'] = fasesExp[i]['numeroFase'] - 1;
                        }
                    }
                    setFasesExp([...fasesExp]);
                } else {
                    fasesExp.splice(posEliminar, 1);
                    setFasesExp([...fasesExp]);
                    setFaseActiva(FaseActivaGlobal - 1)
                    FaseActivaGlobal = FaseActivaGlobal - 1;
                }

            } else {
                fasesExp.splice(posEliminar, 1);
                setDescripcionFase({
                    ...descripcionFase,
                    descripcion: '',
                });
                setFasesExp([...fasesExp]);
                setBanderaSinFases(false);
                setBanderaTabla(false);
            }
        }
    }

    const cambiarFaseActiva = (fase) => {
        if (fase < fasesExp.length) {
            if (fase === fasesExp.length - 1) {
                rellenarCampos(fase);
                setFaseActiva(fase);
                FaseActivaGlobal = fase;
                setCambiarBoton(false);
            } else {
                rellenarCampos(fase);
                setFaseActiva(fase);
                FaseActivaGlobal = fase;
                setCambiarBoton(true);
            }
        } else {
            //usar replace para evitar retrocesos de pagina
            // window.location.replace("http://www.w3schools.com");
            //tiene que traer la id del experimento para reemplazar la ruta
            // setOpenModalGuardarExperimento();
            // let arregloEliminado = idFasesEliminadas;
            // if (arregloEliminado.length > 0) {
            //     eliminarFaseBD(arregloEliminado);
            //     console.log('Debo esperar unos segundos antes de redirigir');

            // } else {
                window.location.href = rutasFront.PreparacionConfig + idUrl['id'];

            // }
        }
    }

    const eliminarFaseBD = async (arregloEliminado, boton) => {
        if (arregloEliminado.length > 0) {
            let idGrupos = new Array();
            let idParticipantes = new Array();
            let arrIdFases = new Array();
            let fasesComp = fasesComparacion;
            let fasesExper = fasesExp;
            console.log('arregloEliminado');
            console.log(arregloEliminado);
            for (let i = 0; i < arregloEliminado.length; i++) {
                for (let j = 0; j < fasesComp.length; j++) {
                    if (arregloEliminado[i] === fasesComp[j]['_id']) {
                        idGrupos = fasesComp[j]['idGrupos'];
                        for (let k = 0; k < idGrupos.length; k++) {
                            const resGruposGet = await axios.get(routesBD.grupos + idGrupos[k]);
                            idParticipantes = resGruposGet.data.grupo.participantes;
                            for (let l = 0; l < idParticipantes.length; l++) {
                                const resPartDel = await axios.delete(routesBD.participantes + idParticipantes[l]);
                            }
                            const resGrupoDel = await axios.delete(routesBD.grupos + idGrupos[k]);
                        }
                        fasesComp.splice(j, 1);

                    }
                }
                const resFasesDel = await axios.delete(routesBD.fases + arregloEliminado[i]);
            }
            setFasesComparacion(fasesComp);
            for (let i = 0; i < fasesComp.length; i++) {
                for (let j = 0; j < fasesExper.length; j++) {
                    if (fasesExper[j].hasOwnProperty('_id')) {
                        if (fasesComp[i]['_id'] === fasesExper[j]['_id']) {
                            if (fasesComp[i]['numeroFase'] === fasesExper[j]['numeroFase']) {
                                // console.log('Ok sin Cambios');
                            } else {
                                let numFase = {
                                    numeroFase: fasesExper[j]['numeroFase'],
                                }
                                const resNumFases = await axios.put(routesBD.fases +'actualizarNumeroFase/' + fasesComp[i]['_id'], numFase);
                                console.log('numeroFase actualizado');
                            }

                        }
                    }
                }
                arrIdFases.push(fasesComp[i]['_id']);
            }
            let arregloIDFases = {
                fasesId: arrIdFases
            }
            console.log('arregloIDFases');
            console.log(arregloIDFases);
            const resFasesExp = await axios.put(routesBD.experimentos+'agregarFases/' + idExperimento, arregloIDFases);
            guardarDatosFase(boton);
            setTimeout(
                function () {
                    closeModalGuardarExperimento('save');
                },
                3000
            );


        } else {
            guardarDatosFase(boton);
            setTimeout(
                function () {
                    closeModalGuardarExperimento('save');
                },
                3000
            );
        }
    }
    const handleOpenModalGuardarExperimento = () => {
        setOpenModalGuardarExp(true);
    }

    const closeModalGuardarExperimento = async (saveStatus) => {
        let largoFase = fasesExp.length;
        console.log('FaseActivaGlobal', FaseActivaGlobal);
        console.log('largoFase', largoFase);
        if(saveStatus==='no' && FaseActivaGlobal === (largoFase - 1)){
            setOpenModalGuardarExp(false);
        }
        if(saveStatus==='save' && FaseActivaGlobal === (largoFase - 1)){
            setOpenModalGuardarExp(false);
            let Etapa = {
                nombreExp: nombreExp,
                estado: 'Preparacion'
            }
            const resEtapa = await axios.put(routesBD.experimentos + idExperimento, Etapa);
            setTimeout(
                function () {
                    window.location.href = rutasFront.PreparacionConfig + idExperimento;
                },
                3000
            );
        }
        setOpenModalGuardarExp(false);
    }

    const handleOpenModalGuardarDatos = (estado) => {
        let dirFaseActiva = direccionFaseActiva;
        setOpenModalGuardarDatos(true);
        dirFaseActiva = estado;
        setDireccionFaseActiva(dirFaseActiva);
    }

    const closeModalGuardarDatos = (estado) => {
        cambiarFaseActiva(estado)
        setOpenModalGuardarDatos(false);
    }

    const guardarDatosFase = async (estado) => {
        // cambiar el estado del experimento
        // ========================== debo actualizar fasesComparacion a la hora de realizar un POST, por si se borra algo despues considerar que existe en bd ==============================
        // ============== Si creo un POST debo actualizar el arreglo de fases del experimento =================

        let separador = " ";
        let separador2 = ":";

        let fasesExpe = fasesExp;
        let fasesCompG = fasesComparacion;

        let arrIdMediciones = new Array();
        let arrIdGrupos = new Array();
        let arrIdObservaciones = new Array();
        let arrIdFases = new Array();
        let idFase = '';
        if (fasesExp[FaseActivaGlobal].hasOwnProperty('_id')) {
            idFase = fasesExp[FaseActivaGlobal]['_id'];
            arrIdObservaciones = idObservaciones;
            arrIdGrupos = idGrupos;
        }
        let numeroFaseG = fasesExp[FaseActivaGlobal]['numeroFase']
        let fechaFaseG = (fechaFase).toString();
        let horaIniG = ((horaInicio).toString()).split(separador);
        let horaTermG = ((horaTermino).toString()).split(separador);
        let DocsG = documentosFase['links'];
        let DescripcionG = descripcionFase['descripcion'];
        let medicionesG = medicionesSelected;
        // let grupoEliminado = false;
        // let nuevaData = false;
        let horasIni = (horaIniG[4]).split(separador2);
        let horasTerm = (horaTermG[4]).split(separador2);

        horaIniG = parseInt(horasIni[0] + horasIni[1]);
        horaTermG = parseInt(horasTerm[0] + horasTerm[1]);

        for (let i = 0; i < medicionesG.length; i++) {
            if (medicionesG[i]['boolean'] === true) {
                arrIdMediciones.push(medicionesG[i]['_id']);
            }
        }
        //PUT
        if (idFase != '') {
            let Fase = {
                descripcion: DescripcionG,
                enlaceDocumentos: DocsG,
                fechaFase: fechaFaseG,
                idGrupos: arrIdGrupos,
                idMediciones: arrIdMediciones,
                idObservaciones: arrIdObservaciones,
                numeroFase: numeroFaseG,
                tiempoFin: horaTermG,
                tiempoInicio: horaIniG
            }
            console.log('Fase PUT...')

            const resFases = await axios.put(routesBD.fases + idFase, Fase);
            let FaseExperimento = {
                _id: idFase,
                descripcion: DescripcionG,
                enlaceDocumentos: DocsG,
                fechaFase: fechaFaseG,
                idGrupos: arrIdGrupos,
                idMediciones: arrIdMediciones,
                idObservaciones: arrIdObservaciones,
                numeroFase: numeroFaseG,
                tiempoFin: horaTermG,
                tiempoInicio: horaIniG
            }
            fasesExpe[FaseActivaGlobal] = FaseExperimento;
            setFasesExp(fasesExpe);

        }
        //POST
        if (idFase === '') {
            let Fase = {
                descripcion: DescripcionG,
                enlaceDocumentos: DocsG,
                estadoFase: "",
                fechaFase: fechaFaseG,
                idGrupos: arrIdGrupos,
                idMediciones: arrIdMediciones,
                idObservaciones: arrIdObservaciones,
                numeroFase: numeroFaseG,
                tiempoFin: horaTermG,
                tiempoInicio: horaIniG
            }
            const resFases = await axios.post(routesBD.fases, Fase);
            Fase._id = resFases.data.mensaje;
            let FaseExperimento = {
                _id: Fase['_id'],
                descripcion: DescripcionG,
                enlaceDocumentos: DocsG,
                estadoFase: "",
                fechaFase: fechaFaseG,
                idGrupos: arrIdGrupos,
                idMediciones: arrIdMediciones,
                idObservaciones: arrIdObservaciones,
                numeroFase: numeroFaseG,
                tiempoFin: horaTermG,
                tiempoInicio: horaIniG
            }
            fasesExpe[FaseActivaGlobal] = FaseExperimento;
            setFasesExp(fasesExpe);
            fasesCompG.push(Fase);
            setFasesComparacion(fasesCompG);

            for (let i = 0; i < fasesCompG.length; i++) {
                arrIdFases.push(fasesCompG[i]['_id']);
            }
            let arregloIDFases = {
                fasesId: arrIdFases
            }
            console.log('Fase POST...')
            const resFasesExp = await axios.put(routesBD.experimentos+'agregarFases/' + idExperimento, arregloIDFases);

        }
        if (estado === 'Continuar') {
            setTimeout(
                function () {
                    window.location.href = rutasFront.PreparacionConfig + idExperimento;
                },
                4000
            );
        } else if (estado === 'Salir') {
            setTimeout(
                function () {
                    window.location.href = rutasFront.inicio;
                },
                4000
            );
        } else {
            closeModalGuardarDatos(estado);
        }
    }

    const botonCancelar = () => {
        // ========= este deberia eliminar todo lo creado hasta ahora
        setTimeout(
            function () {
                window.location.href = rutasFront.inicio;
            },
            2000
        );
    }

    return (
        <div>
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Planificacion Experimento</h3>
                <div className="card">
                    <div className="card-header">
                        <h4>{nombreExp}</h4>
                    </div>
                    <div>
                        <Grid container spacing={12}>
                            <Grid item xs={3}>

                                <div>
                                    <br />
                                    <div style={{ textAlign: 'center' }}>
                                        <h4>Gestionar Fases</h4>
                                    </div>
                                    {/* <br /> */}
                                    <div style={{ textAlign: 'center' }}>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            style={{
                                                margin: 3,
                                                textAlign: 'center',
                                                margin: 0,
                                                position: 'center',
                                                top: '21%',
                                                left: '18%',
                                            }}
                                            onClick={() => agregarNuevaFase(fasesExp)}
                                        >
                                            Agregar nueva Fase
                                        </Button>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={9}>
                                <Stepper activeStep={FaseActivaGlobal} alternativeLabel>
                                    {
                                        fasesExp.map(fase => (
                                            <Step key={fase._id}>
                                                {/* esta funcion debe ser igual que la anterior y debe de llamar un modal igualmente */}
                                                <StepButton onClick={() => handleOpenModalGuardarDatos(fase.numeroFase - 1)}>
                                                    Fase {fase.numeroFase}
                                                </StepButton>
                                                <br />
                                                <br />
                                                <div style={{ float: "center", margin: 3, textAlign: 'center' }} className={classes.fawesome}>
                                                    <CancelIcon style={{ color: 'red' }} onClick={() => EliminarFase(fase.numeroFase)} />
                                                </div>
                                            </Step>
                                        ))
                                    }
                                </Stepper>
                            </Grid>
                        </Grid>
                    </div>
                    {
                        banderaFase ?
                            <div className="container-fluid">
                                <div>
                                    <div className="card-body">
                                        <div className="card-header">
                                            <Grid container spacing={12}>
                                                <Grid item xs={12}>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={12}>
                                                            <Grid item xs={3}>
                                                                <h4 >{'Fase Activa: ' + numeroFasesSelected}</h4>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12}>

                                                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <Grid container justifyContent="space-around">

                                                            </Grid>
                                                        </MuiPickersUtilsProvider> */}
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            {
                                                                banderaSinFases ?
                                                                    <TableContainer component={Paper} style={{ maxHeight: 400, minHeight: 300 }}>
                                                                        <Grid container spacing={12}>
                                                                            <Grid item xs={4}>
                                                                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                                                                                    <Grid container spacing={3}>
                                                                                        <Grid item xs={12}>
                                                                                            <h4 >Fecha Fase</h4>
                                                                                            <Grid container justifyContent="space-around">
                                                                                                <DatePicker
                                                                                                    margin="normal"
                                                                                                    id="date-picker-dialog"
                                                                                                    format="MM/dd/yyyy"
                                                                                                    value={fechaFase}
                                                                                                    onChange={handleFechaFase}
                                                                                                    KeyboardButtonProps={{
                                                                                                        'aria-label': 'change date',
                                                                                                    }}
                                                                                                />
                                                                                            </Grid>
                                                                                        </Grid>
                                                                                        <br />
                                                                                        <Grid item xs={5}>
                                                                                            <h4 >Hora Inicio</h4>
                                                                                            <TimePicker
                                                                                                margin="normal"
                                                                                                id="time-picker"
                                                                                                value={horaInicio}
                                                                                                onChange={handleHoraInicio}
                                                                                                KeyboardButtonProps={{
                                                                                                    'aria-label': 'change time',
                                                                                                }}
                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={6}>
                                                                                            <h4 >Hora Termino</h4>
                                                                                            <TimePicker
                                                                                                margin="normal"
                                                                                                id="time-picker"
                                                                                                value={horaTermino}
                                                                                                onChange={handleHoraTermino}
                                                                                                KeyboardButtonProps={{
                                                                                                    'aria-label': 'change time',
                                                                                                }}
                                                                                            />
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </MuiPickersUtilsProvider>
                                                                            </Grid>
                                                                            <Grid item xs={4}>
                                                                                <h4>Descripcion</h4>
                                                                                <TextareaAutosize
                                                                                    style={{ width: '35ch', height: '15ch' }}
                                                                                    aria-label="maximum height"
                                                                                    placeholder="Descripcion de la Fase"
                                                                                    value={descripcionFase['descripcion']}
                                                                                    onChange={mientrasCambiaDescripcion}
                                                                                    name="descripcion"
                                                                                />
                                                                            </Grid>
                                                                            <Grid item xs={4}>
                                                                                <h4>Documentos de la Fase</h4>
                                                                                <TextField id="filled-basic"
                                                                                    style={{ width: '35ch' }}
                                                                                    label="Links"
                                                                                    variant="filled"
                                                                                    value={documentosFase['links']}
                                                                                    name="links"
                                                                                    onChange={mientrasCambiaDocumentosFase}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </TableContainer>
                                                                    : <TableRow>
                                                                        <TableCell align="center" colSpan={5}>
                                                                            <Box sx={{ width: "auto", padding: 10 }}>
                                                                                <CircularProgress color="inherit" />
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                    <br />
                                                </Grid>
                                                <Grid item xs={12} style={{ float: 'none', margin: 'auto', }}>
                                                    <h4>Mediciones a Registrar</h4>
                                                    <div className={classes.tabsStyles}>
                                                        <TabPanel value={tab} index={0}>
                                                            <Grid container spacing={12}>
                                                                <Grid item xs={12}>
                                                                    <Grid item xs={12}>
                                                                        <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                                            <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                                                <TableHead>
                                                                                    <TableRow>
                                                                                        <TableCell>Medir</TableCell>
                                                                                        <TableCell>Nombre</TableCell>
                                                                                        <TableCell>Descripcion</TableCell>
                                                                                        <TableCell>Tipo de Medicion</TableCell>
                                                                                        <TableCell>Dispositivo</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                {
                                                                                    banderaTabla ?
                                                                                        <TableBody>
                                                                                            {medicionesSelected.map((row) => {
                                                                                                return (
                                                                                                    <TableRow key={row._id}>
                                                                                                        <TableCell padding="checkbox">
                                                                                                            <Checkbox
                                                                                                                checked={row.boolean}
                                                                                                                onChange={() => checkboxMediciones(row._id)}
                                                                                                                value={row.boolean}
                                                                                                                style={{ color: 'blue' }}
                                                                                                            />
                                                                                                        </TableCell>
                                                                                                        <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                                                        <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                                                                                        <TableCell component="th" scope="row">{row.idTipoMedicion}</TableCell>
                                                                                                        <TableCell component="th" scope="row">Tipo Dispositivo</TableCell>
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
                                                        </TabPanel>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div></div>
                    }
                    {
                        banderaFase ?
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
                                                            {/*  ========================================= PARA DONDE VOY, ADELANTE O UNO ESPECIFICO ================================ */}
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
                                        onClick={() => eliminarFaseBD(idFasesEliminadas, 'Salir')}

                                    >
                                        Guardar y Salir
                                    </Button>
                                    {
                                        cambiarBoton ?
                                            <Button
                                                variant="contained"
                                                color="default"
                                                onClick={() => handleOpenModalGuardarDatos(FaseActivaGlobal + 1)}
                                                size="small"
                                                style={{ margin: 3 }}
                                            >
                                                Continuar Fase
                                            </Button>
                                            :
                                            <Button
                                                variant="contained"
                                                color="green"
                                                onClick={() => handleOpenModalGuardarExperimento()}
                                                size="small"
                                                style={{ margin: 3 }}
                                            >
                                                Continuar Preparación
                                            </Button>
                                    }
                                    <Modal
                                        backdropColor="transparent"
                                        open={openModalGuardarExp}
                                        // onClose={() => closeModalGuardarExperimento()}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={openModalGuardarExp} >
                                            <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                                <Grid item xs={4} >
                                                    <div className="card" >
                                                        <div className="card-header">
                                                            <h4>Cambiar Etapa</h4>
                                                        </div>
                                                        <div className="card-body">
                                                            <h5>Para Avanzar a la siguiente etapa, se guardaran las configuraciones actuales, ¿Desea Avanzar a Preparación?</h5>
                                                        </div>
                                                        <div className="card-footer">
                                                            <div style={{ float: "right" }}>
                                                                <Button variant="contained" onClick={() => closeModalGuardarExperimento('no')} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
                                                                    No
                                                                </Button>
                                                                <Button variant="contained" type="submit" onClick={() => eliminarFaseBD(idFasesEliminadas, 'Continuar')} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
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
                            </div>
                            :
                            <Grid item xs={12}>
                            <br />

                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={() => window.location.href = rutasFront.inicio}
                                // size="small"
                                style={{ margin: 3 }}
                            >
                                Salir
                            </Button>
                            </Grid>
                    }
                </div>
            </div>

        </div >
    );

}