import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@material-ui/core';

import Navigation from './components/Navigation';
import NoteList from './components/NotesList';
import CreatNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import EjecucionExp from './components/EjecucionExp';


function App() {

  return (
    <Router>
      <Navigation />

      <div className="container p-4">
        <Route path="/" exact component={NoteList} />
        <Route path="/edit/:id" component={CreatNote} />
        <Route path="/create" component={CreatNote} />
        <Route path="/user" component={CreateUser} />
        <Route path="/ejecucion/:id" component={EjecucionExp} />
      </div>

    </Router>
  );
}

export default App;
