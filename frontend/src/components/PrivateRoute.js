import { Redirect, Route } from 'react-router-dom';
import useAuth from './auth/useAuth';

export default function PrivateRoute({hasRole: role, ...rest}) {
    // const user = null;
    // const user = { id: 1, role: 'admin' }
    const { hasRole, isLogged } = useAuth();

    if(role && !hasRole(role)) return <Redirect to="/inicio" />

    if (!isLogged()) return <Redirect to="/login" />

    return (
        <Route {...rest} />
    )
}
