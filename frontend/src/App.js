import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@material-ui/core';

import Navigation from './components/Navigation';
// import NoteList from './components/NotesList';
// import CreatNote from './components/CreateNote';
// import CreateUser from './components/CreateUser';
// import EjecucionExp from './components/EjecucionExp';
import Inicio from './components/InicioExperimentos';
import Experimentos from './components/Experimentos';
import FormDialog from './components/FormDialog';
import PlanificacionExp from './components/PlanificacionExp';
import PreparacionExp from './components/PreparacionExp';
import PreparacionConfig from './components/PreparacionConfiguracion';
import PreparacionVerific from './components/PreparacionVerificacion';
import AnalisisExp from './components/AnalisisExp';
import TestSocket from './components/TestWebsocket';
import Usuarios from './components/Usuarios';





function App() {

  return (
    <Router>
      <Navigation />

      <div className="container p-4">
        {/* <Route path="/" exact component={NoteList} /> */}
        {/* <Route path="/edit/:id" component={CreatNote} /> */}
        {/* <Route path="/create" component={CreatNote} /> */}
        {/* <Route path="/user" component={CreateUser} /> */}
        {/* <Route path="/" component={Inicio} /> */}
        <Route path="/inicio" component={Inicio} />
        <Route path="/gestionarUsuarios" component={Usuarios} />
        <Route path="/experimentos/:tipoExperimentos" component={Experimentos} />
        <Route path="/planificacion/:id" component={PlanificacionExp} />
        <Route path="/preparacion/:id" component={PreparacionExp} />
        <Route path="/preparacionConfig/:id" component={PreparacionConfig} />
        <Route path="/preparacionVerific/:id" component={PreparacionVerific} />
        <Route path="/ejecucion/:id" component={FormDialog} />
        <Route path="/analisis/:id" component={AnalisisExp} />
        <Route path="/testSocket/" component={TestSocket} />



        
      </div>

    </Router>
  );
}

export default App;
