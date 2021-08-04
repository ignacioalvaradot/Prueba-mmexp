import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core/';
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//         },
//     }
// }));

export default function EditDialog() {

    const [datos, setDatos] = useState({
        obs: '',
        horas: '',
        minutos: ''
    })
    const [open, setOpen] = React.useState(false);
    // const [observacion, setObs] = useState({
    //     idExperimento: '',
    //     descripcion: '',
    //     tiempo: ''
    // });
    const [urlconsulta, setUrlConsulta] = useState('');
    const [hora, setHora] = React.useState('');
    const [minutos, setMinutos] = React.useState('');


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
        </div>
    )
}