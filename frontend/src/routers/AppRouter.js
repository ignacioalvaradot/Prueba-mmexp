import '../App.css';
import { Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@material-ui/core';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Inicio from '../components/InicioExperimentos';
import Login from '../components/Login';
import Usuarios from '../components/Usuarios';
import Experimentos from '../components/Experimentos';
import PlanificacionExp from '../components/PlanificacionExp';
import PreparacionConfig from '../components/PreparacionConfiguracion';
import PreparacionVerific from '../components/PreparacionVerificacion';
import Ejecucion from '../components/EjecucionExp';
import AnalisisExp from '../components/AnalisisExp';
import Layout from '../components/layouts/Layout';
import roles from '../helpers/roles';
import NotFoundPage from '../components/NotFoundPage';

export default function AppRouter() {
    return (
            <Layout>
                <Switch>
                    <PublicRoute exact path="/login" component={Login} />
                    <PrivateRoute exact path="/inicio" component={Inicio} />
                    <PrivateRoute hasRole={roles.admin} exact path="/gestionarUsuarios" component={Usuarios} />
                    <PrivateRoute exact path="/experimentos/:tipoExperimentos" component={Experimentos} />
                    <PrivateRoute exact path="/planificacion/:id" component={PlanificacionExp} />
                    <PrivateRoute exact path="/preparacionConfig/:id" component={PreparacionConfig} />
                    <PrivateRoute exact path="/preparacionVerific/:id" component={PreparacionVerific} />
                    <PrivateRoute exact path="/ejecucion/:id" component={Ejecucion} />
                    <PrivateRoute exact path="/analisis/:id" component={AnalisisExp} />
                    <PrivateRoute path="*" component={NotFoundPage} />
                </Switch>
            </Layout>
    )
}
