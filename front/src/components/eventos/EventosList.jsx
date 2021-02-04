import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useEventos } from './EventosHook';

import './eventos.scss';

export default function EventosList() {
    
    const { eventos, getEventos } = useEventos();
    // const { user } = useAuth();


    useEffect(() => {
        if(!eventos) {
            getEventos();
        }
    }, [eventos, getEventos]);

    return (
        <section className="eventos-container">
            {(eventos &&  eventos.length)? 
                eventos.map((e, i) => <Evento evento={e} key={i} num={i} />)
            : (
                <p className="no-eventos-info">
                    No hay eventos que mostrar. ¡Prueba creando uno!
                </p>
            )}
        </section>
    );
}

function Evento({ evento, num }) {
    return (
        <Link className="evento-card" to={`/detalle/${evento.id}`}>
            <div className="evento-card-header">
                <h3>{evento.nombre}</h3>
            </div>
            <div className="evento-card-body">
                <p className="subtitle">{evento.lugar}</p>
                <p className="silent">Creado en: {new Date(evento.fecha_creacion).toLocaleString()}</p>
            </div>
            <p className="evento-card-number">{num}</p>
        </Link>
    );
}
