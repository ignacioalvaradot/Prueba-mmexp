/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, IconButton, Collapse } from '@material-ui/core/';
import { Box, Typography } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams } from "react-router-dom";

import { Stepper, Step, StepButton } from '@material-ui/core/'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import io from 'socket.io-client';
import routesBD, { rutasFront } from '../helpers/routes';


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

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

var socket;
export default function PreparacionExp() {
    const location = useLocation();
    const idUrl = useParams();
    const [urlconsulta, setUrlConsulta] = useState('');
    const [faseActiva, setFaseActiva] = React.useState(0);
    const [nombreExp, setNombreExp] = React.useState('');
    const [idExp, setIdExp] = React.useState('');
    const [fasesExp, setFasesExp] = React.useState([]);
    const [arrFasesxGrupo, setArrFasesxGrupo] = React.useState([]);
    const [grupoComparacion, setGrupoComparacion] = React.useState([]);
    const [particiComparacion, setParticiComparacion] = React.useState([]);
    const [arregloFasesGrupos, setArregloFasesGrupos] = React.useState([]);
    const [banderaComparacion, setBanderaComparacion] = React.useState(0);

    const [banderaTabla, setBanderaTabla] = React.useState(true);
    const [medicionesSelected, setMedicionesSelected] = React.useState([]);
    const [medicionesFases, setMedicionesFases] = useState([]);
    const [cambiarBoton, setCambiarBoton] = useState(true);
    const [idExperimento, setIdExperimento] = React.useState('');
    const [tablaMedicionesRegistrar, setTablaMedicionesRegistrar] = useState([]);

    // const { row } = props;
    // const [open, setOpen] = React.useState(false);
    const classes2 = useRowStyles();

    const [estadoMediciones, setEstadoMediciones] = useState([]);


    const conectarSocket = () => {
        let tablaEstadoMediciones = estadoMediciones;
        let dispositivosParticipantes = new Array();
        let dispositivosGrupo = new Array();
        let medicionesRegistrarEstado = new Array();

        let tablaDispositivos = tablaMedicionesRegistrar;
        let medicionesFaseActual = medicionesFases;
        let medicion = '';
        let separador = ' ';
        let medicionFinal = '';

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

            window[socket + (i).toString()] = io.connect(routesBD.socket + medicionFinal);
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
                                    if (dispositivoRecibido['channel'][tablaEstadoMediciones[i]['grupos'][k]['participantes'][l]['canal']]['channelId'] || dispositivoRecibido['channel'][tablaEstadoMediciones[i]['grupos'][k]['participantes'][l]['canal']]['channelId'] === 0) {
                                        // banderaEncontrado = true;
                                        // contadorBandera = contadorBandera + 1;
                                        console.log('dispositivo Encontrado');
                                        banderaEncontrado = true;
                                    }
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

        setTablaMedicionesRegistrar([...arregloDispositivosXGrupos]);

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

        for (let i = 0; i < medicionesActuales.length; i++) {
            let gruposArr = new Array();
            for (let j = 0; j < gruposActuales.length; j++) {
                let participantesArr = new Array();
                for (let k = 0; k < participantes[j].length; k++) {

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

    const cambiarFaseActiva = async (fase) => {

        if (fase < fasesExp.length) {
            traerMedicionesRegistrar(fasesExp[fase]);
            setFaseActiva(fase);

        } else {
            //usar replace para evitar retrocesos de pagina
            // window.location.replace("http://");
            // Yo creo que mientras no pase a analisis, el experimento tiene que pasar por verificacion, debe tener estado verificaion y abrir esta vista, hasta que se finalize
            //    para corroborar que el sistema necesita verificar los dispositivos antes de ejecutarse, sea en la fase en que haya quedado su ejecucion
            let Etapa = {
                nombreExp: nombreExp,
                estado: 'Ejecucion'
            }
            const resEtapa = await axios.put(routesBD.experimentos + idExperimento, Etapa);
            setTimeout(
                function () {
                    window.location.href = rutasFront.EjecucionExp + idUrl['id'];
                },
                3000
            );
        }
    }

    const botonCancelar = () => {
        setTimeout(
            function () {
                window.location.href = rutasFront.inicio;
            },
            2000
        );
    }

    const colapsarTabla = (fila, indexFila, estadoApertura) => {
        let estadoMedicionesColapsar = estadoMediciones;
        estadoMedicionesColapsar[indexFila]['estadoOpen'] = estadoApertura;
        setEstadoMediciones([...estadoMedicionesColapsar]);
    }

    const colapsarGrupos = (filagrupo, indexGrupo, indexFila, estadoAperturaGrupo) => {
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
                                        onClick={() => (window.location.href = rutasFront.PreparacionConfig + idUrl['id'])}
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
                                onClick={() => botonCancelar()}
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