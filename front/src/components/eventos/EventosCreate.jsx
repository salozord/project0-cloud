import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthHook';
import { useEventos } from './EventosHook'

export default function EventosCreate({ edit }) {

    const [evento, setEvento] = useState();

    const { crearEvento, editarEvento, getEvento } = useEventos();
    const { user } = useAuth();
    const { eventoId } = useParams();

    useEffect(() => {
        if(edit && !evento) {
            getEvento(eventoId).then((res) => {
                setEvento(res);
            });
        }
    }, [edit, eventoId, getEvento, user]);

    return (
        <section className="evento-create">
            
        </section>
    )
}
