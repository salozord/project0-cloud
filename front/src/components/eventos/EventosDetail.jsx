import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import EventosCreate from './EventosCreate';
import { useEventos } from './EventosHook';

import './eventos.scss';

export function EventosDetail() {
    const [evento, setEvento] = useState({
        nombre: '',
        categoria: '',
        lugar: '',
        direccion: '',
        fecha_inicio: new Date().toISOString(),
        fecha_fin: new Date().toISOString(),
        presencial: false
    });

    const { getEvento, eliminarEvento } = useEventos();
    const { eventoId } = useParams();

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if(Object.values(evento).some((e) => e === '' || e === undefined)) {
            getEvento(eventoId).then((res) => {
                setEvento(res);
            });
        }
    }, [eventoId, getEvento, evento]);

    const delEvento = () => {
        eliminarEvento(eventoId);
        history.replace("/");
    };

    return (
        <section className="evento-detail">
            <div className="evento-card">
                <div className="evento-card-header">
                    <h3>{evento.nombre}</h3>
                </div>
                <div className="evento-card-body">
                    <p className="subtitle">{evento.lugar}</p>
                    <p className="silent">Creado el: {new Date(evento.fecha_creacion).toLocaleString()}</p>
                    <p className="subtitle">{evento.categoria}</p>
                    <p>Dirección: {evento.direccion}</p>
                    <p>Inicio: {new Date(evento.fecha_inicio).toLocaleDateString()}</p>
                    <p>Fin: {new Date(evento.fecha_fin).toLocaleDateString()}</p>
                    <p className="subtitle">{(evento.presencial)? "Presencial":"Virtual"}</p>
                </div>
                <div className="evento-detail-buttons">
                    <Link to={{pathname: `/editar/${eventoId}`, state: { from: location }}} className="btn">
                        Editar
                    </Link>
                    <button onClick={delEvento} className="btn btn-outline">
                        Eliminar
                    </button>
                </div>
            </div>
        </section>
    );
}

export function EventosEdit() {
    return (
        <EventosCreate edit={true} />
    );
}

