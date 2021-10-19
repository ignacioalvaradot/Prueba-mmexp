import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AuthProvider from './components/auth/AuthProvider';
// import NoteList from './components/NotesList';
// import CreatNote from './components/CreateNote';
// import CreateUser from './components/CreateUser';
// import EjecucionExp from './components/EjecucionExp';
import AppRouter from './routers/AppRouter';

function App() {

  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>

  );
}

export default App;
