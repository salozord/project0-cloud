import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import './eventos.scss';
import EventosCreate from './EventosCreate';
import { EventosEdit, EventosDetail } from './EventosDetail';
import { ProvideEventos } from './EventosHook';
import EventosList from './EventosList';

export default function EventosPage() {
    const { path } = useRouteMatch();

    return (
        <main className="eventos-section">
            <ProvideEventos>
                <Switch>
                    <Route exact path={path}>
                        <EventosList />
                    </Route>
                    <Route path={`${path}/eventos/crear`}>
                        <EventosCreate />
                    </Route>
                    <Route path={`${path}/eventos/:eventoId`}>
                        <EventosDetail />
                    </Route>
                    <Route path={`${path}/eventos/:eventoId/editar`}>
                        <EventosEdit />
                    </Route>
                </Switch>
            </ProvideEventos>
        </main>
    )
}
