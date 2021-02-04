import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useEventos } from './EventosHook'

import './eventos.scss';

export default function EventosCreate({ edit }) {

    const [evento, setEvento] = useState({
        nombre: '',
        categoria: '',
        lugar: '',
        direccion: '',
        fecha_inicio: new Date().toISOString(),
        fecha_fin: new Date().toISOString(),
        presencial: false
    });

    const history = useHistory();
    const location = useLocation();

    const { crearEvento, actualizarEvento, getEvento, error } = useEventos();
    const { eventoId } = useParams();

    useEffect(() => {
        if(edit && Object.values(evento).some((e) => e === '' || e === undefined)) {
            getEvento(eventoId).then((res) => {
                setEvento({
                    ...res,
                    fecha_inicio: new Date(res.fecha_inicio).toISOString(),
                    fecha_fin: new Date(res.fecha_fin).toISOString(),
                });
            });
        }
    }, [edit, eventoId, getEvento, evento]);


    const changeNombre = (event) => {
        setEvento((e) => {return {...e, nombre: event.target.value}});
    };
    
    const changeCategoria = (event) => {
        setEvento((e) => {return {...e, categoria: event.target.value}});
    };

    const changeLugar = (event) => {
        setEvento((e) => {return {...e, lugar: event.target.value}});
    };

    const changeDireccion = (event) => {
        setEvento((e) => {return {...e, direccion: event.target.value}});
    };

    const changeFechaInicio = (event) => {
        let ini = event.target.value;
        const re = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
        if(re.test(String(ini))) {
            setEvento((e) => {return {...e, fecha_inicio: new Date(event.target.value).toISOString()}});
        }
    };

    const changeFechaFin = (event) => {
        let fin = event.target.value;
        const re = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
        if(re.test(String(fin))) {
            setEvento((e) => {return {...e, fecha_fin: new Date(event.target.value).toISOString()}});
        }
    };

    const changePresencial = (event) => {
        setEvento((e) => {return {...e, presencial: event.target.checked}});
    };

    const submitEvent = (event) => {
        event.preventDefault();

        if(!Object.values(evento).some((e) => e === '' || e === undefined)) {
            let { from } = location.state || { from: { pathname: "/" } };
            if(edit) { 
                actualizarEvento(eventoId, evento).then(()=> {
                    history.replace(from);
                });
            }
            else {
                crearEvento(evento).then(() => {
                    history.replace(from);
                });
            }
        }
    };

    return (
        <section className="evento-create">
            <div className="evento-create-header">
                    <h1>{(edit)? "Editar Evento" : "Crear Evento"}</h1>
                </div>
                {(error)? (
                    <div className="error-container">
                        {error.message || error}
                    </div>
                ) : ""}
                <div className="evento-create-body">
                    <form onSubmit={submitEvent}>
                        <div className="evento-create-form">
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" id="nombre" onChange={changeNombre} value={evento.nombre} placeholder="Ingresa el nombre" />
                            <label htmlFor="categoria">Categoría</label>
                            <input className="form-control" type="text" name="categoria" id="categoria" onChange={changeCategoria} value={evento.categoria} placeholder="(Curso, Seminario, Congreso o Conferencia)" />
                            <label htmlFor="lugar">Lugar</label>
                            <input className="form-control" type="text" name="lugar" id="lugar" onChange={changeLugar} value={evento.lugar} placeholder="Ingresa el lugar" />
                            <label htmlFor="direccion">Dirección</label>
                            <input className="form-control" type="text" name="direccion" id="direccion" onChange={changeDireccion} value={evento.direccion} placeholder="Ingresa la dirección" />
                            <label htmlFor="fecha_inicio">Fecha Inicio</label>
                            <input className="form-control" type="date" name="fecha_inicio" id="fecha_inicio" onChange={changeFechaInicio} value={evento.fecha_inicio.split("T")[0]} />
                            <label htmlFor="fecha_fin">Fecha Fin</label>
                            <input className="form-control" type="date" name="fecha_fin" id="fecha_fin" onChange={changeFechaFin} value={evento.fecha_fin.split("T")[0]} />
                            <div className="form-checkbox">
                                <input type="checkbox" name="presencial" id="presencial" onChange={changePresencial} value="presencial" checked={evento.presencial} />
                                <label htmlFor="presencial">Presencial</label>
                            </div>
                        </div>
                        <input className={"btn btn-extend"+ ((!Object.values(evento).some((e) => e === '' || e === undefined))? "" : " btn-disabled") } type="submit" value={(edit)? "Guardar":"Crear"} />
                    </form>
                </div>
        </section>
    )
}
