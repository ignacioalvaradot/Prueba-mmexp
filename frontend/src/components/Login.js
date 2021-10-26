/* eslint-disable */
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
import routesBD from "../helpers/routes";

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

            const res = await axios.post(routesBD.users + 'login', data);
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
