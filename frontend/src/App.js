import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from './components/auth/AuthProvider';
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
