import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './AuthHook'

export default function RegistroPage() {
    const [correo, setCorreo] = useState('');
    const [validoCorreo, setValidoCorreo] = useState(false);
    const [clave, setClave] = useState('');
    const [claveVerif, setClaveVerif] = useState('');
    const [coinciden, setCoinciden] = useState(false);
    const [error, setError] = useState();
    
    const { registro } = useAuth();
    const history = useHistory();
    const location = useLocation();

    /**
     * Changes the email value validating if its valid to be received
     * @param {Event} event The input event
     */
    const changeEmail = (event) => {
        let email = event.target.value;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidoCorreo(re.test(String(email).toLowerCase()));
        setCorreo(email.toLowerCase());
    };

    /**
     * Changes the password
     * @param {Event} event The event on the password field
     */
    const changePassword = (event) => {
        (event.target.value && event.target.value === claveVerif)? setCoinciden(true) : setCoinciden(false);
        setClave(event.target.value);
    };

    /**
     * Changes the password verification
     * @param {Event} event The event on the password verification field
     */
    const changePasswordVerif = (event) => {
        (event.target.value && clave === event.target.value)? setCoinciden(true) : setCoinciden(false);
        setClaveVerif(event.target.value);
    };

    /**
     * Submits the form
     * @param {Event} event the submission event
     */
    const submitRegistro = (event) => {
        event.preventDefault();

        if(validoCorreo && correo && clave && coinciden) {
            let { from } = location.state || { from: { pathname: "/" } };
            registro({ correo, clave }).then(async (r) => {
                if(r.ok === false) {
                    throw ((r.json)? await r.json() : r.message) || r;
                }
                history.replace(from);
            }).catch((err) => setError(err));;
        }
    };

    return (
        <main className="auth-section">
            <section className="auth-container">
                <div className="auth-header">
                    <h1>Registro</h1>
                </div>
                {(error)? (
                    <div className="error-container">
                        {error.message || error}
                    </div>
                ) : ""}
                <div className="auth-body">
                    <form method="post" onSubmit={submitRegistro}>
                        <div className="auth-form">
                            <label htmlFor="correo">Correo</label>
                            <input className="form-control" type="email" name="correo" id="correo" onChange={changeEmail} value={correo} placeholder="Ingresa tu correo" />
                            <label htmlFor="clave">Contraseña</label>
                            <input className="form-control" type="password" name="clave" id="clave" onChange={changePassword} value={clave} placeholder="Ingresa tu clave" />
                            <label htmlFor="claveVerif">Confirmar Contraseña</label>
                            <input className="form-control" type="password" name="claveVerif" id="claveVerif" onChange={changePasswordVerif} value={claveVerif} placeholder="Reescribe tu clave" />
                            { (!coinciden)? (
                                <p className="form-info">Verifica que las claves coincidan</p>
                            ) : ""}
                        </div>
                        <input className={"btn btn-extend"+ ((validoCorreo && coinciden)? "" : " btn-disabled") } type="submit" value="Registrarme"/>
                    </form>
                </div>
            </section>
        </main>
    );
}
