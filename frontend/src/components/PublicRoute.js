import { Redirect, Route } from 'react-router-dom';
import useAuth from './auth/useAuth';

export default function PublicRoute(props) {
    // const user = null;
    // const user = { id: 1, role: 'admin' }
    const { isLogged } = useAuth();

    if (isLogged()) return <Redirect to="/inicio" />

    return (
        <Route {...props} />
    )
}
