// import { children } from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import roles from "../../helpers/roles";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);
    // const [user, setUser] = useState({ id: 1, role: roles.regular});
    // const [user, setUser] = useState({ id: 1, role: roles.admin });

    const login = (userCredentials) => {
        // console.log(userCredentials);
        // setUser({ id: 1, role: roles.admin})
        setUser(userCredentials);

    };
    const logout = () => setUser(null)


    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;

    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout
    };

    return <AuthContext.Provider value={contextValue}>
            { children }
        </AuthContext.Provider>;


}