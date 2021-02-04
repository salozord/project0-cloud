import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthHook'

export default function AuthButton() {
    const history = useHistory();
    const auth = useAuth();

    const logout = async () => {
        await auth.logout();
        history.replace("/login");
    };

    return (auth.user) ? (
        <ul>
            <li>
                <Link to="/eventos/crear">
                    <i className="bi bi-plus-circle"></i>&nbsp;Crear
                </Link>
            </li> 
            <li>
                <Link onClick={() => logout()}>
                    <i className="bi bi-box-arrow-right"></i>&nbsp;Salir
                </Link>
            </li> 
        </ul>
    ) : (
        <ul>
            <li>
                <Link to="/login">
                    <i className="bi bi-box-arrow-in-right"></i>&nbsp;Login
                </Link>
            </li>
            <li>
                <Link to="/registro">
                    <i className="bi bi-pencil-square"></i>&nbsp;Registro
                </Link>
            </li>
        </ul>
    );
}
