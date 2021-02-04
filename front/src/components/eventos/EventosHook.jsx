import React, { useState, useEffect, useContext, createContext } from "react";
import { useAuth } from "../auth/AuthHook";
import { endpointApi, eventosApi } from "../utils/constants";

const eventosContext = createContext();

/**
 * The context provider of the events
 * @param {object} {children} The children components of the 
 */
export function ProvideEventos({ children }) {
    const eventos = useProvideEventos();
    return <eventosContext.Provider value={eventos}>{children}</eventosContext.Provider>;
}

/**
 * Eventos context hook
 */
export const useEventos = () => {
    return useContext(eventosContext);
};

/**
 * Provider hook that creates the events object and handles state
 */
function useProvideEventos() {
    const [eventos, setEventos] = useState();
    const [error, setError] = useState();

    const { user } = useAuth();

    /**
     * Resets the error if there was a previous one
     */
    const resetError = () => (error)? setError(null) :  null;

    /**
     * Resets the state of the events list
     */
    const resetEventos = () => setEventos(null);
    
    /**
     * Wraps the getEventos functionality
     */
    const getEventos = async () => {
      resetError();
      return fetch(endpointApi + eventosApi, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${user}`,
              "Content-Type": "application/json" 
          }
      })
      .then(async (ans) => {
        let response = await ans.json();
        if(ans.ok) {
          response.sort((a, b) => (new Date(b.fecha_creacion)) - (new Date(a.fecha_creacion)));
          setEventos(response);
          return response;
        }
        setError(response);
        return response;
      })
      .catch((err) => setError(err));
    };

    /**
     * Wraps the getEvento functionality
     * @param {String} id The id of the event
     */
    const getEvento = async (id) => {
      resetError();
      return fetch(`${endpointApi}${eventosApi}/${id}`, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${user}`,
              "Content-Type": "application/json" 
          }
      })
      .then(async (ans) => {
        let response = await ans.json();
        if(ans.ok) {
          return response;
        }
        setError(response);
        return response;
      })
      .catch((err) => setError(err));
    };
  
    /**
     * Creates a new event
     * @param {object} nuevoEvento El nuevo evento a ser creado
     */
    const crearEvento = async (nuevoEvento) => {
      resetError();
      return fetch(endpointApi + eventosApi, { 
        method: "POST",
        body: JSON.stringify(nuevoEvento),
        headers: {
          "Authorization": `Bearer ${user}`,
          "Content-Type": "application/json"
        }
      })
      .then(async (ans) => {
        let response = await ans.json();
        if(ans.ok) {
            setEventos([ ...eventos, response ]);
            return response;
        }
        setError(response);
        return response;
      })
      .catch((err) => setError(err));
    };

    /**
     * Updates an event
     * @param {number} id Id del evento a actualizar
     * @param {object} eventoActualizado El evento Actualizado
     */
    const actualizarEvento = async (id, eventoActualizado) => {
        resetError();
        return fetch(`${endpointApi}${eventosApi}/${id}`, { 
          method: "PUT",
          body: JSON.stringify(eventoActualizado),
          headers: {
            "Authorization": `Bearer ${user}`,
            "Content-Type": "application/json"
          }
        })
        .then(async (ans) => {
          let response = await ans.json();
          if(ans.ok) {
              let actuales = eventos.filter((v) => v.id !== id);
              setEventos([ ...actuales, response ]);
              return response;
          }
          setError(response);
          return response;
        })
        .catch((err) => setError(err));
    };

    /**
     * Deletes an event
     * @param {object} id El evento a eliminar
     */
    const eliminarEvento = async (id) => {
        resetError();
        return fetch(`${endpointApi}${eventosApi}/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${user}`,
          }
        })
        .then(async (ans) => {
          if(ans.ok) {
              let actuales = eventos.filter((v) => v.id !== id)
              setEventos(actuales);
              return ans;
          }
          let error = await ans.json();
          setError(error);
          return error;
        })
        .catch((err) => setError(err));
    };
  
    /**
     * Subscribe to events on mount
     */
    useEffect(() => {
      if(!user) {
        setEventos(null);
        setError(null);
      }
      else {
        getEventos();
      }
    }, [user, getEventos]);


    return {
        eventos,
        error,
        getEventos,
        getEvento,
        resetEventos,
        crearEvento,
        actualizarEvento,
        eliminarEvento,
    };
}