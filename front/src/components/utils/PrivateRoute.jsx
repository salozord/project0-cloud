import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../auth/AuthHook";



export function PrivateRoute({ children, ...rest }) {
    let { user } = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }