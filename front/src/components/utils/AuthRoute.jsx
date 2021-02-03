import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../auth/AuthHook";



export function AuthRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }