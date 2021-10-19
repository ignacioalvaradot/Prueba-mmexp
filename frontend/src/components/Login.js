// import React, { useState, useEffect } from 'react';
// import { loadCSS } from 'fg-loadcss';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import { Grid, Fab, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, Checkbox, IconButton, TextareaAutosize, CircularProgress } from '@material-ui/core/';
// import { Tab, Tabs, AppBar, Box, Typography } from '@material-ui/core/';
// import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import { useLocation, useParams } from "react-router-dom";
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';

// import { es } from "date-fns/locale";


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     },
//     tabsStyles: {
//         flexGrow: 1,
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
//     fawesome: {
//         '& > .fa': {
//             margin: theme.spacing(2),
//         },
//     },
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paper: {
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));


// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

// export default function Login() {
//     const location = useLocation();
//     const idUrl = useParams();
//     const classes = useStyles();

//     const [open, setOpen] = React.useState(false);
//     const [urlconsulta, setUrlConsulta] = useState('');
//     const [fases, setFases] = React.useState([]);
//     const [redireccion, setRedireccion] = useState("http://localhost/InicioExperimentos/");
//     const [openModalNuevoExperimento, setOpenModalNuevoExperimento] = useState(false);
//     const [nombreNuevoExperimento, setNombreNuevoExperimento] = useState({
//         nombreExp: '',
//     })


//     useEffect(() => {

//         const node = loadCSS(
//             'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
//             document.querySelector('#font-awesome-css'),
//         );

//         // const url = () => {
//         //     const urlconsulta = location.pathname.split('/ejecucion/');

//         //     setUrlConsulta(urlconsulta);
//         // };

//         // url();
//         return () => {
//             node.parentNode.removeChild(node);
//         };
//     }, []);

//     const crearNuevoExperimento = async () => {
//         console.log('dataNueva');
//         // console.log(nombreNuevoExperimento);
//         let fases = new Array();
//         let nombreNuevoExp = nombreNuevoExperimento.nombreExp;
//         let dataNueva = {
//             estado: 'Planificacion',
//             nombreExp: nombreNuevoExp,
//             fasesId: fases,
//         }
//         const res = await axios.post('http://localhost:81/api/experimentos', dataNueva);
//         let idNuevoExp = res.data.mensaje
//         console.log(idNuevoExp)

//         handleCloseModalNuevoExp();
//         setTimeout(
//             function () {
//                 window.location.href = "http://localhost/planificacion/" + idNuevoExp;
//             },
//             2000
//         );

//     }

//     const reedireccionExperimentos = (direccion) => {
//         window.location.href = redireccion + direccion;
//     }
//     const handleOpenModalNuevoExperimento = () => {
//         setOpenModalNuevoExperimento(true);
//     };

//     const handleCloseModalNuevoExp = () => {
//         setOpenModalNuevoExperimento(false);
//     };

//     const mientrasCambiaNombreExp = (e) => {
//         setNombreNuevoExperimento({
//             ...nombreNuevoExperimento,
//             [e.target.name]: e.target.value
//         })
//     };

//     return (
//         <div>
//             <div className="card-title" >
//                 <h3 style={{ color: 'white' }}>Login</h3>
//                 <div className="card">

//                     <div className="container-fluid">
//                         <div className="card-body">
//                             <Grid container spacing={2}>
//                                 <Grid item xs={4}>
//                                     <h4>IniciarSesion</h4>
//                                     <Grid item xs={10}>

//                                         <div className="card">

//                                             <div className="container-fluid">
//                                                 <div style={{ textAlign: 'center' }} className="card-body">
//                                                     <Grid item xs={12}>
//                                                         <Button
//                                                             fullWidth
//                                                             size="large"
//                                                             variant="contained"
//                                                             color="primary"
//                                                             style={{ margin: 3, textAlign: 'center' }}
//                                                             onClick={() => { handleOpenModalNuevoExperimento() }}

//                                                         >
//                                                             <Icon fontSize='large' className="fa fa-plus-square" />

//                                                         </Button>
//                                                     </Grid>
//                                                     <Modal
//                                                         backdropColor="transparent"
//                                                         open={openModalNuevoExperimento}
//                                                         onClose={handleCloseModalNuevoExp}
//                                                         closeAfterTransition
//                                                         BackdropComponent={Backdrop}
//                                                         BackdropProps={{
//                                                             timeout: 500,
//                                                         }}
//                                                     >
//                                                         <Fade in={openModalNuevoExperimento} >
//                                                             <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                                                                 <Grid item xs={4} >
//                                                                     <div className="card" >
//                                                                         <div className="card-header">
//                                                                             <h4>Nuevo Experimento</h4>
//                                                                         </div>
//                                                                         <div className="card-body">
//                                                                             <form onSubmit={crearNuevoExperimento}>
//                                                                                 <TextField
//                                                                                     multiline
//                                                                                     autoFocus
//                                                                                     margin="dense"
//                                                                                     id="standard-multiline-static"
//                                                                                     label="Ingrese un nombre para el nuevo Experimento"
//                                                                                     fullWidth
//                                                                                     onChange={mientrasCambiaNombreExp}
//                                                                                     name="nombreExp"
//                                                                                 />
//                                                                             </form>
//                                                                         </div>
//                                                                         <div className="card-footer">
//                                                                             <div style={{ float: "right" }}>
//                                                                                 <Button variant="contained" onClick={handleCloseModalNuevoExp} size="small" color="secondary" style={{ margin: 3, textAlign: 'center' }}>
//                                                                                     Cancelar
//                                                                                 </Button>
//                                                                                 <Button variant="contained" type="submit" onClick={crearNuevoExperimento} size="small" color="primary" style={{ margin: 3, textAlign: 'center' }}>
//                                                                                     Crear Experimento
//                                                                                 </Button>
//                                                                             </div>
//                                                                         </div>
//                                                                     </div>
//                                                                 </Grid>
//                                                             </div>
//                                                         </Fade>
//                                                     </Modal>
//                                                     <h4>Crear Experimento</h4>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

// }
import React, { useState, useEffect } from "react";
import { loadCSS } from 'fg-loadcss';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Icon } from '@material-ui/core/';

// import history from "../../../history";
// import Logo from "../../../logo.png";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import useAuth from "./auth/useAuth";

export default function Inscripcion() {

    function isEmpty(data) {
        if (data == "" || data == " ") {
            return true;
        } else {
            return false;
        }
    }

    const Ingreso = () => {
        // history.push("Grupo2/Ingreso");
    };

    const useStyles = makeStyles((theme) => ({
        paper: {
            //marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: 60,
            paddingRight: 60,
            backgroundColor: "#ffffff",
        },
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();
    const [nombreUsuario, setNombreUsuario] = React.useState("");
    const [contraseña, setContraseña] = React.useState("");
    const [bandera, setBandera] = React.useState(true);

    const [errorNombre, setErrorNombre] = React.useState(false);
    const [errorContraseña, setErrorContraseña] = React.useState(false);

    const [banderaErrorEntrada, setBanderaErrorEntrada] = useState(false);
    const [banderaSuccesEntrada, setBanderaSuccesEntrada] = useState(false);

    const { login } = useAuth();
    const userCredentials = {}

    useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const confirmacionDatos = async () => {
        if (!isEmpty(nombreUsuario) && !isEmpty(contraseña)) {
            let data = {
                nombreUsuario: nombreUsuario,
                contraseña: contraseña,
            };

            const res = await axios.post('http://localhost:81/api/users/login', data);
            // console.log(res.data[0]);

            if (res.data.length > 0) {
                let credenciales = {
                    nombreUsuario: res.data[0].nombreUsuario,
                    contraseña: res.data[0].contraseña,
                    role: res.data[0].tipoUsuario
                };
                // userCredentials = credenciales;
                login(credenciales);
                setBandera(true);
                setErrorNombre(true);
                setErrorContraseña(true);
            } else {
                setErrorNombre(true);
                setErrorContraseña(true);
                setBandera(false);
            }
        } else {
            setErrorNombre(isEmpty(nombreUsuario));
            setErrorContraseña(isEmpty(contraseña));
            setBandera(false);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                {/* <img src={Logo} height="100" alt="" /> */}
                <Typography variant="h3">Login Usuario </Typography>
                <Icon fontSize='large' className="fa fa-user" />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            error={errorNombre}
                            required
                            id="nombreUsuario"
                            name="nombreUsuario"
                            label="Nombre Usuario"
                            fullWidth
                            autoComplete="formulario nombre"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errorContraseña}
                            required
                            id="contraseña"
                            name="contraseña"
                            label="Contraseña"
                            fullWidth
                            autoComplete="formulario contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    onClick={confirmacionDatos}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Ingresar
                </Button>
                {bandera ? (
                    <h5></h5>
                ) : (
                    <h5>Error Usuario o Contraseña Erroneo</h5>
                )}
            </div>
        </Container >
    );
}
