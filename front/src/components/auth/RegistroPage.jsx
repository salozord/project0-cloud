import React from 'react'

export default function RegistroPage() {
    const [correo, setCorreo] = useState('');
    const [validoCorreo, setValidoCorreo] = useState(false);
    const [clave, setClave] = useState('');

    const { login, error } = useAuth();
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
    const changePassword = (event) => setClave(event.target.value);

    /**
     * Submits the form
     * @param {Event} event the submission event
     */
    const submitLogin = (event) => {
        event.preventDefault();
        const correo = event.target.correo;
        const clave = event.target.clave;

        if(validoCorreo && correo && clave) {
            let { from } = location.state || { from: { pathname: "/" } };
            login(correo, clave).then(() => {
                history.replace(from);
            });
        }
    };

    return (
        <main className="auth-section">
            <section className="auth-container">
                <div className="auth-header">
                    <h1>Ingresar</h1>
                </div>
                {(error)? (
                    <div className="error-container">
                        {error.message || error}
                    </div>
                ) : ""}
                <div className="auth-body">
                    <form method="post" onSubmit={submitLogin}>
                        <div className="auth-form">
                            <label htmlFor="correo">Correo</label>
                            <input className="form-control" type="email" name="correo" id="correo" onChange={changeEmail} value={correo} placeholder="Ingresa tu correo" />
                            <label htmlFor="clave">Contraseña</label>
                            <input className="form-control" type="password" name="clave" id="clave" onChange={changePassword} value={clave} placeholder="Ingresa tu clave" />
                        </div>
                        <input className={"btn btn-extend"+ ((correo && validoCorreo && clave)? "" : " btn-disabled") } type="submit" value="Ingresar"/>
                    </form>
                </div>
            </section>
        </main>
    );
}
