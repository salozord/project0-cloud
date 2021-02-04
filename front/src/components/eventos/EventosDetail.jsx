import React from 'react'
import { useParams } from 'react-router-dom';
import EventosCreate from './EventosCreate';

export function EventosDetail() {
    const { eventoId } = useParams();

    return (
        <section className="evento-detail">
            
        </section>
    );
}

export function EventosEdit() {
    return (
        <EventosCreate edit={true} />
    );
}

