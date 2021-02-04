import React from 'react';
import { Link } from 'react-router-dom';
import { useEventos } from './EventosHook';

export default function EventosList() {
    
    const { eventos } = useEventos();
    // const { user } = useAuth();


    // useEffect(() => {
    //     if(!eventos) {
    //         getEventos(user);
    //     }
    // }, [eventos, getEventos, user]);

    return (
        <section className="eventos-container">
            {(eventos &&  eventos.length)? 
                eventos.map((e, i) => <Evento evento={e} key={i} />)
            : (
                <p className="no-eventos-info">
                    No hay eventos que mostrar. ¡Prueba creando uno!
                </p>
            )}
        </section>
    );
}

function Evento({ evento, key }) {
    return (
        <Link className="evento-card" to={`/eventos/${evento.id}`}>
            <div className="evento-card-header">
                <h3>{evento.nombre}</h3>
            </div>
            <div className="evento-card-body">
                <p className="subtitle">{evento.lugar}</p>
                <p className="silent">{evento.fecha_creacion}</p>
            </div>
            <p className="evento-card-number">{key}</p>
        </Link>
    );
}
