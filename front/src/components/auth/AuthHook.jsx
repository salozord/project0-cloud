import React, { useState, useEffect, useContext, createContext } from "react";
import { endpointApi, loginApi, registroApi } from "../utils/constants";

const authContext = createContext();

/**
 * Auth provider
 * @param {object} {children} the children components
 */
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

/**
 * Auth context hook
 */
export const useAuth = () => {
    return useContext(authContext);
};

/**
 * Provider hook that creates auth object and handles state
 */
function useProvideAuth() {
    const [user, setUser] = useState();
    // const [error, setError] = useState();

    /**
     * Resets the error if there was a previous one
     */
    // const resetError = () => (error)? setError(null) :  null;
    
    /**
     * Wraps the login functionality
     * @param {object} {correo, clave} El objeto con las credenciales
     */
    const login = async (credenciales) => {
      // resetError();
      let content = JSON.stringify(credenciales);
      return fetch(endpointApi + loginApi, {
          method: "POST",
          body: content,
          headers: {
            "Content-Type": "application/json"
          }
      })
      .then(async (ans) => {
        if(ans.ok) {
          let response = await ans.json();
          localStorage.setItem("user", response.token);
          setUser(response.token);
          return response;
        }
        return ans;
      });
    };
  
    /**
     * Wraps the Regristration functionality
     * @param {object} {correo:String, clave:String} El objeto con las credenciales 
     */
    const registro = async (credenciales) => {
      // resetError();
      let content = JSON.stringify(credenciales);
      return fetch(endpointApi + registroApi, { 
        method: "POST",
        body: content,
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(async (ans) => {
        if(ans.ok) {
          let response = await ans.json();
          return response;
        }
        return ans;
      });
    };
  
    /**
     * Logs out the user
     */
    const logout = async () => {
      setUser(null);
      localStorage.removeItem("user");
    };
  
    /**
     * Subscribe to user on mount
     */
    useEffect(() => {
      let user = localStorage.getItem("user");
      setUser(user);
    }, []);

    
    return {
      user,
      login,
      registro,
      logout
    };
}