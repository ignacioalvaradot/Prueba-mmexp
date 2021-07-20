import axios from 'axios'
import React, { Component, useState } from 'react'
import { Icon, Stepper, Step, StepLabel, StepButton, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, LinearProgress } from '@material-ui/core/'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormDialog from './FormDialog'
import CancelIcon from '@material-ui/icons/Cancel';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditDialog from './Vista Ejecucion/EditDialog';
// import { DataGrid } from '@material-ui/core/data-grid';

function createData(tiempoMedicion, valor) {
    return { tiempoMedicion, valor };
}
// function boton(){
//     return <Icon className="far fa-comment-dots" />;
// }
const rows = [
    createData('05:30', '02:00'),
    createData('05:32', 'Coord'),
    createData('05:35', 'Coord'),
    createData('05:38', 'Coord'),
    createData('05:45', '03:00'),
    createData('05:46', 'Coord'),
    createData('05:49', 'Coord'),
    createData('05:49', 'Coord'),
    createData('05:49', 'Coord'),

];

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
            }`,
    },
];

// HOOKS ----->function TablaObs() {
//     const [datos, setDatos] = useState({
//         obs: '',
//         horas: '',
//         minutos: ''
//     })
//     const [open, setOpen] = React.useState(false);
//     const [observacion, setObs] = useState({
//         idExperimento: '',
//         descripcion: '',
//         tiempo: ''
//     });
// }

export default class EjecucionExp extends Component {

    state = {
        notes: [],
        faseActiva: 0,
        nombreExp: '',
        idExp: '',
        fasesExp: [],
        posicion: '',
        duration: 3000,
        progress: 0,
        puntosTimeLine: [],
        observaciones: [],
        setPage: 0,
        page: 0,
        rowsPerPage: 5,
        setRowsPerPage: 5,
        tiempoInicio: '',
        tiempoFin: '',
        duracion: 0,
        tiempoDuracionSec: 0,
        progreso: 0,
        progresoTiempo: 0,
        horas: 0,
        minutos: 0,
        segundos: 0,
        horasText: '',
        minutosText: '',
        segundosText: '',
        tiempoString: '',
    }

    barraProgreso = 0;
    tablaObservaciones = 0;

    async componentDidMount() {
        const res = await axios.get('http://localhost:81/api/experimentos/' + this.props.match.params.id);
        this.obtenerFases(res.data.experimento.fasesId);
        this.setState({
            nombreExp: res.data.experimento.nombreExp,
            idExp: res.data.experimento._id
        })

        const duracion = this.state.duration

        this.barraProgreso = setInterval(() => {
            this.setState({
                progress: this.state.progress + 1
            })
            this.normalizar();
        }, 1000)
        // setTimeout(
        //     () => (this.setState({ progress: 100 }),
        //         clearInterval(this.barraProgreso)),
        //     100000
        // );
        this.tablaObservaciones = setInterval(() => {
            this.getObservaciones();
        }, 5000)
        this.getObservaciones();
    }

    componentWillUnmount() {
        clearInterval(this.barraProgreso);
        clearInterval(this.tablaObservaciones)
    }

    onChangeBar = (event) => {
        console.log(event)
        // if(this.state.progress==100) {
        //     clearInterval(this.barraProgreso);
        //     this.setState({progress: 100});
        // }
    }

    onClickProgress(e) {
        console.log("On click", e.clientX);
        this.setState({ posicion: 50 });
        console.log(this.state.posicion);
        // const arregloPuntos = new Array;
    }

    handleChangePage() {
        // onPageChange(this.row, this.page + 1);
        this.setState({ page: this.page + 1 });
    };

    handleChangeRowsPerPage() {
        // this.setState({RowsPerPage: e});
        this.setState({ page: 0 });
    };

    handlePage(numberOfPage) {
        this.setState({
            page: numberOfPage
        })
    }

    async obtenerFases(fases) {
        const arrfases = fases;
        const arregloNFase = new Array;
        const arrTiempoFases = new Array;
        for (var i = 0; i < arrfases.length; i++) {
            const resF = await axios.get('http://localhost:81/api/fases/' + arrfases[i]);
            arregloNFase.push(resF.data.fase);
            // arrTiempoFases.push([resF.data.fase.tiempoInicio, resF.data.fase.tiempoFin])
            // console.log(resF.data.fase.tiempoInicio, resF.data.fase.tiempoFin);
        }
        this.setState({
            fasesExp: arregloNFase,
            // fasesActual: [tiempoInicio: arregloNFase[0].tiempoInicio, tiempoFin: arregloNFase[0].tiempoFin],
            tiempoInicio: arregloNFase[0].tiempoInicio,
            tiempoFin: arregloNFase[0].tiempoFin,
        });
        // this.state.fasesExp.map(fase => console.log({ fase: fase }));
        this.calcularTiempoFases(arregloNFase[0].tiempoInicio, arregloNFase[0].tiempoFin,);
        // console.log(this.state.fasesExp[0].tiempoInicio)
        // console.log(this.state.tiempoInicio, this.state.tiempoFin)
    }

    calcularTiempoFases(tInicio, tFin) {
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
        this.setState({
            tiempoInicio: primeroI + ':' + segundoI,
            tiempoFin: primeroF + ':' + segundoF,
            tiempoDuracionSec: tiempoT,
        });
        // this.normalizar();
        // console.log(tiempoT);
        // console.log(tInicio.length)
    };

    normalizar() {
        let valor = (this.state.progresoTiempo * 100) / this.state.tiempoDuracionSec;
        let progTiempo = this.state.progresoTiempo + 1;
        let segundos = this.state.segundos + 1;
        let minutos = this.state.minutos;
        let horas = this.state.horas;
        let segundosString = '';
            let minutosString = '';
            let horasString = '';
        if (progTiempo == this.state.tiempoDuracionSec) {
            clearInterval(this.barraProgreso);
            console.log('Fase Finalizada por tiempo');
        } else {
            if(segundos == 60){
                segundos = 0;
                minutos = minutos + 1;
                if(minutos == 60){
                    minutos = 0;
                    horas = horas + 1;
                    if(horas == 24){
                        horas = 0;
                        this.setState({
                            horas: horas,
                            minutos: minutos,
                            segundos: segundos,
                        });
                    }else{
                        this.setState({
                            horas: horas,
                            minutos: minutos,
                            segundos: segundos,
                        });
                    }
                }else{
                    this.setState({
                        minutos: minutos,
                        segundos: segundos,
                    });
                }
            }else{
                this.setState({
                    segundos: segundos,
                });
            }
            
            if((segundos.toString()).length < 2){
                segundosString = '0'+segundos.toString();
                // console.log(segundosString);
            }else{
                segundosString = segundos.toString();
                // console.log(segundosString);
            }
            if((minutos.toString()).length < 2){
                minutosString = '0'+minutos.toString();
                // console.log(minutosString);
            }else{
                minutosString = minutos.toString();
                // console.log(minutosString);
            }
            if((horas.toString()).length < 2){
                horasString = '0'+horas.toString();
                // console.log(horasString);
            }else{
                horasString = horas.toString();
                // console.log(horasString);
            }
            this.setState({
                progreso: valor,
                progresoTiempo: progTiempo,
                tiempoString: horasString+':'+minutosString+':'+segundosString,

            });
            //que hacer cuando se llegue a 0 para el contador
            // console.log('segundos transcurridos', progTiempo);
            // console.log(this.state.tiempoString);
            // console.log(valor);
            // console.log((segundos.toString()).length);
            // console.log(this.state.horas, ':', this.state.minutos, ':', this.state.segundos);
        }
    }

    async getNotes() {
        const res = await axios.get('http://localhost:81/api/notes');
        this.setState({ notes: res.data });
    }

    async getObservaciones() {
        //deberia pasarle el id del experimento para que traiga a todas las observaciones que lo contengan a futuro
        const res = await axios.get('http://localhost:81/api/observaciones');
        this.setState({ observaciones: res.data });
    }

    async onDeleteObs(id) {
        await axios.delete('http://localhost:81/api/observaciones/' + id);
        this.getObservaciones();
    }
    onEditObs(id){
        return (<EditDialog />)
    };

    handleClick() {
        console.log('Se hizo click');
    }

    render() {

        const { faseActiva } = this.state;
        return (
            // <div className="row">
            <div className="card-title" >
                <h3 style={{ color: 'white' }}>Ejecucion Experimento</h3>
                <div className="card">
                    <div className="card-header">
                        <h4>{this.state.nombreExp}</h4>
                    </div>
                    <div>
                        <Stepper activeStep={faseActiva} alternativeLabel>
                            {
                                this.state.fasesExp.map(fase => (
                                    <Step key={fase._id}>
                                        <StepButton onClick={() => this.setState({ faseActiva: fase.numeroFase - 1 })}>Fase {fase.numeroFase}</StepButton>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </div>
                    <div className="container-fluid">
                        <LinearProgress variant="determinate"
                            // onClick={this.onClickProgress.bind(this)}
                            // onClick={() => this.setState({ x: 50 })}
                            // duration={this.state.duration}
                            // value={this.state.progress}
                            value={this.state.progreso}
                        // onChange={this.onChangeBar}
                        />
                        <div>
                            <div align="left" style={{ float: 'left' }}>{this.state.tiempoInicio}</div>
                            <div align="right" style={{ float: 'right' }}>{this.state.tiempoFin}</div>
                            <div align="center" style={{ float: 'center' }}>{this.state.tiempoString}</div>
                        </div>
                        <br />
                        <FormDialog onClick={this.handleClick.bind(this)}></FormDialog>
                        {/* <h3>Current Count {this.state.progress}</h3> */}
                    </div>
                    <div className="card-body">
                        <div className="card-header">
                            {/* <h4>Mediciones Registradas</h4> */}
                            <Grid container spacing={12}>
                                {/* <Grid item xs={12}>
                                    {/* <Grid container spacing={6}> 
                                        {
                                            <Grid item xs={12}>
                                                <h5>Speech Count</h5>
                                                <TableContainer component={Paper} style={{ maxHeight: 300, minHeight: 200 }}>
                                                    <Table size="small" stickyHeader aria-label="sticky table" height="300" >
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Tiempo</TableCell>
                                                                <TableCell align="right">Valor</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rows.map((row) => (
                                                                <TableRow key={row.name}>
                                                                    <TableCell component="th" scope="row">{row.tiempoMedicion}</TableCell>
                                                                    <TableCell align="right">{row.valor}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Grid>
                                        }
                                    {/* </Grid> 
                                </Grid> */}
                                <Grid item xs={12}>
                                    {
                                        // <Grid item xs={2.5}>
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
                                                        {this.state.observaciones.map((row) => (
                                                            <TableRow key={row._id}>
                                                                <TableCell component="th" scope="row">{row.tiempo}</TableCell>
                                                                <TableCell align="center">{row.descripcion}</TableCell>
                                                                <TableCell align="right" ><VisibilityIcon onClick={() => this.onEditObs(row._id)}></VisibilityIcon><CancelIcon onClick={() => this.onDeleteObs(row._id)} /></TableCell>
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
                                onClick={() => this.setState({ faseActiva: faseActiva + 1 })}
                                size="small"
                                style={{ margin: 3 }}
                            >
                                Continuar Fase
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

