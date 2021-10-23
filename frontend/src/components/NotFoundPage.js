import { Container, Grid } from "@material-ui/core";
import logo from '../public/img/404notfound.png';

export default function NotFoundPage() {
    return (
        <Container component="main" maxWidth="sm">
            <div className="text-center"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingLeft: 60,
                    paddingRight: 60,
                    backgroundColor: "#ffffff",
                }}>
                <Grid container alignItems="center" justifyContent="center" spacing={1}>
                    <Grid item xs={12}>
                        <h3>Error 404!</h3>
                        <div style={{ textAlign: 'center' }} className="card">
                            <div style={{ textAlign: 'center' }} className="card-body">
                                <img style={{ width: '100%' }}
                                    src={logo}
                                    alt="Not Found Page"
                                />
                            </div>
                        </div>
                        <h5>¡Pagina no encontrada!</h5>
                    </Grid>
                </Grid>
            </div>
        </Container>

    )
}
